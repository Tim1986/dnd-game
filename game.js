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
            message: "What race would you like " + character.name + " to be?",
            choices: characterRaceOptions
        }
    ]).then(function (response) {
        const characterRace = response.characterRace
        character.race = characterRace
        switch (characterRace) {
            case characterRaceOptions[0]:
                let dragonbornArray = ["Black (Acid)", "Blue (Lightning)", "Brass (Fire)", "Bronze (Lightning)", "Copper (Acid)", "Gold (Fire)", "Green (Poison)", "Red (Fire)", "Silver (Cold)", "White (Cold)"]
                let dragonbornString = character.race + "s have different colors, which determine which damage type your breath weapon does, and also the damage type you are resistant to. Which color would you like " + character.name + " to be?"
                chooseSubrace(character, dragonbornArray, dragonbornString);
                break;
            case characterRaceOptions[1]:
                let dwarfArray = ["Hill", "Mountain"]
                let dwarfString = character.race + "s have " + dwarfArray.length + " subraces. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, dwarfArray, dwarfString);
                break;
            case characterRaceOptions[2]:
                let elfArray = ["High", "Wood", "Drow"]
                let elfString = character.race + "s have " + elfArray.length + " subraces. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, elfArray, elfString);
                break;
            case characterRaceOptions[3]:
                let gnomeArray = ["Forest", "Rock"]
                let gnomeString = character.race + "s have " + gnomeArray.length + " subraces. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, gnomeArray, gnomeString);
                break;
            case characterRaceOptions[4]:
                let halfelfArray = ["Standard", "High", "Wood", "Drow"]
                let halfelfString = character.race + "s have " + halfelfArray.length + " subraces, based on your Elf parentage. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, halfelfArray, halfelfString);
                break;
            case characterRaceOptions[5]:
                let halflingArray = ["Lightfoot", "Stout"]
                let halflingString = character.race + "s have " + halflingArray.length + " subraces. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, halflingArray, halflingString);
                break;
            case characterRaceOptions[6]:
                obj.subrace = "None"
                chooseClass(character);
                break;
            case characterRaceOptions[7]:
                let humanArray = ["Standard", "Variant"]
                let humanString = character.race + "s have " + humanArray.length + " subraces. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, humanArray, humanString);
                break;
            case characterRaceOptions[8]:
                let tieflingArray = ["Standard", "Feral"]
                let tieflingString = character.race + "s have " + tieflingArray.length + " subraces. Which one would you like " + character.name + " to be?"
                chooseSubrace(character, tieflingArray, tieflingString);
                break;
            default:
                console.log("not possible");
        }
    })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
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
    const characterClassOptions = ["Barbarian", "Fighter", "Rogue"]
    inquirer.prompt([
        {
            type: "list",
            name: "characterClass",
            message: "What class would you like " + character.name + " to be?",
            choices: characterClassOptions
        }
    ]).then(function (response) {
        const characterClass = response.characterClass
        character.class = characterClass
        chooseStats(character)
    })
}

function chooseStats(character) {
    new Promise((resolve, reject) => {
        initializeStats(character, resolve)
    })
        .catch(() => {
        })
        .then(function (value) {
            inquirer.prompt([
                {
                    type: "list",
                    name: "statMethod",
                    message: "Would you like to roll for stats or use the standard array?",
                    choices: ["Roll for stats!", "Let's just use the standard array"]
                }
            ]).then(function (response) {
                if (response.statMethod === "Roll for stats!") {
                    rollStats(character)
                } else {
                    let standardArray = ["8", "10", "12", "13", "14", "15"]
                    console.log("By choosing the standard array, you get the following stats: " + standardArray)
                    placeStats(character, standardArray)
                }
            })
        })
}

function initializeStats(character, resolve) {
    character.stats = {
        strength: 0,
        constitution: 0,
        dexterity: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    }
    if (character.race === "Dragonborn") {
        console.log("Dragonborns get +2 Strength and +1 Charisma")
        character.stats.strength += 2
        character.stats.charisma += 1
    } else if (character.race === "Dwarf") {
        character.stats.constitution += 2
        if (character.subrace === "Hill") {
            console.log("Hill Dwarves get +2 Constitution and +1 Wisdom")
            character.stats.wisdom += 1
        } else if (character.subrace === "Mountain") {
            console.log("Mountain Dwarves get +2 Constitution and +2 Strength")
            character.stats.strength += 2
        }
    } else if (character.race === "Elf") {
        character.stats.dexterity += 2
        if (character.subrace === "High") {
            console.log("High Elves get +2 Dexterity and +1 Intelligence")
            character.stats.intelligence += 1
        } else if (character.subrace === "Wood") {
            console.log("Wood Elves get +2 Dexterity and +1 Wisdom")
            character.stats.wisdom += 1
        } else if (character.subrace === "Drow") {
            console.log("Drow Elves get +2 Dexterity and +1 Charisma")
            character.stats.charisma += 1
        }
    } else if (character.race === "Gnome") {
        character.stats.intelligence += 2
        if (character.subrace === "Forest") {
            console.log("Forest Gnomes get +2 Intelligence and +1 Dexterity")
            character.stats.dexterity += 1
        } else if (character.subrace === "Rock") {
            console.log("Rock Gnomes get +2 Intelligence and +1 Constitution")
            character.stats.constitution += 1
        }
    } else if (character.race === "Half-Elf") {
        console.log("Half-Elves get +2 Charisma, and +1 to two other stats of your choice. You can makes these choices after you pick your stats.")
        character.stats.charisma += 2
    } else if (character.race === "Halfling") {
        character.stats.dexterity += 2
        if (character.subrace === "Lightfoot") {
            console.log("Lightfoot Halflings get +2 Dexterity and +1 Charisma")
            character.stats.charisma += 1
        } else if (character.subrace === "Stout") {
            console.log("Stout Halflings get +2 Dexterity and +1 Constitution")
            character.stats.constitution += 1
        }
    } else if (character.race === "Half-Orc") {
        console.log("Half-Orcs get +2 Strength and +1 Constitution")
        character.stats.strength += 2
        character.stats.constitution += 1
    } else if (character.race === "Human") {
        if (character.subrace === "Standard") {
            console.log("Standard Humans get +1 to all of their stats")
            character.stats.strength += 1
            character.stats.constitution += 1
            character.stats.dexterity += 1
            character.stats.intelligence += 1
            character.stats.wisdom += 1
            character.stats.charisma += 1
        } else if (character.subrace === "Variant") {
            console.log("Human Variants get +1 to two stats of your choice. You can makes these choices after you pick your stats.")
        }
    } else if (character.race === "Tiefling") {
        character.stats.intelligence += 1
        if (character.subrace === "Standard") {
            console.log("Standard Tieflings get +2 Charisma and +1 Intelligence")
            character.stats.charisma += 2
        } else if (character.subrace === "Feral") {
            console.log("Feral Tieflings get +2 Dexterity and +1 Intelligence")
            character.stats.dexterity += 2
        }
    }
    resolve(character)
}

function rollStats(character) {
    console.log("To roll for stats, we roll a six sided dice four times, drop the lowest roll, and add the rest together. That's one total. You do this process seven times, resulting in seven totals. Then we drop the lowest total, giving you six totals. Those are your stats.")
    let rolledArray = []
    for (let i = 0; i < 7; i++) {
        console.log("------------------------------------------------------------------------")
        let die1 = Math.floor(Math.random() * 6) + 1
        let die2 = Math.floor(Math.random() * 6) + 1
        let die3 = Math.floor(Math.random() * 6) + 1
        let die4 = Math.floor(Math.random() * 6) + 1
        let dieArray = [die1, die2, die3, die4]
        let dieArraySorted = dieArray.sort(function (a, b) { return a - b });
        console.log("Here are your six sided dice rolls: " + dieArraySorted)
        let total = dieArraySorted[1] + dieArraySorted[2] + dieArraySorted[3]
        console.log("Dropping the lowest of those rolls and adding together we get the following total: " + total)
        rolledArray.push(total)
    }
    console.log("------------------------------------------------------------------------")
    let rolledArraySorted = rolledArray.sort(function (a, b) { return a - b })
    console.log("Your seven totals are: " + rolledArraySorted)
    let finalArray = [rolledArraySorted[1], rolledArraySorted[2], rolledArraySorted[3], rolledArraySorted[4], rolledArraySorted[5], rolledArraySorted[6]]
    console.log("By dropping the lowest of those, we now have your stats: " + finalArray)
    placeStats(character, finalArray)
}

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
        console.log("five")
        console.log(fiveStatTypes)

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
            console.log("four")
            console.log(fourStatTypes)

            console.log("Here are your current stats: ")
            console.log(character.stats)
            inquirer.prompt([
                {
                    type: "list",
                    name: "stat3",
                    message: "Where would you like to place your highest remaining stat: " + statArray[statArray.length - 1] + "?",
                    choices: fourStatTypes    
                }
            ]).then(function(response) {
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
                ]).then(function(response) {
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
                    ]).then(function(response) {
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
                            choosePlusOnes(character)
                        } else {
                            console.log("Here are your final stats: ")
                            console.log(character.stats)
                            connection.end()
                        }
                        
                    })

                })

            })

        })
    })
}

function updateOneStat(character, stat, allStatTypes, statArray) {
    if (stat === allStatTypes[0]) {
        character.stats.strength += parseFloat(statArray[statArray.length - 1])
    } else if (stat === allStatTypes[1]) {
        character.stats.constitution += parseFloat(statArray[statArray.length - 1])
    } else if (stat === allStatTypes[2]) {
        character.stats.dexterity += parseFloat(statArray[statArray.length - 1])
    } else if (stat === allStatTypes[3]) {
        character.stats.intelligence += parseFloat(statArray[statArray.length - 1])
    } else if (stat === allStatTypes[4]) {
        character.stats.wisdom += parseFloat(statArray[statArray.length - 1])
    } else {
        character.stats.charisma += parseFloat(statArray[statArray.length - 1])
    }
    return character
}

function choosePlusOnes(character) {
    console.log("later")
}


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