import React, { Component } from "react";
import TotalBalanceCard from "../components/totalBalance";

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <TotalBalanceCard userOwes={9} userIsOwed={8} />
  
      </div>
    );
  }
}

export default Home;
