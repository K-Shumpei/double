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
    const parameter = ["H", "A", "B", "C", "D", "S"]

    for ( const para of parameter ) {
        const BS = document.getElementById(`${para}_BS`).textContent
        const IV = document.getElementById(`${para}_IV`).value
        const EV = document.getElementById(`${para}_EV`).value
        let AV = Math.floor((( Number(BS)*2 + Number(IV) + Math.floor( Number(EV) / 4 )) * lv ) / 100 )

        switch ( para ) {
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

        document.getElementById(`${para}_AV`).value = AV
    }
}

function setLV(value) {
    document.getElementById(`lv`).value = value
}


function canUse(){
    $("#move").html("")
    for (let i = 0; i < can_use_move.length; i++){
        if ($("#name").val() == can_use_move[i][1]){
            for (const move of can_use_move[i][2]){
                $("<option>", {
                    text: move
                }).appendTo('#move')
            }
        }
    }
}


function setRandom(){
    let data = [1, "フシギダネ"]
    while (pokeList_eviolite.includes(data[1])){
        let random = Math.random()
        for (let i = 0; i < basePokemon.length; i++){
            if (random > i / basePokemon.length){
                data = basePokemon[i]
            }
        }
    }
    $("#name").val(data[1])
    setID()
    // 持ち物の設定
    random = Math.random()
    for (let i = 0; i < random_item_list.length; i++){
        if (random > i / random_item_list.length){
            $("#item").val(random_item_list[i])
        }
    }

    // 技が4つ未満のポケモン
    if ($("#name").val() == "メタモン"){
        $("#move0").val("へんしん")
        setMove(0)
    } else if ($("#name").val() == "ドーブル"){
        let num = ["", "", "", ""]
        while (num[0] == num[1] || num[0] == num[2] || num[0] == num[3] || num[1] == num[2] || num[1] == num[3] || num[2] == num[3]){
            for (let i = 0; i < 4; i++){
                num[i] = Math.floor(Math.random() * base_move_list.length)
            }
        }
        for (let i = 0; i < 4; i++){
            $("#move" + i).val(base_move_list[num[i]][0])
            if (base_move_list[num[i]][0] == "めざめるパワー"){
                $("#move" + i).val(base_move_list[num[i] - 1][0])
            }
            setMove(i)
        }
    } else if ($("#name").val() == "アンノーン"){
        $("#move0").val("めざめるパワー")
        setMove(0)
    } else if ($("#name").val() == "コスモッグ"){
        $("#move0").val("はねる")
        setMove(0)
        $("#move1").val("テレポート")
        setMove(1)
    } else if ($("#name").val() == "コスモウム"){
        $("#move0").val("はねる")
        setMove(0)
        $("#move1").val("テレポート")
        setMove(1)
        $("#move2").val("コスモパワー")
        setMove(2)
    } else {
        let list = ""
        for (let i = 0; i < can_use_move.length; i++){
            if ($("#name").val() == can_use_move[i][1]){
                list = can_use_move[i][2]
            }
        }
        let num = ["", "", "", ""]
        while (num[0] == num[1] || num[0] == num[2] || num[0] == num[3] || num[1] == num[2] || num[1] == num[3] || num[2] == num[3]){
            for (let i = 0; i < 4; i++){
                num[i] = Math.floor(Math.random() * list.length)
            }
        }
        for (let i = 0; i < 4; i++){
            $("#move" + i).val(list[num[i]])
            if (list[num[i]] == "めざめるパワー"){
                $("#move" + i).val(list[num[i] - 1])
            }
            setMove(i)
        }
    }
}

function setReset(){
    $("#name").val("")
    $("#type").text("")
    for (const sex of ["male", "female", "not"]){
        $("#" + sex).prop("disabled", false)
        $("#" + sex).prop("checked", false)
    }
    $("#lv").val("50")
    $("#ability").html("")
    $("#item").val("")
    for (const para of ["H", "A", "B", "C", "D", "S"]){
        $("#" + para + "_BS").text("100")
        $("#" + para + "_IV").val("31")
        $("#" + para + "_EV").val("0")
    }
    $("#EVlast").text("510")
    $("#naturePlus1").prop("checked", true)
    $("#natureMinus1").prop("checked", true)
    $("#nature").text("てれや")
    moveReset()
    AVcalc()
}



function setIV(num, value){
    const parameter = ["H_IV", "A_IV", "B_IV", "C_IV", "D_IV", "S_IV"]
    $("#" + parameter[num]).val(value)
}

function setEV(num, value){
    const parameter = ["H_EV", "A_EV", "B_EV", "C_EV", "D_EV", "S_EV"]
    const EV = Number($("#" + parameter[num]).val())
    const last = Number($("#EVlast").text())
    if (last + EV - value >= 0){
        $("#" + parameter[num]).val(value)
        $("#EVlast").text(last + EV - value)
    }
}

function EVchange(num, value){
    const para = ["H", "A", "B", "C", "D", "S"]
    const EV = Number($("#" + para[num] + "_EV").val())
    const last = Number($("#EVlast").text())
    if (value == "▲"){
        if (EV != 252 && last >= 4){
            $("#" + para[num] + "_EV").val(EV + 4)
            $("#EVlast").text(last - 4)
        }
    } else if (value == "▼"){
        if (EV != 0){
            $("#" + para[num] + "_EV").val(EV - 4)
            $("#EVlast").text(last + 4)
        }
    }
}

function EVchangeStep(){
    const parameter = ["H_EV", "A_EV", "B_EV", "C_EV", "D_EV", "S_EV"]
    let total = 0
    for (const i of parameter){
        total += Number($("#" + i).val())
    }
    $("#EVlast").text(510 - total)
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
function itemForm(item){
    const poke = $("#name").val()
    if (item == "くちたけん" && poke == "ザシアン(れきせんのゆうしゃ)"){
        $("#name").val("ザシアン(けんのおう)")
    } else if (item != "くちたけん" && poke == "ザシアン(けんのおう)"){
        $("#name").val("ザシアン(れきせんのゆうしゃ)")
    } else if (item == "くちたたて" && poke == "ザマゼンタ(れきせんのゆうしゃ)"){
        $("#name").val("ザマゼンタ(たてのおう)")
    } else if (item != "くちたたて" && poke == "ザマゼンタ(たてのおう)"){
        $("#name").val("ザマゼンタ(れきせんのゆうしゃ)")
    } else if (item == "はっきんだま" && poke == "ギラティナ(アナザーフォルム)"){
        $("#name").val("ギラティナ(オリジンフォルム)")
    } else if (item != "はっきんだま" && poke == "ギラティナ(オリジンフォルム)"){
        $("#name").val("ギラティナ(アナザーフォルム)")
    }
    setID()
}

function setMove(num){
    for (i = 0; i < base_move_list.length; i++){
        if ($("#move" + num).val() == base_move_list[i][0]){
            $("#type" + num).text(base_move_list[i][1])
            $("#power" + num).text(base_move_list[i][3])
            $("#accuracy" + num).text(base_move_list[i][4])
            $("#PP" + num).text(base_move_list[i][5])
            $("#discription" + num).text(base_move_list[i][9])
        }
    }
}



function PPchange(num, value){
    const name = $("#move" + num).val()
    const PP = Number($("#PP" + num).text())
    for (i = 0; i < base_move_list.length; i++){
        if (name == base_move_list[i][0]){
            const min = base_move_list[i][5]
            const max = min + (min / 5) * 3
            if (value == "▲"){
                if (PP != max){
                    $("#PP" + num).text(PP + (min / 5))
                }
            } else if (value == "▼"){
                if (PP != min){
                    $("#PP" + num).text(PP - (min / 5))
                }
            }
        }
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
    //document.getElementById(team + "_sex").textContent = " " + document.getElementById("poke_name_id").sex.value + " "
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
    party.myGender    = $("#" + team + "_sex").text()
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
    // 手持ちにセット
    myParty[team] = party

    $("#" + team + "_name").text($("#name").val())
    $("#" + team + "_sex").text($('input:radio[name="sex"]:checked').val())
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

function selectPoke(){
    for (let i = 0; i < 6; i++){
        if (document.getElementById("first" + i).checked){
            document.getElementById("second" + i).disabled = true
            document.getElementById("third" + i).disabled = true
        } else if (document.getElementById("second" + i).checked){
            document.getElementById("first" + i).disabled = true
            document.getElementById("third" + i).disabled = true
        } else if (document.getElementById("third" + i).checked){
            document.getElementById("second" + i).disabled = true
            document.getElementById("first" + i).disabled = true
        } else {
            document.getElementById("first" + i).disabled = false
            document.getElementById("second" + i).disabled = false
            document.getElementById("third" + i).disabled = false
        }
    }
}


// Z技ボタンの有効化
function Zable(){
    if (document.getElementById("A_Z_text").textContent == "Z技"){
        for (let i = 0; i < Zlist.length; i++){
            if (Zlist[i][2] == document.getElementById("A_item").textContent){
                for (let j = 0; j < 4; j++){
                    if (moveSearchByName(document.getElementById("A_move_" + j).textContent)[1] == Zlist[i][0]){
                        return  false
                    }
                }
            }
        }
        for (let i = 0; i < spZlist.length; i++){
            if (spZlist[i][2] == document.getElementById("A_item").textContent){
                for (let j = 0; j < 4; j++){
                    if (document.getElementById("A_move_" + j).textContent == spZlist[i][3] && document.getElementById("A_name").textContent == spZlist[i][0]){
                        return false
                    }
                }
            }
        }
        return true
    } else {
        return true
    }
}
// キョダイマックスボタンの有効化
function gigable(){
    if (document.getElementById("A_giga_text").textContent == "キョダイマックス"){
        for (let i = 0; i < gigalist.length; i++){
            if (document.getElementById("A_name").textContent == gigalist[i][0]){
                return false
            }
        }
        return true
    } else {
        return true
    }
}
// ダイマックスボタンの有効化
function dynable(){
    if (document.getElementById("A_dyna_text").textContent == "ダイマックス"){
        return false
    } else {
        return true
    }
}


function Z_move(){
    if (document.getElementById("A_Z").checked){
        document.getElementById("A_dyna").disabled = true
        document.getElementById("A_giga").disabled = true
        // 普通のZクリスタルの場合
        let Zmove = ""
        for (let i = 0; i < Zlist.length; i++){
            if (document.getElementById("A_item").textContent == Zlist[i][2]){
                Zmove = Zlist[i]
            }
        }
        if (Zmove != ""){
            for (let i = 0; i < 4; i++){
                let move = ""
                for (let j = 0; j < base_move_list.length; j++){
                    if (base_move_list[j][0] == document.getElementById("A_move_" + i).textContent){
                        move = base_move_list[j]
                    }
                }
                if (move != "" && move[1] == Zmove[0] && move[2] != "変化"){
                    document.getElementById("A_move_" + i).textContent = Zmove[1]
                    document.getElementById("radio_" + i).disabled = false
                } else if (move != "" && move[1] == Zmove[0] && move[2] == "変化"){
                    document.getElementById("A_move_" + i).textContent = "Z" + move[0]
                    document.getElementById("radio_" + i).disabled = false
                } else {
                    document.getElementById("radio_" + i).disabled = true
                }
            }
        }
        // 専用Zクリスタルの場合
        let spZmove = ""
        for (let i = 0; i < spZlist.length; i++){
            if (document.getElementById("A_item").textContent == spZlist[i][2] && document.getElementById("A_name").textContent == spZlist[i][0]){
                spZmove = spZlist[i]
            }
        }
        if (spZmove != ""){
            for (let i = 0; i < 4; i++){
                if (spZmove != "" && document.getElementById("A_move_" + i).textContent == spZmove[3]){
                    document.getElementById("A_move_" + i).textContent = spZmove[1]
                    document.getElementById("radio_" + i).disabled = false
                } else {
                    document.getElementById("radio_" + i).disabled = true
                }
            }
        }
    } else {
        document.getElementById("A_dyna").disabled = dynable()
        document.getElementById("A_giga").disabled = gigable()
        let poke_num = ""
        for (let i = 0; i < 3; i++){
            if (document.getElementById(i + "_life").textContent == "戦闘中"){
                poke_num = i
            }
        }
        for (let i = 0; i < 4; i++){
            document.getElementById("A_move_" + i).textContent = document.getElementById(poke_num + "_move_" + i).textContent
        }
        buttonInvalidation()
    }
}

function gigadyna(){
    if (document.getElementById("A_giga").checked){
        document.getElementById("A_Z").disabled = true
        document.getElementById("A_dyna").disabled = true
        buttonValidation()
        change_giga_move()
    } else {
        document.getElementById("A_Z").disabled = Zable()
        document.getElementById("A_dyna").disabled = dynable()
        let poke_num = ""
        for (let i = 0; i < 3; i++){
            if (document.getElementById(i + "_life").textContent == "戦闘中"){
                poke_num = i
            }
        }
        for (let i = 0; i < 4; i++){
            document.getElementById("A_move_" + i).textContent = document.getElementById(poke_num + "_move_" + i).textContent
        }
        buttonInvalidation()
    }
}

function dynamax(){
    if (document.getElementById("A_dyna").checked){
        document.getElementById("A_Z").disabled = true
        document.getElementById("A_giga").disabled = true
        buttonValidation()
        change_dyna_move()
    } else {
        document.getElementById("A_Z").disabled = Zable()
        document.getElementById("A_giga").disabled = gigable()
        let poke_num = ""
        for (let i = 0; i < 3; i++){
            if (document.getElementById(i + "_life").textContent == "戦闘中"){
                poke_num = i
            }
        }
        for (let i = 0; i < 4; i++){
            document.getElementById("A_move_" + i).textContent = document.getElementById(poke_num + "_move_" + i).textContent
        }
        buttonInvalidation()
    }
}

function buttonValidation(){
    for (let i = 0; i < 4; i++){
        document.getElementById("radio_" + i).disabled = false
    }
    // ダイマックスするとき
    if (document.getElementById("A_dyna").checked || document.getElementById("A_giga").checked){
        // ダイマックス中に技を制限するものは「ちょうはつ」のみ
        if (document.battle.A_p_con.value.includes("ちょうはつ")){
            for (let i = 0; i < 4; i++){
                if (moveSearchByName(document.getElementById("A_move_" + i).textContent)[2] == "変化"){
                    document.getElementById("radio_" + i).disabled = true
                }
            }
        }
    }
}

function buttonInvalidation(){
    // まず全部有効にする
    for (let i = 0; i < 4; i++){
        document.getElementById("radio_" + i).disabled = false
    }
    // ほおばる：きのみを持っている場合、技選択が可能になる
    for (let i = 0; i < 4; i++){
        if (document.getElementById("A_move_" + i).textContent == "ほおばる" && !berry_item_list.includes(document.getElementById(battle_num() + "_item").textContent)){
            document.getElementById("radio_" + i).disabled = true
        }
    }
    // ゲップ：備考欄に「ゲップ」の文字があれば使用可能になる
    for (let i = 0; i < 4; i++){
        if (document.getElementById("A_move_" + i).textContent == "ゲップ" && !document.getElementById(battle_num() + "_belch").textContent == "ゲップ"){
            document.getElementById("radio_" + i).disabled = true
        }
    }
    // いちゃもん
    if (document.battle.A_p_con.value.includes("いちゃもん")){
        for (let i = 0; i < 4; i++){
            if (document.getElementById("A_move_" + i).textContent == document.battle.A_used.value){
                document.getElementById("radio_" + i).disabled = true
            }
        }
    }
    // アンコール
    for (let i = 0; i < document.battle.A_p_con.value.split("\n").length - 1; i++){
        if (document.battle.A_p_con.value.split("\n")[i].includes("アンコール")){
            for (let j = 0; j < 4; j++){
                if (document.getElementById("A_move_" + j).textContent != document.battle.A_p_con.value.split("\n")[i].slice(10)){
                    document.getElementById("radio_" + j).disabled = true
                }
            }
        }
    }
    // かなしばり
    for (let i = 0; i < document.battle.A_p_con.value.split("\n").length - 1; i++){
        if (document.battle.A_p_con.value.split("\n")[i].includes("かなしばり")){
            for (let j = 0; j < 4; j++){
                if (document.getElementById("A_move_" + j).textContent == document.battle.A_p_con.value.split("\n")[i].slice(10)){
                    document.getElementById("radio_" + j).disabled = true
                }
            }
        }
    }
    // ちょうはつ
    if (document.battle.A_p_con.value.includes("ちょうはつ")){
        for (let i = 0; i < 4; i++){
            if (moveSearchByName(document.getElementById("A_move_" + i).textContent)[2] == "変化"){
                document.getElementById("radio_" + i).disabled = true
            }
        }
    }
    // こだわりロック
    for (let i = 0; i < document.battle.A_p_con.value.split("\n").length - 1; i++){
        if (document.battle.A_p_con.value.split("\n")[i].includes("こだわりロック")){
            for (let j = 0; j < 4; j++){
                if (document.getElementById("A_move_" + j).textContent != document.battle.A_p_con.value.split("\n")[i].slice(8)){
                    document.getElementById("radio_" + j).disabled = true
                }
            }
        }
    }
}

function change_dyna_move(){
    for (let i = 0; i < 4; i++){
        let move = moveSearchByName(document.getElementById("A_move_" + i).textContent)
        if (move[2] == "変化"){
            document.getElementById("A_move_" + i).textContent = "ダイウォール"
        } else {
            for (let j = 0; j < dynalist.length; j++){
                if (move[1] == dynalist[j][0]){
                    document.getElementById("A_move_" + i).textContent = dynalist[j][1]
                }
            }
        }
    }
}


function change_giga_move(){
    for (let i = 0; i < 4; i++){
        let move = moveSearchByName(document.getElementById("A_move_" + i).textContent)
        if (move[2] == "変化"){
            document.getElementById("A_move_" + i).textContent = "ダイウォール"
        } else {
            for (let j = 0; j < dynalist.length; j++){
                if (move[1] == dynalist[j][0]){
                    document.getElementById("A_move_" + i).textContent = dynalist[j][1]
                }
            }
            for (let j = 0; j < gigalist.length; j++){
                if (move[1] == gigalist[j][2] && document.getElementById("A_name").textContent == gigalist[j][0]){
                    document.getElementById("A_move_" + i).textContent = gigalist[j][1]
                }
            }
        }
    }
}










// コマンド欄の解放
function showCommand() {
    for ( let i = 0; i < 2; i++ ) {
        for ( const poke of myParty ) {
            if ( poke.myPosition === i ) {
                // 選択中のポケモン名を表示
                document.getElementById(`com_log_${poke.myPosition}`).style.display = "block"
                document.getElementById(`com_log_name_${poke.myPosition}`).textContent = `${poke.myName}は `
                // 「攻撃」か「交代」のボタン　を見せる
                document.getElementById(`choise_${poke.myPosition}`).style.display = "block"
                // 戻るボタンを見せる
                document.getElementById(`back_command`).style.display = "block"
                
                return
            }
        }
    }
}

// 「攻撃」を選んだ時
function choiseMove(position){
    // 「攻撃」か「交代」のボタン　を隠す
    document.getElementById(`choise_${position}`).style.display = "none"

    for ( const poke of myParty ) {
        if ( poke.myPosition === position ) {
            // 技を見せる
            for ( let i = 0; i < 4; i++ ) {
                if ( poke[`myMove_${i}`] != null ) {
                    document.getElementById(`com_move_${poke.myPosition}${i}`).style.display = "block"
                    document.getElementById(`com_pp_${poke.myPosition}${i}`).style.display = "block"
                    document.getElementById(`com_move_${poke.myPosition}${i}`).style.background = getColorCode(moveSearchByName(poke[`myMove_${i}`]).type)
                    document.getElementById(`com_pp_${poke.myPosition}${i}`).style.background = getColorCode(moveSearchByName(poke[`myMove_${i}`]).type)
                    document.getElementById(`move_${poke.myPosition}${i}`).textContent = poke[`myMove_${i}`]
                    document.getElementById(`rest_pp_${poke.myPosition}${i}`).textContent = poke[`myRest_pp_${i}`]
                    document.getElementById(`full_pp_${poke.myPosition}${i}`).textContent = poke[`myFull_pp_${i}`]
                }
            }
        }
    }
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

    switch ( moveTarget ) {
        case "1体選択":
            // 技を隠す
            for ( let i = 0; i < 4 ;i++ ) {
                document.getElementById(`com_move_${position}${i}`).style.display = "none"
                document.getElementById(`com_pp_${position}${i}`).style.display = "none"
                document.getElementById(`move_${position}${i}`).textContent = ""
                document.getElementById(`rest_pp_${position}${i}`).textContent = ""
                document.getElementById(`full_pp_${position}${i}`).textContent = ""
            }
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
        case "自分以外":
        case "味方の場":
        case "相手の場":
        case "全体の場":
            document.getElementById(`com_log_tgt_${position}`).textContent = `${move.target}に `
            // 技を隠す
            for ( let i = 0; i < 4 ;i++ ) {
                document.getElementById(`com_move_${position}${i}`).style.display = "none"
                document.getElementById(`com_pp_${position}${i}`).style.display = "none"
                document.getElementById(`move_${position}${i}`).textContent = ""
                document.getElementById(`rest_pp_${position}${i}`).textContent = ""
                document.getElementById(`full_pp_${position}${i}`).textContent = ""
            }
            decideAction(position)
            break

        case "ランダム1体":
            document.getElementById(`com_log_tgt_${position}`).textContent = `ランダムな相手に `
            // 技を隠す
            for ( let i = 0; i < 4 ;i++ ) {
                document.getElementById(`com_move_${position}${i}`).style.display = "none"
                document.getElementById(`com_pp_${position}${i}`).style.display = "none"
                document.getElementById(`move_${position}${i}`).textContent = ""
                document.getElementById(`rest_pp_${position}${i}`).textContent = ""
                document.getElementById(`full_pp_${position}${i}`).textContent = ""
            }
            decideAction(position)
            break
    }
}

// 「交代」を選んだ時
function choiseHand(position){
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

    for ( let i = 0; i < 2; i++ ) {
        // 「攻撃」か「交代」のボタン　を隠す
        document.getElementById(`choise_${i}`).style.display = "none"
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
            const radio_move = document.querySelectorAll(`input[name=move${i}]`)
            for ( const element of radio_move ) element.checked = false
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
    if ( condition.myAqua_ring )          text += `アクアリング\n`
    if ( condition.myAtrract ) {}
    if ( condition.myAutotomize )         text += `ボディパージ：${condition.myAutotomize}回\n`
    if ( condition.myBind_turn )          text += `バインド ${condition.myBind_turn}ターン目\n`
    if ( condition.myCant_escape )        text += `逃げられない\n`
    if ( condition.myCant_move )          text += `反動で動けない\n`
    if ( condition.myCharge == 2 )        text += `じゅうでん\n`
    if ( condition.myChi_strike )         text += `キョダイシンゲキ：${condition.myChi_strike}回\n`
    if ( condition.myConfusion )          text += `こんらん：${condition.myConfusion}ターン目\n`
    if ( condition.myCritical )           text += `きゅうしょアップ\n`
    if ( condition.myDefense_curl )       text += `まるくなる\n`
    if ( condition.myDisable_turn )       text += `かなしばり：残り${condition.myDisable_turn}ターン\n`
    if ( condition.myEmbargo )            text += `さしおさえ：残り${condition.myEmbargo}ターン\n`
    if ( condition.myEncore_turn )        text += `アンコール：残り${condition.myEncore_turn}ターン\n`
    if ( condition.muFlush_fire )         text += `もらいび\n`
    if ( condition.myForesight )          text += `みやぶられている\n`
    if ( condition.myHeal_block )         text += `回復封じ：${condition.myHeal_block}ターン目\n`
    if ( condition.myIngrain )            text += `ねをはる\n`
    if ( condition.myLaser_focus == 2  )  text += `とぎすます\n`
    if ( condition.myLock_on == 2 )       text += `ロックオン\n`
    if ( condition.myMagnet_rise )        text += `でんじふゆう：${condition.myMagnet_rise}ターン目\n`
    if ( condition.myMicle )              text += `ミクルのみ\n`
    if ( condition.myMinimize )           text += `ちいさくなる\n`
    if ( condition.myMiracle_eye )        text += `ミラクルアイ\n`
    if ( condition.myNo_ability )         text += `特性なし\n`
    if ( condition.myPerish_song )        text += `ほろびカウント：${condition.myPerish_song}\n`
    if ( condition.myStockpile )          text += `たくわえる：${condition.myStockpile}回\n`
    if ( condition.myTaunt )              text += `ちょうはつ：${condition.myTaunt}ターン目\n`
    if ( condition.myTelekinesis )        text += `テレキネシス：${condition.myTelekinesis}ターン目\n`
    if ( condition.myThroat_chop )        text += `じごくづき：${condition.myThroat_chop}ターン目\n`

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