import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './profile';
import Booking from './booking';
import Login from './login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route key='login' exact path="/" component={Login} />
            <Route path="/profile/:userName" component={Profile} />
            <Route path="/:userName" component={Booking} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
