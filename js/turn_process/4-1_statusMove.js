// 変化技の効果処理
function statusMoveEffect(poke) {
    if ( poke.myMove.target == "味方の場" ) statusMoveToChangeMyField(poke)
    if ( poke.myMove.target == "相手の場" ) statusMoveToChangeYourField(poke)
    if ( poke.myMove.target == "全体の場" ) statusMoveToChangeAllField(poke)
    if ( poke.myMove.target == "味方全体" ) statusMoveForAllOfUs(poke)
    if ( poke.myMove.target == "相手全体" ) statusMoveForAllOfYou(poke)
    if ( poke.myMove.target == "不定" ) statusMoveForSomeone(poke)
    if ( poke.myMove.target == "味方1体" ) statusMoveForOneOfUs(poke)
    if ( poke.myMove.target == "全体" ) statusMoveForAll(poke)
    if ( poke.myMove.target == "自分か味方" ) statusMoveForEitherOfUs(poke)
    if ( poke.myMove.target == "自分以外" ) statusMoveForExceptForMe(poke)
    if ( poke.myMove.target == "1体選択" ) statusMoveForOneOfThem(poke)
    if ( poke.myMove.target == "自分" ) statusMoveForMe(poke)

    return false
}


// 対象が味方の場である技
function statusMoveToChangeMyField(poke) {
    switch ( poke.myMove.name ) {
        case "オーロラベール":
            getMyField(poke).myAurora_vail = 1
            writeLog(`${poke.myTN} の場に オーロラベールが 現れた`)
            if ( poke.myItem == "ひかりのねんど" && isItem(poke) ) getMyField(poke).myAurora_clay = true
            break

        case "おいかぜ":
            getMyField(poke).myTailwind = 1
            writeLog(`${poke.myTN} の場に 追い風が吹き始めた`)
            break

        case "おまじない":
            getMyField(poke).myLucky_chant = 1
            writeLog(`${poke.myTN} の場に おまじないがかかった`)
            break

        case "しろいきり":
            getMyField(poke).myMist = 1
            writeLog(`${poke.myTN} の場を しろいきりが包む`)
            break

        case "しんぴのまもり":
            getMyField(poke).mySafeguard = 1
            writeLog(`${poke.myTN} の場を しんぴのまもりが包む`)
            break

        case "たたみがえし":
            getMyField(poke).myMat_block = true
            writeLog(`${poke.myTN} の場は 守りの体制に入った`)
            break

        case "トリックガード":
            getMyField(poke).myCrafty_shield = true
            writeLog(`${poke.myTN} の場は 守りの体制に入った`)
            break

        case "ひかりのかべ":
            getMyField(poke).myLight_screen = 1
            writeLog(`${poke.myTN} の場に ひかりのかべが 現れた`)
            if ( poke.myItem == "ひかりのねんど" && isItem(poke) ) getMyField(poke).myLight_clay = true
            break

        case "ファストガード":
            poke.myCondition.myProtect_num += 1
            getMyField(poke).myQuick_guard = true
            writeLog(`${poke.myTN} の場は 守りの体制に入った`)
            break

        case "リフレクター":
            getMyField(poke).myReflect = 1
            writeLog(`${poke.myTN} の場に リフレクターが 現れた`)
            if ( poke.myItem == "ひかりのねんど" && isItem(poke) ) getMyField(poke).myReflect_clay = true
            break

        case "ワイドガード":
            poke.myCondition.myProtect_num += 1
            getMyField(poke).myWide_guard = true
            writeLog(`${poke.myTN} の場は 守りの体制に入った`)
            break
    }
}

// 対象が相手の場である技
function statusMoveToChangeYourField(poke) {
    switch ( poke.myMove.name ) {
        case "ステルスロック":
            getOppField(poke).myStealth_rock = true
            writeLog(`${getOppField(poke).myTN} の場に とがった岩がただよいはじめた`)
            break

        case "ねばねばネット":
            getOppField(poke).mySticky_web = true
            writeLog(`${getOppField(poke).myTN} の場に ねばねばネットが 撒き散らされた`)
            break

        case "どくびし":
            getOppField(poke).myToxic_spikes += 1
            writeLog(`${getOppField(poke).myTN} の場に どくびしが 散らばった`)
            break

        case "まきびし":
            getOppField(poke).mySpikes += 1
            writeLog(`${getOppField(poke).myTN} の場に まきびしが 散らばった`)
            break
    }
}

// 対象が全体の場である技
function statusMoveToChangeAllField(poke) {
    switch ( poke.myMove.name ) {
        case "あまごい":
            activateWeather(poke, "あめ")
            break
        
        case "あられ":
            activateWeather(poke, "あられ")
            break
        
        case "エレキフィールド":
            activateTerrain(poke, "electric")
            break
    
        case "グラスフィールド":
            activateTerrain(poke, "grassy")
            break
        
        case "くろいきり":
            const parameter = ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]
            for ( const _poke of allPokeInBattle() ) {
                for ( const para of parameter ) _poke[`myRank_${para}`] = 0
            }
            writeLog(`あたりが くろいきりに 包まれた`)
            break
        
        case "コートチェンジ":
            for ( const element of courtChange ) {
                const myElement = myField[`my${element}`]
                const oppElement = oppField[`$my${element}`]
                myField[`my${element}`] = oppElement
                oppField[`my${element}`] = myElement

                // 壁延長についての記述が未完成
            }
            break
        
        case "サイコフィールド":
            activateTerrain(poke, "psychic")
            break
        
        case "じゅうりょく":
            fieldStatus.myGravity = 1
            writeLog(`重力が強くなった !`)
            for ( const _poke of allPokeInBattle() ) {
                if ( onGround(_poke) ) continue // 地面にいないこと
                _poke.myCondition.myTelekinesis = false // テレキネシスの解除
                writeLog(`${_poke.myTN} の ${_poke.myName} は じゅうりょくの 影響で 空中に いられなくなった !`)
            }
            break
        
        case "すなあらし":
            activateWeather(poke, "すなあらし")
            break
        
        case "トリックルーム":
            if ( fieldStatus.myTrick_room ) {
                fieldStatus.myTrick_room = false
                writeLog(`歪んだ空間が元に戻った`)
            } else {
                fieldStatus.myTrick_room = 1
                writeLog(`空間が歪んだ`)
                for ( const _poke of allPokeInBattle() ) {
                    if ( _poke.myItem == "ルームサービス" && isItem(_poke) && _poke.myRank_speed > -6 ) {
                        itemDeclaration(_poke)
                        changeMyRank(_poke, "speed", -1)
                    }
                }
            }
            break
        
        case "どろあそび":
            fieldStatus.myMud_sport = 1
            writeLog(`電気の力が弱まった`)
            break
        
        case "にほんばれ":
            activateWeather(poke, "にほんばれ")
            break
        
        case "フェアリーロック":
            fieldStatus.myFairy_lock = 1
            writeLog(`次のターン お互いのポケモンは 逃げられなくなった !`)
            break
        
        case "プラズマシャワー":
            fieldStatus.myIon_deluge = true
            writeLog(`電気の シャワーが 降り注いだ !`)
            break
        
        case "マジックルーム":
            fieldStatus.myMagic_room = true
            writeLog(`道具の効果が なくなった !`)
            break
        
        case "ミストフィールド":
            activateTerrain(poke, "misty")
            break

        case "みずあそび":
            fieldStatus.myWater_sport = 1
            writeLog(`炎の力が弱まった`)
            break

        case "ワンダールーム":
            for ( const _poke of allPokeInBattle() ) {
                [ _poke.myDef, _poke.mySp_def ] = [ _poke.mySp_def, _poke.myDef ]
            }
            writeLog(`防御と特防が入れ替わった !`)
            if ( fieldStatus.myWonder_room ) fieldStatus.myWonder_room = false
            else fieldStatus.myWonder_room = 1
            break
    }
}

// 対象が味方全体の技
function statusMoveForAllOfUs(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        switch( poke.myMove.name ) {
            case "アシストギア":
                changeMyRank(tgt.poke, "atk", 1)
                changeMyRank(tgt.poke, "sp_atk", 1)
                break
            
            case "アロマセラピー":
                // writeLog(`心地よい 香りが 広がった !`)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myAilment}が 治った !`)
                resetAilment(tgt.poke)
                break
            
            case "いのちのしずく":
                const damage = Math.floor(tgt.poke.myFull_HP / 4 * isDynamax(tgt.poke))
                changeHP(tgt.poke, damage, "+" )
                break
            
            case "いやしのすず":
                // writeLog(`鈴の音が響き渡った !`)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myAilment}が 治った !`)
                resetAilment(poke)
                break
            
            case "コーチング":
                changeMyRank(tgt.poke, "atk", 1)
                changeMyRank(tgt.poke, "def", 1)
                break
            
            case "じばそうさ":
                changeMyRank(tgt.poke, "def", 1)
                changeMyRank(tgt.poke, "sp_def", 1)
                break
            
            case "ジャングルヒール":
                if ( tgt.poke.myRest_hp < tgt.poke.myFull_hp ) {
                    const damage = Math.floor(tgt.poke.myFull_HP / 4 * isDynamax(tgt.poke))
                    changeHP(tgt.poke, damage, "+")
                }
                if ( !tgt.poke.myAilment ) {
                    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ${tgt.poke.myAilment}が 治った !`)
                    tgt.poke.myAilment = false
                }
                break
            
            case "とおぼえ":
                changeMyRank(tgt.poke, "atk", 1)
                break
        }
    }
}

// 対象が相手全体の技
function statusMoveForAllOfYou(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        switch ( poke.myMove.name ) {
            case "あまいかおり":
                changeRank(tgt.poke, "evation", -2, isSpirit(poke, tgt.poke))
                break
            
            case "いとをはく":
                changeRank(tgt.poke, "speed", -2, isSpirit(poke, tgt.poke))
                break
            
            case "かいふくふうじ":
                tgt.poke.myCondition.myHeal_block = 1
                writeLog(`${tgt.myTN} の ${tgt.myName} は 回復できなくなった`)
                break
            
            case "しっぽをふる":
                changeRank(tgt.poke, "def", -1, isSpirit(poke, tgt.poke))
                break
            
            case "ダークホール":
                getAbnormal(tgt.poke, "ねむり")
                break
            
            case "どくガス":
                getAbnormal(tgt.poke, "どく")
                break
            
            case "なきごえ":
                changeRank(tgt.poke, "atk", -1, isSpirit(poke, tgt.poke))
                break
            
            case "にらみつける":
                changeRank(tgt.poke, "def", -1, isSpirit(poke, tgt.poke))
                break
            
            case "ベノムトラップ":
                changeRank(tgt.poke, "atk", -1, isSpirit(poke, tgt.poke))
                changeRank(tgt.poke, "sp_atk", -1, isSpirit(poke, tgt.poke))
                changeRank(tgt.poke, "speed", -1, isSpirit(poke, tgt.poke))
                break
            
            case "ゆうわく":
                changeRank(tgt.poke, "sp_atk", -2, isSpirit(poke, tgt.poke))
                break
            
            case "わたほうし":
                changeRank(tgt.poke, "speed", -2, isSpirit(poke, tgt.poke))
                break
        }
    }
}

// 対象が味方1体の技
function statusMoveForOneOfUs(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        switch ( poke.myMove.name ) {
            case "アロマミスト":
                changeMyRank(tgt.poke, "sp_def", 1)
                break
            
            case "てだすけ":
                tgt.poke.myCondition.myHelping_hand += 1
                writeLog(`${tgt.poke.myName} を 手助けする 体勢に入った !`)
                break
            
            case "てをつなぐ":
                writeLog(`${tgt.poke.myName} と 手を繋いだ`)
                break 
        }
    }
}

// 対象が全体の技
function statusMoveForAll(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        switch ( poke.myMove.name ) {
            case "おちゃかい":
                eatBerryImmediately(tgt.poke)
                break
            
            case "たがやす":
                changeRank(tgt.poke, "atk", 1, isSpirit(poke, tgt.poke))
                changeRank(tgt.poke, "sp_atk", 1, isSpirit(poke, tgt.poke))
                break
            
            case "フラワーガード":
                break

            case "ほろびのうた":
                tgt.poke.myCondition.myPerish_song = 4
                break
        }
    }
}

// 対象が不定の技
function statusMoveForSomeone(poke) {
    switch ( poke.myMove.name ) {
        case "さきどり":
            break

        case "のろい":
            break

    }
}

// 対象が自分か味方の技
function statusMoveForEitherOfUs(poke) {
    switch ( poke.myMove.name ) {
        case  "つぼをつく":
            break

    }
}

// 対象が自分以外の技
function statusMoveForExceptForMe(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        switch ( poke.myMove.name ) {
            case "ふしょくガス":
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myItem} を 溶かした !`)
                tgt.poke.myItem = ""
                if ( tgt.poke.myAbility == "かるわざ" ) tgt.poke.myCondition.myUnburden = true
                break
                
            case "フラフラダンス":
                break
                    
        }
    }
}

































// 対象が1体選択の技
function statusMoveForOneOfThem(poke) {
    const tgt = poke.myTarget[0]

    // ランクを変化させる技
    for ( const move of statusMoveToChangeRankForOneOfThem ) {
        if ( poke.myMove.name == move.name ) {
            if ( poke.myMove.name == "ちからをすいとる" ) tgt.poke.myCondition.myStrength_sap = tgt.poke.myRank_atk
            for ( const rank of move.rank ) {
                changeRank(tgt.poke, rank.parameter, rank.change, isSpirit(poke, tgt))
            }
        }
    }
    //if (result == false && move.name == "すてゼリフ" ) con.p_con += "技『すてゼリフ』　" + data[i][0] + "失敗" + "\n"

    // 状態変化を付与する技
    for ( const move of statusMoveToMakeAbnormalForOneOfThem ) {
        if ( poke.myMove.name == move.name ) {
            getAbnormal(tgt.poke, move.ailment)
        }
    }

    const my_Rest_hp     = poke.myRest_hp
    const tg_Rest_hp     = tgt.poke.myRest_hp

    switch ( poke.myMove.name ) {
        case "いばる":
            break
            
        case "おだてる":
            break
        // if (user[0].f_con.includes("しんぴのまもり" ) && con.ability != "すりぬけ" ) return
        // if (user[0].f_con.includes("しんぴのまもり" ) && isAbility(me, con) && (tgt.parent == con.parent)) return

        case "あくび":
            tgt.poke.myCondition.myYawn = 1
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 眠気に襲われた`)
            break
        
        case "あくむ":
            tgt.poke.myCondition.myNightmare = true
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 悪夢に襲われた`)
            break
        
        case "アンコール":
            tgt.poke.myCondition.myEncore.turn = 1
            tgt.poke.myCondition.myEncore.name = tgt.poke.myCondition.myHistory[0].name
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は アンコールを受けた`)
            break
        
        case "いえき":
            tgt.poke.myCondition.No_ability = true
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 特性が 無効になった !`)
            break
        
        case "いたみわけ":
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と お互いのHPを 分け合った`)
            const painSplit = ( tgt.poke.myCondition.myDynamax )? {first: 2, second: tgt_Rest_hp / 2} : {first: 1, second: 0}
            poke.myRest_hp = Math.min(Math.floor((my_Rest_hp + tg_Rest_hp / painSplit.first) / 2), poke.myFull_hp)
            tgt.poke.myRest_hp = Math.min(Math.floor((my_Rest_hp + tg_Rest_hp / painSplit.first) / 2 + painSplit.second), tgt.poke.myFull_hp)
            break
        
        case "いちゃもん":
            tgt.myCondition.myTorment = true
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は いちゃもんを受けた`)
            break
        
        case "いやしのはどう":
            const healPulse = ( poke.myAbility == "メガランチャー" && isAbility(poke) )? 
                Math.fiveCut(tgt.poke.myFull_HP * 3 / 4 * isDynamax(tgt.poke)) :
                Math.ceil(tgt.poke.myFull_HP / 2 * isDamage(tgt.poke))
            changeHP(tgt, healPulse, "+")
            break
        
        case "うらみ":
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myCondition.myHistory[0].name}の PPを4減らした !`)
            for ( let i = 0; i < 4; i++ ) {
                if ( tgt.poke.myCondition.myHistory[0].name == tgt[`myMove_${i}`] ) {
                    tgt[`myRest_pp_${i}`] = Math.max(tgt[`myRest_pp_${i}`] - 4, 0)
                }
            }
            break
        
        case "おきみやげ":
            poke.myRest_hp = 0
            toHand(poke)
            break
        
        case "おさきにどうぞ":
            break

        case "かぎわける":
        case "みやぶる":
            tgt.poke.myCondition.myForesight = true
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 正体を見破られた`)
            break
        
        case "かなしばり":
            tgt.poke.myCondition.myDisable.name = tgt.poke.myCondition.myHistory[0].name
            tgt.poke.myCondition.myDisable.turn = 1
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 金縛りを受けた`)
            break
        
        case "ガードシェア":
            const guardSplit_Def = poke.myDef + tgt.poke.myDef
            const guardSplit_SpDef = poke.mySp_def + tgt.poke.mySp_def
            poke.myDef        = Math.floor(guardSplit_Def / 2)
            tgt.poke.myDef    = Math.floor(guardSplit_Def / 2)
            poke.mySp_def     = Math.floor(guardSplit_SpDef / 2)
            tgt.poke.mySp_def = Math.floor(guardSplit_SpDef / 2)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と お互いの 防御と 特防を 共有した`)
            break
        
        case "ガードスワップ":
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と お互いの 防御ランクと 特防ランクを 入れ替えた`)
            [poke.myRank_def,    tgt.poke.myRank_def]    = [tgt.poke.myRank_def,    poke.myRank_def]
            [poke.myRank_sp_def, tgt.poke.myRank_sp_def] = [tgt.poke.myRank_sp_def, poke.myRank_sp_def]
            break
        
        case "きりばらい":
            // 回避率低下が防がれた後にしろいきりが解除される

            // 対象の場だけ解除
            if ( getMyField(tgt.poke).myReflect ) {
                getMyField(tgt.poke).myRecycle = false
                getMyField(tgt.poke).myReflect_clay = false
                writeLog(`${tgt.poke.myTN} の場の リフレクターが消え去った`)
            }
            if ( getMyField(tgt.poke).myLight_screen ) {
                getMyField(tgt.poke).myLight_screen = false
                getMyField(tgt.poke).myLight_clay = false
                writeLog(`${tgt.poke.myTN} の場の ひかりのかべが消え去った`)
            }
            if ( getMyField(tgt.poke).myAurora_vail ) {
                getMyField(tgt.poke).myAurora_vail = false
                getMyField(tgt.poke).myAurora_clay = false
                writeLog(`${tgt.poke.myTN} の場の オーロラベールが消え去った`)
            }
            if ( getMyField(tgt.poke).mySafeguard ) {
                getMyField(tgt.poke).mySafeguard = false
                writeLog(`${tgt.poke.myTN} の場の しんぴのまもりが消え去った`)
            }
            if ( getMyField(tgt.poke).myMist ) {
                getMyField(tgt.poke).myMist = false
                writeLog(`${tgt.poke.myTN} の場の しろいきりが消え去った`)
            }
            // お互いの場で解除
            for ( const field of [myField, oppField] ) {
                if ( field.mySpikes ) {
                    field.mySpikes = false
                    writeLog(`${field.myTN} の場の まきびしが消え去った`)
                }
                if ( field.myToxic_spikes ) {
                    field.myToxic_spikes = false
                    writeLog(`${field.myTN} の場の どくびしが消え去った`)
                }
                if ( field.myStealth_rock ) {
                    field.myStealth_rock = false
                    writeLog(`${field.myTN} の場の ステルスロックが消え去った`)
                }
                if ( field.mySticky_web ) {
                    field.mySticky_web = false
                    writeLog(`${field.myTN} の場の ねばねばネットが消え去った`)
                }
                if ( field.mySteelSurge ) {
                    field.mySteelSurge = false
                    writeLog(`${field.myTN} の場の キョダイコウジンが消え去った`)
                }
            }

            const terrain = [
                {en: "Electric", ja: "エレキ"}, 
                {en: "Grassy",   ja: "グラス"}, 
                {en: "Misty",    ja: "ミスト"}, 
                {en: "Psychic",  ja: "サイコ"}
            ]
            for ( const t of terrain ) {
                if ( fieldStatus[`my${t.en}`] ) {
                    fieldStatus[`my${t.en}`] = false
                    myField.myExtender = false
                    oppField.myExtender = false
                    writeLog(`${t.ja}フィールドが 消え去った`)
                }
            }
            /*
            if (!tgt.p_con.includes("状態変化『みがわり』" ) || con.ability == "すりぬけ" ) {
                if (tgt.ability == "ミラーアーマー" ) {
                    writeLog(me, you, tgt.TN + "　の　" + tgt.name + "　の　ミラーアーマーが　発動した!" + "\n" )
                    changeRank(me, you, con, "Y", -1, 100, move, true)
                    bfn.whiteHerb(atk, def)
                } else {
                    changeRank(user[0], user[1], tgt, "Y", -1, 100, move, true)
                    bfn.whiteHerb(def, atk)
                }
            }
            */
            break
        
        case "ギフトパス":
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に ${poke.myItem}を プレゼントした`)
            tgt.poke.myItem = poke.myItem
            poke.myItem = ""
            eatBerryInPinch(tgt)
            eatBerryInAbnormal(tgt)
            break
        
        case "クモのす":
        case "くろいまなざし":
        case "とおせんぼう":
            tgt.poke.myCondition.myCant_escape = poke.myID
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 逃げられなくなった`)
            break
        
        case "こころのめ":
        case "ロックオン":
            tgt.poke.myCondition.myLock_on = 1
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 狙いを定めた`)
            break
        
        case "サイコシフト":
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に ${poke.myAilment} を移した`)
            tgt.poke.myAilment     = poke.myAilment     // 状態異常回復
            tgt.poke.myAsleep      = poke.myAsleep      // ねむり経過ターン数
            tgt.poke.myAsleep_turn = poke.myAsleep_turn // ねむりから覚めるターン数
            tgt.poke.myRest        = poke.myRest        // ねむる経過ターン数
            tgt.poke.myBad_poison  = poke.myBad_poison  // もうどく経過ターン数
            resetAilment(poke)
            break
        
        case "さいはい":
            // const _move = moveSearchByName(tgt.used)
            // moveEffect(user[0], user[1], tgt, _move)
            break
        
        case "さきおくり":
            break

        case "さしおさえ":
            tgt.poke.myCondition.myEmbargo = true
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 道具を差し押さえられた`)
            break
        
        case "シンプルビーム":
            tgt.poke.myAbility = "たんじゅん"
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 特性が『たんじゅん』になった !`)
            break
        
        case "じこあんじ":
            const psychUp = ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]
            for ( const para of psychUp ) poke[`myRank_${para}`] = tgt[`myRank_${para}`] // ランク変化
            poke.myCondition.myCritical = tgt.poke.myCondition.myCritical                  // きゅうしょアップ
            poke.myCondition.myChi_strike = tgt.poke.myCondition.myChi_strike              // キョダイシンゲキ
            if ( tgt.poke.myCondition.myLaser_focus ) poke.myCondition.myLaser_focus = 1   // とぎすます

            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 能力変化を コピーした`)
            break
        
        case "じょうか":
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myAilment}が なおった !`)
            resetAilment(tgt)
            changeHP(poke, fiveCut(poke.myFull_hp / 2), "+")
            break
        
        case "スキルスワップ":
            [poke.myAbility, tgt.poke.myAbility] = [tgt.poke.myAbility, poke.myAbility]
            writeLog(`${poke.myTN} の ${poke.myName} は　特性『${poke.myAbility}』 になった`)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 特性『${tgt.poke.myAbility}』 になった`)
            landing_other1st_ability(poke)
            landing_other1st_ability(tgt.poke)
            break
        
        case "スケッチ":
            const sketch = moveSearchByName(tgt.poke.myCondition.myHistory[0].name)
            poke[`myMove_${poke.myCmd_move}`]    = sketch.name
            poke[`myFull_pp_${poke.myCmd_move}`] = sketch.PP
            poke[`myRest_pp_${poke.myCmd_move}`] = sketch.PP
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${s_move.name} を スケッチした`)
            break
        
        case "すてゼリフ":
            /*
            if (isBench(me) && !con.p_con.includes("技『すてゼリフ』　A失敗" ) && !con.p_con.includes("技『すてゼリフ』　C失敗" )) toHand(me, you, con)
            removeText(con.p_con, "技『すてゼリフ』　A失敗" )
            removeText(con.p_con, "技『すてゼリフ』　C失敗" )
            */
            break
        
        case "スピードスワップ":
            [poke.mySpeed, tgt.poke.mySpeed] = [tgt.poke.mySpeed, poke.mySpeed]
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と 素早さを入れ替えた`)
            break
        
        case "スポットライト":
            const spotlight = {position: tgt.poke.myPosition, move: poke.myMove.name}
            getMyField(tgt.poke).mySpotlight.push(spotlight)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 注目の的になった`)
            break
        
        case "すりかえ":
        case "トリック":
            [poke.myItem, tgt.poke.myItem] = [tgt.poke.myItem, poke.myItem]
            for ( const _poke of [poke, tgt.poke] ) {
                if ( _poke.myItem ) {
                    writeLog(`${_poke.myTN} の ${_poke.myName} は ${_poke.myItem} を 手に入れた`)
                }
                // こだわり解除
                _poke.myCondition.myChoice = {item: false, ability: false}
                // かるわざ
                if ( _poke.myAbility == "かるわざ" && isAbility(_poke) && !_poke.myItem ) {
                    _poke.myCondition.myUnburden = true
                }
            }
            break
        
        case "そうでん":
            tgt.poke.myCondition.myElectrify = true
            writeLog(`${poke.myTN} の ${poke.myName} は 電気を 流し込まれた`)
            break
        
        case "タールショット":
            tgt.poke.myCondition.myTar_shot = true
            writeLog(`${poke.myTN} の ${poke.myName} は 火に弱くなった`)
            break
        
        case "たこがため":
            tgt.poke.myCondition.myCant_escape = poke.myID
            tgt.poke.myCondition.myOctolock = poke.myID
            writeLog(`${poke.myTN} の ${poke.myName} は 逃げられなくなった`)
            break
        
        case "ちからをすいとる":
            const A_rank = tgt.poke.myCondition.myStrength_sap
            tgt.poke.myCondition.myStrength_sap = false
            ( A_rank > 0 )? rank = (A_rank + 2) / 2 : rank = 2 / (2 - A_rank)
            changeHP(poke, Math.floor(tgt.poke.myAtk * rank * isBig_root(poke)), isOoze(tgt))
            break
        
        case "ちょうはつ":
            tgt.poke.myCondition.myTaunt = 1
            writeLog(`${poke.myTN} の ${poke.myName} は 挑発に乗ってしまった`)
            // if (user[0].f_con.includes("交代済" + tgt.child) || tgt.com != "" ) tgt.p_con += "状態変化『ちょうはつ』　3/3" + "\n"
            // if (tgt.com == "" ) tgt.p_con += "状態変化『ちょうはつ』　4/4" + "\n"
            break
        
        case "テクスチャー2":
            /*
            let check = []
            for ( let i = 0; i < 18; i++ ) {
                if ( compatibilityTable[0][i] == tgt.move.type ) {
                    for (let j = 0; j < 18; j++) {
                        if (compatibilityTable[i+1][j] < 1) {
                            check.push(compatibilityTable[0][j])
                        }
                    }
                }
            }
            const type = shuffle(check)[0]
            con.type = [type]
            writeLog(me, you, con.name + "　は　" + type + "タイプに　なった" + "\n" )
            */
            break
        
        case "テレキネシス":
            tgt.poke.myCondition.myTelekinesis = 1
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 宙に浮かんだ`)
            break
        
        case "なかまづくり":
            tgt.poke.myAbility = poke.myAbility
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 特性『${tgt.poke.myAbility}』 になった`)
            break
        
        case "なやみのタネ":
            tgt.poke.myAbility = "ふみん"
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 特性『ふみん』 になった`)
            break
        
        case "なりきり":
            poke.myAbility = tgt.poke.myAbility
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 特性『${tgt.poke.myAbility}』 を コピーした !`)
            landing_other1st_ability(poke)
            break

        case "のろい":
            const curseDamege = Math.min(Math.floor(poke.myFull_hp / 2), poke.myRest_hp)
            poke.myRest_hp -= curseDamege
            tgt.poke.myCondition.myCurse = true
            writeLog(`${poke.myTN} の ${poke.myName} は 体力を削って ${tgt.poke.myTN} の ${tgt.poke.myName} に 呪いをかけた`)
            if ( poke.myRest_hp == 0 ) toHand(poke)
        
        case "ハートスワップ":
            const heartSwap = ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]
            for ( const para of heartSwap ) {
                let atk_rank = poke[`myRank_${para}`]
                poke[`myRank_${para}`] = tgt[`myRank_${para}`]
                tgt[`myRank_${para}`] = atk_rank
            }
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と 能力変化を入れ替えた`)
            break
        
        case "ハロウィン":
            if ( tgt.poke.myCondition.myForest_curse ) {
                tgt.poke.myType = tgt.poke.myType.pop()
                tgt.poke.myCondition.myForest_curse = false
            }
            tgt.poke.myType.push("ゴースト")
            tgt.poke.myCondition.myHalloween = true
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に ゴーストタイプが追加された`)
            break
        
        case "パワーシェア":
            const powerSplit_Atk = poke.myAtk + tgt.poke.myAtk
            const powerSplit_SpAtk = poke.mySp_atk + tgt.poke.mySp_atk
            poke.myAtk        = Math.floor(powerSplit_Atk / 2)
            tgt.poke.myAtk    = Math.floor(powerSplit_Atk / 2)
            poke.mySp_atk     = Math.floor(powerSplit_SpAtk / 2)
            tgt.poke.mySp_atk = Math.floor(powerSplit_SpAtk / 2)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と 攻撃と特攻を分け合った`)
            break
        
        case "パワースワップ":
            [poke.myRank_atk,    tgt.poke.myRank_atk]    = [tgt.poke.myRank_atk,    poke.myRank_atk]
            [poke.myRank_sp_atk, tgt.poke.myRank_sp_atk] = [tgt.poke.myRank_sp_atk, poke.myRank_sp_atk]
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と 攻撃ランクと特攻ランクを入れ替えた`)
            break
        
        case "ひっくりかえす":
            const parameter = ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]
            for ( const para of parameter ) {
                tgt[`myRank_${para}`] *= -1
            }
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 能力ランクをひっくり返した`)
            break
        
        case "ふきとばし":
        case "ほえる":
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 手持ちに戻された !`)
            const position = tgt.poke.myPosition       // 現在の位置
            const next = shuffle(isBench(tgt.poke))[0] // 次に出すポケモン
            toHand(tgt.poke)                           // 戻す
            summon(next, position)                     // 出す
            break
        
        case "フラワーヒール":
            const flowerHeal = ( fieldStatus.myGrassy )? 2732 / 4096 : 1 / 2
            changeHP(tgt, fiveCut(tgt.poke.myFull_hp * flowerHeal * isDynamax(tgt)), "+")
            break
        
        case "ふんじん":
            tgt.poke.myCondition.myPowder = true
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の周りに 粉塵が舞った`)
            break
        
        case "へんしん": // && !def.con.p_con.includes("みがわり" ) && !def.con.p_con.includes("イリュージョン" )) {
        // afn.metamon(atk, def)
            break
    
        case "まほうのこな":
            tgt.poke.myType = ["エスパー"]
            tgt.poke.myCondition.myHalloween    = false // ハロウィン
            tgt.poke.myCondition.myForest_curse = false // もりののろい
            tgt.poke.myCondition.myRoost        = false // はねやすめ
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は エスパータイプになった`)
            break
        
        case "みずびたし":
            tgt.poke.myType = ["みず"]
            tgt.poke.myCondition.myHalloween    = false // ハロウィン
            tgt.poke.myCondition.myForest_curse = false // もりののろい
            tgt.poke.myCondition.myRoost        = false // はねやすめ
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は みずタイプになった`)
            break

        case "ミラータイプ":
            poke.myType = [].concat(tgt.poke.myType)
            poke.myCondition.myHalloween    = false // ハロウィン
            poke.myCondition.myForest_curse = false // もりののろい
            poke.myCondition.myRoost        = false // はねやすめ
            writeLog(`${poke.myTN} の ${poke.myName} は ${tgt.poke.myTN} の ${tgt.poke.myName} と タイプが同じになった`)
            break

        case "ミラクルアイ":
            tgt.poke.myCondition.myMiracle_eye = true
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 正体を見破られた`)
            break

        case "メロメロ":
            tgt.poke.myCondition.myAttract = poke.myID
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ${poke.myName} にメロメロになった`)
            break
        
        case "ものまね":
            /*
            con["move_" + con.com] = moveSearchByName(tgt.used).name
            con["PP_" + con.com] = moveSearchByName(tgt.used).PP
            con["last_" + con.com] = moveSearchByName(tgt.used).PP
            writeLog(me, you, tgt.TN + "　の　" + tgt.name + "の　" + tgt.used +"を　コピーした" + "\n" )
            con.p_con += "技『ものまね』　" + con.com + "\n"
            */
            break

        case "もりののろい":
            if ( tgt.poke.myCondition.myHalloween ) {
                tgt.poke.myType = tgt.poke.myType.pop()
                tgt.poke.myCondition.myHalloween = false
            }
            tgt.poke.myType.push("くさ")
            tgt.poke.myCondition.myForest_curse = true
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に くさタイプが追加された`)
            break

        case "やどりぎのタネ":
            tgt.poke.myCondition.myLeech_seed = poke.myParty + ":" + poke.myPosition
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は タネを植え付けられた`)
            break
    }
}

// 対象が自分の技
function statusMoveForMe(poke) {
    // ランクを変化させる技
    for ( const move of statusMoveToChangeRankForMe ) {
        if ( poke.myMove.name == move.name ) {
            for ( const rank of move.rank ) {
                changeMyRank(poke, rank.parameter, rank.change)
            }
        }
    }
    //if ( poke.myMove.name == "ソウルビート" ) con.p_con += "技『ソウルビート』　" + data[i][0] + "失敗" + "\n"
    //if ( poke.myMove.name == "たくわえる" ) con.p_con += "技『たくわえる』　" + data[i][0] + "失敗" + "\n"

    // その他の効果
    switch ( poke.myMove.name ) {
        case "アクアリング":
            poke.myCondition.myAqua_ring = true
            writeLog(`${poke.myTN} の ${poke.myName} は 水をまとった`)
            break
        
        case "あさのひざし":
        case "こうごうせい":
        case "つきのひかり":
            // writeLog(me, you, con.name + "　の　HPが回復した" + "\n" )
            if ( isSunny(poke) ) {
                changeHP(poke, fiveCut(poke.myFull_hp * 2732 / 4096), "+")
            } else if ( isRainy(poke) || isSandy(poke) || isSnowy(poke)) {
                changeHP(poke, fiveCut(poke.myFull_hp / 4), "+")
            } else {
                changeHP(poke, fiveCut(poke.myFull_hp / 2), "+")
            }
            break
        
        case "いかりのこな":
        case "このゆびとまれ":
            const followMe = {position: poke.myPosition, move: poke.myMove.name}
            getMyField(poke).mySpotlight.push(followMe)
            writeLog(`${poke.myTN} の ${poke.myName} は 注目の的になった`)
            break
        
        case "いやしのねがい":
        case "みかづきのまい":
            getMyField(poke).myPray[poke.myPosition].name = poke.myMove.name
            poke.myRest_hp = 0
            toHand(poke)
            break

        case "おいわい":
            writeLog(`おめでとう ! ${poke.myTN} !!`)
            break

        case "おんねん":
            poke.myCondition.myGrudge = true
            writeLog(`${poke.myTN} の ${poke.myName} は おんねんをかけようとしている`)
            break

        case "かいふくしれい":
        case "じこさいせい":
        case "タマゴうみ":
        case "なまける":
        case "ミルクのみ":
            changeHP(poke, Math.ceil(poke.myFull_hp / 2), "+")
            break

        case "きあいだめ":
            poke.myCondition.myCritical = true
            writeLog(`${poke.myTN} の ${poke.myName} は 張り切っている`)
            break

        case "キングシールド":
            poke.myCondition.myProtect_num += 1
            poke.myCondition.myProtect = poke.myMove.name
            writeLog(`${poke.myTN} の ${poke.myName} は 守りの体勢に入った`)
            break
        
        case "こらえる":
            poke.myCondition.myEndure = true
            writeLog(`${poke.myTN} の ${poke.myName} は 堪える体勢に入った`)
            break

        case "サイドチェンジ":
            for ( const _poke of myPokeInBattle(poke) ) {
                _poke.myPosition == ( _poke.myPosition + 1 ) % 2
            }
            // if (me.f_con.includes("サイドチェンジ" )) removeText(me.f_con, "サイドチェンジ" )
            // else me.f_con += "サイドチェンジ" + "\n"
            writeLog(`${myPokeInBattle(poke)[0].myName} と ${myPokeInBattle(poke)[1].myName} は 場所を入れ替えた`)
            break

        case "じゅうでん":
            poke.myCondition.myCharge = 1
            writeLog(`${poke.myTN} の ${poke.myName} は 充電を開始した`)
            break

        case "すなあつめ":
            ( isSandy(poke) )? num = 2732 / 4096 : num = 1 / 2
            changeHP(poke, fiveCut(poke.myFull_hp * num), "+")
            break

        case "せいちょう":
            ( isSunny(poke) )? num = 2 : num = 1
            changeMyRank(poke, "atk", num)
            changeMyRank(poke, "sp_atk", num)
            break

        case "ソウルビート":
            /*
            let check = 0
            for (const para of ["A", "B", "C", "D", "S"]) {
                if (con.p_con.includes("技『ソウルビート』　" + para + "失敗" )) check += 1
            }
            if (check < 5) {
                con.last_HP -= Math.floor(con.full_HP / 3)
                me["poke" + con.num].last_HP = con.last_HP
                writeLog(me, you, con.name + "　は　体力を削って力を得た!" + "\n" )
            }
            for (const para of ["A", "B", "C", "D", "S"]) {
                removeText(con.p_con, "技『ソウルビート』　" + para + "失敗" )
            }
            */
            break

        case "たくわえる":
            poke.myStockpile += 1
            poke.myCondition.myStockpile_B += 1
            poke.myCondition.myStockpile_D += 1
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myStockpile}つ　たくわえた`)
            break

        case "テクスチャー":
            const conversionType = moveSearchByName(poke.myMove_0).type
            poke.myType = [conversionType]
            poke.myCondition.myHalloween    = false // ハロウィン
            poke.myCondition.myForest_curse = false // もりののろい
            writeLog(`${poke.myTN} の ${poke.myName} は ${conversionType}タイプに なった`)
            break

        case "テレポート":
            /*
            toHand(me, you, con)
            me.f_con += "交代中" + con.child + "\n"
            writeLog(me, you, con.TN + "　は　戦闘に出すポケモンを選んでください" + "\n" )
            */
            break

        case "でんじふゆう":
            poke.myCondition.myElectrify = 1
            writeLog(`${poke.myTN} の ${poke.myName} は 宙に浮かんだ`)
            break

        case "トーチカ":
            poke.myCondition.myProtect_num += 1
            poke.myCondition.myProtect = poke.myMove.name
            writeLog(`${poke.myTN} の ${poke.myName} は 守りの体勢に入った`)
            break

        case "とぎすます":
            poke.myCondition.myLaser_focus = 1
            writeLog(`${poke.myTN} の ${poke.myName} は 集中している`)
            break

        case "ニードルガード":
            poke.myCondition.myProtect_num += 1
            poke.myCondition.myProtect = poke.myMove.name
            writeLog(`${poke.myTN} の ${poke.myName} は 守りの体勢に入った`)
            break

        case "ねがいごと":
            getMyField(poke).myWish_data[poke.myPosition].heal = Math.floor(poke.myFull_hp / 2)
            getMyField(poke).myWish_data[poke.myPosition].turn = 1
            writeLog(`${poke.myTN} の ${poke.myName} は 願い事をした !`)
            break

        case "ねむる":
            resetAilment(poke)
            poke.myAilment = "ねむり"
            poke.myRest = 1
            changeHP(poke, poke.myFull_hp, "+")
            writeLog(`${poke.myTN} の ${poke.myName} は 眠って元気になった`)
            break

        case "ねをはる":
            poke.myCondition.myIngrain = true
            writeLog(`${poke.myTN} の ${poke.myName} は 根を張った`)
            break

        case "のみこむ":
            const sockpileNumber = Math.max(poke.myCondition.myStockpile_B, poke.myCondition.myStockpile_D)
            const stockPileDamage = fiveCut(poke.myFull_HP * Math.pow(2, sockpileNumber) / 8)
            changeHP(poke, stockPileDamage, "+")
            changeMyRank(poke, "def", -1 * poke.myCondition.myStockpile_B)
            changeMyRank(poke, "sp_def", -1 * poke.myCondition.myStockpile_D)
            poke.myCondition.myStockpile_B = 0
            poke.myCondition.myStockpile_D = 0
            writeLog(`${poke.myTN} の ${poke.myName} の たくわえが なくなった !`)
            break

        case "のろい":
            changeMyRank(poke, "atk", 1)
            changeMyRank(poke, "def", 1)
            changeMyRank(poke, "speed", -1)
            break

        case "はいすいのじん":
            if ( poke.myCondition.myNo_retreat ) return
            poke.myCondition.myNo_retreat = true
            poke.myCondition.myCant_escape = poke.myID
            writeLog(`${poke.myTN} の ${poke.myName} は 背水の陣で 逃げることが できなくなった !`)
            break

        case "はねやすめ":
            const roostDamege = Math.ceil(poke.myFull_HP / 2)
            changeHP(poke, roostDamege, "+")
            // ひこうタイプがなければ終了
            if ( !poke.myType.includes("ひこう") ) return

            if ( poke.myCondition.myHalloween )    poke.myType = poke.myType.pop()
            if ( poke.myCondition.myForest_curse ) poke.myType = poke.myType.pop()

            // ひこう単 => ノーマル
            if ( poke.myType.length == 1 ) {
                poke.myType = ["ノーマル"]
                poke.myCondition.myRoost = "ノーマル"
            }
            // ひこう複合 => ひこう消失
            if ( poke.myType.length == 2 ) {
                const FlyIndex = poke.myType.indexOf("ひこう")
                poke.myType.splice(FlyIndex, 1)
                const position = ( FlyIndex == 0 )? "first" : "second"
                poke.myCondition.myRoost = position
            }

            if ( poke.myCondition.myHalloween ) poke.myType.push("ゴースト")
            if ( poke.myCondition.myForest_curse ) poke.myType.push("くさ")
            break

        case "はねる":
            writeLog(`しかし 何も起こらなかった`)
            break

        case "はらだいこ":
            poke.myRest_hp -= Math.floor(poke.myFull_hp / 2)
            changeMyRank(poke, "atk", 12)
            writeLog(`${poke.myTN} の ${poke.myName} は 体力を削ってパワー全開 !`)
            break

        case "バトンタッチ":
            getMyField(poke).myBaton_pass = {
                rank: {    
                    atk      : poke.myRank_atk, 
                    def      : poke.myRank_def, 
                    sp_atk   : poke.myRank_sp_atk, 
                    sp_def   : poke.myRank_sp_def, 
                    speed    : poke.myRank.speed, 
                    evasion  : poke.myRank_evasion, 
                    accuracy : poke.myRank_accuracy
                }, 
                condition: {
                    Confusion   : poke.myCondition.myConfusion,   // こんらん経過ターン数
                    Critical    : poke.myCondition.myCritical,    // きゅうしょアップ状態ならtrue
                    Substitute  : poke.myCondition.mySubstitute,  // みがわり残りHP
                    Leech_seed  : poke.myCondition.myLeech_seed,  // やどりぎのタネを受けた場所("me:0" や　"opp:1"　など)
                    Curse       : poke.myCondition.myCurse,       // のろい状態ならtrue
                    Perish_song : poke.myCondition.myPerish_song, // ほろびカウント数
                    Ingrain     : poke.myCondition.myIngrain,     // ねをはる状態ならtrue
                    No_ability  : poke.myCondition.myNo_ability,  // 特性なし状態ならtrue
                    Aqua_ring   : poke.myCondition.myAqua_ring,   // アクアリング状態ならtrue
                    Heal_block  : poke.myCondition.myHeal_block,  // 回復封じ　経過ターン数(1~5)
                    Embargo     : poke.myCondition.myEmbargo,     // さしおさえ経過ターン数(1~5)
                    Magnet_rise : poke.myCondition.myMagnet_rise, // でんじふゆう状態の経過ターン数
                    Power_trick : poke.myCondition.myPower_trick, // パワートリック状態ならtrue
                    Telekinesis : poke.myCondition.myTelekinesis, // テレキネシス状態の経過ターン数
                }
            }

            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 手持ちに戻った !`)
            toHand(poke)
            writeLog(`${poke.myTN} は 戦闘に出すポケモンを選んでください`)
            break
        
        case "パワートリック":
            [poke.myAtk, poke.myDef] = [poke.myDef, poke.myAtk]
            poke.myCondition.myPower_trick = true
            writeLog(`${poke.myTN} の ${poke.myName} は 自分の攻撃と防御を 入れ替えた`)
            break

        case "ふういん":
            poke.myCondition.myImprison = true
            writeLog(`${poke.myTN} の ${poke.myName} は 自分の技を封印した`)
            break

        case "ブロッキング":
            poke.myCondition.myProtect_num += 1
            poke.myCondition.myProtect = poke.myMove.name
            writeLog(`${poke.myTN} の ${poke.myName} は 守りの体勢に入った`)
            break

        case "ほおばる":
            /*
            eatBerryImmediately(me, you, con, con.item)
            enableToRecycle(me, con)
            */
            break

        case "ほごしょく":
            if ( fieldStatus.myGrassy )        poke.myType = ["くさ"]
            else if ( fieldStatus.myElectric ) poke.myType = ["でんき"]
            else if ( fieldStatus.myMisty )    poke.myType = ["フェアリー"]
            else if ( fieldStatus.myPsychic )  poke.myType = ["エスパー"]
            else                               poke.myType = ["ノーマル"]
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myType[0]}タイプになった`)
            break

        case "ボディパージ":
            poke.myCondition.myAutotomize += 1
            writeLog(`${poke.myTN} の ${poke.myName} は 身軽になった`)
            break

        case "マジックコート":
            poke.myCondition.myMagic_coat = true
            writeLog(`${poke.myTN} の ${poke.myName} は マジックコートに包まれた`)
            break

        case "まもる":
            poke.myCondition.myProtect_num += 1
            poke.myCondition.myProtect = poke.myMove.name
            writeLog(`${poke.myTN} の ${poke.myName} は 守りの体勢に入った`)
            break

        case "まるくなる":
            poke.myCondition.myDefense_curl = true
            break

        case "みがわり":
            const substitute_hp = Math.floor(poke.myFull_hp / 4)
            poke.myRest_hp               -= substitute_hp // 残り体力の減少
            poke.myCondition.mySubstitute = substitute_hp // みがわり体力の記録
            showHPbar(poke)
            resetBind(poke)
            eatBerryInPinch(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の 身代わりが 現れた`)
            break

        case "みきり":
            poke.myCondition.myProtect_num += 1
            poke.myCondition.myProtect = poke.myMove.name
            writeLog(`${poke.myTN} の ${poke.myName} は 守りの体勢に入った`)
            break

        case "みちづれ":
            poke.myCondition.myDestiny_bond = true
            writeLog(`${poke.myTN} の ${poke.myName} は 相手を道連れにしようとしている`)
            break

        case "よこどり":
            break

        case "リサイクル":
            poke.myItem = poke.myRecycle
            poke.myRecycle = false
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem}を 拾ってきた`)
            eatBerryInPinch(poke)
            eatBerryInAbnormal(poke)
            break

        case "リフレッシュ":
            writeLog(`心地よい香りが広がった !`)
            resetAilment(poke)
            break
    }
}


