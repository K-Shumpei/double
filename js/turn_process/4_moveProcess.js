// 追加効果の処理順

// 自分以外全員・相手全員を対象にする範囲攻撃技は、1は敵味方同時に、2~11は味方のポケモンに対する処理を行ってから敵のポケモンの処理を、防御側から見て左側のポケモンから行う(味方2-1~2-9→使用者3→味方4→...→味方11→敵の左側2-1~2-9→右側2-1~2-9→左側3→右側3→...右側11の順)。
// トリプルバトル・群れバトルで相手の場に3匹以上のポケモンが並んでいる場合も、防御側から見て左側のポケモンから処理される。

function moveEffect(poke){
    if ( poke.myMove.nature == "変化" ) {
        statusMoveEffect(poke)
    } else {
        // 1.対象全員へのダメージ計算
        isDamage(poke)
        // 2.みがわり状態に攻撃技が防がれたときの効果: 本体がダメージを受けたときの処理(4~9)などより優先される
        substituteBlock(poke)
        // 3.ひんしになる反動技使用時のダメージ: ひんしになるときは使用者のひんし判定
        dyingDamage(poke)
        // 4.ダメージを本体に与える
        giveDamage(poke)
        // 5.相性判定のメッセージ
        declareEffectiveness(poke)
        // 6.ダメージの判定に関するメッセージ
        damageMassage(poke)
        // 7.ダメージをHP1で耐える効果
        remainHP1(poke)
        // 8.追加効果などの発動
        activateAdditionalEffectEtc(poke)
        // 9.ダメージが発生したときの効果
        effectWithDamage(poke)
    }
    // 10.ひんし判定
    dyingJudge(poke)
    // 11.ひんしできんちょうかん/かがくへんかガスが解除されたことによる封じられていた効果の発動(おわりのだいち、はじまりのうみの解除 wikiにない)
    // コアパニッシャーによりとくせいなし状態にされたときは即座に封じられていた効果が発動する。
    // 12.連続攻撃技である場合、以下の処理を行う(おやこあいも含む)。
    continuousMove(poke)
    // 13.HP20%以下(赤ゲージ)になったとき、なかよし度4以上で「ピンチで なきそう...」のメッセージ
    // 14.技の効果
    activateMoveEffect(poke)
    // 15.特性の効果
    abilityEffect(poke)
    // 16.防御側のもちものの効果
    defenseItemEffect(poke)
    // 17.コンビネーションわざの効果
    // 18.いにしえのうた/きずなへんげによるフォルムチェンジ
    formChangeAbility(poke)
    // 19.いのちのたまの反動/かいがらのすずの回復
    lifeorbShellbell(poke)
    // 20.オボンのみなど回復のきのみ/チイラのみ/リュガのみ/ヤタピのみ/ズアのみ/カムラのみ/サンのみ/スターのみ/ミクルのみ/きのみジュース
    recoverBerry(poke)
    // 21.ききかいひ/にげごしによって手持ちに戻るまで
    emergencyExit(poke)
    // 22.とんぼがえり/ボルトチェンジ/クイックターンによって手持ちに戻るまで
    comeBackMove(poke)
    // 23.アイアンローラーによるフィールドの消失
    steelRoller(poke) 
    // 24.レッドカードによる交代先の繰り出し
    redCard(poke)
    // 25.わるいてぐせ
    pickPocket(poke)
    // 26.一部の技の効果
    someMoveEffect(poke)
    // 27.一部の持ち物の効果
    someItemEffect(poke)
    // 28.きょうせい
    // 1第六世代では道具の消費直後に発動する。
    // 29.とんぼがえり/ボルトチェンジ/クイックターン/ききかいひ/にげごし/だっしゅつボタン/だっしゅつパックによる交代先の選択・交代
    returnBattle(poke)
    if ( fieldStatus.mySwitch_me ) return
    if ( fieldStatus.mySwitch_opp ) return
    // ドラゴンテール/ともえなげは発動直後に強制交代される
    // おどりこ
    // 次のポケモンの行動
    // 8.9.の効果で攻撃側のポケモンがひんしになる場合、10.で防御側が倒れた後に攻撃側が倒れるため、相打ち時は攻撃側の勝ちとなる。
    // 14.以降の反動ダメージで攻撃側がひんしになった場合、攻撃側の勝ちとなる。


    // かたやぶりなどの特性無視終了？
    moldBreakStop(poke)
}


// 1.ダメージ計算
function isDamage(poke){
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 対象のばけのかわ/アイスフェイスが発動する場合、計算は行われずダメージは0になる。発動したときのメッセージは(10-11)で流れる。
        if ( !tgt.substitute ) {
            // ばけのかわ
            if ( tgt.poke.myAbility == "ばけのかわ" && isAbility(tgt.poke) && tgt.poke.myDisguise == "ばけたすがた" ) {
                // tgt.p_con += "特性『ばけのかわ』" + "\n"
                tgt.damage = 0
                continue
            }
            // アイスフェイス
            if ( tgt.poke.myAbility == "アイスフェイス" && isAbility(tgt.poke) && tgt.poke.myIce_face == "アイスフェイス" && poke.myMove.nature == "物理" ){
                // tgt.p_con += "特性『アイスフェイス』" + "\n"
                tgt.damage = 0
                continue
            }
        }

        // ダメージ計算
        damageCalculation(poke, tgt)

        // ダメージ計算が行われた場合、以下の順に処理が行われる。
        // 1.計算結果が0になったとき、1になる。
        tgt.damage = Math.max(tgt.damage, 1)
        // 2.ダメージが65536以上のとき、65536で割った余りが代わりのダメージになる。
        tgt.damage = tgt.damage % 65536
        // 3.ダメージが対象のHP残量より大きい場合、HP残量と同じになるようにダメージを切り捨てる。みがわり状態に防がれる場合は、みがわりのHP残量まで切り捨てる。
        tgt.damage = Math.min(tgt.damage, tgt.poke.myRest_hp)
        if ( tgt.substitute ){
            tgt.damage = Math.min(tgt.damage, tgt.poke.myCondition.mySubstitute )
        }
        // 4.みがわりに防がれずに「ダメージをHP1で耐える効果」が発動する場合、ダメージから1を引く。発動したときのメッセージは(7)で流れる。
        if ( !tgt.substitute && tgt.damage == tgt.poke.myRest_hp ) {
            // ダメージをHP1で食いしばる場合、以下の優先順位で発動する。
            // 1.こらえる
            if ( tgt.poke.myCondition.myEndure ) {
                tgt.poke.myCondition.myRemaining_HP1 = "こらえる"
                tgt.damage -= 1
                continue
            }
            // 2.てかげん、みねうちの時(wikiにない)
            if ( poke.myMove.name == "てかげん" || poke.myMove.name == "みねうち" ) {
                tgt.damage -= 1
                continue
            }
            // 3.がんじょう
            if ( tgt.poke.myAbility == "がんじょう" && isAbility(tgt.poke) ) {
                tgt.poke.myCondition.myRemaining_HP1 =  "がんじょう"
                tgt.damage -= 1
                continue
            }
            // 4.きあいのタスキ/きあいのハチマキ
            if ( tgt.poke.item == "きあいのタスキ" && isItem(tgt.poke) && poke.myRest_hp == poke.myFull_hp ) {
                tgt.poke.myCondition.myRemaining_HP1 = "きあいのタスキ"
                tgt.damage -= 1
                enableToRecycle(tgt.poke)
                continue
            }
            if ( tgt.poke.item == "きあいのハチマキ" && isItem(tgt.poke) && getRandom() < 0.1 ) {
                tgt.poke.myCondition.myRemaining_HP1 = "きあいのハチマキ"
                tgt.damage -= 1
                continue
            }
        }
        //この時点で与えるダメージが確定する。実際にダメージを与えるタイミングは、みがわりに与えるときは2、本体に与えるときは4となる。
    }
    // 連続攻撃の場合、ダメージの蓄積
    /*
    for (const tgt of con.tgt){
        if (tgt.result == "失敗") continue
        if (move.num > 0) move.damage += tgt.damage.done
    }
    */
}

// 2.みがわり状態に攻撃技が防がれたときの効果: 本体がダメージを受けたときの処理(4~9)などより優先される
function substituteBlock(poke){
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )    continue // すでに失敗していないこと
        if ( !tgt.substitute ) continue // みがわりが有効であること
        
        // 0.ダメージの記録
        tgt.poke.myCondition.mySubstitute -= tgt.damage
        // 1.「<対象>に かわって 身代わりが 攻撃を 受けた!」
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に かわって 身代わりが 攻撃を 受けた !`)
        // 2.みがわりに対する相性: 複数が対象の技がみがわりに防がれても同じメッセージ
        if ( tgt.effective > 1 ) writeLog(`効果は バツグンだ !`)
        if ( tgt.effective < 1 ) writeLog(`効果は 今ひとつのようだ......`)
        // 3.みがわりに対する急所: 「急所に 当たった!」
        if ( tgt.critical ) writeLog(`急所に 当たった !`)
        // 4.Zワザ/ダイマックスわざをまもる状態などで軽減したときのメッセージ
        // 5.みがわりの消滅:「<対象>の 身代わりは 消えてしまった...」
        if ( !tgt.poke.myCondition.mySubstitute ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 身代わりは 消えてしまった..."`)
        // 6.みがわりに防がれても発動する技の効果
        /*
            // 自分のランクを上げる追加効果
            for (const line of additionalEffectToChangeMyRank){
                if (poke.myMove.name == line[0]){
                    if (poke.myAbility == "ちからずく" && isAbility(poke)) break
                    if (getRandom() * 100 >= line[1] * isGrace(poke)) break
                    for (const para of line.slice(2)){
                        changeMyRank(me, you, con, para[0], para[1])
                    }
                }
            }
            // 自分のランクが下がる反動
            for (const line of downMyRank){
                if (poke.myMove.name == line[0] && poke.myMove.name != "スケイルショット"){
                    for (const para of line.slice(1)){
                        changeMyRank(me, you, con, para[0], para[1])
                    }
                }
            }
            // HP吸収技の吸収効果/ヘドロえきのダメージ効果
            for (const line of recoverMyHP){
                if (poke.myMove.name == line[0]){
                    const change = fiveCut(Math.round(tgt.damage.give * line[1]) * isBig_root(poke))
                    changeHP(me, you, con, change, isOoze(tgt.poke))
                }
            }
            // はじけるほのおによる火花のダメージ
            (tgt.child == 0)? child = 1 : child = 0
            const _con = isCon(me, you, user[0], child)
            if (!user[0].f_con.includes("ひんし" + child)){
                const damage = Math.floor(user[0]["poke" + _con.num].full_HP / 16)
                changeHP(user[0], user[1], _con, damage, "-")
            }
            // コアパニッシャーによるとくせいなし
        */
        // 7.ふうせんが割れる
        // 8.直接攻撃のZワザを守りきれなかったとき、ニードルガード/トーチカ/キングシールドの効果
        // 9.ダイマックスわざの効果
        // tgt.result = "成功"
    }
}

// 3.ひんしになる反動技使用時のダメージ: ひんしになるときは使用者のひんし判定
function dyingDamage(poke){
    // じばく/だいばくはつ/ミストバースト/ビックリヘッド/てっていこうせん
    // いのちがけは第五世代ではこの時点、第六世代以降では10-1でひんしとなる。
}

// 4.ダメージを本体に与える
function giveDamage(poke){
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // ぎゃくじょう用
        if ( tgt.poke.myAbility == "ぎゃくじょう" && isAbility(tgt.poke)){
            if ( tgt.poke.myRest_hp - tgt.damage <= tgt.poke.myFull_hp / 2 && tgt.poke.myRest_hp > tgt.poke.myFull_hp / 2 ) {
                tgt.poke.myCondition.myBerserk = true
            }
        }

        // ダメージを与える
        tgt.poke.myRest_hp -= tgt.damage
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に ${tgt.damage} のダメージ !`)
        // HPバーの表示
        showHPbar(tgt.poke)

        // ダメおし用
        tgt.poke.myCondition.myAssurance = true
        // ゆきなだれ、リベンジ、カウンター。ミラーコート、メタルバースト用
        // 一撃必殺技の時、おうじゃのしるし・あくしゅうでひるまない、きあいパンチは成功する、ナゾのみ・弱点保険は発動する
        tgt.poke.myCondition.myDamage.value    = tgt.damage
        tgt.poke.myCondition.myDamage.party    = poke.myParty
        tgt.poke.myCondition.myDamage.position = poke.myPosition
        tgt.poke.myCondition.myDamage.nature   = poke.myMove.nature
        if ( oneShot.includes(poke.myMove.name) ) tgt.poke.myCondition.myOne_shot = true
        // がまん用
        if ( tgt.poke.myCondition.myBide_turn ) {
            tgt.poke.myCondition.myBide_damage += tgt.damage
        }
    }
}

// 5.相性判定のメッセージ
function declareEffectiveness(poke) {
    if ( poke.myMove.continuous >= 2 ) return
    // 連続攻撃技のときは12-4.まで相性(4~5)のメッセージは出ない。ただしみがわり状態に防がれたときは1発ごとに相性のメッセージが出る。
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )   continue // すでに失敗していないこと
        if ( tgt.substitute ) continue // みがわり状態に防がれないこと

        if ( tgt.effective > 1 ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に 効果は バツグンだ !`)
        if ( tgt.effective < 1 ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に 効果は 今ひとつのようだ......`)
    }
}

// 6.ダメージの判定に関するメッセージ
function damageMassage(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 1.急所判定のメッセージ
        if ( tgt.critical ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 急所に 当たった !`)
        // 2.Zワザ/ダイマックスわざをまもる状態などで軽減したときのメッセージ
            // 「<対象>は 攻撃を 守りきれずに ダメージを 受けた!」
    }

}

// 7.ダメージをHP1で耐える効果
function remainHP1(poke){
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 1.こらえる
        if ( tgt.poke.myCondition.myRemaining_HP1 == "こらえる" ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 攻撃をこらえた !`)
            tgt.poke.myCondition.myRemaining_HP1 = false
        }
        // 2.みねうち/てかげん: メッセージは表示されないが、以降の効果が発動しない。
        // 3.がんじょう
        if ( tgt.poke.myCondition.myRemaining_HP1 == "がんじょう" ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 特性『がんじょう』 !`)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 攻撃をこらえた !`)
            tgt.poke.myCondition.myRemaining_HP1 = false
        }
        // 4.きあいのタスキ/きあいのハチマキ
        if ( tgt.poke.myCondition.myRemaining_HP1 == "きあいのタスキ" ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は きあいのタスキで 持ちこたえた !`)
            tgt.poke.myCondition.myRemaining_HP1 = false
        }
        if ( tgt.poke.myCondition.myRemaining_HP1 == "きあいのハチマキ" ) {
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は きあいのハチマキで 持ちこたえた !`)
            tgt.poke.myCondition.myRemaining_HP1 = false
        }
        // 5.なかよし度: 「<ポケモン>は <プレイヤー>を 悲しませまいと もちこたえた!」
        // ダメージ自体に影響するので効果は1.時点で現れているが、メッセージはこの時点で流れる。
    }
}

// 8.追加効果などの発動
function activateAdditionalEffectEtc(poke){

    // 0.「反動で動けない状態」などの付与　（wikiにはない）
    if ( cannotMoveByRecoil.includes(poke.myMove.name) ) {
        poke.myCondition.myCant_move = poke.myMove.name
    }
    if ( poke.myMove.name == "あばれる" || poke.myMove.name == "はなびらのまい" || poke.myMove.name == "げきりん" ) {
        poke.myCondition.Thrash_move = poke.myMove.name
        poke.myCondition.Thrash_move += 1
    }
    if ( poke.myMove.name == "さわぐ" ) {
        poke.myCondition.myUproar += 1
    }
    if ( poke.myMove.name == "なみのり" && poke.myAbility == "うのミサイル" && isability(poke) && !poke.myCondition.myGulp_missile ) {
        if ( poke.myRest_hp > poke.myFull_hp / 2 ) {
            poke.myCondition.myGulp_missile = "うのみのすがた"
            writeLog(`${poke.myTN} の ${poke.myName} は うのみのすがたに 姿を変えた !`)
        } else {
            poke.myCondition.myGulp_missile = "まるのみのすがた"
            writeLog(`${poke.myTN} の ${poke.myName} は まるのみのすがたに 姿を変えた !`)
        }
    }
    // removeText(con.p_con, "状態変化『がまん』")

    // 追加効果 (ひみつのちから/オリジンズスーパーノヴァ/ぶきみなじゅもんを除く)
    // 自身のランクを変化させる技
    for ( const element of additionalEffectToChangeMyRank ){
        if ( poke.myMove.name == element.name ) {
            if ( poke.myAbility == "ちからずく" && isAbility(poke) ) break
            if ( getRandom() * 100 >= element.probability * isGrace(poke) ) break
            for ( const rank of element.rank ) {
                changeMyRank(poke, rank.parameter, rank.change)
            }
        }
    }
    // それ以外の追加効果
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( tgt.substitute ) continue
        if ( poke.myAbility == "ちからずく" && isAbility(poke) ) continue
        if ( tgt.poke.myAbility == "りんぷん" && isAbility(tgt.poke) ) continue
        if ( tgt.poke.myRest_hp == 0 ) continue
        // 相手のランクを変化させる技
        for ( const element of additionalEffectToChangeYourRank ) {
            if ( poke.myMove.name == element.name ) {
                if ( getRandom() * 100 >= element.probability * isGrace(poke) ) continue
                for ( const rank of element.rank ) {
                    changeRank(tgt.poke, rank.parameter, rank.change, isSpirit(poke, tgt.poke))
                }
            }
        }
        // 相手を状態異常にする技
        for ( const element of additionalEffectToMakeAbnormal ) {
            if ( poke.myMove.name == element.name ) {
                if ( getRandom() * 100 >= element.probability * isGrace(poke) ) continue
                getAbnormal(tgt.poke, element.ailment)
            }
        }
        // 相手をひるみ状態にする技
        for ( const element of additionalEffectToMakeFlinch ){
            if ( poke.myMove.name == element.name ) {
                if ( tgt.poke.myAbility == "せいしんりょく" && isAbility(tgt.poke) ) continue
                if ( getRandom() * 100 >= element.probability * isGrace(poke) ) continue
                tgt.poke.myCondition.myFlinch = true
            }
        }
        // それ以外の追加効果
        if ( poke.myMove.name == "アンカーショット" || poke.myMove.name == "かげぬい" ) {
            if ( !tgt.poke.myType.includes("ゴースト") ) {
                tgt.poke.myCondition.myCant_escape = poke.myID
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 逃げられなくなった !`)
            }
        }
        if ( poke.myMove.name == "しっとのほのお" ) {
            if ( tgt.poke.myCondition.myRank_up ) {
                getAbnormal(tgt.poke, "やけど")
            }
        }
        if ( poke.myMove.name == "じごくづき" ) {
            if ( !tgt.poke.myCondition.myThroat_chop ) tgt.poke.myCondition.myThroat_chop += 1
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 音技が出せなくなった !`)
        }
        if ( poke.myMove.name == "トライアタック" ) {
            if ( getRandom() * 100 >= 30 * grace ) {
                const random = getRandom()
                if ( random < 1 / 3 ) getAbnormal(tgt.poke, "まひ")
                else if ( random < 2 / 3 ) getAbnormal(tgt.poke, "こおり")
                else if ( random < 1 ) getAbnormal(tgt.poke, "やけど")
            }
        }
        if ( poke.myMove.name == "なげつける" ) {
            if ( poke.myItem == "でんきだま" ) getAbnormal(tgt.poke, "まひ")
            if ( poke.myItem == "かえんだま" ) getAbnormal(tgt.poke, "やけど")
            if ( poke.myItem == "どくバリ" ) getAbnormal(tgt.poke, "どく")
            if ( poke.myItem == "どくどくだま" ) getAbnormal(tgt.poke, "もうどく")
            if ( poke.myItem == "おうじゃのしるし" || poke.myItem == "するどいキバ" ) {
                if ( tgt.poke.myAbility == "せいしんりょく" && isAbility(tgt.poke) ) {
                    tgt.poke.myCondition.myFlinch = true
                }
            }
            if ( poke.myItem == "メンタルハーブ" ) {
                /*
                removeText(tgt.p_con, "状態変化『アンコール』")
                removeText(tgt.p_con, "状態変化『いちゃもん』")
                removeText(tgt.p_con, "状態変化『かいふくふうじ』")
                removeText(tgt.p_con, "状態変化『かなしばり』")
                removeText(tgt.p_con, "状態変化『ちょうはつ』")
                removeText(tgt.p_con, "状態変化『メロメロ』")
                */
            }
            if ( poke.myItem == "しろいハーブ" ) {
                const parameter = ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]
                for ( const para of parameter ) {
                    tgt.poke[`myRank_${para}`] = Math.max(0, tgt.poke[`myRank_${para}`])
                }
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 下がっていた能力変化が 元に戻った`)
            }
            if ( itemList_berry.includes(poke.myItem) ) eatBerryImmediately(tgt.poke)
            enableToRecycle(poke)
        }
    }
    // 自分のランクが下がる技の効果
    for ( const element of downMyRank ) {
        if ( poke.myMove.name == element.name && poke.myMove.name != "スケイルショット" ) {
            for ( const rank of element.rank ){
                changeMyRank(poke, rank.parameter, rank.change)
            }
        }
    }
    // それ以外の効果
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // HP吸収技の吸収効果/ヘドロえきのダメージ効果
        for (const element of recoverMyHP){
            if ( poke.myMove.name == element.name ) {
                const damage = fiveCut(Math.round(tgt.damage * element.rate) * isBig_root(poke))
                changeHP(poke, damage, isOoze(tgt.poke))
            }
        }
        /*
        // はじけるほのおによる火花のダメージ
        (tgt.child == 0)? child = 1 : child = 0
        const _con = isCon(me, you, user[0], child)
        if (!user[0].f_con.includes("ひんし" + child)){
            const damage = Math.floor(user[0]["poke" + _con.num].full_HP / 16)
            changeHP(user[0], user[1], _con, damage, "-")
        }
        // ダイマックスわざの効果
        dynamaxMoveEffect(poke)
        */
    }
}

// 9.ダメージが発生したときの効果
function effectWithDamage(poke){
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )   continue // すでに失敗していないこと
        if ( tgt.substitute ) continue // みがわりが有効でないこと
        if ( tgt.damage > 0 ) continue // ダメージが0以上であること

        // 1.コアパニッシャーによるとくせいなし
        if ( poke.myMove.name == "コアパニッシャー" ) {

        }
        // 2.防御側のいかりによるこうげき上昇
        if ( tgt.poke.myCondition.myRage && tgt.poke.myRest_hp > 0 && tgt.poke.myRank_atk < 6 ) {
            changeRank(tgt.poke, "atk", 1, isSpirit(poke, tgt.poke))
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の いかりのボルテージが上がっていく !`)
        }
        // 3.クリアスモッグによるランク補正のリセット
        if ( poke.myMove.name == "クリアスモッグ" && tgt.poke.myRest_hp > 0 ){
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 能力変化が元に戻った !`)
            const parameter = ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]
            for ( const para of parameter ) {
                tgt.poke[`myRank_${para}`] = 0
            }
        }
        // 4.防御側のおんねんによるPP消失
        if ( tgt.poke.myCondition.myGrudge && tgt.poke.myRest_hp == 0 ) {
            /*if (atk.data.dynaTxt.includes("3") || atk.data.gigaTxt.includes("3") || atk.data.Z){
                con["last_" + atk.data.command] = 0
                atk["poke" + cfn.battleNum(atk)]["last_" + atk.data.command] = 0
                writeLog(me, you, con.TN + "　の　" + con.name + "　の　" + con["move_" + atk.data.command] + "　はおんねんで　PPが0になった　!" + "\n")
            } */
            for ( let i = 0; i < 4; i++ ) {
                if ( poke.myMove.name == poke[`myMove_${i}`] ) {
                    poke[`myRest_pp_${i}`] = 0
                    writeLog(`${poke.myTN} の ${poke.myName} の ${poke[`myMove_${i}`]} はおんねんで PPが0になった !`)
                }
            }
        }
        // 5.防御側のくちばしキャノンによるやけど
        if ( tgt.poke.myCondition.myBeak_blast ) {
            if ( poke.myMove.direct == "直接" && !( poke.myItem == "ぼうごパット" && isItem(poke) ) ) {
                getAbnormal(poke, "やけど")
            }
        }
        // 6.攻撃側のどくしゅによるどく
        if ( poke.myAbility == "どくしゅ" && isAbility(poke) ) {
            if ( poke.myMove.direct == "直接" && getRandom() < 0.3 && !( tgt.poke.myAbility == "りんぷん" && isAbility(tgt.poke) ) ) {
                writeLog(`${poke.myTN} の ${poke.myName} の 特性『どくしゅ』 !`)
                getAbnormal(tgt.poke, "どく")
            }
        }
        // 6_1.攻撃側のするどいキバ：wikiにない
        if ( !oneShot.includes(poke.myMove.name) ) { // 一撃必殺技ではひるまない
            if ( poke.myItem == "おうじゃのしるし" && isItem(poke) ) {
                if ( getRandom() < 0.1 * isGrace(poke) ) tgt.poke.myCondition.myFlinch = true
            }
            if ( poke.myItem == "するどいキバ" && isItem(poke) ) {
                if ( getRandom() < 0.1 * isGrace(poke) ) tgt.poke.myCondition.myFlinch = true
            }
            if ( poke.myAbility == "あくしゅう" && isAbility(poke) ) {
                if ( getRandom() < 0.1 * isGrace(poke) ) tgt.poke.myCondition.myFlinch = true
            }
        }
        // 7.防御側の特性
        if ( isAbility(tgt.poke) ) {
            const random = getRandom()
            const damage_4 = Math.floor(poke.myFull_hp / 4 * isDynamax(poke))
            const damage_8 = Math.floor(poke.myFull_hp / 8 * isDynamax(poke))
            switch ( tgt.poke.myAbility ) {
                case "ゆうばく":
                    if ( tgt.poke.myRest_hp > 0 ) break
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) break
                    if ( poke.myAbility == "しめりけ" && isAbility(poke) ) break
                    abilityDeclaration(tgt.poke)
                    changeHP(poke, damage_4, "-")
                    break

                case "とびだすなかみ":
                    if ( tgt.poke.myRest_hp > 0 ) break
                    abilityDeclaration(tgt.poke)
                    changeHP(poke, tgt.damage, "-")

                case "シンクロ":
                    break

                case "てつのトゲ":
                case "さめはだ":
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) break
                    abilityDeclaration(tgt.poke)
                    changeHP(poke, damage_8, "-")
                    break

                case "ほうし":
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) break
                    if ( poke.myAbility == "ぼうじん" && isAbility(poke) ) break
                    if ( poke.myItem == "ぼうじんゴーグル" && isItem(poke) ) break
                    if ( poke.myType.includes("くさ") ) break
                    if ( random >= 0.3 ) break
                    abilityDeclaration(tgt.poke)
                    if ( random < 0.09 )      getAbnormal(poke, "どく")
                    else if ( random < 0.19 ) getAbnormal(poke, "まひ")
                    else if ( random < 0.3 )  getAbnormal(poke, "ねむり")
                    break

                case "どくのトゲ":
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) break
                    if ( random >= 0.3 ) break
                    abilityDeclaration(tgt.poke)
                    getAbnormal(poke, "どく")
                    break

                case "せいでんき":
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) break
                    if ( random >= 0.3 ) break
                    abilityDeclaration(tgt.poke)
                    getAbnormal(poke, "まひ")
                    break

                case "ほのおのからだ":
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) break
                    if ( random >= 0.3 ) break
                    abilityDeclaration(tgt.poke)
                    getAbnormal(poke, "やけど")
                    break

                case "メロメロボディ":
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) break
                    if ( random >= 0.3 ) break
                    if ( tgt.poke.myRest_hp == 0 ) break
                    if ( poke.myCondition.myAttract ) break
                    if ( poke.myGender == "-" ) break
                    if ( tgt.poke.myGender == "-" ) break
                    if ( poke.myGender == tgt.poke.myGender ) break
                    poke.myCondition.myAttract = tgt.poke.myID
                    abilityDeclaration(tgt.poke)
                    writeLog(`${poke.myTN} の ${poke.myName} は メロメロに なってしまった !`)
                    mentalHerb(poke)
                    break

                case "ミイラ":
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) break
                    if ( mummy.includes(poke.myAbility) ) break
                    abilityDeclaration(tgt.poke)
                    poke.myAbility = "ミイラ"
                    writeLog(`${poke.myTN} の ${poke.myName} は 特性『${tgt.poke.myAbility}』 になった!`)
                    break

                case "ぬめぬめ":
                case "カーリーヘアー":
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) break
                    abilityDeclaration(tgt.poke)
                    changeRank(poke, "speed", -1, isSpirit(poke, tgt.poke))
                    // ミラーアーマーの処理
                    break

                case "さまようたましい":
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) break
                    if ( wanderingSpirit.includes(poke.myAbility) ) break
                    abilityDeclaration(tgt.poke)
                    [poke.myAbility, tgt.poke.myAbility] = [tgt.poke.myAbility, poke.myAbility]
                    writeLog(`${poke.myTN} の ${poke.myName} は 特性『${poke.myAbility}』 になった!`)
                    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 特性『${tgt.poke.myAbility}』 になった!`)
                    break

                case "ほろびのボディ":
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) break
                    break

                case "のろわれボディ":
                    if ( random >= 0.3 ) break
                    if ( poke.myCondition.myDisable_move ) break
                    abilityDeclaration(tgt.poke)
                    poke.myCondition.myDisable_move = poke.myMove.name
                    poke.myCondition.myDisable_turn = 1
                    mentalHerb(poke)
                    break

                case "イリュージョン":
                    break

                case "じきゅうりょく":
                    if ( tgt.poke.myRest_hp == 0 ) break
                    abilityDeclaration(tgt.poke)
                    changeRank(tgt.poke, "def", 1, isSpirit(poke, tgt.poke))
                    break

                case "すなはき":
                    if ( fieldStatus.mySandstorm ) break
                    if ( fieldStatus.myHeavy_rain ) break
                    if ( fieldStatus.myDrought ) break
                    if ( fieldStatus.myTurbulence ) break
                    abilityDeclaration(tgt.poke)
                    activateWeather(tgt.poke, "sandstorm")
                    break

                case "わたげ":
                    abilityDeclaration(tgt.poke)
                    changeRank(poke, "speed", -1, isSpirit(poke, tgt.poke))
                    // ミラーアーマー
                    break

                case "うのミサイル":
                    if ( !tgt.poke.myCondition.myGulp_missile ) break
                    abilityDeclaration(tgt.poke)
                    changeHP(poke, damage_4, "-")
                    switch ( tgt.poke.myCondition.myGulp_missile ) {
                        case "うのみのすがた":
                            changeRank(poke, "def", -1, isSpirit(poke, tgt.poke))
                            // ミラーアーマー
                            break

                        case "まるのみのすがた":
                            getAbnormal(poke, "まひ")
                            break
                    }
                    tgt.poke.myCondition.myGulp_missile = false
                    eatBerryInAbnormal(poke)
                    eatBerryInPinch(poke)
                    break

                case "くだけるよろい":
                    if ( tgt.poke.myRest_hp == 0 ) break
                    if ( poke.myMove.nature != "物理" ) break
                    abilityDeclaration(tgt.poke)
                    changeMyRank(tgt.poke, "def", -1)
                    changeMyRank(tgt.poke, "speed", 2)
                    whiteHerb(poke)
                    break

                case "みずがため":
                    if ( tgt.poke.myRest_hp == 0 ) break
                    if ( poke.myMove.type != "みず" ) break
                    abilityDeclaration(tgt.poke)
                    changeMyRank(tgt.poke, "def", 2)
                    break

                case "せいぎのこころ":
                    if ( tgt.poke.myRest_hp == 0 ) break
                    if ( poke.myMove.type != "あく" ) break
                    abilityDeclaration(tgt.poke)
                    changeMyRank(tgt.poke, "atk", 1)
                    break

                case "びびり":
                    if ( tgt.poke.myRest_hp == 0 ) break
                    switch ( poke.myMove.type ) {
                        case "あく":
                        case "ゴースト":
                        case "むし":
                            abilityDeclaration(tgt.poke)
                            changeMyRank(tgt.poke, "speed", 1)
                    }
                    break

                case "じょうききかん":
                    if ( tgt.poke.myRest_hp == 0 ) break
                    switch ( poke.myMove.type ) {
                        case "みず":
                        case "ほのお":
                            abilityDeclaration(tgt.poke)
                            changeMyRank(tgt.poke, "speed", 6)
                    }
                    break

                case "いかりのつぼ":
                    if ( tgt.poke.myRest_hp == 0 ) break
                    if ( !tgt.critical ) break
                    abilityDeclaration(tgt.poke)
                    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 攻撃が 最大まで上がった !`)
                    tgt.poke.myRank_atk = 6
                    break
            }
        }
        // 8.相性に関するきのみ
        if ( tgt.poke.myCondition.myHalf_berry ) {
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
        if ( poke.myMove.name == "やきつくす" ) {
            if ( !( tgt.poke.myAbility == "ねんちゃく" && isAbility(tgt.poke) ) && tgt.poke.myRest_hp > 0 && ( itemList_berry.includes(tgt.poke.myItem) || tgt.poke.myItem.includes("ジュエル") ) ) {
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myItem} は 焼き尽くされた !`)
                tgt.poke.myItem = ""
                if ( tgt.poke.myAbility == "かるわざ" ) tgt.poke.myCondition.myUnburden = true
            }
        }
        // 10.防御側のもちもの
        if ( isItem(tgt.poke) ) {
            const damage_6 = Math.floor(poke.myFull_hp / 6 * isDynamax(poke))
            const damage_8 = Math.floor(poke.myFull_hp / 8 * isDynamax(poke) * isRipen(tgt.poke))
            switch ( tgt.poke.myItem ) {
                case "ゴツゴツメット":
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem == "ぼうごパット" && isItem(poke) ) break
                    itemDeclaration(tgt.poke)
                    changeHP(poke, damage_6, "-")
                    eatBerryInPinch(poke)
                    break

                case "くっつきバリ":
                    if ( poke.myMove.direct == "間接" ) break
                    if ( poke.myItem ) break
                    itemDeclaration(tgt.poke)
                    poke.myItem = "くっつきバリ"
                    tgt.poke.myItem = ""
                    break

                case "ジャポのみ":
                    if ( poke.myMove.nature != "物理" ) break
                    itemDeclaration(tgt.poke)
                    changeHP(poke, damage_8, "-")
                    enableToRecycle(tgt.poke)
                    eatBerryInPinch(poke)
                    break

                case "レンブのみ":
                    if ( poke.myMove.nature != "特殊" ) break
                    itemDeclaration(tgt.poke)
                    changeHP(poke, damage_8, "-")
                    enableToRecycle(tgt.poke)
                    eatBerryInPinch(poke)
                    break

                case "じゃくてんほけん":
                    if ( tgt.poke.myRest_hp == 0 ) break
                    if ( tgt.effective <= 1 ) break
                    itemDeclaration(tgt.poke)
                    changeMyRank(tgt.poke, "atk", 2)
                    changeMyRank(tgt.poke, "sp_atk", 2)
                    enableToRecycle(tgt.poke)
                    break

                case "じゅうでんち":
                    if ( tgt.poke.myRest_hp == 0 ) break
                    if ( poke.myMove.type != "でんき" ) break
                    itemDeclaration(tgt.poke)
                    changeMyRank(tgt.poke, "atk", 1)
                    enableToRecycle(tgt.poke)
                    break

                case "ゆきだま":
                    if ( tgt.poke.myRest_hp == 0 ) break
                    if ( poke.myMove.type != "こおり" ) break
                    itemDeclaration(tgt.poke)
                    changeMyRank(tgt.poke, "atk", 1)
                    enableToRecycle(tgt.poke)
                    break

                case "きゅうこん":
                    if ( tgt.poke.myRest_hp == 0 ) break
                    if ( poke.myMove.type != "みず" ) break
                    itemDeclaration(tgt.poke)
                    changeMyRank(tgt.poke, "sp_atk", 1)
                    enableToRecycle(tgt.poke)
                    break

                case "ひかりごけ":
                    if ( tgt.poke.myRest_hp == 0 ) break
                    if ( poke.myMove.type != "みず" ) break
                    itemDeclaration(tgt.poke)
                    changeMyRank(tgt.poke, "sp_def", 1)
                    enableToRecycle(tgt.poke)
                    break

                case "ふうせん":
                    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ふうせんがわれた !`)
                    enableToRecycle(tgt.poke)
                    break
            }
        }
        // 11.防御側のばけのかわ/アイスフェイス
        if ( isAbility(tgt.poke) ) {
            switch ( tgt.poke.myAbility ) {
                case "ばけのかわ":
                    if ( tgt.poke.myDisguise != "ばけたすがた" ) break
                    abilityDeclaration(tgt.poke)
                    changeHP(tgt.poke, Math.floor(tgt.poke.full_HP / 8 * isDynamax(tgt.poke)), "-")
                    tgt.poke.myDisguise = "ばれたすがた"
                    break

                case "アイスフェイス":
                    if ( tgt.poke.myIce_face != "アイスフェイス" ) break
                    if ( poke.myMove.nature != "物理" ) break
                    abilityDeclaration(tgt.poke)
                    formChange(tgt.poke, "コオリッポ(ナイスフェイス)", true)
                    tgt.poke.myIce_face = "ナイスフェイス"
                    break
            }
        }
        // 12.直接攻撃のZワザを守りきれなかったとき、ニードルガード/トーチカ/キングシールドの効果
        // トラップシェルの起爆判定（wikiにない）
        if ( tgt.poke.myCondition.myShell_trap == "set" ) {
            if ( poke.myMove.nature == "物理" && !poke.myCondition.mySheer_force && spirit ) {
                tgt.poke.myCondition.myShell_trap = false
            }
        }
    }
}



// 10.ひんし判定
function dyingJudge(poke){
    // 1.いのちがけ使用者のひんし
    if ( poke.myMove.name == "いのちがけ" ) {
        poke.myRest_hp = 0
        // toHand(poke)
    }
    let destiny = false // みちづれチェック
    // 2.防御側のひんし
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( tgt.poke.myRest_hp == 0 ) {
            if ( tgt.poke.myCondition.myDestiny_bond && !poke.myCondition.myDynamax ) destiny = tgt.poke
            toHand(tgt.poke)
        }
    }
    // 3.みちづれによる攻撃側のひんし
    if ( destiny ) {
        writeLog(`${destiny.myTN} の ${destiny.myName} は ${poke.myTN} の ${poke.myName} を みちづれにした !`)
        poke.myRest_hp = 0
        // toHand(poke)
    }
}

// 12.連続攻撃技である場合、以下の処理を行う(おやこあいも含む)。
function continuousMove(poke){
    if ( poke.myRest_hp == 0 )         return // ひんし状態でないこと
    if ( poke.myMove.continuous == 1 ) return // 連続技であること

    let beatUp = [Math.floor(poke.myAtk / 10 + 5)]
    if ( poke.myMove.name == "ふくろだたき" ){
        for ( const _poke of myParty ) {
            if ( _poke.myID == poke.myID ) continue // 自分は状態異常でも可
            if ( _poke.myAilment )         continue // 他のポケモンは状態異常だと攻撃しない
            beatUp.push(Math.floor(_poke.myAtk / 10 + 5))
        }
    }
        
    // 攻撃回数の記録
    let count = 1

    // 連続攻撃技は単体対象
    const tgt = poke.myTarget[0]

    for ( let i = 1; i < poke.myMove.continuous; i++ ) {
        // 1.攻撃側と防御側のポケモンの回復のきのみ・HP1/4で発動するピンチきのみ・きのみジュースの発動判定
        eatBerryInPinch(poke)
        if ( !tgt.success ) break // すでに失敗していないこと
        eatBerryInPinch(tgt.poke)
        if ( poke.myMove.name == "トリプルアクセル" || poke.myMove.name == "トリプルキック" ) {
            if ( poke.myAbility == "スキルリンク" && isAbility(poke) ) {
                accuracyFailure(poke)
            }
        }
        // 2.攻撃側がひんし・ねむり状態になった場合、連続攻撃は中断する。状態をきのみで回復できるときは使用して攻撃を続行する。
        if ( poke.myRest_hp == 0 ) break
        if ( poke.myAilment == "ねむり" ) break
        // 3.防御側がひんし状態になった場合、連続攻撃は終了する。
        if ( tgt.poke.myRest_hp == 0 ) {
            tgt.success = false
            break
        }
        // 対象の身代わりの有無をもう一度判定
        tgt.substitute = isSubstitute(poke, tgt.poke)
        // 4.攻撃が続く場合は1.からの処理を繰り返す。終了する場合は相性と「○発当たった!」の表示後14.に進む。
        if ( poke.myMove.name == "トリプルキック" ) poke.myMove.power = 10 * (i + 2)
        if ( poke.myMove.name == "トリプルアクセル" ) poke.myMove.power = 20 * (i + 2)
        if ( poke.myMove.name == "ふくろだたき" ) poke.myMove.power = beatUp[i]
        if ( poke.myAbility == "おやこあい" && isAbility(poke) ) poke.myCondition.myParental_bond = true

        // 1.対象全員へのダメージ計算
        isDamage(poke)
        // 2.みがわり状態に攻撃技が防がれたときの効果: 本体がダメージを受けたときの処理(4~9)などより優先される
        substituteBlock(poke)
        // 3.ひんしになる反動技使用時のダメージ: ひんしになるときは使用者のひんし判定
        dyingDamage(poke)
        // 4.ダメージを本体に与える
        giveDamage(poke)
        // 5.相性判定のメッセージ
        declareEffectiveness(poke)
        // 6.ダメージの判定に関するメッセージ
        damageMassage(poke)
        // 7.ダメージをHP1で耐える効果
        remainHP1(poke)
        // 8.追加効果などの発動
        activateAdditionalEffectEtc(poke)
        // 9.ダメージが発生したときの効果
        effectWithDamage(poke)
        // 10.ひんし判定
        dyingJudge(poke)

        count += 1
    }

    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に ${count}発 当たった !`)
}

// 14.技の効果
function activateMoveEffect(poke){
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // ほのおタイプの攻撃技を受けたことによるこおり状態の回復
        if ( tgt.poke.myAilment == "こおり" && poke.myMove.type == "ほのお" ) {
            if ( tgt.substitute ) continue
            tgt.poke.myAilment = false
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の こおりがとけた !`)
        }
    }
    // ほのおタイプの技によるこおり状態の回復は使用者が場から去っている場合も発動する。それ以外の技の効果は使用者が場から去っていると発動しない。
    if ( poke.myRest_hp == 0 ) return

    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 反動技による反動ダメージ (わるあがきも含む)
        if ( !( poke.myAbility == "いしあたま" && isAbility(poke) ) ) {
            for ( const element of recoil ) {
                if ( poke.myMove.name == element.name ) {
                    changeHP(poke, Math.round(tgt.damage * element.rate), "-")
                    eatBerryInPinch(poke)
                }
            }
        }
        // バインド状態
        if ( bind.includes(poke.myMove.name) ) {
            if ( tgt.substitute )                   continue // みがわりが有効でないこと
            if ( tgt.poke.myRest_hp == 0 )          continue // ひんし状態でないこと
            if ( tgt.poke.myCondition.myBind_turn ) continue // すでにバインド状態でないこと

            tgt.poke.myCondition.myBind_ID   = poke.myID
            tgt.poke.myCondition.myBind_turn = 1
            if ( poke.myItem == "ねばりのかぎづめ" && isItem(poke) ) tgt.poke.myCondition.myBind_lone = true
            if ( poke.myItem == "しめつけバンド" && isItem(poke) ) tgt.poke.myCondition.myBind_strong = true
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は しめつけられた !`)
        }
        // ひみつのちからの追加効果
        if ( poke.myMove.name == "ひみつのちから" ) {
            if ( tgt.substitute )                 continue // みがわりが有効でないこと
            if ( poke.myCondition.mySheer_force ) continue // ちからずくが無効であること
            if ( getRandom() < 0.3 * isGrace(poke) ) {
                if ( fieldStatus.myGrassy ) getAbnormal(tgt.poke, "ねむり")
                else if ( fieldStatus.myElectric ) getAbnormal(tgt.poke, "まひ")
                else if ( fieldStatus.myMisty ) {
                    /*
                    if (tgt.poke.myAbility == "ミラーアーマー"){
                        writeLog(me, you, tgt.TN + "　の　" + tgt.name + "の　ミラーアーマーが　発動した!" + "\n")
                        changeRank(me, you, con, "C", -1, probability, move, true)
                    } else {
                        changeRank(user[0], user[1], tgt, "C", -1, true)
                    }
                    */
                   changeRank(tgt.poke, "sp_atk", -1)
                }
                else if ( fieldStatus.myPsychic ) {
                    /*
                    if (tgt.poke.myAbility == "ミラーアーマー"){
                        writeLog(me, you, tgt.TN + "　の　" + tgt.name + "の　ミラーアーマーが　発動した!" + "\n")
                        changeRank(me, you, con, "S", -1, probability, move, true)
                    } else {
                        changeRank(user[0], user[1], tgt, "S", -1, true)
                    }
                    */
                   changeRank(tgt.poke, "speed", -1)
                }
                else getAbnormal(tgt.poke, "まひ")
            }
        }
        // とどめばりによるこうげき上昇
        if ( poke.myMove.name == "とどめばり" ) {
            if ( tgt.poke.myRest_hp == 0 ) {
                changeMyRank(poke, "atk", 3)
            }
        }
        // スケイルショットによるぼうぎょ低下・すばやさ上昇
        if ( poke.myMove.name == "スケイルショット" ) {
            changeMyRank(poke, "def", -1)
            changeMyRank(poke, "speed", 1)
        }
        // はたきおとす/どろぼう/ほしがる/むしくい/ついばむによるもちものに関する効果
        if ( tgt.poke.myItem ) {
            if ( tgt.substitute )        continue // みがわりが有効でないこと
            if ( cannotChangeItem(tgt.poke) ) continue // 干渉できる持ち物であること
            if ( tgt.poke.myAbility == "ねんちゃく" && isAbility(tgt.poke) ) {
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 特性『ねんちゃく』 !`)
                continue
            }

            if ( poke.myMove.name == "はたきおとす" ) {
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myItem} を はたき落とした !`)
                tgt.poke.myItem = ""
                if ( tgt.poke.myAbility == "かるわざ" ) tgt.poke.myUnburden = true
            }
            if ( poke.myMove.name == "どろぼう" || poke.myMove.name == "ほしがる" ) {
                if ( poke.myItem != "" ) continue
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke.myItem} を 奪った !`)
                poke.myItem = tgt.poke.myItem
                tgt.poke.myItem = ""
                if ( tgt.poke.myAbility == "かるわざ" ) tgt.poke.myUnburden = true
                eatBerryInAbnormal(poke)
                eatBerryInPinch(poke)
            }
            if ( poke.myMove.name == "むしくい" || poke.myMove.name == "ついばむ" ) {
                if ( !itemList_berry.includes(tgt.poke.myItem) ) continue
                eatBerryImmediately(poke, tgt.poke.myItem)
                tgt.poke.myItem = ""
                if ( tgt.poke.myAbility == "かるわざ" ) tgt.poke.myUnburden = true
            }
        }
        // ドラゴンテール/ともえなげによる交代・交代先の繰り出し
        if ( poke.myMove.name == "ドラゴンテール" || poke.myMove.name == "ともえなげ" ) {
            if ( !isBench(poke) )                 continue // 控えがいること
            if ( tgt.substitute )                 continue // みがわり状態でないこと
            if ( tgt.poke.myCondition.myIngrain ) continue // ねをはる状態でないこと
            if ( tgt.poke.myCondition.myDynamax ) continue // ダイマックスしていないこと
            if ( tgt.poke.myAbility == "きゅうばん" && isAbility(tgt.poke) ) continue

            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 手持ちに戻された !`)
            const position = tgt.poke.myPosition       // 現在の位置
            const next = shuffle(isBench(tgt.poke))[0] // 次に出すポケモン
            toHand(tgt.poke)                           // 戻す
            summon(next, position)                     // 出す
        }
        // うちおとす/サウザンアローによるうちおとす状態
        if ( poke.myMove.name == "うちおとす" || poke.myMove.name == "サウザンアロー" ) {
            // 自身または対象がひんしの場合や、対象が身代わりで技を受けた場合、撃ち落とす状態にならない
            if ( tgt.poke.myRest_hp == 0 ) continue
            if ( tgt.substitute ) continue
            // そらをとぶ・とびはねるを中断させる、フリーフォールは中断されない
            if ( tgt.poke.myCondition.mySky ) {
                tgt.poke.myCondition.mySky = false // そらをとぶ
                tgt.poke.myCondition.filling = false // ため技
            }
            if ( onGround(tgt.poke) ) {
                tgt.poke.myCondition.myMagnet_rise = false // でんじふゆう
                tgt.poke.myCondition.myTelekinesis = false // テレキネシス
                tgt.poke.myCondition.mySmack_down = true // うちおとす
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 撃ち落とされて 地面に落ちた !`)
            }
        }
        // サウザンウェーブ/くらいつくによるにげられない状態
        if ( poke.myMove.name == "サウザンウェーブ" ) {
            if ( tgt.poke.myRest_hp == 0 ) continue // 対象がひんし状態でないこと
            if ( tgt.poke.myType.includes("ゴースト") ) continue // 対象がゴーストタイプでないこと
            if ( tgt.poke.myCondition.myCant_escape ) continue // 対象が逃げられない状態でないこと
            if ( tgt.substitute ) continue // 対象のみがわりが無効であること
            tgt.poke.myCondition.myCant_escape = poke.myID
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 逃げられなくなった !`)
        }
        if ( poke.myMove.name == "くらいつく" ) {
            if ( tgt.poke.myRest_hp == 0 )            continue // 対象がひんし状態でないこと
            if ( poke.myCondition.myCant_escape )     continue // 自分が逃げられない状態でないこと
            if ( tgt.poke.myCondition.myCant_escape ) continue // 対象が逃げられない状態でないこと
            if ( poke.myType.includes("ゴースト") )     continue // 自分がゴーストタイプでないこと
            if ( tgt.poke.myType.includes("ゴースト") ) continue // 対象がゴーストタイプでないこと
            if ( tgt.substitute ) continue // 対象のみがわりが無効であること

            poke.myCondition.myCant_escape = tgt.poke.myID
            tgt.poke.myCondition.myCant_escape = poke.myID
            writeLog(`お互いのポケモン は 逃げられなくなった !`)
        }
        // プラズマフィストによるプラズマシャワー状態
        if ( poke.myMove.name == "プラズマフィスト" ) {
            fieldStatus.myIon_deluge = true
            writeLog(`電気が駆け巡る !`)
        }
        // オリジンズスーパーノヴァによるサイコフィールド状態
        if ( poke.myMove.name == "オリジンズスーパーノヴァ" ) {
            if ( !fieldStatus.myPsychic ) activateTerrain(poke, "psychic")
        }
        // こうそくスピン/ラジアルエッジストームによる場の状態の解除
        if ( poke.myMove.name == "こうそくスピン" ) {
            if ( poke.myCondition.myLeech_seed ) {
                poke.myCondition.myLeech_seed = false
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の やどりぎのタネが 消え去った`)
            }
            if ( poke.myCondition.myBind_turn ) {
                resetBind(poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は バインドから 解放された`)
            }
            if ( isField(poke).mySpikes > 0 ) {
                isField(poke).mySpikes = 0
                writeLog(`${tgt.poke.myTN} の場の まきびしが 消え去った`)
            }
            if ( isField(poke).myToxic_spikes > 0 ) {
                isField(poke).myToxic_spikes = 0
                writeLog(`${tgt.poke.myTN} の場の どくびしが 消え去った`)
            }
            if ( isField(poke).myStealth_rock ) {
                isField(poke).myStealth_rock = false
                writeLog(`${tgt.poke.myTN} の場の ステルスロックが 消え去った`)
            }
            if ( isField(poke).mySticky_web ) {
                isField(poke).mySticky_web = false
                writeLog(`${tgt.poke.myTN} の場の ねばねばネットが 消え去った`)
            }
            if ( isField(poke).mySteelsurge ) {
                isField(poke).mySteelsurge = false
                writeLog(`${tgt.poke.myTN} の場の キョダイコウジンが 消え去った`)
            }
        }
        if ( poke.myMove.name == "ラジアルエッジストーム" ) {
            if ( fieldStatus.myGrassy )   writeLog(`グラスフイールドが 消え去った`)
            if ( fieldStatus.myElectric ) writeLog(`エレキフイールドが 消え去った`)
            if ( fieldStatus.myMisty )    writeLog(`ミストフイールドが 消え去った`)
            if ( fieldStatus.myPsychic )  writeLog(`サイコフイールドが 消え去った`)
            resetTerrain()
        }
        // ねっさのだいち/ねっとう/スチームバーストを受けたことによるこおり状態の回復
        if ( poke.myMove.name == "スチームバースト" || poke.myMove.name == "ねっさのだいち" || poke.myMove.name == "ねっとう" ) {
            if ( tgt.poke.myAilment == "こおり" ) {
                if ( poke.myCondition.mySheer_force ) continue // ちからずくが無効であること
                resetAilment(poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の こおりがとけた`)
            }
        }
        // きつけを受けたことによるまひ状態の回復
        if ( poke.myMove.name == "きつけ" ) {
            if ( tgt.poke.myAilment == "まひ" ) {
                resetAilment(poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 痺れが取れた`)
            }
        }
        // めざましビンタを受けたことによるねむり状態の回復
        if ( poke.myMove.name == "めざましビンタ" ) {
            if ( tgt.poke.myAilment == "ねむり" ) {
                resetAilment(poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 目を覚ました`)
            }
        }
        // うたかたのアリアを受けたことによるやけど状態の回復
        if  ( poke.myMove.name == "うたかたのアリア" ) {
            if ( tgt.poke.myAilment == "やけど" ) {
                if ( poke.myCondition.mySheer_force ) continue // ちからずくが無効であること
                resetAilment(poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の やけどが治った`)
            }
        }
        // ぶきみなじゅもんによるPPの減少
        if ( poke.myMove.name == "ぶきみなじゅもん" ) {
            if ( poke.myCondition.mySheer_force )  continue // ちからずくが無効であること
            if ( !tgt.poke.myCondition.myHistory ) continue // 技を使用していること

            for ( let j = 0; j < 4; j++ ) {
                if ( tgt.poke[`myMove_${j}`] == tgt.poke.myCondition.myHistory[0].name && tgt.poke[`myRest_pp_${i}`] > 0 ) {
                    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の ${tgt.poke[`myMove_${j}`]} の PPが${Math.min(3, tgt.poke[`myRest_pp_${j}`])}減った`)
                    tgt.poke[`myRest_pp_${j}`] = Math.max(tgt.poke[`myRest_pp_${j}`] - 3, 0)
                }
            }
        }
    }
}

// 15.特性の効果
function abilityEffect(poke){

    // 1.攻撃側のマジシャン/じしんかじょう/ビーストブースト/くろのいななき/しろのいななき
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )        continue // すでに失敗していないこと
        if ( !isAbility(poke) )    continue // 自分の特性が有効であること
        if ( poke.myRest_hp == 0 ) continue // 自分がひんしでないこと

        if ( poke.myAbility == "マジシャン" && isAbility(poke) ) {
            if ( poke.myItem != "" ) continue
            if ( tgt.poke.myItem == "" ) continue
            if ( cannotChangeItem(tgt.poke) ) continue
            if ( !( tgt.poke.myAbility == "ねんちゃく" && isAbility(tgt.poke) ) ) continue

            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 特性『マジシャン』 !`)
            poke.myItem = tgt.poke.myItem
            tgt.poke.myItem = ""
        }
        if ( tgt.poke.myRest_hp == 0 ) {
            if ( poke.myAbility == "じしんかじょう" ) {
                writeLog(`${poke.myTN} の ${poke.myName} の 特性『${poke.myAbility}』 !`)
                changeMyRank(poke, "atk", 1)
            }
            if ( poke.myAbility == "しろのいななき" ) {
                writeLog(`${poke.myTN} の ${poke.myName} の 特性『${poke.myAbility}』 !`)
                changeMyRank(poke, "atk", 1)
            }
            if ( poke.myAbility == "くろのいななき" ) {
                writeLog(`${poke.myTN} の ${poke.myName} の 特性『${poke.myAbility}』 !`)
                changeMyRank(poke, "sp_atk", 1)
            }
            if ( poke.myAbility == "じんばいったい" && poke.myName == "バドレックス(はくばじょうのすがた)" ) {
                writeLog(`${poke.myTN} の ${poke.myName} の 特性『しろのいななき』 !`)
                changeMyRank(poke, "atk", 1)
            }
            if ( poke.myAbility == "じんばいったい" && poke.myName == "バドレックス(こくばじょうのすがた)" ) {
                writeLog(`${poke.myTN} の ${poke.myName} の 特性『くろのいななき』 !`)
                changeMyRank(poke, "sp_atk", 1)
            }
            if ( poke.myAbility == "ビーストブースト" ) {
                const value = [
                    {parameter: "atk", value: poke.myAtk}, 
                    {parameter: "def", value: poke.myDef}, 
                    {parameter: "sp_atk", value: poke.mySp_atk}, 
                    {parameter: "sp_def", value: poke.mySp_def}, 
                    {parameter: "speed", value: poke.mySpeed}, 
                ]

                value.sort( (a,b) => {
                    if ( a.value > b.value ) return -1
                    else return 1
                })

                abilityDeclaration(poke)
                changeMyRank(poke, value[0].parameter, 1)
            }
        }
    }
    // 2.防御側のへんしょく/ぎゃくじょう
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )        continue // すでに失敗していないこと
        if ( !isAbility(tgt.poke) )    continue // 対象の特性が有効であること
        if ( tgt.poke.myRest_hp == 0 ) continue // 対象がひんしでないこと

        if ( tgt.poke.myAbility == "へんしょく" ) {
            if ( poke.myCondition.mySheer_force )         continue // ちからずくが無効であること
            if ( tgt.poke.myType == [poke.myMove.type] ) continue // すでに同じタイプでないこと

            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 特性『${tgt.poke.myAbility}』 !`)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ${poke.myMove.type}タイプ になった`)
            tgt.poke.myType = [poke.myMove.type]
        }
        if ( tgt.poke.myAbility == "ぎゃくじょう" ) {
            if ( poke.myCondition.myBerserk ) {
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 特性『${tgt.poke.myAbility}』 !`)
                changeMyRank(tgt.poke, "sp_atk", 1)
                poke.myCondition.myBerserk = false
            }
        }
    }
}

// 16.防御側のもちものの効果
function defenseItemEffect(poke){
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )                   continue // すでに失敗していないこと
        if ( !isItem(tgt.poke) )              continue // 対象の持ち物が有効であること
        if ( tgt.poke.myRest_hp == 0 )        continue // 対象がひんしでないこと
        if ( poke.myCondition.mySheer_force ) continue // ちからずくが無効であること
        if ( tgt.substitute )                 continue // みがわり状態でないこと
        if ( !tgt.damage )                    continue // ダメージを受けていること

        // アッキのみ/タラプのみ
        if ( tgt.poke.myItem == "アッキのみ" && poke.myMove.nature == "物理" ) {
            itemDeclaration(tgt.poke)
            enableToRecycle(tgt.poke)
            changeMyRank(tgt.poke, "def", isRipen(tgt.poke))
        }
        if ( tgt.poke.myItem == "タラプのみ" && poke.myMove.nature == "特殊" ) {
            itemDeclaration(tgt.poke)
            enableToRecycle(tgt.poke)
            changeRank(tgt.poke, "dp_def", isRipen(tgt.poke))
        }
        // だっしゅつボタン/レッドカードによって手持ちに戻るまで
        if ( tgt.poke.myItem == "だっしゅつボタン" && isBench(tgt.poke) ) {
            itemDeclaration(tgt.poke)
            enableToRecycle(tgt.poke)
            tgt.poke.myEject_button = tgt.poke.myPosition
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 手持ちに戻った`)
            toHand(tgt.poke)
        }
        if ( tgt.poke.myItem == "レッドカード" && isBench(poke) && !poke.myCondition.myDynamax ) {
            itemDeclaration(tgt.poke)
            enableToRecycle(tgt.poke)
            poke.myRed_card = poke.myPosition
            writeLog(`${poke.myTN} の ${poke.myName} は 手持ちに戻った`)
            toHand(poke)
        }
    }
}

// 18.いにしえのうた/きずなへんげによるフォルムチェンジ
function formChangeAbility(poke){
    if ( poke.myRest_hp == 0 ) return // 自分がひんしでないこと

    if ( poke.myMove.name == "いにしえのうた" && poke.myName == "メロエッタ(ボイスフォルム)" ) {
        if ( !poke.myCondition.mySheer_force ) { // ちからずくが無効であること
            // if ( con.p_con.includes("状態変化『へんしん』") ) continue
            formChange(poke, "メロエッタ(ステップフォルム)", true)
        }
    }

    if ( poke.myAbility == "きずなへんげ" && isAbility(poke) ) {
        for ( const tgt of poke.myTarget ) {
            if ( !tgt.success ) continue // すでに失敗していないこと
            if ( tgt.poke.myRest_hp == 0 && poke.myName == "ゲッコウガ" ) {
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 特性『${tgt.poke.myAbility}』 !`)
                formChange(poke, "ゲッコウガ(サトシゲッコウガ)", true)
            }
        }
    }

}

// 19.いのちのたまの反動/かいがらのすずの回復
function lifeorbShellbell(poke){
    if ( !isItem(poke) ) return // 自分の持ち物が有効であること
    if ( poke.myRest_hp == 0 ) return // 自分がひんしでないこと
    if ( poke.myCondition.mySheer_force ) return // ちからずくが無効であること

    // いのちのたま
    if ( poke.myItem == "いのちのたま" ) {
        itemDeclaration(poke)
        changeHP(poke, Math.floor(poke.myFull_hp / 10 * isDynamax(poke)), "-")
    }
    // かいがらのすず
    /*
    let damage = 0
    if (move.num > 0) damage = move.damage
    else for (const tgt of con.tgt){
        if (tgt.result == "失敗") continue
        damage += tgt.damage.done
    }
    if (damage == 0) return
    if (poke.myItem == "かいがらのすず"){
        changeHP(me, you, con, Math.floor(damage / 8), "+")
    }
    */
}

// 20.オボンのみなど回復のきのみ/チイラのみ/リュガのみ/ヤタピのみ/ズアのみ/カムラのみ/サンのみ/スターのみ/ミクルのみ/きのみジュース
function recoverBerry(poke){
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( tgt.poke.myRest_hp == 0 ) continue // 対象がひんしでないこと
        eatBerryInPinch(tgt.poke)
    }
    // 攻撃ダメージによって発動する場合のみこの処理順になる。
    // 反動やゴツゴツメット等の効果ダメージやだっしゅつボタンによるきんちょうかんの退場ではその直後に割り込んで発動する。
}

// 21.ききかいひ/にげごしによって手持ちに戻るまで
    // だっしゅつボタンと同時発動した場合は、交代先は両者同時に行う
    // レッドカードと同時発動した場合は、レッドカードの交代が行われた後、ききかいひの交代先を選ぶ
function emergencyExit(poke){
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )                   continue // すでに失敗していないこと
        if ( tgt.poke.myRest_hp == 0 )        continue // 対象がひんしでないこと
        if ( poke.myCondition.mySheer_force ) continue // ちからずくが無効であること
        if ( !isAbility(tgt.poke) )           continue // 特性が有効であること

        if ( tgt.poke.myAbility == "ききかいひ" || tgt.poke.myAbility == "にげごし" ) {

        }

        /*
        if ((tgt.poke.myAbility == "ききかいひ" || tgt.poke.myAbility == "にげごし") 
        && tgt.poke.myRest_hp + damage.done > tgt.full_HP / 2 && 0 < tgt.poke.myRest_hp && tgt.poke.myRest_hp <= tgt.full_HP / 2 && !user[0].f_con.includes("選択中")){
            writeLog(me, you, tgt.TN + "　の　" + tgt.name + "は　" + tgt.poke.myAbility + "で手持ちに戻った" + "\n")
            user[0].f_con += "選択中・・・" + "\n"
            toHand(user[0], user[1], tgt)
        }
        */
    }
}

// 22.とんぼがえり/ボルトチェンジ/クイックターンによって手持ちに戻るまで
function comeBackMove(poke){
    if ( !( poke.myMove.name == "とんぼがえり" || poke.myMove.name == "ボルトチェンジ" || poke.myMove.name == "クイックターン" ) ) return 
    if ( !isBench(poke) )                  return // 控えがいること
    if ( isSwitch(poke.myTarget[0].poke) ) return 
    
    poke.mySwitch = poke.myPosition
    
    // とんぼがえりによる交代はおいうちの対象になる。
    // とんぼがえりの攻撃と交代の間においうちが割り込み、おいうちの威力が2倍になる。
    // とんぼがえりよりおいうちのポケモンが先に動いたときは2倍にならない。
    writeLog(`${poke.myTN} の ${poke.myName} は 手持ちに戻った`)
    toHand(poke)
}


// 23.アイアンローラーによるフィールドの消失
// 使用者が場から去っている場合も発動する
function steelRoller(poke){
    if ( poke.myMove.name == "アイアンローラー" ) {
        if ( fieldStatus.myGrassy )   writeLog(`グラスフイールドが 消え去った`)
        if ( fieldStatus.myElectric ) writeLog(`エレキフイールドが 消え去った`)
        if ( fieldStatus.myMisty )    writeLog(`ミストフイールドが 消え去った`)
        if ( fieldStatus.myPsychic )  writeLog(`サイコフイールドが 消え去った`)
        resetTerrain()
    }
}

// 24.レッドカードによる交代先の繰り出し
function redCard(poke){
    if ( poke.myRed_card === false ) return

    const next = shuffle(isBench(poke))[0]
    const position = poke.myRed_card
    poke.myRed_card = false
    summon(next, position)
}

// 25.わるいてぐせ
function pickPocket(poke){
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( tgt.poke.myAbility == "わるいてぐせ" && isAbility(tgt.poke) ) {
            if ( tgt.poke.myRest_hp == 0 ) continue // 対象がひんしでないこと
            if ( poke.myCondition.mySheer_force ) continue // ちからずくが無効であること
            if ( poke.myItem == "" ) continue // 自分が持ち物を持っていること
            if ( tgt.poke.myItem != "" ) continue // 対象が持ち物を持っていないこと
            if ( poke.myMove.direct == "間接" ) // 直接攻撃であること
            if ( poke.myAbility == "ねんちゃく" && isAbility(poke) ) continue // 自分が特性『ねんちゃく』でないこと
            if ( cannotChangeItem(poke) ) continue // 干渉可能な持ち物であること

            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 特性『${tgt.poke.myAbility}』 !`)
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ${poke.myItem} を奪った`)
            tgt.poke.myItem = poke.myItem
            poke.myItem = ""
        }
    }
}

// 26.一部の技の効果
function someMoveEffect(poke){
    // もえつきるによるタイプの消失
    if ( poke.myMove.name == "もえつきる" ) {
        if ( poke.myRest_hp > 0 ) {
            poke.myType.replace("ほのお", "なし")
            writeLog(`${poke.myTN} の ${poke.myName} の 炎が燃え尽きた`)
        }
    }
    // しぜんのめぐみ使用によるきのみの消費
    if ( poke.myMove.name == "しぜんのめぐみ" ) {
        enableToRecycle(poke)
    }
    // あばれる状態の終了によるこんらん
    /*
    if (con.p_con.includes("状態変化『あばれる』")){
        let check = false
        const text = searchText(con.p_con, "状態変化『あばれる』")
        const turn = Number(text.replace(/[^0-9]/g, "")) + 1
        if (turn == 3 && getRandom() < 0.5) check = true
        if (turn == 4) check = true

        if (check == true){
            removeText(con.p_con, "状態変化『あばれる』")
            writeLog(me, you, con.name + "　は　疲れ果ててた!" + "\n")
            getAbnormal(me, you, con, "こんらん")
        } else {
            rewriteText(con.p_con, text, "状態変化『あばれる』　" + turn + "ターン目：" + poke.myMove.name)
        }
    }
    */
}

// 27.一部の持ち物の効果
function someItemEffect(poke){
    // ヒメリのみ
    // 技の使用によってPP0になった場合のみこの処理順になる。ぶきみなじゅもんの効果ではその直後に割り込んで発動する。
    if ( poke.myItem == "ヒメリのみ" && isItem(poke) ) {
        for ( let i = 0; i < 4; i++ ) {
            if ( poke[`myRest_pp_${i}`] == 0 ) {
                const num = Math.min(10 * isRipen(poke), poke[`myFull_pp_${i}`])
                poke[`myRest_pp_${i}`] = num
                writeLog(`${poke.myTN} の ${poke.myName} は ヒメリのみで ${poke[`myMove_${i}`]}のPPを${num}回復した`)
                enableToRecycle(poke)
                break
            }
        }
    }
    // しろいハーブ
    whiteHerb(poke) // 自分用
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )            continue // すでに失敗していないこと
        if ( tgt.poke.myRest_hp == 0 ) continue // 対象がひんしでないこと
        whiteHerb(tgt.poke)
    }
    // のどスプレー/からぶりほけん
    if ( poke.myItem == "のどスプレー" && isItem(poke) ) {
        if ( musicMove.includes(poke.myMove.name) && poke.myRank_sp_atk < 6 ) {
            itemDeclaration(poke)
            changeMyRank(poke, "sp_atk", 1)
            enableToRecycle(poke)
        }
    }
    // だっしゅつパックによって手持ちに戻るまで
    // 自分用
    if ( poke.myItem == "だっしゅつパック" && isItem(poke) ) {
        if ( isBench(poke) && poke.myCondition.myRank_down ) {
            // だっしゅつボタンやききかいひが発動している場合、だっしゅつパックは発動しない
            let check = true
            for ( const tgt of poke.myTarget ) {
                if ( tgt.myEject_button !== false ) check = false
                if ( tgt.myEmergency    !== false ) check = false
            }
            if ( check ) {
                itemDeclaration(poke)
                poke.myEject_pack = poke.myPosition
                toHand(poke)
            }
        }
    }
    // 攻撃対象用
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )                      continue // すでに失敗していないこと
        if ( !isItem(tgt.poke) )                 continue // アイテムが有効であること
        if ( !isBench(tgt.poke) )                continue // 控えがいること
        if ( !tgt.poke.myCondition.myRank_down ) continue // ランクが下がったこと
        if ( tgt.poke.myItem != "だっしゅつパック" ) continue

        let check = true
        for ( const _tgt of poke.myTarget ) {
            if ( _tgt.myEject_button !== false ) check = false
            if ( _tgt.myEmergency    !== false ) check = false
        }
        if ( check ) continue // だっしゅつボタンやききかいひが発動している場合、だっしゅつパックは発動しない

        itemDeclaration(tgt.poke)
        tgt.myEject_pack = tgt.myPosition
        toHand(tgt.poke)
    }
    // しろいハーブ/だっしゅつパックは追加効果や反動やダイマックス技効果など技自体の効果によって発動する場合のみこの処理順になる
    // (わたげなど技以外の効果ではその直後に割り込んで発動する)
}

// かたやぶりなどの特性無視終了？
function moldBreakStop(poke){
    /*
    for (let i = 0; i < tgt.p_con.split("\n").length; i++){
        if (tgt.p_con.split("\n")[i].includes("かたやぶり：")){
            tgt.poke.myAbility = tgt.p_con.split("\n")[i].slice(6)
        }
    }
    removeText(tgt.p_con, "かたやぶり：")
    */
}

// 23.とんぼがえり/ボルトチェンジ/クイックターン/ききかいひ/にげごし/だっしゅつボタン/だっしゅつパックによる交代先の選択・交代
function returnBattle(poke){
    for ( const _poke of myParty ) {
        if ( isSwitch(_poke) ) {
            writeLog(`${_poke.myTN} は 戦闘に出すポケモンを選んでください`)
            fieldStatus.mySwitch_me = true
            break
        }
    }
    for ( const _poke of oppParty ) {
        if ( isSwitch(_poke) ) {
            writeLog(`${_poke.myTN} は 戦闘に出すポケモンを選んでください`)
            fieldStatus.mySwitch_opp = true
            break
        }
    }
}

// 25.おどりこ
function ability_dancer(poke){

}



