import React from "react";
let participants = []
function eventCard(props) {
    return (
        <div className={"card rounded-0 border-top-0 border-right-0 border-left-0 p-1 text-white bg-" + props.color}>

            <div className="row">
                {/* <div className="col-md-1"> */}
                {/* <img src={props.img} alt="Image here" /> */}
                {/* </div> */}
                <div className="col-md-2">
                    <ol>

                        {props.participants.map(user => {
                            console.log(user);
                            return (<li> {user} </li>)
                        })}
                    </ol>
                </div>
                <div className="col-md-2"><p className="lead">{props.username}</p></div>
                <div className="col-md-6" ><p className="lead">{props.eventname}</p></div>
                <div className="col-md-2">
                    <p className="lead">Amount: ${props.amount}</p>
                </div>
            </div>
        </div>
    );
}

export default eventCard;