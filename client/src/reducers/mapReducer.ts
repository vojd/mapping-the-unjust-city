import { Action } from 'redux';
import { actionTypes } from '../actions/Action';
import { getInitialMapState, MapState } from '../pages/MapComponent';
import { MapNode } from '../components/UndergroundLines';
import { MapDataFetchedAction, ToggleAction, ToggleActionData } from '../actions/mapActions';
import { Centre } from '../models/models';

interface MapReducer extends Action {
  result: MapState;
  event: MouseEvent | TouchEvent;
}

const getCoords = ( action: MapReducer ) => {
  let x, y;
  const event = action.event;
  if (event.hasOwnProperty('touches')) {
    const e = <TouchEvent> event;
    x = e.touches[0].pageX;
    y = e.touches[0].pageY;
  } else {
    const e = <MouseEvent> event;
    x = e.pageX;
    y = e.pageY;
  }
  return {x, y};
};

const getPan = ( state: MapState, action: MapReducer ) => {

  if (action && action.event && state.isMoving) {

    let px = state.previousMouseCoords.x;
    let py = state.previousMouseCoords.y;

    const {x, y} = getCoords(action);

    // Initially we have no previous coords so we'll set them to the actual screen coords
    if (px === 0) {
      px = x;
    }
    if (py === 0) {
      py = y;
    }

    return {
      previousMouseCoords: {x, y},
      panX: state.panX + (x - px),
      panY: state.panY + (y - py),
    };
  }

  return state;
};

/////////////////////////////////////////////////
// TAGS
/////////////////////////////////////////////////
const toggleNode = ( node: MapNode, tagsToShow: string[] ): MapNode => {
  // If the list is empty then we'll show everything
  if (tagsToShow.length === 0) {
    node.isVisible = true;
    return node;
  }

  const nodeHasTag = node.tags && node.tags.filter(t => tagsToShow.indexOf(t.name) > -1).length > 0;
  node.isVisible = nodeHasTag;
  return node;
};

const toggleNodesRecursively = ( branches: MapNode[][],
                                 data: ToggleActionData,
                                 tagsToShow: string[] ): MapNode[][] => {

  return branches.map(( branch ) => {
    return branch.map(( node ) => {

      if (node.branches) {
        console.log('\t has branch', node);
        node.branches = toggleNodesRecursively(node.branches, data, tagsToShow);
      }
      return toggleNode(node, tagsToShow);
    });
  });
};

// TODO: Doesn't handle all levels of branching, must be recursive
const addToggleStateToNodes = ( state: MapState, action: ToggleAction, tagsToShow: string[] ) => {

  const data = action.data;

  // Iterate over all the underground lines by key
  Object.keys(state.nodes).forEach(( key: string ) => {
    // for each underground line defined by key like: { redLineNodes: [] }
    state.nodes[key].forEach(( node: MapNode ) => {

      // act on this nodes children ( branches )
      if (node.branches) {
        node.branches = toggleNodesRecursively(node.branches, data, tagsToShow);
      }
    });
  });

  return state;
};

/////////////////////////////////////////////////
// ADD data to nodes
/////////////////////////////////////////////////

/**
 * This is where we add the actual data from the backend onto a node
 * @param {MapNode[][]} branches
 * @param {MapDataFetchedAction} actionData
 * @returns {MapNode[][]}
 */
const recursivelyAddDataToBranches = ( branches: MapNode[][], actionData: MapDataFetchedAction ): MapNode[][] => {

  return branches.map(( branch: MapNode[] ) => {
    return branch.map(( node: MapNode ) => {
      const nodeFromAPI = actionData.result.filter(( item: Centre ) => {
        return node.name === item.name;
      });

      if (nodeFromAPI.length > 0) {
        node.tags = nodeFromAPI[0].tags;
        node.filled = nodeFromAPI[0].status;
      }

      if (node.branches) {
        node.branches = recursivelyAddDataToBranches(node.branches, actionData);
      }
      return node;
    });
  });
};

/**
 * Map data has been fetched from backend and now we'll
 * apply any potential changes to our client state
 *
 * @param {MapState} state
 * @param {ToggleAction} actionData
 * @returns {MapNode[]}
 */
const addDataFromState = ( state: MapState, actionData: MapDataFetchedAction ) => {
  let newNodes: MapNode[] = [];

  Object.keys(state.nodes).forEach(( key ) => {
    state.nodes[key].forEach(( node: MapNode ) => {
      if (node.branches) {
        node.branches = recursivelyAddDataToBranches(node.branches, actionData);
      }
      newNodes.push(node);
    });
  });
  return newNodes;
};

const addTagsFromAction = ( state: MapState, action: any ) => {
  state.tags = action.result;
  return state;
};

const createNewTagList = ( visibleTags: string[], tag: string ): string[] => {
  const id = visibleTags.indexOf(tag);
  if (id > -1) {
    visibleTags.splice(id, 1);
    return visibleTags;
  } else {
    visibleTags.push(tag);
    return visibleTags;
  }
};

// MapState is a subset of AppState
export default ( state: MapState = getInitialMapState(), action: any ) => {
  switch (action.type) {

    case actionTypes.MAP_MOUSE_DOWN:
      return {...state, isMoving: true, previousMouseCoords: getCoords(action)};

    case actionTypes.MAP_MOUSE_UP:
      return {...state, isMoving: false};

    case actionTypes.MAP_MOUSE_MOVE:
      const p = getPan(state, action);
      return {
        ...state,
        panX: p.panX,
        panY: p.panY,
        previousMouseCoords: p.previousMouseCoords
      };

    case actionTypes.MAP_DATA_FETCHED:
      return {...state, mapData: addDataFromState(state, action)};

    case actionTypes.TAG_DATA_FETCHED:
      return {...state, mapData: addTagsFromAction(state, action)};

    case actionTypes.TOGGLE_TAG_VISIBILITY:
      const {visibleTags} = state;
      console.log({visibleTags});
      const tag = action.data.value;
      const tagsToShow = createNewTagList(visibleTags, tag);

      return {
        ...state,
        mapData: addToggleStateToNodes(state, action, tagsToShow),
      };

    case actionTypes.COMPANIES_FETCHED:
      const obj = {...state, companies: action.result};
      return obj;

    default:
      return state || null;
  }
};
