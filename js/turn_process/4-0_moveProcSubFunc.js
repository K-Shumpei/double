//**************************************************
// 14.技の効果
//**************************************************

// バインド状態
function moveEffect_bind(poke, tgt) {
    if ( !bind.includes(poke.myMove.name) ) return // バインド技であること
    if ( tgt.substitute )                   return // みがわりが有効でないこと
    if ( tgt.poke.myRest_hp == 0 )          return // ひんし状態でないこと
    if ( tgt.poke.myCondition.myBind_turn ) return // すでにバインド状態でないこと

    tgt.poke.myCondition.myBind_ID   = poke.myID
    tgt.poke.myCondition.myBind_turn = 1
    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は しめつけられた !`)

    if ( !isItem(poke) ) return
    switch ( poke.myItem ) {
        case "ねばりのかぎづめ":
            tgt.poke.myCondition.myBind_lone = true
            return

        case "しめつけバンド":
            tgt.poke.myCondition.myBind_strong = true
            return
    }

    return
}

// ひみつのちからの追加効果
function moveEffect_secretPower(poke, tgt) {
    if ( poke.myMove.name != "ひみつのちから" ) return // 技「ひみつのちから」であること
    if ( tgt.substitute )                     return // みがわりが有効でないこと
    if ( poke.myCondition.mySheer_force )     return // ちからずくが無効であること
    if ( getRandom() >= 0.3 * isGrace(poke) ) return // 確率の壁


    if ( fieldStatus.myGrassy ) {
        getAbnormal(tgt.poke, "ねむり")
        return
    }
    
    if ( fieldStatus.myElectric ) {
        getAbnormal(tgt.poke, "まひ")
        return
    }
    
    if ( fieldStatus.myMisty ) {
        /*
        if (tgt.poke.myAbility == "ミラーアーマー"){
            writeLog(me, you, tgt.TN + "　の　" + tgt.name + "の　ミラーアーマーが　発動した!" + "\n")
            changeRank(me, you, con, "C", -1, probability, move, true)
        } else {
            changeRank(user[0], user[1], tgt, "C", -1, true)
        }
        */
        changeRank(tgt.poke, "sp_atk", -1)
        return
    }
    
    if ( fieldStatus.myPsychic ) {
        /*
        if (tgt.poke.myAbility == "ミラーアーマー"){
            writeLog(me, you, tgt.TN + "　の　" + tgt.name + "の　ミラーアーマーが　発動した!" + "\n")
            changeRank(me, you, con, "S", -1, probability, move, true)
        } else {
            changeRank(user[0], user[1], tgt, "S", -1, true)
        }
        */
        changeRank(tgt.poke, "speed", -1)
        return
    }

    getAbnormal(tgt.poke, "まひ")
    return
}

// とどめばりによるこうげき上昇
function moveEffect_fellStinger(poke, tgt) {
    if ( poke.myMove.name != "とどめばり" ) return
    if ( tgt.poke.myRest_hp > 0 ) return
    changeMyRank(poke, "atk", 3)
    return
}

// スケイルショットによるぼうぎょ低下・すばやさ上昇
function moveEffect_scaleShot(poke, tgt) {
    if ( poke.myMove.name != "スケイルショット" ) return
    changeMyRank(poke, "def", -1)
    changeMyRank(poke, "speed", 1)
    return
}

// はたきおとす/どろぼう/ほしがる/むしくい/ついばむによるもちものに関する効果
function moveEffect_item(poke, tgt) {
    if ( !tgt.poke.myItem ) return // 対象が持ち物を持っていること
    if ( tgt.substitute ) return // みがわりが有効でないこと
    if ( cannotChangeItem(tgt.poke) ) return // 干渉できる持ち物であること
    if ( tgt.poke.myAbility == "ねんちゃく" && isAbility(tgt.poke) ) {
        abilityDeclaration(tgt.poke)
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
        return
    }

    switch ( poke.myMove.name ) {
        case "はたきおとす":
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myItem} を はたき落とした !`)
            tgt.poke.myItem = ""
            if ( tgt.poke.myAbility == "かるわざ" ) tgt.poke.myUnburden = true
            return

        case "どろぼう":
        case "ほしがる":
            if ( !poke.myItem ) return
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myItem} を 奪った !`)
            poke.myItem = tgt.poke.myItem
            tgt.poke.myItem = ""
            if ( tgt.poke.myAbility == "かるわざ" ) tgt.poke.myUnburden = true
            eatBerryInAbnormal(poke)
            eatBerryInPinch(poke)
            return

        case "むしくい":
        case "ついばむ":
            if ( !itemList_berry.includes(tgt.poke.myItem) ) return
            eatBerryImmediately(poke, tgt.poke.myItem)
            tgt.poke.myItem = ""
            if ( tgt.poke.myAbility == "かるわざ" ) tgt.poke.myUnburden = true
            return
    }

    return
}

// ドラゴンテール/ともえなげによる交代・交代先の繰り出し
function moveEffect_changeTgt(poke, tgt) {
    if ( poke.myMove.name != "ドラゴンテール" && poke.myMove.name != "ともえなげ" ) return
    if ( !isBench(poke) )                 return // 控えがいること
    if ( tgt.substitute )                 return // みがわり状態でないこと
    if ( tgt.poke.myCondition.myIngrain ) return // ねをはる状態でないこと
    if ( tgt.poke.myCondition.myDynamax ) return // ダイマックスしていないこと
    if ( tgt.poke.myAbility == "きゅうばん" && isAbility(tgt.poke) ) {
        abilityDeclaration(tgt.poke)
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
        return
    }

    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 手持ちに戻された !`)
    const position = tgt.poke.myPosition       // 現在の位置
    const next = shuffle(isBench(tgt.poke))[0] // 次に出すポケモン
    toHand(tgt.poke)                           // 戻す
    summon(next, position)                     // 出す
    return
}