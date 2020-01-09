import * as React from 'react';
import { Link } from 'react-router-dom';

export const CentreToolbar = ( props: any ) => {
  const centreSlug = props.centreSlug;
  const companySlug = props.companySlug;

  return (
    <div className="station-information__toolbar">
      <Link to={`/company/${companySlug ? companySlug : ''}`}>
        <div className="station-information__toolbar__icon">
          <i className="fas fa-users"/>
        </div>
      </Link>

      <Link to={`/centre/${centreSlug}/ownership-history/`}>
        <div className="station-information__toolbar__icon">
          <i className="fas fa-coins"/>
        </div>
      </Link>

      {/*Detaljplan*/}
      <Link to={`/detail-plan/${centreSlug}`}>
        <div className="station-information__toolbar__icon">
          <i className="fas fa-map"/>
        </div>
      </Link>

      <Link to={`/centre/${centreSlug}/media-archive`}>
        <div className="station-information__toolbar__icon">
          <i className="fas fa-question"/>
        </div>
      </Link>
    </div>
  );
};
