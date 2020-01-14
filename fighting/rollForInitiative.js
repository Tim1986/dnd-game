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

module.exports = rollForInitiative