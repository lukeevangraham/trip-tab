import React, { Component } from "react";

const styles = {
    cardStyle: {
        borderRadius: 0
    }
};

function Individualcard(props) {
    return (
        <div className={"card text-white bg-" + props.color} style={styles.cardStyle}>
            <div className="row">
                <div className="col-md-1">
                    {/* <img src={props.img} alt="Image here" /> */}
                    <i class="p-2 fas fa-user" />
                </div>
                <div className="col-md-4 p-2">
                     {props.username}
                </div>
                <div className="col-md-3" />
                <div className="col-md-4 p-2">
                    Amount: ${props.amount}

                </div>
            </div>
        </div>
    );
}

export default Individualcard;
