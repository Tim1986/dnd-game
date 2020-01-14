function rollingD20(myConditions) {
    let d20 = 0
    if (myConditions.hasadvantage === true) {
        console.log("I have advantage, so I roll twice")
        let die1 = Math.floor(Math.random() * 20) + 1
        let die2 = Math.floor(Math.random() * 20) + 1
        console.log("I rolled a " + die1 + " and a " + die2)
        if (die1 > die2) {
            d20 = die1
        } else {
            d20 = die2
        }
        console.log("My d20 is " + d20)
    } else {
        console.log("I do not have advantage, so I just roll once")
        let die3 = Math.floor(Math.random() * 20) + 1
        d20 = die3
        console.log("My d20 is " + d20)
    }
    return d20
}

module.exports = rollingD20