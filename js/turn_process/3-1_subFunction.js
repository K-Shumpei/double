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
// 18.技の仕様による失敗
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
            if ( !poke.myCondition.myBide.damage ) return false // 解き放つダメージが無い
            poke.myCondition.myBide.turn = 0
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

        case "このゆびとまれ":
        case "いかりのこな":
            // シングルバトルである
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

        case "テレポート":
            if ( !isBench(poke) ) return true // 交代できる味方がいない
            return false
        
        case "とっておき":
            if ( !moveList.includes("とっておき") ) return true // 覚えているわざにとっておきがない
            if ( moveList.filter( move => !move ).length === 1 ) return true // とっておき以外の技を覚えていない
            // 使用されてない技がある　がまだ
            return false

        case "トラップシェル":
            if ( poke.myCondition.myShell_trap == "set" ) return true
            return false

        case "はきだす":
        case "のみこむ":
            if ( poke.myCondition.myStockpile == 0 ) return true // たくわえるカウントが0である
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
        
        case "ねこだまし":
        case "たたみがえし":
        case "であいがしら":
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
            const futureParty = ( poke.myCmd_tgt <= 1 )? getMyField(poke).myParty : getOppField(poke).myField
            for ( const futureSight of fieldStatus.myFuture_sight ) {
                if ( futureSight.party    != futureParty )    continue
                if ( futureSight.position != poke.myCmd_tgt ) continue
                return true // 対象の場がすでにみらいにこうげき状態になっている
            }
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

        case "けたぐり":
        case "くさむすび":
        case "ヘビーボンバー":
        case "ヒートスタンプ":
            if ( !poke.myTarget ) return false
            if ( poke.myTarget[0].poke.myCondition.myDynamax ) return true
            return false
    }

    return false
}

//**************************************************
// 20.特性による失敗
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
        if ( !isAbility(tgt.poke) ) continue
        if ( poke.myParty == tgt.poke.myParty ) continue
        if ( tgt.myAbility == "じょおうのいげん" || tgt.myAbility == "ビビッドボディ" ) {
            abilityDeclaration(tgt)
            return true
        }
    }

    return false
}

//**************************************************
// 29.姿を隠していることによる無効化
//**************************************************

function invalidByHide_hide(poke, tgt) {
    // 姿を隠している必要がある
    if ( !isHide(tgt.poke) ) return false

    // 以下の状況では姿を隠していても技が当たる
    switch ( poke.myMove.name ) {
        case "どくどく":
            if ( poke.myType.includes("どく") ) return false
            return true

        case "アロマセラピー":
        case "いやしのすず":
        case "てだすけ":
            return false

        case "じしん":
        case "マグニチュード":
            if ( tgt.poke.myCondition.myDig ) return false
            return true

        case "うちおとす":
        case "かぜおこし":
        case "かみなり":
        case "サウザンアロー":
        case "スカイアッパー":
        case "たつまき":
        case "ぼうふう":
            if ( tgt.poke.myCondition.mySky ) return false
            return true

        case "なみのり":
        case "うずしお":
            if ( tgt.poke.myCondition.myDive ) return false
            return true

        default:
            if ( poke.myMove.name == "フリーフォール" ) return true
            if ( poke.myCondition.myLock_on ) return false
            if ( poke.myAbility == "ノーガード" && isAbility(poke) ) return false
            if ( tgt.poke.myAbility == "ノーガード" && isAbility(tgt.poke) ) return false
            return true
    }
}

//**************************************************
// 30.サイコフィールドによる無効化
//**************************************************

function invalidByTerrain1st_psychic(poke, tgt) {
    if ( !fieldStatus.myPsychic )           return false // サイコフィールド状態であること
    if ( poke.myMove.priority <= 0 )        return false // 技の優先度が1以上であること
    if ( poke.myParty == tgt.poke.myParty ) return false // 対象が相手のポケモンであること
    if ( !onGround(tgt.poke) )              return false // 対象が接地していること

    return true
}

//**************************************************
// 31.ファストガード/ワイドガード/トリックガードによる無効化 (Zワザ/ダイマックスわざならダメージを75%カットする)
//**************************************************

// ファストガード
function invalidByProtect1st_quick(poke, tgt) {
    if ( poke.myMove.priority <= 0 ) return false      // 優先度が1以上であること
    if ( !getMyField(tgt.poke).myQuick_guard ) return false // ファストガード状態であること

    return true
}

// ワイドガード
function invalidByProtect1st_wide(poke, tgt) {
    if ( !getMyField(tgt.poke).myWide_guard ) return false  // ワイドガード状態であること
    if ( poke.myMove.target == "相手全体" ) return false
    if ( poke.myMove.target == "自分以外" ) return false

    return true
}

// トリックガード
function invalidByProtect1st_crafty(poke, tgt) {
    if ( !getMyField(tgt.poke).myCrafty_shield ) return false   // トリックガード状態であること
    if ( poke.myID == tgt.myID ) return false          // 対象が自分でないこと
    if ( poke.myMove.nature != "変化" ) return false    // 変化技であること
    if ( poke.myMove.target == "全体" ) return false    // 対象が全体でないこと
    if ( poke.myMove.target == "味方全体" ) return false // 対象が味方全体でないこと
    if ( poke.myMove.name == "コーチング" ) return false // コーチングは防げない
    if ( poke.myMove.name == "さきどり" ) return false   // さきどりは防げない

    return false
}

//**************************************************
// 32.まもる/キングシールド/ブロッキング/ニードルガード/トーチカによる無効化 (Zワザ/ダイマックスわざなら75%をカットする)
//**************************************************

function invalidByProtect2nd_protect(poke, tgt) {
    if ( cannotProtectByDynaWall.includes(poke.myMove.name) ) return false // ダイウォールでも防げない技
    if ( tgt.poke.myCondition.myMax_guard ) return true // ダイウォール状態は以下の効果を受けない
    if ( poke.myMove.protect == "不能" ) return false
    if ( poke.myAbility == "ふかしのこぶし" && isAbility(poke) && poke.myMove.direct == "直接" ) return false
    if ( !tgt.poke.myCondition.myProtect ) return false

    switch ( tgt.poke.myCondition.myProtect ) {
        case "キングシールド":
        case "ブロッキング":
            if ( poke.myMove.nature == "変化" ) return false
            return true

        default:
            return true
    }
}

//**************************************************
// 33.たたみがえしによる無効化 (Zワザ/ダイマックスわざなら75%をカットする)
//**************************************************

function invalidByMatBlock_matBlock(poke, tgt) {
    if ( poke.myAbility == "ふかしのこぶし" && isAbility(poke) && poke.myMove.direct == "直接" ) return false
    if (/*atk.data.Z &&*/ poke.myMove.nature != "変化" ) return false
    if ( !getMyField(tgt.poke).myMat_block ) return false

    return true
}

//**************************************************
// 36.テレキネシスの場合、対象がディグダ/ダグトリオ/スナバァ/シロデスナ/メガゲンガー/うちおとす状態/ねをはる状態であることによる失敗
//**************************************************

function failureByTK_TK(poke, tgt) {
    if ( poke.myMove.name != "テレキネシス" ) return false // テレキネシスを使用していること

    // 特定のポケモンには効果がない
    switch ( poke.myName ) {
        case "ディグダ":
        case "ダグトリオ":
        case "スナバァ":
        case "シロデスナ":
        case "メガゲンガー":
            return true
    }

    if ( tgt.poke.myCondition.mySmack_down ) return true // うちおとす状態には効果がない
    if ( tgt.poke.myCondition.myIngrain )    return true // ねをはる状態には効果がない

    return false
}

//**************************************************
// 38.特性による無効化(その1)
//**************************************************

// 特性による無効化
function invalidByAbility1st_ability(poke, tgt) {
    if ( !isAbility(tgt.poke) ) return false       // 対象の特性が有効であること
    if ( poke.myID == tgt.poke.myID ) return false // 対象が自分でないこと

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
            if ( poke.myMove.type != "でんき" ) return false
            if ( poke.myMove.name == "じばそうさ" ) return false
            return true
        
        case "でんきエンジン":
            if ( poke.myMove.type != "でんき" ) return false
            if ( poke.myMove.name == "じばそうさ" ) return false
            return true
        
        case "ちくでん":
            if ( poke.myMove.type != "でんき" ) return false
            if ( poke.myMove.name == "じばそうさ" ) return false
            return true
        
        case "ぼうおん":
            if ( !moveList_music.includes(poke.myMove.name) ) return false
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
// 39.相性による無効化
//**************************************************

function invalidByComp_comp(poke, tgt) {
    if ( poke.myMove.name == "わるあがき" ) return false                               // わるあがきにタイプ相性はない
    if ( poke.myMove.nature == "変化" && poke.myMove.name != "でんじは" ) return false // でんじは以外の変化技にタイプ相性はない

    tgt.effective = compatibilityCheck(poke, tgt.poke) // タイプ相性を格納
    if ( tgt.effective > 0 ) return false

    return true
}

//**************************************************
// 40.ふゆうによるじめん技の無効化
//**************************************************

function invalidByLevitate1st_levitate(poke, tgt) {
    if ( poke.myMove.type != "じめん" ) return false
    if ( poke.myMove.nature == "変化" ) return false
    if ( poke.myMove.name == "サウザンアロー" ) return false
    if ( onGround(tgt.poke) ) return false                 // 接地していないこと
    if ( !isAbility(tgt.poke) ) return false               // 特性が有効であること
    if ( tgt.poke.myAbility != "ふゆう" ) return false      // 特性「ふゆう」であること

    return true
}

//**************************************************
// 41.でんじふゆう/テレキネシス/ふうせんによるじめん技の無効化
//**************************************************

function invalidByLevitate2nd_other(poke, tgt) {
    if ( poke.myMove.type != "じめん" ) return false
    if ( poke.myMove.nature == "変化" ) return false
    if ( poke.myMove.name == "サウザンアロー" ) return false
    if ( onGround(tgt.poke) ) return false                 // 接地していないこと

    return true
}

//**************************************************
// 42.ぼうじんゴーグルによる無効化
//**************************************************

function invalidByPowderGoggle_powderGoggle(poke, tgt) {
    if ( !isItem(tgt.poke) ) return false
    if ( tgt.poke.myItem != "ぼうじんゴーグル" ) return false
    if ( !powderMove.includes(poke.myMove.name) ) return false // 粉技であること

    return true
}

//**************************************************
// 43.特性による無効化(その2)
//**************************************************

function invalidByAbility2nd_ability(poke, tgt) {
    if ( !isAbility(tgt.poke) ) return false // 対象の特性が有効であること

    switch ( tgt.poke.myAbility ) {
        case "ぼうだん":
            if ( moveList_ball.includes(poke.myMove.name) ) return true
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
    // ひこうタイプ: フリーフォールの無効化
    if ( tgt.poke.myType.includes("ひこう") ) {
        if ( poke.myMove.name == "フリーフォール" ) return true
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
// 47.技の仕様による無効化(その2)
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
            if ( tgt.poke.myCondition.myTorment.name ) return true // 対象がすでにいちゃもん状態である
            return false

        case "さしおさえ":
            if ( tgt.poke.myCondition.myEmbargo ) return true // 対象がすでにさしおさえ状態である
            if ( tgt.poke.myItem == "" ) return true
            return false

        case "テレキネシス":
            if ( tgt.poke.myCondition.myTelekinesis ) return true // 対象がすでにテレキネシス状態である
            return false

        case "なやみのタネ":
            if ( tgt.poke.myAbility == "ふみん" ) return true // 対象がすでにふみんである
            if ( tgt.poke.myAbility == "なまけ" ) return true // 対象がすでになまけである
            return false

        case "ねをはる":
            if ( tgt.poke.myCondition.myIngrain ) return true // 自身がすでにねをはる状態である
            return false

        case "ほろびのうた":
            if ( tgt.poke.myCondition.myPerish_song ) return true // 対象がすでにほろびのうた状態である
            return false
     
        case "みやぶる":
        case "かぎわける":
            if ( tgt.poke.myCondition.myForesight ) return true // 対象がすでにみやぶられている状態である
            return false

        case "ミラクルアイ":
            if ( tgt.poke.myCondition.myMiracle_eye) return true // 対象がすでにミラクルアイ状態である
            return false

        case "メロメロ":
            if ( tgt.poke.myCondition.myAttract !== false ) return true // 対象がすでにメロメロ状態である
            return false

        case "やどりぎのタネ":
            if ( tgt.poke.myCondition.myLeech_seed ) return true // 対象がすでにやどりぎのタネ状態である
            return false

        case "とぎすます":
            if ( tgt.poke.myCondition.myLaser_focus ) return true // 自身がすでにとぎすます状態である　（wikiにはなかった）
            return false
    
        case "ほごしょく":
            if ( fieldStatus.myGrassy   && poke.myType.includes("くさ") ) return true // 自身が同じタイプを持っている (wikiにない)
            if ( fieldStatus.myElectric && poke.myType.includes("でんき") ) return true
            if ( fieldStatus.myMisty    && poke.myType.includes("フェアリー") ) return true
            if ( fieldStatus.myPsychic  && poke.myType.includes("エスパー") ) return true
            if ( !( fieldStatus.myGrassy || fieldStatus.myElectric || fieldStatus.myMisty || fieldStatus.myPsychic ) && poke.myType.includes("ノーマル")) return true
            return false
    }

    // 状態異常にする変化技
    for ( const element of moveList_status_ailment ) {
        if ( poke.myMove.name != element.name ) continue

        // 対象がすでにこんらんになっている
        if ( element.ailment == "こんらん" && tgt.poke.myCondition.myConfusion ) return true
        // 対象がすでに同じ・別の状態異常になっている
        if ( element.ailment != "こんらん" && tgt.poke.myAilment ) return true
    }

    return false

}

// ランク補正に関する無効化
function invalidBySpec2nd_rank(poke, tgt) {
    // ランク変化を付与する技リスト
    const rankMove = [].concat(
            statusMoveToChangeRankForMe,       // 対象が「自分」
            statusMoveToChangeRankForAllOfUs,  // 対象が「味方全体」
            statusMoveToChangeRankForAllOfYou, // 対象が「相手全体」
            statusMoveToChangeRankForOneOfThem // 対象が「1体選択」
        )

    for ( const element of rankMove ) {
        if ( poke.myMove.name != element.name ) continue
        for ( const rank of element.rank ) {
            if ( rank.change > 0 && tgt.poke[`myRank_${rank.parameter}`] != 6 )  return false // ランク補正を上げる変化技: ランクがすでに最大である
            if ( rank.change < 0 && tgt.poke[`myRank_${rank.parameter}`] != -6 ) return false // ランク補正を下げる変化技: ランクがすでに最低である
        }
        return true
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
        
        case "ソウルビート":
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
// 48.タイプによる技の無効化(その2)
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
// 49.さわぐ状態によるねむりの無効化
//**************************************************

// さわぐ状態のポケモンがいる時、ねむり状態とねむけ状態にならない
function invalidByUproar_uproar(poke, tgt) {
    // 状態異常を付与する変化技
    const thisMove = moveList_status_ailment.filter( move => move.name == poke.myMove.name && move.ailment == "ねむり" )

    if ( !isUproar() ) return false // さわぐ状態のポケモンがいること
    if ( poke.myMove.name == "ねむる" ) return true
    if ( poke.myMove.name == "あくび" ) return true
    if ( thisMove.length === 1 ) return true // 眠り状態を付与する変化技であること

    return false

}

//**************************************************
// 50.しんぴのまもり状態による無効化
//**************************************************

function invalidBySafeguard_safeguard(poke, tgt) {
    // 状態異常を付与する変化技
    const thisMove = moveList_status_ailment.filter( move => move.name == poke.myMove.name )

    if ( thisMove.length === 0 ) return false                          // 状態異常を付与する変化技であること
    if ( poke.myMove.name == "あくび" ) return false                    // あくびは神秘の守りで防げない
    if ( poke.myParty == tgt.poke.myParty ) return false               // 相手への攻撃であること
    if ( !getMyField(tgt.poke).mySafeguard ) return false              // 神秘の守り状態であること
    if ( poke.myAbility == "すりぬけ" && isAbility(poke) ) return false // 特性「すりぬけ」でないこと

    return true
}

//**************************************************
// 51.エレキフィールド/ミストフィールド状態による状態異常の無効化
//**************************************************

// エレキフィールド（ねむけ状態も防げる）
function invalidByTerrain2nd_electric(poke, tgt) {
    const thisMove = moveList_status_ailment.filter( move => move.name == poke.myMove.name && move.ailment == "ねむり" )

    if ( !onGround(tgt.poke) ) return false     // 接地していること
    if ( !fieldStatus.myElectric ) return false // エレキフィールドであること
    if ( poke.myMove.name == "ねむる" ) return true
    if ( poke.myMove.name == "あくび" ) return true
    if ( thisMove.length === 0 ) return false

    return true
}

// ミストフィールド（ねむけ状態は防げない）
function invalidByTerrain2nd_misty(poke, tgt) {
    const thisMove = moveList_status_ailment.filter( move => move.name == poke.myMove.name )

    if ( !onGround(tgt.poke) ) return false  // 接地していること
    if ( !fieldStatus.myMisty ) return false // ミストフィールドであること
    if ( poke.myMove.name == "ねむる" ) return true
    if ( thisMove.length === 0 ) return false

    return true
}

//**************************************************
// 52.みがわり状態によるランク補正を下げる技/デコレーションの無効化
//**************************************************

function invalidBySub1st_rank(poke, tgt) {
    // ランク変化を付与する変化技
    const thisMove = moveList_status_rank_someone.filter( move => move.name == poke.myMove.name )

    if ( !tgt.substitute ) return false                                              // みがわり状態であること
    if ( thisMove.length === 0 || poke.myMove.name != "つぼをつく" ) return false      // ランク変化を付与する変化技　または　つぼをつく　であること
    if ( poke.myMove.name == "つぼをつく" && poke.myID == tgt.poke.myID ) return false // つぼをつくなら、対象が自分以外であること

    return true
}

//**************************************************
// 53.しろいきりによるランク補正を下げる技の無効化
//**************************************************

function invalidByMist_mist(poke, tgt) {
    // ランク変化を付与する変化技
    const thisMove = moveList_status_rank_someone.filter( move => move.name == poke.myMove.name )

    if ( thisMove.length === 0 ) return false                          // ランク変化を付与する変化技であること
    if ( !getMyField(tgt.poke).myMist ) return false                   // しろいきり状態であること
    if ( poke.myAbility == "すりぬけ" && isAbility(poke) ) return false // 特性「すりぬけ」でないこと

    return true
}

//**************************************************
// 54.特性による無効化(その3)
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
    for ( const move of moveList_status_ailment ) {
        if ( poke.myMove.name == move.name ) return true
    }
    // あくびの無効化
    if ( poke.myMove.name == "あくび" ) return true
}

// スイートベール　ねむり・ねむけ状態にならない
function invalidByAbility3rd_sweet(poke, tgt) {
    if ( !isSweetVeil(tgt.poke) ) return false // スイートベール状態であること
    // 状態異常に関する無効化
    for ( const move of moveList_status_ailment ) {
        if ( poke.myMove.name == move.name && move.ailment == "ねむり" ) return true
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
    for ( const element of moveList_status_ailment) {
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
        if ( moveList_oneShot.includes(poke.myMove.name) ) return true
    }

    return false
}

//**************************************************
// 55.命中判定による技の無効化
//**************************************************

function invalidByAccuracy_accuracy(poke, tgt) {
    // 必中状態
    if ( poke.myAbility == "ノーガード" && isAbility(poke) ) return false
    if ( tgt.myAbility == "ノーガード" && isAbility(tgt) ) return false
    if ( poke.myCondition.myLock_on ) return false
    if ( tgt.myCondition.myMinimize && minimize.includes(poke.myMove.name) ) return false
    if ( tgt.myCondition.myTelekinesis && !moveList_oneShot.includes(poke.myMove.name) ) return false
    // 必中技
    if ( poke.myMove.accuracy == "-" ) return false
    if ( poke.myMove.name == "かみなり" && isRainy(tgt) ) return false
    if ( poke.myMove.name == "ぼうふう" && isRainy(tgt) ) return false
    if ( poke.myMove.name == "ふぶき" && isSnowy(tgt) ) return false
    if ( poke.myMove.name == "どくどく" && poke.myType.includes("どく") ) return false


    // 命中判定 = 技の命中率 × 命中補正値M × ランク補正 × ミクルのみ - なかよし度効果
    // 乱数(0~99) < 命中判定 なら命中

    // 技の命中率
    let ratio = getAccuracyRatio(poke, tgt)

    // 一撃必殺技は、ランク補正や命中率を上下させる効果の影響を受けない。
    if ( moveList_oneShot.includes(poke.myMove.name) ) {
        const random = getRandom() * 100
        if ( random >= ratio ) return true
        else return false
    }

    // 命中補正の初期値
    // 命中補正 = 状態 × 特性 × 持ち物
    let corr = 4096

    // 場の状態
    const fieldCorr = accCorr_field()
    corr = Math.round(corr * fieldCorr)

    // 特性と持ち物は素早さ実数値順に計算する
    let order = myPokeInBattle(poke)
    order.push(tgt)
    order.sort( function( a,b ) {
        // 素早さ実数値
        if ( a.mySpeed > b.mySpeed ) return -1
        if ( a.mySpeed < b.mySpeed ) return 1
        // 乱数
        if ( getRandom() < 0.5 ) return -1
        else return 1
    })

    // 特性
    for ( const _poke of order ) {
        switch ( _poke.myID ) {
            case poke.myID: // 攻撃するポケモン
                const atkAbility = accCorr_atkAbility(_poke)
                corr = Math.round(corr * atkAbility)
                break

            case tgt.myID: // 攻撃を受けるポケモン
                const defAbility = accCorr_defAbility(_poke)
                corr = Math.round(corr * defAbility)
                break

            default: // 味方のポケモン
                const allyAbility = accCorr_allyAbility(_poke)
                corr = Math.round(corr * allyAbility)
                break
        }
    }

    // 持ち物
    for ( const _poke of order ) {
        switch ( _poke.myID ) {
            case poke.myID: // 攻撃するポケモン
                const atkItem = accCorr_atkItem(_poke, tgt)
                corr = Math.round(corr * atkItem)
                break

            case tgt.myID: // 攻撃を受けるポケモン
                const defItem = accCorr_defItem(_poke)
                corr = Math.round(corr * defItem)
                break

            default: // 味方のポケモン
                break
        }
    }

    // 技の命中率にMを掛けた後は4096で割り、小数点を五捨五超入する。このとき命中が100を超えることもある。
    ratio = fiveCut(ratio * corr / 4096)

    // ランク補正 = 自分の命中率のランク - 相手の回避率のランク
    const atkAccRank = getAtkAccRank(poke, tgt)
    const defAccRank = getDefAccRank(poke, tgt)
    let rank = atkAccRank - defAccRank

    if ( rank >= 0 ) rank = (3 + Math.min(rank, 6)) / 3
    else rank = 3 / (3 - Math.max(rank, -6))

    // 対応した倍率を掛けた後は小数点を切り捨てる。結果が100を超えるときは100にする。
    ratio = Math.floor(ratio * rank)
    ratio = Math.min(ratio, 100)

    // ミクルのみの効果を受けている場合は4915/4096倍し、小数点を五捨五超入する。結果が100を超えるときは100にする。
    if ( poke.myCondition.myMicle ) {
        ratio = fiveCut(ratio * 4915 / 4096)
        ratio = Math.min(ratio, 100)
    }

    const random = getRandom() * 100
    if ( random >= ratio ) return true
    else return false
}

function getAccuracyRatio(poke, tgt) {
    if ( poke.myMove.name == "かみなり" && isSunny(poke) ) return 50
    if ( poke.myMove.name == "ぼうふう" && isSunny(poke) ) return 50
    if ( tgt.myAbility == "ミラクルスキン" && isAbility(tgt) && poke.myMove.nature == "変化" ) return Math.min(50, poke.myMove.accuracy)
    if ( moveList_oneShot.includes(poke.myMove.name) ) return 30 + poke.myLevel - tgt.myLevel
    if ( poke.myMove.name == "ぜったいれいど" && !poke.myType.includes("こおり") ) return 20 + poke.myLevel - tgt.myLevel

    return poke.myMove.accuracy
}

function accCorr_field() {
    if ( fieldStatus.myGravity ) return 6840 / 4096
    return 1
}

function accCorr_atkAbility(poke) {
    if ( !isAbility(poke) ) return 1

    switch ( poke.myAbility ) {
        case "はりきり":
            if ( poke.myMove.nature != "物理" ) return 1
            return 3277 / 4096

        case "ふくがん":
            return 5325 / 4096

        case "しょうりのほし":
            return 4506 / 4096

        default:
            return 1
    }
}

function accCorr_defAbility(poke) {
    if ( !isAbility(poke) ) return 1

    switch ( poke.myAbility ) {
        case "ちどりあし":
            if ( !poke.myCondition.myConfusion ) return 1
            return 2048 / 4096

        case "すながくれ":
            if ( !isSandy(poke) ) return 1
            return 3277 / 4096

        case "ゆきがくれ":
            if ( !isSnowy(poke) ) return 1
            return 3277 / 4096

        default:
            return 1
    }
}

function accCorr_allyAbility(poke) {
    if ( !isAbility(poke) ) return 1

    switch ( poke.myAbility ) {
        case "しょうりのほし":
            return 4506 / 4096

        default:
            return 1
    }
}

function accCorr_atkItem(poke, tgt) {
    if ( !isItem(poke) ) return 1

    switch ( poke.myItem ) {
        case "こうかくレンズ":
            return 4505 / 4096

        case "フォーカスレンズ":
            if ( tgt.myCmd_move !== "" ) return 1
            return 4915 / 4096

        default:
            return 1
    }
}

function accCorr_defItem(poke) {
    if ( !isItem(poke) ) return 1

    switch ( poke.myItem ) {
        case "ひかりのこな":
        case "のんきのおこう":
            return 3686 / 4096

        default:
            return 1
    }
}

function getAtkAccRank(poke, tgt) {
    // 相手の特性がてんねんであるとき、自分の命中率ランクを無視する。
    if ( tgt.myAbility == "てんねん" && isAbility(tgt) ) return 0
    return poke.myRank_accuracy
}

function getDefAccRank(poke, tgt) {
    // 自分の特性がてんねんであるとき、相手の回避率ランクを無視する。
    if ( poke.myAbility == "てんねん" && isAbility(poke) ) return 0
    // 自分の特性がするどいめであるとき、相手の回避率ランクを無視する。
    if ( poke.myAbility == "するどいめ" && isAbility(poke) ) return 0
    // 特定の技では相手の回避率ランクを無視する（wikiにない）
    switch ( poke.myMove.name ) {
        case "せいなるつるぎ":
        case "DDラリアット":
        case "なしくずし":
            return 0
    }
    // 相手がみやぶられている/ミラクルアイ状態であるとき、相手の回避率ランクが+1以上であっても0とみなす。
    if ( tgt.myCondition.myForesight ) return Math.min(0, tgt.myRank_evasion)
    if ( tgt.myCondition.myMiracle_eye ) return Math.min(0, tgt.myRank_evasion)

    return tgt.myRank_evasion
}

//**************************************************
// 61.みがわりによるランク補正を変動させる効果以外の無効化
//**************************************************

function invalidBySub2nd_other(poke, tgt) {
    if ( !tgt.substitute ) return false             // みがわり状態であること
    if ( poke.myID == tgt.poke.myID ) return false  // 自分以外が対象であること
    if ( poke.myMove.nature != "変化" ) return false // 変化技であること

    return true
}

//**************************************************
// 64.技の仕様による無効化(その3)
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
        
        case "スポットライト":
            for ( const spot of getMyField(tgt.poke).mySpotlight ) {
                if ( spot.position == tgt.poke.myPosition ) return true // 対象がすでにちゅうもくのまと状態である（wikiにない）
            }
            return false
        
        case "ちょうはつ":
            if ( tgt.poke.myCondition.myTaunt ) return true // 対象がすでにちょうはつ状態である
            return false
        
        case "でんじふゆう":
            if ( tgt.poke.myCondition.myElectrify )  return true // 自身がすでにでんじふゆう状態である
            if ( tgt.poke.myCondition.mySmack_down ) return true // うちおとす状態である wikiにない
            if ( tgt.poke.myCondition.myIngrain )    return true // ねをはる状態である wikiにない
            return false
        
        case "ねがいごと":
            if ( getMyField(poke).myWish_data[poke.myPosition].heal ) return true // 前のターンのねがいごとの効果が残っている
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
    if ( poke.myMove.name == "オーロラベール" && getMyField(poke).myAurora_veil ) return true
    if ( poke.myMove.name == "ひかりのかべ" && getMyField(poke).myLight_screen ) return true
    if ( poke.myMove.name == "リフレクター" && getMyField(poke).myReflect ) return true
    if ( poke.myMove.name == "おいかぜ" && getMyField(poke).myTailwind ) return true
    if ( poke.myMove.name == "おまじない" && getMyField(poke).myLucky_chant ) return true
    if ( poke.myMove.name == "しろいきり" && getMyField(poke).myMist ) return true
    if ( poke.myMove.name == "しんぴのまもり" && getMyField(poke).mySafeguard ) return true
    // 自分の場の守る: すでに同じ状態になっている
    if ( poke.myMove.name == "たたみがえし" && getMyField(poke).myMat_block ) return true
    if ( poke.myMove.name == "トリックガード" && getMyField(poke).myCrafty_shield ) return true
    if ( poke.myMove.name == "ファストガード" && getMyField(poke).myQuick_guard ) return true
    if ( poke.myMove.name == "ワイドガード" && getMyField(poke).myWide_guard ) return true
    // お互いの場の状態: すでに同じ状態になっている
    if ( poke.myMove.name == "どろあそび" && fieldStatus.myMud_sport ) return true
    if ( poke.myMove.name == "みずあそび" && fieldStatus.myWater_sport ) return true
    if ( poke.myMove.name == "じゅうりょく" && fieldStatus.myGravity ) return true
    if ( poke.myMove.name == "フェアリーロック" && fieldStatus.myFairy_lock ) return true
    if ( poke.myMove.name == "プラズマシャワー" && fieldStatus.myIon_deluge ) return true
    // 設置技: すでに最大まで仕掛けられている
    if ( poke.myMove.name == "ステルスロック" && getOppField(poke).myStealth_rock ) return true
    if ( poke.myMove.name == "ねばねばネット" && getOppField(poke).mySticky_web ) return true
    if ( poke.myMove.name == "まきびし" && getOppField(poke).mySpikes == 3 ) return true
    if ( poke.myMove.name == "どくびし" && getOppField(poke).myToxic_spikes == 2 ) return true

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
        for ( const element of statusList_courtChange ) {
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
            if ( tgt.poke.myCondition.myEncore.name ) return true // すでにアンコール状態
            for ( let i = 0; i < 4; i++ ) {
                if ( tgt.poke[`myMove_${i}`] == history[0].name ) {
                    if ( tgt.poke[`myRest_pp_${i}`] == 0 )                return true // 技のPPが残っていない
                    if ( moveList_disable_encore.includes(tgt.poke[`myMove_${i}`]) ) return true // アンコールできない技
                }
            }
            return false
        
        case "かなしばり":
            if ( !history ) return true // 対象が技を使用していない
            if ( history[0].name == "わるあがき" ) return true // 最後のわざがわるあがき
            if ( tgt.poke.myCondition.myDisable.name ) return true // すでにかなしばり状態
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
            if ( moveList_cannotMove.includes(history[0].name))       return true
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
            if ( poke.myCondition.myTransform )           return true // 自身がすでにへんしん状態である
            if ( tgt.poke.myCondition.myTransform )       return true // 対象がすでにへんしん状態である
            if ( tgt.poke.myCondition.mySubstitute )      return true // 対象がみがわり状態である
            if ( tgt.poke.myCondition.myIllusion.status ) return true // 対象がイリュージョン状態である
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