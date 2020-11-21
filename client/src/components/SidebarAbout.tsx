import * as React from 'react';
import { Route, Switch } from 'react-router';
import { SidebarClose } from './SidebarClose';

const AboutMap = () => {
  return (
    <div>
      <h4>Om centrumkartan</h4>

      <p>
        Centrumkartan är framtagen av gruppen Mapping the Unjust City tillsammans med programmerare Mathias Tervo.
        Syftet med sidan är att samla och dela information om vilka som äger centrumanläggningar i Stockholm. Detta för
        att tillgängliggöra kunskap och synliggöra ägandestrukturer, som har stor betydelse och inverkan för hur en
        plats ser ut, fungerar och upplevs.</p>

      <p>
        Källor: Lantmäteriet, respektive företags hemsidor, Botkyrka kommun, Danderyd kommun, Solna stad, Stockholm
        stad, Huddinge kommun.
      </p>

      <p>Kartan har producerats med stöd från bland annat Kulturbryggan, Marabouparken konsthall och Iaspis
        Konstnärsnämnden.
      </p>

    </div>
  );
};

const AboutUs = () => {
  return (
    <div>
      <h4>Om oss</h4>

      <p>about us</p>
    </div>
  );
};

export const SidebarAbout = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content shadow">
        <div>
          <div className="centre-main">
            <Switch>
              <Route exact path="/about/centrumkartan" render={() => <AboutMap/>}/>
              <Route exact path="/about/us" render={() => <AboutUs/>}/>
            </Switch>
          </div>
        </div>
      </div>

      {/* close button */}
        <SidebarClose />
    </div>
  );
};
