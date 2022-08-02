//**************************************************
// 3.1~2.状態/ 3.特性/ 4.持ち物の発動
//**************************************************

// 1.いやしのねがい/みかづきのまい/Zおきみやげ/Zすてゼリフによる回復
function landing_other1st_pray(poke) {
    const pray = getMyField(poke).myPray[poke.myPosition]
    if ( !isPray(poke, pray.name) ) return

    switch ( pray.name ) {
        case "いやしのねがい":
            writeLog(`${poke.myTN} の ${poke.myName} は 癒しの願いの効果を受けた !`)
            changeHP(poke, poke.myFull_hp - poke.myRest_hp, "+")
            resetAilment(poke)
            getMyField(poke).myPray[poke.myPosition].name = false
            return

        case "みかづきのまい":
            writeLog(`${poke.myTN} の ${poke.myName} は 三日月の舞の効果を受けた !`)
            changeHP(poke, poke.myFull_hp - poke.myRest_hp, "+")
            resetAilment(poke)
            for ( let i = 0; i < 4; i++ ) {
                poke[`myRest_pp_${i}`] = poke[`myFull_pp_${i}`]
            }
            getMyField(poke).myPray[poke.myPosition].name = false
            return

        case "Zおきみやげ":
        case "Zすてゼリフ":
            writeLog(`${poke.myTN} の ${poke.myName} は Zおきみやげの効果を受けた !`)
            changeHP(poke, poke.myFull_hp - poke.myRest_hp, "+")
            getMyField(poke).myPray[poke.myPosition].name = false
            return


    }
}

// 祈り技による回復発生判定
function isPray(poke, move) {
    // HP
    if ( poke.myRest_hp < poke.myFull_hp ) return true

    if ( move == "Zおきみやげ" ) return false
    if ( move == "Zすてゼリフ" ) return false

    // 状態異常
    if ( poke.myAilment ) return true

    if ( move == "いやしのねがい" ) return false

    // PP
    for ( let i = 0; i < 4; i++ ) {
        if ( poke[`myRest_pp_${i}`] < poke[`myFull_pp_${i}`]) return true
    }

    return false
}

// 2.設置技: 技が使用された順に発動
function landing_other1st_establish(poke) {
    if ( poke.myItem == "あつぞこブーツ" && isItem(poke)) return

    // まきびし
    if ( getMyField(poke).mySpikes && onGround(poke) ) {
        const damage = Math.floor(poke.myFull_hp / (10 - (getMyField(poke).mySpikes * 2)))
        writeLog(`${poke.myTN} の ${poke.myName} は まきびしを 踏んづけた !`)
        changeHP(poke, damage, "-")
    }
    // どくびし
    if ( getMyField(poke).myToxic_spikes && onGround(poke) ) {
        if ( poke.myType.includes("どく") ) {
            getMyField(poke).myToxic_spikes = 0
            writeLog(`${poke.myTN} の場の どくびしが消え去った !`)
        } else {
            if ( getMyField(poke).myToxic_spikes == 1 ) getAbnormal(poke, "どく")
            else if ( getMyField(poke).myToxic_spikes == 2 ) getAbnormal(poke, "もうどく")
        }
    }
    // ステルスロック
    if ( getMyField(poke).myStealth_rock ) {
        const rate = compatibilityRate("いわ", poke.myType, false)
        const damage = Math.max(Math.floor(poke.myFull_hp * rate / 8), 1)
        writeLog(`${poke.myTN} の ${poke.myName} に 尖った岩が食い込んだ !`)
        changeHP(poke, damage, "-")
    }
    // ねばねばネット
    if ( getMyField(poke).mySticky_web && onGround(poke) ) {
        writeLog(`${poke.myTN} の ${poke.myName} は ねばねばネットに引っかかった !`)
        changeRank(poke, "speed", -1, false)
    }
    // キョダイコウジン
    if ( getMyField(poke).mySteelsurge ) {
        const rate = compatibilityRate("はがね", poke.myType, false)
        const damage = Math.max(Math.floor(poke.myFull_hp * rate / 8), 1)
        writeLog(`${poke.myTN} の ${poke.myName} に 尖った鋼が食い込んだ !`)
        changeHP(poke, damage, "-")
    }
}

// 3.場に出たときに発動する特性
function landing_other1st_ability(poke){
    if ( !isAbility(poke) ) return

    switch ( poke.myAbility ) {
        // 場に出た時に発動する特性
        case "あめふらし":
            if ( poke.myName == "カイオーガ" && poke.myItem == "あいいろのたま" && isItem(poke) ) return // ゲンシカイキ
            if ( fieldStatus.myRainy )      return // 雨状態
            if ( fieldStatus.myDrought )    return // 大日照り状態
            if ( fieldStatus.myHeavy_rain ) return // 大雨状態
            if ( fieldStatus.myTurbulence ) return // 乱気流状態
            abilityDeclaration(poke)
            activateWeather(poke, "あめ")
            return
        
        case "いかく":
            abilityDeclaration(poke)
            for ( const _poke of oppPokeInBattle(poke) ) {
                // ミラーアーマーによる反射
                if ( _poke.myAbility == "ミラーアーマー" && isAbility(poke) ) {
                    abilityDeclaration(_poke)
                    continue
                }
                // みがわり状態には無効
                if ( _poke.myCondition.mySubstitute ) {
                    writeLog(`${_poke.myTN} の ${_poke.myName} には 効果がないようだ....`)
                    continue
                }
                // 特定の特性には無効
                const ability = ["きもったま", "せいしんりょく", "どんかん", "マイペース"]
                if ( ability.includes(_poke.myAbility) && isAbility(_poke) ) {
                    abilityDeclaration(_poke)
                    writeLog(`${_poke.myTN} の ${_poke.myName} には 効果がないようだ....`)
                    continue
                }
                // 効果あり
                changeRank(_poke, "atk", -1, true)
                if ( _poke.myAbility == "びびり" && isAbility(_poke) ) {
                    abilityDeclaration(_poke)
                    changeMyRank(_poke, "speed", 1)
                }
                if ( _poke.myItem == "ビビリだま" && isItem(_poke) ) {
                    itemDeclaration(_poke)
                    enableToRecycle(_poke)
                    changeMyRank(_poke, "speed", 1)
                }
            }
            return
        
        case "エアロック":
        case "ノーてんき":
            abilityDeclaration(poke)
            writeLog(`天候の影響がなくなった !`)
            return
        
        case "エレキメイカー":
            if ( fieldStatus.myElectric ) return
            abilityDeclaration(poke)
            activateTerrain(poke, "electric")
            return
        
        case "オーラブレイク":
            return

        case "おみとおし":
            abilityDeclaration(poke)
            for ( const _poke of oppPokeInBattle(poke) ) {
                if ( !_poke.myItem ) continue
                writeLog(`${_poke.myTN} の ${_poke.myName} の ${_poke.myItem} を お見通しだ !`)
            }
            return
        
        case "おわりのだいち":
            if ( fieldStatus.myDrought ) return
            abilityDeclaration(poke)
            activateWeather(poke, "おおひでり")
            return
        
        case "かたやぶり":
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は かたやぶりだ !`)
            return
        
        case "かわりもの":
            return
            if (you["con" + con.child].p_con.includes("状態変化『みがわり』")) return
            if (you["con" + con.child].p_con.includes("状態変化『へんしん』")) return
            if (you["con" + con.child].p_con.includes("状態変化『イリュージョン』")) return
            if (con.p_con.includes("技『スキルスワップ』")) return
            metamon(me, you, con)
        
        case "きけんよち":
            if ( !isAnticipation(poke) ) return
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は 身震いした !`)
            return
        
        case "きみょうなくすり":
            if ( !isCuriousMedicine(poke) ) return
            abilityDeclaration(poke)
            writeLog(`味方のランク変化がリセットされた !`)
            for ( const _poke of myPokeInBattle(poke) ) {
                if ( _poke.myID == poke.myID ) continue // 自分のランクは変化しない
                for ( const para of allParameter() ) {
                    _poke[`myRank_${para}`] = 0
                }
            }
            return
        
        case "グラスメイカー":
            if ( fieldStatus.myGrassy ) return
            abilityDeclaration(poke)
            activateTerrain(poke, "grassy")
            return
        
        case "サイコメイカー":
            if ( fieldStatus.myPsychic ) return
            abilityDeclaration(poke)
            activateTerrain(poke, "psychic")
            return
            
        case "すなおこし":
            if ( fieldStatus.mySandstorm )  return // 砂嵐状態
            if ( fieldStatus.myDrought )    return // 大日照り状態
            if ( fieldStatus.myHeavy_rain ) return // 大雨状態
            if ( fieldStatus.myTurbulence ) return // 乱気流状態
            abilityDeclaration(poke)
            activateWeather(poke, "すなあらし")
            return
        
        case "スロースタート":
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は 調子が上がらない !`)
            poke.myCondition.mySlow_start = 1
            return
        
        case "ぜったいねむり":
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は 夢うつつの状態 !`)
            return
        
        case "ダークオーラ":
            return

        case "ターボブレイズ":
            return

        case "ダウンロード":
            abilityDeclaration(poke)
            let B_AV = 0
            let D_AV = 0
            for ( const _poke of oppPokeInBattle(poke) ) {
                B_AV += isValueIncludingRank(_poke.myDef, _poke.myRank_def, false)
                D_AV += isValueIncludingRank(_poke.mySp_def, _poke.myRank_sp_def, false)
            }

            if ( B_AV >= D_AV ) changeRank(poke, "sp_atk", 1, false)
            else changeRank(poke, "atk", 1, false)
            
            return
        
        case "テラボルテージ":
            return

        case "デルタストリーム":
            if ( fieldStatus.myTurbulence ) return
            abilityDeclaration(poke)
            activateWeather(poke, "らんきりゅう")
            return
        
        case "トレース":
            const traceable = []
            for ( const _poke of oppPokeInBattle(poke) ) {
                if ( abilityList_disable_trace.includes(_poke.myAbility) ) continue
                traceable.push(_poke.myAbility)
            }
            if ( traceable.length === 0 ) return

            abilityDeclaration(poke)
            poke.myAbility = shuffle(traceable)[0]
            writeLog(`${poke.myTN} の ${poke.myName} は 特性『${poke.myAbility}』になった !`)
            landing_other1st_ability(poke)
            return

        case "はじまりのうみ":
            if ( fieldStatus.myHeavy_rain ) return
            abilityDeclaration(poke)
            activateWeather(poke, "おおあめ")
            return
        
        case "バリアフリー":
            abilityDeclaration(poke)
            for ( const field of [myField, oppField] ) {
                if ( field.myReflect ) {
                    writeLog(`${field.myTN} の場の リフレクターが破壊された !`)
                    field.myReflect = false
                    field.myReflect_cray = false
                }
                if ( field.myLight_screen ) {
                    writeLog(`${field.myTN} の場の ひかりのかべが破壊された !`)
                    field.myLight_screen = false
                    field.myLight_cray = false
                }
                if ( field.myAurora_vail ) {
                    writeLog(`${field.myTN} の場の オーロラベールが破壊された !`)
                    field.myAurora_vail = false
                    field.myAurora_cray = false
                }
            }
            return
        

        case "ひでり":
            if ( poke.myName == "グラードン" && poke.myItem == "べにいろのたま" && isItem(poke) ) return
            if ( fieldStatus.mySunny )      return // 晴れ状態
            if ( fieldStatus.myDrought )    return // 大日照り状態
            if ( fieldStatus.myHeavy_rain ) return // 大雨状態
            if ( fieldStatus.myTurbulence ) return // 乱気流状態
            abilityDeclaration(poke)
            activateWeather(poke, "にほんばれ")
            return
        
        case "フェアリーオーラ":
            return

        case "ふくつのたて":
            abilityDeclaration(poke)
            changeRank(poke, "def", 1, false)
            return
        
        case "ふとうのけん":
            abilityDeclaration(poke)
            changeRank(poke, "atk", 1, false)
            return
        
        case "プレッシャー":
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は プレッシャーを放っている !`)
            return
        
        case "ミストメイカー":
            if ( fieldStatus.myMisty ) return
            abilityDeclaration(poke)
            activateTerrain(poke, "misty")
            return

        case "ゆきふらし":
            if ( fieldStatus.myGraupel )    return // 霰状態
            if ( fieldStatus.myDrought )    return // 大日照り状態
            if ( fieldStatus.myHeavy_rain ) return // 大雨状態
            if ( fieldStatus.myTurbulence ) return // 乱気流状態
            abilityDeclaration(poke)
            activateWeather(poke, "あられ")
            return
        
        case "よちむ":
            const forewarn = {name: [], power: 0}
            for ( const _poke of oppPokeInBattle(poke) ) {
                for ( let i = 0; i < 4; i++ ) {
                    const move =  moveSearchByName(_poke[`myMove_${i}`])
                    if ( move.nature == "変化" ) continue
                    
                    let power = move.power
                    if ( moveList_forewarn.damage80.includes(move.name) ) power = 80
                    if ( moveList_forewarn.damage120.includes(move.name) ) power = 120
                    if ( moveList_forewarn.damage150.includes(move.name) ) power = 150
                    
                    if ( power < forewarn.power ) continue
                    if ( power == forewarn.power ) forewarn.name.push(move.name)
                    if ( power > forewarn.power ) {
                        forewarn.name = [move.name]
                        forewarn.power = power
                    }
                }
            }
            abilityDeclaration(poke)
            const forewarnMove = shuffle(forewarn.name)[0]
            writeLog(`${poke.myTN} の ${poke.myName} は ${forewarnMove} を読み取った !`)
            return

        
        // 状態異常を治す特性
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


// きけんよち発生判定
function isAnticipation(poke) {
    for ( const _poke of oppPokeInBattle(poke) ) {
        for ( let i = 0; i < 4; i++ ) {
            const move = moveSearchByName(_poke[`myMove_${i}`])
            if ( move.nature == "変化" ) continue
            if ( oneShot.includes(move.name) ) return true
            if ( compatibilityRate(move.type, _poke.myType, false) > 1 ) return true
        }
    }
    return false
}

// きみょうなくすり発生判定
function isCuriousMedicine(poke) {
    for ( const _poke of myPokeInBattle(poke) ) {
        if ( _poke.myID == poke.myID ) continue // 自分のランクは変化しない
        for ( const para of allParameter() ) {
            if ( _poke[`myRank_${para}`] == 0 ) continue
            return true
        }
    }
    return false
}

// 4.ふうせん/きのみ/きのみジュース/メンタルハーブ
function landing_other1st_item(poke) {
    if ( !isItem(poke) ) return

    switch ( poke.myItem ) {
        case "ふうせん":
            if ( fieldStatus.myGravity ) return
            writeLog(`${poke.myTN} の ${poke.myName} は ふうせんで浮かんでいる !`)
            return

        case "メンタルハーブ":
            if ( !poke.myCondition.myHeal_block ) return
            enableToRecycle(poke)
            poke.myCondition.myHeal_block = false
            writeLog(`${poke.myTN} の ${poke.myName} は メンタルハーブで かいふくふうじが解除された !`)
            return
    }

    // きのみ
    eatBerryInPinch(poke)
    eatBerryInAbnormal(poke)

    return
}

//**************************************************
// 4.一部の特性(1)/場の状態による持ち物(2)/ゲンシカイキ(3)の発動
//**************************************************

// 1.一部の特性
function landing_other2nd_ability(poke) {
    if ( !isAbility(poke) ) return

    switch ( poke.myAbility ) {
        case "ぎたい":
            return
            
        case "ぎょぐん":
            if ( poke.myRest_hp <= poke.myFull_hp / 4 ) return
            if ( poke.myLevel < 20 ) return
            if ( poke.myName != "ヨワシ(たんどくのすがた)" ) return
            abilityDeclaration(poke)
            formChange(poke, "ヨワシ(むれたすがた)", true)
            return

        case "リミットシールド":
            if ( poke.myRest_hp <= poke.myFull_hp / 2 ) return
            if ( poke.myName != "メテノ(コア)" ) return
            abilityDeclaration(poke)
            formChange(poke, "メテノ(りゅうせいのすがた)", true)
            return
    }
}

// 2.場の状態による持ち物
function landing_other2nd_item(poke) {
    if ( !isItem(poke) ) return

    // シード系アイテム
    landing_other2nd_seed(poke)

    // ルームサービス
    switch ( poke.myItem ) {
        case "ルームサービス":
            if ( !fieldStatus.myTrick_room ) return
            if ( poke.myRank_speed == -6 ) return
            itemDeclaration(poke)
            changeRank(poke, "speed", -1, false)
            enableToRecycle(poke)
            return
    }
}

function landing_other2nd_seed(poke) {
    if ( !isItem(poke) ) return

    switch ( poke.myItem ) {
        case "エレキシード":
            if ( !fieldStatus.myElectric ) return
            if ( poke.myRank_def == 6 ) return
            itemDeclaration(poke)
            changeRank(poke, "def", 1, false)
            enableToRecycle(poke)
            return

        case "グラスシード":
            if ( !fieldStatus.myGrassy ) return
            if ( poke.myRank_def == 6 ) return
            itemDeclaration(poke)
            changeRank(poke, "def", 1, false)
            enableToRecycle(poke)
            return

        case "サイコシード":
            if ( !fieldStatus.myPsychic ) return
            if ( poke.myRank_sp_def == 6 ) return
            itemDeclaration(poke)
            changeRank(poke, "sp_def", 1, false)
            enableToRecycle(poke)
            return

        case "ミストシード":
            if ( fieldStatus.myAbilityMisty ) return
            if ( poke.myRank_sp_def == 6 ) return
            itemDeclaration(poke)
            changeRank(poke, "sp_def", 1, false)
            enableToRecycle(poke)
            return
    }
}

// 3.ゲンシカイキ
function landing_other2nd_primalReversion(poke) {
    if ( !isItem(poke) ) return

    switch ( poke.myName ) {
        case "カイオーガ":
            if ( poke.myItem != "あいいろのたま" ) return
            writeLog(`${poke.myTN} の ${poke.myName} は ゲンシカイキした !`)
            formChange(poke, "ゲンシカイオーガ", true)
            return

        case "グラードン":
            if ( poke.myItem != "べにいろのたま" ) return
            writeLog(`${poke.myTN} の ${poke.myName} は ゲンシカイキした !`)
            formChange(poke, "ゲンシグラードン", true)
            return
    }
}

//**************************************************
// 5.フラワーギフト/てんきや/アイスフェイス
//**************************************************

// フラワーギフト
function landing_weather_flowerGift(poke) {
    if ( !isAbility(poke) ) return
    if ( poke.myAbility != "フラワーギフト" ) return

    switch ( poke.myName ) {
        case "チェリム":
            if ( !isSunny(poke) ) return
            abilityDeclaration(poke)
            formChange(poke, "チェリム(ポジフォルム)", true)
            return

        case "チェリム(ポジフォルム)":
            if ( isSunny(poke) ) return
            abilityDeclaration(poke)
            formChange(poke, "チェリム", true)
            return
    }
}

// てんきや
function landing_weather_forecast(poke) {
    if ( !isAbility(poke) ) return
    if ( poke.myAbility != "てんきや" ) return

    switch ( true ) {
        case isSunny(poke):
            if ( poke.myName == "ポワルン(たいようのすがた)" ) return
            abilityDeclaration(poke)
            formChange(poke, "ポワルン(たいようのすがた)", true)
            return

        case isRainy(poke):
            if ( poke.myName == "ポワルン(あまみずのすがた)" ) return
            abilityDeclaration(poke)
            formChange(poke, "ポワルン(あまみずのすがた)", true)
            return

        case isSnowy(poke):
            if ( poke.myName == "ポワルン(ゆきぐものすがた)" ) return
            abilityDeclaration(poke)
            formChange(poke, "ポワルン(ゆきぐものすがた)", true)
            return

        default:
            if ( poke.myName != "ポワルン" ) return
            abilityDeclaration(poke)
            formChange(poke, "ポワルン", true)
            return
    }
}

// アイスフェイス
function landing_weather_iceFace(poke) {
    if ( !isAbility(poke) ) return
    if ( poke.myAbility != "アイスフェイス" ) return
    if ( poke.myName != "コオリッポ(ナイスフェイス)" ) return
    if ( !isSnowy(poke) ) return

    abilityDeclaration(poke)
    formChange(poke, "コオリッポ(アイスフェイス)", true)
    tgt.poke.myIce_face = "アイスフェイス"
    return
}