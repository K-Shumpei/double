// モジュール
const http = require("http")
const express = require("express")
const socketIO = require("socket.io")

// オブジェクト
const app = express()
const server = http.Server(app)
const io = socketIO(server)

// 定数
const PORT = process.env.PORT || 2222

// 公開フォルダの指定
app.use(express.static(__dirname))

// サーバーの起動
server.listen(PORT, () => {
    console.log("server starts on port: %d", PORT)
})

// トレーナーネーム、ソケットID、コマンド
var data = []
var playerCount = 0
var roomCount = -1
var IdAndRoom = []

function isRoom(socketID){
    for (const list of IdAndRoom){
        if (list[0] == socketID){
            return list[1]
        }
    }
}

// 接続時の処理
io.on("connection", function(socket){
    // コネションが確率されたら実行
    socket.emit("connected", {})

    // パスワード受信
    socket.on("password", function(txt){
        if (txt == "11111" || txt == "15872469"){
            io.to(socket.id).emit("pass", {})
        } else {
            io.to(socket.id).emit("miss", {})
        }
    })

    // チームデータ受信
    socket.on('team_data',function(party){

        playerCount += 1
        if (playerCount % 2 == 1){
            roomCount += 1
        }

        IdAndRoom.push([socket.id, roomCount])

        if (playerCount % 2 == 1){
            data.push({
                party_0  : party, 
                party_1  : "", 
                id_0     : socket.id, 
                id_1     : "", 
                select_0 : "", 
                select_1 : "", 
                check_0  : false,
                check_1  : false, 
                command_0: [], 
                command_1: [], 
                change_0 : [], 
                change_1 : []
            })
            io.to(socket.id).emit("find enemy", {})
        } else {
            let room = data[isRoom(socket.id)]
            room.party_1 = party
            room.id_1 = socket.id
            
            // ポケモンの選出
            io.to(room.id_0).emit("select pokemon", room.party_1)
            io.to(room.id_1).emit("select pokemon", room.party_0)

            // パーティデータの削除
            room.party_0 = ""
            room.party_1 = ""
        }
    })

    // 選出ポケモンを選んだ
    socket.on("get ready", function(select) {
        let room = data[isRoom(socket.id)]
        // 選出順を設定
        if ( room.id_0 == socket.id ) room.select_0 = select 
        if ( room.id_1 == socket.id ) room.select_1 = select 
        
        if ( room.select_0 != "" && room.select_1 != "" ) { // 二人とも選出する
            io.to(room.id_0).emit("battle start", room.select_0, room.select_1)
            io.to(room.id_1).emit("battle start", room.select_1, room.select_0)
        } else { // 片方が選出していない
            if ( room.select_0 == "" ) {
                io.to(room.id_0).emit("waiting you", {})
                io.to(room.id_1).emit("waiting me", {})
            }
            if ( room.select_1 == "" ) {
                io.to(room.id_1).emit("waiting you", {})
                io.to(room.id_0).emit("waiting me", {})
            }
        }
    })

    // コマンドの受信
    socket.on("send command", function(move0, tgt0, hand0, move1, tgt1, hand1) {
        let room = data[isRoom(socket.id)]
        for (let i = 0; i < 2; i++){
            if (room["id_" + i] == socket.id){
                room["check_" + i] = true
                room["command_" + i] = [
                    {move: move0, tgt : tgt0, hand: hand0},  
                    {move: move1, tgt : tgt1, hand: hand1} 
                ]

                //data[room]["user" + (i+1)].data.mega = opt.mega
                //data[room]["user" + (i+1)].data.Z = opt.Z
                //data[room]["user" + (i+1)].data.ultra = opt.ultra
                //data[room]["user" + (i+1)].data.dyna = opt.dyna
                //data[room]["user" + (i+1)].data.giga = opt.giga
            }
        }
        if (room.check_0 && room.check_1){
            let randomList = []
            for ( let i = 0; i < 100; i++ ) randomList.push(Math.random())
            io.to(room.id_0).emit("run battle", room.command_0, room.command_1, randomList)
            io.to(room.id_1).emit("run battle", room.command_1, room.command_0, randomList)

            // コマンドのチェックを外す
            room.check_0   = false
            room.check_1   = false
            room.command_0 = []
            room.command_1 = []
            randomList     = []
        }
    })

    // 交代先の受信
    socket.on("send change", function(command, oppJudge) {
        let room = data[isRoom(socket.id)]
        for ( let i = 0; i < 2; i++ ) {
            // 交代先が記録されている時だけ記入、それ以外は空配列
            if ( room[`id_${i}`] == socket.id ) {
                room[`check_${i}`] = true
                room[`change_${i}`] = command
            }
        }

        let randomList = []
        for ( let i = 0; i < 100; i++ ) randomList.push(Math.random())

        // 自分だけが交代するとき　または　相手も交代するとき
        if ( oppJudge == 0 || ( oppJudge > 0 && room.check_0 && room.check_1 ) ) {
            io.to(room.id_0).emit("change pokemon", room.change_0, room.change_1, randomList)
            io.to(room.id_1).emit("change pokemon", room.change_1, room.change_0, randomList)

             // コマンドのチェックを外す
            room.check_0  = false
            room.check_1  = false
            room.change_0 = []
            room.change_1 = []
            randomList    = []
        }


    })

    // 選択中・・・の時 val は yes か no
    socket.on("thinking", function(val) {
        const room = isRoom(socket.id)
        if (data[room].user1.id == socket.id){
            data[room].user1.command = val
        } else {
            data[room].user2.command = val
        }
    })

    // 選択中のユーザーから受信
    socket.on("choose poke", function(val) {
        const room = isRoom(socket.id)
        if (data[room].user1.id == socket.id){
            data[room].user1.command = val
            if (data[room].user2.command == "no" || data[room].user2.command != "yes"){
                io.to(data[room].user1.id).emit("summon poke", data[room].user2.command)
                io.to(data[room].user2.id).emit("summon poke", val)
                data[room].user1.command = "yet"
                data[room].user2.command = "yet"
            }
        } else {
            data[room].user2.command = val
            if (data[room].user1.command == "no" || data[room].user1.command != "yes"){
                io.to(data[room].user1.id).emit("summon poke", val)
                io.to(data[room].user2.id).emit("summon poke", data[room].user1.command)
                data[room].user1.command = "yet"
                data[room].user2.command = "yet"
            } 
        }
    })

    // 切断時の処理
    socket.on("disconnect", () => {
        return
        const room = data[isRoom(socket.id)]
        if (room != undefined){
            if (data[room].user2 == ""){ // 対戦相手がまだ見つかっていない時
                data.splice(room, 1)
                playerCount -= 1
                roomCount -= 1
            } else {
                if (data[room].user1.data.id == socket.id){ // 部屋の一人目が抜けた時
                    data[room].user1.data.command = "emit"
                    if (data[room].user2.data.command != "emit"){
                        socket.to(data[room].user2.data.id).emit("disconnection", {})
                    }
                } else { // 部屋の二人目が抜けた時
                    data[room].user2.data.command == "emit"
                    if (data[room].user1.data.command != "emit"){
                        socket.to(data[room].user1.data.id).emit("disconnection", {})
                    }
                }
                // 部屋の両方の接続が切れた時、部屋情報を削除
                if (data[room].user1.data.command == "emit" && data[room].user2.data.command == "emit"){
                    let check = []
                    for (let i = 0; i < IdAndRoom.length; i++){
                        if (IdAndRoom[i][1] == room){
                            check.push(i)
                        } else if (IdAndRoom[i][1] > room){ // 抜ける部屋より大きい部屋番号を1ずつ減らす
                            IdAndRoom[i][1] -= 1
                        }
                    }
                    // 部屋情報から削除
                    IdAndRoom.splice(check[0], 1)
                    IdAndRoom.splice(check[1], 1)
                    data.splice(room, 1)
                    // プレイヤー人数をふたり減らす
                    playerCount -= 2
                    // 部屋数を一つ減らす
                    roomCount -= 1
                }
            }
        }
	    console.log("disconnect")
    })
})


