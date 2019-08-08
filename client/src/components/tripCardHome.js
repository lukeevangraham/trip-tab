import React from "react";
import "./totalBalance.css";
import { Route, Link } from "react-router-dom";

function TripCardHome(props) {
  return (
    <div className="card text-white border-warning bg-warning  mb-3 rounded card-parent">
      {/* <div className="card-header text-left">Upcoming Trips</div> */}
      <div className="card-body text-left">
        <h4 className="card-title text-center mb-1">What to do?</h4>
        <div className="mx-auto text-center">
          <Link to="/trips">
            <button
              type="button"
              className="btn btn-warning bg-secondary text-white border-warning btn-circle btn-xl text-center mr-3"
            >
              Create
              <br />
              Event
            </button>
          </Link>
          <Link to="/tripsPaid">
          <button
            type="button"
            className="btn btn-warning bg-secondary text-white border-warning btn-circle btn-xl text-center mr-3"
          >
            Payoff
            <br />
            Event
          </button>
          </Link>
          <Link to="/ledger">
          <button
            type="button"
            className="btn btn-warning bg-secondary text-white border-warning btn-circle btn-xl text-center mr-3"
          >
            View
            <br />
            Ledger
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TripCardHome;
