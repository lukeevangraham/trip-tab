import React, { Component } from "react";
import axios from "axios";

class Tripmaker extends Component {

    postOwed = event => {
        axios.post("/user/newEvent",{
            userId: "davidharris006",
            payerId: "the Mom",
            amount: 15,
            eventName: "crush",
            paid:false,
            usersAttended: ["hello"]
        }).then( response => {console.log(response.data);})
    }


    render() {
        return (
            <div>   
                <button onClick={this.postOwed}></button>
            </div>
        )
    }
}

export default Tripmaker;
