import React from "react";
let participants = []
function eventCard(props) {
    return (
        <div className={"card rounded text-white bg-" + props.color}>
      
      <div className="row">
        <div className="col-md-1">
          <img src={props.img} alt="Image here" />
        </div>
        <div className="col-md-2">
            <ol>

          {props.participants.map(user => {
              console.log(user);
              return (<li> {user} </li>)
            })}
            </ol>
        </div>
        <div className="col-md-2"><h3>{props.username}</h3></div>
        <div className="col-md-3" >{props.eventname}</div>
        <div className="col-md-4">
          <h4>Amount: ${props.amount}</h4>
        </div>
      </div>
    </div>
  );
}

export default eventCard;