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
  if (!props.centre.owner) {
    return null;
  }

  const url = `/company-owned-centres/${props.centre.owner.slug}`;
  return (
    <div className="row content flex-vertical">
      <div className="station-information__content">
        <div className="content-header">
          <h2>{props.centre.name}</h2>
        </div>

        {
          props.centre.owner
            ? <p>Ägare: <Link to={url}>{props.centre.owner.slug}</Link></p>
            : null
        }

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

      <div className="station-information__minimap"/>
    </div>
  );
};
