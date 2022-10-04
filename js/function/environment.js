//**************************************************
// 天候
//**************************************************

// 天候展開
function activateWeather(poke, weather) {

    resetWeather()

    switch ( weather ) {
        case "あめ":
            fieldStatus.myRainy = 1
            writeLog(`雨が降り始めた`)

            if ( !isItem(poke) ) break
            if ( poke.myItem != "しめったいわ" ) break
            getMyField(poke).myWeather_long = true
            break

        case "にほんばれ":
            fieldStatus.mySunny = 1
            writeLog(`日差しが強くなった`)
            
            if ( !isItem(poke) ) break
            if ( poke.myItem != "あついいわ" ) break
            getMyField(poke).myWeather_long = true
            break

        case "すなあらし":
            fieldStatus.mySandstorm = 1
            writeLog(`砂嵐が吹き始めた`)
            
            if ( !isItem(poke) ) break
            if ( poke.myItem != "さらさらいわ" ) break
            getMyField(poke).myWeather_long = true
            break

        case "あられ":
            fieldStatus.myGraupel = 1
            writeLog(`あられが降り始めた`)
            
            if ( !isItem(poke) ) break
            if ( poke.myItem != "つめたいいわ" ) break
            getMyField(poke).myWeather_long = true
            break

        case "おおあめ":
            fieldStatus.myHeavy_rain = true
            writeLog(`雨がとても強くなった !`)
            break

        case "おおひでり":
            fieldStatus.myDrought = true
            writeLog(`日差しがとても強くなった !`)
            break

        case "らんきりゅう":
            fieldStatus.myTurbulence = true
            writeLog(`乱気流が発生した !`)
            break

    }

    // てんきや
    landing_weather_forecast(poke)
}

// 天候が有効であるかどうか
function isWeather(){
    for ( const poke of allPokeInBattle() ) {
        if ( !isAbility(poke) ) continue
        if ( poke.myAbility == "エアロック" ) return false
        if ( poke.myAbility == "ノーてんき" ) return false
    }
    return true
}

// 晴れ判定
function isSunny(poke){
    if ( !isWeather() ) return false
    if ( fieldStatus.mySunny ) return true
    if ( poke.myItem == "ばんのうがさ" && isItem(poke) ) return false
    return false
}

// 雨判定
function isRainy(poke){
    if ( !isWeather() ) return false
    if ( fieldStatus.myRainy ) return true
    if ( poke.myItem == "ばんのうがさ" && isItem(poke) ) return false
    return false
}

// 砂嵐判定
function isSandy(poke){
    if ( !isWeather() ) return false
    if ( fieldStatus.mySandstorm ) return true
    return false
}

// 霰判定
function isSnowy(poke){
    if ( !isWeather() ) return false
    if ( fieldStatus.myGraupel ) return true
    return false
}

// 天候リセット
function resetWeather() {
    fieldStatus.myRainy      = false // あめ
    fieldStatus.mySunny      = false // にほんばれ
    fieldStatus.mySandstorm  = false // すなあらし
    fieldStatus.myGraupel    = false // あられ

    myField.myWeather_long   = false // 持続ターン増加アイテム
    oppField.myWeather_long  = false // 持続ターン増加アイテム

    fieldStatus.myDrought    = false // おおひでり
    fieldStatus.myHeavy_rain = false // おおあめ
    fieldStatus.myTurbulence = false // らんきりゅう
}

//**************************************************
// フィールド
//**************************************************

// フィールド展開
function activateTerrain(poke, terrain) {

    resetTerrain()
    
    switch ( terrain ) {
        case "エレキ":
            fieldStatus.myElectric = 1
            writeLog(`足元に電気が駆け巡る`)
            break

        case "グラス":
            fieldStatus.myGrassy = 1
            writeLog(`足元に草が生い茂る`)
            break

        case "ミスト":
            fieldStatus.myMisty = 1
            writeLog(`足元に霧が広がった`)
            break
        
        case "サイコ":
            fieldStatus.myPsychic = 1
            writeLog(`足元に不思議な感じが広がった`)
            break

        default:
            return
    }

    if ( poke.myItem == "グランドコート" && isItem(poke) ) {
        getMyField(poke).myExtender = true
    }

    const order = speedOrder(allPokeInBattle())
    for ( const poke of order ) {
        landing_other2nd_seed( poke ) // シード系の持ち物
        //mimicry() // 特性『ぎたい』
    }
}

// フィールドリセット
function resetTerrain() {
    fieldStatus.myElectric = false // エレキフィールド
    fieldStatus.myGrassy   = false // グラスフィールド
    fieldStatus.myMisty    = false // ミストフィールド
    fieldStatus.myPsychic  = false // サイコフィールド
    myField.myExtender     = false // グランドコート
    oppField.myExtender    = false // グランドコート
}