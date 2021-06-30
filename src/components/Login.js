import React from 'react';
import { connect } from 'react-redux';
import { login } from "../store/Actions/UserActions";
import { history } from "../helpers/history";
import logo from '../assets/logo.png';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      history.push("/");
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    const { userLogin } = this.props;
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      userLogin(username, password);
    }
  }

  render() {
    const { username, password, submitted } = this.state;
    const { notify } = this.props;

    return (
      <main className="form-signin">
        {notify.message &&
          <div className={`alert ${notify.type} text-center`}>{notify.message}</div>
        }
        <form name="form" onSubmit={this.handleSubmit}>
          <img className="mb-4" src={logo} alt="logo" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">LOGIN</h1>
          <div className="form-floating">
            <input autoComplete="off" type="text" className="form-control" id="username" name="username" placeholder="name@example.com" onChange={this.handleChange} />
            <label htmlFor="username">Username</label>
            {submitted && !username &&
              <div className="help-block">Username is required</div>
            }
          </div>
          <div className="form-floating">
            <input autoComplete="off" type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={this.handleChange} />
            <label htmlFor="password">Password</label>
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
        <div className="alert alert-success login_det" role="alert">
          <p>Username: admin</p>
          <p>Password: password</p>
        </div>
      </main>
    );
  }
}

const actionCreators = {
  userLogin: login
};

const mapState = (state) => {
  const { notify, auth } = state;
  return { notify, loggedIn: auth.loggedIn };
}

export default connect(mapState, actionCreators)(Login);