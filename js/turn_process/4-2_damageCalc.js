function damageCalculation(poke, tgt){
    // ダメージ固定技の時
    if ( fixedDamage.includes(poke.myMove.name) ) {
        tgt.damage    = isDamageByFixedDamageMove(poke, tgt)
        tgt.effective = 1     // タイプ相性
        tgt.critical  = false // 急所
        return
    }

    // 最終威力
    const power = powerCalculation(poke, tgt)
    // 急所判定
    getCritical(poke, tgt)
    // 攻撃と防御の実数値取得　
    const param = getStatus(poke, tgt)
    // 最終攻撃
    const attack = attackCalculation(poke, tgt, param.atk)
    // 最終防御
    const defense = defenseCalculation(poke, tgt, param.def)
    // 最終ダメージ
    finalDamage(poke, tgt, power, attack, defense)
}


// ダメージ固定技
function isDamageByFixedDamageMove(poke, tgt){
    switch ( poke.myMove.name ) {
        case "ソニックブーム":
            return 20

        case "りゅうのいかり":
            return 40

        case "ちきゅうなげ":
        case "ナイトヘッド":
            return poke.myLevel

        case "サイコウェーブ":
            return Math.max(Math.floor(poke.myLevel * (Math.floor(getRandom() * 101) * 0.01 + 0.5)), 1)

        case "いかりのまえば":
        case "しぜんのいかり":
            return Math.floor(tgt.poke.myRest_hp / 2 * isDynamax(tgt.poke))

        case "がむしゃら":
            return tgt.poke.myRest_hp * isDynamax(tgt.poke) - poke.myRest_hp

        case "カウンター":
        case "ミラーコート":
            poke.myCondition.myDamage = {value: 0, party: false, position: false, nature: false}
            return poke.myCondition.myDamage.value * 2

        case "がまん":
            return poke.myMove.power

        case "メタルバースト":
            poke.myCondition.myDamage = {value: 0, party: false, position: false, nature: false}
            return poke.myCondition.myDamage.value * 1.5

        case "いのちがけ":
            return poke.myRest_hp

        case "ガーディアン・デ・アローラ":
            return Math.floor(tgt.poke.myRest_hp * 3 / 4 * isDynamax(tgt.poke))
    }

    if ( oneShot.includes(poke.myMove.name) ){
        writeLog(`一撃必殺 !`)
        return tgt.poke.myRest_hp
    }
}


function powerCalculation(poke, tgt){
    // 基礎威力の変化
    switch ( poke.myMove.name ) {
        // HPによるもの
        case "きしかいせい":
        case "じたばた":
            poke.myMove.power = 20
            if ( poke.myRest_hp < poke.myFull_hp * 33 / 48 ) poke.myMove.power = 40
            if ( poke.myRest_hp < poke.myFull_hp * 17 / 48 ) poke.myMove.power = 80
            if ( poke.myRest_hp < poke.myFull_hp * 10 / 48 ) poke.myMove.power = 100
            if ( poke.myRest_hp < poke.myFull_hp * 5 / 48 )  poke.myMove.power = 150
            if ( poke.myRest_hp < poke.myFull_hp * 2 / 48 )  poke.myMove.power = 200
            break

        case "しおふき":
        case "ふんか":
        case "ドラゴンエナジー":
            poke.myMove.power = Math.max(Math.floor(150 * poke.myRest_hp / poke.myFull_hp), 1)
            break

        case "しぼりとる":
        case "にぎりつぶす":
            poke.myMove.power = Math.max(Math.floor(120 * tgt.poke.myRest_hp / tgt.poke.myFull_hp), 1)
            break

        // 能力によるもの
        case "アシストパワー":
        case "つけあがる":
            let power_assist = 0
            for ( const para of allParameter() ) {
                    power_assist += Math.max(poke[`myRank_${para}`], 0)
            }
            poke.myMove.power = 20 * (power_assist + 1)
            break

        case "おしおき":
            let power = 0
            for ( const para of allParameter() ) {
                    power += Math.max(poke[`myRank_${para}`], 0)
            }
            poke.myMove.power = Math.min(20 * (power + 3), 200)
            break

        case "エレキボール":
            const atk_speed_el = speedAV(poke, "c")
            const def_speed_el = speedAV(tgt.poke, "c")
            poke.myMove.power = 40
            if ( atk_speed_el >= def_speed_el )     poke.myMove.power = 80
            if ( atk_speed_el >= def_speed_el * 3 ) poke.myMove.power = 120
            if ( atk_speed_el >= def_speed_el * 4 ) poke.myMove.power = 150
            break

        case "ジャイロボール":
            const atk_speed_jy = speedAV(poke, "c")
            const def_speed_jy = speedAV(tgt.poke, "c")
            poke.myMove.power = Math.min(Math.floor((25 * def_speed_jy / atk_speed_jy) + 1), 150)
            break

        case "おんがえし":
        case "やつあたり":
            break

        case "きりふだ":
            const PP = poke[`myRest_pp_${poke.myCmd_move}`]
            poke.myMove.power = 40
            if ( PP == 3 ) poke.myMove.power = 50
            if ( PP == 2 ) poke.myMove.power = 60
            if ( PP == 1 ) poke.myMove.power = 80
            if ( PP == 0 ) poke.myMove.power = 200
            break

        case "くさむすび":
        case "けたぐり":
            const weight = isWeight(tgt.poke)
            poke.myMove.power = 20
            if ( weight >= 10 )  poke.myMove.power = 40
            if ( weight >= 25 )  poke.myMove.power = 60
            if ( weight >= 50 )  poke.myMove.power = 80
            if ( weight >= 100 ) poke.myMove.power = 100
            if ( weight >= 200 ) poke.myMove.power = 120
            break

        case "ヒートスタンプ":
        case "ヘビーボンバー":
            const atk_weight = isWeight(poke)
            const def_weight = isWeight(tgt.poke)
            poke.myMove.power = 40
            if ( atk_weight >= def_weight * 2 ) poke.myMove.power = 60
            if ( atk_weight >= def_weight * 3 ) poke.myMove.power = 80
            if ( atk_weight >= def_weight * 4 ) poke.myMove.power = 100
            if ( atk_weight >= def_weight * 5 ) poke.myMove.power = 120
            break

        // 状態異常・状態変化・場の状態によるもの
        case "きつけ":
            if ( tgt.poke.myAilment != "まひ" ) break
            poke.myMove.power *= 2
            break

        case "めざましビンタ":
            if ( tgt.poke.myAilment != "ねむり" ) break
            poke.myMove.power *= 2
            break

        case "たたりめ":
            if ( !tgt.poke.myAilment ) poke.mymove.power = 130
            if ( tgt.poke.myAbility == "ぜったいねむり" && isAbility(tgt.poke) ) poke.myMove.power = 130
            break

        case "ウェザーボール":
            if ( isSunny(poke) ) poke.mymove.power = 100
            if ( isRainy(poke) ) poke.mymove.power = 100
            if ( isSandy(poke) ) poke.mymove.power = 100
            if ( isSnowy(poke) ) poke.myMove.power = 100
            break
        
        case "だいちのはどう":
            if ( !onGround(poke) ) break
            if ( fieldStatus.myElectric ) poke.myMove.power = 100
            if ( fieldStatus.myGrassy )   poke.myMove.power = 100
            if ( fieldStatus.myMisty )    poke.myMove.power = 100
            if ( fieldStatus.myPsychic )  poke.myMove.power = 100
            break

        case "ライジングボルト":
            if ( onGround(tgt.poke) && fieldStatus.myElectric ) poke.myMove.power *= 2
            break

        case "かぜおこし":
        case "たつまき":
            if ( tgt.poke.myCondition.mySky_drop ) poke.myMove.power *= 2
            if ( tgt.poke.myCondition.mySky ) poke.myMove.power *= 2
            break

        // もちものによるもの
        case "アクロバット":
            if ( !poke.myItem ) poke.myMove.power  = 110
            break
        
        case "しぜんのめぐみ":
            for ( const element of naturalGift ) {
                if ( poke.myItem == element.item ) poke.myMove.power = element.power
            }
            break

        case "なげつける":
            writeLog(`${poke.myItem} を 投げつけた !`)
            if ( itemList_berry.includes(poke.myItem) ) poke.myMove.power = 10
            for ( const incense of itemList_incense ) if ( incense.name == poke.myItem && incense.name.includes("おこう") ) poke.myMove.power = 10
            if ( itemList_fling.damage10.includes(poke.myItem) ) poke.myMove.power = 10
            if ( itemList_fling.damage30.includes(poke.myItem) ) poke.myMove.power = 30
            if ( itemList_fling.damage40.includes(poke.myItem) ) poke.myMove.power = 40
            if ( itemList_fling.damage50.includes(poke.myItem) ) poke.myMove.power = 50
            for ( const memory of itemList_memory ) if ( memory.name == poke.myItem ) poke.myMove.power = 50
            if ( itemList_fling.damage60.includes(poke.myItem) ) poke.myMove.power = 60
            if ( itemList_fling.damage70.includes(poke.myItem) ) poke.myMove.power = 70
            if ( poke.myItem.includes("カセット") ) poke.myMove.power = 70
            if ( poke.myItem.includes("パワー") ) poke.myMove.power = 70
            if ( itemList_fling.damage80.includes(poke.myItem) ) poke.myMove.power = 80
            for ( const mega of itemList_megaStone ) if ( mega.name == poke.myItem ) poke.myMove.power = 80
            if ( itemList_fling.damage90.includes(poke.myItem) ) poke.myMove.power = 90
            for ( const plate of itemList_plate ) if ( plate.name == poke.myItem ) poke.myMove.pow = 90
            if ( itemList_fling.damage100.includes(poke.myItem) ) poke.myMove.power = 100
            if ( itemList_fling.damage130.includes(poke.myItem) ) poke.myMove.power = 130
            break

        // 連続性によるもの
        case "アイスボール":
        case "ころがる":
            if ( poke.myCondition.myDefense_curl ) poke.myMove.power *= 2
            const ice = poke.myCondition.myIce_ball
            const roll = poke.myCondition.myRollout
            poke.myMove.power *= Math.pow(2, Math.max(ice, roll) - 1)
            break

        case "エコーボイス":
            poke.myMove.power = Math.min(40 * (fieldStatus.myEchoed_voice), 200)
            break

        case "じだんだ":
            break

        case "トリプルキック":
            break

        case "トリプルアクセル":
            break

        case "はきだす":
            const def    = poke.myCondition.myStockpile_B
            const sp_def = poke.myCondition.myStockpile_D
            poke.myMove.power = Math.max(def, sp_def) * 100
            changeMyRank(poke, "def", -1 * def)
            changeMyRank(poke, "sp_def", -1 * sp_def)
            writeLog(`${poke.myTN} の ${poke.myName} は たくわえが なくなった !`)
            poke.myCondition.myStockpile_B = 0
            poke.myCondition.myStockpile_D = 0
            break

        case "りんしょう":
            break

        case "れんぞくぎり":
            const num = poke.myCondition.myFury_cutter
            poke.myMove.power = Math.min(40 * num, 160)
            break

        // コンビネーションわざ
        case "くさのちかい":
        case "ほのおのちかい":
        case "みずのちかい":
            break

        // 行動順によるもの
        case "エラがみ":
        case "でんげきくちばし":
            // if (tgt.com != "" || user[0].f_con.includes("交代済" + tgt.child)) poke.myMove.power *= 2
            break

        case "おいうち":
            break

        case "しっぺがえし":
            break

        case "ダメおし":
            if ( poke.myCondition.myAssurance ) poke.myMove.power *= 2
            break

        case "ゆきなだれ":
        case "リベンジ":
            if ( poke.myCondition.myDamage.value ) poke.myMove.power *= 2
            break

        // その他
        case "プレゼント":
            break

        case "マグニチュード":
            break

        case "みずしゅりけん":
            break
    }


    // 威力に補正をかける効果
    // 威力補正初期値
    let corr = 4096

    // * 3072 / 4096 → 四捨五入
    // オーラブレイク
    const auraBreak = powerCorr_auraBreak(poke)
    corr = Math.round(corr * auraBreak)

    // とうそうしん　弱化
    const rivalry_weeken = powerCorr_rivalry_weeken(poke, tgt)
    corr = Math.round(corr * rivalry_weeken)

    // * 4915 / 4096 → 四捨五入
    // スキン特性
    const skin = powerCorr_skin(poke)
    corr = Math.round(corr * skin)

    // すてみ
    const reckless = powerCorr_reckless(poke)
    corr = Math.round(corr * reckless)

    // てつのこぶし
    const ironFist = powerCorr_reckless(poke)
    corr = Math.round(corr * ironFist)

    // * 5120 / 4096 → 四捨五入
    // とうそうしん強化
    const rivalry_strengthen = powerCorr_rivalry_strengthen(poke, tgt)
    corr = Math.round(corr * rivalry_strengthen)

    // * 5325 / 4096 → 四捨五入
    // バッテリー
    const battery = powerCorr_battery(poke)
    corr = Math.round(corr * battery)

    // パワースポット
    const powerSpot = powerCorr_powerSpot(poke)
    corr = Math.round(corr * powerSpot)

    // * 5325 / 4096 → 四捨五入
    // アナライズ
    const analytic = powerCorr_analytic(poke)
    corr = Math.round(corr * analytic)

    // かたいツメ
    const toughClaws = powerCorr_toughClaws(poke)
    corr = Math.round(corr * toughClaws)

    // すなのちから
    const sandForce = powerCorr_sandForce(poke)
    corr = Math.round(corr * sandForce)

    // ちからずく
    const sheerForce = powerCorr_sheerForce(poke)
    corr = Math.round(corr * sheerForce)

    // パンクロック
    const punkRock = powerCorr_punkRock(poke)
    corr = Math.round(corr * punkRock)

    // * 5448 / 4096 → 四捨五入
    // ダークオーラ
    const darkAura = powerCorr_darkAura(poke)
    corr = Math.round(corr * darkAura)

    // フェアリーオーラ 
    const failyAura = powerCorr_failyAura(poke)
    corr = Math.round(corr * failyAura)

    // * 6144 / 4096 → 四捨五入
    // がんじょうあご
    const strongJaw = powerCorr_strongJaw(poke)
    cor = Math.round(corr * strongJaw)

    // テクニシャン
    const technician = powerCorr_technician(poke)
    corr = Math.round(corr * technician)

    // どくぼうそう
    const toxicBoost = powerCorr_toxicBoost(poke)
    corr = Math.round(corr * toxicBoost)

    // ねつぼうそう
    const flareBoost = powerCorr_flareBoost(poke)
    corr = Math.round(corr * flareBoost)

    // はがねのせいしん
    const steelySpirit = powerCorr_steelySpirit(poke)
    corr = Math.round(corr * steelySpirit)

    // メガランチャー
    const megaLauncher = powerCorr_megaLauncher(poke)
    corr = Math.round(corr * megaLauncher)

    // * 2048 / 4096 → 四捨五入
    // たいねつ
    const heatproof = powerCorr_heatproof(poke, tgt)
    corr = Math.round(corr * heatproof)

    // * 5120 / 4096 → 四捨五入
    // かんそうはだ
    const drySkin = powerCorr_drySkin(poke, tgt)
    corr = Math.round(corr * drySkin)

    // * 4505 / 4096 → 四捨五入
    // ちからのハチマキ
    const muscleBand = powerCorr_muscleBand(poke)
    corr = Math.round(corr * muscleBand)

    // ものしりメガネ
    const wiseGlasses = powerCorr_wiseGlasses(poke)
    corr = Math.round(corr * wiseGlasses)

    // * 4915 / 4096 → 四捨五入
    // プレート類
    const plate = powerCorr_plate(poke)
    corr = Math.round(corr * plate)

    // 特定タイプの威力UPアイテム（おこう含む）
    const incense = powerCorr_incense(poke)
    corr = Math.round(corr * incense)

    // こころのしずく
    const soulDew = powerCorr_soulDew(poke)
    corr = Math.round(corr * soulDew)

    // こんごうだま
    const adamantOrb = powerCorr_adamantOrb(poke)
    corr = Math.round(corr * adamantOrb)

    // しらたま
    const lustrousOrb = powerCorr_lustrousOrb(poke)
    corr = Math.round(corr * lustrousOrb)

    // はっきんだま
    const griseousOrb = powerCorr_griseousOrb(poke)
    corr = Math.round(corr * griseousOrb)

    // * 5325 / 4096 → 四捨五入
    // ジュエル
    const gem = powerCorr_gem(poke)
    corr = Math.round(corr * gem)

    // * 2048 / 4096 → 四捨五入
    // ソーラービーム、ソーラーブレード
    const solar = powerCorr_solar(poke)
    corr = Math.round(corr * solar)

    // * 6144 / 4096 → 四捨五入
    // Gのちから
    const gravApple = powerCorr_gravApple(poke)
    corr = Math.round(corr * gravApple)

    // はたきおとす
    const knockOff = powerCorr_knockOff(poke, tgt)
    corr = Math.round(corr * knockOff)

    // ミストバースト
    const mistyExplosion = powerCorr_mistyExplosion(poke)
    corr = Math.round(corr * mistyExplosion)

    // ワイドフォース
    const expandingForce = powerCorr_expandingForce(poke)
    corr = Math.round(corr * expandingForce)

    // * 6144 / 4096 → 四捨五入
    // てだすけ
    const helpingHand = powerCorr_helpingHand(poke)
    corr = Math.round(corr * helpingHand)

    // * 6144 / 4096 → 四捨五入
    // さきどり
    const meFirst = powerCorr_meFirst(poke)
    corr = Math.round(corr * meFirst)

    // * 8192 / 4096 → 四捨五入
    // じゅうでん 
    const charge = powerCorr_charge(poke)
    corr = Math.round(corr * charge)

    // * 8192 / 4096 → 四捨五入
    // うっぷんばらし
    const lashOut = powerCorr_lashOut(poke)
    corr = Math.round(corr * lashOut)

    // かたきうち
    const retailate = powerCorr_retaliate(poke)
    corr = Math.round(corr * retailate)

    // からげんき
    const facade = powerCorr_facade(poke)
    corr = Math.round(corr * facade)

    // クロスサンダー
    const fusionBolt = powerCorr_fusionBolt(poke)
    corr = Math.round(corr * fusionBolt)

    // クロスサンダー
    const fusionFlare = powerCorr_fusionFlare(poke)
    corr = Math.round(corr * fusionFlare)

    // しおみず
    const brine = powerCorr_brine(poke)
    corr = Math.round(corr * brine)

    // ベノムショック
    const venoshock = powerCorr_venoshock(poke)
    corr = Math.round(corr * venoshock)

    // * 2048 / 4096 → 四捨五入
    // フィールド弱化
    const terrain_weaken = powerCorr_terrain_weaken(poke, tgt)
    corr = Math.round(corr * terrain_weaken)

    // * 5325 / 4096 → 四捨五入
    // フィールド強化
    const terrain_strengthen = powerCorr_terrain_strengthen(poke)
    corr = Math.round(corr * terrain_strengthen)

    // * 1352 / 4096 → 四捨五入
    // どろあそび
    const mudSport = powerCorr_mudSport(poke)
    corr = Math.round(corr * mudSport)

    // みずあそび
    const waterSport = powerCorr_waterSport(poke)
    corr = Math.round(corr * waterSport)


    // 最終威力 1より小さければ1になる
    return Math.max(fiveCut(poke.myMove.power * corr / 4096), 1)
}

// 急所判定
function getCritical(poke, tgt){

    let critical = 0

    if ( poke.myCondition.myCritical ) critical += 2 // きゅうしょアップ
    if ( poke.myCondition.Laser_focus == 2 ) critical += 3 // とぎすます
    if ( poke.myCondition.myChi_strike ) critical += poke.myCondition.myChi_strike // キョダイシンゲキ
    if ( poke.myAbility == "きょううん" && isAbility(poke) ) critical += 1
    if ( ( poke.myItem == "ピントレンズ" || poke.myItem == "するどいツメ" ) && isItem(poke) ) critical += 1
    if ( poke.myName == "ラッキー" && poke.myItem == "ラッキーパンチ" && isItem(poke) ) critical += 2
    if ( ( poke.myName.includes("カモネギ") || poke.myName == "ネギガナイト" ) && poke.myItem == "ながねぎ" && isItem(poke) ) critical += 2
    if ( poke.myAbility == "ひとでなし" && isAbility(poke) && tgt.poke.myAilment == "どく" ) critical += 3   
    for ( const element of criticalMove ) {
        if ( poke.myMove.name == element.name ) critical += element.critical
    }

    if ( isField(tgt.poke).myLucky_chant ) return false // おまじない
    if ( tgt.poke.myAbility == "カブトアーマー" && isAbility(tgt.poke) ) return false
    if ( tgt.poke.myAbility == "シェルアーマー" && isAbility(tgt.poke) ) return false

    const random = getRandom()

    if ( critical == 0 && random < 1 / 24 ) tgt.critical = true
    if ( critical == 1 && random < 1 / 8 ) tgt.critical = true
    if ( critical == 2 && random < 1 / 2 ) tgt.critical = true
    if ( critical >= 3 ) tgt.critical = true
}

// 実数値取得
function getStatus(poke, tgt){

    let atk         = poke.myAtk
    let def         = tgt.poke.myDef
    let sp_atk      = poke.mySp_atk
    let sp_def      = tgt.poke.mySp_def
    let rank_atk    = poke.myRank_atk
    let rank_def    = tgt.poke.myRank_def
    let rank_sp_atk = poke.myRank_sp_atk
    let rank_sp_def = tgt.poke.myRank_sp_def

    if ( fieldStatus.myWonder_room ){
        def    = tgt.poke.mySp_def
        sp_def = tgt.poke.myDef
    }
    if ( poke.myMove.name == "フォトンゲイザー" || poke.myMove.name == "てんこがすめつぼうのひかり" ){
        const A_photon = isValueIncludingRank(atk, rank_atk, false)
        const C_photon = isValueIncludingRank(sp_atk, rank_sp_atk, false)
        if ( A_photon > C_photon ) poke.myMove.nature = "物理"
    }
    if ( poke.myMove.name == "シェルアームズ" ){
        const A_shell = isValueIncludingRank(atk, rank_atk, false)
        const B_shell = isValueIncludingRank(def, rank_def, false)
        const C_shell = isValueIncludingRank(sp_atk, rank_sp_atk, false)
        const D_shell = isValueIncludingRank(sp_def, rank_sp_def, false)
        if ( A_shell / B_shell > C_shell / D_shell ) poke.myMove.nature = "物理"
    }
    if ( poke.myMove.nature == "物理" ){
        if ( poke.myMove.name == "イカサマ" ){
            atk      = tgt.poke.myAtk
            rank_atk = tgt.poke.myRank_atk
        }
        if ( poke.myMove.name == "せいなるつるぎ" || poke.myMove.name == "DDラリアット" || poke.myMove.name == "なしくずし" ){
            rank_def    = 0
            rank_sp_def = 0
        }
        if ( poke.myMove.name == "ボディプレス" ){
            atk      = poke.myDef
            rank_atk = poke.myRank_def
            if ( fieldStatus.myWonder_room ) rank_atk = poke.myRank_sp_def
        }
        const A_result = isValueIncludingRank(atk, rank_atk, tgt.critical)
        const B_result = isValueIncludingRank(def, rank_def, tgt.critical)
        return {atk: A_result, def: B_result}
    }
    if ( poke.myMove.nature == "特殊" ){
        if ( poke.myMove.name == "サイコショック" || poke.myMove.name == "サイコブレイク" || poke.myMove.name == "しんぴのつるぎ" ){
            ( fieldStatus.myWonder_room )? sp_def = tgt.poke.mySp_def : sp_def = tgt.poke.myDef
            rank_sp_def = tgt.poke.myRank_def
        }
        if ( poke.myMove.name == "はめつのねがい" || poke.myMove.name == "みらいよち" ){
            /*
            const text = searchText(user[0].f_con, "状態変化『みらいにこうげき』")
            const parent = Number(text.split("　")[3].split(",")[0])
            const child = Number(text.split("　")[3].split(",")[1])
            const num = Number(text.split("　")[3].split(",")[2])

            let field = false
            for (let i = 0; i < 2; i++){
                if (isCon(me, you, parent, i).num == num){
                    sp_atk = isCon(me, you, parent, i).sp_atk
                    rank_sp_atk = isCon(me, you, parent, i).rank_sp_atk
                    field = true
                }
            }

            if (field == false){
                sp_atk = me["poke" + num].sp_atk
                rank_sp_atk = 0
            }
            */
        }
        const C_result = isValueIncludingRank(sp_atk, rank_sp_atk, tgt.critical)
        const D_result = isValueIncludingRank(sp_def, rank_sp_def, tgt.critical)
        return {atk: C_result, def: D_result}
    }
}


// 最終攻撃力
function attackCalculation(poke, tgt, atk){

    let attack = atk

    // はりきり
    if ( poke.myAbility == "はりきり" && isAbility(poke) ) {
        if ( poke.myMove.nature == "物理" ) attack = Math.floor(attack * 6144 / 4096)
    }
    
    // 初期値
    attack = attack * 4096

    // スロースタート、よわき
    if ( !isNaN(poke.myCondition.mySlow_start) ) {
        if ( poke.myMove.nature == "物理" ) attack = Math.round(attack * 2048 / 4096)
    }
    if ( poke.myAbility == "よわき" && isAbility(poke) ) {
        if ( poke.myRest_hp <= poke.myFull_hp / 2 ) attack = Math.round(attack * 2048 / 4096)
    }
    // フラワーギフト、こんじょう、しんりょく、もうか、げきりゅう、むしのしらせ、もらいび、サンパワー、プラス、マイナス、はがねつかい、ごりむちゅう、トランジスタ、りゅうのあぎと
    if ( poke.myMove.nature == "物理" ) {
        for ( const _poke of myPokeInBattle(poke) ) {
            if ( _poke.myAbility == "フラワーギフト" && isAbility(_poke) && isSunny(_poke) ) {
                attack = Math.round(attack * 6144 / 4096)
            }
        }
    }
    if ( poke.myMove.type == "はがね" ) {
        for ( const _poke of myPokeInBattle(poke) ) {
            if ( _poke.myAbility == "はがねつかい" && isAbility(_poke) ) {
                attack = Math.round(attack * 6144 / 4096)
            }
        }
    }
    if ( isAbility(poke) ) {
        switch ( poke.myAbility ) {
            case "こんじょう":
                if ( !poke.myAilment ) break
                if ( poke.myMove.nature != "物理" ) break
                attack = Math.round(attack * 6144 / 4096)
                break

            case "しんりょく":
                if ( poke.myRest_hp > poke.myFull_hp / 3 ) break
                if ( poke.myMove.type != "くさ" ) break
                attack = Math.round(attack * 6144 / 4096)
                break

            case "もうか":
                if ( poke.myRest_hp > poke.myFull_hp / 3 ) break
                if ( poke.myMove.type != "ほのお" ) break
                attack = Math.round(attack * 6144 / 4096)
                break

            case "げきりゅう":
                if ( poke.myRest_hp > poke.myFull_hp / 3 ) break
                if ( poke.myMove.type != "みず" ) break
                attack = Math.round(attack * 6144 / 4096)
                break

            case "むしのしらせ":
                if ( poke.myRest_hp > poke.myFull_hp / 3 ) break
                if ( poke.myMove.type != "むし" ) break
                attack = Math.round(attack * 6144 / 4096)
                break

            case "もらいび":
                if ( !poke.myCondition.myFlash_fire ) break
                if ( poke.myMove.type != "ほのお" ) break
                attack = Math.round(attack * 6144 / 4096)
                break

            case "サンパワー":
                if ( !isSunny(poke) ) break
                if ( poke.myMove.nature != "特殊" ) break
                attack = Math.round(attack * 6144 / 4096)
                break

            case "ごりむちゅう":
                if ( poke.myMove.nature != "物理" ) break
                attack = Math.round(attack * 6144 / 4096)
                break

            case "トランジスタ":
                if ( poke.myMove.type != "でんき" ) break
                attack = Math.round(attack * 6144 / 4096)
                break

            case "りゅうのあぎと":
                if ( poke.myMove.type != "ドラゴン") break
                attack = Math.round(attack * 6144 / 4096)
                break
        }
    }
    // ちからもち、ヨガパワー、すいほう強化、はりこみ
    if ( poke.myAbility == "ちからもち" && isAbility(poke) ) {
        if ( poke.myMove.nature == "物理" ) attack = Math.round(attack * 8192 / 4096)
    }
    if ( poke.myAbility == "ヨガパワー" && isAbility(poke) ) {
        if ( poke.myMove.nature == "物理" ) attack = Math.round(attack * 8192 / 4096)
    }
    if ( poke.myAbility == "すいほう" && isAbility(poke) ) {
        if ( poke.myMove.type == "みず") attack = Math.round(attack * 8192 / 4096)
    }
    if ( poke.myAbility == "はりこみ" && isAbility(poke) ) {
        /*
        const log = cfn.thisTurnLog(me.log)
        if (log.includes("(" + tgt.TN + "の行動)")){
            if (log[log.indexOf("(" + tgt.TN + "の行動)") + 1].includes(tgt.TN + "　は") && log[log.indexOf("(" + tgt.TN + "の行動)") + 1].includes("引っ込めた")){
                attack = Math.round(attack * 8192 / 4096)
            }
        }
        */
    }
    // あついしぼう、すいほう弱化
    if ( tgt.poke.myAbility == "あついしぼう" && isAbility(tgt.poke) ) {
        if ( poke.myMove.type == "ほのお" || poke.myMove.type == "こおり" ) attack = Math.round(attack * 2048 / 4096)
    }
    if ( tgt.poke.myAbility == "すいほう" && isAbility(tgt.poke) ) {
        if ( poke.myMove.type == "ほのお" ) attack = Math.round(attack * 2048 / 4096)
    }
    // こだわりハチマキ、こだわりメガネ
    if ( poke.myItem == "こだわりハチマキ" && isItem(poke) ) {
        if ( poke.myMove.nature == "物理" && !poke.myCondition.myDynamax ) attack = Math.round(attack * 6144 / 4096)
    }
    if ( poke.myItem == "こだわりメガネ" && isItem(poke) ) {
        if ( poke.myMove.nature == "特殊" && !poke.myCondition.myDynamax ) attack = Math.round(attack * 6144 / 4096)
    }
    // ふといホネ、しんかいのキバ、でんきだま
    if ( poke.myItem == "ふといホネ" && isItem(poke) ) {
        if ( ( poke.myName == "カラカラ" || poke.myName.includes("ガラガラ") ) && poke.myMove.nature == "物理" ) attack = Math.round(attack * 8192 / 4096)
    }
    if ( poke.myItem == "しんかいのキバ" && isItem(poke) ) {
        if ( poke.myName == "パールル" && poke.myMove.nature == "特殊" ) attack = Math.round(attack * 8192 / 4096)
    }
    if ( poke.myItem == "でんきだま" && isItem(poke) ) {
        if ( poke.myName == "ピカチュウ" ) attack = Math.round(attack * 8192 / 4096)
    }

    // 最終攻撃 1より小さかったら1にする
    return Math.max(fiveCut(attack / 4096), 1)
}


// 最終防御
function defenseCalculation(poke, tgt, def){
    let defense = def

    let phys = "物理"
    let spec = "特殊"

    if ( fieldStatus.myWonder_room ){
        phys = "特殊"
        spec = "物理"
    }
    if ( poke.myMove.name == "サイコショック" || poke.myMove.name == "サイコブレイク" || poke.myMove.name == "しんぴのつるぎ" ){
        phys = "特殊"
        spec = "物理"
    }
    

    // すなあらしの時、岩タイプの特防が上がる
    if ( isSandy(tgt.poke) && tgt.poke.myType.includes("いわ") && poke.myMove.nature == spec ){
        defense = Math.floor(defense * 6144 / 4096)
    }

    // 初期値
    defense = defense * 4096
    
    // フラワーギフト、ふしぎなうろこ、くさのけがわ
    if ( poke.myMove.nature == spec ){
        for ( const _poke of myPokeInBattle(tgt.poke) ){
            if ( _poke.myAbility == "フラワーギフト" && isAbility(_poke) && isSunny(_poke) ){
                defense = Math.floor(defense * 6144 / 4096)
            }
        }
    }
    if ( tgt.poke.myAbility == "ふしぎなうろこ" && isAbility(tgt.poke) ) {
        if ( !tgt.poke.myAilment && poke.myMove.nature == phys ) defense = Math.floor(defense * 6144 / 4096)
    }
    if ( tgt.poke.myAbility == "くさのけがわ" && isAbility(tgt.poke) ) {
        if ( fieldStatus.myGrassy && poke.myMove.nature == phys ) defense = Math.floor(defense * 6144 / 4096)
    }
    // ファーコート
    if ( tgt.poke.myAbility == "ファーコート" && isAbility(tgt.poke) ) {
        if ( poke.myMove.nature == phys ) defense = Math.floor(defense * 8192 / 4096)
    }
    // しんかのきせき、とつげきチョッキ
    if ( tgt.poke.myItem == "しんかのきせき" && isItem(tgt.poke) ) {
        if ( eviolite.includes(tgt.poke.myName) ) defense = Math.floor(defense * 6144 / 4096)
    }
    if ( tgt.poke.myItem == "とつげきチョッキ" && isItem(tgt.poke) ) {
        if ( poke.myMove.nature == spec ) defense = Math.floor(defense * 6144 / 4096)
    }
    // しんかいのウロコ、メタルパウダー
    if ( tgt.poke.myItem == "しんかいのウロコ" && isItem(tgt.poke) ) {
        if ( tgt.poke.myName == "パールル" && poke.myMove.nature == spec ) defense = Math.floor(defense * 8192 / 4096)
    }
    if ( tgt.poke.myItem == "メタルパウダー" && isItem(tgt.poke) ) {
        if ( tgt.poke.myName == "メタモン" && poke.myMove.nature == phys ) defense = Math.floor(defense * 8192 / 4096)
    }

    // 最終防御　1より小さかったら1にする
    return Math.max(fiveCut(defense / 4096), 1)

}


// 最終ダメージ
function finalDamage(poke, tgt, power, attack, defense){

    let damage = Math.floor(poke.myLevel * 2 / 5 + 2)
    damage = Math.floor(damage * power * attack / defense)
    damage = Math.floor(damage / 50 + 2)


    // 複数対象補正
    // おやこあい補正
    if ( poke.myCondition.myParental_bond ){
        damage = fiveCut(damage * 1024 / 4096)
        poke.myCondition.myParental_bond = false
    }
    // 天気弱化補正
    if ( isRainy(tgt.poke) && poke.myMove.type == "ほのお" ) damage = fiveCut(damage * 2048 / 4096)
    if ( isSunny(tgt.poke) && poke.myMove.type == "みず" ) damage = fiveCut(damage * 2048 / 4096)
    // 天気強化補正
    if ( isRainy(tgt.poke) && poke.myMove.type == "みず" ) damage = fiveCut(damage * 6144 / 4096)
    if ( isSunny(tgt.poke) && poke.myMove.type == "ほのお" ) damage = fiveCut(damage * 6144 / 4096)
    // 急所補正
    if ( tgt.critical ) damage = fiveCut(damage * 6144 / 4096)
    // ダメージ乱数補正
    const random = (Math.floor(getRandom() * 16 + 85)) / 100
    damage = Math.floor(damage * random)
    // タイプ一致補正
    if ( poke.myType.includes(poke.myMove.type) ) {
        if ( poke.myAbility == "てきおうりょく" && isAbility(poke) ) {
            damage = fiveCut(damage * 8192 / 4096)
        }
        else {
            damage = fiveCut(damage * 6144 / 4096)
        }
    }
    // タイプ相性補正
    // ( tgt.effective )? rate = compatibilityCheck(poke, tgt) : rate = tgt.damage.compatibility
    damage = Math.floor(damage * tgt.effective)
    // やけど補正
    if ( poke.myAilment == "やけど" && poke.myMove.nature == "物理" && poke.myMove.name != "からげんき" ) {
        if ( !( poke.myAbility == "こんじょう" && isAbility(poke) ) ) damage = fiveCut(damage * 2048 / 4096)
    }
    // 壁補正
    if (!tgt.critical && !( poke.myAbility == "すりぬけ" && isAbility(poke) ) ) {
        if ( ( isField(tgt.poke).myReflect || isField(tgt.poke).myAurora_veil ) && poke.myMove.nature == "物理" ) {
            damage = Math.round(damage * 2048 / 4096)
        }
        if ( ( isField(tgt.poke).myLight_screen || isField(tgt.poke).myAurora_veil ) && poke.myMove.nature == "特殊" ) {
            damage = Math.round(damage * 2048 / 4096)
        }
    }

    // 自分の特性による補正
    if ( isAbility(poke) ) {
        switch ( poke.myAbility ) {
            case "ブレインフォース":
                if ( tgt.effective > 1 ) damage = Math.round(damage * 5120 / 4096)
                break

            case "スナイパー":
                if ( tgt.critical ) damage = Math.round(damage * 6144 / 4096)
                break

            case "いろめがね":
                if ( tgt.effective < 1 ) damage = Math.round(damage * 8192 / 4096)
                break
        }
    }
    // 相手の特性による補正
    if ( isAbility(tgt.poke) ) {
        switch ( tgt.poke.myAbility ) {
            case "もふもふ":
                if ( poke.myMove.type == "ほのお" ) damage = Math.round(damage * 8192 / 4096)
                break

            case "こおりのりんぷん":
                if ( poke.myMove.nature == "特殊" ) damage = Math.round(damage * 2048 / 4096)
                break

            case "パンクロック":
                if ( musicMove.includes(poke.myMove.name) ) damage = Math.round(damage * 2048 / 4096)
                break

            case "ファントムガード":
                if ( tgt.poke.myFull_hp == tgt.poke.myRest_hp ) damage = Math.round(damage * 2048 / 4096)
                break

            case "マルチスケイル":
                if ( tgt.poke.myFull_hp == tgt.poke.myRest_hp ) damage = Math.round(damage * 2048 / 4096)
                break

            case "もふもふ":
                if ( poke.myMove.direct == "直接" ) damage = Math.round(damage * 2048 / 4096)
                break

            case "ハードロック":
                if ( tgt.effective > 1 ) damage = Math.round(damage * 3072 / 4096)
                break

            case "フィルター":
                if ( tgt.effective > 1 ) damage = Math.round(damage * 3072 / 4096)
                break

            case "プリズムアーマー":
                if ( tgt.effective > 1 ) damage = Math.round(damage * 3072 / 4096)
                break
        }
    }
    // フレンドガード補正
    // たつじんのおび補正
    if ( poke.myItem == "たつじんのおび" && isItem(poke) ) {
        if ( tgt.effective > 1 ) damage = Math.round(damage * 4915 / 4096)
    }
    // メトロノーム補正
    // いのちのたま補正
    if ( poke.myItem == "いのちのたま" && isItem(poke) ) {
        damage = Math.floor(damage * 5324 / 4096)
    }
    // 半減きのみ補正
    for ( const berry of itemList_halfDamageBerry ) {
        if ( tgt.poke.myItem == berry.name && isItem(tgt.poke) && poke.myMove.type == berry.type && tgt.effective > 1 ) {
            tgt.poke.myCondition.myHalf_berry = true
            damage = Math.round(damage * 2048 / 4096 / isRipen(tgt.poke))
        }
    }
    // ちいさくなる、あなをほる、ダイマックス状態への攻撃補正
    if ( tgt.poke.myCondition.myMinimize ) {
        if ( minimize.includes(poke.myMove.name) ) damage = Math.round(damage * 8192 / 4096)
    }
    if ( tgt.poke.myCondition.myDig ) {
        if ( poke.myMove.name == "じしん" || poke.myMove.name == "マグニチュード" ) damage = Math.round(damage * 8192 / 4096)
    }
    if ( tgt.poke.myCondition.myDive ) {
        if ( poke.myMove.name == "なみのり" || poke.myMove.name == "ダイビング" ) damage = Math.round(damage * 8192 / 4096)
    }
    // まもる状態貫通補正
    /*
    if (!(poke.myMove.name == "キョダイイチゲキ" || poke.myMove.name == "キョダイレンゲキ")){
        for (let i = 0; i < tgt.p_con.split("\n").length; i++){
            if (moveEff.protect().includes(tgt.p_con.split("\n")[i])){
                damage = fiveCut(damage * 1024 / 4096)
            }
        }
    }
    */

    // 最終ダメージ
    tgt.damage = damage
}