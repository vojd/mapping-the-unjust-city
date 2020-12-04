import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { CentreName, TheProps } from './Sidebar';
import { AppState } from '../interfaces/AppState';
import { DocumentsList } from './DocumentsList';

interface CentreDocumentsProps extends TheProps {
  fetchDocumentsForCentre: Function;
}

class CentreDocuments extends React.Component<CentreDocumentsProps, any> {
  constructor( props: CentreDocumentsProps ) {
    super(props);
  }

  render() {
    const {centre, lang} = this.props;
    // if the props changed, fetch new documents
    const documents = centre ? centre.documents : null;
    return (
      <div>
        <CentreName centre={centre} lang={lang}/>
        <div className="headline-text">MEDIA / PRESS</div>
        <DocumentsList documents={documents}/>
      </div>
    );
  }
}

const mapStateToProps = ( state: AppState, {params}: any ) => {
  return state.centre;
};

const mapDispatchToProps = ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
  return {};
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CentreDocuments));
