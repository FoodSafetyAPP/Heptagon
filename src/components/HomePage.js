import React, { Component } from 'react';
import { connect } from 'react-redux';
import parse from "html-react-parser";
import { v4 as uuidv4 } from 'uuid';
import { history } from '../helpers/history';
import { logout } from "../store/Actions/UserActions";
import Chart from "./chart/Chart";
import axios from "axios";
import "./HomePage.css";

class HomePage extends Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      typingTimeout: 0,
      occurence: [],
      dataList: []
    };
  }

  componentDidMount() {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      history.replace("/login");
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
    const { userLogout } = this.props;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    let descstr = "";
    let countWords = [];

    const headers = {
      'Content-Type': 'application/json',
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    };
    const key_search = e.target.value.replace(/\s+/g, ' ').trim();

    this.setState({
      typingTimeout: setTimeout(() => {
        let arr = [];
        arr = e.target.value.trim() !== "" ? key_search.split(" ") : [];
        let listArr = [];

        axios
          .get('/filter/' + key_search, { headers })
          .then((res) => {
            console.log(res);
            if (res.data.success === true) {

              res.data.data.forEach(element => {
                descstr = descstr + " " + element.title;
                if (element.description !== "") {
                  Object.values(element.description).forEach(descel => {
                    descstr = descstr + " " + descel;
                  });
                }
              });
              descstr = descstr.trim();

              res.data.data.forEach(listObject => {
                let selected = [];
                arr.forEach(element => {
                  if ((this.countOccurrences(listObject.title, element) > 0) && !selected.includes(element)) {
                    selected.push(element);
                  }
                  if (listObject.description !== "") {
                    Object.values(listObject.description).forEach(descel => {
                      if ((this.countOccurrences(descel, element) > 0) && !selected.includes(element)) {
                        selected.push(element);
                      }
                    });
                  }
                });
                listArr.push({
                  ...listObject,
                  matched: selected
                });
              });
              this.setState({
                dataList: listArr
              })

              arr.forEach((element) => {
                const data = element.trim();
                const count = this.countOccurrences(descstr, data);
                countWords.push({ keyword: data, count });
                this.setState({ occurence: countWords });
              });
            }
          })
          .catch(() => {
            userLogout();
          });
      }, 1000),
    });
  }

  render() {
    const { userLogout } = this.props;
    const { occurence, dataList } = this.state;
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
              let desc_title = data.title;

              let descArr = desc_title.split(" ");
              return (
                <React.Fragment key={uuidv4()}>
                  <tr key={uuidv4()} style={{ backgroundColor: "#efeeee" }}>
                    {
                      data.matched.forEach(element => {
                        for (let i = 0; i < descArr.length; i++) {
                          if (element === (descArr[i])) {
                            descArr[i] = "<span class='active'>" + element + "</span>";
                          }
                        }
                      })
                    }
                    <td style={{ fontWeight: "bold", color: "#000" }}>{parse(descArr.join(" "))}</td>
                    <td>{data.date}</td>
                    <td>{data.score}</td>
                  </tr>

                  {
                    Object.values(desc).map(descel => {
                      let descArr = descel.split(" ");
                      data.matched.forEach(element => {
                        for (let i = 0; i < descArr.length; i++) {
                          if (element === (descArr[i])) {
                            descArr[i] = "<span class='active'>" + element + "</span>";
                          }
                        }
                      })
                      const str_descArr = descArr.join(" ");
                      return <tr key={uuidv4()}><td colSpan="3">{parse(str_descArr)}</td></tr>
                    })
                  }
                </React.Fragment>
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
};

const mapState = (state) => {
  const { auth } = state;
  return { loggedIn: auth.loggedIn };
}

export default connect(mapState, actionCreators)(HomePage);
