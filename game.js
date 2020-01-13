const inquirer = require("inquirer");
const mysql = require("mysql");
const { printTable } = require('console-table-printer');

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
                character.subrace = "None"
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

            console.log("Here are your current stats: ")
            console.log(character.stats)
            inquirer.prompt([
                {
                    type: "list",
                    name: "stat3",
                    message: "Where would you like to place your highest remaining stat: " + statArray[statArray.length - 1] + "?",
                    choices: fourStatTypes
                }
            ]).then(function (response) {
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
                ]).then(function (response) {
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
                    ]).then(function (response) {
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
                            choosePlusOnes(character, allStatTypes)
                        } else {
                            console.log("Here are your final stats: ")
                            console.log(character.stats)
                            if (character.class === "Barbarian") {
                                let barbarianWeapons = ["Longsword", "Glaive", "Greataxe", "Greatsword"]
                                let barbarianArmor = ["Scale Mail", "Half Plate", "Unarmored Defense"]
                                let shieldProficiency = true
                                chooseEquipment(character, barbarianWeapons, barbarianArmor, shieldProficiency)
                            } else if (character.class === "Fighter") {
                                let fighterWeapons = ["Longsword", "Glaive", "Greataxe", "Greatsword"]
                                let fighterArmor = ["Chain Mail", "Splint", "Plate"]
                                let shieldProficiency = true
                                chooseEquipment(character, fighterWeapons, fighterArmor, shieldProficiency)
                            } else if (character.class === "Rogue") {
                                let rogueWeapons = ["Rapier", "Shortswords"]
                                let rogueArmor = ["Leather", "Studded Leather"]
                                let shieldProficiency = false
                                chooseEquipment(character, rogueWeapons, rogueArmor, shieldProficiency)
                            }
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

function choosePlusOnes(character, allStatTypes) {
    inquirer.prompt([
        {
            type: "list",
            name: "firstIncrease",
            message: "Your race allows you to give two separate stats +1. What's the first stat you'd like to increase?",
            choices: allStatTypes
        }
    ]).then(function (response) {
        const firstIncrease = response.firstIncrease
        let plusOnes = ["1", "1"]
        updateOneStat(character, firstIncrease, allStatTypes, plusOnes)
        plusOnes.length = 1
        let fiveStatTypes = []
        for (let i = 0; i < allStatTypes.length; i++) {
            if (allStatTypes[i] !== firstIncrease) {
                fiveStatTypes.push(allStatTypes[i])
            }
        }
        console.log("Here are your current stats: ")
        console.log(character.stats)
        inquirer.prompt([
            {
                type: "list",
                name: "secondIncrease",
                message: "Your race allows you to give two separate stats +1. What's the second stat you'd like to increase?",
                choices: fiveStatTypes
            }
        ]).then(function (response) {
            const secondIncrease = response.secondIncrease
            updateOneStat(character, secondIncrease, allStatTypes, plusOnes)
            console.log("Here are your final stats: ")
            console.log(character.stats)
            // Need to adjust so halflings and gnomes can't use heavy weapons
            if (character.class === "Barbarian") {
                let barbarianWeapons = ["Longsword", "Glaive", "Greataxe", "Greatsword"]
                let barbarianArmor = ["Scale Mail", "Half Plate", "Unarmored Defense"]
                let shieldProficiency = true
                chooseEquipment(character, barbarianWeapons, barbarianArmor, shieldProficiency)
            } else if (character.class === "Fighter") {
                let fighterWeapons = ["Longsword", "Glaive", "Greataxe", "Greatsword"]
                let fighterArmor = ["Chain Mail", "Splint", "Plate"]
                let shieldProficiency = true
                chooseEquipment(character, fighterWeapons, fighterArmor, shieldProficiency)
            } else if (character.class === "Rogue") {
                let rogueWeapons = ["Rapier", "Shortswords"]
                let rogueArmor = ["Leather", "Studded Leather"]
                let shieldProficiency = false
                chooseEquipment(character, rogueWeapons, rogueArmor, shieldProficiency)
            }
        })
    })
}

function chooseEquipment(character, weaponArray, armorArray, isShieldProficient) {
    inquirer.prompt([
        {
            type: "list",
            name: "weaponChoice",
            message: "What weapon would you like to use?",
            choices: weaponArray
        }
    ]).then(function (response) {
        const weaponChoice = response.weaponChoice
        character.weapon = weaponChoice
        inquirer.prompt([
            {
                type: "list",
                name: "armorChoice",
                message: "What armor would you like to wear?",
                choices: armorArray
            }
        ]).then(function (response) {
            const armorChoice = response.armorChoice
            character.armortype = armorChoice
            if (isShieldProficient && weaponChoice === "Longsword") {
                inquirer.prompt([
                    {
                        type: "list",
                        name: "shieldChoice",
                        message: "You have a hand free and you are shield proficient. Do you want to carry a shield?",
                        choices: ["Yes", "No"]
                    }
                ]).then(function (response) {
                    console.log(response)
                    if (response.shieldChoice === "Yes") {
                        character.shield = true
                    } else {
                        character.shield = false
                    }
                    console.log("ready to calculate AC")
                    calculateAC(character)
                })
            } else {
                character.shield = false
                calculateAC(character)
            }

        })
    })
}

function calculateAC(character) {
    let conModifier = 0
    let dexModifier = 0
    let dexModifierMaxTwo = 0
    if (character.stats.dexterity === 8 || character.stats.dexterity === 9) {
        dexModifier = -1
        dexModifierMaxTwo = -1
    } else if (character.stats.dexterity === 12 || character.stats.dexterity === 13) {
        dexModifier = 1
        dexModifierMaxTwo = 1
    } else if (character.stats.dexterity === 14 || character.stats.dexterity === 15) {
        dexModifier = 2
        dexModifierMaxTwo = 2
    } else if (character.stats.dexterity === 16 || character.stats.dexterity === 17) {
        dexModifier = 3
        dexModifierMaxTwo = 2
    } else if (character.stats.dexterity === 18 || character.stats.dexterity === 19) {
        dexModifier = 4
        dexModifierMaxTwo = 2
    } else if (character.stats.dexterity === 20) {
        dexModifier = 5
        dexModifierMaxTwo = 2
    }

    if (character.stats.constitution === 8 || character.stats.constitution === 9) {
        conModifier = -1
    } else if (character.stats.constitution === 12 || character.stats.constitution === 13) {
        conModifier = 1
    } else if (character.stats.constitution === 14 || character.stats.constitution === 15) {
        conModifier = 2
    } else if (character.stats.constitution === 16 || character.stats.constitution === 17) {
        conModifier = 3
    } else if (character.stats.constitution === 18 || character.stats.constitution === 19) {
        conModifier = 4
    } else if (character.stats.constitution === 20) {
        conModifier = 5
    }

    if (character.armortype === "Leather") {
        character.armorclass = 11 + dexModifier
    } else if (character.armortype === "Studded Leather") {
        character.armorclass = 12 + dexModifier
    } else if (character.armortype === "Scale Mail") {
        character.armorclass = 14 + dexModifierMaxTwo
    } else if (character.armortype === "Half Plate") {
        character.armorclass = 15 + dexModifierMaxTwo
    } else if (character.armortype === "Unarmored Defense") {
        character.armorclass = 10 + dexModifier + conModifier
    } else if (character.armortype === "Chain Mail") {
        character.armorclass = 16
    } else if (character.armortype === "Splint") {
        character.armorclass = 17
    } else if (character.armortype === "Plate") {
        character.armorclass = 18
    }

    if (character.shield) {
        character.armorclass += 2
    }
    console.log(character)
    if (character.class === "Barbarian") {
        character.hitpoints = 12 + conModifier
    } else if (character.class === "Fighter") {
        character.hitpoints = 10 + conModifier
    } else if (character.class === "Rogue") {
        character.hitpoints = 8 + conModifier
    }
    console.log(character)
    updateDatabase(character)
}

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

function viewAllCharacters() {
    connection.query("SELECT name, level, subrace, race, subclass, class, weapon, armorclass, hitpoints FROM characters", function (err, res) {
        if (err) throw err;
        const queryTable = [];
        for (let i = 0; i < res.length; i++) {
            queryTable.push(res[i]);
        }
        printTable(queryTable);
        connection.end()
    })
}

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

function fight() {
    connection.query("SELECT name FROM characters", function (err, res) {
        if (err) throw err;
        const characterArray = [];
        for (let i = 0; i < res.length; i++) {
            characterArray.push(res[i]);
        }

        inquirer.prompt([
            {
                type: "checkbox",
                name: "characterChoices",
                message: "Choose two characters to fight each other",
                choices: characterArray
            }
        ]).then(function (response) {
            if (response.characterChoices.length === 2) {
                let combatant1 = response.characterChoices[0]
                let combatant2 = response.characterChoices[1]
                connection.query("SELECT dexterity FROM characters WHERE ?",
                    [
                        {
                            name: combatant1
                        }
                    ],
                    function (err, res) {
                        let combatant1Dex = res[0].dexterity
                        console.log(combatant1Dex)

                        connection.query("SELECT dexterity FROM characters WHERE ?",
                            [
                                {
                                    name: combatant2
                                }
                            ],
                            function (err, res) {
                                let combatant2Dex = res[0].dexterity
                                console.log(combatant2Dex)

                                let combatant1DexMod = findInitiative(combatant1Dex)
                                let combatant2DexMod = findInitiative(combatant2Dex)
                                let wonInitiative = ""
                                if (rollForInitiative(combatant1, combatant1DexMod, combatant2, combatant2DexMod) === 1) {
                                    wonInitiative = combatant1
                                    console.log(combatant1 + " goes first")
                                } else {
                                    wonInitiative = combatant2
                                    console.log(combatant2 + " goes first")
                                }

                                connection.query("SELECT * FROM characters WHERE ?",
                                    [
                                        {
                                            name: combatant1
                                        }
                                    ],
                                    function (err, res) {
                                        let character1 = res[0]
                                        let character1conditions = {
                                            hasadvantage: false,
                                            raging: false,
                                            physicalresistance: false
                                        }
                                        let character2conditions = {
                                            hasadvantage: false,
                                            raging: false,
                                            physicalresistance: false
                                        }
                                        connection.query("SELECT * FROM characters WHERE ?",
                                        [
                                            {
                                                name: combatant2
                                            }
                                        ],
                                        function (err, res) {
                                            let character2 = res[0]

                                            if (wonInitiative === combatant1) {
                                                if (character1.class === "Barbarian") {
                                                    barbarianAttack1(character1, character1conditions, character2, character2conditions)
                                                } else if (character1.class === "Fighter") {
                                                    fighterAttack1(character1, character1conditions, character2, character2conditions)
                                                } else if (character1.class === "Rogue") {
                                                    rogueAttack(character1, character1conditions, character2, character2conditions)
                                                }
                                            } else {
                                                if (character2.class === "Barbarian") {
                                                    barbarianAttack1(character2, character2conditions, character1, character1conditions)
                                                } else if (character2.class === "Fighter") {
                                                    fighterAttack1(character2, character2conditions, character1, character1conditions)
                                                } else if (character2.class === "Rogue") {
                                                    rogueAttack(character2, character2conditions, character1, character1conditions)
                                                }
                                            }
                                        }
                                        )
                                    }
                                )
                            }
                        )
                    }
                )
            } else {
                console.log("Please select two characters")
                fight()
            }
        })
    })
    // barbarianAttack1(character1, character1conditions, character2, character2conditions)
}

function rollForInitiative(combatant1, combatant1DexMod, combatant2, combatant2DexMod) {
    let combatant1Roll = Math.floor(Math.random() * 20) + 1
    let combatant2Roll = Math.floor(Math.random() * 20) + 1
    let combatant1Initiative = combatant1DexMod + combatant1Roll
    let combatant2Initiative = combatant2DexMod + combatant2Roll
    console.log(combatant1 + " has a Dex modifier of " + combatant1DexMod + " and a roll of " + combatant1Roll + " for an initiative total of " + combatant1Initiative)
    console.log(combatant2 + " has a Dex modifier of " + combatant2DexMod + " and a roll of " + combatant2Roll + " for an initiative total of " + combatant2Initiative)
    if (combatant1Initiative === combatant2Initiative) {
        console.log("Whoops, they tied for initiative. Let's reroll.")
        rollForInitiative(combatant1, combatant1DexMod, combatant2, combatant2DexMod)
    } else if (combatant1Initiative > combatant2Initiative) {
        return 1
    } else {
        return 2
    }
}
function findInitiative(Dex) {
    if (Dex === 8 || Dex === 9) {
        Modifier = -1
    } else if (Dex === 10 || Dex === 11) {
        Modifier = 0
    } else if (Dex === 12 || Dex === 13) {
        Modifier = 1
    } else if (Dex === 14 || Dex === 15) {
        Modifier = 2
    } else if (Dex === 16 || Dex === 17) {
        Modifier = 3
    } else if (Dex === 18 || Dex === 19) {
        Modifier = 4
    } else if (Dex === 20) {
        Modifier = 5
    }
    return Modifier
}

function barbarianAttack1(myCharacter, myConditions, enemyCharacter, enemyConditions) {
    // if (myConditions.paralyzed) {
    //     savingThrow();
    // }
    if (!myConditions.raging) {
        inquirer.prompt([
            {
                type: "list",
                name: "goIntoRage",
                message: myCharacter.name + " is currently not raging. Bonus action to rage?",
                choices: ["Yes", "No"]
            }
        ]).then(function (response) {
            const goIntoRage = response.goIntoRage
            if (goIntoRage === "Yes") {
                myConditions.raging = true
                myConditions.physicalresistance = true
            }
            barbarianAttack2(myCharacter, myConditions, enemyCharacter, enemyConditions)
        })
    } else {
        barbarianAttack2(myCharacter, myConditions, enemyCharacter, enemyConditions)
    }
}

function barbarianAttack2(myCharacter, myConditions, enemyCharacter, enemyConditions) {
    inquirer.prompt([
        {
            type: "list",
            name: "recklessAttack",
            message: "Would you like " + myCharacter.name + " to recklessly attack? If so, you will attack at advantage, but also be attacked at advantage.",
            choices: ["Yes", "No"]
        }
    ]).then(function (response) {
        const recklessAttack = response.recklessAttack
        if (recklessAttack === "Yes") {
            myConditions.hasadvantage = true
            enemyConditions.hasadvantage = true
        }
        barbarianAttack3(myCharacter, myConditions, enemyCharacter, enemyConditions)
    })
}

function convertLevelToProficiency(level) {
    let proficiency = 0
    if (level < 5) {
        proficiency = 2
    } else if (level > 4) {
        proficiency = 3
    } else if (level > 8) {
        proficiency = 4
    } else if (level > 12) {
        proficiency = 5
    } else if (level > 16) {
        proficiency = 6
    }
    return proficiency
}

function findPrimaryStatModifier(myCharacter) {
    let primaryStatModifier = 0
    if (myCharacter.weapon === "Rapier" || myCharacter.weapon === "Shortswords") {
        if (myCharacter.dexterity === 8 || myCharacter.dexterity === 9) {
            primaryStatModifier = -1
        } else if (myCharacter.dexterity === 12 || myCharacter.dexterity === 13) {
            primaryStatModifier = 1
        } else if (myCharacter.dexterity === 14 || myCharacter.dexterity === 15) {
            primaryStatModifier = 2
        } else if (myCharacter.dexterity === 16 || myCharacter.dexterity === 17) {
            primaryStatModifier = 3
        } else if (myCharacter.dexterity === 18 || myCharacter.dexterity === 19) {
            primaryStatModifier = 4
        } else if (myCharacter.dexterity === 20) {
            primaryStatModifier = 5
        }
    } else {
        if (myCharacter.strength === 8 || myCharacter.strength === 9) {
            primaryStatModifier = -1
        } else if (myCharacter.strength === 12 || myCharacter.strength === 13) {
            primaryStatModifier = 1
        } else if (myCharacter.strength === 14 || myCharacter.strength === 15) {
            primaryStatModifier = 2
        } else if (myCharacter.strength === 16 || myCharacter.strength === 17) {
            primaryStatModifier = 3
        } else if (myCharacter.strength === 18 || myCharacter.strength === 19) {
            primaryStatModifier = 4
        } else if (myCharacter.strength === 20) {
            primaryStatModifier = 5
        }
    }
    return primaryStatModifier
}

function rollingD20(myConditions) {
    let d20 = 0
    if (myConditions.hasadvantage === true) {
        console.log("I have advantage, so I roll twice")
        let die1 = Math.floor(Math.random() * 20) + 1
        let die2 = Math.floor(Math.random() * 20) + 1
        console.log("I rolled a " + die1 + " and a " + die2)
        if (die1 > die2) {
            d20 = die1
        } else {
            d20 = die2
        }
        console.log("My d20 is " + d20)
    } else {
        console.log("I do not have advantage, so I just roll once")
        let die3 = Math.floor(Math.random() * 20) + 1
        d20 = die3
        console.log("My d20 is " + d20)
    }
    return d20
}

function barbarianAttack3(myCharacter, myConditions, enemyCharacter, enemyConditions) {
    console.log("***************************************************************")
    console.log(myCharacter.name + "'s turn to attack " + enemyCharacter.name)
    let AC = enemyCharacter.armorclass
    console.log("Enemy's Armor Class: " + AC)
    let level = myCharacter.level

    // Initialize, get, announce proficiency
    let proficiency = convertLevelToProficiency(level)
    console.log("My Level is " + level + ", so my proficiency is " + proficiency)

    // Initialize, get, announce primaryStatModifier
    let primaryStatModifier = findPrimaryStatModifier(myCharacter)
    console.log("My primary stat modifier is " + primaryStatModifier)

    let bonusToHit = primaryStatModifier + proficiency
    console.log("My bonusToHit is my primary stat modifier plus my proficiency, which is: " + bonusToHit)

    let d20 = rollingD20(myConditions)

    console.log("d20: " + d20)
    console.log("AC: " + AC)
    if (bonusToHit + d20 >= AC) {
        console.log("My bonusToHit (" + bonusToHit + ") + my d20 (" + d20 + ") is greater or equal to my enemy's AC (" + AC + "), so I hit")
        let crit = false
        if (d20 === 20) {
            crit = true
            console.log("Ooh, a crit! That means I get to reroll a weapon die")
        }
        let weaponDamage = 0
        let rageDamage = 0
        let primaryStatModifierDamage = primaryStatModifier

        if (myCharacter.weapon === "Longsword" || myCharacter.weapon === "Rapier") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 8) + 1
                let die2 = Math.floor(Math.random() * 8) + 1
                weaponDamage = die1 + die2
            } else {
                let die3 = Math.floor(Math.random() * 8) + 1
                weaponDamage = die3
            }
        } else if (myCharacter.weapon === "Greataxe") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 12) + 1
                let die2 = Math.floor(Math.random() * 12) + 1
                weaponDamage = die1 + die2
            } else {
                let die3 = Math.floor(Math.random() * 12) + 1
                weaponDamage = die3
            }
        } else if (myCharacter.weapon === "Greatsword") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 6) + 1
                let die2 = Math.floor(Math.random() * 6) + 1
                let die3 = Math.floor(Math.random() * 6) + 1
                weaponDamage = die1 + die2 + die3
            } else {
                let die4 = Math.floor(Math.random() * 6) + 1
                let die5 = Math.floor(Math.random() * 6) + 1
                weaponDamage = die4 + die5
            }
        } else if (myCharacter.weapon === "Glaive") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 10) + 1
                let die2 = Math.floor(Math.random() * 10) + 1
                weaponDamage = die1 + die2
            } else {
                let die3 = Math.floor(Math.random() * 10) + 1
                weaponDamage = die3
            }
        } else {
            console.log("unrecognized weapon")
        }
        console.log("My weaponDamage is: " + weaponDamage)
        if (myConditions.raging) {
            // not level specific yet
            rageDamage = 2
            console.log("I'm raging, so I get an additional " + rageDamage + " damage")
        }
        console.log("I add my primary stat modifier to the damage, which is " + primaryStatModifierDamage)
        let damage = weaponDamage + rageDamage + primaryStatModifierDamage
        let finalDamage = 0
        if (enemyConditions.physicalresistance) {
            finalDamage = Math.floor(damage / 2)
            console.log("My enemy has physical resistance, which cuts my damage in half")
        } else {
            finalDamage = damage
        }
        console.log("My total damage is " + finalDamage)

        enemyCharacter.hitpoints -= finalDamage
        if (enemyCharacter.hitpoints < 1) {
            console.log(enemyCharacter.name + " down")
            connection.end()
        } else {
            console.log("enemy's HP: " + enemyCharacter.hitpoints)
            fighterAttack1(enemyCharacter, enemyConditions, myCharacter, myConditions)
        }

    } else {
        console.log("My bonusToHit (" + bonusToHit + ") + my d20 (" + d20 + ") is less than my enemy's AC (" + AC + "), so I miss")
        console.log("enemy's HP: " + enemyCharacter.hitpoints)
        fighterAttack1(enemyCharacter, enemyConditions, myCharacter, myConditions)
    }

}

function fighterAttack1(myCharacter, myConditions, enemyCharacter, enemyConditions) {
    // if (myConditions.paralyzed) {
    //     savingThrow();
    // }
    console.log("***************************************************************")
    console.log(myCharacter.name + "'s turn to attack " + enemyCharacter.name)

    let AC = enemyCharacter.armorclass
    console.log("Enemy's Armor Class: " + AC)
    let level = myCharacter.level

    // Initialize, get, announce proficiency
    let proficiency = convertLevelToProficiency(level)
    console.log("My Level is " + level + ", so my proficiency is " + proficiency)

    // Initialize, get, announce primaryStatModifier
    let primaryStatModifier = findPrimaryStatModifier(myCharacter)
    console.log("My primary stat modifier is " + primaryStatModifier)

    let bonusToHit = primaryStatModifier + proficiency
    console.log("My bonusToHit is my primary stat modifier plus my proficiency, which is: " + bonusToHit)

    let d20 = rollingD20(myConditions)

    console.log("d20: " + d20)
    console.log("AC: " + AC)
    if (bonusToHit + d20 >= AC) {
        console.log("My bonusToHit (" + bonusToHit + ") + my d20 (" + d20 + ") is greater or equal to my enemy's AC (" + AC + "), so I hit")
        let crit = false
        if (d20 === 20) {
            crit = true
            console.log("Ooh, a crit! That means I get to reroll a weapon die")
        }
        let weaponDamage = 0
        let rageDamage = 0
        let primaryStatModifierDamage = primaryStatModifier

        if (myCharacter.weapon === "Longsword" || myCharacter.weapon === "Rapier") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 8) + 1
                let die2 = Math.floor(Math.random() * 8) + 1
                weaponDamage = die1 + die2
            } else {
                let die3 = Math.floor(Math.random() * 8) + 1
                weaponDamage = die3
            }
        } else if (myCharacter.weapon === "Greataxe") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 12) + 1
                let die2 = Math.floor(Math.random() * 12) + 1
                weaponDamage = die1 + die2
            } else {
                let die3 = Math.floor(Math.random() * 12) + 1
                weaponDamage = die3
            }
        } else if (myCharacter.weapon === "Greatsword") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 6) + 1
                let die2 = Math.floor(Math.random() * 6) + 1
                let die3 = Math.floor(Math.random() * 6) + 1
                weaponDamage = die1 + die2 + die3
            } else {
                let die4 = Math.floor(Math.random() * 6) + 1
                let die5 = Math.floor(Math.random() * 6) + 1
                weaponDamage = die4 + die5
            }
        } else if (myCharacter.weapon === "Glaive") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 10) + 1
                let die2 = Math.floor(Math.random() * 10) + 1
                weaponDamage = die1 + die2
            } else {
                let die3 = Math.floor(Math.random() * 10) + 1
                weaponDamage = die3
            }
        } else {
            console.log("unrecognized weapon")
        }
        console.log("My weaponDamage is: " + weaponDamage)
        if (myConditions.raging) {
            // not level specific yet
            rageDamage = 2
            console.log("I'm raging, so I get an additional " + rageDamage + " damage")
        }
        console.log("I add my primary stat modifier to the damage, which is " + primaryStatModifierDamage)
        let damage = weaponDamage + rageDamage + primaryStatModifierDamage
        let finalDamage = 0
        if (enemyConditions.physicalresistance) {
            finalDamage = Math.floor(damage / 2)
            console.log("My enemy has physical resistance, which cuts my damage in half")
        } else {
            finalDamage = damage
        }
        console.log("My total damage is " + finalDamage)

        enemyCharacter.hitpoints -= finalDamage
        if (enemyCharacter.hitpoints < 1) {
            console.log(enemyCharacter.name + " down")
            connection.end()
        } else {
            console.log("enemy's HP: " + enemyCharacter.hitpoints)
            barbarianAttack1(enemyCharacter, enemyConditions, myCharacter, myConditions)
        }

    } else {
        console.log("My bonusToHit (" + bonusToHit + ") + my d20 (" + d20 + ") is less than my enemy's AC (" + AC + "), so I miss")
        console.log("enemy's HP: " + enemyCharacter.hitpoints)
        barbarianAttack1(enemyCharacter, enemyConditions, myCharacter, myConditions)
    }

}

function rogueAttack() {

}