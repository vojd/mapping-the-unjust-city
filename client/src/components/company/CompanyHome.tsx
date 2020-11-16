import * as React from 'react';
import { trans } from '../../trans';
import { DescriptionTranslated } from '../Sidebar';

export const CompanyHome = ( props: any ) => {
  const {company} = props;

  return (
    <div className="centre-name">
      <h2>
        {company ? company.name : ''}
      </h2>

      <div className="headline-text">{trans('about_company', 'en')}</div>

      <div className="sidebar-inline-image">
        {
          company && company.image
            ? <img src={company.image} alt=""/>
            : ''
        }
      </div>

      <div>
          <DescriptionTranslated obj={company}/>
      </div>
    </div>
  );
};
