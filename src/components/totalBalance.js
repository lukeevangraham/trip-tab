import React from "react";
import "./totalBalance.css"

function TotalBalanceCard(props) {
    return (
        <div className="card text-white bg-primary border-primary mb-3 rounded card-parent">
            {/* <div className="card-header text-left">Total Balance</div> */}
            <div className="card-body text-left">
                <h4 className="card-title mb-1">Total Balance</h4>
                <p className="card-text pl-3">
                    You owe: {props.userOwes} <br />
                    You are owed: {props.userIsOwed}
                </p>
            </div>
        </div>
    );
}

export default TotalBalanceCard