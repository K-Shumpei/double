function damageCalculation(poke, tgt){
    // ダメージ固定技の時
    if ( fixedDamage.includes(poke.myMove.name) ) {
        isDamageByFixedDamageMove(poke, tgt)
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

    ( tgt.poke.myCondition.myDynamax )? dyna = 1 / 2 : dyna = 1
    if ( poke.myMove.name == "ソニックブーム" ) tgt.damage = 20
    if ( poke.myMove.name == "りゅうのいかり" ) tgt.damage = 40
    if ( poke.myMove.name == "ちきゅうなげ" ) tgt.damage = poke.myLevel
    if ( poke.myMove.name == "ナイトヘッド" ) tgt.damage = poke.myLevel
    if ( poke.myMove.name == "サイコウェーブ" ) tgt.damage = Math.max(Math.floor(poke.myLevel * (Math.floor(getRandom() * 101) * 0.01 + 0.5)), 1)
    if ( poke.myMove.name == "いかりのまえば" ) tgt.damage = Math.floor(tgt.poke.myRest_hp / 2 * dyna)
    if ( poke.myMove.name == "しぜんのいかり" ) tgt.damage = Math.floor(tgt.poke.myRest_hp / 2 * dyna)
    if ( poke.myMove.name == "がむしゃら") tgt.damage = tgt.poke.myRest_hp * dyna - poke.myRest_hp
    if ( poke.myMove.name == "カウンター" ){
        tgt.damage = poke.myCondition.myDamage * 2
        poke.myCondition.myDamage = 0
        poke.myCondition.myDamage_nature = false
    }
    if (poke.myMove.name == "ミラーコート"){
        tgt.damage = poke.myCondition.myDamage * 2
        poke.myCondition.myDamage = 0
        poke.myCondition.myDamage_nature = false
    }
    if (poke.myMove.name == "がまん") tgt.damage = poke.myMove.power
    if (poke.myMove.name == "メタルバースト"){
        tgt.damage = poke.myCondition.myDamage * 1.5
        poke.myCondition.myDamage = 0
        poke.myCondition.myDamage_nature = false
    }
    if ( poke.myMove.name == "いのちがけ" ) tgt.damage = poke.myRest_hp
    if ( oneShot.includes(poke.myMove.name) ){
        writeLog(`一撃必殺 !`)
        tgt.damage = tgt.poke.myRest_hp
    }
    if ( poke.myMove.name == "ガーディアン・デ・アローラ" ) tgt.damage = Math.floor(tgt.poke.myRest_hp * 3 / 4 * dyna)

    tgt.effective  = 1     // タイプ相性
    tgt.critical   = false // 急所
}


function powerCalculation(poke, tgt){
    // 基礎威力の変化
    if ( poke.myMove.name == "きしかいせい" || poke.myMove.name == "じたばた" ){
        poke.myMove.power = 20
        if ( poke.myRest_hp < poke.myFull_hp * 33 / 48) poke.myMove.power = 40
        if ( poke.myRest_hp < poke.myFull_hp * 17 / 48) poke.myMove.power = 80
        if ( poke.myRest_hp < poke.myFull_hp * 10 / 48) poke.myMove.power = 100
        if ( poke.myRest_hp < poke.myFull_hp * 5 / 48)  poke.myMove.power = 150
        if ( poke.myRest_hp < poke.myFull_hp * 2 / 48)  poke.myMove.power = 200
    }
    if ( poke.myMove.name == "しおふき" || poke.myMove.name == "ふんか" || poke.myMove.name == "ドラゴンエナジー" ) {
        poke.myMove.power = Math.max(Math.floor(150 * poke.myRest_hp / poke.myFull_hp), 1)
    }
    if ( poke.myMove.name == "しぼりとる" || poke.myMove.name == "にぎりつぶす" ) {
        poke.myMove.power = Math.max(Math.floor(120 * tgt.poke.myRest_hp / tgt.poke.myFull_hp), 1)
    }
    if ( poke.myMove.name == "アシストパワー" || poke.myMove.name == "つけあがる" ){
        let power = 0
        const parameter = ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]
        for (const para of parameter){
                power += Math.max(poke[`myRank_${para}`], 0)
        }
        poke.myMove.power = 20 * (power + 1)
    }
    if ( poke.myMove.name == "おしおき" ){
        let power = 0
        const parameter = ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]
        for (const para of parameter){
                power += Math.max(poke[`myRank_${para}`], 0)
        }
        poke.myMove.power = Math.min(20 * (power + 3), 200)
    }
    if ( poke.myMove.name == "うっぷんばらし" && poke.myCondition.myRank_down ) {
        poke.myMove.power *= 2
    }
    if ( poke.myMove.name == "エレキボール" ){
        const atk_speed = speedAV(poke, "c")
        const def_speed = speedAV(tgt, "c")
        poke.myMove.power = 40
        if ( atk_speed >= def_speed )     poke.myMove.power = 60
        if ( atk_speed >= def_speed * 2 ) poke.myMove.power = 80
        if ( atk_speed >= def_speed * 3 ) poke.myMove.power = 120
        if ( atk_speed >= def_speed * 4 ) poke.myMove.power = 150
    }
    if ( poke.myMove.name == "ジャイロボール" ){
        const atk_speed = speedAV(poke, "c")
        const def_speed = speedAV(tgt, "c")
        poke.myMove.power = Math.min(Math.floor((25 * def_speed / atk_speed) + 1), 150)
    }
    if ( poke.myMove.name == "きりふだ" ){
        const PP = poke[`myRest_pp_${poke.myCmd_move}`]
        poke.myMove.power = 40
        if ( PP == 3 ) poke.myMove.power = 50
        if ( PP == 2 ) poke.myMove.power = 60
        if ( PP == 1 ) poke.myMove.power = 80
        if ( PP == 0 ) poke.myMove.power = 200
    }
    if ( poke.myMove.name == "くさむすび" || poke.myMove.name == "けたぐり" ){
        const weight = isWeight(tgt.poke)
        poke.myMove.power = 20
        if ( weight >= 10 )  poke.myMove.power = 40
        if ( weight >= 25 )  poke.myMove.power = 60
        if ( weight >= 50 )  poke.myMove.power = 80
        if ( weight >= 100 ) poke.myMove.power = 100
        if ( weight >= 200 ) poke.myMove.power = 120
    }
    if ( poke.myMove.name == "ヒートスタンプ" || poke.myMove.name == "ヘビーボンバー" ){
        const atk_weight = isWeight(poke)
        const def_weight = isWeight(tgt.poke)
        poke.myMove.power = 40
        if ( atk_weight >= def_weight * 2 ) poke.myMove.power = 60
        if ( atk_weight >= def_weight * 3 ) poke.myMove.power = 80
        if ( atk_weight >= def_weight * 4 ) poke.myMove.power = 100
        if ( atk_weight >= def_weight * 5 ) poke.myMove.power = 120
    }
    if ( poke.myMove.name == "きつけ" && tgt.poke.myAilment == "まひ" ) {
        poke.myMove.power *= 2
    }
    if ( poke.myMove.name == "めざましビンタ" && tgt.poke.myAilment == "ねむり" ) {
        poke.myMove.power *= 2
    }
    if ( poke.myMove.name == "たたりめ" ){
        if ( !tgt.poke.myAilment || ( tgt.poke.myAbility == "ぜったいねむり" && isAbility(tgt.poke) ) ) poke.myMove.power *= 2
    }
    if ( poke.myMove.name == "ウェザーボール" ) {
        if ( isSunny(poke) || isRainy(poke) || isSandy(poke) || isSnowy(poke) ) poke.myMove.power = 100
    }
    if ( poke.myMove.name == "だいちのはどう" ) {
        if ( onGround(poke) && ( fieldStatus.myElectric || fieldStatus.myGrassy || fieldStatus.myMisty || fieldStatus.myPsychic ) ) poke.myMove.power *= 2
    }
    if ( poke.myMove.name == "ライジングボルト" ) {
        if ( onGround(tgt.poke) && fieldStatus.myElectric ) poke.myMove.power *= 2
    }
    if ( poke.myMove.name == "かぜおこし" || poke.myMove.name == "たつまき" ) {
        // | tgt.p_con.includes("姿を隠す『フリーフォール』"))
        if ( tgt.poke.myCondition.mySky ) poke.myMove.power *= 2
    }
    if ( poke.myMove.name == "アクロバット" ) {
        if ( poke.myItem == "" ) poke.myMove.power  = 110
    }
    if ( poke.myMove.name == "しぜんのめぐみ" ){
        for ( const element of naturalGift ) {
            if ( poke.myItem == element.item ) poke.myMove.power = element.power
        }
    }
    if ( poke.myMove.name == "なげつける" ){
        writeLog(`${poke.myItem} を 投げつけた !`)
        if ( berryList.includes(poke.myItem) ) poke.myMove.power = 10
        if ( poke.myItem.includes("おこう") ) poke.myMove.power = 10
        if ( fling10.includes(poke.myItem) ) poke.myMove.power = 10
        if ( fling30.includes(poke.myItem) ) poke.myMove.power = 30
        if ( fling40.includes(poke.myItem) ) poke.myMove.power = 40
        if ( fling50.includes(poke.myItem) ) poke.myMove.power = 50
        if ( poke.myItem.includes("メモリ") ) poke.myMove.power = 50
        if ( fling60.includes(poke.myItem) ) poke.myMove.power = 60
        if ( fling70.includes(poke.myItem) ) poke.myMove.power = 70
        if ( poke.myItem.includes("カセット") ) poke.myMove.power = 70
        if ( poke.myItem.includes("パワー") ) poke.myMove.power = 70
        if ( fling80.includes(poke.myItem) ) poke.myMove.power = 80
        if ( poke.myItem.includes("ナイト") ) poke.myMove.power = 80
        if ( fling90.includes(poke.myItem) ) poke.myMove.power = 90
        if ( poke.myItem.includes("プレート") ) poke.myMove.power = 90
        if ( fling100.includes(poke.myItem) ) poke.myMove.power = 100
        if ( fling130.includes(poke.myItem) ) poke.myMove.power = 130
    }
    if ( poke.myMove.name == "アイスボール" || poke.myMove.name == "ころがる" ){
        if ( poke.myCondition.myDefense_curl ) poke.myMove.power *= 2 // まるくなる
        const ice = poke.myCondition.myIce_ball
        const roll = poke.myCondition.myRollout
        poke.myMove.power *= Math.pow(2, Math.max(ice, roll) - 1)
    }
    if ( poke.myMove.name == "エコーボイス" ) {
        poke.myMove.power = Math.min(40 * (fieldStatus.myEchoed_voice), 200)
    }
    if ( poke.myMove.name == "はきだす" ){
        const def    = poke.myCondition.myStockpile_B
        const sp_def = poke.myCondition.myStockpile_D
        poke.myMove.power = Math.max(def, sp_def) * 100
        changeMyRank(poke, "def", -1 * def)
        changeMyRank(poke, "sp_def", -1 * sp_def)
        writeLog(`${poke.myTN} の ${poke.myName} は たくわえが なくなった !`)
        poke.myCondition.myStockpile_B = 0
        poke.myCondition.myStockpile_D = 0
    }
    if ( poke.myMove.name == "れんぞくぎり" ){
        const num = poke.myCondition.myFury_cutter
        poke.myMove.power = Math.min(40 * num, 160)
    }
    if ( poke.myMove.name == "エラがみ" || poke.myMove.name == "でんげきくちばし" ){
        // if (tgt.com != "" || user[0].f_con.includes("交代済" + tgt.child)) poke.myMove.power *= 2
    }
    //if (poke.myMove.name == "おいうち" && tgt.p_con.includes("おいうち成功")) poke.myMove.power *= 2
    //if (poke.myMove.name == "しっぺがえし" && tgt.com == "" && !user[0].f_con.includes("交代済" + tgt.child)) poke.myMove.power *= 2
    if ( poke.myMove.name == "ダメおし" ) {
        if ( poke.myCondition.myDamaged ) poke.myMove.power *= 2
    }
    if ( poke.myMove.name == "ゆきなだれ" || poke.myMove.name == "リベンジ" ) {
        if ( poke.myCondition.myDamage_nature ) poke.myMove.power *= 2
    }


    // 威力補正初期値
    let correction = 4096

    // オーラブレイク、とうそうしん弱化　* 3072 / 4096 → 四捨五入
    if ( isDarkAura() == "break" && poke.myMove.type == "あく" ) correction = Math.round(correction * 3072 / 4096)
    if ( isFailyAura() == "break" && poke.myMove.type == "フェアリー") correction = Math.round(correction * 3072 / 4096)
    if ( poke.myAbility == "とうそうしん" && isAbility(poke) ) {
        if ( poke.myGender == "♂" && tgt.poke.myGender == "♀" ) correction = Math.round(correction * 3072 / 4096)
        if ( poke.myGender == "♀" && tgt.poke.myGender == "♂" ) correction = Math.round(correction * 3072 / 4096)
    }
    // スキン特性、てつのこぶし、すてみ * 4915 / 4096 → 四捨五入
    if ( poke.myCondition.mySkin == "スカイスキン" ){
        if ( poke.myMove.type == "ひこう" ) correction = Math.round(correction * 4915 / 4096)
        poke.myCondition.mySkin = false
    }
    if ( poke.myCondition.mySkin == "フェアリースキン" ){
        if ( poke.myMove.type == "フェアリー" ) correction = Math.round(correction * 4915 / 4096)
        poke.myCondition.mySkin = false
    }
    if ( poke.myCondition.mySkin == "フリーズスキン" ){
        if ( poke.myMove.type == "こおり" ) correction = Math.round(correction * 4915 / 4096)
        poke.myCondition.mySkin = false
    }
    if ( poke.myCondition.mySkin == "ノーマルスキン" ){
        if ( poke.myMove.type == "ノーマル" ) correction = Math.round(correction * 4915 / 4096)
        poke.myCondition.mySkin = false
    }
    if ( poke.myCondition.mySkin == "エレキスキン" ){
        if ( poke.myMove.type == "でんき" ) correction = Math.round(correction * 4915 / 4096)
        poke.myCondition.mySkin = false
    }
    if ( poke.myAbility == "てつのこぶし" && isAbility(poke) ) {
        if ( ironFist.includes(poke.myMove.name) ) correction = Math.round(correction * 4915 / 4096)
    }
    if ( poke.myAbility == "すてみ" && isAbility(poke) ) {
        if ( reckless.includes(poke.myMove.name) ) correction = Math.round(correction * 4915 / 4096)
    }
    // とうそうしん強化 * 5120 / 4096 → 四捨五入
    if ( poke.myAbility == "とうそうしん" && isAbility(poke) ) {
        if ( poke.myGender == "♂" && tgt.poke.myGender == "♂" ) correction = Math.round(correction * 5120 / 4096)
        if ( poke.myGender == "♀" && tgt.poke.myGender == "♀" ) correction = Math.round(correction * 5120 / 4096)
    }
    // バッテリー、パワースポット * 5325 / 4096 → 四捨五入
    // アナライズ、かたいツメ、すなのちから、ちからずく、パンクロック * 5325 / 4096 → 四捨五入
    // if ( poke.myAbility == "アナライズ" && isAbility(poke) && atk == order[1] ) 
    if ( poke.myAbility == "かたいツメ" && isAbility(poke) ) {
        if ( poke.myMove.direct == "直接" ) correction = Math.round(correction * 5325 / 4096)
    }
    if ( poke.myAbility == "すなのちから" && isAbility(poke) ) {
        if ( isSandy(poke) && ( poke.myMove.type == "いわ" || poke.myMove.type == "じめん" || poke.myMove.type == "はがね" ) ) correction = Math.round(correction * 5325 / 4096)
    }
    //if ( poke.myAbility == "ちからずく" && isAbility(poke) && con.p_con.includes("ちからずく有効") )
    if ( poke.myAbility == "パンクロック" && isAbility(poke) ) {
        if ( musicMove.includes(poke.myMove.name) ) correction = Math.round(correction * 5325 / 4096)
    }
    // ダークオーラ、フェアリーオーラ * 5448 / 4096 → 四捨五入
    if ( isDarkAura() == "aura" && poke.myMove.type == "あく" ) correction = Math.round(correction * 5448 / 4096)
    if ( isFailyAura() == "aura" && poke.myMove.type == "フェアリー" ) correction = Math.round(correction * 5448 / 4096)
    // がんじょうあご、テクニシャン、どくぼうそう、ねつぼうそう、はがねのせいしん、メガランチャー * 6144 / 4096 → 四捨五入
    if ( poke.myAbility == "がんじょうあご" && isAbility(poke) ) {
        if ( bite.includes(poke.myMove.name) ) correction = Math.round(correction * 6144 / 4096)
    }
    if ( poke.myAbility == "テクニシャン" && isAbility(poke) ) {
        if ( poke.myMove.power <= 60 ) correction = Math.round(correction * 6144 / 4096)
    }
    if ( poke.myAbility == "どくぼうそう" && isAbility(poke) ) {
        if ( poke.myAilment == "どく" && poke.myMove.nature == "物理" ) correction = Math.round(correction * 6144 / 4096)
    }
    if ( poke.myAbility == "ねつぼうそう" && isAbility(poke) ) {
        if ( poke.myAilment == "やけど" && poke.myMove.nature == "特殊" ) correction = Math.round(correction * 6144 / 4096)
    } 
    //if (poke.myAbility == "はがねのせいしん" && poke.myMove.type == "はがね") 
    if ( poke.myAbility == "メガランチャー" && isAbility(poke) ) {
        if ( megaLauncher.includes(poke.myMove.name) ) correction = Math.round(correction * 6144 / 4096)
    }
    // たいねつ * 2048 / 4096 → 四捨五入
    if ( tgt.poke.myAbility == "たいねつ"  && isAbility(poke) ) {
        if ( poke.myMove.type == "ほのお") correction = Math.round(correction * 2048 / 4096)
    }
    // かんそうはだ * 5120 / 4096 → 四捨五入
    if ( tgt.poke.myAbility == "かんそうはだ" && isAbility(poke) ) {
        if ( poke.myMove.type == "ほのお" ) correction = Math.round(correction * 5120 / 4096)
    }
    // ちからのハチマキ、ものしりメガネ * 4505 / 4096 → 四捨五入
    if ( poke.myItem == "ちからのハチマキ" && isItem(poke) ) {
        if ( poke.myMove.nature == "物理" ) correction = Math.round(correction * 4505 / 4096)
    }
    if ( poke.myItem == "ものしりメガネ" && isItem(poke) ) {
        if ( poke.myMove.nature == "特殊" ) correction = Math.round(correction * 4505 / 4096)
    }
    // プレート類、特定タイプの威力UPアイテム（おこう含む）、こころのしずく、こんごうだま、しらたま、はっきんだま * 4915 / 4096 → 四捨五入
    if ( isItem(poke) ){
        for ( const element of judgementPlate ) {
            if ( poke.myItem == element.item && poke.myMove.type == element.type ) correction = Math.round(correction * 4915 / 4096)
        }
        for ( const element of incense ) {
            if ( poke.myItem == element.item && poke.myMove.type == element.type ) correction = Math.round(correction * 4915 / 4096)
        }
        if ( poke.myItem == "こころのしずく" && ( poke.myName == "ラティアス" || poke.myName == "ラティオス" ) ) {
            if ( poke.myMove.type == "ドラゴン" || poke.myMove.type == "エスパー" ) correction = Math.round(correction * 4915 / 4096)
        }
        if ( poke.myItem == "こんごうだま" && poke.myName == "ディアルガ" ) {
            if ( poke.myMove.type == "はがね" || poke.myMove.type == "ドラゴン" ) correction = Math.round(correction * 4915 / 4096)
        }
        if ( poke.myItem == "しらたま" && poke.myName == "パルキア" ) {
            if ( poke.myMove.type == "みず" || poke.myMove.type == "ドラゴン" ) correction = Math.round(correction * 4915 / 4096)
        } 
        if ( poke.myItem == "はっきんだま" && poke.myName == "ギラティナ(オリジンフォルム)" ) {
            if ( poke.myMove.type == "ゴースト" || poke.myMove.type == "ドラゴン" ) correction = Math.round(correction * 4915 / 4096)
        }
    }
    // ジュエル * 5325 / 4096 → 四捨五入
    if ( poke.myCondition.myGem ){
        correction = Math.round(correction * 5325 / 4096)
    }
    // ソーラービーム、ソーラーブレード * 2048 / 4096 → 四捨五入
    if ( poke.myMove.name == "ソーラービーム" || poke.myMove.name == "ソーラーブレード" ) {
        if ( isRainy(poke) || isSandy(poke) || isSnowy(poke) ) correction = Math.round(correction * 2048 / 4096)
    }
    // はたきおとす、Gのちから、ワイドフォース、ミストバースト * 6144 / 4096 → 四捨五入
    if ( poke.myMove.name == "はたきおとす" ) {
        if ( tgt.poke.myItem != "" || cannotChangeItem(tgt.poke) ) correction = Math.round(correction * 6144 / 4096)
    }
    if ( poke.myMove.name == "Gのちから" ) {
        if ( fieldStatus.myGravity ) correction = Math.round(correction * 6144 / 4096)
    }
    if ( poke.myMove.name == "ワイドフォース" ) {
        if ( fieldStatus.myPsychic ) correction = Math.round(correction * 6144 / 4096)
    }
    if ( poke.myMove.name == "ミストバースト" ) {
        if ( fieldStatus.myMisty && onGround(poke) ) correction = Math.round(correction * 6144 / 4096)
    }
    // てだすけ * 6144 / 4096 → 四捨五入
    if ( poke.myCondition.myHelping_hand ){
        const num = poke.myCondition.myHelping_hand
        correction = Math.round(correction * (6144 / 4096)**num )
    }
    // さきどり * 6144 / 4096 → 四捨五入
    /*
    if (con.p_con.includes("技『さきどり』") && poke.myMove.name != "はきだす"){
        correction = Math.round(correction * 6144 / 4096)
    }
    removeText(con.p_con, "技『さきどり』")
    */
    // じゅうでん * 8192 / 4096 → 四捨五入
    if ( poke.myCondition.myCharge == 2  && poke.myMove.type == "でんき" ){
        correction = Math.round(correction * 8192 / 4096)
        poke.myCondition.myCharge == false
    }
    // かたきうち、からげんき、しおみず、ベノムショック、クロスサンダー、クロスフレイム * 8192 / 4096 → 四捨五入
    if ( poke.myMove.name == "かたきうち" ){
        /*
        const log = lastTurnLog(me.log)
        for (const line of log){
            if (line.includes(con.TN + "　の　") && line.includes("は　たおれた　!")){
                correction = Math.round(correction * 8192 / 4096)
            }
        }
        */
    }
    if ( poke.myMove.name == "からげんき" ) {
        if ( poke.myAilment == "どく" || poke.myAilment == "やけど" || poke.myAilment == "まひ" ) correction = Math.round(correction * 8192 / 4096)
    } 
    if ( poke.myMove.name == "しおみず" ) {
        if ( tgt.poke.myRest_hp <= tgt.poke.myFull_hp / 2 ) correction = Math.round(correction * 8192 / 4096)
    }
    if ( poke.myMove.name == "ベノムショック" ) {
        if ( tgt.poke.myAilment == "どく" ) correction = Math.round(correction * 8192 / 4096)
    }
    /*
    if ((poke.myMove.name == "クロスサンダー" && me.f_con.includes("技『クロスフレイム』待機")) 
    || (poke.myMove.name == "クロスフレイム" && me.f_con.includes("技『クロスサンダー』待機"))){
        correction = Math.round(correction * 8192 / 4096)
    }
    */
    // フィールド弱化 * 2048 / 4096 → 四捨五入
    if ( fieldStatus.myGrassy && onGround(tgt.poke) ) {
        if ( poke.myMove.name == "じしん" || poke.myMove.name == "じならし" || poke.myMove.name == "マグニチュード" ) correction = Math.round(correction * 2048 / 4096)
    }
    if ( fieldStatus.myMisty && onGround(tgt.poke) ) {
        if ( poke.myMove.type == "ドラゴン" ) correction = Math.round(correction * 2048 / 4096)
    }
    // フィールド強化 * 5325 / 4096 → 四捨五入
    if ( fieldStatus.myElectric && onGround(poke) ) {
        if ( poke.myMove.type == "でんき" ) correction = Math.round(correction * 5325 / 4096)
    }
    if ( fieldStatus.myGrassy && onGround(poke) ) {
        if ( poke.myMove.type == "くさ" ) correction = Math.round(correction * 5325 / 4096)
    }
    if ( fieldStatus.myPsychic && onGround(poke) ) {
        if ( poke.myMove.type == "エスパー" ) correction = Math.round(correction * 5325 / 4096)
    }
    // どろあそび、みずあそび * 1352 / 4096 → 四捨五入
    if ( fieldStatus.myMud_sport && poke.myMove.type == "でんき" ) correction = Math.round(correction * 1352 / 4096)
    if ( fieldStatus.myWater_sport && poke.myMove.type == "ほのお" ) correction = Math.round(correction * 1352 / 4096)


    // 最終威力 1より小さければ1になる
    return Math.max(fiveCut(poke.myMove.power * correction / 4096), 1)
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
    if ( poke.myAbility == "こんじょう" && isAbility(poke) ) {
        if ( !poke.myAilment && poke.myMove.nature == "物理" ) attack = Math.round(attack * 6144 / 4096)
    }
    if ( poke.myAbility == "しんりょく" && isAbility(poke) ) {
        if ( poke.myRest_hp <= poke.myFull_hp / 3 && poke.myMove.type == "くさ" ) attack = Math.round(attack * 6144 / 4096)
    }
    if ( poke.myAbility == "もうか" && isAbility(poke) ) {
        if ( poke.myRest_hp <= poke.myFull_hp / 3 && poke.myMove.type == "ほのお" ) attack = Math.round(attack * 6144 / 4096)
    }
    if ( poke.myAbility == "げきりゅう" && isAbility(poke) ) {
        if ( poke.myRest_hp <= poke.myFull_hp / 3 && poke.myMove.type == "みず" ) attack = Math.round(attack * 6144 / 4096)
    }
    if ( poke.myAbility == "むしのしらせ" && isAbility(poke) ) {
        if ( poke.myRest_hp <= poke.myFull_hp / 3 && poke.myMove.type == "むし" ) attack = Math.round(attack * 6144 / 4096)
    }
    if ( poke.myCondition.myFlash_fire ) {
        if ( poke.myMove.type == "ほのお" ) attack = Math.round(attack * 6144 / 4096)
    }
    if ( poke.myAbility == "サンパワー" && isAbility(poke) ) {
        if ( isSunny(poke) && poke.myMove.nature == "特殊" ) attack = Math.round(attack * 6144 / 4096)
    }
    if ( poke.myAbility == "ごりむちゅう" && isAbility(poke) ) {
        if ( poke.myMove.nature == "物理" ) attack = Math.round(attack * 6144 / 4096)
    }
    if ( poke.myAbility == "トランジスタ" && isAbility(poke) ) {
        if ( poke.myMove.type == "でんき" ) attack = Math.round(attack * 6144 / 4096)
    }
    if ( poke.myAbility == "りゅうのあぎと" && isAbility(poke) ) {
        if ( poke.myMove.type == "ドラゴン") attack = Math.round(attack * 6144 / 4096)
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
    for ( const element of berryToHalfDamage ) {
        if ( tgt.poke.myItem == element.item && isItem(tgt.poke) && poke.myMove.type == element.type && tgt.effective > 1 ) {
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