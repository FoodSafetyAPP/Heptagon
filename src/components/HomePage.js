import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from '../helpers/history';
import { logout, updateList } from "../store/Actions/UserActions";
import { records } from "../assets/data";
import Chart from "./chart/Chart";

class HomePage extends Component {
  componentDidMount() {
    const { loggedIn, updateList } = this.props;
    if (!loggedIn) {
      history.replace("/login");
    } else {
      updateList(records);
    }
  }

  render() {
    const { userLogout, dataList } = this.props;
    return (
      <div className="container py-3">
        <header>
          <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
              <button onClick={userLogout} type="button" name="logout" className="btn btn-primary btn-sm btn-block">Logout</button>
            </nav>
          </div>
        </header>
        {dataList.length > 0 ?
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{data.description}</td>
                    <td>{data.date}</td>
                    <td>{data.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          : ""}
        <Chart />
      </div>
    )
  }
}

const actionCreators = {
  userLogout: logout,
  updateList: updateList
};

const mapState = (state) => {
  const { auth } = state;
  return { loggedIn: auth.loggedIn, dataList: auth.dataList };
}

export default connect(mapState, actionCreators)(HomePage);
