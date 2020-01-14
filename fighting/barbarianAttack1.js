const inquirer = require("inquirer");
const barbarianAttack2 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/barbarianAttack2")
const wizardAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/wizardAttack1")

function barbarianAttack1(myCharacter, myConditions, enemyCharacter, enemyConditions) {
    if (myConditions.paralyzed) {
        console.log("I'm paralyzed, so the only thing to do is roll to break it. My D20 roll plus my wisdom save (" + myCharacter.wisdomSave + ") needs to beat the Wizard's spell save (" + enemyCharacter.spellSave)
        let die1 = Math.floor(Math.random() * 20) + 1
        if (die1 + myCharacter.wisdomSave >= enemyCharacter.spellSave) {
            console.log("I broke the paralysis with a roll of " + die1 + ". Next turn I'll get him!")
            myConditions.paralyzed = false
            wizardAttack1(enemyCharacter, enemyConditions, myCharacter, myConditions)
        } else {
            console.log("Sigh, I couldn't break the paralysis, I only rolled a " + die1)
            wizardAttack1(enemyCharacter, enemyConditions, myCharacter, myConditions)
        }
    } else {
        if (!myConditions.raging) {
            inquirer.prompt([
                {
                    type: "list",
                    name: "goIntoRage",
                    message: myCharacter.name + " is currently not raging. Bonus action to rage?",
                    choices: ["Yes", "No"]
                }
            ]).then(function (response) {
                const goIntoRage = response.goIntoRage
                if (goIntoRage === "Yes") {
                    myConditions.raging = true
                    myConditions.physicalresistance = true
                }
                barbarianAttack2(myCharacter, myConditions, enemyCharacter, enemyConditions)
            })
        } else {
            barbarianAttack2(myCharacter, myConditions, enemyCharacter, enemyConditions)
        }
    }
}

module.exports = barbarianAttack1