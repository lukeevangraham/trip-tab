import React, { Component } from "react";

function Individualcard(props) {
    return (
        <div className={"card rounded text-white bg-" + props.color}>
            <div className="row">
                <div className="col-md-1">
                    <img src={props.img} alt="Image here" />
                </div>
                <div className="col-md-4">
                    <h4> {props.username}</h4>
                </div>
                <div className="col-md-3" />
                <div className="col-md-4">
                    <h4>Amount: ${props.amount}</h4>

                </div>
            </div>
        </div>
    );
}

export default Individualcard;
