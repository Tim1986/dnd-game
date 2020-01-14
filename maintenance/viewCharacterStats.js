const mysql = require("mysql");
const { printTable } = require('console-table-printer');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: "root",
    password: "root",
    database: "dnd_db"
});

function viewCharacterStats() {
    connection.query("SELECT name, strength, constitution, dexterity, intelligence, wisdom, charisma FROM characters", function (err, res) {
        if (err) throw err;
        const queryTable = [];
        for (let i = 0; i < res.length; i++) {
            queryTable.push(res[i]);
        }
        printTable(queryTable);
        connection.end()
    })
}

module.exports = viewCharacterStats