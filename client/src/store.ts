import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import {
  getBlueLineNodesEast,
  getBlueLineNodesWest,
  getGreenLineNodesSouth,
  getGreenLineNodesWest,
  getRedLineNodes,
  getRedLineNodesNorth
} from './models/UndergroundLineDefinitions';
import { AppState } from './interfaces/AppState';
import { MapState } from './interfaces/MapInterfaces';

export const getInitialMapState = (): MapState => {
  return {
    activeCentreSlug: '',
    scaleFactor: 0.6,
    panX: window.innerWidth,
    panY: window.innerHeight / 3.0,
    mat: [
      1, 0, 0,
      1, 0, 0
    ],
    isMoving: false,

    previousMouseCoords: { x: 0, y: 0 },

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
    soldYears: {
      '0': false, // ongoing sale
      '2020': false,
      '2010': false,
      '2000': false,
      '1990': false,
      '1980': false,
      '1970': false,
      '1960': false,
    },
    publicDisplayMode: {
      'Publicly owned': false,
      'Privately owned': false,
    },
    isFilterBoxOpen: true,
    isVideoVisible: true,
  };
};

const configureStore = (initialState: AppState): Store<AppState> => {

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
};

const store = configureStore({ centre: null, company: null, mapState: getInitialMapState() });

export default store;
