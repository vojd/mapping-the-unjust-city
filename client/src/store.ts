import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { AppState } from './state/AppState';
import {
  getBlueLineNodesEast,
  getBlueLineNodesWest,
  getRedLineNodes,
  getRedLineNodesNorth
} from './models/UndergroundLineDefinitions';
import { UndergroundManager } from './components/UndergroundLines';
import { MapState } from './pages/MapComponent';

export const getInitialMapState = (): MapState => {
  const undergroundManager = new UndergroundManager();
  const mapState = {
    scaleFactor: 0.8,
    panX: 1050,
    panY: 20,
    mat: [
      1, 0, 0,
      1, 0, 0
    ],
    isMoving: false,

    previousMouseCoords: {x: 0, y: 0},

    undergroundManager: undergroundManager,
    nodes: {
      redLineNodes: getRedLineNodes(),
      redLineNodesNorth: getRedLineNodesNorth(),
      blueLineNodesEast: getBlueLineNodesEast(),
      blueLineNodesWest: getBlueLineNodesWest(),
    },

    tags: [],
    visibleTags: [],
    visibleOwners: [],
    companies: [],
  };

  return mapState;
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
