import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { AppState } from './state/AppState';

const getInitialState = (): AppState => {
  return <AppState> {
    centre: null
  };
};

const configureStore = ( initialState: AppState ): Store<AppState> => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
};

const store = configureStore(getInitialState());
export default store;
