// 追加効果の処理順

// 自分以外全員・相手全員を対象にする範囲攻撃技は、1は敵味方同時に、2~11は味方のポケモンに対する処理を行ってから敵のポケモンの処理を、防御側から見て左側のポケモンから行う(味方2-1~2-9→使用者3→味方4→...→味方11→敵の左側2-1~2-9→右側2-1~2-9→左側3→右側3→...右側11の順)。
// トリプルバトル・群れバトルで相手の場に3匹以上のポケモンが並んでいる場合も、防御側から見て左側のポケモンから処理される。

function processOfAdditionalEffect(poke) {
    if ( poke.myMove.nature == "変化" ) {
        statusMoveEffect(poke)
    } else {
        // 1.対象全員へのダメージ計算
        isDamage(poke)
        // 2.みがわり状態に攻撃技が防がれたときの効果: 本体がダメージを受けたときの処理(4~9)などより優先される
        substituteBlock(poke)
        // 3.じばく/だいばくはつ/ミストバースト/ビックリヘッド/てっていこうせん使用時のダメージ: ひんしになるときは使用者のひんし判定
        dyingDamage(poke)
        // 4.ダメージを本体に与える
        giveDamage(poke)
        // 5.バツグンの相性判定のメッセージ
        superEffective(poke)
        // 6.今ひとつの相性判定のメッセージ
        notVeryEffective(poke)
        // 7.ダメージの判定に関するメッセージ
        damageMassage(poke)
        // 8.ダメージをHP1で耐える効果
        remainHP1(poke)
        // 9.追加効果などの発動
        additionalEffect(poke)
        // 10.ダメージが発生したときの効果
        effectWithDmg(poke)
    }
    // 11.ひんし判定
    dyingJudge(poke)
    // 12.ひんしできんちょうかん/かがくへんかガスが解除されたことによる封じられていた効果の発動(おわりのだいち、はじまりのうみの解除 wikiにない)
    // 13.連続攻撃技である場合、以下の処理を行う(おやこあいも含む)。
    continuousMove(poke)
    // 14.HP20%以下(赤ゲージ)になったとき、なかよし度4以上で「ピンチで なきそう...」のメッセージ
    // 15.技の効果（その1）
    moveEffect1st(poke)
    // 16.特性の効果（その1）
    abilityEffect1st(poke)
    // 17.防御側の持ち物の効果（その3）
    defenseItemEffect3rd(poke)
    // 18.コンビネーションわざの効果
    // 19.いにしえのうた/きずなへんげによるフォルムチェンジ
    formChangeAbility(poke)
    // 20.いのちのたまの反動/かいがらのすずの回復
    lifeorbShellbell(poke)
    // 21.防御側の持ち物の効果（その4）
    defenseItemEffect4th(poke)
    // 22.ききかいひ/にげごしによって手持ちに戻る
    emergencyExit(poke)
    // 23.とんぼがえり/ボルトチェンジ/クイックターンによって手持ちに戻る
    comeBackMove(poke)
    // 24.アイアンローラーによるフィールドの消失
    steelRoller(poke) 
    // 25.わるいてぐせ
    pickPocket(poke)
    // 26.技の効果（その2）
    moveEffect2nd(poke)
    // 27.攻撃側の持ち物の効果
    attackItemEffect(poke)
    // 28.特性の効果（その2）
    abilityEffect2nd(poke)
    // 29.行動後に発動する持ち物の効果
    itemEffectAfterAction(poke)
    // 30.とんぼがえり/ボルトチェンジ/クイックターン/ききかいひ/にげごし/だっしゅつボタン/だっしゅつパックによる交代先の選択・繰り出し
    returnBattle(poke)
    if ( fieldStatus.mySwitch_me ) return
    if ( fieldStatus.mySwitch_opp ) return
    // 31.おどりこ
    // 32.次のポケモンの行動。全ポケモンが行動を完了したときは#5.ターン終了時の処理に進む。
}


// 1.ダメージ計算
function isDamage(poke) {
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

        // 攻撃側のするどいキバ：wikiにない
        tgt.poke.myCondition.myFlinch = isDamage_flinch(poke, tgt) 

        // ダメージ計算
        damageCalculation(poke, tgt)

        // ダメージ計算が行われた場合、以下の順に処理が行われる。
        // 1.計算結果が0になったとき、1になる。
        tgt.damage = Math.max(tgt.damage, 1)
        // 2.ダメージが65536以上のとき、65536で割った余りが代わりのダメージになる。
        tgt.damage = tgt.damage % 65536
        // 3.ダメージが対象のHP残量より大きい場合、HP残量と同じになるようにダメージを切り捨てる。みがわり状態に防がれる場合は、みがわりのHP残量まで切り捨てる。
        tgt.damage = ( tgt.substitute )? Math.min(tgt.damage, tgt.poke.myCondition.mySubstitute ) : Math.min(tgt.damage, tgt.poke.myRest_hp)
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
                tgt.poke.myCondition.myRemaining_HP1 = poke.myMove.name
                tgt.damage -= 1
                continue
            }
            // 3.がんじょう
            if ( tgt.poke.myAbility == "がんじょう" && isAbility(tgt.poke) ) {
                tgt.poke.myCondition.myRemaining_HP1 = "がんじょう"
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
function substituteBlock(poke) {
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
        if ( !tgt.poke.myCondition.mySubstitute ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 身代わりは 消えてしまった....`)
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

// 3.じばく/だいばくはつ/ミストバースト/ビックリヘッド/てっていこうせん使用時のダメージ: ひんしになるときは使用者のひんし判定
function dyingDamage(poke) {
    if ( !poke.myCondition.myExplosion ) return

    switch ( poke.myCondition.myExplosion ) {
        case "full":
            changeHP(poke, poke.myRest_hp, "-")
            break

        case "half":
            const damage = Math.ceil(poke.myFull_hp / 2)
            changeHP(poke, damage, "-")
            break
    }

    poke.myCondition.myExplosion = false
}

// 4.ダメージを本体に与える
function giveDamage(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( tgt.substitute ) continue // みがわり状態でないこと

        // ぎゃくじょう用
        if ( tgt.poke.myAbility == "ぎゃくじょう" && isAbility(tgt.poke)){
            if ( tgt.poke.myRest_hp - tgt.damage <= tgt.poke.myFull_hp / 2 && tgt.poke.myRest_hp > tgt.poke.myFull_hp / 2 ) {
                tgt.poke.myCondition.myBerserk = true
            }
        }

        // ダメージを与える
        if ( tgt.damage > 0 ) {
            tgt.poke.myRest_hp -= tgt.damage
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に ${tgt.damage} のダメージ !`)
        }
        // HPバーの表示
        showHPbar(tgt.poke)

        // ダメおし用
        tgt.poke.myCondition.myAssurance = true
        // ゆきなだれ、リベンジ、カウンター。ミラーコート、メタルバースト用
        // 一撃必殺技の時、おうじゃのしるし・あくしゅうでひるまない、きあいパンチは成功する、ナゾのみ・弱点保険は発動する
        tgt.poke.myCondition.myDamage.value    = tgt.damage
        tgt.poke.myCondition.myDamage.sum      += tgt.damage
        tgt.poke.myCondition.myDamage.party    = poke.myParty
        tgt.poke.myCondition.myDamage.position = poke.myPosition
        tgt.poke.myCondition.myDamage.nature   = poke.myMove.nature
        if ( moveList_oneShot.includes(poke.myMove.name) ) tgt.poke.myCondition.myOne_shot = true
        // がまん用
        if ( tgt.poke.myCondition.myBide.turn ) {
            tgt.poke.myCondition.myBide.damage += tgt.damage
            const tgtPosition = ( poke.myParty == tgt.poke.myParty )? poke.myPosition : poke.myPosition + 2
            tgt.poke.myCondition.myBide.tgt = tgtPosition
        }
    }
}

// 5.バツグンの相性判定のメッセージ
function superEffective(poke) {
    if ( poke.myMove.continuous >= 2 ) return
    // 連続攻撃技のときは12-4.まで相性(4~5)のメッセージは出ない。ただしみがわり状態に防がれたときは1発ごとに相性のメッセージが出る。
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )   continue // すでに失敗していないこと
        if ( tgt.substitute ) continue // みがわり状態に防がれないこと

        if ( tgt.effective > 1 ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に 効果は バツグンだ !`)
    }
}

// 6.今ひとつの相性判定のメッセージ
function notVeryEffective(poke) {
    if ( poke.myMove.continuous >= 2 ) return
    // 連続攻撃技のときは12-4.まで相性(4~5)のメッセージは出ない。ただしみがわり状態に防がれたときは1発ごとに相性のメッセージが出る。
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )   continue // すでに失敗していないこと
        if ( tgt.substitute ) continue // みがわり状態に防がれないこと

        if ( tgt.effective < 1 ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に 効果は 今ひとつのようだ......`)
    }
}

// 7.ダメージの判定に関するメッセージ
function damageMassage(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( tgt.substitute ) continue // みがわり状態でないこと

        // 1.急所判定のメッセージ
        if ( tgt.critical ) writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} の 急所に 当たった !`)
        // 2.Zワザ/ダイマックスわざをまもる状態などで軽減したときのメッセージ
            // 「<対象>は 攻撃を 守りきれずに ダメージを 受けた!」
    }

}

// 8.ダメージをHP1で耐える効果
function remainHP1(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        switch ( tgt.poke.myCondition.myRemaining_HP1 ) {
            // 1.こらえる
            case "こらえる":
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 攻撃をこらえた !`)
                tgt.poke.myCondition.myRemaining_HP1 = false
                break
            // 2.みねうち/てかげん: メッセージは表示されないが、以降の効果が発動しない。
            case "みねうち":
            case "てかげん":
                tgt.poke.myCondition.myRemaining_HP1 = false
                break
            // 3.がんじょう
            case "がんじょう":
                abilityDeclaration(tgt.poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 攻撃をこらえた !`)
                tgt.poke.myCondition.myRemaining_HP1 = false
                break
            // 4.きあいのタスキ/きあいのハチマキ
            case "きあいのタスキ":
            case "きあいのハチマキ":
                itemDeclaration(poke)
                writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 攻撃をこらえた !`)
                tgt.poke.myCondition.myRemaining_HP1 = false
                break
            // 5.なかよし度: 「<ポケモン>は <プレイヤー>を 悲しませまいと もちこたえた!」
            // ダメージ自体に影響するので効果は1.時点で現れているが、メッセージはこの時点で流れる。
            default:
                break
        }
    }
}

// 9.追加効果などの発動
function additionalEffect(poke) {
    // 0.「反動で動けない状態」などの付与　（wikiにはない）
    if ( moveList_cannotMove.includes(poke.myMove.name) ) {
        poke.myCondition.myCant_move = poke.myMove.name
    }

    switch ( poke.myMove.name ) {
        case "あばれる":
        case "はなびらのまい":
        case "げきりん":
            poke.myCondition.myThrash.name = poke.myMove.name
            poke.myCondition.myThrash.turn += 1
            break

        case "さわぐ":
            poke.myCondition.myUproar += 1
            break

        case "なみのり":
            if ( !isAbility(poke) ) break
            if ( poke.myAbility != "うのミサイル" ) break
            if ( poke.myCondition.myGulp_missile ) break

            if ( poke.myRest_hp > poke.myFull_hp / 2 ) {
                poke.myCondition.myGulp_missile = "うのみのすがた"
                writeLog(`${poke.myTN} の ${poke.myName} は うのみのすがたに 姿を変えた !`)
            } else {
                poke.myCondition.myGulp_missile = "まるのみのすがた"
                writeLog(`${poke.myTN} の ${poke.myName} は まるのみのすがたに 姿を変えた !`)
            }
        }
    // removeText(con.p_con, "状態変化『がまん』")

    // 1.なげつける使用による持ち物の消費
    if ( poke.myMove.name == "なげつける" ) {
        poke.myCondition.myFling = poke.myItem
        poke.myItem = ""
        // こだわり解除
        poke.myCondition.myChoice = {item: false, ability: false}
        // どの持ち物でも行う処理
        enableToRecycle(poke)
    }
    
    // 2.技の効果
    // 追加効果 (ひみつのちから/オリジンズスーパーノヴァ/ぶきみなじゅもんを除く)
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( tgt.poke.myRest_hp == 0 ) continue
        if ( isSheerForce(poke) ) continue

        // 追加効果（自分のランク変化）
        additionalEffect_myRank(poke, tgt)

        if ( tgt.substitute ) continue
        if ( tgt.poke.myAbility == "りんぷん" && isAbility(tgt.poke) ) continue

        // 追加効果（相手のランク変化）
        additionalEffect_tgtRank(poke, tgt)
        // 追加効果（状態異常）
        additionalEffect_ailment(poke, tgt)
        // 追加効果（ひるみ）
        additionalEffect_flinch(poke, tgt)
        // 追加効果（その他）
        additionalEffect_other(poke, tgt)
    }

    // 追加効果以外の効果
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( tgt.poke.myRest_hp == 0 ) continue

        // 自分のランクが下がる技の効果
        additionalEffect_downMyRank(poke, tgt)
        // HP吸収技の吸収効果/ヘドロえきのダメージ効果
        additionalEffect_recover(poke, tgt)
        // はじけるほのおによる火花のダメージ
        additionalEffect_flameBurst(poke, tgt)
        // ダイマックスわざの効果
        additionalEffect_dynamax(poke, tgt)
    }
}

// 10.ダメージが発生したときの効果
function effectWithDmg(poke) {
    for ( const tgt of poke.myTarget ) {
        // ばけのかわ・アイスフェイス以外、1以上のダメージがある
        if ( !tgt.success ) continue // すでに失敗していないこと

        // 1.コアパニッシャーによるとくせいなし
        effectWithDmg_coreEnforcer(poke, tgt)

        // コアパニッシャーはみがわり状態のポケモンも特性なし状態にできる
        if ( tgt.substitute ) continue // みがわりが有効でないこと

        // 2.防御側のいかりによるこうげき上昇
        effectWithDmg_rage(poke, tgt)
        // 3.クリアスモッグによるランク補正のリセット
        effectWithDmg_clearSmog(poke, tgt)
        // 4.防御側のおんねんによるPP消失
        effectWithDmg_grudge(poke, tgt)
        // 5.防御側のくちばしキャノンによるやけど
        effectWithDmg_beakBlast(poke, tgt)
        // 6.攻撃側のどくしゅによるどく
        effectWithDmg_poisonTouch(poke, tgt)
        // 7.防御側の特性
        effectWithDmg_defAbility(poke, tgt)
        // 8.相性に関するきのみ
        effectWithDmg_berry(poke, tgt)
        // 9.やきつくすによるきのみ/ジュエル6-の消失
        effectWithDmg_incinerate(poke, tgt)
        // 10.防御側のもちもの
        effectWithDmg_defItem(poke,tgt)
        // 11.防御側のばけのかわ/アイスフェイス
        effectWithDmg_mask(poke, tgt)
        // 12.直接攻撃のZワザを守りきれなかったとき、ニードルガード/トーチカ/キングシールドの効果
        // トラップシェルの起爆判定（wikiにない）
        if ( tgt.poke.myCondition.myShell_trap == "set" ) {
            if ( poke.myMove.nature == "物理" && !isSheerForce(poke) && spirit ) {
                tgt.poke.myCondition.myShell_trap = false
            }
        }
    }
}



// 11.ひんし判定
function dyingJudge(poke) {
    // 1.いのちがけ使用者のひんし: 防御側にダメージを与え、特性や持ち物の効果が発動した後にひんしになる
    if ( poke.myMove.name == "いのちがけ" ) {
        poke.myRest_hp = 0
        toHand(poke)
    }

    let destiny = false // みちづれチェック

    // 2.防御側のひんし
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( tgt.poke.myRest_hp > 0 ) continue // 体力が0であること

        // 道連れ判定
        if ( tgt.poke.myCondition.myDestiny_bond && !poke.myCondition.myDynamax ) destiny = tgt.poke
        // 手持ちに戻る
        toHand(tgt.poke)
    }

    // 3.味方の特性や持ち物の効果による攻撃側のひんし

    // 4.みちづれによる攻撃側のひんし: 防御側にダメージを与え、特性や持ち物の効果が発動した後にひんしになる
    if ( destiny ) {
        writeLog(`${destiny.myTN} の ${destiny.myName} は ${poke.myTN} の ${poke.myName} を みちづれにした !`)
        poke.myRest_hp = 0
        toHand(poke)
    }
}

// 12.ひんしできんちょうかん/かがくへんかガスが解除されたことによる封じられていた効果の発動(おわりのだいち、はじまりのうみの解除 wikiにない)
// コアパニッシャーによりとくせいなし状態にされたときは即座に封じられていた効果が発動する。

// 13.連続攻撃技である場合、以下の処理を行う(おやこあいも含む)。
function continuousMove(poke) {
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
        // 1.攻撃側と防御側の持ち物 ( (21) で発動するきのみ/きのみジュース/シード系アイテム等) の発動判定を行う。
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
        // 3.じばく/だいばくはつ/ミストバースト/ビックリヘッド/てっていこうせん使用時のダメージ: ひんしになるときは使用者のひんし判定
        dyingDamage(poke)
        // 4.ダメージを本体に与える
        giveDamage(poke)
        // 5.バツグンの相性判定のメッセージ
        superEffective(poke)
        // 6.今ひとつの相性判定のメッセージ
        notVeryEffective(poke)
        // 7.ダメージの判定に関するメッセージ
        damageMassage(poke)
        // 8.ダメージをHP1で耐える効果
        remainHP1(poke)
        // 9.追加効果などの発動
        additionalEffect(poke)
        // 10.ダメージが発生したときの効果
        effectWithDmg(poke)
        // 11.ひんし判定
        dyingJudge(poke)

        count += 1
    }

    writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} に ${count}発 当たった !`)
}

// 15.技の効果（その1）
function moveEffect1st(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        // ほのおタイプの攻撃技を受けたことによるこおり状態の回復
        moveEffect1st_melted(poke, tgt)

        // ほのおタイプの技によるこおり状態の回復は使用者が場から去っている場合も発動する。
        // それ以外の技の効果は使用者が場から去っていると発動しない。
        if ( poke.myRest_hp == 0 ) continue

        // 反動技による反動ダメージ (わるあがきも含む)
        moveEffect1st_recoil(poke, tgt)
        // バインド状態
        moveEffect1st_bind(poke, tgt)
        // ひみつのちからの追加効果
        moveEffect1st_secretPower(poke, tgt)
        // とどめばりによるこうげき上昇
        moveEffect1st_fellStinger(poke, tgt)
        // スケイルショットによるぼうぎょ低下・すばやさ上昇
        moveEffect1st_scaleShot(poke, tgt)
        // はたきおとす/どろぼう/ほしがる/むしくい/ついばむによるもちものに関する効果
        moveEffect1st_item(poke, tgt)
        // ドラゴンテール/ともえなげによる交代・交代先の繰り出し
        moveEffect1st_changeTgt(poke, tgt)
        // うちおとす/サウザンアローによるうちおとす状態
        moveEffect1st_smackDown(poke, tgt)
        // サウザンウェーブ/くらいつくによるにげられない状態
        moveEffect1st_cantEscape(poke, tgt)
        // プラズマフィストによるプラズマシャワー状態
        moveEffect1st_ionDeluge(poke, tgt)
        // オリジンズスーパーノヴァによるサイコフィールド状態
        moveEffect1st_genesisSupernova(poke, tgt)
        // こうそくスピン/ラジアルエッジストームによる場の状態の解除
        moveEffect1st_clearField(poke, tgt)
        // ねっさのだいち/ねっとう/スチームバーストを受けたことによるこおり状態の回復
        moveEffect1st_melt(poke, tgt)
        // きつけを受けたことによるまひ状態の回復
        moveEffect1st_smellingSalts(poke, tgt)
        // めざましビンタを受けたことによるねむり状態の回復
        moveEffect1st_wakeUpSlap(poke, tgt)
        // うたかたのアリアを受けたことによるやけど状態の回復
        moveEffect1st_sparklingAria(poke, tgt)
        // ぶきみなじゅもんによるPPの減少
        moveEffect1st_eerieSpell(poke, tgt)
    }
}

// 16.特性の効果（その1）
function abilityEffect1st(poke) {
    // 1.攻撃側のマジシャン/じしんかじょう/ビーストブースト/くろのいななき/しろのいななき
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        abilityEffect1st_attack(poke, tgt)
    }
    // 2.防御側のへんしょく/ぎゃくじょう
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        abilityEffect1st_defense(poke, tgt)
    }
}

// 17.防御側の持ち物の効果（その3）
function defenseItemEffect3rd(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        defenseItemEffect3rd_item(poke, tgt)
    }
}

// 19.いにしえのうた/きずなへんげによるフォルムチェンジ
function formChangeAbility(poke) {
    if ( poke.myRest_hp == 0 ) return // 自分がひんしでないこと
    if ( !isAbility(poke) ) return

    switch ( poke.myMove.name ) {
        case "いにしえのうた":
            if ( poke.myName != "メロエッタ(ボイスフォルム)" ) break
            if ( isSheerForce(poke) ) break // ちからずくが無効であること
            // if ( con.p_con.includes("状態変化『へんしん』") ) continue
            formChange(poke, "メロエッタ(ステップフォルム)", true)
            break

        case "きずなへんげ":
            for ( const tgt of poke.myTarget ) {
                if ( !tgt.success ) continue // すでに失敗していないこと
                if ( tgt.poke.myRest_hp > 0 ) continue
                if ( poke.myName != "ゲッコウガ" ) continue

                abilityDeclaration(poke)
                formChange(poke, "ゲッコウガ(サトシゲッコウガ)", true)
                break
            }
        
        default:
            break
    }

}

// 20.いのちのたまの反動/かいがらのすずの回復
function lifeorbShellbell(poke) {
    // 合計ダメージの削除
    let damage = 0
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        damage += tgt.poke.myCondition.myDamage.sum
        tgt.poke.myCondition.myDamage.sum = 0
    }

    if ( !isItem(poke) ) return // 自分の持ち物が有効であること
    if ( poke.myRest_hp == 0 ) return // 自分がひんしでないこと
    if ( isSheerForce(poke) ) return // ちからずくが無効であること

    // いのちのたま
    if ( poke.myItem == "いのちのたま" ) {
        itemDeclaration(poke)
        changeHP(poke, Math.floor(poke.myFull_hp / 10 * isDynamax(poke)), "-")
    }
    // かいがらのすず
    if ( poke.myItem == "かいがらのすず" ) {
        itemDeclaration(poke)
        changeHP(poke, Math.floor(damage / 8), "+")
    }
}

// 21.防御側の持ち物の効果（その4）
function defenseItemEffect4th(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと
        if ( tgt.poke.myRest_hp == 0 ) continue // 対象がひんしでないこと
        eatBerryInPinch(tgt.poke)
    }

    // オボンのみなど回復のきのみ/チイラのみ/リュガのみ/ヤタピのみ/ズアのみ/カムラのみ/サンのみ/スターのみ/ミクルのみ/きのみジュース
        // 攻撃側が反動やゴツゴツメット等のダメージを受けた際や、防御側のきんちょうかんがだっしゅつボタンで退場した際ではその直後に割り込んで発動する。
    // エレキシード/グラスシード/ミストシード/サイコシード/ルームサービス
        // ランク補正が限界だったため発動できなかったとき、攻撃技でダメージを受けるとこのタイミングで発動する。ダイマックスわざなどでフィールドが変化した際や、攻撃側が反動等のダメージを受けた際はその直後に発動する。
}

// 22.ききかいひ/にげごしによって手持ちに戻る
    // だっしゅつボタンと同時発動した場合は、交代先は両者同時に行う
    // レッドカードと同時発動した場合は、レッドカードの交代が行われた後、ききかいひの交代先を選ぶ
function emergencyExit(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success )            continue // すでに失敗していないこと
        if ( tgt.poke.myRest_hp == 0 ) continue // 対象がひんしでないこと
        if ( isSheerForce(poke) )      continue // ちからずくが無効であること
        if ( !isAbility(tgt.poke) )    continue // 特性が有効であること
        if ( tgt.poke.myRest_hp > tgt.poke.myFull_hp / 2 )               continue // 残りHPが半分以下であること
        if ( tgt.poke.myRest_hp + tgt.damage <= tgt.poke.myFull_hp / 2 ) continue // この攻撃で半分以下になったこと
        if ( tgt.poke.myAbility != "ききかいひ" && tgt.poke.myAbility != "にげごし" ) continue

        tgt.poke.myEmergency = tgt.poke.myPosition
        abilityDeclaration(tgt.poke)
        writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は 手持ちに戻った`)
        toHand(tgt.poke)
    }
}

// 23.とんぼがえり/ボルトチェンジ/クイックターンによって手持ちに戻る
function comeBackMove(poke) {
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


// 24.アイアンローラーによるフィールドの消失
// 使用者が場から去っている場合も発動する
function steelRoller(poke) {
    if ( poke.myMove.name == "アイアンローラー" ) {
        if ( fieldStatus.myGrassy )   writeLog(`グラスフイールドが 消え去った`)
        if ( fieldStatus.myElectric ) writeLog(`エレキフイールドが 消え去った`)
        if ( fieldStatus.myMisty )    writeLog(`ミストフイールドが 消え去った`)
        if ( fieldStatus.myPsychic )  writeLog(`サイコフイールドが 消え去った`)
        resetTerrain()
    }
}

// 25.わるいてぐせ
function pickPocket(poke) {
    for ( const tgt of poke.myTarget ) {
        if ( !tgt.success ) continue // すでに失敗していないこと

        if ( tgt.poke.myAbility == "わるいてぐせ" && isAbility(tgt.poke) ) {
            if ( tgt.poke.myRest_hp == 0 ) continue // 対象がひんしでないこと
            if ( isSheerForce(poke) ) continue // ちからずくが無効であること
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

// 26.技の効果（その2）
function moveEffect2nd(poke) {
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

// 27.攻撃側の持ち物の効果
function attackItemEffect(poke) {
    // ヒメリのみ
    attackItemEffect_leppaBerry(poke)
    // のどスプレー
    attackItemEffect_throatSpray(poke)
    // からぶりほけん
    attackItemEffect_blunderPolicy(poke)

    // しろいハーブ/だっしゅつパックは追加効果や反動やダイマックス技効果など技自体の効果によって発動する場合のみこの処理順になる
    // (わたげなど技以外の効果ではその直後に割り込んで発動する)
}

// 28.特性の効果（その2）
function abilityEffect2nd(poke) {
    // かたやぶり解除（？）

    // じゅうなん/すいほう/どんかん/パステルベール/ふみん/マイペース/マグマのよろい/みずのベール/めんえき/やるき
    // かたやぶりの効果で特性を無視されたときに発動し、状態異常/状態変化を治す。
    healAilmentForAbility(poke)

    // きょうせいが発動可能になる
}

// 29.行動後に発動する持ち物の効果
function itemEffectAfterAction(poke) {
    // しろいハーブ
    itemEffectAfterAction_whiteHerb(poke)
    // だっしゅつパックによって手持ちに戻る
    itemEffectAfterAction_ejectPack_me(poke)
    itemEffectAfterAction_ejectPack_opp(poke)
}

// 30.とんぼがえり/ボルトチェンジ/クイックターン/ききかいひ/にげごし/だっしゅつボタン/だっしゅつパックによる交代先の選択・繰り出し
    // ドラゴンテール/ともえなげは発動直後に強制交代される
function returnBattle(poke) {
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

