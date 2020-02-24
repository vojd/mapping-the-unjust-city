import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { AppState } from './state/AppState';
import {
  getBlueLineNodesEast,
  getBlueLineNodesWest,
  getGreenLineNodesSouth,
  getGreenLineNodesWest,
  getRedLineNodes,
  getRedLineNodesNorth
} from './models/UndergroundLineDefinitions';
import { MapState } from './pages/MapComponent';

export const getInitialMapState = (): MapState => {
  return {
    scaleFactor: 0.8,
    panX: 1050,
    panY: 20,
    mat: [
      1, 0, 0,
      1, 0, 0
    ],
    isMoving: false,

    previousMouseCoords: {x: 0, y: 0},

    nodes: {
      redLineNodes: getRedLineNodes(),
      redLineNodesNorth: getRedLineNodesNorth(),
      blueLineNodesEast: getBlueLineNodesEast(),
      blueLineNodesWest: getBlueLineNodesWest(),
      greenLineNodesWest: getGreenLineNodesWest(),
      greenLineNodesSouth: getGreenLineNodesSouth(),
    },

    tags: [],
    visibleTags: [],
    visibleOwners: [],
    companies: [],
  };
};

const configureStore = ( initialState: AppState ): Store<AppState> => {

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
};

const store = configureStore({centre: null, company: null, mapState: getInitialMapState()});

export default store;
