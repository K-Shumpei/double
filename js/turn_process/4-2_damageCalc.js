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
            poke.myCondition.myDamage = {value: 0, sum: 0, party: false, position: false, nature: false}
            return poke.myCondition.myDamage.value * 2

        case "がまん":
            return poke.myMove.power

        case "メタルバースト":
            poke.myCondition.myDamage = {value: 0, sum: 0, party: false, position: false, nature: false}
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


// 威力計算
// 参照：https://wiki.xn--rckteqa2e.com/wiki/%E5%A8%81%E5%8A%9B
function powerCalculation(poke, tgt){
    // 基礎威力の変化
    poke.myMove.power = changeBasePower(poke, tgt)
    
    // 威力に補正をかける効果
    // 威力補正値
    let corr = 4096

    // * 3072 / 4096 → 四捨五入
    // オーラブレイク
    const auraBreak = pwrCorr_auraBreak(poke)
    corr = Math.round(corr * auraBreak)

    // とうそうしん　弱化
    const rivalry_weeken = pwrCorr_rivalry_weeken(poke, tgt)
    corr = Math.round(corr * rivalry_weeken)

    // * 4915 / 4096 → 四捨五入
    // スキン特性
    const skin = pwrCorr_skin(poke)
    corr = Math.round(corr * skin)

    // すてみ
    const reckless = pwrCorr_reckless(poke)
    corr = Math.round(corr * reckless)

    // てつのこぶし
    const ironFist = pwrCorr_reckless(poke)
    corr = Math.round(corr * ironFist)

    // * 5120 / 4096 → 四捨五入
    // とうそうしん強化
    const rivalry_strengthen = pwrCorr_rivalry_strengthen(poke, tgt)
    corr = Math.round(corr * rivalry_strengthen)

    // * 5325 / 4096 → 四捨五入
    // バッテリー
    const battery = pwrCorr_battery(poke)
    corr = Math.round(corr * battery)

    // パワースポット
    const powerSpot = pwrCorr_powerSpot(poke)
    corr = Math.round(corr * powerSpot)

    // * 5325 / 4096 → 四捨五入
    // アナライズ
    const analytic = pwrCorr_analytic(poke)
    corr = Math.round(corr * analytic)

    // かたいツメ
    const toughClaws = pwrCorr_toughClaws(poke)
    corr = Math.round(corr * toughClaws)

    // すなのちから
    const sandForce = pwrCorr_sandForce(poke)
    corr = Math.round(corr * sandForce)

    // ちからずく
    const sheerForce = pwrCorr_sheerForce(poke)
    corr = Math.round(corr * sheerForce)

    // パンクロック
    const punkRock = pwrCorr_punkRock(poke)
    corr = Math.round(corr * punkRock)

    // * 5448 / 4096 → 四捨五入
    // ダークオーラ
    const darkAura = pwrCorr_darkAura(poke)
    corr = Math.round(corr * darkAura)

    // フェアリーオーラ 
    const failyAura = pwrCorr_failyAura(poke)
    corr = Math.round(corr * failyAura)

    // * 6144 / 4096 → 四捨五入
    // がんじょうあご
    const strongJaw = pwrCorr_strongJaw(poke)
    cor = Math.round(corr * strongJaw)

    // テクニシャン
    const technician = pwrCorr_technician(poke)
    corr = Math.round(corr * technician)

    // どくぼうそう
    const toxicBoost = pwrCorr_toxicBoost(poke)
    corr = Math.round(corr * toxicBoost)

    // ねつぼうそう
    const flareBoost = pwrCorr_flareBoost(poke)
    corr = Math.round(corr * flareBoost)

    // はがねのせいしん
    const steelySpirit = pwrCorr_steelySpirit(poke)
    corr = Math.round(corr * steelySpirit)

    // メガランチャー
    const megaLauncher = pwrCorr_megaLauncher(poke)
    corr = Math.round(corr * megaLauncher)

    // * 2048 / 4096 → 四捨五入
    // たいねつ
    const heatproof = pwrCorr_heatproof(poke, tgt)
    corr = Math.round(corr * heatproof)

    // * 5120 / 4096 → 四捨五入
    // かんそうはだ
    const drySkin = pwrCorr_drySkin(poke, tgt)
    corr = Math.round(corr * drySkin)

    // * 4505 / 4096 → 四捨五入
    // ちからのハチマキ
    const muscleBand = pwrCorr_muscleBand(poke)
    corr = Math.round(corr * muscleBand)

    // ものしりメガネ
    const wiseGlasses = pwrCorr_wiseGlasses(poke)
    corr = Math.round(corr * wiseGlasses)

    // * 4915 / 4096 → 四捨五入
    // プレート類
    const plate = pwrCorr_plate(poke)
    corr = Math.round(corr * plate)

    // 特定タイプの威力UPアイテム（おこう含む）
    const incense = pwrCorr_incense(poke)
    corr = Math.round(corr * incense)

    // こころのしずく
    const soulDew = pwrCorr_soulDew(poke)
    corr = Math.round(corr * soulDew)

    // こんごうだま
    const adamantOrb = pwrCorr_adamantOrb(poke)
    corr = Math.round(corr * adamantOrb)

    // しらたま
    const lustrousOrb = pwrCorr_lustrousOrb(poke)
    corr = Math.round(corr * lustrousOrb)

    // はっきんだま
    const griseousOrb = pwrCorr_griseousOrb(poke)
    corr = Math.round(corr * griseousOrb)

    // * 5325 / 4096 → 四捨五入
    // ジュエル
    const gem = pwrCorr_gem(poke)
    corr = Math.round(corr * gem)

    // * 2048 / 4096 → 四捨五入
    // ソーラービーム、ソーラーブレード
    const solar = pwrCorr_solar(poke)
    corr = Math.round(corr * solar)

    // * 6144 / 4096 → 四捨五入
    // Gのちから
    const gravApple = pwrCorr_gravApple(poke)
    corr = Math.round(corr * gravApple)

    // はたきおとす
    const knockOff = pwrCorr_knockOff(poke, tgt)
    corr = Math.round(corr * knockOff)

    // ミストバースト
    const mistyExplosion = pwrCorr_mistyExplosion(poke)
    corr = Math.round(corr * mistyExplosion)

    // ワイドフォース
    const expandingForce = pwrCorr_expandingForce(poke)
    corr = Math.round(corr * expandingForce)

    // * 6144 / 4096 → 四捨五入
    // てだすけ
    const helpingHand = pwrCorr_helpingHand(poke)
    corr = Math.round(corr * helpingHand)

    // * 6144 / 4096 → 四捨五入
    // さきどり
    const meFirst = pwrCorr_meFirst(poke)
    corr = Math.round(corr * meFirst)

    // * 8192 / 4096 → 四捨五入
    // じゅうでん 
    const charge = pwrCorr_charge(poke)
    corr = Math.round(corr * charge)

    // * 8192 / 4096 → 四捨五入
    // うっぷんばらし
    const lashOut = pwrCorr_lashOut(poke)
    corr = Math.round(corr * lashOut)

    // かたきうち
    const retailate = pwrCorr_retaliate(poke)
    corr = Math.round(corr * retailate)

    // からげんき
    const facade = pwrCorr_facade(poke)
    corr = Math.round(corr * facade)

    // クロスサンダー
    const fusionBolt = pwrCorr_fusionBolt(poke)
    corr = Math.round(corr * fusionBolt)

    // クロスサンダー
    const fusionFlare = pwrCorr_fusionFlare(poke)
    corr = Math.round(corr * fusionFlare)

    // しおみず
    const brine = pwrCorr_brine(poke)
    corr = Math.round(corr * brine)

    // ベノムショック
    const venoshock = pwrCorr_venoshock(poke)
    corr = Math.round(corr * venoshock)

    // * 2048 / 4096 → 四捨五入
    // フィールド弱化
    const terrain_weaken = pwrCorr_terrain_weaken(poke, tgt)
    corr = Math.round(corr * terrain_weaken)

    // * 5325 / 4096 → 四捨五入
    // フィールド強化
    const terrain_strengthen = pwrCorr_terrain_strengthen(poke)
    corr = Math.round(corr * terrain_strengthen)

    // * 1352 / 4096 → 四捨五入
    // どろあそび
    const mudSport = pwrCorr_mudSport(poke)
    corr = Math.round(corr * mudSport)

    // みずあそび
    const waterSport = pwrCorr_waterSport(poke)
    corr = Math.round(corr * waterSport)


    // 最終威力
    // = 基礎威力 * 威力補正値 / 4096
    // → 五捨五超入
    // → 1より小さければ1にする
    return Math.max(fiveCut(poke.myMove.power * corr / 4096), 1)
}

// 急所判定
function getCritical(poke, tgt){

    let critical = 0

    if ( poke.myCondition.myCritical ) critical += 2 // きゅうしょアップ
    if ( poke.myCondition.Laser_focus == 2 ) critical += 3 // とぎすます
    critical += poke.myCondition.myChi_strike // キョダイシンゲキ
    if ( poke.myAbility == "きょううん" && isAbility(poke) ) critical += 1
    if ( ( poke.myItem == "ピントレンズ" || poke.myItem == "するどいツメ" ) && isItem(poke) ) critical += 1
    if ( poke.myName == "ラッキー" && poke.myItem == "ラッキーパンチ" && isItem(poke) ) critical += 2
    if ( ( poke.myName.includes("カモネギ") || poke.myName == "ネギガナイト" ) && poke.myItem == "ながねぎ" && isItem(poke) ) critical += 2
    if ( poke.myAbility == "ひとでなし" && isAbility(poke) && tgt.poke.myAilment == "どく" ) critical += 3   
    for ( const element of criticalMove ) {
        if ( poke.myMove.name == element.name ) critical += element.critical
    }

    if ( getMyField(tgt.poke).myLucky_chant ) return false // おまじない
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
    const value = {
        poke: {
            atk         : poke.myAtk, 
            sp_atk      : poke.mySp_atk, 
            rank_atk    : poke.myRank_atk, 
            rank_sp_atk : poke.myRank_sp_atk
        }, 
        tgt: {
            def         : tgt.poke.myDef, 
            sp_def      : tgt.poke.mySp_def, 
            rank_def    : tgt.poke.myRank_def, 
            rank_sp_def : tgt.poke.myRank_sp_def
        }
    }

    switch ( poke.myMove.name ) {
        // 性質が変わる技
        case "フォトンゲイザー":
        case "てんこがすめつぼうのひかり":
            const A_photon = isValueIncludingRank(value.poke.atk, value.poke.rank_atk, false)
            const C_photon = isValueIncludingRank(value.poke.sp_atk, value.poke.rank_sp_atk, false)
            if ( A_photon > C_photon ) poke.myMove.nature = "物理"
            break

        case "シェルアームズ":
            let A_shell = isValueIncludingRank(value.poke.atk, value.poke.rank_atk, false)
            let B_shell = isValueIncludingRank(value.tgt.def, value.tgt.rank_def, false)
            let C_shell = isValueIncludingRank(value.poke.sp_atk, value.poke.rank_sp_atk, false)
            let D_shell = isValueIncludingRank(value.tgt.sp_def, value.tgt.rank_sp_def, false)
            // if ( fieldStatus.myWonder_room ) [ B_shell, D_shell ] = [ D_shell, B_shell ]
            if ( A_shell / B_shell > C_shell / D_shell ) poke.myMove.nature = "物理"
            break

        // 参照する数値が変わる技
        case "イカサマ":
            value.poke.atk      = tgt.poke.myAtk
            value.poke.rank_atk = tgt.poke.myRank_atk
            break

        case "せいなるつるぎ":
        case "DDラリアット":
        case "なしくずし":
            value.tgt.rank_def    = 0
            value.tgt.rank_sp_def = 0
            break

        case "ボディプレス":
            if ( fieldStatus.myWonder_room ) {
                value.poke.atk      = poke.mySp_def
                value.poke.rank_atk = poke.myRank_sp_def
            } else {
                value.poke.atk      = poke.myDef
                value.poke.rank_atk = poke.myRank_def
            }
            break

        case "サイコショック":
        case "サイコブレイク":
        case "しんぴのつるぎ":
            value.tgt.sp_def      = tgt.poke.myDef
            value.tgt.rank_sp_def = tgt.poke.myRank_def
            break

        case "はめつのねがい":
        case "みらいよち":
            break
    }

    switch ( poke.myMove.nature ) {
        case "物理":
            const A_result = isValueIncludingRank(value.poke.atk, value.poke.rank_atk, tgt.critical)
            const B_result = isValueIncludingRank(value.tgt.def, value.tgt.rank_def, tgt.critical)
            return {atk: A_result, def: B_result}

        case "特殊":
            const C_result = isValueIncludingRank(value.poke.sp_atk, value.poke.rank_sp_atk, tgt.critical)
            const D_result = isValueIncludingRank(value.tgt.sp_def, value.tgt.rank_sp_def, tgt.critical)
            return {atk: C_result, def: D_result}
    }
}


// 最終攻撃力
// 参照：https://latest.pokewiki.net/%E3%83%80%E3%83%A1%E3%83%BC%E3%82%B8%E8%A8%88%E7%AE%97%E5%BC%8F
function attackCalculation(poke, tgt, atk){
    // * 6144 / 4096 → 切り捨て
    // はりきり
    const hustle = atkCorr_hustle(poke)
    
    // 攻撃補正値
    let corr = 4096

    // * 2048 / 4096 → 四捨五入
    // スロースタート
    const slowStart = atkCorr_slowStart(poke)
    corr = Math.round(corr * slowStart)

    // よわき
    const defeatist = atkCorr_defeatist(poke)
    corr = Math.round(corr * defeatist)

    // * 6144 / 4096 → 四捨五入
    // フラワーギフト
    const flowerGift = atkCorr_flowerGift(poke)
    corr = Math.round(corr * flowerGift)

    // こんじょう
    const guts = atkCorr_guts(poke)
    corr = Math.round(corr * guts)

    // しんりょく
    const overgrow = atkCorr_overgrow(poke)
    corr = Math.round(corr * overgrow)

    // もうか
    const blaze = atkCorr_blaze(poke)
    corr = Math.round(corr * blaze)

    // げきりゅう
    const torrent = atkCorr_torrent(poke)
    corr = Math.round(corr * torrent)

    // むしのしらせ
    const swarm = atkCorr_swarm(poke)
    corr = Math.round(corr * swarm)

    // もらいび
    const flashFire = atkCorr_flashFire(poke)
    corr = Math.round(corr * flashFire)

    // サンパワー
    const solarPower = atkCorr_solarPower(poke)
    corr = Math.round(corr * solarPower)

    // プラス、マイナス
    const plusMinus = atkCorr_plusMinus(poke)
    corr = Math.round(corr * plusMinus)

    // はがねつかい
    const steelworker = atkCorr_steelworker(poke)
    corr = Math.round(corr * steelworker)

    // ごりむちゅう
    const gorillaTactics = atkCorr_gorillaTactics(poke)
    corr = Math.round(corr * gorillaTactics)

    // トランジスタ
    const transistor = atkCorr_transistor(poke)
    corr = Math.round(corr * transistor)

    // りゅうのあぎと
    const dragonsMaw = atkCorr_dragonsMaw(poke)
    corr = Math.round(corr * dragonsMaw)

    // * 8192 / 4096 → 四捨五入
    // ちからもち
    const hugePower = atkCorr_hugePower(poke)
    corr = Math.round(corr * hugePower)

    // ヨガパワー
    const purePower = atkCorr_purePower(poke)
    corr = Math.round(corr * purePower)

    // すいほう強化
    const waterBubble_strengthen = atkCorr_waterBubble_strengthen(poke)
    corr = Math.round(corr * waterBubble_strengthen)

    // はりこみ
    const stakeout = atkCorr_stakeout(poke)
    corr = Math.round(corr * stakeout)

    // * 2048 / 4096 → 四捨五入
    // あついしぼう
    const thickFat = atkCorr_thickFat(poke, tgt)
    corr = Math.round(corr * thickFat)

    // すいほう弱化
    const waterBubble_weaken = atkCorr_waterBubble_weaken(poke, tgt)
    corr = Math.round(corr * waterBubble_weaken)

    // * 6144 / 4096 → 四捨五入
    // こだわりハチマキ
    const choiceBand = atkCorr_choiceBand(poke)
    corr = Math.round(corr * choiceBand)

    // こだわりメガネ
    const choiceSpecs = atkCorr_choiceSpecs(poke)
    corr = Math.round(corr * choiceSpecs)

    // * 8192 / 4096 → 四捨五入
    // ふといホネ
    const thickClub = atkCorr_thickClub(poke)
    corr = Math.round(corr * thickClub)

    // しんかいのキバ
    const deepSeaTooth = atkCorr_deepSeaTooth(poke)
    corr = Math.round(corr * deepSeaTooth)

    // でんきだま
    const lightBall = atkCorr_lightBall(poke)
    corr = Math.round(corr * lightBall)


    // 最終攻撃
    // = 攻撃実数値 * ランク補正
    // → 切り捨て
    // * はりきり補正
    // → 切り捨て
    // * 攻撃補正値 / 4096
    // → 五捨五超入
    // 1より小さければ1にする
    const hustleVal = Math.floor(atk * hustle)
    const corrVal = fiveCut(hustleVal * corr / 4096)
    return Math.max(corrVal, 1)
}


// 最終防御
function defenseCalculation(poke, tgt, def){
    const refNature = {def: "物理", sp_def: "特殊"}

    if ( fieldStatus.myWonder_room ) {
        [refNature.def, refNature.sp_def] = [refNature.sp_def, refNature.def]
    }
    if ( poke.myMove.name == "サイコショック" || poke.myMove.name == "サイコブレイク" || poke.myMove.name == "しんぴのつるぎ" ) {
        [refNature.def, refNature.sp_def] = [refNature.sp_def, refNature.def]
    }
    

    // * 6144 / 4096 → 切り捨て
    // すなあらしの時、岩タイプの特防が上がる
    const sandstorm = defCorr_sandstorm(poke, tgt, refNature.sp_def)

    // 初期値
    let corr = 4096
    
    // * 6144 / 4096 → 四捨五入
    // フラワーギフト
    const flowerGift = defCorr_flowerGift(poke, tgt, refNature.sp_def)
    corr = Math.round(corr * flowerGift)

    // ふしぎなうろこ
    const marvelScale = defCorr_marvelScale(poke, tgt, refNature.def)
    corr = Math.round(corr * marvelScale)

    // くさのけがわ
    const glassPelt = defCorr_glassPelt(poke, tgt, refNature.def)
    corr = Math.round(corr * glassPelt)

    // * 8192 / 4096 → 四捨五入
    // ファーコート
    const furCoat = defCorr_furCoat(poke, tgt, refNature.def)
    corr = Math.round(corr * furCoat)

    // * 6144 / 4096 → 四捨五入
    // しんかのきせき
    const eviolite = defCorr_eviolite(tgt)
    corr = Math.round(corr * eviolite)

    // とつげきチョッキ
    const assaultVest = defCorr_assaultVest(poke, tgt, refNature.sp_def)
    corr = Math.round(corr * assaultVest)
    
    // しんかいのウロコ、メタルパウダー
    const deepSeaScale = defCorr_deepSeaScale(poke, tgt, refNature.sp_def)
    corr = Math.round(corr * deepSeaScale)

    const metalPowder = defCorr_metalPowder(poke, tgt, refNature.def)
    corr = Math.round(corr * metalPowder)


    // 最終防御　1より小さかったら1にする
    // = 防御実数値 * ランク補正
    // → 切り捨て
    // * すなあらし補正
    // → 切り捨て
    // * 防御補正値 / 4096
    // → 五捨五超入
    // 1より小さければ1にする
    const sandstormVal = Math.floor(def * sandstorm)
    const corrVal = fiveCut(sandstormVal * corr / 4096)
    return Math.max(corrVal, 1)
}


// 最終ダメージ
function finalDamage(poke, tgt, power, attack, defense){
    // 基礎ダメージ
    let damage = Math.floor(poke.myLevel * 2 / 5 + 2)
    damage = Math.floor(damage * power * attack / defense)
    damage = Math.floor(damage / 50 + 2)

    // 複数対象補正 → 五捨五超入
    const multipleTargets = dmgCorr_multipleTargets(poke)
    damage = fiveCut(damage * multipleTargets)

    // おやこあい補正 → 五捨五超入
    const parentalBond = dmgCorr_parentalBond(poke)
    damage = fiveCut(damage * parentalBond)

    // 天気補正 → 五捨五超入
    const weather = dmgCorr_weather(poke, tgt)
    damage = fiveCut(damage * weather)

    // 急所補正 → 五捨五超入
    const critical = dmgCorr_critical(tgt)
    damage = fiveCut(damage * critical)

    // ダメージ乱数補正 → 切り捨て
    const random = dmgCorr_random()
    damage = Math.floor(damage * random)

    // タイプ一致補正 → 五捨五超入
    const typeMatch = dmgCorr_typeMatch(poke)
    damage = fiveCut(damage * typeMatch)

    // タイプ相性補正 → 切り捨て
    const typeCompatibility = dmgCorr_typeCompatibility(tgt)
    damage = Math.floor(damage * typeCompatibility)

    // やけど補正 → 五捨五超入
    const burn = dmgCorr_burn(poke)
    damage = fiveCut(damage * burn)

    // ダメージ補正値
    let corr = 1

    // 壁補正 → 四捨五入
    const wall = dmgCorr_wall(poke, tgt)
    corr = Math.round(corr * wall)

    // ブレインフォース → 四捨五入
    const neuroforce = dmgCorr_neuroforce(poke, tgt)
    corr = Math.round(corr * neuroforce)

    // スナイパー → 四捨五入
    const sniper = dmgCorr_sniper(poke, tgt)
    corr = Math.round(corr * sniper)

    // いろめがね → 四捨五入
    const tintedLens = dmgCorr_tintedLens(poke, tgt)
    corr = Math.round(corr * tintedLens)

    // もふもふほのお → 四捨五入
    const fluffy = dmgCorr_fluffy(poke, tgt)
    corr = Math.round(corr * fluffy)

    // ダメージ半減補正 → 四捨五入
    // こおりのりんぷん、パンクロック、ファントムガード、マルチスケイル、もふもふ直接
    const half = dmgCorr_half(poke, tgt)
    corr = Math.round(corr * half)

    // 効果抜群軽減補正 → 四捨五入
    // ハードロック、フィルター、プリズムアーマー
    const filter = dmgCorr_filter(tgt)
    corr = Math.round(corr * filter)

    // フレンドガード → 四捨五入
    const friendGuard = dmgCorr_friendGuard(tgt)
    corr = Math.round(corr * friendGuard)

    // たつじんのおび → 四捨五入
    const expertBelt = dmgCorr_expertBelt(poke, tgt)
    corr = Math.round(corr * expertBelt)

    // メトロノーム → 四捨五入
    const metronome = dmgCorr_metronome(poke)
    corr = Math.round(corr * metronome)

    // いのちのたま → 四捨五入
    const lifeOrb = dmgCorr_lifeOrb(poke)
    corr = Math.round(corr * lifeOrb)

    // 半減の実 → 四捨五入
    const halfDmgBerry = dmgCorr_halfDmgBerry(poke, tgt)
    corr = Math.round(corr * halfDmgBerry)

    // その他ダメージ2倍補正 → 四捨五入
    // あなをほる、ダイビング、ちいさくなる、ダイマックス状態
    const twice = dmgCorr_twice(poke, tgt)
    corr = Math.round(corr * twice)

    // ダメージ補正 → 五捨五超入
    damage = fiveCut(damage * corr)

    // Zワザ/ダイマックスわざのまもるによる軽減補正 → 五捨五超入
    const protect = dmgCorr_protect(poke, tgt)
    damage = fiveCut(damage * protect)

    // 最終ダメージ
    tgt.damage = damage
}