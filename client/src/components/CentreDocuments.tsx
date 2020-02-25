import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { TheProps } from './Sidebar';
import { AppState } from '../interfaces/AppState';

interface CentreDocumentsProps extends TheProps {
  fetchDocumentsForCentre: Function;
}

class CentreDocuments extends React.Component<CentreDocumentsProps, any> {
  constructor( props: CentreDocumentsProps ) {
    super(props);
  }

  componentWillUpdate() {
    console.log('CentreDocuments.componentWillUpdate');
  }

  render() {
    const {centre} = this.props;
    // if the props changed, fetch new documents
    const documents = centre ? centre.documents : null;
    return (
      <div>
        <div className="page-headline">MEDIA / PRESS</div>
        {
          documents
            ? documents.map(( document: any, id: number ) => {
              return (
                <div key={id} className="document-row">
                  <div>
                    <a href={document.file} target="_blank">{document.title}</a>
                  </div>
                  <div>{document.text}</div>
                </div>
              );
            })
            : ''
        }
      </div>
    );
  }
}

const mapStateToProps = ( state: AppState, {params}: any ) => {
  const {centre} = state;
  console.log('centre documents map state to props', centre, state);
  return state.centre;
};

const mapDispatchToProps = ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
  return {};
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CentreDocuments));
