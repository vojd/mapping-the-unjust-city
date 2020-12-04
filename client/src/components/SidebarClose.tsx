import { Link } from 'react-router-dom';
import * as React from 'react';

export const SidebarClose = (props: any) => {
  const {lang} = props;
  return (
    <div className="sidebar-close">
      <Link to={`/${lang}/map`}>
        <div className="sidebar-close-content">
            <div className="arrow fa fa-angle-left"/>
        </div>
        </Link>
    </div>
  );
};
