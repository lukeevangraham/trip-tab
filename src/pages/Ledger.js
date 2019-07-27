import React, { Component } from "react";
import Individualcard from "../components/personCard";
import TotalBalanceCard from "../components/totalBalance"

const users= ["David", "Luke", "Ali", "Ajay", "Others", "Other Others"];


class Ledger extends Component {


    render() {
        return(
            <div>
            <div className="row">
                
                <div className="col-md-4 center">
                    </div>
                <div className="col-md-4~ center">

                <TotalBalanceCard />    
                </div>
                
                <div className="col-md-4~ center">
                    </div>
                    </div>
                <h2 className="text-left">Your Ledger: </h2>
                {users.map((user) => {
                 return  <Individualcard username={user} img="..\components\clipart401597.png"/>})}
                
            </div>
        )
    }
}

export default Ledger;