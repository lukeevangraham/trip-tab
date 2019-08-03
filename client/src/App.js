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
import Trips from "./pages/Trips"

class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            username: null,

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

    getPostEvent() {
        const testEvent = {
            userId: "luke",
            payerId: "ajay",
            amount: 600,
            eventName: "Ruth's chris",
            paid: false,
            usersAttended: ["ajay", "jenny", "luke"]
        }

        axios.post("/user/newEvent/", testEvent).then(response => {
            console.log(response)
        })
    }

    postNewEvent() {
        let tripData = { userName: "someUser", tripName: "Denver" }
        axios.post("/user/newEvent", tripData)
            .then(response => {
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
                        render={() => <Home username={this.state.username} loggedIn={this.state.loggedIn} />}
                    />
                    <Route
                        path="/login"
                        render={() => <LoginForm updateUser={this.updateUser} />}
                    />
                    <Route path="/signup" render={() => <Signup />} />

                    <Route path="/ledger" render={() => <Ledger username={this.state.username} />} />
                    <Route path="/trips" render={() => <Trips owed={this.state.owed} currentUser={this.state.username} />} />
                </div>
            </div>
        );
    }
}

export default App;
