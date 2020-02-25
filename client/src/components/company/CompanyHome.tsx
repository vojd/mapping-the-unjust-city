import * as React from 'react';

// interface CompanyHomeProps {
//   company: Company;
// }
export const CompanyHome = ( props: any ) => {
  const {company} = props;

  return (
    <div>
      <div className="page-headline">OM BOLAGET</div>
      <h2>
        {company ? company.name : ''}
      </h2>

      <div>
        {company ? company.description : ''}
      </div>
    </div>
  );
};
