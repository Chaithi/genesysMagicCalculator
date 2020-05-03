/**
 * Genesys Magic Calculator.
 *
 * Provides players a way to build spells.
 *
 * @link   https://gmc.gamergadgets.net
 * @author Robert Thayer.
 * @since  01.03.2020
 * @version 0.2a
 */

// Set all document element ID references and set variables.
let int_ = document.getElementById("int"),
    cun_ = document.getElementById("cun"),
    wil_ = document.getElementById("wil"),
    prs_ = document.getElementById("prs"),
    knl_ = document.getElementById("knl"),
    arcana = document.getElementById("arcana"),
    divine = document.getElementById("divine"),
    primal = document.getElementById("primal"),
    runes = document.getElementById("runes"),
    verse = document.getElementById("verse"),
    attack = document.getElementById("attack"),
    augment = document.getElementById("augment"),
    barrier = document.getElementById("barrier"),
    conjure = document.getElementById("conjure"),
    curse = document.getElementById("curse"),
    dispel = document.getElementById("dispel"),
    heal = document.getElementById("heal"),
    mask = document.getElementById("mask"),
    predict = document.getElementById("predict"),
    transform = document.getElementById("transform"),
    utility = document.getElementById("utility"),
    diff_mod_ = document.getElementById("diff_mod"),
    imp_atk_ = document.getElementById("imp_atk"),
    spell_name_ = document.getElementById("name"),
    spellDiv = document.getElementById("spell"),
    concDiv = document.getElementById("concentrating"),
    types = [arcana, divine, primal, runes, verse],
    spellTypes = ["arcana", "divine", "primal", "runes", "verse"],
    spells = [attack, augment, barrier, conjure, curse, dispel, heal, mask, predict, transform, utility],
    concentrating = false,
    chosen_skill = "",
    chosen_spell = "";
// Set all const values that will be used throughout the settings.
const RANGES = ["Engaged", "Short", "Medium", "Long", "Extreme"],
    ATK_BASE = 1,
    ATK_RNG = 1,
    ATK_CONC = false,
    AUG_BASE = 2,
    AUG_RNG = 0,
    AUG_CONC = true,
    BAR_BASE = 1,
    BAR_RNG = 0,
    BAR_CONC = true,
    CON_BASE = 1,
    CON_RNG = 0,
    CON_CONC = true,
    CUR_BASE = 2,
    CUR_RNG = 1,
    CUR_CONC = true,
    DIS_BASE = 3,
    DIS_RNG = 1,
    DIS_CONC = false,
    HEA_BASE = 1,
    HEA_RNG = 0,
    HEA_CONC = false,
    MAS_BASE = 1,
    MAS_RNG = 1,
    MAS_CONC = true,
    PRE_BASE = 2,
    PRE_RNG = "",
    PRE_CONC = false,
    TRA_BASE = 2,
    TRA_RNG = "",
    TRA_CONC = true,
    UTI_BASE = 1,
    UTI_RNG = "",
    UTI_CONC = false;

// Values related to the localstorage key for saving and loading information.
const localStoreNameValue = "genesysMagicCalculator";
let storeValue = JSON.parse( localStorage.getItem(localStoreNameValue) );

// Load all characteristics if they were previously stored.
loadCharacteristics(storeValue);

// Saves the values set in Characteristics
// IDs of values should be:  int, wil, cun, prs, knl, which are pre-set in the variables.
function saveCharacteristics() {
    json_data = { 
        "int" : parseInt(int_.value),
        "cun" : parseInt(cun_.value),
        "wil" : parseInt(wil_.value),
        "prs" : parseInt(prs_.value),
        "knl" : parseInt(knl_.value),
    };
    localStorage.setItem( localStoreNameValue, JSON.stringify(json_data));
}

// Loads all values from local storage and puts them in the appropriate locations.
function loadCharacteristics() {
    if (storeValue != "") {
        int_.value = storeValue.int;
        cun_.value = storeValue.cun;
        wil_.value = storeValue.wil;
        prs_.value = storeValue.prs;
        knl_.value = storeValue.knl;
    }
}

// Shows or masks the creature features based on whether "Target Self/Creature" is selected for the Arcana > Mask spell list.
// boolean b Whether the mask is being enabled or disabled.
function showMaskCreature(b) {
    if (!b)
        Array.from(document.getElementsByClassName("target")).forEach(el => el.classList.add("d-none"));
    else
        Array.from(document.getElementsByClassName("target")).forEach(el => el.classList.remove("d-none"));
}

// Shows the different types of spell actions available based on skill type.
// Hides all others by default.
// string type The type of skill.
function showType(type) {
    types.forEach(div => div.classList.add("d-none"));
    type.classList.remove("d-none");
    spellTypes.forEach(st => Array.from(document.getElementsByClassName(st)).forEach(el => el.classList.add("d-none")));
    Array.from(document.getElementsByClassName("typed")).forEach(el => {
        el.checked = false;
        el.classList.remove("active");
    });
    switch (type) {
        case arcana:
            chosen_skill = "arcana";
            Array.from(document.getElementsByClassName("arcana")).forEach(el => el.classList.remove("d-none"));
            break;
        case divine:
            chosen_skill = "divine";
            Array.from(document.getElementsByClassName("divine")).forEach(el => el.classList.remove("d-none"));
            break;
        case primal:
            chosen_skill = "primal";
            Array.from(document.getElementsByClassName("primal")).forEach(el => el.classList.remove("d-none"));
            break;
        case runes:
            chosen_skill = "runes";
            Array.from(document.getElementsByClassName("runes")).forEach(el => el.classList.remove("d-none"));
            break;
        case verse:
            chosen_skill = "verse";
            Array.from(document.getElementsByClassName("verse")).forEach(el => el.classList.remove("d-none"));
            break;
        default:
            break;
    }
    generateSpell();
}

// Shows the specifica types of spells available based on a selected Spell Type.
// string spell The spell type to use.
function showSpell(spell) {
    spells.forEach(div => div.classList.add("d-none"));
    spell.classList.remove("d-none");
    switch (spell) {
        case attack:
            chosen_spell = "attack";
            break;
        case augment:
            chosen_spell = "augment";
            break;
        case barrier:
            chosen_spell = "barrier";
            break;
        case conjure:
            chosen_spell = "conjure";
            break;
        case curse:
            chosen_spell = "curse";
            break;
        case dispel:
            chosen_spell = "dispel";
            break;
        case heal:
            chosen_spell = "heal";
            break;
        case mask:
            chosen_spell = "mask";
            break;
        case predict:
            chosen_spell = "predict";
            break;
        case transform:
            chosen_spell = "transform";
            break;
        case utility:
            chosen_spell = "utility";
            break;
        default:
            break;
    }
    generateSpell();
}

// Adds what the range check is for a given spell type.
// string spellType The type of spell being cast.
function rangeCheck(spellType) {
    let val = 0;
    Array.from(document.getElementsByName(spellType + "_rng")).forEach(el => {
        if (el.checked)
            val = el.value;
    });
    return parseInt(val);
}

// Adds what the size check is for a given spell type.
// string spellType The type of spell being cast.
function sizeCheck(spellType) {
    let val = 0;
    Array.from(document.getElementsByName(spellType + "_size")).forEach(el => {
        if (el.checked)
            val = el.value;
    });
    return parseInt(val);
}

// Generates the spell's information, difficulty, and such based on the provided checked information.
function generateSpell() {
    let difficulty = 0,
        damage = 0,
        int = 0,
        cun = 0,
        wil = 0,
        prs = 0,
        knl = 0,
        imp_atk = 0,
        diff_mod = 0,
        spell_name = "",
        qualities = "",
        range = "",
        selected_range = 0,
        range_difference = 0,
        other = "",
        sil = -1,
        size_difference = 0,
        spell_string = "",
        concentration = false;
    if (int_.value != "")
        int = parseInt(int_.value);
    else
        int = 1;
    if (cun_.value != "")
        cun = parseInt(cun_.value);
    else
        cun = 1;
    if (wil_.value != "")
        wil = parseInt(wil_.value);
    else
        wil = 1;
    if (prs_.value != "")
        prs = parseInt(prs_.value);
    else
        prs = 1;
    if (knl_.value != "")
        knl = parseInt(knl_.value);
    else
        knl = 1;
    if (imp_atk_.value != "")
        imp_atk = parseInt(imp_atk_.value);
    else
        imp_atk = 0;
    if (diff_mod_ != "")
        diff_mod = parseInt(diff_mod_.value);
    else
        diff_mod = 0;
    spell_name = spell_name_.value;
    Array.from(document.getElementsByClassName("knl")).forEach(el => el.innerHTML = knl);
    switch (chosen_spell) {
        case "attack":
            selected_range = rangeCheck("atk");
            range = RANGES[selected_range];
            range_difference = Math.abs(selected_range - ATK_RNG);
            difficulty = ATK_BASE;
            concentration = ATK_CONC;
            switch (chosen_skill) {
                case "arcana":
                    damage = int;
                    break;
                case "divine":
                    damage = wil;
                    break;
                case "primal":
                    damage = cun;
                    break;
                case "runes":
                    damage = int;
                    break;
                default:
                    break;
            }
            if (document.getElementById("atk_rng_free").checked) {
                if (range_difference > 0)
                    difficulty += (range_difference - 1);
            } else
                difficulty += range_difference;
            if (document.getElementById("atk_blast_use").checked) {
                qualities += "Blast " + knl + "; ";
                if(!document.getElementById("atk_blast_free").checked)
                    difficulty++;
            }
            if (document.getElementById("atk_dead_use").checked) {
                qualities += "Critical: 2; Vicious " + knl + "; ";
                if (!document.getElementById("atk_dead_free").checked)
                    difficulty++;
            }
            if (document.getElementById("atk_fire_use").checked) {
                qualities += "Burn " + knl + "; ";
                if (!document.getElementById("atk_fire_free").checked)
                    difficulty++;
            }
            if (document.getElementById("atk_holy_use").checked) {
                other += "Each <span class='s'></span> deals 2 damage instead of 1 if target is antithesis to your diety. ";
                if (!document.getElementById("atk_holy_free").checked)
                    difficulty++;
            }
            if (document.getElementById("atk_ice_use").checked) {
                qualities += "Ensnare " + knl + "; ";
                if (!document.getElementById("atk_ice_free").checked)
                    difficulty++;
            }
            if (document.getElementById("atk_imp_use").checked) {
                qualities += "Knockdown; Disorient " + knl + "; ";
                if (!document.getElementById("atk_dead_free").checked)
                    difficulty++;
            }
            if (document.getElementById("atk_lig_use").checked) {
                qualities += "Auto-fire; Stun " + knl + "; ";
                if (!document.getElementById("atk_lig_free").checked)
                    difficulty++;
            }
            if (document.getElementById("atk_man_use").checked) {
                other += "May spend <span class='ad' to move target one range band in any direction. ";
                if (!document.getElementById("atk_man_free").checked)
                    difficulty++;
            }
            if (document.getElementById("atk_nl_use").checked) {
                qualities += "Stun Damage; ";
                if (!document.getElementById("atk_nl_free").checked)
                    difficulty++;
            }
            if (document.getElementById("atk_des_use").checked) {
                qualities += "Sunder; Pierce " + knl + "; ";
                if (!document.getElementById("atk_des_free").checked)
                    difficulty += 2;
            }
            if (document.getElementById("atk_emp_use").checked) {
                damage += damage;
                other += "If Blast is added, blast affects all creatures within Short range. ";
                if(!document.getElementById("atk_emp_free").checked)
                    difficulty += 2;
            }
            if (document.getElementById("atk_psn_use").checked) {
                other += "If attack hits, target must make a <b>Hard</b> (<span class='ddd'></span>) Resilience check or suffer " + knl + " wounds and " + knl + " strain. This counts as a poison."
                if (!document.getElementById("atk_psn_free").checked)
                    difficulty += 2;
            }
            break;
        case "augment":
            selected_range = rangeCheck("aug");
            range = RANGES[selected_range];
            range_difference = Math.abs(selected_range - AUG_RNG);
            difficulty = AUG_BASE;
            concentration = AUG_CONC;
            other += "Target increases the ability of any skill checks by one. ";
            if (document.getElementById("aug_rng_free").checked) {
                if (range_difference > 0)
                    difficulty += (range_difference - 1);
            } else
                difficulty += range_difference;
            if (document.getElementById("aug_dh_use").checked) {
                other += "Target increases wound threshold by " + knl + ". ";
                if (!document.getElementById("aug_dh_free").checked)
                    difficulty++;
            }
            if (document.getElementById("aug_has_use").checked) {
                other += "Target may use second maneuver without spending strain. ";
                if (!document.getElementById("aug_has_free").checked)
                    difficulty++;
            }
            if (document.getElementById("aug_pf_use").checked) {
                other += "Target's unarmed combat strikes critical rating is 3 and deals " + knl + "extra damage. ";
                if (!document.getElementById("aug_pf_free").checked)
                    difficulty++;
            }
            if (document.getElementById("aug_swft_use").checked) {
                other += "Target ignores effects of difficult terrain and cannot be immobilized. ";
                if (!document.getElementById("aug_swft_free").checked)
                    difficulty++;
            }
            if (document.getElementById("aug_at_use").checked) {
                other += "Affects an additional target within range. May spend each <span class='ad'></span> to affect an additional target. ";
                if (!document.getElementById("aug_at_free").checked)
                    difficulty += 2;
            }
            break;
        case "barrier":
            selected_range = rangeCheck("bar");
            range = RANGES[selected_range];
            range_difference = Math.abs(selected_range - BAR_RNG);
            concentration = BAR_CONC;
            difficulty = BAR_BASE;
            if (document.getElementById("bar_rng_free").checked) {
                if (range_difference > 0)
                    difficulty += (range_difference - 1);
            } else
                difficulty += range_difference;
            if (document.getElementById("bar_emp_use").checked) {
                other += "Reduce incoming damage by one, plus one for every <span class='s'></span>. ";
                if (!document.getElementById("bar_emp_free").checked)
                    difficulty += 2;
            } else
                other += "Reduce incoming damage by one, plus one for every <span class='ss'></span>. ";
            if (document.getElementById("bar_at_use").checked) {
                other += "Affects an additional target within range. May spend each <span class='ad'></span> to affect an additional target. ";
                if (!document.getElementById("bar_at_free").checked)
                    difficulty++;
            }
            if (document.getElementById("bar_def_use").checked) {
                other += "Target gains ranged and melee defense of " + knl + ". ";
                if (!document.getElementById("bar_def_free").checked)
                    difficulty += 2;
            }
            if (document.getElementById("bar_ref_use").checked) {
                other += "If attacked by magic that generates <span class='ttt'></span> or <span class='de'></span>, after check is resolved, attacker suffers the same damage back.";
                if (!document.getElementById("bar_ref_free").checked)
                    difficulty += 2;
            }
            if (document.getElementById("bar_snc_use").checked) {
                other += "Targets antithesis of target's faith or deity automatically disengage and cannot engage the target.";
                if (!document.getElementById("bar_snc_free").checked)
                    difficulty += 2;
            }
            break;
        case "conjure":
            selected_range = rangeCheck("con");
            range = RANGES[selected_range];
            range_difference = Math.abs(selected_range - CON_RNG);
            concentration = CON_CONC;
            difficulty = CON_BASE;
            other = "Summons a simple tool, one-handed melee weapon, or minion (silhouette 1). "
            if (document.getElementById("con_rng_free").checked) {
                if (range_difference > 0)
                    difficulty += (range_difference - 1);
            } else
                difficulty += range_difference;
            if (document.getElementById("con_med_use").checked) {
                other = "Summons a complicated tool with moving parts, a two-handed melee weapon, or rival (silhouette 1). ";
                if (!document.getElementById("con_med_free").checked)
                    difficulty++;
            }
            if (document.getElementById("con_grn_use").checked) {
                other = "Summons a complicated tool with moving parts, a two-handed melee weapon, or rival up to silhouette 3. ";
                if (!document.getElementById("con_grn_free").checked)
                    difficulty += 2;
            }
            if (document.getElementById("con_as_use").checked) {
                other += "Summons an additional summon. May summon an additional per <span class='adad'></span>. ";
                if (!document.getElementById("con_as_free").checked)
                    difficulty++;
            }
            if (document.getElementById("con_sa_use").checked) {
                other += "Creature summoned is friendly and obeys caster's commands. "
                if (!document.getElementById("con_sa_free").checked)
                    difficulty++;
            }
            break;
        case "curse":
            difficulty = CUR_BASE;
            selected_range = rangeCheck("cur");
            range = RANGES[selected_range];
            range_difference = Math.abs(selected_range - CUR_RNG);
            concentration = CON_CONC;
            other = "Target decreases the ability of any skill checks made by one. ";
            if (document.getElementById("cur_rng_free").checked) {
                if (range_difference > 0)
                    difficulty += (range_difference - 1);
            } else
                difficulty += range_difference;
            if (document.getElementById("cur_ene_use").checked) {
                other += "If target suffers strain, they suffer 1 additional strain. "
                if (!document.getElementById("cur_ene_free").checked)
                    difficulty++;
            }
            if (document.getElementById("cur_mis_use").checked) {
                other += "When target makes a check, change one <span class='sb'></span> to a face displaying a <span class='f'></span>. "
                if (!document.getElementById("cur_mis_free").checked)
                    difficulty++;
            }
            if (document.getElementById("cur_at_use").checked) {
                other += "Affects an additional target within range. May spend each <span class='ad'></span> to affect an additional target. ";
                if (!document.getElementById("cur_at_free").checked)
                    difficulty += 2;
            }
            if (document.getElementById("cur_des_use").checked) {
                other += "Target's wound and strain thresholds are reduced by" + knl + ". (May not be used with additional target). ";
                if (!document.getElementById("cur_des_free").checked)
                    difficulty += 2;
            }
            if (document.getElementById("cur_doom_use").checked) {
                other += "After target makes a check, you may change any one die in their pool not displaying <span class='tr'></span> or <span class='de'></span> to another face. ";
                if (!document.getElementById("cur_doom_free").checked)
                    difficulty += 2;
            }
            if (document.getElementById("cur_par_use").checked) {
                other += "Target is staggered. (May not be used with additional target). ";
                if (!document.getElementById("cur_par_free").checked)
                    difficulty += 3;
            }
            break;
        case "dispel":
            difficulty = DIS_BASE;
            selected_range = rangeCheck("dis");
            range = RANGES[selected_range];
            range_difference = Math.abs(selected_range - DIS_RNG);
            concentration = CON_CONC;
            other = "All magical effects the target is under end immediately. "
            if (document.getElementById("dis_rng_free").checked) {
                if (range_difference > 0)
                    difficulty += (range_difference - 1);
            } else
                difficulty += range_difference;
            if (document.getElementById("dis_at_use").checked) {
                other += "Affects an additional target within range. May spend each <span class='ad'></span> to affect an additional target. ";
                if (!document.getElementById("dis_at_free").checked)
                    difficulty += 2;
            }
            break;
        case "heal":
            difficulty = HEA_BASE;
            selected_range = rangeCheck("hea");
            range = RANGES[selected_range];
            range_difference = Math.abs(selected_range - HEA_RNG);
            concentration = HEA_CONC;
            other = "Target recovers 1 wound per uncanceled <span class='s'></span> and 1 strain per uncanceled <span class='ad'></span>. ";
            if (document.getElementById("hea_rng_free").checked) {
                if (range_difference > 0)
                    difficulty += (range_difference - 1);
            } else
                difficulty += range_difference;
            if (document.getElementById("hea_at_use").checked) {
                other += "Affects an additional target within range. May spend each <span class='ad'></span> to affect an additional target. ";
                if (!document.getElementById("hea_at_free").checked)
                    difficulty++;
            }
            if (document.getElementById("hea_res_use").checked) {
                other += "Select an ongoing status effect on your target. This status effect immediately ends. ";
                if (!document.getElementById("hea_res_free").checked)
                    difficulty++;
            }
            if (document.getElementById("hea_crt_use").checked) {
                other += "Select one Critical Injury the target is suffering. The critical Injury is also healed. ";
                if (!document.getElementById("hea_crt_free").checked)
                    difficulty += 2;
            }
            if (document.getElementById("hea_ri_use").checked) {
                other += "You may target characters that are incapacitated. ";
                if (!document.getElementById("hea_ri_free").checked)
                    difficulty += 2;
            }
            if (document.getElementById("hea_rez_use").checked) {
                other = "You may target a character who died during this encounter. If successful, target is restored to life with wounds equal to their wound threshold. If failed, no other attempts may be made to resurrect the target. ";
                if (!document.getElementById("hea_rez_free").checked)
                    difficulty += 4;
            }
            break;
        case "mask":
            let target_self = document.getElementById("mas_self_true").checked;
            difficulty = MAS_BASE;
            selected_range = rangeCheck("mas");
            range = RANGES[selected_range];
            if (target_self)
                range_difference = Math.abs(selected_range - (MAS_RNG - 1));
            else
                range_difference = Math.abs(selected_range - MAS_RNG);
            size_difference = sizeCheck("mas") - 1;
            concentration = MAS_CONC;
            other = "Create an illusion of an object/creature or change the appearance of the caster or another target. ";
            sil = sizeCheck("mas");
            if (document.getElementById("mas_rng_free").checked) {
                if (range_difference > 0)
                    difficulty += (range_difference - 1);
            } else
                difficulty += range_difference;
            if (document.getElementById("mas_size_free").checked) {
                if (size_difference > 0)
                    difficulty += (size_difference - 1);
            } else {
                if (size_difference > 0)
                    difficulty += size_difference;
            }
            if (document.getElementById("mas_blur_use").checked) {
                other += "An illusion on a character causes any attacks made against them to add <span class='t'></span> to the results. ";
                if (!document.getElementById("mas_blur_free").checked)
                    difficulty++;
            }
            if (document.getElementById("mas_mi_use").checked) {
                other += "An illusion on a character allows the character to spend <span class='ttt'></span> or <span class='de'></span> from any combat check against them to have the attack harmlessly hit a mirror image instead. ";
                if (!document.getElementById("mas_mi_free").checked)
                    difficulty++;
            }
            if (document.getElementById("mas_at_use").checked) {
                other += "Affects an additional target or creates another illusion within range. May spend each <span class='adad'></span> to affect an additional target or create an additional illusion. ";
                if (!document.getElementById("mas_at_free").checked)
                    difficulty++;
            }
            if (document.getElementById("mas_rea_use").checked) {
                other += "Increase difficulty checks to determine the illusion is fake by one. May spend <span class='adad'></span> to increase an additional one. Also fools smell, taste, and touch. "
                if (!document.getElementById("mas_rea_free").checked)
                    difficulty++;
            }
            if (document.getElementById("mas_trr_use").checked) {
                other += "Those who spot the illusion must make a <b>Hard</b> (<span class='ddd'></span>) Discipline check. Suffer 2 strain per <span class='t'></span>. If failed, they are unable to approach the illusion. ";
                if (!document.getElementById("mas_trr_free").checked)
                    difficulty += 2;
            }
            if (document.getElementById("mas_inv_use").checked) {
                other += "If targeting a creature, that creature is rendered invisible. ";
                if (!document.getElementById("mas_inv_free").checked)
                    difficulty += 3;
            }
            break;
        case "predict":
            difficulty = PRE_BASE;
            range = PRE_RNG;
            concentration = PRE_CONC;
            other = "You may ask a question about events that will unfold within the next 24 hours. ";
            if (document.getElementById("pre_emp_use").checked) {
                other = "You may ask a question about events that will unfold within the next month. ";
                if (!document.getElementById("pre_emp_free").checked)
                    difficulty++;
            }
            if (document.getElementById("pre_qr_use").checked)
                other = "Character adds <span class='ss'></span> to the results of their next initiative check. ";
            if (document.getElementById("pre_scr_use").checked) {
                other = "Character may learn the location of one silhouette 0 item within long range. ";
                if (!document.getElementById("pre_scr_free").checked)
                    difficulty++;
            }
            if (document.getElementById("pre_aq_use").checked) {
                other += "May ask one additional question. You may ask an additional question for every <span class='adad'></span>. ";
                if (!document.getElementById("pre_aq_free").checked)
                    difficulty++;
            }
            if (document.getElementById("pre_fop_use").checked) {
                other += "Once before the end of the current encounter, you may add one <span class='s'></span> to the results of one of your checks. You may also add <span class='f'></span> to the results of a check targeting you. You may spend <span class='adadad'></span> on the spell cast to increase this to <span class='ss'></span> / <span class='ff'></span> instead. ";
                if (!document.getElementById("pre_fop_free").checked)
                    difficulty += 2;
            }
            if (document.getElementById("pre_cd_use").checked) {
                other += "Once before the end of the session, when character would otherwise be incapacitated or killed, you may spend a Story Point to instead suffer wounds and strain equal to your wound and strain thresholds (but not exceeding it). ";
                if (!document.getElementById("pre_cd_free").checked)
                    difficulty += 2;
            }
            break;
        case "transform":
            difficulty = TRA_BASE;
            range = TRA_RNG;
            concentration = TRA_CONC;
            sil = sizeCheck("tra");
            size_difference = sil;
            other = "Transform into an animal. ";
            if (document.getElementById("mas_size_free").checked) {
                if (size_difference > 0)
                    difficulty += (size_difference - 1);
            } else {
                if (size_difference > 0)
                    difficulty += size_difference;
            }
            if (document.getElementById("tra_cr_use").checked) {
                other += "Retain your own Intellect and Willpower. ";
                if (!document.getElementById("tra_cr_free").checked)
                    difficulty += 1;
            }
            if (document.getElementById("tra_tg_use").checked) {
                other += "Worn gear change into natural markings instead of being dropped. ";
                if (!document.getElementById("tra_tg_free").checked)
                    difficulty += 1;
            }
            if (document.getElementById("tra_df_use").checked) {
                other += "Adopt a dire form of the chosen animal. Increase damage of natural weapons by 3, soak by 1, wound threshold by 6, and silhouette by 1. ";
                if (sil < 5)
                    sil++;
                if (!document.getElementById("tra_df_free").checked)
                    difficulty += 1;
            }
            if (document.getElementById("tra_cow_use").checked) {
                other += "Instead of transforming yourself, you may transform one target within short range into a silhouette 0 animal of your choice. "
                if (!document.getElementById("tra_cow_free").checked)
                    difficulty += 3;
            }
            break;
        case "utility":
            difficulty = UTI_BASE;
            range = UTI_RNG;
            concentration = UTI_CONC;
            other = "Do something minor, such as levitate a book, transmute a pebble into a butterfly...something cool with a minor benefit!";
            break;
        default:
            break;
    }
    damage += imp_atk;
    difficulty += diff_mod;
    if (spell_name != "")
        spell_string += "<h5><i>" + spell_name +"</i></h5>";
    spell_string += "<i>" + chosen_skill + " - " + chosen_spell + "</i>";
    spell_string += "<br /><b>Concentration</b>: " + (concentration ? 'Yes' : 'No');
    spell_string += "<br/ ><b>Difficulty</b>: " + checkDifficulty(difficulty);
    if (chosen_spell == "attack")
        spell_string += "<br /><b>Damage</b>: " + damage;
    if (qualities != "")
        spell_string += "<br /><b>Qualities</b>: " + qualities;
    if (range != "")
        spell_string += "<br /><b>Range</b>: " + range;
    if (sil > -1)
        spell_string += "<br /><b>Silhouette</b>: " + sil;
    if (other != "")
        spell_string += "<br /><b>Other</b>: " + other;
    if (concentration) {
        spell_string += "<br /><button type='button' class='btn btn-primary' onclick='concentrate()'>Concentrate</button>";
    }
    spellDiv.innerHTML = spell_string;
    dice();
}

// Adds a separate section for a spell that is being concentrated on.
function concentrate() {
    concDiv.innerHTML = "<h5>Concentrating on:</h5>";
    concDiv.innerHTML += spellDiv.innerHTML;
    concDiv.removeChild(concDiv.lastElementChild);
    concDiv.innerHTML += "<br /><button type='button' class='btn btn-danger' onclick='stopConc()'>Stop Concentrating</button>";
}

// Removes the concentration for the current spell.
function stopConc() {
    concDiv.innerHTML = "";
}

// Generates the dice images to display based on the current classes set for an element.
function dice() {
    Array.from(document.getElementsByClassName("a")).forEach(el => el.innerHTML = '<img src="img/a.png">');
    Array.from(document.getElementsByClassName("aa")).forEach(el => el.innerHTML = '<img src="img/aa.png">');
    Array.from(document.getElementsByClassName("aaa")).forEach(el => el.innerHTML = '<img src="img/aaa.png">');
    Array.from(document.getElementsByClassName("aaaa")).forEach(el => el.innerHTML = '<img src="img/aaaa.png">');
    Array.from(document.getElementsByClassName("aaaaa")).forEach(el => el.innerHTML = '<img src="img/aaaaa.png">');
    Array.from(document.getElementsByClassName("ad")).forEach(el => el.innerHTML = '<img src="img/v.png">');
    Array.from(document.getElementsByClassName("adad")).forEach(el => el.innerHTML = '<img src="img/vv.png">');
    Array.from(document.getElementsByClassName("adadad")).forEach(el => el.innerHTML = '<img src="img/vvv.png">');
    Array.from(document.getElementsByClassName("b")).forEach(el => el.innerHTML = '<img src="img/b.png">');
    Array.from(document.getElementsByClassName("bb")).forEach(el => el.innerHTML = '<img src="img/bb.png">');
    Array.from(document.getElementsByClassName("d")).forEach(el => el.innerHTML = '<img src="img/d.png">');
    Array.from(document.getElementsByClassName("dd")).forEach(el => el.innerHTML = '<img src="img/dd.png">');
    Array.from(document.getElementsByClassName("ddd")).forEach(el => el.innerHTML = '<img src="img/ddd.png">');
    Array.from(document.getElementsByClassName("dddd")).forEach(el => el.innerHTML = '<img src="img/dddd.png">');
    Array.from(document.getElementsByClassName("ddddd")).forEach(el => el.innerHTML = '<img src="img/ddddd.png">');
    Array.from(document.getElementsByClassName("de")).forEach(el => el.innerHTML = '<img src="img/de.png">');
    Array.from(document.getElementsByClassName("dede")).forEach(el => el.innerHTML = '<img src="img/dede.png">');
    Array.from(document.getElementsByClassName("f")).forEach(el => el.innerHTML = '<img src="img/f.png">');
    Array.from(document.getElementsByClassName("ff")).forEach(el => el.innerHTML = '<img src="img/ff.png">');
    Array.from(document.getElementsByClassName("s")).forEach(el => el.innerHTML = '<img src="img/s.png">');
    Array.from(document.getElementsByClassName("ss")).forEach(el => el.innerHTML = '<img src="img/ss.png">');
    Array.from(document.getElementsByClassName("sb")).forEach(el => el.innerHTML = '<img src="img/sb.png">');
    Array.from(document.getElementsByClassName("sbsb")).forEach(el => el.innerHTML = '<img src="img/sbsb.png">');
    Array.from(document.getElementsByClassName("t")).forEach(el => el.innerHTML = '<img src="img/t.png">');
    Array.from(document.getElementsByClassName("tt")).forEach(el => el.innerHTML = '<img src="img/tt.png">');
    Array.from(document.getElementsByClassName("ttt")).forEach(el => el.innerHTML = '<img src="img/ttt.png">');
    Array.from(document.getElementsByClassName("tr")).forEach(el => el.innerHTML = '<img src="img/tr.png">');
}

// Determines the check type based off of a provided value.
// int num The integer value of the check difficulty.
function checkDifficulty(num) {
    if (num < 0)
        num = 0;
    switch (num) {
        case 0:
            return "<b>Simple</b> (-)";
        case 1:
            return "<b>Easy</b> (<img src='img/d.png'>)";
        case 2:
            return "<b>Average</b> (<img src='img/dd.png'>)";
        case 3:
            return "<b>Hard</b> (<img src='img/ddd.png'>)";
        case 4:
            return "<b>Daunting</b> (<img src='img/dddd.png'>)";
        case 5:
            return "<b>Formidable</b> (<img src='img/ddddd.png'>)";
        default:
            return "Spell too difficult! Formidable is highest allowed spell. Adjust your effects to reduce the difficulty.";
    }
}

Array.from(document.getElementsByClassName("btn-sm")).forEach(el => el.onchange = generateSpell);
Array.from(document.getElementsByClassName("form-control")).forEach(el => el.onchange = generateSpell);
