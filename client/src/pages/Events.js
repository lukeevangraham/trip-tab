import React, { Component } from "react";
import axios from "axios"
import EventCard from "../components/eventsCard"

class Events extends Component {
state = {
    events: []
}

componentDidMount() {
    this.getEvents(this.props.username);
}
componentWillReceiveProps(props) {
    this.getEvents(props.username)

}

getEvents(username) {
    axios.get("user/newEvents/" + username).then(response => { 
        this.setState({
            ...this.state,
            events: response.data
        })
    })
}

render() {
    return(
        <div>
            <h1>Events: </h1>

    <table className="table table-hover">
           
              <tbody>
               {this.state.events.map((event)=> {
                   
                   return (<EventCard username={event.userId} eventname={event.eventName} amount={event.amount} color="primary" participants={event.usersAttended} />)
               })}
                </tbody>
                </table>
                </div>
    )
}
}

export default Events;