import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
  
  state = {
    errors: []
  };

  componentWillReceiveProps = (nextProps) => {
    const {
      data: {
        user: oldUser
      }
    } = this.props;
    const {
      data: {
        user
      }
    } = nextProps;
    if (!oldUser && user) hashHistory.push('/dashboard');
  }

  handleSubmit = (email, password) => {
    const {
      mutate,
    } = this.props;
    mutate({
      variables: {
        email,
        password
      },
      refetchQueries: [
        { query }
      ]
    }).catch((res) => {
      const errors = res.graphQLErrors.map((error) => error.message);
      this.setState({ errors })
    });
  }

  render() {
    const {
      errors
    } = this.state;
    return(
      <AuthForm 
        onSubmit={this.handleSubmit}
        errors={errors}
      />
    );
  }

}

export default graphql(query)( 
  graphql(mutation)(LoginForm)
);
