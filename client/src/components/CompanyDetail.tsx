import * as React from 'react';
import { RouteMatch } from './CentreComponent';
import { AppState } from '../state/AppState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { fetchCompanyDetailsAction } from '../actions/fetchCompanyDetailsAction';
import { Company } from '../models/models';

interface CompanyDetailProps {
  match: RouteMatch;
  fetchCompanyDetails: Function;
  company: Company;
}

class CompanyDetail extends React.Component<CompanyDetailProps, any> {
  constructor( props: any ) {
    super(props);
    // const companySlug = props.match.params.slug;
    // props.fetchCompanyDetails(companySlug);
  }

  componentDidMount() {
    const companySlug = this.props.match.params.slug;
    this.props.fetchCompanyDetails(companySlug);
  }

  render() {
    {
      if (!this.props.company) {
        return null;
      }
    }

    let a = (

      <div className="full-screen">

        <div className="flex-vertical">
          {/*centre information*/}
          <div className="height-two-thirds">

            <div className="flex-vertical">
              <p>{this.props.company ? this.props.company.name : null}</p>

              <p>{this.props.company ? this.props.company.description : null}</p>
            </div>
          </div>
        </div>
      </div>
    );
    console.log(a);

    return (

      <div className="row content flex-vertical">
        <div className="content-header">
          <h2>{this.props.company.name}</h2>
        </div>

        <div className="content-padded" style={{overflowX : 'auto', fontSize: '14px'}}>
          <p>{this.props.company.description}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state: AppState ) => state.company;

const mapDispatchToProps = ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
  return {
    fetchCompanyDetails: ( slug: string ) => dispatch(fetchCompanyDetailsAction(slug))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetail);
