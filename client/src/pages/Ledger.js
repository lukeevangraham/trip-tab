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
<<<<<<< HEAD
    this.getNewEvent();
  }

  getNewEvent() {
    console.log(this.props.username);

    Promise.all([
      axios.get("/user/findOwedByUserId/" + this.props.username),
      axios.get("/user/findPaidByUserId/" + this.props.username)
=======
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
>>>>>>> 8247e469ffcf6f1242999b5dc7ddf8e4d8f96ca8
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
<<<<<<< HEAD
              userOwes={totalOwed}
              userIsOwed={totalPaid}
              balance={totalPaid - totalOwed}
=======
              userOwes={(totalOwed).toFixed(2)}
              userIsOwed={(totalPaid).toFixed(2)}
              balance={(totalPaid - totalOwed).toFixed(2)}
>>>>>>> 8247e469ffcf6f1242999b5dc7ddf8e4d8f96ca8
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
<<<<<<< HEAD
              </tbody>
            </table>
          </div>

      </div>
    );
  }
=======
                </tbody>
                </table>
            </div>
            </div>
        );
    }
>>>>>>> 8247e469ffcf6f1242999b5dc7ddf8e4d8f96ca8
}

export default Ledger;
