import * as React from 'react';
import { Link } from 'react-router-dom';
import { Centre } from '../models/models';

interface CentreInformationProps {
  centre: Centre;
}

/**
 * Main page for a station
 */
export const CentreInformation = ( props: CentreInformationProps ) => {
  const pageBackground = {
    //tslint:disable
    backgroundImage: 'http://lokaler.citycon.se/system/images/W1siZiIsIjIwMTUvMDEvMDkvMTBfNDVfMzBfNjUwX3N0b2NraG9sbV8xMjk1MF9mcnVhbmdzZ2FuZ2VuX3V1c2lfY2l0eWNvbl8yLmpwZyJdLFsicCIsImNvbnZlcnQiLCItc3RyaXAgLWludGVybGFjZSBQbGFuZSAtcXVhbGl0eSA4MCUiLG51bGxdLFsicCIsInRodW1iIiwiNzk4eCJdXQ/stockholm_12950_fruangsgangen_uusi_citycon_2.jpg'
  };
  let a = (
    <div className="full-screen">

      <div className="flex-vertical">
        {/*centre information*/}
        <div className="height-two-thirds" style={pageBackground}>

          <div className="flex-vertical">

            <div className="station-information__content">
              <h2>{props.centre.name}</h2>
              <p>Ägare: {props.centre.owner ? props.centre.owner.name : 'N/A'}</p>

              <div>
                <p>{props.centre.description}</p>
              </div>
            </div>

            <div className="station-information__toolbar">
              <Link to={`/company/${props.centre.owner ? props.centre.owner.slug : ''}`}>
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-users"/>
                </div>
              </Link>

              <Link to={`/ownership-history/${props.centre.slug}`}>
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-coins"/>
                </div>
              </Link>

              {/*Detaljplan*/}
              <Link to={`/centre/${props.centre.slug}/detailed`}>
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-map"/>
                </div>
              </Link>

              <Link to={`/centre/${props.centre.slug}/media-archive`}>
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-question"/>
                </div>
              </Link>
            </div>

          </div>
        </div>

        {/*lower mini map*/}
        <div className="height-one-third">
          {/*<MapComponent />*/}
        </div>
      </div>

    </div>
  );

  console.log(a);

  return (

    <div className="row content flex-vertical">
      <div className="station-information__content">
        <h2>{props.centre.name}</h2>
        <p>Ägare: {props.centre.owner ? props.centre.owner.name : 'N/A'}</p>

        <div>
          <p>{props.centre.description}</p>
        </div>
      </div>

      <div className="station-information__toolbar">
        <Link to={`/company/${props.centre.owner ? props.centre.owner.slug : ''}`}>
          <div className="station-information__toolbar__icon">
            <i className="fas fa-users"/>
          </div>
        </Link>

        <Link to={`/ownership-history/${props.centre.slug}`}>
          <div className="station-information__toolbar__icon">
            <i className="fas fa-coins"/>
          </div>
        </Link>

        {/*Detaljplan*/}
        <Link to={`/centre/${props.centre.slug}/detailed`}>
          <div className="station-information__toolbar__icon">
            <i className="fas fa-map"/>
          </div>
        </Link>

        <Link to={`/centre/${props.centre.slug}/media-archive`}>
          <div className="station-information__toolbar__icon">
            <i className="fas fa-question"/>
          </div>
        </Link>
      </div>

      <div className="station-information__minimap"></div>
    </div>


  )

};

