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

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <a className="navbar-brand" href="#">
            TripTab
          </a>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="navbar-collapse collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto m-0">
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
            </ul>
            {loggedIn ? (
              <section className="navbar-section">
                <Link
                  to="#"
                  className="btn btn-link text-secondary"
                  onClick={this.logout}
                >
                  <span className="text-nav">Logout</span>
                </Link>
              </section>
            ) : (
              <section className="navbar-section">
                <Link to="/" className="btn btn-link text-secondary">
                  <span className="text-secondary">home</span>
                </Link>
                <Link to="/login" className="btn btn-link text-secondary">
                  <span className="text-secondary">login</span>
                </Link>
                <Link to="/signup" className="btn btn-link">
                  <span className="text-secondary">sign up</span>
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
