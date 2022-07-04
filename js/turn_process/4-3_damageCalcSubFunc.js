function powerCorr_auraBreak(poke) {
    if ( isDarkAura() == "break" && poke.myMove.type == "あく" ) return 3072 / 4096
    if ( isFailyAura() == "break" && poke.myMove.type == "フェアリー") return 3072 / 4096
    return 1
}

function powerCorr_rivalry_weeken(poke, tgt) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "とうそうしん" ) return 1
    if ( poke.myGender == "♂" && tgt.poke.myGender == "♀" ) return 3072 / 4096
    if ( poke.myGender == "♀" && tgt.poke.myGender == "♂" ) return 3072 / 4096
    return 1
}

function powerCorr_skin(poke) {
    if ( !poke.myCondition.mySkin ) return 1
    poke.myCondition.mySkin = false
    return 4915 / 4096
}

function powerCorr_reckless(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "すてみ" ) return 1
    if ( !moveList_reckless.includes(poke.myMove.name) ) return 1
    return 4915 / 4096
}

function powerCorr_ironFist(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "てつのこぶし" ) return 1
    if ( !moveList_ironFist.includes(poke.myMove.name) ) return 1
    return 4915 / 4096
}

function powerCorr_rivalry_strengthen(poke, tgt) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "とうそうしん" ) return 1
    if ( poke.myGender == "♂" && tgt.poke.myGender == "♂" ) return 5120 / 4096
    if ( poke.myGender == "♀" && tgt.poke.myGender == "♀" ) return 5120 / 4096
    return 1
}

function powerCorr_battery(poke) {
    if ( poke.myMove.nature != "特殊" ) return 1
    const battery = myPokeInBattle(poke).filter( _poke => _poke.myAbility == "バッテリー" && isAbility(_poke) && _poke.myID != poke.myID )
    return Math.pow( 5325 / 4096, battery.length )
}

function powerCorr_powerSpot(poke) {
    const powerSpot = myPokeInBattle(poke).filter( _poke => _poke.myAbility == "パワースポット" && isAbility(_poke) && _poke.myID != poke.myID )
    return Math.pow( 5325 / 4096, powerSpot.length )
}

function powerCorr_analytic(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "アナライズ" ) return 1
    const analytic = allPokeInBattle().filter( _poke => _poke.myCmd_move !== "" )
    if ( analytic.length > 1 ) return 1
    return 5325 / 4096
}

function powerCorr_toughClaws(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "かたいツメ" ) return 1
    if ( poke.myMove.direct == "間接" ) return 1
    return 5325 / 4096
}

function powerCorr_sandForce(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "すなのちから" ) return 1
    if ( !isSandy(poke) ) return 1
    switch ( poke.myMove.type ) {
        case "いわ":
        case "じめん":
        case "はがね":
            return 5325 / 4096

        default:
            return 1
    }
}

function powerCorr_sheerForce(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "ちからずく" ) return 1
    return 1
}

function powerCorr_punkRock(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "パンクロック" ) return 1
    if ( !musicMove.includes(poke.myMove.name) ) return 1
    return 5325 / 4096
}

function powerCorr_darkAura(poke) {
    if ( isDarkAura() != "aura" ) return 1
    if ( poke.myMove.type != "あく" ) return 1
    return 5448 / 4096
}

function powerCorr_failyAura(poke) {
    if ( isFailyAura() != "aura" ) return 1
    if ( poke.myMove.type != "フェアリー" ) return 1
    return 5448 / 4096
}

function powerCorr_strongJaw(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "がんじょうあご" ) return 1
    if ( !moveList_strongJaw.includes(poke.myMove.name) ) return 1
    return 6144 / 4096
}

function powerCorr_technician(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "テクニシャン" ) return 1
    if ( poke.myMove.power > 60 ) return 1
    return 6144 / 4096
}

function powerCorr_toxicBoost(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "どくぼうそう" ) return 1
    if ( poke.myAilment != "どく" ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    return 6144 / 4096
}

function powerCorr_flareBoost(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "ねつぼうそう" ) return 1
    if ( poke.myAilment != "やけど" ) return 1
    if ( poke.myMove.nature != "特殊" ) return 1
    return 6144 / 4096
}

function powerCorr_steelySpirit(poke) {
    if ( poke.myMove.type != "はがね" ) return 1
    const steelySpirit = myPokeInBattle(poke).filter( _poke => _poke.myAbility == "はがねのせいしん" && isAbility(_poke) )
    return Math.pow( 6144 / 4096, steelySpirit.length )
}

function powerCorr_megaLauncher(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "メガランチャー" ) return 1
    if ( !moveList_megaLauncher.includes(poke.myMove.name) ) return 1
    return 6144 / 4096
}

function powerCorr_heatproof(poke, tgt) {
    if ( !isAbility(tgt.poke) ) return 1
    if ( tgt.poke.myAbility != "たいねつ" ) return 1
    if ( poke.myMove.type != "ほのお" ) return 1
    return 2048 / 4096
}

function powerCorr_drySkin(poke, tgt) {
    if ( !isAbility(tgt.poke) ) return 1
    if ( tgt.poke.myAbility != "かんそうはだ" ) return 1
    if ( poke.myMove.type != "ほのお" ) return 1
    return 5120 / 4096
}

function powerCorr_muscleBand(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "ちからのハチマキ" ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    return 4505 / 4096
}

function powerCorr_wiseGlasses(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "ものしりメガネ" ) return 1
    if ( poke.myMove.nature != "特殊" ) return 1
    return 4505 / 4096
}

function powerCorr_plate(poke) {
    if ( !isItem(poke) ) return 1
    for ( const plate of itemList_plate ) {
        if ( poke.myItem != plate.name ) continue
        if ( poke.myMove.type != plate.type ) continue
        return 4915 / 4096
    }
    return 1
}

function powerCorr_incense(poke) {
    if ( !isItem(poke) ) return 1
    for ( const incense of itemList_incense ) {
        if ( poke.myItem != incense.name ) continue
        if ( poke.myMove.type != incense.type ) continue
        return 4915 / 4096
    }
    return 1
}

function powerCorr_soulDew(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "こころのしずく" ) return 1
    if ( poke.myName != "ラティアス" && poke.myName != "ラティオス" ) return 1
    if ( poke.myMove.type != "ドラゴン" && poke.myMove.type != "エスパー" ) return 1
    return 4915 / 4096
}

function powerCorr_adamantOrb(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "こんごうだま" ) return 1
    if ( poke.myName != "ディアルガ" ) return 1
    if ( poke.myMove.type != "ドラゴン" && poke.myMove.type != "はがね" ) return 1
    return 4915 / 4096
}

function powerCorr_lustrousOrb(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "しらたま" ) return 1
    if ( poke.myName != "パルキア" ) return 1
    if ( poke.myMove.type != "ドラゴン" && poke.myMove.type != "みず" ) return 1
    return 4915 / 4096
}

function powerCorr_griseousOrb(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "はっきんだま" ) return 1
    if ( poke.myName != "ギラティナ(オリジンフォルム)" ) return 1
    if ( poke.myMove.type != "ドラゴン" && poke.myMove.type != "ゴースト" ) return 1
    return 4915 / 4096
}

function powerCorr_gem(poke) {
    if ( !poke.myCondition.myGem ) return 1
    poke.myCondition.myGem = false
    return 5325 / 4096
}

function powerCorr_solar(poke) {
    if ( poke.myMove.name != "ソーラービーム" && poke.myMove.name != "ソーラーブレード" ) return 1
    if ( isRainy(poke) ) return 2048 / 4096
    if ( isSandy(poke) ) return 2048 / 4096
    if ( isSnowy(poke) ) return 2048 / 4096
    return 1
}

function powerCorr_gravApple(poke) {
    if ( poke.myMove.name != "Gのちから" ) return 1
    if ( !fieldStatus.myGravity ) return 1
    return 6144 / 4096
}

function powerCorr_knockOff(poke, tgt) {
    if ( poke.myMove.name != "はたきおとす" ) return 1
    if ( tgt.poke.myItem == "" ) return 1
    if ( cannotChangeItem(tgt.poke) ) return 1
    return 6144 / 4096
}

function powerCorr_mistyExplosion(poke) {
    if ( poke.myMove.name != "ミストバースト" ) return 1
    if ( !onGround(poke) ) return 1
    if ( fieldStatus.myMisty ) return 1
    return  6144 / 4096
}

function powerCorr_expandingForce(poke) {
    if ( poke.myMove.name != "ワイドフォース" ) return 1
    if ( !fieldStatus.myPsychic ) return 1
    return 6144 / 4096
}

function powerCorr_helpingHand(poke) {
    if ( !poke.myCondition.myHelping_hand ) return 1
    const num = poke.myCondition.myHelping_hand
    return Math.pow( 6144 / 4096, num )
}

function powerCorr_meFirst(poke) {
    return 1
}

function powerCorr_charge(poke) {
    if ( poke.myCondition.myCharge != 2 ) return 1
    if ( poke.myMove.type != "でんき" ) return 1
    poke.myCondition.myCharge == false
    return 8192 / 4096
}

function powerCorr_lashOut(poke) {
    if ( poke.myMove.name != "うっぷんばらし" ) return 1
    if ( !poke.myCondition.myRank_down ) return 1
    return 8192 / 4096
}

function powerCorr_retaliate(poke) {
    return 1
}

function powerCorr_facade(poke) {
    if ( poke.myMove.name != "からげんき" ) return 1
    if ( poke.myAilment == "どく" ) return 8192 / 4096
    if ( poke.myAilment == "やけど" ) return 8192 / 4096
    if ( poke.myAilment == "まひ" ) return 8192 / 4096
    return 1
}

function powerCorr_fusionBolt(poke) {
    return 1
}

function powerCorr_fusionFlare(poke) {
    return 1
}

function powerCorr_brine(poke) {
    if ( poke.myMove.name != "しおみず" ) return 1
    if ( tgt.poke.myRest_hp > tgt.poke.myFull_hp / 2 ) return 1
    return 8192 / 4096
}

function powerCorr_venoshock(poke) {
    if ( poke.myMove.name != "ベノムショック" ) return 1
    if ( tgt.poke.myAilment != "どく" ) return 1
    return 8192 / 4096
}

function powerCorr_terrain_weaken(poke, tgt) {
    if ( !onGround(tgt.poke) ) return 1
    switch ( true ) {
        case fieldStatus.myGrassy:
            if ( poke.myMove.name == "じしん" ) return 2048 / 4096
            if ( poke.myMove.name == "じならし" ) return 2048 / 4096
            if ( poke.myMove.name == "マグニチュード" ) return 2048 / 4096
            break

        case fieldStatus.myMisty:
            if ( poke.myMove.type == "ドラゴン" ) return 2048 / 4096
            break
    }
    return 1
}

function powerCorr_terrain_strengthen(poke) {
    if ( !onGround(poke) ) return 1
    switch ( true ) {
        case fieldStatus.myElectric:
            if ( poke.myMove.type != "でんき" ) break
            return 5325 / 4096

        case fieldStatus.myGrassy:
            if ( poke.myMove.type != "くさ" ) break
            return 5325 / 4096
        
        case fieldStatus.myPsychic:
            if ( poke.myMove.type != "エスパー" ) break
            return 5325 / 4096
    }
    return 1
}

function powerCorr_mudSport(poke) {
    if ( !fieldStatus.myMud_sport ) return 1
    if ( poke.myMove.type != "でんき" ) return 1
    return 1352 / 4096
}

function powerCorr_waterSport(poke) {
    if ( !fieldStatus.myWater_sport ) return 1
    if ( poke.myMove.type != "ほのお" ) return 1
    return 1352 / 4096
}