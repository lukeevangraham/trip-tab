import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input';
import { Form, Button, Container, Row, Col, Input } from 'reactstrap';
import "./trips.css"

class Trips extends React.Component {
    state = {
        newParticipant: [{ owed: "", paid: "" }],
        owed: "",
    }
    handleChange = (e) => {
        if (["owed", "paid"].includes(e.target.classowed)) {
            let newParticipant = [...this.state.newParticipant]
            newParticipant[e.target.dataset.id][e.target.classowed] = e.target.value.toUpperCase()
            this.setState({ newParticipant }, () => console.log(this.state.newParticipant))
        } else {
            this.setState({ [e.target.owed]: e.target.value.toUpperCase() })
        }
    }
    addNewParticipant = (e) => {
        this.setState((prevState) => ({
            newParticipant: [...prevState.newParticipant, { owed: "", paid: "" }],
        }));
    }
    handleSubmit = (e) => { e.preventDefault() }
    render() {
        let { owed, newParticipant } = this.state
        return (
            <form onSubmit={this.handleSubmit} onChange={this.handleChange} >

                {/* <input type="text" owed="" id="" value={} /> */}

                {
                    newParticipant.map((val, idx) => {
                        let newParticipantId = `newParticipant-${idx}`, paidId = `paid-${idx}`
                        return (
                            <div key={idx}>
                                <label htmlFor={newParticipantId}>{`Participant #${idx + 1}`}</label>
                                <input
                                    type="text"
                                    owed={newParticipantId}
                                    data-id={idx}
                                    id={newParticipantId}
                                    value={newParticipant[idx].owed}

                                /><br /><br />
                                <label htmlFor={paidId}>Amount Owed</label>
                                <CurrencyInput
                                    prefix="$"
                                    precision="2"
                                    ref="myinput"
                                    owed={paidId}
                                    data-id={idx}
                                    id={paidId}
                                    value={newParticipant[idx].paid}
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
                                    value={newParticipant[idx].paid}
                                    classowed="paid"
                                />
                                <br /><br />
                                <button onClick={this.addNewParticipant}>+Participant</button>
                                <br /><br />
                            </div>
                        )
                    })
                }
                <input type="submit" value="Submit" />
            </form>
        )
    }
}
export default Trips