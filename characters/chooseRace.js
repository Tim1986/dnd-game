const inquirer = require("inquirer");
const chooseSubrace = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/chooseSubrace")

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

module.exports = chooseRace