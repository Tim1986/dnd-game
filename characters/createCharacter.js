const inquirer = require("inquirer");
const mysql = require("mysql");
const chooseRace = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/chooseRace")
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: "root",
    password: "root",
    database: "dnd_db"
});

function createNewCharacter() {
    inquirer.prompt([
        {
            type: "input",
            name: "characterName",
            message: "What would you like to name your new character?"
        }
    ]).then(function (response) {
        const characterName = response.characterName;
        connection.query("SELECT * FROM characters WHERE ?",
            [
                {
                    name: characterName
                }
            ],
            function (err, res) {
                if (err) throw err;
                if (res.length === 1) {
                    console.log("\n" + characterName + " is already an existing character's name. Try another name.\n")
                    createNewCharacter()
                } else {
                    let character = {
                        name: characterName
                    }
                    chooseRace(character)
                }
            }
        )
    })
}

module.exports = createNewCharacter