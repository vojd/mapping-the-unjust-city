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
import { trans } from './trans';

const IntroVideo = () => {
  return (
    <Route
      render={( {history}) =>   (
      <div className="video-overlay" onClick={() => history.push('/en/map')}>
        <div className="video-overlay-text-container">
          <div className="video-overlay-text">
            <p>Stockholm, November 2020. After decades of deregulation, Swedish infrastructure has been changed
                from the roots, the land, the plot, the real estate, the property – ownership.
                Privatization through tenure conversion and gentrification has amplified class tensions in the urban
                landscape as city dwellers face rising rents and displacement. The transformation of public property
                to private is a motor for the financialization of the city. Property ownership is fundamental for how
                our lives are organized. But this fundamental condition is often hidden or obscured from our view.
                And when the owner is made visible, it is normally on their terms. Knowledge about finance and
                ownership is reserved for a narrow layer of society; difficult to access and hard to grasp.
                &nbsp; &nbsp; &nbsp; &nbsp; Grasp.
                Our collective work responds to this state of disorientation.
                The project Mapping the Unjust City aims to explore how mapping and infographics can
                visualise ownership and financial relations. More specifically local centres in the
                context of Stockholm.
                The presentation of data and supplementary narratives are reminders of the stark reality we
                unconsciously navigate through.
                The map presented here is a map under construction unfolding throughout the online exhibition.
            </p>
          </div>
          <video autoPlay muted loop id="intro-video">
            <source src="./mapping_web_med_25fps.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>
      )}
    />
  );
};

const Pro = (props: any) => {

  console.log('link', props);
  console.log(props.location.state);
  return (
    <div>lang sel</div>
  );
};

const switchLang = (url: string) => {
  if (url.startsWith('/en/')) {
    return url.replace('/en/', '/se/');
  } else if (url.startsWith('/se/')) {
    return url.replace('/se/', '/en/');
  }
  return url;
};

const LangSwitch = (props: any) => {
  const {lang} = props;
  return (
    <Route
      render={( {history}) =>   (
        <a
          href="#"
          onClick={(e: any) => {
            e.preventDefault();
            // rewrite history
            const url = switchLang(history.location.pathname);
            history.push(url);
          }}
        >
          {lang}
        </a>
      )}
    />
  );
};

class App extends React.Component<any, AppState> {

  constructor( props: any ) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="box">
            <div className="header">
              <Switch>
                <Route path="/:lang/map" component={MapComponent}/>
                <Route exact path="/:lang/" component={IntroVideo}/>
              </Switch>
            </div>

            <Switch>
              <Route path="/:lang/map/centre/:slug" component={Sidebar}/>
              <Route path="/:lang/map/company/:slug" component={SidebarCompany}/>

              <Route exact path="/:lang/map/about/centrumkartan" component={SidebarAbout}/>
              <Route exact path="/:lang/map/about/us" component={SidebarAbout}/>
              <Route exact path="/:lang/map/about/demo" component={SidebarAbout}/>
              <Route exact path="/en/map/lang" component={Pro}/>
            </Switch>

            <div className="about shadow">
              <Link to={`/en/map/about/centrumkartan`}>{trans('about_map', 'en')}</Link>
              <Link to={`/en/map/about/us`}>{trans('about_us', 'en')}</Link>
              <Link to={`/en/map/about/demo`}>Demo</Link>

              <LangSwitch lang={'Se'}/>
              <LangSwitch lang={'En'}/>
            </div>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
