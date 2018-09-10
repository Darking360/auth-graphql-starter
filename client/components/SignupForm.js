import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
import { hashHistory } from 'react-router';
import query from '../queries/CurrentUser';

class SignupForm extends Component {
  
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
    }).then((res) => {
      hashHistory.push('/dashboard');
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
  graphql(mutation)(SignupForm)
);
