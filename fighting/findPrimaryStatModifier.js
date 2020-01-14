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

module.exports = findPrimaryStatModifier