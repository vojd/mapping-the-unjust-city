import * as React from 'react';
import { connect } from 'react-redux';
import { fetchCentreAction } from '../actions/fetchCentreAction';
import { CentreInformation } from './CentreInformation';
import { Centre } from '../models/models';
import { AppState } from '../state/AppState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

interface RouteParams {
  slug: string;
}

export interface RouteMatch {
  params: RouteParams;
}

export interface RouteLocation {
  pathname: string;
}

interface CentreComponentProps {
  match: RouteMatch;
  fetchCentre: Function;
  centre: Centre | null;
}

interface CentreComponentState {
  centre: Centre | null;
}

class CentreComponent extends React.Component<CentreComponentProps, CentreComponentState> {

  constructor(props: CentreComponentProps) {
    super(props);
    const slug = props.match.params.slug;
    console.log(props);
    props.fetchCentre(slug);
  }

  render() {
    return (
      this.props.centre ? <CentreInformation centre={this.props.centre}/> : ''
    );
  }
}

// const mapStateToProps = (state: AppState) => state.centre;
const mapStateToProps = (state: AppState) => state;

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, Action>) => {
  return {
    fetchCentre: (slug: string) => dispatch(fetchCentreAction(slug))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CentreComponent);
