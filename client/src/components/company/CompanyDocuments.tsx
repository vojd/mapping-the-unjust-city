import * as React from 'react';
import { DocumentsList } from '../DocumentsList';

export const CompanyDocuments = ( props: any ) => {
  const {company} = props;

  return (
    <div className="centre-name">

      <h2>
        {company ? company.name : ''}
      </h2>

      <div className="headline-text">DOKUMENT</div>

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
