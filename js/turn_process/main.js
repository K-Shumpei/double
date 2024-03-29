// 各ターンの処理
function runBattle() {
    // ターン開始宣言
    startTurn()
    // 行動順
    const firstOrder = speedOrder(allPokeInBattle())
    // 1.クイックドロウ/せんせいのツメ/イバンのみの発動
    priorityTools(firstOrder)
    // 2.交換・よびかける
    changePokemon(firstOrder)
    // 3.メガシンカ/ウルトラバースト
    megaEvolition(firstOrder)
    // 4.ダイマックス　すばやさ順に発動
    becomeToDynaMax(firstOrder)
    // メガ進化、ダイマックスを終えた後、もう一度素早さチェックを行う
    const secondOrder = speedOrder(allPokeInBattle())
    // 5.きあいパンチ/トラップシェル/くちばしキャノンの準備行動
    preliminaryAction(secondOrder)
    // 6.技の処理
    moveUsedEachPokemon()
    if ( fieldStatus.mySwitch_me ) return
    if ( fieldStatus.mySwitch_opp ) return
    // 7.ターン終了
    endProcess()
}


// ターン開始宣言
function startTurn(){
    fieldStatus.myTurn_end = false
    const log = document.getElementById("log").value
    const turn = (log.match( /ターン目/g ) || []).length + 1
    writeLog("---------- " + turn + "ターン目 ----------")
}

// 1.クイックドロウ/せんせいのツメ/イバンのみの発動
function priorityTools(firstOrder) {
    for ( const poke of firstOrder ) {
        // 交代するときは発動しない
        if ( poke.myCmd_hand != "" ) continue

        selectedMove(poke) // 選択した技をpoke.myMoveに記録
        
        if ( poke.myAbility == "クイックドロウ" && isAbility(poke) && getRandom() < 0.3 && poke.myMove.nature != "変化" ) {
            abilityDeclaration(poke)
            poke.myCondition.myFirst = true
            writeLog(`${poke.myTN} の ${poke.myName} の 行動が早くなった !`)
            continue
        }
        if ( poke.myItem == "せんせいのツメ" && isItem(poke) && getRandom() < 0.2 ) {
            poke.myCondition.myFirst = true
            writeLog(`${poke.myTN} の ${poke.myName} は せんせいのツメで 行動が早くなった !`)
        }
        if ( poke.myItem == "イバンのみ" && isItem(poke) && poke.myRest_hp <= poke.myFull_hp / isGluttony(poke) ) {
            enableToRecycle(poke)
            poke.myCondition.myFirst = true
            writeLog(`${poke.myTN} の ${pke.myName} は イバンのみで 行動が早くなった !`)
        }
    }
}

// 2.交換・よびかける
// 交換順は、交代前のポケモンのすばやさ順。出てきたポケモンが(1)における行動を全て終えてから次のポケモンが交換される。
// 交換に対しておいうちが発動する場合、発動する。
// おいうち使用者がメガシンカする場合、3-6での行動を前倒しにしてからおいうちを行う。
// おいうち使用者と3-7の行動を取るポケモンがいた場合、3-7での行動を前倒しにしてからおいうちを行われる。
function changePokemon(firstOrder) {
    for ( const poke of firstOrder ) {
        // 交代を選択していなければスルー
        if ( poke.myCmd_hand == "" ) continue

        const party = getParty(poke)

        // 交代先のポケモンと交代位置
        const next = getNextPoke(poke)
        const position = poke.myPosition

        // コマンドの消去
        poke.myCmd_move = ""
        poke.myCmd_tgt = ""
        poke.myCmd_hand = ""

        // 他に交代を選択していたら、数字を一つずらす
        for ( const _poke of party ) {
            if ( _poke.myCmd_hand != "" ) _poke.myCmd_hand -= 1
        }


        // おいうち判定
        /*
        firstOrder.forEach((_con, i) => {
            if (_con.com >= 4) return
            if (_con.move.name != "おいうち") return
            if (!(_con.tgt[0].parent == con.parent && _con.tgt[0].child == con.child)) return
            // megaEvolution([user[1], user[0]])
            const user = isMe(me, you, _con)
            con.p_con += "おいうち成功" + "\n"
            moveProcess(user[0], user[1], _con, _con.move)
            firstOrder[i].com = ""
            firstOrder[i].tgt = ""
        })
        */
        // if (con.com == "") return
        writeLog(`${poke.myTN} は ${poke.myName} を 引っ込めた！`)
        toHand(poke)
        summon(next, position)
        landing()
    }
}

// 3.メガシンカ/ウルトラバースト
function megaEvolition(firstOrder){
    for ( const poke of firstOrder ) {
        if ( !poke.myMega ) continue
        for ( const mega of itemList_megaStone ) {
            if ( mega.poke != poke.myName ) continue
            if ( mega.name != poke.myItem ) continue
            getMyField(poke).myMega = true
            poke.myMega = false
            writeLog(`${poke.myTN} の ${poke.myName} のメガシンカ !`)
            formChange(poke, mega.mega, true)
            break
        }
        
    }
}
// 4.ダイマックス　すばやさ順に発動
function becomeToDynaMax(firstOrder){

}

// 5.きあいパンチ/トラップシェル/くちばしキャノンの準備行動
function preliminaryAction(secondOrder) {
    for ( const poke of secondOrder ) {
        if ( poke.myCmd_move == "" ) continue
        switch ( poke.myMove.name ) {
            case "きあいパンチ":
                writeLog(`${poke.myTN} の ${poke.myName} は 集中力を高めている！`)
                break

            case "トラップシェル":
                poke.myCondition.myShell_trap = "set"
                writeLog(`${poke.myTN} の ${poke.myName} は トラップシェルを仕掛けた！`)
                break

            case "くちばしキャノン":
                poke.myCondition.myBeak_blast = true
                writeLog(`${poke.myTN} の ${poke.myName} は くちばしを加熱し始めた！`)
                break
        }
    }
}

// 6.技の処理
function moveUsedEachPokemon() {
    while ( actionOrder().length > 0 || fieldStatus.myDancer ) {
        // 特性『おどりこ』が発動する時
        if ( fieldStatus.myDancer ) {
            for ( const poke of allPokeInBattle() ) {
                if ( !isAbility(poke) ) continue
                if ( poke.myAbility != "おどりこ" ) continue
                if ( isHide(poke) ) continue

                // 特性宣言
                abilityDeclaration(poke)

                // 技
                const orgMove = poke.myMove
                const dancer = moveSearchByName(fieldStatus.myDancer)
                poke.myMove = moveConfig(poke, dancer)

                // 行動
                const judge = moveSuccessJudge(poke)
                poke.myMove.success = judge
                if ( judge ) processOfAdditionalEffect(poke)

                // 使用した技を履歴に残す
                poke.myCondition.myHistory.unshift(poke.myMove)
                poke.myMove = orgMove
            }
            
            fieldStatus.myDancer = false
            continue
        }

        // それ以外
        const poke = actionOrder()[0]

        // クロスサンダー・クロスフレイム
        // crossDragon(me, you)
        // 行動するポケモンのHPが残っている時に行動する
        const judge = moveSuccessJudge(poke)

        // コマンドの消去
        if ( !poke.myCondition.myFilling.name ) {
            poke.myCmd_hand = ""
            poke.myCmd_move = ""
            poke.myCmd_tgt = ""
        }

        switch ( judge ) {
            // 技が成功した時
            case true:
                poke.myMove.success = true
                processOfAdditionalEffect(poke)

            // 技が失敗した時
            case false:
                poke.myCondition.myProtect_num = 0
                poke.myCondition.myShell_trap = false
                poke.myMove.success = ( poke.myCondition.myFilling.name )? true : false
        }

        // 使用した技を履歴に残す
        poke.myCondition.myHistory.unshift(poke.myMove)
        poke.myMove = false

        // 行動を完了したとき
        processAfterAction(poke)

        if ( fieldStatus.mySwitch_me ) return
        if ( fieldStatus.mySwitch_opp ) return
    }
}

function processAfterAction(poke) {
    // 行動が失敗に終わった時も処理
    poke.myCondition.myMold_breaker = false // かたやぶり

    // 行動を完了した時
    if ( poke.myCondition.myActivate ) {
        // ミクルのみ
        poke.myCondition.myMicle = false

        poke.myCondition.myActivate = false
    }
}