import * as React from 'react';

/**
 * Detail plan / blueprint of given centre
 * @param props
 * @returns {any}
 * @constructor
 */
export const CentreDetail = ( props: any ) => {
  // tslint:disable-next-line
  const url = "https://www.citycon.com/sites/default/files/styles/full/public/fruangen_centrum_a_g_floorplan.png?itok=2DPLC0Jf";
  return (
    <div className="row content flex-vertical">
      <div className="content-padded">
        <div className="content-header">
          <h2>DETALJPLAN</h2>
        </div>
        <div>
          <img src={url} style={{width: '100%'}}/>
        </div>
      </div>

    </div>
  );
};
