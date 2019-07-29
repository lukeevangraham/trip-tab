import React from "react";
import "./totalBalance.css";

function TripCardHome(props) {

  return (
    <div className="card text-white border-warning bg-warning  mb-3 rounded card-parent">
      {/* <div className="card-header text-left">Upcoming Trips</div> */}
      <div className="card-body text-left">
        <h4 className="card-title mb-1">Upcoming trips</h4>
        <p className="card-text mt-3 pl-3 align-top ">{props.tripName}:  <button
          type="button"
          className="btn btn-warning bg-secondary text-white border-warning btn-circle btn-xl text-center"
        >
          Add<br/>Expense
        </button></p>
        
      </div>
    </div>
  );
}

export default TripCardHome;
