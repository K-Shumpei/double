// ランク変化させる変化技（対象が味方全体）
var statusMoveToChangeRankForAllOfUs = [
    {name: 'アシストギア', rank: [{parameter: 'atk', change: 1}, {parameter: 'sp_atk', change: 1}]}, 
    {name: 'じばそうさ', rank: [{parameter: 'def', change: 1}, {parameter: 'sp_def', change: 1}]}, 
    {name: 'とおぼえ', rank: [{parameter: 'atk', change: 1}]}
]

// ランク変化させる変化技（対象が相手全体）
var statusMoveToChangeRankForAllOfYou = [
    {name: 'あまいかおり', rank: [{parameter: 'evasion', change: -2}]}, 
    {name: 'いとをはく', rank: [{parameter: 'speed', change: -2}]}, 
    {name: 'しっぽをふる', rank: [{parameter: 'def', change: -1}]}, 
    {name: 'なきごえ', rank: [{parameter: 'atk', change: -1}]}, 
    {name: 'にらみつける', rank: [{parameter: 'def', change: -1}]}, 
    {name: 'ベノムトラップ', rank: [{parameter: 'atk', change: -1}, {parameter: 'sp_atk', change: -1}, {parameter: 'speed', change: -1}]}, 
    {name: 'ゆうわく', rank: [{parameter: 'sp_atk', change: -2}]}, 
    {name: 'わたほうし', rank: [{parameter: 'speed', change: -2}]}
]

// ランク変化させる変化技（対象が1体選択）
var statusMoveToChangeRankForOneOfThem = [
    {name: 'あまえる', rank: [{parameter: 'atk', change: -2}]}, 
    {name: 'いやなおと', rank: [{parameter: 'def', change: -2}]}, 
    {name: 'いばる', rank: [{parameter: 'atk', change: 2}]}, 
    {name: 'うそなき', rank: [{parameter: 'sp_def', change: -2}]}, 
    {name: 'えんまく', rank: [{parameter: 'accuract', change: -1}]}, 
    {name: 'おきみやげ', rank: [{parameter: 'atk', change: -2}, {parameter: 'sp_atk', change: -2}]}, 
    {name: 'おたけび', rank: [{parameter: 'atk', change: -1}, {parameter: 'sp_atk', change: -1}]}, 
    {name: 'おだてる', rank: [{parameter: 'sp_atk', change: 1}]}, 
    {name: 'かいでんぱ', rank: [{parameter: 'sp_atk', change: -2}]}, 
    {name: 'きんぞくおん', rank: [{parameter: 'sp_def', change: -2}]}, 
    {name: 'くすぐる', rank: [{parameter: 'atk', change: -1}, {parameter: 'def', change: -1}]}, 
    {name: 'こわいかお', rank: [{parameter: 'speed', change: -2}]}, 
    {name: 'すてゼリフ', rank: [{parameter: 'atk', change: -1}, {parameter: 'sp_atk', change: -1}]}, 
    {name: 'すなかけ', rank: [{parameter: 'accuract', change: -1}]}, 
    {name: 'スプーンまげ', rank: [{parameter: 'accuract', change: -1}]}, 
    {name: 'タールショット', rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'ちからをすいとる', rank: [{parameter: 'atk', change: -1}]}, 
    {name: 'つぶらなひとみ', rank: [{parameter: 'atk', change: -1}]}, 
    {name: 'デコレーション', rank: [{parameter: 'atk', change: 2}, {parameter: 'sp_atk', change: 2}]}, 
    {name: 'どくのいと', rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'ないしょばなし', rank: [{parameter: 'sp_atk', change: -1}]}, 
    {name: 'なかよくする', rank: [{parameter: 'atk', change: -1}]}, 
    {name: 'なみだめ', rank: [{parameter: 'atk', change: -1}, {parameter: 'sp_atk', change: -1}]}, 
    {name: 'フェザーダンス', rank: [{parameter: 'atk', change: -2}]}, 
    {name: 'フラッシュ', rank: [{parameter: 'accuract', change: -1}]}
]

// ランク変化させる変化技（対象が自分）
var statusMoveToChangeRankForMe = [
    {name: 'かくばる', rank: [{parameter: 'atk', change: 1}]}, 
    {name: 'かげぶんしん', rank: [{parameter: 'evasion', change: 1}]}, 
    {name: 'かたくなる', rank: [{parameter: 'def', change: 1}]}, 
    {name: 'からにこもる', rank: [{parameter: 'def', change: 1}]}, 
    {name: 'からをやぶる', rank: [{parameter: 'def', change: -1}, {parameter: 'sp_def', change: -1}, {parameter: 'atk', change: 2}, {parameter: 'sp_atk', change: 2}, {parameter: 'speed', change: 2}]}, 
    {name: 'ギアチェンジ', rank: [{parameter: 'speed', change: 2}, {parameter: 'atk', change: 1}]}, 
    {name: 'こうそくいどう', rank: [{parameter: 'speed', change: 2}]}, 
    {name: 'コスモパワー', rank: [{parameter: 'def', change: 1}, {parameter: 'sp_def', change: 1}]}, 
    {name: 'コットンガード', rank: [{parameter: 'def', change: 3}]}, 
    {name: 'ジオコントロール', rank: [{parameter: 'sp_atk', change: 2}, {parameter: 'sp_def', change: 2}, {parameter: 'speed', change: 2}]}, 
    {name: 'じゅうでん', rank: [{parameter: 'sp_def', change: 1}]}, 
    {name: 'ソウルビート', rank: [{parameter: 'atk', change: 1}, {parameter: 'def', change: 1}, {parameter: 'sp_atk', change: 1}, {parameter: 'sp_def', change: 1}, {parameter: 'speed', change: 1}]}, 
    {name: 'たくわえる', rank: [{parameter: 'def', change: 1}, {parameter: 'sp_def', change: 1}]}, 
    {name: 'ちいさくなる', rank: [{parameter: 'evasion', change: 2}]}, 
    {name: 'ちょうのまい', rank: [{parameter: 'sp_atk', change: 1}, {parameter: 'sp_def', change: 1}, {parameter: 'speed', change: 1}]}, 
    {name: 'つめとぎ', rank: [{parameter: 'atk', change: 1}, {parameter: 'accuract', change: 1}]}, 
    {name: 'つるぎのまい', rank: [{parameter: 'atk', change: 2}]}, 
    {name: 'てっぺき', rank: [{parameter: 'def', change: 2}]}, 
    {name: 'とぐろをまく', rank: [{parameter: 'atk', change: 1}, {parameter: 'def', change: 1}, {parameter: 'accuract', change: 1}]}, 
    {name: 'とける', rank: [{parameter: 'def', change: 2}]}, 
    {name: 'ドわすれ', rank: [{parameter: 'sp_def', change: 2}]}, 
    {name: 'ナインエボルブースト', rank: [{parameter: 'atk', change: 2}, {parameter: 'def', change: 2}, {parameter: 'sp_atk', change: 2}, {parameter: 'sp_def', change: 2}, {parameter: 'speed', change: 2}]}, 
    {name: 'はいすいのじん', rank: [{parameter: 'atk', change: 1}, {parameter: 'def', change: 1}, {parameter: 'sp_atk', change: 1}, {parameter: 'sp_def', change: 1}, {parameter: 'speed', change: 1}]}, 
    {name: 'バリアー', rank: [{parameter: 'def', change: 2}]}, 
    {name: 'ビルドアップ', rank: [{parameter: 'atk', change: 1}, {parameter: 'def', change: 1}]}, 
    {name: 'ふるいたてる', rank: [{parameter: 'atk', change: 1}, {parameter: 'sp_atk', change: 1}]}, 
    {name: 'ほおばる', rank: [{parameter: 'def', change: 2}]}, 
    {name: 'ほたるび', rank: [{parameter: 'sp_atk', change: 3}]}, 
    {name: 'ぼうぎょしれい', rank: [{parameter: 'def', change: 1}, {parameter: 'sp_def', change: 1}]}, 
    {name: 'ボディパージ', rank: [{parameter: 'speed', change: 2}]}, 
    {name: 'めいそう', rank: [{parameter: 'sp_atk', change: 1}, {parameter: 'sp_def', change: 1}]}, 
    {name: 'ヨガのポーズ', rank: [{parameter: 'atk', change: 1}]}, 
    {name: 'りゅうのまい', rank: [{parameter: 'atk', change: 1}, {parameter: 'speed', change: 1}]}, 
    {name: 'ロックカット', rank: [{parameter: 'speed', change: 2}]}, 
    {name: 'わるだくみ', rank: [{parameter: 'sp_atk', change: 2}]}
]

// 状態異常を付与する変化技（対象が1体選択）
var statusMoveToMakeAbnormalForOneOfThem = [
    {name: 'あくまのキッス', ailment: 'ねむり'}, 
    {name: 'あやしいひかり', ailment: 'こんらん'}, 
    {name: 'いばる', ailment: 'こんらん'}, 
    {name: 'うたう', ailment: 'ねむり'}, 
    {name: 'おにび', ailment: 'やけど'}, 
    {name: 'おだてる', ailment: 'こんらん'}, 
    {name: 'キノコのほうし', ailment: 'ねむり'}, 
    {name: 'くさぶえ', ailment: 'ねむり'}, 
    {name: 'さいみんじゅつ', ailment: 'ねむり'}, 
    {name: 'しびれごな', ailment: 'まひ'}, 
    {name: 'ちょうおんぱ', ailment: 'こんらん'}, 
    {name: 'てんしのキッス', ailment: 'こんらん'}, 
    {name: 'でんじは', ailment: 'まひ'}, 
    {name: 'どくどく', ailment: 'もうどく'}, 
    {name: 'どくのいと', ailment: 'どく'}, 
    {name: 'どくのこな', ailment: 'どく'}, 
    {name: 'ねむりごな', ailment: 'ねむり'}, 
    {name: 'へびにらみ', ailment: 'まひ'}
]

// 状態異常を付与する変化技（対象が相手全体）
var statusMoveToMakeAbnormalForAllOfYou = [
    {name: 'ダークホール', ailment: 'ねむり'}, 
    {name: 'どくガス', ailment: 'どく'}
]

// 状態異常を付与する変化技（対象が自分以外）
var statusMoveToMakeAbnormalForExceptForme = [
    {name: 'フラフラダンス', ailment: 'こんらん'}
]