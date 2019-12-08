import { Action } from 'redux';
import { actionTypes } from '../actions/Action';
import { getInitialMapState, MapState } from '../pages/MapComponent';
import { MapNode } from '../components/UndergroundLines';

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

export default ( state: MapState, action: any ) => {
  switch (action.type) {
    case actionTypes.MAP_MOUSE_DOWN:
      return {...state, isMoving: true, previousMouseCoords: getCoords(action)};

    case actionTypes.MAP_MOUSE_UP:
      return {...state, isMoving: false};

    case actionTypes.MAP_MOUSE_MOVE:
      const p = getPan(state, action);
      const s = {
        ...state,
        panX: p.panX,
        panY: p.panY,
        previousMouseCoords: p.previousMouseCoords
      };
      return s;

    case actionTypes.MAP_DATA_FETCHED:
      console.log('MAP_DATA_FETCHED');

      // walk through each underground line
      const result = state.undergroundManager.lines.map(( line ) => {
        // which in turn has one or more nodes
        const nodes = line.nodes.map(( node ) => {
          // Now walk through the data we got from the backend
          // and add missing data onto the node
          action.result.map(( dataNode: MapNode ) => {
            if (dataNode.name === node.name) {
              node.owner = dataNode.owner;
              node.tags = dataNode.tags;
            }
          });
          return node;
        });
        return nodes;
      });

      return {...state, mapData: result};

    default:
      console.log('returning initial map state', state);

      return getInitialMapState();
  }
};
