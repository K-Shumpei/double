// コマンド欄の解放
function showCommand() {
    // 戻るボタンを見せる
    document.getElementById(`back_command`).style.display = "block"

    for ( let i = 0; i < 2; i++ ) {
        const poke = myParty.filter( _poke => _poke.myPosition == i )
        if ( poke.length !== 1 ) continue
        if ( !showCommand_move(poke[0]) ) continue

        // 戦う・交代ボタンの表示
        document.getElementById(`choise_${poke[0].myPosition}`).style.display = "block"
        // 交代ボタンの有効化
        document.getElementById(`change_btn_${poke[0].myPosition}`).disabled = showCommand_choice(poke[0])

        return
    }
}

// 行動選択の不可化
function showCommand_move(poke) {
    // 選択中のポケモン名を表示
    document.getElementById(`com_log_${poke.myPosition}`).style.display = "block"
    document.getElementById(`com_log_name_${poke.myPosition}`).textContent = `${poke.myName}は `

    // 反動で動けない
    if ( poke.myCondition.myCant_move ) {
        document.getElementById(`com_log_com_${poke.myPosition}`).textContent = `反動で動けない`
        return false
    }
    // ため技
    if ( poke.myCondition.myFilling.name ) {
        const move = moveSearchByName(poke.myCondition.myFilling.name)
        document.getElementById(`com_log_com_${poke.myPosition}`).textContent = move.name
        document.getElementById(`com_log_tgt_${poke.myPosition}`).textContent = `${move.target}に `

        if ( move.target != "1体選択" )  return false

        const tgt = poke.myCondition.myFilling.tgt
        document.getElementById(`com_log_tgt_${position}`).textContent = `${document.getElementById(`tgt_${poke.myPosition}${tgt}`).textContent}に `
        return false
    }
    // あばれる状態
    if ( poke.myCondition.myThrash.name ) {
        const move = moveSearchByName(poke.myCondition.myThrash.name)
        document.getElementById(`com_log_com_${poke.myPosition}`).textContent = move.name
        document.getElementById(`com_log_tgt_${poke.myPosition}`).textContent = `${move.target}に ` // ランダム1体
        return false
    }
    // アイスボール/ころがる
    if ( poke.myCondition.myRollout.name ) {
        const move = moveSearchByName(poke.myCondition.myRollout.name)
        const tgt = poke.myCondition.myRollout.tgt
        document.getElementById(`com_log_com_${poke.myPosition}`).textContent = move.name
        document.getElementById(`com_log_tgt_${position}`).textContent = `${document.getElementById(`tgt_${poke.myPosition}${tgt}`).textContent}に `
        return false
    }
    // がまん
    if ( poke.myCondition.myBide.turn ) {
        const move = moveSearchByName(poke.myCondition.myBide.name)
        const tgt = poke.myCondition.myBide.tgt
        document.getElementById(`com_log_com_${poke.myPosition}`).textContent = move.name
        document.getElementById(`com_log_tgt_${position}`).textContent = `${document.getElementById(`tgt_${poke.myPosition}${tgt}`).textContent}に `
        return false
    }
    // フリーフォール（対象）
    if ( poke.myCondition.mySky_drop ) {
        document.getElementById(`com_log_com_${poke.myPosition}`).textContent = `上空に連れ去られている`
        return false
    }

    return true
}

// 交代の不可化
function showCommand_choice(poke) {
    // 以下の状況では逃げられる
    if ( poke.myType.includes("ゴースト") ) return false
    if ( poke.myItem == "きれいなぬけがら" && isItem(poke) ) return false

    // 逃げられない
    if ( poke.myCondition.myCant_escape !== false ) return true
    // バインド
    if ( poke.myCondition.myBind.turn ) return true
    // ねをはる
    if ( poke.myCondition.myIngrain ) return true
    // フェアリーロック
    if ( fieldStatus.myFairy_lock == 2 ) return true
    // ありじごく
    const arenaTrap = oppPokeInBattle(poke).filter( _poke => _poke.myAbility == "ありじごく" && isAbility(_poke) )
    if ( arenaTrap.length > 0 && onGround(poke) ) return true
    // かげふみ
    const shadowTag = oppPokeInBattle(poke).filter( _poke => _poke.myAbility == "かげふみ" && isAbility(_poke) )
    if ( shadowTag.length > 0 && !( poke.myAbility == "かげふみ" && isAbility(poke) ) ) return true
    // じりょく
    const magnetPull = oppPokeInBattle(poke).filter( _poke => _poke.myAbility == "じりょく" && isAbility(_poke) )
    if ( magnetPull.length > 0 && poke.myType.includes("はがね") ) return true

    return false
}

// 「攻撃」を選んだ時
function choiceMove(position){
    // 「攻撃」か「交代」のボタン　を隠す
    document.getElementById(`choise_${position}`).style.display = "none"

    const poke = myParty.filter( _poke => _poke.myPosition == position )[0]

    // メガシンカ・Z技・ダイマックスボタンの表示
    document.getElementById(`special_${position}`).style.display = "block"
    // メガシンカボタンの有効化
    document.getElementById(`mega_btn_${position}`).disabled = showCommand_mega(poke)
    // Z技ボタンの有効化
    document.getElementById(`Zmove_btn_${position}`).disabled = showCommand_Zmove(poke)
    // ダイマックスボタンの有効化
    document.getElementById(`dynamax_btn_${position}`).disabled = showCommand_dynamax(poke)

    // 技を見せる
    for ( let i = 0; i < 4; i++ ) {
        if ( poke[`myMove_${i}`] == null ) continue

        // 表示
        document.getElementById(`com_move_${poke.myPosition}${i}`).style.display = "block"
        document.getElementById(`com_pp_${poke.myPosition}${i}`).style.display = "block"
        // 着色
        document.getElementById(`com_move_${poke.myPosition}${i}`).style.background = getColorCode(moveSearchByName(poke[`myMove_${i}`]).type)
        document.getElementById(`com_pp_${poke.myPosition}${i}`).style.background = getColorCode(moveSearchByName(poke[`myMove_${i}`]).type)
        document.getElementById(`move_${poke.myPosition}${i}`).textContent = poke[`myMove_${i}`]
        // テキスト
        document.getElementById(`rest_pp_${poke.myPosition}${i}`).textContent = poke[`myRest_pp_${i}`]
        document.getElementById(`full_pp_${poke.myPosition}${i}`).textContent = poke[`myFull_pp_${i}`]
        // 選択不可化
        if ( disableChoiceMove(poke, i) ) {
            document.getElementById(`move_radio_${poke.myPosition}${i}`).disabled = true
        }
    }
}

// 技の選択不可化
function disableChoiceMove(poke, num) {
    const move = moveSearchByName(poke[`myMove_${num}`])
    const history = poke.myCondition.myHistory

    // アンコール
    if ( poke.myCondition.myEncore.name ) {
        if ( move.name != poke.myCondition.myEncore.name ) return true
    }
    // いちゃもん
    if ( poke.myCondition.myTorment ) {
        if ( history.length > 0 && history[0].name == move.name ) return true
    }
    // かなしばり
    if ( poke.myCondition.myDisable.name ) {
        if ( move.name == poke.myCondition.myDisable.name ) return true
    }
    // ゲップ
    if ( move.name == "ゲップ" ) {
        if ( !poke.myBelch ) return true
    }
    // こだわり
    if ( poke.myCondition.myChoice.item && isItem(poke) ) {
        if ( poke.myCondition.myChoice.item == move.name ) return true
    }
    if ( poke.myCondition.myChoice.ability && isAbility(poke) ) {
        if ( poke.myCondition.myChoice.ability == move.name ) return true
    }
    // じゅうりょく
    if ( fieldStatus.myGravity ) {
        if ( moveList_disable_gravity.includes(move.name) ) return true
    }
    // ちょうはつ
    if ( poke.myCondition.myTaunt ) {
        if ( move.nature == "変化" ) return true
    }
    // とつげきチョッキ
    if ( poke.myItem == "とつげきチョッキ" && isItem(poke) ) {
        if ( move.nature == "変化" ) return true
    }
    // ほおばる
    if ( move.name == "ほおばる" ) {
        if ( !itemList_berry.includes(poke.myItem) ) return true
    }

    return false
}

// 技を選んだ時
function decideMoveCommand(position, num){
    const moveName = document.getElementById(`move_${position}${num}`).textContent
    const move = moveSearchByName(moveName)
    let moveTarget = moveSearchByName(moveName).target
    const pokeType = myParty.filter( poke => poke.myPosition == position )[0].myType

    if ( moveName == "のろい" ) {
        if ( pokeType.includes("ゴースト") ) moveTarget = "1体選択"
        else moveTarget = "自分"
    }
    document.getElementById(`com_log_com_${position}`).textContent = moveName

    // 技を隠す
    for ( let i = 0; i < 4 ;i++ ) {
        document.getElementById(`com_move_${position}${i}`).style.display = "none"
        document.getElementById(`com_pp_${position}${i}`).style.display = "none"
        document.getElementById(`move_${position}${i}`).textContent = ""
        document.getElementById(`rest_pp_${position}${i}`).textContent = ""
        document.getElementById(`full_pp_${position}${i}`).textContent = ""
    }

    // メガシンカ・Z技・ダイマックスボタン　を隠す
    document.getElementById(`special_${position}`).style.display = "none"

    switch ( moveTarget ) {
        case "1体選択":
            // 「攻撃対象」の文字をを見せる
            document.getElementById(`target_comment_${position}`).style.display = "block"
            // 攻撃対象を見せる(相手)
            for ( const poke of oppParty ) {
                if ( poke.myPosition != null ) {
                    document.getElementById(`com_tgt_${position}${poke.myPosition + 2}`).style.display = "block"
                    document.getElementById(`tgt_${position}${poke.myPosition + 2}`).textContent = poke.myName
                } 
            }
            // 攻撃対象を見せる(自分)
            for ( const poke of myParty ) {
                if ( poke.myPosition != null && poke.myPosition != position ) {
                    document.getElementById(`com_tgt_${position}${poke.myPosition}`).style.display = "block"
                    document.getElementById(`tgt_${position}${poke.myPosition}`).textContent = poke.myName
                } 
            }
            break

        case "自分":
        case "味方全体":
        case "相手全体":
        case "全体":
        case "ランダム1体":
        case "自分以外":
        case "味方の場":
        case "相手の場":
        case "全体の場":
            document.getElementById(`com_log_tgt_${position}`).textContent = `${move.target}に `
            decideAction(position)
            break
    }
}

// 「交代」を選んだ時
function choiceHand(position){
    // 「攻撃」か「交代」のボタン　を隠す
    document.getElementById(`choise_${position}`).style.display = "none"
    // 「交代先」の文字をを見せる
    document.getElementById(`hand_comment_${position}`).style.display = "block"
    // 控えを見せる
    for ( const poke of myParty ) {
        if ( poke.myPosition == position ) {
            // 選択中のポケモン名を表示
            document.getElementById(`com_log_${position}`).style.display = "block"
            document.getElementById(`com_log_name_${position}`).textContent = `${poke.myName}は `
        }
        // 戦闘していなくて、ひんしでない
        if ( poke.myPosition == null && poke.myRest_hp > 0 ) {
            for ( let i = 0; i < 4; i++ ) {
                // 控えの番号を使う　すでに交代先に指定されていたらスルー
                if ( i == poke.myBench && i != document.forms.battle.hand0.value ) {
                    document.getElementById(`com_hand_${position}${i}`).style.display = "block"
                    document.getElementById(`hand_${position}${i}`).textContent = poke.myName
                    break
                }
            }
        }
    }
}

// 行動(攻撃対象、交代先)を選んだ時
function decideAction(position){
    const form = document.forms.battle
    const tgt  = form[`tgt${position}`].value
    const hand = form[`hand${position}`].value

    if ( tgt  != "" ) document.getElementById(`com_log_tgt_${position}`).textContent = `${document.getElementById(`tgt_${position}${tgt}`).textContent}に `
    if ( hand != "" ) {
        document.getElementById(`com_log_tgt_${position}`).textContent = `${document.getElementById(`hand_${position}${hand}`).textContent}に `
        document.getElementById(`com_log_com_${position}`).textContent = `交代`
    }

    // 「攻撃対象」の文字をを隠す
    document.getElementById(`target_comment_${position}`).style.display = "none"
    // 「交代先」の文字をを隠す
    document.getElementById(`hand_comment_${position}`).style.display = "none"
    // 攻撃対象　と　手持ち　を隠す
    for ( let i = 0; i < 4; i++ ) {
        // 攻撃対象　を隠す
        document.getElementById(`com_tgt_${position}${i}`).style.display = "none"
        document.getElementById(`tgt_${position}${i}`).textContent = ""
        // 手持ちを　隠す
        document.getElementById(`com_hand_${position}${i}`).style.display = "none"
        document.getElementById(`hand_${position}${i}`).textContent = ""
    }

    // 0番目で　かつ　1番目がいる時
    if ( position == 0 ) {
        for ( const poke of myParty ) {
            if ( poke.myPosition == 1 ) {
                // 選択中のポケモン名を表示
                document.getElementById(`com_log_${poke.myPosition}`).style.display = "block"
                document.getElementById(`com_log_name_${poke.myPosition}`).textContent = `${poke.myName}は `
                // 「攻撃」か「交代」のボタン　を見せる
                document.getElementById(`choise_${poke.myPosition}`).style.display = "block"

                return
            }
        }
    }
    // それ以外なら終了

    // 最終決定ボタンを見せる
    document.getElementById(`emit_command`).style.display = "block"

}

// 戻るボタンを押した時
function back(){
    // 最終決定ボタンを隠す
    document.getElementById(`emit_command`).style.display = "none"
    // 戻るボタンを見せる
    document.getElementById('back_command').style.display = "block"

    // メガシンカ・Z技・ダイマックス
    for ( const poke of myParty ) {
        if ( poke.myPosition === null ) continue
        poke.myMega = false
        poke.myZmove = false
        poke.myDynamax = false
    }

    for ( let i = 0; i < 2; i++ ) {
        // 「攻撃」か「交代」のボタン　を隠す
        document.getElementById(`choise_${i}`).style.display = "none"
        document.getElementById(`change_btn_${i}`).disabled = false
        // メガシンカ・Z技・ダイマックスボタン　を隠す
        document.getElementById(`special_${i}`).style.display = "none"
        document.getElementById(`mega_btn_${i}`).disabled = false
        document.getElementById(`Zmove_btn_${i}`).disabled = false
        document.getElementById(`dynamax_btn_${i}`).disabled = false
        // 「攻撃対象」の文字をを隠す
        document.getElementById(`target_comment_${i}`).style.display = "none"
        // 「交代先」の文字をを隠す
        document.getElementById(`hand_comment_${i}`).style.display = "none"
        // 選択した内容を消す
        document.getElementById(`com_log_${i}`).style.display = "none"
        document.getElementById(`com_log_name_${i}`).textContent = ""
        document.getElementById(`com_log_tgt_${i}`).textContent = ""
        document.getElementById(`com_log_com_${i}`).textContent = ""

        // ログを削除
        document.getElementById(`change_log_${i}`).style.display = "none"
        document.getElementById(`change_name_${i}`).textContent = ""
        document.getElementById(`change_position_${i}`).textContent = ""
        // 上下　を隠す
        document.getElementById(`change_above_${i}`).style.display = "none"
        document.getElementById(`change_below_${i}`).style.display = "none"
        // チェックを外す
        const radio_up_down = document.querySelectorAll(`input[name=up_down_${i}]`)
        for ( const element of radio_up_down ) element.checked = false

        // 技　と　攻撃対象　と　手持ち　を隠す
        for ( let j = 0; j < 4; j++ ) {
            // 技　を隠す
            document.getElementById(`com_move_${i}${j}`).style.display = "none"
            document.getElementById(`com_pp_${i}${j}`).style.display = "none"
            document.getElementById(`move_${i}${j}`).textContent = ""
            document.getElementById(`rest_pp_${i}${j}`).textContent = ""
            document.getElementById(`full_pp_${i}${j}`).textContent = ""
            document.getElementById(`move_radio_${i}${j}`).checked = false
            document.getElementById(`move_radio_${i}${j}`).disabled = false
            // 攻撃対象　を隠す
            document.getElementById(`com_tgt_${i}${j}`).style.display = "none"
            document.getElementById(`tgt_${i}${j}`).textContent = ""
            const radio_tgt = document.querySelectorAll(`input[name=tgt${i}]`)
            for ( const element of radio_tgt ) element.checked = false
            // 手持ち　を隠す
            document.getElementById(`com_hand_${i}${j}`).style.display = "none"
            document.getElementById(`hand_${i}${j}`).textContent = ""
            const radio_hand = document.querySelectorAll(`input[name=hand${i}]`)
            for ( const element of radio_hand ) element.checked = false

            // 交代先　を隠す
            document.getElementById(`com_change_${i}${j}`).style.display = "none"
            document.getElementById(`change_${i}${j}`).textContent = ""
            const radio_change = document.querySelectorAll(`input[name=change${i}]`)
            for ( const element of radio_change ) element.checked = false
        }
    }

    if ( faintedJudge(myParty) || fieldStatus.mySwitch_me ) {
        showCommandToDecideNext() 
    } else if ( faintedJudge(oppParty) || fieldStatus.mySwitch_opp ) {

    } else {
        showCommand()
    } 
}

// 交代先を選ぶとき
function showCommandToDecideNext() {
    // 控えを見せる
    for ( const poke of myParty ) {
        // 戦闘していなくて、ひんしでない
        if ( poke.myPosition == null && poke.myRest_hp > 0 && !isSwitch(poke) ) {
            document.getElementById(`com_change_0${poke.myBench}`).style.display = "block"
            document.getElementById(`change_0${poke.myBench}`).textContent = poke.myName
        }
    }
}

// 交代先のポケモンを選んだ時
function decideNext(position) {
    // 選択肢を隠す
    for ( let i = 0; i < 4; i++ ) {
        document.getElementById(`com_change_${position}${i}`).style.display = "none"
    }

    // 選択のログを記録
    const form = document.forms.battle
    const change = [form.change0.value, form.change1.value]
    document.getElementById(`change_log_${position}`).style.display = "block"
    document.getElementById(`change_name_${position}`).textContent = document.getElementById(`change_${position}${change[position]}`).textContent + "を "

    if ( faintedJudge(myParty) == 1 ) {
        // ポケモンを出す位置を指定
        for ( const poke of myParty ) {
            if ( poke.myPosition != null ) {
                document.battle.up_down_0[1-poke.myPosition].checked = true
            }
        }
        //決定ボタンを見せる
        document.getElementById(`emit_command`).style.display = "block"
    } else if ( faintedJudge(myParty) == 2 ) {
        document.getElementById(`change_above_${position}`).style.display = "block"
        document.getElementById(`change_below_${position}`).style.display = "block"
    }
}

// 交代先を出す場所を選んだ時（2匹交代の時のみ）
function decidePosition(position) {
    // 上下ボタンを隠す
    document.getElementById(`change_above_${position}`).style.display = "none"
    document.getElementById(`change_below_${position}`).style.display = "none"
    // ログの記録
    const form = document.forms.battle
    const up_down = [form.up_down_0.value, form.up_down_1.value]
    const text = ( up_down[position] == 0 )? "上に " : "下に "
    document.getElementById(`change_position_${position}`).textContent = text

    if ( position == 0 ) {
        // 控えを見せる
        for ( const poke of myParty ) {
            // 戦闘していなくて、ひんしでない
            if ( poke.myPosition == null && poke.myRest_hp > 0 && poke.myPosition != form.change0.value ) {
                document.getElementById(`com_change_1${poke.myBench}`).style.display = "block"
                document.getElementById(`change_1${poke.myBench}`).textContent = poke.myName
            }
        }
    } else {
        //決定ボタンを見せる
        document.getElementById(`emit_command`).style.display = "block"
    }
}