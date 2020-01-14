function calculateSneakAttack(myCharacter, crit) {
    if (myCharacter.level === 1 || myCharacter.level === 2) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2
        } else {
            let die1 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1
        }
    } else if (myCharacter.level === 3 || myCharacter.level === 4) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4
        } else {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2
        }
    } else if (myCharacter.level === 5 || myCharacter.level === 6) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6
        } else {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3
        }
    } else if (myCharacter.level === 7 || myCharacter.level === 8) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            let die7 = Math.floor(Math.random() * 6) + 1
            let die8 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6 + die7 + die8
        } else {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4
        }
    } else if (myCharacter.level === 9 || myCharacter.level === 10) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            let die7 = Math.floor(Math.random() * 6) + 1
            let die8 = Math.floor(Math.random() * 6) + 1
            let die9 = Math.floor(Math.random() * 6) + 1
            let die10 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6 + die7 + die8 + die9 + die10
        } else {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5
        }
    } else if (myCharacter.level === 11 || myCharacter.level === 12) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            let die7 = Math.floor(Math.random() * 6) + 1
            let die8 = Math.floor(Math.random() * 6) + 1
            let die9 = Math.floor(Math.random() * 6) + 1
            let die10 = Math.floor(Math.random() * 6) + 1
            let die11 = Math.floor(Math.random() * 6) + 1
            let die12 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6 + die7 + die8 + die9 + die10 + die11 + die12
        } else {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6
        }
    } else if (myCharacter.level === 13 || myCharacter.level === 14) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            let die7 = Math.floor(Math.random() * 6) + 1
            let die8 = Math.floor(Math.random() * 6) + 1
            let die9 = Math.floor(Math.random() * 6) + 1
            let die10 = Math.floor(Math.random() * 6) + 1
            let die11 = Math.floor(Math.random() * 6) + 1
            let die12 = Math.floor(Math.random() * 6) + 1
            let die13 = Math.floor(Math.random() * 6) + 1
            let die14 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6 + die7 + die8 + die9 + die10 + die11 + die12 + die13 + die14
        } else {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            let die7 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6 + die7
        }
    } else if (myCharacter.level === 15 || myCharacter.level === 16) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            let die7 = Math.floor(Math.random() * 6) + 1
            let die8 = Math.floor(Math.random() * 6) + 1
            let die9 = Math.floor(Math.random() * 6) + 1
            let die10 = Math.floor(Math.random() * 6) + 1
            let die11 = Math.floor(Math.random() * 6) + 1
            let die12 = Math.floor(Math.random() * 6) + 1
            let die13 = Math.floor(Math.random() * 6) + 1
            let die14 = Math.floor(Math.random() * 6) + 1
            let die15 = Math.floor(Math.random() * 6) + 1
            let die16 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6 + die7 + die8 + die9 + die10 + die11 + die12 + die13 + die14 + die15 + die16
        } else {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            let die7 = Math.floor(Math.random() * 6) + 1
            let die8 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6 + die7 + die8
        }
    } else if (myCharacter.level === 17 || myCharacter.level === 18) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            let die7 = Math.floor(Math.random() * 6) + 1
            let die8 = Math.floor(Math.random() * 6) + 1
            let die9 = Math.floor(Math.random() * 6) + 1
            let die10 = Math.floor(Math.random() * 6) + 1
            let die11 = Math.floor(Math.random() * 6) + 1
            let die12 = Math.floor(Math.random() * 6) + 1
            let die13 = Math.floor(Math.random() * 6) + 1
            let die14 = Math.floor(Math.random() * 6) + 1
            let die15 = Math.floor(Math.random() * 6) + 1
            let die16 = Math.floor(Math.random() * 6) + 1
            let die17 = Math.floor(Math.random() * 6) + 1
            let die18 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6 + die7 + die8 + die9 + die10 + die11 + die12 + die13 + die14 + die15 + die16 + die17 + die18
        } else {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            let die7 = Math.floor(Math.random() * 6) + 1
            let die8 = Math.floor(Math.random() * 6) + 1
            let die9 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6 + die7 + die8 + die9
        }
    } else if (myCharacter.level === 19 || myCharacter.level === 20) {
        if (crit) {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            let die7 = Math.floor(Math.random() * 6) + 1
            let die8 = Math.floor(Math.random() * 6) + 1
            let die9 = Math.floor(Math.random() * 6) + 1
            let die10 = Math.floor(Math.random() * 6) + 1
            let die11 = Math.floor(Math.random() * 6) + 1
            let die12 = Math.floor(Math.random() * 6) + 1
            let die13 = Math.floor(Math.random() * 6) + 1
            let die14 = Math.floor(Math.random() * 6) + 1
            let die15 = Math.floor(Math.random() * 6) + 1
            let die16 = Math.floor(Math.random() * 6) + 1
            let die17 = Math.floor(Math.random() * 6) + 1
            let die18 = Math.floor(Math.random() * 6) + 1
            let die19 = Math.floor(Math.random() * 6) + 1
            let die20 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6 + die7 + die8 + die9 + die10 + die11 + die12 + die13 + die14 + die15 + die16 + die17 + die18 + die19 + die20
        } else {
            let die1 = Math.floor(Math.random() * 6) + 1
            let die2 = Math.floor(Math.random() * 6) + 1
            let die3 = Math.floor(Math.random() * 6) + 1
            let die4 = Math.floor(Math.random() * 6) + 1
            let die5 = Math.floor(Math.random() * 6) + 1
            let die6 = Math.floor(Math.random() * 6) + 1
            let die7 = Math.floor(Math.random() * 6) + 1
            let die8 = Math.floor(Math.random() * 6) + 1
            let die9 = Math.floor(Math.random() * 6) + 1
            let die10 = Math.floor(Math.random() * 6) + 1
            sneakAttackDamage = die1 + die2 + die3 + die4 + die5 + die6 + die7 + die8 + die9 + die10
        }
    }
    console.log("I'm a Rogue, so I also get to add sneak attack damage: " + sneakAttackDamage)
    return sneakAttackDamage
}

module.exports = calculateSneakAttack