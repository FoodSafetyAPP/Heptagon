import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from '../helpers/history';
import { logout } from "../store/Actions/UserActions";

class HomePage extends Component {
  componentDidMount() {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      history.replace("/login");
    }
  }

  render() {
    const { userLogout } = this.props;
    return (
      <div className="container py-3">
        <header>
          <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
              <button onClick={userLogout} type="button" name="logout" className="btn btn-primary btn-sm btn-block">Logout</button>
            </nav>
          </div>
        </header>
      </div>
    )
  }
}

const actionCreators = {
  userLogout: logout
};

const mapState = (state) => {
  const { auth } = state;
  return { loggedIn: auth.loggedIn };
}

export default connect(mapState, actionCreators)(HomePage);
