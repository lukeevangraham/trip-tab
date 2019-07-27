import React, { Component } from "react";
import TotalBalanceCard from "./totalBalance";
import TripCardHome from "./tripCardHome";

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <TripCardHome tripName={"Denver"} />
        </div>
        <div className="col-md-4">
          <TotalBalanceCard userOwes={9} userIsOwed={8} />
        </div>
      </div>
    );
  }
}

export default Home;
