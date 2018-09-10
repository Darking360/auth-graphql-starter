import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

export default (WrappedComponent) => {
  class RequireAuth extends Component {

    componentWillReceiveProps = ({ data: { user } }) => {
      const {
        data: {
          user: oldUser
        }
      } = this.props;
      if (!oldUser || oldUser && !user) hashHistory.push('/login');
    }

    render() {
      return(
        <WrappedComponent {...this.props} />
      ); 
    }
  }

  return graphql(query)(RequireAuth);

}
