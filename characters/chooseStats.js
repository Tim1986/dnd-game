const inquirer = require("inquirer");
const initializeStats = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/initializeStats")
const rollStats = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/rollStats")
const placeStats = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/placeStats")

function chooseStats(character) {
    new Promise((resolve, reject) => {
        initializeStats(character, resolve)
    })
        .catch(() => {
        })
        .then(function (value) {
            inquirer.prompt([
                {
                    type: "list",
                    name: "statMethod",
                    message: "Would you like to roll for stats or use the standard array?",
                    choices: ["Roll for stats!", "Let's just use the standard array"]
                }
            ]).then(function (response) {
                if (response.statMethod === "Roll for stats!") {
                    rollStats(character)
                } else {
                    let standardArray = ["8", "10", "12", "13", "14", "15"]
                    console.log("By choosing the standard array, you get the following stats: " + standardArray)
                    placeStats(character, standardArray)
                }
            })
        })
}

module.exports = chooseStats