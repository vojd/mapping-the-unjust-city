import * as React from 'react';

export const DocumentsList = ( props: any ) => {
  const {documents} = props;
  console.log('DocumentsList', documents);

  return (

    documents
      ? documents.map(( document: any, id: number ) => {
        console.log('doc', document);
        const title = document.title ? document.title : document.file;
        return (
          <div key={id} className="document-row">
            <div>
              <a href={document.file} target="_blank">{title}</a>
            </div>
            <div>{document.text}</div>
          </div>
        );
      })
      : ''
  );
};
