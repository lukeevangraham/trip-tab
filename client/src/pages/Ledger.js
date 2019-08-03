import React, { Component } from "react";
import Individualcard from "../components/individualCard";
import TotalBalanceCard from "../components/totalBalance";
import axios from "axios";

var totalOwed = 0;
var totalPaid = 0;
let totalBalance;

class Ledger extends Component {
  state = {
    owed: [],
    paid: []
  };

  componentDidMount() {
    this.getNewEvent();
  }

  getNewEvent() {
    console.log(this.props.username);

    Promise.all([
      axios.get("/user/findOwedByUserId/" + this.props.username),
      axios.get("/user/findPaidByUserId/" + this.props.username)
    ]).then(resultArray => {
      this.setState({
        ...this.state,
        owed: resultArray[0].data,
        paid: resultArray[1].data
      });
    });
  }
  setTotals() {
    totalOwed = 0;
    totalPaid = 0;
    this.state.owed.map(user => {
      return (totalOwed += user.amount);
    });
    this.state.paid.forEach(user => {
      totalPaid += user.amount;
    });

    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-11 mx-auto">
            {this.setTotals()}

            <TotalBalanceCard
              userOwes={totalOwed}
              userIsOwed={totalPaid}
              balance={totalPaid - totalOwed}
            />
            {console.log(totalOwed)}
          </div>
        </div>
        <div className="card bg-dark col-md-11 mx-auto pt-3">
          <h4 className="text-left text-light pl-2">Your Ledger: </h4>
          {console.log(this.state)}

            <table className="table table-hover">
              <tbody>
                {this.state.owed.map(user => {
                  // totalOwed += user.amount

                  return (
                    <Individualcard
                      color="danger"
                      username={user.youOwedTo}
                      amount={user.amount}
                    />
                  );
                })}
                {this.state.paid.map(user => {
                  // totalPaid += user.amount

                  console.log(totalPaid);
                  return (
                    <Individualcard
                      color="success"
                      username={user.userId}
                      amount={user.amount}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>

      </div>
    );
  }
}

export default Ledger;
