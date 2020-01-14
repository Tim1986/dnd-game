const barbarianAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/barbarianAttack1")
const fighterAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/fighterAttack1")
const rogueAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/rogueAttack1")
const wizardAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/wizardAttack1")
const convertLevelToProficiency = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/convertLevelToProficiency")
const rollingD20 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/rollingD20")

function wizardAttack1(myCharacter, myConditions, enemyCharacter, enemyConditions) {
    console.log("***************************************************************")
    console.log(myCharacter.name + "'s turn to attack " + enemyCharacter.name)
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
        let spellLevelChoicesArray = [0]
        if (myCharacter.spellSlots.levelOne > 0) {
            spellLevelChoicesArray.push(1)
        }
        if (myCharacter.spellSlots.levelTwo > 0) {
            spellLevelChoicesArray.push(2)
        }
        if (myCharacter.spellSlots.levelThree > 0) {
            spellLevelChoicesArray.push(3)
        }
        inquirer.prompt([
            {
                type: "list",
                name: "spellLevel",
                message: "What level spell would you like to cast? Options dependent on available spell slots",
                choices: spellLevelChoicesArray
            }
        ]).then(function (response) {
            if (response.spellLevel === 0) {
                console.log("Casting Firebolt!")

                let AC = enemyCharacter.armorclass
                console.log("Enemy's Armor Class: " + AC)
                let level = myCharacter.level

                // Initialize, get, announce proficiency
                let proficiency = convertLevelToProficiency(level)
                console.log("My Level is " + level + ", so my proficiency is " + proficiency)

                let bonusToHit = myCharacter.spellAttack

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
                    console.log("Firebolt damage: " + weaponDamage)
                    enemyCharacter.hitpoints -= weaponDamage

                } else {
                    console.log("My bonusToHit (" + bonusToHit + ") + my d20 (" + d20 + ") is less than my enemy's AC (" + AC + "), so I miss")
                }
            } else if (response.spellLevel === 1) {
                console.log("Casting Magic Missile!")
                myCharacter.spellSlots.levelOne -= 1
                console.log("Magic Missile never misses!")
                let die1 = Math.floor(Math.random() * 4) + 1
                let finalDamage = (die1 + 1) * (3)
                console.log("Magic missile damage: " + finalDamage)
                enemyCharacter.hitpoints -= finalDamage
            } else if (response.spellLevel === 2) {
                console.log("Casting Hold Person!")
                myCharacter.spellSlots.levelTwo -= 1
                console.log("In order to land, I need my opponent's D20 + wisdom save (" + enemyCharacter.wisdomSave + ") to be lower than my spell save (" + myCharacter.spellSave + ")")
                let d20 = Math.floor(Math.random() * 20) + 1
                if (d20 + enemyCharacter.wisdomSave >= myCharacter.spellSave) {
                    console.log("He evaded my paralysis with a roll of " + d20 + ". Sad!")
                } else {
                    console.log("Haha, he only rolled a " + d20 + ", he's paralyzed now! My attack rolls will auto crit and he can only spend his turns trying to break the paralysis.")
                    enemyConditions.paralyzed = true
                }
            } else if (response.spellLevel === 3) {
                console.log("Casting Fireball!")
                myCharacter.spellSlots.levelThree -= 1
                console.log("If " + enemyCharacter.name + " fails their dexterity saving throw, they take 8D6 damage. Otherwise half")
                let d20 = Math.floor(Math.random() * 20) + 1
                let die1 = Math.floor(Math.random() * 6) + 1
                let die2 = Math.floor(Math.random() * 6) + 1
                let die3 = Math.floor(Math.random() * 6) + 1
                let die4 = Math.floor(Math.random() * 6) + 1
                let die5 = Math.floor(Math.random() * 6) + 1
                let die6 = Math.floor(Math.random() * 6) + 1
                let die7 = Math.floor(Math.random() * 6) + 1
                let die8 = Math.floor(Math.random() * 6) + 1
                let damage = die1 + die2 + die3 + die4 + die5 + die6 + die7 + die8
                if (d20 + enemyCharacter.dexteritySave >= myCharacter.spellSave) {
                    console.log("He made his save, but he still takes damage!")
                    let finalDamage = Math.floor(damage / 2)
                    console.log("Fireball damage: " + finalDamage)
                    enemyCharacter.hitpoints -= finalDamage
                } else {
                    console.log("Haha, he only rolled a " + d20 + ", he takes full damage!")
                    let finalDamage = damage
                    console.log("Fireball damage: " + finalDamage)
                    enemyCharacter.hitpoints -= finalDamage
                }
            }

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
        })
    }
}

module.exports = wizardAttack1