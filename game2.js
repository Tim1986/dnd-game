console.log("Casting Firebolt!")

let AC = enemyCharacter.armorclass
console.log("Enemy's Armor Class: " + AC)
let level = myCharacter.level

// Initialize, get, announce proficiency
let proficiency = convertLevelToProficiency(level)
console.log("My Level is " + level + ", so my proficiency is " + proficiency)

let bonusToHit = mycharacter.spellAttack

let d20 = rollingD20(myConditions)

console.log("d20: " + d20)
console.log("AC: " + AC)

if (bonusToHit + d20 >= AC) {
    console.log("My bonusToHit (" + bonusToHit + ") + my d20 (" + d20 + ") is greater or equal to my enemy's AC (" + AC + "), so I hit")
    let crit = false
    if (d20 === 20 || enemyConditions.paralyzed) {
        crit = true
        console.log("Ooh, a crit! That means I get to double my cantrip damage!")
    }
    let weaponDamage = 0
    if (myCharacter.level < 5) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 10) + 1
            let die2 = Math.floor(Math.random() * 10) + 1
            weaponDamage += die1 + die2
        } else {
            let die1 = Math.floor(Math.random() * 10) + 1
            weaponDamage += die1
        }
    } else if (myCharacter.level < 11 && myCharacter.level > 4) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 10) + 1
            let die2 = Math.floor(Math.random() * 10) + 1
            let die3 = Math.floor(Math.random() * 10) + 1
            let die4 = Math.floor(Math.random() * 10) + 1
            weaponDamage += die1 + die2 + die3 + die4
        } else {
            let die1 = Math.floor(Math.random() * 10) + 1
            let die2 = Math.floor(Math.random() * 10) + 1
            weaponDamage += die1 + die2
        }
    } else if (myCharacter.level < 17 && myCharacter.level > 10) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 10) + 1
            let die2 = Math.floor(Math.random() * 10) + 1
            let die3 = Math.floor(Math.random() * 10) + 1
            let die4 = Math.floor(Math.random() * 10) + 1
            let die5 = Math.floor(Math.random() * 10) + 1
            let die6 = Math.floor(Math.random() * 10) + 1
            weaponDamage += die1 + die2 + die3 + die4 + die5 + die6
        } else {
            let die1 = Math.floor(Math.random() * 10) + 1
            let die2 = Math.floor(Math.random() * 10) + 1
            let die3 = Math.floor(Math.random() * 10) + 1
            weaponDamage += die1 + die2 + die3
        }
    } else {
        if (crit) {
            let die1 = Math.floor(Math.random() * 10) + 1
            let die2 = Math.floor(Math.random() * 10) + 1
            let die3 = Math.floor(Math.random() * 10) + 1
            let die4 = Math.floor(Math.random() * 10) + 1
            let die5 = Math.floor(Math.random() * 10) + 1
            let die6 = Math.floor(Math.random() * 10) + 1
            let die7 = Math.floor(Math.random() * 10) + 1
            let die8 = Math.floor(Math.random() * 10) + 1
            weaponDamage += die1 + die2 + die3 + die4 + die5 + die6 + die7 + die8
        } else {
            let die1 = Math.floor(Math.random() * 10) + 1
            let die2 = Math.floor(Math.random() * 10) + 1
            let die3 = Math.floor(Math.random() * 10) + 1
            let die4 = Math.floor(Math.random() * 10) + 1
            weaponDamage += die1 + die2 + die3 + die4
        }
    }
    enemyCharacter.hitpoints -= weaponDamage

} else {
    console.log("My bonusToHit (" + bonusToHit + ") + my d20 (" + d20 + ") is less than my enemy's AC (" + AC + "), so I miss")
}