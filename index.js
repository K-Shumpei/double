$(function () {
    var socketio = io()

    // パスワード送信
    $("#emitPass").submit(function() {
        socketio.emit("password", $("#pass").val())
        $("#pass").val("")
        return false
    })
    // パスワードの正誤
    socketio.on("pass", function(){
        document.getElementById("headline").textContent = "チームを登録してください"
        document.getElementById("password").style.display = "none"
        document.getElementById("mainContent").style.display = "block"
    })
    socketio.on("miss", function(){
        alert("パスワードが違います")
    })

    // チームデータ送信
    $("#team_set").submit(function() {
        const my_name = $("#my_name").val()
        if (my_name == ""){
            alert("名前を入力してください")
            return false
        }

        for ( const party of myParty ) { party.myTN = my_name }
        socketio.emit("team_data", myParty)
        $("#my_name").val("")
        document.getElementById("trainer_name").style.display = "none"
        return false
    })

    // 一人目は対戦相手を探す
    socketio.on("find enemy", function() {
        document.getElementById("headline").textContent = "対戦相手を探しています"
        document.getElementById("register").style.display = "none"
        document.getElementById("trainer_name").style.display = "none"
    })

    // 対戦相手が見つかり、選出するポケモンを選ぶ
    socketio.on("select pokemon", function(you) {
        // 相手の手持ちポケモン設定
        for ( i = 0; i < 6; i++) { 
            const party = new Party()
            // 基本情報
            party.myID       = i+6
            party.myParty    = "opp"
            party.myTN       = you[i].trainer_name
            party.myName     = you[i].name
            party.myGender   = you[i].gender
            party.myLevel    = you[i].level
            party.myType     = you[i].type
            party.myNature   = you[i].nature
            party.myAbility  = you[i].ability
            party.myItem     = you[i].item
            party.myAilment  = you[i].ailment
            // 技
            party.myMove_0    = you[i].move_0
            party.myRest_pp_0 = you[i].rest_pp_0
            party.myFull_pp_0 = you[i].full_pp_0
            party.myMove_1    = you[i].move_1
            party.myRest_pp_1 = you[i].rest_pp_1
            party.myFull_pp_1 = you[i].full_pp_1
            party.myMove_2    = you[i].move_2
            party.myRest_pp_2 = you[i].rest_pp_2
            party.myFull_pp_2 = you[i].full_pp_2
            party.myMove_3    = you[i].move_3
            party.myRest_pp_3 = you[i].rest_pp_3
            party.myFull_pp_3 = you[i].full_pp_3
            // 実数値
            party.myRest_hp = you[i].rest_hp
            party.myFull_hp = you[i].full_hp
            party.myAtk     = you[i].atk
            party.myDef     = you[i].def
            party.mySp_atk  = you[i].sp_atk
            party.mySp_def  = you[i].sp_def
            party.mySpeed   = you[i].speed
            // 個体値
            party.myHp_iv     = you[i].hp_iv
            party.myAtk_iv    = you[i].atk_iv
            party.myDef_iv    = you[i].def_iv
            party.mySp_atk_iv = you[i].sp_atk_iv
            party.mySp_def_iv = you[i].sp_def_iv
            party.mySpeed_iv  = you[i].speed_iv
            // 努力値
            party.myHp_ev     = you[i].hp_ev
            party.myAtk_ev    = you[i].atk_ev
            party.myDef_ev    = you[i].def_ev
            party.mySp_atk_ev = you[i].sp_atk_ev
            party.mySp_def_ev = you[i].sp_def_ev
            party.mySpeed_ev  = you[i].speed_ev
            // 元の情報
            party.myType_org    = you[i].type
            party.myAbility_org = you[i].ability
            party.myAtk_org     = you[i].atk
            party.myDef_org     = you[i].def
            party.mySp_atk_org  = you[i].sp_atk
            party.mySp_def_org  = you[i].sp_def
            party.mySpeed_org   = you[i].speed
            // 手持ちの順番
            party.myHand = i
            // 技の処理に関係するクラス
            party.myCondition = new Condition()
            // ポケモン特有のもの
            party.myDisguise = you[i].disguise
            party.myIce_face = you[i].ice_face
            
            oppParty[i] = party
        }

        // フィールドのクラス
        myField  = new Field(myParty[0].myTN)
        oppField = new Field(oppParty[0].myTN)
        fieldStatus = new allField()

        document.getElementById("headline").textContent = "選出するポケモンを選んでください"
        document.getElementById("register").style.display = "none"
        document.getElementById("select").style.display = "block"
        document.getElementById("trainer_name").style.display = "none"
        // 名前の設定
        document.getElementById("myName").textContent = myParty[0].myTN
        document.getElementById("my_TN").textContent = myParty[0].myTN
        document.getElementById("yourName").textContent = oppParty[0].myTN
        document.getElementById("opp_TN").textContent = oppParty[0].myTN
        // 画像の設定
        for ( let i = 0; i < 6; i++ ) {
            for ( const poke of pokeList ) {
                if ( myParty[i].myName == poke.name ) {
                    document.getElementById(`player_${i}`).src = "poke_figure/" + poke.number + ".gif"
                    document.getElementById(`me_${i}`).src = "poke_figure/" + poke.number + ".gif"
                }
            }
        }
        for ( let i = 0; i < 6; i++ ) {
            for ( const poke of pokeList ) {
                if ( oppParty[i].myName == poke.name ) {
                    document.getElementById(`enemy_${i}`).src = "poke_figure/" + poke.number + ".gif"
                    document.getElementById(`opp_${i}`).src = "poke_figure/" + poke.number + ".gif"
                }
            }
        }
        // 選出ボタンの設定
        for (let i = 0; i < 4; i++){
            for (let j = 0; j < 6; j++){
                $("<option>", {
                    text: (j+1) + ":" + $("#" + j + "_name").text()
                }).appendTo("#select" + i)
            }
            $("#select" + i).val((i+1) + ":" + $("#" + i + "_name").text())
        }
    })

    // 選出するポケモンのデータを送信　[1匹目、2匹目、3匹目]の番号リストを送信
    $("#battle_start").submit(function() {
        let select = []
        for (let i = 0; i < 4; i++){
            select.push(Number($("#select" + i).val().split(":")[0]) - 1)
        }
        if (select[0] == select[1] || 
            select[0] == select[2] || 
            select[0] == select[3] || 
            select[1] == select[2] || 
            select[1] == select[3] || 
            select[2] == select[3]){
            alert("同じポケモンが選ばれています")
            return false
        }
        socketio.emit("get ready", select)
        document.getElementById("battle_start_button").disabled = true
        return false
    })

    // 自分が先に選出した
    socketio.on("waiting me", function() {
        document.getElementById("myName").textContent += "(選出完了)"
    })
    // 相手が先に選出した
    socketio.on("waiting you", function() {
        document.getElementById("yourName").textContent += "(選出完了)"
    })

    // 対戦開始
    socketio.on("battle start", function(my_select, opp_select) {
        // 自分の選出
        myParty[my_select[0]].myBench = 0
        myParty[my_select[1]].myBench = 1
        myParty[my_select[2]].myBench = 2
        myParty[my_select[3]].myBench = 3
        // 選出していないポケモンを削除
        for ( let i = 5; i >= 0; i-- ) {
            if ( myParty[i].myBench == null ) myParty.splice( i, 1 )
        }
        // 選出順に並び替え
        myParty.sort( (a,b) => {
            if(a.myBench > b.myBench) return 1
            if(a.myBench < b.myBench) return -1
            return 0
        })

        // 相手の選出
        oppParty[opp_select[0]].myBench = 0
        oppParty[opp_select[1]].myBench = 1
        oppParty[opp_select[2]].myBench = 2
        oppParty[opp_select[3]].myBench = 3
        // 選出していないポケモンを削除
        for ( let i = 5; i >= 0; i-- ) {
            if ( oppParty[i].myBench == null ) oppParty.splice( i, 1 )
        }
        // 選出順に並び替え
        oppParty.sort( (a,b) => {
            if(a.myBench > b.myBench) return 1
            if(a.myBench < b.myBench) return -1
            return 0
        })

        
        writeLog("---------- バトル開始 ----------")

        summon(myParty[0], 0) // ポケモンのデータ、バトル場の番号
        summon(myParty[1], 1)
        summon(oppParty[0], 0)
        summon(oppParty[1], 1)

        // 場に出た時の処理
        landing()

        $("#headline").text("対戦が始まりました")

        document.getElementById("select").style.display = "none"
        document.getElementById("battle_table").style.display = "block"
        document.getElementById("4_team").style.display = "none"
        document.getElementById("5_team").style.display = "none"
        document.getElementById("each_party").style.display = "block"

        showCommand()
        showNowCondition()
    })

    // コマンドの送信
    $("#battle").submit(function() {
        const form = document.forms.battle

        // コマンド欄を非表示
        document.getElementById("emit_command").style.display = "none"
        document.getElementById("back_command").style.display = "none"

        // ポケモンを交代する時
        if ( faintedJudge(myParty) ) {
            const change0   = ( form.change0.value == ""   )? "" : Number(form.change0.value)
            const up_down_0 = ( form.up_down_0.value == "" )? "" : Number(form.up_down_0.value)
            const change1   = ( form.change1.value == ""   )? "" : Number(form.change1.value)
            const up_down_1 = ( form.up_down_1.value == "" )? "" : Number(form.up_down_1.value)

            let command = []
            if ( change1 ) {
                command.push({change: change0, up_down: up_down_0})
                command.push({change: change1, up_down: up_down_1})
            } else {
                command.push({change: change0, up_down: up_down_0})
            }

            // チェックの解除
            for ( const name of ["change0", "up_down_0", "change1", "up_down_1"] ) {
                for ( const element of document.getElementsByName(name) ) {
                    element.checked = false
                }
            }

            // 送信
            socketio.emit("send change", command, faintedJudge(oppParty))
            return false
        } else {
            // コマンド
            const move0 = ( form.move0.value == "" )? "" : Number(form.move0.value)
            const tgt0  = ( form.tgt0.value == ""  )? "" : Number(form.tgt0.value)
            const hand0 = ( form.hand0.value == "" )? "" : Number(form.hand0.value)
            const move1 = ( form.move1.value == "" )? "" : Number(form.move1.value)
            const tgt1  = ( form.tgt1.value == ""  )? "" : Number(form.tgt1.value)
            const hand1 = ( form.hand1.value == "" )? "" : Number(form.hand1.value)
            
            // チェックの解除
            for ( const name of ["move0", "tgt0", "hand0", "move1", "tgt1", "hand1"] ) {
                for ( const element of document.getElementsByName(name) ) {
                    element.checked = false
                }
            }
            
            // ダイマックスなどの情報
            //const mega = document.getElementById("A_mega").checked
            //const Z = document.getElementById("A_Z").checked
            //const ultra = document.getElementById("A_ultra").checked
            //const dyna = document.getElementById("A_dyna").checked
            //const giga = document.getElementById("A_giga").checked
            //const option = {mega: mega, Z: Z, ultra: ultra, dyna: dyna, giga: giga}

            
            // 送信
            socketio.emit("send command", move0, tgt0, hand0, move1, tgt1, hand1)
            return false
        }

        /*
        let val = document.battle.radio.value
        if (document.battle.A_p_con.value.includes("反動で動けない") 
        || document.battle.A_p_con.value.includes("溜め技") 
        || document.battle.A_p_con.value.includes("あばれる") 
        || document.battle.A_p_con.value.includes("アイスボール") 
        || document.battle.A_p_con.value.includes("ころがる") 
        || document.battle.A_p_con.value.includes("がまん") 
        || document.battle.A_p_con.value.includes("さわぐ")){
            val = undefined
        }
        if (val == ""){
            if (document.getElementById("radio_0").disabled == false 
            && document.getElementById("radio_1").disabled == false 
            && document.getElementById("radio_2").disabled == false 
            && document.getElementById("radio_3").disabled == false){
                val = "わるあがき"
            }
        }
        if (val == ""){
            alert("行動を選択してください")
            return false
        }
        
        socketio.emit("action decide", val, option)
        document.getElementById("battle_button").disabled = true
        return false
        */
    })

    // 各ターンの行動
    socketio.on("run battle", function(myCommand, oppCommand, list) {
        // 乱数リストを記入
        randomList = list
        // 自分のコマンドを記入
        for ( const poke of myParty ) {
            if ( poke.myPosition != null ) {
                poke.myCmd_move = myCommand[poke.myPosition].move
                poke.myCmd_tgt  = myCommand[poke.myPosition].tgt
                poke.myCmd_hand = myCommand[poke.myPosition].hand
            }
        }
        // 相手のコマンドを記入
        for ( const poke of oppParty ) {
            if ( poke.myPosition != null ) {
                poke.myCmd_move = oppCommand[poke.myPosition].move
                poke.myCmd_tgt  = oppCommand[poke.myPosition].tgt
                poke.myCmd_hand = oppCommand[poke.myPosition].hand
            }
        }

        // ターンの処理
        runBattle()
        // 現在の状態を画面に表示
        showNowCondition()
        // コマンド欄を表示
        back()
    })

    // ポケモンの交代
    socketio.on("change pokemon", function(myCommand, oppCommand, list) {
        // 乱数リストを記入
        randomList = list

        // 自分のポケモン
        for ( const cmd of myCommand ) {
            for ( const poke of myParty ) {
                if ( poke.myBench == cmd.change ) {
                    summon(poke, cmd.up_down)
                }
            }
        }
        // 相手のポケモン
        for ( const cmd of oppCommand ) {
            for ( const poke of oppParty ) {
                if ( poke.myBench == cmd.change ) {
                    summon(poke, cmd.up_down)
                }
            }
        }

        resetSwitch()

        // 場に出た時の処理
        landing()
        // 現在の状態を画面に表示
        showNowCondition()

        // ターン終了後の交代
        if ( fieldStatus.myTurn_end ) {
            back()
        } else {
            // 6.技の処理
            moveUsedEachPokemon()
            // 現在の状態を画面に表示
            showNowCondition()
            if ( fieldStatus.mySwitch_me || fieldStatus.mySwitch_opp ) {
                back()
                return
            }
            // 7. ターン終了
            endProcess()
            // 現在の状態を画面に表示
            showNowCondition()
            // コマンド欄を表示
            back()
        }
    })

        /*
        // 空欄、空欄
        if (!me.f_con.includes("選択中") && !you.f_con.includes("ひんし") && !me.f_con.includes("選択中") && !you.f_con.includes("ひんし")){
            runBattle(me, you)
        }
        // 選択中、空欄
        if ((me.f_con.includes("選択中") && !you.f_con.includes("選択中") && !you.f_con.includes("ひんし")) 
        || (you.f_con.includes("選択中") && !me.f_con.includes("選択中") && !me.f_con.includes("ひんし"))){
            summon.pokeReplace(data[room]["user" + player], data[room]["user" + enemy])
            summon.onField(data[room]["user" + player], data[room]["user" + enemy], 1)
            bfn.buttonValidation(data[room]["user" + player])
            data[room]["user" + player].data.command = ""
            if (data[room]["user" + enemy].data.command != ""){
                let atk = data[room]["user" + enemy]
                let def = data[room]["user" + player]
                let order = [def, atk]
                let move = success.moveSuccessJudge(atk, def, order)
                if (move == false){
                    bfn.processAtFailure(atk)
                } else {
                    if (move[9] == "反射"){
                        let save = atk
                        atk = def
                        def = save
                    }
                    if (movePro.moveProcess(atk, def, move, order) == "stop"){
                        atk.data.command = ""
                        io.to(data[room].user1.data.id).emit("run battle", data[room].user1, data[room].user2)
                        io.to(data[room].user2.data.id).emit("run battle", data[room].user2, data[room].user1)
                        return
                    }
                }
                atk.data.command = ""
            }
            end.endProcess(data[room].user1, data[room].user2)
            io.to(data[room].user1.data.id).emit("run battle", data[room].user1, data[room].user2)
            io.to(data[room].user2.data.id).emit("run battle", data[room].user2, data[room].user1)
            return
        }
        // ひんし、空欄
        if ((me.f_con.includes("ひんし") && !you.f_con.includes("選択中") && !you.f_con.includes("ひんし")) 
        || (you.f_con.includes("ひんし") && !me.f_con.includes("選択中") && !me.f_con.includes("ひんし"))){
            summon.pokeReplace(data[room]["user" + player], data[room]["user" + enemy])
            summon.onField(data[room]["user" + player], data[room]["user" + enemy], 1)
            bfn.buttonValidation(data[room]["user" + player])
            data[room]["user" + player].data.command = ""
            io.to(data[room].user1.data.id).emit("run battle", data[room].user1, data[room].user2)
            io.to(data[room].user2.data.id).emit("run battle", data[room].user2, data[room].user1)
            return
        }
        // 選択中、選択中
        if (me.f_con.includes("選択中") && you.f_con.includes("選択中")){
            if (data[room].user1.data.command != "" && data[room].user2.data.command != ""){
                summon.pokeReplace(data[room].user1, data[room].user2)
                summon.pokeReplace(data[room].user2, data[room].user1)
                summon.onField(data[room].user1, data[room].user2, "both")
                end.endProcess(data[room].user1, data[room].user2)
                bfn.buttonValidation(data[room].user1)
                bfn.buttonValidation(data[room].user2)
                data[room].user1.data.command = ""
                data[room].user2.data.command = ""
                io.to(data[room].user1.data.id).emit("run battle", data[room].user1, data[room].user2)
                io.to(data[room].user2.data.id).emit("run battle", data[room].user2, data[room].user1)
                return
            }
        }
        // ひんし、ひんし
        if (me.f_con.includes("ひんし") && you.f_con.includes("ひんし")){
            if (data[room].user1.data.command != "" && data[room].user2.data.command != ""){
                summon.pokeReplace(data[room].user1, data[room].user2)
                summon.pokeReplace(data[room].user2, data[room].user1)
                summon.onField(data[room].user1, data[room].user2, "both")
                bfn.buttonValidation(data[room].user1)
                bfn.buttonValidation(data[room].user2)
                data[room].user1.data.command = ""
                data[room].user2.data.command = ""
                io.to(data[room].user1.data.id).emit("run battle", data[room].user1, data[room].user2)
                io.to(data[room].user2.data.id).emit("run battle", data[room].user2, data[room].user1)
                return
            }
        }

        // 手持ちのポケモンの情報を記入
        for (let i = 0; i < 4; i++){
            for (const parameter of [
                "name", "sex", "nature", "ability", "item", "abnormal", 
                "move_0", "move_1", "move_2", "move_3", 
                "recycle", "belch", "form", "life", "belch", "recycle", "form", 
                "level", "last_HP", "full_HP", 
                "A_AV", "B_AV", "C_AV", "D_AV", "S_AV", 
                "PP_0", "last_0", 
                "PP_1", "last_1", 
                "PP_2", "last_2", 
                "PP_3", "last_3", 
                "H_IV", "A_IV", "B_IV", "C_IV", "D_IV", "S_IV", 
                "H_EV", "A_EV", "B_EV", "C_EV", "D_EV", "S_EV"]){
                $("#" + i + "_" + parameter).text(me["poke" + i][parameter])
            }
            $("#" + i + "_type").text(me["poke" + i].type.join("、"))
        }

        // 戦闘中のポケモンの情報を記入
        for (let i = 0; i < 2; i++){
            for (const parameter of [
                "name", "sex", "level", "ability", "item", "abnormal", 
                "move_0", "move_1", "move_2", "move_3", 
                "last_HP", "full_HP", 
                "A_AV", "B_AV", "C_AV", "D_AV", "S_AV", 
                "PP_0", "last_0", 
                "PP_1", "last_1", 
                "PP_2", "last_2", 
                "PP_3", "last_3", 
                "A_rank", "B_rank", "C_rank", "D_rank", "S_rank", "X_rank", "Y_rank"]){
                $("#A" + i + "_" + parameter).text(me["con" + i][parameter])
            }
            $("#A" + i + "_type").text(me["con" + i].type.join("、"))
        }
        for (let i = 0; i < 2; i++){
            for (const parameter of [
                "name", "sex", "level", "abnormal", 
                "A_rank", "B_rank", "C_rank", "D_rank", "S_rank", "X_rank", "Y_rank"]){
                $("#B" + i + "_" + parameter).text(you["con" + i][parameter])
            }
            $("#B" + i + "_type").text(you["con" + i].type.join("、"))
        }

        // フィールド状態とログの書き込み
        document.getElementById("A_f_con").value = me.f_con
        document.getElementById("B_f_con").value = you.f_con
        document.getElementById("log").value = me.log
        document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight

        for (const team of [{data: me, char: "A"}, {data: you, char: "B"}]){
            // メガ進化、Z技、ダイマックスのテキスト
            //document.getElementById(team.char + "_mega_text").textContent = team.data.data.megaTxt
            //document.getElementById(team.char + "_Z_text").textContent = team.data.data.ZTxt
            //document.getElementById(team.char + "_ultra_text").textContent = team.data.data.ultraTxt
            //document.getElementById(team.char + "_dyna_text").textContent = team.data.data.dynaTxt
            //document.getElementById(team.char + "_giga_text").textContent = team.data.data.gigaTxt
            for (let i = 0; i < 2; i++){
                // 画像のリセット
                document.getElementById(team.char + i + "_image").src = ""
                document.getElementById(team.char + i + "_HP_bar").value = 0
                document.getElementById(team.char + i + "_type_image0").src = ""
                document.getElementById(team.char + i + "_type_image1").src = ""
                document.getElementById(team.char + i + "_type_image2").src = ""
                document.getElementById(team.char + i + "_type_image3").src = ""

                if (team.data["con" + i].name != ""){
                    // ポケモンの画像の設定
                    for (let j = 0; j < pokemon.length; j++){
                        if (team.data["con" + i].name == pokemon[j][1]){
                            document.getElementById(team.char + i + "_image").src = "poke_figure/" + pokemon[j][0] + ".gif"
                        }
                    }
                    // ポケモンのタイプの設定
                    let type = document.getElementById(team.char + i + "_type").textContent.split("、")
                    for (let j = 0; j < type.length; j++){
                        document.getElementById(team.char + i + "_type_image" + j).src = "type_figure/" + type[j] + ".gif"
                    }
                    document.getElementById(team.char + i + "_type").textContent = ""
                    // HPバーの表示
                    document.getElementById(team.char + i + "_HPbar").value = team.data["con" + i].last_HP / team.data["con" + i].full_HP
                    document.getElementById(team.char + team.data["con" + i].num + "_bar").style.display = "block"
                    document.getElementById(team.char + team.data["con" + i].num + "_HP_bar").value = team.data["con" + i].last_HP / team.data["con" + i].full_HP
                }
                // ダイマックスシンボル
                //if (team.data.data.dynaTxt.includes("3") || team.data.data.gigaTxt.includes("3")){
                    //let symbol = document.createElement("img")
                    //symbol.classList.add("symbol")
                    //symbol.src = "poke_figure/dynamaxSymbol.png"
                    //document.getElementById(team.char + "_symbol").appendChild(symbol)
                //} else {
                    //document.getElementById(team.char + "_symbol").innerHTML = ""
                //}
            }
        }

        */

    // 相手の選択を待っている時
    socketio.on("wait your action", function() {
        document.getElementById("battle_button").disabled = true
    })

    socketio.on("action decide", function(val) {
        // 相手の選んだボタンにチェックをつける
        if (val > 3){
            document.getElementById("B_" + Number(val - 4) + "_button").checked = true
        } else {
            document.getElementById("B_radio_" + val).checked = true
        }

        // バトル実行
        run_battle()
        button_validation()

        // 自分に選択中のメモがあれば決定ボタンを有効にし、洗濯中であることをサーバーに送信
        if (new get("A").f_con.includes("選択中・・・")){
            document.battle.battle_button.disabled = false
            for (let i = 0; i < 4; i++){
                document.getElementById("A_radio_" + i).disabled = true
                document.getElementById("A_radio_" + i).checked = false
            }
            socketio.emit("thinking", "yes")
        } else if (new get("B").f_con.includes("選択中・・・")){
            for (let i = 0; i < 4; i++){
                document.getElementById("A_radio_" + i).disabled = true
            }
            for (let i = 0; i < 3; i++){
                document.getElementById("A_" + i + "_button").disabled = true
            }
            socketio.emit("thinking", "no")
        }
    })

    socketio.on("summon poke", function(val) {
        if (val > 3){
            document.getElementById("B_" + Number(val - 4) + "_button").checked = true
        }
        choose_poke()
        button_validation()
    })

    // 相手の接続が切れた時
    socketio.on("disconnection", function() {
        document.getElementById("headline").textContent = "相手の接続が切れました"
        document.battle_log.battle_log.value += "相手の接続が切れました。"
        document.battle.battle_button.disabled = true
        document.battle.battle_start_button.disabled = true
    })
})