const inquirer = require("inquirer");
const calculateAC = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/calculateAC")

function chooseEquipment(character, weaponArray, armorArray, isShieldProficient) {
    inquirer.prompt([
        {
            type: "list",
            name: "weaponChoice",
            message: "What weapon would you like to use?",
            choices: weaponArray
        }
    ]).then(function (response) {
        const weaponChoice = response.weaponChoice
        character.weapon = weaponChoice
        inquirer.prompt([
            {
                type: "list",
                name: "armorChoice",
                message: "What armor would you like to wear?",
                choices: armorArray
            }
        ]).then(function (response) {
            const armorChoice = response.armorChoice
            character.armortype = armorChoice
            if (isShieldProficient && weaponChoice === "Longsword") {
                inquirer.prompt([
                    {
                        type: "list",
                        name: "shieldChoice",
                        message: "You have a hand free and you are shield proficient. Do you want to carry a shield?",
                        choices: ["Yes", "No"]
                    }
                ]).then(function (response) {
                    console.log(response)
                    if (response.shieldChoice === "Yes") {
                        character.shield = true
                    } else {
                        character.shield = false
                    }
                    console.log("ready to calculate AC")
                    calculateAC(character)
                })
            } else {
                character.shield = false
                calculateAC(character)
            }

        })
    })
}

module.exports = chooseEquipment