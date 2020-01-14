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

module.exports = findInitiative