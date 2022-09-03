//**************************************************
// メガシンカ
//**************************************************

function showCommand_mega(poke) {
    // メガシンカは一度しか使用できない
    if ( getMyField(poke).myMega ) return true
    if ( myParty.filter( _poke => _poke.myMega ).length > 0 ) return true

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
    // Zワザは一度しか使用できない
    if ( getMyField(poke).myZmove ) return true
    if ( myParty.filter( _poke => _poke.myZmove ).length > 0 ) return true

    for ( const Z of moveList_Z ) {
        if ( Z.item != poke.myItem ) continue
        return false
    }

    for ( const Z of moveList_dedicated_Z ) {
        if ( Z.poke != poke.myName ) continue
        if ( Z.item != poke.myItem ) continue
        return false
    }

    return true
}

function choice_Zmove(position) {
    const poke = myParty.filter( _poke => _poke.myPosition == position )[0]
    poke.myZmove = ( poke.myZmove )? false : true

    const Zmove = {
        normal: moveList_Z.filter( _Zmove => _Zmove.item == poke.myItem ), 
        dedicated: moveList_dedicated_Z.filter( _Zmove => _Zmove.poke == poke.myName && _Zmove.item == poke.myItem )
    }

    if ( poke.myZmove ) {
        for ( let i = 0; i < 4; i++ ) {
            const move = moveSearchByName(poke[`myMove_${i}`])
            // 通常のZワザ
            if ( Zmove.normal.length === 1 ) {
                if ( move.type == Zmove.normal[0].type ) {
                    document.getElementById(`move_${position}${i}`).textContent = ( move.nature == "変化" )? `Z${move.name}` : Zmove.normal[0].name
                } else {
                    document.getElementById(`move_radio_${position}${i}`).disabled = true
                }
            }
            // 専用のZワザ
            if ( Zmove.dedicated.length === 1 ) {
                if ( move.name == Zmove.dedicated[0].org ) {
                    document.getElementById(`move_${position}${i}`).textContent = Zmove.dedicated[0].name
                } else {
                    document.getElementById(`move_radio_${position}${i}`).disabled = true
                }
            }
        }
    } else {
        for ( let i = 0; i < 4; i++ ) {
            const move = moveSearchByName(poke[`myMove_${i}`])
            // 元の技名に戻す
            document.getElementById(`move_${position}${i}`).textContent = move.name
            // 選択不可化
            document.getElementById(`move_radio_${poke.myPosition}${i}`).disabled = disableChoiceMove(poke, i)
        }
    }
}

//**************************************************
// ダイマックス
//**************************************************

function showCommand_dynamax(poke) {
    // ダイマックスは一度しか使用できない
    if ( getMyField(poke).myDynamax ) return true
    if ( myParty.filter( _poke => _poke.myDynamax ).length > 0 ) return true

    return false
}

function choice_dynamax(position) {
    const poke = myParty.filter( _poke => _poke.myPosition == position )[0]
    poke.myDynamax = ( poke.myDynamax )? false : true

    switch ( poke.myDynamax ) {
        case true:
            document.getElementById(`com_log_dynamax_${position}`).textContent = `ダイマックス`

            for ( let i = 0; i < 4; i++ ) {
                const move = moveSearchByName(poke[`myMove_${i}`])
                const dynamax = moveList_dynamax.filter( dyna => dyna.type == move.type )[0]
                document.getElementById(`move_${position}${i}`).textContent = ( move.nature == "変化")? `ダイウォール` : dynamax.name
            }
            break

        case false:
            document.getElementById(`com_log_dynamax_${position}`).textContent = ``

            for ( let i = 0; i < 4; i++ ) {
                const move = moveSearchByName(poke[`myMove_${i}`])
                // 元の技名に戻す
                document.getElementById(`move_${position}${i}`).textContent = move.name
                // 選択不可化
                document.getElementById(`move_radio_${poke.myPosition}${i}`).disabled = disableChoiceMove(poke, i)
            }
            break
    }
}