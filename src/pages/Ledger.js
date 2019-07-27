import React, { Component } from "react";
import Individualcard from "../components/personCard";

const users= ["David", "Luke", "Ali", "Ajay", "Others", "Other Others"];


class Ledger extends Component {


    render() {
        return(
            <div>
                <h2 className="text-left">Your Ledger: </h2>
                {users.map((user) => {
                 return  <Individualcard username={user} img="..\components\clipart401597.png"/>})}
                
            </div>
        )
    }
}

export default Ledger;