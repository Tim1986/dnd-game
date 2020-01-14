const inquirer = require("inquirer");
const chooseClass = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/chooseClass")

function chooseSubrace(character, characterSubraceOptions, messageString) {
    inquirer.prompt([
        {
            type: "list",
            name: "characterSubrace",
            message: messageString,
            choices: characterSubraceOptions
        }
    ]).then(function (response) {
        const characterSubrace = response.characterSubrace
        character.subrace = characterSubrace
        chooseClass(character)
    })
}

module.exports = chooseSubrace