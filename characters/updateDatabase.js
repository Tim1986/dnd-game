const mysql = require("mysql");
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: "root",
    password: "root",
    database: "dnd_db"
});

function updateDatabase(character) {
    connection.query("INSERT INTO characters SET ?",
        {
            name: character.name,
            race: character.race,
            hitpoints: character.hitpoints,
            subrace: character.subrace,
            class: character.class,
            strength: character.stats.strength,
            constitution: character.stats.constitution,
            dexterity: character.stats.dexterity,
            intelligence: character.stats.intelligence,
            wisdom: character.stats.wisdom,
            charisma: character.stats.charisma,
            weapon: character.weapon,
            armortype: character.armortype,
            shield: character.shield,
            armorclass: character.armorclass,
            level: 1
        },
        function (err, res) {
            if (err) throw err;
            connection.end() 
        }
    )
}

module.exports = updateDatabase