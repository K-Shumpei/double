//**************************************************
// 検索
//**************************************************

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

// 控えの瀕死でないポケモン検索
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

// 技検索
function moveSearchByName( name ) {
    for ( const move of moveList ) {
        if ( name == move.name ) {
            return Object.assign({}, move)
        }
    }
    return false
}

//**************************************************
// 対象のポケモンがいるフィールドの検索
//**************************************************

// 自分のフィールド
function getMyField(poke){
    if ( poke.myParty == "me" )  return myField
    if ( poke.myParty == "opp" ) return oppField
}

// 相手のフィールド
function getOppField(poke){
    if ( poke.myParty == "me" )  return oppField
    if ( poke.myParty == "opp" ) return myField
}

//**************************************************
// 対象のポケモンがいるパーティの検索
//**************************************************

// 自分のパーティ
function getParty(poke) {
    if ( poke.myParty == "me" )  return myParty
    if ( poke.myParty == "opp" ) return oppParty
}

// 相手のパーティ
function getOppParty(poke) {
    if ( poke.myParty == "me" )  return oppParty
    if ( poke.myParty == "opp" ) return myParty
}

//**************************************************
// 戦闘中のポケモン検索
//**************************************************

// 全ポケモン
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

// 味方のポケモン
function myPokeInBattle(poke){
    let result = []
    if ( poke.myParty == "me" )  for ( const _poke of myParty )  if ( _poke.myPosition != null ) result.push(_poke)
    if ( poke.myParty == "opp" ) for ( const _poke of oppParty ) if ( _poke.myPosition != null ) result.push(_poke)
    return result
}

// 相手のポケモン
function oppPokeInBattle(poke){
    let result = []
    if ( poke.myParty == "me" )  for ( const _poke of oppParty ) if ( _poke.myPosition != null ) result.push(_poke)
    if ( poke.myParty == "opp" ) for ( const _poke of myParty )  if ( _poke.myPosition != null ) result.push(_poke)
    return result
}

//**************************************************
// 計算用
//**************************************************

// 乱数
function getRandom(){
    const first = randomList[0]
    randomList.shift()
    return first
}

// 5捨6入
function fiveCut( number ) {
    if ( number % 1 > 0.5 ) {
        return Math.floor(number) + 1
    } else {
        return Math.floor(number)
    }
}

// リストのランダム入れ替え
function shuffle(array){
    for ( let i = array.length - 1; i > 0; i-- ) {
        let r = Math.floor(getRandom() * (i + 1))
        let tmp = array[i]
        array[i] = array[r]
        array[r] = tmp
    }
    return array
}

// ランク補正ありの実数値
function isValueIncludingRank(AV, rank, critical) {
    switch ( critical ) {
        case true: // 急所に当たった時
            const this_rank = Math.max(rank, 0) 
            return Math.floor((AV * (2 + this_rank)) / 2)

        case false: // 急所に当たらなかった時
            if ( rank > 0 ) return Math.floor((AV * (2 + rank)) / 2)
            else return Math.floor((AV * 2) / (2 - rank))
    }
}