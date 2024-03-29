// 優先度が設定されている技
var priorityDegreeList = [
    {name: 'アクアジェット', priority: 1}, 
    {name: 'アクセルロック', priority: 1}, 
    {name: 'あてみなげ', priority: -1}, 
    {name: 'いかりのこな', priority: 2}, 
    {name: 'カウンター', priority: -5}, 
    {name: 'かげうち', priority: 1}, 
    {name: 'がまん', priority: 1}, 
    {name: 'きあいパンチ', priority: -3}, 
    {name: 'キングシールド', priority: 4}, 
    {name: 'くちばしキャノン', priority: -3}, 
    {name: 'こおりのつぶて', priority: 1}, 
    {name: 'このゆびとまれ', priority: 2}, 
    {name: 'こらえる', priority: 4}, 
    {name: 'サイドチェンジ', priority: 2}, 
    {name: 'しんくうは', priority: 1}, 
    {name: 'しんそく', priority: 2}, 
    {name: 'スポットライト', priority: 3}, 
    {name: 'ダイウォール', priority: 4}, 
    {name: 'つぶらなひとみ', priority: 1}, 
    {name: 'てだすけ', priority: 5}, 
    {name: 'テレポート', priority: -6}, 
    {name: 'であいがしら', priority: 2}, 
    {name: 'でんこうせっか', priority: 1}, 
    {name: 'トーチカ', priority: 4}, 
    {name: 'ともえなげ', priority: -6}, 
    {name: 'トラップシェル', priority: -3}, 
    {name: 'トリックガード', priority: 3}, 
    {name: 'トリックルーム', priority: -7}, 
    {name: 'ドラゴンテール', priority: -6}, 
    {name: 'ニードルガード', priority: 4}, 
    {name: 'ねこだまし', priority: 3}, 
    {name: 'ばちばちアクセル', priority: 2}, 
    {name: 'バレットパンチ', priority: 1}, 
    {name: 'ファストガード', priority: 3}, 
    {name: 'ふいうち', priority: 1}, 
    {name: 'フェイント', priority: 2}, 
    {name: 'ふきとばし', priority: -6}, 
    {name: 'ふんじん', priority: 1}, 
    {name: 'ブロッキング', priority: 4}, 
    {name: 'プラズマシャワー', priority: 1}, 
    {name: 'ほえる', priority: -6}, 
    {name: 'マジックコート', priority: 4}, 
    {name: 'マッハパンチ', priority: 1}, 
    {name: 'まもる', priority: 4}, 
    {name: 'みきり', priority: 4}, 
    {name: 'みずしゅりけん', priority: 1}, 
    {name: 'ミラーコート', priority: -5}, 
    {name: 'ゆきなだれ', priority: -4}, 
    {name: 'よこどり', priority: 4}, 
    {name: 'リベンジ', priority: -4}, 
    {name: 'ワイドガード', priority: 3}
]

// 追加効果のある技（対象のランク変化）
const additionalEffectToChangeYourRank = [
    {name: 'アイアンテール', probability: 30, rank: [{parameter: 'def', change: -1}]}, 
    {name: 'アクアブレイク', probability: 20, rank: [{parameter: 'def', change: -1}]}, 
    {name: 'アシッドボム', probability: 100, rank: [{parameter: 'sp_def', change: -2}]}, 
    {name: 'あわ', probability: 10, rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'いわくだき', probability: 50, rank: [{parameter: 'def', change: -1}]}, 
    {name: 'エナジーボール', probability: 10, rank: [{parameter: 'sp_def', change: -1}]}, 
    {name: 'エレキネット', probability: 100, rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'オーロラビーム', probability: 10, rank: [{parameter: 'atk', change: -1}]}, 
    {name: 'オクタンほう', probability: 50, rank: [{parameter: 'accuracy', change: -1}]}, 
    {name: 'かみくだく', probability: 20, rank: [{parameter: 'def', change: -1}]}, 
    {name: 'からみつく', probability: 10, rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'がんせきふうじ', probability: 100, rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'きあいだま', probability: 10, rank: [{parameter: 'sp_def', change: -1}]}, 
    {name: 'グラスミキサー', probability: 50, rank: [{parameter: 'accuracy', change: -1}]}, 
    {name: 'こごえるかぜ', probability: 100, rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'こごえるせかい', probability: 100, rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'サイコキネシス', probability: 10, rank: [{parameter: 'sp_def', change: -1}]}, 
    {name: 'シードフレア', probability: 40, rank: [{parameter: 'sp_def', change: -2}]}, 
    {name: 'シェルブレード', probability: 50, rank: [{parameter: 'def', change: -1}]}, 
    {name: 'シャドーボール', probability: 20, rank: [{parameter: 'sp_def', change: -1}]}, 
    {name: 'シャドーボーン', probability: 20, rank: [{parameter: 'def', change: -1}]}, 
    {name: 'Gのちから', probability: 100, rank: [{parameter: 'def', change: -1}]}, 
    {name: 'じならし', probability: 100, rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'じゃれつく', probability: 10, rank: [{parameter: 'atk', change: -1}]}, 
    {name: 'ソウルクラッシュ', probability: 100, rank: [{parameter: 'sp_atk', change: -1}]}, 
    {name: 'だいちのちから', probability: 10, rank: [{parameter: 'sp_def', change: -1}]}, 
    {name: 'だくりゅう', probability: 30, rank: [{parameter: 'accuracy', change: -1}]}, 
    {name: 'とびかかる', probability: 100, rank: [{parameter: 'atk', change: -1}]}, 
    {name: 'トロピカルキック', probability: 100, rank: [{parameter: 'atk', change: -1}]}, 
    {name: 'ドラムアタック', probability: 100, rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'どろかけ', probability: 100, rank: [{parameter: 'accuracy',  change: -1}]} ,  
    {name: 'どろばくだん', probability: 30, rank: [{parameter: 'accuracy', change: -1}]}, 
    {name: 'ナイトバースト', probability: 40, rank: [{parameter: 'accuracy', change: -1}]}, 
    {name: 'はいよるいちげき', probability: 100, rank: [{parameter: 'sp_atk', change: -1}]}, 
    {name: 'バークアウト', probability: 100, rank: [{parameter: 'sp_atk', change: -1}]}, 
    {name: 'バブルこうせん', probability: 10, rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'ブレイククロー', probability: 50, rank: [{parameter: 'def', change: -1}]}, 
    {name: 'ほのおのムチ', probability: 100, rank: [{parameter: 'def', change: -1}]}, 
    {name: 'マジカルフレイム', probability: 100, rank: [{parameter: 'sp_atk', change: -1}]}, 
    {name: 'マッドショット', probability: 100, rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'ミストボール', probability: 50, rank: [{parameter: 'sp_atk', change: -1}]}, 
    {name: 'ミラーショット', probability: 30, rank: [{parameter: 'accuracy', change: -1}]}, 
    {name: 'ムーンフォース', probability: 30, rank: [{parameter: 'sp_atk', change: -1}]}, 
    {name: 'むしのさざめき', probability: 10, rank: [{parameter: 'sp_def', change: -1}]}, 
    {name: 'むしのていこう', probability: 100, rank: [{parameter: 'sp_atk', change: -1}]}, 
    {name: 'ようかいえき', probability: 10, rank: [{parameter: 'sp_def', change: -1}]}, 
    {name: 'らいめいげり', probability: 100, rank: [{parameter: 'def', change: -1}]}, 
    {name: 'ラスターカノン', probability: 10, rank: [{parameter: 'sp_def', change: -1}]}, 
    {name: 'ラスターパージ', probability: 50, rank: [{parameter: 'sp_def', change: -1}]}, 
    {name: 'りんごさん', probability: 100, rank: [{parameter: 'sp_def', change: -1}]}, 
    {name: 'ローキック', probability: 100, rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'ワイドブレイカー', probability: 100, rank: [{parameter: 'atk', change: -1}]}
]

// 追加効果のある技（自分のランク変化）
const additionalEffectToChangeMyRank = [
    {name: 'あやしいかぜ', probability: 10, rank: [{parameter: 'atk', change: 1}, {parameter: 'def', change: 1}, {parameter: 'sp_atk', change: 1}, {parameter: 'sp_def', change: 1}, {parameter: 'speed', change: 1}]}, 
    {name: 'オーラぐるま', probability: 100, rank: [{parameter: 'speed', change: 1}]}, 
    {name: 'ぎんいろのかぜ', probability: 10, rank: [{parameter: 'atk', change: 1}, {parameter: 'def', change: 1}, {parameter: 'sp_atk', change: 1}, {parameter: 'sp_def', change: 1}, {parameter: 'speed', change: 1}]}, 
    {name: 'グロウパンチ', probability: 100, rank: [{parameter: 'atk', change: 1}]}, 
    {name: 'げんしのちから', probability: 10, rank: [{parameter: 'atk', change: 1}, {parameter: 'def', change: 1}, {parameter: 'sp_atk', change: 1}, {parameter: 'sp_def', change: 1}, {parameter: 'speed', change: 1}]}, 
    {name: 'こうそくスピン', probability: 100, rank: [{parameter: 'speed', change: 1}]}, 
    {name: 'コメットパンチ', probability: 20, rank: [{parameter: 'atk', change: 1}]}, 
    {name: 'ダイヤストーム', probability: 50, rank: [{parameter: 'def', change: 2}]}, 
    {name: 'チャージビーム', probability: 70, rank: [{parameter: 'sp_atk', change: 1}]}, 
    {name: 'ニトロチャージ', probability: 100, rank: [{parameter: 'speed', change: 1}]}, 
    {name: 'はがねのつばさ', probability: 10, rank: [{parameter: 'def', change: 1}]}, 
    {name: 'ほのおのまい', probability: 50, rank: [{parameter: 'sp_atk', change: 1}]}, 
    {name: 'メタルクロー', probability: 10, rank: [{parameter: 'atk', change: 1}]}
]

// 追加効果のある技（対象に状態異常を付与する）
const additionalEffectToMakeAbnormal = [
    {name: 'あおいほのお', probability: 20, ailment: 'やけど'}, 
    {name: 'いてつくしせん', probability: 10, ailment: 'こおり'}, 
    {name: 'いにしえのうた', probability: 10, ailment: 'ねむり'}, 
    {name: 'おしゃべり', probability: 100, ailment: 'こんらん'}, 
    {name: 'かえんぐるま', probability: 10, ailment: 'やけど'}, 
    {name: 'かえんだん', probability: 30, ailment: 'やけど'}, 
    {name: 'かえんほうしゃ', probability: 10, ailment: 'やけど'}, 
    {name: 'かえんボール', probability: 10, ailment: 'やけど'}, 
    {name: 'かみなり', probability: 30, ailment: 'まひ'}, 
    {name: 'かみなりのキバ', probability: 10, ailment: 'まひ'},
    {name: 'かみなりパンチ', probability: 10, ailment: 'まひ'}, 
    {name: 'クロスポイズン', probability: 10, ailment: 'どく'}, 
    {name: 'コールドフレア', probability: 30, ailment: 'やけど'}, 
    {name: 'こおりのキバ', probability: 10, ailment: 'こおり'}, 
    {name: 'こなゆき', probability: 10, ailment: 'こおり'}, 
    {name: 'サイケこうせん', probability: 10, ailment: 'こんらん'}, 
    {name: 'ざぶざぶサーフ', probability: 30, ailment: 'まひ'}, 
    {name: 'シェルアームズ', probability: 20, ailment: 'どく'}, 
    {name: 'シグナルビーム', probability: 10, ailment: 'こんらん'}, 
    {name: 'したでなめる', probability: 30, ailment: 'まひ'}, 
    {name: 'しっとのほのお', probability: 100, ailment: 'やけど'}, 
    {name: '10まんボルト', probability: 10, ailment: 'まひ'}, 
    {name: 'スチームバースト', probability: 30, ailment: 'やけど'}, 
    {name: 'スパーク', probability: 30, ailment: 'まひ'}, 
    {name: 'スモッグ', probability: 40, ailment: 'どく'}, 
    {name: 'せいなるほのお', probability: 50, ailment: 'やけど'}, 
    {name: 'だいもんじ', probability: 10, ailment: 'やけど'}, 
    {name: 'ダストシュート', probability: 30, ailment: 'どく'}, 
    {name: 'ダブルニードル', probability: 20, ailment: 'どく'}, 
    {name: 'でんきショック', probability: 10, ailment: 'まひ'}, 
    {name: 'でんじほう', probability: 100, ailment: 'まひ'}, 
    {name: 'とびはねる', probability: 30, ailment: 'まひ'}, 
    {name: 'どくづき', probability: 30, ailment: 'どく'}, 
    {name: 'どくどくのキバ', probability: 50, ailment: 'もうどく'}, 
    {name: 'どくばり', probability: 30, ailment: 'どく'}, 
    {name: 'ねっさのだいち', probability: 30, ailment: 'やけど'}, 
    {name: 'ねっとう', probability: 30, ailment: 'やけど'}, 
    {name: 'ねっぷう', probability: 10, ailment: 'やけど'}, 
    {name: 'ねんりき', probability: 10, ailment: 'こんらん'}, 
    {name: 'のしかかり', probability: 30, ailment: 'まひ'}, 
    {name: 'はっけい', probability: 30, ailment: 'まひ'}, 
    {name: 'ばくれつパンチ', probability: 100, ailment: 'こんらん'}, 
    {name: 'ひのこ', probability: 10, ailment: 'やけど'}, 
    {name: 'びりびりエレキ', probability: 100, ailment: 'まひ'}, 
    {name: 'ピヨピヨパンチ', probability: 20, ailment: 'こんらん'}, 
    {name: 'ふぶき', probability: 10, ailment: 'こおり'}, 
    {name: 'フリーズドライ', probability: 10, ailment: 'こおり'}, 
    {name: 'フリーズボルト', probability: 30, ailment: 'まひ'}, 
    {name: 'フレアドライブ', probability: 10, ailment: 'やけど'}, 
    {name: 'ふんえん', probability: 30, ailment: 'やけど'}, 
    {name: 'ブレイズキック', probability: 10, ailment: 'やけど'}, 
    {name: 'ヘドロウェーブ', probability: 10, ailment: 'どく'}, 
    {name: 'ヘドロこうげき', probability: 30, ailment: 'どく'}, 
    {name: 'ヘドロばくだん', probability: 30, ailment: 'どく'}, 
    {name: 'ほうでん', probability: 30, ailment: 'まひ'}, 
    {name: 'ほっぺすりすり', probability: 100, ailment: 'まひ'}, 
    {name: 'ほのおのキバ', probability: 10, ailment: 'やけど'}, 
    {name: 'ほのおのパンチ', probability: 10, ailment: 'やけど'}, 
    {name: 'ぼうふう', probability: 30, ailment: 'こんらん'}, 
    {name: 'ボルテッカー', probability: 10, ailment: 'まひ'}, 
    {name: 'ポイズンテール', probability: 10, ailment: 'どく'}, 
    {name: 'みずのはどう', probability: 20, ailment: 'こんらん'}, 
    {name: 'めらめらバーン', probability: 100, ailment: 'やけど'}, 
    {name: 'らいげき', probability: 20, ailment: 'まひ'}, 
    {name: 'ライトニングサーフライド', probability: 100, ailment: 'まひ'}, 
    {name: 'りゅうのいぶき', probability: 30, ailment: 'まひ'}, 
    {name: 'れいとうパンチ', probability: 10, ailment: 'こおり'}, 
    {name: 'れいとうビーム', probability: 10, ailment: 'こおり'}, 
    {name: 'れんごく', probability: 100, ailment: 'やけど'}, 
    {name: 'ロッククライム', probability: 20, ailment: 'こんらん'}, 
    {name: 'ワンダースチーム', probability: 20, ailment: 'こんらん'}
]

// 追加効果のある技（対象をひるみ状態にする）
const additionalEffectToMakeFlinch = [
    {name: 'アイアンヘッド', probability: 30}, 
    {name: 'あくのはどう', probability: 20}, 
    {name: 'いびき', probability: 30}, 
    {name: 'いわなだれ', probability: 30}, 
    {name: 'エアスラッシュ', probability: 30}, 
    {name: 'おどろかす', probability: 30}, 
    {name: 'かみつく', probability: 30}, 
    {name: 'かみなりのキバ', probability: 10}, 
    {name: 'こおりのキバ', probability: 10}, 
    {name: 'ゴッドバード', probability: 30}, 
    {name: 'しねんのずつき', probability: 20}, 
    {name: 'じんつうりき', probability: 10}, 
    {name: 'ずつき', probability: 30}, 
    {name: 'たきのぼり', probability: 20}, 
    {name: 'たつまき', probability: 20}, 
    {name: 'ダブルパンツァー', probability: 30}, 
    {name: 'つららおとし', probability: 30}, 
    {name: 'ドラゴンダイブ', probability: 20}, 
    {name: 'ニードルアーム', probability: 30}, 
    {name: 'ねこだまし', probability: 100}, 
    {name: 'ハートスタンプ', probability: 30}, 
    {name: 'ハードローラー', probability: 30}, 
    {name: 'ひっさつまえば', probability: 10}, 
    {name: 'びりびりちくちく', probability: 30}, 
    {name: 'ふみつけ', probability: 30}, 
    {name: 'ふわふわフォール', probability: 30}, 
    {name: 'ホネこんぼう', probability: 10}, 
    {name: 'ほのおのキバ', probability: 10}, 
    {name: 'まわしげり', probability: 30}, 
    {name: 'もえあがるいかり', probability: 20}
]

// 追加効果のある技（その他の効果）
const additionalEffectOther = [
    'アンカーショット', 
    'オリジンズスーパーノヴァ', 
    'かげぬい', 
    'じごくづき', 
    'トライアタック', 
    'なげつける', 
    'ひみつのちから', 
    'ぶきみなじゅもん'
]

// 追加効果に含まれない効果がある技
// 技が成功すれば100%の確率で発動する。
// 特性りんぷん/ちからずくの影響を受けない。

// 1.自分のランクを下げる技
// 2.急所に当たりやすい技
// 3.反動ダメージを受ける技
// 4.自分がひんしになる技
// 5.反動で動けなくなる技
// 6.HPを吸収する技
// 7.バインド状態にする技
// 8.こおりを回復する技
// 9.相手を交代させる技
// 10.自分が交代する技
// 11.コンビネーション技
// 12.ダイマックス技
// 13.その他の技

const moveList_recover = [
    {name: 'いきいきバブル', rate: 0.5}, 
    {name: 'ウッドホーン', rate: 0.5}, 
    {name: 'きゅうけつ', rate: 0.5}, 
    {name: 'ギガドレイン', rate: 0.5}, 
    {name: 'すいとる', rate: 0.5}, 
    {name: 'デスウイング', rate: 0.7}, 
    {name: 'ドレインキッス', rate: 0.7}, 
    {name: 'ドレインパンチ', rate: 0.5}, 
    {name: 'パラボラチャージ', rate: 0.5}, 
    {name: 'メガドレイン', rate: 0.5}, 
    {name: 'ゆめくい', rate: 0.5}
]

const moveList_downMyRank = [
    {name: 'アームハンマー', rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'アイスハンマー', rank: [{parameter: 'speed', change: -1}]}, 
    {name: 'いじげんラッシュ', rank: [{parameter: 'def', change: -1}]}, 
    {name: 'インファイト', rank: [{parameter: 'def', change: -1}, {parameter: 'sp_def', change: -1}]}, 
    {name: 'オーバーヒート', rank: [{parameter: 'sp_atk', change: -2}]}, 
    {name: 'ガリョウテンセイ', rank: [{parameter: 'def', change: -1}, {parameter: 'sp_def', change: -1}]}, 
    {name: 'サイコブースト', rank: [{parameter: 'sp_atk', change: -2}]}, 
    {name: 'スケイルショット', rank: [{parameter: 'def', change: -1}, {parameter: 'speed', change: 1}]}, 
    {name: 'スケイルノイズ', rank: [{parameter: 'def', change: -1}]}, 
    {name: 'ばかぢから', rank: [{parameter: 'atk', change: -1}, {parameter: 'def', change: -1}]}, 
    {name: 'フルールカノン', rank: [{parameter: 'sp_atk', change: -2}]}, 
    {name: 'Vジェネレート', rank: [{parameter: 'def', change: -1}, {parameter: 'sp_def', change: -1}, {parameter: 'speed', change: -1}]}, 
    {name: 'リーフストーム', rank: [{parameter: 'sp_atk', change: -2}]}, 
    {name: 'りゅうせいぐん', rank: [{parameter: 'sp_atk', change: -2}]}
]

// 急所に当たりやすい技
var criticalMove= [
    {name: '1000まんボルト', critical: 2}, 
    {name: 'あくうせつだん', critical: 1}, 
    {name: 'あんこくきょうだ', critical: 3}, 
    {name: 'エアカッター', critical: 1}, 
    {name: 'エアロブラスト', critical: 1}, 
    {name: 'かまいたち', critical: 1}, 
    {name: 'からてチョップ', critical: 1}, 
    {name: 'きりさく', critical: 1}, 
    {name: 'クラブハンマー', critical: 1}, 
    {name: 'クロスチョップ', critical: 1}, 
    {name: 'クロスポイズン', critical: 1}, 
    {name: 'こうげきしれい', critical: 1}, 
    {name: 'こおりのいぶき', critical: 3}, 
    {name: 'ゴッドバード', critical: 1}, 
    {name: 'サイコカッター', critical: 1}, 
    {name: 'シャドークロー', critical: 1}, 
    {name: 'すいりゅうれんだ', critical: 3}, 
    {name: 'ストーンエッジ', critical: 1}, 
    {name: 'つじぎり', critical: 1}, 
    {name: 'ドリルライナー', critical: 1}, 
    {name: 'ねらいうち', critical: 1}, 
    {name: 'はっぱカッター', critical: 1}, 
    {name: 'ばちばちアクセル', critical: 3}, 
    {name: 'ブレイズキック', critical: 1}, 
    {name: 'ポイズンテール', critical: 1}, 
    {name: 'やまあらし', critical: 3}, 
    {name: 'リーフブレード', critical: 1}
]

// 反動ダメージを受ける技
const moveList_recoil = [
    {name: 'アフロブレイク', rate: 0.25}, 
    {name: 'ウッドハンマー', rate: 0.33}, 
    {name: 'じごくぐるま', rate: 0.25}, 
    {name: 'すてみタックル', rate: 0.33}, 
    {name: 'とっしん', rate: 0.25}, 
    {name: 'はめつのひかり', rate: 0.5}, 
    {name: 'フレアドライブ', rate: 0.33}, 
    {name: 'ブレイブバード', rate: 0.33}, 
    {name: 'ボルテッカー', rate: 0.33}, 
    {name: 'もろはのずつき', rate: 0.5}, 
    {name: 'ワイルドボルト', rate: 0.25}
]

// ダイウォールでも防げない技
var cannotProtectByDynaWall = [
    'アロマセラピー', 
    'アロマミスト', 
    'いかりのこな', 
    'いのちのしずく', 
    'いやしのすず', 
    'くろいまなざし', 
    'コーチング', 
    'このゆびとまれ', 
    'ジャングルヒール', 
    'つぼをつく', 
    'デコレーション', 
    'とおぼえ', 
    'ほろびのうた', 
    'ないしょばなし', 
    'なかよくする', 
    'なみだめ', 
    'なりきり', 
    'のろい', 
    'フェイント', 
    'みらいよち', 
    'はめつのねがい', 
    'キョダイイチゲキ', 
    'キョダイレンゲキ'
]



// 連続攻撃技
const moveList_continuous = [
    {name: 'ダブルニードル', num: 2}, 
    {name: 'にどげり', num: 2}, 
    {name: 'ホネブーメラン', num: 2}, 
    {name: 'ダブルアタック', num: 2}, 
    {name: 'ギアソーサー', num: 2}, 
    {name: 'ダブルチョップ', num: 2}, 
    {name: 'ダブルパンツァー', num: 2}, 
    {name: 'ドラゴンアロー', num: 2}, 
    {name: 'ダブルウイング', num: 2}, 
    {name: 'すいりゅうれんだ', num: 3}, 
    {name: 'おうふくビンタ', num: 5}, 
    {name: 'たまなげ', num: 5}, 
    {name: 'とげキャノン', num: 5}, 
    {name: 'ミサイルばり', num: 5}, 
    {name: 'みだれづき', num: 5}, 
    {name: 'みだれひっかき', num: 5}, 
    {name: 'れんぞくパンチ', num: 5}, 
    {name: 'ボーンラッシュ', num: 5}, 
    {name: 'タネマシンガン', num: 5}, 
    {name: 'つっぱり', num: 5}, 
    {name: 'つららばり', num: 5}, 
    {name: 'ロックブラスト', num: 5}, 
    {name: 'スイープビンタ', num: 5}, 
    {name: 'みずしゅりけん', num: 5}, 
    {name: 'スケイルショット', num: 5}, 
    {name: 'トリプルキック', num: 3}, 
    {name: 'トリプルアクセル', num: 3}, 
    {name: 'ふくろだたき', num: 1}
]

// みがわりを貫通する変化技
var statusMoveThroughSubstitute = [
    'オウムがえし', 
    'かなしばり', 
    'くろいきり', 
    'ふきとばし', 
    'ほえる', 
    'ものまね', 
    'アンコール', 
    'いやしのすず', 
    'うらみ', 
    'じこあんじ', 
    'スケッチ', 
    'テクスチャー2', 
    'のろい', 
    'ほろびのうた', 
    'みちづれ', 
    'みやぶる', 
    'メロメロ', 
    'アロマセラピー', 
    'いちゃもん', 
    'おんねん', 
    'かぎわける', 
    'スキルスワップ', 
    'ちょうはつ', 
    'てだすけ', 
    'なりきり', 
    'ふういん', 
    'よこどり', 
    'ガードスワップ', 
    'きりばらい', 
    'さきどり', 
    'つぼをつく', 
    'ハートスワップ', 
    'パワースワップ', 
    'ミラクルアイ', 
    'おさきにどうぞ', 
    'ギフトパス', 
    'ミラータイプ', 
    'アロマミスト', 
    'じばそうさ', 
    'てをつなぐ', 
    'なかよくする', 
    'フェアリーロック', 
    'ふんじん', 
    'アシストギア', 
    'さいはい', 
    'スピードスワップ', 
    'いのちのしずく', 
    'おちゃかい', 
    'コーチング', 
    'ジャングルヒール'
]

// 純粋な回復効果のみの技
var purelyRecover = [
    'あさのひざし', 
    'かいふくしれい', 
    'こうごうせい',  
    'じこさいせい', 
    'すなあつめ', 
    'タマゴうみ', 
    'つきのひかり', 
    'なまける', 
    'はねやすめ', 
    'ミルクのみ'
]



// ちいさくなるで威力が2倍になる技
var minimize = [
    'ドラゴンダイブ', 
    'のしかかり', 
    'ハードローラー', 
    'ハイパーダーククラッシャー', 
    'ヒートスタンプ', 
    'ふみつけ', 
    'フライングプレス', 
    'ヘビーボンバー'
]

// まもる系の技
var protectMove = [
    'まもる', 
    'みきり', 
    'こらえる', 
    'キングシールド', 
    'ニードルガード', 
    'トーチカ', 
    'ブロッキング', 
    'ダイウォール'
]

// バトンタッチで受け継ぐもの
var batonPassCondition = [
    '状態異常『こんらん』', 
    '状態変化『きゅうしょアップ』', 
    '状態変化『みがわり』', 
    '状態変化『やどりぎのタネ』', 
    '状態変化『のろい』', 
    '状態変化『ほろびのうた』', 
    '状態変化『ねをはる』', 
    '状態変化『とくせいなし』', 
    '状態変化『アクアリング』', 
    '状態変化『かいふくふうじ』', 
    '状態変化『さしおさえ』', 
    '状態変化『でんじふゆう』', 
    '状態変化『パワートリック』', 
    '状態変化『テレキネシス』'
]

// アンコールできない技
const moveList_disable_encore = [
    'へんしん', 
    'ものまね', 
    'スケッチ', 
    'オウムがえし', 
    'ゆびをふる', 
    'ねこのて', 
    'まねっこ', 
    'ねごと', 
    'さきどり', 
    'しぜんのちから', 
    'アンコール', 
    'ダイマックスほう', 
    'わるあがき'
]

// フォルムチェンジ・メガ進化・原始回帰・ウルトラバーストによって解除される状態変化
var unlock = [
    'ガードシェア', 
    'スピードスワップ'
]



// 他の技が出る技
var activateOtherMove = [
    "オウムがえし", 
    "さきどり", 
    "しぜんのちから", 
    "ねごと", 
    "ねこのて", 
    "まねっこ", 
    "ゆびをふる"
]

// 体重を参照する技
var referToWeight = [
    "くさむすび", 
    "けたぐり", 
    "ヒートスタンプ", 
    "ヘビーボンバー"
]

// しめりけで無効になる技
var moisture = [
    "じばく", 
    "だいばくはつ", 
    "ビックリヘッド", 
    "ミストバースト"
]