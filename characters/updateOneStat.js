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

module.exports = updateOneStat