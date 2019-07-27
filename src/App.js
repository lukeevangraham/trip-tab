import React, { Component } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
// components
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Home from './components/home'
import Home2 from './components/home2'
import Ledger from "./pages/Ledger"
import Trips from "./components/trips"

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
    this.getNewEvent()
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getNewEvent(){
    axios.get("/user/newEvent").then( response => {
      console.log(response.data)
    })
  }

  getUser() {
    axios.get("/user/").then(response => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <div className="container-fluid">

     
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
            />
        <Route
          path="/signup"
          render={() =>
            <Signup/>}
            />
        <Route
          path="/ledger"
          render={() =>
            <Ledger />}
            />
            <Route
          path="/trips"
          render={() =>
            <Trips />}
            />

            </div>
      </div>
    );
  }
}

export default App;