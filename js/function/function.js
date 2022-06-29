function changeHP(poke, damage, pm) {
    if ( pm == "+" && !poke.myCondition.myHeal_block ) {
        poke.myRest_hp = Math.min(poke.myFull_hp, poke.myRest_hp + damage)
        writeLog(`${poke.myTN} の ${poke.myName} は ${damage} の HP を回復した`)
    }
    if ( pm == "-" && !( poke.myAbility == "マジックガード" && isAbility(poke) ) ) {
        writeLog(`${poke.myTN} の ${poke.myName} に ${damage} の ダメージ`)
        // con.p_con += "ダメおし" + "\n"
        poke.myRest_hp = Math.max(0, poke.myRest_hp - damage)
        eatBerryInPinch(poke)
    }
    // HPバーの表示
    showHPbar(poke)

    // ひんし宣言 
    if ( poke.myRest_hp == 0) toHand(poke)
}

function changeHPthroughMG(me, you, con, damage) {
    const user = isMe(me, you, con)
    writeLog(me, you, con.TN + "　の　" + con.name + "　に　" + damage + "　の　ダメージ" + "\n")
    con.p_con += "ダメおし" + "\n"
    con.last_HP = Math.max(0, con.last_HP - damage)
    user[0]["poke" + con.num].last_HP = con.last_HP
    
    if (con.last_HP > 0) eatBerryInPinch(me, you, con)
    if (con.last_HP == 0) toHand(me, con)
}

function changeRank(poke, parameter, change, spirit) {
    if ( poke.myAbility == "あまのじゃく" && isAbility(poke) ) change *= -1
    if ( poke.myAbility == "たんじゅん" && isAbility(poke) ) change *= 2

    let text = ""
    if ( parameter == "atk" )      text = "攻撃"
    if ( parameter == "def" )      text = "防御"
    if ( parameter == "sp_atk" )   text = "特攻"
    if ( parameter == "sp_def" )   text = "特防"
    if ( parameter == "speed" )    text = "素早さ"
    if ( parameter == "accuracy" ) text = "命中率"
    if ( parameter == "evasion" )  text = "回避率"

    // 特性によるランク下降の無効
    if ( change < 0 ) {
        if ( fieldStatus.myMist ) {
            writeLog(`${poke.myTN} の ${poke.myName} は 白い霧に 守られている !`)
            return false
        }
        if ( poke.myAbility == "しろいけむり" && isAbility(poke) ) {
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の ${text} は 下がらない !`)
            return false
        }
        if ( poke.myAbility == "クリアボディ" && isAbility(poke) ) {
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の ${text} は 下がらない !`)
            return false
        }
        if ( poke.myAbility == "メタルプロテクト" && isAbility(poke) ) {
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の ${text} は 下がらない !`)
            return false
        }
        if ( isFlowerVeil(poke) && poke.myType.includes("くさ") ) {
            abilityDeclaration(isFlowerVeil(poke))
            writeLog(`${poke.myTN} の ${poke.myName} の ${text} は 下がらない !`)
            return false
        }
        //if (con.ability == "ミラーアーマー" && isAbility(me, con)) return false
        if ( parameter == "atk" && poke.myAbility == "かいりきバサミ" && isAbility(poke) ) {
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の ${text} は 下がらない !`)
            return false
        }
        if ( parameter == "def" && poke.myAbility == "はとむね" && isAbility(poke) ) {
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の ${text} は 下がらない !`)
            return false
        }
        if ( parameter == "accuracy" && poke.myAbility == "するどいめ" && isAbility(poke) ) {
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} の ${text} は 下がらない !`)
            return false
        }
    }

    const now = poke[`myRank_${parameter}`]
    let result = now + change
    if (result > 6) result = 6 
    if (result < -6) result = -6
    poke[`myRank_${parameter}`] = result

    if ( change > 0 ) {
        if ( result - now > 0 ) poke.myCondition.myRank_up = true
        if ( result - now == 0 ) {
            writeLog(`${poke.myName} の ${text} は もう 上がらない`)
            return false
        }
        if ( result - now == 1 ) writeLog(`${poke.myName} の ${text} が 上がった !`)
        if ( result - now == 2 ) writeLog(`${poke.myName} の ${text} が ぐーんと上がった !`)
        if ( result - now >= 3 ) writeLog(`${poke.myName} の ${text} が ぐぐーんと上がった !`)
    }
    if ( change < 0 ) {
        if ( result - now < 0 ) poke.myCondition.myRank_down = true
        if ( result - now == 0 ) {
            writeLog(`${poke.myName} の ${text} は もう 下がらない`)
            return false
        }
        if ( result - now == -1 ) writeLog(`${poke.myName} の ${text} が 下がった !`)
        if ( result - now == -2 ) writeLog(`${poke.myName} の ${text} が がくっと下がった !`)
        if ( result - now <= -3 ) writeLog(`${poke.myName} の ${text} が がくーんと下がった !`)
    }

    // かちき・まけんき発動条件を満たしていなければ終了
    if ( !spirit || result - now >= 0 ) return

    if ( poke.myAbility == "かちき" && isAbility(poke) ) {
        abilityDeclaration(poke)
        changeMyRank(poke, "sp_atk", 2)
    }
    if ( poke.myAbility == "まけんき" && isAbility(poke) ) {
        abilityDeclaration(poke)
        changeMyRank(poke, "atk", 2)
    }
}

// 対象が自分であるランクを変化させる変化技
// 能力ダウンは特性で防げない
// かちき・まけんきは発動しない
function changeMyRank(poke, parameter, change) {
    if ( poke.myAbility == "あまのじゃく" && isAbility(poke) ) change *= -1
    if ( poke.myAbility == "たんじゅん" && isAbility(poke) ) change *= 2

    let text = ""
    if ( parameter == "atk" )      text = "攻撃"
    if ( parameter == "def" )      text = "防御"
    if ( parameter == "sp_atk" )   text = "特攻"
    if ( parameter == "sp_def" )   text = "特防"
    if ( parameter == "speed" )    text = "素早さ"
    if ( parameter == "accuracy" ) text = "命中率"
    if ( parameter == "evasion" )  text = "回避率"

    const now = poke[`myRank_${parameter}`]
    let result = now + change
    if ( result > 6 ) result = 6 
    if ( result < -6 ) result = -6
    poke[`myRank_${parameter}`] = result

    if ( change > 0 ) {
        if ( result - now == 0 ) {
            writeLog(`${poke.myName} の ${text} は もう 上がらない`)
            return false
        }
        poke.myCondition.myRank_up = true
        if ( result - now == 1 ) writeLog(`${poke.myName} の ${text} が 上がった !`)
        if ( result - now == 2 ) writeLog(`${poke.myName} の ${text} が ぐーんと上がった !`)
        if ( result - now >= 3 ) writeLog(`${poke.myName} の ${text} が ぐぐーんと上がった !`)
    }
    if ( change < 0 ) {
        if ( result - now == 0 ) {
            writeLog(`${poke.myName} の ${text} は もう 下がらない`)
            return false
        }
        poke.myCondition.myRank_down = true
        if ( result - now == -1 ) writeLog(`${poke.myName} の ${text} が 下がった !`)
        if ( result - now == -2 ) writeLog(`${poke.myName} の ${text} が がくっと下がった !`)
        if ( result - now <= -3 ) writeLog(`${poke.myName} の ${text} が がくーんと下がった !`)
    }
}

function getAbnormal(poke, ailment) {
    if ( poke.myRest_hp == 0 ) return // ひんし状態でないこと

    if ( fieldStatus.myMisty && onGround(poke)) {
        writeLog(`${poke.myTN} の ${poke.myName} は ミストフィールドに 守られている !`)
        return
    }

    if ( ailment == "こんらん" ) {
        if ( poke.myCondition.myConfusion ) return
        if ( poke.myAbility == "マイペース" && isAbility(poke) ) {
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は こんらんしない !`)
            return
        }
        poke.myCondition.myConfusion = 1
        writeLog(`${poke.myTN} の ${poke.myName} は こんらんした !`)
    }
    
    if ( poke.myAilment ) return // すでに状態異常になっている

    if ( poke.myAbility == "ぜったいねむり" && isAbility(poke) ) {
        abilityDeclaration(poke)
        writeLog(`${poke.myTN} の ${poke.myName} は ${ailment}にならない !`)
        return
    }
    if ( poke.myAbility == "リーフガード" && isAbility(poke) && isSunny(poke) ) {
        abilityDeclaration(poke)
        writeLog(`${poke.myTN} の ${poke.myName} は ${ailment}にならない !`)
        return
    }
    if ( isFlowerVeil(poke) && poke.myType.includes("くさ") ) {
        abilityDeclaration(isFlowerVeil(poke))
        writeLog(`${poke.myTN} の ${poke.myName} は ${ailment}にならない !`)
        return
    }
    if ( poke.myCondition.myShields_down && isAbility(poke) ) {
        abilityDeclaration(poke)
        writeLog(`${poke.myTN} の ${poke.myName} は ${ailment}にならない !`)
        return
    }
        
    if ( ailment == "まひ" ) {
        if ( poke.myType.includes("でんき") ) return
        if ( poke.myAbility == "じゅうなん" && isAbility(poke) ) {
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は ${ailment}にならない !`)
            return
        }
        poke.myAilment = "まひ"
        writeLog(`${poke.myTN} の ${poke.myName} は しびれて 技が出にくくなった !`)
    }
    if ( ailment == "どく" || ailment == "もうどく" ) {
        /*
        if (corrosion == undefined) {
            if (con.type.includes("どく") || con.type.includes("はがね")) return
        } else {
            const user = isMe(me, you, corrosion)
            if (con.type.includes("どく") || con.type.includes("はがね")) {
                if (!(corrosion.ability == "ふしょく" && isAbility(user[0], corrosion))) return
            }
        }
        */
        if ( poke.myAbility == "めんえき" && isAbility(poke) ) {
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は ${ailment}にならない !`)
            return
        }
        if ( isPastelVeil(poke) ) {
            abilityDeclaration(isPastelVeil(poke))
            writeLog(`${poke.myTN} の ${poke.myName} は ${ailment}にならない !`)
            return
        }
        poke.myAilment = "どく"
        if ( ailment == "もうどく" ) poke.myBad_poison = 1
        writeLog(`${poke.myTN} の ${poke.myName} は ${ailment} をあびた !`)
    }
    if ( ailment == "やけど" ) {
        if ( poke.myType.includes("ほのお") ) return
        if ( ( poke.myAbility == "みずのベール" || poke.myAbility == "すいほう" ) && isAbility(poke) ) {
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は ${ailment}にならない !`)
            return
        }
        poke.myAilment = "やけど"
        writeLog(`${poke.myTN} の ${poke.myName} は やけどをおった !`)
    }
    if ( ailment == "こおり" ) {
        if ( isSunny(poke) ) return // 晴れていたら凍らない
        if ( poke.myAbility == "マグマのよろい" && isAbility(poke) ) {
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は ${ailment}にならない !`)
            return
        }
        cpoke.myAilment = "こおり"
        writeLog(`${poke.myTN} の ${poke.myName} は こおりづけになった !`)
    }
    if ( ailment == "ねむり" ) {
        if ( isUproar() ) return // 騒いでいたら眠らない
        if ( fieldStatus.myElectric && onGround(poke) ) {
            writeLog(`${poke.myTN} の ${poke.myName} は エレキフィールドに 守られている !`)
            return
        }
        if ( ( poke.myAbility == "スイートベール" || poke.myAbility == "やるき" || poke.myAbility == "ふみん" ) && isAbility(poke)) {
            abilityDeclaration(poke)
            writeLog(`${poke.myTN} の ${poke.myName} は ${ailment}にならない !`)
            return
        }
        poke.myAilment = "ねむり"
        const sleep = Math.floor(getRandom() * 3 + 2)
        poke.myAsleep_turn = sleep // 眠りから覚めるターン数
        poke.myAsleep = 1 // ねむり経過ターン数
        writeLog(`${poke.myTN} の ${poke.myName} は ねむってしまった !`)
    }
    eatBerryInAbnormal(poke)
}

function psychoShift(tgt, ailment) {
    // どく/もうどく/ねむり/まひ/やけど について、耐性を持つタイプ・特性であれば失敗する

    if ( tgt.myAbility == "ぜったいねむり" && isAbility(tgt) ) return true
    if ( tgt.myAbility == "リーフガード" && isAbility(tgt) && isSunny(tgt) ) return true
    if ( tgt.myType.includes("くさ") && isFlowerVeil(tgt)) return true
    if ( tgt.myCondition.myShields_down && isAbility(tgt) ) return true
        
    if ( ailment == "まひ" ) {
        if ( tgt.myType.includes("でんき") ) return true
        if ( tgt.myAbility == "じゅうなん" && isAbility(tgt) ) return true
    }
    if ( ailment == "どく" || ailment == "もうどく" ) {
        if ( tgt.myType.includes("どく") ) return true
        if ( tgt.myType.includes("はがね") ) return true
        if ( tgt.myAbility == "めんえき" && isAbility(tgt) ) return true
        if ( isPastelVeil(tgt) ) return true
    }
    if ( ailment == "やけど") {
        if ( tgt.myType.includes("ほのお") ) return true
        if ( tgt.myAbility == "みずのベール" && isAbility(tgt) ) return true
        if ( tgt.myAbility == "すいほう" && isAbility(tgt) ) return true
    }
    if ( ailment == "ねむり") {
        if ( isSweetVeil(tgt) ) return true
        if ( tgt.myAbility == "やるき" && isAbility(tgt) ) return true
        if ( tgt.myAbility == "ふみん" && isAbility(tgt) ) return true
    }

    return false
}

function eatBerryInPinch(poke) {
    if ( poke.myRest_hp == 0 ) return // ひんし状態でない
    if ( !isItem(poke) )       return // 持ち物が有効
    // きのみジュースはきのみではない
    if ( poke.myRest_hp <= poke.myFull_hp / 2 && poke.myItem == "きのみジュース" ) {
        itemDeclaration(poke)
        changeHP(poke, 20, "+")
        enableToRecycle(poke)
        return
    }

    if ( isUnnerve(poke) ) return // きんちょうかん

    let eatLog = false
    if ( poke.myRest_hp <= poke.myFull_HP / 2 ) {
        if ( poke.myItem == "オレンのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            changeHP(poke, 10 * isRipen(poke), "+")
        }
        if ( poke.myItem == "オボンのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            changeHP(poke, Math.floor(poke.myFull_hp * isRipen(poke) * isDynamax(poke) / 4), "+")
        }
    }

    if ( poke.myRest_hp <= poke.myFull_hp / isGluttony(poke) ) {
        if ( poke.myItem == "フィラのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            changeHP(poke, Math.floor(poke.myFull_hp * isRipen(poke) * isDynamax(poke) / 3), "+")
            if ( poke.myNature == "ずぶとい" || poke.myNature == "ひかえめ" || poke.myNature == "おだやか" || poke.myNature == "おくびょう" ) {
                getAbnormal(poke, "こんらん")
            }
        }
        if ( poke.myItem == "イアのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            changeHP(poke, Math.floor(poke.myFull_hp * isRipen(poke) * isDynamax(poke) / 3), "+")
            if ( poke.myNature == "さみしがり" || poke.myNature == "おっとり" || poke.myNature == "おとなしい" || poke.myNature == "せっかち" ) {
                getAbnormal(poke, "こんらん")
            }
        }
        if ( poke.myItem == "ウイのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            changeHP(poke, Math.floor(poke.myFull_hp * isRipen(poke) * isDynamax(poke) / 3), "+")
            if ( poke.myNature == "いじっぱり" || poke.myNature == "わんぱく" || poke.myNature == "しんちょう" || poke.myNature == "ようき" ) {
                getAbnormal(poke, "こんらん")
            }
        }
        if ( poke.myItem == "バンジのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            changeHP(poke, Math.floor(poke.myFull_hp * isRipen(poke) * isDynamax(poke) / 3), "+")
            if ( poke.myNature == "やんちゃ" || poke.myNature == "のうてんき" || poke.myNature == "うっかりや" || poke.myNature == "むじゃき" ) {
                getAbnormal(poke, "こんらん")
            }
        }
        if ( poke.myItem == "マゴのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            changeHP(poke, Math.floor(poke.myFull_hp * isRipen(poke) * isDynamax(poke) / 3), "+")
            if ( poke.myNature == "ゆうかん" || poke.myNature == "のんき" || poke.myNature == "うれいせい" || poke.myNature == "なまいき" ) {
                getAbnormal(poke, "こんらん")
            }
        }
        if ( poke.myItem == "チイラのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            changeMyRank(poke, "atk", isRipen(poke))
        }
        if ( poke.myItem == "リュガのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            changeMyRank(poke, "def", isRipen(poke))
        }
        if ( poke.myItem == "ヤタピのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            changeMyRank(poke, "sp_atk", isRipen(poke))
        }
        if ( poke.myItem == "ズアのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            changeMyRank(poke, "sp_def", isRipen(poke))
        }
        if ( poke.myItem == "カムラのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            changeMyRank(poke, "speed", isRipen(poke))
        }
        if ( poke.myItem == "サンのみ" && !poke.myCondition.myCritical ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            poke.myCondition.myCritical = true
            writeLog(`${poke.myTN} の ${poke.myName} は 張り切り出した !`)
        }
        if ( poke.myItem == "スターのみ" ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            const parameter = shuffle(["atk", "def", "sp_atk", "sp_def", "speed"])[0]
            changeRank(poke, parameter, 2 * isRipen(poke))
        }
        if ( poke.myItem == "ミクルのみ" && !poke.myCondition.myMicle ) {
            eatLog = true
            writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem} を食べた !`)
            poke.myCondition.myMicle = 1
            writeLog(`${poke.myTN} の ${poke.myName} は 命中率が上がった !`)
        }
    }

    if ( eatLog ) enableToRecycle(poke)
}

function eatBerryInAbnormal(poke) {
    if ( poke.myRest_hp == 0 ) return // ひんし状態でない
    if ( isUnnerve(poke) )     return // きんちょうかん
    if ( !isItem(poke) )       return // 持ち物が有効

    let eatLog = false
    if ( poke.myItem == "チーゴのみ" && poke.myAilment == "やけど" ) eatLog = true
    if ( poke.myItem == "モモンのみ" && poke.myAilment == "どく" ) eatLog = true
    if ( poke.myItem == "モモンのみ" && poke.myAilment == "もうどく" ) eatLog = true
    if ( poke.myItem == "クラボのみ" && poke.myAilment == "まひ" ) eatLog = true
    if ( poke.myItem == "カゴのみ" && poke.myAilment == "ねむり" ) eatLog = true
    if ( poke.myItem == "ナナシのみ" && poke.myAilment == "こおり" ) eatLog = true

    if ( eatLog ) {
        writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem}を 食べて ${poke.myAilment}が治った !`)
        resetAilment(poke)
    }

    if ( poke.myItem == "キーのみ" && poke.myCondition.myConfusion ) {
        eatLog = true
        writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem}を 食べて こんらんが解けた !`)
        poke.myCondition.myConfusion = false
    }

    if ( poke.myItem == "ラムのみ" && ( poke.myAilment || poke.myCondition.myConfusion ) ) {
        eatLog = true
        writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem}を 食べて 元気になった !`)
        poke.myCondition.myConfusion = false
        resetAilment(poke)
    }

    if ( eatLog ) enableToRecycle(poke)
}

function eatBerryImmediately(poke) {
    if ( berryList.includes(poke.myItem) ) return // きのみを持っていること

    writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myItem}を 食べた !`)

    let eatLog = false

    if ( poke.myItem == "チーゴのみ" && poke.myAilment == "やけど" ) eatLog = true
    if ( poke.myItem == "モモンのみ" && poke.myAilment == "どく" ) eatLog = true
    if ( poke.myItem == "モモンのみ" && poke.myAilment == "もうどく" ) eatLog = true
    if ( poke.myItem == "クラボのみ" && poke.myAilment == "まひ" ) eatLog = true
    if ( poke.myItem == "カゴのみ" && poke.myAilment == "ねむり" ) eatLog = true
    if ( poke.myItem == "ナナシのみ" && poke.myAilment == "こおり" ) eatLog = true

    if ( eatLog ) {
        writeLog(`${poke.myTN} の ${poke.myName} は ${poke.myAilment}が治った !`)
        resetAilment(poke)
    }

    if ( poke.myItem == "オレンのみ" ) {
        changeHP(poke, 10 * isRipen(poke), "+")
    }
    if ( poke.myItem == "オボンのみ" || poke.myItem == "ナゾのみ" ) {
        const damage = Math.floor(poke.myFull_hp * isRipen(poke) / 4 * isDynamax(poke))
        changeHP(poke, damage, "+")
    }

    if ( poke.myItem == "ヒメリのみ" ) {
        for ( let i = 0; i < 4; i++ ) {
            if ( poke[`myRest_pp_${i}`] < poke[`myFull_pp_${i}`] ) {
                poke[`myRest_pp_${i}`] = Math.min(poke[`myFull_pp_${i}`], poke[`myRest_pp_${i}`] + isRipen(poke) * 10)
                writeLog(`${poke.myTN} の ${poke.myName} は ${poke[`myMove_${i}`]}の PPを回復した`)
                break
            }
        }
    }
    if ( poke.myItem == "キーのみ" && poke.myCondition.myConfusion ) {
        poke.myCondition.myConfusion = false
        writeLog(`${poke.myTN} の ${poke.myName} は こんらんが解けた !`)
    }
    if ( poke.myItem== "ラムのみ" && ( !poke.myAilment || poke.myCondition.myConfusio ) ) {
        resetAilment(poke)
        poke.myCondition.myConfusion = false
        writeLog(`${poke.myTN} の ${poke.myName} の 状態異常が治った !`)
    }
    if ( poke.myItem == "フィラのみ" ) {
        changeHP(poke, Math.floor(poke.myFull_hp * isRipen(poke) / 3), "+")
        if ( poke.myNature == "ずぶとい" || poke.myNature == "ひかえめ" || poke.myNature == "おだやか" || poke.myNature == "おくびょう" ) {
            getAbnormal(poke, "こんらん")
        }
    }
    if ( poke.myItem == "イアのみ" ) {
        changeHP(poke, Math.floor(poke.myFull_hp * isRipen(poke) / 3), "+")
        if ( poke.myNature == "さみしがり" || poke.myNature == "おっとり" || poke.myNature == "おとなしい" || poke.myNature == "せっかち" ) {
            getAbnormal(poke, "こんらん")
        }
    }
    if ( poke.myItem == "ウイのみ" ) {
        changeHP(poke, Math.floor(poke.myFull_hp * isRipen(poke) / 3), "+")
        if ( poke.myNature == "いじっぱり" || poke.myNature == "わんぱく" || poke.myNature == "しんちょう" || poke.myNature == "ようき" ) {
            getAbnormal(poke, "こんらん")
        }
    }
    if ( poke.myItem == "バンジのみ" ) {
        changeHP(poke, Math.floor(poke.myFull_hp * isRipen(poke) / 3), "+")
        if ( poke.myNature == "やんちゃ" || poke.myNature == "のうてんき" || poke.myNature == "うっかりや" || poke.myNature == "むじゃき" ) {
            getAbnormal(poke, "こんらん")
        }
    }
    if ( poke.myItem == "マゴのみ" ) {
        changeHP(poke, Math.floor(poke.myFull_hp * isRipen(poke) / 3), "+")
        if ( poke.myNature == "ゆうかん" || poke.myNature == "のんき" || poke.myNature == "れいせい" || poke.myNature == "なまいき" ) {
            getAbnormal(poke, "こんらん")
        }
    }
    if ( poke.myItem == "チイラのみ" ) {
        changeMyRank(poke, "atk", isRipen(poke))
    }
    if ( poke.myItem == "リュガのみ" || poke.myItem == "アッキのみ" ) {
        changeMyRank(poke, "def", isRipen(poke))
    }
    if ( poke.myItem == "ヤタピのみ" ) {
        changeMyRank(poke, "sp_atk", isRipen(poke))
    }
    if ( poke.myItem == "ズアのみ" || poke.myItem == "タラプのみ" ) {
        changeMyRank(poke, "sp_def", isRipen(poke))
    }
    if ( poke.myItem == "カムラのみ" ) {
        changeMyRank(poke, "speed", isRipen(poke))
    }
    if ( poke.myItem == "サンのみ" && !poke.myCondition.myCritical ) {
        poke.myCondition.myCritical = true
        writeLog(`${poke.myTN} の ${poke.myName} は 張り切り出した !`)
    }
    if ( poke.myItem == "スターのみ" ) {
        const parameter = shuffle(["atk", "def", "sp_atk", "sp_def", "speed"])[0]
        changeMyRank(poke, parameter, 2 * isRipen(poke))
    }
    if ( poke.myItem == "ミクルのみ" && !poke.myCondition.myMicle ) {
        poke.myCondition.myMicle = true
        writeLog(`${poke.myTN} の ${poke.myName} は 命中率が上がった !`)
    }

    // きのみを食べた時の効果
    enableToRecycle(poke) // リサイクルが使えるようになる
}

// フォルムチェンジ
function formChange(poke, name, declaration) {
    // フォルムチェンジ先のポケモン
    const next = pokeSearch(name)
    if ( declaration ) writeLog(`${poke.myTN} の ${poke.myName} は ${next.name} に なった !`)

    const rate = natureRate(poke.myNature)

    // 実数値の書き換え
    for ( const para of ["Atk", "Def", "Sp_atk", "Sp_def", "Speed"] ) {
        const BS = next[para]
        const IV = poke[`my${para}_iv`]
        const EV = poke[`my${para}_ev`]
        console.log(BS)
        console.log(IV)
        console.log(EV)
        poke[`my${para}`] = Math.floor((Math.floor(((BS*2 + IV + Math.floor(EV/4)) * poke.myLevel)/100) + 5) * rate[para])
        console.log(poke[`my${para}`])
        poke[`my${para}_org`] = poke[`my${para}`]
    }

    // H実数値の書き換え
    if ( next.name == "ジガルデ(パーフェクトフォルム)" ) {
        const dif_H = 216 - pokeSearch(poke.Name).hp
        poke.myFull_hp += Math.floor(dif_H * 2 * poke.myLevel / 100)
        poke.myRest_hp += Math.floor(dif_H * 2 * poke.myLevel / 100)
    }

    // 名前の書き換え
    poke.myName = next.name
    // 特性の書き換え
    if ( poke.myName.includes("ヒヒダルマ")) poke.myAbility = "ダルマモード"
    else poke.myAbility = next.ability[0]
    poke.myAbility_org  = poke.myAbility
    // タイプの書き換え
    poke.myType     = next.type
    poke.myType_org = [].concat(poke.myType)

    // 特性の発動
    activateAbility(poke)
}

function selectedMove(poke) {
    const move_name = poke[`myMove_${poke.myCmd_move}`]

    let move_org = "" // 技の元データを代入

    if ( poke.myCondition.myThrash_move ) move_org = moveSearchByName(poke.myCondition.myThrash_move) // あばれる状態
    if ( poke.myCondition.myFilling )     move_org = moveSearchByName(poke.myCondition.myFilling)     // ため技
    if ( poke.myCondition.myCant_move )   move_org = moveSearchByName(poke.myCondition.myCant_move)   // 反動で動けない
    if ( poke.myCondition.myEncore_move ) move_org = moveSearchByName(poke.myCondition.myEncore_move) // あばれる状態
    if ( poke.myCondition.myIce_ball )    move_org = moveSearchByName("アイスボール")
    if ( poke.myCondition.myRoll_out )    move_org = moveSearchByName("ころがる")
    if ( poke.myCondition.myBide_turn )   move_org = moveSearchByName("がまん")
    if ( poke.myCondition.myUproar )      move_org = moveSearchByName("さわぐ")
    if ( poke.myCondition.myStruggle )    move_org = moveSearchByName("わるあがき")

    if ( move_org == "" ) {
        move_org = moveSearchByName(move_name)
        /*
        if (move_name.includes("Z")) {
            move = moveSearchByName(move_name.replace("Z", "")).concat()
            move.name = move_name
        } else {

        }
        */
    }

    // ディープコピー
    const move = Object.assign({}, move_org)

    poke.myMove = moveConfig(poke, move)
}

// 技の初期設定
function moveConfig(poke, move) {
    move.continuous = 1 // 攻撃回数

    if ( poke.myAbility == "えんかく" && move.nature != "変化") move.direct = "間接"
    if ( move.name == "ワイドフォース" && fieldStatus.myPsychic ) move.target = "相手全体"
    if ( move.name == "みずしゅりけん" && poke.myName == "ゲッコウガ(サトシゲッコウガ)") move.power = 20
    if ( move.name == "のろい" ) {
        if ( poke.myType.includes("ゴースト") ) move.target = "1体選択"
        else move.target = "自分"
    }

    return move
}

// ダイマックス技の効果
function dynamaxMoveEffect(me, you, con, move) {
    if (move.name == "ダイナックル") {
        changeRank(me, you, con, "A", 1, 100, move, true)
    } else if (move.name == "ダイスチル") {
        changeRank(me, you, con, "B", 1, 100, move, true)
    } else if (move.name == "ダイアシッド") {
        changeRank(me, you, con, "C", 1, 100, move, true)
    } else if (move.name == "ダイアース") {
        changeRank(me, you, con, "D", 1, 100, move, true)
    } else if (move.name == "ダイジェット") {
        changeRank(me, you, con, "S", 1, 100, move, true)
    } else if (move.name == "ダイドラグーン" && tgt.last_HP > 0) {
        afn.rankChange(def, atk, "A", -1, 100, move, true)
    } else if (move.name == "ダイホロウ" && tgt.last_HP > 0) {
        afn.rankChange(def, atk, "B", -1, 100, move, true)
    } else if (move.name == "ダイワーム" && tgt.last_HP > 0) {
        afn.rankChange(def, atk, "C", -1, 100, move, true)
    } else if (move.name == "ダイアーク" && tgt.last_HP > 0) {
        afn.rankChange(def, atk, "D", -1, 100, move, true)
    } else if (move.name == "ダイアタック" && tgt.last_HP > 0) {
        afn.rankChange(def, atk, "S", -1, 100, move, true)
    } else if (move.name == "ダイバーン" && !con.f_con.includes("にほんばれ")) {
        bfn.allFieldStatus(me, you, con, cfn.moveSearchByName("にほんばれ"))
    } else if (move.name == "ダイストリーム" && !con.f_con.includes("あめ")) {
        bfn.allFieldStatus(me, you, con, cfn.moveSearchByName("あまごい"))
    } else if (move.name == "ダイロック" && !con.f_con.includes("すなあらし")) {
        bfn.allFieldStatus(me, you, con, cfn.moveSearchByName("すなあらし"))
    } else if (move.name == "ダイアイス" && !con.f_con.includes("あられ")) {
        bfn.allFieldStatus(me, you, con, cfn.moveSearchByName("あられ"))
    } else if (move.name == "ダイサンダー" && !con.f_con.includes("エレキフィールド")) {
        bfn.allFieldStatus(me, you, con, cfn.moveSearchByName("エレキフィールド"))
    } else if (move.name == "ダイソウゲン" && !con.f_con.includes("グラスフィールド")) {
        bfn.allFieldStatus(me, you, con, cfn.moveSearchByName("グラスフィールド"))
    } else if (move.name == "ダイサイコ" && !con.f_con.includes("サイコフィールド")) {
        bfn.allFieldStatus(me, you, con, cfn.moveSearchByName("サイコフィールド"))
    } else if (move.name == "ダイフェアリー" && !con.f_con.includes("ミストフィールド")) {
        bfn.allFieldStatus(me, you, con, cfn.moveSearchByName("ミストフィールド"))
    } else if (move.name == "キョダイカンデン" && tgt.last_HP > 0) {
        if (getRandom() < 0.5) {
            getAbnormal(me, you, con, "まひ", 100, move)
        } else {
            getAbnormal(me, you, con, "どく", 100, move)
        }
    } else if (move.name == "キョダイカンロ") {
        if (con.abnormal != "") {
            writeLog(me, you, con.TM + "　の　" + con.name + "　の　状態異常が治った" + "\n")
            con.abnormal = ""
        }
    } else if (move.name == "キョダイガンジン" && !tgt.f_con.includes("ステルスロック")) {
        tgt.f_con += "ステルスロック" + "\n"
        writeLog(me, you, tgt.TN + "　の場に尖った石が漂い始めた" + "\n")
    } else if (move.name == "キョダイゲンエイ" && !tgt.p_con.includes("逃げられない") && !tgt.type.includes("ゴースト")) {
        tgt.p_con += "逃げられない" + "\n"
        writeLog(me, you, tgt.TN + "　の　" + tgt.name + "　は　逃げられなくなった" + "\n")
    } else if (move.name == "キョダイゲンスイ" &&  tgt.used != "" && tgt.last_HP > 0) {
        for (let i = 0; i < 4; i++) {
            if (def.con["move_" + i] == tgt.used && def.con["last_" + i] > 0) {
                writeLog(me, you, tgt.TN + "　の　" + tgt.name + "の　" + tgt.used + "　の　PPが減った" + "\n")
                def.con["last_" + i] = Math.max(def.con["last_" + i] - 2, 0)
            }
        }
    } else if (move.name == "キョダイコウジン" && !tgt.f_con.includes("キョダイコウジン")) {
        tgt.f_con += "キョダイコウジン" + "\n"
        writeLog(me, you, tgt.TN + "　の　の場に尖った鉄が漂い始めた" + "\n")
    } else if (move.name == "キョダイコバン" && tgt.last_HP > 0) {
        getAbnormal(me, you, con, "こんらん", 100, move)
    } else if (move.name == "キョダイコワク" && tgt.last_HP > 0) {
        if (getRandom() < 1 / 3) {
            getAbnormal(me, you, con, "まひ", 100, move)
        } else if (getRandom() < 1 / 2) {
            getAbnormal(me, you, con, "どく", 100, move)
        } else {
            getAbnormal(me, you, con, "ねむり", 100, move)
        }
    } else if (move.name == "キョダイサイセイ" && con.item == "" && itemEff.berryList().includes(atk["poke" + cfn.battleNum(atk)].recycle) && getRandom()) {
        con.item = atk["poke" + cfn.battleNum(atk)].recycle
        atk["poke" + cfn.battleNum(atk)].recycle = ""
        writeLog(me, you, con.TN + "　の　" + con.name + "　は　" + con.item + "　を　拾ってきた" + "\n")
    } else if (move.name == "キョダイサンゲキ" && tgt.last_HP > 0) {
        afn.rankChange(def, atk, "Y", -1, 100, move, true)
    } else if (move.name == "キョダイシュウキ" && tgt.last_HP > 0) {
        getAbnormal(me, you, con, "どく", 100, move)
    } else if (move.name == "キョダイシンゲキ") {
        writeLog(me, you, con.TN + "　の　" + con.name + "　は　張り切っている!" + "\n")
        if (!con.p_con.includes("キョダイシンゲキ")) {
            con.p_con += "キョダイシンゲキ　+1"
        } else {
            let list = con.p_con.split("\n")
            for (let i = 0; i < list.length; i++) {
                if (list[i] == "キョダイシンゲキ　+1") {
                    list[i] = "キョダイシンゲキ　+2"
                } else if (list[i] == "キョダイシンゲキ　+2") {
                    list[i] = "キョダイシンゲキ　+3"
                }
            }
            con.p_con = list.join("\n")
        }
    } else if (move.name == "キョダイスイマ" && !tgt.p_con.includes("ねむけ") && getRandom() < 0.5 && tgt.last_HP > 0) {
        writeLog(me, you, tgt.TN + "　の　" + tgt.name + "　は　眠気を誘われた" + "\n")
        tgt.p_con += "ねむけ　宣言ターン" + "\n"
    } else if (move.name == "キョダイセンリツ" && !con.f_con.includes("オーロラベール")) {
        writeLog(me, you, con.TN + "　の　場にオーロラベールが現れた!" + "\n")
        if (con.item == "ひかりのねんど") {
            con.p_con += "オーロラベール　8/8" + "\n"
        } else {
            con.p_con += "オーロラベール　5/5" + "\n"
        }
    } else if (move.name == "キョダイダンエン") {
        changeHP(me, you, con, Math.floor(con.full_HP / 6), "+", move)
    } else if (move.name == "キョダイテンドウ" && !con.f_con.includes("じゅうりょく")) {
        writeLog(me, you, "重力が強くなった!" + "\n")
        con.f_con += "じゅうりょく　5/5" + "\n"
        tgt.f_con += "じゅうりょく　5/5" + "\n"
    } else if (move.name == "キョダイテンバツ" && tgt.last_HP > 0) {
        getAbnormal(me, you, con, "こんらん", 100, move)
    } else if (move.name == "キョダイバンライ" && tgt.last_HP > 0) {
        getAbnormal(me, you, con, "まひ", 100, move)
    } else if (move.name == "キョダイフウゲキ") {
        writeLog(me, you, "お互いの場のものが飛び去った" + "\n")
        cfn.conditionRemove(def.con, "field", "しろいきり")
        cfn.conditionRemove(def.con, "field", "しんぴのまもり")
        cfn.conditionRemove(def.con, "field", "リフレクター")
        cfn.conditionRemove(def.con, "field", "ひかりのかべ")
        cfn.conditionRemove(def.con, "field", "オーロラベール")
        for (const team of [atk, def]) {
            cfn.conditionRemove(team.con, "field", "まきびし")
            cfn.conditionRemove(team.con, "field", "どくびし")
            cfn.conditionRemove(team.con, "field", "ステルスロック")
            cfn.conditionRemove(team.con, "field", "ねばねばネット")
            cfn.conditionRemove(team.con, "field", "キョダイコウジン")
            cfn.conditionRemove(team.con, "field", "フィールド")
        }

    } else if (move.name == "キョダイホーヨー" && !tgt.p_con.includes("メロメロ") && tgt.last_HP > 0 && ((con.sex == " ♂ " && tgt.sex == " ♀ ") || (con.sex == " ♀ " && tgt.sex == " ♂ "))) {
        writeLog(me, you, tgt.TN + "　の　" + tgt.name + "　は　メロメロになった" + "\n")
        tgt.p_con += "メロメロ" + "\n"
    } else if (move.name == "キョダイホウマツ" && tgt.last_HP > 0) {
        afn.rankChange(def, atk, "S", -2, 100, move, true)
    } else if ((move.name == "キョダイベンタツ" || move.name == "キョダイゴクエン" || move.name == "キョダイホウゲキ" || move.name == "キョダイフンセキ") && !tgt.f_con.includes(move.name)) {
        tgt.f_con += move.name + " 4/4" + "\n"
        writeLog(me, you, tgt.TN + "　の場が　" + move.name + "　で囲まれた" + "\n")
    } else if ((move.name == "キョダイサジン" || move.name == "キョダイヒャッカ") && !tgt.p_con.includes("バインド") && !damage.substitute && tgt.last_HP > 0) {
        writeLog(me, you, tgt.TN + "　の　" + tgt.name + "　は　しめつけられた!" + "\n")
        if (con.item == "ねばりのかぎづめ") {
            tgt.p_con += "バインド（長）　0ターン目" + "\n"
        } else if (con.item == "しめつけバンド") {
            tgt.p_con += "バインド（強）　0ターン目" + "\n"
        } else {
            tgt.p_con += "バインド　0ターン目" + "\n"
        }
    }
}