function actionOrder(){
    // 1.わざの効果
        // おさきにどうぞ・りんしょう・コンビネーションわざ・トラップシェル - 行動順を引き上げる
        // さきおくり - 行動順を最後にする
    // 2.優先度
    // 3.せんせいのツメ・イバンのみ・クイックドロウ - 同じ優先度内で最初に行動する
    // 4.こうこうのしっぽ・まんぷくおこう・あとだし - 同じ優先度内で最後に行動する
    // 5.すばやさ
    // 6.乱数
    // すばやさ順に行われる処理はトリックルームの影響を受けて変化する。

    let pokeList = []
    for ( const poke of allPokeInBattle() ){
        // 技を選択していないときはスルー
        if ( !poke.myMove ) continue

        poke.myOrder_fast     = whetherFast(poke)
        poke.myOrder_late     = whetherLate(poke)
        poke.myOrder_priority = priorityDegree(poke)
        poke.myOrder_ahead    = aheadCheck(poke)
        poke.myOrder_rear     = rearCheck(poke)
        poke.myOrder_value    = speedAV(poke, "e")
        poke.myOrder_random   = getRandom()

        pokeList.push(poke)
    }

    pokeList.sort(function(a,b){
        // 技の効果
        if ( a.myOrder_fast > b.myOrder_fast ) return -1
        if ( a.myOrder_fast < b.myOrder_fast ) return 1
        if ( a.myOrder_late > b.myOrder_late ) return -1
        if ( a.myOrder_late < b.myOrder_late ) return 1
        // 優先度
        if ( a.myOrder_priority > b.myOrder_priority ) return -1
        if ( a.myOrder_priority < b.myOrder_priority ) return 1
        // 先攻
        if ( a.myOrder_ahead > b.myOrder_ahead ) return -1
        if ( a.myOrder_ahead < b.myOrder_ahead ) return 1
        // 後攻
        if ( a.myOrder_rear > b.myOrder_rear ) return -1
        if ( a.myOrder_rear < b.myOrder_rear ) return 1
        // 素早さ
        if ( a.myOrder_value > b.myOrder_value ) return -1
        if ( a.myOrder_value < b.myOrder_value ) return 1
        // 乱数
        if ( a.myOrder_random > b.myOrder_random ) return -1
        else return 1
    })

    return pokeList
}

// 1.わざの効果
// おさきにどうぞ・りんしょう・コンビネーションわざ・トラップシェル - 行動順を引き上げる
function whetherFast(poke) {
    if ( poke.myCondition.myAfter_you ) return 1
    if ( poke.myCondition.myShell_trap == true ) return 1
    return 0
}
// さきおくり - 行動順を最後にする
function whetherLate(poke){
    if ( poke.myCondition.myQuash ) return 0
    return 1
}

// 2.優先度
function priorityDegree(poke){
    let priority = 0
    // 優先度が設定されている技
    for ( const element of priorityDegreeList ) {
        if ( poke.myMove.name == element.name ) priority += element.priority
    }
    // それ以外で優先度が変化する技
    if ( poke.myAbility == "いたずらごころ" && isAbility(poke) && poke.myMove.nature == "変化" ) priority += 1
    if ( poke.myMove.name == "グラススライダー" && fieldStatus.myGrassy && onGround(poke) ) priority += 1
    if ( poke.myAbility == "はやてのつばさ" && isAbility(poke) && poke.myMove.type == "ひこう" && poke.myRest_hp == poke.myFull_hp ) priority += 1
    if ( poke.myAbility == "ヒーリングシフト" && isAbility(poke) && moveToRecoverHP.includes(poke.myMove.name) ) priority += 3

    return priority
}

// 3.せんせいのツメ・イバンのみ・クイックドロウ - 同じ優先度内で最初に行動する
function aheadCheck(poke){
    if ( poke.myCondition.myFirst ){
        poke.myCondition.myFirst = false
        return 1
    }
    
    return 0
}

// 4.こうこうのしっぽ・まんぷくおこう・あとだし - 同じ優先度内で最後に行動する
function rearCheck(poke){
    if ( poke.myItem == "こうこうのしっぽ" && isItem(poke) ) return 0
    if ( poke.myItem == "まんぷくのおこう" && isItem(poke) ) return 0
    if ( poke.myAbility == "あとだし" && isAbility(poke) ) return 0
    
    return 1
}

// 5.素早さ
function speedAV(poke, type){
    // すばやさにはいくつか補正される箇所がある。すばやさを計算に用いるとき、どのすばやさを使うかは場合により異なる。
        // a. すばやさ実数値
        // b. aのすばやさをランク補正他諸々の効果で補正したすばやさ
        // c. bのすばやさが10000を超える場合、10000になる
        // d. トリックルーム状態なら10000からcのすばやさを引く。トリックルーム状態でないならcのまま
        // e. dのすばやさを8192で割った余りを出す。8192未満ならばそのまま
    // スピードスワップで入れ替わるすばやさはa
    // ジャイロボール・エレキボールの威力計算に用いるすばやさはc
    // 行動順に影響するすばやさはe
    // すばやさb = すばやさ実数値 × ランク補正 × すばやさ補正/4096 × まひ補正

    let AV = poke.mySpeed

    // ランク補正
    if ( poke.myRank_speed > 0 ) AV = Math.floor((AV * (2 + poke.myRank_speed)) / 2)
    if ( poke.myRank_speed < 0 ) AV = Math.floor((AV * 2) / (2 - poke.myRank_speed))

    // 素早さ補正初期値
    let correction = 4096

    if ( isAbility(poke) ) {
        switch ( poke.myAbility ) {
            case "ようりょくそ":
                if ( !isSunny(poke) ) break
                correction = Math.round(correction * 8192 / 4096)
                break

            case "すいすい":
                if ( !isRainy(poke) ) break
                correction = Math.round(correction * 8192 / 4096)
                break

            case "すなかき":
                if ( !isSandy(poke) ) break
                correction = Math.round(correction * 8192 / 4096)
                break

            case "ゆきかき":
                if ( !isSnowy(poke) ) break
                correction = Math.round(correction * 8192 / 4096)
                break

            case "サーフテール":
                if ( !fieldStatus.myElectric ) break
                correction = Math.round(correction * 8192 / 4096)
                break

            case "スロースタート":
                if ( poke.myCondition.mySlow_start === true ) break
                correction = Math.round(correction * 2048 / 4096)
                break

            case "かるわざ":
                if ( !poke.myCondition.myUnburden ) break
                if ( !poke.myItem ) break
                correction = Math.round(correction * 8192 / 4096)
                break

            case "はやあし":
                if ( !poke.myAilment ) break
                correction = Math.round(correction * 6144 / 4096)
                break
        }
    }

    if ( isItem(poke) ) {
        switch ( poke.myItem ) {
            case "スピードパウダー":
                if ( poke.myName != "メタモン" ) break
                correction = Math.round(correction * 8192 / 4096)
                break

            case "こだわりスカーフ":
                if ( poke.myCondition.myDynamax ) break
                correction = Math.round(correction * 6144 / 4096)
                break

            case "くろいてっきゅう":
            case "きょうせいギプス":
                correction = Math.round(correction * 2048 / 4096)
                break
        }
    }
    //if (con.item.includes("パワー") && isItem(me, con)){
      //  correction = Math.round(correction * 2048 / 4096)
    //}
    if ( getMyField(poke).myTailwind ){
        correction = Math.round(correction * 8192 / 4096)
    }
    if ( getMyField(poke).myWetland ){
        correction = Math.round(correction * 1024 / 4096)
    }

    AV = fiveCut(AV * correction / 4096)

    // まひ補正
    if (poke.myAbnormal == "まひ"){
        AV = Math.floor(AV * 2048 / 4096)
    }

    AV = Math.min(AV, 10000)

    // ジャイロボール・エレキボールの威力計算に用いるすばやさ
    if ( type == "c" ) return AV

    // トリックルーム
    if ( fieldStatus.myTrick_room ) AV = 10000 - AV

    AV = AV % 8192

    // 行動順に影響するすばやさ
    return AV
}

function speedOrder(pokeList){
    for ( const poke of pokeList ) {
        poke.myOrder_value  = speedAV(poke, "e")
        poke.myOrder_random = getRandom()
    }

    pokeList.sort( function( a,b ) {
        // 素早さ
        if ( a.myOrder_value > b.myOrder_value ) return -1
        if ( a.myOrder_value < b.myOrder_value ) return 1
        // 乱数
        if ( a.myOrder_random > b.myOrder_random ) return -1
        else return 1
    })

    return pokeList
}