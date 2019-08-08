import React, { Component } from "react";
import TotalBalanceCard from "./totalBalance";
import TripCardHome from "./tripCardHome";
import { Route, Link } from "react-router-dom";
import axios from "axios"
import logo from "./logo.png"
import { returnStatement } from "@babel/types";


let totalOwed = 0;
let totalPaid = 0;

class Home extends Component {
    state = {
        paid: [],
        owed: []
    }


    componentDidMount() {

        this.getNewEvent(this.props.username);
    }
    componentWillReceiveProps(props) {

        this.getNewEvent(props.username);
    }
    getNewEvent(username) {
        // if (this.props.username && (!this.state.owed.length || !this.state.paid.length)){
        //     return;
        // }

        console.log(username)

        Promise.all([
            axios.get("/user/findOwedByUserId/" + username),
            axios.get("/user/findYouOwedByUserId/" + username)
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

        // console.log(this.state);
    }

    render() {
        // console.log(this.props)
        return (

            <div>
                {this.setTotals()}
                {this.props.loggedIn ? (
                    <div className="row justify-content-center">
                        <div className="col-md-1" />
                        <div className="col-md-11 col-lg-5 mx-auto">
                            <TripCardHome tripName={"Denver"} />
                        </div>

                        <div className="col-md-11 col-lg-5 mx-auto">
                            <TotalBalanceCard userOwes={(totalOwed).toFixed(2)} userIsOwed={(totalPaid.toFixed(2))} balance={(totalPaid - totalOwed).toFixed(2)} />
                        </div>
                        <div className="col-md-1" />
                    </div>
                ) : (
                        <div className="row">
                            <div className="jumbotron rounded col-lg-16 mx-auto">
                                <img src={logo} height={125} width={100} />
                                <br /> <br />
                                <h1 className="display-5 text-white text-left">Simplified Trip Costs</h1>

                                <p className="lead text-left">Travelling with friends?  Keep track of who paid what here.</p>
                                <hr className="my-4 text-left" />
                                {/* <p className="text-left">It uses utility classes for typography and spacing to space content out within the larger container.</p> */}
                                <p className="lead text-left">
                                    <Link className="btn btn-primary bg-primary btn-lg" to="/signup" role="button">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

export default Home;
