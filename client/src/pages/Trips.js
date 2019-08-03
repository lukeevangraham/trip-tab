import React, { Component } from "react";
import ReactDOM, { findDOMNode } from 'react-dom';
import axios from "axios";
// import TextInput from 'react-autocomplete-input';
import Select from 'react-select';

class Trips extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventName: "",
            payerName: "",
            totalAmountPaid: 0,
            participantsOptions: [],
            participantOptionsPair: [],
            participants: [],
            message: ""
        };
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

    handleSubmit = (currentUser) => event => {
        event.preventDefault();
        console.log("in here")
        const eventToInsert = {
            userId: currentUser,
            payerId: this.state.payerName,
            amount: this.state.totalAmountPaid,
            eventName: this.state.eventName,
            paid: true,
            usersAttended: this.state.participants
        }
        console.log(eventToInsert);
        axios.post("/user/newEvent", eventToInsert).then(response => {
            console.log(response)
            this.setState({
                message : "Successfully updagted"
            })
            window.location.reload();
        })
        .catch(err => {
            this.setState({
                message: err
            })
        })
    }

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

    handleText = i => e => {
        let participants = [...this.state.participants]
        participants[i] = e.target.value
        this.setState({
            participants
        })
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

    handleSelectChange = (selectedOption) => {
        this.setState({ participants: selectedOption });
    }

    handlepayerSelectChange = (selectedOption) => {
        console.log(selectedOption.label);
        this.setState({ payerName: selectedOption.label });
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
                            <Select
                                name="payer"
                                options={this.state.participantsOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={this.handlepayerSelectChange}
                            />
                        </div>

                        <label for="amount">Amount</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-secondary">$</span>
                            </div>
                            <input type="number" className="form-control" placeholder="USD" name="totalAmountPaid" onChange={this.handleChangeTotalAmount} />
                        </div>


                        <label for="payerFirstName">Additional Participant First Name(s)</label>
                        <Select
                            defaultValue={[this.state.participantsOptions[2], this.state.participantsOptions[1]]}
                            isMulti
                            name="participantsList"
                            options={this.state.participantsOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={this.handleSelectChange}
                        />
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

