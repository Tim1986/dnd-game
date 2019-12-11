const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
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
    const menuOptions = ["1. Create a Character", "2. View all Characters", "3. Edit a Character", "4. Delete a Character", "5. Make Two Characters Fight"]
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
                editCharacter();
                break;
            case menuOptions[3]:
                deleteCharacter();
                break;
            case menuOptions[4]:
                fight();
                break;
            default:
                console.log("It should not be possible for you to see this")
        }
    })
}

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

function chooseRace(character) {
    const characterRaceOptions = ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Half-Orc", "Human", "Tiefling"]
    inquirer.prompt([
        {
            type: "list",
            name: "characterRace",
            message: "What race would you like " + characterName + " to be?",
            choices: characterRaceOptions
        }
    ]).then(function (response) {
        const characterRace = response.characterRace
        character.race = characterRace
        switch (characterRace) {
            case characterRaceOptions[0]:
                let characterSubraceOptions = ["Black (Acid)", "Blue (Lightning)", "Brass (Fire)", "Bronze (Lightning)", "Copper (Acid)", "Gold (Fire)", "Green (Poison)", "Red (Fire)", "Silver (Cold)", "White (Cold)"]
                let messageString = character.race + "s have different colors, which determine which damage type your breath weapon does, and also the damage type you are resistant to. Which color would you like " + character.name + " to be?"
                chooseSubrace(character, characterSubraceOptions, messageString);
                break;
            case characterRaceOptions[1]:
                let characterSubraceOptions = ["Hill", "Mountain"]
                let messageString = character.race + "s have " + characterSubraceOptions.length + " subraces. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, characterSubraceOptions, messageString);
                break;
            case characterRaceOptions[2]:
                let characterSubraceOptions = ["High", "Wood", "Drow"]
                let messageString = character.race + "s have " + characterSubraceOptions.length + " subraces. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, characterSubraceOptions, messageString);
                break;
            case characterRaceOptions[3]:
                let characterSubraceOptions = ["Forest", "Rock"]
                let messageString = character.race + "s have " + characterSubraceOptions.length + " subraces. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, characterSubraceOptions, messageString);
                break;
            case characterRaceOptions[4]:
                let characterSubraceOptions = ["Standard", "High", "Wood", "Drow"]
                let messageString = character.race + "s have " + characterSubraceOptions.length + " subraces, based on your Elf parentage. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, characterSubraceOptions, messageString);
                break;
            case characterRaceOptions[5]:
                let characterSubraceOptions = ["Lightfoot", "Stout"]
                let messageString = character.race + "s have " + characterSubraceOptions.length + " subraces. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, characterSubraceOptions, messageString);
                break;
            case characterRaceOptions[6]:
                obj.subrace = "None"
                chooseClass(character);
                break;
            case characterRaceOptions[7]:
                let characterSubraceOptions = ["Standard", "Variant"]
                let messageString = character.race + "s have " + characterSubraceOptions.length + " subraces. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, characterSubraceOptions, messageString);
                break;
            case characterRaceOptions[8]:
                let characterSubraceOptions = ["Standard", "Feral"]
                let messageString = character.race + "s have " + characterSubraceOptions.length + " subraces. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, characterSubraceOptions, messageString);
                break;
            default:
                console.log("not possible")
        }
    })
}

function chooseSubrace(character, characterSubraceOptions, messageString) {
    inquirer.prompt([
        {
            type: "list",
            name: "characterSubrace",
            message: messageString,
            choices: characterSubraceOptions
        }
    ]).then(function (response) {
        const characterSubrace = response.characterSubrace
        character.subrace = characterSubrace
        chooseClass(character)
    })
}

function chooseClass(character) {
    
}

// Inquirer 4: Choose character stats
// Inquirer 5: Choose character weapon
// just give appropriate armor and proficiencies, etc.
// connection.end()

function viewAllCharacters() {
    console.log("2")
    connection.end()
}

function editCharacter() {
    console.log("3")
    connection.end()
}

function deleteCharacter() {
    console.log("4")
    connection.end()
}

function fight() {
    console.log("5")
    connection.end()
}