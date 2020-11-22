import * as React from 'react';

export const DocumentsList = ( props: any ) => {
  const {documents} = props;
  return (
    documents && documents.length > 0
      ? documents.map(( document: any, id: number ) => {
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
      :
      (
        <p>News archive coming soon</p>
      )
  );
};
