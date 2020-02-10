import * as React from 'react';
import { Link } from 'react-router-dom';
import { Centre } from '../models/models';
import { CentreToolbar } from './CentreToolbar';

export interface CentreInformationProps {
  centre: Centre;
}

/**
 * Main page for a station
 */
export const CentreInformation = ( props: CentreInformationProps ) => {
  if (!props.centre.owner) {
    return null;
  }

  console.log('centre info', props);

  const pageStyle = {
    background: `url(${props.centre.images[0].image})`
  };

  const url = `/company-owned-centres/${props.centre.owner.slug}`;
  return (
    <div className="row content flex-vertical">
      <div className="station-information__content" style={pageStyle}>
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

      <CentreToolbar centreSlug={props.centre.slug} companySlug={props.centre.owner.slug}/>

      <div/>
    </div>
  );
};
