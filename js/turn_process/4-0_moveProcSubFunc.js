//**************************************************
// 8.追加効果などの発動
//**************************************************

// 追加効果（自分のランクを変化）
function additionalEffect_myRank(poke, tgt) {
    const thisMove = additionalEffectToChangeMyRank.filter( move => move.name == poke.myMove.name )
    if ( thisMove.length === 0 ) return

    const move = thisMove[0]
    if ( getRandom() * 100 >= move.probability * isGrace(poke) ) return

    for ( const rank of move.rank ) {
        changeMyRank(tgt.poke, rank.parameter, rank.change)
    }

    return
}

// 追加効果（相手のランク変化）
function additionalEffect_tgtRank(poke, tgt) {
    const thisMove = additionalEffectToChangeYourRank.filter( move => move.name == poke.myMove.name )
    if ( thisMove.length === 0 ) return

    const move = thisMove[0]
    if ( getRandom() * 100 >= move.probability * isGrace(poke) ) return

    for ( const rank of move.rank ) {
        changeRank(tgt.poke, rank.parameter, rank.change, isSpirit(poke, tgt.poke))
    }

    return
}

// 追加効果（状態異常）
function additionalEffect_ailment(poke, tgt) {
    const thisMove = additionalEffectToMakeAbnormal.filter( move => move.name == poke.myMove.name )
    if ( thisMove.length === 0 ) return

    const move = thisMove[0]
    if ( getRandom() * 100 >= move.probability * isGrace(poke) ) return
    getAbnormal(tgt.poke, move.ailment)
    
    return
}

// 追加効果（ひるみ）
function additionalEffect_flinch(poke, tgt) {
    const thisMove = additionalEffectToMakeFlinch.filter( move => move.name == poke.myMove.name )
    if ( thisMove.length === 0 ) return

    const move = thisMove[0]
    if ( tgt.poke.myAbility == "せいしんりょく" && isAbility(tgt.poke) ) return
    if ( getRandom() * 100 >= move.probability * isGrace(poke) ) return
    tgt.poke.myCondition.myFlinch = true
    
    return
}

// 追加効果（その他）
function additionalEffect_other(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "アンカーショット":
        case "かげぬい":
            if ( tgt.poke.myType.includes("ゴースト") ) return
            tgt.poke.myCondition.myCant_escape = poke.myID
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 逃げられなくなった !`)
            return

        case "しっとのほのお":
            if ( !tgt.poke.myCondition.myRank_up ) return
            getAbnormal(tgt.poke, "やけど")
            return

        case "じごくづき":
            if ( !tgt.poke.myCondition.myThroat_chop ) tgt.poke.myCondition.myThroat_chop += 1
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 音技が出せなくなった !`)
            return

        case "トライアタック":
            if ( getRandom() * 100 >= 30 * isGrace(poke) ) return
            const random = getRandom()
            if ( random < 1 / 3 ) getAbnormal(tgt.poke, "まひ")
            else if ( random < 2 / 3 ) getAbnormal(tgt.poke, "こおり")
            else if ( random < 1 ) getAbnormal(tgt.poke, "やけど")
            return

        case "なげつける":
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を 投げつけた !`)
            // きのみの場合
            if ( itemList_berry.includes(poke.myItem) ) eatBerryImmediately(tgt.poke)
            // それ以外の場合
            switch ( poke.myItem ) {
                case "でんきだま":
                    getAbnormal(tgt.poke, "まひ")
                    return

                case "かえんだま":
                    getAbnormal(tgt.poke, "やけど")
                    return

                case "どくバリ":
                    getAbnormal(tgt.poke, "どく")
                    return

                case "どくどくだま":
                    getAbnormal(tgt.poke, "もうどく")
                    return

                case "おうじゃのしるし":
                case "するどいキバ":
                    if ( tgt.poke.myAbility == "せいしんりょく" && isAbility(tgt.poke) ) return
                    tgt.poke.myCondition.myFlinch = true
                    return

                case "メンタルハーブ":
                    /*
                    removeText(tgt.p_con, "状態変化『アンコール』")
                    removeText(tgt.p_con, "状態変化『いちゃもん』")
                    removeText(tgt.p_con, "状態変化『かいふくふうじ』")
                    removeText(tgt.p_con, "状態変化『かなしばり』")
                    removeText(tgt.p_con, "状態変化『ちょうはつ』")
                    removeText(tgt.p_con, "状態変化『メロメロ』")
                    */
                    return

                case "しろいハーブ":
                    for ( const para of allParameter() ) {
                        tgt.poke[`myRank_${para}`] = Math.max(0, tgt.poke[`myRank_${para}`])
                    }
                    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 下がっていた能力変化が 元に戻った`)
                    return
            }

            // どの持ち物でも行う処理
            enableToRecycle(poke)
            return

        default:
            return
    }
}

// 自分のランクが下がる技の効果
function additionalEffect_downMyRank(poke, tgt) {
    const thisMove = moveList_downMyRank.filter( move => move.name == poke.myMove.name )
    if ( thisMove.length === 0 ) return

    const move = thisMove[0]
    if ( move.name == "スケイルショット" ) return
    for ( const rank of move.rank ) {
        changeMyRank(tgt.poke, rank.parameter, rank.change)
    }

    return
}

// HP吸収技の吸収効果/ヘドロえきのダメージ効果
function additionalEffect_recover(poke, tgt) {
    const thisMove = moveList_recover.filter( move => move.name == poke.myMove.name )
    if ( thisMove.length === 0 ) return

    const move = thisMove[0]
    const damage = fiveCut(Math.round(tgt.damage * move.rate) * isBig_root(poke))
    changeHP(poke, damage, isOoze(tgt.poke))
}

// はじけるほのおによる火花のダメージ
function additionalEffect_flameBurst(poke, tgt) {
    if ( poke.myMove.name != "はじけるほのお" ) return

    const party = tgt.poke.myParty
    const position = 1 - tgt.poke.myPosition
    const tgtPokeList = allPokeInBattle().filter( _poke => _poke.myParty == party && _poke.myPosition == position )

    if ( tgtPokeList.length === 0 ) return

    const tgtPoke = tgtPokeList[0]
    const damage = Math.floor(tgtPoke.myfull_hp / 16 * isDynamax(tgtPoke))
    changeHP(tgtPoke, damage, "-")

    return
}

// ダイマックス技の効果
function additionalEffect_dynamax(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "ダイナックル":
            for ( const _poke of myPokeInBattle(poke) ) {
                changeRank(_poke, "atk", 1, false)
            }
            return

        case "ダイスチル":
            for ( const _poke of myPokeInBattle(poke) ) {
                changeRank(_poke, "def", 1, false)
            }
            return

        case "ダイアシッド":
            for ( const _poke of myPokeInBattle(poke) ) {
                changeRank(_poke, "sp_atk", 1, false)
            }
            return

        case "ダイアース":
            for ( const _poke of myPokeInBattle(poke) ) {
                changeRank(_poke, "sp_def", 1, false)
            }
            return

        case "ダイジェット":
            for ( const _poke of myPokeInBattle(poke) ) {
                changeRank(_poke, "speed", 1, false)
            }
            return

        case "ダイドラグーン":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                changeRank(_poke, "atk", -1, isSpirit(poke, _poke))
            }
            return

        case "ダイホロウ":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                changeRank(_poke, "def", -1, isSpirit(poke, _poke))
            }
            return

        case "ダイワーム":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                changeRank(_poke, "sp_atk", -1, isSpirit(poke, _poke))
            }
            return

        case "ダイアーク":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                changeRank(_poke, "sp_def", -1, isSpirit(poke, _poke))
            }
            return

        case "ダイアタック":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                changeRank(_poke, "speed", -1, isSpirit(poke, _poke))
            }
            return

        case "ダイバーン":
            if ( fieldStatus.mySunny ) return
            activateWeather(poke, "sunny")
            return

        case "ダイストリーム":
            if ( fieldStatus.myRainy ) return
            activateWeather(poke, "rainy")
            return

        case "ダイロック":
            if ( fieldStatus.mySandstorm ) return
            activateWeather(poke, "sandstorm")
            return

        case "ダイアイス":
            if ( fieldStatus.myGraupel ) return
            activateWeather(poke, "graupel")
            return

        case "ダイサンダー":
            if ( fieldStatus.myElectric ) return
            activateWeather(poke, "electric")
            return

        case "ダイソウゲン":
            if ( fieldStatus.myGrassy ) return
            activateWeather(poke, "grassy")
            return

        case "ダイサイコ":
            if ( fieldStatus.myPsychic ) return
            activateWeather(poke, "psychic")
            return

        case "ダイフェアリー":
            if ( fieldStatus.myMisty ) return
            activateWeather(poke, "misty")
            return

        case "キョダイカンデン":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                const ailment = ( getRandom() < 0.5 )? "まひ" : "どく"
                getAbnormal(_poke, ailment)
            }
            return

        case "キョダイカンロ":
            for ( const _poke of myPokeInBattle(poke) ) {
                if ( !_poke.myAilment ) continue
                resetAilment(_poke)
                writeLog(`${_poke.myTN} の ${_poke.myName} の 状態異常が治った !`)
            }
            return

        case "キョダイガンジン":
            if ( getOppField(poke).myStealth_rock ) return
            getOppField(poke).myStealth_rock = true
            writeLog(`${getOppField(poke).myTN} の場に とがった岩がただよいはじめた`)
            return

        case "キョダイゲンエイ":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                if ( _poke.myCondition.myCant_escape ) continue
                if ( _poke.myType.includes("ゴースト") ) continue
                _poke.myCondition.myCant_escape = poke.myID
                writeLog(`${_poke.myTN} の ${_poke.myName} は 逃げられなくなった !`)
            }
            return

        case "キョダイゲンスイ":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                if ( _poke.myCondition.myHistory === [] ) continue
                const lastMove = _poke.myCondition.myHistory[0].name
                for ( let i = 0; i < 4; i++ ) {
                    if ( _poke[`myMove_${i}`] != lastMove ) continue
                    const degPP = Math.max(_poke[`myRest_pp_${i}`] - 2, 0)
                    _poke[`myRest_pp_${i}`] -= degPP
                    writeLog(`${_poke.myTN} の ${_poke.myName} の ${lastMove} の PPが${degPP}減った !`)
                }
            }
            return

        case "キョダイコウジン":
            if ( getMyField(tgt.poke).mySteelsurge ) return
            getMyField(tgt.poke).mySteelsurge = true
            writeLog(`${tgt.poke.myTN} の場に尖った鋼が漂い始めた !`)
            return

        case "キョダイコバン":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                getAbnormal(_poke, "こんらん")
            }
            return

        case "キョダイコワク":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                const random = getRandom()
                if ( random < 1 / 3 ) getAbnormal(_poke, "まひ")
                else if ( random < 2 / 3 ) getAbnormal(_poke, "どく")
                else getAbnormal(_poke, "ねむり")
            }
            return

        case "キョダイサイセイ":
            if ( !poke.myItem ) return
            if ( !itemList_berry.includes(poke.myRecycle) ) return
            if ( getRandom() < 0.5 ) return
            poke.myItem = poke.myRecycle
            poke.myRecycle = false
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を拾ってきた !`)
            return

        case "キョダイサンゲキ":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                changeRank(_poke, "evasion", -1, isSpirit(poke, _poke))
            }
            return

        case "キョダイシュウキ":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                getAbnormal(_poke, "どく")
            }
            return

        case "キョダイシンゲキ":
            writeLog(`${poke.myTN} のポケモンは 張り切っている !`)
            for ( const _poke of myPokeInBattle(poke) ) {
                if ( _poke.myCondition.myChi_strike == 3 ) continue
                _poke.myCondition.myChi_strike += 1
            }
            return

        case "キョダイスイマ":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                if ( getRandom() < 0.5 ) continue
                if ( _poke.myCondition.myYawn ) continue
                _poke.myCondition.myYawn = 1
                writeLog(`${_poke.myTN} の ${_poke.myName} は 眠気に襲われた`)
            }
            return

        case "キョダイセンリツ":
            if ( getMyField(poke).myAurora_veil ) return
            getMyField(poke).myAurora_veil = 1
            writeLog(`${poke.myTN} の場に オーロラベールが 現れた`)
            if ( poke.myItem == "ひかりのねんど" && isItem(poke) ) getMyField(poke).myAurora_clay = true
            return

        case "キョダイダンエン":
            for ( const _poke of myPokeInBattle(poke) ) {
                const damage = Math.floor(_poke.myFull_hp / 6 * isDynamax(_poke))
                changeHP(_poke, damage, "+")
            }
            return

        case "キョダイテンドウ":
            if ( fieldStatus.myGravity ) return
            fieldStatus.myGravity = 1
            writeLog(`重力が強くなった !`)
            for ( const _poke of allPokeInBattle() ) {
                if ( onGround(_poke) ) continue // 地面にいないこと
                _poke.myCondition.myTelekinesis = false // テレキネシスの解除
                writeLog(`${_poke.myTN} の ${_poke.myName} は じゅうりょくの 影響で 空中に いられなくなった !`)
            }
            return

        case "キョダイテンバツ":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                getAbnormal(_poke, "こんらん")
            }
            return

        case "キョダイバンライ":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                getAbnormal(_poke, "まひ")
            }
            return

        case "キョダイフウゲキ":
            if ( getMyField(tgt.poke).myMist ) {
                getMyField(tgt.poke).myMist = false
                writeLog(`${tgt.poke.myTN} の場の しろいきりが 消え去った`)
            }
            if ( getMyField(tgt.poke).mySafeguard ) {
                getMyField(tgt.poke).mySafeguard = false
                writeLog(`${tgt.poke.myTN} の場の しんぴのまもりが 消え去った`)
            }
            if ( getMyField(tgt.poke).myReflect ) {
                getMyField(tgt.poke).myReflect = false
                getMyField(tgt.poke).myReflect_cray = false
                writeLog(`${tgt.poke.myTN} の場の リフレクターが 消え去った`)
            }
            if ( getMyField(tgt.poke).myLight_screen ) {
                getMyField(tgt.poke).myLight_screen = false
                getMyField(tgt.poke).myLight_cray = false
                writeLog(`${tgt.poke.myTN} の場の ひかりのかべが 消え去った`)
            }
            if ( getMyField(tgt.poke).myAurora_veil ) {
                getMyField(tgt.poke).myAurora_veil = false
                getMyField(tgt.poke).myAurora_cray = false
                writeLog(`${tgt.poke.myTN} の場の オーロラベールが 消え去った`)
            }

            for ( const field of [myField, oppField] ) {
                if ( field.mySpikes > 0 ) {
                    field.mySpikes = 0
                    writeLog(`${field.myTN} の場の まきびしが 消え去った`)
                }
                if ( field.myToxic_spikes > 0 ) {
                    field.myToxic_spikes = 0
                    writeLog(`${field.myTN} の場の どくびしが 消え去った`)
                }
                if ( field.myStealth_rock ) {
                    field.myStealth_rock = false
                    writeLog(`${field.myTN} の場の ステルスロックが 消え去った`)
                }
                if ( field.mySticky_web ) {
                    field.mySticky_web = false
                    writeLog(`${field.myTN} の場の ねばねばネットが 消え去った`)
                }
                if ( field.mySteelsurge ) {
                    field.mySteelsurge = false
                    writeLog(`${field.myTN} の場の キョダイコウジンが 消え去った`)
                }
            }

            if ( fieldStatus.myGrassy )   writeLog(`グラスフイールドが 消え去った`)
            if ( fieldStatus.myElectric ) writeLog(`エレキフイールドが 消え去った`)
            if ( fieldStatus.myMisty )    writeLog(`ミストフイールドが 消え去った`)
            if ( fieldStatus.myPsychic )  writeLog(`サイコフイールドが 消え去った`)
            resetTerrain()

            return

        case "キョダイホーヨー":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                if ( _poke.myCondition.myAttract !== false ) continue
                if ( _poke.myGender == "-" ) continue
                if ( poke.myGender == "-" ) continue
                if ( _poke.myGender == poke.myGender ) continue
                _poke.myCondition.myAttract = poke.myID
                writeLog(`${_poke.myTN} の ${_poke.myName} は メロメロになった`)
            }
            return 
            
        case "キョダイホウマツ":
            for ( const _poke of myPokeInBattle(tgt.poke) ) {
                changeRank(_poke, "speed" -2)
            }
            return

        case "キョダイベンタツ":
            if ( getMyField(tgt.poke).myVine_lash ) return
            getMyField(tgt.poke).myVine_lash = 1
            writeLog(`${tgt.poke.myTN} の場が ${poke.myMove.name}で囲まれた`)
            return
            
        || move.name == "キョダイゴクエン" || move.name == "キョダイホウゲキ" || move.name == "キョダイフンセキ") && !tgt.f_con.includes(move.name)) {
        tgt.f_con += move.name + " 4/4" + "\n"
        writeLog(me, you, tgt.TN + "　の場が　" + move.name + "　で囲まれた" + "\n")
    } else if ((move.name == "キョダイサジン" || move.name == "キョダイヒャッカ") && !tgt.p_con.includes("バインド") && !damage.substitute && tgt.last_HP > 0) {
        writeLog(me, you, tgt.TN + "　の　" + tgt.name + "　は　しめつけられた!" + "\n")
        if (con.item == "ねばりのかぎづめ") {
            tgt.p_con += "バインド（長）　0ターン目" + "\n"
        } else if (con.item == "しめつけバンド") {
            tgt.p_con += "バインド（強）　0ターン目" + "\n"
        } else {
            tgt.p_con += "バインド　0ターン目" + "\n"
        }
    }
}

//**************************************************
// 9.ダメージが発生したときの効果
//**************************************************

// 1.コアパニッシャーによるとくせいなし
function effectWithDmg_coreEnforcer(poke, tgt) {
    if ( poke.myMove.name != "コアパニッシャー" ) return
    if ( tgt.poke.myCmd_move !== "" ) return // 行動を終えている必要がある
    if ( tgt.poke.myCondition.myHistory === [] ) return // 交代で出てきたポケモンに対しては無効
    if ( abilityList_disable_gastro.includes(tgt.poke.myAbility) ) return // 特性なし状態にできる

    tgt.poke.myCondition.myNo_ability = true
    return
}

// 2.防御側のいかりによるこうげき上昇
function effectWithDmg_rage(poke, tgt) {
    if ( !tgt.poke.myCondition.myRage ) return
    if ( tgt.poke.myRest_hp == 0 ) return
    if ( tgt.poke.myRank_atk == 6 ) return
    
    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の いかりのボルテージが上がっていく !`)
    changeRank(tgt.poke, "atk", 1, isSpirit(poke, tgt.poke))
    return
}

// 3.クリアスモッグによるランク補正のリセット
function effectWithDmg_clearSmog(poke, tgt) {
    if ( poke.myMove.name != "クリアスモッグ" ) return
    if ( tgt.poke.myRest_hp == 0 ) return

    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 能力変化が元に戻った !`)
    for ( const para of allParameter() ) {
        tgt.poke[`myRank_${para}`] = 0
    }
    return
}

// 4.防御側のおんねんによるPP消失
function effectWithDmg_grudge(poke, tgt) {
    if ( !tgt.poke.myCondition.myGrudge ) return
    if ( tgt.poke.myRest_hp > 0 ) return
    /*if (atk.data.dynaTxt.includes("3") || atk.data.gigaTxt.includes("3") || atk.data.Z){
        con["last_" + atk.data.command] = 0
        atk["poke" + cfn.battleNum(atk)]["last_" + atk.data.command] = 0
        writeLog(me, you, con.TN + "　の　" + con.name + "　の　" + con["move_" + atk.data.command] + "　はおんねんで　PPが0になった　!" + "\n")
    } */
    for ( let i = 0; i < 4; i++ ) {
        const move = poke[`myMove_${i}`]
        if ( poke.myMove.name != move ) continue
        poke[`myRest_pp_${i}`] = 0
        writeLog(`${poke.myTN} の ${poke.myName} の ${move} はおんねんで PPが0になった !`)
    }
    return
}

// 5.防御側のくちばしキャノンによるやけど
function effectWithDmg_beakBlast(poke, tgt) {
    if ( !tgt.poke.myCondition.myBeak_blast ) return
    if ( poke.myMove.direct == "間接" ) return
    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return

    getAbnormal(poke, "やけど")
    return
}

// 6.攻撃側のどくしゅによるどく
function effectWithDmg_poisonTouch(poke, tgt) {
    if ( !isAbility(poke) ) return
    if ( poke.myAbility != "どくしゅ" ) return
    if ( poke.myMove.direct == "間接" ) return
    if ( getRandom() >= 0.3 ) return
    if ( tgt.poke.myAbility == "りんぷん" && isAbility(tgt.poke) ) return

    abilityDeclaration(poke)
    getAbnormal(tgt.poke, "どく")
    return
}

// 6_1.攻撃側のするどいキバ：wikiにない
function effectWithDmg_flinch(poke, tgt) {
    if ( oneShot.includes(poke.myMove.name) ) return // 一撃必殺技ではひるまない

    if ( poke.myItem == "おうじゃのしるし" ) {
        if ( !isItem(poke) ) return
        if ( getRandom() >= 0.1 * isGrace(poke) ) return
        tgt.poke.myCondition.myFlinch = true
        return
    }
    if ( poke.myItem == "するどいキバ" ) {
        if ( !isItem(poke) ) return
        if ( getRandom() >= 0.1 * isGrace(poke) ) return
        tgt.poke.myCondition.myFlinch = true
        return
    }
    if ( poke.myAbility == "あくしゅう" ) {
        if ( !isAbility(poke) ) return
        if ( getRandom() >= 0.1 * isGrace(poke) ) return
        tgt.poke.myCondition.myFlinch = true
        return
    }
    return
}

// 7.防御側の特性
function effectWithDmg_defAbility(poke, tgt) {
    if ( !isAbility(tgt.poke) ) return

    const random = getRandom()
    const damage_4 = Math.floor(poke.myFull_hp / 4 * isDynamax(poke))
    const damage_8 = Math.floor(poke.myFull_hp / 8 * isDynamax(poke))

    switch ( tgt.poke.myAbility ) {
        case "ゆうばく":
            if ( tgt.poke.myRest_hp > 0 ) return
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return
            if ( poke.myAbility == "しめりけ" && isAbility(poke) ) return
            abilityDeclaration(tgt.poke)
            changeHP(poke, damage_4, "-")
            return

        case "とびだすなかみ":
            if ( tgt.poke.myRest_hp > 0 ) return
            abilityDeclaration(tgt.poke)
            changeHP(poke, tgt.damage, "-")
            return

        case "シンクロ":
            return

        case "てつのトゲ":
        case "さめはだ":
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return
            abilityDeclaration(tgt.poke)
            changeHP(poke, damage_8, "-")
            return

        case "ほうし":
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return
            if ( poke.myAbility == "ぼうじん" && isAbility(poke) ) return
            if ( poke.myItem == "ぼうじんゴーグル" && isItem(poke) ) return
            if ( poke.myType.includes("くさ") ) return
            if ( random >= 0.3 ) return
            abilityDeclaration(tgt.poke)
            if ( random < 0.09 )      getAbnormal(poke, "どく")
            else if ( random < 0.19 ) getAbnormal(poke, "まひ")
            else if ( random < 0.3 )  getAbnormal(poke, "ねむり")
            return

        case "どくのトゲ":
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return
            if ( random >= 0.3 ) return
            abilityDeclaration(tgt.poke)
            getAbnormal(poke, "どく")
            return

        case "せいでんき":
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return
            if ( random >= 0.3 ) return
            abilityDeclaration(tgt.poke)
            getAbnormal(poke, "まひ")
            return

        case "ほのおのからだ":
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return
            if ( random >= 0.3 ) return
            abilityDeclaration(tgt.poke)
            getAbnormal(poke, "やけど")
            return

        case "メロメロボディ":
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return
            if ( random >= 0.3 ) return
            if ( tgt.poke.myRest_hp == 0 ) return
            if ( poke.myCondition.myAttract ) return
            if ( poke.myGender == "-" ) return
            if ( tgt.poke.myGender == "-" ) return
            if ( poke.myGender == tgt.poke.myGender ) return
            poke.myCondition.myAttract = tgt.poke.myID
            abilityDeclaration(tgt.poke)
            writeLog(`${poke.myTN} の ${poke.myName} は メロメロに なってしまった !`)
            mentalHerb(poke)
            return

        case "ミイラ":
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return
            if ( abilityList_disable_mummy.includes(poke.myAbility) ) return
            abilityDeclaration(tgt.poke)
            poke.myAbility = "ミイラ"
            writeLog(`${poke.myTN} の ${poke.myName} は 特性『${tgt.poke.myAbility}』 になった!`)
            return

        case "ぬめぬめ":
        case "カーリーヘアー":
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return
            abilityDeclaration(tgt.poke)
            changeRank(poke, "speed", -1, isSpirit(poke, tgt.poke))
            // ミラーアーマーの処理
            return

        case "さまようたましい":
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return
            if ( abilityList_disable_wanderingSpirit.includes(poke.myAbility) ) return
            abilityDeclaration(tgt.poke)
            [poke.myAbility, tgt.poke.myAbility] = [tgt.poke.myAbility, poke.myAbility]
            writeLog(`${poke.myTN} の ${poke.myName} は 特性『${poke.myAbility}』 になった!`)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 特性『${tgt.poke.myAbility}』 になった!`)
            return

        case "ほろびのボディ":
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return
            return

        case "のろわれボディ":
            if ( random >= 0.3 ) return
            if ( poke.myCondition.myDisable_move ) return
            abilityDeclaration(tgt.poke)
            poke.myCondition.myDisable_move = poke.myMove.name
            poke.myCondition.myDisable_turn = 1
            mentalHerb(poke)
            return

        case "イリュージョン":
            return

        case "じきゅうりょく":
            if ( tgt.poke.myRest_hp == 0 ) return
            abilityDeclaration(tgt.poke)
            changeRank(tgt.poke, "def", 1, isSpirit(poke, tgt.poke))
            return

        case "すなはき":
            if ( fieldStatus.mySandstorm ) return
            if ( fieldStatus.myHeavy_rain ) return
            if ( fieldStatus.myDrought ) return
            if ( fieldStatus.myTurbulence ) return
            abilityDeclaration(tgt.poke)
            activateWeather(tgt.poke, "sandstorm")
            return

        case "わたげ":
            abilityDeclaration(tgt.poke)
            changeRank(poke, "speed", -1, isSpirit(poke, tgt.poke))
            // ミラーアーマー
            return

        case "うのミサイル":
            if ( !tgt.poke.myCondition.myGulp_missile ) return
            abilityDeclaration(tgt.poke)
            changeHP(poke, damage_4, "-")
            switch ( tgt.poke.myCondition.myGulp_missile ) {
                case "うのみのすがた":
                    changeRank(poke, "def", -1, isSpirit(poke, tgt.poke))
                    // ミラーアーマー
                    return

                case "まるのみのすがた":
                    getAbnormal(poke, "まひ")
                    return
            }
            tgt.poke.myCondition.myGulp_missile = false
            eatBerryInAbnormal(poke)
            eatBerryInPinch(poke)
            return

        case "くだけるよろい":
            if ( tgt.poke.myRest_hp == 0 ) return
            if ( poke.myMove.nature != "物理" ) return
            abilityDeclaration(tgt.poke)
            changeMyRank(tgt.poke, "def", -1)
            changeMyRank(tgt.poke, "speed", 2)
            whiteHerb(poke)
            return

        case "みずがため":
            if ( tgt.poke.myRest_hp == 0 ) return
            if ( poke.myMove.type != "みず" ) return
            abilityDeclaration(tgt.poke)
            changeMyRank(tgt.poke, "def", 2)
            return

        case "せいぎのこころ":
            if ( tgt.poke.myRest_hp == 0 ) return
            if ( poke.myMove.type != "あく" ) return
            abilityDeclaration(tgt.poke)
            changeMyRank(tgt.poke, "atk", 1)
            return

        case "びびり":
            if ( tgt.poke.myRest_hp == 0 ) return
            switch ( poke.myMove.type ) {
                case "あく":
                case "ゴースト":
                case "むし":
                    abilityDeclaration(tgt.poke)
                    changeMyRank(tgt.poke, "speed", 1)
                    return
            }
            return

        case "じょうききかん":
            if ( tgt.poke.myRest_hp == 0 ) return
            switch ( poke.myMove.type ) {
                case "みず":
                case "ほのお":
                    abilityDeclaration(tgt.poke)
                    changeMyRank(tgt.poke, "speed", 6)
                    return
            }
            return

        case "いかりのつぼ":
            if ( tgt.poke.myRest_hp == 0 ) return
            if ( !tgt.critical ) return
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 攻撃が 最大まで上がった !`)
            tgt.poke.myRank_atk = 6
            return

        default:
            return
    }
}

// 8.相性に関するきのみ
function effectWithDmg_berry(poke, tgt) {
    if ( !tgt.poke.myCondition.myHalf_berry ) return

    // 防御側の弱点半減のきのみ/ホズのみが発動したときのメッセージ
    // ダメージ自体に影響するので効果は1.時点で現れているが、メッセージはこの時点で流れる。ほおぶくろが発動するときもこのメッセージの直後となる。
    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.item} が 威力を弱めた`)
    enableToRecycle(tgt.poke)
    tgt.poke.myCondition.myHalf_berry = false
    // 防御側のナゾのみ
    /*
    if (tgt.poke.myItem == "ナゾのみ" && isItem(user[0], tgt) && tgt.poke.myRest_hp > 0 && compatibilityCheck(me, user[0], con, tgt, move) > 1){
        (tgt.poke.myAbility == "じゅくせい" && isAbility(user[0], tgt))? num = 2 : num = 4
        changeHP(user[0], user[1], tgt, Math.floor(user[0]["poke" + tgt.num].full_HP / num), "+")
        enableToRecycle(user[0], tgt)
        enableToBelch(user[0], tgt)
    }
    */
}

// 9.やきつくすによるきのみ/ジュエル6-の消失
function effectWithDmg_incinerate(poke, tgt) {
    if ( poke.myMove.name != "やきつくす" ) return
    if ( tgt.poke.myAbility == "ねんちゃく" && isAbility(tgt.poke) ) return
    if ( tgt.poke.myRest_hp == 0 ) return
    if ( !itemList_berry.includes(tgt.poke.myItem) && !tgt.poke.myItem.includes("ジュエル") ) return

    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myItem} は 焼き尽くされた !`)
    tgt.poke.myItem = ""
    if ( tgt.poke.myAbility == "かるわざ" ) tgt.poke.myCondition.myUnburden = true

    return
}

// 10.防御側のもちもの
function effectWithDmg_defItem(poke,tgt) {
    if ( !isItem(tgt.poke) ) return

    const damage_6 = Math.floor(poke.myFull_hp / 6 * isDynamax(poke))
    const damage_8 = Math.floor(poke.myFull_hp / 8 * isDynamax(poke) * isRipen(tgt.poke))

    switch ( tgt.poke.myItem ) {
        case "ゴツゴツメット":
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) return
            itemDeclaration(tgt.poke)
            changeHP(poke, damage_6, "-")
            eatBerryInPinch(poke)
            return

        case "くっつきバリ":
            if ( poke.myMove.direct == "間接" ) return
            if ( poke.myItem ) return
            itemDeclaration(tgt.poke)
            poke.myItem = "くっつきバリ"
            tgt.poke.myItem = ""
            return

        case "ジャポのみ":
            if ( poke.myMove.nature != "物理" ) return
            itemDeclaration(tgt.poke)
            changeHP(poke, damage_8, "-")
            enableToRecycle(tgt.poke)
            eatBerryInPinch(poke)
            return

        case "レンブのみ":
            if ( poke.myMove.nature != "特殊" ) return
            itemDeclaration(tgt.poke)
            changeHP(poke, damage_8, "-")
            enableToRecycle(tgt.poke)
            eatBerryInPinch(poke)
            return

        case "じゃくてんほけん":
            if ( tgt.poke.myRest_hp == 0 ) return
            if ( tgt.effective <= 1 ) return
            itemDeclaration(tgt.poke)
            changeMyRank(tgt.poke, "atk", 2)
            changeMyRank(tgt.poke, "sp_atk", 2)
            enableToRecycle(tgt.poke)
            return

        case "じゅうでんち":
            if ( tgt.poke.myRest_hp == 0 ) return
            if ( poke.myMove.type != "でんき" ) return
            itemDeclaration(tgt.poke)
            changeMyRank(tgt.poke, "atk", 1)
            enableToRecycle(tgt.poke)
            return

        case "ゆきだま":
            if ( tgt.poke.myRest_hp == 0 ) return
            if ( poke.myMove.type != "こおり" ) return
            itemDeclaration(tgt.poke)
            changeMyRank(tgt.poke, "atk", 1)
            enableToRecycle(tgt.poke)
            return

        case "きゅうこん":
            if ( tgt.poke.myRest_hp == 0 ) return
            if ( poke.myMove.type != "みず" ) return
            itemDeclaration(tgt.poke)
            changeMyRank(tgt.poke, "sp_atk", 1)
            enableToRecycle(tgt.poke)
            return

        case "ひかりごけ":
            if ( tgt.poke.myRest_hp == 0 ) return
            if ( poke.myMove.type != "みず" ) return
            itemDeclaration(tgt.poke)
            changeMyRank(tgt.poke, "sp_def", 1)
            enableToRecycle(tgt.poke)
            return

        case "ふうせん":
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ふうせんがわれた !`)
            enableToRecycle(tgt.poke)
            return

        default:
            return
    }
}

// 11.防御側のばけのかわ/アイスフェイス
function effectWithDmg_mask(poke, tgt) {
    if ( !isAbility(tgt.poke) ) return

    switch ( tgt.poke.myAbility ) {
        case "ばけのかわ":
            if ( tgt.poke.myDisguise != "ばけたすがた" ) return
            abilityDeclaration(tgt.poke)
            changeHP(tgt.poke, Math.floor(tgt.poke.myFull_hp / 8 * isDynamax(tgt.poke)), "-")
            tgt.poke.myDisguise = "ばれたすがた"
            return

        case "アイスフェイス":
            if ( tgt.poke.myIce_face != "アイスフェイス" ) return
            if ( poke.myMove.nature != "物理" ) return
            abilityDeclaration(tgt.poke)
            formChange(tgt.poke, "コオリッポ(ナイスフェイス)", true)
            tgt.poke.myIce_face = "ナイスフェイス"
            return

        default:
            return
    }
}

//**************************************************
// 14.技の効果
//**************************************************

// ほのおタイプの攻撃技を受けたことによるこおり状態の回復
function moveEffect_melted(poke, tgt) {
    if ( tgt.poke.myAilment != "こおり" ) return
    if ( poke.myMove.type != "ほのお" ) return
    if ( tgt.substitute ) return

    resetAilment(tgt.poke)
    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の こおりがとけた !`)
    return
}

// 反動技による反動ダメージ (わるあがきも含む)
function moveEffect_recoil(poke, tgt) {
    const thisMove = moveList_recoil.filter( move => move.name == poke.myMove.name )
    if ( thisMove.length === 0 ) return
    if ( poke.myAbility == "いしあたま" && isAbility(poke) ) return

    const move = thisMove[0]
    changeHP(poke, Math.round(tgt.damage * move.rate), "-")
    eatBerryInPinch(poke)
    return
}

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

// うちおとす/サウザンアローによるうちおとす状態
function moveEffect_smackDown(poke, tgt) {
    if ( poke.myMove.name != "うちおとす" && poke.myMove.name != "サウザンアロー" ) return
    // 自身または対象がひんしの場合や、対象が身代わりで技を受けた場合、対象が接地している状態では、撃ち落とす状態にならない
    if ( tgt.poke.myRest_hp == 0 ) return
    if ( tgt.substitute ) return
    if ( onGround(tgt.poke) ) return

    // そらをとぶ・とびはねるを中断させる、フリーフォールは中断されない
    if ( tgt.poke.myCondition.mySky ) {
        tgt.poke.myCondition.mySky = false // そらをとぶ
        tgt.poke.myCondition.filling = false // ため技
    }

    tgt.poke.myCondition.myMagnet_rise = false // でんじふゆう
    tgt.poke.myCondition.myTelekinesis = false // テレキネシス
    tgt.poke.myCondition.mySmack_down  = true // うちおとす
    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 撃ち落とされて 地面に落ちた !`)

    return
}

// サウザンウェーブ/くらいつくによるにげられない状態
function moveEffect_cantEscape(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "サウザンウェーブ":
            if ( tgt.poke.myRest_hp == 0 ) return // 対象がひんし状態でないこと
            if ( tgt.poke.myType.includes("ゴースト") ) return // 対象がゴーストタイプでないこと
            if ( tgt.poke.myCondition.myCant_escape ) return // 対象が逃げられない状態でないこと
            if ( tgt.substitute ) return // 対象のみがわりが無効であること

            tgt.poke.myCondition.myCant_escape = poke.myID
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 逃げられなくなった !`)
            return

        case "くらいつく":
            if ( tgt.poke.myRest_hp == 0 ) return // 対象がひんし状態でないこと
            if ( poke.myCondition.myCant_escape ) return // 自分が逃げられない状態でないこと
            if ( tgt.poke.myCondition.myCant_escape ) return // 対象が逃げられない状態でないこと
            if ( poke.myType.includes("ゴースト") ) return // 自分がゴーストタイプでないこと
            if ( tgt.poke.myType.includes("ゴースト") ) return // 対象がゴーストタイプでないこと
            if ( tgt.substitute ) return // 対象のみがわりが無効であること

            poke.myCondition.myCant_escape = tgt.poke.myID
            tgt.poke.myCondition.myCant_escape = poke.myID
            writeLog(`お互いのポケモン は 逃げられなくなった !`)
            return

        default:
            return
    }
}

// プラズマフィストによるプラズマシャワー状態
function moveEffect_ionDeluge(poke, tgt) {
    if ( poke.myMove.name != "プラズマフィスト" ) return
    fieldStatus.myIon_deluge = true
    writeLog(`電気が駆け巡る !`)

    return
}

// オリジンズスーパーノヴァによるサイコフィールド状態
function moveEffect_genesisSupernova(poke, tgt) {
    if ( poke.myMove.name != "オリジンズスーパーノヴァ" ) return
    if ( fieldStatus.myPsychic ) return
    activateTerrain(poke, "psychic")

    return
}

// こうそくスピン/ラジアルエッジストームによる場の状態の解除
function moveEffect_clearField(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "こうそくスピン":
            if ( poke.myCondition.myLeech_seed ) {
                poke.myCondition.myLeech_seed = false
                writeLog(`${poke.myTN} の ${poke.myName} の やどりぎのタネが 消え去った`)
            }
            if ( poke.myCondition.myBind_turn ) {
                resetBind(poke)
                writeLog(`${poke.myTN} の ${poke.myName} は バインドから 解放された`)
            }
            if ( getMyField(poke).mySpikes > 0 ) {
                getMyField(poke).mySpikes = 0
                writeLog(`${poke.myTN} の場の まきびしが 消え去った`)
            }
            if ( getMyField(poke).myToxic_spikes > 0 ) {
                getMyField(poke).myToxic_spikes = 0
                writeLog(`${poke.myTN} の場の どくびしが 消え去った`)
            }
            if ( getMyField(poke).myStealth_rock ) {
                getMyField(poke).myStealth_rock = false
                writeLog(`${poke.myTN} の場の ステルスロックが 消え去った`)
            }
            if ( getMyField(poke).mySticky_web ) {
                getMyField(poke).mySticky_web = false
                writeLog(`${poke.myTN} の場の ねばねばネットが 消え去った`)
            }
            if ( getMyField(poke).mySteelsurge ) {
                getMyField(poke).mySteelsurge = false
                writeLog(`${poke.myTN} の場の キョダイコウジンが 消え去った`)
            }
            return

        case "ラジアルエッジストーム":
            if ( fieldStatus.myGrassy )   writeLog(`グラスフイールドが 消え去った`)
            if ( fieldStatus.myElectric ) writeLog(`エレキフイールドが 消え去った`)
            if ( fieldStatus.myMisty )    writeLog(`ミストフイールドが 消え去った`)
            if ( fieldStatus.myPsychic )  writeLog(`サイコフイールドが 消え去った`)
            resetTerrain()
            return

        default:
            return
    }
}

// ねっさのだいち/ねっとう/スチームバーストを受けたことによるこおり状態の回復
function moveEffect_melt(poke, tgt) {
    if ( tgt.poke.myAilment != "こおり" ) return
    if ( poke.myCondition.mySheer_force ) return // ちからずくが無効であること

    switch ( poke.myMove.name ) {
        case "スチームバースト":
        case "ねっさのだいち":
        case "ねっとう":
            resetAilment(poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の こおりがとけた`)
            return

        default:
            return
    }
}

// きつけを受けたことによるまひ状態の回復
function moveEffect_smellingSalts(poke, tgt) {
    if ( poke.myMove.name != "きつけ" ) return
    if ( tgt.poke.myAilment != "まひ" ) return
    resetAilment(poke)
    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 痺れが取れた`)
    return
}

// めざましビンタを受けたことによるねむり状態の回復
function moveEffect_wakeUpSlap(poke, tgt) {
    if ( poke.myMove.name != "めざましビンタ" ) return
    if ( tgt.poke.myAilment != "ねむり" ) return
    resetAilment(poke)
    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 目を覚ました`)
    return
}

// うたかたのアリアを受けたことによるやけど状態の回復
function moveEffect_sparklingAria(poke, tgt) {
    if ( poke.myMove.name != "うたかたのアリア" ) return
    if ( tgt.poke.myAilment != "やけど" ) return
    if ( poke.myCondition.mySheer_force ) return // ちからずくが無効であること
    resetAilment(poke)
    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の やけどが治った`)
    return
}

// ぶきみなじゅもんによるPPの減少
function moveEffect_eerieSpell(poke, tgt) {
    if ( poke.myMove.name != "ぶきみなじゅもん" ) return
    if ( poke.myCondition.mySheer_force ) return // ちからずくが無効であること
    if ( tgt.poke.myCondition.myHistory === [] ) return // 技を使用していること

    const lastMove = tgt.poke.myCondition.myHistory[0].name

    for ( let i = 0; i < 4; i++ ) {
        const move = tgt.poke[`myMove_${i}`]
        const PP = tgt.poke[`myRest_pp_${i}`]
        const minusPP = Math.min(3, PP)

        if ( PP == 0 ) continue
        if ( move != lastMove ) continue

        tgt.poke[`myRest_pp_${j}`] = PP - minusPP
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${move} の PPが${minusPP}減った`)
    }

    return
}

//**************************************************
// 15.特性の効果
//**************************************************

// 1.攻撃側のマジシャン/じしんかじょう/ビーストブースト/くろのいななき/しろのいななき
function abilityEffect_attack(poke, tgt) {
    if ( !isAbility(poke) )    return // 自分の特性が有効であること
    if ( poke.myRest_hp == 0 ) return // 自分がひんしでないこと

    switch ( poke.myAbility ) {
        case "マジシャン":
            if ( poke.myItem ) return
            if ( !tgt.poke.myItem ) return
            if ( cannotChangeItem(tgt.poke) ) return
            if ( tgt.poke.myAbility == "ねんちゃく" && isAbility(tgt.poke) ) return

            abilityDeclaration(poke)
            poke.myItem = tgt.poke.myItem
            tgt.poke.myItem = ""
            return

        case "じしんかじょう":
        case "しろのいななき":
            if ( tgt.poke.myRest_hp > 0 ) return
            abilityDeclaration(poke)
            changeMyRank(poke, "atk", 1)
            return

        case "くろのいななき":
            if ( tgt.poke.myRest_hp > 0 ) return
            abilityDeclaration(poke)
            changeMyRank(poke, "sp_atk", 1)
            return

        case "じんばいったい":
            if ( tgt.poke.myRest_hp > 0 ) return
            switch ( poke.myName ) {
                case "バドレックス(はくばじょうのすがた)":
                    writeLog(`${poke.myTN} の ${poke.myName} の 特性『しろのいななき』 !`)
                    changeMyRank(poke, "atk", 1)
                    return

                case "バドレックス(こくばじょうのすがた)":
                    writeLog(`${poke.myTN} の ${poke.myName} の 特性『くろのいななき』 !`)
                    changeMyRank(poke, "sp_atk", 1)
                    return
            }
            return
        
        case "ビーストブースト":
            if ( tgt.poke.myRest_hp > 0 ) return
            const value = [
                {parameter: "atk",    value: poke.myAtk}, 
                {parameter: "def",    value: poke.myDef}, 
                {parameter: "sp_atk", value: poke.mySp_atk}, 
                {parameter: "sp_def", value: poke.mySp_def}, 
                {parameter: "speed",  value: poke.mySpeed}, 
            ]

            value.sort( (a,b) => {
                if ( a.value > b.value ) return -1
                else return 1
            })

            abilityDeclaration(poke)
            changeMyRank(poke, value[0].parameter, 1)
            return
        
        default:
            return
    }
}

// 2.防御側のへんしょく/ぎゃくじょう
function abilityEffect_defense(poke, tgt) {
    if ( !isAbility(tgt.poke) )    return // 対象の特性が有効であること
    if ( tgt.poke.myRest_hp == 0 ) return // 対象がひんしでないこと

    switch ( poke.myAbility ) {
        case "へんしょく":
            if ( poke.myCondition.mySheer_force )        return // ちからずくが無効であること
            if ( tgt.poke.myType == [poke.myMove.type] ) return // すでに同じタイプでないこと

            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ${poke.myMove.type}タイプ になった`)
            tgt.poke.myType = [poke.myMove.type]
            return

        case "ぎゃくじょう":
            if ( !poke.myCondition.myBerserk ) return
            abilityDeclaration(tgt.poke)
            changeMyRank(tgt.poke, "sp_atk", 1)
            poke.myCondition.myBerserk = false
            return

        default:
            return
    }
}

//**************************************************
// 16.防御側のもちものの効果
//**************************************************

function defenseItemEffect_item(poke, tgt) {
    if ( !isItem(tgt.poke) )              return // 対象の持ち物が有効であること
    if ( tgt.poke.myRest_hp == 0 )        return // 対象がひんしでないこと
    if ( poke.myCondition.mySheer_force ) return // ちからずくが無効であること
    if ( tgt.substitute )                 return // みがわり状態でないこと
    if ( !tgt.damage )                    return // ダメージを受けていること

    // アッキのみ/タラプのみ
    // だっしゅつボタン/レッドカードによって手持ちに戻るまで
    switch ( tgt.poke.myItem ) {
        case "アッキのみ":
            if ( poke.myMove.nature != "物理" ) return
            itemDeclaration(tgt.poke)
            enableToRecycle(tgt.poke)
            changeMyRank(tgt.poke, "def", isRipen(tgt.poke))
            return

        case "タラプのみ":
            if ( poke.myMove.nature != "特殊" ) return
            itemDeclaration(tgt.poke)
            enableToRecycle(tgt.poke)
            changeRank(tgt.poke, "sp_def", isRipen(tgt.poke))
            return

        case "だっしゅつボタン":
            if ( !isBench(tgt.poke) ) return
            itemDeclaration(tgt.poke)
            enableToRecycle(tgt.poke)
            tgt.poke.myEject_button = tgt.poke.myPosition
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 手持ちに戻った`)
            toHand(tgt.poke)
            return

        case "レッドカード":
            if ( !isBench(poke) ) return
            if ( poke.myCondition.myDynamax ) return
            itemDeclaration(tgt.poke)
            enableToRecycle(tgt.poke)
            poke.myRed_card = poke.myPosition
            writeLog(`${poke.myTN} の ${poke.myName} は 手持ちに戻った`)
            toHand(poke)
            return

        default:
            return
    }
}