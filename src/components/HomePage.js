import React, { Component } from 'react';
import { connect } from 'react-redux';
import parse from "html-react-parser";
import { history } from '../helpers/history';
import { logout, updateList } from "../store/Actions/UserActions";
import { records } from "../assets/data";
import Chart from "./chart/Chart";
import "./HomePage.css";

class HomePage extends Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      typingTimeout: 0,
      occurence: []
    };
  }

  componentDidMount() {
    const { loggedIn, updateList } = this.props;
    if (!loggedIn) {
      history.replace("/login");
    } else {
      updateList(records);
    }
  }

  countOccurrences = (str, word) => {
    let a = str.split(" ");
    let count = 0;
    for (let i = 0; i < a.length; i++) {
      if (word === (a[i]))
        count++;
    }
    return count;
  }

  handleChange(e) {
    const { typingTimeout } = this.state;
    const { dataList, updateList } = this.props;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    let descstr = "";
    let countWords = [];
    dataList.forEach(element => {
      descstr = descstr + " " + element.description;
    });
    descstr = descstr.trim();

    this.setState({
      typingTimeout: setTimeout(() => {
        let arr = [];
        arr = e.target.value.trim() !== "" ? e.target.value.replace(/\s+/g, ' ').trim().split(" ") : [];

        let listArr = [];
        records.forEach(listObject => {
          let selected = [];
          arr.forEach(element => {
            if (this.countOccurrences(listObject.description, element) > 0) {
              selected.push(element);
            }
          });
          listArr.push({
            ...listObject,
            matched: selected
          });
        });

        updateList(listArr);

        arr.forEach((element) => {
          const data = element.trim();
          const count = this.countOccurrences(descstr, data);
          countWords.push({ keyword: data, count });
          this.setState({ occurence: countWords });
        });
      }, 1000),
    });
  }

  render() {
    const { userLogout, dataList } = this.props;
    const { occurence } = this.state;
    return (
      <div className="container py-3">
        <header>
          <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
              <input onChange={this.handleChange} autoComplete="off" type="text" name="search" id="search" placeholder="search..." style={{ width: "400px" }} />
              <button style={{ marginLeft: "10px" }} onClick={userLogout} type="button" name="logout" className="btn btn-primary btn-sm btn-block">Logout</button>
            </nav>
          </div>
        </header>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? dataList.map((data) => {

              let desc = data.description;
              data.matched.forEach(element => {
                let descArr = desc.split(" ");
                for (let i = 0; i < descArr.length; i++) {
                  if (element === (descArr[i])) {
                    descArr[i] = "<span class='active'>" + element + "</span>";
                  }
                }
                desc = descArr.join(" ");
              });

              return (
                <tr key={data.id}>
                  <td>{parse(desc)}</td>
                  <td>{data.date}</td>
                  <td>{data.price}</td>
                </tr>
              );
            }) : <tr><td colSpan="3">No records found</td></tr>}
          </tbody>
        </table>
        <Chart searchKeyword={occurence} />
      </div >
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
