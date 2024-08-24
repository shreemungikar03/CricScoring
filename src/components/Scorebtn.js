import React from "react"

export default function Scorebtn(props) {

   
    return (
        <div className="score--btn" onClick={props.add}>
            <h2 className="score--num">{props.value}</h2>
        </div>
    )
}