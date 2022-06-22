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
    if ( poke.myMove.name == "オーロラベール" ) {
        isField(poke).myAurora_vail = 1
        writeLog(`${poke.myTN} の場に オーロラベールが 現れた`)
        if ( poke.myItem == "ひかりのねんど" && isItem(poke) ) isField(poke).myAurora_clay = true
    }
    if ( poke.myMove.name == "おいかぜ" ) {
        isField(poke).myTailwind = 1
        writeLog(`${poke.myTN} の場に 追い風が吹き始めた`)
    }
    if ( poke.myMove.name == "おまじない" ) {
        isField(poke).myLucky_chant = 1
        writeLog(`${poke.myTN} の場に おまじないがかかった`)
    }
    if ( poke.myMove.name == "しろいきり" ) {
        isField(poke).myMist = 1
        writeLog(`${poke.myTN} の場を しろいきりが包む`)
    }
    if ( poke.myMove.name == "しんぴのまもり" ) {
        isField(poke).mySafeguard = 1
        writeLog(`${poke.myTN} の場を しんぴのまもりが包む`)
    }
    if ( poke.myMove.name == "たたみがえし" ) {
        isField(poke).myMat_block = true
        writeLog(`${poke.myTN} の場は 守りの体制に入った`)
    }
    if ( poke.myMove.name == "トリックガード" ) {
        isField(poke).myCrafty_shield = true
        writeLog(`${poke.myTN} の場は 守りの体制に入った`)
    }
    if ( poke.myMove.name == "ひかりのかべ" ) {
        isField(poke).myLight_screen = 1
        writeLog(`${poke.myTN} の場に ひかりのかべが 現れた`)
        if ( poke.myItem == "ひかりのねんど" && isItem(poke) ) isField(poke).myLight_clay = true
    }
    if ( poke.myMove.name == "リフレクター" ) {
        isField(poke).myReflect = 1
        writeLog(`${poke.myTN} の場に リフレクターが 現れた`)
        if ( poke.myItem == "ひかりのねんど" && isItem(poke) ) isField(poke).myReflect_clay = true
    }
}

// 対象が相手の場である技
function statusMoveToChangeYourField(poke) {
    if ( poke.myMove.name == "ステルスロック" ) {
        isOppField(poke).myStealth_rock = true
        writeLog(`${isOppField(poke).myTN} の場に とがった岩がただよいはじめた`)
    }
    if ( poke.myMove.name == "ねばねばネット" ) {
        isOppField(poke).mySticky_web = true
        writeLog(`${isOppField(poke).myTN} の場に ねばねばネットが 撒き散らされた`)
    }
    if ( poke.myMove.name == "どくびし" ) {
        isOppField(poke).myToxic_spikes += 1
        writeLog(`${isOppField(poke).myTN} の場に どくびしが 散らばった`)
    }
    if ( poke.myMove.name == "まきびし" ) {
        isOppField(poke).mySpikes += 1
        writeLog(`${isOppField(poke).myTN} の場に まきびしが 散らばった`)
    }
}

// 対象が全体の場である技
function statusMoveToChangeAllField(poke) {
    if ( poke.myMove.name == "あまごい" ) {
        activateWeather(poke, "rainy")
    }
    if ( poke.myMove.name == "あられ" ) {
        activateWeather(poke, "graupel")
    }
    if ( poke.myMove.name == "エレキフィールド" ) {
        activateTerrain(poke, "electric")
    }
    if ( poke.myMove.name == "グラスフィールド" ) {
        activateTerrain(poke, "grassy")
    }
    if ( poke.myMove.name == "くろいきり" ) {
        const parameter = ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]
        for ( const _poke of allPokeInBattle() ) {
            for ( const para of parameter ) _poke[`myRank_${para}`] = 0
        }
        writeLog(`あたりが くろいきりに 包まれた`)
    }
    if ( poke.myMove.name == "コートチェンジ" ) {
        for ( const element of courtChange ) {
            const myElement = myField[`my${element}`]
            const oppElement = oppField[`$my${element}`]
            myField[`my${element}`] = oppElement
            oppField[`my${element}`] = myElement

            // 壁延長についての記述が未完成
        }
    }
    if ( poke.myMove.name == "サイコフィールド" ) {
        activateTerrain(poke, "psychic")
    }
    if ( poke.myMove.name == "じゅうりょく" ) {
        fieldStatus.myGravity = 1
        writeLog(`重力が強くなった !`)
        for ( const _poke of allPokeInBattle() ) {
            if ( onGround(_poke) ) continue // 地面にいないこと
            _poke.myCondition.myTelekinesis = false // テレキネシスの解除
            writeLog(`${_poke.myTN} の ${_poke.myName} は じゅうりょくの 影響で 空中に いられなくなった !`)
        }
    }
    if ( poke.myMove.name == "すなあらし" ) {
        activateWeather(poke, "sandstorm")
    }
    if ( poke.myMove.name == "トリックルーム" ) {
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
    }
    if ( poke.myMove.name == "どろあそび" ) {
        fieldStatus.myMud_sport = 1
        writeLog(`電気の力が弱まった`)
    }
    if ( poke.myMove.name == "にほんばれ" ) {
        activateWeather(poke, "sunny")
    }
    if ( poke.myMove.name == "フェアリーロック" ) {
        fieldStatus.myFairy_lock = 1
        writeLog(`次のターン お互いのポケモンは 逃げられなくなった !`)
    }
    if ( poke.myMove.name == "プラズマシャワー" ) {
        fieldStatus.myIon_deluge = true
        writeLog(`電気の シャワーが 降り注いだ !`)
    }
    if ( poke.myMove.name == "マジックルーム" ) {
        fieldStatus.myMagic_room = true
        writeLog(`道具の効果が なくなった !`)
    }
    if ( poke.myMove.name == "ミストフィールド" ) {
        activateTerrain(poke, "misty")
    }
    if ( poke.myMove.name == "みずあそび" ) {
        fieldStatus.myWater_sport = 1
        writeLog(`炎の力が弱まった`)
    }
    if ( poke.myMove.name == "ワンダールーム" ) {
        fieldStatus.myWonder_room = 1
        writeLog(`防御と特防が入れ替わった !`)
    }
}

// 対象が味方全体の技
function statusMoveForAllOfUs(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( poke.myMove.name == "アシストギア" ) {
            changeMyRank(tgt.poke, "atk", 1)
            changeMyRank(tgt.poke, "sp_atk", 1)
        }
        if ( poke.myMove.name == "アロマセラピー" ) {
            // writeLog(`心地よい 香りが 広がった !`)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myAilment}が 治った !`)
            resetAilment(tgt.poke)
        }
        if ( poke.myMove.name == "いのちのしずく" ) {
            const damage = Math.floor(tgt.poke.myFull_HP / 4 * isDynamax(tgt.poke))
            changeHP(tgt.poke, damage, "+" )
        }
        if ( poke.myMove.name == "いやしのすず" ) {
            // writeLog(`鈴の音が響き渡った !`)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myAilment}が 治った !`)
            resetAilment(poke)
        }
        if ( poke.myMove.name == "コーチング" ) {
            changeMyRank(tgt.poke, "atk", 1)
            changeMyRank(tgt.poke, "def", 1)
        }
        if ( poke.myMove.name == "じばそうさ" ) {
            changeMyRank(tgt.poke, "def", 1)
            changeMyRank(tgt.poke, "sp_def", 1)
        }
        if ( poke.myMove.name == "ジャングルヒール" ) {
            if ( tgt.poke.myRest_hp < tgt.poke.myFull_hp ) {
                const damage = Math.floor(tgt.poke.myFull_HP / 4 * isDynamax(tgt.poke))
                changeHP(tgt.poke, damage, "+")
            }
            if ( !tgt.poke.myAilment ) {
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ${tgt.poke.myAilment}が 治った !`)
                tgt.poke.myAilment = false
            }
        }
        if ( poke.myMove.name == "とおぼえ" ) {
            changeMyRank(tgt.poke, "atk", 1)
        }
    }
}

// 対象が相手全体の技
function statusMoveForAllOfYou(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( poke.myMove.name == "あまいかおり" ) {
            changeRank(tgt.poke, "evation", -2, isSpirit(poke, tgt.poke))
        }
        if ( poke.myMove.name == "いとをはく" ) {
            changeRank(tgt.poke, "speed", -2, isSpirit(poke, tgt.poke))
        }
        if ( poke.myMove.name == "かいふくふうじ" ) {
            tgt.poke.myCondition.myHeal_block = 1
        }
        if ( poke.myMove.name == "しっぽをふる" ) {
            changeRank(tgt.poke, "def", -1, isSpirit(poke, tgt.poke))
        }
        if ( poke.myMove.name == "ダークホール" ) {
            getAbnormal(tgt.poke, "ねむり")
        }
        if ( poke.myMove.name == "どくガス" ) {
            getAbnormal(tgt.poke, "どく")
        }
        if ( poke.myMove.name == "なきごえ" ) {
            changeRank(tgt.poke, "atk", -1, isSpirit(poke, tgt.poke))
        }
        if ( poke.myMove.name == "にらみつける" ) {
            changeRank(tgt.poke, "def", -1, isSpirit(poke, tgt.poke))
        }
        if ( poke.myMove.name == "ベノムトラップ" ) {
            changeRank(tgt.poke, "atk", -1, isSpirit(poke, tgt.poke))
            changeRank(tgt.poke, "sp_atk", -1, isSpirit(poke, tgt.poke))
            changeRank(tgt.poke, "speed", -1, isSpirit(poke, tgt.poke))
        }
        if ( poke.myMove.name == "ゆうわく" ) {
            changeRank(tgt.poke, "sp_atk", -2, isSpirit(poke, tgt.poke))
        }
        if ( poke.myMove.name == "わたほうし" ) {
            changeRank(tgt.poke, "speed", -2, isSpirit(poke, tgt.poke))
        }
    }
}

// 対象が味方1体の技
function statusMoveForOneOfUs(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( poke.myMove.name == "アロマミスト" ) {
            changeMyRank(tgt.poke, "sp_def", 1)
        }
        if ( poke.myMove.name == "てだすけ" ) {
            tgt.poke.myCondition.myHelping_hand += 1
            writeLog(`${tgt.poke.myName} を 手助けする 体勢に入った !`)
        }
        if ( poke.myMove.name == "てをつなぐ" ) {
            writeLog(`${tgt.poke.myName} と 手を繋いだ`)   
        }
    }
}

// 対象が全体の技
function statusMoveForAll(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( poke.myMove.name == "おちゃかい" ) {
            eatBerryImmediately(tgt.poke)
        }
        if ( poke.myMove.name == "たがやす" ) {
            changeRank(tgt.poke, "atk", 1, isSpirit(poke, tgt.poke))
            changeRank(tgt.poke, "sp_atk", 1, isSpirit(poke, tgt.poke))
        }
        if ( poke.myMove.name == "フラワーガード" ) {
            
        }
        if ( poke.myMove.name == "ほろびのうた" ) {
            tgt.poke.myCondition.myPerish_song = 4
        }
    }
}

// 対象が不定の技
function statusMoveForSomeone(poke) {
    if ( poke.myMove.name ==  "さきどり" ) {
        // ここまで到達することはない
    }
    if ( poke.myMove.name == "のろい" ) {

    }
}

// 対象が自分か味方の技
function statusMoveForEitherOfUs(poke) {
    if ( poke.myMove.name == "つぼをつく" ) {

    }
}

// 対象が自分以外の技
function statusMoveForExceptForMe(poke) {
    if ( poke.myMove.name == "ふしょくガス" ) {

    }
    if ( poke.myMove.name == "フラフラダンス" ) {

    }
}

































// 対象が1体選択の技
function statusMoveForOneOfThem(poke) {
    const tgt = poke.myTarget[0]

    if ( poke.myMove.name == "いばる" || poke.myMove.name == "おだてる" ) {
        // if (user[0].f_con.includes("しんぴのまもり" ) && con.ability != "すりぬけ" ) return
        // if (user[0].f_con.includes("しんぴのまもり" ) && isAbility(me, con) && (tgt.parent == con.parent)) return
    }

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

    // その他の効果
    if ( poke.myMove.name == "あくび" ) {
        tgt.poke.myCondition.myYawn = 1
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 眠気に襲われた`)
    }
    if ( poke.myMove.name == "あくむ" ) {
        tgt.poke.myCondition.myNightmare = true
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 悪夢に襲われた`)
    }
    if ( poke.myMove.name == "アンコール" ) {
        tgt.poke.myCondition.myEncore_turn = 1
        tgt.poke.myCondition.myEncore_move = tgt.poke.myCondition.myHistory[0].name
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は アンコールを受けた`)
    }
    if ( poke.myMove.name == "いえき" ) {
        tgt.poke.myCondition.No_ability = true
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 特性が 無効になった !`)
    }
    if ( poke.myMove.name == "いたみわけ" ) {
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と お互いのHPを 分け合った`)
        const atk_HP = poke.myRest_hp
        const def_HP = tgt.poke.myRest_hp
        const num = ( tgt.poke.myCondition.myDynamax )? {first: 2, second: def_HP / 2} : {first: 1, second: 0}
        poke.myRest_hp = Math.min(Math.floor((atk_HP + def_HP / num.first) / 2), poke.myFull_hp)
        tgt.poke.myRest_hp = Math.min(Math.floor((atk_HP + def_HP / num.first) / 2 + num.second), tgt.poke.myFull_hp)
    }
    if ( poke.myMove.name == "いちゃもん" ) {
        tgt.myCondition.myTorment = true
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は いちゃもんを受けた`)
    }
    if ( poke.myMove.name == "いやしのはどう" ) {
        const damage = ( poke.myAbility == "メガランチャー" && isAbility(poke) )? 
            Math.fiveCut(tgt.poke.myFull_HP * 3 / 4 * isDynamax(tgt.poke)) :
            Math.ceil(tgt.poke.myFull_HP / 2 * isDamage(tgt.poke))
        changeHP(tgt, damage, "+")
    }
    if ( poke.myMove.name == "うらみ" ) {
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myCondition.myHistory[0].name}の PPを4減らした !`)
        for ( let i = 0; i < 4; i++ ) {
            if ( tgt.poke.myCondition.myHistory[0].name == tgt[`myMove_${i}`] ) {
                tgt[`myRest_pp_${i}`] = Math.max(tgt[`myRest_pp_${i}`] - 4, 0)
            }
        }
    }
    if ( poke.myMove.name == "おきみやげ" ) {
        poke.myRest_hp = 0
        toHand(poke)
    }
    if ( poke.myMove.name == "おさきにどうぞ" ) {

    }
    if ( poke.myMove.name == "かぎわける" || poke.myMove.name == "みやぶる" ) {
        tgt.poke.myCondition.myForesight = true
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 正体を見破られた`)
    }
    if ( poke.myMove.name == "かなしばり" ) {
        tgt.poke.myCondition.myDisable_move = tgt.poke.myCondition.myHistory[0].name
        tgt.poke.myCondition.myDisable_turn = 1
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 金縛りを受けた`)
    }
    if ( poke.myMove.name == "ガードシェア" ) {
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と お互いの 防御と 特防を 共有した`)
        const atk_B = poke.myDef
        const atk_D = poke.mySp_def
        const def_B = tgt.poke.myDef
        const def_D = tgt.poke.mySp_def
        poke.myDef        = Math.floor((atk_B + def_B) / 2)
        tgt.poke.myDef    = Math.floor((atk_B + def_B) / 2)
        poke.mySp_def     = Math.floor((atk_D + def_D) / 2)
        tgt.poke.mySp_def = Math.floor((atk_D + def_D) / 2)
    }
    if ( poke.myMove.name == "ガードスワップ" ) {
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と お互いの 防御ランクと 特防ランクを 入れ替えた`)
        const atk_B = poke.myRank_def
        const atk_D = poke.myRank_sp_def
        const def_B = tgt.poke.myRank_def
        const def_D = tgt.poke.myRank_sp_def
        poke.myRank_def         = def_B
        poke.myRank_sp_def      = def_D
        tgt.poke.myRank_def     = atk_B
        tgt.poke.myRank_sp_def  = atk_D
    }
    if ( poke.myMove.name == "きりばらい" ) {
        // 回避率低下が防がれた後にしろいきりが解除される

        // 対象の場だけ解除
        if ( isField(tgt.poke).myReflect ) {
            isField(tgt.poke).myRecycle = false
            isField(tgt.poke).myReflect_clay = false
            writeLog(`${tgt.poke.myTN} の場の リフレクターが消え去った`)
        }
        if ( isField(tgt.poke).myLight_screen ) {
            isField(tgt.poke).myLight_screen = false
            isField(tgt.poke).myLight_clay = false
            writeLog(`${tgt.poke.myTN} の場の ひかりのかべが消え去った`)
        }
        if ( isField(tgt.poke).myAurora_vail ) {
            isField(tgt.poke).myAurora_vail = false
            isField(tgt.poke).myAurora_clay = false
            writeLog(`${tgt.poke.myTN} の場の オーロラベールが消え去った`)
        }
        if ( isField(tgt.poke).mySafeguard ) {
            isField(tgt.poke).mySafeguard = false
            writeLog(`${tgt.poke.myTN} の場の しんぴのまもりが消え去った`)
        }
        if ( isField(tgt.poke).myMist ) {
            isField(tgt.poke).myMist = false
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
    }
    if ( poke.myMove.name == "ギフトパス" ) {
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に ${poke.myItem}を プレゼントした`)
        tgt.poke.myItem = poke.myItem
        poke.myItem = ""
        eatBerryInPinch(tgt)
        eatBerryInAbnormal(tgt)
    }
    if ( poke.myMove.name == "クモのす" || poke.myMove.name == "くろいまなざし" || poke.myMove.name == "とおせんぼう" ) {
        tgt.poke.myCondition.myCant_escape = poke.myID
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 逃げられなくなった`)
    }
    if ( poke.myMove.name == "こころのめ" || poke.myMove.name == "ロックオン" ) {
        tgt.poke.myCondition.myLock_on = 1
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 狙いを定めた`)
    }
    if ( poke.myMove.name == "サイコシフト" ) {
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に ${poke.myAilment} を移した`)
        tgt.poke.myAilment     = poke.myAilment     // 状態異常回復
        tgt.poke.myAsleep      = poke.myAsleep      // ねむり経過ターン数
        tgt.poke.myAsleep_turn = poke.myAsleep_turn // ねむりから覚めるターン数
        tgt.poke.myRest        = poke.myRest        // ねむる経過ターン数
        tgt.poke.myBad_poison  = poke.myBad_poison  // もうどく経過ターン数
        resetAilment(poke)
    }
    if ( poke.myMove.name == "さいはい" ) {
        // const _move = moveSearchByName(tgt.used)
        // moveEffect(user[0], user[1], tgt, _move)
    }
    if ( poke.myMove.name == "さきおくり" ) {

    }
    if ( poke.myMove.name == "さしおさえ" ) {
        tgt.poke.myCondition.myEmbargo = true
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 道具を差し押さえられた`)
    }
    if ( poke.myMove.name == "シンプルビーム" ) {
        tgt.poke.myAbility = "たんじゅん"
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 特性が『たんじゅん』になった !`)
    }
    if ( poke.myMove.name == "じこあんじ" ) {
        const parameter = ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]
        for ( const para of parameter ) poke[`myRank_${para}`] = tgt[`myRank_${para}`] // ランク変化
        poke.myCondition.myCritical = tgt.poke.myCondition.myCritical                  // きゅうしょアップ
        poke.myCondition.myChi_strike = tgt.poke.myCondition.myChi_strike              // キョダイシンゲキ
        if ( tgt.poke.myCondition.myLaser_focus ) poke.myCondition.myLaser_focus = 1   // とぎすます

        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 能力変化を コピーした`)
    }
    if ( poke.myMove.name == "じょうか" ) {
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myAilment}が なおった !`)
        resetAilment(tgt)
        changeHP(poke, fiveCut(poke.myFull_hp / 2), "+")
    }
    if ( poke.myMove.name == "スキルスワップ" ) {
        const save = poke.myAbility
        poke.myAbility = tgt.poke.myAbility
        tgt.poke.myAbility = save
        writeLog(`${poke.myTN} の ${poke.myName} は　特性『${poke.myAbility}』 になった`)
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 特性『${tgt.poke.myAbility}』 になった`)
        activateAbility(poke)
        activateAbility(tgt.poke)
    }
    if ( poke.myMove.name == "スケッチ" ) {
        const s_move = moveSearchByName(tgt.poke.myCondition.myHistory[0].name)
        poke[`myMove_${poke.myCmd_move}`] = s_move.name
        poke[`myFull_pp_${poke.myCmd_move}`] = s_move.PP
        poke[`myRest_pp_${poke.myCmd_move}`] = s_move.PP
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${s_move.name} を スケッチした`)
    }
    if ( poke.myMove.name == "すてゼリフ" ) {
        /*
        if (isBench(me) && !con.p_con.includes("技『すてゼリフ』　A失敗" ) && !con.p_con.includes("技『すてゼリフ』　C失敗" )) toHand(me, you, con)
        removeText(con.p_con, "技『すてゼリフ』　A失敗" )
        removeText(con.p_con, "技『すてゼリフ』　C失敗" )
        */
    }
    if ( poke.myMove.name == "スピードスワップ" ) {
        const atk_S = poke.mySpeed
        poke.mySpeed = tgt.poke.mySpeed
        tgt.poke.mySpeed = atk_S
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と 素早さを入れ替えた`)
    }
    if ( poke.myMove.name == "スポットライト" ) {
        tgt.poke.myCondition.mySpotlight = "スポットライト"
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 注目の的になった`)
    }
    if ( poke.myMove.name == "すりかえ" || poke.myMove.name == "トリック" ) {
        const atk_item = poke.myItem
        poke.myItem = tgt.poke.myItem
        tgt.poke.myItem = atk_item
        if ( poke.myItem != "" ) writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を 手に入れた`)
        if ( tgt.poke.myItem != "" ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ${tgt.poke.myIitem} を 手に入れた`)
        if ( poke.myAbility == "かるわざ" && isAbility(poke) && poke.myItem == "" ) poke.myCondition.myUnburden = true
        if ( tgt.poke.myAbility == "かるわざ" && isAbility(tgt) && tgt.poke.myItem == "" ) tgt.poke.myCondition.myUnburden = true
    }
    if ( poke.myMove.name == "そうでん" ) {
        tgt.poke.myCondition.myElectrify = true
        writeLog(`${poke.myTN} の ${poke.myName} は 電気を 流し込まれた`)
    }
    if ( poke.myMove.name == "タールショット" ) {
        tgt.poke.myCondition.myTar_shot = true
        writeLog(`${poke.myTN} の ${poke.myName} は 火に弱くなった`)
    }
    if ( poke.myMove.name == "たこがため" ) {
        tgt.poke.myCondition.myCant_escape = poke.myID
        tgt.poke.myCondition.myOctolock = poke.myID
        writeLog(`${poke.myTN} の ${poke.myName} は 逃げられなくなった`)
    }
    if ( poke.myMove.name == "ちからをすいとる" ) {
        const A_rank = tgt.poke.myCondition.myStrength_sap
        tgt.poke.myCondition.myStrength_sap = false
        ( A_rank > 0 )? rank = (A_rank + 2) / 2 : rank = 2 / (2 - A_rank)
        changeHP(poke, Math.floor(tgt.poke.myAtk * rank * isBig_root(poke)), isOoze(tgt))
    }
    if ( poke.myMove.name == "ちょうはつ" ) {
        tgt.poke.myCondition.myTaunt = 1
        writeLog(`${poke.myTN} の ${poke.myName} は 挑発に乗ってしまった`)
        // if (user[0].f_con.includes("交代済" + tgt.child) || tgt.com != "" ) tgt.p_con += "状態変化『ちょうはつ』　3/3" + "\n"
        // if (tgt.com == "" ) tgt.p_con += "状態変化『ちょうはつ』　4/4" + "\n"
    }
    if ( poke.myMove.name == "テクスチャー2" ) {
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
    }
    if ( poke.myMove.name == "テレキネシス" ) {
        tgt.poke.myCondition.myTelekinesis = 1
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 宙に浮かんだ`)
    }
    if ( poke.myMove.name == "なかまづくり" ) {
        tgt.poke.myAbility = poke.myAbility
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 特性『${tgt.poke.myAbility}』 になった`)
    }
    if ( poke.myMove.name == "なやみのタネ" ) {
        tgt.poke.myAbility = "ふみん"
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 特性『ふみん』 になった`)
        // activateAbility(user[0], user[1], tgt)
    }
    if ( poke.myMove.name == "なりきり" ) {
        poke.myAbility = tgt.poke.myAbility
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 特性『${tgt.poke.myAbility}』 を コピーした !`)
        // activateAbility(me, you, con)
    }
    if ( poke.myMove.name == "ハートスワップ" ) {
        const parameter = ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]
        for ( const para of parameter ) {
            let atk_rank = poke[`myRank_${para}`]
            poke[`myRank_${para}`] = tgt[`myRank_${para}`]
            tgt[`myRank_${para}`] = atk_rank
        }
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と 能力変化を入れ替えた`)
    }
    if ( poke.myMove.name == "ハロウィン" ) {
        if ( tgt.poke.myCondition.myForest_curse ) {
            tgt.poke.myType = tgt.poke.myType.pop()
            tgt.poke.myCondition.myForest_curse = false
        }
        tgt.poke.myType.push("ゴースト")
        tgt.poke.myCondition.myHalloween = true
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に ゴーストタイプが追加された`)
    }
    if ( poke.myMove.name == "パワーシェア" ) {
        const A_A = poke.myAtk
        const B_A = tgt.poke.myAtk
        const A_C = poke.mySp_atk
        const B_C = tgt.poke.mySp_atk
        poke.myAtk    = Math.floor((A_A + B_A) / 2)
        tgt.poke.myAtk     = Math.floor((A_A + B_A) / 2)
        poke.mySp_atk = Math.floor((A_C + B_C) / 2)
        tgt.poke.mySp_atk  = Math.floor((A_C + B_C) / 2)
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と 攻撃と特攻を分け合った`)
    }
    if ( poke.myMove.name == "パワースワップ" ) {
        const A_A = poke.myRank_atk
        const B_A = tgt.poke.myRank_atk
        const A_C = poke.myRank_sp_atk
        const B_C = tgt.poke.myRank_sp_atk
        poke.myRank_atk    = B_A
        tgt.poke.myRank_atk     = A_A
        poke.myRank_sp_atk = B_C
        tgt.poke.myRank_sp_atk  = A_C
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} と 攻撃ランクと特攻ランクを入れ替えた`)
    }
    if ( poke.myMove.name == "ひっくりかえす" ) {
        const parameter = ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]
        for ( const para of parameter ) {
            tgt[`myRank_${para}`] *= -1
        }
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 能力ランクをひっくり返した`)
    }
    if ( poke.myMove.name == "ふきとばし" || poke.myMove.name == "ほえる" ) {
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 手持ちに戻された !`)
        const position = tgt.poke.myPosition       // 現在の位置
        const next = shuffle(isBench(tgt.poke))[0] // 次に出すポケモン
        console.log(position)
        console.log(next)
        toHand(tgt.poke)                           // 戻す
        summon(next, position)                     // 出す
    }
    if ( poke.myMove.name == "フラワーヒール" ) {
        ( fieldStatus.myGrassy )? num = 2732 / 4096 : num = 1 / 2
        ( tgt.poke.myCondition.myDynamax )? dyna = 1 / 2 : dyna = 1
        changeHP(tgt, fiveCut(tgt.poke.myFull_hp * num * dyna), "+")
    }
    if ( poke.myMove.name == "ふんじん" ) {
        tgt.poke.myCondition.myPowder = true
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の周りに 粉塵が舞った`)
    }
    if ( poke.myMove.name == "へんしん" ) { // && !def.con.p_con.includes("みがわり" ) && !def.con.p_con.includes("イリュージョン" )) {
        // afn.metamon(atk, def)
    }
    if ( poke.myMove.name == "まほうのこな" ) {
        tgt.poke.myType = ["エスパー"]
        tgt.poke.myCondition.myHalloween    = false // ハロウィン
        tgt.poke.myCondition.myForest_curse = false // もりののろい
        tgt.poke.myCondition.myRoost        = false // はねやすめ
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は エスパータイプになった`)
    }
    if ( poke.myMove.name == "みずびたし" ) {
        tgt.poke.myType = ["みず"]
        tgt.poke.myCondition.myHalloween    = false // ハロウィン
        tgt.poke.myCondition.myForest_curse = false // もりののろい
        tgt.poke.myCondition.myRoost        = false // はねやすめ
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は みずタイプになった`)
    }
    if ( poke.myMove.name == "ミラータイプ" ) {
        poke.myType = [].concat(tgt.poke.myType)
        poke.myCondition.myHalloween    = false // ハロウィン
        poke.myCondition.myForest_curse = false // もりののろい
        poke.myCondition.myRoost        = false // はねやすめ
        writeLog(`${poke.myTN} の ${poke.myName} は ${tgt.poke.myTN} の ${tgt.poke.myName} と タイプが同じになった`)
    }
    if ( poke.myMove.name == "ミラクルアイ" ) {
        tgt.poke.myCondition.myMiracle_eye = true
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 正体を見破られた`)
    }
    if ( poke.myMove.name == "メロメロ" ) {
        tgt.poke.myCondition.myAttract = poke.myID
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ${poke.myName} にメロメロになった`)
    }
    if ( poke.myMove.name == "ものまね" ) {
        /*
        con["move_" + con.com] = moveSearchByName(tgt.used).name
        con["PP_" + con.com] = moveSearchByName(tgt.used).PP
        con["last_" + con.com] = moveSearchByName(tgt.used).PP
        writeLog(me, you, tgt.TN + "　の　" + tgt.name + "の　" + tgt.used +"を　コピーした" + "\n" )
        con.p_con += "技『ものまね』　" + con.com + "\n"
        */
    }
    if ( poke.myMove.name == "もりののろい" ) {
        if ( tgt.poke.myCondition.myHalloween ) {
            tgt.poke.myType = tgt.poke.myType.pop()
            tgt.poke.myCondition.myHalloween = false
        }
        tgt.poke.myType.push("くさ")
        tgt.poke.myCondition.myForest_curse = true
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に くさタイプが追加された`)
    }
    if ( poke.myMove.name == "やどりぎのタネ" ) {
        tgt.poke.myCondition.myLeech_seed = poke.myParty + ":" + poke.myPosition
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は タネを植え付けられた`)
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
    if ( poke.myMove.name == "アクアリング" ) {
        poke.myCondition.myAqua_ring = true
        writeLog(`${poke.myTN} の ${poke.myName} は 水をまとった`)
    }
    if ( poke.myMove.name == "あさのひざし" || poke.myMove.name == "こうごうせい" || poke.myMove.name == "つきのひかり" ) {
        // writeLog(me, you, con.name + "　の　HPが回復した" + "\n" )
        if ( isSunny(poke) ) {
            changeHP(poke, fiveCut(poke.myFull_hp * 2732 / 4096), "+")
        } else if ( isRainy(poke) || isSandy(poke) || isSnowy(poke)) {
            changeHP(poke, fiveCut(poke.myFull_hp / 4), "+")
        } else {
            changeHP(poke, fiveCut(poke.myFull_hp / 2), "+")
        }
    }
    if ( poke.myMove.name == "いかりのこな" || poke.myMove.name == "このゆびとまれ" ) {
        poke.myCondition.mySpotlight = poke.myMove.name
        writeLog(`${poke.myTN} の ${poke.myName} は 注目の的になった`)
    }
    if ( poke.myMove.name == "いやしのねがい" ) {
        return
        me.f_con += "いやしのねがい：" + con.child + "\n"
        con.last_HP = 0
    }
    if ( poke.myMove.name == "おいわい" ) {
        writeLog(`おめでとう ! ${poke.myTN} !!`)
    }
    if ( poke.myMove.name == "おんねん" ) {
        poke.myCondition.myGrudge = true
        writeLog(`${poke.myTN} の ${poke.myName} は おんねんをかけようとしている`)
    }
    if ( poke.myMove.name == "かいふくしれい" || poke.myMove.name == "じこさいせい" || poke.myMove.name == "タマゴうみ" || poke.myMove.name == "なまける" || poke.myMove.name == "ミルクのみ" ) {
        changeHP(poke, Math.ceil(poke.myFull_hp / 2), "+")
    }
    if ( poke.myMove.name == "きあいだめ" ) {
        poke.myCondition.myCritical = true
        writeLog(`${poke.myTN} の ${poke.myName} は 張り切っている`)
    }
    if ( poke.myMove.name == "キングシールド" ) {
        poke.myCondition.myProtect = poke.myMove.name
        writeLog(`${poke.myTN} の ${poke.myName} は 守りの体勢に入った`)
    }
    if ( poke.myMove.name == "こらえる" ) {
        poke.myCondition.myEndure = true
        writeLog(`${poke.myTN} の ${poke.myName} は 堪える体勢に入った`)
    }
    if ( poke.myMove.name == "サイドチェンジ" ) {
        for ( const _poke of myPokeInBattle(poke) ) {
            _poke.myPosition == ( _poke.myPosition + 1 ) % 2
        }
        // if (me.f_con.includes("サイドチェンジ" )) removeText(me.f_con, "サイドチェンジ" )
        // else me.f_con += "サイドチェンジ" + "\n"
        writeLog(`${myPokeInBattle(poke)[0].myName} と ${myPokeInBattle(poke)[1].myName} は 場所を入れ替えた`)
    }
    if ( poke.myMove.name == "じゅうでん" ) {
        poke.myCondition.myCharge = 1
        writeLog(`${poke.myTN} の ${poke.myName} は 充電を開始した`)
    }
    if ( poke.myMove.name == "すなあつめ" ) {
        ( isSandy(poke) )? num = 2732 / 4096 : num = 1 / 2
        changeHP(poke, fiveCut(poke.myFull_hp * num), "+")
    }
    if ( poke.myMove.name == "せいちょう" ) {
        ( isSunny(poke) )? num = 2 : num = 1
        changeMyRank(poke, "atk", num)
        changeMyRank(poke, "sp_atk", num)
    }
    if ( poke.myMove.name == "ソウルビート" ) {
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
    }
    if ( poke.myMove.name == "たくわえる" ) {
        poke.myStockpile += 1
        poke.myCondition.myStockpile_B += 1
        poke.myCondition.myStockpile_D += 1
        writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myStockpile}つ　たくわえた`)
    }
    if ( poke.myMove.name == "テクスチャー" ) {
        const type = moveSearchByName(poke.myMove_0).type
        poke.myType = [type]
        poke.myCondition.myHalloween    = false // ハロウィン
        poke.myCondition.myForest_curse = false // もりののろい
        writeLog(`${poke.myTN} の ${poke.myName} は ${type}タイプに なった`)
    }
    if ( poke.myMove.name == "テレポート" ) {
        /*
        toHand(me, you, con)
        me.f_con += "交代中" + con.child + "\n"
        writeLog(me, you, con.TN + "　は　戦闘に出すポケモンを選んでください" + "\n" )
        */
    }
    if ( poke.myMove.name == "でんじふゆう" ) {
        poke.myCondition.myElectrify = 1
        writeLog(`${poke.myTN} の ${poke.myName} は 宙に浮かんだ`)
    }
    if ( poke.myMove.name == "トーチカ" ) {
        poke.myCondition.myProtect = "トーチカ"
        writeLog(`${poke.myTN} の ${poke.myName} は 守りの体勢に入った`)
    }
    if ( poke.myMove.name == "とぎすます" ) {
        poke.myCondition.myLaser_focus = 1
        writeLog(`${poke.myTN} の ${poke.myName} は 集中している`)
    }
    if ( poke.myMove.name == "ニードルガード" ) {
        poke.myCondition.myProtect = "ニードルガード"
        writeLog(`${poke.myTN} の ${poke.myName} は 守りの体勢に入った`)
    }
    if ( poke.myMove.name == "ねがいごと" ) {
        isField(poke).myWish_heal = Math.floor(poke.myFull_hp / 2)
        isField(poke).myWish_turn = 1
        writeLog(`${poke.myTN} の ${poke.myName} は 願い事をした !`)
    }
    if ( poke.myMove.name == "ねむる" ) {
        resetAilment(poke)
        poke.myAilment = "ねむり"
        poke.myRest = 1
        changeHP(poke, poke.myFull_hp, "+")
        writeLog(`${poke.myTN} の ${poke.myName} は 眠って元気になった`)
    }
    if ( poke.myMove.name == "ねをはる" ) {
        poke.myCondition.myIngrain = true
        writeLog(`${poke.myTN} の ${poke.myName} は 根を張った`)
    }
    if ( poke.myMove.name == "のみこむ" ) {
        const num = Math.max(poke.myCondition.myStockpile_B, poke.myCondition.myStockpile_D)
        const damage = fiveCut(poke.myFull_HP * Math.pow(2, num) / 8)
        changeHP(poke, damage, "+")
        changeMyRank(poke, "def", -1 * poke.myCondition.myStockpile_B)
        changeMyRank(poke, "sp_def", -1 * poke.myCondition.myStockpile_D)
        poke.myCondition.myStockpile_B = 0
        poke.myCondition.myStockpile_D = 0
        writeLog(`${poke.myTN} の ${poke.myName} の たくわえが なくなった !`)
    }
    if ( poke.myMove.name == "はいすいのじん" ) {
        if ( poke.myCondition.myNo_retreat ) return
        poke.myCondition.myNo_retreat = true
        poke.myCondition.myCant_escape = poke.myID
        writeLog(`${poke.myTN} の ${poke.myName} は 背水の陣で 逃げることが できなくなった !`)
    }
    if ( poke.myMove.name == "はねやすめ" ) {
        const damage = Math.ceil(poke.myFull_HP / 2)
        changeHP(poke, damage, "+")
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
    }
    if ( poke.myMove.name == "はねる" ) {
        writeLog(`しかし 何も起こらなかった`)
    }
    if ( poke.myMove.name == "はらだいこ" ) {
        poke.myRest_hp -= Math.floor(poke.myFull_hp / 2)
        changeMyRank(poke, "atk", 12)
        writeLog(`${poke.myTN} の ${poke.myName} は 体力を削ってパワー全開 !`)
    }
    if ( poke.myMove.name == "バトンタッチ" ) {
        /*
        for (const p of con.p_con.split("\n" )) {
            for (const line of batonPassCondition) {
                if (p.includes(line)) {
                    me.f_con += "技『バトンタッチ』(状態変化)" + p + "\n"
                }
            }
        }
        const rank = con.A_rank + "/" + con.B_rank + "/" + con.C_rank + "/" + con.D_rank + "/" + con.S_rank + "/" + con.X_rank + "/" + con.Y_rank
        me.f_con += "技『バトンタッチ』(ランク)" + rank + "\n"

        toHand(me, you, con)

        me.f_con += "選択中：" + con.child + "：『技』" + "\n"
        writeLog(me, you, con.TN + "　は　戦闘に出すポケモンを選んでください" + "\n" )
        return true
        */
    }
    if ( poke.myMove.name == "パワートリック" ) {
        const Aval = poke.myAtk
        const Bval = poke.myDef
        poke.myAtk = Bval
        poke.myDef = Aval
        poke.myCondition.myPower_trick = true
        writeLog(`${poke.myTN} の ${poke.myName} は 自分の攻撃と防御を 入れ替えた`)
    }
    if ( poke.myMove.name == "ふういん" ) {
        poke.myCondition.myImprison = true
        writeLog(`${poke.myTN} の ${poke.myName} は 自分の技を封印した`)
    }
    if ( poke.myMove.name == "ブロッキング" ) {
        poke.myCondition.myProtect = "ブロッキング"
        writeLog(`${poke.myTN} の ${poke.myName} は 守りの体勢に入った`)
    }
    if ( poke.myMove.name == "ほおばる" ) {
        /*
        eatBerryImmediately(me, you, con, con.item)
        enableToRecycle(me, con)
        */
    }
    if ( poke.myMove.name == "ほごしょく" ) {
        if ( fieldStatus.myGrassy )        poke.myType = ["くさ"]
        else if ( fieldStatus.myElectric ) poke.myType = ["でんき"]
        else if ( fieldStatus.myMisty )    poke.myType = ["フェアリー"]
        else if ( fieldStatus.myPsychic )  poke.myType = ["エスパー"]
        else                               poke.myType = ["ノーマル"]
        writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myType[0]}タイプになった`)
    }
    if ( poke.myMove.name == "ボディパージ" ) {
        poke.myCondition.myAutotomize += 1
        writeLog(`${poke.myTN} の ${poke.myName} は 身軽になった`)
    }
    if ( poke.myMove.name == "マジックコート" ) {
        poke.myCondition.myMagic_coat = true
        writeLog(`${poke.myTN} の ${poke.myName} は マジックコートに包まれた`)
    }
    if ( poke.myMove.name == "まもる" ) {
        poke.myCondition.myProtect = "まもる"
        writeLog(`${poke.myTN} の ${poke.myName} は 守りの体勢に入った`)
    }
    if ( poke.myMove.name == "まるくなる" ) {
        poke.myCondition.myDefense_curl = true
    }
    if ( poke.myMove.name == "みかづきのまい" ) {
        /*
        me.f_con += "みかづきのまい" + "\n"
        con.last_HP = 0
        */
    }
    if ( poke.myMove.name == "みがわり" ) {
        const substitute_hp = Math.floor(poke.myFull_hp / 4)
        poke.myRest_hp               -= substitute_hp // 残り体力の減少
        poke.myCondition.mySubstitute = substitute_hp // みがわり体力の記録
        showHPbar(poke)
        resetBind(poke)
        eatBerryInPinch(poke)
        writeLog(`${poke.myTN} の ${poke.myName} の 身代わりが 現れた`)
    }
    if ( poke.myMove.name == "みきり" ) {
        poke.myCondition.myProtect = "みきり"
        writeLog(`${poke.myTN} の ${poke.myName} は 守りの体勢に入った`)
    }
    if ( poke.myMove.name == "みちづれ" ) {
        poke.myCondition.myDestiny_bond = true
        writeLog(`${poke.myTN} の ${poke.myName} は 相手を道連れにしようとしている`)
    }
    if ( poke.myMove.name == "よこどり" ) {

    }
    if ( poke.myMove.name == "リサイクル" ) {
        poke.myItem = poke.myRecycle
        poke.myRecycle = false
        writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem}を 拾ってきた`)
        eatBerryInPinch(poke)
        eatBerryInAbnormal(poke)
    }
    if ( poke.myMove.name == "リフレッシュ" ) {
        writeLog(`心地よい香りが広がった !`)
        resetAilment(poke)
    }

    
}


