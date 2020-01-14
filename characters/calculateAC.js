const updateDatabase = require("/users/Timothy Brahm/Coding Projects/dnd-game/characters/updateDatabase")

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
    } else if (character.armortype === "None") {
        character.armorclass = 10 + dexModifier
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
    } else if (character.class === "Wizard") {
        character.hitpoints = 6 + conModifier
    }
    console.log(character)
    updateDatabase(character)
}

module.exports = calculateAC