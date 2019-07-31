import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input';
import { Form, Button, Container, Row, Col, Input } from 'reactstrap';
// import Geosuggest from 'react-geosuggest';
import "./trips.css"

class Trips extends React.Component {
    state = {
        newParticipant: [{ owed: "", paid: "" }],

    }

    // deleteState = {
    //     deleteParticipant: [{ owed: null, paid: null }]
    // }

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
                <p>Trip Information</p>
                <label>Name of Event:</label>
                <input
                    type="text"
                    value={this.props.searchString}
                    ref="searchStringInput"
                    onChange={this.handleChange} />
                <br /><br />
                <label>Date</label>
                <input
                    type="date"
                    value={this.props.searchString}
                    ref="searchStringInput"
                    onChange={this.handleChange}
                />
                <br /><br />
                <label>Location</label>
                <input
                    type="text"
                    value={this.props.searchString}
                    ref="searchStringInput"
                    onChange={this.handleChange} />
                <select>
                    <option value=""></option>
                    <option value="1">AL</option>
                    <option value="2">AK</option>
                    <option value="3">AZ</option>
                    <option value="4">AK</option>
                    <option value="5">CA</option>
                    <option value="6">CO</option>
                    <option value="7">CT</option>
                    <option value="8">DE</option>
                    <option value="9">FL</option>
                    <option value="10">GA</option>
                    <option value="11">HI</option>
                    <option value="12">ID</option>
                    <option value="13">IL</option>
                    <option value="14">IN</option>
                    <option value="15">IA</option>
                    <option value="16">KA</option>
                    <option value="17">KY</option>
                    <option value="18">LA</option>
                    <option value="19">ME</option>
                    <option value="20">MD</option>
                    <option value="21">MA</option>
                    <option value="22">MI</option>
                    <option value="23">MN</option>
                    <option value="24">MS</option>
                    <option value="25">MO</option>
                    <option value="26">MT</option>
                    <option value="27">NE</option>
                    <option value="28">NV</option>
                    <option value="29">NH</option>
                    <option value="30">NJ</option>
                    <option value="31">NM</option>
                    <option value="32">NY</option>
                    <option value="33">NC</option>
                    <option value="34">ND</option>
                    <option value="35">OH</option>
                    <option value="36">OK</option>
                    <option value="37">OR</option>
                    <option value="38">PA</option>
                    <option value="39">RI</option>
                    <option value="40">SC</option>
                    <option value="41">SD</option>
                    <option value="42">TN</option>
                    <option value="43">TX</option>
                    <option value="44">UT</option>
                    <option value="45">VT</option>
                    <option value="46">VA</option>
                    <option value="47">WA</option>
                    <option value="48">WV</option>
                    <option value="49">WI</option>
                    <option value="50">WY</option>
                </select>
                <br /><br />
                {
                    newParticipant.map((val, idx) => {
                        let newParticipantId = `newParticipant-${idx}`, paidId = `paid-${idx}`
                        return (
                            <Container key={idx}>

                                <label htmlFor={newParticipantId}>{`Name of Participant #${idx + 1}`}</label>
                                <input
                                    type="text"
                                    owed={newParticipantId}
                                    data-id={idx}
                                    id={newParticipantId}
                                    value={newParticipant[idx].owed}
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
                                // value={this.props.searchString}
                                // onChange={this.handleChange}
                                />
                                <br /><br />
                                <button id="add" onClick={this.addNewParticipant}>+Participant</button>
                                <button id="remove" onClick={this.deleteParticipant}>Delete Participant</button>
                                <br /><br />
                            </Container>
                        )
                    })
                }
                <input id="submit" type="submit" value="SUBMIT" />
            </form>
        )
    }
}
export default Trips
