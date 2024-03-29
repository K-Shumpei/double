function moveSuccessJudge(poke) {
    // 0.技の決定
    decideMove(poke)
    // 1.フリーフォールで行動順を飛ばされる
    if ( skyDropFailure(poke) ) return false
    // 2.(自身のおんねん/いかり状態の解除)
    gradgeRage(poke)
    // 3.行動の失敗
    if ( actionFailure(poke) ) return false
    // 4.ねごと/いびき使用時「ぐうぐう 眠っている」メッセージ
    // 5.Zワザの場合はZパワーを送る。Z変化技の場合は付加効果
    ZpowerActivation(poke)
    // 6.他の技が出る技により技を置き換え、(3-8~10)の行程を繰り返す
    if ( moveReplace(poke) ) return false
    // 7.自分のこおりを回復するわざにより自身のこおり状態が治る
    selfMeltCheck(poke)
    // 8.特性バトルスイッチによるフォルムチェンジ
    battleSwitch(poke)
    // 9.「<ポケモン>の <技>!」のメッセージ。PPが減少することが確約される
    attackDeclaration(poke)
    // 10.わざのタイプが変わる。1→2→3の順にタイプが変わる
    moveTypeChange(poke)
    // 11.技の対象が決まる。若い番号の対象が優先される
    decideTarget(poke)
    // 12.PPが適切な量引かれる (プレッシャーの効果が考慮される)
    PPDecrease(poke)
    // 13.こだわり系アイテム/ごりむちゅうで技が固定される
    commitmentRock(poke)
    // 14.ほのおタイプではないことによるもえつきるの失敗
    if ( burnUpFailure(poke) ) return false
    // 15.おおあめ/おおひでりによる技の失敗
    if ( greatWeatherFailure(poke) ) return false
    // 16.ふんじんによるほのお技の失敗とダメージ
    if ( powderFailure(poke) ) return false
    // 17.ミクルのみによる命中補正効果が消費される
    // 18.技の仕様による失敗
    if ( failureBySpec(poke) ) return false
    // 19.マックスレイドバトルでの失敗
    // 20.特性による失敗
    if ( failureByAbility(poke) ) return false
    // 21.中断されても効果が発動する技
    if ( remainEffectMove(poke) ) return false
    // 22.へんげんじざい/リベロの発動
    proteanLibero(poke)
    // 23.溜め技の溜めターンでの動作
    if (accumulateOperation(poke)) return false
    // 24.待機中のよこどりで技が盗まれる。技を奪ったポケモンは3-9~11の行程を繰り返す
    // 25.だいばくはつ/じばく/ミストバーストによるHP消費が確約される
    promiseToChangeHP(poke)
    // 26.対象のポケモンが全員すでにひんしになっていて場にいないことによる失敗
    if ( faintedFailure(poke) ) return false
    // 27.ビックリヘッド/てっていこうせん使用によるHP消費が確約される
    mindblownStealbeam(poke)
    // 28.マグニチュードの大きさ（威力）が決定
    magnitude(poke)
    // 29.姿を隠していることによる無効化
    if ( invalidByHide(poke) ) return false
    // 30.サイコフィールドによる無効化
    if ( invalidByTerrain1st(poke) ) return false
    // 31.0 シャドーダイブ・ゴーストダイブによるまもるの解除
    breakProtect(poke)
    // 31.ファストガード/ワイドガード/トリックガードによる無効化 (Zワザ/ダイマックスわざならダメージを75%カットする)
    if ( invalidByProtect1st(poke) ) return false
    // 32.まもる/キングシールド/ブロッキング/ニードルガード/トーチカによる無効化 (Zワザ/ダイマックスわざなら75%をカットする)
    if ( invalidByProtect2nd(poke) ) return false
    // 33.たたみがえしによる無効化 (Zワザ/ダイマックスわざなら75%をカットする)
    if ( invalidByMatBlock(poke) ) return false
    // 34.ダイウォールによる無効化
    // 35.マジックコート状態による反射
    magicCoatReflection(poke)
    // 36.テレキネシスの場合、対象がディグダ/ダグトリオ/スナバァ/シロデスナ/メガゲンガー/うちおとす状態/ねをはる状態であることによる失敗
    if ( failureByTK(poke) ) return false
    // 37.マジックミラーによる反射　35との区別はないので35と同じにした(wiki通りではない)
    // 38.特性による無効化(その1)
    if ( invalidByAbility1st(poke) ) return false
    // 39.相性による無効化
    if ( invalidByComp(poke) ) return false
    // 40.ふゆうによるじめん技の無効化
    if ( invalidByLevitate1st(poke) ) return false
    // 41.でんじふゆう/テレキネシス/ふうせんによるじめん技の無効化
    if ( invalidByLevitate2nd(poke) ) return false
    // 42.ぼうじんゴーグルによる粉技の無効化
    if ( invalidByPowderGoggle(poke) ) return false
    // 43.特性による無効化(その2)
    if ( invalidByAbility2nd(poke) ) return false
    // 44.タイプによる技の無効化(その1)
    if ( invalidByType1st(poke) ) return false
    // 45.技の仕様による無効化(その1)
    if ( invalidBySpec1st(poke) ) return false
    // 46.ふしぎなバリアに対し「不思議なバリアに 守られて 技の 影響を 受けない!」のメッセージが出る変化技の無効化
    // 47.技の仕様による無効化(その2)
    if ( invalidBySpec2nd(poke) ) return false
    // 48.タイプによる技の無効化(その2)
    if ( invalidByType2nd(poke) ) return false
    // 49.さわぐ状態によるねむりの無効化
    invalidByUproar(poke)
    // 50.しんぴのまもり状態による無効化
    if ( invalidBySafeguard(poke) ) return false
    // 51.エレキフィールド/ミストフィールド状態による状態異常の無効化
    if ( invalidByTerrain2nd(poke) ) return false
    // 52.みがわり状態によるランク補正を下げる技/デコレーションの無効化
    if ( invalidBySub1st(poke) ) return false
    // 53.しろいきりによるランク補正を下げる技の無効化
    if ( invalidByMist(poke) ) return false
    // 54.特性による無効化(その3)
    if ( invalidByAbility3rd(poke) ) return false
    // 55.命中判定による技の無効化
    if ( invalidByAccuracy(poke) ) return false
    // 56.シャドースチールで対象のランク補正を吸収する
    spectralThief(poke)
    // 57.対応するタイプのジュエルが発動する
    useJuwel(poke)
    // 58.かわらわり/サイコファング/ネコにこばんの効果が発動する
    wallBreak(poke)
    // 59.さわぐによりねむり状態のポケモンが起きる
    // 60.ポルターガイストで対象の持ち物が表示される
    poltergeist(poke)
    // 61.みがわりによるランク補正を変動させる効果以外の無効化
    if ( invalidBySub2nd(poke) ) return false
    // 62.ミラーアーマー: ランクを下げる変化技の反射
    if ( millorArmer(poke) ) return false
    // 63.ほえる/ふきとばしの無効化
    if ( roarWhirlwind(poke) ) return false
    // 64.技の仕様による無効化(その3)
    if ( invalidBySpec3rd(poke) ) return false
    // 65.アロマベール: かなしばり/アンコール/ちょうはつ状態の無効化
    if ( alomaVeilInvalidation(poke) ) return false

    return true
}


// 0.技の決定　その他
function decideMove(poke) {
    // かなしばりのターン消費
    if ( poke.myCondition.myDisable.turn > 0 ) poke.myCondition.myDisable.turn += 1
    // ちょうはつターンの消費
    if ( poke.myCondition.myTaunt ) poke.myCondition.myTaunt += 1
    // アンコールターンの消費
    if ( poke.myCondition.myEncore.turn ) poke.myCondition.myEncore.turn += 1
    // かたやぶり
    if ( poke.myAbility == "かたやぶり" && isAbility(poke) ) poke.myCondition.myMold_breaker = true
}


// 1.フリーフォールで行動順を飛ばされる
function skyDropFailure(poke) {
    // フリーフォールで行動順を飛ばされたときも、反動で動けないターンは消費される
    if ( poke.myCondition.mySky_drop ) {
        writeLog(`${poke.myTN} の ${poke.myName} は 空中で身動きが取れない !`)
        if ( !poke.myCondition.myCant_move ) return true
        return false
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
            if ( !moveList_melt.includes(poke.myMove.name) ) {
                writeLog(`${poke.myTN} の ${poke.myName} は 凍って動けない !`)
                return true
            }
        } else {
            resetAilment(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の こおりが溶けた !`)
        }
    }

    // 3.PPが残っていない
    if ( poke["myRest_pp_" + poke.myCmd_move] == 0 && !poke.myCondition.myFilling.name ) {
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
    if ( poke.myMove.name == "きあいパンチ" && poke.myCondition.myDamage.value && !poke.myCondition.myOne_shot ) {
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
    if ( poke.myCondition.myDisable.name == poke.myMove.name ) { //  && !atk.data.Z
        writeLog(`${poke.myTN} の ${poke.myName} は かなしばりで 技が出せなかった !`)
        return true
    }
    // 8.じゅうりょくで技が出せない
    if ( fieldStatus.myGravity && moveList_disable_gravity.includes(poke.myMove.name) ) {
        writeLog(`${poke.myTN} の ${poke.myName} は じゅうりょくが 強くて ${poke.myMove.name} が 出せない !`)
        return true
    }
    // 9.かいふくふうじで技が出せない (Zワザを除く)
    if ( poke.myCondition.myHeal_block && moveToRecoverHP.includes(poke.myMove.name) ) { //  && !atk.data.Z
        writeLog(`${poke.myTN} の ${poke.myName} は かいふくふうじで 技が出せなかった !`)
        return true
    }
    // 10.じごくづきで音技が出せない (Zワザを除く)
    if ( poke.myCondition.myThroat_chop && moveList_music.includes(poke.myMove.name) ) { //  && !atk.data.Z
        writeLog(`${poke.myTN} の ${poke.myName} は じごくづきの 効果で 技が 出せない !`)
        return true
    }
    // 11.こだわっていない技が出せない (ダイマックスポケモンを除く)
    if ( ( poke.myCondition.myChoice.item && poke.myCondition.myChoice.item != poke.myMove.name ) || 
    ( poke.myCondition.myChoice.ability && poke.myCondition.myChoice.item.ability != poke.myMove.name ) ) { //  && (atk.data.dynaTxt.includes("3") || atk.data.gigaTxt.includes("3"))
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

// 4.ねごと/いびき使用時「ぐうぐう 眠っている」メッセージ

// 5.Zワザの場合はZパワーを送る。Z変化技の場合は付加効果
function ZpowerActivation(poke) {
    // Z技にチェックがなければ何もしない
    if ( !poke.myZmove ) return

    writeLog(`${poke.myTN} の ${poke.myName} は Zパワーを身に纏った !`)

    // 特定のパラメーターが上昇
    const rankZmove = moveList_status_Z.rank.filter( move => move.name == poke.myMove.name )
    if ( rankZmove.length === 1 ) changeMyRank(poke, rankZmove[0].parameter, rankZmove[0].num)
    // 全パラメーターが上昇
    if ( moveList_status_Z.all.includes(poke.myMove.name) ) {
        for ( const para of fiveParameter() ) {
            changeMyRank(poke, para, 1)
        }
    }
    // きゅうしょアップ状態になる
    if ( moveList_status_Z.critical.includes(poke.myMove.name) ) {
        poke.myCondition.myCritical = true
        writeLog(`${poke.myTN} の ${poke.myName} は 張り切り出した !`)
    }
    // 下がった能力を元に戻す
    if ( moveList_status_Z.clear.includes(poke.myMove.name) ) {
        for ( const para of allParameter() ) {
            poke[`myRank_${para}`] = Math.max(0, poke[`myRank_${para}`])
        }
        writeLog(`${poke.myTN} の ${poke.myName} の 下がった能力が元に戻った !`)
    }
    // 自分のHPを全回復
    if ( moveList_status_Z.cure.includes(poke.myMove.name) ) {
        changeHP(poke, poke.myFull_hp, "+")
    }
    // のろい
    if ( poke.myMove.name == "のろい" ) {
        if ( poke.myType.includes("ゴースト") ) {
            changeHP(poke, poke.myFull_hp, "+")
        } else {
            changeMyRank(poke, "atk", 1)
        }
    }
}

// 6.他の技が出る技により技を置き換え、(3-9~11)の行程を繰り返す
    // オウムがえし/さきどりのコピーできない技だった場合は失敗
    // ねごとで出せる技が無いときは失敗
function moveReplace(poke) {
    const moveName = getNextMove(poke)
    // 他の技が出る技ではない時
    if ( moveName === null ) return false

    // 9.「<ポケモン>の <技>!」のメッセージ。PPが減少することが確約される
    attackDeclaration(poke)
    // 10.わざのタイプが変わる。1→2→3の順にタイプが変わる
    moveTypeChange(poke)
    // 11.技の対象が決まる。若い番号の対象が優先される
    // 12.PPが適切な量引かれる (プレッシャーの効果が考慮される)
    PPDecrease(poke)

    // 他の技が出た時
    if ( moveName ) {
        poke.myMove.success = true
        const orgMoveName = poke.myMove.name
        poke.myCondition.myHistory.unshift(poke.myMove)
        const move = moveConfig(poke, moveSearchByName(moveName))
        poke.myMove = Object.assign({}, move)

        // 8.じゅうりょくで技が出せない
        if ( fieldStatus.myGravity && moveList_disable_gravity.includes(poke.myMove.name) ) {
            writeLog(`${poke.myTN} の ${poke.myName} は じゅうりょくが 強くて ${poke.myMove.name} が 出せない !`)
            return true
        }
        // 9.かいふくふうじで技が出せない (Zワザを除く)
        if ( poke.myCondition.myHeal_block && moveToRecoverHP.includes(poke.myMove.name) ) { //  && !atk.data.Z
            writeLog(`${poke.myTN} の ${poke.myName} は かいふくふうじで 技が出せなかった !`)
            return true
        }
        // 10.じごくづきで音技が出せない (Zワザを除く)
        if ( poke.myCondition.myThroat_chop && moveList_music.includes(poke.myMove.name) ) { //  && !atk.data.Z
            writeLog(`${poke.myTN} の ${poke.myName} は じごくづきの 効果で 技が 出せない !`)
            return true
        }

        poke.myCondition.myOther_move = orgMoveName
        writeLog(`${orgMoveName} で ${poke.myMove.name} が 出た !`)
    } else {
        poke.myMove.success = false
        writeLog(`しかし うまく決まらなかった....`)
        return true
    }
}

// 7.自分のこおりを回復するわざにより自身のこおり状態が治る
function selfMeltCheck(poke) {
    if ( poke.myAilment == "こおり" && moveList_melt.includes(poke.myMove.name) ) {
        writeLog(`${poke.myMove.name} でこおりがとけた !`)
        resetAilment(poke)
    }
}

// 8.特性バトルスイッチによるフォルムチェンジ
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

// 9.「<ポケモン>の <技>!」のメッセージ。PPが減少することが確約される
// 減らされるのは12
function attackDeclaration(poke) {

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

    switch ( poke.myMove.name ) {
        case "れんぞくぎり":
            poke.myCondition.myFury_cutter += 1
            break

        case "アイスボール":
        case "ころがる":
            poke.myCondition.myRollout.turn += 1
            if ( !poke.myCondition.myRollout.tgt ) poke.myCondition.myRollout.tgt = poke.myCmd_tgt
            break
    }

    // Zワザは一度しか使用できない
    if ( poke.myZmove ) getMyField(poke).myZmove = true

    // 特性『おどりこ』
    if ( moveList_dancer.includes(poke.myMove.name) ) fieldStatus.myDancer = poke.myMove.name

    // 行動したことを記録
    poke.myCondition.myActivate = true
}



// 10.わざのタイプが変わる。1→2→3の順にタイプが変わる
function moveTypeChange(poke) {
    // 1.技のタイプを変える特性の効果
    if ( !moveList_changeType.includes(poke.myMove.name) && isAbility(poke) ) {
        switch ( poke.myAbility ) {
            case "うるおいボイス":
                if ( !moveList_music.includes(poke.myMove.name) ) break
                poke.myMove.type = "みず"
                break

            case "エレキスキン":
                if ( poke.myMove.type != "ノーマル" ) break
                poke.myMove.type = "でんき"
                poke.myCondition.mySkin = true
                break

            case "スカイスキン":
                if ( poke.myMove.type != "ノーマル" ) break
                poke.myMove.type = "ひこう"
                poke.myCondition.mySkin = true
                break

            case "ノーマルスキン":
                if ( poke.myMove.type == "ノーマル" ) break
                poke.myMove.type = "ノーマル"
                poke.myCondition.mySkin = true
                break

            case "フェアリースキン":
                if ( poke.myMove.type != "ノーマル" ) break
                poke.myMove.type = "フェアリー"
                poke.myCondition.mySkin = true
                break

            case "フリーズスキン":
                if ( poke.myMove.type != "ノーマル" ) break
                poke.myMove.type = "こおり"
                poke.myCondition.mySkin = true
                break
        }
    }
    // 2.タイプが変わるわざの効果
    switch ( poke.myMove.name ) {
        case "ウェザーボール":
            if ( isSunny(poke) ) poke.myMove.type = "ほのお"
            if ( isRainy(poke) ) poke.myMove.type = "みず"
            if ( isSandy(poke) ) poke.myMove.type = "いわ"
            if ( isSnowy(poke) ) poke.myMove.type = "こおり"
            break

        case "オーラぐるま":
            if ( !poke.myCondition.myHunger_switch ) break
            poke.myMove.type = "あく"
            break

        case "さばきのつぶて":
            if ( !isItem(poke) ) break
            for ( const plate of itemList_plate ) {
                if ( poke.myItem == plate.name ) {
                    poke.myMove.type = plate.type
                }
            }
            break

        case "しぜんのめぐみ":
            if ( !isItem(poke) ) break
            for ( const element of naturalGift ) {
                if ( poke.myItem == element.item ) {
                    poke.myMove.type = element.type
                    writeLog(`${poke.muItem} を 力に変えた`)
                }
            }
            break

        case "だいちのはどう":
            if ( !onGround(poke) ) break
            if ( fieldStatus.myElectric ) poke.myMove.type = "でんき"
            if ( fieldStatus.myGrassy )   poke.myMove.type = "くさ"
            if ( fieldStatus.myMisty )    poke.myMove.type = "フェアリー"
            if ( fieldStatus.myPsychic )  poke.myMove.type = "エスパー"
            break

        case "テクノバスター":
            if ( !isItem(poke) ) break
            if ( poke.myItem == "アクアカセット" ) poke.myMove.type = "みず"
            if ( poke.myItem == "イナズマカセット" ) poke.myMove.type = "でんき"
            if ( poke.myItem == "ブレイズカセット" ) poke.myMove.type = "ほのお"
            if ( poke.myItem == "フリーズカセット" ) poke.myMove.type = "こおり"
            break

        case "マルチアタック":
            if ( !isItem(poke) ) break
            for ( const memory of itemList_memory ) {
                if ( poke.myItem == memory.name ) {
                    poke.myMove.type = memory.type
                }
            }
            break

        case "めざめるダンス":
            poke.myMove.type = poke.myType[0]
            break
        
        case "めざめるパワー":
            break

    }
    // 3.そうでん/プラズマシャワー状態
    if ( poke.myCondition.myElectrify && poke.myMove.name != "わるあがき")  poke.myMove.type = "でんき"
    if ( fieldStatus.myIon_deluge && poke.myMove.type == "ノーマル" ) poke.myMove.type = "でんき"
}

// 11.技の対象が決まる。若い番号の対象が優先される
function decideTarget(poke) {
    const target = isTarget(poke)
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
    // 技の優先度の決定
    poke.myMove.priority = priorityDegree(poke)
    // 連続回数の決定
    poke.myMove.continuous = getContinuous(poke)
}

// 12.PPが適切な量引かれる (プレッシャーの効果が考慮される)
function PPDecrease(poke) {
    // 以下の場合はPPが減らない
    if ( poke.myCondition.myThrash.name )       return // あばれる状態
    if ( poke.myCondition.myFilling.name )      return // ため技を放つ時
    if ( poke.myCondition.myRollout.turn >= 2 ) return // ころがる/アイスボールの2回目以降
    if ( poke.myCondition.myBide.turn >= 2 )    return // がまんの2ターン目と放つ時

    const PP = poke[`myRest_pp_${poke.myCmd_move}`]
    let count = 1

    for ( const tgt of poke.myTarget ) {
        if ( !isAbility(tgt.poke) ) continue
        if ( tgt.poke.myAbility != "プレッシャー" ) continue
        if ( tgt.poke.myParty == poke.myParty ) continue
        count += 1
    }

    if ( poke.myMove.target == "全体の場" || poke.myMove.target == "相手の場" ) {
        for ( const tgt of oppPokeInBattle(poke) ) {
            if ( !isAbility(tgt) ) continue
            if ( tgt.myAbility != "プレッシャー" ) continue
            if ( tgt.myParty == poke.myParty ) continue
            count += 1
        }
    }

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
    */
}

// 13.こだわり系アイテム/ごりむちゅうで技が固定される
function commitmentRock(poke) {
    // 以下の状況ではこだわらない
    if ( poke.myCondition.myChoice )  return // すでにこだわっている時
    if ( poke.myCondition.myDynamax ) return // ダイマックス状態
    // こだわる
    if ( isItem(poke) && !poke.myCondition.myChoice.item ) {
        switch ( poke.myItem ) {
            case "こだわりハチマキ":
            case "こだわりメガネ":
            case "こだわりスカーフ":
                // 他の技が出る技の時、元の技でこだわる
                const move = ( poke.myCondition.myOther_move )? poke.myCondition.myOther_move : poke.myMove.name
                poke.myCondition.myChoice.item = move
        }
    }
    if ( isAbility(poke) && !poke.myCondition.myChoice.ability ) {
        switch ( poke.myAbility ) {
            case "ごりむちゅう":
                // 他の技が出る技の時、元の技でこだわる
                const move = ( poke.myCondition.myOther_move )? poke.myCondition.myOther_move : poke.myMove.name
                poke.myCondition.myChoice.ability = move
        }
    }
}

// 14.ほのおタイプではないことによるもえつきるの失敗
function burnUpFailure(poke) {
    if ( poke.myMove.name != "もえつきる" ) return false
    if ( poke.myType.includes("ほのお") ) return false

    writeLog(`しかし うまく決まらなかった....`)
    return true
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
    return false
}

// 16.ふんじんによるほのお技の失敗とダメージ
function powderFailure(poke) {
    if ( poke.myCondition.myPowder && poke.myMove.type == "ほのお" ) {
        writeLog(`しかし ふんじんで 技が失敗した !`)
        const damage = Math.round(poke.myFull_hp / 4 * isDynamax(poke))
        changeHP(poke, damage, "-")
        return true
    } else {
        return false
    }
}

// 17.ミクルのみによる命中補正効果が消費される

// 18.技の仕様による失敗
function failureBySpec(poke) {
    if ( failureBySpec_spec(poke) ) {
        writeLog(`しかし うまく決まらなかった....`)
        return true
    }
    return false
}

// 19.マックスレイドバトルでの失敗

// 20.特性による失敗
function failureByAbility(poke) {
    if ( failureByAbility_ability(poke) ) {
        writeLog(`しかし うまく決まらなかった....`)
        return true
    } else {
        return false
    }
}

// 21.中断されても効果が発動する技
function remainEffectMove(poke) {
    switch ( poke.myMove.name ) {
        case "みらいよち":
        case "はめつのねがい":
            const futureSight = {
                id: poke.myID, 
                party: null, 
                position: null, 
                turn: 1
            }
            // 自分の場に攻撃する時
            if ( poke.myCmd_tgt == 0 || poke.myCmd_tgt == 1 ) {
                futureSight.party = getMyField(poke).myParty
                futureSight.position = poke.myCmd_tgt
            }
            // 相手の場に攻撃する時
            if ( poke.myCmd_tgt == 2 || poke.myCmd_tgt == 3 ) {
                futureSight.party = getOppField(poke).myParty
                futureSight.position = poke.myCmd_tgt - 2
            }
            fieldStatus.myFuture_sight.push(futureSight)
            // 相手をみらいにこうげき状態にし、行動を終了する
            writeLog(`${poke.myTN} の ${poke.myName} は 未来に攻撃を予知した !`)
            return true

        // 誓い技: コンビネーションわざのセッターである場合、現在の行動は失敗し味方の行動順を引き上げる(リストは1から)
        case "くさのちかい":
        case "ほのおのちかい":
        case "みずのちかい":
            break
        
        case "りんしょう":
            // 行動後、味方のりんしょうによる行動順を引き上げる
            break

        case "エコーボイス":
            if ( fieldStatus.myEchoed_check ) break
            fieldStatus.myEchoed_voice += 1
            fieldStatus.myEchoed_check = true // 次のターンのエコーボイスの威力が上がる
            break
        
        case "いかり":
            poke.myCondition.myRage = true // いかり状態になる
            break
        }
}

// 22.へんげんじざい/リベロの発動
function proteanLibero(poke) {
    if ( !isAbility(poke) ) return
    if ( poke.myMove.type == poke.myType[0] && poke.myType.length == 1 ) return
    if ( poke.myAbility == "へんげんじざい" || poke.myAbility == "リベロ" ) {
        poke.myType = [poke.myMove.type]
        abilityDeclaration(poke)
        writeLog(`${poke.myName} は ${poke.myMove.type} タイプに変わった !`)
    }
}

// 23.溜め技の溜めターンでの動作
function accumulateOperation(poke) {
    if ( !accumulationMove.includes(poke.myMove.name) ) return
    
    //行動ターン
    if ( poke.myCondition.myFilling.name ) { 
        resetFilling(poke)
        if ( poke.myMove.name == "フリーフォール" ) {
            if ( !poke.myTarget ) return false
            const tgt = poke.myTarget[0].poke
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
        if ( !poke.myTarget ) return false
        const tgt = poke.myTarget[0]
        // 1.対象が姿を隠していることによる失敗
        if ( isHide(tgt.poke) ) {
            writeLog(`しかし うまく決まらなかった....`)
            return true
        }
        // 2.対象がみがわり状態であることによる失敗
        if ( tgt.poke.myCondition.mySubstitute ) {
            writeLog(`しかし うまく決まらなかった....`)
            return true
        }
        // 3.対象のおもさが200.0kg以上あることによる失敗
        if ( isWeight(tgt.poke) >= 200 ) {
            writeLog(`しかし うまく決まらなかった....`)
            return true
        }
        // 4.相手を空中に連れ去る
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} を 空へ連れ去った !`)
        poke.myCondition.myFilling.name = poke.myMove.name
        poke.myCondition.myFilling.tgt  = poke.myCmd_tgt
        poke.myCondition.mySky          = true
        tgt.poke.myCondition.mySky_drop = true
        // 対象の注目の的状態を解除
        getMyField(tgt.poke).mySpotlight = getMyField(tgt.poke).mySpotlight.filter( spot => spot.position != tgt.poke.myPosition )
        return true
    }
    
    // フリーフォール以外

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
    if ( ( poke.myMove.name == "ソーラービーム" || poke.myMove.name == "ソーラーブレード" ) && isSunny(poke) ) {
        resetFilling(poke)
        return false
    }
    if ( poke.myItem == "パワフルハーブ" && isItem(poke) ) {
        writeLog(`${poke.myName} は パワフルハーブで 力がみなぎった !`)
        resetFilling(poke)
        enableToRecycle(poke)
        return false
    }

    poke.myCondition.myFilling.name = poke.myMove.name
    poke.myCondition.myFilling.tgt  = poke.myCmd_tgt

    return true
}

// 24.待機中のよこどりで技が盗まれる。技を奪ったポケモンは3-9~11の行程を繰り返す
    /*
    if (def.con.p_con.includes("よこどり") && moveEff.snatch().includes( poke.myMove.name)) {
        removeText(def.con, "よこどり")
        writeLog(me, you, def.con.TN + "　の　" + def.poke.myName + "に　技を横取りされた!" + "\n")
        atk = order[0]
        def = order[1]

        // 10.わざのタイプが変わる。1→2→3の順にタイプが変わる
        moveTypeChange(me, you, con, move)
        // 45.技の仕様による無効化(その1)
        if (invalidBySpec1st(me, you, con, move)) {return true}
        // 47.技の仕様による無効化(その2)
        if (invalidBySpec2nd(me, you, con, move)) {return true}
        // 64.技の仕様による無効化(その3)
        if (invalidBySpec3rd(me, you, con, move)) {return true}

        process.moveProcess(me, you, con, move)

        return true
    }
    */

// 25.だいばくはつ/じばく/ミストバーストによるHP消費が確約される
function promiseToChangeHP(poke) {
    switch ( poke.myMove.name ) {
        case "じばく":
        case "だいばくはつ":
        case "ミストバースト":
            poke.myCondition.myExplosion = "full"
            break
    }
}

// 26.対象のポケモンが全員すでにひんしになっていて場にいないことによる失敗
function faintedFailure(poke) {
    if ( poke.myMove.target.includes("場") ) return false

    if ( !poke.myTarget ) {
        if ( poke.myCondition.myExplosion ) return false
        if ( poke.myMove.name == "しぜんのめぐみ" ) enableToRecycle(poke)
        writeLog(`しかし うまく決まらなかった....`)
        return true
    }
}

// 27.ビックリヘッド/てっていこうせん使用によるHP消費が確約される
function mindblownStealbeam(poke) {
    switch ( poke.myMove.name ) {
        case "ビックリヘッド":
        case "てっていこうせん":
            poke.myCondition.myExplosion = "half"
            break
    }
}

// 28.マグニチュードの大きさ（威力）が決定
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
function invalidByHide(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue

        // 姿を隠していることによる無効化
        if ( invalidByHide_hide(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 当たらなかった !`)
        }  
    }

    return checkMoveSuccess(poke)
}

// 30.サイコフィールドによる無効化
function invalidByTerrain1st(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( invalidByTerrain1st_psychic(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.name} は サイコフィールドに 守られている !`)
            continue
        }
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
            getMyField(_poke).myMat_block     = false // たたみがえし
            getMyField(_poke).myWide_guard    = false // ワイドガード
            getMyField(_poke).myQuick_guard   = false // ファストガード
            getMyField(_poke).myCrafty_shield = false // トリックガード
        }
    }
}

// 31.ファストガード/ワイドガード/トリックガードによる無効化 (Zワザ/ダイマックスわざならダメージを75%カットする)
function invalidByProtect1st(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // ファストガード
        if ( invalidByProtect1st_quick(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ファストガードに 守られている !`)
            continue
        }
        // ワイドガード
        if ( invalidByProtect1st_wide(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ワイドガードに 守られている !`)
            continue
        }
        // トリックガード
        if ( invalidByProtect1st_crafty(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は トリックガードに 守られている !`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 32.まもる/キングシールド/ブロッキング/ニードルガード/トーチカによる無効化 (Zワザ/ダイマックスわざなら75%をカットする)
function invalidByProtect2nd(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( invalidByProtect2nd_protect(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 攻撃を守った !`)

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
function invalidByMatBlock(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( invalidByMatBlock_matBlock(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myName} は たたみがえし で攻撃から 身を守った !`)
            continue
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
function failureByTK(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( failureByTK_TK(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.name} には　効果がないようだ....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 37.マジックミラーによる反射

// 38.特性による無効化(その1)
function invalidByAbility1st(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 特性による無効化
        if ( invalidByAbility1st_ability(poke, tgt) ) {
            tgt.success = false
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            invalidByAbility1st_ability_effect(poke, tgt)
            continue
        }        
    }

    return checkMoveSuccess(poke)
}

// 39.相性による無効化
function invalidByComp(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if( invalidByComp_comp(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 40.ふゆうによるじめん技の無効化
function invalidByLevitate1st(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( invalidByLevitate1st_levitate(poke, tgt) ) {
            tgt.success = false
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 41.でんじふゆう/テレキネシス/ふうせんによるじめん技の無効化
function invalidByLevitate2nd(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( invalidByLevitate2nd_other(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 42.ぼうじんゴーグルによる粉技の無効化
function invalidByPowderGoggle(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( invalidByPowderGoggle_powderGoggle(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ぼうじんゴーグルで ${poke.myMove.name} を 受けない !`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 43.特性による無効化(その2)
function invalidByAbility2nd(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 特性による無効化
        if ( invalidByAbility2nd_ability(poke, tgt) ) {
            tgt.success = false
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 44.タイプによる技の無効化(その1)
function invalidByType1st(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // タイプによる無効化
        if ( invalidByType1st_type(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 45.技の仕様による無効化(その1)
function invalidBySpec1st(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 技の使用による無効化
        if ( invalidBySpec1st_spec(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 46.ふしぎなバリアに対し「不思議なバリアに 守られて 技の 影響を 受けない!」のメッセージが出る変化技の無効化
// ランクを下げる技/デコレーション/いばる/おだてる/タールショット
// 状態異常にする技/こんらんにする技/あくび/いちゃもん/メロメロ/やどりぎのタネ/さきおくり

// 47.技の仕様による無効化(その2)
function invalidBySpec2nd(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 重複による無効化
        if ( invalidBySpec2nd_duplicate(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }

        // ランク補正に関する無効化
        if ( invalidBySpec2nd_rank(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }

        // その他の無効化
        if ( invalidBySpec2nd_other(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 48.タイプによる技の無効化(その2)
function invalidByType2nd(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // タイプによる無効化
        if ( invalidByType2nd_type(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 49.さわぐ状態によるねむりの無効化
function invalidByUproar(poke) {
    // 騒ぎ始めた時、眠っているポケモンは目を覚ます
    for ( const _poke of allPokeInBattle() ) {
        if ( poke.myMove.name != "さわぐ" ) break
        if ( poke.myCondition.myUproar ) break
        if ( _poke.myAilment != "ねむり" ) continue
        resetAilment(_poke)
        writeLog(`${_poke.myTN} の ${_poke.myName} は 騒がしくて 目を覚ました !`)
    }
    
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( invalidByUproar_uproar(poke, tgt) ) {
            tgt.success = false
            writeLog(`${isUproar().myTN} の ${isUproar().myName} が 騒いでいて うまく決まらなかった....`)
            break
        }
    }

    return checkMoveSuccess(poke)
}

// 50.しんぴのまもり状態による無効化
function invalidBySafeguard(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( invalidBySafeguard_safeguard(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は しんぴのまもりに 守られている !`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 51.エレキフィールド/ミストフィールド状態による状態異常の無効化
function invalidByTerrain2nd(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        
        // エレキフィールドはねむけ状態も防ぐ
        if ( invalidByTerrain2nd_electric(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は エレキフィールドに守られている !`)
            continue
        }
        // ミストフィールドはねむけ状態を防がない
        if ( invalidByTerrain2nd_misty(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ミストフィールドに守られている !`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 52.みがわり状態によるランク補正を下げる技/デコレーションの無効化
function invalidBySub1st(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( invalidBySub1st_rank(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には うまく決まらなかった....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 53.しろいきりによるランク補正を下げる技の無効化
function invalidByMist(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( invalidByMist_mist(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は しろいきりで能力が下がらない !`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}


// 54.特性による無効化(その3)
function invalidByAbility3rd(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // フラワーベール　ランクを下げられない　状態異常・ねむけ状態にならない
        if ( invalidByAbility3rd_flower(poke, tgt) ) {
            tgt.success = false
            abilityDeclaration(isFlowerVeil(tgt.poke))
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
        // スイートベール　ねむり・ねむけ状態にならない
        if ( invalidByAbility3rd_sweet(poke, tgt) ) {
            tgt.success = false
            abilityDeclaration(isSweetVeil(tgt.poke))
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
        // アロマベール
        if ( invalidByAbility3rd_aloma(poke, tgt) ) {
            tgt.success = false
            abilityDeclaration(isAlomaVeil(tgt.poke))
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }

        // 上記以外の特性による無効化
        if ( !isAbility(tgt.poke) ) continue

        if ( invalidByAbility3rd_other(poke, tgt) ) {
            tgt.success = false
            abilityDeclaration(tgt.poke)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 55.命中判定による技の無効化
function invalidByAccuracy(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( invalidByAccuracy_accuracy(poke, tgt.poke) ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 当たらなかった....`)
            tgt.success = false

            // 空振り保険
            if ( !isItem(poke) ) continue
            if ( poke.myItem != "からぶりほけん" ) continue
            if ( !moveList_oneShot.includes(poke.myMove.name) ) continue
            if ( poke.myRank_speed == 6 ) continue

            itemDeclaration(poke)
            changeMyRank(poke, "speed", 2)
            enableToRecycle(poke)

            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 56.シャドースチールで対象のランク補正を吸収する
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

// 57.対応するタイプのジュエルが発動する
function useJuwel(poke) {
    if ( poke.myMove.name == "くさのちかい" ) return false
    if ( poke.myMove.name == "ほのおのちかい" ) return false
    if ( poke.myMove.name == "みずのちかい" ) return false
    if ( moveList_oneShot.includes(poke.myMove.name) ) return false
    if ( poke.myMove.nature == "変化" ) return false
    if ( !isItem(poke) ) return false

    for ( const gem of itemList_gem ) {
        if ( gem.name != poke.myItem ) continue
        if ( gem.type != poke.myMove.type ) continue
        writeLog(`${poke.myItem} が 技の威力を高めた !`)
        enableToRecycle(poke)
        poke.myCondition.myGem = true
    } 
}

// 58.かわらわり/サイコファング/ネコにこばんの効果が発動する
function wallBreak(poke) {
    if ( poke.myMove.name == "かわらわり" || poke.myMove.name == "サイコファング" ) {

        for ( const tgt of poke.myTarget ) {
            if ( !tgt.success ) continue // すでに失敗していないこと
            const field = getMyField(tgt.poke)
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

// 60.ポルターガイストで対象の持ち物が表示される
function poltergeist(poke) {
    if ( poke.myMove.name == "ポルターガイスト" ) {

        for ( const tgt of poke.myTarget ) {
            if ( !tgt.success ) continue // すでに失敗していないこと
            writeLog(`${tgt.poke.myName} に ${tgt.poke.myItem} が 襲いかかる !`)
        }
    }
}

// 61.みがわりによるランク補正を変動させる効果以外の無効化
function invalidBySub2nd(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( invalidBySub2nd_other(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
    }

    return checkMoveSuccess(poke)
}

// 62.ミラーアーマー: ランクを下げる変化技の反射
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

// 63.ほえる/ふきとばしの無効化
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

// 64.技の仕様による無効化(その3)
function invalidBySpec3rd(poke) {
    // 対象が場でない技
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 特性に関する無効化
        if ( invalidBySpec3rd_ability(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には 効果がないようだ....`)
            continue
        }
        // HPが満タンによる無効化
        if ( invalidBySpec3rd_fullHP(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は HPが満タンだった`)
            continue
        }
        // ステータスに関する無効化
        if ( invalidBySpec3rd_status(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には うまく決まらなかった....`)
            continue
        }
        // タイプによる無効化
        if ( invalidBySpec3rd_type(poke, tgt) ) {
            tgt.success = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} には うまく決まらなかった....`)
            continue
        }
        // 特殊なメッセージが出る技の失敗
        if ( invalidBySpec3rd_msg(poke, tgt) ) {
            tgt.success = false
            if ( checkMoveSuccess(poke) ) writeLog(`しかし うまく決まらなかった....`)
        }
        // 重複による無効化
        if ( invalidBySpec3rd_duplicate(poke, tgt) ) {
            tgt.success = false
            writeLog(`しかし うまく決まらなかった....`)
            continue
        }
        // その他の無効化
        if ( invalidBySpec3rd_other(poke, tgt) ) {
            tgt.success = false
            writeLog(`しかし うまく決まらなかった....`)
            continue
        }
    }


    // 対象が場である技
    if ( invalidBySpec3rd_field(poke) ) {
        poke.myMove.success = false
        writeLog(`しかし うまく決まらなかった....`)
        return true
    }

    return checkMoveSuccess(poke) 
}

// 65.アロマベール: かなしばり/アンコール/ちょうはつ状態の無効化
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