import * as React from 'react';
import { Route, Switch } from 'react-router';
import { SidebarClose } from './SidebarClose';

const AboutMap = () => {
  return (
    <div>
      <h4>About the map</h4>

      <p>
        “Nesting today in trade names are figments such as those earlier thought to be hidden in the cache of "poetic"
        vocables.”
        <br/>
        Walter Benjamin, The Arcade Project
      </p>

      <p>
        ”The map will hinder the mapping, as we come to be captivated by fetishes of scale and precision that smooth
        over the world's contradictions.” <br/>
        Alberto Toscano and Jeff Kinkle, Cartographies of the Absolute
      </p>

      <p>
        The map was drafted with the aim to collect and share information about the property owners of local centers in
        Stockholm. This mapping gives access to knowledge and makes the ownership structures in the city more visible.
        These structures gravely affect the places we abide, consequently shaping our daily lives.
        The map encourages one to turn the focus towards the owning class, and in that sense allows for more groups and
        individuals to participate in an exploration of the city's invisible layers.
      </p>

      <p className="bordered-text">
        The categories “privately owned” and “publicly owned” refer to the ownership status of the built environment
        around each center.
        The year of sale refers to when the property shifted from public to private ownership.
        Our sources of information include municipalities,
        The National Land Survey as well as local and financial press.
      </p>

      <p>
        The map will be updated during the exhibition with additional categories and materials.
        Feel free to contact us if you have any questions or want to discuss the design or content!
      </p>

      <p>
        The map is produced by Mapping the Unjust City in collaboration with
        Mathias Tervo, Channa Bianca and Scott Springfeldt. Film by: Samuel Richter.
      </p>

      <p>
        The map has been produced with support from, among others, Kulturbryggan, Marabouparken konsthall,
        Iaspis Konstnärsnämnden and RISD´s Architecture.
      </p>

      <p>A version in Swedish is planned to be launched in the winter of 2021.</p>

      <h4>About Mapping the Unjust City</h4>

      <p>
        The body of work of Mapping the Unjust City is a collaborative process exploring aesthetics and pedagogy in
        relation to ownership and capital flows in cities. By tracing the interrelationships between the abstract and
        the concrete, the ambition is to visualize and distribute information to promote consciousness and action.
      </p>

      <p>
        The group was formed in 2015 in Stockholm with members working in the fields of art, design, architecture and
        aesthetics. Since then the group has worked with mappings and cartography in the form of sound pieces,
        video essays, photography, writings and maps.
      </p>

      <p>
        Group members include Maryam Fanni, Elof Hellström, Åsa Johansson, Sarah Kim, Paula Urbano.
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
  return (
    <div className="sidebar">
      <div className="sidebar-content shadow">
        <div>
          <div className="centre-main">
            <Switch>
              <Route exact path="/about/centrumkartan" render={() => <AboutMap/>}/>
              <Route exact path="/about/us" render={() => <AboutContact/>}/>
            </Switch>
          </div>
        </div>
      </div>

      {/* close button */}
        <SidebarClose />
    </div>
  );
};
