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

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      owed:[]
    };

        this.getUser = this.getUser.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        this.getUser()
        // this.getNewEvent()
        this.getPostEvent();
    }

    updateUser(userObject) {
        this.setState(userObject);
    }

  getNewEvent(){
    axios.get("/user/findOwedByUserId/"+ "blahblah").then( response => {
      this.setState ({
        ...this.state,
        owed: response.data
      })
      console.log("here");
      console.log(this.state);
    })
  }

  getPostEvent(){
    const testEvent= {
        userId: "ajay",
        payerId: "luke",
        amount: 300,
        eventName: "Snowboarding tickets",
        paid: false,
        usersAttended: ["ajay", "jenny", "luke"]
    }

    axios.post("/user/newEvent/", testEvent).then(response => {
        console.log(response)
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
        <Navbar
          updateUser={this.updateUser}
          loggedIn={this.state.loggedIn}
          currentUser={this.state.username}
        />
        <div className="container-fluid">
          {/* Routes to different components */}
          <Route
            exact
            path="/"
            render={() => <Home loggedIn={this.state.loggedIn} />}
          />
          <Route
            path="/login"
            render={() => <LoginForm updateUser={this.updateUser} />}
          />
          <Route path="/signup" render={() => <Signup />} />
          <Route path="/ledger" render={() => <Ledger owed={this.state.owed}/>} />
        </div>
      </div>
    );
  }
}

export default App;
