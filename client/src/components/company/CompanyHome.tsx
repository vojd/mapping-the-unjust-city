import * as React from 'react';

export const CompanyHome = ( props: any ) => {
  const {company} = props;

  return (
    <div className="centre-name">

      <h2>
        {company ? company.name : ''}
      </h2>

      <div className="headline-text">OM BOLAGET</div>

      <div>
        {company ? company.description : ''}
      </div>
    </div>
  );
};
