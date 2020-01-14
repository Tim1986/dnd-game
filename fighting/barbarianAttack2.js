const inquirer = require("inquirer");
const barbarianAttack3 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/barbarianAttack3")

function barbarianAttack2(myCharacter, myConditions, enemyCharacter, enemyConditions) {
    inquirer.prompt([
        {
            type: "list",
            name: "recklessAttack",
            message: "Would you like " + myCharacter.name + " to recklessly attack? If so, you will attack at advantage, but also be attacked at advantage.",
            choices: ["Yes", "No"]
        }
    ]).then(function (response) {
        const recklessAttack = response.recklessAttack
        if (recklessAttack === "Yes") {
            myConditions.hasadvantage = true
            enemyConditions.hasadvantage = true
        }
        barbarianAttack3(myCharacter, myConditions, enemyCharacter, enemyConditions)
    })
}

module.exports = barbarianAttack2