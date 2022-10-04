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

        // writeLog(`(${poke.myTN} の ${poke.myName} の行動)`)

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
    while ( actionOrder().length > 0 ) {
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

        if ( judge ) {
            poke.myMove.success = true
            processOfAdditionalEffect(poke)
            if ( fieldStatus.mySwitch_me ) break
            if ( fieldStatus.mySwitch_opp ) break
        } else {
            poke.myCondition.myProtect_num = 0
            poke.myCondition.myShell_trap = false
            if ( !poke.myCondition.myFilling.name ) poke.myMove.success = false
        }

        // 使用した技を履歴に残す
        poke.myCondition.myHistory.unshift(poke.myMove)
        poke.myMove = false

        if ( fieldStatus.mySwitch_me ) return
        if ( fieldStatus.mySwitch_opp ) return



        /*
        if (order[0].move.result == "成功"){
            if (move[9] == "反射"){
                let save = atk
                atk = def
                def = save
            }
            if (moveEffect(user[0], user[1], order[0], order[0].move) == "stop"){
                order[0].com = ""
                order[0].tgt = ""
                return
            }
        } else {
            removeText(con.p_con, "連続攻撃『アイスボール』")
            removeText(con.p_con, "連続攻撃『ころがる』")
            removeText(con.p_con, "状態変化『いかり』")
            removeText(con.p_con, "状態変化『がまん』")
            removeText(con.p_con, "状態変化『じゅうでん』")
            removeText(con.p_con, "技『くちばしキャノン』")
            removeText(con.p_con, "まもる系連続成功回数")
            removeText(con.p_con, "れんぞくぎり")
            if (move.name == "とびげり" || move.name == "とびひざげり"){

            }
        }
        removeText(me.f_con, "かたやぶり")
        removeText(you.f_con, "かたやぶり")
        removeText(con.p_con, "持ち物『ジュエル』")
        order[0].com = ""
        order[0].tgt = ""
        for (const con of allCondition(me, you)){
            con.damage = {caused: "", done: "", compatibility: "", critical: "", substitute: ""}
            con.result = ""
        }
        */
    }
}      






// わるあがきをするかどうか
function struggle_check(order){
    let sign = 0
    let struggle = "A-B" // わるあがきをするチーム
    let choice = []
    for (const team of order){
        let move_sign = []
        let poke_sign = []
        for (let i = 0; i < 4; i++){
            if (document.getElementById(team + "_radio_" + i).disabled == false){
                move_sign.push(i)
            }
        }
        for (let i = 0; i < 3; i++){
            if (document.getElementById(team + "_" + i + "_button").disabled == false){
                poke_sign.push(i)
            }
        }
        choice.push(move_sign.length + poke_sign.length)
        if (move_sign.length == 0){
            struggle.replace(team, "0")
        } else if (move_sign.length + poke_sign.length > 0 && document.getElementById("battle")[team + "_move"].value == ""){
            alert(team + "チームは　行動を選択してください")
            sign += 1
        }
    }
    if (sign > 0){
        return true
    } else {
        return [struggle, choice]
    }
}


// 選択ボタンの有効化
function button_validation(){
    for (const team of ["A", "B"]){
        // 技選択を全て有効化
        for (let i = 0; i < 4; i++){
            if (document.getElementById(team + "_move_" + i).textContent != ""){
                document.getElementById(team + "_radio_" + i).disabled = false
            }
        }
        // 交換ボタンの有効化
        for (let i = 0; i < 3; i++){
            if (document.getElementById(team + "_" + i + "_existence").textContent == "控え"){
                document.getElementById(team + "_" + i + "_button").disabled = false
            }
        }

        // ゲップ：備考欄に「ゲップ」の文字がなければ使用不能に
        for (let i = 0; i < 4; i++){
            if (document.getElementById(team + "_move_" + i).textContent == "ゲップ"){
                for (let j = 0; j < 3; j++){
                    if (document.getElementById(team + "_" + j + "_existence").textContent == "戦闘中" && !document.getElementById(team + "_" + j + "_belch").textContent == "ゲップ"){
                        document.getElementById(team + "_radio_" + i).disabled = true
                    }
                }
            }
        }
        // ほおばる：きのみを持っていない場合、使用不能に
        for (let i = 0; i < 4; i++){
            if (document.getElementById(team + "_move_" + i).textContent == "ほおばる"){
                if (!berry_item_list.includes(new get(team).item)){
                    document.getElementById(team + "_radio_" + i).disabled = true
                }
            }
        }
        // いちゃもん：いちゃもんで使用不能だった技を使用可能に
        if (new get(team).p_con.includes("いちゃもん")){
            for (let i = 0; i < 4; i++){
                if (document.getElementById(team + "_move_" + i).textContent == document.battle[team + "_used_move"].value){
                    document.getElementById(team + "_radio_" + i).disabled = false
                }
            }
        }
    }
}



