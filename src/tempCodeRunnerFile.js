const newDice = []
        for (let i = 1; i <= 10; i++) {
            newDice.push(i)
        }

  const diceElements = newDice.map(die => (
    <Scorebtn 
        key={die.value} 
    />
))

console.log(newDice)