// 技のリセット
function moveReset(){
    for (i = 0; i < 4; i++){
        $("#move" + i).val("")
        $("#type" + i).text("")
        $("#power" + i).text("")
        $("#accuracy" + i).text("")
        $("#PP" + i).text("")
        $("#discription" + i).text("")
    }
}

function setID(){
    moveReset()
    const name = document.getElementById("name").value
    let poke = ""
    for ( const _poke of pokemon){
        if ( _poke.name == name ){
            poke = _poke
        }
    }
    if ( poke == "" ) return

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
    const lv = Number($("#lv").val())
    const para = ["H", "A", "B", "C", "D", "S"]

    for (let i = 0; i < 6; i++){
        const BS = Number($("#" + para[i] + "_BS").text())
        const IV = Number($("#" + para[i] + "_IV").val())
        const EV = Number($("#" + para[i] + "_EV").val())
        let AV = Math.floor(((BS*2 + IV + Math.floor(EV/4)) * lv)/100)
        if (i == 0){
            AV += lv + 10
            if ($("#name").val() == "ヌケニン"){
                AV = 1
            }
        } else {
            const plus = $("#naturePlus" + i).prop("checked")
            const minus = $("#natureMinus" + i).prop("checked")
            let rate = 1.0
            if (plus && !minus){
                rate = 1.1
            } else if (!plus && minus){
                rate = 0.9
            }
            AV = Math.floor((AV + 5) * rate)
        }
        $("#" + para[i] + "_AV").val(AV)
    }
}

function setLV(value){
    $("#lv").val(value)
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
    while (eviolite.includes(data[1])){
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
    if ($("#" + team + "_ability").text() == "マルチタイプ"){
        for (let i = 0; i < judgementPlate.length; i++){
            if ($("#" + team + "_item").text() == judgementPlate[i][0]){
                $("#" + team + "_type").text(judgementPlate[i][1])
            }
        }
    }

    // シルヴァディ：メモリによるタイプ変更
    if ($("#" + team + "_ability").text() == "ARシステム"){
        for (let i = 0; i < multiAttack.length; i++){
            if ($("#" + team + "_item").text() == multiAttack[i][0]){
                $("#" + team + "_type").text(multiAttack[i][1])
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
    for (let i = 0; i < 4; i++){
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

function all_clear(){
    // 全てのチェックを外す
    for (let i = 0; i < 4; i++){
        document.getElementById("radio_" + i).checked = false
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
            if ( poke.myPosition == i ) {
                // 〜の行動　を見せる
                document.getElementById("name_" + poke.myPosition).textContent = poke.myName
                document.getElementById(`command_${poke.myPosition}`).style.display = "block"
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

    for ( const party of myParty ) {
        if ( party.myPosition == position ) {
            // 選択中のポケモン名を表示
            document.getElementById(`com_log_name_${position}`).textContent = `${party.myName}は `
            // 技を見せる
            for ( let i = 0; i < 4; i++ ) {
                if ( party[`myMove_${i}`] != null ) {
                    document.getElementById(`com_move_${party.myPosition}${i}`).style.display = "block"
                    document.getElementById(`move_${party.myPosition}${i}`).textContent = party[`myMove_${i}`]
                }
            }
        }
    }
}

// 技を選んだ時
function decideMoveCommand(position, num){
    const move_name = document.getElementById(`move_${position}${num}`).textContent
    const move = moveSearchByName(move_name)
    document.getElementById(`com_log_com_${position}`).textContent = move_name
    if ( move.target == "1体選択" ) {
        // 技を隠す
        for ( let i = 0; i < 4 ;i++ ) {
            document.getElementById(`com_move_${position}${i}`).style.display = "none"
            document.getElementById(`move_${position}${i}`).textContent = ""
        }
        // 「攻撃対象」の文字をを見せる
        document.getElementById(`target_comment_${position}`).style.display = "block"
        // 攻撃対象を見せる(相手)
        for ( const party of oppParty ) {
            if ( party.myPosition != null ) {
                document.getElementById(`com_tgt_${position}${party.myPosition}`).style.display = "block"
                document.getElementById(`tgt_${position}${party.myPosition}`).textContent = party.myName
            } 
        }
        // 攻撃対象を見せる(自分)
        for ( const party of myParty ) {
            if ( party.myPosition != null && party.myPosition != position ) {
                document.getElementById(`com_tgt_${position}${party.myPosition + 2}`).style.display = "block"
                document.getElementById(`tgt_${position}${party.myPosition + 2}`).textContent = party.myName
            } 
        }
    }
    if ( move.target == "自分" || move.target == "味方全体" || move.target == "相手全体" || move.target == "全体" || move.target == "自分以外" || move.target.includes("場") ) {
        document.getElementById(`com_log_tgt_${position}`).textContent = `${move.target}に `
        // 技を隠す
        for ( let i = 0; i < 4 ;i++ ) {
            document.getElementById(`com_move_${position}${i}`).style.display = "none"
            document.getElementById(`move_${position}${i}`).textContent = ""
        }
        decideAction(position)
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

    // 〜の行動　を隠す
    document.getElementById(`name_${position}`).textContent = ""
    document.getElementById(`command_${position}`).style.display = "none"
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
        for ( const party of myParty ) {
            if ( party.myPosition == 1 ) {
                // 1番目の　〜の行動　を見せる
                document.getElementById("name_1").textContent = party.myName
                document.getElementById(`command_1`).style.display = "block"
                // 「攻撃」か「交代」のボタン　を見せる
                document.getElementById(`choise_${party.myPosition}`).style.display = "block"

                return
            }
        }
    }
    // それ以外なら終了
    // 〜の行動　を隠す
    document.getElementById(`name_${position}`).textContent = ""
    document.getElementById(`command_${position}`).style.display = "none"

    // 最終決定ボタンを見せる
    document.getElementById(`emit_command`).style.display = "block"

}

// 戻るボタンを押した時
function back(){
    // 最終決定ボタンを隠す
    document.getElementById(`emit_command`).style.display = "none"

    if ( faintedJudge(myParty) == 0 ) {
        for ( let i = 0; i < 2; i++ ) {
            // 〜の行動　を隠す
            document.getElementById(`name_${i}`).textContent = ""
            document.getElementById(`command_${i}`).style.display = "none"
            // 「攻撃」か「交代」のボタン　を隠す
            document.getElementById(`choise_${i}`).style.display = "none"
            // 「攻撃対象」の文字をを隠す
            document.getElementById(`target_comment_${i}`).style.display = "none"
            // 「交代先」の文字をを隠す
            document.getElementById(`hand_comment_${i}`).style.display = "none"
            // 選択した内容を消す
            document.getElementById(`com_log_name_${i}`).textContent = ""
            document.getElementById(`com_log_tgt_${i}`).textContent = ""
            document.getElementById(`com_log_com_${i}`).textContent = ""
            // 技　と　攻撃対象　と　手持ち　を隠す
            for ( let j = 0; j < 4; j++ ) {
                // 技　を隠す
                document.getElementById(`com_move_${i}${j}`).style.display = "none"
                document.getElementById(`move_${i}${j}`).textContent = ""
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
            }
        }
        // 初めからやり直す
        showCommand()
    } else {
        for ( let i = 0; i < 2; i++ ) {
            // 上下　を隠す
            document.getElementById(`change_above_${i}`).style.display = "none"
            document.getElementById(`change_below_${i}`).style.display = "none"
            const radio_up_down = document.querySelectorAll(`input[name=up_down_${i}]`)
            for ( const element of radio_up_down ) element.checked = false

            for ( let j = 0; j < 4; j++ ) {
                // 交代先　を隠す
                document.getElementById(`com_change_${i}${j}`).style.display = "none"
                document.getElementById(`change_${i}${j}`).textContent = ""
                const radio_change = document.querySelectorAll(`input[name=change${i}]`)
                for ( const element of radio_change ) element.checked = false
            }
        }
        // 初めからやり直す
        showCommandToDecideNext()      
    }
}

// 交代先を選ぶとき
function showCommandToDecideNext() {
    console.log(myParty)
    // 控えを見せる
    for ( const poke of myParty ) {
        // 戦闘していなくて、ひんしでない
        if ( poke.myPosition == null && poke.myRest_hp > 0 ) {
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
    if ( position == 0 ) {
        // 控えを見せる
        for ( const poke of myParty ) {
            // 戦闘していなくて、ひんしでない
            if ( poke.myPosition == null && poke.myRest_hp > 0 && poke.myPosition != document.forms.battle.change0.value ) {
                document.getElementById(`com_change_1${poke.myBench}`).style.display = "block"
                document.getElementById(`change_1${poke.myBench}`).textContent = poke.myName
            }
        }
    } else {
        //決定ボタンを見せる
        document.getElementById(`emit_command`).style.display = "block"
    }
}


function showCondition() {
    alert("HH")
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
        for (let i = 0; i < 4; i++){
            document.getElementById(`${num}_move_${i}`).textContent            = poke[`myMove_${i}`]
            document.getElementById(`${num}_PP_${i}`).textContent              = poke[`myFull_pp_${i}`]
            document.getElementById(`${num}_last_${i}`).textContent            = poke[`myRest_pp_${i}`]
            document.getElementById(`${num}_move_${i}_color`).style.background = getColorCode(moveSearchByName(poke[`myMove_${i}`]).type)
        }

    }
}
