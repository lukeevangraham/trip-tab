import React, { Component } from "react";
import Individualcard from "../components/individualCard";
import TotalBalanceCard from "../components/totalBalance";
import axios from "axios"


var totalOwed = 0;
var totalPaid = 0;
let totalBalance;


class Ledger extends Component {
    state = {
        owed: [],
        paid: []

    }

    componentDidMount() {

        this.getNewEvent()

    }



    getNewEvent() {
        console.log(this.props.username)

        Promise.all([
            axios.get("/user/findOwedByUserId/" + this.props.username),
            axios.get("/user/findPaidByUserId/" + this.props.username)
        ])
            .then(resultArray => {
                this.setState({
                    ...this.state,
                    owed: resultArray[0].data,
                    paid: resultArray[1].data
                })


            });



    }
    setTotals() {
        totalOwed = 0;
        totalPaid = 0;
        this.state.owed.map(user => {
            return totalOwed += user.amount
        })
        this.state.paid.forEach(user => {
            totalPaid += user.amount
        })

        console.log(this.state);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-5" />
                    <div className="col-md-2">

                        {this.setTotals()}

                        <TotalBalanceCard userOwes={totalOwed} userIsOwed={totalPaid} balance={totalPaid - totalOwed} />
                        {console.log(totalOwed)}
                    </div>

                    <div className="col-md-5" />
                </div>
                <h2 className="text-left">Your Ledger: </h2>
                {console.log(this.state)}
                {this.state.owed.map(user => {
                    // totalOwed += user.amount

                    return (
                        <Individualcard
                            color="danger"
                            username={user.youOwedTo}
                            amount={user.amount}
                            img={user.img}
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
                            img={user.img}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Ledger;

