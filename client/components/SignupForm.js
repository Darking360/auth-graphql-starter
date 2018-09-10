import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Login';

class SignupForm extends Component {
  
  handleSubmit = (email, password) => {
    const {
      mutate,
    } = this.props;
    mutate({
      variables: {
        email,
        password
      }
    });
  }

  render() {
    return(
      <AuthForm 
        onSubmit={this.handleSubmit}
      />
    );
  }

}

export default graphql(mutation)(SignupForm);
