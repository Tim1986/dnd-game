const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: "root",
    password: "root",
    database: "dnd_db"
});

function editSubrace(characterName, arrayOfOptions) {
    inquirer.prompt([
        {
            type: "list",
            name: "editItTo",
            message: "What would you like the new subrace to be?",
            choices: arrayOfOptions
        }
    ]).then(function (response) {
        let editItTo = response.editItTo
        connection.query("UPDATE characters SET subrace = '" + editItTo + "' WHERE ?",
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

module.exports = editSubrace