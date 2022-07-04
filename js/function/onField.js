// 1.かがくへんかガスの発動
function neutralizingGas( poke ) {
    if ( poke.myAbility != "かがくへんかガス" ) return
    if ( !isAbility(poke) ) return

    abilityDeclaration( poke )
    writeLog( `あたりに かがくへんかガスが 充満した !`)
}

// 2.きんちょうかん/じんばいったいの発動
function unnerve( poke ) {
    if ( !isAbility(poke) ) return

    if ( poke.myAbility == "きんちょうかん" ) {
        abilityDeclaration(poke)
        writeLog(`${getOppParty(poke)[0].myTN} のポケモンは 緊張して きのみが食べられなくなった !`)
    }

    if ( poke.myAbility == "じんばいったい" ) {
        abilityDeclaration(poke)
        writeLog(`${poke.myTN} の ${poke.myName} は ふたつの特性を合わせ持つ !`)
        writeLog(`${poke.myTN} の ${poke.myName} の 特性『きんちょうかん』 !`)
        writeLog(`${getOppParty(poke)[0].myTN} のポケモンは 緊張して きのみが食べられなくなった !`)
    }
}

// 3.1~2.状態/ 3.特性/ 4.持ち物の発動
function actAbilityEtc( poke ) {
    // 1.いやしのねがい/みかづきのまい/Zおきみやげ/Zすてゼリフによる回復
    /*
    if (me.f_con.includes("いやしのねがい：" + con.child) && (con.last_HP < con.full_HP || con.abnormal != "")){
        writeLog(user0, user1, con.TN + "　の　いやしのねがいが　発動した！" + "\n")
        con.last_HP = con.full_HP
        con.abnormal = ""
        removeText(me.f_con, "いやしのねがい：" + con.child)
    }
    if (me.f_con.includes("みかづきのまい（"+con.child+"）") && (con.last_HP < con.full_HP || con.abnormal != "")){
        let check = 0
        for (let i = 0; i < 4; i++){
            if (con["last_" + i] == con["PP_" + i]){
                check += 1
            }
        }
        if (check != 4){
            writeLog(user0, user1, con.TN + "　の　みかづきのまいが　発動した！" + "\n")
            con.last_HP = con.full_HP
            con.abnormal = ""
            for (let i = 0; i < 4; i++){
                con["last_" + i] = con["PP_" + i]
            }
            removeText(me.f_con, "みかづきのまい（"+con.child+"）")
        }
    }
    if (con.last_HP < con.full_HP){
        if (me.f_con.includes("Zおきみやげ（"+con.child+"）")){
            writeLog(user0, user1, con.TN + "　の　Zおきみやげが　発動した！" + "\n")
            con.last_HP = con.full_HP
            removeText(me.f_con, "Zおきみやげ（"+con.child+"）")
        } else if (me.f_con.includes("Zすてゼリフ（"+con.child+"）")){
            writeLog(user0, user1, con.TN + "　の　Zすてゼリフが　発動した！" + "\n")
            con.last_HP = con.full_HP
            removeText(me.f_con, "Zすてゼリフ（"+con.child+"）")
        }
    }
    */
    // 2.設置技: 技が使用された順に発動
    if ( !(poke.myItem == "あつぞこブーツ" && isItem(poke)) ) {
        // まきびし
        if ( isField(poke).mySpikes && onGround(poke) ) {
            const damage = Math.floor(poke.myFull_hp / (10 - (isField(poke).mySpikes * 2)))
            writeLog(`${poke.myTN} の ${poke.myName} は まきびしを 踏んづけた !`)
            changeHP(poke, damage, "-")
        }
        // どくびし
        if ( isField(poke).myToxic_spikes && onGround(poke) ) {
            if ( poke.myType.includes("どく") ) {
                isField(poke).myToxic_spikes = 0
                writeLog(`${poke.myTN} の場の どくびしが消え去った !`)
            } else {
                if ( isField(poke).myToxic_spikes == 1 ) getAbnormal(poke, "どく")
                else if ( isField(poke).myToxic_spikes == 2 ) getAbnormal(poke, "もうどく")
            }
        }
        // ステルスロック
        if ( isField(poke).myStealth_rock ) {
            const rate = 1 // compatibilityCheck()
            const damage = Math.max(Math.floor(poke.myFull_hp * rate / 8), 1)
            writeLog(`${poke.myTN} の ${poke.myName} に 尖った岩が食い込んだ !`)
            changeHP(poke, damage, "-")
        }
        // ねばねばネット
        if ( isField(poke).mySticky_web && onGround(poke) ) {
            writeLog(`${poke.myTN} の ${poke.myName} は ねばねばネットに引っかかった !`)
            changeRank(poke, "speed", -1, false)
        }
        // キョダイコウジン
        if ( isField(poke).mySteelsurge ) {
            const rate = 1 // compatibilityCheck()
            const damage = Math.max(Math.floor(poke.myFull_hp * rate / 8), 1)
            writeLog(`${poke.myTN} の ${poke.myName} に 尖った鋼が食い込んだ !`)
            changeHP(poke, damage, "-")
        }
    }
    // 3.場に出たときに発動する特性
    activateAbility(poke)
    // 4.ふうせん/きのみ/きのみジュース/メンタルハーブ
    if ( isItem(poke) ) {
        if ( poke.myItem == "ふうせん" && !fieldStatus.myGravity ) {
            writeLog(`${poke.myTN} の ${poke.myName} は ふうせんで浮かんでいる !`)
        }
        if ( poke.myItem == "メンタルハーブ" && poke.myCondition.myHeal_block ) {
            enableToRecycle(poke)
            poke.myCondition.myHeal_block = false
            writeLog(`${poke.myTN} の ${poke.myName} は メンタルハーブで かいふくふうじが解除された !`)
        }
        eatBerryInPinch(poke)
        eatBerryInAbnormal(poke)
    }
    
    
}

// 4.リミットシールド/ぎょぐん/ゲンシカイキによるフォルムチェンジ[2][3]
function abilityToChangeForm(poke){
    // 1.一部の特性
    if ( isAbility(poke) ){
        if ( poke.myAbility == "ぎたい" ) {
            
        }
        if ( poke.myAbility == "ぎょぐん" && poke.myRest_hp > poke.myFull_hp / 4 && poke.myLevel >= 20 && poke.myName == "ヨワシ(たんどくのすがた)" ) {
            abilityDeclaration(poke)
            formChange(poke, "ヨワシ(むれたすがた)", true)
        }
        if ( poke.myAbility == "リミットシールド" && poke.myRest_hp > poke.myFull_hp / 2 && poke.myName == "メテノ(コア)" ) {
            abilityDeclaration(poke)
            formChange(poke, "メテノ(りゅうせいのすがた)", true)
        }
    }
    // 2.場の状態による持ち物
    if ( isItem(poke) ) {
        activateSeed(poke)
        if ( poke.myItem == "ルームサービス" && fieldStatus.myTrick_room && poke.myRank_speed > -6 ) {
            itemDeclaration(poke)
            changeRank(poke, "speed", -1, false)
            enableToRecycle(poke)
        }
    }
    // 3.ゲンシカイキ
    if ( poke.myName == "カイオーガ" && poke.myItem == "あいいろのたま" && isItem(poke) ) {
        writeLog(`${poke.myTN} の ${poke.myName} は ゲンシカイキした !`)
        formChange(poke, "ゲンシカイオーガ", true)
    }
    if ( poke.myName == "グラードン" && poke.myItem == "べにいろのたま" && isItem(poke) ) {
        writeLog(`${poke.myTN} の ${poke.myName} は ゲンシカイキした !`)
        formChange(poke, "ゲンシグラードン", true)
    }
}

function activateSeed(poke) {
    if ( isItem(poke) ) {
        if ( poke.myItem == "エレキシード" && fieldStatus.myElectric && poke.myRank_def < 6 ) {
            itemDeclaration(poke)
            changeRank(poke, "def", 1, false)
            enableToRecycle(poke)
        }
        if ( poke.myItem == "グラスシード" && fieldStatus.myGrassy && poke.myRank_def < 6 ) {
            itemDeclaration(poke)
            changeRank(poke, "def", 1, false)
            enableToRecycle(poke)
        }
        if ( poke.myItem == "サイコシード" && fieldStatus.myPsychic && poke.myRank_sp_def < 6 ) {
            itemDeclaration(poke)
            changeRank(poke, "sp_def", 1, false)
            enableToRecycle(poke)
        }
        if ( poke.myItem == "ミストシード" && fieldStatus.myAbilityMisty && poke.myRank_sp_def < 6 ) {
            itemDeclaration(poke)
            changeRank(poke, "sp_def", 1, false)
            enableToRecycle(poke)
        }
    }
}

// 5.フラワーギフト/てんきや/アイスフェイス
function weatherAbility(poke){
    if ( !isWeather() ) return
    if ( !isAbility(poke) ) return

    // フラワーギフト
    if ( poke.myAbility == "フラワーギフト" ) {
        if ( isSunny(poke) && poke.myName == "チェリム" ) {
            abilityDeclaration(poke)
            formChange(poke, "チェリム(ポジフォルム)", true)
        } else if ( !isSunny(poke) && poke.myName == "チェリム(ポジフォルム)" ) {
            abilityDeclaration(poke)
            formChange(poke, "チェリム", true)
        }
    }
    // てんきや
    if ( poke.myAbility == "てんきや" ) {
        if ( isSunny(poke) && poke.myName != "ポワルン(たいようのすがた)" ) {
            abilityDeclaration(poke)
            formChange(poke, "ポワルン(たいようのすがた)", true)
        } else if ( isRainy(poke) && poke.myName != "ポワルン(あまみずのすがた)" ) {
            abilityDeclaration(poke)
            formChange(poke, "ポワルン(あまみずのすがた)", true)
        } else if ( isSnowy(poke) && poke.myName != "ポワルン(ゆきぐものすがた)" ) {
            abilityDeclaration(poke)
            formChange(poke, "ポワルン(ゆきぐものすがた)", true)
        } else if ( poke.myName != "ポワルン" ) {
            abilityDeclaration(poke)
            formChange(poke, "ポワルン", true)
        }
    }
    // アイスフェイス
    if ( poke.myAbility == "アイスフェイス" && poke.myName == "コオリッポ(ナイスフェイス)" && isSnowy(poke) ) {
        abilityDeclaration(poke)
        formChange(poke, "コオリッポ(アイスフェイス)", true)
    }
}

// 6. しろいハーブ
function whiteHerb(poke){
    if ( poke.myItem == "しろいハーブ" && isItem(poke) ) {
        let check = false
        const parameter = ["atk", "def", "sp_atk", "sp_def", "speed", "accureacy", "evasion"]
        for ( const para of parameter ) {
            if ( poke[`myRank_${para}`] < 0 ) {
                poke[`myRank_${para}`] = 0
                check = true
            }
        }
        if ( check ) {
            writeLog(`${poke.myTN} の ${poke.myName} は しろいハーブで 下がった能力を元に戻した`)
            enableToRecycle(poke)
        }
    }
}

// 7.だっしゅつパックによる交代、交代先の繰り出し
function ejectPack(poke){
    return
    if ( poke.myItem == "だっしゅつパック" && con.p_con.includes("ランク下降")){
        writeLog(me, you, con.TN + "　の　" + con.name + "は　だっしゅつパックで手持ちに戻った" + "\n")
        me.f_con += "選択中（" + con.child + "）" + "\n"
        enableToRecycle(me, con)
        //come_back_pokemon(team)
    
        writeLog(me, you, con.TN + "　は　戦闘に出すポケモンを選んでください" + "\n")
        return true
    }
}

function activateAbility(poke){
    if ( !isAbility(poke) ) return

    // 場に出た時に発動する特性
    if ( poke.myAbility == "あめふらし" ) {
        if ( poke.myName == "カイオーガ" && poke.myItem == "あいいろのたま" && isItem(poke) ) return // ゲンシカイキ
        if ( fieldStatus.myRainy )      return // 雨状態
        if ( fieldStatus.myDrought )    return // 大日照り状態
        if ( fieldStatus.myHeavy_rain ) return // 大雨状態
        if ( fieldStatus.myTurbulence ) return // 乱気流状態
        abilityDeclaration(poke)
        activateWeather(poke, "rainy")
        return
    }
    if ( poke.myAbility == "いかく" ) {
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
    }
    if ( poke.myAbility == "エアロック" || poke.myAbility == "ノーてんき" ) {
        abilityDeclaration(poke)
        writeLog(`天候の影響がなくなった !`)
        return
    }
    if ( poke.myAbility == "エレキメイカー" ) {
        if ( fieldStatus.myElectric ) return
        abilityDeclaration(poke)
        activateTerrain(poke, "electric")
        return
    }
    if ( poke.myAbility == "オーラブレイク" ) {

    }
    if ( poke.myAbility == "おみとおし" ) {
        abilityDeclaration(poke)
        for ( const _poke of oppPokeInBattle(poke) ) {
            writeLog(`${_poke.myTN} の ${_poke.myName} の ${_poke.myItem} を お見通しだ !`)
        }
        return
    }
    if ( poke.myAbility == "おわりのだいち" ) {
        if ( fieldStatus.myDrought ) return
        abilityDeclaration(poke)
        activateWeather(poke, "drought")
        return
    }
    if ( poke.myAbility == "かたやぶり" ) {
        abilityDeclaration(poke)
        writeLog(`${poke.myTN} の ${poke.myName} は かたやぶりだ !`)
        return
    }
    if ( poke.myAbility == "かわりもの" ) {
        return
        if (you["con" + con.child].p_con.includes("状態変化『みがわり』")) return
        if (you["con" + con.child].p_con.includes("状態変化『へんしん』")) return
        if (you["con" + con.child].p_con.includes("状態変化『イリュージョン』")) return
        if (con.p_con.includes("技『スキルスワップ』")) return
        metamon(me, you, con)
    }
    if ( poke.myAbility == "きけんよち" ) {
        return
        let check = 0
        for (const yourcon of [you.con0, you.con1]){
            for (let i = 0; i < 4; i++){
                if (yourcon["move_" + i] != "" ) {
                    let move = moveSearchByName(yourcon["move_" + i])
                    if ((compatibilityCheck(me, you, con, yourcon, move) > 1 && move.nature != "変化") || oneShot.includes(move.name)){
                        check += 1
                    }
                }
            }
        }
        if (check > 0){
            writeLog(me, you, con.TN + "　の　" + con.name + "　は　身震いした！" + "\n")
        }
    }
    if ( poke.myAbility == "きみょうなくすり" ) {
        abilityDeclaration(poke)
        return
    }
    if ( poke.myAbility == "グラスメイカー" ) {
        if ( fieldStatus.myGrassy ) return
        abilityDeclaration(poke)
        activateTerrain(poke, "grassy")
        return
    }
    if ( poke.myAbility == "サイコメイカー" ) {
        if ( fieldStatus.myPsychic ) return
        abilityDeclaration(poke)
        activateTerrain(poke, "psychic")
        return
    }
    if ( poke.myAbility == "すなおこし" ) {
        if ( fieldStatus.mySandstorm )  return // 砂嵐状態
        if ( fieldStatus.myDrought )    return // 大日照り状態
        if ( fieldStatus.myHeavy_rain ) return // 大雨状態
        if ( fieldStatus.myTurbulence ) return // 乱気流状態
        abilityDeclaration(poke)
        activateWeather(poke, "sandstorm")
        return
    }
    if ( poke.myAbility == "スロースタート" ) {
        abilityDeclaration(poke)
        writeLog(`${poke.myTN} の ${poke.myName} は 調子が上がらない !`)
        poke.myCondition.mySlow_start = 1
        return
    }
    if ( poke.myAbility == "ぜったいねむり" ) {
        abilityDeclaration(poke)
        writeLog(`${poke.myTN} の ${poke.myName} は 夢うつつの状態 !`)
        return
    }
    if ( poke.myAbility == "ダークオーラ" ) {

    }
    if ( poke.myAbility == "ターボブレイズ" ) {

    }
    if ( poke.myAbility == "ダウンロード" ) {
        abilityDeclaration(poke)
        let B_AV = 0
        let D_AV = 0
        for ( const _poke of oppPokeInBattle(poke) ) {
            if ( _poke.myRank_def > 0 ) {
                B_AV += Math.floor((_poke.myDef * (2 + _poke.myRank_def)) / 2)
            } else {
                B_AV += Math.floor((_poke.myDef * 2) / (2 - _poke.myRank_def))
            }
            if ( _poke.myRank_sp_def > 0 ) {
                D_AV += Math.floor((_poke.mySp_def * (2 + _poke.myRank_sp_def)) / 2)
            } else {
                D_AV += Math.floor((_poke.mySp_def * 2) / (2 - _poke.myRank_sp_def))
            }
        }

        if ( B_AV >= D_AV ) changeRank(poke, "sp_atk", 1, false)
        else changeRank(poke, "atk", 1, false)
        
        return
    }
    if ( poke.myAbility == "テラボルテージ" ) {

    }
    if ( poke.myAbility == "デルタストリーム" ) {
        if ( fieldStatus.myTurbulence ) return
        abilityDeclaration(poke)
        activateWeather(poke, "turbulence")
        return
    }
    if ( poke.myAbility == "トレース" ) {
        return
        if ( abilityList_disable_trace.includes() ) return
        writeLog(me, you, con.TN + "　の　" +　con.name + "　の　特性『" + con.ability + "』" + "\n")
        afn.changeAbility(enemy, team, 1, "NA")
    }
    if ( poke.myAbility == "はじまりのうみ" ) {
        if ( fieldStatus.myHeavy_rain ) return
        abilityDeclaration(poke)
        activateWeather(poke, "heavy_rain")
        return
    }
    if ( poke.myAbility == "バリアフリー" ) {
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
    }
    if ( poke.myAbility == "ひでり" ) {
        if ( poke.myName == "グラードン" && poke.myItem == "べにいろのたま" && isItem(poke) ) return
        if ( fieldStatus.mySunny )      return // 晴れ状態
        if ( fieldStatus.myDrought )    return // 大日照り状態
        if ( fieldStatus.myHeavy_rain ) return // 大雨状態
        if ( fieldStatus.myTurbulence ) return // 乱気流状態
        abilityDeclaration(poke)
        activateWeather(poke, "sunny")
        return
    }
    if ( poke.myAbility == "フェアリーオーラ" ) {

    }
    if ( poke.myAbility == "ふくつのたて" ) {
        abilityDeclaration(poke)
        changeRank(poke, "def", 1, false)
        return
    }
    if ( poke.myAbility == "ふとうのけん" ) {
        abilityDeclaration(poke)
        changeRank(poke, "atk", 1, false)
        return
    }
    if ( poke.myAbility == "プレッシャー" ) {
        abilityDeclaration(poke)
        writeLog(`${poke.myTN} の ${poke.myName} は プレッシャーを放っている !`)
        return
    }
    if ( poke.myAbility == "ミストメイカー" ) {
        if ( fieldStatus.myMisty ) return
        abilityDeclaration(poke)
        activateTerrain(poke, "misty")
        return
    }
    if ( poke.myAbility == "ゆきふらし" ) {
        if ( fieldStatus.myGraupel )    return // 霰状態
        if ( fieldStatus.myDrought )    return // 大日照り状態
        if ( fieldStatus.myHeavy_rain ) return // 大雨状態
        if ( fieldStatus.myTurbulence ) return // 乱気流状態
        abilityDeclaration(poke)
        activateWeather(poke, "graupel")
        return
    }
    if ( poke.myAbility == "よちむ" ) {
        return
        writeLog(me, you, con.TN + "　の　" + con.name + "　の　特性『よちむ』" + "\n")
        let power = []
        for (let i = 0; i < 4; i++){
            if (con["move_" + i] != "" ) {
                let move = moveSearchByName(you.con["move_" + i])
                if (move.nature != "変化" ) {
                    power.push([move.power, move.name])
                }
            }
        }
        power.sort()
        writeLog(me, you, con.TN + "　の　" + con.name + "　は　" + power[0][1] + "を　読み取った！" + "\n")
    }

    // 状態異常を治す特性
    if ( poke.myAbility == "やるき" || poke.muAbility == "ふみん" ) {
        if ( poke.myAilment == "ねむり" ) {
            abilityDeclaration(poke)
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は 目を覚ました !`)
            return
        }
    }
    if ( poke.myAbility == "めんえき" || poke.myAbility == "パステルベール" ) {
        if ( poke.myAilment == "どく" ){
            abilityDeclaration(poke)
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の 毒が治った !`)
            return
        }
    }
    if ( poke.myAbility == "じゅうなん" ) {
        if ( poke.myAilment == "まひ" ) {
            abilityDeclaration(poke)
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の 痺れが取れた !`)
            return
        }
    }
    if ( poke.myAbility == "みずのベール" || poke.myAbility == "すいほう" ) {
        if ( poke.myAilment == "やけど" ) {
            abilityDeclaration(poke)
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の 火傷が治った !`)
            return
        }
    }
    if ( poke.myAbility == "マグマのよろい" ) {
        if ( poke.myAilment == "こおり" ) {
            abilityDeclaration(poke)
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の 氷が溶けた !`)
            return
        }
    }
    if ( poke.myAbility == "マイペース" || poke.myAbility == "どんかん" ) {
        if ( poke.myCondition.myConfusion ) {
            activateAbility(poke)
            poke.myCondition.myConfusion = false
            writeLog(`${poke.myTN} の ${poke.myName} の 混乱が解けた !`)
            return
        }
    }
}

