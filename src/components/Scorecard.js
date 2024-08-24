import React from 'react';

function Scorecard(props) {
    const styles = {
        color : props.innings ? "#043873" : "grey" 
    }

    let name = props.teamName
    if(name === "")
      name = "Team " + props.team
  
    return (
    <div style = {styles} className='team--score'>

      {name}
      <div className='runs--balls'>{props.runs}/{props.wickets} </div>
      {Math.floor(props.balls/6)}.{props.balls%6} ({props.playLimit.ovr})

    </div>
  );
}

export default Scorecard;
