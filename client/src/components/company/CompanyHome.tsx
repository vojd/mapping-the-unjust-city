import * as React from 'react';
import { trans } from '../../trans';
import { DescriptionTranslated } from '../Sidebar';

export const CompanyHome = ( props: any ) => {
  const {company, lang} = props;

  return (
    <div className="centre-name">
      <h2>
        {company ? company.name : ''}
      </h2>

      <div className="headline-text">{trans('about_company', lang)}</div>

      <div>
          <DescriptionTranslated obj={company} lang={lang}/>
      </div>
    </div>
  );
};
