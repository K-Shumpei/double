async function writeLog(txt){
    document.getElementById("log").value += txt + "\n"

    await sleep(2000)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showHPbar(poke){
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

// 乱数
function getRandom(){
    const first = randomList[0]
    randomList.shift()
    return first
}

// 交代先の取得
function getNextPoke( poke ) {
    const party = getParty(poke)
    for ( const _poke of party ) {
        if ( _poke.myBench == poke.myCmd_hand ) {
            return _poke
        }
    }
}

// 5捨6入
function fiveCut(number){
    if ((number % 1) > 0.5){
        return Math.floor(number) + 1
    } else {
        return Math.floor(number)
    }
}

function moveSearchByName(name){
    for ( const move of moveList ) {
        if ( name == move.name ) {
            return move
        }
    }
}

function getParty(poke) {
    if ( poke.myParty == "me" )  return myParty
    if ( poke.myParty == "opp" ) return oppParty
}

function getOppParty(poke) {
    if ( poke.myParty == "me" )  return oppParty
    if ( poke.myParty == "opp" ) return myParty
}

// 戦闘中のポケモン
function allPokeInBattle() {
    let result = []

    for ( const party of myParty ) {
        if ( party.myPosition != null ) { result.push(party) }
    }
    for ( const party of oppParty ) {
        if ( party.myPosition != null ) { result.push(party) }
    }
    return result
}

// 戦闘中の味方ポケモン
function myPokeInBattle(poke){
    let result = []
    if ( poke.myParty == "me" )  for ( const _poke of myParty )  if ( _poke.myPosition != null ) result.push(_poke)
    if ( poke.myParty == "opp" ) for ( const _poke of oppParty ) if ( _poke.myPosition != null ) result.push(_poke)
    return result
}

// 戦闘中の相手ポケモン
function oppPokeInBattle(poke){
    let result = []
    if ( poke.myParty == "me" )  for ( const _poke of oppParty ) if ( _poke.myPosition != null ) result.push(_poke)
    if ( poke.myParty == "opp" ) for ( const _poke of myParty )  if ( _poke.myPosition != null ) result.push(_poke)
    return result
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

// 天候
function isWeather(){
    for ( const poke of myParty ) {
        if ( poke.myPosition == null ) continue
        if ( !isAbility(poke) ) continue
        if ( poke.myAbility == "エアロック" || poke.myAbility == "ノーてんき" ) return false
    }
    return true
}

function isSunny(poke){
    if ( poke.myItem == "ばんのうがさ" && isItem(poke) ) return false
    if ( !isWeather() ) return false
    if ( fieldStatus.mySunny > 0 ) return true
    return false
}

function isRainy(poke){
    if ( poke.myItem == "ばんのうがさ" && isItem(poke) ) return false
    if ( !isWeather() ) return false
    if ( fieldStatus.myRainy > 0 ) return true
    return false
}

function isSandy(poke){
    if ( !isWeather() ) return false
    if ( fieldStatus.mySandstorm > 0 ) return true
    return false
}

function isSnowy(poke){
    if ( !isWeather() ) return false
    if ( fieldStatus.myGraupel > 0 ) return true
    return false
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
    if ( poke.myAbility == "かるわざ" ) {
        poke.myCondition.myUnburden = true
    }

    const item = poke.myItem
    poke.myRecycle = item
    poke.myItem = ""


}



function isField(poke){
    if ( poke.myParty == "me" )  return myField
    if ( poke.myParty == "opp" ) return oppField
}

function isOppField(poke){
    if ( poke.myParty == "me" )  return oppField
    if ( poke.myParty == "opp" ) return myField
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

function resetWeather() {
    fieldStatus.myRainy     = false // あめ
    fieldStatus.mySunny     = false // にほんばれ
    fieldStatus.mySandstorm = false // すなあらし
    fieldStatus.myGraupel   = false // あられ

    myField.myWeather_long  = false // 持続ターン増加アイテム
    oppField.myWeather_long = false // 持続ターン増加アイテム
}

function resetSuperWeather() {
    fieldStatus.myDrought    = false // おおひでり
    fieldStatus.myHeavy_rain = false // おおあめ
    fieldStatus.myTurbulence = false // らんきりゅう
}

function resetTerrain() {
    fieldStatus.myElectric = false // エレキフィールド
    fieldStatus.myGrassy   = false // グラスフィールド
    fieldStatus.myMisty    = false // ミストフィールド
    fieldStatus.myPsychic  = false // サイコフィールド
    myField.myExtender     = false // グランドコート
    oppField.myExtender    = false // グランドコート
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
    poke.myCondition.myBind_ID     = false // バインドを付与したポケモンのID
    poke.myCondition.myBind_long   = false // ねばりのかぎづめ
    poke.myCondition.myBind_turn   = false // バインド経過ターン数
    poke.myCondition.myBind_strong = false // しめつけバンド
}

function resetFilling(poke) {
    poke.myCondition.myFilling = false // ため技の名前
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

// フィールド展開
function activateTerrain(poke, terrain) {
    resetTerrain()
    if ( terrain == "electric" ) {
        fieldStatus.myElectric = 1
        if ( poke.myItem == "グランドコート" && isItem(poke) ) isField(poke).myExtender = true
        writeLog(`足元に電気が駆け巡る`)
    }
    if ( terrain == "grassy" ) {
        fieldStatus.myGrassy = 1
        if ( poke.myItem == "グランドコート" && isItem(poke) ) isField(poke).myExtender = true
        writeLog(`足元に草が生い茂る`)
    }
    if ( terrain == "misty" ) {
        fieldStatus.myMisty = 1
        if ( poke.myItem == "グランドコート" && isItem(poke) ) isField(poke).myExtender = true
        writeLog(`足元に霧が広がった`)
    }
    if ( terrain == "psychic" ) {
        fieldStatus.myPsychic = 1
        if ( poke.myItem == "グランドコート" && isItem(poke) ) isField(poke).myExtender = true
        writeLog(`足元に不思議な感じが広がった`)
    }

    const order = speedOrder(allPokeInBattle())
    for ( const poke of order ) {
        activateSeed( poke ) // シード系の持ち物
        //mimicry() // 特性『ぎたい』
    }
}

// 天候展開
function activateWeather(poke, weather) {
    resetWeather()
    if ( weather == "rainy" ) {
        fieldStatus.myRainy = 1
        if ( poke.myItem == "しめったいわ" && isItem(poke) ) isField(poke).myWeather_long = true
        writeLog(`雨が降り始めた`)
    }
    if ( weather == "graupel" ) {
        fieldStatus.myGraupel = 1
        if ( poke.myItem == "つめたいいわ" && isItem(poke) ) isField(poke).myWeather_long = true
        writeLog(`あられが降り始めた`)
    }
    if ( weather == "sandstorm" ) {
        fieldStatus.mySandstorm = 1
        if ( poke.myItem == "さらさらいわ" && isItem(poke) ) isField(poke).myWeather_long = true
        writeLog(`砂嵐が吹き始めた`)
    }
    if ( weather == "sunny" ) {
        fieldStatus.mySunny = 1
        if ( poke.myItem == "あついいわ" && isItem(poke) ) isField(poke).myWeather_long = true
        writeLog(`日差しが強くなった`)
    }

    // てんきや

    resetSuperWeather()
    if ( weather == "drought" ) {
        writeLog(`日差しがとても強くなった !`)
        fieldStatus.myDrought = true
    }
    if ( weather == "heavy_rain" ) {
        writeLog(`雨がとても強くなった !`)
        fieldStatus.myHeavy_rain = true
    }
    if ( weather == "turbulence" ) {
        writeLog(`乱気流が発生した !`)
        fieldStatus.myTurbulence = true
    }

    // てんきや
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

// IDによる味方判定
function oppJudgeByID(a, b){
    // 0 ~ 5 と 6 ~ 11 がそれぞれチーム
    if ( a <= 5 && b <= 5 ) return false
    if ( a >= 6 && b >= 6 ) return false
    return true
}

// IDによるポケモン検索
function isPokeByID(ID){
    for ( const poke of myParty ) if ( poke.myID == ID ) return poke
    for ( const poke of oppParty ) if ( poke.myID == ID ) return poke
}

// ポジションによるポケモン検索
function isPokeByPosition(party, position) {
    for ( const poke of allPokeInBattle() ) {
        if ( poke.myParty == party && poke.myPosition == position ) {
            return poke
        }
    }
    return false
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
        poke.myCondition.myDisable_move = false // かなしばり
        poke.myCondition.myDisable_turn = false // かなしばり
        enableToRecycle(poke)
        writeLog(`${poke.myTN} の ${poke.myName} の メンタルハーブが発動した`)
    }
}


// 攻撃対象
function isTarget(poke){
    switch ( poke.myMove.target ) {
        case "味方の場":
        case "相手の場":
        case "全体の場":
            return []

        case "自分":
            return [poke]

        case "全体":
            return allPokeInBattle()

        case "味方全体":
            return myPokeInBattle(poke)

        case "相手全体":
            return oppPokeInBattle(poke)

        case "自分以外":
            const oppTarget = oppPokeInBattle(poke)
            const myTarget  = myPokeInBattle(poke).filter( _poke => _poke.myID != poke.myID )
            return Object.assign(oppTarget, myTarget)
    }

    // 残りは1体対象(不定, 味方1体, 自分か味方, 1体選択)

    let target = false
    // 1.フリーフォールによる対象
    target = isTargetBySkyDrop(poke)
    if ( target ) return target
    // 2.ちゅうもくのまと状態の敵
    target = isTargetBySpotlight(poke)
    if ( target ) return target
    // 3.ひらいしん/よびみずのポケモン
    // target = isTargetByAttract(poke)
    // if ( target ) return target
    // 4.カウンター/ミラーコート/メタルバーストの反射対象
    target = isTargetByReflect(poke)
    if ( target ) return target
    // 5.ランダム1体が対象のわざの対象
    target = isTargetByRandom(poke)
    if ( target ) return target
    // 6.技を選択した対象
    return decideTargetByCmd(poke)
}

// 攻撃対象をコマンドから選択
function decideTargetByCmd(poke) {
    switch ( poke.myCmd_tgt ) {
        case 0:
        case 1:
            switch ( myPokeInBattle(poke).length ) {
                case 2:
                    return myPokeInBattle(poke).filter( _poke => _poke.myPosition == poke.myCmd_tgt )
                
                case 1:
                case 0:
                    return []
            }

        case 2:
        case 3:
            switch ( oppPokeInBattle(poke).length ) {
                case 2:
                    return oppPokeInBattle(poke).filter( _poke => _poke.myPosition == poke.myCmd_tgt - 2 )

                case 1:
                    return oppPokeInBattle(poke)

                case 0:
                    return []
            }
    }
}

// 引き寄せる特性による対象
function decideTargetByAttract(tgtList, ability, ID) {
    const target = tgtList.filter( poke => poke.myAbility == ability && isAbility(poke) && poke.myID != ID )
    console.log(tgtList)
    console.log(target)
    if ( target === [] ) return false
    target.sort(function(a,b){
        // 素早さ実数値
        if ( a.mySpeed > b.mySpeed ) return -1
        if ( a.mySpeed < b.mySpeed ) return 1
        // 乱数
        if ( getRandom() < 0.5 ) return -1
        else return 1
    }) 
    return [target[0]]
}

// 1.フリーフォールによる対象
function isTargetBySkyDrop(poke) {
    if ( poke.myMove.name == "フリーフォール" ) {
        return decideTargetByCmd(poke)
    } else {
        return false
    }
}

// 2.ちゅうもくのまと状態の敵
function isTargetBySpotlight(poke) {
    // ちゅうもくのまと状態になった順に優先される
    for ( const spot of isOppField(poke).mySpotlight ) {
        if ( spot.move == "いかりのこな" ) {
            if ( poke.myType.includes("くさ") ) break
            if ( poke.myItem == "ぼうじんゴーグル" && isItem(poke) ) break
        }
        return oppPokeInBattle(poke).filter( _poke => _poke.myPosition == spot.myPosition )
    }
    return false
}

// 3.ひらいしん/よびみずのポケモン
function isTargetByAttract(poke) {
    // すばやさ実数値が高いポケモンの特性が優先される。すばやさにはランク補正やトリックルームを考慮しない
    const attract = [
        {type: "でんき", ability: "ひらいしん"}, 
        {type: "みず", ability: "よびみず"}
    ]

    for ( const element of attract ) {
        if ( poke.myMove.type != element.type ) continue
        switch ( poke.myMove.target ) {
            case "味方1体":
            case "自分か味方":
                const target1 = decideTargetByAttract( myPokeInBattle(poke), element.ability, poke.myID )
                if ( !target1 ) break
                return target1
            
            case "不定":
            case "1体選択":
                const target2 = decideTargetByAttract( allPokeInBattle(), element.ability, poke.myID )
                console.log(target2)
                if ( !target2 ) break
                return target2
        }
    }

    return false
}

// 4.カウンター/ミラーコート/メタルバーストの反射対象
function isTargetByReflect(poke) {
    switch ( poke.myMove.name ) {
        case "カウンター":
        case "ミラーコート":
        case "メタルバースト":
            const party = ( poke.myCondition.myDamage.party == "me" )? 0 : 1
            poke.myCmd_tgt = party * 2 + poke.myCondition.myDamage.position
            const target = decideTargetByCmd(poke)
            poke.myCmd_tgt = ""
            return target
    }
    return false
}

// 5.ランダム1体が対象のわざの対象
function isTargetByRandom(poke) {
    // ねごと/ねこのて/まねっこで選ばれた技の対象も同様
    if ( poke.myMove.target == "ランダム1体" ) {
        switch ( oppPokeInBattle(poke).length ) {
            case 0:
                return []
            case 1:
                return oppPokeInBattle(poke)
            case 2:
                return shuffle(oppPokeInBattle(poke)).pop()
        }
    }
    return false
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

















function shuffle(array){
    for(var i = array.length - 1; i > 0; i--){
        var r = Math.floor(getRandom() * (i + 1))
        var tmp = array[i]
        array[i] = array[r]
        array[r] = tmp
    }
    return array
}


function allFalse(target){
    let count = 0
    for (const con of target){
        if (con.result == "失敗") count += 1
    }
    if (count == target.length) return true
    else return false
}



function lastTurnLog(log){
    const list = log.split("\n")
    const len = list.length
    let index = []
    for (let i = 0; i < len; i++){
        if (list[len - 1 - i].includes("ターン目")){
            index.push(len - 1 - i)
            if (index.length == 2){
                break
            }
        }
    }

    return list.slice(index[1], index[0])
}

function thisTurnLog(log){
    const list = log.split("\n")
    const len = list.length
    let index = []
    for (let i = 0; i < len; i++){
        if (list[len - 1 - i].includes("ターン目")){
            index.push(len - 1 - i)
            if (index.length == 2){
                break
            }
        }
    }
    return list.slice(index[0])
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



// 控えの瀕死でないポケモン
function isBench(poke){
    let result = []
    
    for ( const _poke of getParty(poke) ) {
        if ( _poke.myPosition != null ) continue // バトル場にいない
        if ( _poke.myRest_hp == 0 )     continue // ひんしでない
        if ( isSwitch(_poke) )          continue // 交代待ちをしている
        
        result.push(_poke)
    }

    return result
}



// ランク補正ありの実数値
function isValueIncludingRank(AV, rank, critical){
    //急所に当たった時
    if ( critical == true ) {
        const this_rank = Math.max(rank, 0) 
        return Math.floor((AV * (2 + this_rank)) / 2)
    }
    // 急所に当たらなかった時
    if ( critical == false ) {
        if ( rank > 0 ) return Math.floor((AV * (2 + rank)) / 2)
        else return Math.floor((AV * 2) / (2 - rank))
    }
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





function enableToBelch(me, con){ 
    me["poke" + con.num].belch = "ゲップ可能"
}



function cannotChangeItem(poke){
    if ( poke.myName == "アルセウス" && poke.myItem.includes("プレート") ) return true
    if ( poke.myName == "ギラティナ(オリジンフォルム)" && poke.myItem == "はっきんだま" ) return true
    if ( poke.myNtem == "ゲノセクト" && poke.myItem.includes("カセット") ) return true
    if ( poke.myName == "シルヴァディ" && poke.myItem == "メモリ" ) return true
    if ( poke.myNtem == "ザシアン(けんのおう)" && poke.myItem == "くちたけん" ) return true
    if ( poke.myNtem == "ザマゼンタ(たてのおう)" && poke.myItem == "くちたたて" ) return true
    if ( poke.myNtem == "ゲンシカイオーガ" && poke.myItem == "あいいろのたま" ) return true
    if ( poke.myNtem == "ゲンシグラードン" && poke.myItem == "べにいろのたま" ) return true
    for ( const megaStone of itemList_megaStone ){
        if ( poke.myName == megaStone.poke && poke.myItem == megaStone.name ) return true
        if ( poke.myName == megaStone.mega && poke.myItem == megaStone.name ) return true
    }
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

var compatibilityTable = [
    ['ノーマル', 'ほのお', 'みず', 'でんき', 'くさ', 'こおり', 'かくとう', 'どく', 'じめん', 'ひこう', 'エスパー', 'むし', 'いわ', 'ゴースト', 'ドラゴン', 'あく', 'はがね', 'フェアリー'], 
    [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 0.0, 1.0, 1.0, 0.5, 1.0], 
    [1.0, 0.5, 0.5, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 1.0, 2.0, 1.0], 
    [1.0, 2.0, 0.5, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0], 
    [1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0], 
    [1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 1.0, 0.5, 2.0, 0.5, 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 0.5, 1.0], 
    [1.0, 0.5, 0.5, 1.0, 2.0, 0.5, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0], 
    [2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 0.5, 0.5, 0.5, 2.0, 0.0, 1.0, 2.0, 2.0, 0.5], 
    [1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 0.0, 2.0], 
    [1.0, 2.0, 1.0, 2.0, 0.5, 1.0, 1.0, 2.0, 1.0, 0.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0], 
    [1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0], 
    [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.0, 0.5, 1.0], 
    [1.0, 0.5, 1.0, 1.0, 2.0, 1.0, 0.5, 0.5, 1.0, 0.5, 2.0, 1.0, 1.0, 0.5, 1.0, 2.0, 0.5, 0.5], 
    [1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], 
    [0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0], 
    [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 0.0], 
    [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 0.5], 
    [1.0, 0.5, 0.5, 0.5, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0], 
    [1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 0.5, 1.0], 
]

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

    for ( let i = 0; i < 18; i++ ){
        if ( poke.myMove.type == compatibilityTable[0][i] ){
            for (let j = 0; j < 18; j++){
                if ( type.includes(compatibilityTable[0][j]) ){
                    if ( tgt.myItem == "ねらいのまと" && isItem(tgt) && compatibilityTable[i+1][j] == 0 ){
                        rate *= 1
                    } else {
                        rate *= compatibilityTable[i+1][j]
                    }
                }
            }
        }
    }

    // タールショット
    if ( tgt.myCondition.myTar_shot && poke.myMove.type == "ほのお" ) rate *= 2
    // フリーズドライ
    if ( poke.myMove.name == "フリーズドライ" && poke.myMove.type == "こおり" && type.includes("みず") ) rate *= 4
    // フラインングプレス
    if ( poke.myMove.name == "フライングプレス" ){
        for ( let j = 0; j < 18; j++ ){
            if ( type.includes(compatibilityTable[0][j]) ){
                if ( tgt.myItem == "ねらいのまと" && isItem(tgt) && compatibilityTable[9][j] == 0 ){
                    rate *= 1
                } else {
                    rate *= compatibilityTable[9][j]
                }
            }
        }
    }


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