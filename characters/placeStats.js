const inquirer = require("inquirer");
const choosePlusOnes = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/choosePlusOnes")
const updateOneStat = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/updateOneStat")
const chooseEquipment = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/chooseEquipment")
const calculateAC = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/calculateAC")

function placeStats(character, statArray) {
    let allStatTypes = ["Strength", "Constitution", "Dexterity", "Intelligence", "Wisdom", "Charisma"]
    inquirer.prompt([
        {
            type: "list",
            name: "stat1",
            message: "Where would you like to place your highest stat: " + statArray[statArray.length - 1] + "?",
            choices: allStatTypes
        }
    ]).then(function (response) {
        const stat1 = response.stat1
        // Update stat
        updateOneStat(character, stat1, allStatTypes, statArray)

        // Update stat array
        statArray.length = 5

        // Update stat type array
        let fiveStatTypes = []
        for (let i = 0; i < allStatTypes.length; i++) {
            if (allStatTypes[i] !== stat1) {
                fiveStatTypes.push(allStatTypes[i])
            }
        }

        // Next number
        console.log("Here are your current stats: ")
        console.log(character.stats)
        inquirer.prompt([
            {
                type: "list",
                name: "stat2",
                message: "Where would you like to place your highest remaining stat: " + statArray[statArray.length - 1] + "?",
                choices: fiveStatTypes
            }
        ]).then(function (response) {
            const stat2 = response.stat2

            updateOneStat(character, stat2, allStatTypes, statArray)

            statArray.length = 4

            let fourStatTypes = []
            for (let i = 0; i < fiveStatTypes.length; i++) {
                if (fiveStatTypes[i] !== stat2) {
                    fourStatTypes.push(fiveStatTypes[i])
                }
            }

            console.log("Here are your current stats: ")
            console.log(character.stats)
            inquirer.prompt([
                {
                    type: "list",
                    name: "stat3",
                    message: "Where would you like to place your highest remaining stat: " + statArray[statArray.length - 1] + "?",
                    choices: fourStatTypes
                }
            ]).then(function (response) {
                const stat3 = response.stat3

                updateOneStat(character, stat3, allStatTypes, statArray)

                statArray.length = 3

                let threeStatTypes = []
                for (let i = 0; i < fourStatTypes.length; i++) {
                    if (fourStatTypes[i] !== stat3) {
                        threeStatTypes.push(fourStatTypes[i])
                    }
                }

                console.log("Here are your current stats: ")
                console.log(character.stats)

                inquirer.prompt([
                    {
                        type: "list",
                        name: "stat4",
                        message: "Where would you like to place your highest remaining stat: " + statArray[statArray.length - 1] + "?",
                        choices: threeStatTypes
                    }
                ]).then(function (response) {
                    const stat4 = response.stat4

                    updateOneStat(character, stat4, allStatTypes, statArray)

                    statArray.length = 2

                    let twoStatTypes = []
                    for (let i = 0; i < threeStatTypes.length; i++) {
                        if (threeStatTypes[i] !== stat4) {
                            twoStatTypes.push(threeStatTypes[i])
                        }
                    }

                    console.log("Here are your current stats: ")
                    console.log(character.stats)

                    inquirer.prompt([
                        {
                            type: "list",
                            name: "stat5",
                            message: "Where would you like to place your highest remaining stat: " + statArray[statArray.length - 1] + "?",
                            choices: twoStatTypes
                        }
                    ]).then(function (response) {
                        const stat5 = response.stat5

                        updateOneStat(character, stat5, allStatTypes, statArray)

                        statArray.length = 1

                        let oneStatTypes = []
                        for (let i = 0; i < twoStatTypes.length; i++) {
                            if (twoStatTypes[i] !== stat5) {
                                oneStatTypes.push(twoStatTypes[i])
                            }
                        }

                        const stat6 = oneStatTypes[0]
                        updateOneStat(character, stat6, allStatTypes, statArray)

                        console.log("That only leaves one place for your last stat. Your " + stat6 + " will be " + statArray[0])

                        if (character.race === "Half-Elf" || (character.race === "Human" && character.subrace === "Variant")) {
                            choosePlusOnes(character, allStatTypes)
                        } else {
                            console.log("Here are your final stats: ")
                            console.log(character.stats)
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
                        }
                    })
                })
            })
        })
    })
}

module.exports = placeStats