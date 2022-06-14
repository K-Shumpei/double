// ターン終了時の処理順
function endProcess(){

    writeLog(`---------- ターン終了時の処理 ----------`)

    // 1.てんきの効果
    weatherEffect()
    // 2.みらいよち/はめつのねがい: 技が使用された順に発動
    futureAttack()
    // 3.ねがいごと
    wishRecover()
    // 4.場の状態・特性・もちものによる回復・ダメージ
    fieldAbilityItemDamage()
    // 5.アクアリング
    aquaRing()
    // 6.ねをはる
    ingrain()
    // 7.やどりぎのタネ
    leechSeed()
    // 8 どく/もうどく/ポイズンヒール
    acidCheck()
    // 9 やけど
    burnCheck()
    // 10.あくむ
    nightmare()
    // 11.のろい
    curse()
    // 12.バインド
    bindCheck()
    // 13.たこがため
    octolock()
    // 14.ちょうはつの終了
    tauntEnd()
    // 15.アンコールの終了
    encoreEnd()
    // 16.かなしばりの終了
    disableEnd()
    // 17.でんじふゆうの終了
    magnetRiseEnd()
    // 18.テレキネシスの終了
    telekinesisEnd()
    // 19.かいふくふうじの終了
    healBlockEnd()
    // 20.さしおさえの終了
    embargoEnd()
    // 21.ねむけ
    sleepCheck()
    // 22.ほろびのうた
    perishSong()
    // 23.片側の場の状態の継続/終了: ホスト側の状態が先にすべて解除された後に、ホストでない側の状態が解除される。
    oneSideFieldEnd()
    // 24.全体の場の状態の継続/終了
    bothSideFieldEnd()
    // 25.はねやすめ解除
    roostEnd()
    // 26.その他の状態・特性・もちもの
    otherConditionAbilityItem()
    // 27.ダルマモード
    zenMode()
    // 28.リミットシールド
    shieldsDown()
    // 29.スワームチェンジ
    powerConstruct()
    // 30.ぎょぐん
    schooling()
    // 31.はらぺこスイッチ
    hungerSwitch()

    // A.その他の終了
    otherEnd()

    writeLog(`---------- ターン終了 ----------`)

    // ダイマックスの終了
    dynamaxEnd()

    // C.ひんしのポケモンがいる時、交換する
    returnFaintedPokemon()
    // D.次ターンの、選択ボタンの無効化
    // afn.cannotChooseAction()

    // ターン終了の記録
    fieldStatus.myTurn_end = true
}

// A.その他の終了
function otherEnd(){
    // ポケモンの状態の終了
    for ( const poke of allPokeInBattle() ) {
        // 攻撃対象の削除
        poke.myTarget = []
        // アイスボール
        if ( poke.myCondition.myIce_ball == 5 ) poke.myCondition.myIce_ball = 0
        // ころがる
        if ( poke.myCondition.myRollout == 5 ) poke.myCondition.myRollout = 0
        // くちばしキャノン
        poke.myCondition.myBeak_blast = false
        // ロックオン
        if ( poke.myCondition.myLock_on == 1 ) poke.myCondition.myLock_on = 2
        else if ( poke.myCondition.myLock_on == 2 ) poke.myCondition.myLock_on = 0
        // こらえる
        poke.myCondition.myEndure = false
        // ひるみ
        poke.myCondition.myFlinch = false
        // ちゅうもくのまと
        poke.myCondition.mySpotlight = false
        // そうでん
        poke.myCondition.myElectrify = false
        // てだすけ
        poke.myCondition.myHelping_hand = 0
        // ダメおし
        poke.myCondition.myAssurance = false
        // まもる
        poke.myCondition.myProtect = false
        // ふんじん
        poke.myCondition.myPowder = false
        // ランク上昇
        poke.myCondition.myRank_up = false
        // ランク下降
        poke.myCondition.myRank_down = false
        // トラップシェル
        poke.myCondition.myShell_trap = false
        // ダメージ
        poke.myCondition.myDamage = false
        poke.myCondition.myDamage_ID = false
        poke.myCondition.myDamage_nature = false
        // よこどり
        // マジックコート
        poke.myCondition.myMagic_coat = false
        // スキン
        poke.myCondition.mySkin = false
        // ちからずく
        // じごくづき
        if ( poke.myCondition.myThroat_chop == 1 ) poke.myCondition.myThroat_chop = 2
        else if ( poke.myCondition.myThroat_chop == 2 ) poke.myCondition.myThroat_chop = 0
        // じゅうでん
        if ( poke.myCondition.myCharge == 1 ) poke.myCondition.myCharge = 2
        else if ( poke.myCondition.myCharge == 2 ) poke.myCondition.myCharge = false
        // とぎすます
        if ( poke.myCondition.myLaser_focus == 1 ) poke.myCondition.myLaser_focus = 2
        else if ( poke.myCondition.myLaser_focus == 2 ) poke.myCondition.myLaser_focus = false
    }

    // 片側のフィールドの状態の終了
    for ( const field of [myField, oppField] ) {
        field.myQuick_guard = false // ファストガード
        field.myWide_guard  = false // ワイドガード
        field.myMat_block   = false // たたみがえし
    }

    // お互いのフィールドの状態の終了
    // トリックガード
    fieldStatus.myCrafty_shield = false
    // プラズマシャワー
    fieldStatus.myIon_deluge    = false
    // エコーボイス
    fieldStatus.myEchoed_check = false
    // フェアリーロック
    if ( fieldStatus.myFaily_lock == 1 ) fieldStatus.myFaily_lock = 2
    else if ( fieldStatus.myFaily_lock == 2 ) fieldStatus.myFaily_lock = false
}

// 技選択肢の無効化　アンコール、いちゃもん、かなしばり、溜め技、ちょうはつ、ふういん

// ダイマックスの終了
function dynamaxEnd(){
    /*
    for (const tgt of order){
        const user = isMe(me, you, tgt)
        if (user[0].data.dynaTxt == "ダイマックス：3/3"){
            user[0].data.dynaTxt = "ダイマックス：2/3"
        } else if (user[0].data.dynaTxt == "ダイマックス：2/3"){
            user[0].data.dynaTxt = "ダイマックス：1/3"
        } else if (user[0].data.dynaTxt == "ダイマックス：1/3"){
            user[0].data.dynaTxt = "ダイマックス（済）"
            user[0].data.gigaTxt = "キョダイマックス（済）"
            writeLog(me, you, tgt.TN + "　の　" + tgt.name + "　の　ダイマックスが　終了した" + "\n")
            tgt.full_HP = Math.ceil(tgt.full_HP / 2)
            tgt.last_HP = Math.ceil(tgt.last_HP / 2)
            user[0]["poke" + tgt.num].last_HP = Math.ceil(user[0]["poke" + tgt.num].last_HP / 2)
        }
        if (user[0].data.gigaTxt == "キョダイマックス：3/3"){
            user[0].data.gigaTxt = "キョダイマックス：2/3"
        } else if (user[0].data.gigaTxt == "キョダイマックス：2/3"){
            user[0].data.gigaTxt = "キョダイマックス：1/3"
        } else if (user[0].data.gigaTxt == "キョダイマックス：1/3"){
            user[0].data.dynaTxt = "ダイマックス（済）"
            user[0].data.gigaTxt = "キョダイマックス（済）"
            writeLog(me, you, tgt.TN + "　の　" + tgt.name + "　の　キョダイマックスが　終了した" + "\n")
            tgt.full_HP = Math.ceil(tgt.full_HP / 2)
            tgt.last_HP = Math.ceil(tgt.last_HP / 2)
            user[0]["poke" + tgt.num].last_HP = Math.ceil(user[0]["poke" + tgt.num].last_HP / 2)
        }
    }
    */
}

// C.ひんしのポケモンがいる時、交換する
function returnFaintedPokemon(){
    for ( const party of [myParty, oppParty] ) {
        if ( faintedJudge(party) ) writeLog(`${party[0].myTN} は 戦闘に出すポケモンを選んでください`)
    }
}


// 1.てんきの効果
function weatherEffect(){
    // a. にほんばれ/あめ/すなあらし/あられの終了
    for ( const weather of ["Sunny", "Rainy", "Sandstorm", "Graupel"] ) {
        if ( fieldStatus[`my${weather}`] ) {
            const turn = ( myField.myWeather_long || oppField.myWeather_long )? 8 : 5
            if ( fieldStatus[`my${weather}`] == turn ) {
                resetWeather()
                if ( weather == "Sunny" )     writeLog(`日差しが元に戻った`)
                if ( weather == "Rainy" )     writeLog(`雨が止んだ`)
                if ( weather == "Sandstorm" ) writeLog(`砂嵐がおさまった`)
                if ( weather == "Graupel" )   writeLog(`あられが止んだ`)
            } else {
                fieldStatus[`my${weather}`] += 1
            }
        }
    }
    // b. すなあらし/あられのダメージ
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myAbility == "ぼうじん" && isAbility(poke) ) continue
        if ( poke.myItem == "ぼうじんゴーグル" && isItem(poke) ) continue
        if ( poke.myCondition.myDig ) continue
        if ( poke.myCondition.myDive ) continue

        const damage_8 = Math.floor(poke.myFull_hp / 8 * isDynamax(poke))
        const damage_16 = Math.floor(poke.myFull_hp / 16 * isDynamax(poke))

        if ( isSandy(poke) ) {
            if ( poke.myType.includes("いわ") ) continue
            if ( poke.myType.includes("じめん") ) continue
            if ( poke.myType.includes("はがね") ) continue
            if ( poke.myAbility == "すながくれ" && isAbility(poke) ) continue
            if ( poke.myAbility == "すなかき" && isAbility(poke) ) continue
            if ( poke.myAbility == "すなのちから" && isAbility(poke) ) continue

            writeLog(`${poke.myTN} の ${poke.myName} を 砂嵐が襲う !`)
            changeHP(poke, Math.max(damage_16, 1), "-")
        }
        else if ( isSnowy(poke) ){
            if ( poke.myType.includes("こおり") ) continue
            if ( poke.myAbility == "アイスボディ" && isAbility(poke) ) continue
            if ( poke.myAbility == "ゆきがくれ" && isAbility(poke) ) continue

            writeLog(`${poke.myTN} の ${poke.myName} を あられが襲う !`)
            changeHP(poke, Math.max(damage_16, 1), "-")
        }
    }
    // c. かんそうはだ/サンパワー/あめうけざら/アイスボディ
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myDig ) continue
        if ( poke.myCondition.myDive ) continue
        if ( !isAbility(poke) ) continue

        const damage_8 = Math.floor(poke.myFull_hp / 8 * isDynamax(poke))
        const damage_16 = Math.floor(poke.myFull_hp / 16 * isDynamax(poke))

        if ( poke.myAbility == "かんそうはだ" && isSunny(poke) ) {
            abilityDeclaration(poke)
            changeHP(poke, Math.max(damage_8, 1), "-")
        }
        if ( poke.myAbility == "かんそうはだ" && isRainy(poke) ) {
            abilityDeclaration(poke)
            changeHP(poke, Math.max(damage_8, 1), "+")
        }
        if ( poke.myAbility == "サンパワー" && isSunny(poke) ) {
            abilityDeclaration(poke)
            changeHP(poke, Math.max(damage_8, 1), "-")
        }
        if ( poke.myAbility == "あめうけざら" && isRainy(poke) ) {
            abilityDeclaration(poke)
            changeHP(poke, Math.max(damage_16, 1), "+")
        }
        if ( poke.myAbility == "アイスボディ" && isSnowy(poke) ) {
            abilityDeclaration(poke)
            changeHP(poke, Math.max(damage_16, 1), "+")
        }
    }
}

// 2.みらいよち/はめつのねがい: 技が使用された順に発動
function futureAttack(){
    return
    for (const tgt of order){
        const user = isMe(me, you, tgt)
        if (!user[0].f_con.includes("状態変化『みらいにこうげき』")) continue
        const text = searchText(user[0].f_con, "状態変化『みらいにこうげき』")
        const def_parent = Number(text.split("　")[4].split(",")[0])
        const def_child = Number(text.split("　")[4].split(",")[1])
        if (def_parent != tgt.parent || def_child != tgt.child) continue
        const turn = text.split("　")[1]
        const now = Number(turn.split("/")[0])
        if (now > 1) rewriteText(user[0].f_con, text, text.replace(turn, (now - 1) + "/3"))
        else {
            removeText(user[0].f_con, text)
            if (user[0].f_con.includes("ひんし" + tgt.child)) continue
            writeLog(me, you, tgt.TN + "　の　" + tgt.name + "　は　未来の攻撃を受けた!" + "\n")
            const move = moveSearchByName(text.split("　")[2])
            const atk_parent = Number(text.split("　")[3].split(",")[0])
            const atk_child = Number(text.split("　")[3].split(",")[0])
            const atk_num = Number(text.split("　")[3].split(",")[0])

            const _user = isMe(me, you, isCon(me, you, atk_parent, atk_child))

            let con = ""
            for (let i = 0; i < 2; i++){
                if (isCon(me, you, atk_parent, i).num == atk_num) con = isCon(me, you, atk_parent, i)
            }
            if (con == ""){
                for (const parameter of ["name", "sex", "level", "type", "ability", "item", "abnormal", "nature", "num", "full_HP", "last_HP", "A_AV", "B_AV", "C_AV", "D_AV", "S_AV", 
                    "move_0", "move_1", "move_2", "move_3", "PP_0", "PP_1", "PP_2", "PP_3", "last_0", "last_1", "last_2", "last_3"]){
                        con[parameter] = _user[0]["poke" + atk_num][parameter]
                    }
                for (const parameter of ["A_rank", "B_rank", "C_rank", "D_rank", "S_rank", "X_rank", "Y_rank"]){
                    con[parameter] = 0
                }
            }
            
            if (accuracyFailure(_user[0], _user[1], con, move)){
                writeLog(me, you, tgt.TN + "　の　" + tgt.name + "　には当たらなかった" + "\n")
            } else if (compatibilityCheck(me, you, con, tgt, move) == 0){
                writeLog(me, you, tgt.TN + "　の　" + tgt.name + "　には効果がないようだ" + "\n")
            } else {
                moveEffect(_user[0], _user[1], con, move)
            }
        }
    }
}

// 3.ねがいごと
function wishRecover(){
    return
    for (const tgt of order){
        const user = isMe(me, you, tgt)
        if (user[0].f_con.includes("ねがいごと：" + tgt.child)){
            const text = searchText(user[0].f_con, "ねがいごと：" + tgt.child)
            const recover = Number(text.split("：")[2])
            const now = text.split("：")[3]
            if (now == "宣言ターン") rewriteText(user[0].f_con, text, text.replace("宣言ターン", "回復ターン"))
            else if (now == "回復ターン"){
                writeLog(me, you, tgt.TN + "　の場の　願い事が　叶った!" + "\n")
                changeHP(user[0], user[1], tgt, recover, "+")
                removeText(user[0].f_con, text)
            }
        }
    }
}

// 4.場の状態・特性・もちものによる回復・ダメージ
function fieldAbilityItemDamage(){
    // a. ひのうみ/キョダイベンタツ/キョダイゴクエン/キョダイホウゲキ/キョダイフンセキ(ダメージ): 技が使用された順に発動。
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        const damage = Math.floor(poke.myFull_hp / 6 * isDynamax(poke))
        if ( isField(poke).myVine_lash && !poke.myType.includes("くさ") ) {
            writeLog(`${poke.myTN} の ${poke.myName} は キョダイベンタツに さらされている`)
            changeHP(poke, Math.max(damage, 1), "-")
        }
        if ( isField(poke).myWildfire && !poke.myType.includes("ほのお")){
            writeLog(`${poke.myTN} の ${poke.myName} は キョダイゴクエンに さらされている`)
            changeHP(poke, Math.max(damage, 1), "-")
        }
        if ( isField(poke).myCannonade && !poke.myType.includes("みず")){
            writeLog(`${poke.myTN} の ${poke.myName} は キョダイホウゲキに さらされている`)
            changeHP(poke, Math.max(damage, 1), "-")
        }
        if ( isField(poke).myVolcalith && !poke.myType.includes("いわ")){
            writeLog(`${poke.myTN} の ${poke.myName} は キョダイフンセキに さらされている`)
            changeHP(poke, Math.max(damage, 1), "-")
        }
    }
    // b. グラスフィールド(回復)
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        const damage = Math.floor(poke.myFull_hp / 16 * isDynamax(poke))
        if ( onGround(poke) && fieldStatus.myGrassy ){
            writeLog(`${poke.myTN} の ${poke.myName} は グラスフィールドで 回復した`)
            changeHP(poke, Math.max(damage, 1), "+")
        }
    }
    // c. うるおいボディ/だっぴ/いやしのこころ
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( !isAbility(poke) ) continue
        if ( poke.myAbility == "うるおいボディ" && poke.myAilment ) {
            abilityDeclaration(poke)
            resetAilment(poke)
        }
        if ( poke.myAbility == "だっぴ" && poke.myAilment && getRandom() < 0.3 ) {
            abilityDeclaration(poke)
            resetAilment(poke)
        }
    }
    // b. たべのこし/くろいヘドロ
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( !isItem(poke) ) continue
        const damage_8 = Math.floor(poke.myFull_hp / 8 * isDynamax(poke))
        const damage_16 = Math.floor(poke.myFull_hp / 16 * isDynamax(poke))
        if ( poke.myItem == "たべのこし" ) {
            itemDeclaration(poke)
            changeHP(poke, Math.max(damage_16, 1), "+")
        }
        if ( poke.myItem == "くろいヘドロ" ) {
            itemDeclaration(poke)
            if ( poke.myType.includes("どく") ) {
                changeHP(poke, Math.max(damage_16, 1), "+")
            } else {
                changeHP(poke, Math.max(damage_8, 1), "-")
            }
        }
    }
}

// 5.アクアリング
function aquaRing(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myAqua_ring ) {
            writeLog(`${poke.myTN} の ${poke.myName} は アクアリングで 回復した`)
            changeHP(poke, Math.floor(poke.myFull_hp / 16 * isDynamax(poke) * isBig_root(poke)), "+")
        }
    }
}

// 6.ねをはる
function ingrain(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myIngrain ){
            writeLog(`${poke.myTN} の ${poke.myName} は 根から養分を吸い取った`)
            changeHP(poke, Math.floor(poke.myFull_hp / 16 * isDynamax(poke) * isBig_root(poke)), "+")
        }
    }
}

// 7.やどりぎのタネ
function leechSeed(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myLeech_seed ){
            const party = poke.myCondition.myLeech_seed.split(":")[0]
            const position = poke.myCondition.myLeech_seed.split(":")[1]
            for ( const _poke of allPokeInBattle() ) {
                if ( _poke.myParty == party && _poke.myPosition == position ) {
                    const damage = Math.floor(poke.myFull_hp / 8 * isDynamax(poke))
                    writeLog(`${poke.myTN} の ${poke.myName} は やどりぎのタネに 養分を吸い取られた`)
                    changeHP(poke, Math.max(damage, 1), "-")
                    changeHP(_poke, Math.max(fiveCut(damage * isBig_root(_poke)), 1), isOoze(poke))
                }
            }
        }
    }
}

// 8 どく/もうどく/ポイズンヒール
function acidCheck(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myAilment == "どく" ) {
            if ( poke.myAbility == "ポイズンヒール" && isAbility(poke) ) {
                abilityDeclaration(poke)
                const damage = Math.floor(poke.myFull_hp / 8 * isDynamax(poke))
                changeHP(poke, Math.max(damage, 1), "+")
            } else {
                writeLog(`${poke.myTN} の ${poke.myName} は 毒のダメージを受けた`)
                // もうどく
                if ( poke.myBad_poison ) {
                    const damage = Math.floor(poke.myFull_hp * poke.myBad_poison / 16 * isDynamax(poke))
                    changeHP(poke, Math.max(damage, 1), "-")
                } else { // どく
                    const damage = Math.floor(poke.myFull_hp / 8 * isDynamax(poke))
                    changeHP(poke, Math.max(damage, 1), "-")
                }
            }

            if ( poke.myBad_poison ) poke.myBad_poison += 1
        }
    }
}

// 9 やけど
function burnCheck(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myAilment == "やけど" ) {
            ( poke.myAbility == "たいねつ" && isAbility(poke) )? num = 32 : num = 16
            const damage = Math.floor(poke.myFull_hp / num * isDynamax(poke))
            writeLog(`${poke.myTN} の ${poke.myName} は やけどのダメージを受けた`)
            changeHP(poke, Math.max(damage, 1), "-")
        }
    }
}

// 10.あくむ
function nightmare(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myNightmare ){
            const damage = Math.floor(poke.myFull_hp / 4 * isDynamax(poke))
            writeLog(`${poke.myTN} の ${poke.myName} は 悪夢にうなされている`)
            changeHP(poke, Math.max(damage, 1), "-")
        }
    }
}

// 11.のろい
function curse(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myCurse ) {
            const damage = Math.floor(poke.myFull_hp / 4 * isDynamax(poke))
            writeLog(`${poke.myTN} の ${poke.myName} は 呪われている`)
            changeHP(poke, Math.max(damage, 1), "-")
        }
    }
}

// 12.バインド
function bindCheck(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( !poke.myCondition.myBind_turn ) continue // バインド状態であること

        ( poke.myCondition.myDynamax )?      dyna   = 1 / 2 : dyna   = 1     // ダイマックス
        ( poke.myCondition.myBind_strong )? strong = 1 / 6 : strong = 1 / 8 // しめつけバンド
        const damage = Math.floor(poke.myFull_hp * strong * dyna)
        
        if ( poke.myCondition.myBind_long ) { // ねばりのかぎづめ
            if ( poke.myCondition.myBind_turn == 8 ) {
                writeLog(`${poke.myTN} の ${poke.myName} は バインドから解放された`)
                resetBind(poke)
            } else {
                writeLog(`${poke.myTN} の ${poke.myName} は バインドのダメージを受けている`)
                changeHP(poke, Math.max(damage, 1), "-")
                poke.myCondition.myBind_turn += 1
            }
        } else {
            if ( poke.myCondition.myBind_turn == 5 && getRandom() < 0.5 ) {
                writeLog(`${poke.myTN} の ${poke.myName} は バインドから解放された`)
                resetBind(poke)
            } else {
                writeLog(`${poke.myTN} の ${poke.myName} は バインドのダメージを受けている`)
                changeHP(poke, Math.max(damage, 1), "-")
                poke.myCondition.myBind_turn += 1
            }
        }
    }
}

// 13.たこがため
function octolock(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        const ID = poke.myCondition.myOctolock
        if ( ID == false ) continue // たこがため状態であること
        if ( !poke.myCondition.mySubstitute || ( isPokeByID(ID).myAbility == "すりぬけ" && isAbility(isPokeByID(ID)) ) ) continue

        ( oppJudgeByID(poke.myID, ID) )? spirit = true : spirit = false
        writeLog(`${poke.myTN} の ${poke.myName} は たこがためを受けている`)
        changeRank(poke, "def", -1, spirit)
        changeRank(poke, "sp_def", -1, spirit)
    }
}

// 14.ちょうはつの終了
function tauntEnd(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myTaunt == 4 ) {
            poke.myCondition.myTaunt = false
            writeLog(`${poke.myTN} の ${poke.myName} の ちょうはつが とけた !`)
        }
    }
}

// 15.アンコールの終了
function encoreEnd(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myEncore_turn == 4 ){
            poke.myCondition.myEncore_move = false
            poke.myCondition.myEncore_turn = false
            writeLog(`${poke.myTN} の ${poke.myName} の アンコールが とけた !`)
        }
    }
}

// 16.かなしばりの終了
function disableEnd(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myDisable_turn == 4 ){
            poke.myCondition.myDisable_move = false
            poke.myCondition.myDisable_turn = false
            writeLog(`${poke.myTN} の ${poke.myName} の かなしばりが　とけた !`)
        }
    }
}

// 17.でんじふゆうの終了
function magnetRiseEnd(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myMagnet_rise ) {
            if ( poke.myCondition.myMagnet_rise == 5 ) {
                poke.myCondition.myMagnet_rise = false
                writeLog(`${poke.myTN} の ${poke.myName} の でんじふゆうが　とけた !`)
            } else {
                poke.myCondition.myMagnet_rise += 1
            }
        }
    }
}

// 18.テレキネシスの終了
function telekinesisEnd(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myTelekinesis ) {
            if ( poke.myCondition.myTelekinesis == 5 ) {
                poke.myCondition.myTelekinesis = false
                writeLog(`${poke.myTN} の ${poke.myName} の テレキネシスが　とけた !`)
            } else {
                poke.myCondition.myTelekinesis += 1
            }
        }
    }
}

// 19.かいふくふうじの終了
function healBlockEnd(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myHeal_block ) {
            if ( poke.myCondition.myHeal_block == 5 ) {
                poke.myCondition.myHeal_block = false
                writeLog(`${poke.myTN} の ${poke.myName} の かいふくふうじが　とけた !`)
            } else {
                poke.myCondition.myHeal_block += 1
            }
        }
    }
}

// 20.さしおさえの終了
function embargoEnd(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myEmbargo ) {
            if ( poke.myCondition.myEmbargo == 5 ) {
                poke.myCondition.myEmbargo = false
                writeLog(`${poke.myTN} の ${poke.myName} の さしおさえが　とけた !`)
                eatBerryInPinch(poke)
                eatBerryInAbnormal(poke)
            } else {
                poke.myCondition.myEmbargo += 1
            }
        }
    }
}

// 21.ねむけ
function sleepCheck(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myYawn == 1 ) {
            poke.myCondition.myYawn = 2
        }
        else if ( poke.myCondition.myYawn == 2 ) {
            poke.myCondition.myYawn = false
            getAbnormal(poke, "ねむり")
        }
    }
}

// 22.ほろびのうた
function perishSong(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myCondition.myPerish_song ) { // 4からスタート、1の時にひんしになる
            writeLog(`${poke.myTN} の ${poke.myName} の ほろびのカウントが ${poke.myCondition.myPerish_song - 1}に なった !`)
            if ( poke.myCondition.myPerish_song == 1 ) {
                poke.myCondition.myPerish_song = false
                poke.myRest_hp = 0
                toHand(poke)
            } else {
                poke.myCondition.myPerish_song -= 1
            }
        }
    }
}

// 23.片側の場の状態の継続/終了: ホスト側の状態が先にすべて解除された後に、ホストでない側の状態が解除される。
function oneSideFieldEnd(){
    for ( const field of [myField, oppField] ) {
        // a. リフレクター
        if ( field.myReflect ) {
            const turn = ( field.myReflect_clay )? 8 : 5
            if ( field.myReflect == turn ) {
                field.myReflect = false
                field.myReflect_clay = false
                writeLog(`${field.myTN} の場の リフレクターが なくなった`)
            } else {
                field.myReflect += 1
            }
        }
        // b. ひかりのかべ
        if ( field.myLight_screen ) {
            const turn = ( field.myLight_clay )? 8 : 5
            if ( field.myLight_screen == turn ) {
                field.myLight_screen = false
                field.myLight_clay = false
                writeLog(`${field.myTN} の場の ひかりのかべが なくなった`)
            } else {
                field.myLight_screen += 1
            }
        }
        // c. しんぴのまもり
        if ( field.mySafeguard ) {
            if ( field.mySafeguard == 5 ) {
                field.mySafeguard = false
                writeLog(`${field.myTN} の場の しんぴのまもりが なくなった`)
            } else {
                field.mySafeguard += 1
            }
        }
        // d. しろいきり
        if ( field.myMist ) {
            if ( field.myMist == 5 ) {
                field.myMist = false
                writeLog(`${field.myTN} の場の しろいきりが なくなった`)
            } else {
                field.myMist += 1
            }
        }
        // e. おいかぜ
        if ( field.myTailwind ) {
            if ( field.myTailwind == 4 ) {
                field.myTailwind = false
                writeLog(`${field.myTN} の場の おいかぜが 止んだ`)
            } else {
                field.myTailwind += 1
            }
        }
        // f. おまじない
        if ( field.myLucky_chant ) {
            if ( field.myLucky_chant == 5 ) {
                field.myLucky_chant = false
                writeLog(`${field.myTN} の場の おまじないが 解けた`)
            } else {
                field.myLucky_chant += 1
            }
        }
        // g. にじ
        if ( field.myRainbow ) {
            if ( field.myRainbow == 4 ) {
                field.myRainbow = false
                writeLog(`${field.myTN} の場の にじが 消えた`)
            } else {
                field.myRainbow += 1
            }
        }
        // h. ひのうみ
        if ( field.myFire_ocean ) {
            if ( field.myFire_ocean == 4 ) {
                field.myFire_ocean = false
                writeLog(`${field.myTN} の場の ひのうみが 消えた`)
            } else {
                field.myFire_ocean += 1
            }
        }
        // i. しつげん
        if ( field.myWetland ) {
            if ( field.myWetland == 4 ) {
                field.myWetland = false
                writeLog(`${field.myTN} の場の ひのうみが 消えた`)
            } else {
                field.myWetland += 1
            }
        }
        // j. オーロラベール
        if ( field.myAurora_veil ) {
            const turn = ( field.myAurora_clay )? 8 : 5
            if ( field.Aurora_veil == turn ) {
                field.myAurora_veil = false
                field.myAurora_clay = false
                writeLog(`${field.myTN} の場の オーロラベールが なくなった`)
            } else {
                field.myAurora_veil += 1
            }
        }
        // キョダイマックス技　wikiにない
        if ( field.myVine_lash ) {
            if ( field.myVine_lash == 4 ) {
                field.myVine_lash = false
                writeLog(`${field.myTN} の場の キョダイベンタツが 消えた`)
            } else {
                field.myVine_lash += 1
            }
        }
        if ( field.myWildfire ) {
            if ( field.myWildfire == 4 ) {
                field.myWildfire = false
                writeLog(`${field.myTN} の場の キョダイゴクエンが 消えた`)
            } else {
                field.myWildfire += 1
            }
        }
        if ( field.myCannonade ) {
            if ( field.myCannonade == 4 ) {
                field.myCannonade = false
                writeLog(`${field.myTN} の場の キョダイホウゲキが 消えた`)
            } else {
                field.myCannonade += 1
            }
        }
        if ( field.myVolcalith ) {
            if ( field.myCVolcalith == 4 ) {
                field.myVolcalith = false
                writeLog(`${field.myTN} の場の キョダイフンセキが 消えた`)
            } else {
                field.myVolcalith += 1
            }
        }
    }
}

// 24.全体の場の状態の継続/終了
function bothSideFieldEnd(){
    // a. トリックルーム
    if ( fieldStatus.myTrick_room ) {
        if ( fieldStatus.myTrick_room == 5 ) {
            fieldStatus.myTrick_room = false
            writeLog(`歪んだ時空が 元に戻った`)
        } else {
            fieldStatus.myTrick_room += 1
        }
    }
    // b. じゅうりょく
    if ( fieldStatus.myGravity ) {
        if ( fieldStatus.myGravity == 5 ) {
            fieldStatus.myGravity = false
            writeLog(`重力が 元に戻った`)
        } else {
            fieldStatus.myGravity += 1
        }
    }
    // c. みずあそび
    if ( fieldStatus.myWater_sport ) {
        if ( fieldStatus.myWater_sport == 5 ) {
            fieldStatus.myWater_sport = false
            writeLog(`みずあそびを やめた`)
        } else {
            fieldStatus.myWater_sport += 1
        }
    }
    // d. どろあそび
    if ( fieldStatus.myMud_sport ) {
        if ( fieldStatus.myMud_sport == 5 ) {
            fieldStatus.myMud_sport = false
            writeLog(`どろあそびを やめた`)
        } else {
            fieldStatus.myMud_sport += 1
        }
    }
    // e. ワンダールーム
    if ( fieldStatus.myWonder_room ) {
        if ( fieldStatus.myWonder_room == 5 ) {
            fieldStatus.myWonder_room = false
            writeLog(`防御と特防が入れ替わった`)
        } else {
            fieldStatus.myWonder_room += 1
        }
    }
    // f. マジックルーム
    if ( fieldStatus.myMagic_room ) {
        if ( fieldStatus.myMagic_room == 5 ) {
            fieldStatus.myMagic_room = false
            writeLog(`道具の効果が 使えるようになった`)
        } else {
            fieldStatus.myMagic_room += 1
        }
    }
    // g. エレキフィールド/グラスフィールド/ミストフィールド/サイコフィールド
    for ( const terrain of ["Electric", "Grassy", "Misty", "Psychic"] ) {
        if ( fieldStatus[`my${terrain}`] ) {
            ( myField.myExtender || oppField.Extender )? turn = 8 : turn = 5
            if ( fieldStatus[`my${terrain}`] == turn ) {
                resetTerrain()
                if ( terrain == "Electric" ) writeLog(`足元の電気が 消え去った`)
                if ( terrain == "Grassy" )   writeLog(`足元の草が 消え去った`)
                if ( terrain == "Misty" )    writeLog(`足元の霧が 消え去った`)
                if ( terrain == "Psychic" )  writeLog(`足元の不思議な感じが 消え去った`)
            } else {
                fieldStatus[`my${terrain}`] += 1
            }
        }
    }
}

// 25.はねやすめ解除
function roostEnd(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        /*
        if (!tgt.p_con.includes("状態変化『はねやすめ』")) continue
        const text = searchText(tgt.p_con, "状態変化『はねやすめ』")
        const isFly = Number(text.split("　")[1])
        const n_types = Number(text.split("　")[2])
        if (n_types == 1) tgt.type[isFly] = "ひこう"
        if (n_types == 2) tgt.type.splice(isFly, 0, "ひこう")
        removeText("状態変化『はねやすめ』")
        */
    }
}

// 26.その他の状態・特性・もちもの
function otherConditionAbilityItem(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        // a. さわぐ
        if ( poke.myCondition.myUproar ){
            if ( poke.myCondition.myUproar == 3 || poke.myCondition.myThroat_chop ) {
                poke.myCondition.myUproar = 0
                writeLog(`${poke.myTN} の ${poke.myName} は おとなしくなった`)
            }
        }
        // b. ねむりによるあばれるの中断
        // c. かそく/ムラっけ/スロースタート/ナイトメア
        if ( isAbility(poke) ) {
            if ( poke.myAbility == "かそく" ) {
                abilityDeclaration(poke)
                changeMyRank(poke, "speed", 1)
            }
            if ( poke.myAbility == "ムラっけ" ) {
                let parameter = ["atk", "def", "sp_atk", "sp_def", "speed"]
                let change = ["", ""]
                while ( change[0] == change[1] ) {
                    change[0] = parameter[Math.floor(getRandom() * 5)]
                    change[1] = parameter[Math.floor(getRandom() * 5)]
                }
                abilityDeclaration(poke)
                changeMyRank(poke, change[0], 2)
                changeMyRank(poke, change[1], -1)
            }
            if ( poke.myAbility == "スロースタート" ) {
                if ( poke.myCondition.mySlow_start == 5 ) {
                    poke.myCondition.mySlow_start = "full"
                    writeLog(`${poke.myTN} の ${poke.myName} は 力を取り戻した !`)
                }
                else if ( !isNaN(poke.myCondition.mySlow_start) ) {
                    poke.myCondition.mySlow_start += 1
                }
            }
            if ( poke.myAbility == "ナイトメア" ) {
                for ( const _poke of allPokeInBattle() ) {
                    ( _poke.myCondition.myDynamax )? dyna = 1 / 2 : dyna = 1
                    const damage = Math.floor(_poke.myFull_hp / 8 * dyna)
                    if ( _poke.myAilment == "ねむり" ) {
                        abilityDeclaration(poke)
                        changeHP(_poke, Math.max(damage, 1), "-")
                    }
                }
            }
        }
        // d. くっつきバリ/どくどくだま/かえんだま
        if ( isItem(poke) ) {
            if ( poke.myItem == "くっつきバリ" ) {
                const damage = Math.floor(poke.myFull_hp / 8 * isDynamax(poke))
                writeLog(`${poke.myTN} の ${poke.myName} は くっつきバリの ダメージを受けた`)
                changeHP(poke, Math.max(damage, 1), "-")
            }
            if ( poke.myItem == "どくどくだま" ) {
                getAbnormal(poke, "もうどく")
            }
            if ( poke.myItem == "かえんだま" ) {
                getAbnormal(poke, "やけど")
            }
        }
        // e. ものひろい/しゅうかく/たまひろい
        /*
        if ( poke.myAbility == "ものひろい" && isAbility(poke) && poke.myItem == ""){

        }
        if (tgt.ability == "しゅうかく" && tgt.item == "" && itemEff.berryList().includes(user[0]["poke" + tgt.num].recycle) && (isSunny(me, you, con) || getRandom() < 0.5)){
            writeLog(me, you, tgt.TN + "　の　" + tgt.name + "　は　しゅうかくで　" + user[0]["poke" + tgt.num].recycle + "　を　拾ってきた" + "\n")
            tgt.item = user[0]["poke" + tgt.num].recycle
            user[0]["poke" + tgt.num].recycle = ""
            bfn.berryPinch(user[0])
            bfn.berryAbnormal(user[0])
        }
        */
    }
}

// 27.ダルマモード
function zenMode(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myAbility == "ダルマモード" && isAbility(poke) ) {
            // HPが半分以下
            if ( poke.myRest_hp <= poke.myFull_hp / 2 ) {
                if ( poke.myName == "ヒヒダルマ" ) {
                    abilityDeclaration(poke)
                    formChange(poke, "ヒヒダルマ(ダルマモード)", true)
                }
                if ( poke.myName == "ヒヒダルマ(ガラルのすがた)" ) {
                    abilityDeclaration(poke)
                    formChange(poke, "ヒヒダルマ(ダルマモード(ガラルのすがた))", true)
                }
            }
            // HPが半分以上
            else {
                if ( poke.myName == "ヒヒダルマ(ダルマモード)" ) {
                    abilityDeclaration(poke)
                    formChange(poke, "ヒヒダルマ", true)
                }
                if ( poke.myName == "ヒヒダルマ(ダルマモード(ガラルのすがた))" ) {
                    abilityDeclaration(poke)
                    formChange(poke, "ヒヒダルマ(ガラルのすがた)", true)
                }
            }
        }
    }
}

// 28.リミットシールド
function shieldsDown(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myAbility == "リミットシールド" && isAbility(poke) ) {
            if ( poke.myRest_hp <= poke.myFull_hp / 2 && poke.myCondition.myShields_down ) {
                poke.myCondition.myShields_down = false
                abilityDeclaration(poke)
                formChange(poke, "メテノ(コア)", true)
            }
            else if ( poke.myRest_hp > poke.myFull_hp / 2 && !poke.myCondition.myShields_down ) {
                poke.myCondition.myShields_down = true
                abilityDeclaration(poke)
                formChange(poke, "メテノ(りゅうせいのすがた)", true)
            }
        }
    }
}

// 29.スワームチェンジ
function powerConstruct(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myAbility == "スワームチェンジ" && isAbility(poke) ) {
            if ( poke.myRest_hp <= poke.myFull_hp / 2 && poke.myName != "ジガルデ(パーフェクトフォルム)" ) {
                abilityDeclaration(poke)
                formChange(poke, "ジガルデ(パーフェクトフォルム)", true)
            } 
        }
    }
}

// 30.ぎょぐん
function schooling(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myAbility == "ぎょぐん" && isAbility(poke) ) {
            if ( poke.myRest_hp <= poke.myFull_hp / 4 && poke.myName == "ヨワシ(むれたすがた)" ) {
                abilityDeclaration(poke)
                formChange(poke, "ヨワシ(たんどくのすがた)", true)
            }
            else if ( poke.myRest_hp > poke.myFull_hp / 4 && poke.myName == "ヨワシ(たんどくのすがた)" ) {
                abilityDeclaration(poke)
                formChange(poke, "ヨワシ(むれたすがた)", true)
            }
        }
    }
}

// 31.はらぺこスイッチ
function hungerSwitch(){
    for ( const poke of speedOrder(allPokeInBattle()) ) {
        if ( poke.myAbility == "はらぺこスイッチ" && isAbility(poke) ) {
            abilityDeclaration(poke)
            if ( poke.myCondition.myHunger_switch ) poke.myCondition.myHunger_switch = false
            else if ( !poke.myCondition.myHunger_switch ) poke.myCondition.myHunger_switch = true
        }
    }
}