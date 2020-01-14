const inquirer = require("inquirer");
const mysql = require("mysql");

const findInitiative = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/findInitiative")
const rollForInitiative = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/rollForInitiative")
const convertLevelToProficiency = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/convertLevelToProficiency")
const statToModifier = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/statToModifier")
const barbarianAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/barbarianAttack1")
const fighterAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/fighterAttack1")
const rogueAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/rogueAttack1")
const wizardAttack1 = require("/users/Timothy Brahm/Coding Projects/dnd-game/fighting/wizardAttack1")

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: "root",
    password: "root",
    database: "dnd_db"
});

function fight() {
    connection.query("SELECT name FROM characters", function (err, res) {
        if (err) throw err;
        const characterArray = [];
        for (let i = 0; i < res.length; i++) {
            characterArray.push(res[i]);
        }

        inquirer.prompt([
            {
                type: "checkbox",
                name: "characterChoices",
                message: "Choose two characters to fight each other",
                choices: characterArray
            }
        ]).then(function (response) {
            if (response.characterChoices.length === 2) {
                let combatant1 = response.characterChoices[0]
                let combatant2 = response.characterChoices[1]
                connection.query("SELECT dexterity FROM characters WHERE ?",
                    [
                        {
                            name: combatant1
                        }
                    ],
                    function (err, res) {
                        let combatant1Dex = res[0].dexterity
                        console.log(combatant1Dex)

                        connection.query("SELECT dexterity FROM characters WHERE ?",
                            [
                                {
                                    name: combatant2
                                }
                            ],
                            function (err, res) {
                                let combatant2Dex = res[0].dexterity
                                console.log(combatant2Dex)

                                let combatant1DexMod = findInitiative(combatant1Dex)
                                let combatant2DexMod = findInitiative(combatant2Dex)
                                let wonInitiative = ""
                                if (rollForInitiative(combatant1, combatant1DexMod, combatant2, combatant2DexMod) === 1) {
                                    wonInitiative = combatant1
                                    console.log(combatant1 + " goes first")
                                } else {
                                    wonInitiative = combatant2
                                    console.log(combatant2 + " goes first")
                                }

                                connection.query("SELECT * FROM characters WHERE ?",
                                    [
                                        {
                                            name: combatant1
                                        }
                                    ],
                                    function (err, res) {
                                        let character1 = res[0]
                                        let proficiency = convertLevelToProficiency(character1.level)
                                        let conModifier = statToModifier(character1.constitution)
                                        let wisModifier = statToModifier(character1.wisdom)
                                        let intModifier = statToModifier(character1.intelligence)
                                        let dexModifier = statToModifier(character1.dexterity)
                                        if (character1.class === "Barbarian" || character1.class === "Fighter") {
                                            character1.constitutionSave = proficiency + conModifier
                                            character1.wisdomSave = wisModifier
                                            character1.dexteritySave = dexModifier
                                        } else if (character1.class === "Rogue") {
                                            character1.constitutionSave = conModifier
                                            character1.wisdomSave = proficiency + wisModifier
                                            character1.dexteritySave = proficiency + dexModifier
                                        } else if (character1.class === "Wizard") {
                                            character1.constitutionSave = conModifier
                                            character1.wisdomSave = proficiency + wisModifier
                                            character1.dexteritySave = dexModifier
                                            character1.spellSave = 8 + proficiency + intModifier
                                            character1.spellAttack = proficiency + intModifier
                                            if (character1.level === 1) {
                                                character1.spellSlots = {
                                                    levelOne: 2
                                                }
                                            } else if (character1.level === 2) {
                                                character1.spellSlots = {
                                                    levelOne: 3
                                                }
                                            } else if (character1.level === 3) {
                                                character1.spellSlots = {
                                                    levelOne: 4,
                                                    levelTwo: 2
                                                }
                                            } else if (character1.level === 4) {
                                                character1.spellSlots = {
                                                    levelOne: 4,
                                                    levelTwo: 3
                                                }
                                            } else if (character1.level === 5) {
                                                character1.spellSlots = {
                                                    levelOne: 4,
                                                    levelTwo: 3,
                                                    levelThree: 2
                                                }
                                            } else {
                                                character1.spellSlots = {
                                                    levelOne: 4,
                                                    levelTwo: 3,
                                                    levelThree: 3
                                                }
                                            }
                                        }

                                        let character1conditions = {
                                            hasadvantage: false,
                                            hasdisdavantage: false,
                                            paralyzed: false,
                                            concentrating: false,
                                            raging: false,
                                            physicalresistance: false
                                        }
                                        let character2conditions = {
                                            hasadvantage: false,
                                            hasdisdavantage: false,
                                            paralyzed: false,
                                            concentrating: false,
                                            raging: false,
                                            physicalresistance: false
                                        }
                                        connection.query("SELECT * FROM characters WHERE ?",
                                            [
                                                {
                                                    name: combatant2
                                                }
                                            ],
                                            function (err, res) {
                                                let character2 = res[0]
                                                // con save

                                                let proficiency = convertLevelToProficiency(character2.level)
                                                let conModifier = statToModifier(character2.constitution)
                                                let wisModifier = statToModifier(character2.wisdom)
                                                let intModifier = statToModifier(character2.intelligence)
                                                let dexModifier = statToModifier(character2.dexterity)
                                                if (character2.class === "Barbarian" || character2.class === "Fighter") {
                                                    character2.constitutionSave = proficiency + conModifier
                                                    character2.wisdomSave = wisModifier
                                                    character2.dexteritySave = dexModifier
                                                } else if (character2.class === "Rogue") {
                                                    character2.constitutionSave = conModifier
                                                    character2.wisdomSave = proficiency + wisModifier
                                                    character2.dexteritySave = proficiency + dexModifier
                                                } else if (character2.class === "Wizard") {
                                                    character2.constitutionSave = conModifier
                                                    character2.wisdomSave = proficiency + wisModifier
                                                    character2.dexteritySave = dexModifier
                                                    character2.spellSave = 8 + proficiency + intModifier
                                                    character2.spellAttack = proficiency + intModifier
                                                    if (character2.level === 1) {
                                                        character2.spellSlots = {
                                                            levelOne: 2
                                                        }
                                                    } else if (character2.level === 2) {
                                                        character2.spellSlots = {
                                                            levelOne: 3
                                                        }
                                                    } else if (character2.level === 3) {
                                                        character2.spellSlots = {
                                                            levelOne: 4,
                                                            levelTwo: 2
                                                        }
                                                    } else if (character2.level === 4) {
                                                        character2.spellSlots = {
                                                            levelOne: 4,
                                                            levelTwo: 3
                                                        }
                                                    } else if (character2.level === 5) {
                                                        character2.spellSlots = {
                                                            levelOne: 4,
                                                            levelTwo: 3,
                                                            levelThree: 2
                                                        }
                                                    } else {
                                                        character2.spellSlots = {
                                                            levelOne: 4,
                                                            levelTwo: 3,
                                                            levelThree: 3
                                                        }
                                                    }
                                                }

                                                if (wonInitiative === combatant1) {
                                                    if (character1.class === "Barbarian") {
                                                        barbarianAttack1(character1, character1conditions, character2, character2conditions)
                                                    } else if (character1.class === "Fighter") {
                                                        fighterAttack1(character1, character1conditions, character2, character2conditions)
                                                    } else if (character1.class === "Rogue") {
                                                        rogueAttack1(character1, character1conditions, character2, character2conditions)
                                                    } else if (character1.class === "Wizard") {
                                                        wizardAttack1(character1, character1conditions, character2, character2conditions)
                                                    }
                                                } else {
                                                    if (character2.class === "Barbarian") {
                                                        barbarianAttack1(character2, character2conditions, character1, character1conditions)
                                                    } else if (character2.class === "Fighter") {
                                                        fighterAttack1(character2, character2conditions, character1, character1conditions)
                                                    } else if (character2.class === "Rogue") {
                                                        rogueAttack1(character2, character2conditions, character1, character1conditions)
                                                    } else if (character2.class === "Wizard") {
                                                        wizardAttack1(character2, character2conditions, character1, character1conditions)

                                                    }
                                                }
                                            }
                                        )
                                    }
                                )
                            }
                        )
                    }
                )
            } else {
                console.log("Please select two characters")
                fight()
            }
        })
    })
}

module.exports = fight