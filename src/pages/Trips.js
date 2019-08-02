import React, { Component } from "react";
import axios from "axios";

class Trips extends Component {
    constructor(props){
        super(props)
        this.state = {
            eventName: "",
            payerName: "",
            totalAmountPaid: 0,
            participants: []
        };
    }

    handleSubmit = (currentUser) => event => {
        event.preventDefault();
        console.log("in here")
        // if(this.state.eventName !== "" && this.state.payerName !== "" &&  this.state.participants.length !== 0 && this.isParticipantsArrayEmpty){
            const eventToInsert = {
                userId : currentUser,
                payerId: this.state.payerName,
                amount: this.state.totalAmountPaid,
                eventName: this.state.eventName,
                paid: true,
                usersAttended: this.state.participants
            }
            console.log(eventToInsert);
            axios.post("/user/newEvent", eventToInsert).then(response => {
                console.log(response)
            })
        // }

    }

    isParticipantsArrayEmpty = () => {
        let returnBool = true;
        this.participant.forEach(element => {
            if(element === ""){
                returnBool = false;
                return;
            }
        });
        return returnBool;
    }

    handleText = i => e => {
        let participants = [...this.state.participants]
        participants[i] = e.target.value
        this.setState({
            participants
        })
        console.log("check this out", this.state.participants)
    }

    handleDelete = i => e => {
        e.preventDefault()
        let participants = [
            ...this.state.participants.slice(0, i),
            ...this.state.participants.slice(i + 1)
        ]
        this.setState({
            participants
        })
    }

    addParticipant = e => {
        e.preventDefault()
        let participants = this.state.participants.concat([''])
        this.setState({
            participants
        })
    }
    handleChangeEventInput = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        this.setState({
            eventName: value
        })
    }
    handleChangePayerNameInput = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        this.setState({
            payerName: value
        })
    }

    handleChangeTotalAmount = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        this.setState({
            totalAmountPaid: value
        })
        console.log(this.state.totalAmountPaid);
    }

    render() {
        const currentUser = this.props.currentUser
        return (
            <div className="col-xs-11 bg-light p-3 rounded col-lg-6 mx-auto text-left">
                <form>
                    <fieldset>
                        <legend className="text-center">Create An Event</legend>

                        <div className="form-group">
                            <label for="eventtName">Event Name:</label>
                            <textarea
                                className="form-control mb-3"
                                id="eventName"
                                placeholder="Dinner in Detroit"
                                rows="1"
                                name="eventName"
                                onChange={this.handleChangeEventInput}
                            />
                        </div>

                        <div className="form-group">
                            <label for="payerFirstName">Payer First Name</label>
                            <textarea
                                className="form-control mb-3"
                                id="payerFirstName"
                                placeholder="John"
                                rows="1"
                                name="payerName"
                                onChange={this.handleChangePayerNameInput}
                            />
                        </div>

                        <label for="amount">Amount</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-secondary">$</span>
                            </div>
                            <input type="number" className="form-control" placeholder="USD" name="totalAmountPaid" onChange={this.handleChangeTotalAmount}/>
                        </div>


                        <label for="payerFirstName">Additional Participant First Name(s)</label>
                        <div className="mb-3">
                            {this.state.participants.map((participant, index) => (
                                <span key={index}>
                                    <input
                                        type="text"
                                        onChange={this.handleText(index)}
                                        value={participant}
                                    />
                                    <button className="btn-danger mb-2 btn-sm" onClick={this.handleDelete(index)}>X</button><br />
                                </span>
                            ))}
                            <button className="btn btn-dark text-light" onClick={this.addParticipant}>Add Participant</button>
                        </div>

                        <button type="submit" className="btn btn-primary float-right" onClick={this.handleSubmit(currentUser)}>
                            Submit
                        </button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default Trips;
