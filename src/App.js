import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/Login';
import HomePage from "./components/HomePage";

class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Redirect from="*" to="/" />
      </Switch>
    );
  }
}



export default App;
