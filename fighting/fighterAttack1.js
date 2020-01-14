const barbarianAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/barbarianAttack1")
const fighterAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/fighterAttack1")
const rogueAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/rogueAttack1")
const wizardAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/wizardAttack1")
const generalCombat = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/generalCombat")

function fighterAttack1(myCharacter, myConditions, enemyCharacter, enemyConditions) {
    if (myConditions.paralyzed) {
        console.log("I'm paralyzed, so the only thing to do is roll to break it. My D20 roll plus my wisdom save (" + myCharacter.wisdomSave + ") needs to beat the Wizard's spell save (" + enemyCharacter.spellSave)
        let die1 = Math.floor(Math.random() * 20) + 1
        if (die1 + myCharacter.wisdomSave >= enemyCharacter.spellSave) {
            console.log("I broke the paralysis with a roll of " + die1 + ". Next turn I'll get him!")
            myConditions.paralyzed = false
            wizardAttack1(enemyCharacter, enemyConditions, myCharacter, myConditions)
        } else {
            console.log("Sigh, I couldn't break the paralysis, I only rolled a " + die1)
            wizardAttack1(enemyCharacter, enemyConditions, myCharacter, myConditions)
        }
    } else {
        let finalDamage = 0
        let firstAttackDamage = generalCombat(myCharacter, myConditions, enemyCharacter, enemyConditions, false)
        finalDamage += firstAttackDamage
        if (myCharacter.level > 4) {
            let secondAttackDamage = generalCombat(myCharacter, myConditions, enemyCharacter, enemyConditions, false)
            finalDamage += secondAttackDamage
        }
        if (myCharacter.level > 10) {
            let thirdAttackDamage = generalCombat(myCharacter, myConditions, enemyCharacter, enemyConditions, false)
            finalDamage += thirdAttackDamage
        }
        if (myCharacter.level === 20) {
            let fourthAttackDamage = generalCombat(myCharacter, myConditions, enemyCharacter, enemyConditions, false)
            finalDamage += fourthAttackDamage
        }

        enemyCharacter.hitpoints -= finalDamage
        if (enemyCharacter.hitpoints < 1) {
            console.log(enemyCharacter.name + " down")
            connection.end()
        } else {
            console.log("enemy's HP: " + enemyCharacter.hitpoints)
            if (enemyCharacter.class === "Barbarian") {
                barbarianAttack1(enemyCharacter, enemyConditions, myCharacter, myConditions)
            } else if (enemyCharacter.class === "Fighter") {
                fighterAttack1(enemyCharacter, enemyConditions, myCharacter, myConditions)
            } else if (enemyCharacter.class === "Rogue") {
                rogueAttack1(enemyCharacter, enemyConditions, myCharacter, myConditions)
            } else if (enemyCharacter.class === "Wizard") {
                wizardAttack1(enemyCharacter, enemyConditions, myCharacter, myConditions)
            }
        }
    }
}

module.exports = fighterAttack1