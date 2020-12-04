import * as React from 'react';
import { Route, Switch } from 'react-router';
import { SidebarClose } from './SidebarClose';

const AboutMap = () => {
  return (
    <div>
      <h4>About the map</h4>

      <p>
        This map of the Stockholm metro system was drafted with the aim to collect and share information about the
        property owners of local centers, in order to make ownership structures in the city more visible.
        These structures gravely affect the places we abide, consequently shaping our daily lives.
        The map encourages one to turn the focus towards the owning class and financial elites,
        and in that sense allows for more groups and individuals to participate in an exploration of the
        city’s fundamental but often obscured layers.
      </p>

      <p>
        The filter categories “privately owned” and “publicly owned” refer to the ownership status of the
        built environment around each center. The year of sale refers to when the property shifted from public to
        private ownership. Sources of information include municipalities, The National Land Survey as well as the
        local and financial press. Additional categories and materials will be added gradually.
        Feel free to contact us if you have any questions or want to discuss the design or content!
      </p>

      <p>
        The map is produced by Mapping the Unjust City in collaboration with Mathias Tervo, Channa Bianca,
        and Scott Springfeldt. Intro video by Samuel Richter.
      </p>

      <p>
        With support from, among others, Kulturbryggan, Marabouparken konsthall,
        Iaspis (Swedish Arts Grants Committee) and RISD Architecture.
      </p>

      <p>A version in Swedish is planned to be launched in the winter of 2021.</p>

      <h4>About Mapping the Unjust City</h4>

      <p>
        The body of work of Mapping the Unjust City is a collaborative process exploring aesthetics and pedagogy in
        relation to ownership and capital flows in cities. By tracing the interrelationships between the abstract and
        the concrete, the ambition is to visualize and distribute information to promote consciousness and action.
      </p>

      <p>
        The group was formed in 2015 in Stockholm with members working in the fields of art, design, architecture,
        and aesthetics. Since then the group has worked in a tradition of critical cartography and counter-mapping
        producing sound pieces, video essays, photography, writings, and maps.
      </p>
    </div>
  );
};

const AboutContact = () => {
  return (
    <div>
      <h4>Contact</h4>
      <p>e-mail: <a href="mailto:mail@mdgh.se">mail@mdgh.se</a></p>
      <p>web: <a href="http://www.mdgh.se">www.mdgh.se</a></p>
    </div>
  );
};

export const SidebarAbout = () => {
  const lang = 'en';
  return (
    <div className="sidebar">
      <div className="sidebar-content shadow">
        <div>
          <div className="centre-main">
            <Switch>
              <Route exact path="/:lang/map/about/centrumkartan" render={() => <AboutMap/>}/>
              <Route exact path="/:lang/map/about/us" render={() => <AboutContact/>}/>
            </Switch>
          </div>
        </div>
      </div>

      {/* close button */}
        <SidebarClose lang={lang}/>
    </div>
  );
};
