import React, { Component } from "react";
import Individualcard from "../components/individualCard";
import TotalBalanceCard from "../components/totalBalance";
import axios from "axios";

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
    console.log("click handling! ", id, payee, eventName, username)

      const eventToFind = {
        userId: username,
        payedtoName: payee,
        amount: amount,
        eventName: eventName,
        eventId: id
      }
      axios.put("/user/updateOwedWithPaid", eventToFind)
      .then(response => {
        console.log(response)
        this.notify(eventName + "has been paid.");
        this.props.history.push('/')
      })
      .catch(err => console.log(err))

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

        <div className="row">
          <div className="col-md-11 mx-auto">
            <div className="card" style={styles.oweHeader}>
              <p className="lead pl-3 text-white align-middle pt-3">
                Events you owe money for:
              </p>
              <table className="table table-hover">
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
                        username={this.props.username}
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
                <tbody>
                  {this.state.paid.map(user => {
                    // totalPaid += user.amount

                    console.log(totalPaid);
                    return (
                      <Individualcard
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
      </div>
    );
  }
}

export default Ledger;
