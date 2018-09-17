import * as React from 'react';
import './App.css';
import { Map } from './pages/Map';
import { getRedLineNodes } from './components/UndergroundLineDefinitions';
import { MapNode, UndergroundManager } from './components/UndergroundLines';
import { Route } from 'react-router';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { CentreComponent } from './components/CentreInformation';
import { CentreDetail } from './components/CentreDetail';
import { CentreOwnershipHistory } from './components/CentreOwnershipHistory';
import { CentreMediaArchive } from './components/CentreMediaArchive';
import { CompanyDetail } from './components/CompanyDetail';

interface AppState {
  currentNode: MapNode;
}

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);

    const currentNode = getRedLineNodes(new UndergroundManager())[0];
    this.state = {
      currentNode: currentNode
    };
  }

  render() {
    return (
      <Router>
        <div className="App">

          <div className="header">
            <ul>
              <li><Link to="/">Home</Link></li>
            </ul>
          </div>

          <Map/>

          {/*<Route exact path="/" component={Map}/>*/}
          <Route exact path="/" component={Map}/>
          <Route path="/centre/:slug/" component={CentreComponent}/>
          <Route path="/centre/:slug/ownership-history" component={CentreOwnershipHistory}/>
          <Route path="/centre/:slug/detail" component={CentreDetail}/>
          <Route path="/centre/:slug/media-archive" component={CentreMediaArchive}/>
          <Route path="/company/:slug" component={CompanyDetail}/>
          <Route path="/about" component={Map}/>
          <Route path="/topics" component={Map}/>
        </div>
      </Router>
    );
  }
}

export default App;
