import * as React from 'react';
import './App.css';
import MapComponent from './pages/MapComponent';
import { getRedLineNodes } from './models/UndergroundLineDefinitions';
import { UndergroundManager } from './components/UndergroundLines';
import { Route } from 'react-router';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import CentreComponent from './components/CentreComponent';
import { CentreDetail } from './components/CentreDetail';
import { CentreOwnershipHistory } from './components/CentreOwnershipHistory';
import { CentreMediaArchive } from './components/CentreMediaArchive';
import CompanyDetail from './components/CompanyDetail';
import { Provider } from 'react-redux';
import store from './store';
import { AppState } from './state/AppState';

class App extends React.Component<any, AppState> {

  constructor( props: any ) {
    super(props);

    const currentNode = getRedLineNodes(new UndergroundManager())[0];
    this.state = {...this.state, currentNode: currentNode};
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">

            <div className="header">
              <ul>
                <li><Link to="/">Home</Link></li>
              </ul>
            </div>

            {/*<MapComponent/>*/}

            <Route exact path="/" component={MapComponent}/>
            <Route path="/centre/:slug/" component={CentreComponent}/>/
            <Route path="/centre/:slug/ownership-history" component={CentreOwnershipHistory}/>
            <Route path="/centre/:slug/detail" component={CentreDetail}/>
            <Route path="/centre/:slug/media-archive" component={CentreMediaArchive}/>
            <Route path="/company/:slug" component={CompanyDetail}/>
            <Route path="/about" component={MapComponent}/>
            <Route path="/topics" component={MapComponent}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
