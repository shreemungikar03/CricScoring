import React from "react"

export default function Start(props) {

    const [inputValue,setInputValue] = React.useState({
        overs : "",
        wickets: "",
        team1 : "",
        team2 : ""
    })

    function changeTeamName(event){
        setInputValue(prevInputValue => {
                    return{
                        ...prevInputValue,
                        [event.target.name] : event.target.value
                    }
                })
    }
   
    return (
        <section className="main--section">
            <div className="main--input">
            <h2>{!props.updates ? "Let's PLAY" : "Settings"}</h2>
            <div className="input--box">
            <input  
                type="number" 
                required = "required"
                name = 'overs'
                id="ovr"
                value={inputValue.overs}
                onChange={changeTeamName}
                min={1}
            />
            <span>Overs</span>
            </div>

            <div className="input--box">
            <input  
                type="number" 
                required = "required"
                name = 'wickets'
                id="wic"
                value={inputValue.wickets}
                onChange={changeTeamName}
                min={1}
            />
            <span>Wickets</span>
            </div>

             <div className="input--box">   
            <input  
                type="text" 
                required = "required"
                name="team1"
                id="t1"
                value={inputValue.team1}
                onChange={changeTeamName}
            />
            <span>Team 1</span>
            </div>

             <div className="input--box">  
            <input  
                type="text" 
                required = "required"
                name="team2"
                id="t2"
                value={inputValue.team2}
                onChange={changeTeamName}
            />
            <span>Team 2</span>
            </div> 
            </div>     

            
        {!props.updates ?
            <button onClick={() => props.togglenewGame(inputValue)} className="btns">Start Match</button>

            : <div className="game--btn">
                <button onClick={props.back} className="btns">Back</button>
                <button onClick={() => props.update(inputValue)} className="btns">Continue</button>
            </div> 
        }
        </section>
    )
}