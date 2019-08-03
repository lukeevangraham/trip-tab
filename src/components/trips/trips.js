import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input';
import Spacer from 'react-add-space';
import TripFormCard from "../tripFormCard"
import TotalBalanceCard from "../totalBalance";
import "../totalBalance.css"


// import Geosuggest from 'react-geosuggest';
// import "./trips.css"

class Trips extends React.Component {
    state = {
        newParticipant: [{ owed: "", paid: "" }],
    }

    handleChange = (e) => {
        if (["owed", "paid"].includes(e.target.classowed)) {
            let newParticipant = [...this.state.newParticipant]
            newParticipant[e.target.dataset.id][e.target.classowed] = e.target.value.toUpperCase()
            this.setState({ newParticipant }, () => console.log(this.state.newParticipant))
            // this.deleteState({ newParticipant }, () => console.log(this.state.newParticipant))
        } else {
            this.setState({ [e.target.newParticipant]: e.target.value.toUpperCase() })
            // this.deleteState({[e.target.deleteParticipant]: e.target.value(null)})
        }
    }
    addNewParticipant = (e) => {
        this.setState((prevState) => ({
            newParticipant: [...prevState.newParticipant, { owed: "", paid: "" }],
        }));
    }

    // // deleteParticipant(e) {
    // //     this.deleteState((prevState) => ({
    // //         deleteParticipant: [...prevState.deleteParticipant, { owed: null, paid: null }],
    // //     }));
    // }
    handleSubmit = (e) => { e.preventDefault() }

    render() {

        let { owed, newParticipant } = this.state
        // let {deleteParticipant} = this.deleteState
        return (
            <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                <div className="row">
                    <div className="col-md-11 col-lg-5 mx-auto">
                        <TripFormCard tripName={"Name of Event"} />
                        <button type="button" class="btn btn-primary" onClick={this.addNewParticipant}>+Participant</button>
                        <Spacer amount={3} />
                        <button type="button" class="btn btn-warning" onClick={this.deleteParticipant}>Delete Participant</button>
                        <br /><br />
                    </div><br />

                    {

                        newParticipant.map((val, idx) => {
                            let newParticipantId = `newParticipant-${idx}`, paidId = `paid-${idx}`;

                            return (
                                <div className="col-md-11 col-lg-5 mx-auto" key={idx}>

                                    <TotalBalanceCard userOwes={9} userIsOwed={8} />


                                    <label htmlFor={newParticipantId}>{`Name of Participant #${idx + 1}`}</label>
                                    <input
                                        type="text"
                                        owed={newParticipantId}
                                        data-id={idx}
                                        id={newParticipantId}
                                        // value={newParticipant[idx].owed}
                                        onChange={this.handleChange}
                                    /><br /><br />
                                    <label htmlFor={paidId}>Amount Owed</label>
                                    <CurrencyInput
                                        prefix="$"
                                        precision="2"
                                        ref="myinput"
                                        owed={paidId}
                                        data-id={idx}
                                        id={paidId}
                                        // value={newParticipant[idx].paid}
                                        classowed="owed"
                                    />
                                    <br /><br />
                                    <label htmlFor={paidId}>Amount Paid</label>
                                    <CurrencyInput
                                        prefix="$"
                                        precision="2"
                                        ref="myinput"
                                        owed={paidId}
                                        data-id={idx}
                                        id={paidId}
                                        // value={newParticipant[idx].paid}
                                        value="-20"
                                        classowed="owed"
                                    // value={this.props.searchString}
                                    // onChange={this.handleChange}
                                    />
                                    <br /><br />
                                    <button type="button" class="btn btn-primary" onClick={this.addNewParticipant}>+Participant</button>
                                    <Spacer amount={3} />
                                    <button type="button" class="btn btn-warning" onClick={this.deleteParticipant}>Delete Participant</button>
                                    <br /><br />
                                </div>

                            )
                        })
                    }
                </div>
                <br /><br />
                <input class="btn btn-info btn-lg" type="submit" value="SUBMIT" />
                <br /><br />
            </form>
        )
    }
}
export default Trips
