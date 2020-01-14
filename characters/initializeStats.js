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

module.exports = initializeStats