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

module.exports = convertLevelToProficiency