import React, { Component } from 'react';

class AuthForm extends Component {

  state = {
    email: '',
    password: ''
  };

  handleEmail = ({ target: { value: email } }) => {
    this.setState({ email })
  }

  handlePassword = ({ target: { value: password } }) => {
    this.setState({ password })
  }

  handleSubmit = (e) => {
    const {
      onSubmit,
    } = this.props;
    const {
      email, 
      password
    } = this.state;
    e.preventDefault();
    onSubmit(email, password);
  }

  render() {
    const {
      email,
      password
    } = this.state;
    const {
      errors
    } = this.props;
    return(
      <div className="row">
        <form onSubmit={this.handleSubmit} className="col s4">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input placeholder="Email" type="text" value={email} onChange={this.handleEmail} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input placeholder="Password" type="password" value={password} onChange={this.handlePassword} />
          </div>
          <div className="errors">
           {errors.map((error) => <div key={error}>{error}</div>)}
          </div>
          <button className="btn">Submit</button>
        </form>   
      </div>
    );
  }

}

export default AuthForm;
