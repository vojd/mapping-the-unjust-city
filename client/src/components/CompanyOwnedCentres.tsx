import * as React from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../state/AppState';
import { connect } from 'react-redux';
import { fetchCompanyDetailsAction } from '../actions/fetchCompanyDetailsAction';
import { positionFixed } from '../react-styles/styles';
import { Link } from 'react-router-dom';

interface CompanyOwnedCentresProps {
  fetchCompanyDetails: Function;
  company: {
    name: string;
    centres: any[]
  };
}

interface CompanyOwnedCentresState {

}

class CompanyOwnedCentres extends React.Component<CompanyOwnedCentresProps, CompanyOwnedCentresState> {

  constructor( props: any ) {
    super(props);
    const companySlug = props.match.params.slug;
    props.fetchCompanyDetails(companySlug);
  }

  render() {
    if (!this.props.company) {
      return null;
    }

    return (
      <div className="full-screen" style={positionFixed}>
        <div className="content-header">
          <h2>{this.props.company.name}</h2>
        </div>

        <div className="content flex-vertical">
          <div className="content-padded">
            <ul>
              {
                this.props.company
                  ? this.props.company.centres.map(( centre, idx ) => {
                    const url = `/centre/${centre.slug}`;
                    return (
                      <li key={idx}>
                        <Link to={url}>{centre.name}</Link>
                      </li>
                    );
                  })
                  : null
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state: AppState ) => {
  console.log('state ', state);
  return state.company ? state.company : {};
};

const mapDispatchToProps = ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
  return {
    fetchCompanyDetails: ( slug: string ) => dispatch(fetchCompanyDetailsAction(slug))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOwnedCentres);
