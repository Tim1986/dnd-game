const inquirer = require("inquirer");
const updateOneStat = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/updateOneStat")
const chooseEquipment = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/chooseEquipment")
const calculateAC = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/calculateAC")

function choosePlusOnes(character, allStatTypes) {
    inquirer.prompt([
        {
            type: "list",
            name: "firstIncrease",
            message: "Your race allows you to give two separate stats +1. What's the first stat you'd like to increase?",
            choices: allStatTypes
        }
    ]).then(function (response) {
        const firstIncrease = response.firstIncrease
        let plusOnes = ["1", "1"]
        updateOneStat(character, firstIncrease, allStatTypes, plusOnes)
        plusOnes.length = 1
        let fiveStatTypes = []
        for (let i = 0; i < allStatTypes.length; i++) {
            if (allStatTypes[i] !== firstIncrease) {
                fiveStatTypes.push(allStatTypes[i])
            }
        }
        console.log("Here are your current stats: ")
        console.log(character.stats)
        inquirer.prompt([
            {
                type: "list",
                name: "secondIncrease",
                message: "Your race allows you to give two separate stats +1. What's the second stat you'd like to increase?",
                choices: fiveStatTypes
            }
        ]).then(function (response) {
            const secondIncrease = response.secondIncrease
            updateOneStat(character, secondIncrease, allStatTypes, plusOnes)
            console.log("Here are your final stats: ")
            console.log(character.stats)
            // Need to adjust so halflings and gnomes can't use heavy weapons
            if (character.class === "Barbarian") {
                let barbarianWeapons = ["Longsword", "Glaive", "Greataxe", "Greatsword"]
                let barbarianArmor = ["Scale Mail", "Half Plate", "Unarmored Defense"]
                let shieldProficiency = true
                chooseEquipment(character, barbarianWeapons, barbarianArmor, shieldProficiency)
            } else if (character.class === "Fighter") {
                let fighterWeapons = ["Longsword", "Glaive", "Greataxe", "Greatsword"]
                let fighterArmor = ["Chain Mail", "Splint", "Plate"]
                let shieldProficiency = true
                chooseEquipment(character, fighterWeapons, fighterArmor, shieldProficiency)
            } else if (character.class === "Rogue") {
                let rogueWeapons = ["Rapier", "Shortswords"]
                let rogueArmor = ["Leather", "Studded Leather"]
                let shieldProficiency = false
                chooseEquipment(character, rogueWeapons, rogueArmor, shieldProficiency)
            } else if (character.class === "Wizard") {
                character.armortype = "None"
                calculateAC(character)
            }
        })
    })
}

module.exports = choosePlusOnes