import { Action } from 'redux';
import { actionTypes } from '../actions/Action';
import { MapState } from '../interfaces/MapInterfaces';
import { MapNode } from '../components/UndergroundLines';
import { MapDataFetchedAction } from '../actions/mapActions';
import { Centre } from '../models/models';
import { addToggleStateToNodes, createNewTagList } from './toggleOnTag';
import { addToggleOwnerStateToNodes, createNewOwnerList } from './toggleOnOwner';
import { toggleNodesBySoldYear } from './toggleSoldYear';
import { toggleNodesOnPublicPrivate } from './togglePublicPrivate';

interface MapReducer extends Action {
  result: MapState;
  event: MouseEvent | TouchEvent;
}

const getCoords = (action: MapReducer) => {
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
  return { x, y };
};

const getPan = (state: MapState, action: MapReducer) => {

  if (action && action.event && state.isMoving) {

    let px = state.previousMouseCoords.x;
    let py = state.previousMouseCoords.y;

    const { x, y } = getCoords(action);

    // Initially we have no previous coords so we'll set them to the actual screen coords
    if (px === 0) {
      px = x;
    }
    if (py === 0) {
      py = y;
    }

    return {
      previousMouseCoords: { x, y },
      panX: state.panX + (x - px),
      panY: state.panY + (y - py),
    };
  }

  return state;
};

const addDataToNode = (node: MapNode, nodeFromApi: Centre) => {
  if (!nodeFromApi) {
    return node;
  }

  node.tags = nodeFromApi.tags;
  node.filled = nodeFromApi.status;
  node.owner = nodeFromApi.owner;
  node.sold = nodeFromApi.sold;
  // node.private = nodeFromApi.private;
  node.isActive = false;
  node.ownershipType = nodeFromApi.ownershipType;
  console.log(' node.ownershipType', nodeFromApi.ownershipType);
  return node;
};

const getMatchingCentreFromApiData = (node: MapNode, actionData: MapDataFetchedAction) => {
  return actionData.result.filter((item: Centre) => {
    return node.name === item.name;
  });
};

/**
 * This is where we add the actual data from the backend onto a node
 * @param {MapNode[][]} branches
 * @param {MapDataFetchedAction} actionData
 * @returns {MapNode[][]}
 */
const recursivelyAddDataToBranches = (branches: MapNode[][], actionData: MapDataFetchedAction): MapNode[][] => {

  return branches.map((branch: MapNode[]) => {
    return branch.map((node: MapNode) => {
      const nodeFromApi = getMatchingCentreFromApiData(node, actionData);

      if (nodeFromApi.length > 0) {
        node = addDataToNode(node, nodeFromApi[0]);
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
const addDataFromState = (state: MapState, actionData: MapDataFetchedAction) => {
  let newNodes: MapNode[] = [];

  // Loop over each "base node", a junction which has branches
  Object.keys(state.nodes).forEach((key) => {
    state.nodes[key].forEach((node: MapNode) => {

      const matchingNodes = getMatchingCentreFromApiData(node, actionData);
      if (matchingNodes) {
        node = addDataToNode(node, matchingNodes[0]);
      }

      if (node.branches) {
        node.branches = recursivelyAddDataToBranches(node.branches, actionData);
      }
      newNodes.push(node);
    });
  });
  return newNodes;
};

const addTagsFromAction = (state: MapState, action: any) => {
  state.tags = action.result;
  return state;
};

// MapState is a subset of AppState
export default (state: MapState, action: any) => {
  switch (action.type) {

    case actionTypes.MAP_MOUSE_DOWN:
      return { ...state, isMoving: true, previousMouseCoords: getCoords(action) };

    case actionTypes.MAP_MOUSE_UP:
      return { ...state, isMoving: false };

    case actionTypes.MAP_MOUSE_MOVE:
      const p = getPan(state, action);
      // only return new state if we're actually moving
      if (action && action.event && state.isMoving) {
        return {
          ...state,
          panX: p.panX,
          panY: p.panY,
          previousMouseCoords: p.previousMouseCoords
        };
      } else {
        return state;
      }

    case actionTypes.MAP_DATA_FETCHED:
      return { ...state, mapData: addDataFromState(state, action) };

    case actionTypes.TAG_DATA_FETCHED:
      return { ...state, mapData: addTagsFromAction(state, action) };

    case actionTypes.TOGGLE_TAG_VISIBILITY:
      const { visibleTags } = state;
      const tag = action.data.value;
      const tagsToShow = createNewTagList(visibleTags, tag);

      return {
        ...state,
        mapData: addToggleStateToNodes(state, action, tagsToShow),
      };

    case actionTypes.TOGGLE_OWNER_VISIBILITY:
      const { visibleOwners } = state;
      const owner = action.data.value;
      const ownersToShow = createNewOwnerList(visibleOwners, owner);

      return {
        ...state,
        mapData: addToggleOwnerStateToNodes(state, action, ownersToShow),
      };

    case actionTypes.TOGGLE_SOLD_YEAR_VISIBILITY:
      let { soldYears } = state;
      soldYears[action.data.value] = !soldYears[action.data.value];
      return {
        ...state,
        soldYears,
        mapData: toggleNodesBySoldYear(state, action, soldYears)
      };

    case actionTypes.TOGGLE_PUBLIC_VISIBILITY:
      let { publicDisplayMode } = state;
      publicDisplayMode[action.data.value] = !publicDisplayMode[action.data.value];
      console.log(publicDisplayMode);
      return {
        ...state,
        publicDisplayMode,
        mapData: toggleNodesOnPublicPrivate(state, action, publicDisplayMode)
    };

    case actionTypes.TOGGLE_FILTER_BOX_OPEN:
      const { isFilterBoxOpen } = state;
      return { ...state, isFilterBoxOpen: !isFilterBoxOpen };

    case actionTypes.COMPANIES_FETCHED:
      console.log('COMPANIES_FETCHED', state);
      const newState = { ...state, companies: action.result };
      console.log('new state', newState);
      return newState;

    default:
      return state || null;
  }
};
