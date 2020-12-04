import * as React from 'react';
import { DocumentsList } from '../DocumentsList';
import { trans } from '../../trans';

export const CompanyDocuments = ( props: any ) => {
  const {company, lang} = props;

  return (
    <div className="centre-name">

      <h2>{company ? company.name : ''}</h2>

      <div className="headline-text">
        {
          trans('documents', lang)
        }
      </div>

      <div>
        {
          company
          ? <DocumentsList documents={company.documents}/>
          : ''
        }
      </div>
    </div>
  );
};
