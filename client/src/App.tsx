import * as React from 'react';
import './App.css';
import { Map } from './pages/Map';
import { StationInformation } from './components/StationInformation';
import { getRedLineNodes } from './components/UndergroundLineDefinitions';
import { MapNode, UndergroundManager } from './components/UndergroundLines';
import { Route } from 'react-router';
import { BrowserRouter as Router, Link } from 'react-router-dom';

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
          <StationInformation node={this.state.currentNode}/>

          {/*<Route exact path="/" component={Map}/>*/}
          <Route exact path="/" component={Map}/>
          <Route path="/about" component={Map}/>
          <Route path="/topics" component={Map}/>
        </div>
      </Router>
    );
  }
}

export default App;
