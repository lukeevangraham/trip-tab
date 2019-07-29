import React from "react";
import "./totalBalance.css"

function TripCardHome(props) {
    return (
        <div className="card text-white border-warning bg-warning  mb-3 rounded card-parent">
            {/* <div className="card-header text-left">Upcoming Trips</div> */}
            <div className="card-body text-left">
                <h4 className="card-title mb-1">Upcoming trips</h4>
                <p className="card-text pl-3">
                    {props.tripName}:
                    add expense
                </p>
            </div>
        </div>
    );
}

export default TripCardHome