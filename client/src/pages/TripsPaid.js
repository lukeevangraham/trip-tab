import React, { Component } from "react";
import ReactDOM, { findDOMNode } from 'react-dom';
import axios from "axios";
// import TextInput from 'react-autocomplete-input';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

toast.configure();
class TripsPaid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventName: "",
            eventId: "",
            payerName: "",
            payeesName: "",
            amoutToBePaid: 0,
            // participantsOptions: [],
            // eventsOptions: [],
            participants: [],
            message: ""
        };
    }

    notify = (message) => {
        toast(message);
    }

    getAllExistingUsers = () => {
        axios.get("/user/allUsers/")
            .then(response => {
                let tempArray = [];
                // let tempArray = response.data
                response.data.forEach(element => {
                    let obj = {
                        value: element._id,
                        label: element.username
                    }
                    tempArray.push(obj)
                });

                this.setState({
                    participantsOptions: tempArray
                })
            })
    }

    getAllExistingEvents = () => {
        axios.get("/user/allEvents/")
            .then(response => {
                console.log("this is response.data",response.data)
                let tempArray = [];
                // let tempArray = response.data
                response.data.forEach(element => {
                    let obj = {
                        value: element._id,
                        label: element.eventName,
                        payeesName: element.payerId,
                        amoutToBePaid: element.amount/element.usersAttended.length
                    }
                    tempArray.push(obj)
                });

                this.setState({
                    eventsOptions: tempArray,
                    // payeesName: payerId,
                    // amoutToBePaid: amount
                })
            })
    }

    handleSubmit = (currentUser) => event => {
        event.preventDefault();
        const eventToInsert = {
            userId: currentUser,
            payedtoId: this.state.payeesName,
            amount: this.state.amoutToBePaid,
            eventName: this.state.eventName,
            eventId: this.state.eventId
        }
        // this.updateOwedWithPaid(currentUser);
        
        console.log(eventToInsert);
        axios.post("/user/pay", eventToInsert)
        .then(response => {
            console.log("in here")
            // console.log(response)
            this.setState({
                message: "Successfully updated"
            })
            console.log("inside handlesumbit of trips.js")
            this.notify(this.state.eventName + " has been paid.");
            this.props.history.push('/')
        })
            .catch(err => {
                this.setState({
                    message: err
                })
                console.log("inside handlesumbit of trips.js")
            })
    }

    updateOwedWithPaid = (currentUser => {
        const eventToFind = {
            userId: currentUser,
            payedtoId: this.state.payeesName,
            amount: this.state.amoutToBePaid,
            eventName: this.state.eventName,
            eventId: this.state.eventId
        }
        axios.put("/user/updateOwedWithPaid", eventToFind)
        .then(response => {
            console.log(response)
                this.notify(this.state.eventName + " has been paid.");
                this.props.history.push('/')
        })
        .catch(err => console.log(err))
    })

    isParticipantsArrayEmpty = () => {
        let returnBool = true;
        this.participant.forEach(element => {
            if (element === "") {
                returnBool = false;
                return;
            }
        });
        return returnBool;
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
        console.log(this.state.amoutToBePaid);
    }

    handleEventSelectChange = (selectedOption) => {
        // console.log(selectedOption.label);
        this.setState({ 
            eventName: selectedOption.label,
            eventId: selectedOption.value,
            payeesName: selectedOption.payeesName,
            amoutToBePaid: selectedOption.amoutToBePaid
        });
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

    componentDidMount() {
        this.getAllExistingUsers();
        this.getAllExistingEvents();
    }
    render() {
        const currentUser = this.props.currentUser
        return (
            <div className="col-xs-11 bg-light p-3 rounded col-lg-6 mx-auto text-left">
                <form>
                    <fieldset>
                        <legend className="text-center">Payoff An Event</legend>

                        <div className="form-group">
                            <label for="eventtName">Event Name</label>
                            <Select
                                name="eventName"
                                options={this.state.eventsOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={this.handleEventSelectChange}
                            />
                        </div>

                        <div>
                        <label for="payerName">Payer Name:</label>
                            <textarea
                                className="form-control mb-3"
                                id="payerName"
                                // placeholder="Dinner in Detroit"
                                value={currentUser}
                                rows="1"
                                name="eventName"
                                onChange={this.handleChangeEventInput}
                                disabled
                            />
                        </div>

                        <label for="amount">Amount</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-secondary">$</span>
                            </div>
                            <input 
                                type="number" 
                                className="form-control" 
                                // placeholder="USD"
                                value={this.state.amoutToBePaid} 
                                name="totalAmountPaid" 
                                onChange={this.handleChangeTotalAmount}
                            />
                        </div>

                        <label for="payerFirstName">Payee's name (who are you paying to?)</label>
                        <label for="payerName">Payer Name:</label>
                            <textarea
                                className="form-control mb-3"
                                id="payerName"
                                // placeholder="Dinner in Detroit"
                                value={this.state.payeesName}
                                rows="1"
                                name="eventName"
                                onChange={this.handleChangeEventInput}
                                disabled
                            />
                        <button type="submit" className="btn btn-primary float-right mt-3" onClick={this.handleSubmit(currentUser)}>
                            Submit
                        </button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default withRouter(TripsPaid);
