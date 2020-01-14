const inquirer = require("inquirer");
const mysql = require("mysql");
const changeCharacter = require("/users/Timothy Brahm/Coding Projects/dnd-game/maintenance/changeCharacter")

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: "root",
    password: "root",
    database: "dnd_db"
});

function editCharacter() {
    inquirer.prompt([
        {
            type: "input",
            name: "characterName",
            message: "Please type the name of the character you'd like to edit"
        }
    ]).then(function (response) {
        const characterName = response.characterName
        connection.query("SELECT * FROM characters WHERE ?",
            [
                {
                    name: characterName
                }
            ],
            function (err, res) {
                if (err) throw err;
                if (res.length === 0) {
                    console.log("That isn't a character name")
                    connection.end()
                } else {
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "whatToEdit",
                            message: "What would you like to edit?",
                            choices: ["name", "level", "race", "subrace", "class", "subclass", "strength", "constitution", "dexterity", "intelligence", "wisdom", "charisma", "weapon", "armortype", "shield", "armorclass", "hitpoints"]
                        }
                    ]).then(function (response) {
                        const whatToEdit = response.whatToEdit
                        switch (whatToEdit) {
                            case "name":
                                changeCharacter(whatToEdit, characterName);
                                break;
                            case "level":
                                changeCharacter(whatToEdit, characterName, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
                                break;
                            case "race":
                                changeCharacter(whatToEdit, characterName, ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Half-Orc", "Human", "Tiefling"]);
                                break;
                            case "subrace":
                                changeCharacter(whatToEdit, characterName);
                                break;
                            case "class":
                                changeCharacter(whatToEdit, characterName, ["Barbarian", "Fighter", "Rogue"]);
                                break;
                            case "subclass":
                                changeCharacter(whatToEdit, characterName);
                                break;
                            case "strength":
                                changeCharacter(whatToEdit, characterName, [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
                                break;
                            case "constitution":
                                changeCharacter(whatToEdit, characterName, [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
                                break;
                            case "dexterity":
                                changeCharacter(whatToEdit, characterName, [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
                                break;
                            case "intelligence":
                                changeCharacter(whatToEdit, characterName, [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
                                break;
                            case "wisdom":
                                changeCharacter(whatToEdit, characterName, [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
                                break;
                            case "charisma":
                                changeCharacter(whatToEdit, characterName, [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
                                break;
                            case "weapon":
                                changeCharacter(whatToEdit, characterName, ["Longsword", "Glaive", "Greataxe", "Greatsword", "Rapier", "Shortswords"]);
                                break;
                            case "armortype":
                                changeCharacter(whatToEdit, characterName, ["Leather", "Studded Leather", "Scale Mail", "Half Plate", "Unarmored Defense", "Chain Mail", "Splint", "Plate"]);
                                break;
                            case "shield":
                                changeCharacter(whatToEdit, characterName, [true, false]);
                                break;
                            case "armorclass":
                                changeCharacter(whatToEdit, characterName, [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
                                break;
                            case "hitpoints":
                                changeCharacter(whatToEdit, characterName, [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
                            default:
                                console.log("not possible")
                        }

                    })
                }
            }
        )
    })
}

module.exports = editCharacter