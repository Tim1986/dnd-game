function statToModifier(stat) {
    if (stat === 8 || stat === 9) {
        return -1
    } else if (stat === 12 || stat === 13) {
        return 1
    } else if (stat === 14 || stat === 15) {
        return 2
    } else if (stat === 16 || stat === 17) {
        return 3
    } else if (stat === 18 || stat === 19) {
        return 4
    } else if (stat === 20) {
        return 5
    }
}

module.exports = statToModifier