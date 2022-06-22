//**************************************************
// 53.特性による無効化(その3)
//**************************************************

// フラワーベール　ランクを下げられない　状態異常・ねむけ状態にならない
function invalidationByFlowerVeil3rd(poke, tgt) {
    if ( !isFlowerVeil(tgt.poke) ) return false // フラワーベール状態であること
    if ( !tgt.poke.myType.includes("くさ")) return false // 対象がくさタイプを持っていること
    // ランク補正に関する無効化
    for ( const element of statusMoveToChangeRankForOneOfThem ) {
        if ( poke.myMove.name == element.name && element.name != "デコレーション" ) return true
    }
    for ( const element of statusMoveToChangeRankForAllOfYou ) {
        if ( poke.myMove.name == element.name && element.name != "デコレーション" ) return true
    }
    // 状態異常に関する無効化
    for ( const element of statusMoveToMakeAbnormalForOneOfThem ) {
        if ( poke.myMove.name == element.name ) return true
    }
    for ( const element of statusMoveToMakeAbnormalForAllOfYou ) {
        if ( poke.myMove.name == element.name ) return true
    }
    for ( const element of statusMoveToMakeAbnormalForExceptForme ) {
        if ( poke.myMove.name == element.name ) return true
    }
    // あくびの無効化
    if ( poke.myMove.name == "あくび" ) return true
}

// スイートベール　ねむり・ねむけ状態にならない
function invalidationBySweetVeil3rd(poke, tgt) {
    if ( !isSweetVeil(tgt.poke) ) return false // スイートベール状態であること
    // 状態異常に関する無効化
    for ( const element of statusMoveToMakeAbnormalForOneOfThem ) {
        if ( poke.myMove.name == element.name && element.ailment == "ねむり" ) return true
    }
    for ( const element of statusMoveToMakeAbnormalForAllOfYou ) {
        if ( poke.myMove.name == element.name && element.ailment == "ねむり" ) return true
    }
    for ( const element of statusMoveToMakeAbnormalForExceptForme ) {
        if ( poke.myMove.name == element.name && element.ailment == "ねむり" ) return true
    }
    // あくびの無効化
    if ( poke.myMove.name == "あくび" ) return true
}

// アロマベール
function invalidationByAlomaVeil3rd(poke, tgt) {
    if ( !isAlomaVeil(tgt.poke) ) return false // アロマベール状態であること
    if ( poke.myMove.name == "メロメロ" ) return true
    if ( poke.myMove.name == "いちゃもん" ) return true
    if ( poke.myMove.name == "かいふくふうじ" ) return true
}

function invalidationForOtherAbility3rd(poke, tgt) {
    // ランク補正に関する無効化
    const rankMove = statusMoveToChangeRankForOneOfThem.concat(statusMoveToChangeRankForAllOfYou)
    for ( const element of rankMove ) {
        if ( poke.myMove.name == element.name && element.name != "デコレーション" ) {
            // クリアボディ/しろいけむり/メタルプロテクト/フラワーベール: 能力を下げる技
            if ( tgt.poke.myAbility == "クリアボディ" ) return true
            if ( tgt.poke.myAbility == "しろいけむり" ) return true
            if ( tgt.poke.myAbility == "メタルプロテクト" ) return true
            // かいりきバサミ: こうげきを下げる技
            if ( tgt.poke.myAbility == "かいりきバサミ" ) {
                if ( element.rank.length == 1 && element.rank[0].parameter == "atk" && element.rank[0].change < 0 ) return true
            }
            // はとむね: ぼうぎょを下げる技
            if ( tgt.poke.myAbility == "はとむね" ) {
                if ( element.rank.length == 1 && element.rank[0].parameter == "def" && element.rank[0].change < 0) return true
            }
            // するどいめ: 命中を下げる技
            if ( tgt.poke.myAbility == "するどいめ" ) {
                if ( element.rank.length == 1 && element.rank[0].parameter == "accuracy" && element.rank[0].change < 0) return true
            }
        }
    }

    // 状態異常に関する無効化
    const abnormalMove = statusMoveToMakeAbnormalForOneOfThem.concat(statusMoveToMakeAbnormalForAllOfYou, statusMoveToMakeAbnormalForExceptForme)
    for ( const element of abnormalMove ) {
        if ( poke.myMove.name == element.name ) {
            // スイートベール/ぜったいねむり/フラワーベール/リーフガード/リミットシールド: 状態異常の無効化
            if ( tgt.poke.myAbility == "ぜったいねむり" ) return true
            if ( tgt.poke.myAbility == "リーフガード" && isSunny(tgt.poke) ) return true
            if ( tgt.poke.myCondition.myShields_down ) return true
            // めんえき/パステルベール: どく・もうどく状態の無効化
            if ( tgt.poke.myAbility == "めんえき" ) return true
            if ( isPastelVeil(tgt.poke) && ( element.ailment == "どく" || element.ailment == "もうどく" ) ) return true
            // じゅうなん: まひ状態の無効化
            if ( tgt.poke.myAbility == "じゅうなん" ) {
                if ( element.ailment == "まひ") return true
            }
            // みずのベール/すいほう: やけど状態の無効化
            if ( tgt.poke.myAbility == "みずのベール" || tgt.poke.myAbility == "すいほう" ) {
                if ( element.ailment == "やけど") return true
            }
            // ふみん/やるき: ねむり状態の無効化
            if ( tgt.poke.myAbility == "ふみん" || tgt.poke.myAbility == "やるき" ) {
                if ( element.ailment == "ねむり" ) return true
            }
            // マグマのよろい: こおり状態の無効化
            if ( tgt.poke.myAbility == "マグマのよろい" ) {
                if ( element.ailment == "こおり") return true
            }
            // マイペース: こんらん状態の無効化
            if ( tgt.poke.myAbility == "マイペース" ) {
                if ( element.ailment == "こんらん" ) return true
            }
        }
    }
    // あくびの無効化
    if ( poke.myMove.name == "あくび" ) {
        if ( tgt.poke.myAbility == "やるき" ) return true
        if ( tgt.poke.myAbility == "ふみん" ) return true
        if ( tgt.poke.myAbility == "ぜったいねむり" ) return true
        if ( tgt.poke.myAbility == "リーフガード" && isSunny(tgt.poke) ) return true
        if ( tgt.poke.myCondition.myShields_down ) return true
    }
    // その他
    // どんかん: メロメロ/ちょうはつ状態の無効化　ゆうわく（wikiにない）
    if ( tgt.poke.myAbility == "どんかん" ) {
        if ( poke.myMove.name == "メロメロ" ) return true
        if ( poke.myMove.name == "ちょうはつ" ) return true
        if ( poke.myMove.name == "ゆうわく" ) return true
    }  
    // アロマベール: メロメロ/いちゃもん/かいふくふうじ状態の無効化
    // がんじょう: 一撃必殺技の無効化
    if ( tgt.poke.myAbility == "がんじょう" ) {
        if ( oneShot.includes(poke.myMove.name) ) return true
    }
}


//**************************************************
// 62.技の仕様による無効化(その3)
//**************************************************

// 特性に関する無効化
function invalidationForAbility3rd(poke, tgt) {
    // なかまづくり: 対象がダイマックスしている/対象が自身と同じ特性である/自身がコピーできない特性である/対象が上書きできない特性である
    if ( poke.myMove.name == "なかまづくり" ) {
        if ( poke.myAbility == tgt.poke.myAbility )         return true // 対象が自身と同じ特性である
        if ( yourEntrainment.includes(tgt.poke.myAbility) ) return true // 対象が上書きできない特性である
        if ( myEntrainment.includes(poke.myAbility) )       return true // 自身がコピーできない特性である
        if ( tgt.poke.myCondition.myDynamax )               return true // 対象がダイマックスしている
        if ( tgt.substitute )                               return true // 対象がみがわり状態である
        return false
    }
    // いえき: 対象がすでにとくせいなし状態である/とくせいなしにできない特性である
    if ( poke.myMove.name == "いえき" ) {
        if ( tgt.poke.myCondition.myNo_ability )            return true // 対象がすでにとくせいなし状態である
        if ( gastro.includes(tgt.poke.myAbility) )          return true // とくせいなしにできない特性である
        return false
    }
    // なりきり: 自身が対象と同じ特性である/対象がコピーできない特性である
    if ( poke.myMove.name == "なりきり" ) {
        if ( poke.myAbility == tgt.poke.myAbility )         return true // 自身が対象と同じ特性である
        if ( yourRolePlay.includes(tgt.poke.myAbility) )    return true // 対象がコピーできない特性である
        if ( myRolePlay.includes(poke.myAbility) )          return true // 自身がコピーできない特性である
        return false
    }
    // シンプルビーム: 対象がすでにたんじゅんである/上書きできない特性である
    if ( poke.myMove.name == "シンプルビーム" ) {
        if ( tgt.poke.myAbility == "たんじゅん" )             return true // 対象がすでにたんじゅんである
        if ( simpleBeam.includes(tgt.poke.myAbility) )      return true // 上書きできない特性である
        return false
    }
    // なやみのタネ: 対象が上書きできない特性である
    if ( poke.myMove.name == "なやみのタネ" ) {
        if ( tgt.poke.myAbility == "ふみん" )                return true // 対象がすでにふみんである
        if ( worrySeed.includes(tgt.poke.myAbility) )       return true // 対象が上書きできない特性である
        return false
    }
    // スキルスワップ: 自身や対象が交換できない特性である/対象がダイマックスしている
    if ( poke.myMove.name == "スキルスワップ" ) {
        if ( cannotSkillSwap.includes(poke.myAbility) )     return true // 自身が交換できない特性である
        if ( cannotSkillSwap.includes(tgt.poke.myAbility) ) return true // 対象が交換できない特性である
        if ( tgt.poke.myCondition.myDynamax )               return true // 対象がダイマックスしている
        return false
    }
}

// HPが満タンによる無効化
function invalidationForFullHP3rd(poke, tgt) {
    if ( tgt.poke.myRest_hp != tgt.poke.myFull_hp ) return false // HPが満タンであること

    // いやしのはどう
    if ( poke.myMove.name == "いやしのはどう" ) return true
    // フラワーヒール
    if ( poke.myMove.name == "フラワーヒール" ) return true
    // いのちのしずく
    if ( poke.myMove.name == "いのちのしずく" ) return true
    // ジャングルヒール: HPが満タンで、状態異常でもない
    if ( poke.myMove.name == "ジャングルヒール" && !tgt.poke.myAilment ) return true
    // かふんだんご　味方に対するもの
    if ( poke.myMove.name == "かふんだんご" && poke.myParty == tgt.poke.myParty ) return true
    // プレゼント: 回復効果が選ばれた場合
    /*
    if ( poke.myMove.name == "プレゼント" && move.power == "-") {
        if (def.con.last_HP == def.con.full_HP) {
            cfn.logWrite(def, atk, def.con.TN + "　の　" + def.poke.myName + "は　HPが満タンだった" + "\n")
            return true
        } else {
            afn.HPchangeMagic(def, atk, Math.floor(def.con.full_HP / 4), "+", move)
            return true
        }
    }
    */
    // 自分の体力を回復する技(じこさいせい等)
    if ( purelyRecover.includes(poke.myMove.name) ) return true

    return false
}

// ステータスに関する無効化
function invalidationForStatus3rd(poke, tgt) {
    // はらだいこ: 自身がHP半分以下である/すでにランク+6である
    if ( poke.myMove.name == "はらだいこ" ) {
        if ( tgt.poke.myRest_hp < Math.floor(tgt.poke.myFull_hp / 2) ) return true
        if ( tgt.poke.myRank_atk == 6 ) return true
        return false
    }
    // フラワーガード/たがやす: 対象がくさタイプでない（たがやすの時は地面にいる必要がある）
    if ( poke.myMove.name == "フラワーガード" ) {
        if ( !tgt.poke.myType.includes("くさ") ) return true
        return false
    }
    if ( poke.myMove.name == "たがやす" ) {
        if ( !tgt.poke.myType.includes("くさ") ) return true
        if ( !onGround(tgt.poke) ) return true
        return false
    }
    // じばそうさ/アシストギア: 対象の特性がプラスかマイナスでない
    if ( poke.myMove.name == "じばそうさ" || poke.myMove.name == "アシストギア" ) {
        if ( !isAbility(tgt.poke) ) return true
        if ( tgt.poke.myAbility != "プラス" && tgt.poke.myAbility != "マイナス" ) return true
        return false
    }
    // ちからをすいとる: 対象のこうげきが-6である
    if ( poke.myMove.name == "ちからをすいとる" ) {
        if ( tgt.poke.myRank_atk == -6 ) return true
        return false
    }
    // いばる/おだてる: 対象のランクが+6でありこんらんしている
    if ( poke.myMove.name == "いばる" ) {
        if ( tgt.poke.myRank_atk == 6 && tgt.poke.myCondition.myConfusion ) return true
        return false
    }
    if ( poke.myMove.name == "おだてる" ) {
        if ( tgt.poke.myRank_sp_atk == 6 && tgt.poke.myCondition.myConfusion ) return true
        return false
    }
    // ひっくりかえす: 対象のランクが変化していない
    if ( poke.myMove.name == "ひっくりかえす" ) {
        if ( tgt.poke.myRank_atk == 0 && tgt.poke.myRank_def == 0 && tgt.poke.myRank_sp_atk == 0 && tgt.poke.myRank_sp_def == 0 && tgt.poke.myRank_speed == 0 && tgt.poke.myRank_accuracy == 0 && tgt.poke.myRank_evasion == 0 ) return true
        return false
    }
}

// タイプによる無効化
function invalidationForType3rd(poke, tgt) {
    // テクスチャー: 現在のタイプが一番上の技のタイプを含む
    if ( poke.myMove.name == "テクスチャー" ) {
        if ( tgt.poke.myType.includes(moveSearchByName(poke.myMove_0).type) ) return true
        return false
    }
    // テクスチャー2: 対象が行動していない/最後に使った技がわるあがきである
    if ( poke.myMove.name == "テクスチャー2" ) {
        if ( !tgt.poke.myCondition.myHistory ) return true
        if ( tgt.poke.myCondition.myHistory[0].name == "わるあがき" ) return true
        /*
        let check = []
        for ( let i = 0; i < 18; i++ ) {
            if ( compatibilityTable[0][i] == tgt.poke.myCondition.myHistory[0].type ) {
                for ( let j = 0; j < 18; j++ ) {
                    if ( compatibilityTable[i+1][j] < 1 ) check.push(compatibilityTable[0][j])
                }
            }
        }
        let count = false
        for ( const type of check ) {
            if ( !con.type.includes(type) ) count = true
        }
        if ( count == false ) tgt.success = false
        */
    }
    // ミラータイプ: すでに対象と同じタイプである
    if ( poke.myMove.name == "ミラータイプ" ) {
        if ( poke.myType.length != tgt.poke.myType.length ) return false
        for ( const type of poke.myType ) {
            if ( !tgt.poke.myType.includes(type) ) return false
        }
        return true
    }
    // みずびたし/まほうのこな: 対象がみず単タイプである/エスパー単タイプである | 対象がアルセウスかシルヴァディである
    if ( poke.myMove.name == "みずびたし" ) {
        if ( tgt.poke.myType == ["みず"] ) return true
        if ( tgt.poke.myName == "アルセウス" ) return true
        if ( tgt.poke.myName == "シルヴァディ" ) return true
        return false
    }
    if ( poke.myMove.name == "まほうのこな" ) {
        if ( tgt.poke.myType == ["エスパー"] ) return true
        if ( tgt.poke.myName == "アルセウス" ) return true
        if ( tgt.poke.myName == "シルヴァディ" ) return true
        return false
    }
    // ハロウィン/もりののろい: 対象がゴーストタイプを持つ/くさタイプを持つ
    if ( poke.myMove.name == "ハロウィン" ) {
        if ( tgt.poke.myType.includes("ゴースト") ) return true
        return false
    }
    if ( poke.myMove.name == "もりののろい" ) {
        if ( tgt.poke.myType.includes("くさ") ) return true
        return false
    }
}

// 特殊なメッセージが出る技の失敗
function invalidationForUniqueMessage3rd(poke, tgt) {
    // アロマセラピー/いやしのすず: 状態異常の味方がいない
    if ( poke.myMove.name == "アロマセラピー" || poke.myMove.name == "いやしのすず" ) {
        if ( tgt.poke.myAilment ) return false
        return true
    }
    // おちゃかい: 場にきのみを持つポケモンがいない
    if ( poke.myMove.name == "おちゃかい" ) {
        if ( tgt.poke.myCondition.myDig )          return true // あなをほる
        if ( tgt.poke.myCondition.myDive )         return true// ダイビング
        if ( tgt.poke.myCondition.mySky )          return true // そらをとぶ
        if ( tgt.poke.myCondition.myShadow )       return true // シャドーダイブ
        if ( tgt.poke.myCondition.myMax_guard )    return true // ダイウォール
        if (!berryList.includes(tgt.poke.myItem) ) return true // きのみを持っていない
        return false
    }
}

// 重複による無効化
function invalidationForDuplicate3rd(poke, tgt) {
    // にげられない状態にする技: すでににげられない状態である
    if ( tgt.poke.myCondition.myCant_escape ) {
        if ( poke.myMove.name == "くろいまなざし" ) return true
        if ( poke.myMove.name == "クモのす" ) return true
        if ( poke.myMove.name == "とおせんぼう" ) return true
        if ( poke.myMove.name == "たこがため" ) return true
    }
    // アクアリング: 自身がすでにアクアリング状態である
    if ( poke.myMove.name == "アクアリング" ) {
        if ( tgt.poke.myCondition.myAqua_ring ) return true
        return false
    }
    // きあいだめ: 自身がすでにきゅうしょアップ状態である
    if ( poke.myMove.name == "きあいだめ" ) {
        if ( tgt.poke.myCondition.myCritical ) return true
        return false
    }
    // かいふくふうじ: 対象がすでにかいふくふうじ状態である
    if ( poke.myMove.name == "かいふくふうじ" ) {
        if ( tgt.poke.myCondition.myHeal_block ) return true
        return false
    }
    // さしおさえ: 対象がすでにさしおさえ状態である　（wikiにない）
    if ( poke.myMove.name == "さしおさえ" ) {
        if ( tgt.poke.myCondition.myEmbargo ) return true
        if ( tgt.poke.myItem == "" ) return true
        else return false
    }
    // スポットライト: 対象がすでにちゅうもくのまと状態である（wikiにない）
    if ( poke.myMove.name == "スポットライト" ) {
        if ( tgt.poke.myCondition.mySpotlight ) return true
        return false
    }
    // ちょうはつ: 対象がすでにちょうはつ状態である
    if ( poke.myMove.name == "ちょうはつ" ) {
        if ( tgt.poke.myCondition.myTaunt ) return true
        return false
    }
    // テレキネシス: 対象がすでにテレキネシス状態である　（wikiにない）
    if ( poke.myMove.name == "テレキネシス" ) {
        if ( tgt.poke.myCondition.myTelekinesis ) return true
        return false
    }
    // でんじふゆう: 自身がすでにでんじふゆう状態である (うちおとす状態である wikiにない)
    if ( poke.myMove.name == "でんじふゆう" ) {
        if ( tgt.poke.myCondition.myElectrify )  return true
        if ( tgt.poke.myCondition.mySmack_down ) return true
        if ( tgt.poke.myCondition.myIngrain )    return true
        return false
    }
    // ねがいごと: 前のターンのねがいごとの効果が残っている
    if ( poke.myMove.name == "ねがいごと" ) {
        if ( isField(poke).myWish_heal ) return true
        return false
    }
    // のろい(呪い): 対象がすでにのろい状態である
    if ( poke.myMove.name == "のろい" ) {
        if ( poke.myType.includes("ゴースト") && tgt.poke.myCondition.myCurse ) return true
        return false
    }
    // ロックオン/こころのめ: 自身がすでにロックオン状態である
    if ( poke.myMove.name == "ロックオン" ) {
        if ( tgt.poke.myCondition.myLock_on ) return true
        return false
    }
    if ( poke.myMove.name == "こころのめ" ) {
        if ( tgt.poke.myCondition.myLock_on ) return true
        return false
    }
}

// 対象が場である技の無効化
function invalidationOfMoveForField3rd(poke) {
    // 重複による無効化
    // 天気: すでに同じ状態になっている
    if ( poke.myMove.name == "にほんばれ" && fieldStatus.mySunny ) return true
    if ( poke.myMove.name == "あまごい" && fieldStatus.myRainy ) return true
    if ( poke.myMove.name == "すなあらし" && fieldStatus.mySandstorm) return true
    if ( poke.myMove.name == "あられ" && fieldStatus.myGraupel ) return true
    // フィールド: すでに同じ状態になっている
    if ( poke.myMove.name == "エレキフィールド" && fieldStatus.myElectric ) return true
    if ( poke.myMove.name == "グラスフィールド" && fieldStatus.myGrassy ) return true
    if ( poke.myMove.name == "サイコフィールド" && fieldStatus.myPsychic ) return true
    if ( poke.myMove.name == "ミストフィールド" && fieldStatus.myMisty ) return true
    // 自分の場の状態: すでに同じ状態になっている
    if ( poke.myMove.name == "オーロラベール" && isField(poke).myAurora_veil ) return true
    if ( poke.myMove.name == "ひかりのかべ" && isField(poke).myLight_screen ) return true
    if ( poke.myMove.name == "リフレクター" && isField(poke).myReflect ) return true
    if ( poke.myMove.name == "おいかぜ" && isField(poke).myTailwind ) return true
    if ( poke.myMove.name == "おまじない" && isField(poke).myLucky_chant ) return true
    if ( poke.myMove.name == "しろいきり" && isField(poke).myMist ) return true
    if ( poke.myMove.name == "しんぴのまもり" && isField(poke).mySafeguard ) return true
    // 自分の場の守る: すでに同じ状態になっている
    if ( poke.myMove.name == "たたみがえし" && isField(poke).myMat_block ) return true
    if ( poke.myMove.name == "トリックガード" && isField(poke).myCrafty_shield ) return true
    if ( poke.myMove.name == "ファストガード" && isField(poke).myQuick_guard ) return true
    if ( poke.myMove.name == "ワイドガード" && isField(poke).myWide_guard ) return true
    // お互いの場の状態: すでに同じ状態になっている
    if ( poke.myMove.name == "どろあそび" && fieldStatus.myMud_sport ) return true
    if ( poke.myMove.name == "みずあそび" && fieldStatus.myWater_sport ) return true
    if ( poke.myMove.name == "じゅうりょく" && fieldStatus.myGravity ) return true
    if ( poke.myMove.name == "フェアリーロック" && fieldStatus.myFairy_lock ) return true
    if ( poke.myMove.name == "プラズマシャワー" && fieldStatus.myIon_deluge ) return true
    // 設置技: すでに最大まで仕掛けられている
    if ( poke.myMove.name == "ステルスロック" && isOppField(poke).myStealth_rock ) return true
    if ( poke.myMove.name == "ねばねばネット" && isOppField(poke).mySticky_web ) return true
    if ( poke.myMove.name == "まきびし" && isOppField(poke).mySpikes == 3 ) return true
    if ( poke.myMove.name == "どくびし" && isOppField(poke).myToxic_spikes == 2 ) return true

    // その他の無効化
    // 天気を変える技: おおひでり/おおあめ/デルタストリームにより変えられない
    if ( fieldStatus.myDrought || fieldStatus.myHeavy_rain || fieldStatus.myTurbulence ) {
        if ( poke.myMove.name == "にほんばれ" ) return true
        if ( poke.myMove.name == "あまごい" ) return true
        if ( poke.myMove.name == "すなあらし" ) return true
        if ( poke.myMove.name == "あられ" ) return true
    }
    // コートチェンジ: 入れ替える場の状態が無い
    if ( poke.myMove.name == "コートチェンジ" ) {
        for ( const element of courtChange ) {
            if ( myField[`my${element}`] ) return false
            if ( oppField[`my${element}`] ) return false
        }
        return true
    }
}

function invalidationForOthers3rd(poke, tgt) {
    // アンコール: 対象が技を使用していない/技のPPが残っていない/アンコールできない技/相手がダイマックス/すでにアンコール状態
    /*
    if ( poke.myMove.name == "アンコール" ) {
        let now_PP = 0
        for (let j = 0; j < 4; j++) {
            if (tgt["move_" + j] == tgt.used) now_PP = tgt["last_" + j]
        }
        if (now_PP == 0) tgt.result = "失敗"
        if (tgt.used == "") tgt.result = "失敗"
        if (cannotEncore.includes(tgt.used)) tgt.result = "失敗"
        if (tgt.p_con.includes("状態変化『アンコール』")) tgt.result = "失敗"  || def.data.dynaTxt.includes("3") || def.data.gigaTxt.includes("3")
    }
    */
    
    // かなしばり: 対象が技を使用していない/最後のわざがわるあがき/ダイマックスわざ/すでにかなしばり状態
    if ( poke.myMove.name == "かなしばり") {
        if ( !tgt.poke.myCondition.myHistory ) return true
        if ( tgt.poke.myCondition.myHistory[0].name == "わるあがき" ) return true
        if ( tgt.poke.myCondition.myDisable_move ) return true
        /*
        const dyna = moveEff.dyna()
        for (let j = 0; j < dyna.length; j++) {
            if (dyna[j][1] == tgt.used) tgt.result = "失敗"
        }
        const giga = moveEff.gigadyna()
        for (let j = 0; j < giga.length; j++) {
            if (giga[j][1] == tgt.used) tgt.result = "失敗"
        }
        */
    }
    // ものまね: 対象が技を使用していない/ものまねできない技
    if ( poke.myMove.name == "ものまね" ) {
        if ( !tgt.poke.myCondition.myHistory ) return true // 対象が技を使用していない
        if ( mimicMove.includes(tgt.poke.myCondition.myHistory[0].name) ) return true // ものまねできない技
        for ( let i = 0; i < 4; i++ ) {
            if ( poke[`myMove_${i}`] == tgt.poke.myCondition.myHistory[0].name ) return true // 同じ技を覚えている
        }
        return false
    }
    // スケッチ: 対象が技を使用していない/スケッチできない技
    if ( poke.myMove.name == "スケッチ" ) {
        if ( !tgt.poke.myCondition.myHistory ) return true // 対象が技を使用していない
        if ( poke.myCondition.myTransform ) return true // 自身がへんしん状態である
        if ( cannotSketch.incense(tgt.poke.myCondition.myHistory[0].name) ) return true // スケッチできない技
        for ( let i = 0; i < 4; i++ ) {
            if ( poke[`myMove_${i}`] == tgt.poke.myCondition.myHistory[0].name ) return true // 同じ技を覚えている
        }
        return false
    }
    // リサイクル：持ち物を持っている、リサイクルできる道具がない(wikiにない)
    if ( poke.myMove.name == "リサイクル" ) {
        if ( tgt.poke.myIitem ) return true
        if ( !tgt.poke.myRecycle ) return true
        return false
    }
    // さいはい: さいはいできない技、PPがない技
    if ( poke.myMove.name == "さいはい" ) {
        if ( !tgt.poke.myCondition.myHistory ) return true
        // if ( tgt.poke.myCondition.myFree_fall ) tgt.success = false
        if ( cannotInstruct.includes(tgt.poke.myCondition.myHistory[0].name)) return true
        if ( cannotMoveByRecoil.includes(tgt.poke.myCondition.myHistory[0].name)) return true
        if ( accumulationMove.includes(tgt.poke.myCondition.myHistory[0].name)) return true
        return false
    }
    // おさきにどうぞ: 対象がすでに行動している、行動順に変化がない場合（wikiにない）
    if ( poke.myMove.name == "おさきにどうぞ" ) {
        if ( tgt.poke.myCmd_move ) return true
        return false
    }
    // さきおくり/そうでん/てだすけ: 対象がすでに行動している、
    if ( poke.myMove.name == "さきおくり" || poke.myMove.name == "そうでん" ) {
        if ( tgt.poke.myCmd_move ) return true
        return false
    }
    // バトンタッチ/いやしのねがい/みかづきのまい: 交代できる味方がいない
    if ( poke.myMove.name == "バトンタッチ" || poke.myMove.name == "いやしのねがい" || poke.myMove.name == "みかづきのまい" || poke.myMove.name == "テレポート" ) {
        if ( !isBench(poke) ) return true
        return false
    }
    // ほえる/ふきとばし: 交代できる相手がいない
    if ( poke.myMove.name == "ほえる" || poke.myMove.name == "ふきとばし" ) {
        if ( !isBench(tgt.poke) ) return true
        return false
    }
    // てだすけ/サイドチェンジ/アロマミスト/てをつなぐ: 味方がいない
    if ( poke.myMove.name == "てだすけ" || poke.myMove.name == "サイドチェンジ" || poke.myMove.name == "アロマミスト" || poke.myMove.name == "てをつなぐ" ) {
        if ( myPokeInBattle(poke).length == 1 ) return true
        return false
    }
    // サイコシフト
    if ( poke.myMove.name == "サイコシフト" ) {
        // 1.自身が状態異常でない/対象がすでに状態異常である
        if ( !poke.myAilment ) return true
        if ( !tgt.poke.myAilment ) return true
        // 2.対象が状態異常に耐性を持っている
        if ( psychoShift(tgt.poke, poke.myAilment) ) return true
        return false
    }
    // じょうか: 対象が状態異常でない
    if ( poke.myMove.name == "じょうか" ) {
        if ( !tgt.poke.myAilment ) return true
        return false
    }
    // みがわり
    if ( poke.myMove.name == "みがわり" ) {
        // 1.自身がすでにみがわり状態である
        if ( tgt.poke.myCondition.mySubstitute ) return true
        // 2.自身に技を使う体力が残っていない
        if ( tgt.poke.myRest_hp <= Math.floor(tgt.poke.myFull_hp / 4) ) return true
        return false
    }
    // へんしん: 自身/対象がすでにへんしん状態である
    if ( poke.myMove.name == "へんしん" ) {
        if ( poke.myCondition.myTransform ) return true
        if ( tgt.poke.myCondition.myTransform ) return true
        return false
    }
    // トリック/すりかえ: どちらも道具を持っていない/どちらかの道具が交換できない
    if ( poke.myMove.name == "トリック" || poke.myMove.name == "すりかえ" ) {
        if ( !poke.myItem ) return true
        if ( !tgt.poke.myItem ) return true
        if ( cannotChangeItem(poke) ) return true
        if ( cannotChangeItem(tgt.poke) ) return true
        return false
    }
    // ふしょくガス: 溶かせない道具がある
    if ( poke.myMove.name == "ふしょくガス" ) {
        if ( cannotChangeItem(tgt.poke) ) return true
        return false
    }
}