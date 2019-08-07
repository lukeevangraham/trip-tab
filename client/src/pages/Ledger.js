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
    this.getNewEvent(this.props.username);
  }
  componentWillReceiveProps(props) {
    this.getNewEvent(props.username);
  }

  getNewEvent(username) {
    console.log(this.props.username);

    Promise.all([
      axios.get("/user/findOwedByUserId/" + username),
      axios.get("/user/findYouOwedByUserId/" + username)
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
              userOwes={totalOwed.toFixed(2)}
              userIsOwed={totalPaid.toFixed(2)}
              balance={(totalPaid - totalOwed).toFixed(2)}
            />
            {console.log(totalOwed)}
          </div>
        </div>
        {console.log(this.state)}

        <div className="card bg-danger">
          <p className="lead text-white pl-3 align-middle pt-3">
            Events you owe money for:
          </p>
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
            </tbody>
          </table>
        </div>

        <div className="card bg-success mt-4 mb-4">
          <p className="lead pl-3 align-middle pt-3 text-white">
            Events you owe money for:
          </p>
          <table className="table table-hover">
            <tbody>
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
