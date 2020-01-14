const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: "root",
    password: "root",
    database: "dnd_db"
});

function deleteCharacter() {
    inquirer.prompt([
        {
            type: "input",
            name: "characterName",
            message: "Please type the name of the character you'd like to delete"
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
                    connection.query("DELETE FROM characters WHERE ?",
                        [
                            {
                                name: characterName
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            connection.end()
                        }
                    );
                }
            }
        )
    })
}

module.exports = deleteCharacter