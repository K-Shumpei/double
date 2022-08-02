// 1.かがくへんかガスの発動
function landing_neutralizingGas( poke ) {
    if ( poke.myAbility != "かがくへんかガス" ) return
    if ( !isAbility(poke) ) return

    abilityDeclaration( poke )
    writeLog(`あたりに かがくへんかガスが 充満した !`)
}

// 2.きんちょうかん/じんばいったいの発動
function landing_unnerve( poke ) {
    if ( !isAbility(poke) ) return

    switch ( poke.myAbility ) {
        case "きんちょうかん":
            abilityDeclaration(poke)
            writeLog(`${getOppParty(poke)[0].myTN} のポケモンは 緊張して きのみが食べられなくなった !`)
            return

        case "じんばいったい":
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は ふたつの特性を合わせ持つ !`)
            writeLog(`${poke.myTN} の ${poke.myName} の 特性『きんちょうかん』 !`)
            writeLog(`${getOppParty(poke)[0].myTN} のポケモンは 緊張して きのみが食べられなくなった !`)
            return
            
        default:
            return
    }
}

// 3.1~2.状態/ 3.特性/ 4.持ち物の発動
function landing_other1st( poke ) {
    // 1.いやしのねがい/みかづきのまい/Zおきみやげ/Zすてゼリフによる回復
    landing_other1st_pray(poke)
    // 2.設置技: 技が使用された順に発動
    landing_other1st_establish(poke)
    // 3.場に出たときに発動する特性
    landing_other1st_ability(poke)
    // 4.ふうせん/きのみ/きのみジュース/メンタルハーブ
    landing_other1st_item(poke)
}

// 4.一部の特性(1)/場の状態による持ち物(2)/ゲンシカイキ(3)の発動
function landing_other2nd(poke){
    // 1.一部の特性
    landing_other2nd_ability(poke)
    // 2.場の状態による持ち物
    landing_other2nd_item(poke)
    // 3.ゲンシカイキ
    landing_other2nd_primalReversion(poke)
}

// 5.フラワーギフト/てんきや/アイスフェイス
function landing_weather(poke){
    // フラワーギフト
    landing_weather_flowerGift(poke)
    // てんきや
    landing_weather_forecast(poke)
    // アイスフェイス
    landing_weather_iceFace(poke)
}

// 6. しろいハーブ
function landing_whiteHerb(poke){
    if ( !isItem(poke) ) return
    if ( poke.myItem != "しろいハーブ" ) return

    let check = false
    for ( const para of allParameter() ) {
        if ( poke[`myRank_${para}`] < 0 ) {
            poke[`myRank_${para}`] = 0
            check = true
        }
    }
    if ( !check ) return

    writeLog(`${poke.myTN} の ${poke.myName} は しろいハーブで 下がった能力を元に戻した`)
    enableToRecycle(poke)
    return
}

// 7.だっしゅつパックによる交代、交代先の繰り出し
function landing_ejectPack(poke){
    return
    if ( poke.myItem == "だっしゅつパック" && con.p_con.includes("ランク下降")){
        writeLog(me, you, con.TN + "　の　" + con.name + "は　だっしゅつパックで手持ちに戻った" + "\n")
        me.f_con += "選択中（" + con.child + "）" + "\n"
        enableToRecycle(me, con)
        //come_back_pokemon(team)
    
        writeLog(me, you, con.TN + "　は　戦闘に出すポケモンを選んでください" + "\n")
        return true
    }
}



