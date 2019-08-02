import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import "./navbar.css";

class Navbar extends Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout(event) {
        event.preventDefault();
        console.log("logging out");
        axios
            .post("/user/logout")
            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    this.props.updateUser({
                        loggedIn: false,
                        username: null
                    });
                }
            })
            .catch(error => {
                console.log("Logout error");
            });
    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log("navbar render, props: ");
        console.log(this.props);

        const currentUser = this.props.currentUser;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                    <a className="navbar-brand" href="/">
                        TripTab
                    </a>
                    <button
                        className="navbar-toggler collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarColor02"
                        aria-controls="navbarColor02"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="navbar-collapse collapse" id="navbarColor02">
                        <ul className="navbar-nav mr-auto m-0">
                            {loggedIn ? (
                                <div className="navbar-nav mr-auto m-0">
                                    <li className="nav-item m-0">
                                        <Link
                                            to="/"
                                            className={
                                                window.location.pathname === "/"
                                                    ? "nav-link active"
                                                    : "nav-link"
                                            }
                                        >
                                            Home <span className="sr-only">(current)</span>
                                        </Link>
                                    </li>

                                    <li className="nav-item m-0">
                                        <Link
                                            to="/trips"
                                            className={
                                                window.location.pathname === "/trips"
                                                    ? "nav-link active non-underline-link"
                                                    : "nav-link non-underline-link"
                                            }
                                        >
                                            Trips
                                        </Link>
                                    </li>
                                    <li className="nav-item m-0">
                                        <Link
                                            to="/ledger"
                                            className={
                                                window.location.pathname === "/ledger"
                                                    ? "nav-link active non-underline-link"
                                                    : "nav-link non-underline-link"
                                            }
                                        >
                                            Ledger
                                        </Link>
                                    </li>
                                </div>
                            ) : (
                                    ""
                                )}
                        </ul>

                        {loggedIn ? (
                            <ul className="navbar-nav m-0">
                                <li className="nav-item dropdown ml-auto">
                                    <Link
                                        style={{ color: "rgba(255,255,255,0.5)" }}
                                        className="nav-link dropdown-toggle text-right"
                                        to="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {currentUser}
                                    </Link>
                                    <div
                                        className="dropdown-menu"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <Link
                                            style={{ color: "rgba(255,255,255,0.5)" }}
                                            className="dropdown-item"
                                            to="#"
                                            onClick={this.logout}
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">Home</span>
                                    </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                        <span className="text-secondary">Login</span>
                                    </Link>
                                    <Link to="/signup" className="btn btn-link">
                                        <span className="text-secondary">Sign up</span>
                                    </Link>
                                </section>
                            )}
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;
