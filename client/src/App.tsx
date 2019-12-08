import * as React from 'react';
import './App.css';
import MapComponent from './pages/MapComponent';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { CentreMediaArchive } from './components/CentreMediaArchive';
import { CentreDetail } from './components/CentreDetail';
import CentreComponent from './components/CentreComponent';
import CentreOwnershipHistoryComponent from './components/CentreOwnershipHistoryComponent';
import CompanyOwnedCentres from './components/CompanyOwnedCentres';
import CompanyDetail from './components/CompanyDetail';
import { Provider } from 'react-redux';
import store from './store';
import { AppState } from './state/AppState';

class App extends React.Component<any, AppState> {

  constructor( props: any ) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="box">
            <header className="row header">
              <ul>
                <li><Link to="/">Home</Link></li>
              </ul>
            </header>

            {/*<MapComponent/>*/}
            <Switch>
              <Route exact path="/" component={MapComponent}/>
              <Route path="/centre/:slug/" component={CentreComponent}/>/
              <Route path="/ownership-history/:slug/" component={CentreOwnershipHistoryComponent}/>
              <Route path="/detail-plan/:slug/" component={CentreDetail}/>
              <Route path="/centre/:slug/media-archive" component={CentreMediaArchive}/>
              <Route path="/company/:slug" component={CompanyDetail}/>
              <Route path="/company-owned-centres/:slug" component={CompanyOwnedCentres}/>
              <Route path="/about" component={MapComponent}/>
              <Route path="/topics" component={MapComponent}/>
            </Switch>

            <footer className="row footer">
              <div className="go-back">
                <Link to="/"> &#8592; </Link>
              </div>
            </footer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
