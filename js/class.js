var myParty = ["", "", "", "", "", ""]
var oppParty = ["", "", "", "", "", ""]
var randomList = []
var myField = ""
var oppField = ""
var fieldStatus = ""

// 手持ちポケモン
class Party {
    constructor() {
        // 基本情報
        this.trainer_name = null 
        // ランク変化
        this.rank_atk      = 0
        this.rank_def      = 0
        this.rank_sp_atk   = 0
        this.rank_sp_def   = 0
        this.rank_speed    = 0
        this.rank_evasion  = 0
        this.rank_accuracy = 0
        // バトル場の位置、控えならnull
        this.position = null
        // 選出していたら選出順(0~3)、していなければnull
        this.bench = null
        // コマンド
        this.myCmd_hand = ""
        this.myCmd_move = ""
        this.myCmd_tgt = ""
        // 攻撃対象
        this.target = []
        // 行動順
        this.order_fast     = 0 // おさきにどうぞ・りんしょう・コンビネーションわざ・トラップシェル - 行動順を引き上げる
        this.order_late     = 0 // さきおくり - 行動順を最後にする
        this.order_priority = 0 // 2.優先度
        this.order_ahead    = 0 // 3.せんせいのツメ・イバンのみ・クイックドロウ - 同じ優先度内で最初に行動する
        this.order_rear     = 0 // 4.こうこうのしっぽ・まんぷくおこう・あとだし - 同じ優先度内で最後に行動する
        this.order_value    = 0 // 5.素早さ
        this.order_random   = 0 // 6.乱数
        // 交代しても保存する情報
        this.asleep        = false // ねむりの経過ターン数(0~4)
        this.asleep_turn   = false // ねむりから覚めるターン数
        this.bad_poison    = false // もうどく経過ターン数
        this.recycle       = false // リサイクル可能な持ち物
        this.rest          = false // ねむる　ねむるでねむり状態になった経過ターン数(1~3)、3で回復
        // 途中交代
        this.eject_button  = false // だっしゅつボタンが発動したらtrue
        this.eject_pack    = false // だっしゅつパックが発動したらtrue
        this.emergency     = false // ききかいひ/にげごしが発動したらtrue
        this.red_card      = false // レッドカードが発動したらtrue
        this.switch        = false // とんぼがえり/ボルトチェンジ/クイックターンが発動すればtrue

    }

    //セッターメソッド
    // 基本情報
    set myID( value )        { this.id = value }
    set myParty( value )     { this.party = value }
    set myTN( value )        { this.trainer_name = value }
    set myName( value )      { this.name = value }
    set myGender( value )    { this.gender = value }
    set myLevel( value )     { this.level = value }
    set myType( value )      { this.type = value }
    set myNature( value )    { this.nature = value }
    set myAbility( value )   { this.ability = value }
    set myItem( value )      { this.item = value }
    set myAilment( value )   { this.ailment = value }
    // 技
    set myMove_0( value )    { this.move_0 = value }
    set myRest_pp_0( value ) { this.rest_pp_0 = value }
    set myFull_pp_0( value ) { this.full_pp_0 = value }
    set myMove_1( value )    { this.move_1 = value }
    set myRest_pp_1( value ) { this.rest_pp_1 = value }
    set myFull_pp_1( value ) { this.full_pp_1 = value }
    set myMove_2( value )    { this.move_2 = value }
    set myRest_pp_2( value ) { this.rest_pp_2 = value }
    set myFull_pp_2( value ) { this.full_pp_2 = value }
    set myMove_3( value )    { this.move_3 = value }
    set myRest_pp_3( value ) { this.rest_pp_3 = value }
    set myFull_pp_3( value ) { this.full_pp_3 = value }
    // 実数値
    set myRest_hp( value )   { this.rest_hp = value }
    set myFull_hp( value )   { this.full_hp = value }
    set myAtk( value )       { this.atk = value }
    set myDef( value )       { this.def = value }
    set mySp_atk( value )    { this.sp_atk = value }
    set mySp_def( value )    { this.sp_def = value }
    set mySpeed( value )     { this.speed = value }
    // 個体値
    set myHp_iv( value )     { this.hp_iv = value }
    set myAtk_iv( value )    { this.atk_iv = value }
    set myDef_iv( value )    { this.def_iv = value }
    set mySp_atk_iv( value ) { this.sp_atk_iv = value }
    set mySp_def_iv( value ) { this.sp_def_iv = value }
    set mySpeed_iv( value )  { this.speed_iv = value }
    // 努力値
    set myHp_ev( value )     { this.hp_ev = value }
    set myAtk_ev( value )    { this.atk_ev = value }
    set myDef_ev( value )    { this.def_ev = value }
    set mySp_atk_ev( value ) { this.sp_atk_ev = value }
    set mySp_def_ev( value ) { this.sp_def_ev = value }
    set mySpeed_ev( value )  { this.speed_ev = value }
    // 元の情報
    set myType_org( value )     { this.type_org = value }
    set myAbility_org( value )  { this.ability_org = value }
    set myAtk_org( value )      { this.atk_org = value }
    set myDef_org( value )      { this.def_org = value }
    set mySp_atk_org( value )   { this.sp_atk_org = value }
    set mySp_def_org( value )   { this.sp_def_org = value }
    set mySpeed_org( value )    { this.speed_org = value }
    // ランク変化
    set myRank_atk( value )      { this.rank_atk = value }
    set myRank_def( value )      { this.rank_def = value }
    set myRank_sp_atk( value )   { this.rank_sp_atk = value }
    set myRank_sp_def( value )   { this.rank_sp_def = value }
    set myRank_speed( value )    { this.rank_speed = value }
    set myRank_evasion( value )  { this.rank_evasion = value }
    set myRank_accuracy( value ) { this.rank_accuracy = value }
    // 手持ちの順番
    set myHand( value )      { this.hand = value }
    // バトル場の位置、控えならnull
    set myPosition( value )  { this.position = value }
    // 選出していたら選出順(0~3)、していなければnull
    set myBench( value )     { this.bench = value }
    // コマンド
    set myCmd_move( value )  { this.cmd_move = value }
    set myCmd_tgt( value )   { this.cmd_tgt = value }
    set myCmd_hand( value )  { this.cmd_hand = value }
    // 今使用した技
    set myMove( value )  { this.use_move = value }
    // 技の処理に関係するクラス
    set myCondition( value ) { this.conditioin = value }
    // 技の対象の数　0なら[]、1なら[true]、2なら[true, true]　全てfalseになると技は失敗
    set myTarget( value )      { this.target = value }
    // ポケモン特有のもの
    set myDisguise( value ) { this.myDisguise = value } // ばけのかわが有効なら"ばけたすがた"、無効なら""ばれたすがた"
    set myIce_face( value ) { this.ice_face = value }
    // 行動順
    set myOrder_fast( value )     { this.order_fast = value }
    set myOrder_late( value )     { this.order_late = value }
    set myOrder_priority( value ) { this.order_priority = value }
    set myOrder_ahead( value )    { this.order_ahead = value }
    set myOrder_rear( value )     { this.order_rear = value }
    set myOrder_value( value )    { this.order_value = value }
    set myOrder_random( value )   { this.order_random = value }
    // 交代しても保存する情報
    set myAsleep( value )        { this.asleep = value }
    set myAsleep_turn( value )   { this.asleep_turn = value }
    set myBad_poison( value )    { this.bad_poison = value }
    set myRecycle( value )       { this.recycle = value }
    set myRest( value )          { this.rest = value }
    // 途中交代
    set myEject_button( value )  { this.eject_button = value }
    set myEject_pack( value )    { this.eject_pack = value }
    set myEmergency( value )     { this.emergency = value }
    set myRed_card( value )      { this.red_card = value }
    set mySwitch( value )        { this.switch = value }

    // ゲッターメソッド
    // 基本情報
    get myID()        { return this.id }
    get myParty()     { return this.party }
    get myTN()        { return this.trainer_name }
    get myName()      { return this.name }
    get myGender()    { return this.gender}
    get myLevel()     { return this.level }
    get myType()      { return this.type }
    get myType_org()  { return this.type_org}
    get myNature()    { return this.nature }
    get myAbility()   { return this.ability }
    get myItem()      { return this.item }
    get myAilment()   { return this.ailment }
    // 技
    get myMove_0()    { return this.move_0 }
    get myRest_pp_0() { return this.rest_pp_0 }
    get myFull_pp_0() { return this.full_pp_0 }
    get myMove_1()    { return this.move_1 }
    get myRest_pp_1() { return this.rest_pp_1 }
    get myFull_pp_1() { return this.full_pp_1 }
    get myMove_2()    { return this.move_2 }
    get myRest_pp_2() { return this.rest_pp_2 }
    get myFull_pp_2() { return this.full_pp_2 }
    get myMove_3()    { return this.move_3 }
    get myRest_pp_3() { return this.rest_pp_3 }
    get myFull_pp_3() { return this.full_pp_3 }
    // 実数値
    get myRest_hp()   { return this.rest_hp }
    get myFull_hp()   { return this.full_hp }
    get myAtk()       { return this.atk }
    get myDef()       { return this.def }
    get mySp_atk()    { return this.sp_atk }
    get mySp_def()    { return this.sp_def }
    get mySpeed()     { return this.speed }
    // 個体値
    get myHp_iv()     { return this.hp_iv }
    get myAtk_iv()    { return this.atk_iv }
    get myDef_iv()    { return this.def_iv }
    get mySp_atk_iv() { return this.sp_atk_iv }
    get mySp_def_iv() { return this.sp_def_iv }
    get mySpeed_iv()  { return this.speed_iv }
    // 努力値
    get myHp_ev()     { return this.hp_ev }
    get myAtk_ev()    { return this.atk_ev }
    get myDef_ev()    { return this.def_ev }
    get mySp_atk_ev() { return this.sp_atk_ev }
    get mySp_def_ev() { return this.sp_def_ev }
    get mySpeed_ev()  { return this.speed_ev }
    // 元の情報
    get myAbility_org()  { return this.ability_org }
    get myType_org()     { return this.type_org }
    get myAtk_org()      { return this.atk_org }
    get myDef_org()      { return this.def_org }
    get mySp_atk_org()   { return this.sp_atk_org }
    get mySp_def_org()   { return this.sp_def_org }
    get mySpeed_org()    { return this.speed_org }
    // ランク変化
    get myRank_atk()      { return this.rank_atk }
    get myRank_def()      { return this.rank_def }
    get myRank_sp_atk()   { return this.rank_sp_atk }
    get myRank_sp_def()   { return this.rank_sp_def }
    get myRank_speed()    { return this.rank_speed }
    get myRank_evasion()  { return this.rank_evasion }
    get myRank_accuracy() { return this.rank_accuracy }
    // 手持ちの順番
    get myHand()      { return this.hand }
    // バトル場の位置、控えならnull
    get myPosition()  { return this.position }
    // 選出していたら選出順(0~3)、していなければnull
    get myBench()     { return this.bench }
    // コマンド
    get myCmd_move()  { return this.cmd_move }
    get myCmd_tgt()   { return this.cmd_tgt }
    get myCmd_hand()  { return this.cmd_hand }
    // 今使用した技
    get myMove()  { return this.use_move }
    // 技の処理に関係するクラス
    get myCondition() { return this.conditioin } 
    // 技の対象の数　0なら[]、1なら[true]、2なら[true, true]　全てfalseになると技は失敗
    get myTarget()      { return this.target }
    // ポケモン特有のもの
    get myDisguise() { return this.disguise } // ばけのかわが有効なら"ばけたすがた"、無効なら""ばれたすがた"
    get myIce_face() { return this.ice_face }
    // 行動順
    get myOrder_fast()     { return this.order_fast }
    get myOrder_late()     { return this.order_late }
    get myOrder_priority() { return this.order_priority }
    get myOrder_ahead()    { return this.order_ahead }
    get myOrder_rear()     { return this.order_rear }
    get myOrder_value()    { return this.order_value }
    get myOrder_random()   { return this.order_random }
    // 交代しても保存する情報
    get myAsleep()        { return this.asleep }
    get myAsleep_turn()   { return this.asleep_turn }
    get myBad_poison()    { return this.bad_poison }
    get myRecycle()       { return this.recycle }
    get myRest()          { return this.rest }
    // 途中交代
    get myEject_button()  { return this.eject_button }
    get myEject_pack()    { return this.eject_pack }
    get myEmergency()     { return this.emergency }
    get myRed_card()      { return this.red_card }
    get mySwitch()        { return this.switch }

}

// 技の処理に関係すること
class Condition {
    constructor() {
        this.after_you     = false // おさきにどうぞ　
        this.aqua_ring     = false // アクアリング状態ならtrue
        this.assurance     = false // ダメおしのダメージが上がるならtrue
        this.attract       = false // メロメロをされたポケモンのID
        this.autotomize    = 0     // ボディパージの回数
        this.beak_blast    = false // くちばしキャノン 行動待ちならtrue, それ以外ならfalse
        this.belch         = false // ゲップ使用可能ならtrue
        this.berserk       = false // ぎゃくじょうが発動したらtrue
        this.bide_damage   = 0     // がまんで受けたダメージ(ここでは2倍されていない)
        this.bide_turn     = false // がまん経過ターン数(1~2)、放つときは3
        this.bind_ID       = false // バインド状態を付与したポケモンのID
        this.bind_long     = false // ねばりのかぎづめが有効ならtrue
        this.bind_turn     = false // バインド経過ターン数
        this.bind_strong   = false // しめつけバンドが有効ならtrue
        this.cant_escape   = false // 逃げられない状態を付与したポケモンのID
        this.cant_move     = false // 反動で次のターン動けなくなる 
        this.charge        = false // じゅうでん経過ターン数(1ターン目で特防アップ、2ターン目で電気技の威力アップ)
        this.chi_strike    = false // キョダイシンゲキ成功回数
        this.choice        = false // 拘っている技
        this.confusion     = false // こんらん経過ターン数
        this.curse         = false // のろい状態ならtrue
        this.critical      = false // きゅうしょアップ状態ならtrue
        this.damage        = {value: 0, party: false, position: false, nature: false} // このターン最後に受けたダメージの情報
        this.defense_curl  = false // まるくなる状態ならtrue
        this.destiny_bond  = false // みちづれ みちづれ状態ならtrue、それ以外ならfalse
        this.dig           = false // あなをほる状態ならtrue
        this.disable_move  = false // かなしばりされている技
        this.disable_turn  = false // かなしばり　効果があるときは残りターン数(0~4)
        this.dive          = false // ダイビング状態ならtrue
        this.dynamax       = false // ダイマックス経過ターン数
        this.electrify     = false // そうでん状態ならtrue
        this.embargo       = false // さしおさえ経過ターン数(1~5)
        this.encore_turn   = false // アンコール残りターン数(3~0)
        this.encore_move   = false // アンコールされた技
        this.endure        = false // こらえる状態ならtrue
        this.explosion     = false // 爆発系の技のHP消費が確約されたらtrue
        this.filling       = false // ためている技
        this.first         = false // せんせいのツメ・イバンのみ・クイックドロウ - 同じ優先度内で最初に行動する
        this.flinch        = false // ひるみ　ひるみ状態ならtrue、それ以外ならfalse
        this.flash_fire    = false // もらいびが有効ならtrue
        this.fly           = false // そらをとぶ状態ならtrue
        this.foresight     = false // みやぶられている状態ならtrue
        this.forest_curse  = false // もりののろい状態ならtrue
        this.fury_cutter   = 0     // れんぞくぎり連続回数
        this.gem           = false // ジュエルが発動したらtrue
        this.grudge        = false // おんねん おんねん状態ならtrue、それ以外ならfalse
        this.gulp_missile  = false // うのミサイル　"うのみのすがた"　"まるのみのすがた"
        this.half_berry    = false // ダメージ半減きのみが発動したらtrue
        this.halloween     = false // ハロウィン状態ならtrue
        this.heal_block    = 0     // 回復封じ　経過ターン数(1~5)
        this.helping_hand  = 0     // てだすけされた回数
        this.history       = []    // 使用した技の履歴
        this.hunger_switch = false // はらぺこスイッチ　はらぺこもようならtrue、まんぷくもようならfalse
        this.ice_ball      = 0     // アイスボール経過ターン数
        this.imprison      = false // ふういん状態ならtrue
        this.ingrain       = false // ねをはる状態ならtrue
        this.landing       = false // 戦闘に出た時にtrueとなり、戦闘に出た時の処理が終わればfalse
        this.laser_focus   = false // とぎすますを使用したターンは1、効果がある次のターンは2
        this.leech_seed    = false // やどりぎのタネを受けた場所("me:0" や　"opp:1"　など)
        this.lock_on       = false // ロックオン状態なら1、効果のある次のターンは2
        this.magic_coat    = false // マジックコート状態ならtrue
        this.magnet_rise   = false // でんじふゆう状態の経過ターン数
        this.max_guard     = false // ダイウォール状態ならtrue
        this.micle         = false // ミクルのみ　食べたターンは1、効果が続く次のターンは2
        this.minimize      = false // ちいさくなる状態ならtrue
        this.miracle_eye   = false // ミラクルアイ状態ならtrue
        this.nightmare     = false // あくむ　あくむ状態ならtrue、それ以外ならfalse
        this.no_ability    = false // 特性なし状態ならtrue
        this.no_retreat    = false // はいすいのじん状態ならtrue
        this.octolock      = false // たこがためを付与したポケモンのID
        this.one_shot      = false // 一撃必殺を受けたらtrue
        this.other_move    = false // 他の技が出る技の名前
        this.parental_bond = false // おやこあい補正が乗っているならtrue
        this.perish_song   = false // ほろびカウント数
        this.powder        = false // ふんじん状態ならtrue
        this.power_trick   = false // パワートリック状態ならtrue
        this.protect       = false // まもる状態ならその原因(まもる、トーチカ、ニードルガードなど)
        this.protect_num   = 0     // まもる系統の技の連続成功回数
        this.quash         = false // さきおくり
        this.rage          = false // いかり いかり状態ならtrue、それ以外ならfalse
        this.rank_down     = false // ランクが下がったらtrue
        this.rank_up       = false // ランクが上がったらtrue
        this.remaining_HP1 = false // 残りHP1で耐える効果
        this.rollout       = 0     // ころがる経過ターン数
        this.roost         = false // はねやすめによりひこうタイプを失ったら　"ノーマル", "first", "second" のどれか
        this.second        = false // こうこうのしっぽ・まんぷくおこう・あとだし - 同じ優先度内で最後に行動する
        this.shadow        = false // シャドーダイブ状態ならtrue
        this.sheer_force   = false // ちからずくが有効ならtrue
        this.shell_trap    = false // トラップシェル 設置状態なら"set"、行動順繰り上げならtrue、それ以外ならfalse
        this.shields_down  = false // リミットシールド　流星の姿ならtrue
        this.skin          = false // 発動したスキン系の特性、それ以外はfalse
        this.sky_drop      = false // フリーフォール　上空に連れ去られているときはtrue、それ以外ならfalse
        this.slow_start    = false // スロースタート経過ターン数　5ターン経過したらtrue
        this.smack_down    = false // うちおとす状態ならtrue
        this.stockpile     = 0     // たくわえた回数
        this.stockpile_B   = 0     // たくわえるで防御が上がった回数
        this.stockpile_D   = 0     // たくわえるで特防が上がった回数
        this.strength_sap  = false // ちからをすいとるを受けた時の攻撃ランク
        this.struggle      = false // わるあがきしか使えなければtrue
        this.substitute    = 0     // みがわり残りHP
        this.tar_shot      = false // タールショット状態ならtrue
        this.taunt         = 0     // ちょうはつ経過ターン数
        this.telekinesis   = false // テレキネシス状態の経過ターン数
        this.thrash_move   = false // あばれる状態になった技
        this.thrash_turn   = 0     // あばれる状態の経過ターン数
        this.throat_chop   = 0     // じごくづき経過ターン数(1~2)
        this.torment       = false // いちゃもん状態ならtrue
        this.transform     = false // へんしん状態ならtrue
        this.truant        = false // なまけ　怠けるターンはtrue、それ以外はfalse
        this.unburden      = false // かるわざが有効ならtrue
        this.uproar        = 0     // さわぐ経過ターン数
        this.yawn          = false // あくびを受けてからのターン数(1,2)　2の時にねむる
    }

    set myAfter_you( value )     { this.after_you = value }
    set myAqua_ring( value )     { this.aqua_ring = value }
    set myAssurance( value )     { this.assurance = value }
    set myAttract( value )       { this.attract = value }
    set myAutotomize( value )    { this.autotomize = value }
    set myBeak_blast( value )    { this.beak_blast = value }
    set myBelch( value )         { this.belch = value }
    set myBerserk( value )       { this.berserk = value }
    set myBide_damage( value )   { this.bide_damage = value }
    set myBide_turn( value )     { this.bide_turn = value }
    set myBind_ID( value )       { this.bind_ID = value }
    set myBind_long( value )     { this.bind_long = value }
    set myBind_turn( value )     { this.bind_turn = value }
    set myBind_strong( value )   { this.bind_strong = value }
    set myCant_escape( value )   { this.cant_escape = value }
    set myCant_move( value )     { this.cant_move = value }
    set myCharge( value )        { this.charge = value }
    set myChi_strike( value )    { this.chi_strike = value }
    set myChoice( value )        { this.choice = value }
    set myConfusion( value )     { this.confusion = value }
    set myCritical( value )      { this.critical = value }
    set myCurse( value )         { this.curse = value }
    set myDamage( value )        { this.damage = value }
    set myDefense_curl( value )  { this.defense_curl = value }
    set myDestiny_bond( value )  { this.destiny_bond = value }
    set myDig( value )           { this.dig = value }
    set myDisable_move( value )  { this.disable_move = value }
    set myDisable_turn( value )  { this.disable_turn = value }
    set myDive( value )          { this.dive = value }
    set myDynamax( value )       { this.dynamax = value }
    set myElectrify( value )     { this.electrify = value }
    set myEmbargo( value )       { this.embargo = value }
    set myEncore_move( value )   { this.encore_move = value }
    set myEncore_turn( value )   { this.encore_turn = value }
    set myEndure( value )        { this.endure = value }
    set myExplosion( value )     { this.explosion = value }
    set myFilling( value )       { this.filling = value }
    set myFirst( value )         { this.first = value }
    set myFlinch( value )        { this.flinch = value } 
    set myFlash_fire( value )    { this.flash_fire = value }
    set myFly( value )           { this.fly = value } 
    set myForesight( value )     { this.foresight = value }
    set myForest_curse( value )  { this.forest_curse = value }
    set myFury_cutter( value )   { this.fury_cutter = value }
    set myGem( value )           { this.gem = value }
    set myGrudge( value )        { this.grudge = value }
    set myGulp_missile( value )  { this.gulp_missile = value }
    set myHalf_berry( value )    { this.half_berry = value }
    set myHalloween( value )     { this.halloween = value }
    set myHeal_lock( value )     { this.heal_block = value }
    set myHelping_hand( value )  { this.helping_hand = value }
    set myHistory( value )       { this.history = value }
    set myHunger_switch( value ) { this.hunger_switch = value }
    set myIce_ball( value )      { this.ice_ball = value }
    set myImprison( value )      { this.imprison = value }
    set myIngrain( value )       { this.ingrain = value }
    set myLanding( value )       { this.landing = value }
    set myLaser_focus( value )   { this.laser_focus = value }
    set myLeech_seed( value )    { this.leech_seed = value }
    set myLock_on( value )       { this.lock_on = value }
    set myMagic_coat( value )    { this.magic_coat = value }
    set myMagnet_rise( value )   { this.magnet_rise = value }
    set myMax_guard( value )     { this.max_guard = value }
    set myMicle( value )         { this.micle = value }
    set myMinimize( value )      { this.minimize = value }
    set myMiracle_eye( value )   { this.miracle_eye = value }
    set myNightmare( value )     { this.nightmare = value }
    set myNo_ability( value )    { this.no_ability = value }
    set myNo_retreat( value )    { this.no_retreat = value }
    set myOctolock( value )      { this.octolock = value }
    set myOne_shot( value )      { this.one_shot = value }
    set myOther_move( value )    { this.other_move = value }
    set myParental_bond( value ) { this.parental_bond = value }
    set myPerish_song( value )   { this.perish_song = value }
    set myPowder( value )        { this.powder = value }
    set myPower_trick( value )   { this.power_trick = value }
    set myProtect( value )       { this.protect = value }
    set myProtect_num( value )   { this.protect_num = value }
    set myQuash( value )         { this.quash = value }
    set myRage( value )          { this.rage = value }
    set myRank_down( value )     { this.rank_down = value }
    set myRank_up( value )       { this.rank_up = value }
    set myRemaining_HP1( value ) { this.remaining_HP1 = value }
    set myRollout( value )       { this.rollout = value }
    set myRoost( value )         { this.roost = value }
    set mySecond( value )        { this.second = value }
    set myShadow( value )        { this.shadow = value }
    set mySheer_force( value )   { this.sheer_force = value }
    set myShell_trap( value )    { this.shell_trap = value }
    set myShields_down( value )  { this.shields_down = value }
    set mySkin( value )          { this.skin = value }
    set mySky_drop( value )      { this.sky_drop = value }
    set mySlow_start( value )    { this.slow_start = value }
    set mySmack_down( value )    { this.smack_down = value }
    set myStockpile( value )     { this.stockpile = value }
    set myStockpile_B( value )   { this.stockpile_B = value }
    set myStockpile_D( value )   { this.stockpile_D = value }
    set myStrength_sap( value )  { this.strength_sap = value }
    set myStruggle( value )      { this.struggle = value }
    set mySubstitute( value )    { this.substitute = value }
    set myTar_shot( value )      { this.tar_shot = value }
    set myTaunt( value )         { this.taunt = value }
    set myTelekinesis( value )   { this.telekinesis = value }
    set myThrash( value )        { this.myThrash = value }
    set myThrash_turn( value )   { this.myThrash_turn = value }
    set myThroat_chop( value )   { this.throat_chop = value }
    set myTransform( value )     { this.transform = value }
    set myTruant( value )        { this.truant = value }
    set myTorment( value )       { this.torment = value }
    set myUnburden( value )      { this.unburden = value }
    set myUproar( value )        { this.uproar = value }
    set myYawn( value )          { this.yawn = value }
    
    get myAfter_you()     { return this.after_you }
    get myAqua_ring()     { return this.aqua_ring }
    get myAssurance()     { return this.assurance }
    get myAttract()       { return this.attract }
    get myAutotomize()    { return this.autotomize }
    get myBeak_blast()    { return this.beak_blast }
    get myBelch()         { return this.belch }
    get myBerserk()       { return this.berserk }
    get myBide_damage()   { return this.bide_damage }
    get myBide_turn()     { return this.bide_turn }
    get myBind_ID()       { return this.bind_ID }
    get myBind_long()     { return this.bind_long }
    get myBind_turn()     { return this.bind_turn }
    get myBind_strong()   { return this.bind_strong }
    get myCant_escape()   { return this.cant_escape }
    get myCant_move()     { return this.cant_move }
    get myCharge()        { return this.charge }
    get myChi_strike()    { return this.chi_strike }
    get myChoice()        { return this.choice }
    get myConfusion()     { return this.confusion }
    get myCritical()      { return this.critical }
    get myCurse()         { return this.curse }
    get myDamage()        { return this.damage }
    get myDefense_curl()  { return this.defense_curl }
    get myDestiny_bond()  { return this.destiny_bond }
    get myDig()           { return this.dig }
    get myDisable_move()  { return this.disable_move }
    get myDisable_turn()  { return this.disable_turn }
    get myDive()          { return this.dive }
    get myDynamax()       { return this.dynamax }
    get myElectrify()     { return this.electrify }
    get myEmbargo()       { return this.embargo }
    get myEncore_move()   { return this.encore_move }
    get myEncore_turn()   { return this.encore_turn }
    get myEndure()        { return this.endure }
    get myExplosion()     { return this.explosion }
    get myFilling()       { return this.filling }
    get myFirst()         { return this.first }
    get myFlinch()        { return this.flinch }
    get myFlash_fire()    { return this.flash_fire }
    get myFly()           { return this.fly }
    get myForesight()     { return this.foresight }
    get myForest_curse()  { return this.forest_curse }
    get myFury_cutter()   { return this.fury_cutter }
    get myGem()           { return this.gem }
    get myGrudge()        { return this.grudge }
    get myGulp_missile()  { return this.gulp_missile }
    get myHalloween()     { return this.halloween }
    get myHalf_berry()    { return this.half_berry }
    get myHeal_lock()     { return this.heal_block }
    get myHelping_hand()  { return this.helping_hand }
    get myHistory()       { return this.history }
    get myHunger_switch() { return this.hunger_switch }
    get myIce_ball()      { return this.ice_ball }
    get myImprison()      { return this.imprison }
    get myIngrain()       { return this.ingrain }
    get myLanding()       { return this.landing }
    get myLaser_focus()   { return this.laser_focus }
    get myLeech_seed()    { return this.leech_seed }
    get myLock_on()       { return this.lock_on }
    get myMagic_coat()    { return this.magic_coat }
    get myMagnet_rise()   { return this.magnet_rise }
    get myMax_guard()     { return this.max_guard }
    get myMicle()         { return this.micle }
    get myMinimize()      { return this.minimize }
    get myMiracle_eye()   { return this.miracle_eye }
    get myNightmare()     { return this.nightmare }
    get myNo_ability()    { return this.no_ability }
    get myNo_retreat()    { return this.no_retreat }
    get myOctolock()      { return this.octolock }
    get myOne_shot()      { return this.one_shot }
    get myOther_move()    { return this.other_move }
    get myParental_bond() { return this.parental_bond }
    get myPerish_song()   { return this.perish_song }
    get myPower_trick()   { return this.power_trick }
    get myPowder()        { return this.powder }
    get myProtect()       { return this.protect }
    get myProtect_num()   { return this.protect_num }
    get myQuash()         { return this.quash }
    get myRage()          { return this.rage }
    get myRank_down()     { return this.rank_down }
    get myRank_up()       { return this.rank_up }
    get myRemaining_HP1() { return this.remaining_HP1 }
    get myRollout()       { return this.rollout }
    get myRoost()         { return this.roost }
    get mySecond()        { return this.second }
    get myShadow()        { return this.shadow }
    get mySheer_force()   { return this.sheer_force }
    get myShell_trap()    { return this.shell_trap }
    get myShields_down()  { return this.shields_down }
    get mySkin()          { return this.skin }
    get mySky_drop()      { return this.sky_drop }
    get mySlow_start()    { return this.slow_start }
    get mySmack_down()    { return this.smack_down }
    get myStockpile()     { return this.stockpile }
    get myStockpile_B()   { return this.stockpile_B }
    get myStockpile_D()   { return this.stockpile_D }
    get myStrength_sap()  { return this.strength_sap }
    get myStruggle()      { return this.struggle }
    get mySubstitute()    { return this.substitute }
    get myTar_shot()      { return this.tar_shot }
    get myTaunt()         { return this.taunt }
    get myTelekinesis()   { return this.telekinesis }
    get myThrash()        { return this.thrash }
    get myThrash_turn()   { return this.thrash_turn } 
    get myThroat_chop()   { return this.throat_chop }
    get myTorment()       { return this.torment }
    get myTransform()     { return this.transform }
    get myTruant()        { return this.truant }
    get myUnburden()      { return this.unburden }
    get myUproar()        { return this.uproar }
    get myYawn()          { return this.yawn }
}


class Field {
    constructor(trainer_name) {
        this.trainer_name  = trainer_name

        this.aurora_clay   = false // オーロラベール　ひかりのねんどならtrue
        this.aurora_veil   = false // オーロラベール経過ターン数
        this.cannonade     = false // キョダイホウゲキ経過ターン数
        this.extender      = false // グランドコートが有効ならtrue
        this.fire_ocean    = false // ひのうみ経過ターン数
        this.light_clay    = false // ひかりのかべ　ひかりのねんどならtrue
        this.light_screen  = false // ひかりのかべ経過ターン数
        this.lucky_chant   = false // おまじない経過ターン数
        this.mat_block     = false // たたみがえし状態ならtrue
        this.mist          = false // しろいきり状態ならtrue
        this.quick_guard   = false // ファストガード状態ならtrue
        this.rainbow       = false // にじ経過ターン数
        this.reflect       = false // リフレクター経過ターン数
        this.reflect_clay  = false // リフレクター　ひかりのねんどならtrue
        this.safeguard     = false // しんぴのまもり経過ターン数
        this.spikes        = 0     // まきびしの数
        this.spotlight     = []    // 注目の的状態の{position, couse} (怒りの粉、この指など)
        this.stealth_rock  = false // ステルスロック状態ならtrue
        this.steelsurge    = false // キョダイコウジン状態ならtrue
        this.sticky_web    = false // ねばねばネット状態ならtrue
        this.tailwind      = false // おいかぜ経過ターン数
        this.toxic_spikes  = 0     // どくびしの数
        this.vine_lash     = false // キョダイベンタツ経過ターン数
        this.volcalith     = false // キョダイフンセキ経過ターン数
        this.wetland       = false // しつげん経過ターン数
        this.weather_long  = false // 天候持続系アイテムならtrue
        this.wide_guard    = false // ワイドガード状態ならtrue
        this.wildfire      = false // キョダイゴクエン経過ターン数
        this.wish_data     = [{heal: 0, position: 0, turn: 0}, {heal: 0, position:1, turn: 0}] // ねがいごと回復量、場所、経過ターン数
    }

    set myAurora_clay( value )   { this.aurora_clay = value }
    set myAurora_veil( value )   { this.aurora_veil = value }
    set myCannonade( value )     { this.cannonade = value }
    set myExtender( value )      { this.extender = value }
    set myFire_ocean( value )    { this.fire_ocean = value }
    set myLight_clay( value )    { this.light_clay = value }
    set myLight_screen( value )  { this.light_screen = value }
    set myLucky_chant( value )   { this.lucky_chant = value }
    set myMat_block( value )     { this.mat_block = value }
    set myMist( value )          { this.mist = value }
    set myQuick_guard( value )   { this.quick_guard = value }
    set myRainbow( value )       { this.rainbow = value }
    set myReflect( value )       { this.reflect = value }
    set myReflect_clay( value )  { this.reflect_clay = value }
    set mySafeguard( value )     { this.safeguard = value }
    set mySpikes( value )        { this.spikes = value }
    set mySpotlight( value )     { this.spotlight = value }
    set myStealth_rock( value )  { this.stealth_rock = value }
    set mySteelsurge( value )    { this.steelsurge = value }
    set mySticky_web( value )    { this.sticky_web = value }
    set myTailwind( value )      { this.tailwind = value }
    set myToxic_spikes( value)   { this.toxic_spikes = value }
    set myVine_lash( value )     { this.vine_lash = value }
    set myVolcalith( value )     { this.volcalith = value }
    set myWetland( value )       { this.wetland = value }
    set myWeather_long( value )  { this.weather_long = value }
    set myWildfire( value )      { this.wildfire = value }
    set myWide_guard( value )    { this.wide_guard = value }
    set myWish_data( value )     { this.wish_data = value }

    get myAurora_clay()   { return this.aurora_clay }
    get myAurora_veil()   { return this.aurora_veil }
    get myCannonade()     { return this.cannonade }
    get myExtender()      { return this.extender }
    get myFire_ocean()    { return this.fire_ocean }
    get myLight_clay()    { return this.light_clay }
    get myLight_screen()  { return this.light_screen }
    get myLucky_chant()   { return this.lucky_chant }
    get myMat_block()     { return this.mat_block }
    get myMist()          { return this.mist }
    get myQuick_guard()   { return this.quick_guard }
    get myRainbow()       { return this.rainbow }
    get myReflect()       { return this.reflect }
    get myReflect_clay()  { return this.reflect_clay }
    get mySafeguard()     { return this.safeguard }
    get mySpikes()        { return this.spikes }
    get mySpotlight()     { return this.spotlight }
    get myStealth_rock()  { return this.stealth_rock }
    get mySteelsurge()    { return this.steelsurge }
    get mySticky_web()    { return this.sticky_web }
    get myTailwind()      { return this.tailwind }
    get myToxic_spikes()  { return this.toxic_spikes }
    get myVine_lash()     { return this.vine_lash }
    get myVolcalith()     { return this.volcalith }
    get myWetland()       { return this.wetland }
    get myWeather_long()  { return this.weather_long }
    get myWide_guard()    { return this.wide_guard }
    get myWildfire()      { return this.wildfire }
    get myWish_data()     { return this.wish_data }

    get myTN() { return this.trainer_name }
}

class allField {
    constructor() {
        this.crafty_shield = false // トリックガード状態ならtrue
        this.drought       = false // 大日照りならtrue
        this.echoed_check  = false // エコーボイスがこのターン使われていたらtrue
        this.echoed_voice  = 0     // エコーボイスが連続したターン数
        this.electric      = false // エレキフィールド経過ターン数
        this.fairy_lock    = false // フェアリーロック　使用ターンは1　効果のあるターンは2
        this.future_sight  = []    // みらいよち/はめつのねがい　id:使用者のID、party:対象のチーム、position:対象の場所、turn:経過ターン数
        this.heavy_rain    = false // 大雨ならtrue
        this.grassy        = false // グラスフィールド経過ターン数
        this.graupel       = false // あられ経過ターン数
        this.gravity       = 0     // じゅうりょく　経過ターン数(1~5)
        this.ion_deluge    = false // プラズマシャワー状態ならtrue
        this.magic_room    = false // マジックルーム中だとtrue、それ以外ならfalse
        this.misty         = false // ミストフィールド経過ターン数
        this.mud_sport     = false // どろあそび経過ターン数
        this.psychic       = false // サイコフィールド経過ターン数
        this.rainy         = false // あめ経過ターン数
        this.sandstorm     = false // すなあらし経過ターン数
        this.sunny         = false // にほんばれ経過ターン数
        this.trick_room    = false // トリックルーム経過ターン数
        this.turbulence    = false // らんきりゅう状態ならtrue
        this.turn_end      = false // ターン途中ならfalse、ターン終了したならtrue
        this.water_sport   = false // みずあそび経過ターン数
        this.wonder_room   = false // ワンダールーム経過ターン数
        // 途中交代
        this.switch_me     = false // 自分が途中交代する
        this.switch_opp    = false // 相手が途中交代する
    }

    set myCrafty_shield( value ) { this.crafty_shield = value }
    set myDrought( value )       { this.drought = value }
    set myEchoed_check( value )  { this.echoed_check = value }
    set myEchoed_voice( value )  { this.echoed_voice = value }
    set myElectric( value )      { this.electric = value }
    set myFairy_lock( value )    { this.fairy_lock = value }
    set myFuture_sight( value )  { this.future_sight = value }
    set myHeavy_rain( value )    { this.heavy_rain = value }
    set myGrassy( value )        { this.grassy = value }
    set myGraupel( value )       { this.graupel = value }
    set myGravity( value )       { this.gravity = value }
    set myIon_deluge( value )    { this.ion_deluge = value }
    set myMagic_room( value )    { this.magic_room = value }
    set myMisty( value )         { this.misty = value }
    set myMud_sport( value )     { this.mud_sport = value }
    set myPsychic( value )       { this.psychic = value }
    set myRainy( value )         { this.rainy = value }
    set mySandstorm( value )     { this.sandstorm = value }
    set mySunny( value )         { this.sunny = value }
    set myTrick_room( value )    { this.trick_room = value }
    set myTurbulence( value )    { this.turbulence = value }
    set myTurn_end( value )      { this.turn_end = value }
    set myWater_sport( value )   { this.water_sport = value }
    set myWonder_room( value )   { this.wonder_room = value }
    // 途中応対
    set mySwitch_me( value )     { this.switch_me = value }
    set mySwitch_opp( value )    { this.switch_opp = value }

    get myCrafty_shield() { return this.crafty_shield }
    get myDrought()       { return this.drought }
    get myEchoed_check()  { return this.echoed_check }
    get myEchoed_voice()  { return this.echoed_voice}
    get myElectric()      { return this.electric }
    get myFairy_lock()    { return this.fairy_lock }
    get myFuture_sight()  { return this.future_sight }
    get myHeavy_rain()    { return this.heavy_rain }
    get myGrassy()        { return this.grassy }
    get myGraupel()       { return this.graupel }
    get myGravity()       { return this.gravity }
    get myIon_deluge()    { return this.ion_deluge }
    get myMagic_room()    { return this.magic_room }
    get myMisty()         { return this.misty }
    get myMud_sport()     { return this.mud_sport }
    get myPsychic()       { return this.psychic }
    get myRainy()         { return this.rainy }
    get mySandstorm()     { return this.sandstorm }
    get mySunny()         { return this.sunny }
    get myTrick_room()    { return this.trick_room }
    get myTurbulence()    { return this.turbulence }
    get myTurn_end()      { return this.turn_end }
    get myWater_sport()   { return this.water_sport }
    get myWonder_room()   { return this.wonder_room }
    // 途中交代
    get mySwitch_me()     { return this.switch_me }
    get mySwitch_opp()    { return this.switch_opp }
}