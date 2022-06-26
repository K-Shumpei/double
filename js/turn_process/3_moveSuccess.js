function moveSuccessJudge(poke) {
    // 0.技の決定
    decideMove(poke)
    // con.tgt に　リストで対象がセットされる
    // isTarget(me, you, con)

    // 1.フリーフォールで行動順を飛ばされる
    if ( skyDropFailure(poke) ) return false
    // 2.(自身のおんねん/いかり状態の解除)
    gradgeRage(poke)
    // 3.行動の失敗
    if ( actionFailure(poke) ) return false
    // 4.ねごと/いびき使用時「ぐうぐう 眠っている」メッセージ
    // 5.Zワザの場合はZパワーを送る。Z変化技の場合は付加効果
    ZpowerActivation(poke)
    // 5a.ダイマックス技に変更
    dynamaxMove(poke)
    // 6.他の技が出る技により技を置き換え、(3-8~10)の行程を繰り返す
    moveReplace(poke)
    // 7.特性バトルスイッチによるフォルムチェンジ
    battleSwitch(poke)
    // 8.「<ポケモン>の <技>!」のメッセージ。PPが減少することが確約される
    if ( attackDeclaration(poke) ) return false
    // 9.わざのタイプが変わる。1→2→3の順にタイプが変わる
    moveTypeChange(poke)
    // 10.技の対象が決まる。若い番号の対象が優先される
    // 11.PPが適切な量引かれる (プレッシャーの効果が考慮される)
    if ( PPDecrease(poke) ) return false
    // 12.こだわり系アイテム/ごりむちゅうで技が固定される
    commitmentRock(poke)
    // 13.技の仕様による失敗
    if ( failureForMoveSpecification(poke) ) {
        writeLog(`しかし うまく決まらなかった....`)
        return false
    }
    // 14.自分のこおりを回復するわざにより自身のこおり状態が治る
    selfMeltCheck(poke)
    // 15.おおあめ/おおひでりによる技の失敗
    if ( greatWeatherFailure(poke) ) {
        removeText(con.p_con, "溜め技")
        removeText(con.p_con, "姿を隠す")
        return false
    }
    // 16.ふんじんによるほのお技の失敗とダメージ
    if ( powderFailure(poke) ) return false
    // 17.トラップシェルが物理技を受けていないことによる失敗
    if ( shellTrap(poke) ) return false
    // 18.けたぐり/くさむすび/ヘビーボンバー/ヒートスタンプをダイマックスポケモンに使用したことによる失敗
    if (dynaWeightFailure(poke)) return false
    // 19.特性による失敗
    if ( abilityFailure(poke) ) return false
    // 20.中断されても効果が発動する技
    if ( remainEffectMove(poke) ) return false
    // 21.へんげんじざい/リベロの発動
    proteanLibero(poke)
    // 22.溜め技の溜めターンでの動作
    if (accumulateOperation(poke)) return false
    // 23.待機中のよこどりで技が盗まれる。技を奪ったポケモンは13-15の行程を繰り返す
    // 24.だいばくはつ/じばく/ミストバーストによるHP消費が確約される
    promiseToChangeHP(poke)
    // 26.だいばくはつ/じばく/ミストバーストの使用者は対象が不在でもHPを全て失う。使用者がひんしになっても攻撃は失敗しない
    selfDestruction(poke)
    // 25.対象のポケモンが全員すでにひんしになっていて場にいないことによる失敗
    if ( faintedFailure(poke) ) return false
    // 27.ビックリヘッド/てっていこうせんの使用者はHPを50%失う。対象が不在なら失わない。使用者がひんしになっても攻撃が失敗しない
    mindblownStealbeam(poke)
    // 28.マグニチュード使用時は威力が決定される
    magnitude(poke)
    // 29.姿を隠していることによる無効化
    if ( hideInvalidation(poke) ) return false
    // 30.サイコフィールドによる無効化
    if ( phschoFieldInvalidation(poke) ) return false
    // 31.0 シャドーダイブ・ゴーストダイブによるまもるの解除
    breakProtect(poke)
    // 31.ファストガード/ワイドガード/トリックガードによる無効化 (Zワザ/ダイマックスわざならダメージを75%カットする)
    if ( otherProtectInvalidation(poke) ) return false
    // 32.まもる/キングシールド/ブロッキング/ニードルガード/トーチカによる無効化 (Zワザ/ダイマックスわざなら75%をカットする)
    if ( protectInvalidation(poke) ) return false
    // 33.たたみがえしによる無効化 (Zワザ/ダイマックスわざなら75%をカットする)
    if ( matBlock(poke) ) return false
    // 34.ダイウォールによる無効化
    // 35.マジックコート状態による反射
    magicCoatReflection(poke)
    // 36.テレキネシスの場合、対象がディグダ/ダグトリオ/スナバァ/シロデスナ/メガゲンガー/うちおとす状態/ねをはる状態であることによる失敗
    if ( telekinesisFailure(poke) ) return false
    // 37.マジックミラーによる反射　35との区別はないので35と同じにした(wiki通りではない)
    // 38.特性による無効化(その1)
    if ( abilityInvalidation1(poke) ) return false
    // 39.相性による無効化
    if ( compatibilityInvalidation(poke) ) return false
    // 40,ふゆうによる無効化 41とまとまっている
    // 41.でんじふゆう/テレキネシス/ふうせんによる無効化
    if ( levitateInvalidation(poke) ) return false
    // 42.ぼうじんゴーグルによる無効化
    if ( powderGoggleInvalidation(poke) ) return false
    // 43.特性による無効化(その2)
    if ( abilityInvalidation2(poke) ) return false
    // 44.タイプによる技の無効化(その1)
    if ( typeInvalidation1(poke) ) return false
    // 45.技の仕様による無効化(その1)
    if ( moveSpecificationsInvalidation1(poke) ) return false
    // 46.技の仕様による無効化(その2)
    if ( moveSpecificationsInvalidation2(poke) ) return false
    // 47.タイプによる技の無効化(その2)
    if ( typeInvalidation2(poke) ) return false
    // 48.さわぐによるねむりの無効化
    uproar(poke)
    // 49.しんぴのまもり状態による無効化
    if ( safeguardInvalidation(poke) ) return false
    // 50.エレキフィールド/ミストフィールド状態による状態異常の無効化
    if ( fieldInvalidation(poke) ) return false
    // 51.みがわり状態によるランク補正を下げる技/デコレーションの無効化
    if ( substituteInvalidation1(poke) ) return false
    // 52.しろいきりによる無効化
    if ( mistInvalidation(poke) ) return false
    // 53.特性による無効化(その3)
    if ( abilityInvalidation3(poke) ) return false
    // 54.命中判定による技の無効化
    if ( accuracyFailure(poke) ) return false
    // 55.シャドースチールで対象のランク補正を吸収する
    spectralThief(poke)
    // 56.対応するタイプの攻撃技の場合ジュエルが消費される
    useJuwel(poke)
    // 57. かわらわり/サイコファング/ネコにこばんの効果が発動する
    wallBreak(poke)
    // 58. ポルターガイストで対象のもちものが表示される
    poltergeist(poke)
    // 59.みがわりによるランク補正を変動させる効果以外の無効化
    if ( substituteInvalidation2(poke) ) return false
    // 60.ミラーアーマー: ランクを下げる変化技の反射
    if ( millorArmer(poke) ) return false
    // 61.ほえる・ふきとばしの無効化
    if ( roarWhirlwind(poke) ) return false
    // 62.技の仕様による無効化(その3)
    if ( moveSpecificationsInvalidation3(poke) ) return false
    // 63.アロマベール: かなしばり/アンコール/ちょうはつ状態の無効化
    if ( alomaVeilInvalidation(poke) ) return false

    return true
}


// 0.技の決定　その他
function decideMove(poke) {
    // かなしばりのターン消費
    if ( poke.myCondition.myDisable_turn > 0 ) poke.myCondition.myDisable_turn -= 1
    // ちょうはつターンの消費
    if ( poke.myCondition.myTaunt ) poke.myCondition.myTaunt += 1
    // アンコールターンの消費
    if ( poke.myCondition.Encore_turn ) poke.myCondition.Encore_turn += 1
}


// 1.フリーフォールで行動順を飛ばされる
function skyDropFailure(poke) {
    // フリーフォールで行動順を飛ばされたときも、反動で動けないターンは消費される
    if ( poke.myCondition.mySky_drop ) {
        writeLog(`${poke.myTN} の ${poke.myName} は 空中で身動きが取れない !`)
        if ( !poke.myCondition.myCant_move ) return true
        else return false
    }

    return false
}

// 2.(自身のおんねん/いかり状態の解除)
function gradgeRage(poke) {
    // おんねんの解除
    poke.myCondition.myGrudge = false
    // いかりの解除
    if ( poke.myCondition.myRage && poke.myMove.name != "いかり" ) {
        writeLog(`${poke.myTN} の ${poke.myName} は 怒りが静まった !`)
        poke.myCondition.myRage = false
    }
}

// 3.行動の失敗
function actionFailure(poke) {
    // みちづれ状態の解除
    poke.myCondition.myDestiny_bond = false

    // 1.技の反動で動けない
        // フリーフォールで行動順を飛ばされたときも判定
    if ( poke.myCondition.myCant_move ) {
        writeLog(`${poke.myTN} の ${poke.myName} は 反動で動けない !`)
        poke.myCondition.myCant_move = false
        // 動けなくても、なまけ状態のターンは消費される
        if ( !poke.myCondition.myTruant ) return true
    }

    // 2.ねむりのカウント消費/こおりの回復判定: 動けない場合メッセージ
        // これらでも使える技を使用した場合は動ける。このときもねむり/こおりの消費/回復判定はある
    if ( poke.myAilment == "ねむり" ) {
        let wakeUp = false

        // 経過ターン
        const elapsed = ( poke.myAbility == "はやおき" && isAbility(poke) )? 2 : 1
        // ねむるで寝ているとき
        if ( !poke.myRest ) {
            if ( poke.myRest + elapsed > 2 ) wakeUp = true
            else poke.myRest += elapsed
        }
        // ねむる以外で寝ているとき
        if ( !poke.myAsleep ) {
            if ( poke.myAsleep + elapsed > poke.myAsleep_turn ) wakeUp = true
            else poke.myAsleep += elapsed
        }
        
        if ( wakeUp ) {
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は 目を覚ました !`)
        } else {
            writeLog(`${poke.myTN} の ${poke.myName} は ぐうぐう眠っている !`)
            if ( poke.myMove.name != "いびき" && poke.myMove.name != "ねごと" ) return true
        }
    }
    if ( poke.myAilment == "こおり" ) {
        if ( getRandom() < 0.8 ) {
            if ( !meltFrozen.includes(poke.myMove.name) ) {
                writeLog(`${poke.myTN} の ${poke.myName} は 凍って動けない !`)
                return true
            }
        } else {
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の こおりが溶けた !`)
        }
    }

    // 3.PPが残っていない
    if ( poke["myRest_pp_" + poke.myCmd_move] == 0 && !poke.myCondition.myFilling ) {
        writeLog(`${poke.myTN} の ${poke.myName} は PPがなくて技が出せない !`)
        return true
    }

    // 4.なまけのカウント消費: 動けない場合メッセージ
        // 反動で動けないときでも消費
    if ( poke.myCondition.myTruant ) {
        poke.myCondition.myTruant = false
        writeLog(`${poke.myTN} の ${poke.myName} は なまけている !`)
        return true
    } else if ( poke.myAbility == "なまけ" && isAbility(poke) && !poke.myCondition.myTruant ) {
        poke.myCondition.myTruant = true
    }
    // 5.きあいパンチ使用時、そのターンにダメージを受けていて動けない、たすき一撃必殺は動く (ダイマックスポケモンを除く)
    if ( poke.myMove.name == "きあいパンチ" && poke.myCondition.myDamage && !poke.myCondition.myOne_shot ) {
        writeLog(`${poke.myTN} の ${poke.myName} は 集中が途切れて 技が出せなかった !`)
        return true
    }
    // 6.ひるみで動けない (ダイマックスポケモンを除く)
    if ( poke.myCondition.myFlinch ) {
        writeLog(`${poke.myTN} の ${poke.myName} は ひるんで 動けない !`)
        if ( poke.myAbility == "ふくつのこころ" && isAbility(poke) ) {
            abilityDeclaration(poke)
            changeMyRank(poke, "speed", 1)
        }
        return true
    }
    // 7.かなしばりで技が出せない (Zワザを除く)
    if ( poke.myCondition.myDisable_move == poke.myMove.name ) { //  && !atk.data.Z
        writeLog(`${poke.myTN} の ${poke.myName} は かなしばりで 技が出せなかった !`)
        return true
    }
    // 8.じゅうりょくで技が出せない
    if ( fieldStatus.myGravity && disableInGravity.includes(poke.myMove.name) ) {
        writeLog(`${poke.myTN} の ${poke.myName} は じゅうりょくが 強くて ${poke.myMove.name} が 出せない !`)
        return true
    }
    // 9.かいふくふうじで技が出せない (Zワザを除く)
    if ( poke.myCondition.myHeal_block && moveToRecoverHP.includes(poke.myMove.name) ) { //  && !atk.data.Z
        writeLog(`${poke.myTN} の ${poke.myName} は かいふくふうじで 技が出せなかった !`)
        return true
    }
    // 10.じごくづきで音技が出せない (Zワザを除く)
    if ( poke.myCondition.myThroat_chop && musicMove.includes(poke.myMove.name) ) { //  && !atk.data.Z
        writeLog(`${poke.myTN} の ${poke.myName} は じごくづきの 効果で 技が 出せない !`)
        return true
    }
    // 11.こだわっていない技が出せない (ダイマックスポケモンを除く)
    if ( poke.myCondition.myChoice && poke.myCondition.myChoice != poke.myMove.name ) { //  && (atk.data.dynaTxt.includes("3") || atk.data.gigaTxt.includes("3"))
        writeLog(`${poke.myTN} の ${poke.myName} は こだわっているせいで 技が出せなかった !`)
        return true
    }
    // 12.ちょうはつで変化技が出せない (Zワザを除く)
    if ( poke.myCondition.myTaunt && poke.myMove.nature == "変化" ) { //  && !atk.data.Z
        writeLog(`${poke.myTN} の ${poke.myName} は 挑発されて ${poke.myMove.name} が出せなかった !`)
        return true
    }
    // 13.ふういんで技が出せない (Zワザ/ダイマックスポケモンを除く)
    const imprison = oppPokeInBattle(poke).filter( p => p.myCondition.myImprison )
    for ( const _poke of imprison ) {
        for ( let i = 0; i < 4; i++ ) {
            if ( poke.myMove.name == _poke[`myMove_${i}`] ) {
                writeLog(`${poke.myTN} の ${poke.myName} は 封印されて 技が出せなかった !`)
                return true
            }
        }
    }
    // 14.こんらんの自傷の判定
    if ( poke.myCondition.myConfusion ) {

        const random = getRandom()

        switch( poke.myCondition.myConfusion ) {
            case 1:
                poke.myCondition.myConfusion = 2
                break
            case 2:
                if ( random < 1 / 3 ) poke.myCondition.myConfusion = false
                else poke.myCondition.myConfusion = 3
                break
            case 3:
                if ( random < 1 / 2 ) poke.myCondition.myConfusion = false
                else poke.myCondition.myConfusion = 4
                break
            case 4:
                poke.myCondition.myConfusion = false
                break
        }

        if ( !poke.myCondition.myConfusion ) {
            writeLog(`${poke.myTN} の ${poke.myName} の こんらん がとけた !`)
        } else {
            writeLog(`${poke.myTN} の ${poke.myName} は こんらんしている !`)
            if ( getRandom() < 1 / 3 ) {
                // こんらんの自傷ダメージは威力40の物理攻撃
                const atk = isValueIncludingRank(poke.myAtk, poke.myRank_atk, false)
                const def = isValueIncludingRank(poke.myDef, poke.myRank_def, false)
                const damage = Math.floor(Math.floor(Math.floor((poke.myLevel * 2) / 5 + 2) * 40 * atk / def) / 50 + 2)

                writeLog(`${poke.myTN} の ${poke.myName} は 訳も分からず 自分を攻撃した !`)
                changeHP(poke, damage, "-")
                return true
            }
        }
    }
    // 15.まひして技が出せない
    if ( poke.myAilment == "まひ" ) {
        if ( getRandom() < 0.25 ) {
            writeLog(`${poke.myTN} の ${poke.myName} は 体がしびれて 動けない !`)
            return true
        }
    }
    // 16.メロメロの判定
    if ( poke.myCondition.myAttract ) {
        const attract = allPokeInBattle().filter( p => p.myID == poke.myCondition.myAttract )
        if ( attract ) {
            writeLog(`${poke.myName} は ${attract[0].myName} に メロメロだ !`)
            if ( getRandom() < 0.5 ) {
                writeLog(`${poke.myTN} の ${poke.myName} は メロメロで 技が出せなかった !`)
                return true
            }
        }
    }
}

// 5.Zワザの場合はZパワーを送る。Z変化技の場合は付加効果
function ZpowerActivation(poke) {
    return
    // Z技にチェックがなければ何もしない
    if (!atk.data.Z) {
        return
    }
    writeLog(me, you, con.TN + "　の　" + poke.myName + "　は　Zパワーを身に纏った!" + "\n")
    // 普通のZクリスタル（攻撃技）の場合
    if (move.nature != "変化") {
        move.accuracy = "-"
        move.direct = "間接"
        if (move.power < 60) {
            move.power = 100
        } else if (move.power < 70) {
            move.power = 120
        } else if (move.power < 80) {
            move.power = 140
        } else if (move.power < 90) {
            move.power = 160
        } else if (move.power < 100) {
            move.power = 175
        } else if (move.power < 110) {
            move.power = 180
        } else if (move.power < 120) {
            move.power = 185
        } else if (move.power < 130) {
            move.power = 190
        } else if (move.power < 140) {
            move.power = 195
        } else {
            move.power = 200
        }
        const power = moveEff.Zpower()
        for (let i = 0; i < power.length; i++) {
            if ( poke.myMove.name == power[i][0]) {
                move.power = power[i][2]
            }
        }
        const list = itemEff.Zcrystal()
        for (let i = 0; i < list.length; i++) {
            if (atk.con.item == list[i][2]) {
                move.name = list[i][1]
            }
        }
    }
    // 普通のZクリスタル（変化技）の場合
    if (move.nature == "変化") {
        const list = moveEff.Zstatus()
        for (let i = 0; i < list.length; i++) {
            if ( poke.myMove.name == list[i][0]) {
                if ( poke.myMove.name == "のろい") {
                    if (atk.con.type.includes("ゴースト")) {
                        writeLog(me, you, con.TN + "　の　" + poke.myName + "　の　HPが全回復した!" + "\n")
                        atk.con.last_HP = atk.con.full_HP
                    } else {
                        afn.rankChangeZ(me, you, con, "A", 1)
                    }
                } else if (list[i][1] == "A" || list[i][1] == "B" || list[i][1] == "C" || list[i][1] == "D" || list[i][1] == "S" || list[i][1] == "X" || list[i][1] == "Y") {
                    afn.rankChangeZ(me, you, con, list[i][1], list[i][2])
                } else if (list[i][1] == "all") {
                    for (const parameter of ["A", "B", "C", "D", "S"]) {
                        afn.rankChangeZ(me, you, con, parameter, 1)
                    }
                } else if (list[i][1] == "critical") {
                    if (!atk.con.p_con.includes("きゅうしょアップ")) {
                        writeLog(me, you, con.TN + "　の　" + poke.myName + "　は　技が急所に当たりやすくなった!" + "\n")
                        atk.con.p_con += "きゅうしょアップ" + "\n"
                    }
                } else if (list[i][1] == "clear") {
                    writeLog(me, you, con.TN + "　の　" + poke.myName + "　の　能力ダウンがリセットされた!" + "\n")
                    for (const parameter of ["A", "B", "C", "D", "S", "X", "Y"]) {
                        atk.con[parameter + "_rank"] = Math.max(atk.con[parameter + "_rank"], 0)
                    }
                } else if (list[i][1] == "cure") {
                    writeLog(me, you, con.TN + "　の　" + poke.myName + "　の　HPが全回復した!" + "\n")
                    atk.con.last_HP = atk.con.full_HP
                }
            }
        }
        move.name = "Z" + move.name
    }
    // 専用Zクリスタルの場合
    const list = itemEff.spZcrystal()
    for (let i = 0; i < list.length; i++) {
        if ( poke.myMove.name == list[i][3]) {
            move.name = list[i][1]
            move.power = cfn.moveSearchByName( poke.myMove.name)[3]
        }
    }
    if ( poke.myMove.name == "ナインエボルブースト") {
        move.nature = "変化"
    }
    atk.data.Zable = true
    atk.data.ZTxt = "Z技（済）"
}

// 5a.ダイマックス技に変更
function dynamaxMove(poke) {
    return
    if (atk.data.dynaTxt.includes("3") || atk.data.gigaTxt.includes("3")) {
        const list = moveEff.dyna()
        const giga = moveEff.gigadyna()
        if (move.nature == "変化") {
            move.name = "ダイウォール"
            move.type = "ノーマル"
            move.target = "自分"
        } else {
            move.accuracy = "-"
            move.direct = "間接"
            for (let i = 0; i < list.length; i++) {
                if (move.type == list[i][0]) {
                    if (move.type == "かくとう" || move.type == "どく") {
                        if (move.power < 45) {
                            move.power = 70
                        } else if (move.power < 55) {
                            move.power = 75
                        } else if (move.power < 65) {
                            move.power = 80
                        } else if (move.power < 75) {
                            move.power = 85
                        } else if (move.power < 110) {
                            move.power = 90
                        } else if (move.power < 150) {
                            move.power = 95
                        } else {
                            move.power = 100
                        }
                    } else {
                        if (move.power < 45) {
                            move.power = 90
                        } else if (move.power < 55) {
                            move.power = 100
                        } else if (move.power < 65) {
                            move.power = 110
                        } else if (move.power < 75) {
                            move.power = 120
                        } else if (move.power < 110) {
                            move.power = 130
                        } else if (move.power < 150) {
                            move.power = 140
                        } else {
                            move.power = 150
                        }
                    }
                    for (let j = 0; j < moveEff.dynaPow().length; j++) {
                        if ( poke.myMove.name == moveEff.dynaPow()[j][0]) {
                            move.power = moveEff.dynaPow()[j][1]
                        }
                    }
                    move.name = list[i][1]
                }
            }
            if (atk.data.gigaTxt.includes("3")) {
                for (let i = 0; i < giga.length; i++) {
                    if (move.type == giga[i][2] && poke.myName == giga[i][0]) {
                        move.name = giga[i][1]
                        if ( poke.myMove.name == "キョダイコランダ" || move.name == "キョダイカキュウ" || move.name == "キョダイソゲキ") {
                            move.power = 160
                        }
                    }
                }
            }
        }
    }
}

// 6.他の技が出る技により技を置き換え、(3-9~11)の行程を繰り返す
    // オウムがえし/さきどりのコピーできない技だった場合は失敗
    // ねごとで出せる技が無いときは失敗
    // オウムがえし、さきどり、しぜんのちから、ねごと、ねこのて、まねっこ、ゆびをふる
function moveReplace(poke) {
    return
    const tgt = con.tgt[0]
    const user = isMe(me, you, tgt)
    // オウムがえし
    if ( poke.myMove.name.includes("オウムがえし")) {
        if (tgt.history.length == 0) {
            tgt.success = false
            return
        }
        const used = tgt.history[0]

        if (cannotMirrorMove.includes(used.name)) tgt.success = false
        if (used.target == "自分") tgt.success = false
        if (used.target.includes("場")) tgt.success = false
        if (used.target == "味方全員") tgt.success = false
        if (used.target == "全員") tgt.success = false
        if (used.target == "味方1体") tgt.success = false
        if (used.target == "自分か味方") tgt.success = false

        if (used.name == "トリックルーム") move.result = "成功"
        if (used.name == "ワンダールーム") move.result = "成功"
        if (used.name == "マジックルーム") move.result = "成功"
        if (used.name == "フェアリーロック") move.result = "成功"

        if (move.result == "失敗") return
        move.result = "成功"

        con.history.unshift(Object.assign({}, move))
        move.discription = move.name
        for (const para of ["name", "type", "nature", "power", "accuracy", "PP", "direct", "protect", "target"]) {
            move[para] = used[para]
        }
    }
    // さきどり: 対象が先制した、対象の使用した技がさきどりできない技の時、失敗
    if ( poke.myMove.name.includes("さきどり")) {
        if (tgt.com == "") tgt.success = false
        if (user[0].f_con.includes("ひんし" + tgt.child)) tgt.success = false
        if (tgt.p_con.includes("姿を隠す")) tgt.success = false

        const _move = selectedMove(user[0], tgt)
        if (_move.nature == "変化") tgt.success = false
        if (annotMeFirst.includes(_move.name)) tgt.success = false
        if (move.result == "失敗") return
        move.result = "成功"

        con.p_con += "技『さきどり』" + "\n"
        con.history.unshift(Object.assign({}, move))
        move.discription = move.name
        for (const para of ["name", "type", "nature", "power", "accuracy", "PP", "direct", "protect", "target"]) {
            move[para] = used[para]
        }
    }
    // しぜんのちから
    if ( poke.myMove.name.includes("しぜんのちから")) {
        if (!me.f_con.includes("フィールド")) move = moveSearchByName("トライアタック").concat()
        if (me.f_con.includes("グラスフィールド")) move = moveSearchByName("エナジーボール").concat()
        if (me.f_con.includes("エレキフィールド")) move = moveSearchByName("10まんボルト").concat()
        if (me.f_con.includes("ミストフィールド")) move = moveSearchByName("ムーンフォース").concat()
        if (me.f_con.includes("サイコフィールド")) move = moveSearchByName("サイコキネシス").concat()
        move.discription = move.name
    }
    // ねごと
    if ( poke.myMove.name.includes("ねごと")) {
        if (!(con.abnormal == "ねむり" || (con.ability == "ぜったいねむり" && isAbility(me, con)))) {
            tgt.success = false
            return
        }

        let check = []
        for (let i = 0; i < 4; i++) {
            if (!moveEff.sleepTalk().includes(con["move_" + i])) {
                check.push(con["move_" + i])
            }
        }
        const sleepMove = moveSearchByName(shuffle(check)[0])
        move.result = "成功"
        con.history.unshift(Object.assign({}, move))
        move.discription = move.name
        for (const para of ["name", "type", "nature", "power", "accuracy", "PP", "direct", "protect", "target"]) {
            move[para] = sleepMove[para]
        }
    }
    // ねこのて
    if ( poke.myMove.name.includes("ねこのて")) {
        let cat_hand = []
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (!cannotAssistMove.includes(me["poke" + i]["move" + j])) {
                    cat_hand.push(me["poke" + i]["move" + j])
                }
            }
        }
        if (cat_hand.length == 0) {
            move.result == "失敗"
            return
        } else {
            move.result == "成功"
            con.p_con += "技『ねこのて』" + "\n"
            con.history.unshift(Object.assign({}, move))
            move.discription = move.name
            const _move = moveSearchByName(shuffle(cat_hand)[0])
            for (const para of ["name", "type", "nature", "power", "accuracy", "PP", "direct", "protect", "target"]) {
                move[para] = _move[para]
            }
        }
    }
    // まねっこ
    if ( poke.myMove.name.includes("まねっこ")) {
        const log_list = con.log.split("\n")
        for (let i = 0; i < log_list.length - 1; i++) {
            if (log_list[log_list.length - 1 - i].split("　").length == 6) {
                let each = log_list[log_list.length - 1 - i].split("　")[1]
                let poke_name = log_list[log_list.length - 1 - i].split("　")[2]
                let no = log_list[log_list.length - 1 - i].split("　")[3]
                let move_name = log_list[log_list.length - 1 - i].split("　")[4]
                let mark = log_list[log_list.length - 1 - i].split("　")[5]
                if (move_name == "ゆびをふる" || move_name == "オウムがえし" || move_name == "さきどり" || move_name == "まねっこ" || move_name == "ねこのて" || move_name == "ねごと" || move_name == "しぜんのちから") {
                    move_name = log_list[log_list.length - i].split("　")[2]
                }
                let check = 0
                for (let j = 0; j < pokeData.poke().length; j++) {
                    if (poke_name == pokeData.poke()[j][1]) {
                        check += 1
                    }
                }
                for (let j = 0; j < moveList.move().length; j++) {
                    if (move_name == moveList.move()[j][0]) {
                        check += 1
                    }
                }
                if (check == 2 && each == "の" && no == "の" && mark == "!" && !moveEff.copyCat().includes(move_name)) {
                    move.discription = move.name
                    for (let j = 0; j < 9; j++) {
                        move[j] = cfn.moveSearchByName(move_name)[j]
                        break
                    }
                }
            }
        }
        if ( poke.myMove.name.includes("まねっこ")) {
            move.push("失敗")
        }
    }
    // ゆびをふる
    if ( poke.myMove.name.includes("ゆびをふる")) {
        const random = getRandom()
        let metro_move = ""
        for (let i = 0; i < moveEff.metronome().length; i++) {
            if (random >= i / moveEff.metronome().length) {
                metro_move = moveEff.metronome()[i]
            }
        }
        move.discription = move.name
        for (let i = 0; i < 9; i++) {
            move[i] = cfn.moveSearchByName(metro_move)[i]
        }
    }
}

// 7.特性バトルスイッチによるフォルムチェンジ
function battleSwitch(poke) {
    // バトルスイッチでなければスルー
    if ( poke.myAbility != "バトルスイッチ" ) return
    // 特性無効であればスルー
    if ( !isAbility(poke) ) return

    if ( poke.myName == "ギルガルド(シールドフォルム)" && poke.myMove.nature != "変化" ) {
        writeLog(`${poke.myTN} の ${poke.myName} の 特性『バトルスイッチ』 !`)
        formChange(poke, "ギルガルド(ブレードフォルム)", true)
        return
    }
    if ( poke.myName == "ギルガルド(ブレードフォルム)" && poke.myMove.nature == "キングシールド" ) {
        writeLog(`${poke.myTN} の ${poke.myName} の 特性『バトルスイッチ』 !`)
        formChange(poke, "ギルガルド(シールドフォルム)", true)
        return
    }
}

// 8.「<ポケモン>の <技>!」のメッセージ。PPが減少することが確約される
function attackDeclaration(poke) {
    // 技の優先度の決定
    poke.myMove.priority = priorityDegree(poke)

    // シャドーレイ、フォトンゲイザー: 対象の特性を攻撃処理の終わりまで無くす
    // 他の技が出る技で出た場合、特性は無視しない
    /*
    if (moveToInvalidAbility.includes( poke.myMove.name)) {
        me.f_con += "かたやぶり：" + con.parent + "," + con.child
        you.f_con += "かたやぶり：" + con.parent + "," + con.child
    }
    if ((con.ability == "かたやぶり" || con.ability == "ターボブレイズ" || con.ability == "テラボルテージ") && isAbility(me, con)) {
        me.f_con += "かたやぶり：" + con.parent + "," + con.child
        you.f_con += "かたやぶり：" + con.parent + "," + con.child
    }
    */

    writeLog(`${poke.myTN} の ${poke.myName} の ${poke.myMove.name} !`)


    /*
    // 他の技が出る技の失敗
    if (move.discription == false) return

    // 技が成功した時
    if (move.discription == "オウムがえし" || move.discription == "さきどり" || move.discription == "しぜんのちから" || move.discription == "ねごと" || move.discription == "ねこのて" || move.discription == "まねっこ" || move.discription == "ゆびをふる") {
        writeLog(me, you, con.TN + "　の　" + poke.myName + "　の　" + move.discription + "　!" + "\n")
        writeLog(me, you, move.discription + "　で　" + move.name + "　がでた!" + "\n")
        // 8.じゅうりょくで技が出せない
        if (me.f_con.includes("じゅうりょく") && disableInGravity.includes( poke.myMove.name)) {
            writeLog(me, you, poke.myName + "　は　じゅうりょくが　強くて　" + move.name + "　が　出せない!" + "\n")
            return true
        }
        // 9.かいふくふうじで技が出せない (Zワザを除く)
        if (con.p_con.includes("状態変化『かいふくふうじ』") && moveToRecoverHP.includes( poke.myMove.name)) {
            writeLog(me, you, "しかし　かいふくふうじで　技が出せなかった　!" + "\n")
            return true
        }
        // 10.じごくづきで音技が出せない (Zワザを除く)
        if (con.p_con.includes("状態変化『じごくづき』") && musicMove.includes( poke.myMove.name)) {
            writeLog(me, poke.myName + "は　じごくづきの　効果で　技が　出せない!" + "\n")
            return true
        }
        con.used = move.name
    } else if (move.discription == "Zオウムがえし" || move.discription == "Zさきどり" || move.discription == "Zしぜんのちから" || move.discription == "Zねごと" || move.discription == "Zねこのて" || move.discription == "Zまねっこ" || move.discription == "Zゆびをふる") {
        writeLog(me, you, con.TN + "　の　" + poke.myName + "　の　" + move.discription + "　!" + "\n")
        if (move.length == 10) {
            if (move.nature == "変化") {
                writeLog(me, you, move.discription + "　で　Z" + move.name + "　がでた!" + "\n")
                con.used = move.name
                const list = moveEff.Zstatus()
                for (let i = 0; i < list.length; i++) {
                    if ( poke.myMove.name == list[i][0]) {
                        if ( poke.myMove.name == "のろい") {
                            if (atk.con.type.includes("ゴースト")) {
                                writeLog(me, you, con.TN + "　の　" + poke.myName + "　の　HPが全回復した!" + "\n")
                                atk.con.last_HP = atk.con.full_HP
                            } else {
                                afn.rankChangeZ(me, you, con, "A", 1)
                            }
                        } else if (list[i][1] == "A" || list[i][1] == "B" || list[i][1] == "C" || list[i][1] == "D" || list[i][1] == "S" || list[i][1] == "X" || list[i][1] == "Y") {
                            afn.rankChangeZ(me, you, con, list[i][1], list[i][2])
                        } else if (list[i][1] == "all") {
                            for (const parameter of ["A", "B", "C", "D", "S"]) {
                                afn.rankChangeZ(me, you, con, parameter, 1)
                            }
                        } else if (list[i][1] == "critical") {
                            if (!atk.con.p_con.includes("きゅうしょアップ")) {
                                writeLog(me, you, con.TN + "　の　" + poke.myName + "　は　技が急所に当たりやすくなった!" + "\n")
                                atk.con.p_con += "きゅうしょアップ" + "\n"
                            }
                        } else if (list[i][1] == "clear") {
                            writeLog(me, you, con.TN + "　の　" + poke.myName + "　の　能力ダウンがリセットされた!" + "\n")
                            for (const parameter of ["A", "B", "C", "D", "S", "X", "Y"]) {
                                atk.con[parameter + "_rank"] = Math.max(atk.con[parameter + "_rank"], 0)
                            }
                        } else if (list[i][1] == "cure") {
                            writeLog(me, you, con.TN + "　の　" + poke.myName + "　の　HPが全回復した!" + "\n")
                            atk.con.last_HP = atk.con.full_HP
                        }
                    }
                }
            } else {
                const list = itemEff.Zcrystal()
                for (let i = 0; i < list.length; i++) {
                    if (move.type == list[i][0]) {
                        for (let j = 0; j < 9; j++) {
                            move[j] = cfn.moveSearchByName(list[i][1])[j]
                        }
                        writeLog(me, you, move.discription + "　で　" + move.name + "　がでた!" + "\n")
                        con.used = move.name
                    }
                }
                if (move.power < 60) {
                    move.power = 100
                } else if (move.power < 70) {
                    move.power = 120
                } else if (move.power < 80) {
                    move.power = 140
                } else if (move.power < 90) {
                    move.power = 160
                } else if (move.power < 100) {
                    move.power = 175
                } else if (move.power < 110) {
                    move.power = 180
                } else if (move.power < 120) {
                    move.power = 185
                } else if (move.power < 130) {
                    move.power = 190
                } else if (move.power < 140) {
                    move.power = 195
                } else {
                    move.power = 200
                }
            }
        }
    } else {
        writeLog(me, you, con.TN + "　の　" + poke.myName + "　の　" + move.name + "　!" + "\n")
        con.used = move.name
        if ( poke.myMove.name == "プレゼント") {
            const random = getRandom() * 100
            if (random < 10) {
                move.power = 120
            } else if (random < 40) {
                move.power = 80
            } else if (random < 80) {
                move.power = 40
            }
        } else if ( poke.myMove.name == "ふくろだたき") {
            move.power = Math.floor(con.A_AV / 10 + 5)
        }
    }

    // 変化Z技の技名を元に戻す
    move.name = move.name.replace("Z", "")



    // がまんの記録
    if ( poke.myMove.name == "がまん") {
        if (con.p_con.includes("状態変化『がまん』")) {
            const text = searchText(con.p_con, "状態変化『がまん』")
            if (text.includes("2/2")) {
                rewriteText(con.p_con, text, text.replace("2/2", "1/2"))
                writeLog(me, you, con.TN + "　の　" + poke.myName + "　は　がまんを続けている!" + "\n")
            } else if (text.includes("1/2")) {
                const parent = text.split("：")[1].split(",")[0]
                const child = text.split("：")[1].split(",")[1]
                const tgtname = text.split("：")[2]
                // がまん中、残りHPが1の状態でみねうち/てかげんを受けていたなど、技を受けたが自分のHPが減らなかった場合、1のダメージを与える。
                (tgtname != "名前" && Number(text.split("：")[3]) == 0)? move.power = 1 : move.power = Number(text.split("：")[3])
                const tgtcon = isCon(me, you, parent, child)
                // 技を使ったポケモンがいない場合、反射対象はランダム
                if (tgtpoke.myName == tgtname) move.target = tgtcon
                else {
                    let array = []
                    for (const _con of [me.con0, me.con1, you.con0, you.con1]) {
                        const _user = isMe(me, you, _con)
                        if (!(_con.parent == con.parent && _con.child == con.child) && _user[0].f_con.includes("ひんし" + _con.child)) {
                            array.push(_con)
                        }
                    }
                    move.target = shuffle(array)[0]
                }
                removeText(con.p_con, "状態変化『がまん』")
                writeLog(me, you, con.TN + "　の　" + poke.myName + "　の　がまんが解かれた!" + "\n")
            }
        } else {
            con.p_con += "状態変化『がまん』　2/2：0,0：名前：0" + "\n"
            writeLog(me, you, con.TN + "　の　" + poke.myName + "　は　がまんを始めた!" + "\n")
            move.nature = "変化"
        }
    }
    */

    
    

    // れんぞくぎりの記録
    if ( poke.myMove.name == "れんぞくぎり" ) poke.myCondition.myFury_cutter += 1

    // アイスボール、ころがるのターン開始
    if ( poke.myMove.name == "アイスボール" ) poke.myCondition.myIce_ball += 1
    if ( poke.myMove.name == "ころがる" ) poke.myCondition.myRollout += 1

    
    /*
    // ちからずく
    const addEff = moveEff.additionalEffect()
    for (let i = 0; i < addEff.length; i++) {
        if ( poke.myMove.name == addEff[i][0] && atk.con.ability == "ちからずく" && move.name != "なげつける") {
            atk.con.p_con += "ちからずく有効" + "\n"
        }
    }

    
    */
}



// 9.わざのタイプが変わる。1→2→3の順にタイプが変わる
function moveTypeChange(poke) {
    // 1.技のタイプを変える特性の効果
    if ( poke.myAbility == "うるおいボイス" && isAbility(poke) && musicMove.includes(poke.myMove.name) ) {
        poke.myMove.type = "みず"
    }
    if ( !canChangeMoveType.includes(poke.myMove.name) && isAbility(poke) ) {
        if ( poke.myAbility == "エレキスキン" && poke.myMove.type == "ノーマル" ) {
            poke.myMove.type = "でんき"
            poke.myCondition.mySkin = "エレキスキン"
        }
        if ( poke.myAbility == "スカイスキン" && poke.myMove.type == "ノーマル" ) {
            poke.myMove.type = "ひこう"
            poke.myCondition.mySkin = "スカイスキン"
        }
        if ( poke.myAbility == "ノーマルスキン" && poke.myMove.type != "ノーマル" ) {
            poke.myMove.type = "ノーマル"
            poke.myCondition.mySkin = "ノーマルスキン"
        }
        if ( poke.myAbility == "フェアリースキン" && poke.myMove.type == "ノーマル" ) {
            poke.myMove.type = "フェアリー"
            poke.myCondition.mySkin = "フェアリースキン"
        }
        if ( poke.myAbility == "フリーズスキン" && poke.myMove.type == "ノーマル" ) {
            poke.myMove.type = "こおり"
            poke.myCondition.mySkin = "フリーズスキン"
        }
    }
    // 2.タイプが変わるわざの効果
    if ( poke.myMove.name == "ウェザーボール" ) {
        if ( isSunny(poke) ) poke.myMove.type = "ほのお"
        if ( isRainy(poke) ) poke.myMove.type = "みず"
        if ( isSandy(poke) ) poke.myMove.type = "いわ"
        if ( isSnowy(poke) ) poke.myMove.type = "こおり"
    }
    if ( poke.myMove.name == "オーラぐるま" && poke.myCondition.myHunger_switch ) {
        poke.myMove.type = "あく"
    }
    if ( poke.myMove.name == "さばきのつぶて" && isItem(poke) ) {
        for ( const element of judgementPlate ) {
            if ( poke.myItem == element.item ) {
                poke.myMove.type = element.type
            }
        }
    }
    if ( poke.myMove.name == "しぜんのめぐみ" && isItem(poke) ) {
        for ( const element of naturalGift ) {
            if ( poke.myItem == element.item ) {
                poke.myMove.type = element.type
                writeLog(`${poke.muItem} を 力に変えた`)
            }
        }
    }
    if ( poke.myMove.name == "だいちのはどう" && onGround(poke) ) {
        if ( fieldStatus.myElectric ) poke.myMove.type = "でんき"
        if ( fieldStatus.myGrassy )   poke.myMove.type = "くさ"
        if ( fieldStatus.myMisty )    poke.myMove.type = "フェアリー"
        if ( fieldStatus.myPsychic )  poke.myMove.type = "エスパー"
    }
    if ( poke.myMove.name == "テクノバスター" && isItem(poke) ) {
        if ( poke.myItem == "アクアカセット" ) poke.myMove.type = "みず"
        if ( poke.myItem == "イナズマカセット" ) poke.myMove.type = "でんき"
        if ( poke.myItem == "ブレイズカセット" ) poke.myMove.type = "ほのお"
        if ( poke.myItem == "フリーズカセット" ) poke.myMove.type = "こおり"
    }
    if ( poke.myMove.name == "マルチアタック" && isItem(poke) ) {
        for ( const element of multiAttack ) {
            if ( poke.myItem == element.item ) {
                poke.myMove.type = element.type
            }
        }
    }
    if ( poke.myMove.name == "めざめるダンス" ) {
        poke.myMove.type = poke.myType[0]
    }
    if ( poke.myMove.name == "めざめるパワー" ) {

    }
    // 3.そうでん/プラズマシャワー状態
    if ( poke.myCondition.myElectrify && poke.myMove.name != "わるあがき")  poke.myMove.type = "でんき"
    if ( fieldStatus.myIon_deluge && poke.myMove.type == "ノーマル" ) poke.myMove.type = "でんき"
}

// 11.PPが適切な量引かれる (プレッシャーの効果が考慮される)
function PPDecrease(poke) {
    // 以下の場合はPPが減らない
    if ( poke.myCondition.myThrash_move )    return // あばれる状態
    if ( poke.myCondition.myFilling )        return // ため技を放つ時
    if ( poke.myCondition.myIce_ball >= 2 )  return // アイスボールの2回目以降
    if ( poke.myCondition.myRollout >= 2 )   return // ころがるの2回目以降
    if ( poke.myCondition.myBide_turn >= 2 ) return // がまんの2ターン目と放つ時

    const PP = poke[`myRest_pp_${poke.myCmd_move}`]
    let count = 1
    /*
    for (const tgt of con.tgt) {
        const user = isMe(me, you, tgt)
        if (tgt.ability == "プレッシャー" && isAbility(user[0], tgt)) count += 1
    }
    */
    poke[`myRest_pp_${poke.myCmd_move}`] = Math.max(PP - count, 0)

    /*
    if (!con.p_con.includes("状態変化『へんしん』")) {
        me["poke" + con.num]["last_" + con.com] = con["last_" + con.com]
    }

    // クロスサンダー・クロスフレイムの記録
    if ( poke.myMove.name == "クロスサンダー" || move.name == "クロスフレイム") {
        me.f_con += "技『" + move.name + "』使用" + "\n"
        you.f_con += "技『" + move.name + "』使用" + "\n"
    }

    // 他の技が出る技の失敗
    if (move.discription == false) {
        writeLog(`しかし うまく決まらなかった....`)
        return true
    }
    */
}

// 12.こだわり系アイテム/ごりむちゅうで技が固定される
function commitmentRock(poke) {
    // 以下の状況ではこだわらない
    if ( !( poke.myItem.includes("こだわり") && isItem(poke) ) && !( poke.myAbility == "ごりむちゅう" && isAbility(poke)) ) return
    if ( poke.myCondition.myChoice ) return
    if ( poke.myCondition.myDynamax ) return

    // こだわる技を記録
    const move = poke.myMove.name
    poke.myCondition.myChoice = move

    // 他の技が出る技でこだわる場合、元の技でこだわる
    /*
    for (const line of moveList) {
        if (move.discription == line.name) {
            removeText(con.p_con, "状態変化『こだわり』")
            con.p_con += "状態変化『こだわり』　" + move.discription + "\n"
        }
    }
    */
}

// 13.技の仕様による失敗
function failureForMoveSpecification(poke) {
    const target = isTarget(poke)
    const history = poke.myCondition.myHistory
    const moveList = [poke.myMove_0, poke.myMove_1, poke.myMove_2, poke.myMove_3]

    switch ( poke.myMove.name ) {
        case "アイアンローラー":
            if ( myField.myElectric ) return false
            if ( myField.myGrassy )   return false
            if ( myField.myMisty )    return false
            if ( myField.myPsychic )  return false

            return true

        case "いじげんラッシュ":
            if ( poke.myName == "フーパ(ときはなたれしフーパ)" ) return false // 使用者のポケモンの姿が適格でない
            return true
        
        case "ダークホール":
            if ( poke.myName == "ダークライ" ) return false // 使用者のポケモンの姿が適格でない
            return true
        
        case "オーラぐるま":
            if ( poke.myName == "モルペコ" ) return false // 使用者のポケモンの姿が適格でない
            return true
        
        case "がまん":
            if ( poke.myCondition.myBide_damage ) return false // 解き放つダメージが無い
            poke.myCondition.myBide_turn = false
            return true

        case "カウンター":
            if ( poke.myDamage_nature != "物理" ) return true // 適格なダメージをそのターンは受けていない
            if ( !oppJudgeByID(poke.myID, poke.myDamage_ID) ) return true // 味方からのダメージ
            return false
        
        case "ミラーコート":
            if ( poke.myDamage_nature != "特殊" ) return true // 適格なダメージをそのターンは受けていない
            if ( !oppJudgeByID(poke.myID, poke.myDamage_ID) ) return true // 味方からのダメージ
            return false
        
        case "メタルバースト":
            if ( !poke.myDamage_nature ) return true // 適格なダメージをそのターンは受けていない
            if ( !oppJudgeByID(poke.myID, poke.myDamage_ID) ) return true // 味方からのダメージ
            return false
        
        case "くちばしキャノン":
            if ( !poke.myCondition.myBeak_blast ) return true // 加熱していない（アンコールで強制された場合など）(wikiにない)
            return false
        
        case "ソウルビート":
            if ( poke.myRest_hp < Math.floor(poke.myFull_HP / 3) ) return true // 使用者のHPが足りない
            return false
        
        case "たくわえる":
            if ( poke.myCondition.myStockpile == 3 ) return true // たくわえるカウントがすでに3である
            return false
        
        case "はきだす":
        case "のみこむ":
            if ( poke.myCondition.myStockpile == 0 ) return true // たくわえるカウントが0である
            return false
        
        case "とっておき":
            if ( !moveList.includes("とっておき") ) return true // 覚えているわざにとっておきがない
            if ( moveList.filter( move => !move ).length === 1 ) return true // とっておき以外の技を覚えていない
            // 使用されてない技がある　がまだ
            return false

        case "ほおばる":
            if ( !berryList.includes(poke.myItem) ) return true // きのみを持っていない
            else return false
        
        case "なげつける":
        case "しぜんのめぐみ":
            if ( !poke.myItem ) return true // 持ち物が無い
            if ( !isItem(poke) ) return true // 特性ぶきよう/さしおさえ/マジックルーム状態である
            if ( poke.myMove.name == "なげつける" && poke.myItem.includes("ジュエル") ) return true // 不適格な持ち物である
            return false
        
        case "たたみがえし":
        case "であいがしら":
        case "ねこだまし":
            if ( !history ) return false // 行動していない
            if ( history.length == 1 && activateOtherMove.includes(history[0].name) && history[0].success ) return false // 他の技が出る技で出た
            return true
        
        case "はいすいのじん":
            if ( poke.myCondition.myNo_retreat ) return true // すでにはいすいのじんによりにげられない状態になっている
            return false
        
        case "うらみ":
            if ( !target ) return false
            if ( !target[0].myCondition.myHistory ) return true // 対象が技を使っていない（wikiには載っていない）
            return false
        
        case "ギフトパス":
            if ( !target ) return false
            if ( !poke.myItem ) return true // 自分が持ち物を持っていない
            if ( target[0].myItem ) return true // 対象が持ち物を持っている
            if ( cannotChangeItem(poke) ) return true
            return false
        
        case "ふいうち":
            if ( !target ) return false
            if ( target[0].myCmd_move === "" ) return true // 対象がすでに行動済み
            if ( moveSearchByName(target[0][`myMove_${target[0].myCmd_move}`]).nature == "変化" ) return true // 変化技を選択している
            return false
        
        case "ポルターガイスト":
            if ( !target ) return false
            if ( !target[0].nyItem ) return true // 対象が持ち物を持っていない
            return false
        
        case "まもる":
        case "みきり":
        case "こらえる":
        case "キングシールド":
        case "ニードルガード":
        case "トーチカ":
        case "ブロッキング":
        case "ダイウォール":
            // まもる・みきり・こらえる・キングシールド・ニードルガード・トーチカ・ブロッキング・ダイウォール・ワイドガード・ファストガード　が成功した次のターン
            // まもる・みきり・こらえる・キングシールド・ニードルガード・トーチカ・ブロッキング・ダイウォール　　　　　　　　　　　　　　　　の成功率は下がる。
            if ( allPokeInBattle().filter( _poke => _poke.myCmd_move !== "" ).length === 1 ) return true // ターンの最後の行動
            const protectTurn = Math.min(poke.myCondition.myProtect_num, 6)
            if ( getRandom() < 1 / Math.pow(3, protectTurn) ) return false // 連続使用による失敗判定
            return true
        
        // みちづれ: 前回まで最後に成功した行動がみちづれである
        case "みちづれ":
            if ( !history ) return false // 行動していない
            if ( history[0].name == "みちづれ" && history[0].success ) return true
            return false
        
        // みらいよち/はめつのねがい: 対象の場がすでにみらいにこうげき状態になっている
        case "みらいよち":
        case "はめつのねがい":
            /*
            const tgt = con.tgt[0]
            const user = isMe(me, you, tgt)
            if (user[0].f_con.includes("状態変化『みらいにこうげき』")) {
                const text = searchText(user[0].f_con, "状態変化『みらいにこうげき』")
                const tgt_parent = Number(text.split("　")[4].split(",")[0])
                const tgt_child = Number(text.split("　")[4].split(",")[1])
                if (tgt_parent == tgt.parent && tgt_child == tgt.child) tgt.success = false
            }
            */
        
        // もえつきる: 使用者がほのおタイプではない
        case "もえつきる":
            if ( !poke.myType.includes("ほのお") ) return true
            return false
        
        // いびき/ねごと: 使用者がねむり状態でない
        case "いびき":
        case "ねごと":
            if ( poke.myAilment == "ねむり" ) return false
            if ( poke.myAbility == "ぜったいねむり" && isAbility(poke) ) return false
            return true
        
        // ねむる
        case "ねむる":
            // 1.HPが満タンである/ねごとで出たためすでにねむり状態にある
            if ( poke.myFull_HP == poke.myRest_HP ) return true
            if ( poke.myAilment == "ねむり" ) return true
            // 2.使用者がふみん/やるきである
            if ( poke.myAbility == "ふみん" && isAbility(poke) ) return true
            if ( poke.myAbility == "やるき" && isAbility(poke) ) return true
            // 3.エレキ/ミストフィールド状態である（以下、wikiにない）
            if ( myField.myElectric && onGround(poke) ) return true
            if ( myField.myMisty && onGround(poke) ) return true
            // 4.さわぐ状態のポケモンがいる（以下wikiにない）
            if ( isUproar() ) return true
            // 5.スイートベール
            if ( isSweetVeil(poke) ) return true
            // 6.リーフガード
            if ( poke.myAbility == "リーフガード" && isAbility(poke) && isSunny(poke) ) return true

            return false
    }
}

// 14.自分のこおりを回復するわざにより自身のこおり状態が治る
function selfMeltCheck(poke) {
    if ( poke.myAilment == "こおり" && meltFrozen.includes(poke.myMove.name) ) {
        writeLog(`${poke.myMove.name} でこおりがとけた !`)
        resetAilment(poke)
    }
}

// 15.おおあめ/おおひでりによる技の失敗
function greatWeatherFailure(poke) {
    if ( !isWeather() ) return false
    if ( fieldStatus.myHeavy_rain && poke.myMove.type == "ほのお" ) {
        writeLog(`しかし ${poke.myMove.name} は 消えてしまった !`)
        return true
    }
    if ( fieldStatus.myDrought && poke.myMove.type == "みず" ) {
        writeLog(`しかし ${poke.myMove.name} は 蒸発してしまった !`)
        return true
    }
}

// 16.ふんじんによるほのお技の失敗とダメージ
function powderFailure(poke) {
    if ( poke.myCondition.myPowder && poke.myMove.type == "ほのお" ) {
        writeLog(`しかし ふんじんで 技が失敗した !`)
        const damage = Math.round(poke.myFull_hp / 4 * isDynamax(poke))
        changeHP(poke, damage, "-")
        return true
    }
}

// 17.トラップシェルが物理技を受けていないことによる失敗
function shellTrap(poke) {
    if ( poke.myMove.name != "トラップシェル" ) return false
    if ( poke.myCondition.myShell_trap == "set" ) {
        poke.myCondition.myShell_trap = false
        writeLog(`しかし トラップシェルは 不発に終わった !`)
        return true
    }
    if ( poke.myCondition.myShell_trap == true ) {
        poke.myCondition.myShell_trap = false
        return false
    }
    writeLog(`しかし うまく決まらなかった....`)
    return true
}

// 18.けたぐり/くさむすび/ヘビーボンバー/ヒートスタンプをダイマックスポケモンに使用したことによる失敗
function dynaWeightFailure(poke) {
    if ( !referToWeight.includes(poke.myMove.name) ) return false
    const target = isTarget(poke)
    if ( !target ) return false
    if ( target[0].myCondition.myDynamax ) {
        writeLog(`${poke.myTN} の ${poke.myName} は 首を横に振った`)
        return true
    } else {
        return false
    }
}

// 19.特性による失敗
function abilityFailure(poke) {
    // しめりけ: 爆発技
    if ( moisture.includes(poke.myMove.name) ) {
        for ( const _poke of allPokeInBattle() ) {
            if ( _poke.myAbility == "しめりけ" && isAbility(_poke) ) {
                abilityDeclaration(_poke)
                writeLog(`${poke.myMove.name} は うまく決まらなかった....`)
                return true
            }
        }
    }
    // じょおうのいげん/ビビッドボディ: 優先度が高い技
    const target = isTarget(poke)
    if ( !target ) return false
    if ( poke.myMove.priority <= 0 ) return false
    for ( const tgt of target ) {
        if ( !isAbility(tgt) ) continue
        if ( !oppJudgeByID(poke, tgt) ) continue
        if ( tgt.myAbility == "じょおうのいげん" || tgt.myAbility == "ビビッドボディ" ) {
            abilityDeclaration(tgt)
            writeLog(`${poke.myMove.name} は うまく決まらなかった....`)
            return true
        }
    }
}

// 20.中断されても効果が発動する技
function remainEffectMove(poke) {
    // みらいよち/はめつのねがい: 相手をみらいにこうげき状態にし、行動を終了する
    /*
    if ( poke.myMove.name == "はめつのねがい" || move.name == "みらいよち") {
        const tgt = con.tgt[0]
        const user = isMe(me, you, tgt)
        const atk = con.parent + "," + con.child + "," + con.num
        const def = tgt.parent + "," + tgt.child
        user[0].f_con += "状態変化『みらいにこうげき』　3/3　" + move.name + "　" + atk + "　" + def + "\n"
        writeLog(me, you, poke.myName + "は　未来に攻撃を予知した!" + "\n")
        return true
    }
    */
    // 誓い技: コンビネーションわざのセッターである場合、現在の行動は失敗し味方の行動順を引き上げる(リストは1から)
    // りんしょう: 行動後、味方のりんしょうによる行動順を引き上げる
    // エコーボイス: 次のターンのエコーボイスの威力が上がる
    if ( poke.myMove.name == "エコーボイス" ) {
        if ( !fieldStatus.myEchoed_check ) {
            fieldStatus.myEchoed_voice += 1
            fieldStatus.myEchoed_check = true
        }
    }
    // いかり: いかり状態になる
    if ( poke.myMove.name == "いかり" ) {
        poke.myCondition.myRage = true
    }
}

// 21.へんげんじざい/リベロの発動
function proteanLibero(poke) {
    if ( !isAbility(poke) ) return
    if ( poke.myMove.type == poke.myType[0] && poke.myType.length == 1 ) return
    if ( poke.myAbility == "へんげんじざい" || poke.myAbility == "リベロ" ) {
        poke.myType = [poke.myMove.type]
        abilityDeclaration(poke)
        writeLog(`${poke.myName} は ${poke.myMove.type} タイプに変わった !`)
    }
}

// 22.溜め技の溜めターンでの動作
function accumulateOperation(poke) {
    if ( !accumulationMove.includes(poke.myMove.name) ) return
    
    //行動ターン
    if ( poke.myCondition.myFilling ) { 
        resetFilling(poke)
        if ( poke.myMove.name == "フリーフォール" ) {
            const tgt = isTarget(poke)[0]
            tgt.myCondition.mySky_drop = false
            if ( tgt.myType.includes("ひこう") ) {
                writeLog(`しかし うまく決まらなかった....`)
                return true
            }
        }
        return false
    }

    // 溜めるターン
    // フリーフォール
    if ( poke.myMove.name == "フリーフォール" ) {
        const tgt = isTarget(poke)[0]
        // 1.対象が姿を隠していることによる失敗
        if ( isHide(tgt) ) {
            writeLog(`しかし うまく決まらなかった....`)
            return true
        }
        // 2.対象がみがわり状態であることによる失敗
        if ( tgt.myCondition.mySubstitute ) {
            writeLog(`しかし うまく決まらなかった....`)
            return true
        }
        // 3.対象のおもさが200.0kg以上あることによる失敗
        if ( isWeight(tgt) >= 200 ) {
            writeLog(`しかし うまく決まらなかった....`)
            return true
        }
        // 4.相手を空中に連れ去る
        writeLog(`${tgt.myTN} の ${tgt.myName} を 空へ連れ去った !`)
        poke.myCondition.myFilling  = poke.myMove.name
        poke.myCondition.mySky      = true
        tgt.myCondition.mySky_drop  = true
        tgt.myCondition.mySpotlight = false // 対象の注目の的状態を解除
        return true
    }
    
    // フリーフォール以外
    poke.myCondition.myFilling = poke.myMove.name

    // 姿を隠すため技
    switch ( poke.myMove.name ) {
        case "あなをほる":
            poke.myCondition.myDig = true
            writeLog(`${poke.myName} は 地中に潜った !`)
            break
        
        case "ゴーストダイブ":
        case "シャドーダイブ":
            poke.myCondition.myShadow = true
            writeLog(`${poke.myName} は 闇に潜んだ !`)
            break
        
        case "そらをとぶ":
        case "とびはねる":
            poke.myCondition.mySky = true
            writeLog(`${poke.myName} は 空へ飛び立った !`)
            break
        
        case "ダイビング":
            poke.myCondition.myDive = true
            // ダイビング: うのミサイルでフォルムチェンジする
            if ( poke.myAbility == "うのミサイル" && isAbility(poke) && !poke.myCondition.myGulp_missile ) {
                abilityDeclaration(poke)
                poke.myCondition.myGulp_missile = ( poke.myRest_hp > poke.myFull_hp / 2 )? "うのみのすがた" : "まるのみのすがた"
                writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myCondition.myGulp_missile} に 姿を変えた !`)
            }
            writeLog(`${poke.myName} は 海に潜った !`)
            break
    }

    // 姿を隠さないため技
    if ( !isHide(poke) ) {
        writeLog(`${poke.myTN} の ${poke.myName} は 力を溜めている !`)
        if ( poke.myMove.name == "ロケットずつき" ) changeMyRank(poke, "def", 1)
        if ( poke.myMove.name == "メテオビーム" ) changeMyRank(poke, "sp_atk", 1)
    }
    
    // パワフルハーブを持つ場合は使用する。それ以外の場合は次のターンまで行動を中断する(失敗したとは見なされない)
    if ( (poke.myMove.name == "ソーラービーム" || poke.myMove.name == "ソーラーブレード" ) && isSunny(poke) ) {
        resetFilling(poke)
        return false
    }
    if ( poke.myItem == "パワフルハーブ" && isItem(poke) ) {
        writeLog(`${poke.myName} は パワフルハーブで 力がみなぎった !`)
        resetFilling(poke)
        enableToRecycle(poke)
        return false
    }

    return true    
}

// 23
// よこどり状態のポケモンがいる時、よこどりされる
    /*
    if (def.con.p_con.includes("よこどり") && moveEff.snatch().includes( poke.myMove.name)) {
        removeText(def.con, "よこどり")
        writeLog(me, you, def.con.TN + "　の　" + def.poke.myName + "に　技を横取りされた!" + "\n")
        atk = order[0]
        def = order[1]

        // 9.わざのタイプが変わる。1→2→3の順にタイプが変わる
        moveTypeChange(me, you, con, move)
        // 45.技の仕様による無効化(その1)
        if (moveSpecificationsInvalidation1(me, you, con, move)) {return true}
        // 46.技の仕様による無効化(その2)
        if (moveSpecificationsInvalidation2(me, you, con, move)) {return true}
        // 62.技の仕様による無効化(その3)
        if (moveSpecificationsInvalidation3(me, you, con, move)) {return true}

        process.moveProcess(me, you, con, move)

        return true
    }
    */

// 24.だいばくはつ/じばく/ミストバーストによるHP消費が確約される
function promiseToChangeHP(poke) {
    switch ( poke.myMove.name ) {
        case "じばく":
        case "だいばくはつ":
        case "ミストバースト":
            poke.myCondition.myExplosion = true
            break
    }
}

// 25.対象のポケモンが全員すでにひんしになっていて場にいないことによる失敗
function faintedFailure(poke) {
    if ( poke.myMove.target.includes("場") ) return false

    // 攻撃対象の数を記録
    const target = isTarget(poke)

    if ( target.length == 0 ) {
        if ( poke.myCondition.myExplosion ) return false
        if ( poke.myMove.name == "しぜんのめぐみ" ) enableToRecycle(poke)
        writeLog(`しかし うまく決まらなかった....`)
        return true
    }

    for ( const tgt of target ) {
        poke.myTarget.push({
            poke: tgt,                          // ポケモン
            success: true,                      // 技の成否
            damage: 0,                          // ダメージ量
            effective: 1,                       // タイプ相性
            critical: false,                    // 急所
            substitute: isSubstitute(poke, tgt) // みがわりの有無
        })
    }
}

// 26.だいばくはつ/じばく/ミストバーストの使用者は対象が不在でもHPを全て失う。使用者がひんしになっても攻撃は失敗しない
function selfDestruction(poke) {
    if ( !poke.myCondition.myExplosion ) return
    poke.myRest_hp = 0
    toHand(poke)
}

// 27.ビックリヘッド/てっていこうせんの使用者はHPを50%失う。対象が不在なら失わない。使用者がひんしになっても攻撃が失敗しない
function mindblownStealbeam(poke) {
    if ( poke.myMove.name != "ビックリヘッド" && poke.myMove.name != "てっていこうせん" ) return
    if ( !poke.myTarget ) return
    poke.myRest_hp = Math.max(poke.myRest_hp - Math.ceil(poke.myFull_hp / 2), 0)
}

// 28.マグニチュード使用時は威力が決定される
function magnitude(poke) {
    if ( poke.myMove.name == "マグニチュード" ) {
        const random = getRandom() * 100
        let mag = 0
        const convert = [[0, 4, 10], [5, 5, 30], [15, 6, 50], [35, 7, 70], [65, 8, 90], [85, 9, 110], [95, 10, 150]]
        for ( const element of convert ) {
            if ( random >= element[0] ) {
                mag = convert[1]
                poke.myMove.power = element[2]
            }
        }
        writeLog(`マグニチュード${mag} !`)
    }
}

// 29.姿を隠していることによる無効化
function hideInvalidation(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue

        // 以下の状況では姿を隠していても当たる
        if ( poke.myMove.name != "フリーフォール" ) {
            if ( poke.myCondition.myLock_on ) continue
            if ( poke.myAbility == "ノーガード" && isAbility(poke) ) continue
            if ( tgt.poke.myAbility == "ノーガード" && isAbility(tgt.poke) ) continue
        }
        if ( poke.myMove.name == "どくどく" && poke.myType.includes("どく") ) continue
        if ( poke.myMove.name == "アロマセラピー" ) continue
        if ( poke.myMove.name == "いやしのすず" ) continue
        if ( poke.myMove.name == "てだすけ" ) continue

        if ( !isHide(tgt.poke) ) continue

        // 以下の状況では当たらない
        if ( tgt.poke.myCondition.myDig ) {
            if ( poke.myMove.name == "じしん" ) continue
            if ( poke.myMove.name == "マグニチュード" ) continue
        }
        if ( tgt.poke.myCondition.mySky ) {
            if ( poke.myMove.name == "うちおとす" ) continue
            if ( poke.myMove.name == "かぜおこし" ) continue
            if ( poke.myMove.name == "かみなり" ) continue
            if ( poke.myMove.name == "サウザンアロー" ) continue
            if ( poke.myMove.name == "スカイアッパー" ) continue
            if ( poke.myMove.name == "たつまき" ) continue
            if ( poke.myMove.name == "ぼうふう" ) continue
        }
        if ( tgt.poke.myCondition.myDive ) {
            if ( poke.myMove.name == "なみのり" ) continue
            if ( poke.myMove.name == "うずしお" ) continue
        }

        tgt.success = false
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 当たらなかった !`)
    }

    return checkMoveSuccess(poke)
}

// 30.サイコフィールドによる無効化
    // 優先度+1以上の技でも、以下の技は有効となる。
        // 味方から使用された技
        // 技の使用者自身に対して使われた技 - このためまもるなどが使用を制限されることは無い。
        // 全体の場が対象の技
        // 相手の場が対象の技
function phschoFieldInvalidation(poke) {
    if ( !fieldStatus.myPsychic )    return false // サイコフィールド状態であること
    if ( poke.myMove.priority <= 0 ) return false // 技の優先度が1以上であること

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )                     continue // すでに失敗していないこと
        if ( poke.myParty == tgt.poke.myParty ) continue // 対象が相手のポケモンであること
        if ( !onGround(tgt.poke) )              continue // 対象が接地していること

        writeLog(`${tgt.poke.name} は サイコフィールドに 守られている !`)
        tgt.success = false
    }

    return checkMoveSuccess(poke)
}

// 31.0 シャドーダイブ・ゴーストダイブなどによるまもるの解除
function breakProtect(poke) {
    if ( !cancelProtect.includes(poke.myMove.name) ) return // 対象の技を使用していること
    // 命中すること
    // 相性・特性・サイコフィールドなどによりダメージが無効化されないこと

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue            // すでに失敗していないこと
        if ( compatibilityCheck(poke, tgt.poke) == 0 ) continue // タイプ相性で無効化されないこと

        // 攻撃対象のまもるを解除
        tgt.poke.myCondition.myProtect = false
        // 場に接地するまもるを解除
        for ( const _poke of myPokeInBattle(tgt.poke) ) {
            isField(_poke).myMat_block = false     // たたみがえし
            isField(_poke).myWide_guard = false    // ワイドガード
            isField(_poke).myQuick_guard = false   // ファストガード
            isField(_poke).myCrafty_shield = false // トリックガード
        }
    }
}

// 31.ファストガード/ワイドガード/トリックガードによる無効化 (Zワザ/ダイマックスわざならダメージを75%カットする)
function otherProtectInvalidation(poke) {
    /*
    if (atk.data.Z) {
        return false
    }
    */

    // ファストガード
    const quick_guard = (poke, tgt) => {
        if ( !isField(tgt).myQuick_guard ) return false // ファストガード状態であること
        if ( poke.myMove.priority <= 0 )  return false // 優先度が1以上であること

        return true
    }
    // ワイドガード
    const wide_guard = (poke, tgt) => {
        if ( !isField(tgt).myWide_guard )  return false // ワイドガード状態であること
        if ( poke.myMove.target == "相手全体" )  return false
        if ( poke.myMove.target == "自分以外" )  return false

        return true
    }
    // トリックガード
    const crafty_shield = (poke, tgt) => {
        if ( !isField(tgt).myCrafty_shield ) return false   // トリックガード状態であること
        if ( poke.myID == tgt.myID ) return false          // 対象が自分でないこと
        if ( poke.myMove.nature != "変化" ) return false    // 変化技であること
        if ( poke.myMove.target == "全体" ) return false    // 対象が全体でないこと
        if ( poke.myMove.target == "味方全体" ) return false // 対象が味方全体でないこと
        if ( poke.myMove.name == "コーチング" ) return false // コーチングは防げない
        if ( poke.myMove.name == "さきどり" ) return false   // さきどりは防げない

        return true
    }


    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // ファストガード
        if ( quick_guard(poke, tgt.poke) ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ファストガードに 守られている !`)
            tgt.success = false
        }
        // ワイドガード
        if ( wide_guard(poke, tgt.poke) ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ワイドガードに 守られている !`)
            tgt.success = false
        }
        // トリックガード
        if ( crafty_shield(poke, tgt.poke) ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は トリックガードに 守られている !`)
            tgt.success = false
        }
    }

    return checkMoveSuccess(poke)
}

// 32.まもる/キングシールド/ブロッキング/ニードルガード/トーチカによる無効化 (Zワザ/ダイマックスわざなら75%をカットする)
function protectInvalidation(poke) {
    /*if (((atk.data.Z && move.nature != "変化") || atk.data.dynaTxt.includes("3") || atk.data.gigaTxt.includes("3")) && !def.con.p_con.includes("ダイウォール")) {
        return false 
    }*/

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue                      // すでに失敗していないこと
        if ( cannotProtectByDynaWall.includes(poke.myMove.name) ) continue // ダイウォールでも防げない技
        if ( !tgt.poke.myCondition.myMax_guard ) { // ダイウォール状態でない時
            if ( poke.myMove.protect == "不能" ) continue
            if ( poke.myAbility == "ふかしのこぶし" && isAbility(poke) && poke.myMove.direct == "直接" ) continue
        }
       
        if ( tgt.poke.myCondition.myProtect || tgt.poke.myCondition.myMax_guard ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 攻撃を守った !`)
            tgt.success = false

            // 直接攻撃　かつ　ぼうごパットを持っていない　なら追加効果を受ける
            if ( poke.myMove.direct == "間接" ) continue
            if ( poke.myItem == "ぼうごパット" && isItem(poke) ) continue

            switch ( tgt.poke.myCondition.myProtect ) {
                case "キングシールド":
                    changeRank(poke, "atk", -1, isSpirit(poke, tgt.poke))
                    break

                case "ニードルガード":
                    const damage = Math.max(Math.floor(poke.myFull_hp / 8), 1)
                    changeHP(poke, damage, "-")
                    break

                case "トーチカ":
                    getAbnormal(poke, "どく")
                    break
                
                case "ブロッキング":
                    changeRank(poke, "def", -2, isSpirit(poke, tgt.poke))
                    break
            }
        }
    }

    return checkMoveSuccess(poke)
}

// 33.たたみがえしによる無効化 (Zワザ/ダイマックスわざなら75%をカットする)
function matBlock(poke) {
    if ( poke.myAbility == "ふかしのこぶし" && isAbility(poke) && poke.myMove.direct == "直接" ) return
    if (/*atk.data.Z &&*/ poke.myMove.nature != "変化" ) return false

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( tgt.poke.myCondition.myMat_block ) {
            writeLog(`${tgt.poke.myName} は たたみがえし で攻撃から 身を守った !`)
            tgt.success = false
        }
    }

    return checkMoveSuccess(poke)
}

// 35.マジックコート状態による反射
function magicCoatReflection(poke) {
    /*
    if ((def.con.p_con.includes("マジックコート") || def.con.ability == "マジックミラー") && moveEff.magicCort().includes( poke.myMove.name)) {
        writeLog(me, you, move.name +  "　は　跳ね返された!" + "\n")
        let save = atk
        atk = def
        def = save
        move.discription = "反射"
    }
    */
}

// 36.テレキネシスの場合、対象がディグダ/ダグトリオ/スナバァ/シロデスナ/メガゲンガー/うちおとす状態/ねをはる状態であることによる失敗
function telekinesisFailure(poke) {
    if ( poke.myMove.name != "テレキネシス" ) return // テレキネシスを使用していること

    const nameList = ["ディグダ", "ダグトリオ", "スナバァ", "シロデスナ", "メガゲンガー"]
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )       continue // すでに失敗していないこと

        if ( nameList.includes(tgt.poke.myName) ) tgt.success = false // 特定のポケモンには効果がない
        if ( tgt.poke.myCondition.mySmack_down )  tgt.success = false // うちおとす状態には効果がない
        if ( tgt.poke.myCondition.myIngrain )     tgt.success = false // ねをはる状態には効果がない

        if ( tgt.success == false ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.name} には　効果がないようだ....`)
    }

    return checkMoveSuccess(poke)
}

// 38.特性による無効化(その1)
function abilityInvalidation1(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( !isAbility(tgt.poke) )         continue // 対象の特性が有効であること
        if ( poke.myID == tgt.poke.myID )   continue // 対象が自分でないこと

        const damage = Math.floor(tgt.poke.myFull_hp / 4 * isDynamax(tgt.poke))
        switch ( tgt.poke.myAbility ) {
            case "そうしょく":
                if ( poke.myMove.type != "くさ" ) break
                abilityDeclaration(tgt.poke)
                changeRank(tgt.poke, "atk", 1, isSpirit(poke, tgt.poke))
                tgt.success = false
                break
            
            case "もらいび":
                if ( poke.myMove.type != "ほのお" ) break
                abilityDeclaration(tgt.poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ほのおの威力が上がった !`)
                tgt.poke.myCondition.myFlash_fire = true
                tgt.success = false
                break
            
            case "かんそうはだ":
            case "ちょすい":
                if ( poke.myMove.type != "みず" ) break
                abilityDeclaration(tgt.poke)
                changeHP(tgt.poke, damage, "+")
                tgt.success = false
                break
            
            case "よびみず":
                if ( poke.myMove.type != "みず" ) break
                abilityDeclaration(tgt.poke)
                changeRank(tgt.poke, "sp_atk", 1, isSpirit(poke, tgt.poke))
                tgt.success = false
                break
            
            case "ひらいしん":
                if ( poke.myMOve.type != "でんき" ) break
                if ( poke.myMove.name == "じばそうさ" ) break
                abilityDeclaration(tgt.poke)
                changeRank(tgt.poke, "sp_atk", 1, isSpirit(poke, tgt.poke))
                tgt.success = false
                break
            
            case "でんきエンジン":
                if ( poke.myMOve.type != "でんき" ) break
                if ( poke.myMove.name == "じばそうさ" ) break
                abilityDeclaration(tgt.poke)
                changeRank(tgt.poke, "speed", 1, isSpirit(poke, tgt.poke))
                tgt.success = false
                break
            
            case "ちくでん":
                if ( poke.myMOve.type != "でんき" ) break
                if ( poke.myMove.name == "じばそうさ" ) break
                abilityDeclaration(tgt.poke)
                changeHP(tgt.poke, damage, "+")
                tgt.success = false
                break
            
            case "ぼうおん":
                if ( !musicMove.includes(poke.myMove.name) ) break
                abilityDeclaration(tgt.poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
                tgt.success = false
                break
            
            case "テレパシー":
                if ( poke.myMove.nature == "変化" ) break
                if ( isSpirit(poke, tgt.poke) ) break
                abilityDeclaration(tgt.poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 味方からの 攻撃を 受けない !`)
                tgt.success = false
                break

            case "ふしぎなまもり":
                if ( compatibilityCheck(poke, tgt.poke) > 1 ) break
                if ( poke.myMove.nature == "変化" ) break
                abilityDeclaration(tgt.poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
                tgt.success = false
                break
            
            case "ぼうじん":
                if ( !powderMove.includes(poke.myMove.name) ) break
                abilityDeclaration(tgt.poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
                tgt.success = false
                break
        }
    }

    return checkMoveSuccess(poke)
}

// 39.相性による無効化
function compatibilityInvalidation(poke) {
    if ( poke.myMove.name == "わるあがき" ) return false // わるあがきにタイプ相性はない
    if ( poke.myMove.nature == "変化" && poke.myMove.name != "でんじは" ) return false // でんじは以外の変化技にタイプ相性はない

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        tgt.effective = compatibilityCheck(poke, tgt.poke)
        if ( tgt.effective == 0 ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            tgt.success = false
        }
    }

    return checkMoveSuccess(poke)
}

// 40,ふゆうによる無効化
// 41.でんじふゆう/テレキネシス/ふうせんによる無効化
function levitateInvalidation(poke) {
    if ( poke.myMove.type != "じめん" ) return false
    if ( poke.myMove.nature == "変化" ) return false
    if ( poke.myMove.name == "サウザンアロー" ) return false

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )   continue // すでに失敗していないこと
        if ( onGround(tgt.poke) ) continue // 接地していないこと

        if ( tgt.poke.myAbility == "ふゆう" && isAbility(tgt.poke) ) {
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            tgt.success = false
        } else {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            tgt.success = false
        }
    }

    return checkMoveSuccess(poke)
}

// 42.ぼうじんゴーグルによる無効化
function powderGoggleInvalidation(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( tgt.poke.myItem == "ぼうじんゴーグル" && isItem(tgt.poke) && powderMove.includes(poke.myMove.name) ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ぼうじんゴーグルで ${poke.myMove.name} を 受けない !`)
            tgt.success = false
        }
    }

    return checkMoveSuccess(poke)
}

// 43.特性による無効化(その2)
function abilityInvalidation2(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( !isAbility(poke) )  continue // 対象の特性が有効であること

        switch( tgt.poke.myAbility ) {
            case "ぼうだん":
                if ( !ballMove.includes(poke.myMove.name) ) break
                abilityDeclaration(tgt.poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
                tgt.success = false
                break
            
            case "ねんちゃく":
                if ( poke.myMove.name == "トリック" || poke.myMove.name == "すりかえ" || poke.myMove.name == "ふしょくガス" ) {
                    abilityDeclaration(tgt.poke)
                    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
                    tgt.success = false
                }
                break
        }
    }

    return checkMoveSuccess(poke)
}

// 44.タイプによる技の無効化(その1)
function typeInvalidation1(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // くさタイプ: 粉技の無効化
        if ( tgt.poke.myType.includes("くさ") ) {
            if ( powderMove.includes(poke.myMove.name) ) tgt.success = false
        }
        // ゴーストタイプ: にげられない状態にする変化技の無効化
        if ( tgt.poke.myType.includes("ゴースト") ) {
            if ( poke.myMove.name == "クモのす" ) tgt.success = false
            if ( poke.myMove.name == "くろいまなざし" ) tgt.success = false
            if ( poke.myMove.name == "たこがため" ) tgt.success = false
            if ( poke.myMove.name == "とおせんぼう" ) tgt.success = false
        }
        // あくタイプ: いたずらごころの効果が発動した技の無効化
        if ( tgt.poke.type.includes("あく") ) {
            if ( poke.myAbility == "いたずらごころ" && isAbility(poke) && poke.myMove.nature == "変化" && poke.myMove.priority > 0) tgt.success = false
        }
        // こおりタイプ: ぜったいれいどの無効化
        if ( tgt.poke.myType.includes("こおり") ) {
            if ( poke.myMove.name == "ぜったいれいど" ) tgt.success = false
        }

        if ( tgt.success == false ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
    }

    return checkMoveSuccess(poke)
}

// 45.技の仕様による無効化(その1)
function moveSpecificationsInvalidation1(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        switch ( poke.mymove.name ) {
            case "メロメロ":
                if ( poke.myGender == "-" ) tgt.success = false
                if ( tgt.poke.myGender == "-" ) tgt.success = false
                if ( poke.myGender == tgt.poke.myGender ) tgt.success = false
                break

            case "ゆうわく": // (wikiにない)
                if ( poke.myGender == "♂" && tgt.poke.myGender == "♀" ) break
                if ( poke.myGender == "♀" && tgt.poke.myGender == "♂" ) break
                tgt.success = false
                break

            case "いちゃもん":
                if ( !tgt.poke.myCondition.myDynamax ) break
                tgt.success = false
                break

            case "ベノムトラップ":
                if ( tgt.poke.myAilment == "どく" ) break
                tgt.success = false
                break
        }

        if ( !tgt.success ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
    }

    return checkMoveSuccess(poke)
}

// 46.技の仕様による無効化(その2)
function moveSpecificationsInvalidation2(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 重複による無効化
        // あくび: 対象がすでに状態異常/あくび状態になっている
        if ( poke.myMove.name == "あくび" ) {
            if ( !tgt.poke.myAilment ) tgt.success = false
            if ( tgt.poke.myCondition.myYawn ) tgt.success = false
        }
        // あくむ: 対象がすでにあくむ状態になっている　（wikiにはなかった）
        if ( poke.myMove.name == "あくむ" ) {
            if ( tgt.poke.myCondition.myNightmare ) tgt.success = false
        }
        // いちゃもん: 対象がすでにいちゃもん状態である
        if ( poke.myMove.name == "いちゃもん" ) {
            if ( tgt.poke.myCondition.myTorment ) tgt.success = false
        }
        // とぎすます: 自身がすでにとぎすます状態である　（wikiにはなかった）
        if ( poke.myMove.name == "とぎすます" ) {
            if ( tgt.poke.myCondition.myLaser_focus ) tgt.success = false
        }
        // かぎわける、みやぶる、ミラクルアイ: 対象がすでにみやぶられている状態である　（wikiにはなかった）
        if ( (poke.myMove.name == "かぎわける" || poke.myMove.name == "みやぶる" || poke.myMove.name == "ミラクルアイ" ) ) {
            if ( tgt.poke.myCondition.myForesight ) tgt.success = false
        }
        // オーロラベール: あられ状態でない（wikiには載っていない）
        // if ( poke.myMove.name == "オーロラベール" && !isSnowy(poke) ) tgt.success = false
        // ほごしょく: 自身が同じタイプを持っている (wikiにない)
        if ( poke.myMove.name == "ほごしょく" ) {
            if ( fieldStatus.myGrassy && poke.myType.includes("くさ") ) tgt.success = false
            if ( fieldStatus.myElectric && poke.myType.includes("でんき") ) tgt.success = false
            if ( fieldStatus.myMisty && poke.myType.includes("フェアリー")) tgt.success = false
            if ( fieldStatus.myPsychic && poke.myType.includes("エスパー")) tgt.success = false
            if ( !( fieldStatus.myGrassy || fieldStatus.myElectric || fieldStatus.myMisty || fieldStatus.myPsychic ) && poke.myType.includes("ノーマル")) tgt.success = false
        }
        // なやみのタネ: 対象がすでにふみんである
        if ( poke.myMove.name == "なやみのタネ" ) {
            if ( tgt.poke.myAbility == "ふみん" ) tgt.success = false
        }
        // ねをはる: 自身がすでにねをはる状態である
        if ( poke.myMove.name == "ねをはる" ) {
            if ( tgt.poke.myCondition.myIngrain ) tgt.success = false
        }
        // ほろびのうた: 対象がすでにほろびのうた状態である
        if ( poke.myMove.name == "ほろびのうた" ) {
            if ( tgt.poke.myCondition.myPerish_song ) tgt.success = false
        }
        // ミラクルアイ: 対象がすでにミラクルアイ状態である
        if ( poke.myMove.name == "ミラクルアイ" ) {
            if ( tgt.poke.myCondition.myMiracle_eye ) tgt.success = false
        }
        // メロメロ: 対象がすでにメロメロ状態である
        if ( poke.myMove.name == "メロメロ" ) {
            if ( tgt.poke.myCondition.myAttract != false ) tgt.success = false
        }
        // やどりぎのタネ: 対象がすでにやどりぎのタネ状態である
        if ( poke.myMove.name == "やどりぎのタネ" ) {
            if ( tgt.poke.myCondition.myLeech_seed ) tgt.success = false
        }
        // 状態異常にする変化技
        const abnormalMove = statusMoveToMakeAbnormalForOneOfThem.concat(statusMoveToMakeAbnormalForAllOfYou, statusMoveToMakeAbnormalForExceptForme)
        for ( const element of abnormalMove ) {
            if ( poke.myMove.name == element.name ) {
                // 対象がすでにこんらんになっている
                if ( element.ailment == "こんらん" && tgt.poke.myCondition.myConfusion ) tgt.success = false
                // 対象がすでに同じ・別の状態異常になっている
                if ( element.ailment != "こんらん" && tgt.poke.myAilment ) tgt.success = false
            }
        }
        // ランク補正に関する無効化
        // ランク補正を上げる変化技: ランクがすでに最大である
        // ランク補正を下げる変化技: ランクがすでに最低である
        const rankMove = statusMoveToChangeRankForOneOfThem.concat(statusMoveToChangeRankForMe, statusMoveToChangeRankForAllOfUs, statusMoveToChangeRankForAllOfYou)
        for ( const element of rankMove ) {
            if ( poke.myMove.name == element.name ) {
                let check = 0
                for ( const rank of element.rank ) {
                    if ( rank.change > 0 && tgt.poke[`myRank_${rank.parameter}`] == 6 ) check += 1
                    if ( rank.change < 0 && tgt.poke[`myRank_${rank.parameter}`] == -6 ) check += 1
                }
                if ( check == element.rank.length ) tgt.success = false
            }
        }
        if ( poke.myMove.name == "つぼをつく" ) {
            let check = true
            for ( const parameter of ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]) {
                if ( tgt.poke[`myRank_${parameter}`] < 6 ) check = false // どれか最大でなければいい
            }
            if ( check ) tgt.success = false
        }
        // コーチング: シングルバトルである/対象となる味方がいない
        if ( poke.myMove.name == "コーチング" || poke.myMove.name == "アロマミスト" ) {
            if ( myPokeInBattle(poke).length == 1 ) tgt.success = false
        }
        // ソウルビート/はいすいのじん: 全能力が最大まで上がっている
        if ( poke.myMove.name == "はいすいのじん" ) {
            if ( tgt.poke.myRank_atk == 6 && tgt.poke.myRank_def == 6 && tgt.poke.myRank_sp_atk == 6 && tgt.poke.myRank_sp_def == 6 && tgt.poke.myRank_speed == 6) tgt.success = false
        }
        // ほおばる: ぼうぎょランクがすでに最大である
        if ( poke.myMove.name == "ほおばる" ) {
            if ( tgt.poke.myRank_def == 6 ) tgt.success = false
        }
        // その他
        // がむしゃら: 対象のHPが使用者以下
        if ( poke.myMove.name == "がむしゃら" ) {
            if ( poke.myRest_hp >= tgt.poke.myRest_hp ) tgt.success = false
        }
        // シンクロノイズ: タイプが合致していない
        if ( poke.myMove.name == "シンクロノイズ" ) {
            let check = true
            for ( const myType of poke.myType ) {
                for ( const oppType of tgt.poke.myType ) {
                    if ( myType == oppType ) check = false
                }
            }
            if ( check ) tgt.success = false
        }
        // ゆめくい/あくむ: 対象がねむり状態でない
        if ( poke.myMove.name == "ゆめくい" || poke.myMove.name == "あくむ" ) {
            if ( tgt.poke.myAilment != "ねむり" || ( tgt.poke.myAbility == "ぜったいねむり" && isAbility(tgt.poke) ) ) tgt.success = false
        }
        // 一撃必殺技: 対象が使用者よりレベルが高い/対象がダイマックスしている
        if ( oneShot.includes(poke.myMove.name ) && ( poke.myLevel < tgt.poke.myLevel/* || def.data.dynaTxt.includes("3") || def.data.gigaTxt.includes("3")*/)) tgt.success = false
        // リフレッシュ: 状態異常のポケモンがいない（wikiにない）
        if ( poke.myMove.name == "リフレッシュ" ) {
            if ( tgt.poke.myAilment == "どく" || tgt.poke.myAilment == "やけど" || tgt.poke.myAilment == "まひ" ) tgt.success = false
        }

        if ( !tgt.success ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
    }

    return checkMoveSuccess(poke)
}

// 47.タイプによる技の無効化(その2)
function typeInvalidation2(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // くさタイプ: やどりぎのタネの無効化
        if ( tgt.poke.myType.includes("くさ") ) {
            if ( poke.myMove.name == "やどりぎのタネ" ) tgt.success = false
        }
        // ほのおタイプ: やけどの無効化
        if ( tgt.poke.myType.includes("ほのお") ) {
            if ( poke.myMove.name == "おにび" ) tgt.success = false
        }
        // どく/はがねタイプ: どく/もうどくの無効化
        if ( tgt.poke.myType.includes("どく") || tgt.poke.myType.includes("はがね") ) {
            if ( !( poke.myAbility == "ふしょく" && isAbility(poke) ) ) {
                if ( poke.myMove.name == "どくガス" ) tgt.success = false
                if ( poke.myMove.name == "どくどく" ) tgt.success = false
                if ( poke.myMove.name == "どくのこな" ) tgt.success = false
            }
        }
        // でんきタイプ: まひの無効化
        if ( tgt.poke.myType.includes("でんき") ) {
            if ( poke.myMove.name == "しびれごな" ) tgt.success = false
            if ( poke.myMove.name == "でんじは" ) tgt.success = false
            if ( poke.myMove.name == "へびにらみ" ) tgt.success = false
        }

        if ( !tgt.success ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
    }

    return checkMoveSuccess(poke)
}

// 48.さわぐによるねむりの無効化
function uproar(poke) {
    if ( poke.myMove.name == "さわぐ" ) {
        for ( const _poke of allPokeInBattle() ) {
            // 騒ぎ始めた時のみ、目を覚ます
            if ( !poke.myCondition.myUproar && _poke.myAilment == "ねむり" ) {
                writeLog(`${_poke.myTN} の ${_poke.myName} は 騒がしくて 目を覚ました !`)
                _poke.myAilment     = false // 状態異常
                _poke.myRest        = false // ねむる経過ターン数
                _poke.myAsleep      = false // ねむり経過ターン数
                _poke.myAsleep_turn = false // ねむりから覚めるターン数
            }
        }
    }
    // さわぐ状態のポケモンがいる時、ねむり状態とねむけ状態にならない
    if ( !isUproar() ) return // さわぐ状態のポケモンがいなければスルー

    // ねむりの効果を持つ変化技ならtrue
    let check = false
    const abnormalMove = statusMoveToMakeAbnormalForOneOfThem.concat(statusMoveToMakeAbnormalForAllOfYou, statusMoveToMakeAbnormalForExceptForme)
    for ( const element of abnormalMove ) {
        if ( poke.myMove.name == element.name && element.ailment == "ねむり" ) {
            check = true
        }
    }
    
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( check || poke.myMove.name == "ねむる") {
            writeLog(`${isUproar().myTN} の ${isUproar().myName} が 騒いでいて うまく決まらなかった....`)
            return true
        }
    }

    return checkMoveSuccess(poke)
}

// 49.しんぴのまもり状態による無効化
function safeguardInvalidation(poke) {
    let check = true
    const abnormalMove = statusMoveToMakeAbnormalForOneOfThem.concat(statusMoveToMakeAbnormalForAllOfYou, statusMoveToMakeAbnormalForExceptForme)
    for ( const element of abnormalMove ) {
        if ( poke.myMove.name == element.name ) check = false
    }
    // 対象の技であること(あくびは神秘の守りで防げない)
    if ( check || poke.myMove.name == "あくび" ) return

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( isField(tgt.poke).mySafeguard && poke.myAbility != "すりぬけ" && poke.myParty != tgt.poke.myParty ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は しんぴのまもりに 守られている !`)
            tgt.success = false
        }
    }

    return checkMoveSuccess(poke)
}

// 50.エレキフィールド/ミストフィールド状態による状態異常の無効化
function fieldInvalidation(poke) {
    // 状態異常を付与する変化技
    const abnormalMove = statusMoveToMakeAbnormalForOneOfThem.concat(statusMoveToMakeAbnormalForAllOfYou, statusMoveToMakeAbnormalForExceptForme)
    for ( const element of abnormalMove ) {
        if ( poke.myMove.name == element.name ) {
            for ( const tgt of poke.myTarget ) {
                if ( !tgt.success ) continue // すでに失敗していないこと
                
                // エレキフィールドはねむけ状態も防ぐ
                if ( fieldStatus.myElectric && onGround(tgt.poke) && ( element.ailment == "ねむり" || poke.myMove.name == "あくび" ) ) {
                    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は エレキフィールドに守られている !`)
                    tgt.success = false
                }
                // ミストフィールドはねむけ状態を防がない
                if ( fieldStatus.myMisty && onGround(tgt.poke) ) {
                    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ミストフィールドに守られている !`)
                    tgt.success = false
                }
            }
        }
    }

    return checkMoveSuccess(poke)
}

// 51.みがわり状態によるランク補正を下げる技/デコレーションの無効化
function substituteInvalidation1(poke) {
    let check = false
    const rankMove = statusMoveToChangeRankForOneOfThem.concat(statusMoveToChangeRankForAllOfYou)
    for (const element of rankMove) {
        if (poke.myMove.name == element.name ) check = true
    }
    // ランク変化を付与する変化技　または　つぼをつく　であること
    if ( check && poke.myMove.name != "つぼをつく" ) return false

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )    continue // すでに失敗していないこと
        if ( !tgt.substitute ) continue // みがわり状態であること
        if ( poke.myMove.name == "つぼをつく" && poke.myID == tgt.poke.myID ) continue // つぼをつくなら、対象が自分以外であること

        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には うまく決まらなかった....`)
        tgt.success = false
    }

    return checkMoveSuccess(poke)
}

// 52.しろいきりによる無効化
function mistInvalidation(poke) {
    let check = true
    const rankMove = statusMoveToChangeRankForOneOfThem.concat(statusMoveToChangeRankForAllOfYou)
    for (const line of rankMove) {
        if ( poke.myMove.name == line[0] ) check = false
    }
    if ( check ) return // ランク変化を付与する変化技であること

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( fieldStatus.myMist ) continue
        if ( poke.myAbility == "すりぬけ" && isAbility(poke) ) continue
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は しろいきりで能力が下がらない !`)
        tgt.success = false
    }

    return checkMoveSuccess(poke)
}


// 53.特性による無効化(その3)
function abilityInvalidation3(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // フラワーベール　ランクを下げられない　状態異常・ねむけ状態にならない
        if ( invalidationByFlowerVeil3rd(poke, tgt) ) {
            tgt.success = false
            abilityDeclaration(isFlowerVeil(tgt.poke))
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
        // スイートベール　ねむり・ねむけ状態にならない
        if ( invalidationBySweetVeil3rd(poke, tgt) ) {
            tgt.success = false
            abilityDeclaration(isSweetVeil(tgt.poke))
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
        // アロマベール
        if ( invalidationByAlomaVeil3rd(poke, tgt) ) {
            tgt.success = false
            abilityDeclaration(isAlomaVeil(tgt.poke))
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }

        // 上記以外の特性による無効化
        if ( !isAbility(tgt.poke) ) continue

        if ( invalidationForOtherAbility3rd(poke, tgt) ) {
            tgt.success = false
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 54.命中判定による技の無効化
function accuracyFailure(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 必中状態
        if ( poke.myAbility == "ノーガード" && isAbility(poke) ) continue
        if ( tgt.poke.myAbility == "ノーガード" && isAbility(tgt.poke) ) continue
        if ( poke.myCondition.myLock_on ) continue
        if ( tgt.poke.myCondition.myMinimize && minimize.includes(poke.myMove.name) ) continue
        if ( tgt.poke.myCondition.myTelekinesis && !oneShot.includes(poke.myMove.name) ) continue
        // 必中技
        if ( poke.myMove.accuracy == "-" ) continue
        if ( poke.myMove.name == "かみなり" && isRainy(tgt.poke) ) continue
        if ( poke.myMove.name == "ぼうふう" && isRainy(tgt.poke) ) continue
        if ( poke.myMove.name == "ふぶき" && isSnowy(tgt.poke) ) continue
        if ( poke.myMove.name == "どくどく" && poke.myType.includes("どく") ) continue
        // 命中率の変化
        if ( poke.myMove.name == "かみなり" && isSunny(poke) ) poke.myMove.accuracy = 50
        if ( poke.myMove.name == "ぼうふう" && isSunny(poke) ) poke.myMove.accuracy = 50
        if ( tgt.poke.myAbility == "ミラクルスキン" && isAbility(tgt.poke) && poke.myMove.nature == "変化" ) poke.myMove.accuracy = Math.min(50, poke.myMove.accuracy)
        if ( oneShot.includes(poke.myMove.name) ) poke.myMove.accuracy = 30 + poke.myLevel - tgt.poke.myLevel
        if ( poke.myMove.name == "ぜったいれいど" && !poke.myType.includes("こおり") ) poke.myMove.accuracy = 20 + poke.myLevel - tgt.poke.myLevel
    
        // 命中補正の初期値
        let correction = 4096
        // 場の状態
        if( fieldStatus.myGravity ) correction = Math.round(correction * 6840 / 4096)
        // 相手の特性
        if ( tgt.poke.myAbility == "ちどりあし" && isAbility(tgt.poke) && tgt.poke.myCondition.myConfusion ) correction = Math.round(correction * 2048 / 4096)
        if ( tgt.poke.myAbility == "すながくれ" && isAbility(tgt.poke) && isSandy(tgt.poke) ) correction = Math.round(correction * 3277 / 4096)
        if ( tgt.poke.myAbility == "ゆきがくれ" && isAbility(tgt.poke) && isSnowy(tgt.poke) ) correction = Math.round(correction * 3277 / 4096)   
        // 自分の特性
        if ( poke.myAbility == "はりきり" && isAbility(poke) && poke.myMove.nature == "物理" ) correction = Math.round(correction * 3277 / 4096)
        if ( poke.myAbility == "ふくがん" && isAbility(poke) ) correction = Math.round(correction * 5325 / 4096)
        if ( poke.myAbility == "しょうりのほし" && isAbility(poke) ) correction = Math.round(correction * 4506 / 4096)
        // 相手のもちもの
        if ( tgt.poke.myItem == "ひかりのこな" && isItem(tgt.poke) ) correction = Math.round(correction * 3686 / 4096)
        if ( tgt.poke.myItem == "のんきのおこう" && isItem(tgt.poke) ) correction = Math.round(correction * 3686 / 4096)
        // 自分のもちもの
        if ( poke.myItem == "こうかくレンズ" && isItem(poke) ) correction = Math.round(correction * 4505 / 4096)
        if ( poke.myItem == "フォーカスレンズ" && isItem(poke) && tgt.poke.myCmd_move == "" ) correction = Math.round(correction * 4915 / 4096)
        // 一撃必殺技に対して補正は乗らない
        if ( oneShot.includes(poke.myMove.name) ) correction = 4096
    
        // 技の命中率 * 命中補正
        let check = fiveCut(poke.myMove.accuracy * correction / 4096)
    
        // ランク補正
        let rank = poke.myRank_accuracy - tgt.poke.myRank_evasion
        // 相手の回避率を無視する
        if ( poke.myAbility == "てんねん" && isAbility(poke) ) rank += tgt.poke.myRank_evasion
        if ( poke.myAbility == "するどいめ" && isAbility(poke) ) rank += tgt.poke.myRank_evasion
        if ( tgt.poke.myCondition.myForesight ) rank += tgt.poke.myRank_evasion
        if ( tgt.poke.myCondition.myMiracle_eye ) rank += tgt.poke.myRank_evasion
        if ( poke.myMove.name == "せいなるつるぎ" ) rank += tgt.poke.myRank_evasion
        if ( poke.myMove.name == "DDラリアット" ) rank += tgt.poke.myRank_evasion
        if ( poke.myMove.name == "なしくずし" ) rank += tgt.poke.myRank_evasion
        // 自分の命中率を無視する
        if ( poke.myAbility == "てんねん" && isAbility(poke) ) rank -= poke.myRank_accuracy

        rank = Math.min(rank, 6)
        rank = Math.max(rank, -6)
    
        if (rank > 0) check = Math.floor(check * (3 + rank) / 3)
        if (rank < 0) check = Math.floor(check * 3) / (3 - rank)
    
        // ミクルのみ
        if ( poke.myCondition.myMicle ) {
            check = fiveCut(check * 4915 / 4096)
            poke.myCondition.myMicle = false
        }
    
        check = Math.min(check, 100)
        const random = getRandom() * 100
        if ( random >= check ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 当たらなかった....`)
            tgt.success = false
            if ( poke.myItem == "からぶりほけん" && isItem(poke) && !oneShot.includes(poke.myMove.name) && poke.myRank_speed != 6) {
                writeLog(`からぶりほけん が 発動した !`)
                changeMyRank(poke, "speed", 2)
                enableToRecycle(poke)
            }
        }
    }

    return checkMoveSuccess(poke)
}

// 55.シャドースチールで対象のランク補正を吸収する
function spectralThief(poke) {
    if ( poke.myMove.name != "シャドースチール") return false
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        let check = false
        for ( const parameter of ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]) {
            if ( tgt.poke[`myRank_${parameter}`] > 0) {
                changeMyRank(poke, parameter, tgt.poke[`myRank_${parameter}`])
                tgt.poke[`myRank_${parameter}`] = 0
                check = true
            }
        }

        if ( check ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} から 上がった能力を 奪い取った !`)
    }
}

// 56.対応するタイプの攻撃技の場合ジュエルが消費される
function useJuwel(poke) {
    if ( poke.myMove.name == "くさのちかい" ) return false
    if ( poke.myMove.name == "ほのおのちかい" ) return false
    if ( poke.myMove.name == "みずのちかい" ) return false
    if ( oneShot.includes(poke.myMove.name) ) return false
    if ( poke.myMove.nature == "変化" ) return false

    if ( poke.myItem.includes("ジュエル") && isItem(poke) && poke.myItem.includes(poke.myMove.type) ) {
        writeLog(`${poke.myItem} が 技の威力を高めた !`)
        enableToRecycle(poke)
        poke.myCondition.myGem = true
    }
}

// 57. かわらわり/サイコファング/ネコにこばんの効果が発動する
function wallBreak(poke) {
    if ( poke.myMove.name == "かわらわり" || poke.myMove.name == "サイコファング" ) {

        for ( const tgt of poke.myTarget ) {
            if ( !tgt.success ) continue // すでに失敗していないこと
            const field = isField(tgt.poke)
            if ( field.myAurora_veil ) {
                field.myAurora_veil = false
                field.myAurora_clay = false
                writeLog(`${target.myTN} の オーロラベールを 破壊した !`)
            }
            if ( field.myLight_screen ) {
                field.myLight_screen = false
                field.myLight_clay = false
                writeLog(`${target.myTN} の ひかりのかべを 破壊した !`)
            }
            if ( field.myReflect ) {
                field.myReflect = false
                field.myReflect_clay = false
                writeLog(`${target.myTN} の リフレクターを 破壊した !`)
            }
        }
    }
}

// 58. ポルターガイストで対象のもちものが表示される
function poltergeist(poke) {
    if ( poke.myMove.name == "ポルターガイスト" ) {

        for ( const tgt of poke.myTarget ) {
            if ( !tgt.success ) continue // すでに失敗していないこと
            writeLog(`${tgt.poke.myName} に ${tgt.poke.myItem} が 襲いかかる !`)
        }
    }
}

// 59.みがわりによるランク補正を変動させる効果以外の無効化
function substituteInvalidation2(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // みがわり状態であり、変化技であり、音技でなく、身代わり貫通技でない
        if ( !tgt.substitute ) continue // みがわり状態であること
        if ( poke.myMove.nature != "変化" ) continue // 変化技であること
            
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
        tgt.success = false
    }

    return checkMoveSuccess(poke)
}

// 60.ミラーアーマー: ランクを下げる変化技の反射
function millorArmer(poke) {
    /*
    const list = moveEff.rankChange()
    for (let i = 0; i < list.length; i++) {
        if (def.con.ability == "ミラーアーマー" && move.name == list[i][0] && move.name != "デコレーション" && list[i][1] == "e") {
            writeLog(me, you, def.con.TN + "　の　" + def.poke.myName + "は　ミラーアーマーで　跳ね返した!" + "\n")
            for (let j = 2; j < list[i].length; j++) {
                let parameter = list[i][j][0]
                let change = list[i][j][1]
                changeRank(me, you, con, parameter, change, 100, move, true)
            }
            return true
        }
    }
    */
}

// 61.ほえる・ふきとばしの無効化
function roarWhirlwind(poke) {
    if ( poke.myMove.name == "ほえる" || poke.myMove.name == "ふきとばし" ) {

        for ( const tgt of poke.myTarget ) {
            if ( !tgt.success ) continue // すでに失敗していないこと

            // 1.ダイマックスによる無効化
            if ( tgt.poke.myCondition.myDynamax ) {
                writeLog(`しかし ダイマックスパワーに 弾かれた !`)
                tgt.success = false
            }
            // 2.きゅうばんによる無効化
            if ( tgt.poke.myAbility == "きゅうばん" && isAbility(tgt.poke) ) {
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 特性『きゅうばん』 !`)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には うまく決まらなかった....`)
                tgt.success = false
            }
            // 3.ねをはるによる無効化
            if ( tgt.poke.myCondition.myIngrain ) {
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 根を張って 動かない !`)
                tgt.success = false
            }
        }
    }

    return checkMoveSuccess(poke)
}

// 62.技の仕様による無効化(その3)
function moveSpecificationsInvalidation3(poke) {
    // 対象が場でない技
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 特性に関する無効化
        if ( invalidationForAbility3rd(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
        // HPが満タンによる無効化
        if ( invalidationForFullHP3rd(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は HPが満タンだった`)
            continue
        }
        // ステータスに関する無効化
        if ( invalidationForStatus3rd(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には うまく決まらなかった....`)
            continue
        }
        // タイプによる無効化
        if ( invalidationForType3rd(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には うまく決まらなかった....`)
            continue
        }
        // 特殊なメッセージが出る技の失敗
        if ( invalidationForUniqueMessage3rd(poke, tgt) ) {
            tgt.success = false
            if ( checkMoveSuccess(poke) ) writeLog(`しかし うまく決まらなかった....`)
        }
        // 重複による無効化
        if ( invalidationForDuplicate3rd(poke, tgt) ) {
            tgt.success = false
            writeLog(`しかし うまく決まらなかった....`)
            continue
        }
        // その他の無効化
        if ( invalidationForOthers3rd(poke, tgt) ) {
            tgt.success = false
            writeLog(`しかし うまく決まらなかった....`)
            continue
        }
    }


    // 対象が場である技
    if ( invalidationOfMoveForField3rd(poke) ) {
        poke.myMove.success = false
        writeLog(`しかし うまく決まらなかった....`)
        return true
    }

    return checkMoveSuccess(poke) 
}

// 63.アロマベール: かなしばり/アンコール/ちょうはつ状態の無効化
function alomaVeilInvalidation(poke) {
    if ( poke.myMove.name == "かなしばり" || poke.myMove.name == "アンコール" || poke.myMove.name == "ちょうはつ" ) {

        for ( const tgt of poke.myTarget ) {
            if ( !tgt.success ) continue // すでに失敗していないこと
            if ( !isAlomaVeil(tgt.poke) ) continue // アロマベール状態であること
            tgt.success = false
            writeLog(`${isAlomaVeil(tgt.poke).myTN} の ${tgt.poke.myName} の 特性『アロマベール』 !`)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には うまく決まらなかった....`)
        }
    }

    return checkMoveSuccess(poke)
}