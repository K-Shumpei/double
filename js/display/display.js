const dispParmeter = ["H", "A", "B", "C", "D", "S"]

// 技のリセット
function moveReset() {
    for ( i = 0; i < 4; i++ ) {
        document.getElementById(`move${i}`).value = ""
        document.getElementById(`type${i}`).textContent = ""
        document.getElementById(`power${i}`).textContent = ""
        document.getElementById(`accuracy${i}`).textContent = ""
        document.getElementById(`PP${i}`).textContent = ""
        document.getElementById(`discription${i}`).textContent = ""
    }
}

function setID(){
    moveReset()
    const name = document.getElementById("name").value
    const poke = pokeSearch(name)
    if ( !poke ) return

    // 種族値
    document.getElementById("H_BS").textContent = poke.HP
    document.getElementById("A_BS").textContent = poke.Atk
    document.getElementById("B_BS").textContent = poke.Def
    document.getElementById("C_BS").textContent = poke.Sp_atk
    document.getElementById("D_BS").textContent = poke.Sp_def
    document.getElementById("S_BS").textContent = poke.Speed

    // タイプ
    document.getElementById("type").textContent = poke.type.join("、")

    // 性別
    if ( poke.gender[0] == "-" ){
        document.getElementById("male").disabled = true
        document.getElementById("female").disabled = true
        document.getElementById("not").disabled = false
        document.getElementById("not").checked = true
    }
    if ( poke.gender[0] == "♂" && poke.gender.length == 1 ){
        document.getElementById("male").disabled = false
        document.getElementById("female").disabled = true
        document.getElementById("not").disabled = true
        document.getElementById("male").checked = true
    }
    if ( poke.gender[0] == "♀" ){
        document.getElementById("male").disabled = true
        document.getElementById("female").disabled = false
        document.getElementById("not").disabled = true
        document.getElementById("female").checked = true
    }
    if ( poke.gender.length == 2 ){
        document.getElementById("male").disabled = false
        document.getElementById("female").disabled = false
        document.getElementById("not").disabled = true
        document.getElementById("male").checked = true
    }

    // 特性
    document.getElementById("ability").innerHTML = ""
    for ( const ability of poke.ability ){
        $("<option>", {
            text: ability
        }).appendTo('#ability')
    }
    // 実数値計算
    AVcalc()
    // 技の設定
    canUse()
}

function AVcalc(){
    const name = document.getElementById("name").value
    const poke = pokeSearch(name)
    if ( !poke ) return
    const lv = Number(document.getElementById(`lv`).value)

    const para = ["H", "A", "B", "C", "D", "S"]

    for ( let i = 0; i < 6; i++ ) {
        const BS = document.getElementById(`${para[i]}_BS`).textContent
        const IV = document.getElementById(`${para[i]}_IV`).value
        const EV = document.getElementById(`${para[i]}_EV`).value
        let AV = Math.floor((( Number(BS)*2 + Number(IV) + Math.floor( Number(EV) / 4 )) * lv ) / 100 )

        switch ( para[i] ) {
            case "H":
                if ( name == "ヌケニン" ) AV = 1
                else AV += lv + 10
                break

            case "A":
            case "B":
            case "C":
            case "D":
            case "S":
                const plus = $("#naturePlus" + i).prop("checked")
                const minus = $("#natureMinus" + i).prop("checked")
                let rate = 1.0
                if ( plus && !minus ) rate = 1.1
                else if ( !plus && minus ) rate = 0.9
                AV = Math.floor((AV + 5) * rate)
                break
        }

        document.getElementById(`${para[i]}_AV`).value = AV
    }
}

function setLV(value) {
    document.getElementById(`lv`).value = value
}


function canUse(){
    const name = document.getElementById(`name`).value
    const pokeNum = pokeSearch(name).number
    const avalMove = availableMove[`${pokeNum}`]

    for ( let i = 0; i < 4; i++ ) {
        document.getElementById(`move${i}`).innerHTML = ""
        const selectMove = document.getElementById(`move${i}`)
        // 空白
        const blunk = document.createElement(`option`)
        blunk.value = ""
        blunk.textContent = ""
        selectMove.appendChild(blunk)
        // 使用可能な技
        for ( const move of avalMove.move ) {
            const option = document.createElement(`option`)
            option.value = move
            option.textContent = move
            selectMove.appendChild(option)
        }
    }
}


function setRandom(){
    // 名前
    let pokeName = "フシギダネ"
    while ( pokeList_eviolite.includes(pokeName) || pokeList_formChange.includes(pokeName)) {
        const num = Math.floor(Math.random() * pokeList.length)
        pokeName = pokeList[num].name
    }
    document.getElementById(`name`).value = pokeName
    setID()

    // 持ち物の設定
    const itemNum = Math.floor(Math.random() * random_item_list.length)
    document.getElementById(`item`).value = random_item_list[itemNum]

    // 技が4つ未満のポケモン
    const name = document.getElementById(`name`).value
    const pokeNum = pokeSearch(name).number
    const avalMove = availableMove[`${pokeNum}`]

    switch ( name ) {
        case "メタモン":
            document.getElementById(`move0`).value = "へんしん"
            setMove(0)
            break

        case "ドーブル":
            document.getElementById(`move0`).value = "スケッチ"
            setMove(0)
            break

        case "アンノーン":
            document.getElementById(`move0`).value = "めざめるパワー"
            setMove(0)
            break

        case "コスモッグ":
            document.getElementById(`move0`).value = "はねる"
            document.getElementById(`move1`).value = "テレポート"
            setMove(0)
            setMove(1)
            break

        case "コスモウム":
            document.getElementById(`move0`).value = "はねる"
            document.getElementById(`move1`).value = "テレポート"
            document.getElementById(`move2`).value = "コスモパワー"
            setMove(0)
            setMove(1)
            setMove(2)
            break

        default:
            const moveNum = [0, 0, 0, 0]
            while ( new Set(moveNum).size !== moveNum.length ) {
                for ( let i = 0; i < 4; i++ ) {
                    moveNum[i] = Math.floor( Math.random() * avalMove.move.length )
                }
            }
            for ( let i = 0; i < 4; i ++ ) {
                document.getElementById(`move${i}`).value = avalMove.move[moveNum[i]]
                setMove(i)
            }
    }
}

function setReset(){
    document.getElementById(`name`).value = ""
    document.getElementById(`type`).textContent = ""
    for ( const gender of ["male", "female", "not"] ) {
        document.getElementById(`${gender}`).disabled = false
        document.getElementById(`${gender}`).checked = false
    }
    document.getElementById(`lv`).value = "50"
    document.getElementById(`ability`).html = ""
    document.getElementById(`item`).value = ""

    for ( const para of dispParmeter ) {
        document.getElementById(`${para}_BS`).textContent = "100"
        document.getElementById(`${para}_IV`).value = "31"
        document.getElementById(`${para}_EV`).val = "0"
    }
    document.getElementById(`EVlast`).textContent = "510"
    document.getElementById(`naturePlus1`).checked = true
    document.getElementById(`natureMinus1`).checked = true
    document.getElementById(`nature`).textContent = "てれや"
    moveReset()
    AVcalc()
}



function setIV(num, value){
    document.getElementById(`${dispParmeter[num]}_IV`).value = value
}

function setEV(num, value){
    const EV = Number(document.getElementById(`${dispParmeter[num]}_EV`).value)
    const last = Number(document.getElementById(`EVlast`).textContent)
    if ( last + EV - value >= 0 ) {
        document.getElementById(`${dispParmeter[num]}_EV`).value = value
        document.getElementById(`EVlast`).textContent = last + EV - value
    }
}

function EVchange(num, value){
    const EV = Number(document.getElementById(`${dispParmeter[num]}_EV`).value)
    const last = Number(document.getElementById(`EVlast`).textContent)

    switch ( value ) {
        case "▲":
            if ( EV == 252 || last < 4 ) break
            document.getElementById(`${dispParmeter[num]}_EV`).value = EV + 4
            document.getElementById(`EVlast`).textContent = last - 4
            break

        case "▼":
            if ( EV == 0 ) break
            document.getElementById(`${dispParmeter[num]}_EV`).value = EV - 4
            document.getElementById(`EVlast`).textContent = last + 4
            break
    }
}

function EVchangeStep(){
    let total = 0
    for ( const para of dispParmeter ) {
        total += Number(document.getElementById(`${para}_EV`).value)
    }
    document.getElementById(`EVlast`).textContent = 510 - total
}

function setNature(){
    let plus = 0
    let minus = 0
    for (let i = 1; i < 6; i++){
        if (document.getElementById("naturePlus" + i).checked){
            plus = i
        }
        if (document.getElementById("natureMinus" + i).checked){
            minus = i
        }
    }
    const nature_list = [
        ['てれや', 'さみしがり', 'いじっぱり', 'やんちゃ', 'ゆうかん'], 
        ['ずぶとい', 'がんばりや', 'わんぱく', 'のうてんき', 'のんき'], 
        ['ひかえめ', 'おっとり', 'すなお', 'うっかりや', 'れいせい'], 
        ['おだやか', 'おとなしい', 'しんちょう', 'きまぐれ', 'なまいき'], 
        ['おくびょう', 'せっかち', 'ようき', 'むじゃき', 'まじめ']
    ]
    $("#nature").text(nature_list[plus - 1][minus - 1])

}


// アイテムによって姿が変わるポケモン
function itemForm(){
    const poke = document.getElementById(`name`).value
    const item = document.getElementById(`item`).value

    switch ( poke ) {
        case "ザシアン(れきせんのゆうしゃ)":
            if ( item != "くちたけん" ) break
            document.getElementById(`name`).value = "ザシアン(けんのおう)"
            break

        case "ザシアン(けんのおう)":
            if ( item == "くちたけん" ) break
            document.getElementById(`name`).value = "ザシアン(れきせんのゆうしゃ)"
            break

        case "ザマゼンタ(れきせんのゆうしゃ)":
            if ( item != "くちたたて" ) break
            document.getElementById(`name`).value = "ザマゼンタ(たてのおう)"
            break

        case "ザマゼンタ(たてのおう)":
            if ( item == "くちたたて" ) break
            document.getElementById(`name`).value = "ザマゼンタ(れきせんのゆうしゃ)"
            break

        case "ギラティナ(アナザーフォルム)":
            if ( item != "はっきんだま" ) break
            document.getElementById(`name`).value = "ギラティナ(オリジンフォルム)"
            break

        case "ギラティナ(オリジンフォルム)":
            if ( item == "はっきんだま" ) break
            document.getElementById(`name`).value = "ギラティナ(アナザーフォルム)"
            break

        default:
            return
    }

    setID()
}

function setMove(num) {
    for ( const move of moveList ) {
        if ( document.getElementById(`move${num}`).value == move.name ) {
            document.getElementById(`type${num}`).textContent        = move.type
            document.getElementById(`power${num}`).textContent       = move.power
            document.getElementById(`accuracy${num}`).textContent    = move.accuracy
            document.getElementById(`PP${num}`).textContent          = move.PP
            document.getElementById(`discription${num}`).textContent = move.discription
        }
    }
}



function PPchange(num, value) {
    const name = document.getElementById(`move${num}`).value
    const PP = Number(document.getElementById(`PP${num}`).textContent)
    const move = moveSearchByName(name)
    const minPP = move.PP
    const maxPP = move.PP + ( move.PP / 5 ) * 3

    switch ( value ) {
        case "▲":
            if ( PP == maxPP ) break
            document.getElementById(`PP${num}`).textContent = PP + ( minPP / 5 )
            break
        case "▼":
            if ( PP == minPP ) break
            document.getElementById(`PP${num}`).textContent = PP - ( minPP / 5 )
            break
    }
}

// ポケモンの編集
function edit_pokemon(){
    const team = document.getElementById("edit").edit.value
    document.poke_name.poke_name.value = document.getElementById(team + "_name").textContent
    document.poke_ID.poke_LV.value = document.getElementById(team + "_level").textContent
    document.poke_ID.poke_item.value = document.getElementById(team + "_item").textContent
    for (let i = 0; i < 6; i++){
        document.input_value[parameter[i] + "_IV"].value = document.getElementById(team + "_" + parameter[i] + "_IV").textContent
        document.input_value[parameter[i] + "_EV"].value = document.getElementById(team + "_" + parameter[i] + "_EV").textContent
    }
    set_ID()

    for (let i = 0; i < 4; i++){
        document.four_moves["move" + String(i)].value = document.getElementById(team + "_move_" + i).textContent
        set_move(i)
    }

    // 性別、特性、性格は未実装
    //document.getElementById(team + "_gender").textContent = " " + document.getElementById("poke_name_id").gender.value + " "
    //document.getElementById(team + "_ability").textContent = ability.options[num].value
    //document.getElementById(team + "_nature").textContent = document.getElementById("nature").textContent
}

// パーティにセット
function setPokemon(){
    if (Number($("#EVlast").text()) < 0){
        alert("努力値振りすぎやで")
        return
    }
    if ($("#name").val() == ""){
        alert("ポケモン選択されてへんで")
        return
    }
    if ($("#move0").val() == ""){
        alert("技1が選択されてへんで")
        return
    }
    let move_check = 0
    for (let i = 0; i < 4; i++){
        if ($("#move" + i).val() == ""){
            move_check += 1
        }
    }
    if (move_check == 4){
        alert("技覚えてへんで")
        return
    }

    const para = ["H", "A", "B", "C", "D", "S"]
    const team = document.getElementById("team").team.value

    // アルセウス：プレートによるタイプ変更
    if ( document.getElementById(`${team}_ability`).textContent == "マルチタイプ" ) {
        for ( const plate of itemList_plate ) {
            if ( document.getElementById(`${team}_item`).textContent == plate.name ) {
                document.getElementById(`${team}_type`).textContent = plate.type
            }
        }
    }

    // シルヴァディ：メモリによるタイプ変更
    if ( document.getElementById(`${team}_ability`).textContent == "ARシステム" ) {
        for ( const memory of itemList_memory ) {
            if ( document.getElementById(`${team}_item`).textContent == memory.name ) {
                document.getElementById(`${team}_type`).textContent = memory.type
            }
        }
    }

    const party = new Party()
    // 基本情報
    party.myID        = Number(team)
    party.myParty     = "me"
    party.myName      = document.getElementById(`name`).value
    party.myGender    = document.getElementById(`${team}_gender`).textContent
    party.myLevel     = Number(document.getElementById(`lv`).value)
    party.myType      = document.getElementById(`type`).textContent.split("、")
    party.myNature    = document.getElementById(`nature`).textContent
    party.myAbility   = document.getElementById(`ability`).value
    party.myItem      = document.getElementById(`item`).value
    party.myAilment   = false
    // 技
    party.myMove_0    = document.getElementById(`move0`).value
    party.myRest_pp_0 = Number(document.getElementById(`PP0`).textContent)
    party.myFull_pp_0 = Number(document.getElementById(`PP0`).textContent)
    party.myMove_1    = document.getElementById(`move1`).value
    party.myRest_pp_1 = Number(document.getElementById(`PP1`).textContent)
    party.myFull_pp_1 = Number(document.getElementById(`PP1`).textContent)
    party.myMove_2    = document.getElementById(`move2`).value
    party.myRest_pp_2 = Number(document.getElementById(`PP2`).textContent)
    party.myFull_pp_2 = Number(document.getElementById(`PP2`).textContent)
    party.myMove_3    = document.getElementById(`move3`).value
    party.myRest_pp_3 = Number(document.getElementById(`PP3`).textContent)
    party.myFull_pp_3 = Number(document.getElementById(`PP3`).textContent)
    // 実数値
    party.myRest_hp   = Number(document.getElementById(`H_AV`).value)
    party.myFull_hp   = Number(document.getElementById(`H_AV`).value)
    party.myAtk       = Number(document.getElementById(`A_AV`).value)
    party.myDef       = Number(document.getElementById(`B_AV`).value)
    party.mySp_atk    = Number(document.getElementById(`C_AV`).value)
    party.mySp_def    = Number(document.getElementById(`D_AV`).value)
    party.mySpeed     = Number(document.getElementById(`S_AV`).value)
    // 個体値
    party.myHp_iv     = Number(document.getElementById(`H_IV`).value)
    party.myAtk_iv    = Number(document.getElementById(`A_IV`).value)
    party.myDef_iv    = Number(document.getElementById(`B_IV`).value)
    party.mySp_atk_iv = Number(document.getElementById(`C_IV`).value)
    party.mySp_def_iv = Number(document.getElementById(`D_IV`).value)
    party.mySpeed_iv  = Number(document.getElementById(`S_IV`).value)
    // 努力値
    party.myHp_ev     = Number(document.getElementById(`H_EV`).value)
    party.myAtk_ev    = Number(document.getElementById(`A_EV`).value)
    party.myDef_ev    = Number(document.getElementById(`B_EV`).value)
    party.mySp_atk_ev = Number(document.getElementById(`C_EV`).value)
    party.mySp_def_ev = Number(document.getElementById(`D_EV`).value)
    party.mySpeed_ev  = Number(document.getElementById(`S_EV`).value)
    // 元の情報
    party.myName_org    = document.getElementById(`name`).value
    party.myGender_org  = document.getElementById(`${team}_gender`).textContent
    party.myLevel_org   = Number(document.getElementById(`lv`).value)
    party.myType_org    = document.getElementById(`type`).textContent.split("、")
    party.myAbility_org = document.getElementById(`ability`).value
    party.myAtk_org     = Number(document.getElementById(`A_AV`).value)
    party.myDef_org     = Number(document.getElementById(`B_AV`).value)
    party.mySp_atk_org  = Number(document.getElementById(`C_AV`).value)
    party.mySp_def_org  = Number(document.getElementById(`D_AV`).value)
    party.mySpeed_org   = Number(document.getElementById(`S_AV`).value)
    // 手持ちの順番
    party.myHand = Number(team)
    // 技の処理に関係するクラス
    party.myCondition = new Condition()
    // ポケモン特有のもの
    if ( party.myAbility == "ばけのかわ" ) party.myDisguise = "ばけたすがた"
    if ( party.myAbility == "アイスフェイス" ) party.myIce_face = "アイスフェイス"
    // 手持ちにセット
    myParty[team] = party

    $("#" + team + "_name").text($("#name").val())
    $("#" + team + "_gender").text($('input:radio[name="gender"]:checked').val())
    $("#" + team + "_level").text($("#lv").val())
    $("#" + team + "_type").text($("#type").text())
    $("#" + team + "_ability").text($("#ability").val())
    $("#" + team + "_item").text($("#item").val())
    $("#" + team + "_full_HP").text($("#H_AV").val())
    $("#" + team + "_last_HP").text($("#H_AV").val())
    for (let i = 0; i < 6; i++){
        $("#" + team + "_" + para[i] + "_AV").text($("#" + para[i] + "_AV").val())
    }

    document.getElementById(`${team}_type`).innerHTML = ""
    for ( const type of party.myType ) {
        document.getElementById(`${team}_type`).innerHTML += "<font color='white'><span style='background-color:"+getColorCode(type)+"'>"+type+"</span></font>&nbsp;"
    }

    // ステータスの補正を示す色
    const rate = natureRate(party.myNature)
    for ( const key in rate ) {
        if ( rate[key] == 1.1 ) document.getElementById(`${team}_${key}`).color = "red"
        if ( rate[key] == 0.9 ) document.getElementById(`${team}_${key}`).color = "blue"
    }

    // 技の記入
    for ( let i = 0; i < 4; i++ ) {
        if ( !party[`myMove_${i}`] ) continue
        document.getElementById(`${team}_move_${i}`).textContent            = party[`myMove_${i}`]
        document.getElementById(`${team}_PP_${i}`).textContent              = party[`myFull_pp_${i}`]
        document.getElementById(`${team}_last_${i}`).textContent            = party[`myRest_pp_${i}`]
        document.getElementById(`${team}_move_${i}_color`).style.background = getColorCode(moveSearchByName(party[`myMove_${i}`]).type)
    }

    // 6匹揃ったらTN入力画面を表示
    for ( let i = 0; i < 6; i++ ) {
        if ( document.getElementById(`${i}_name`) == "" ) return
    }
    document.getElementById('trainer_name').style.display = "block"
}


// パーティ全てランダムセット
function setAll(){
    for(let i = 0; i < 6; i++){
        setRandom()
        document.getElementById("team" + i).checked = true
        setPokemon()
    }
}









// 現在の状態を画面に表示
function showNowCondition() {
    for ( const poke of myParty ) {
        const num = poke.myBench
        // 基本情報
        document.getElementById(`${num}_name`).textContent = poke.myName
        document.getElementById(`${num}_ability`).textContent = poke.myAbility
        document.getElementById(`${num}_item`).textContent = poke.myItem
        // 実数値
        document.getElementById(`${num}_full_HP`).textContent = poke.myFull_hp
        document.getElementById(`${num}_last_HP`).textContent = poke.myRest_hp
        document.getElementById(`${num}_A_AV`).textContent = poke.myAtk
        document.getElementById(`${num}_B_AV`).textContent = poke.myDef
        document.getElementById(`${num}_C_AV`).textContent = poke.mySp_atk
        document.getElementById(`${num}_D_AV`).textContent = poke.mySp_def
        document.getElementById(`${num}_S_AV`).textContent = poke.mySpeed
        // バトル場のHP
        if ( poke.myPosition != null ) {
            document.getElementById(`rest_hp_${poke.myPosition}`).textContent = poke.myRest_hp
            document.getElementById(`full_hp_${poke.myPosition}`).textContent = poke.myFull_hp
        }
        // HPが０なら赤字
        if ( poke.myRest_hp == 0 ) {
            document.getElementById(`${num}_HP_color`).color = "red"
        }
        // タイプ
        document.getElementById(`${num}_type`).innerHTML = ""
        for ( const type of poke.myType ) {
            document.getElementById(`${num}_type`).innerHTML += "<font color='white'><span style='background-color:"+getColorCode(type)+"'>"+type+"</span></font>&nbsp;"
        }
        // 技
        for (let i = 0; i < 4; i++ ) {
            if ( !poke[`myMove_${i}`] ) continue
            document.getElementById(`${num}_move_${i}`).textContent            = poke[`myMove_${i}`]
            document.getElementById(`${num}_PP_${i}`).textContent              = poke[`myFull_pp_${i}`]
            document.getElementById(`${num}_last_${i}`).textContent            = poke[`myRest_pp_${i}`]
            document.getElementById(`${num}_move_${i}_color`).style.background = getColorCode(moveSearchByName(poke[`myMove_${i}`]).type)
        }

    }
}

//
function checkCondition(position) {
    const poke = getPokeToCheck(position)
    if ( !poke ) return

    let text = ""

    // ランク変化
    text += `攻撃：${poke.myRank_atk}\n`
    text += `防御：${poke.myRank_def}\n`
    text += `特攻：${poke.myRank_sp_atk}\n`
    text += `特防：${poke.myRank_sp_def}\n`
    text += `素早さ：${poke.myRank_speed}\n`
    text += `回避率：${poke.myRank_evasion}\n`
    text += `命中率：${poke.myRank_accuracy}\n`
    text += `\n`

    // ポケモンの状態
    const condition = poke.myCondition
    if ( condition.myAqua_ring )         text += `アクアリング\n`
    if ( condition.myAtrract ) {}
    if ( condition.myAutotomize )        text += `ボディパージ：${condition.myAutotomize}回\n`
    if ( condition.myBind.turn )         text += `バインド ${condition.myBind.turn}ターン目\n`
    if ( condition.myCant_escape )       text += `逃げられない\n`
    if ( condition.myCant_move )         text += `反動で動けない\n`
    if ( condition.myCharge == 2 )       text += `じゅうでん\n`
    if ( condition.myChi_strike )        text += `キョダイシンゲキ：${condition.myChi_strike}回\n`
    if ( condition.myConfusion )         text += `こんらん：${condition.myConfusion}ターン目\n`
    if ( condition.myCritical )          text += `きゅうしょアップ\n`
    if ( condition.myDefense_curl )      text += `まるくなる\n`
    if ( condition.myDisable.turn )      text += `かなしばり：残り${condition.myDisable.turn}ターン\n`
    if ( condition.myEmbargo )           text += `さしおさえ：残り${condition.myEmbargo}ターン\n`
    if ( condition.myEncore.turn )       text += `アンコール：残り${condition.myEncore.turn}ターン\n`
    if ( condition.muFlush_fire )        text += `もらいび\n`
    if ( condition.myForesight )         text += `みやぶられている\n`
    if ( condition.myHeal_block )        text += `回復封じ：${condition.myHeal_block}ターン目\n`
    if ( condition.myIngrain )           text += `ねをはる\n`
    if ( condition.myLaser_focus == 2 )  text += `とぎすます\n`
    if ( condition.myLock_on == 2 )      text += `ロックオン\n`
    if ( condition.myMagnet_rise )       text += `でんじふゆう：${condition.myMagnet_rise}ターン目\n`
    if ( condition.myMicle )             text += `ミクルのみ\n`
    if ( condition.myMinimize )          text += `ちいさくなる\n`
    if ( condition.myMiracle_eye )       text += `ミラクルアイ\n`
    if ( condition.myNo_ability )        text += `特性なし\n`
    if ( condition.myPerish_song )       text += `ほろびカウント：${condition.myPerish_song}\n`
    if ( condition.myStockpile )         text += `たくわえる：${condition.myStockpile}回\n`
    if ( condition.myTaunt )             text += `ちょうはつ：${condition.myTaunt}ターン目\n`
    if ( condition.myTelekinesis )       text += `テレキネシス：${condition.myTelekinesis}ターン目\n`
    if ( condition.myThroat_chop )       text += `じごくづき：${condition.myThroat_chop}ターン目\n`

    // フィールドの状態
    const field = ( poke.myParty == "me" )? myField : oppField
    // 壁
    if ( field.myAurora_veil ) {
        let turn = 5
        if ( poke.myParty == "me" && field.myAurora_clay ) turn = 8
        if ( poke.myParty == "opp" && field.myAurora_veil > 5 ) turn = 8
        const rest = turn - field.myAurora_veil + 1
        text += `オーロラベール　${rest}/${turn}\n`
    }
    if ( field.myLight_screen ) {
        let turn = 5
        if ( poke.myParty == "me" && field.myLight_clay ) turn = 8
        if ( poke.myParty == "opp" && field.myLight_screen > 5 ) turn = 8
        const rest = turn - field.myLight_screen + 1
        text += `ひかりのかべ ${rest}/${turn}\n`
    }
    if ( field.myReflect ) {
        let turn = 5
        if ( poke.myParty == "me" && field.myReflect_clay ) turn = 8
        if ( poke.myParty == "opp" && field.myReflect > 5 ) turn = 8
        const rest = turn - field.myReflect + 1
        text += `リフレクター ${rest}/${turn}\n`
    }
    // 設置技
    if ( field.mySpikes )       text += `まきびし +${field.mySpikes}\n`
    if ( field.myToxic_spikes ) text += `どくびし +${field.myToxic_spikes}\n`
    if ( field.myStealth_rock ) text += `ステルスロック\n`
    if ( field.mySticky_web )   text += `ねばねばネット\n`
    if ( field.mySteelsurge )   text += `キョダイコウジン\n`
    // 合体技
    if ( field.myFire_ocean ) text += `ひのうみ ${4-field.myFire_ocean}/4\n`
    if ( field.myRainbow )    text += `にじ ${4-field.myRainbow}/4\n`
    if ( field.myWetland )    text += `しつげん ${4-field.myWetland}/4\n`
    // キョダイマックス技
    if ( field.myVine_lash ) text += `キョダイベンタツ ${4-field.myVine_lash}/4\n`
    if ( field.myWildfire )  text += `キョダイゴクエン ${4-field.myWildfire}/4\n`
    if ( field.myCannonade ) text += `キョダイホウゲキ ${4-field.myCannonade}/4\n`
    if ( field.myVolcalith ) text += `キョダイフンセキ ${4-field.myVolcalith}/4\n`
    // その他
    if ( field.myLucky_chant ) text += `おまじない ${5-field.myLucky_chant}/5\n`
    if ( field.myMist )        text += `しろいきり ${5-field.myMist}/5\n`
    if ( field.mySafeguard )   text += `しんぴのまもり ${5-field.mySafeguard}/5\n`
    if ( field.myTailwind )    text += `おいかぜ ${4-field.myTailwind}/4\n`

    // 全体の場の状態
    // 天候
    if ( fieldStatus.myDrought )    text += `おおひでり\n`
    if ( fieldStatus.myHeavy_rain ) text += `おおあめ\n`
    if ( fieldStatus.myTurbulence ) text += `らんきりゅう\n`
    const weather = [
        {en: "Graupel",   ja: "あられ"}, 
        {en: "Sandstorm", ja: "すなあらし"}, 
        {en: "Sunny",     ja: "にほんばれ"}, 
        {en: "Rainy",     ja: "あめ"}
    ]
    for ( const w of weather ) {
        if ( fieldStatus[`my${w.en}`] ) {
            const turn = ( myField.myWeather_long || fieldStatus[`my${w.en}`] > 5 )? 8 : 5
            const rest = turn - fieldStatus[`my${w.en}`] + 1
            text += `${w.ja} ${rest}/${turn}\n`
        }
    }
    // フィールド
    const terrain = [
        {en: "Electric", ja: "エレキ"}, 
        {en: "Grassy",   ja: "グラス"}, 
        {en: "Misty",    ja: "ミスト"}, 
        {en: "Psychic",  ja: "サイコ"}
    ]
    for ( const t of terrain ) {
        if ( fieldStatus[`my${t.en}`] ) {
            const turn = ( myField.myExtender || fieldStatus[`my${t.en}`] > 5 )? 8 : 5
            const rest = turn - fieldStatus[`my${t.en}`] + 1
            text += `${t.ja}フィールド ${rest}/${turn}\n`
        }
    }
    // その他
    if ( fieldStatus.myEchoed_voice ) text += `エコーボイス +${fieldStatus.myEchoed_voice}\n`
    if ( fieldStatus.myGravity )      text += `じゅうりょく ${5-fieldStatus.myGravity}/5\n`
    if ( fieldStatus.myMud_sport )    text += `どろあそび ${5-fieldStatus.myMud_sport}/5\n`
    if ( fieldStatus.myWater_sport )  text += `みずあそび ${5-fieldStatus.myWater_sport}/5\n`
    if ( fieldStatus.myMagic_room )   text += `マジックルーム\n`
    if ( fieldStatus.myTrick_room )   text += `トリックルーム ${5-fieldStatus.myTrick_room}/5\n`
    if ( fieldStatus.myWonder_room )  text += `ワンダールーム ${fieldStatus.myWonder_room}/5\n`

    alert(text)
}

function getPokeToCheck(position) {
    const party = ( position <= 1 )? myParty : oppParty
    for ( const poke of party ) {
        if ( poke.myPosition == position || poke.myPosition == position - 2 ) {
            return poke
        }
    }

    return false
}