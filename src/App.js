import swal from 'sweetalert';
import Confetti from "react-confetti"
import Navbar from './components/Navbar';
import Scorebtn from './components/Scorebtn';
import Scorecard from './components/Scorecard';
import History from './components/History';
import Start from './components/Start';
import React, { useRef } from 'react';

// Task 1: num>18 Showing only last 18 balls in history ==> SOLVED 
// Task 2: Wd/Nb on first delivery of over "|" occuring  ==> SOLVED
// Task 3: Proper Design ==> DONE
// Task 4: Responsive ==> TBD
// Task 5: Front Page ==> DONE
// Task 6: Undo button ==> DONE
// Task 7: New Match btn ==> DONE
// Task 8: Dark Theme ==> NO NEED
// Task 9: Alert Not on Start ==> NOT IMP
// Task 10: Animated input tags ==> DONE
// Task 11: Max overs and wickets ==> DONE
// Task 12: Match Finish Confetti ==> DONE
// Task 13: Runs Required to Win ==> DONE
// Task 14: On this Stage ==> DONE
// Task 15: Change Match Settings ==> DONE 
// Task 16: Button no.10 ==> DONE
// Task 17: Styling Swal


function App() {

  const [balls,setBalls] = React.useState({first:0,second:0})
  const [runs,setRuns] = React.useState({first:0,second:0})
  const [wickets,setWickets] = React.useState({first:0,second:0})
  const [innings,setInnings] = React.useState(true)
  const [overs,setOvers] = React.useState([])
  const [savePreviousRuns,setSavePreviousRuns] = React.useState([])
  const [savePreviousWickets,setSavePreviousWickets] = React.useState([])
  const [currentBalls,setCurrentBalls]  = React.useState("")
  const [newGame,setnewGame] = React.useState(true)
  const [teamName,setteamName] = React.useState({first:"Team 1",second:"Team 2"})
  const [undoOn,setUndoOn] = React.useState(true)
  const [playLimit,setPlayLimit] = React.useState({ovr:1,wic:2})
  const [matchEnd,setMatchEnd] = React.useState(false)
  const [updates,setUpdates] = React.useState(false)
  const [lastBall,setLastBall] = React.useState("")
  const [plus,setPlus] = React.useState(0)
  const [startExtra,setStartExtra] = React.useState("")


  const num_ball = innings ? balls.first : balls.second
  const winningLine = useRef(null)
  const requiredCondition = " runs to win in "


  React.useEffect(() => {

    if(currentBalls==='+' && (startExtra==='Wd' || startExtra==='Nb' || lastBall==='+') && undoOn===true)
    {
      setOvers(prevOvers => ([...prevOvers, `${startExtra}${plus}`]))
    }
    
    else if(currentBalls!== '+' && undoOn===true)
    {  
      setPlus(0)
      setOvers(prevOvers => ([...prevOvers, (num_ball%6) ? currentBalls + " " 
                                          : ((currentBalls==='Wd'|| currentBalls==='Nb' || currentBalls === "") ? currentBalls + " " 
                                              : currentBalls + " | ")]))
                                              
    }
              
  }, // eslint-disable-next-line
  [num_ball,runs,undoOn])

  React.useEffect(()=>{
    setOvers([])
  },[innings])

  React.useEffect(()=>{

    const line = " won the match"
    const wicDiff = playLimit.wic - wickets.second
    const runDiff = runs.first - runs.second

    if(innings===true && (balls.first===(playLimit.ovr*6) || wickets.first===playLimit.wic)){
      //setChange(true)
      changeInnings()
    }

    if(balls.second===(playLimit.ovr*6) || wickets.second===playLimit.wic){
      setMatchEnd(true)

      if(runs.first===runs.second)
      winningLine.current = "Match Tied"
      else
      winningLine.current = teamName.first + line + " by " + runDiff + ((runDiff===1) ? (" Run") : (" Runs"))
    }

    if(runs.second > runs.first){
        setMatchEnd(true)
        winningLine.current = teamName.second + line + " by " + wicDiff + ((wicDiff===1) ? (" Wicket") : (" Wickets"))
    }


  },// eslint-disable-next-line
  [balls,wickets,runs])

  React.useEffect(()=>{

    if(!updates)
    {
      setBalls({first:0,second:0})
      setRuns({first:0,second:0})
      setWickets({first:0,second:0})
      setOvers([])
      setSavePreviousRuns([])
      setSavePreviousWickets([])
      setCurrentBalls("")
      setInnings(true)
    }

  },[newGame,updates])

  React.useEffect(()=>{

    if(innings && currentBalls!=='Wd' && currentBalls!=='Nb' && currentBalls!=='+')
      setSavePreviousRuns(prevSavedRuns =>{
        return[
          ...prevSavedRuns, runs.first
        ]
      } )

      if(innings && currentBalls!=='Wd' && currentBalls!=='Nb' && currentBalls!=='+')
        setSavePreviousWickets(prevSavedWickets =>{
          return[
            ...prevSavedWickets, wickets.first
          ]
        } )

  },[innings,balls,runs,wickets,currentBalls])


  
  function add(run,event){

      if(run===0)
      event = '.'

      setLastBall(currentBalls)
      setCurrentBalls(event)
      setBalls(prevBalls => (innings ? { ...prevBalls , first : prevBalls.first + 1} 
                            : { ...prevBalls , second : prevBalls.second + 1}))

      if(run<=4){
      setRuns(prevRuns => (innings ? { ...prevRuns , first : prevRuns.first + run} 
                          : { ...prevRuns , second : prevRuns.second + run})) 
      }
      else if (run===5){
      setRuns(prevRuns => (innings ? { ...prevRuns , first : prevRuns.first + 6} 
                          : { ...prevRuns , second : prevRuns.second + 6}))
      }
      else if (run===6){
      setWickets(prevWickets => (innings ? { ...prevWickets , first : prevWickets.first + 1} 
                                : { ...prevWickets , second : prevWickets.second + 1} ))
      }
      else if (run===7 || run===8)
      { 
        setBalls(prevBalls => (innings ? { ...prevBalls , first : prevBalls.first - 1} 
                              : { ...prevBalls , second : prevBalls.second - 1}))
        setRuns(prevRuns => (innings ? { ...prevRuns , first : prevRuns.first + 1} 
                            : { ...prevRuns , second : prevRuns.second + 1}))
      }
      else if(run===9 && (currentBalls==='.' || currentBalls===1 || currentBalls===2 || currentBalls===3 || currentBalls===4 || currentBalls===6 || currentBalls==='W' ))
      {
        setBalls(prevBalls => (innings ? { ...prevBalls , first : prevBalls.first - 1} 
          : { ...prevBalls , second : prevBalls.second - 1}))
        swal('INVALID')
      }
      else if(run===9 )
      {
        if(currentBalls==='Wd' || currentBalls==='Nb')
        setStartExtra(currentBalls)

        setPlus(prevPlus => prevPlus + 1)
   
        setBalls(prevBalls => (innings ? { ...prevBalls , first : prevBalls.first - 1} 
          : { ...prevBalls , second : prevBalls.second - 1}))
        setRuns(prevRuns => (innings ? { ...prevRuns , first : prevRuns.first + 1} 
          : { ...prevRuns , second : prevRuns.second + 1}))

          overs.pop()
      }

      setUndoOn(true)


  }

  function buttonClicked(val){

    if(val<=4 )
        return val
    else if(val === 5)
        return 6
    else if(val === 6)
        return 'W'
    else if(val === 7)
        return 'Wd'
    else if(val === 8)
        return 'Nb'
    else
        return '+'
}

  function changeInnings(){
    setInnings(prevInnings => !prevInnings)
  }

  function togglenewGame(val){
    

    swal({
      title: "Do you want to start a NEW GAME",
      icon: "warning",
      buttons: ["No","Yes"]
    })
    .then((willDelete) => {
      if (willDelete) {
        gameSetting(val)
        setnewGame(prevGame => !prevGame)
        setUpdates(false)

        if(val.team1!=="" && val.team2!=="")
        setteamName({first : val.team1 , second : val.team2})

        setMatchEnd(false)
      }
    });

  }

  function gameSetting(val){
    if(val.overs!=="" && val.wickets!=="")
      setPlayLimit({ovr:parseInt(val.overs),wic:parseInt(val.wickets)})
    else if(val.overs==="" && val.wickets!=="")
    {
      setPlayLimit(prevPlayLimit => {
        return{
          ...prevPlayLimit,
          wic : parseInt(val.wickets)
        }
      })
    }
    else if(val.overs!=="" && val.wickets==="")
      {
        setPlayLimit(prevPlayLimit => {
          return{
            ...prevPlayLimit,
            ovr : parseInt(val.overs)
          }
        })
      } 
  }

  function undo(){

    if(undoOn && currentBalls!=="" && num_ball!==0)
    {
      setUndoOn(false)

    setBalls(prevBalls => (innings ? { ...prevBalls , first : prevBalls.first - 1} 
      : { ...prevBalls , second : prevBalls.second - 1}))

    if(parseInt(currentBalls)<=4){
    setRuns(prevRuns => (innings ? { ...prevRuns , first : prevRuns.first - parseInt(currentBalls)} 
        : { ...prevRuns , second : prevRuns.second - parseInt(currentBalls)})) 
    }
    else if (parseInt(currentBalls)===6){
    setRuns(prevRuns => (innings ? { ...prevRuns , first : prevRuns.first - 6} 
        : { ...prevRuns , second : prevRuns.second - 6}))
    }
    else if (currentBalls==='W'){
    setWickets(prevWickets => (innings ? { ...prevWickets , first : prevWickets.first - 1} 
              : { ...prevWickets , second : prevWickets.second - 1} ))
    }
    else if (currentBalls==='Wd' || currentBalls==='Nb')
    { 
      setBalls(prevBalls => (innings ? { ...prevBalls , first : prevBalls.first + 1} 
              : { ...prevBalls , second : prevBalls.second + 1}))
      setRuns(prevRuns => (innings ? { ...prevRuns , first : prevRuns.first - 1} 
              : { ...prevRuns , second : prevRuns.second - 1}))
    }
    else if(currentBalls==='+' && plus!==0)
    {
      setBalls(prevBalls => (innings ? { ...prevBalls , first : prevBalls.first + 1} 
        : { ...prevBalls , second : prevBalls.second + 1}))
      setRuns(prevRuns => (innings ? { ...prevRuns , first : prevRuns.first - (plus+1)} 
        : { ...prevRuns , second : prevRuns.second - (plus+1)}))
    }
    else if(currentBalls==='+' && plus===0)
    {
      overs.push(lastBall)
      setBalls(prevBalls => (innings ? { ...prevBalls , first : prevBalls.first + 1} 
        : { ...prevBalls , second : prevBalls.second + 1}))  
    }

      overs.pop()
      setMatchEnd(false)

    }
  }

  function home(){
    setnewGame(true)
    setUpdates(false)
  }

  function setting(){
    if(!newGame && !matchEnd)
    {
      setUpdates(true)
      setnewGame(prevGame => !prevGame)
    }
  }

  function update(val){
    gameSetting(val)

    if(val.team1!=="" && val.team2!=="")
    setteamName({first : val.team1 , second : val.team2})

    setnewGame(prevGame => !prevGame)
  }

  function back(){
    setnewGame(prevGame => !prevGame)
  }

  function stats(){
    if(!innings && !matchEnd)
      swal(`Required RR: ${(((runs.first-runs.second+1)/(playLimit.ovr*6 - balls.second))*6).toFixed(2)}
            At this Stage : ${teamName.first} were ${balls.second<balls.first ? savePreviousRuns[balls.second] : runs.first}/${balls.second<balls.first ? savePreviousWickets[balls.second] : wickets.first}`)

    if(innings && !matchEnd && balls.first)
      swal(`Current RR: ${(((runs.first)/(balls.first))*6).toFixed(2)}`)

  }


  const newBtn = []
        for (let i = 0; i < 10; i++) {
            newBtn.push({
              value : buttonClicked(i),
              key : (i)
            })
        }

  const scoreElements = newBtn.map(block => (
    <Scorebtn 
        key = {block.key+1}
        value={block.value}
        add={() => add(block.key,block.value)} 
    />
))

  return (
    <main className="App">
      {matchEnd && <Confetti />}
      <Navbar 
          balls={balls} 
          innings={innings} 
          setting = {setting}
          matchEnd = {matchEnd}
          home = {home}
       />
       
       <div class="scrolling-text">
        {/* eslint-disable-next-line */}
          <marquee>{(!innings && !matchEnd) ? (teamName.second) + " need " + (runs.first-runs.second+1) + requiredCondition 
                                        + (playLimit.ovr*6 - balls.second) + " Balls"
                  : " "}</marquee>
        </div>
       { newGame 
                ?
              <section>
                <Start 
                  togglenewGame = {togglenewGame} 
                  updates={updates} 
                  update={update}
                  back = {back}
                />
              </section>
              :
        
        <section className='main--section'>
         
          <div className='main--teams'>
            {<Scorecard
              key = {1}
              team ={1}
              teamName = {teamName.first}
              runs = {runs.first}
              wickets = {wickets.first}
              balls = {balls.first}
              innings = {innings}
              playLimit = {playLimit}
            />}
            <img src='info.jpeg' className='undo--img' onClick={stats} alt='info'/>
            {<Scorecard
              key = {2}
              team = {2}
              teamName = {teamName.second}
              runs = {runs.second}
              wickets = {wickets.second}
              balls = {balls.second}
              innings = {!innings}
              playLimit = {playLimit}
            />}
          </div>
      { matchEnd ? <h3>{winningLine.current}</h3>
            :
          <div className='score--event'>
            {scoreElements}
          </div>
      }
      { matchEnd ? ""
            :
      <History 
        overs = {overs.slice(-18)}
      />
      }
      <div className='game--btn'>
      <img src='undoimg.png' className='undo--img' onClick={undo} alt='undo'/>
      <button onClick={changeInnings} className='btns'>
          Next innings
      </button>
      <button onClick={togglenewGame} className='btns'>
          New Game
      </button>
      </div>
        </section>
}    
      
    </main>
  );
}

export default App;
