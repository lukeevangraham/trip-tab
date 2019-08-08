import React, { Component } from "react";
import Individualcard from "../components/individualCard";
import TotalBalanceCard from "../components/totalBalance";
import OwedToYou from "../components/owedToYou";
import axios from "axios";
import { Table } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

var totalOwed = 0;
var totalPaid = 0;
let totalBalance;

const styles = {
  oweHeader: {
    backgroundColor: "#8C0000"
  },
  oweHeader2: {
    backgroundColor: "#4C7300"
  }
};

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

  handleClick = (id, payee, eventName, username, amount) => {
    console.log("click handling! ", id, payee, eventName, username);

    const eventToUpdate = {
      userId: username,
      payedtoId: payee,
      amount: amount,
      eventName: eventName,
      eventId: id
    };

    console.log(eventToUpdate);
    axios
      .post("/user/pay", eventToUpdate)
      .then(response => {
        console.log("there goes payment!");
        this.notify(eventName + "has been paid.");
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  notify = message => {
    toast(message);
  };

  render() {
    return (
      <div>
        <h4 className="text-center mb-3">{this.props.username}'s Ledger:</h4>
        {console.log(this.state)}

        <div className="row">
          <div className="col-md-11 mx-auto">
            <div className="card" style={styles.oweHeader}>
              <p className="lead pl-3 text-white align-middle pt-3">
                Events you owe money for:
              </p>
              <table className="table table-hover">
                <thead>
                  <tr className="text-white">
                    <th scope="col">Payee</th>
                    <th scope="col">Event</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.owed.map(user => {
                    // totalOwed += user.amount

                    return (
                      <Individualcard
                        onClick={this.handleClick}
                        color="danger"
                        payee={user.youOwedTo}
                        amount={user.amount}
                        eventName={user.eventName}
                        eventId={user.eventId}
                      // username={this.props.username}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="card mt-4 mb-4" style={styles.oweHeader2}>
              <p className="lead pl-3 align-middle pt-3 text-white">
                Events others owe you for:
              </p>
              <table className="table table-hover">
                <thead>
                  <tr className={"text-white table-"}>
                    {/* <th scope="row"><i class="p-2 fas fa-user" /></th> */}
                    <th scope="col">Participant(s)</th>
                    <th scope="col">Event Name</th>
                    <th scope="col">Amount</th>
                  </tr>
                  </thead>
                <tbody>
                  {this.state.paid.map(user => {
                    // totalPaid += user.amount

                    console.log(totalPaid);
                    return (
                      <OwedToYou
                        color="success"
                        username={user.userId}
                        amount={user.amount}
                        eventName={user.eventName}
                        eventId={user.eventId}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
      </div>
    );
  }
}

export default Ledger;
