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
    if ( moveSpecificationsFailure(poke) ) {
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
    if ( poke.myCondition.mySky_drop && !poke.myCondition.myCant_move ) {
        writeLog(`${poke.myTN} の ${poke.myName} は 空中で身動きが取れない !`)
        return true
    }
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
            if ( meltFrozen.includes(poke.myMove.name) ) return false
            writeLog(`${poke.myTN} の ${poke.myName} は 凍って動けない !`)
            return true
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
    if ( poke.myCondition.myConfusion > 0 ) {

        const random = getRandom()

        if ( poke.myCondition.myConfusion == 1 ) { // 1ターン目
            poke.myCondition.myConfusion = 2
        } else if ( poke.myCondition.myConfusion == 2 ) { // 2ターン目
            if ( random < 1 / 3 ) poke.myCondition.myConfusion = false
            else poke.myCondition.myConfusion = 3
        } else if ( poke.myCondition.myConfusion == 3 ) { // 3ターン目
            if ( random < 1 / 2 ) poke.myCondition.myConfusion = false
            else poke.myCondition.myConfusion = 4
        } else if ( poke.myCondition.myConfusion == 4 ) { // 4ターン目
            poke.myCondition.myConfusion = false
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
                writeLog(`${poke.myName} は メロメロで 技が出せなかった !`)
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
    // 選択した技を履歴に残す
    poke.history.unshift(poke.myMove)

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
            poke,myCondition.mySkin = "エレキスキン"
        }
        if ( poke.myAbility == "スカイスキン" && poke.myMove.type == "ノーマル" ) {
            poke.myMove.type = "ひこう"
            poke,myCondition.mySkin = "スカイスキン"
        }
        if ( poke.myAbility == "エレキスキン" && poke.myMove.type != "ノーマル" ) {
            poke.myMove.type = "ノーマル"
            poke,myCondition.mySkin = "ノーマルスキン"
        }
        if ( poke.myAbility == "フェアリースキン" && poke.myMove.type == "ノーマル" ) {
            poke.myMove.type = "フェアリー"
            poke,myCondition.mySkin = "フェアリースキン"
        }
        if ( poke.myAbility == "フリーズスキン" && poke.myMove.type == "ノーマル" ) {
            poke.myMove.type = "こおり"
            poke,myCondition.mySkin = "フリーズスキン"
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
        if ( fieldStatus.myElectric > 0 ) poke.myMove.type = "でんき"
        if ( fieldStatus.myGrassy > 0 )   poke.myMove.type = "くさ"
        if ( fieldStatus.myMisty > 0 )    poke.myMove.type = "フェアリー"
        if ( fieldStatus.myPsychic > 0 )  poke.myMove.type = "エスパー"
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
function moveSpecificationsFailure(poke) {
    // アイアンローラー: フィールドが無い
    if ( poke.myMove.name == "アイアンローラー" ) {
        if ( myField.myElectric ) return false
        else if ( myField.myGrassy ) return false
        else if ( myField.myMisty ) return false
        else if ( myField.myPsychic ) return false

        else return true
    }
    // いじげんラッシュ/ダークホール/オーラぐるま: 使用者のポケモンの姿が適格でない
    if ( poke.myMove.name == "いじげんラッシュ" ) {
        if ( poke.myName == "フーパ(ときはなたれしフーパ)" ) return false
        else return true
    }
    if ( poke.myMove.name == "ダークホール" ) {
        if ( poke.myName == "ダークライ" ) return false
        else return true
    }
    if ( poke.myMove.name == "オーラぐるま" ) {
        if ( poke.myName == "モルペコ" ) return false
        else return true
    }
    // がまん: 解き放つダメージが無い
    /*
    if ( poke.myMove.name == "がまん" && poke.myMove.power == 0 ) {
        removeText(con.p_con, "状態変化『がまん』")
        tgt.success = false
    }
    */
    // カウンター/ミラーコート/メタルバースト: 適格なダメージをそのターンは受けていない、味方からのダメージ
    /*
    if ( poke.myMove.name == "カウンター" ) {
        // 味方へは失敗する
        if ( poke.myDamage_nature == "物理" && oppJudgeByID(poke.myID, poke.myDamage_ID) ) {
            tgt.success = isPokeByID(poke.myDamage_ID)
        } else {
            tgt.success = false
        }
    }
    if ( poke.myMove.name == "ミラーコート" ) {
        // 味方へは失敗する
        if ( poke.myDamage_nature == "特殊" && oppJudgeByID(poke.myID, poke.myDamage_ID) ) {
            tgt.success = isPokeByID(poke.myDamage_ID)
        } else {
            tgt.success = false
        }
    }
    if ( poke.myMove.name == "メタルバースト" ) {
        // 味方へは失敗する
        if ( poke.myDamage_nature && oppJudgeByID(poke.myID, poke.myDamage_ID) ) {
            tgt.success = isPokeByID(poke.myDamage_ID)
        } else {
            tgt.success = false
        }
    }
    */
    // くちばしキャノン：加熱していない（アンコールで強制された場合など）(wikiにない)
    if ( poke.myMove.name == "くちばしキャノン" ) {
        if ( !poke.myCondition.myBeak_blast ) return true
        else return false
    }
    // ソウルビート: 使用者のHPが足りない
    if ( poke.myMove.name == "ソウルビート" ) {
        if ( poke.myRest_hp < Math.floor(poke.myFull_HP / 3) ) return true
        else return false
    }
    // たくわえる: たくわえるカウントがすでに3である
    if ( poke.myMove.name == "たくわえる" ) {
        if ( poke.myCondition.myStockpile == 3 ) return true
        else return false
    }
    // はきだす/のみこむ: たくわえるカウントが0である
    if ( poke.myMove.name == "はきだす" || poke.myMove.name == "のみこむ" ) {
        if ( poke.myCondition.myStockpile == 0 ) return true
        else return false
    }
    // とっておき: 覚えているわざにとっておきがない/とっておき以外の技を覚えていない/使用されてない技がある
    if ( poke.myMove.name == "とっておき") {
        /*
        let check = 0
        let otherMove = []
        for (let i = 0; i < 4; i++) {
            if (con["move_" + i] == "とっておき") check += 1
            else if (con["move_" + i] != "") otherMove.push(con["move_" + i])
        }
        if (check == 0) tgt.success = false
        if (otherMove.length == 0) tgt.success = false

        for (const _move of con.history) {
            if (_move.result == "不発") continue
            if (otherMove.includes(_move.name)) {
                otherMove = otherMove.filter(i => i != _move.name)
            }
            if (otherMove.length > 0) tgt.success = false
        }
        */
    }
    // ほおばる: きのみを持っていない
    if ( poke.myMove.name == "ほおばる" ) {
        if ( !berryList.includes(poke.myItem) ) return true
        else return false
    }
    // なげつける/しぜんのめぐみ: 持ち物が無い/特性ぶきよう/さしおさえ/マジックルーム状態である/不適格な持ち物である
    if ( poke.myMove.name == "なげつける" || poke.myMove.name == "しぜんのめぐみ" ) {
        if ( poke.myItem == "" ) return true
        else if ( !isItem(poke) ) return true
        else if ( poke.myMove.name == "なげつける" && poke.myItem.includes("ジュエル") ) return true
        else return false
    }
    // ねこだまし/であいがしら/たたみがえし: すでに行動をした
    if ( poke.myMove.name == "たたみがえし" || poke.myMove.name == "であいがしら" || poke.myMove.name == "ねこだまし" ) {
        /*
        if (con.history.length == 0) return false
        if (con.history.length == 1 && activateOtherMove.includes(con.history[0].name) && con.history[0].result == "成功") return false
        writeLog(`しかし うまく決まらなかった....`)
        return true
        */
    }
    // はいすいのじん: すでにはいすいのじんによりにげられない状態になっている
    if ( poke.myMove.name == "はいすいのじん" ) {
        if ( poke.myCondition.myNo_retreat ) return true
        else return false
    }
    // まもる/こらえる系: ターンの最後の行動/連続使用による失敗判定
    if ( protectMove.includes( poke.myMove.name)) {
        /*
        // ターンの最後の行動による失敗
        let check = false
        for (const _con of [me.con0, me.con1, you.con0, you.con1]) {
            if (!(_con.child == con.child && _con.parent == con.parent) && _con.cmd != "") check = true
        }
        if (check == false) {
            removeText(con.p_con, "まもる系連続成功回数")
            tgt.success = false
        }

        // 連続使用による失敗判定
        let turn = 0
        if (con.p_con.includes("まもる系連続成功回数")) {
            const text = searchText(con.p_con, "まもる系連続成功回数")
            turn = Number(text.split("：")[1])
        }
        turn = Math.min(turn, 6)

        if (getRandom() < 1 / Math.pow(3, turn)) {
            const text = searchText(con.p_con, "まもる系連続成功回数")
            rewriteText(con.p_con, text, text.replace(/[0-9]/g, turn + 1))
        } else {
            removeText(con.p_con, "まもる系連続成功回数")
            tgt.success = false
        }
    } else {
        // 連続で使用しなかった場合は、次に使用するときの成功率が元に戻り、必ず成功する。
        removeText(con.p_con, "まもる系連続成功回数")
        */
    }

    // みちづれ: 前回まで最後に成功した行動がみちづれである
    if ( poke.myMove.name == "みちづれ") {
        /*
        if ( poke.myHistory.length > 0 && poke.myHistory[0].name == "みちづれ" && con.history[0].result == "成功") {
            tgt.success = false
        }
        */
    }
    // みらいよち/はめつのねがい: 対象の場がすでにみらいにこうげき状態になっている
    if ( poke.myMove.name == "みらいよち" || poke.myMove.name == "はめつのねがい" ) {
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
    }
    // もえつきる: 使用者がほのおタイプではない
    if ( poke.myMove.name == "もえつきる" ) {
        if ( !poke.myType.includes("ほのお") ) return true
        else return false
    }
    // いびき/ねごと: 使用者がねむり状態でない
    if ( poke.myMove.name == "いびき" || poke.myMove.name == "ねごと" ) {
        if ( poke.myAilment == "ねむり" ) return false
        else if ( poke.myAbility == "ぜったいねむり" && isAbility(poke) ) return false
        else return true
    }
    // ねむる
    if ( poke.myMove.name == "ねむる" ) {
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
        if ( poke.myAbility == "リーフガード" && isSunny(poke) ) return true

        return false
    }
}

// 14.自分のこおりを回復するわざにより自身のこおり状態が治る
function selfMeltCheck(poke) {
    if ( poke.myAilment == "こおり" && meltFrozen.includes(poke.myMove.name) ) {
        writeLog(`${poke.myMove.name} でこおりがとけた !`)
        poke.myAilment = false 
    }
}

// 15.おおあめ/おおひでりによる技の失敗
function greatWeatherFailure(poke) {
    if ( !isWeather() ) return
    if ( fieldStatus.myHeavy_rain && poke.myMove.type == "ほのお" ) {
        writeLog(`しかし ${poke.myMove.name} は 消えてしまった !`)
        // tgt.success = false
        return true
    }
    if ( fieldStatus.myDrought && poke.myMove.type == "みず" ) {
        writeLog(`しかし ${poke.myMove.name} は 蒸発してしまった !`)
        // tgt.success = false
        return true
    }
}

// 16.ふんじんによるほのお技の失敗とダメージ
function powderFailure(poke) {
    if ( poke.myCondition.myPowder && poke.myMove.type == "ほのお" ) {
        writeLog(`しかし ふんじんで 技が失敗した !`)
        const damage = Math.round(poke.myFull_hp / 4 * isDynamax(poke))
        changeHP(poke, damage, "-")
        //tgt.success = false
        return true
    }
}

// 17.トラップシェルが物理技を受けていないことによる失敗
function shellTrap(poke) {
    if ( poke.myMove.name == "トラップシェル" ) {
        if ( poke.myCondition.myShell_trap == "set" ) {
            poke.myCondition.myShell_trap = false
            writeLog(`しかし トラップシェルは 不発に終わった !`)
            //tgt.success = false
            return true
        }
        if ( poke.myCondition.myShell_trap == true ) {
            poke.myCondition.myShell_trap = false
            return false
        }
        writeLog(`しかし うまく決まらなかった....`)
        // tgt.success = false
        return true
    }
}

// 18.けたぐり/くさむすび/ヘビーボンバー/ヒートスタンプをダイマックスポケモンに使用したことによる失敗
function dynaWeightFailure(poke) {
    /*
    const tgt = con.tgt[0]
    const user = isMe(me, you, tgt)
    if ( !referToWeight.includes(poke.myMove.name) ) return
    if (isDyna(user[0], tgt)) {
        writeLog(me, you, con.TN + "　の　" + poke.myName + "　は　首を横に振った" + "\n")
        tgt.success = false
        return true
    }
    */
}

// 19.特性による失敗
function abilityFailure(poke) {
    // しめりけ: 爆発技
    if ( moisture.includes(poke.myMove.name) ) {
        for (const _poke of allPokeInBattle()) {
            if ( _poke.myAbility == "しめりけ" && isAbility(_poke) ) {
                writeLog(`${_poke.myTN} の ${_poke.myName} の 特性『しめりけ』 !`)
                writeLog(`${poke.myMove.name} は うまく決まらなかった....`)
                // tgt.success = false
                return true
            }
        }
    }
    // じょおうのいげん/ビビッドボディ: 優先度が高い技
    /*
    const list = [you.con0.ability, you.con1.ability]
    if ((list.includes("じょおうのいげん") || list.includes("ビビッドボディ")) && move.priority > 0 && move.target == "相手") {
        writeLog(`しかし うまく決まらなかった....`)
        tgt.success = false
        return true
    }
    */
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
        writeLog(`${poke.myName} の 特性『${poke.myAbility}』 !`)
        writeLog(`${poke.myName} は ${poke.myMove.type} タイプに変わった !`)
    }
}

// 22.溜め技の溜めターンでの動作
function accumulateOperation(poke) {
    if ( !accumulationMove.includes(poke.myMove.name) ) return
    
    //行動ターン
    if ( poke.myCondition.myFilling ) { 
        if ( poke.myMove.name == "フリーフォール" ) {
            /*
            removeText(con.p_con, "溜め技")
            removeText(con.p_con, "姿を隠す")
            removeText(def.con, "姿を隠す")
            if (yourcon.type.includes("ひこう")) {
                writeLog(`しかし うまく決まらなかった....`)
                return true
            }
            */
        } else {
            poke.myCondition.myFilling = false
            poke.myCondition.myHide = false
        }
        return false
    }

    /*
    if ( poke.myMove.name == "フリーフォール" ) {
        // 1.対象が姿を隠していることによる失敗
        // 2.対象がみがわり状態であることによる失敗
        // 3.対象のおもさが200.0kg以上あることによる失敗
        if (yourcon.p_con.includes("姿を隠す") || yourcon.p_con.includes("状態変化『みがわり』") || isWeight(me, con) >= 200) {
            writeLog(`しかし うまく決まらなかった....`)
            return true
        } else { // 4.相手を空中に連れ去る
            writeLog(me, you, yourcon.TN + "　の　" + yourpoke.myName + "を　空へ連れ去った!" + "\n")
            con.p_con += "溜め技：フリーフォール" + "\n"
            con.p_con += "姿を隠す：フリーフォール（攻撃）" + "\n"
            yourcon.p_con += "姿を隠す：フリーフォール（防御）" + "\n"
            // 対象の注目の的状態を解除
            removeText(tgt.p_con, "状態変化『ちゅうもくのまと』")
            return true
        }
    }
    */
    
    // 溜めるターン
    // ため技を記録
    poke.myCondition.myFilling = poke.myMove.name

    // それぞれの効果
    if ( poke.myMove.name == "あなをほる" ) {
        poke.myCondition.myDig = true
        writeLog(`${poke.myName} は 地中に潜った !`)
    }
    if ( poke.myMove.name == "ゴーストダイブ" || poke.myMove.name == "シャドーダイブ" ) {
        poke.myCondition.myShadow = true
        writeLog(`${poke.myName} は 闇に潜んだ !`)
    }
    if ( poke.myMove.name == "そらをとぶ" || poke.myMove.name == "とびはねる") {
        poke.myCondition.mySky = true
        writeLog(`${poke.myName} は 空へ飛び立った !`)
    }
    if ( poke.myMove.name == "ダイビング") {
        poke.myCondition.myDive = true
        // ダイビング: うのミサイルでフォルムチェンジする
        if ( poke.myAbility == "うのミサイル" && isAbility(poke) && !poke.myCondition.myGulp_missile ) {
            writeLog(`${poke.myName} の 特性『うのミサイル』 !`)
            ( poke.myRest_hp > poke.myFull_hp / 2 )? poke.myCondition.myGulp_missile = "うのみのすがた" : poke.myCondition.myGulp_missile = "まるのみのすがた"
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myCondition.myGulp_missile} に 姿を変えた !`)
        }
        writeLog(`${poke.myName} は 海に潜った !`)
    }

    // 姿を隠さないため技
    if ( !(poke.myCondition.myDig || poke.myCondition.myShadow || poke.myCondition.mySky || poke.myCondition.myDive )) {
        writeLog(`${poke.myTN} の ${poke.myName} は 力を溜めている !`)
        if ( poke.myMove.name == "ロケットずつき" ) changeMyRank(poke, "def", 1)
        if ( poke.myMove.name == "メテオビーム" ) changeMyRank(poke, "sp_atk", 1)
    }
    
    // パワフルハーブを持つ場合は使用する。それ以外の場合は次のターンまで行動を中断する(失敗したとは見なされない)
    if ( (poke.myMove.name == "ソーラービーム" || poke.myMove.name == "ソーラーブレード" ) && isSunny(poke) ) {
        poke.myCondition.myFilling = false
        return false
    }
    if ( poke.myItem == "パワフルハーブ" && isItem(poke) ) {
        writeLog(`${poke.myName} は パワフルハーブで 力がみなぎった !`)
        poke.myCondition.myFilling = false
        poke.myCondition.myDig     = false
        poke.myCondition.myShadow  = false
        poke.myCondition.mySky     = false
        poke.myCondition.myDive    = false
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
    if ( poke.myMove.name == "じばく" ) poke.myCondition.myExplosion = true
    if ( poke.myMove.name == "だいばくはつ" ) poke.myCondition.myExplosion = true
    if ( poke.myMove.name == "ミストバースト" ) poke.myCondition.myExplosion = true
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
            poke: tgt,        // ポケモン
            success: true,    // 技の成否
            damage: 0,        // タイプ相性
            effective: 1,     // タイプ相性
            critical: false,  // 急所
            substitute: false // みがわりの有無
        })
    }
}

// 26.だいばくはつ/じばく/ミストバーストの使用者は対象が不在でもHPを全て失う。使用者がひんしになっても攻撃は失敗しない
function selfDestruction(poke) {
    if ( !poke.myCondition.myExplosion ) return
    /*
    for (let i = 0; i < target.length; i++) {
        if (tgt.result == "失敗") continue
        tgt.damage = damageCalculation(me, you, con, tgt, move)
    }
    removeText(con.p_con, "HP消費の確約")
    con.last_HP = 0
    me["poke" + con.num].last_HP = 0
    toHand(me, you, con)
    */
}

// 27.ビックリヘッド/てっていこうせんの使用者はHPを50%失う。対象が不在なら失わない。使用者がひんしになっても攻撃が失敗しない
function mindblownStealbeam(poke) {
    /*
    if (!( poke.myMove.name == "ビックリヘッド" || move.name == "てっていこうせん")) return
    for (let i = 0; i < con.tgt.length; i++) {
        if (con.tgt[i] == false) continue
        con.tgt[i].damage = damageCalculation(me, you, con, tgt)
    }
    if (!allFalse(con.tgt)) changeHP(me, you, con, Math.ceil(con.full_HP / 2), "-")
    */
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

/*

// うらみ: 対象が技を使っていない（wikiには載っていない）
if ( poke.myMove.name == "うらみ" ) {
    if ( tgt.poke.myHistory.length == 0 ) tgt.success = false
}

// ギフトパス: 自分が持ち物を持っていない、対象が持ち物を持っている（wikiには載っていない）
if ( poke.myMove.name == "ギフトパス" ) {
    if ( poke.myItem == "" ) tgt.success = false
    if ( tgt.poke.myItem != "" ) tgt.success = false
    if ( cannotChangeItem(poke) ) tgt.success = false
}

// ふいうち: 対象がすでに行動済み/変化技を選択している
if ( poke.myMove.name == "ふいうち") {
    const user = isMe(me, you, con.tgt[0])
    if (con.tgt[0].com == "") tgt.success = false
    if (selectedMove(user[0], con.tgt[0]).nature == "変化") tgt.success = false
}

// ポルターガイスト: 対象が持ち物を持っていない
if ( poke.myMove.name == "ポルターガイスト" && tgt.poke.nyItem == "" ) tgt.success = false

*/

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

        // 以下の状況では当たらない
        if ( tgt.poke.myCondition.myDig ) {
            if ( poke.myMove.name == "じしん" ) continue
            if ( poke.myMove.name == "マグニチュード" ) continue
            tgt.success = false
        }
        if ( tgt.poke.myCondition.mySky ) {
            if ( poke.myMove.name == "うちおとす" ) continue
            if ( poke.myMove.name == "かぜおこし" ) continue
            if ( poke.myMove.name == "かみなり" ) continue
            if ( poke.myMove.name == "サウザンアロー" ) continue
            if ( poke.myMove.name == "スカイアッパー" ) continue
            if ( poke.myMove.name == "たつまき" ) continue
            if ( poke.myMove.name == "ぼうふう" ) continue
            tgt.success = false
        }
        if ( tgt.poke.myCondition.myDive ) {
            if ( poke.myMove.name == "なみのり" ) continue
            if ( poke.myMove.name == "うずしお" ) continue
            tgt.success = false
        }
        if ( tgt.poke.myCondition.myShadow ) {
            tgt.success = false
        }

        if ( !tgt.success ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 当たらなかった !`)
        }
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
    if ( !fieldStatus.myPsychic )               return // サイコフィールド状態であること
    if ( poke.myMove.priority <= 0 )             return // 技の優先度が1以上であること

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )     continue // すでに失敗していないこと
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
            if ( poke.myMove.protect == "不能") continue
            if ( poke.myAbility == "ふかしのこぶし" && isAbility(poke) && poke.myMove.direct == "直接" ) continue
        }
       
        if ( tgt.poke.myCondition.myProtect || tgt.poke.myCondition.myMax_guard ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 攻撃を守った !`)
            tgt.success = false

            // 直接攻撃　かつ　ぼうごパットを持っていない　なら追加効果を受ける
            if ( poke.myMove.direct == "間接" || ( poke.myItem == "ぼうごパット" && isItem(poke) ) ) continue

            if ( tgt.poke.myCondition.myProtect == "ニードルガード" ) {
                // changeHP(poke, Math.max(Math.floor(poke.myFull_hp / 8), 1), "-")
            }
            if ( tgt.poke.myCondition.myProtect == "トーチカ" ) {
                // getAbnormalWithMsg(poke, "どく", tgt)
            }
            if ( tgt.poke.myCondition.myProtect == "キングシールド" ) {
                // changeRankWithMsg(me, you, con, "A", -1, true)
            }
            if ( tgt.poke.myCondition.myProtect == "ブロッキング" ) {
                // changeRankWithMsg(me, you, con, "B", -2, true)
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

        // かちき　まけんき　の発動条件
        ( poke.myParty == tgt.poke.myParty )? spirit = false : spirit = true

        // そうしょく: くさタイプ
        if ( tgt.poke.myAbility == "そうしょく" && poke.myMove.type == "くさ" ) {
            abilityDeclaration(tgt.poke)
            changeRank(tgt.poke, "atk", 1, spirit)
            tgt.success = false
        }
        // もらいび: ほのおタイプ
        if ( tgt.poke.myAbility == "もらいび" && poke.myMove.type == "ほのお" ) {
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ほのおの威力が上がった !`)
            tgt.poke.myCondition.myFlash_fire = true
            tgt.success = false
        }
        // かんそうはだ/よびみず/ちょすい: みずタイプ
        if ( poke.myMove.type == "みず" ) {
            if ( tgt.poke.myAbility == "かんそうはだ" || tgt.poke.myAbility == "ちょすい" ) {
                abilityDeclaration(tgt.poke)
                const damage = Math.floor(tgt.poke.myFull_hp / 4 * isDynamax(tgt.poke))
                changeHP(tgt.poke, damage, "+")
                tgt.success = false
            }
            if ( tgt.poke.ability == "よびみず") {
                abilityDeclaration(tgt.poke)
                changeRank(tgt.poke, "sp_atk", 1, spirit)
                tgt.success = false
            }
        }
        // ひらいしん/でんきエンジン/ちくでん: でんきタイプ
        if ( poke.myMove.type == "でんき" && poke.myMove.name != "じばそうさ" ) {
            if ( tgt.poke.myAbility == "ひらいしん" ) {
                abilityDeclaration(tgt.poke)
                changeRank(tgt.poke, "sp_atk", 1, spirit)
                tgt.success = false
            }
            if ( tgt.poke.myAbility == "でんきエンジン" ) {
                abilityDeclaration(tgt.poke)
                changeRank(tgt.poke, "speed", 1, spirit)
                tgt.success = false
            }
            if ( tgt.poke.myAbility == "ちくでん" ) {
                abilityDeclaration(tgt.poke)
                const damage = Math.floor(tgt.poke.myFull_hp / 4 * isDynamax(tgt.poke))
                changeHP(tgt.poke, damage, "+")
                tgt.success = false
            }
        }
        // ぼうおん: 音技
        if ( tgt.poke.myAbility == "ぼうおん" && musicMove.includes(poke.myMove.name) ) {
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            tgt.success = false
        }
        // テレパシー:　味方による攻撃技
        if ( tgt.poke.myAbility == "テレパシー" && poke.myMove.nature != "変化" && !spirit ) {
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 味方からの 攻撃を 受けない !`)
            tgt.success = false
        }
        // ふしぎなまもり: 効果抜群でない技
        if ( tgt.poke.myAbility == "ふしぎなまもり" && compatibilityCheck(poke, tgt.poke) <= 1 && poke.myMove.nature != "変化" ) {
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            tgt.success = false
        }
        // ぼうじん: 粉技
        if ( tgt.poke.myAbility == "ぼうじん" && powderMove.includes(poke.myMove.name) ) {
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            tgt.success = false
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

        // ぼうだん: 弾の技
        if ( tgt.poke.myAbility == "ぼうだん" && ballMove.includes(poke.myMove.name) ) {
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            tgt.success = false
        }
        // ねんちゃく: トリック/すりかえ/ふしょくガス
        if ( tgt.poke.myAbility == "ねんちゃく" && ( poke.myMove.name == "トリック" || poke.myMove.name == "すりかえ" || poke.myMove.name == "ふしょくガス") ) {
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            tgt.success = false
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

        // メロメロ: 対象と性別が同じ/対象が性別不明
        if ( poke.myMove.name == "メロメロ" ) {
            if ( poke.myGender == "-" || tgt.poke.myGender == "-" || poke.myGender == tgt.poke.myGender ) {
                tgt.success = false
            }
        }
        // ゆうわく（wikiには書いていなかったが、勝手に入れた）
        if ( poke.myMove.name == "ゆうわく" ) {
            if ( !( poke.myGender == "♂" && tgt.poke.myGender == "♀" ) && !( poke.myGender == "♀" && tgt.poke.myGender == "♂" ) ) {
                tgt.success = false
            }
        }
        // いちゃもん: 対象がダイマックスしている
        if ( poke.myMove.name == "いちゃもん" ) {
            if ( tgt.poke.myCondition.myDynamax ) {
                tgt.success = false
            }
        }
        // ベノムトラップ: 対象がどく/もうどく状態でない
        if ( poke.myMove.name == "ベノムトラップ" ) {
            if ( tgt.poke.myAilment != "どく" ) {
                tgt.success = false
            }
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
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( !isSubstitute(poke, tgt.poke) ) continue // みがわり状態であること
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

    // フラワーベール　ランクを下げられない　状態異常・ねむけ状態にならない
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )   continue // すでに失敗していないこと
        if ( !isFlowerVeil(tgt.poke) )        continue // フラワーベール状態であること
        if ( !tgt.poke.myType.includes("くさ")) continue // 対象がくさタイプを持っていること
        // ランク補正に関する無効化
        const rankMove = statusMoveToChangeRankForOneOfThem.concat(statusMoveToChangeRankForAllOfYou)
        for ( const element of rankMove ) {
            if ( poke.myMove.name == element.name && element.name != "デコレーション" ) tgt.success = false
        }
        // 状態異常に関する無効化
        const abnormalMove = statusMoveToMakeAbnormalForOneOfThem.concat(statusMoveToMakeAbnormalForAllOfYou, statusMoveToMakeAbnormalForExceptForme)
        for ( const element of abnormalMove ) {
            if ( poke.myMove.name == element.name ) tgt.success = false
        }
        // あくびの無効化
        if ( poke.myMove.name == "あくび" ) tgt.success = false

        if ( !tgt.success ) {
            writeLog(`${isFlowerVeil(tgt.poke).myTN} の ${isFlowerVeil(tgt.poke).myName} の 特性『フラワーベール』 !`)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
        } 
    }
    // スイートベール　ねむり・ねむけ状態にならない
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )   continue // すでに失敗していないこと
        if ( !isSweetVeil(tgt.poke) )         continue // スイートベール状態であること
        // 状態異常に関する無効化
        const abnormalMove = statusMoveToMakeAbnormalForOneOfThem.concat(statusMoveToMakeAbnormalForAllOfYou, statusMoveToMakeAbnormalForExceptForme)
        for ( const element of abnormalMove ) {
            if ( poke.myMove.name == element.name && element.ailment == "ねむり" ) tgt.success = false
        }
        // あくびの無効化
        if ( poke.myMove.name == "あくび" ) tgt.success = false

        if ( !tgt.success ) {
            writeLog(`${isFlowerVeil(tgt.poke).myTN} の ${isFlowerVeil(tgt.poke).myName} の 特性『スイートベール』 !`)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
        } 
    }
    // アロマベール
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( !isAlomaVeil(tgt.poke) )       continue // アロマベール状態であること
        if ( poke.myMove.name == "メロメロ" ) tgt.success = false
        if ( poke.myMove.name == "いちゃもん" ) tgt.success = false
        if ( poke.myMove.name == "かいふくふうじ" ) tgt.success = false

        if ( !tgt.success ) {
            writeLog(`${isAlomaVeil(tgt.poke).myTN} の ${isAlomaVeil(tgt.poke).myName} の 特性『アロマベール』 !`)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には　効果がないようだ....`)
        }
    }

    // フラワーベール/スイートベール/アロマベール以外の特性
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( !isAbility(tgt.poke) ) continue // 対象の特性が有効であること

        // ランク補正に関する無効化
        const rankMove = statusMoveToChangeRankForOneOfThem.concat(statusMoveToChangeRankForAllOfYou)
        for ( const element of rankMove ) {
            if ( poke.myMove.name == element.name && element.name != "デコレーション" ) {
                // クリアボディ/しろいけむり/メタルプロテクト/フラワーベール: 能力を下げる技
                if ( tgt.poke.myAbility == "クリアボディ" ) tgt.success = false
                if ( tgt.poke.myAbility == "しろいけむり" ) tgt.success = false
                if ( tgt.poke.myAbility == "メタルプロテクト" ) tgt.success = false
                // かいりきバサミ: こうげきを下げる技
                if ( tgt.poke.myAbility == "かいりきバサミ" ) {
                    if ( element.rank.length == 1 && element.rank[0].parameter == "atk" && element.rank[0].change < 0 ) tgt.success = false
                }
                // はとむね: ぼうぎょを下げる技
                if ( tgt.poke.myAbility == "はとむね" ) {
                    if ( element.rank.length == 1 && element.rank[0].parameter == "def" && element.rank[0].change < 0) tgt.success = false
                }
                // するどいめ: 命中を下げる技
                if ( tgt.poke.myAbility == "するどいめ" ) {
                    if ( element.rank.length == 1 && element.rank[0].parameter == "accuracy" && element.rank[0].change < 0) tgt.success = false
                }
            }
        }

        // 状態異常に関する無効化
        const abnormalMove = statusMoveToMakeAbnormalForOneOfThem.concat(statusMoveToMakeAbnormalForAllOfYou, statusMoveToMakeAbnormalForExceptForme)
        for ( const element of abnormalMove ) {
            if ( poke.myMove.name == element.name ) {
                // スイートベール/ぜったいねむり/フラワーベール/リーフガード/リミットシールド: 状態異常の無効化
                if ( tgt.poke.myAbility == "ぜったいねむり" ) tgt.success = false
                if ( tgt.poke.myAbility == "リーフガード" && isSunny(tgt.poke) ) tgt.success = false
                if ( tgt.poke.myCondition.myShields_down ) tgt.success = false
                // めんえき/パステルベール: どく・もうどく状態の無効化
                if ( tgt.poke.myAbility == "めんえき" ) tgt.success = false
                if ( isPastelVeil(tgt.poke) && ( element.ailment == "どく" || element.ailment == "もうどく" ) ) tgt.success = false
                // じゅうなん: まひ状態の無効化
                if ( tgt.poke.myAbility == "じゅうなん" ) {
                    if ( element.ailment == "まひ") tgt.success = false
                }
                // みずのベール/すいほう: やけど状態の無効化
                if ( tgt.poke.myAbility == "みずのベール" || tgt.poke.myAbility == "すいほう" ) {
                    if ( element.ailment == "やけど") tgt.success = false
                }
                // ふみん/やるき: ねむり状態の無効化
                if ( tgt.poke.myAbility == "ふみん" || tgt.poke.myAbility == "やるき" ) {
                    if ( element.ailment == "ねむり" ) tgt.success = false
                }
                // マグマのよろい: こおり状態の無効化
                if ( tgt.poke.myAbility == "マグマのよろい" ) {
                    if ( element.ailment == "こおり") tgt.success = false
                }
                // マイペース: こんらん状態の無効化
                if ( tgt.poke.myAbility == "マイペース" ) {
                    if ( element.ailment == "こんらん" ) tgt.success = false
                }
            }
        }
        // あくびの無効化
        if ( poke.myMove.name == "あくび" ) {
            if ( tgt.poke.myAbility == "やるき" ) tgt.success = false
            if ( tgt.poke.myAbility == "ふみん" ) tgt.success = false
            if ( tgt.poke.myAbility == "ぜったいねむり" ) tgt.success = false
            if ( tgt.poke.myAbility == "リーフガード" && isSunny(tgt.poke) ) tgt.success = false
            if ( tgt.poke.myCondition.myShields_down ) tgt.success = false
        }
        // その他
        // どんかん: メロメロ/ちょうはつ状態の無効化　ゆうわく（wikiにない）
        if ( tgt.poke.myAbility == "どんかん" ) {
            if ( poke.myMove.name == "メロメロ" ) tgt.success = false
            if ( poke.myMove.name == "ちょうはつ" ) tgt.success = false
            if ( poke.myMove.name == "ゆうわく" ) tgt.success = false
        }  
        // アロマベール: メロメロ/いちゃもん/かいふくふうじ状態の無効化
        // がんじょう: 一撃必殺技の無効化
        if ( tgt.poke.myAbility == "がんじょう" ) {
            if ( oneShot.includes(poke.myMove.name) ) tgt.success = false
        }

        if ( !tgt.success ) {
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
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
        if ( tgt.poke.myAbility == "ノーガード" && isAbility(poke) ) continue
        if ( poke.myCondition.myLock_on ) continue
        if ( tgt.poke.myCondition.myMinimize && minimize.includes(poke.myMove.name) ) continue
        if ( tgt.poke.myCondition.myTelekinesis && !oneShot.includes(poke.myMove.name) ) continue
        // 必中技
        if ( poke.myMove.accuracy == "-" ) continue
        if ( ( poke.myMove.name == "かみなり" || poke.myMove.name == "ぼうふう" ) && isRainy(tgt.poke) ) continue
        if ( poke.myMove.name == "ふぶき" && isSnowy(tgt.poke) ) continue
        if ( poke.myMove.name == "どくどく" && poke.myType.includes("どく") ) continue
        // 命中率の変化
        if ( ( poke.myMove.name == "かみなり" || poke.myMove.name == "ぼうふう" ) && isSunny(poke)) poke.myMove.accuracy = 50
        if ( tgt.poke.myAbility == "ミラクルスキン" && isAbility(tgt.poke) && poke.myMove.nature == "変化" ) poke.myMove.accuracy = Math.min(50, poke.myMove.accuracy)
        if ( oneShot.includes(poke.myMove.name)) poke.myMove.accuracy = 30 + poke.myLevel - tgt.poke.myLevel
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
        if (( tgt.poke.myItem == "ひかりのこな" || tgt.poke.myItem == "のんきのおこう" ) && isItem(tgt.poke) ) correction = Math.round(correction * 3686 / 4096)
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
        if ( !isSubstitute(poke, tgt.poke) ) continue // みがわり状態であること
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

    // 特性に関する無効化 
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // なかまづくり: 対象がダイマックスしている/対象が自身と同じ特性である/自身がコピーできない特性である/対象が上書きできない特性である
        if ( poke.myMove.name == "なかまづくり" ) {
            if ( poke.myAbility == tgt.poke.myAbility )         tgt.success = false // 対象が自身と同じ特性である
            if ( yourEntrainment.includes(tgt.poke.myAbility) ) tgt.success = false // 対象が上書きできない特性である
            if ( myEntrainment.includes(poke.myAbility) )        tgt.success = false // 自身がコピーできない特性である
            if ( tgt.poke.myCondition.myDynamax )               tgt.success = false // 対象がダイマックスしている
            if ( isSubstitute(poke, tgt.poke) )                 tgt.success = false // 対象がみがわり状態である
        }
        // いえき: 対象がすでにとくせいなし状態である/とくせいなしにできない特性である
        if ( poke.myMove.name == "いえき" ) {
            if ( tgt.poke.myCondition.myNo_ability )   tgt.success = false // 対象がすでにとくせいなし状態である
            if ( gastro.includes(tgt.poke.myAbility) ) tgt.success = false // とくせいなしにできない特性である
        }
        // なりきり: 自身が対象と同じ特性である/対象がコピーできない特性である
        if ( poke.myMove.name == "なりきり" ) {
            if ( poke.myAbility == tgt.poke.myAbility )      tgt.success = false // 自身が対象と同じ特性である
            if ( yourRolePlay.includes(tgt.poke.myAbility) ) tgt.success = false // 対象がコピーできない特性である
            if ( myRolePlay.includes(poke.myAbility) )        tgt.success = false // 自身がコピーできない特性である
        }
        // シンプルビーム: 対象がすでにたんじゅんである/上書きできない特性である
        if ( poke.myMove.name == "シンプルビーム" ) {
            if ( tgt.poke.myAbility == "たんじゅん" )        tgt.success = false // 対象がすでにたんじゅんである
            if ( simpleBeam.includes(tgt.poke.myAbility) ) tgt.success = false // 上書きできない特性である
        }
        // なやみのタネ: 対象が上書きできない特性である
        if ( poke.myMove.name == "なやみのタネ" ) {
            if ( tgt.poke.myAbility == "ふみん" )           tgt.success = false // 対象がすでにふみんである
            if ( worrySeed.includes(tgt.poke.myAbility) ) tgt.success = false // 対象が上書きできない特性である
        }
        // スキルスワップ: 自身や対象が交換できない特性である/対象がダイマックスしている
        if ( poke.myMove.name == "スキルスワップ" ) {
            if ( cannotSkillSwap.includes(poke.myAbility) )      tgt.success = false // 自身が交換できない特性である
            if ( cannotSkillSwap.includes(tgt.poke.myAbility) ) tgt.success = false // 対象が交換できない特性である
            if ( tgt.poke.myCondition.myDynamax )               tgt.success = false // 対象がダイマックスしている
        }

        if ( !tgt.success ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
    }

    // HPが満タンによる無効化
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( tgt.poke.myRest_hp != tgt.poke.myFull_hp ) // HPが満タンであること

        // いやしのはどう
        if ( poke.myMove.name == "いやしのはどう" ) tgt.success = false
        // フラワーヒール
        if ( poke.myMove.name == "フラワーヒール" ) tgt.success = false
        // いのちのしずく
        if ( poke.myMove.name == "いのちのしずく" ) tgt.success = false
        // ジャングルヒール: HPが満タンで、状態異常でもない
        if ( poke.myMove.name == "ジャングルヒール" && !tgt.poke.myAilment ) tgt.success = false
        // かふんだんご　味方に対するもの
        if ( poke.myMove.name == "かふんだんご" && poke.myParty == tgt.poke.myParty ) tgt.success = false
        // プレゼント: 回復効果が選ばれた場合
        /*
        if ( poke.myMove.name == "プレゼント" && move.power == "-") {
            if (def.con.last_HP == def.con.full_HP) {
                cfn.logWrite(def, atk, def.con.TN + "　の　" + def.poke.myName + "は　HPが満タンだった" + "\n")
                return true
            } else {
                afn.HPchangeMagic(def, atk, Math.floor(def.con.full_HP / 4), "+", move)
                return true
            }
        }
        */
        // 自分の体力を回復する技(じこさいせい等)
        if ( purelyRecover.includes(poke.myMove.name) ) tgt.success = false


        if ( !tgt.success ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は HPが満タンだった`)
    }

    // ステータスに関する無効化
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // はらだいこ: 自身がHP半分以下である/すでにランク+6である
        if ( poke.myMove.name == "はらだいこ" && ( tgt.poke.myRest_hp < Math.floor(tgt.poke.myFull_hp / 2) || tgt.poke.myRank_atk == 6 ) ) tgt.success = false
        // フラワーガード/たがやす: 対象がくさタイプでない（たがやすの時は地面にいる必要がある）
        if ( poke.myMove.name == "フラワーガード" && !tgt.poke.myType.includes("くさ") ) tgt.success = false
        if ( poke.myMove.name == "たがやす" && !( tgt.poke.myType.includes("くさ") && onGround(tgt.poke) ) ) tgt.success = false
        // じばそうさ/アシストギア: 対象の特性がプラスかマイナスでない
        if ( poke.myMove.name == "じばそうさ" || poke.myMove.name == "アシストギア" ) {
            if ( !( tgt.poke.myAbility == "プラス" || tgt.poke.myAbility == "マイナス" ) || !isAbility(tgt.poke) ) tgt.success = false
        }
        // ちからをすいとる: 対象のこうげきが-6である
        if ( poke.myMove.name == "ちからをすいとる" && tgt.poke.myRank_atk == -6 ) tgt.success = false
        // いばる/おだてる: 対象のランクが+6でありこんらんしている
        if ( poke.myMove.name == "いばる" && tgt.poke.myRank_atk == 6 && tgt.poke.myCondition.myConfusion ) tgt.success = false
        if ( poke.myMove.name == "おだてる" && tgt.poke.myRank_sp_atk == 6 && tgt.poke.myCondition.myConfusion ) tgt.success = false
        // ひっくりかえす: 対象のランクが変化していない
        if ( poke.myMove.name == "ひっくりかえす" ) {
            if ( tgt.poke.myRank_atk == 0 && tgt.poke.myRank_def == 0 && tgt.poke.myRank_sp_atk == 0 && tgt.poke.myRank_sp_def == 0 && tgt.poke.myRank_speed == 0 && tgt.poke.myRank_accuracy == 0 && tgt.poke.myRank_evasion == 0 ) tgt.success = false
        }

        if ( !tgt.success ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には うまく決まらなかった....`)
    }

    // タイプによる無効化
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // テクスチャー: 現在のタイプが一番上の技のタイプを含む
        if ( poke.myMove.name == "テクスチャー" ) {
            if ( tgt.poke.myType.includes(moveSearchByName(poke.myMove_0).type) ) tgt.success = false
        }
        // テクスチャー2: 対象が行動していない/最後に使った技がわるあがきである
        if ( poke.myMove.name == "テクスチャー2" ) {
            if ( tgt.poke.myHistory == [] ) tgt.success = false
            if ( tgt.poke.myHistory[0].name == "わるあがき" ) tgt.success = false
            let check = []
            for ( let i = 0; i < 18; i++ ) {
                if ( compatibilityTable[0][i] == tgt.poke.myHistory[0].type ) {
                    for ( let j = 0; j < 18; j++ ) {
                        if ( compatibilityTable[i+1][j] < 1 ) check.push(compatibilityTable[0][j])
                    }
                }
            }
            let count = false
            for ( const type of check ) {
                if ( !con.type.includes(type) ) count = true
            }
            if ( count == false ) tgt.success = false
        }
        // ミラータイプ: すでに対象と同じタイプである
        if ( poke.myMove.name == "ミラータイプ" && ( poke.myType == tgt.poke.myType ) ) tgt.success = false
        // みずびたし/まほうのこな: 対象がみず単タイプである/エスパー単タイプである | 対象がアルセウスかシルヴァディである
        if ( poke.myMove.name == "みずびたし" ) {
            if ( tgt.poke.myType == ["みず"] ) tgt.success = false
            if ( tgt.poke.myName == "アルセウス" ) tgt.success = false
            if ( tgt.poke.myName == "シルヴァディ" ) tgt.success = false
        }
        if ( poke.myMove.name == "まほうのこな" ) {
            if ( tgt.poke.myType == ["エスパー"] ) tgt.success = false
            if ( tgt.poke.myName == "アルセウス" ) tgt.success = false
            if ( tgt.poke.myName == "シルヴァディ" ) tgt.success = false
        }
        // ハロウィン/もりののろい: 対象がゴーストタイプを持つ/くさタイプを持つ
        if ( poke.myMove.name == "ハロウィン" && tgt.poke.myType.includes("ゴースト") ) tgt.success = false
        if ( poke.myMove.name == "もりののろい" && tgt.poke.myType.includes("くさ") ) tgt.success = false

        if ( !tgt.success ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には うまく決まらなかった....`)
    }
        
    // アロマセラピー/いやしのすず: 状態異常の味方がいない
    if ( poke.myMove.name == "アロマセラピー" || poke.myMove.name == "いやしのすず" ) {
        let check = true
        for ( const _poke of getParty(poke) ) {
            if ( !_poke.myAilment ) check = false
        }
        if ( check ) writeLog(`しかし うまく決まらなかった....`)
    }
    // おちゃかい: 場にきのみを持つポケモンがいない
    if ( poke.myMove.name == "おちゃかい" ) {
        for ( const tgt of poke.myTarget ) {
            if ( !tgt.success ) continue // すでに失敗していないこと

            if ( tgt.poke.myCondition.myDig )           tgt.success = false // あなをほる
            if ( tgt.poke.myCondition.myDive )          tgt.success = false // ダイビング
            if ( tgt.poke.myCondition.mySky )           tgt.success = false // そらをとぶ
            if ( tgt.poke.myCondition.myShadow )        tgt.success = false // シャドーダイブ
            if ( tgt.poke.myCondition.myMax_guard )     tgt.success = false // ダイウォール
            if ( !berryList.includes(tgt.poke.myItem) ) tgt.success = false // きのみを持っていない
        }
        if ( !tgt.success ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には うまく決まらなかった....`)
    }
        
    // 重複による無効化
    let check = false
    // 天気: すでに同じ状態になっている
    if ( poke.myMove.name == "にほんばれ" && fieldStatus.mySunny ) check = true
    if ( poke.myMove.name == "あまごい" && fieldStatus.myRainy ) check = true
    if ( poke.myMove.name == "すなあらし" && fieldStatus.mySandstorm) check = true
    if ( poke.myMove.name == "あられ" && fieldStatus.myGraupel ) check = true
    // フィールド: すでに同じ状態になっている
    if ( poke.myMove.name == "エレキフィールド" && fieldStatus.myElectric ) check = true
    if ( poke.myMove.name == "グラスフィールド" && fieldStatus.myGrassy ) check = true
    if ( poke.myMove.name == "サイコフィールド" && fieldStatus.myPsychic ) check = true
    if ( poke.myMove.name == "ミストフィールド" && fieldStatus.myMisty ) check = true
    // 自分の場の状態: すでに同じ状態になっている
    if ( poke.myMove.name == "オーロラベール" && isField(poke).myAurora_veil ) check = true
    if ( poke.myMove.name == "ひかりのかべ" && isField(poke).myLight_screen ) check = true
    if ( poke.myMove.name == "リフレクター" && isField(poke).myReflect ) check = true
    if ( poke.myMove.name == "おいかぜ" && isField(poke).myTailwind ) check = true
    if ( poke.myMove.name == "おまじない" && isField(poke).myLucky_chant ) check = true
    if ( poke.myMove.name == "しろいきり" && isField(poke).myMist ) check = true
    if ( poke.myMove.name == "しんぴのまもり" && isField(poke).mySafeguard ) check = true
    // 自分の場の守る: すでに同じ状態になっている
    if ( poke.myMove.name == "たたみがえし" && isField(poke).myMat_block ) check = true
    if ( poke.myMove.name == "トリックガード" && isField(poke).myCrafty_shield ) check = true
    if ( poke.myMove.name == "ファストガード" && isField(poke).myQuick_guard ) check = true
    if ( poke.myMove.name == "ワイドガード" && isField(poke).myWide_guard ) check = true
    // お互いの場の状態: すでに同じ状態になっている
    if ( poke.myMove.name == "どろあそび" && fieldStatus.myMud_sport ) check = true
    if ( poke.myMove.name == "みずあそび" && fieldStatus.myWater_sport ) check = true
    if ( poke.myMove.name == "じゅうりょく" && fieldStatus.myGravity ) check = true
    if ( poke.myMove.name == "フェアリーロック" && fieldStatus.myFairy_lock ) check = true
    if ( poke.myMove.name == "プラズマシャワー" && fieldStatus.myIon_deluge ) check = true
    // 設置技: すでに最大まで仕掛けられている
    if ( poke.myMove.name == "ステルスロック" && isOppField(poke).myStealth_rock ) check = true
    if ( poke.myMove.name == "ねばねばネット" && isOppField(poke).mySticky_web ) check = true
    if ( poke.myMove.name == "まきびし" && isOppField(poke).mySpikes == 3 ) check = true
    if ( poke.myMove.name == "どくびし" && isOppField(poke).myToxic_spikes == 2 ) check = true

    if ( check ) {
        writeLog(`しかし うまく決まらなかった....`)
        poke.myTarget[0] = false
    }

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // にげられない状態にする技: すでににげられない状態である
        if ( tgt.poke.myCondition.myCant_escape != false ) {
            if ( poke.myMove.name == "くろいまなざし" ) tgt.success = false
            if ( poke.myMove.name == "クモのす" ) tgt.success = false
            if ( poke.myMove.name == "とおせんぼう" ) tgt.success = false
            if ( poke.myMove.name == "たこがため" ) tgt.success = false
        }
        // アクアリング: 自身がすでにアクアリング状態である
        if ( poke.myMove.name == "アクアリング" && tgt.poke.myCondition.myAqua_ring ) tgt.success = false
        // きあいだめ: 自身がすでにきゅうしょアップ状態である
        if ( poke.myMove.name == "きあいだめ" && tgt.poke.myCondition.myCritical ) tgt.success = false
        // かいふくふうじ: 対象がすでにかいふくふうじ状態である
        if ( poke.myMove.name == "かいふくふうじ" && tgt.poke.myCondition.myHeal_block ) tgt.success = false
        // さしおさえ: 対象がすでにさしおさえ状態である　（wikiにない）
        if ( poke.myMove.name == "さしおさえ" && ( tgt.poke.myCondition.myEmbargo || tgt.poke.myItem == "" ) ) tgt.success = false
        // スポットライト: 対象がすでにちゅうもくのまと状態である（wikiにない）
        if ( poke.myMove.name == "スポットライト" && tgt.poke.myCondition.mySpotlight ) tgt.success = false
        // ちょうはつ: 対象がすでにちょうはつ状態である
        if ( poke.myMove.name == "ちょうはつ" && tgt.poke.myCondition.myTaunt ) tgt.success = false
        // テレキネシス: 対象がすでにテレキネシス状態である　（wikiにない）
        if ( poke.myMove.name == "テレキネシス" && tgt.poke.myCondition.myTelekinesis ) tgt.success = false
        // でんじふゆう: 自身がすでにでんじふゆう状態である (うちおとす状態である wikiにない)
        if ( poke.myMove.name == "でんじふゆう" ) {
            if ( tgt.poke.myCondition.myElectrify ) tgt.success = false
            if ( tgt.poke.myCondition.mySmack_down ) tgt.success = false
            if ( tgt.poke.myCondition.myIngrain ) tgt.success = false
        }
        // ねがいごと: 前のターンのねがいごとの効果が残っている
        if ( poke.myMove.name == "ねがいごと" && isField(poke).myWish_heal ) tgt.success = false
        // のろい(呪い): 対象がすでにのろい状態である
        if ( poke.myMove.name == "のろい" && poke.myType.includes("ゴースト") && tgt.poke.myCondition.myCurse ) tgt.success = false
        // ロックオン/こころのめ: 自身がすでにロックオン状態である
        if ( poke.myMove.name == "ロックオン" && tgt.poke.myCondition.myLock_on ) tgt.success = false
        if ( poke.myMove.name == "こころのめ" && tgt.poke.myCondition.myLock_on ) tgt.success = false

        if ( !tgt.success ) writeLog(`しかし うまく決まらなかった....`)
    }
        
    // その他の無効化
    // 天気を変える技: おおひでり/おおあめ/デルタストリームにより変えられない
    if ( fieldStatus.myDrought || fieldStatus.myHeavy_rain || fieldStatus.myTurbulence ) {
        if ( poke.myMove.name == "にほんばれ" || poke.myMove.name == "あまごい" || poke.myMove.name == "すなあらし" || poke.myMove.name == "あられ" ) {
            poke.myTarget[0] = false
            writeLog(`しかし うまく決まらなかった....`)
        }
    }
    // コートチェンジ: 入れ替える場の状態が無い
    if ( poke.myMove.name == "コートチェンジ" ) {
        let check = true
        for ( const element of courtChange ) {
            if ( myField[`my${element}`] || oppField[`my${element}`] ) check = false
        }
        if ( check ) {
            poke.myTarget[0] = false
            writeLog(`しかし うまく決まらなかった....`)
        }
    }

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // アンコール: 対象が技を使用していない/技のPPが残っていない/アンコールできない技/相手がダイマックス/すでにアンコール状態
        /*
        if ( poke.myMove.name == "アンコール" ) {
            let now_PP = 0
            for (let j = 0; j < 4; j++) {
                if (tgt["move_" + j] == tgt.used) now_PP = tgt["last_" + j]
            }
            if (now_PP == 0) tgt.result = "失敗"
            if (tgt.used == "") tgt.result = "失敗"
            if (cannotEncore.includes(tgt.used)) tgt.result = "失敗"
            if (tgt.p_con.includes("状態変化『アンコール』")) tgt.result = "失敗"  || def.data.dynaTxt.includes("3") || def.data.gigaTxt.includes("3")
        }
        */
        
        // かなしばり: 対象が技を使用していない/最後のわざがわるあがき/ダイマックスわざ/すでにかなしばり状態
        if ( poke.myMove.name == "かなしばり") {
            if ( tgt.poke.myHistory == [] ) tgt.success = false
            if ( tgt.poke.myHistory[0].name == "わるあがき" ) tgt.success = false
            if ( tgt.poke.myCondition.myDisable_move ) tgt.success = false
            /*
            const dyna = moveEff.dyna()
            for (let j = 0; j < dyna.length; j++) {
                if (dyna[j][1] == tgt.used) tgt.result = "失敗"
            }
            const giga = moveEff.gigadyna()
            for (let j = 0; j < giga.length; j++) {
                if (giga[j][1] == tgt.used) tgt.result = "失敗"
            }
            */
        }
        // ものまね: 対象が技を使用していない/ものまねできない技
        if ( poke.myMove.name == "ものまね" ) {
            if ( tgt.poke.myHistory == [] ) tgt.success = false
            if ( mimicMove.includes(tgt.poke.myHistory[0].name) ) tgt.success = false
            if ( ![tgt.poke.myMove_0, tgt.poke.myMove_1, tgt.poke.myMove_2, tgt.poke.myMove_3].includes(tgt.poke.myHistory[0].name) ) tgt.success = false
        }
        // スケッチ: 対象が技を使用していない/スケッチできない技
        if ( poke.myMove.name == "スケッチ" ) {
            if ( tgt.poke.myHistory == [] ) tgt.success = false
            if ( poke.myCondition.myTransform ) tgt.success = false
            if ( tgt.poke.myHistory != [] && cannotSketch.incense(tgt.poke.myHistory[0].name) ) tgt.success = false
            if ( ![tgt.poke.myMove_0, tgt.poke.myMove_1, tgt.poke.myMove_2, tgt.poke.myMove_3].includes(tgt.poke.myHistory[0].name) ) tgt.success = false
        }
        // リサイクル：持ち物を持っている、リサイクルできる道具がない(wikiにない)
        if ( poke.myMove.name == "リサイクル" ) {
            if ( tgt.poke.myIitem != "" ) tgt.success = false
            if ( !tgt.poke.myRecycle ) tgt.success = false
        }
        // さいはい: さいはいできない技、PPがない技
        if ( poke.myMove.name == "さいはい" ) {
            if ( tgt.poke.myHistory == [] ) tgt.success = false
            // if ( tgt.poke.myCondition.myFree_fall ) tgt.success = false
            if ( tgt.poke.myHistory.length > 0 ) {
                if ( cannotInstruct.includes(tgt.poke.myHistory[0].name)) tgt.success = false
                if ( cannotMoveByRecoil.includes(tgt.poke.myHistory[0].name)) tgt.success = false
                if ( accumulationMove.includes(tgt.poke.myHistory[0].name)) tgt.success = false
            }
        }
        // おさきにどうぞ: 対象がすでに行動している、行動順に変化がない場合（wikiにない）
        if ( poke.myMove.name == "おさきにどうぞ" ) {
            if ( tgt.poke.myCmd_move ) tgt.success = false
        }
        // さきおくり/そうでん/てだすけ: 対象がすでに行動している、
        if ( poke.myMove.name == "さきおくり" || poke.myMove.name == "そうでん" ) {
            if ( tgt.poke.myCmd_move ) tgt.success = false
        }
        // バトンタッチ/いやしのねがい/みかづきのまい: 交代できる味方がいない
        if ( poke.myMove.name == "バトンタッチ" || poke.myMove.name == "いやしのねがい" || poke.myMove.name == "みかづきのまい" || poke.myMove.name == "テレポート" ) {
            if ( isBench(poke).length == 0 ) tgt.success = false
        }
        // ほえる/ふきとばし: 交代できる相手がいない
        if ( poke.myMove.name == "ほえる" || poke.myMove.name == "ふきとばし" ) {
            if ( !isBench(tgt.poke).length == 0 ) tgt.success = false
        }
        // てだすけ/サイドチェンジ/アロマミスト/てをつなぐ: 味方がいない
        if ( poke.myMove.name == "てだすけ" || poke.myMove.name == "サイドチェンジ" || poke.myMove.name == "アロマミスト" || poke.myMove.name == "てをつなぐ" ) {
            if ( myPokeInBattle(poke).length == 1 ) tgt.success = false
        }
        // サイコシフト
        if ( poke.myMove.name == "サイコシフト" ) {
            // 1.自身が状態異常でない/対象がすでに状態異常である
            if ( !poke.myAilment || !tgt.poke.myAilment ) tgt.success = false
            // 2.対象が状態異常に耐性を持っている
            if ( psychoShift(tgt.poke, poke.myAilment) ) tgt.success = false
        }
        // じょうか: 対象が状態異常でない
        if ( poke.myMove.name == "じょうか" && !tgt.poke.myAilment ) tgt.success = false
        // みがわり
        if ( poke.myMove.name == "みがわり" ) {
            // 1.自身がすでにみがわり状態である
            if ( tgt.poke.myCondition.mySubstitute ) tgt.success = false
            // 2.自身に技を使う体力が残っていない
            if ( tgt.poke.myRest_hp <= Math.floor(tgt.poke.myFull_hp / 4) ) tgt.success = false
        }
        // へんしん: 自身/対象がすでにへんしん状態である
        if ( poke.myMove.name == "へんしん" ) {
            if ( poke.myCondition.myTransform ) tgt.success = false
            if ( tgt.poke.myCondition.myTransform ) tgt.success = false
        }
        // トリック/すりかえ: どちらも道具を持っていない/どちらかの道具が交換できない
        if ( poke.myMove.name == "トリック" || poke.myMove.name == "すりかえ" ) {
            if ( poke.myItem == "" && tgt.poke.myItem == "") tgt.success = false
            if ( cannotChangeItem(poke) ) tgt.success = false
            if ( cannotChangeItem(tgt.poke) ) tgt.success = false
        }
        // ふしょくガス: 溶かせない道具がある
        if ( poke.myMove.name == "ふしょくガス" ) {
            if ( cannotChangeItem(tgt.poke) ) tgt.success = false
        }

        if ( !tgt.success ) writeLog(`しかし うまく決まらなかった....`)
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
