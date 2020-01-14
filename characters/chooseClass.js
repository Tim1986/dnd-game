const inquirer = require("inquirer");
const chooseStats = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/chooseStats")

function chooseClass(character) {
    const characterClassOptions = ["Barbarian", "Fighter", "Rogue", "Wizard"]
    inquirer.prompt([
        {
            type: "list",
            name: "characterClass",
            message: "What class would you like " + character.name + " to be?",
            choices: characterClassOptions
        }
    ]).then(function (response) {
        const characterClass = response.characterClass
        character.class = characterClass
        chooseStats(character)
    })
}

module.exports = chooseClass