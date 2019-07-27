import React, { Component } from "react";
import TotalBalanceCard from "../components/totalBalance";

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    const imageStyle = {
      width: 400
    };
    return (
      <div>
        <TotalBalanceCard userOwes={9} userIsOwed={8} />
        <p>It's good to be home</p>
        <img
          style={imageStyle}
          src="https://i.ytimg.com/vi/N1icEHtgb3g/maxresdefault.jpg"
        />
      </div>
    );
  }
}

export default Home;
