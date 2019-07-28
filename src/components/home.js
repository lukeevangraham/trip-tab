import React, { Component } from "react";
import TotalBalanceCard from "./totalBalance";
import TripCardHome from "./tripCardHome";
import { Route, Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
  }

  render(props) {
    console.log(this.props)
    return (

      <div>

      { this.props.loggedIn ? (
        <div className="row">
        <div className="col-md-11 col-lg-5 mx-auto">
          <TripCardHome tripName={"Denver"} />
        </div>

        <div className="col-md-11 col-lg-5 mx-auto">
          <TotalBalanceCard userOwes={9} userIsOwed={8} />
        </div>
        </div>
      ) : (
        <div className="jumbotron col-lg-10 mx-auto">
  <h1 className="display-5 text-white text-left">Simplified Trip Costs</h1>
  <p className="lead text-left">Travelling with friends?  Keep track of who paid what here.</p>
  <hr className="my-4 text-left" />
  {/* <p className="text-left">It uses utility classes for typography and spacing to space content out within the larger container.</p> */}
  <p className="lead text-left">
    <Link className="btn btn-primary bg-primary btn-lg" to="/signup" role="button">Sign up</Link>
  </p>
</div>
      )}

      </div>
    );
  }
}

export default Home;
