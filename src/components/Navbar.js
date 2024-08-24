import React from 'react';
import Menu from './Menu';

function Navbar(props) {

  const currentInningsBalls = props.innings ? props.balls.first : props.balls.second
  const ballToGo = currentInningsBalls%6 ? "Balls left : " + (6-currentInningsBalls%6) : ""
  return (
    <nav>
        <Menu setting={props.setting} home={props.home}/>
        <img 
                className="nav--logoicon"
                alt = "app logo"
                src= ".\cricketlogo.png"
            />
            <h3 className="nav--text">Cricket Score</h3>
        {props.matchEnd ? "" :<h6>{ballToGo}</h6>}
    </nav>
  );
}

export default Navbar;
