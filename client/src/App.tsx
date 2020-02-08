import * as React from 'react';
import './App.css';
import MapComponent from './pages/MapComponent';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { AppState } from './state/AppState';
import Sidebar from './components/Sidebar';

class App extends React.Component<any, AppState> {

  constructor( props: any ) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="box">
            <header className="row header">

              <Switch>
                <Route exact path="/centre/:slug" component={MapComponent}/>
                <Route path="/" component={MapComponent}/>
              </Switch>
            </header>

            <Switch>
              <Route path="/centre/:slug" component={Sidebar}/>
            </Switch>

          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
