function writeLog( txt ) {
    document.getElementById("log").value += txt + "\n"
}

function showHPbar( poke ) {
    // バトル画面のHPバー表示
    document.getElementById(`${poke.myParty}_${poke.myPosition}_HP_bar_in_battle`).value = poke.myRest_hp / poke.myFull_hp
    // 手持ち画面のHPバー表示
    document.getElementById(`${poke.myParty}_${poke.myHand}_bar`).style.display = "block"
    document.getElementById(`${poke.myParty}_${poke.myHand}_HP_bar`).value = poke.myRest_hp / poke.myFull_hp
}

// 特性発動
function abilityDeclaration( poke ) {
    writeLog( `${poke.myTN} の ${poke.myName} の 特性『${poke.myAbility}』 !`)
}

// 持ち物発動
function itemDeclaration( poke ) {
    writeLog(`${poke.myTN} の ${poke.myName} の ${poke.myItem} が発動した !`)
}



// 交代先の取得
function getNextPoke( poke ) {
    const party = getParty(poke)
    for ( const _poke of party ) {
        if ( _poke.myBench == poke.myCmd_hand ) {
            return _poke
        }
    }
    return false
}


// ひんし判定
function faintedJudge( party ) {
    const bench  = isBench(party[0]).length        // 手持ちの数
    const battle = myPokeInBattle(party[0]).length // バトル場の数

    // 戦闘に出すポケモンの数を返す
    if ( battle == 2 ) return 0
    if ( battle == 1 && bench > 0 ) return 1
    if ( battle == 0 && bench > 0 ) return Math.min(2, bench)

    return 0
}


function isSwitch(poke) {
    if ( poke.myEject_button !== false ) return true
    if ( poke.myEject_pack   !== false ) return true
    if ( poke.myEmergency    !== false ) return true
    if ( poke.myRed_card     !== false ) return true
    if ( poke.mySwitch       !== false ) return true

    return false
}

function resetSwitch() {
    for ( const party of [myParty, oppParty] ) {
        for ( const poke of party ) {
            poke.myEject_button = false
            poke.myEject_pack   = false
            poke.myEmergency    = false
            poke.myRed_card     = false
            poke.mySwitch       = false
        }
    }

    fieldStatus.mySwitch_me  = false
    fieldStatus.mySwitch_opp = false
}




// 持ち物
function isItem(poke){
    if ( poke.myAbility == "ぶきよう" ) return false
    if ( poke.myCondition.myEmbargo > 0 ) return false
    if ( fieldStatus.myMagic_room ) return false
    return true
}

// 特性
function isAbility(poke){
    if ( poke.myCondition.myNo_ability ) return false                    // 特性なし状態
    if ( disableByNeutralizingGas.includes(poke.myAbility) ) return true // かがくへんかガスで無効にされない特性
    for ( const _poke of allPokeInBattle() ) {
        if ( poke.myID == _poke.myID ) continue
        if ( _poke.myAbility == "かがくへんかガス" ) return false           // かがくへんかガス
    }

    /*
    if (me.f_con.includes("かたやぶり")){
        const text = searchText(me.f_con, "かたやぶり")
        const parent = text.split("：")[1].split(",")[0]
        const child = text.split("：")[1].split(",")[1]
        if ((con.parent != parent || con.child != child) && disableByMoldBreaker.includes(con.ability)){
            return false
        }
    }
    */
    return true
}



// 接地
function onGround(poke){
    // 姿を隠しているポケモンは、地面にいない
    if ( poke.myCondition.myHide ) return false

    // 以下の状態のポケモンは、地面にいる
    if ( poke.myCondition.myIngrain ) return true
    if ( poke.myCondition.mySmack_down ) return true
    if ( fieldStatus.myGravity > 0 ) return true
    if ( poke.myItem == "くろいてっきゅう" && isItem(poke) ) return true

    // 以下の状態のポケモンは、地面にいない
    if ( poke.myType.includes("ひこう") ) return false
    if ( poke.myAbility == "ふゆう" && isAbility(poke) ) return false
    if ( poke.myItem == "ふうせん" && isItem(poke) ) return false
    if ( poke.myCondition.myMagnet_rise > 0 ) return false
    if ( poke.myCondition.myTelekinesis > 0 ) return false

    // それ以外のポケモンは、地面にいる
    return true
}

function enableToRecycle(poke){
    if ( itemList_berry.includes(poke.myItem) ) {
        poke.myCondition.myBelch = true // ゲップが使えるようになる
        cheekPouch(poke)                // 特性『ほおぶくろ』
    }

    poke.myRecycle = poke.myItem
    poke.myItem = ""

    // かるわざ
    activateUnburden(poke)
}





// さわぐ状態のポケモンがいるかどうか
function isUproar(){
    for ( const poke of allPokeInBattle() ) { 
        if ( poke.myCondition.myUproar != false ) return poke
    }
    return false
}

// みがわりで防がれるならtrue
function isSubstitute(poke, target){
    if ( !target.myCondition.mySubstitute ) return false // みがわり状態であること
    if ( musicMove.includes(poke.myMove.name) ) return false // 音技でないこと
    if ( statusMoveThroughSubstitute.includes(poke.myMove.name)) return false // みがわり貫通技でないこと
    if ( poke.myMove.name == "いじげんホール" ) return false
    if ( poke.myMove.name == "いじげんラッシュ" ) return false
    if ( poke.myAbility == "すりぬけ" && isAbility(poke) ) return false

    return true
}



function resetAilment(poke) {
    poke.myAilment                 = false // 状態異常回復
    poke.myAsleep                  = false // ねむり経過ターン数
    poke.myAsleep_turn             = false // ねむりから覚めるターン数
    poke.myRest                    = false // ねむる経過ターン数
    poke.myCondition.myNightmare   = false // あくむ回復
    poke.myBad_poison              = false // もうどく経過ターン数
}

function resetBind(poke) {
    poke.myCondition.myBind.ID     = false // バインドを付与したポケモンのID
    poke.myCondition.myBind.turn   = 0     // バインド経過ターン数
    poke.myCondition.myBind.long   = false // ねばりのかぎづめ
    poke.myCondition.myBind.strong = false // しめつけバンド
}

function resetFilling(poke) {
    poke.myCondition.myFilling = {name: false, tgt: false} // ため技の名前
    poke.myCondition.myDig     = false // あなをほる状態
    poke.myCondition.myShadow  = false // シャドーダイブ状態
    poke.myCondition.mySky     = false // そらをとぶ状態
    poke.myCondition.myDive    = false // ダイビング状態
}

function isHide(poke) {
    if ( poke.myCondition.myDig )    return true
    if ( poke.myCondition.myShadow ) return true
    if ( poke.myCondition.mySky )    return true
    if ( poke.myCondition.myDive )   return true
    return false
}

// ほおぶくろ
function cheekPouch(poke) {
    if ( poke.myAbility == "ほおぶくろ" && isAbility(poke) ) {
        writeLog(`${poke.myTN} の ${poke.myName} の 特性『ほおぶくろ』 !`)
        changeHP(poke, Math.floor(poke.myFull_HP / 3), "+")
    }
}



// ぎたい
function mimicry() {

}

// かちき・まけんきが発動するかどうか（味方に対する技では発動しない）
function isSpirit(poke, tgt){
    if ( poke.myParty == tgt.myParty ) return false
    return true
}

// おおきなねっこ
function isBig_root(poke) {
    if ( poke.myItem == "おおきなねっこ" && isAbility(poke) ) return 5324 / 4096
    return 1
}

// ヘドロえき
function isOoze(poke) {
    if ( poke.myAbility == "ヘドロえき" && isAbility(poke) ) return "-"
    return "+"
}

// てんのめぐみ
function isGrace(poke) {
    if ( poke.myAbility == "てんのめぐみ" && isAbility(poke) ) return 2
    return 1
}

// くいしんぼう
function isGluttony(poke) {
    if ( poke.myAbility == "くいしんぼう" && isAbility(poke) ) return 2
    return 4
}

// じゅくせい
function isRipen(poke) {
    if ( poke.myAbility == "じゅくせい" && isAbility(poke) ) return 2
    return 1
}

// ダイマックス
function isDynamax(poke) {
    if ( poke.myCondition.myDynamax ) return 1 / 2
    return 1
}

// かるわざ
function activateUnburden(poke) {
    if ( !isAbility(poke) ) return
    if ( poke.myAbility == "かるわざ" ) return
    if ( poke.myItem ) return

    poke.myCondition.myUnburden = true
}

// 状態異常を治す特性
// じゅうなん/すいほう/どんかん/パステルベール/ふみん/マイペース/マグマのよろい/みずのベール/めんえき/やるき
function healAilmentForAbility(poke) {
    switch ( poke.myAbility ) {
        case "やるき":
        case "ふみん":
            if ( poke.myAilment != "ねむり" ) return
            abilityDeclaration(poke)
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は 目を覚ました !`)
            return

        case "めんえき":
        case "パステルベール":
            if ( poke.myAilment != "どく" ) return
            abilityDeclaration(poke)
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の 毒が治った !`)
            return

        case "じゅうなん":
            if ( poke.myAilment != "まひ" ) return
            abilityDeclaration(poke)
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の 痺れが取れた !`)
            return

        case "みずのベール":
        case "すいほう":
            if ( poke.myAilment != "やけど" ) return
            abilityDeclaration(poke)
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の 火傷が治った !`)
            return

        case "マグマのよろい":
            if ( poke.myAilment != "こおり" ) return
            abilityDeclaration(poke)
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の 氷が溶けた !`)
            return

        case "マイペース":
        case "どんかん":
            if ( !poke.myCondition.myConfusion ) return
            abilityDeclaration(poke)
            poke.myCondition.myConfusion = false
            writeLog(`${poke.myTN} の ${poke.myName} の 混乱が解けた !`)
            return

        default:
            return
    }
}

// ちからずくが有効かどうか
function isSheerForce(poke) {
    // 相手のランク補正を下げる。
    // 自分のランク補正を上げる。
    // 相手を状態異常・こんらん・ひるみ状態にする。
    // ねっとう・スチームバースト・ねっさのだいちで相手のこおり状態を治す。
    // アンカーショット・うたかたのアリア・オリジンズスーパーノヴァ・かげぬい・じごくづき・ひみつのちから・ぶきみなじゅもんの効果。
    // いにしえのうたでメロエッタがフォルムチェンジする効果。

    if ( !isAbility(poke) ) return false
    if ( poke.myAbility != "ちからずく" ) return false


    const moveList_additionalEffect = []
        .concat(additionalEffectToChangeYourRank) // 相手のランク補正を下げる
        .concat(additionalEffectToChangeMyRank)   // 自分のランク補正を上げる
        .concat(additionalEffectToMakeAbnormal)   // 相手を状態異常・こんらん状態にする（ねっとう・スチームバースト・ねっさのだいちを含む）
        .concat(additionalEffectToMakeFlinch)     // 相手をひるみ状態にする

    for ( const move of moveList_additionalEffect ) {
        if ( poke.myMove.name == move.name ) return true
    }

    switch ( poke.myMove.name ) {
        case "アンカーショット":
        case "うたかたのアリア":
        case "オリジンズスーパーノヴァ":
        case "かげぬい":
        case "じごくづき":
        case "ひみつのちから":
        case "ぶきみなじゅもん":
            return true

        case "いにしえのうた":
            if ( poke.myName != "メロエッタ(ボイスフォルム)" ) return false
            return true
    }

}


// 連続技の回数
function getContinuous(poke) {
    let num = 1
    for ( const continuous of moveList_continuous ) {
        if ( poke.myMove.name == continuous.name ) num = continuous.num
    }
    if ( num == 5 ) {
        const random = getRandom()
        if ( random >= 0 )    num = 2
        if ( random >= 0.35 ) num = 3
        if ( random >= 0.7 )  num = 4
        if ( random >= 0.85 ) num = 5
        if ( poke.myAbility == "スキルリンク" && isAbility(poke) ) num = 5
    }
    if ( poke.myMove.name == "みずしゅりけん" && poke.myName == "ゲッコウガ(サトシゲッコウガ)" ) num = 3

    if ( poke.myMove.name == "ふくろだたき" ) {
        let beatUp = 1
        for ( const _poke of myParty ) {
            if ( _poke.myID == poke.myID ) continue // 自分は状態異常でも可
            if ( _poke.myAilment )         continue // 他のポケモンは状態異常だと攻撃しない
            beatUp += 1
        }
        num = beatUp
    }
    // 連続攻撃技でない　かつ　特性おやこあい　であれば2回攻撃になる
    if ( poke.myAbility == "おやこあい" && isAbility(poke) && num == 1 ) num = 2

    return num

    if ( poke.myMove.name == "ドラゴンアロー" ){
        if (con.tgt.length == 1){
            if (con.tgt.child == con.child){

            }
        } else {
            if (con.tgt[0].result == "失敗"){
                con.tgt = [con.tgt[1]]
                move.num = 2
            } else if (con.tgt[1].result == "失敗"){
                con.tgt = [con.tgt[0]]
                move.num = 2
            }
        }
    }
}

function mentalHerb(poke){
    if ( poke.myItem == "メンタルハーブ" && isItem(poke) ) {
        poke.myCondition.myAttract = false      // メロメロ
        poke.myCondition.myDisable.name = false // かなしばり
        poke.myCondition.myDisable.turn = 0     // かなしばり
        enableToRecycle(poke)
        writeLog(`${poke.myTN} の ${poke.myName} の メンタルハーブが発動した`)
    }
}


// ３における各ステップでの技の成功判定
function checkMoveSuccess(poke) {   
    // 技が成功したとき
    if ( poke.myMove.target.includes("場") ) return false
    if ( !poke.myTarget && poke.myCondition.myExplosion ) return false
    for ( const tgt of poke.myTarget ) if ( tgt.success ) return false
    // 技が失敗したとき
    if ( poke.myMove.name == "しぜんのめぐみ" ) enableToRecycle(poke)
    return true
}

// Zワザ、ダイマックス技判定
function isNormalMove(name) {
    // Zワザ
    for ( const Zmove of moveList_Z ) {
        if ( Zmove.name == name ) return false
    }
    // 専用Zワザ
    for ( const Zmove of moveList_dedicated_Z ) {
        if ( Zmove.name == name ) return false
    }
    // ダイマックス技
    for ( const Zmove of moveList_dynamax ) {
        if ( Zmove.name == name ) return false
    }
    // キョダイマックス技
    for ( const Zmove of moveList_gigantamax ) {
        if ( Zmove.name == name ) return false
    }

    return true
}


function isWeight(poke){
    let weight = pokeSearch(poke.myName).weight    // 体重
    
    weight -= poke.myCondition.myAutotomize * 100 // ボディパージ
    if ( ( poke.myItem == "かるいし" && isItem(poke) ) || ( poke.myAbility == "ライトメタル" && isAbility(poke) ) ){
        weight = Math.round(weight * 5) / 10
    }
    if ( poke.myAbility == "ヘヴィメタル" && isAbility(poke) ){
        weight *= 2
    }

    return Math.max(weight, 0.1)
}



function isUnnerve(poke){
    for ( const _poke of oppPokeInBattle(poke) ) {
        if ( !isAbility(_poke) ) continue
        if ( _poke.myAbility == "きんちょうかん" || _poke.myAbility == "じんばいったい" ) return true
    }
    return false
}

function isDarkAura(){
    let abilityList = []
    for ( const poke of allPokeInBattle() ) {
        if ( isAbility(poke) ) abilityList.push( poke.myAbility )
    }
    if ( abilityList.includes("ダークオーラ") && abilityList.includes("オーラブレイク") ) return "break"
    if ( abilityList.includes("ダークオーラ") && !abilityList.includes("オーラブレイク") ) return "aura"

    return false
}

function isFailyAura(){
    let abilityList = []
    for ( const poke of allPokeInBattle() ) {
        if ( isAbility(poke) ) abilityList.push( poke.myAbility )
    }
    if ( abilityList.includes("フェアリーオーラ") && abilityList.includes("オーラブレイク") ) return "break"
    if ( abilityList.includes("フェアリーオーラ") && !abilityList.includes("オーラブレイク") ) return "aura"

    return false
}

function isAlomaVeil(poke){
    const party = myPokeInBattle(poke)
    for ( const _poke of party ) if ( _poke.myAbility == "アロマベール" && isAbility(_poke) ) return _poke

    return false
}

function isSweetVeil(poke){
    const party = myPokeInBattle(poke)
    for ( const _poke of party ) if ( _poke.myAbility == "スイートベール" && isAbility(_poke) ) return _poke

    return false
}

function isFlowerVeil(poke){
    const party = myPokeInBattle(poke)
    for ( const _poke of party ) if ( _poke.myAbility == "フラワーベール" && isAbility(_poke) ) return _poke

    return false
}

function isPastelVeil(poke){
    const party = myPokeInBattle(poke)
    for ( const _poke of party ) if ( _poke.myAbility == "パステルベール" && isAbility(_poke) ) return _poke

    return false
}

function cancelIllusion(poke) {
    if ( poke.myAbility != "イリュージョン" ) return
    if ( !poke.myCondition.myIllusion.status ) return

    writeLog(`${poke.myTN} の ${poke.myCondition.myIllusion.name} の イリュージョンが解けた !`)
    poke.myCondition.myIllusion = {status: false, name: false, gender: false, level: false, type: false}
}

function activateTransform(poke, tgt) {
    // 画面表示名
    poke.myCondition.myTransform = tgt.myName
    // 一般性質
    poke.myGender  = tgt.myGender
    poke.myType    = tgt.myType
    poke.myAbility = tgt.myAbility
    // 実数値
    poke.myAtk    = tgt.myAtk
    poke.myDef    = tgt.myDef
    poke.mySp_atk = tgt.mySp_atk
    poke.mySp_def = tgt.mySp_def
    poke.mySpeed  = tgt.mySpeed
    // ランク補正
    poke.myRank_atk    = tgt.myRank_atk
    poke.myRank_def    = tgt.myRank_def
    poke.myRank_sp_atk = tgt.myRank_sp_atk
    poke.myRank_sp_def = tgt.myRank_sp_def
    poke.myRank_speed  = tgt.myRank_speed
    // 技
    poke.myMove_0 = tgt.myMove_0
    poke.myMove_1 = tgt.myMove_1
    poke.myMove_2 = tgt.myMove_2
    poke.myMove_3 = tgt.myMove_3
    // PP
    poke.myFull_pp_0 = 5
    poke.myFull_pp_1 = 5
    poke.myFull_pp_2 = 5
    poke.myFull_pp_3 = 5
    // 残りPP
    poke.myRest_pp_0 = 5
    poke.myRest_pp_1 = 5
    poke.myRest_pp_2 = 5
    poke.myRest_pp_3 = 5
    // 高さ
    // みがわり人形の大きさに影響
    // 重さ
    // その他
    poke.myCondition.myCritical    = tgt.myCondition.myCritical    // きゅうしょアップ状態ならtrue
    poke.myCondition.myLaser_focus = tgt.myCondition.myLaser_focus // とぎすますを使用したターンは1、効果がある次のターンは2
    poke.myCondition.myChi_strike  = tgt.myCondition.myChi_strike  // キョダイシンゲキ成功回数

}

function cannotChangeItem(poke) {
    // 専用持ち物
    switch ( poke.myName ) {
        case "アルセウス":
            if ( poke.myItem.includes("プレート") ) return true
            break

        case "ギラティナ(オリジンフォルム)":
            if ( poke.myItem == "はっきんだま" ) return true
            break

        case "ゲノセクト":
            if ( poke.myItem.includes("カセット") ) return true
            break

        case "シルヴァディ":
            if ( poke.myItem.includes("メモリ") ) return true
            break

        case "ザシアン(けんのおう)":
            if ( poke.myItem == "くちたけん" ) return true
            break

        case "ザマゼンタ(たてのおう)":
            if ( poke.myItem == "くちたたて" ) return true
            break

        case "ゲンシカイオーガ":
            if ( poke.myItem == "あいいろのたま" ) return true
            break

        case "ゲンシグラードン":
            if ( poke.myItem == "べにいろのたま" ) return true
            break
    }

    // メガストーン
    for ( const megaStone of itemList_megaStone ){
        if ( poke.myName == megaStone.poke && poke.myItem == megaStone.name ) return true
        if ( poke.myName == megaStone.mega && poke.myItem == megaStone.name ) return true
    }

    // Zクリスタル
    for ( const Z of moveList_Z ){
        if ( poke.myItem == Z.item ) return true
    }
    for ( const Z of moveList_dedicated_Z ){
        if ( poke.myItem == Z.item ) return true
    }

    return false
}



function pokeSearch(name){
    for ( const poke of pokeList ) {
        if ( poke.name == name ) return poke
    }
    return false
}

function crossDragon(user0, user1){
    rewriteText(user0.f_con, "技『クロスサンダー』使用", "技『クロスサンダー』待機")
    rewriteText(user1.f_con, "技『クロスサンダー』使用", "技『クロスサンダー』待機")
    rewriteText(user0.f_con, "技『クロスフレイム』使用", "技『クロスフレイム』待機")
    rewriteText(user0.f_con, "技『クロスフレイム』使用", "技『クロスフレイム』待機")
}

function natureRate(nature){
    const nature_list = [
        ['てれや', 'さみしがり', 'いじっぱり', 'やんちゃ', 'ゆうかん'], 
        ['ずぶとい', 'がんばりや', 'わんぱく', 'のうてんき', 'のんき'], 
        ['ひかえめ', 'おっとり', 'すなお', 'うっかりや', 'れいせい'], 
        ['おだやか', 'おとなしい', 'しんちょう', 'きまぐれ', 'なまいき'], 
        ['おくびょう', 'せっかち', 'ようき', 'むじゃき', 'まじめ']
    ]

    const para = ["Atk", "Def", "Sp_atk", "Sp_def", "Speed"]

    for (let i = 0; i < 5; i++){
        for (let j = 0; j < 5; j++){
            if (nature == nature_list[i][j]){
                if (i == j){
                    return {Atk: 1.0, Def: 1.0, Sp_atk: 1.0, Sp_def: 1.0, Speed: 1.0}
                } else {
                    let rate = {Atk: 1.0, Def: 1.0, Sp_atk: 1.0, Sp_def: 1.0, Speed: 1.0}
                    rate[para[i]] = 1.1
                    rate[para[j]] = 0.9
                    return rate
                }
            }
        }
    }
}

const compatibilityTable = {
    ノーマル: {
        ノーマル: 1.0, 
        ほのお: 1.0, 
        みず: 1.0, 
        でんき: 1.0, 
        くさ: 1.0, 
        こおり: 1.0, 
        かくとう: 1.0, 
        どく: 1.0, 
        じめん: 1.0, 
        ひこう: 1.0, 
        エスパー: 1.0, 
        むし: 1.0, 
        いわ: 0.5, 
        ゴースト: 0.0, 
        ドラゴン: 1.0, 
        あく: 1.0, 
        はがね: 0.5, 
        フェアリー: 1.0
    }, 
    ほのお: {
        ノーマル: 1.0, 
        ほのお: 0.5, 
        みず: 0.5, 
        でんき: 1.0, 
        くさ: 2.0, 
        こおり: 2.0, 
        かくとう: 1.0, 
        どく: 1.0, 
        じめん: 1.0, 
        ひこう: 1.0, 
        エスパー: 1.0, 
        むし: 2.0, 
        いわ: 0.5, 
        ゴースト: 1.0, 
        ドラゴン: 0.5, 
        あく: 1.0, 
        はがね: 2.0, 
        フェアリー: 1.0
    }, 
    みず: {
        ノーマル: 1.0, 
        ほのお: 2.0, 
        みず: 0.5, 
        でんき: 1.0, 
        くさ: 0.5, 
        こおり: 1.0, 
        かくとう: 1.0, 
        どく: 1.0, 
        じめん: 2.0, 
        ひこう: 1.0, 
        エスパー: 1.0, 
        むし: 1.0, 
        いわ: 2.0, 
        ゴースト: 1.0, 
        ドラゴン: 0.5, 
        あく: 1.0, 
        はがね: 1.0, 
        フェアリー: 1.0
    }, 
    でんき: {
        ノーマル: 1.0, 
        ほのお: 1.0, 
        みず: 2.0, 
        でんき: 0.5, 
        くさ: 0.5, 
        こおり: 1.0, 
        かくとう: 1.0, 
        どく: 1.0, 
        じめん: 0.0, 
        ひこう: 2.0, 
        エスパー: 1.0, 
        むし: 1.0, 
        いわ: 1.0, 
        ゴースト: 1.0, 
        ドラゴン: 0.5, 
        あく: 1.0, 
        はがね: 1.0, 
        フェアリー: 1.0
    }, 
    くさ: {
        ノーマル: 1.0, 
        ほのお: 0.5, 
        みず: 2.0, 
        でんき: 1.0, 
        くさ: 0.5, 
        こおり: 1.0, 
        かくとう: 1.0, 
        どく: 0.5, 
        じめん: 2.0, 
        ひこう: 0.5, 
        エスパー: 1.0, 
        むし: 0.5, 
        いわ: 2.0, 
        ゴースト: 1.0, 
        ドラゴン: 0.5, 
        あく: 1.0, 
        はがね: 0.5, 
        フェアリー: 1.0
    }, 
    こおり: {
        ノーマル: 1.0, 
        ほのお: 0.5, 
        みず: 0.5, 
        でんき: 1.0, 
        くさ: 2.0, 
        こおり: 0.5, 
        かくとう: 1.0, 
        どく: 1.0, 
        じめん: 2.0, 
        ひこう: 2.0, 
        エスパー: 1.0, 
        むし: 1.0, 
        いわ: 1.0, 
        ゴースト: 1.0, 
        ドラゴン: 2.0, 
        あく: 1.0, 
        はがね: 0.5, 
        フェアリー: 1.0
    }, 
    かくとう: {
        ノーマル: 2.0, 
        ほのお: 1.0, 
        みず: 1.0, 
        でんき: 1.0, 
        くさ: 1.0, 
        こおり: 2.0, 
        かくとう: 1.0, 
        どく: 0.5, 
        じめん: 1.0, 
        ひこう: 0.5, 
        エスパー: 0.5, 
        むし: 0.5, 
        いわ: 2.0, 
        ゴースト: 0.0, 
        ドラゴン: 1.0, 
        あく: 2.0, 
        はがね: 2.0, 
        フェアリー: 0.5
    }, 
    どく: {
        ノーマル: 1.0, 
        ほのお: 1.0, 
        みず: 1.0, 
        でんき: 1.0, 
        くさ: 2.0, 
        こおり: 1.0, 
        かくとう: 1.0, 
        どく: 0.5, 
        じめん: 0.5, 
        ひこう: 1.0, 
        エスパー: 1.0, 
        むし: 1.0, 
        いわ: 0.5, 
        ゴースト: 0.5, 
        ドラゴン: 1.0, 
        あく: 1.0, 
        はがね: 0.0, 
        フェアリー: 2.0
    }, 
    じめん: {
        ノーマル: 1.0, 
        ほのお: 2.0, 
        みず: 1.0, 
        でんき: 2.0, 
        くさ: 0.5, 
        こおり: 1.0, 
        かくとう: 1.0, 
        どく: 2.0, 
        じめん: 1.0, 
        ひこう: 0.0, 
        エスパー: 1.0, 
        むし: 0.5, 
        いわ: 2.0, 
        ゴースト: 1.0, 
        ドラゴン: 1.0, 
        あく: 1.0, 
        はがね: 2.0, 
        フェアリー: 1.0
    }, 
    ひこう: {
        ノーマル: 1.0, 
        ほのお: 1.0, 
        みず: 1.0, 
        でんき: 0.5, 
        くさ: 2.0, 
        こおり: 1.0, 
        かくとう: 2.0, 
        どく: 1.0, 
        じめん: 1.0, 
        ひこう: 1.0, 
        エスパー: 1.0, 
        むし: 2.0, 
        いわ: 0.5, 
        ゴースト: 1.0, 
        ドラゴン: 1.0, 
        あく: 1.0, 
        はがね: 0.5, 
        フェアリー: 1.0
    }, 
    エスパー: {
        ノーマル: 1.0, 
        ほのお: 1.0, 
        みず: 1.0, 
        でんき: 1.0, 
        くさ: 1.0, 
        こおり: 1.0, 
        かくとう: 2.0, 
        どく: 2.0, 
        じめん: 1.0, 
        ひこう: 1.0, 
        エスパー: 0.5, 
        むし: 1.0, 
        いわ: 1.0, 
        ゴースト: 1.0, 
        ドラゴン: 1.0, 
        あく: 0.0, 
        はがね: 0.5, 
        フェアリー: 1.0
    }, 
    むし: {
        ノーマル: 1.0, 
        ほのお: 0.5, 
        みず: 1.0, 
        でんき: 1.0, 
        くさ: 2.0, 
        こおり: 1.0, 
        かくとう: 0.5, 
        どく: 0.5, 
        じめん: 1.0, 
        ひこう: 0.5, 
        エスパー: 2.0, 
        むし: 1.0, 
        いわ: 1.0, 
        ゴースト: 0.5, 
        ドラゴン: 1.0, 
        あく: 2.0, 
        はがね: 0.5, 
        フェアリー: 0.5
    }, 
    いわ: {
        ノーマル: 1.0, 
        ほのお: 2.0, 
        みず: 1.0, 
        でんき: 1.0, 
        くさ: 1.0, 
        こおり: 2.0, 
        かくとう: 0.5, 
        どく: 1.0, 
        じめん: 0.5, 
        ひこう: 2.0, 
        エスパー: 1.0, 
        むし: 2.0, 
        いわ: 1.0, 
        ゴースト: 1.0, 
        ドラゴン: 1.0, 
        あく: 1.0, 
        はがね: 0.5, 
        フェアリー: 1.0
    }, 
    ゴースト: {
        ノーマル: 0.0, 
        ほのお: 1.0, 
        みず: 1.0, 
        でんき: 1.0, 
        くさ: 1.0, 
        こおり: 1.0, 
        かくとう: 1.0, 
        どく: 1.0, 
        じめん: 1.0, 
        ひこう: 1.0, 
        エスパー: 2.0, 
        むし: 1.0, 
        いわ: 1.0, 
        ゴースト: 2.0, 
        ドラゴン: 1.0, 
        あく: 0.5, 
        はがね: 1.0, 
        フェアリー: 1.0
    }, 
    ドラゴン: {
        ノーマル: 1.0, 
        ほのお: 1.0, 
        みず: 1.0, 
        でんき: 1.0, 
        くさ: 1.0, 
        こおり: 1.0, 
        かくとう: 1.0, 
        どく: 1.0, 
        じめん: 1.0, 
        ひこう: 1.0, 
        エスパー: 1.0, 
        むし: 1.0, 
        いわ: 1.0, 
        ゴースト: 1.0, 
        ドラゴン: 2.0, 
        あく: 1.0, 
        はがね: 0.5, 
        フェアリー: 0.0
    }, 
    あく: {
        ノーマル: 1.0, 
        ほのお: 1.0, 
        みず: 1.0, 
        でんき: 1.0, 
        くさ: 1.0, 
        こおり: 1.0, 
        かくとう: 0.5, 
        どく: 1.0, 
        じめん: 1.0, 
        ひこう: 1.0, 
        エスパー: 2.0, 
        むし: 1.0, 
        いわ: 1.0, 
        ゴースト: 2.0, 
        ドラゴン: 1.0, 
        あく: 0.5, 
        はがね: 1.0, 
        フェアリー: 0.5
    }, 
    はがね: {
        ノーマル: 1.0, 
        ほのお: 0.5, 
        みず: 0.5, 
        でんき: 0.5, 
        くさ: 1.0, 
        こおり: 2.0, 
        かくとう: 1.0, 
        どく: 1.0, 
        じめん: 1.0, 
        ひこう: 1.0, 
        エスパー: 1.0, 
        むし: 1.0, 
        いわ: 2.0, 
        ゴースト: 1.0, 
        ドラゴン: 1.0, 
        あく: 1.0, 
        はがね: 0.5, 
        フェアリー: 2.0 
    }, 
    フェアリー: {
        ノーマル: 1.0, 
        ほのお: 0.5, 
        みず: 1.0, 
        でんき: 1.0, 
        くさ: 1.0, 
        こおり: 1.0, 
        かくとう: 2.0, 
        どく: 0.5, 
        じめん: 1.0, 
        ひこう: 1.0, 
        エスパー: 1.0, 
        むし: 1.0, 
        いわ: 1.0, 
        ゴースト: 1.0, 
        ドラゴン: 2.0, 
        あく: 2.0, 
        はがね: 0.5, 
        フェアリー: 1.0
    }
}

// タイプ相性
function compatibilityRate(atkType, defType, ringTarget) {
    let rate = 1.0

    for ( const type of defType ) {
        const value = compatibilityTable[`${atkType}`][`${type}`]
        if ( ringTarget && value == 0 ) rate *= 1.0
        else rate *= value
    }

    return rate
}

// me.con が you.tgt に move で攻撃した時の倍率
function compatibilityCheck(poke, tgt){
    let type = tgt.myType.concat()
    let rate = 1.0

    /*
    if (tgt.p_con.includes("特性『イリュージョン』")){
        type = you["poke" + searchText(tgt.p_con, "特性『イリュージョン』").slice(12)].type
    }
    */

    if ( poke.myMove.type == "ノーマル" || poke.myMove.type == "かくとう" ) {
        if ( poke.myAbility == "きもったま" && isAbility(poke) ) type = type.filter(n => n !== "ゴースト")
        if ( tgt.myCondition.myForesight ) type = type.filter(n => n !== "ゴースト")
    }
    if ( poke.myMove.type == "エスパー" && tgt.myCondition.myMiracle_eye ){
        type = type.filter(n => n !== "あく")
    }
    if ( poke.myMove.name == "サウザンアロー" && poke.myMove.type == "じめん" ){
        if ( tgt.myItem == "くろいてっきゅう" && isItem(tgt) ) return 1
        if ( fieldStatus.myGravity || tgt.myCondition.myIngrain ){
            type = type.filter(n => n !== "ひこう")
        }
    }

    // タイプ相性
    const ringTarget = ( tgt.myItem == "ねらいのまと" && isItem(tgt) )? true : false
    rate *= compatibilityRate(poke.myMove.type, type, ringTarget)

    // タールショット
    if ( tgt.myCondition.myTar_shot && poke.myMove.type == "ほのお" ) rate *= 2
    // フリーズドライ
    if ( poke.myMove.name == "フリーズドライ" && poke.myMove.type == "こおり" && type.includes("みず") ) rate *= 4
    // フラインングプレス
    if ( poke.myMove.name == "フライングプレス" ) rate *= compatibilityRate("ひこう", type, ringTarget)

    return rate
}


// タイプの色コード
// 参照：http://yuki-falling-fall.blogspot.com/2018/12/pgl.html
function getColorCode(type) {
    if ( type == "ノーマル" ) return "#aea886"
    if ( type == "ほのお" ) return "#f45c19"
    if ( type == "みず" ) return "#4a96d6"
    if ( type == "くさ" ) return "#28b25c"
    if ( type == "でんき" ) return "#eaa317"
    if ( type == "こおり" ) return "#45a9c0"
    if ( type == "かくとう" ) return "#9a3d3e"
    if ( type == "どく" ) return "#8f5b98"
    if ( type == "じめん" ) return "#916d3c"
    if ( type == "ひこう" ) return "#7e9ecf"
    if ( type == "エスパー" ) return "#d56d8b"
    if ( type == "むし" ) return "#989001"
    if ( type == "いわ" ) return "#878052"
    if ( type == "ゴースト" ) return "#555fa4"
    if ( type == "ドラゴン" ) return "#454ba6"
    if ( type == "あく" ) return "#7a0049"
    if ( type == "はがね" ) return "#9b9b9b"
    if ( type == "フェアリー" ) return "#ffbbff"
}

function allParameter() {
    return [
        "atk", 
        "def", 
        "sp_atk", 
        "sp_def", 
        "speed", 
        "accuracy", 
        "evasion"
    ]
}

function fiveParameter() {
    return [
        "atk", 
        "def", 
        "sp_atk", 
        "sp_def", 
        "speed"
    ]
}



function pokeNoList() {
    return [
        // カントー地方
        '1', '2', '3', '3m', '4', '5', '6', '6x', '6y', '7', '8', '9', '9m', '10', 
        '11', '12', '13', '14', '15', '15m', '16', '17', '18', '18m', '19', '19a', '20', '20a', 
        '21', '22', '23', '24', '25', '26', '26a', '27', '27a', '28', '28a', '29', '30', 
        '31', '32', '33', '34', '35', '36', '37', '37a', '38', '38a', '39', '40', 
        '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '50a', 
        '51', '51a', '52', '52a', '52g', '53', '53a', '54', '55', '56', '57', '58', '59', '60', 
        '61', '62', '63', '64', '65', '65m', '66', '67', '68', '69', '70', 
        '71', '72', '73', '74', '74a', '75', '75a', '76', '76a', '77', '77g', '78', '78g', '79', '79g', '80', '80m', '80g', 
        '81', '82', '83', '83g', '84', '85', '86', '87', '88', '88a', '89', '89a', '90', 
        '91', '92', '93', '94', '94m', '95', '96', '97', '98', '99', '100', 
        '101', '102', '103', '103a', '104', '105', '105a', '106', '107', '108', '109', '110', '110g', 
        '111', '112', '113', '114', '115', '115m', '116', '117', '118', '119', '120', 
        '121', '122', '122g', '123', '124', '125', '126', '127', '127m', '128', '129', '130', '130m', 
        '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', 
        '141', '142', '142m', '143', '144', '144g', '145', '145g', '146', '146g', '147', '148', '149', '150', '150x', '150y', 
        '151', 
        // ジョウト地方
        '152', '153', '154', '155', '156', '157', '158', '159', '160', 
        '161', '162', '163', '164', '165', '166', '167', '168', '169', '170', 
        '171', '172', '173', '174', '175', '176', '177', '178', '179', '180', 
        '181', '181m', '182', '183', '184', '185', '186', '187', '188', '189', '190', 
        '191', '192', '193', '194', '195', '196', '197', '198', '199', '199g', '200', 
        '201', '202', '203', '204', '205', '206', '207', '208', '208m', '209', '210', 
        '211', '212', '212m', '213', '214', '214m', '215', '216', '217', '218', '219', '220', 
        '221', '222', '222g', '223', '224', '225', '226', '227', '228', '229', '229m', '230', 
        '231', '232', '233', '234', '235', '236', '237', '238', '239', '240', 
        '241', '242', '243', '244', '245', '246', '247', '248', '248m', '249', '250', 
        '251', 
        //ホウエン地方
        '252', '253', '254', '254m', '255', '256', '257', '257m', '258', '259', '260', '260m', 
        '261', '262', '263', '263g', '264', '264g', '265', '266', '267', '268', '269', '270', 
        '271', '272', '273', '274', '275', '276', '277', '278', '279', '280', 
        '281', '282', '282m', '283', '284', '285', '286', '287', '288', '289', '290', 
        '291', '292', '293', '294', '295', '296', '297', '298', '299', '300', 
        '301', '302', '302m', '303', '303m', '304', '305', '306', '306m', '307', '308', '308m', '309', '310', '310m', 
        '311', '312', '313', '314', '315', '316', '317', '318', '319', '319m', '320', 
        '321', '322', '323', '323m', '324', '325', '326', '327', '328', '329', '330', 
        '331', '332', '333', '334', '334m', '335', '336', '337', '338', '339', '340', 
        '341', '342', '343', '344', '345', '346', '347', '348', '349', '350', 
        '351', '352', '353', '354', '354m', '355', '356', '357', '358', '359', '359m', '360', 
        '361', '362', '362m', '363', '364', '365', '366', '367', '368', '369', '370', 
        '371', '372', '373', '373m', '374', '375', '376', '376m', '377', '378', '379', '380', '380m', 
        '381', '381m', '382', '382p', '383', '383p', '384', '384m', '385', '386', '386a', '386d', '386s', 
        // シンオウ地方
        '387', '388', '389', '390', 
        '391', '392', '393', '394', '395', '396', '397', '398', '399', '400', 
        '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', 
        '411', '412', '413', '413s', '413d', '414', '415', '416', '417', '418', '419', '420', 
        '421', '422', '423', '424', '425', '426', '427', '428', '428m', '429', '430', 
        '431', '432', '433', '434', '435', '436', '437', '438', '439', '440', 
        '441', '442', '443', '444', '445', '445m', '446', '447', '448', '448m', '449', '450', 
        '451', '452', '453', '454', '455', '456', '457', '458', '459', '460', '460m', 
        '461', '462', '463', '464', '465', '466', '467', '468', '469', '470', 
        '471', '472', '473', '474', '475', '475m', '476', '477', '478', '479', '479h', '479w', '479f', '479s', '479c', '480', 
        '481', '482', '483', '484', '485', '486', '487', '487o', '488', '489', '490', '491', '492', '492s', '493', 
        // イッシュ地方
        '494', '495', '496', '497', '498', '499', '500', 
        '501', '502', '503', '504', '505', '506', '507', '508', '509', '510', 
        '511', '512', '513', '514', '515', '516', '517', '518', '519', '520', 
        '521', '522', '523', '524', '525', '526', '527', '528', '529', '530', 
        '531', '531m', '532', '533', '534', '535', '536', '537', '538', '539', '540', 
        '541', '542', '543', '544', '545', '546', '547', '548', '549', '550', '550f', 
        '551', '552', '553', '554', '554g', '555', '555f', '555g', '555h', '556', '557', '558', '559', '560', 
        '561', '562', '562g', '563', '564', '565', '566', '567', '568', '569', '570', 
        '571', '572', '573', '574', '575', '576', '577', '578', '579', '580', 
        '581', '582', '583', '584', '585', '586', '587', '588', '589', '590', 
        '591', '592', '593', '594', '595', '596', '597', '598', '599', '600', 
        '601', '602', '603', '604', '605', '606', '607', '608', '609', '610', 
        '611', '612', '613', '614', '615', '616', '617', '618', '618g', '619', '620', 
        '621', '622', '623', '624', '625', '626', '627', '628', '629', '630', 
        '631', '632', '633', '634', '635', '636', '637', '638', '639', '640', 
        '641', '641a', '642', '642a', '643', '644', '645', '645a', '646', '646w', '646b', '647', '647k', '648', '648f', '649', 
        // カロス地方
        '650', 
        '651', '652', '653', '654', '655', '656', '657', '658', '658f', '659', '660', 
        '661', '662', '663', '664', '665', '666', '667', '668', '669', '670', 
        '671', '672', '673', '674', '675', '676', '677', '678', '678f', '679', '680', 
        '681', '681b', '682', '683', '684', '685', '686', '687', '688', '689', '690', 
        '691', '692', '693', '694', '695', '696', '697', '698', '699', '700', 
        '701', '702', '703', '704', '705', '706', '707', '708', '709', '710', '710s', '710l', '710k', 
        '711', '711s', '711l', '711k', '712', '713', '714', '715', '716', '717', '718', '718t', '718c', '719', '719m', '720', 
        '720u', '721', 
        // アローラ地方
        '722', '723', '724', '725', '726', '727', '728', '729', '730', 
        '731', '732', '733', '734', '735', '736', '737', '738', '739', '740', 
        '741', '741p', '741f', '741m', '742', '743', '744', '745', '745f', '745d', '746', '746f', '747', '748', '749', '750', 
        '751', '752', '753', '754', '755', '756', '757', '758', '759', '760', 
        '761', '762', '763', '764', '765', '766', '767', '768', '769', '770', 
        '771', '772', '773', '774', '774f', '775', '776', '777', '778', '779', '780', 
        '781', '782', '783', '784', '785', '786', '787', '788', '789', '790', 
        '791', '792', '793', '794', '795', '796', '797', '798', '799', '800', '800s', '800m', '800u', 
        '801', '802', '803', '804', '805', '806', '807', '808', '809', 
        // ガラル地方
        '810', 
        '811', '812', '813', '814', '815', '816', '817', '818', '819', '820', 
        '821', '822', '823', '824', '825', '826', '827', '828', '829', '830', 
        '831', '832', '833', '834', '835', '836', '837', '838', '839', '840', 
        '841', '842', '843', '844', '845', '846', '847', '848', '849', '849f', '850', 
        '851', '852', '853', '854', '855', '856', '857', '858', '859', '860', 
        '861', '862', '863', '864', '865', '866', '867', '868', '869', '870', 
        '871', '872', '873', '874', '875', '875f', '876', '876f', '877', '878', '879', '880', 
        '881', '882', '883', '884', '885', '886', '887', '888', '888f', '889', '889f', '890', 
        '891', '892', '892r', '893', '894', '895', '896', '897', '898', '898w', '898b'
    ]
}