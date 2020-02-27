import * as React from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import { Route, Switch } from 'react-router';
import { HashRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Sidebar from './components/Sidebar';
import SidebarCompany from './components/SidebarCompany';
import { AppState } from './interfaces/AppState';
import { SidebarAbout } from './components/SidebarAbout';

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
              <Route path="/company/:slug" component={SidebarCompany}/>

              <Route path="/about/centrumkartan" component={SidebarAbout}/>
              <Route path="/about/us" component={SidebarAbout}/>
            </Switch>

            <div className="about shadow">
              <Link to={`/about/centrumkartan`}>Om Centrumkartan</Link>
              <Link to={`/about/us`}>Om oss</Link>
            </div>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
