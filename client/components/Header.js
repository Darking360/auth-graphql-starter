import React, { Component } from 'react';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import mutation from '../mutations/Logout';

class Header extends Component {

  handleLogout = () => {
    const {
      mutate
    } = this.props;
    mutate({
      refetchQueries: [
        { query }
      ]
    });
  }

  renderButtons = () => {
    const {
      data: {
        loading,
        user
      }
    } = this.props;
    if (loading) {
      return(
        <div />
      );
    } else if(user) {
      return(
        <li>
          <a onClick={this.handleLogout}>
            Logout
          </a>
        </li>        
      );
    } else {
      return(
        <div>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return(
      <nav>
        <div className="nav-wrapper">
          <Link to="/">Home</Link>
          <ul className="right">      
            { this.renderButtons() }
          </ul>
        </div>
      </nav>
    );
  }

}

export default graphql(mutation)(
  graphql(query)(Header)
);
