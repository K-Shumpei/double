// 戦闘中のポケモンを手持ちに戻す
function toHand( poke ){
    // 「戦闘中」を「控え」に変更
    document.getElementById(`${poke.myParty}_${poke.myPosition}_in_battle`).src = ""
    document.getElementById(`rest_hp_${poke.myPosition}`).textContent = ""
    document.getElementById(`full_hp_${poke.myPosition}`).textContent = ""
    poke.myPosition = null

    if ( poke.myRest_hp == 0 ) {
        writeLog(`${poke.myTN} の ${poke.myName} は 倒れた !`)
        for ( const _poke of allPokeInBattle() ){
            if ( _poke.myAbility == "ソウルハート" && isAbility(_poke) ) {
                abilityDeclaration(_poke)
                changeRank(poke, "sp_atk", 1, false)
            }
        }
    }
    
    // フォルムを元に戻す
    if ( poke.myName == "メテノ(コア)" ) formChange(poke, "メテノ(りゅうせいのすがた)", false)
    if ( poke.myName == "チェリム(ポジフォルム)" ) formChange(poke, "チェリム", false)
    if ( poke.myName == "ヒヒダルマ(ダルマモード)" ) formChange(poke, "ヒヒダルマ", false)
    if ( poke.myName == "メロエッタ(ステップフォルム)" ) formChange(poke, "メロエッタ(ボイスフォルム)", false)
    if ( poke.myName == "ギルガルド(ブレードフォルム)" ) formChange(poke, "ギルガルド(シールドフォルム)", false)
    if ( poke.myName == "ヒヒダルマ(ダルマモード(ガラルのすがた))" ) formChange(poke, "ヒヒダルマ(ガラルのすがた)", false)
    if ( poke.myName != "ポワルン" && poke.myName.includes("ポワルン") ) formChange(poke, "ポワルン", false)

    // 特性の発動
    if ( isAbility(poke) && poke.myRest_hp > 0 ) {
        // さいせいりょく
        if ( poke.myAbility == "さいせいりょく" ) {
            const damage = Math.floor(poke.myFull_hp / 3 * isDynamax(poke))
            changeHP(poke, damage, "+")
        }
        // しぜんかいふく
        if ( poke.myAbility == "しぜんかいふく" ){
            resetAilment(poke)
        }
    }

    // 特殊天候の処理
    // おわりのだいち
    if ( poke.myAbility == "おわりのだいち" ) {
        const drought = allPokeInBattle().filter( _poke => _poke.myAbility == "おわりのだいち" && isAbility(_poke) )
        if ( !drought.length ) {
            writeLog(`日差しが元に戻った`)
            fieldStatus.myDrought = false
        }
    }
    // はじまりのうみ
    if ( poke.myAbility == "はじまりのうみ" ) {
        const heavy_rain = allPokeInBattle().filter( _poke => _poke.myAbility == "はじまりのうみ" && isAbility(_poke) )
        if ( !heavy_rain.length ) {
            writeLog(`雨が止んだ`)
            fieldStatus.myHeavy_rain = false
        }
    }
    // デルタストリーム
    if ( poke.myAbility == "デルタストリーム" ) {
        const turbulence = allPokeInBattle().filter( _poke => _poke.myAbility == "デルタストリーム" && isAbility(_poke) )
        if ( !turbulence.length ) {
            writeLog(`乱気流が収まった`)
            fieldStatus.myTurbulence = false
        }
    }



    for ( const _poke of allPokeInBattle() ) {
        // 逃げられない状態の解除
        if ( _poke.myCondition.myCant_escape == poke.myID ) {
            _poke.myCondition.myCant_escape = false
        }
        // メロメロ状態の解除
        if ( _poke.myCondition.myAttract == poke.myID ) {
            _poke.myCondition.myAttract = false
        }
        // バインド状態の解除
        if ( _poke.myCondition.myBind_ID == poke.myID ) {
            resetBind(_poke)
        }
        // たこがため
    }

    if ( poke.myAbility == "きんちょうかん" || poke.myAbility == "じんばいったい" ) {
        for ( const _poke of oppPokeInBattle(poke) ) {
            eatBerryInPinch(_poke)
            eatBerryInAbnormal(_poke)
        }
    }

    // 対象の注目の的状態を解除
    isField(poke).mySpotlight = isField(poke).mySpotlight.filter( spot => spot.position != poke.myPosition )
    
    /*
    // ダイマックスポケモンを引っ込める時、ダイマックス権を失う
    if (user.data.dynaTxt.includes("3") || user.data.gigaTxt.includes("3")){
        cfn.logWrite(user, enemy, user.con.TN + "　の　" + user.con.name + "　の　ダイマックスが　終わった" + "\n")
        user.data.dynaTxt = "ダイマックス（済）"
        user.data.gigaTxt = "キョダイマックス（済）"
        user.con.full_HP = user.con.full_HP / 2
        user.con.last_HP = Math.ceil(user.con.last_HP / 2)
        user["poke" + cfn.battleNum(user)].last_HP = user.con.last_HP
    }



    // へんしん状態のポケモンはそのまま
    if (!con.p_con.includes("状態変化『へんしん』")){
        // パラメーターの移動
        me["poke" + con.num].abnormal = con.abnormal
    }

    // 特性が「かがくへんかガス」の時
    if ( poke.myAbility == "かがくへんかガス" ) {
        cfn.logWrite(user, enemy, "かがくへんかガスの効果が切れた" + "\n")
        for (let i = 0; i < enemy.con.p_con.split("\n").length - 1; i++){
            if (enemy.con.p_con.split("\n")[i].includes("かがくへんかガス")){
                enemy.con.ability = enemy.con.p_con.split("\n")[i].slice(9)
            }
        }
        cfn.conditionRemove(enemy.con, "poke", "かがくへんかガス")
        efn.activeAbility(user, enemy, 1)
    }

    /*
    if (user.con.f_con.includes("選択中・・・")){
        user.data["radio_" + Number(cfn.battleNum(user) + 4)] = true
        user["poke" + cfn.battleNum(user)].life = "選択中"
    } else if (user.con.f_con.includes("ひんし")){
        user.data["radio_" + Number(cfn.battleNum(user) + 4)] = true
        user["poke" + cfn.battleNum(user)].life = "ひんし"
    } else {
        user.data["radio_" + Number(cfn.battleNum(user) + 4)] = false
        user["poke" + cfn.battleNum(user)].life = "控え"
    }
    */

    // ランク変化をリセット
    poke.myRank_atk      = 0
    poke.myRank_def      = 0
    poke.myRank_sp_atk   = 0
    poke.myRank_sp_def   = 0
    poke.myRank_speed    = 0
    poke.myRank_evation  = 0
    poke.myRank_accuracy = 0
    
    // myCondition のリセット
    poke.myCondition = new Condition()

    // 元の値に戻す
    poke.myAbility = poke.myAbility_org
    poke.myType    = [].concat(poke.myType_org)
    poke.myAtk     = poke.myAtk_org
    poke.myDef     = poke.myDef_org
    poke.mySp_atk  = poke.mySp_atk_org
    poke.mySp_def  = poke.mySp_def_org
    poke.mySpeed   = poke.mySpeed_org

    // コマンドの消去
    /*
    if (user.con.f_con.includes("ひんし") || user.con.f_con.includes("選択中")){
        user.data.command = ""
    }

    // メガ進化ボタンの無効化
    user.data.megable = true
    // Z技ボタンの無効化
    user.data.Zable = true
    // ウルトラバーストボタンの無効化
    user.data.ultrable = true
    // キョダイマックスボタンの無効化
    user.data.gigable = true

    // 勝敗判定
    if (user.poke0.life == "ひんし" && user.poke1.life == "ひんし" && user.poke2.life == "ひんし" && !user.con.f_con.includes("勝ち") && !user.con.f_con.includes("負け")){
        user.con.f_con += "負け" + "\n"
        enemy.con.f_con += "勝ち" + "\n"
    }
    */

    // 自分のベンチ番号を最後にする
    const bench = poke.myBench
    poke.myBench = 4
    for ( const _poke of getParty(poke) ) {
        if ( _poke.myBench > bench ) {
            _poke.myBench -= 1
        }
    }
}

// ポケモンを戦闘に出す
function summon( poke, position ) {
    // バトル場の位置、控えならnull
    poke.myPosition = position
    // 手持ちの一番前にする（イリュージョンのため）
    // バトルの初めは行わない処理
    const log = document.getElementById("log").value
    const turn = (log.match( /ターン目/g ) || []).length + 1
    if ( turn > 1 ) {
        const bench = poke.myBench
        poke.myBench = -1
        for ( const _poke of getParty(poke) ) {
            if ( _poke.myBench < bench ) {
                _poke.myBench += 1
            }
        }
    }
    // 場に出た時の効果
    poke.myCondition.myLanding = true
    // バトル場に画像
    for ( const _poke of pokeList ) {
        if ( poke.myName == _poke.name ) {
            document.getElementById(`${poke.myParty}_${poke.myPosition}_in_battle`).src = "poke_figure/" + _poke.number + ".gif"
        }
    }
    // HPバーの表示
    showHPbar(poke)

    // ワンダールーム状態なら防御と特防を入れ替える
    if ( fieldStatus.myWonder_room ) {
        [ poke.myDef, poke.mySp_def ] = [ poke.mySp_def, poke.myDef ]
    }

    /*
    let con = me["con" + n]
    removeText(me.f_con, "ひんし" + con.child)
    removeText(me.f_con, "選択中" + con.child)

    let num = con.com - 4

    // 各パラメータを記述
    for (const parameter of ["name", "sex", "level", "type", "ability", "item", "abnormal", "nature", "num", "full_HP", "last_HP", "A_AV", "B_AV", "C_AV", "D_AV", "S_AV", 
        "move_0", "move_1", "move_2", "move_3", "PP_0", "PP_1", "PP_2", "PP_3", "last_0", "last_1", "last_2", "last_3"]){
            con[parameter] = me["poke" + num][parameter]
        }
    for (const parameter of ["A_rank", "B_rank", "C_rank", "D_rank", "S_rank", "X_rank", "Y_rank"]){
        con[parameter] = 0
    }
    con.result = ""

    me["poke" + num].life = "戦闘中"

    for (let i = 0; i < 4; i++){
        if (me["poke" + i].life == "選択中" ) {
            me["poke" + i].life = "控え"
        }
    }

    // 特性『イリュージョン』
    if (con.ability == "イリュージョン" ) {
        let poke = ""
        for (let i = 0; i < 4; i++){
            if (team["poke" + i].life == "控え" ) {
                poke = i
            }
        }
        if (poke != "" ) {
            for (const parameter of ["name", "sex", "level", "type"]){
                con[parameter] = me["poke" + poke][parameter]
            }
            con.p_con += "特性『イリュージョン』：" + num + "\n"
        }
    }
    // 特性『ばけのかわ』
    if (con.ability == "ばけのかわ" && me["poke" + num].form == "" ) {
        me["poke" + num].form = "ばけたすがた"
    }
    if (me["poke" + num].form == "ばけたすがた" ) {
        con.p_con += "ばけたすがた" + "\n"
    } else if (me["poke" + num].form == "ばれたすがた" ) {
        con.p_con += "ばれたすがた" + "\n"
    }
    // 特性『はらぺこスイッチ』
    if (con.ability == "はらぺこスイッチ" ) {
        con.p_con += "まんぷくもよう" + "\n"
    }
    // 状態異常『ねむり』
    if (con.abnormal.includes("ねむり") || con.abnormal.includes("ねむる")){
        const turn = con.abnormal.slice(4)
        con.abnormal = "ねむり"
        con.p_con += "状態異常『ねむり』　" + turn + "\n"
    } else if (con.abnormal == "もうどく" ) {
        con.p_con += "状態異常『もうどく』　1ターン目" + "\n"
    }
    // バトンタッチの時、ランク変化を受け継ぐ
    for (let i = 0; i < con.p_con.split("\n").length; i++){
        if (con.p_con.split("\n")[i].includes("バトンタッチ")){
            const rank = con.p_con.split("\n")[i].slice(7).split("/")
            const para_rank = ["A_rank", "B_rank", "C_rank", "D_rank", "S_rank", "X_rank", "Y_rank"]
            for (let j = 0; j < 7; j++){
                con[para_rank[j]] = rank[j]
            }
        }
    }
    removeText(con.p_con, "バトンタッチ")
    // 特性「かがくへんかガス」のポケモンがいる時
    if (you.con0.ability == "かがくへんかガス" || you.con1.ability == "かがくへんかガス" ) {
        con.p_con += "特性『かがくへんかガス』：" + con.ability + "\n"
        con.ability = ""
    }

    // メガ進化、Z技、ダイマックスボタンの有効化
    //afn.specialButton(team)
    */

    writeLog( `${poke.myTN} は ${poke.myName} を 繰り出した !`)
}

// 戦闘に出す時の特性の発動 summon_poke
function onField() {
    let pokeLanding = []
    for ( const poke of allPokeInBattle() ) {
        if ( poke.myCondition.myLanding ) {
            pokeLanding.push(poke)
            poke.myCondition.myLanding = false
        }
    }
    const order = speedOrder(pokeLanding)

    // 1.かがくへんかガスの発動
    for ( const poke of order ) {
        neutralizingGas( poke )
    }
    // 2.きんちょうかん/じんばいったいの発動
    for ( const poke of order ) {
        unnerve( poke )
    }
    // 3.1~2.状態/ 3.特性/ 4.持ち物の発動
    for (const poke of order ) {
        actAbilityEtc( poke )
    }
    // 4.一部の特性(1)/場の状態による持ち物(2)/ゲンシカイキ(3)の発動
    for ( const poke of order ) {
        abilityToChangeForm( poke )
    }
    // 5.フラワーギフト/てんきや/アイスフェイス
    for ( const poke of order ) {
        weatherAbility( poke )
    }
    // 6.しろいハーブ
    for ( const poke of order ) {
        whiteHerb( poke )
    }
    // 7.だっしゅつパックによる交代、交代先の繰り出し
    for ( const poke of order ) {
        ejectPack( poke )
    }

    // すばやさが高い順に発動する。トリックルームの影響を受ける。
        // 6-2~3において、設置技や特性の効果できのみ/きのみジュース/シード系アイテム、アイスフェイスが発動する場合、他の処理より優先して即座に発動する。
        // 6-2において、設置技の効果でポケモンがひんしになった場合、6-3以降の特性の効果は発動しない。
        // ターン終了時、ひんしになったポケモンの代わりを繰り出す場合、2までお互いが完了してから3以降の処理に進む。入れ替えルールでポケモンを入れ替えるときも同じ。
        // バトルの途中、ポケモンを交代させたときは、上記全ての行動が終わってから他のポケモンの行動が行われる。
        // 複数のポケモンを同時に後出しする場合は、同時に場に出たとはみなされない。全ての手順を終えてから次の交代が行われる。
    
        // ゲンシカイキするときにひでり/あめふらしは発動しない。
}
