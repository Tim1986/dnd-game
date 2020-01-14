const inquirer = require("inquirer");
const mysql = require("mysql");
const createNewCharacter = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/createCharacter")
const viewAllCharacters = require("/users/Timothy Brahm/Coding Projects/dnd-game/maintenance/viewAllCharacters")
const viewCharacterStats = require("/users/Timothy Brahm/Coding Projects/dnd-game/maintenance/viewCharacterStats")
const editCharacter = require("/users/Timothy Brahm/Coding Projects/dnd-game/maintenance/editCharacter")
const deleteCharacter = require("/users/Timothy Brahm/Coding Projects/dnd-game/maintenance/deleteCharacter")
const fight = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/fight")

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: "root",
    password: "root",
    database: "dnd_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startMenu();
});

function startMenu() {
    // Add option to view info. Stat bonuses for races, and what stats each class wants
    const menuOptions = ["1. Create a Character", "2. View all Character Info", "3. View all Character Stats", "4. Edit a Character", "5. Delete a Character", "6. Make Two Characters Fight"]
    inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "Greetings gamer! What would you like to do today?",
            choices: menuOptions
        }
    ]).then(function (response) {
        switch (response.selection) {
            case menuOptions[0]:
                createNewCharacter();
                break;
            case menuOptions[1]:
                viewAllCharacters();
                break;
            case menuOptions[2]:
                viewCharacterStats();
                break;
            case menuOptions[3]:
                editCharacter();
                break;
            case menuOptions[4]:
                deleteCharacter();
                break;
            case menuOptions[5]:
                fight();
                break;
            default:
                console.log("It should not be possible for you to see this")
        }
    })
}
