const inquirer = require("inquirer");
const mysql = require("mysql");
const editSubrace = require("/users/Timothy Brahm/Coding Projects/dnd-game/maintenance/editSubrace")

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: "root",
    password: "root",
    database: "dnd_db"
});

function changeCharacter(whatToEdit, characterName, arrayOfOptions) {
    if (whatToEdit === "name") {
        inquirer.prompt([
            {
                type: "input",
                name: "editItTo",
                message: "What would you like to edit the name to?",
            }
        ]).then(function (response) {
            let editItTo = response.editItTo
            connection.query("SELECT * FROM characters WHERE ?",
                [
                    {
                        name: editItTo
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    if (res.length === 1) {
                        console.log("That's already the name of a character")
                        connection.end()
                    } else {
                        connection.query("UPDATE characters SET ? WHERE ?",
                            [
                                {
                                    name: editItTo
                                },
                                {
                                    name: characterName
                                }
                            ],
                            function (err, res) {
                                if (err) throw err;
                                connection.end()
                            }
                        )
                    }
                }
            )
        })
    } else if (whatToEdit === "level") {
        inquirer.prompt([
            {
                type: "list",
                name: "editItTo",
                message: "What would you like to edit the " + whatToEdit + " to?",
                choices: arrayOfOptions
            }
        ]).then(function (response) {
            let editItTo = response.editItTo
            connection.query("UPDATE characters SET " + whatToEdit + " = '" + editItTo + "' WHERE ?",
                [
                    {
                        name: characterName
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log("Updating your level also automatically updates your hitpoints accordingly")

                    connection.query("SELECT class, constitution FROM characters WHERE ?",
                        [
                            {
                                name: characterName
                            }
                        ],
                        function (err, res) {
                            let characterClass = res[0].class
                            let characterConstitution = res[0].constitution
                            let newHP = 0
                            let conModifier = 0
                            if (characterConstitution === 8 || characterConstitution === 9) {
                                conModifier = -1
                            } else if (characterConstitution === 12 || characterConstitution === 13) {
                                conModifier = 1
                            } else if (characterConstitution === 14 || characterConstitution === 15) {
                                conModifier = 2
                            } else if (characterConstitution === 16 || characterConstitution === 17) {
                                conModifier = 3
                            } else if (characterConstitution === 18 || characterConstitution === 19) {
                                conModifier = 4
                            } else if (characterConstitution === 20) {
                                conModifier = 5
                            }

                            if (characterClass === "Barbarian") {
                                let levelOne = 12 + conModifier
                                let otherLevels = (7 + conModifier) * (editItTo - 1)
                                newHP = levelOne + otherLevels
                            } else if (characterClass === "Fighter") {
                                let levelOne = 10 + conModifier
                                let otherLevels = (6 + conModifier) * (editItTo - 1)
                                newHP = levelOne + otherLevels
                            } else if (characterClass === "Rogue") {
                                let levelOne = 8 + conModifier
                                let otherLevels = (5 + conModifier) * (editItTo - 1)
                                newHP = levelOne + otherLevels
                            } else if (characterClass === "Wizard") {
                                let levelOne = 6 + conModifier
                                let otherLevels = (4 + conModifier) * (editItTo - 1)
                                newHP = levelOne + otherLevels
                            }
                            console.log(newHP)
                            connection.query("UPDATE characters SET hitpoints = '" + newHP + "' WHERE ?",
                                [
                                    {
                                        name: characterName
                                    }
                                ],
                                function (err, res) {
                                    if (err) throw err;
                                    connection.end()
                                }
                            )
                        }
                    )
                }
            )
        })
    } else if (whatToEdit === "subclass") {
        console.log("Not ready for subclasses")
        connection.end()
    } else if (whatToEdit === "subrace") {
        // Query for race from characterName
        connection.query("SELECT race FROM characters WHERE ?",
            [
                {
                    name: characterName
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.log(res)
                const arr = [];
                for (const property in res[0]) {
                    arr.push(res[0][property]);
                }
                let characterRace = arr[0]

                if (characterRace === "Dragonborn") {
                    let dragonbornArray = ["Black (Acid)", "Blue (Lightning)", "Brass (Fire)", "Bronze (Lightning)", "Copper (Acid)", "Gold (Fire)", "Green (Poison)", "Red (Fire)", "Silver (Cold)", "White (Cold)"]
                    editSubrace(characterName, dragonbornArray)
                } else if (characterRace === "Dwarf") {
                    let dwarfArray = ["Hill", "Mountain"]
                    editSubrace(characterName, dwarfArray)
                } else if (characterRace === "Elf") {
                    let elfArray = ["High", "Wood", "Drow"]
                    editSubrace(characterName, elfArray)
                } else if (characterRace === "Gnome") {
                    let gnomeArray = ["Forest", "Rock"]
                    editSubrace(characterName, gnomeArray)
                } else if (characterRace === "Half-Elf") {
                    let halfelfArray = ["Standard", "High", "Wood", "Drow"]
                    editSubrace(characterName, halfelfArray)
                } else if (characterRace === "Halfling") {
                    let halflingArray = ["Lightfoot", "Stout"]
                    editSubrace(characterName, halflingArray)
                } else if (characterRace === "Half-Orc") {
                    console.log("Half-Orcs don't have subraces")
                    connection.end()
                } else if (characterRace === "Human") {
                    let humanArray = ["Standard", "Variant"]
                    editSubrace(characterName, humanArray)
                } else if (characterRace === "Tiefling") {
                    let tieflingArray = ["Standard", "Feral"]
                    editSubrace(characterName, tieflingArray)
                }
            }
        )
    } else {
        inquirer.prompt([
            {
                type: "list",
                name: "editItTo",
                message: "What would you like to edit the " + whatToEdit + " to?",
                choices: arrayOfOptions
            }
        ]).then(function (response) {
            let editItTo = response.editItTo
            connection.query("UPDATE characters SET " + whatToEdit + " = '" + editItTo + "' WHERE ?",
                [
                    {
                        name: characterName
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    connection.end()
                }
            )
        })
    }
}

module.exports = changeCharacter