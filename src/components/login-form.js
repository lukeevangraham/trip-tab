import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            redirectTo: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("handleSubmit");

        axios
            .post("/user/login", {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log("login response: ");
                console.log(response);
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    });
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: "/"
                    });
                }
            })
            .catch(error => {
                console.log("login error: ");
                console.log(error);
            });
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />;
        } else {
            return (
                <div>
                    <div className="col-xs-11 col-md-5 bg-light p-3 rounded mx-auto login-container">
                        <h4 className="mb-3 text-center">Login</h4>
                        <form className="form-horizontal">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="username">
                                    Username:
                </label>

                                <div className="col-sm-9">
                                    <input
                                        className="form-input form-control"
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="password">
                                    Password:{" "}
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-input form-control"
                                        placeholder="password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group float-right pr-3 mb-0 row">
                                <button
                                    className="btn btn-primary"
                                    onClick={this.handleSubmit}
                                    type="submit"
                                >
                                    Login
                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default LoginForm;
