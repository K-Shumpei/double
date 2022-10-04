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
            return allPokeInBattle().filter( _poke => _poke.myID != poke.myID )
    }

    // 残りは1体対象(不定, 味方1体, 自分か味方, 1体選択, ランダム1体)

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
    for ( const spot of getOppField(poke).mySpotlight ) {
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
                return [shuffle(oppPokeInBattle(poke))[0]]
        }
    }
    return false
}