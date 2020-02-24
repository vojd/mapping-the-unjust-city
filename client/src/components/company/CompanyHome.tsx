import * as React from 'react';

// interface CompanyHomeProps {
//   company: Company;
// }
export const CompanyHome = ( props: any ) => {
  const {company} = props;
  return (
    <div>company home > {company}</div>
  );
};
