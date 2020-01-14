const barbarianAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/barbarianAttack1")
const fighterAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/fighterAttack1")
const rogueAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/rogueAttack1")
const wizardAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/wizardAttack1")
const generalCombat = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/generalCombat")

function barbarianAttack3(myCharacter, myConditions, enemyCharacter, enemyConditions) {
    let finalDamage = 0
    let firstAttackDamage = generalCombat(myCharacter, myConditions, enemyCharacter, enemyConditions, false)
    finalDamage += firstAttackDamage
    if (myCharacter.level > 4) {
        let secondAttackDamage = generalCombat(myCharacter, myConditions, enemyCharacter, enemyConditions, false)
        finalDamage += secondAttackDamage
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

module.exports = barbarianAttack3