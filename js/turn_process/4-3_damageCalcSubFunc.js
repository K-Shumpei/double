//**************************************************
// 威力補正
//**************************************************
function changeBasePower(poke, tgt) {
    switch ( poke.myMove.name ) {
        // HPによるもの
        case "きしかいせい":
        case "じたばた":
            if ( poke.myRest_hp < poke.myFull_hp *  2 / 48 ) return 200
            if ( poke.myRest_hp < poke.myFull_hp *  5 / 48 ) return 150
            if ( poke.myRest_hp < poke.myFull_hp * 10 / 48 ) return 100
            if ( poke.myRest_hp < poke.myFull_hp * 17 / 48 ) return 80
            if ( poke.myRest_hp < poke.myFull_hp * 33 / 48 ) return 40
            return 20

        case "しおふき":
        case "ふんか":
        case "ドラゴンエナジー":
            return Math.max(Math.floor(150 * poke.myRest_hp / poke.myFull_hp), 1)

        case "しぼりとる":
        case "にぎりつぶす":
            return Math.max(Math.floor(120 * tgt.poke.myRest_hp / tgt.poke.myFull_hp), 1)

        // 能力によるもの
        case "アシストパワー":
        case "つけあがる":
            let power_assist = 0
            for ( const para of allParameter() ) {
                    power_assist += Math.max(poke[`myRank_${para}`], 0)
            }
            return 20 * (power_assist + 1)

        case "おしおき":
            let power = 0
            for ( const para of allParameter() ) {
                    power += Math.max(poke[`myRank_${para}`], 0)
            }
            return Math.min(20 * (power + 3), 200)

        case "エレキボール":
            const atk_speed_el = speedAV(poke, "c")
            const def_speed_el = speedAV(tgt.poke, "c")
            if ( atk_speed_el >= def_speed_el * 4 ) return 150
            if ( atk_speed_el >= def_speed_el * 3 ) return 120
            if ( atk_speed_el >= def_speed_el )     return 80
            return 40

        case "ジャイロボール":
            const atk_speed_jy = speedAV(poke, "c")
            const def_speed_jy = speedAV(tgt.poke, "c")
            return Math.min(Math.floor((25 * def_speed_jy / atk_speed_jy) + 1), 150)

        case "おんがえし":
        case "やつあたり":
            return poke.myMove.power

        case "きりふだ":
            const PP = poke[`myRest_pp_${poke.myCmd_move}`]
            if ( PP == 3 ) return 50
            if ( PP == 2 ) return 60
            if ( PP == 1 ) return 80
            if ( PP == 0 ) return 200
            return 40

        case "くさむすび":
        case "けたぐり":
            const weight = isWeight(tgt.poke)
            if ( weight >= 200 ) return 120
            if ( weight >= 100 ) return 100
            if ( weight >= 50 )  return 80
            if ( weight >= 25 )  return 60
            if ( weight >= 10 )  return 40
            return 20

        case "ヒートスタンプ":
        case "ヘビーボンバー":
            const atk_weight = isWeight(poke)
            const def_weight = isWeight(tgt.poke)
            if ( atk_weight >= def_weight * 5 ) return 120
            if ( atk_weight >= def_weight * 4 ) return 100
            if ( atk_weight >= def_weight * 3 ) return 80
            if ( atk_weight >= def_weight * 2 ) return 60
            return 40

        // 状態異常・状態変化・場の状態によるもの
        case "きつけ":
            if ( tgt.poke.myAilment != "まひ" ) return poke.myMove.power
            return poke.myMove.power * 2

        case "めざましビンタ":
            if ( tgt.poke.myAilment != "ねむり" ) return poke.myMove.power
            return poke.myMove.power * 2

        case "たたりめ":
            if ( !tgt.poke.myAilment ) return poke.myMove.power * 2
            if ( tgt.poke.myAbility == "ぜったいねむり" && isAbility(tgt.poke) ) return poke.myMove.power * 2
            return poke.myMove.power

        case "ウェザーボール":
            if ( isSunny(poke) ) return poke.myMove.power * 2
            if ( isRainy(poke) ) return poke.myMove.power * 2
            if ( isSandy(poke) ) return poke.myMove.power * 2
            if ( isSnowy(poke) ) return poke.myMove.power * 2
            return poke.myMove.power * 2
        
        case "だいちのはどう":
            if ( !onGround(poke) ) return poke.myMove.power
            if ( fieldStatus.myElectric ) return poke.myMove.power * 2
            if ( fieldStatus.myGrassy )   return poke.myMove.power * 2
            if ( fieldStatus.myMisty )    return poke.myMove.power * 2
            if ( fieldStatus.myPsychic )  return poke.myMove.power * 2
            return poke.myMove.power

        case "ライジングボルト":
            if ( !onGround(tgt.poke) ) return poke.myMove.power
            if ( !fieldStatus.myElectric ) return poke.myMove.power
            return poke.myMove.power *= 2

        case "かぜおこし":
        case "たつまき":
            if ( tgt.poke.myCondition.mySky_drop ) return poke.myMove.power *= 2
            if ( tgt.poke.myCondition.mySky ) return poke.myMove.power *= 2
            return poke.myMove.power

        // もちものによるもの
        case "アクロバット":
            if ( poke.myItem ) return poke.myMove.power
            return poke.myMove.power * 2
        
        case "しぜんのめぐみ":
            for ( const element of naturalGift ) {
                if ( poke.myItem == element.item ) return element.power
            }
            return poke.myMove.power

        case "なげつける":
            writeLog(`${poke.myItem} を 投げつけた !`)
            if ( itemList_berry.includes(poke.myItem) ) return 10
            for ( const incense of itemList_incense ) if ( incense.name == poke.myItem && incense.name.includes("おこう") ) return 10
            if ( itemList_fling.damage10.includes(poke.myItem) ) return 10
            if ( itemList_fling.damage30.includes(poke.myItem) ) return 30
            if ( itemList_fling.damage40.includes(poke.myItem) ) return 40
            if ( itemList_fling.damage50.includes(poke.myItem) ) return 50
            for ( const memory of itemList_memory ) if ( memory.name == poke.myItem ) return 50
            if ( itemList_fling.damage60.includes(poke.myItem) ) return 60
            if ( itemList_fling.damage70.includes(poke.myItem) ) return 70
            if ( poke.myItem.includes("カセット") ) return 70
            if ( poke.myItem.includes("パワー") ) return 70
            if ( itemList_fling.damage80.includes(poke.myItem) ) return 80
            for ( const mega of itemList_megaStone ) if ( mega.name == poke.myItem ) return 80
            if ( itemList_fling.damage90.includes(poke.myItem) ) return 90
            for ( const plate of itemList_plate ) if ( plate.name == poke.myItem ) poke.myMove.pow = 90
            if ( itemList_fling.damage100.includes(poke.myItem) ) return 100
            if ( itemList_fling.damage130.includes(poke.myItem) ) return 130
            return poke.myMove.power

        // 連続性によるもの
        case "アイスボール":
        case "ころがる":
            const defenseCurl = ( poke.myCondition.myDefense_curl )? 2 : 1
            const ice = poke.myCondition.myIce_ball
            const roll = poke.myCondition.myRollout
            return poke.myMove.power * defenseCurl * Math.pow(2, Math.max(ice, roll) - 1)

        case "エコーボイス":
            return Math.min(40 * (fieldStatus.myEchoed_voice), 200)

        case "じだんだ":
            return poke.myMove.power

        case "トリプルキック":
            return poke.myMove.power

        case "トリプルアクセル":
            return poke.myMove.power

        case "はきだす":
            const def    = poke.myCondition.myStockpile_B
            const sp_def = poke.myCondition.myStockpile_D
            changeMyRank(poke, "def", -1 * def)
            changeMyRank(poke, "sp_def", -1 * sp_def)
            writeLog(`${poke.myTN} の ${poke.myName} は たくわえが なくなった !`)
            poke.myCondition.myStockpile_B = 0
            poke.myCondition.myStockpile_D = 0
            return Math.max(def, sp_def) * 100

        case "りんしょう":
            return poke.myMove.power

        case "れんぞくぎり":
            const num = poke.myCondition.myFury_cutter
            return Math.min(40 * num, 160)

        // コンビネーションわざ
        case "くさのちかい":
        case "ほのおのちかい":
        case "みずのちかい":
            return poke.myMove.power

        // 行動順によるもの
        case "エラがみ":
        case "でんげきくちばし":
            // if (tgt.com != "" || user[0].f_con.includes("交代済" + tgt.child)) poke.myMove.power *= 2
            return poke.myMove.power

        case "おいうち":
            return poke.myMove.power

        case "しっぺがえし":
            return poke.myMove.power

        case "ダメおし":
            if ( !poke.myCondition.myAssurance ) return poke.myMove.power
            return poke.myMove.power * 2

        case "ゆきなだれ":
        case "リベンジ":
            if ( !poke.myCondition.myDamage.value ) return poke.myMove.power
            return poke.myMove.power * 2

        // その他
        case "プレゼント":
            return poke.myMove.power

        case "マグニチュード":
            return poke.myMove.power

        case "みずしゅりけん":
            return poke.myMove.power

        default:
            return poke.myMove.power
    }


}

function pwrCorr_auraBreak(poke) {
    if ( isDarkAura() == "break" && poke.myMove.type == "あく" ) return 3072 / 4096
    if ( isFailyAura() == "break" && poke.myMove.type == "フェアリー") return 3072 / 4096
    return 1
}

function pwrCorr_rivalry_weeken(poke, tgt) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "とうそうしん" ) return 1
    if ( poke.myGender == "♂" && tgt.poke.myGender == "♀" ) return 3072 / 4096
    if ( poke.myGender == "♀" && tgt.poke.myGender == "♂" ) return 3072 / 4096
    return 1
}

function pwrCorr_skin(poke) {
    if ( !poke.myCondition.mySkin ) return 1
    poke.myCondition.mySkin = false
    return 4915 / 4096
}

function pwrCorr_reckless(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "すてみ" ) return 1
    if ( !moveList_reckless.includes(poke.myMove.name) ) return 1
    return 4915 / 4096
}

function pwrCorr_ironFist(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "てつのこぶし" ) return 1
    if ( !moveList_ironFist.includes(poke.myMove.name) ) return 1
    return 4915 / 4096
}

function pwrCorr_rivalry_strengthen(poke, tgt) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "とうそうしん" ) return 1
    if ( poke.myGender == "♂" && tgt.poke.myGender == "♂" ) return 5120 / 4096
    if ( poke.myGender == "♀" && tgt.poke.myGender == "♀" ) return 5120 / 4096
    return 1
}

function pwrCorr_battery(poke) {
    if ( poke.myMove.nature != "特殊" ) return 1
    const battery = myPokeInBattle(poke).filter( _poke => _poke.myAbility == "バッテリー" && isAbility(_poke) && _poke.myID != poke.myID )
    return Math.pow( 5325 / 4096, battery.length )
}

function pwrCorr_powerSpot(poke) {
    const powerSpot = myPokeInBattle(poke).filter( _poke => _poke.myAbility == "パワースポット" && isAbility(_poke) && _poke.myID != poke.myID )
    return Math.pow( 5325 / 4096, powerSpot.length )
}

function pwrCorr_analytic(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "アナライズ" ) return 1
    const analytic = allPokeInBattle().filter( _poke => _poke.myCmd_move !== "" )
    if ( analytic.length > 1 ) return 1
    return 5325 / 4096
}

function pwrCorr_toughClaws(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "かたいツメ" ) return 1
    if ( poke.myMove.direct == "間接" ) return 1
    return 5325 / 4096
}

function pwrCorr_sandForce(poke) {
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

function pwrCorr_sheerForce(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "ちからずく" ) return 1
    return 1
}

function pwrCorr_punkRock(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "パンクロック" ) return 1
    if ( !musicMove.includes(poke.myMove.name) ) return 1
    return 5325 / 4096
}

function pwrCorr_darkAura(poke) {
    if ( isDarkAura() != "aura" ) return 1
    if ( poke.myMove.type != "あく" ) return 1
    return 5448 / 4096
}

function pwrCorr_failyAura(poke) {
    if ( isFailyAura() != "aura" ) return 1
    if ( poke.myMove.type != "フェアリー" ) return 1
    return 5448 / 4096
}

function pwrCorr_strongJaw(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "がんじょうあご" ) return 1
    if ( !moveList_strongJaw.includes(poke.myMove.name) ) return 1
    return 6144 / 4096
}

function pwrCorr_technician(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "テクニシャン" ) return 1
    if ( poke.myMove.power > 60 ) return 1
    return 6144 / 4096
}

function pwrCorr_toxicBoost(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "どくぼうそう" ) return 1
    if ( poke.myAilment != "どく" ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    return 6144 / 4096
}

function pwrCorr_flareBoost(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "ねつぼうそう" ) return 1
    if ( poke.myAilment != "やけど" ) return 1
    if ( poke.myMove.nature != "特殊" ) return 1
    return 6144 / 4096
}

function pwrCorr_steelySpirit(poke) {
    if ( poke.myMove.type != "はがね" ) return 1
    const steelySpirit = myPokeInBattle(poke).filter( _poke => _poke.myAbility == "はがねのせいしん" && isAbility(_poke) )
    return Math.pow( 6144 / 4096, steelySpirit.length )
}

function pwrCorr_megaLauncher(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "メガランチャー" ) return 1
    if ( !moveList_megaLauncher.includes(poke.myMove.name) ) return 1
    return 6144 / 4096
}

function pwrCorr_heatproof(poke, tgt) {
    if ( !isAbility(tgt.poke) ) return 1
    if ( tgt.poke.myAbility != "たいねつ" ) return 1
    if ( poke.myMove.type != "ほのお" ) return 1
    return 2048 / 4096
}

function pwrCorr_drySkin(poke, tgt) {
    if ( !isAbility(tgt.poke) ) return 1
    if ( tgt.poke.myAbility != "かんそうはだ" ) return 1
    if ( poke.myMove.type != "ほのお" ) return 1
    return 5120 / 4096
}

function pwrCorr_muscleBand(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "ちからのハチマキ" ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    return 4505 / 4096
}

function pwrCorr_wiseGlasses(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "ものしりメガネ" ) return 1
    if ( poke.myMove.nature != "特殊" ) return 1
    return 4505 / 4096
}

function pwrCorr_plate(poke) {
    if ( !isItem(poke) ) return 1
    for ( const plate of itemList_plate ) {
        if ( poke.myItem != plate.name ) continue
        if ( poke.myMove.type != plate.type ) continue
        return 4915 / 4096
    }
    return 1
}

function pwrCorr_incense(poke) {
    if ( !isItem(poke) ) return 1
    for ( const incense of itemList_incense ) {
        if ( poke.myItem != incense.name ) continue
        if ( poke.myMove.type != incense.type ) continue
        return 4915 / 4096
    }
    return 1
}

function pwrCorr_soulDew(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "こころのしずく" ) return 1
    if ( poke.myName != "ラティアス" && poke.myName != "ラティオス" ) return 1
    if ( poke.myMove.type != "ドラゴン" && poke.myMove.type != "エスパー" ) return 1
    return 4915 / 4096
}

function pwrCorr_adamantOrb(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "こんごうだま" ) return 1
    if ( poke.myName != "ディアルガ" ) return 1
    if ( poke.myMove.type != "ドラゴン" && poke.myMove.type != "はがね" ) return 1
    return 4915 / 4096
}

function pwrCorr_lustrousOrb(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "しらたま" ) return 1
    if ( poke.myName != "パルキア" ) return 1
    if ( poke.myMove.type != "ドラゴン" && poke.myMove.type != "みず" ) return 1
    return 4915 / 4096
}

function pwrCorr_griseousOrb(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "はっきんだま" ) return 1
    if ( poke.myName != "ギラティナ(オリジンフォルム)" ) return 1
    if ( poke.myMove.type != "ドラゴン" && poke.myMove.type != "ゴースト" ) return 1
    return 4915 / 4096
}

function pwrCorr_gem(poke) {
    if ( !poke.myCondition.myGem ) return 1
    poke.myCondition.myGem = false
    return 5325 / 4096
}

function pwrCorr_solar(poke) {
    if ( poke.myMove.name != "ソーラービーム" && poke.myMove.name != "ソーラーブレード" ) return 1
    if ( isRainy(poke) ) return 2048 / 4096
    if ( isSandy(poke) ) return 2048 / 4096
    if ( isSnowy(poke) ) return 2048 / 4096
    return 1
}

function pwrCorr_gravApple(poke) {
    if ( poke.myMove.name != "Gのちから" ) return 1
    if ( !fieldStatus.myGravity ) return 1
    return 6144 / 4096
}

function pwrCorr_knockOff(poke, tgt) {
    if ( poke.myMove.name != "はたきおとす" ) return 1
    if ( tgt.poke.myItem == "" ) return 1
    if ( cannotChangeItem(tgt.poke) ) return 1
    return 6144 / 4096
}

function pwrCorr_mistyExplosion(poke) {
    if ( poke.myMove.name != "ミストバースト" ) return 1
    if ( !onGround(poke) ) return 1
    if ( fieldStatus.myMisty ) return 1
    return  6144 / 4096
}

function pwrCorr_expandingForce(poke) {
    if ( poke.myMove.name != "ワイドフォース" ) return 1
    if ( !fieldStatus.myPsychic ) return 1
    return 6144 / 4096
}

function pwrCorr_helpingHand(poke) {
    if ( !poke.myCondition.myHelping_hand ) return 1
    const num = poke.myCondition.myHelping_hand
    return Math.pow( 6144 / 4096, num )
}

function pwrCorr_meFirst(poke) {
    return 1
}

function pwrCorr_charge(poke) {
    if ( poke.myCondition.myCharge != 2 ) return 1
    if ( poke.myMove.type != "でんき" ) return 1
    poke.myCondition.myCharge == false
    return 8192 / 4096
}

function pwrCorr_lashOut(poke) {
    if ( poke.myMove.name != "うっぷんばらし" ) return 1
    if ( !poke.myCondition.myRank_down ) return 1
    return 8192 / 4096
}

function pwrCorr_retaliate(poke) {
    return 1
}

function pwrCorr_facade(poke) {
    if ( poke.myMove.name != "からげんき" ) return 1
    if ( poke.myAilment == "どく" ) return 8192 / 4096
    if ( poke.myAilment == "やけど" ) return 8192 / 4096
    if ( poke.myAilment == "まひ" ) return 8192 / 4096
    return 1
}

function pwrCorr_fusionBolt(poke) {
    return 1
}

function pwrCorr_fusionFlare(poke) {
    return 1
}

function pwrCorr_brine(poke) {
    if ( poke.myMove.name != "しおみず" ) return 1
    if ( tgt.poke.myRest_hp > tgt.poke.myFull_hp / 2 ) return 1
    return 8192 / 4096
}

function pwrCorr_venoshock(poke) {
    if ( poke.myMove.name != "ベノムショック" ) return 1
    if ( tgt.poke.myAilment != "どく" ) return 1
    return 8192 / 4096
}

function pwrCorr_terrain_weaken(poke, tgt) {
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

function pwrCorr_terrain_strengthen(poke) {
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

function pwrCorr_mudSport(poke) {
    if ( !fieldStatus.myMud_sport ) return 1
    if ( poke.myMove.type != "でんき" ) return 1
    return 1352 / 4096
}

function pwrCorr_waterSport(poke) {
    if ( !fieldStatus.myWater_sport ) return 1
    if ( poke.myMove.type != "ほのお" ) return 1
    return 1352 / 4096
}

//**************************************************
// 攻撃補正
//**************************************************

function atkCorr_hustle(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "はりきり" ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    return 6144 / 4096
}

function atkCorr_slowStart(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "スロースタート" ) return 1
    if ( poke.myCondition.mySlow_start === true ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    return 2048 / 4096
}

function atkCorr_defeatist(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "よわき" ) return 1
    if ( poke.myRest_hp > poke.myFull_hp / 2 ) return 1
    return 2048 / 4096
}

function atkCorr_flowerGift(poke) {
    if ( poke.myMove.nature != "物理" ) return 1
    const flowerGift = myPokeInBattle(poke).filter( _poke => _poke.myAbility == "フラワーギフト" && isAbility(_poke) && isSunny(_poke) )
    return Math.pow( 6144 / 4096, flowerGift.length)
}

function atkCorr_guts(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "こんじょう" ) return 1
    if ( !poke.myAilment ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    return 6144 / 4096
}

function atkCorr_overgrow(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "しんりょく" ) return 1
    if ( poke.myRest_hp > poke.myFull_hp / 3 ) return 1
    if ( poke.myMove.type != "くさ" ) return 1
    return 6144 / 4096
}

function atkCorr_blaze(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "もうか" ) return 1
    if ( poke.myRest_hp > poke.myFull_hp / 3 ) return 1
    if ( poke.myMove.type != "ほのお" ) return 1
    return 6144 / 4096
}

function atkCorr_torrent(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "げきりゅう" ) return 1
    if ( poke.myRest_hp > poke.myFull_hp / 3 ) return 1
    if ( poke.myMove.type != "みず" ) return 1
    return 6144 / 4096
}

function atkCorr_swarm(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "むしのしらせ" ) return 1
    if ( poke.myRest_hp > poke.myFull_hp / 3 ) return 1
    if ( poke.myMove.type != "むし" ) return 1
    return 6144 / 4096
}

function atkCorr_flashFire(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "もらいび" ) return 1
    if ( !poke.myCondition.myFlash_fire ) return 1
    if ( poke.myMove.type != "ほのお" ) return 1
    return 6144 / 4096
}

function atkCorr_solarPower(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "サンパワー" ) return 1
    if ( !isSunny(poke) ) return 1
    if ( poke.myMove.nature != "特殊" ) return 1
    return 6144 / 4096
}

function atkCorr_plusMinus(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "プラス" && poke.myAbility != "マイナス" ) return 1
    for ( const _poke of myPokeInBattle(poke) ) {
        if ( !isAbility(_poke) ) continue
        if ( _poke.myID == poke.myID ) continue
        if ( _poke.myAbility == "プラス" ) return 6144 / 4096
        if ( _poke.myAbility == "マイナス" ) return 6144 / 4096
    }
    return 1
}

function atkCorr_steelworker(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "はがねつかい" ) return 1
    if ( poke.myMove.type != "はがね" ) return 1
    return 6144 / 4096
}

function atkCorr_gorillaTactics(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "ごりむちゅう" ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    return 6144 / 4096
}

function atkCorr_transistor(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "トランジスタ" ) return 1
    if ( poke.myMove.type != "でんき" ) return 1
    return 6144 / 4096
}

function atkCorr_dragonsMaw(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "りゅうのアギト" ) return 1
    if ( poke.myMove.type != "ドラゴン" ) return 1
    return 6144 / 4096
}

function atkCorr_hugePower(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "ちからもち" ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    return 8192 / 4096
}

function atkCorr_purePower(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "ヨガパワー" ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    return 8192 / 4096
}

function atkCorr_waterBubble_strengthen(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "すいほう" ) return 1
    if ( poke.myMove.type != "みず" ) return 1
    return 8192 / 4096
}

function atkCorr_stakeout(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "はりこみ" ) return 1
    return 1
}

function atkCorr_thickFat(poke, tgt) {
    if ( !isAbility(tgt.poke) ) return 1
    if ( tgt.poke.myAbility != "あついしぼう" ) return 1
    if ( poke.myMove.type != "ほのお" && poke.myMove.type != "こおり" ) return 1
    return 2048 / 4096
}

function atkCorr_waterBubble_weaken(poke, tgt) {
    if ( !isAbility(tgt.poke) ) return 1
    if ( tgt.poke.myAbility != "すいほう" ) return 1
    if ( poke.myMove.type != "ほのお" ) return 1
    return 2048 / 4096
}

function atkCorr_choiceBand(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "こだわりハチマキ" ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    if ( poke.myCondition.myDynamax ) return 1
    return 6144 / 4096
}

function atkCorr_choiceSpecs(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "こだわりメガネ" ) return 1
    if ( poke.myMove.nature != "特殊" ) return 1
    if ( poke.myCondition.myDynamax ) return 1
    return 6144 / 4096
}

function atkCorr_thickClub(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "ふといホネ" ) return 1
    if ( poke.myName != "カラカラ" && poke.myName != "ガラガラ" && poke.myName != "ガラガラ(アローラのすがた)" ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    return 8192 / 4096
}

function atkCorr_deepSeaTooth(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "しんかいのキバ" ) return 1
    if ( poke.myName != "パールル" ) return 1
    if ( poke.myMove.nature != "特殊" ) return 1
    return 8192 / 4096
}

function atkCorr_lightBall(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "でんきだま" ) return 1
    if ( poke.myName != "ピカチュウ" ) return 1
    return 8192 / 4096
}

//**************************************************
// 防御補正
//**************************************************

function defCorr_sandstorm(poke, tgt, nature) {
    if ( !isSandy(tgt.poke) ) return 1
    if ( !tgt.poke.myType.includes("いわ") ) return 1
    if ( poke.myMove.nature != nature ) return 1
    return 6144 / 4096
}

function defCorr_flowerGift(poke, tgt, nature) {
    if ( poke.myMove.nature != nature ) return 1
    const flowerGift = myPokeInBattle(tgt.poke).filter( _poke => _poke.myAbility == "フラワーギフト" && isAbility(_poke) && isSunny(_poke) )
    return Math.pow( 6144 / 4096, flowerGift.length)
}

function defCorr_marvelScale(poke, tgt, nature) {
    if ( !isAbility(tgt.poke) ) return 1
    if ( tgt.poke.myAbility != "ふしぎなうろこ" ) return 1
    if ( !tgt.poke.myAilment ) return 1
    if ( poke.myMove.nature != nature ) return 1
    return 6144 / 4096
}

function defCorr_glassPelt(poke, tgt, nature) {
    if ( !isAbility(tgt.poke) ) return 1
    if ( tgt.poke.myAbility != "くさのけがわ" ) return 1
    if ( !fieldStatus.myGrassy ) return 1
    if ( poke.myMove.nature != nature ) return 1
    return 6144 / 4096
}

function defCorr_furCoat(poke, tgt, nature) {
    if ( !isAbility(tgt.poke) ) return 1
    if ( tgt.poke.myAbility != "ファーコート" ) return 1
    if ( poke.myMove.nature != nature ) return 1
    return 8192 / 4096
}

function defCorr_eviolite(tgt) {
    if ( !isItem(tgt.poke) ) return 1
    if ( tgt.poke.myItem != "しんかのきせき" ) return 1
    if ( !pokeList_eviolite.includes(tgt.poke.myName) ) return 1
    return 6144 / 4096
}

function defCorr_assaultVest(poke, tgt, nature) {
    if ( !isItem(tgt.poke) ) return 1
    if ( tgt.poke.myItem != "とつげきチョッキ" ) return 1
    if ( poke.myMove.nature != nature ) return 1
    return 6144 / 4096
}

function defCorr_deepSeaScale(poke, tgt, nature) {
    if ( !isItem(tgt.poke) ) return 1
    if ( tgt.poke.myItem != "しんかいのウロコ" ) return 1
    if ( tgt.poke.myName != "パールル" ) return 1
    if ( poke.myMove.nature != nature ) return 1
    return 8192 / 4096
}

function defCorr_metalPowder(poke, tgt, nature) {
    if ( !isItem(tgt.poke) ) return 1
    if ( tgt.poke.myItem != "メタルパウダー" ) return 1
    if ( tgt.poke.myName != "メタモン" ) return 1
    if ( poke.myMove.nature != nature ) return 1
    return 8192 / 4096
}

//**************************************************
// ダメージ補正
//**************************************************

function dmgCorr_multipleTargets(poke) {
    return 1
}

function dmgCorr_parentalBond(poke) {
    if ( !isAbility(poke) ) return 1
    if ( poke.myAbility != "おやこあい" ) return 1
    if ( !poke.myCondition.myParental_bond ) return 1
    poke.myCondition.myParental_bond = false
    return 1024 / 4096
}

function dmgCorr_weather(poke, tgt) {
    // 天気弱化補正
    if ( isRainy(tgt.poke) && poke.myMove.type == "ほのお" ) return 2048 / 4096
    if ( isSunny(tgt.poke) && poke.myMove.type == "みず" ) return 2048 / 4096
    // 天気強化補正
    if ( isRainy(tgt.poke) && poke.myMove.type == "みず" ) return 6144 / 4096
    if ( isSunny(tgt.poke) && poke.myMove.type == "ほのお" ) return 6144 / 4096

    return 1
}

function dmgCorr_critical(tgt) {
    if ( !tgt.critical ) return 1
    return 6144 / 4096
}

function dmgCorr_random() {
    // 85~100の乱数をかけ、その後100で割る。
    const random = (Math.floor(getRandom() * 16 + 85)) / 100
    return random
}

function dmgCorr_typeMatch(poke) {
    if ( !poke.myType.includes(poke.myMove.type) ) return 1
    if ( poke.myAbility == "てきおうりょく" && isAbility(poke) ) return 8192 / 4096
    return 6144 / 4096
}

function dmgCorr_typeCompatibility(tgt) {
    return tgt.effective
}

function dmgCorr_burn(poke) {
    if ( poke.myAilment != "やけど" ) return 1
    if ( poke.myMove.nature != "物理" ) return 1
    if ( poke.myMove.name == "からげんき" ) return 1
    if ( poke.myAbility == "こんじょう" && isAbility(poke) ) return 1
    return 2048 / 4096
}

function dmgCorr_wall(poke, tgt) {
    if ( tgt.critical ) return 1
    if ( poke.myAbility == "すりぬけ" && isAbility(poke) ) return 1
    if ( isField(tgt.poke).myAurora_veil ) return 2732 / 4096
    if ( isField(tgt.poke).myReflect  && poke.myMove.nature == "物理" ) return 2732 / 4096
    if ( isField(tgt.poke).myLight_screen && poke.myMove.nature == "特殊" ) return 2732 / 4096
    return 1
}

function dmgCorr_neuroforce(poke, tgt) {
    if ( !isAbility(poke) ) return
    if ( poke.myAbility != "ブレインフォース" ) return 1
    if ( tgt.effective <= 1 ) return 1
    return 5120 / 4096
}

function dmgCorr_sniper(poke, tgt) {
    if ( !isAbility(poke) ) return
    if ( poke.myAbility != "スナイパー" ) return 1
    if ( !tgt.critical ) return 1
    return 6144 / 4096
}

function dmgCorr_tintedLens(poke, tgt) {
    if ( !isAbility(poke) ) return
    if ( poke.myAbility != "いろめがね" ) return 1
    if ( tgt.effective >= 1 ) return 1
    return 8192 / 4096
}

function dmgCorr_fluffy(poke, tgt) {
    if ( !isAbility(tgt.poke) ) return
    if ( tgt.poke.myAbility != "もふもふ" ) return 1
    if ( poke.myMove.type != "ほのお" ) return 1
    return 8192 / 4096
}

function dmgCorr_half(poke, tgt) {
    if ( !isAbility(tgt.poke) ) return 1
    switch ( tgt.poke.myAbility ) {
        case "こおりのりんぷん":
            if ( poke.myMove.nature != "特殊" ) return 1
            break

        case "パンクロック":
            if ( !musicMove.includes(poke.myMove.name) ) return 1
            break

        case "ファントムガード":
        case "マルチスケイル":
            if ( tgt.poke.myFull_hp > tgt.poke.myRest_hp ) return 1
            break

        case "もふもふ":
            if ( poke.myMove.direct == "間接" ) return 1
            break

        default:
            return 1
    }

    return 2048 / 4096
}

function dmgCorr_filter(tgt) {
    if ( !isAbility(tgt.poke) ) return 1
    switch ( tgt.poke.myAbility ) {
        case "ハードロック":
        case "フィルター":
        case "プリズムアーマー":
            if ( tgt.effective <= 1 ) return 1
            break

        default:
            return 1
    }

    return 3072 / 4096
}

function dmgCorr_friendGuard(tgt) {
    const friendGuard = myPokeInBattle(tgt.poke).filter( poke => poke.myAbility == "フレンドガード" && isAbility(poke) && poke.myID != tgt.poke.myID )
    return Math.pow( 3072 / 4096, friendGuard.length )
}

function dmgCorr_expertBelt(poke, tgt) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "たつじんのおび" ) return 1
    if ( tgt.effective <= 1 ) return 1
    return 4915 / 4096
}

function dmgCorr_metronome(poke) {
    return 1
}

function dmgCorr_lifeOrb(poke) {
    if ( !isItem(poke) ) return 1
    if ( poke.myItem != "いのちのたま" ) return 1
    return 5324 / 4096
}

function dmgCorr_halfDmgBerry(poke, tgt) {
    if ( !isItem(tgt.poke) )  return 1
    if ( tgt.effective <= 1 ) return 1
    for ( const berry of itemList_halfDamageBerry ) {
        if ( berry.name != tgt.poke.myItem )  continue
        if ( berry.type != poke.myMove.type ) continue
        tgt.poke.myCondition.myHalf_berry = true
        return 2048 / 4096 / isRipen(tgt.poke)
    }
    return 1
}

function dmgCorr_twice(poke, tgt) {
    if ( tgt.poke.myCondition.myDig ) {
        if ( poke.myMove.name == "じしん" ) return 8192 / 4096
        if ( poke.myMove.name == "マグニチュード" ) return 8192 / 4096
    }
    if ( tgt.poke.myCondition.myDive ) {
        if ( poke.myMove.name == "なみのり" ) return 8192 / 4096
        if ( poke.myMove.name == "ダイビング" ) return 8192 / 4096
    }
    if ( tgt.poke.myCondition.myMinimize ) {
        if ( minimize.includes(poke.myMove.name) ) return 8192 / 4096
    }
    if ( tgt.poke.myCondition.myDynamax ) {
        if ( poke.myMove.name == "きょじゅうざん" ) return 8192 / 4096
        if ( poke.myMove.name == "きょじゅうだん" ) return 8192 / 4096
        if ( poke.myMove.name == "ダイマックスほう" ) return 8192 / 4096
    }

    return 1
}

function dmgCorr_protect(poke, tgt) {
    return 1
}