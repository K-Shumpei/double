//**************************************************
// メガシンカ
//**************************************************

function showCommand_mega(poke) {
    if ( poke.myMega ) return true

    for ( const mega of itemList_megaStone ) {
        if ( mega.poke != poke.myName ) continue
        if ( mega.name != poke.myItem ) continue
        return false
    }

    return true
}

function choice_mega(position) {
    const poke = myParty.filter( _poke => _poke.myPosition == position )[0]
    poke.myMega = ( poke.myMega )? false : true

    if ( poke.myMega ) {
        document.getElementById(`com_log_mega_${position}`).textContent = `メガシンカ`
    } else {
        document.getElementById(`com_log_mega_${position}`).textContent = ``
    }
}

//**************************************************
// Z技
//**************************************************

function showCommand_Zmove(poke) {
    for ( const Z of moveList_Z ) {
        if ( Z.item != poke.myItem ) continue
        return false
    }

    return true
}

function choice_Zmove(position) {
    const poke = myParty.filter( _poke => _poke.myPosition == position )[0]
    poke.myZmove = ( poke.myZmove )? false : true

    const Zmove = moveList_Z.filter( _Zmove => _Zmove.item == poke.myItem )[0]

    if ( poke.myZmove ) {
        for ( let i = 0; i < 4; i++ ) {
            const move = moveSearchByName(poke[`myMove_${i}`])
            if ( move.type == Zmove.type ) {
                document.getElementById(`move_${position}${i}`).textContent = ( move.nature == "変化" )? `Z${move.name}` : Zmove.name
            } else {
                document.getElementById(`move_radio_${position}${i}`).disabled = true
            }
        }
    } else {
        for ( let i = 0; i < 4; i++ ) {
            const move = moveSearchByName(poke[`myMove_${i}`])
            if ( move.type == Zmove.type ) {
                document.getElementById(`move_${position}${i}`).textContent = move.name
            } else {
                document.getElementById(`move_radio_${position}${i}`).disabled = false
            }
        }
    }
}

//**************************************************
// ダイマックス
//**************************************************

function showCommand_dynamax(poke) {
    return true
}

function choice_dynamax(position) {
    
}