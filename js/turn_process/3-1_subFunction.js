//**************************************************
// 6.他の技が出る技により技を置き換え、(3-9~11)の行程を繰り返す
//**************************************************

function getNextMove(poke) {
    const target = isTarget(poke)
    const tgt = ( target )? target[0] : false

    switch ( poke.myMove.name ) {
        case "オウムがえし":
            if ( !tgt ) return false // ターゲットがいない時
            const history = tgt.myCondition.myHistory
            if ( !history ) return false           // 対象が技を使っていない
            const mirrorMoveName = history[0].name   // 最後の技の名前
            const mirrorMoveTgt  = history[0].target // 最後の技の対象

            // 例外的にコピーできる技
            switch ( mirrorMoveName ) {
                case "トリックルーム":
                case "ワンダールーム":
                case "マジックルーム":
                case "フェアリーロック":
                    return mirrorMoveName
            }

            // 対象によりコピーできない技
            switch ( mirrorMoveTgt ) {
                case "自分":
                case "味方の場":
                case "相手の場":
                case "全体の場":
                case "味方全員":
                case "全員":
                case "味方1体": // てだすけ・てをつなぐ・アロマミスト
                case "自分か味方": // つぼをつく
                    return false
            }

            // それ以外にコピーできない技
            if ( moveList_disable_mirrorMove.includes(mirrorMoveName) ) return false
            if ( !isNormalMove(mirrorMoveName) ) return false

            // コピーされる技
            return mirrorMoveName

        case "さきどり":
            if ( !tgt ) return false // ターゲットがいない時
            if ( tgt.myCmd_move === "" ) return false
            if ( isHide(tgt) ) return false
            const nextMove = selectedMove(tgt)
            if ( nextMove.nature == "変化" ) return false
            if ( moveList_disable_meFirst.includes(nextMove.name) ) return false

            return nextMove.name

        case "しぜんのちから":
            if ( fieldStatus.myElectric ) return "10まんボルト"
            if ( fieldStatus.myGrassy )   return "エナジーボール"
            if ( fieldStatus.myMisty )    return "ムーンフォース"
            if ( fieldStatus.myPsychic )  return "サイコキネシス"
            return "トライアタック"

        case "ねごと":
            if ( !( poke.myAilment == "ねむり" || poke.myAbility == "ぜったいねむり" && isAbility(poke) ) ) return false
            const myMoveList = [poke.myMove_0, poke.myMove_1, poke.myMove_2, poke.myMove_3]
            const sleepTalkList = myMoveList.filter( move => !moveList_disable_sleepTalk.includes(move) && !accumulationMove.includes(move) )
            if ( !sleepTalkList ) return false // ねごとで出る技が一つもない時
            const sleepTalkMove = shuffle(sleepTalkList)[0]
            return sleepTalkMove

        case "ねこのて":
            let ourMoveList = []
            for ( const _poke of myParty ) {
                for ( let i = 0; i < 4; i++ ) {
                    if ( _poke[`myMove_${i}`] ) ourMoveList.push(_poke[`myMove_${i}`])
                }
            }
            const catHandList = ourMoveList.filter( move => !moveList_disable_assistMove.includes(move) )
            if ( !catHandList ) return false // ねこのてで出る技が一つもない時
            const catHandMove = shuffle(catHandList)[0]
            return catHandMove

        case "まねっこ":
            break

        case "ゆびをふる":
            while ( true ) {
                const metronomeMoveNum = Math.floor(getRandom() * moveList.length)
                const metronomeMoveName = moveList[metronomeMoveNum].name
                // ゆびをふるで出ない技
                if ( moveList_disable_metronome.includes(metronomeMoveName) ) continue
                if ( !isNormalMove(metronomeMoveName) ) continue
                return metronomeMoveName
            }
    }

    return null
}

//**************************************************
// 13.技の仕様による失敗
//**************************************************

function failureBySpec_spec(poke) {
    const target = poke.myTarget
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
            if ( poke.myCondition.myDamage.nature != "物理" ) return true // 適格なダメージをそのターンは受けていない
            if ( poke.myParty == poke.myDamage.party ) return true // 味方からのダメージ
            return false
        
        case "ミラーコート":
            if ( poke.myCondition.myDamage.nature != "特殊" ) return true // 適格なダメージをそのターンは受けていない
            if ( poke.myParty == poke.myDamage.party ) return true // 味方からのダメージ
            return false
        
        case "メタルバースト":
            if ( !poke.myCondition.myDamage.value ) return true // 適格なダメージをそのターンは受けていない
            if ( poke.myParty == poke.myDamage.party ) return true // 味方からのダメージ
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
            if ( !itemList_berry.includes(poke.myItem) ) return true // きのみを持っていない
            return false
        
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
            if ( !target[0].poke.myCondition.myHistory ) return true // 対象が技を使っていない（wikiには載っていない）
            return false
        
        case "ギフトパス":
            if ( !target ) return false
            if ( !poke.myItem ) return true // 自分が持ち物を持っていない
            if ( target[0].poke.myItem ) return true // 対象が持ち物を持っている
            if ( cannotChangeItem(poke) ) return true
            return false
        
        case "ふいうち":
            if ( !target ) return false
            if ( target[0].poke.myCmd_move === "" ) return true // 対象がすでに行動済み
            if ( moveSearchByName(target[0][`myMove_${target[0].myCmd_move}`]).nature == "変化" ) return true // 変化技を選択している
            return false
        
        case "ポルターガイスト":
            if ( !target ) return false
            if ( !target[0].poke.nyItem ) return true // 対象が持ち物を持っていない
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
        
        case "みちづれ":
            if ( !history ) return false // 行動していない
            if ( history[0].name == "みちづれ" && history[0].success ) return true // 前回まで最後に成功した行動がみちづれである
            return false
        
        case "みらいよち":
        case "はめつのねがい":
            const futureParty = ( poke.myCmd_tgt <= 1 )? isField(poke).myParty : isOppField(poke).myField
            for ( const futureSight of fieldStatus.myFuture_sight ) {
                if ( futureSight.party    != futureParty )    continue
                if ( futureSight.position != poke.myCmd_tgt ) continue
                return true // 対象の場がすでにみらいにこうげき状態になっている
            }
            return false
        
        case "もえつきる":
            if ( !poke.myType.includes("ほのお") ) return true // 使用者がほのおタイプではない
            return false
        
        case "いびき":
        case "ねごと":
            if ( poke.myAilment == "ねむり" ) return false
            if ( poke.myAbility == "ぜったいねむり" && isAbility(poke) ) return false
            return true // 使用者がねむり状態でない

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

    return false
}

//**************************************************
// 19.特性による失敗
//**************************************************

function failureByAbility_ability(poke) {
    // しめりけ: 爆発技
    if ( moisture.includes(poke.myMove.name) ) {
        for ( const _poke of allPokeInBattle() ) {
            if ( _poke.myAbility == "しめりけ" && isAbility(_poke) ) {
                abilityDeclaration(_poke)
                return true
            }
        }
    }
    // じょおうのいげん/ビビッドボディ: 優先度が高い技
    if ( poke.myMove.priority <= 0 ) return false
    for ( const tgt of poke.myTarget ) {
        if ( !isAbility(tgt) ) continue
        if ( poke.myParty == tgt.poke.myParty ) continue
        if ( tgt.myAbility == "じょおうのいげん" || tgt.myAbility == "ビビッドボディ" ) {
            abilityDeclaration(tgt)
            return true
        }
    }

    return false
}

//**************************************************
// 38.特性による無効化(その1)
//**************************************************

// 特性による無効化
function invalidByAbility1st_ability(poke, tgt) {
    switch ( tgt.poke.myAbility ) {
        case "そうしょく":
            if ( poke.myMove.type != "くさ" ) return false
            return true
        
        case "もらいび":
            if ( poke.myMove.type != "ほのお" ) return false
            return true
        
        case "かんそうはだ":
        case "ちょすい":
            if ( poke.myMove.type != "みず" ) return false
            return true
        
        case "よびみず":
            if ( poke.myMove.type != "みず" ) return false
            return true
        
        case "ひらいしん":
            if ( poke.myMOve.type != "でんき" ) return false
            if ( poke.myMove.name == "じばそうさ" ) return false
            return true
        
        case "でんきエンジン":
            if ( poke.myMOve.type != "でんき" ) return false
            if ( poke.myMove.name == "じばそうさ" ) return false
            return true
        
        case "ちくでん":
            if ( poke.myMOve.type != "でんき" ) return false
            if ( poke.myMove.name == "じばそうさ" ) return false
            return true
        
        case "ぼうおん":
            if ( !musicMove.includes(poke.myMove.name) ) return false
            return true
        
        case "テレパシー":
            if ( poke.myMove.nature == "変化" ) return false
            if ( isSpirit(poke, tgt.poke) ) return false
            return true

        case "ふしぎなまもり":
            if ( compatibilityCheck(poke, tgt.poke) > 1 ) return false
            if ( poke.myMove.nature == "変化" ) return false
            return true
        
        case "ぼうじん":
            if ( !powderMove.includes(poke.myMove.name) ) return false
            return true
    }

    return false
}

function invalidByAbility1st_ability_effect(poke, tgt) {
    switch ( tgt.poke.myAbility ) {
        case "そうしょく":
            changeRank(tgt.poke, "atk", 1, isSpirit(poke, tgt.poke))
            break
        
        case "もらいび":
            writeLog(`${tgt.poke.myTN} の ${tgt.poke.myName} は ほのおの威力が上がった !`)
            tgt.poke.myCondition.myFlash_fire = true
            break
        
        case "かんそうはだ":
        case "ちょすい":
        case "ちくでん":
            const damage = Math.floor(tgt.poke.myFull_hp / 4 * isDynamax(tgt.poke))
            changeHP(tgt.poke, damage, "+")
            break
        
        case "よびみず":
        case "ひらいしん":
            changeRank(tgt.poke, "sp_atk", 1, isSpirit(poke, tgt.poke))
            break
        
        case "でんきエンジン":
            changeRank(tgt.poke, "speed", 1, isSpirit(poke, tgt.poke))
            break
        
        case "ぼうおん":
        case "テレパシー":
        case "ふしぎなまもり":
        case "ぼうじん":
            break
    }
}

//**************************************************
// 43.特性による無効化(その2)
//**************************************************

function invalidByAbility2nd_ability(poke, tgt) {
    switch ( tgt.poke.myAbility ) {
        case "ぼうだん":
            if ( ballMove.includes(poke.myMove.name) ) return true
            return false
        
        case "ねんちゃく":
            if ( poke.myMove.name == "トリック" ) return true
            if ( poke.myMove.name == "すりかえ" ) return true
            if ( poke.myMove.name == "ふしょくガス" ) return true
            return false
    }

    return false
}

//**************************************************
// 44.タイプによる技の無効化(その1)
//**************************************************

// タイプによる無効化
function invalidByType1st_type(poke, tgt) {
    // くさタイプ: 粉技の無効化
    if ( tgt.poke.myType.includes("くさ") ) {
        if ( powderMove.includes(poke.myMove.name) ) return true
    }
    // ゴーストタイプ: にげられない状態にする変化技の無効化
    if ( tgt.poke.myType.includes("ゴースト") ) {
        if ( poke.myMove.name == "クモのす" ) return true
        if ( poke.myMove.name == "くろいまなざし" ) return true
        if ( poke.myMove.name == "たこがため" ) return true
        if ( poke.myMove.name == "とおせんぼう" ) return true
    }
    // あくタイプ: いたずらごころの効果が発動した技の無効化
    if ( tgt.poke.type.includes("あく") ) {
        if ( poke.myAbility == "いたずらごころ" && isAbility(poke) && poke.myMove.nature == "変化" && poke.myMove.priority > 0 ) return true
    }
    // こおりタイプ: ぜったいれいどの無効化
    if ( tgt.poke.myType.includes("こおり") ) {
        if ( poke.myMove.name == "ぜったいれいど" ) return true
    }

    return false
}

//**************************************************
// 45.技の仕様による無効化(その1)
//**************************************************

// 技の使用による無効化
function invalidBySpec1st_spec(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "メロメロ":
            if ( poke.myGender == "-" )               return true
            if ( tgt.poke.myGender == "-" )           return true
            if ( poke.myGender == tgt.poke.myGender ) return true
            return false

        case "ゆうわく": // (wikiにない)
            if ( poke.myGender == "♂" && tgt.poke.myGender == "♀" ) return false
            if ( poke.myGender == "♀" && tgt.poke.myGender == "♂" ) return false
            return true

        case "いちゃもん":
            if ( tgt.poke.myCondition.myDynamax ) return true
            return false

        case "ベノムトラップ":
            if ( tgt.poke.myAilment != "どく" ) return true
            return false
    }

    return false
}

//**************************************************
// 46.技の仕様による無効化(その2)
//**************************************************

// 重複による無効化
function invalidBySpec2nd_duplicate(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "あくび":
            if ( !tgt.poke.myAilment )         return true // 対象がすでに状態異常になっている
            if ( tgt.poke.myCondition.myYawn ) return true // 対象がすでにあくび状態になっている
            return false
        
        case "あくむ":
            if ( tgt.poke.myCondition.myNightmare ) return true // 対象がすでにあくむ状態になっている　（wikiにはなかった）
            return false
        
        case "いちゃもん":
            if ( tgt.poke.myCondition.myTorment ) return true // 対象がすでにいちゃもん状態である
            return false

        case "とぎすます":
            if ( tgt.poke.myCondition.myLaser_focus ) return true // 自身がすでにとぎすます状態である　（wikiにはなかった）
            return false
        
        case "かぎわける":
        case "みやぶる":
        case "ミラクルアイ":
            if ( tgt.poke.myCondition.myForesight ) return true // 対象がすでにみやぶられている状態である　（wikiにはなかった）
            return false
        
        case "ほごしょく":
            if ( fieldStatus.myGrassy   && poke.myType.includes("くさ") ) return true // 自身が同じタイプを持っている (wikiにない)
            if ( fieldStatus.myElectric && poke.myType.includes("でんき") ) return true
            if ( fieldStatus.myMisty    && poke.myType.includes("フェアリー") ) return true
            if ( fieldStatus.myPsychic  && poke.myType.includes("エスパー") ) return true
            if ( !( fieldStatus.myGrassy || fieldStatus.myElectric || fieldStatus.myMisty || fieldStatus.myPsychic ) && poke.myType.includes("ノーマル")) return true
            return false
        
        case "なやみのタネ":
            if ( tgt.poke.myAbility == "ふみん" ) return true // 対象がすでにふみんである
            return false

        case "ねをはる":
            if ( tgt.poke.myCondition.myIngrain ) return true // 自身がすでにねをはる状態である
            return false

        case "ほろびのうた":
            if ( tgt.poke.myCondition.myPerish_song ) return true // 対象がすでにほろびのうた状態である
            return false

        case "ミラクルアイ":
            if ( tgt.poke.myCondition.myMiracle_eye ) return true // 対象がすでにミラクルアイ状態である
            return false

        case "メロメロ":
            if ( tgt.poke.myCondition.myAttract !== false ) return true // 対象がすでにメロメロ状態である
            return false

        case "やどりぎのタネ":
            if ( tgt.poke.myCondition.myLeech_seed ) return true // 対象がすでにやどりぎのタネ状態である
            return false
    }
}

// 状態異常にする変化技
function invalidBySpec2nd_ailment(poke, tgt) {
    const abnormalMove = statusMoveToMakeAbnormalForOneOfThem.concat(statusMoveToMakeAbnormalForAllOfYou, statusMoveToMakeAbnormalForExceptForme)
    for ( const element of abnormalMove ) {
        if ( poke.myMove.name == element.name ) {
            // 対象がすでにこんらんになっている
            if ( element.ailment == "こんらん" && tgt.poke.myCondition.myConfusion ) return true
            // 対象がすでに同じ・別の状態異常になっている
            if ( element.ailment != "こんらん" && tgt.poke.myAilment ) return true
        }
    }
    return false
}

// ランク補正に関する無効化
function invalidBySpec2nd_rank(poke, tgt) {
    const rankMove = statusMoveToChangeRankForOneOfThem.concat(statusMoveToChangeRankForMe, statusMoveToChangeRankForAllOfUs, statusMoveToChangeRankForAllOfYou)
    for ( const element of rankMove ) {
        if ( poke.myMove.name == element.name ) {
            for ( const rank of element.rank ) {
                if ( rank.change > 0 && tgt.poke[`myRank_${rank.parameter}`] != 6 )  return false // ランク補正を上げる変化技: ランクがすでに最大である
                if ( rank.change < 0 && tgt.poke[`myRank_${rank.parameter}`] != -6 ) return false // ランク補正を下げる変化技: ランクがすでに最低である
            }
            return true
        }
    }

    switch ( poke.myMove.name ) {
        case "つぼをつく":
            for ( const parameter of ["atk", "def", "sp_atk", "sp_def", "speed", "accuracy", "evasion"]) {
                if ( tgt.poke[`myRank_${parameter}`] < 6 ) return false // どれか最大でなければいい
            }
            return true
    
        case "コーチング":
        case "アロマミスト":
            if ( myPokeInBattle(poke).length == 1 ) return true // シングルバトルである/対象となる味方がいない
            return false
        
        case "はいすいのじん":
            if ( tgt.poke.myRank_atk    != 6 ) return false
            if ( tgt.poke.myRank_def    != 6 ) return false
            if ( tgt.poke.myRank_sp_atk != 6 ) return false
            if ( tgt.poke.myRank_sp_def != 6 ) return false
            if ( tgt.poke.myRank_speed  != 6 ) return false
            return true //全能力が最大まで上がっている
        
        case "ほおばる":
            if ( tgt.poke.myRank_def == 6 ) return true // ぼうぎょランクがすでに最大である
            return false
        }

    return false
}

// その他の無効化
function invalidBySpec2nd_other(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "がむしゃら":
            if ( poke.myRest_hp >= tgt.poke.myRest_hp ) return true // 対象のHPが使用者以下
            return false

        case "シンクロノイズ":
            for ( const myType of poke.myType ) {
                for ( const oppType of tgt.poke.myType ) {
                    if ( myType != oppType ) return false // タイプが合致していない
                }
            }
            return true
        
        case "ゆめくい":
        case "あくむ":
            if ( tgt.poke.myAilment == "ねむり" ) return false
            if ( tgt.poke.myAbility == "ぜったいねむり" && isAbility(tgt.poke) ) return false // 対象がねむり状態でない
            return true
        
        case "ハサミギロチン":
        case "つのドリル":
        case "じわれ":
        case "ぜったいれいど":
            if ( poke.myLevel < tgt.poke.myLevel ) return true // 対象が使用者よりレベルが高い
            if ( isDynamax(tgt.poke) ) return true // 対象がダイマックスしている
            return false

        case "リフレッシュ":
            if ( tgt.poke.myAilment == "どく" ) return false
            if ( tgt.poke.myAilment == "やけど" ) return false
            if ( tgt.poke.myAilment == "まひ" ) return false // 状態異常のポケモンがいない（wikiにない）
            return true
    }

    return false
}

//**************************************************
// 47.タイプによる技の無効化(その2)
//**************************************************

// タイプによる無効化
function invalidByType2nd_type(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "やどりぎのタネ":
            if ( tgt.poke.myType.includes("くさ") ) return true
            return false
    
        case "おにび":
            if ( tgt.poke.myType.includes("ほのお") ) return true
            return false
    
        case "どくガス":
        case "どくどく":
        case "どくのこな":
            if ( poke.myAbility == "ふしょく" && isAbility(poke) ) return false
            if ( tgt.poke.myType.includes("どく") ) return true
            if ( tgt.poke.myType.includes("はがね") ) return true
            return false

        case "しびれごな":
        case "でんじは":
        case "へびにらみ":
            if ( tgt.poke.myType.includes("でんき") ) return true
            return false
    }

    return false
}

//**************************************************
// 53.特性による無効化(その3)
//**************************************************

// フラワーベール　ランクを下げられない　状態異常・ねむけ状態にならない
function invalidByAbility3rd_flower(poke, tgt) {
    if ( !isFlowerVeil(tgt.poke) ) return false // フラワーベール状態であること
    if ( !tgt.poke.myType.includes("くさ")) return false // 対象がくさタイプを持っていること
    // ランク補正に関する無効化
    for ( const element of statusMoveToChangeRankForOneOfThem ) {
        if ( poke.myMove.name == element.name && element.name != "デコレーション" ) return true
    }
    for ( const element of statusMoveToChangeRankForAllOfYou ) {
        if ( poke.myMove.name == element.name && element.name != "デコレーション" ) return true
    }
    // 状態異常に関する無効化
    for ( const element of statusMoveToMakeAbnormalForOneOfThem ) {
        if ( poke.myMove.name == element.name ) return true
    }
    for ( const element of statusMoveToMakeAbnormalForAllOfYou ) {
        if ( poke.myMove.name == element.name ) return true
    }
    for ( const element of statusMoveToMakeAbnormalForExceptForme ) {
        if ( poke.myMove.name == element.name ) return true
    }
    // あくびの無効化
    if ( poke.myMove.name == "あくび" ) return true
}

// スイートベール　ねむり・ねむけ状態にならない
function invalidByAbility3rd_sweet(poke, tgt) {
    if ( !isSweetVeil(tgt.poke) ) return false // スイートベール状態であること
    // 状態異常に関する無効化
    for ( const element of statusMoveToMakeAbnormalForOneOfThem ) {
        if ( poke.myMove.name == element.name && element.ailment == "ねむり" ) return true
    }
    for ( const element of statusMoveToMakeAbnormalForAllOfYou ) {
        if ( poke.myMove.name == element.name && element.ailment == "ねむり" ) return true
    }
    for ( const element of statusMoveToMakeAbnormalForExceptForme ) {
        if ( poke.myMove.name == element.name && element.ailment == "ねむり" ) return true
    }
    // あくびの無効化
    if ( poke.myMove.name == "あくび" ) return true

    return false
}

// アロマベール
function invalidByAbility3rd_aloma(poke, tgt) {
    if ( !isAlomaVeil(tgt.poke) ) return false // アロマベール状態であること
    if ( poke.myMove.name == "メロメロ" ) return true
    if ( poke.myMove.name == "いちゃもん" ) return true
    if ( poke.myMove.name == "かいふくふうじ" ) return true
    return false
}

// その他の無効化
function invalidByAbility3rd_other(poke, tgt) {
    // ランク補正に関する無効化
    const rankMove = statusMoveToChangeRankForOneOfThem.concat(statusMoveToChangeRankForAllOfYou)
    for ( const element of rankMove ) {
        if ( poke.myMove.name == element.name && element.name != "デコレーション" ) {
            // クリアボディ/しろいけむり/メタルプロテクト/フラワーベール: 能力を下げる技
            if ( tgt.poke.myAbility == "クリアボディ" ) return true
            if ( tgt.poke.myAbility == "しろいけむり" ) return true
            if ( tgt.poke.myAbility == "メタルプロテクト" ) return true
            // かいりきバサミ: こうげきを下げる技
            if ( tgt.poke.myAbility == "かいりきバサミ" ) {
                if ( element.rank.length == 1 && element.rank[0].parameter == "atk" && element.rank[0].change < 0 ) return true
            }
            // はとむね: ぼうぎょを下げる技
            if ( tgt.poke.myAbility == "はとむね" ) {
                if ( element.rank.length == 1 && element.rank[0].parameter == "def" && element.rank[0].change < 0) return true
            }
            // するどいめ: 命中を下げる技
            if ( tgt.poke.myAbility == "するどいめ" ) {
                if ( element.rank.length == 1 && element.rank[0].parameter == "accuracy" && element.rank[0].change < 0) return true
            }
        }
    }

    // 状態異常に関する無効化
    const abnormalMove = statusMoveToMakeAbnormalForOneOfThem.concat(statusMoveToMakeAbnormalForAllOfYou, statusMoveToMakeAbnormalForExceptForme)
    for ( const element of abnormalMove ) {
        if ( poke.myMove.name == element.name ) {
            // スイートベール/ぜったいねむり/フラワーベール/リーフガード/リミットシールド: 状態異常の無効化
            if ( tgt.poke.myAbility == "ぜったいねむり" ) return true
            if ( tgt.poke.myAbility == "リーフガード" && isSunny(tgt.poke) ) return true
            if ( tgt.poke.myCondition.myShields_down ) return true
            // めんえき/パステルベール: どく・もうどく状態の無効化
            if ( tgt.poke.myAbility == "めんえき" ) return true
            if ( isPastelVeil(tgt.poke) && ( element.ailment == "どく" || element.ailment == "もうどく" ) ) return true
            // じゅうなん: まひ状態の無効化
            if ( tgt.poke.myAbility == "じゅうなん" ) {
                if ( element.ailment == "まひ") return true
            }
            // みずのベール/すいほう: やけど状態の無効化
            if ( tgt.poke.myAbility == "みずのベール" || tgt.poke.myAbility == "すいほう" ) {
                if ( element.ailment == "やけど") return true
            }
            // ふみん/やるき: ねむり状態の無効化
            if ( tgt.poke.myAbility == "ふみん" || tgt.poke.myAbility == "やるき" ) {
                if ( element.ailment == "ねむり" ) return true
            }
            // マグマのよろい: こおり状態の無効化
            if ( tgt.poke.myAbility == "マグマのよろい" ) {
                if ( element.ailment == "こおり") return true
            }
            // マイペース: こんらん状態の無効化
            if ( tgt.poke.myAbility == "マイペース" ) {
                if ( element.ailment == "こんらん" ) return true
            }
        }
    }
    // あくびの無効化
    if ( poke.myMove.name == "あくび" ) {
        if ( tgt.poke.myAbility == "やるき" ) return true
        if ( tgt.poke.myAbility == "ふみん" ) return true
        if ( tgt.poke.myAbility == "ぜったいねむり" ) return true
        if ( tgt.poke.myAbility == "リーフガード" && isSunny(tgt.poke) ) return true
        if ( tgt.poke.myCondition.myShields_down ) return true
    }
    // その他
    // どんかん: メロメロ/ちょうはつ状態の無効化　ゆうわく（wikiにない）
    if ( tgt.poke.myAbility == "どんかん" ) {
        if ( poke.myMove.name == "メロメロ" ) return true
        if ( poke.myMove.name == "ちょうはつ" ) return true
        if ( poke.myMove.name == "ゆうわく" ) return true
    }  
    // アロマベール: メロメロ/いちゃもん/かいふくふうじ状態の無効化
    // がんじょう: 一撃必殺技の無効化
    if ( tgt.poke.myAbility == "がんじょう" ) {
        if ( oneShot.includes(poke.myMove.name) ) return true
    }

    return false
}

//**************************************************
// 54.命中判定による技の無効化
//**************************************************

function invalidByAccuracy_accuracy(poke, tgt) {
    // 必中状態
    if ( poke.myAbility == "ノーガード" && isAbility(poke) ) return false
    if ( tgt.myAbility == "ノーガード" && isAbility(tgt) ) return false
    if ( poke.myCondition.myLock_on ) return false
    if ( tgt.myCondition.myMinimize && minimize.includes(poke.myMove.name) ) return false
    if ( tgt.myCondition.myTelekinesis && !oneShot.includes(poke.myMove.name) ) return false
    // 必中技
    if ( poke.myMove.accuracy == "-" ) return false
    if ( poke.myMove.name == "かみなり" && isRainy(tgt) ) return false
    if ( poke.myMove.name == "ぼうふう" && isRainy(tgt) ) return false
    if ( poke.myMove.name == "ふぶき" && isSnowy(tgt) ) return false
    if ( poke.myMove.name == "どくどく" && poke.myType.includes("どく") ) return false
    // 命中率の変化
    if ( poke.myMove.name == "かみなり" && isSunny(poke) ) poke.myMove.accuracy = 50
    if ( poke.myMove.name == "ぼうふう" && isSunny(poke) ) poke.myMove.accuracy = 50
    if ( tgt.myAbility == "ミラクルスキン" && isAbility(tgt) && poke.myMove.nature == "変化" ) poke.myMove.accuracy = Math.min(50, poke.myMove.accuracy)
    if ( oneShot.includes(poke.myMove.name) ) poke.myMove.accuracy = 30 + poke.myLevel - tgt.myLevel
    if ( poke.myMove.name == "ぜったいれいど" && !poke.myType.includes("こおり") ) poke.myMove.accuracy = 20 + poke.myLevel - tgt.myLevel

    // 命中補正の初期値
    let correction = 4096
    // 場の状態
    if ( fieldStatus.myGravity ) correction = Math.round(correction * 6840 / 4096)
    // 相手の特性
    if ( isAbility(tgt) ) {
        switch ( tgt.myAbility ) {
            case "ちどりあし":
                if ( tgt.myCondition.myConfusion ) correction = Math.round(correction * 2048 / 4096)
                break

            case "すながくれ":
                if ( isSandy(tgt) ) correction = Math.round(correction * 3277 / 4096)
                break

            case "ゆきがくれ":
                if ( !isSnowy(tgt) ) correction = Math.round(correction * 3277 / 4096)
                break
        }
    }
    // 自分の特性
    if ( isAbility(poke) ) {
        switch ( poke.myAbility ) {
            case "はりきり":
                if ( poke.myMove.nature == "物理" ) correction = Math.round(correction * 3277 / 4096)
                break

            case "ふくがん":
                correction = Math.round(correction * 5325 / 4096)
                break

            case "しょうりのほし":
                correction = Math.round(correction * 4506 / 4096)
                break
        }
    }
    // 相手のもちもの
    if ( isItem(tgt) ) {
        switch ( tgt.myItem ) {
            case "ひかりのこな":
                correction = Math.round(correction * 3686 / 4096)
                break

            case "のんきのおこう":
                correction = Math.round(correction * 3686 / 4096)
                break
        }
    }
    // 自分のもちもの
    if ( isItem(poke) ) {
        switch ( poke.myItem ) {
            case "こうかくレンズ":
                correction = Math.round(correction * 4505 / 4096)
                break

            case "フォーカスレンズ":
                if ( tgt.myCmd_move === "" ) correction = Math.round(correction * 4915 / 4096)
                break
        }
    }
    // 一撃必殺技に対して補正は乗らない
    if ( oneShot.includes(poke.myMove.name) ) correction = 4096

    // 技の命中率 * 命中補正
    let check = fiveCut(poke.myMove.accuracy * correction / 4096)

    // ランク補正
    let rank = poke.myRank_accuracy - tgt.myRank_evasion
    // 相手の回避率を無視する
    switch ( true ) {
        case poke.myAbility == "てんねん" && isAbility(poke):
        case poke.myAbility == "するどいめ" && isAbility(poke):
        case tgt.myCondition.myForesight:
        case tgt.myCondition.myMiracle_eye:
        case poke.myMove.name == "せいなるつるぎ":
        case poke.myMove.name == "DDラリアット":
        case poke.myMove.name == "なしくずし":
            rank += tgt.myRank_evasion
    }
    // 自分の命中率を無視する
    if ( poke.myAbility == "てんねん" && isAbility(poke) ) rank -= poke.myRank_accuracy

    rank = Math.min(rank, 6)
    rank = Math.max(rank, -6)

    if ( rank > 0 ) check = Math.floor(check * (3 + rank) / 3)
    if ( rank < 0 ) check = Math.floor(check * 3) / (3 - rank)

    // ミクルのみ
    if ( poke.myCondition.myMicle ) {
        check = fiveCut(check * 4915 / 4096)
        poke.myCondition.myMicle = false
    }

    check = Math.min(check, 100)
    const random = getRandom() * 100
    if ( random >= check ) return true
    else return false
}

//**************************************************
// 62.技の仕様による無効化(その3)
//**************************************************

// 特性に関する無効化
function invalidBySpec3rd_ability(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "なかまづくり":
            if ( poke.myAbility == tgt.poke.myAbility )                             return true // 対象が自身と同じ特性である
            if ( abilityList_disalbe_entrainment.tgt.includes(tgt.poke.myAbility) ) return true // 対象が上書きできない特性である
            if ( abilityList_disalbe_entrainment.me.includes(poke.myAbility) )      return true // 自身がコピーできない特性である
            if ( tgt.poke.myCondition.myDynamax )                                   return true // 対象がダイマックスしている
            if ( tgt.substitute )                                                   return true // 対象がみがわり状態である
            return false
        
        case "いえき":
            if ( tgt.poke.myCondition.myNo_ability )                       return true // 対象がすでにとくせいなし状態である
            if ( abilityList_disable_gastro.includes(tgt.poke.myAbility) ) return true // とくせいなしにできない特性である
            return false
        
        case "なりきり":
            if ( poke.myAbility == tgt.poke.myAbility )                          return true // 自身が対象と同じ特性である
            if ( abilityList_disalbe_rolePlay.tgt.includes(tgt.poke.myAbility) ) return true // 対象がコピーできない特性である
            if ( abilityList_disalbe_rolePlay.me.includes(poke.myAbility) )      return true // 自身がコピーできない特性である
            return false
        
        case "シンプルビーム":
            if ( tgt.poke.myAbility == "たんじゅん" )                            return true // 対象がすでにたんじゅんである
            if ( abilityList_disable_simpleBeam.includes(tgt.poke.myAbility) ) return true // 上書きできない特性である
            return false
        
        case "なやみのタネ":
            if ( tgt.poke.myAbility == "ふみん" )                              return true // 対象がすでにふみんである
            if ( abilityList_disable_worrySeed.includes(tgt.poke.myAbility) ) return true // 対象が上書きできない特性である
            return false
        
        case "スキルスワップ":
            if ( abilityList_disable_skillSwap.includes(poke.myAbility) )     return true // 自身が交換できない特性である
            if ( abilityList_disable_skillSwap.includes(tgt.poke.myAbility) ) return true // 対象が交換できない特性である
            if ( tgt.poke.myCondition.myDynamax )               return true // 対象がダイマックスしている
            return false
    }

    return false
}

// HPが満タンによる無効化
function invalidBySpec3rd_fullHP(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "いやしのはどう":
        case "フラワーヒール":
        case "いのちのしずく":
        case "あさのひざし":
        case "かいふくしれい":
        case "こうごうせい":
        case "じこさいせい":
        case "すなあつめ":
        case "タマゴうみ":
        case "つきのひかり":
        case "なまける":
        case "はねやすめ":
        case "ミルクのみ":
            if ( tgt.poke.myRest_hp == tgt.poke.myFull_hp ) return true // HPが満タンであること
            return false

        case "ジャングルヒール":
            if ( tgt.poke.myRest_hp == tgt.poke.myFull_hp ) return true// HPが満タンであること
            if ( !tgt.poke.myAilment )                      return true // 状態異常
            return false

        case "かふんだんご":
            if ( tgt.poke.myRest_hp == tgt.poke.myFull_hp ) return true // HPが満タンであること
            if ( poke.myParty == tgt.poke.myParty )         return true // 味方に対するもの
            return false

        case "プレゼント":
            return false
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
    }

    return false
}

// ステータスに関する無効化
function invalidBySpec3rd_status(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "はらだいこ":
            if ( tgt.poke.myRest_hp < Math.floor(tgt.poke.myFull_hp / 2) ) return true // 自身がHP半分以下である
            if ( tgt.poke.myRank_atk == 6 ) return true // すでにランク+6である
            return false
        
        case "フラワーガード":
            if ( !tgt.poke.myType.includes("くさ") ) return true // 対象がくさタイプでない
            return false
        
        case "たがやす":
            if ( !tgt.poke.myType.includes("くさ") ) return true // 対象がくさタイプでない
            if ( !onGround(tgt.poke) ) return true // 地面にいる必要がある
            return false
        
        case "じばそうさ":
        case "アシストギア":
            if ( !isAbility(tgt.poke) ) return true
            if ( tgt.poke.myAbility == "プラス" ) return false
            if ( tgt.poke.myAbility == "マイナス" ) return false
            return true // 対象の特性がプラスかマイナスでない
        
        case "ちからをすいとる":
            if ( tgt.poke.myRank_atk == -6 ) return true // 対象のこうげきが-6である
            return false
        
        case "いばる":
            if ( tgt.poke.myRank_atk < 6 ) return false
            if ( !tgt.poke.myCondition.myConfusion ) return false
            return true // 対象のランクが+6でありこんらんしている
        
        case "おだてる":
            if ( tgt.poke.myRank_sp_atk < 6 ) return false
            if ( !tgt.poke.myCondition.myConfusion ) return false
            return true  // 対象のランクが+6でありこんらんしている
        
        case "ひっくりかえす":
            if ( tgt.poke.myRank_atk      != 0 ) return false
            if ( tgt.poke.myRank_def      != 0 ) return false
            if ( tgt.poke.myRank_sp_atk   != 0 ) return false
            if ( tgt.poke.myRank_sp_def   != 0 ) return false
            if ( tgt.poke.myRank_speed    != 0 ) return false
            if ( tgt.poke.myRank_accuracy != 0 ) return false
            if ( tgt.poke.myRank_evasion  != 0 ) return false
            return true // 対象のランクが変化していない
    }

    return false
}

// タイプによる無効化
function invalidBySpec3rd_type(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "テクスチャー":
            if ( tgt.poke.myType.includes(moveSearchByName(poke.myMove_0).type) ) return true // 現在のタイプが一番上の技のタイプを含む
            return false
        
        case "テクスチャー2":
            if ( !tgt.poke.myCondition.myHistory ) return true // 対象が行動していない
            if ( tgt.poke.myCondition.myHistory[0].name == "わるあがき" ) return true // 最後に使った技がわるあがきである
            /*
            let check = []
            for ( let i = 0; i < 18; i++ ) {
                if ( compatibilityTable[0][i] == tgt.poke.myCondition.myHistory[0].type ) {
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
            */
        
        case "ミラータイプ":
            if ( poke.myType.length !== tgt.poke.myType.length ) return false
            for ( const type of poke.myType ) {
                if ( !tgt.poke.myType.includes(type) ) return false
            }
            return true // すでに対象と同じタイプである
        
        case "みずびたし":
            if ( tgt.poke.myType === ["みず"] ) return true // 対象がみず単タイプである
            if ( tgt.poke.myName == "アルセウス" ) return true // 対象がアルセウスかシルヴァディである
            if ( tgt.poke.myName == "シルヴァディ" ) return true // 対象がアルセウスかシルヴァディである
            return false
        
        case "まほうのこな":
            if ( tgt.poke.myType === ["エスパー"] ) return true // エスパー単タイプである 
            if ( tgt.poke.myName == "アルセウス" ) return true // 対象がアルセウスかシルヴァディである
            if ( tgt.poke.myName == "シルヴァディ" ) return true // 対象がアルセウスかシルヴァディである
            return false
        
        case "ハロウィン":
            if ( tgt.poke.myType.includes("ゴースト") ) return true // 対象がゴーストタイプを持つ
            return false
        
        case "もりののろい":
            if ( tgt.poke.myType.includes("くさ") ) return true // 対象がくさタイプを持つ
            return false
    }

    return false
}

// 特殊なメッセージが出る技の失敗
function invalidBySpec3rd_msg(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "アロマセラピー":
        case "いやしのすず":
            if ( tgt.poke.myAilment ) return false // 状態異常の味方がいない
            return true
        
        case "おちゃかい":
            if ( tgt.poke.myCondition.myDig )           return true // あなをほる
            if ( tgt.poke.myCondition.myDive )          return true// ダイビング
            if ( tgt.poke.myCondition.mySky )           return true // そらをとぶ
            if ( tgt.poke.myCondition.myShadow )        return true // シャドーダイブ
            if ( tgt.poke.myCondition.myMax_guard )     return true // ダイウォール
            if ( !itemList_berry.includes(tgt.poke.myItem) ) return true // きのみを持っていない
            return false
    }

    return false
}

// 重複による無効化
function invalidBySpec3rd_duplicate(poke, tgt) {
    switch ( poke.myMove.name ) {
        case "くろいまなざし":
        case "クモのす":
        case "とおせんぼう":
        case "たこがため":
            if ( tgt.poke.myCondition.myCant_escape ) return true // すでににげられない状態である
            return false

        case "アクアリング":
            if ( tgt.poke.myCondition.myAqua_ring ) return true // 自身がすでにアクアリング状態である
            return false
        
        case "きあいだめ":
            if ( tgt.poke.myCondition.myCritical ) return true // 自身がすでにきゅうしょアップ状態である
            return false
    
        case "かいふくふうじ":
            if ( tgt.poke.myCondition.myHeal_block ) return true // 対象がすでにかいふくふうじ状態である
            return false
        
        case "さしおさえ":
            if ( tgt.poke.myCondition.myEmbargo ) return true // 対象がすでにさしおさえ状態である　（wikiにない）
            if ( tgt.poke.myItem == "" ) return true
            return false
        
        case "スポットライト":
            for ( const spot of isField(tgt.poke).mySpotlight ) {
                if ( spot.position == tgt.poke.myPosition ) return true // 対象がすでにちゅうもくのまと状態である（wikiにない）
            }
            return false
        
        case "ちょうはつ":
            if ( tgt.poke.myCondition.myTaunt ) return true // 対象がすでにちょうはつ状態である
            return false
        
        case "テレキネシス":
            if ( tgt.poke.myCondition.myTelekinesis ) return true // 対象がすでにテレキネシス状態である　（wikiにない）
            return false
        
        case "でんじふゆう":
            if ( tgt.poke.myCondition.myElectrify )  return true // 自身がすでにでんじふゆう状態である
            if ( tgt.poke.myCondition.mySmack_down ) return true // うちおとす状態である wikiにない
            if ( tgt.poke.myCondition.myIngrain )    return true // ねをはる状態である wikiにない
            return false
        
        case "ねがいごと":
            if ( isField(poke).myWish_data[poke.myPosition].heal ) return true // 前のターンのねがいごとの効果が残っている
            return false
        
        case "のろい":
            if ( !poke.myType.includes("ゴースト") ) return false
            if ( !tgt.poke.myCondition.myCurse ) return false
            return true // 対象がすでにのろい状態である
        
        case "ロックオン":
        case "こころのめ":
            if ( tgt.poke.myCondition.myLock_on ) return true // 自身がすでにロックオン状態である
            return false
    }

    return false
}

// 対象が場である技の無効化
function invalidBySpec3rd_field(poke) {
    // 重複による無効化
    // 天気: すでに同じ状態になっている
    if ( poke.myMove.name == "にほんばれ" && fieldStatus.mySunny ) return true
    if ( poke.myMove.name == "あまごい" && fieldStatus.myRainy ) return true
    if ( poke.myMove.name == "すなあらし" && fieldStatus.mySandstorm) return true
    if ( poke.myMove.name == "あられ" && fieldStatus.myGraupel ) return true
    // フィールド: すでに同じ状態になっている
    if ( poke.myMove.name == "エレキフィールド" && fieldStatus.myElectric ) return true
    if ( poke.myMove.name == "グラスフィールド" && fieldStatus.myGrassy ) return true
    if ( poke.myMove.name == "サイコフィールド" && fieldStatus.myPsychic ) return true
    if ( poke.myMove.name == "ミストフィールド" && fieldStatus.myMisty ) return true
    // 自分の場の状態: すでに同じ状態になっている
    if ( poke.myMove.name == "オーロラベール" && isField(poke).myAurora_veil ) return true
    if ( poke.myMove.name == "ひかりのかべ" && isField(poke).myLight_screen ) return true
    if ( poke.myMove.name == "リフレクター" && isField(poke).myReflect ) return true
    if ( poke.myMove.name == "おいかぜ" && isField(poke).myTailwind ) return true
    if ( poke.myMove.name == "おまじない" && isField(poke).myLucky_chant ) return true
    if ( poke.myMove.name == "しろいきり" && isField(poke).myMist ) return true
    if ( poke.myMove.name == "しんぴのまもり" && isField(poke).mySafeguard ) return true
    // 自分の場の守る: すでに同じ状態になっている
    if ( poke.myMove.name == "たたみがえし" && isField(poke).myMat_block ) return true
    if ( poke.myMove.name == "トリックガード" && isField(poke).myCrafty_shield ) return true
    if ( poke.myMove.name == "ファストガード" && isField(poke).myQuick_guard ) return true
    if ( poke.myMove.name == "ワイドガード" && isField(poke).myWide_guard ) return true
    // お互いの場の状態: すでに同じ状態になっている
    if ( poke.myMove.name == "どろあそび" && fieldStatus.myMud_sport ) return true
    if ( poke.myMove.name == "みずあそび" && fieldStatus.myWater_sport ) return true
    if ( poke.myMove.name == "じゅうりょく" && fieldStatus.myGravity ) return true
    if ( poke.myMove.name == "フェアリーロック" && fieldStatus.myFairy_lock ) return true
    if ( poke.myMove.name == "プラズマシャワー" && fieldStatus.myIon_deluge ) return true
    // 設置技: すでに最大まで仕掛けられている
    if ( poke.myMove.name == "ステルスロック" && isOppField(poke).myStealth_rock ) return true
    if ( poke.myMove.name == "ねばねばネット" && isOppField(poke).mySticky_web ) return true
    if ( poke.myMove.name == "まきびし" && isOppField(poke).mySpikes == 3 ) return true
    if ( poke.myMove.name == "どくびし" && isOppField(poke).myToxic_spikes == 2 ) return true

    // その他の無効化
    // 天気を変える技: おおひでり/おおあめ/デルタストリームにより変えられない
    if ( fieldStatus.myDrought || fieldStatus.myHeavy_rain || fieldStatus.myTurbulence ) {
        if ( poke.myMove.name == "にほんばれ" ) return true
        if ( poke.myMove.name == "あまごい" ) return true
        if ( poke.myMove.name == "すなあらし" ) return true
        if ( poke.myMove.name == "あられ" ) return true
    }
    // コートチェンジ: 入れ替える場の状態が無い
    if ( poke.myMove.name == "コートチェンジ" ) {
        for ( const element of courtChange ) {
            if ( myField[`my${element}`] ) return false
            if ( oppField[`my${element}`] ) return false
        }
        return true
    }
}

// その他の無効化
function invalidBySpec3rd_other(poke, tgt) {
    const history = tgt.poke.myCondition.myHistory

    switch ( poke.myMove.name ) {
        case  "アンコール":
            if ( !history )                           return true // 対象が技を使用していない
            if ( isDynamax(tgt.poke) )                return true // 相手がダイマックス
            if ( tgt.poke.myCondition.myEncore_move ) return true // すでにアンコール状態
            for ( let i = 0; i < 4; i++ ) {
                if ( tgt.poke[`myMove_${i}`] == history[0].name ) {
                    if ( tgt.poke[`myRest_pp_${i}`] == 0 )                return true // 技のPPが残っていない
                    if ( cannotEncore.includes(tgt.poke[`myMove_${i}`]) ) return true // アンコールできない技
                }
            }
            return false
        
        case "かなしばり":
            if ( !history ) return true // 対象が技を使用していない
            if ( history[0].name == "わるあがき" ) return true // 最後のわざがわるあがき
            if ( tgt.poke.myCondition.myDisable_move ) return true // すでにかなしばり状態
            // ダイマックスわざ　の記述がまだ
            return false

        case "ものまね":
            if ( !history )                            return true // 対象が技を使用していない
            if ( moveList_disable_mimic.includes(history[0].name) ) return true // ものまねできない技
            for ( let i = 0; i < 4; i++ ) {
                if ( poke[`myMove_${i}`] == history[0].name ) return true // 同じ技を覚えている
            }
            return false

        case "スケッチ":
            if ( !history ) return true // 対象が技を使用していない
            if ( poke.myCondition.myTransform )                      return true // 自身がへんしん状態である
            if ( moveList_disable_sketch.includes(history[0].name) ) return true // スケッチできない技
            for ( let i = 0; i < 4; i++ ) {
                if ( poke[`myMove_${i}`] == history[0].name ) return true // 同じ技を覚えている
            }
            return false
        
        case "リサイクル":
            if ( tgt.poke.myIitem )    return true // 持ち物を持っている
            if ( !tgt.poke.myRecycle ) return true // リサイクルできる道具がない(wikiにない)
            return false
        
        // さいはい: さいはいできない技、PPがない技
        case "さいはい":
            if ( !history ) return true
            // if ( tgt.poke.myCondition.myFree_fall ) tgt.success = false
            if ( moveList_disable_instruct.includes(history[0].name)) return true
            if ( cannotMoveByRecoil.includes(history[0].name))        return true
            if ( accumulationMove.includes(history[0].name))          return true
            return false
        
        case "おさきにどうぞ":
            if ( tgt.poke.myCmd_move ) return true // 対象がすでに行動している、行動順に変化がない場合（wikiにない）
            return false
        
        case "さきおくり":
        case "そうでん":
            if ( tgt.poke.myCmd_move ) return true // 対象がすでに行動している、
            return false
        
        case "バトンタッチ":
        case "いやしのねがい":
        case "みかづきのまい":
        case "テレポート":
            if ( !isBench(poke) ) return true // 交代できる味方がいない
            return false
        
        case "ほえる":
        case "ふきとばし":
            if ( !isBench(tgt.poke) ) return true // 交代できる相手がいない
            return false
        
        case "てだすけ":
        case "サイドチェンジ":
        case "アロマミスト":
        case "てをつなぐ":
            if ( myPokeInBattle(poke).length == 1 ) return true // 味方がいない
            return false
        
        case "サイコシフト":
            if ( !poke.myAilment )     return true // 1.自身が状態異常でない
            if ( !tgt.poke.myAilment ) return true // 1.対象がすでに状態異常である
            if ( psychoShift(tgt.poke, poke.myAilment) ) return true // 2.対象が状態異常に耐性を持っている
            return false
        
        case "じょうか":
            if ( !tgt.poke.myAilment ) return true // 対象が状態異常でない
            return false
        
        case "みがわり":
            if ( tgt.poke.myCondition.mySubstitute ) return true // 1.自身がすでにみがわり状態である
            if ( tgt.poke.myRest_hp <= Math.floor(tgt.poke.myFull_hp / 4) ) return true // 2.自身に技を使う体力が残っていない
            return false
        
        case "へんしん":
            if ( poke.myCondition.myTransform )     return true // 自身がすでにへんしん状態である
            if ( tgt.poke.myCondition.myTransform ) return true // 対象がすでにへんしん状態である
            return false
        
        case "トリック":
        case "すりかえ":
            if ( !poke.myItem && !tgt.poke.myItem ) return true // どちらも道具を持っていない
            if ( cannotChangeItem(poke) )           return true // どちらかの道具が交換できない
            if ( cannotChangeItem(tgt.poke) )       return true // どちらかの道具が交換できない
            return false
        
        case "ふしょくガス":
            if ( cannotChangeItem(tgt.poke) ) return true // 溶かせない道具がある
            return false
    }

    return false
}