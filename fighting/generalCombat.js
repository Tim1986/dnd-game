const convertLevelToProficiency = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/convertLevelToProficiency")
const findPrimaryStatModifier = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/findPrimaryStatModifier")
const rollingD20 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/rollingD20")
const calculateSneakAttack = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/calculateSneakAttack")

function generalCombat(myCharacter, myConditions, enemyCharacter, enemyConditions, isOffHandAttack, hasUsedSneakAttackThisTurn) {
    console.log("***************************************************************")
    console.log(myCharacter.name + "'s turn to attack " + enemyCharacter.name)

    let AC = enemyCharacter.armorclass
    console.log("Enemy's Armor Class: " + AC)
    let level = myCharacter.level

    // Initialize, get, announce proficiency
    let proficiency = convertLevelToProficiency(level)
    console.log("My Level is " + level + ", so my proficiency is " + proficiency)

    // Initialize, get, announce primaryStatModifier
    let primaryStatModifier = findPrimaryStatModifier(myCharacter)
    console.log("My primary stat modifier is " + primaryStatModifier)

    let bonusToHit = primaryStatModifier + proficiency
    console.log("My bonusToHit is my primary stat modifier plus my proficiency, which is: " + bonusToHit)

    let d20 = rollingD20(myConditions)

    console.log("d20: " + d20)
    console.log("AC: " + AC)
    if (bonusToHit + d20 >= AC) {
        console.log("My bonusToHit (" + bonusToHit + ") + my d20 (" + d20 + ") is greater or equal to my enemy's AC (" + AC + "), so I hit")
        let crit = false
        if (d20 === 20) {
            crit = true
            console.log("Ooh, a crit! That means I get to reroll a weapon die")
        }
        let weaponDamage = 0
        let rageDamage = 0
        let sneakAttackDamage = 0
        let primaryStatModifierDamage = primaryStatModifier

        if (myCharacter.weapon === "Longsword" || myCharacter.weapon === "Rapier") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 8) + 1
                let die2 = Math.floor(Math.random() * 8) + 1
                weaponDamage = die1 + die2
            } else {
                let die3 = Math.floor(Math.random() * 8) + 1
                weaponDamage = die3
            }
        } else if (myCharacter.weapon === "Greataxe") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 12) + 1
                let die2 = Math.floor(Math.random() * 12) + 1
                weaponDamage = die1 + die2
            } else {
                let die3 = Math.floor(Math.random() * 12) + 1
                weaponDamage = die3
            }
        } else if (myCharacter.weapon === "Greatsword") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 6) + 1
                let die2 = Math.floor(Math.random() * 6) + 1
                let die3 = Math.floor(Math.random() * 6) + 1
                weaponDamage = die1 + die2 + die3
            } else {
                let die4 = Math.floor(Math.random() * 6) + 1
                let die5 = Math.floor(Math.random() * 6) + 1
                weaponDamage = die4 + die5
            }
        } else if (myCharacter.weapon === "Glaive") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 10) + 1
                let die2 = Math.floor(Math.random() * 10) + 1
                weaponDamage = die1 + die2
            } else {
                let die3 = Math.floor(Math.random() * 10) + 1
                weaponDamage = die3
            }
        } else if (myCharacter.weapon === "Shortswords") {
            if (crit) {
                let die1 = Math.floor(Math.random() * 6) + 1
                let die2 = Math.floor(Math.random() * 6) + 1
                weaponDamage = die1 + die2
            } else {
                let die3 = Math.floor(Math.random() * 6) + 1
                weaponDamage = die3
            }
        } else {
            console.log("unrecognized weapon")
        }
        console.log("My weaponDamage is: " + weaponDamage)
        if (myConditions.raging) {
            // not level specific yet
            rageDamage = 2
            console.log("I'm raging, so I get an additional " + rageDamage + " damage")
        }

        if (myCharacter.class === "Rogue" && (myCharacter.weapon === "Rapier" || myCharacter.weapon === "Shortswords") && !hasUsedSneakAttackThisTurn) {
            sneakAttackDamage = calculateSneakAttack(myCharacter, crit)
        }

        let damage = 0
        if (isOffHandAttack === false) {
            console.log("I add my primary stat modifier to the damage, which is " + primaryStatModifierDamage)
            damage = weaponDamage + rageDamage + primaryStatModifierDamage + sneakAttackDamage
        } else {
            console.log("This is an offhand attack, so I don't had my primary stat modifier to the damage")
            damage = weaponDamage + sneakAttackDamage
        }
        let finalDamage = 0
        if (enemyConditions.physicalresistance) {
            finalDamage = Math.floor(damage / 2)
            console.log("My enemy has physical resistance, which cuts my damage in half")
        } else {
            finalDamage = damage
        }
        console.log("My total damage from this swing is " + finalDamage)
        return finalDamage
    } else {
        console.log("My bonusToHit (" + bonusToHit + ") + my d20 (" + d20 + ") is less than my enemy's AC (" + AC + "), so I miss")
        return 0
    }
}

module.exports = generalCombat