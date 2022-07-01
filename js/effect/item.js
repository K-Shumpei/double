const itemList_berry = [
    'チイラのみ', 
    'リュガのみ', 
    'アッキのみ', 
    'ヤタピのみ', 
    'ズアのみ', 
    'タラプのみ', 
    'カムラのみ', 
    'ミクルのみ', 
    'サンのみ', 
    'スターのみ', 
    'ジャポのみ', 
    'レンブのみ', 
    'オッカのみ', 
    'イトケのみ', 
    'ソクノのみ', 
    'リンドのみ', 
    'ヤチェのみ', 
    'ヨプのみ', 
    'ビアーのみ', 
    'シュカのみ', 
    'バコウのみ', 
    'ウタンのみ', 
    'タンガのみ', 
    'ヨロギのみ', 
    'カシブのみ', 
    'ハバンのみ', 
    'ナモのみ', 
    'リリバのみ', 
    'ロゼルのみ', 
    'ホズのみ', 
    'オレンのみ', 
    'オボンのみ', 
    'ナゾのみ', 
    'ヒメリのみ', 
    'ラムのみ', 
    'モモンのみ', 
    'チーゴのみ', 
    'クラボのみ', 
    'カゴのみ', 
    'ナナシのみ', 
    'キーのみ', 
    'イバンのみ', 
    'フィラのみ', 
    'ウイのみ', 
    'マゴのみ', 
    'バンジのみ', 
    'イアのみ'
]

// 半減きのみ
const itemList_halfDamageBerry = [
    {name: 'オッカのみ', type: 'ほのお'}, 
    {name: 'イトケのみ', type: 'みず'}, 
    {name: 'ソクノのみ', type: 'でんき'}, 
    {name: 'リンドのみ', type: 'くさ'}, 
    {name: 'ヤチェのみ', type: 'こおり'}, 
    {name: 'ヨプのみ', type: 'かくとう'}, 
    {name: 'ビアーのみ', type: 'どく'}, 
    {name: 'シュカのみ', type: 'じめん'}, 
    {name: 'バコウのみ', type: 'ひこう'}, 
    {name: 'ウタンのみ', type: 'エスパー'}, 
    {name: 'タンガのみ', type: 'むし'}, 
    {name: 'ヨロギのみ', type: 'いわ'}, 
    {name: 'カシブのみ', type: 'ゴースト'}, 
    {name: 'ハバンのみ', type: 'ドラゴン'}, 
    {name: 'ナモのみ', type: 'あく'}, 
    {name: 'リリバのみ', type: 'はがね'}, 
    {name: 'ロゼルのみ', type: 'フェアリー'}, 
    {name: 'ホズのみ', type: 'ノーマル'}
]

// しぜんのめぐみ：対応するタイプと威力
//////
var naturalGift = [
    {item: 'クラボのみ', type: 'ほのお', power: 80}, 
    {item: 'カゴのみ', type: 'みず', power: 80}, 
    {item: 'モモンのみ', type: 'でんき', power: 80}, 
    {item: 'チーゴのみ', type: 'くさ', power: 80}, 
    {item: 'ナナシのみ', type: 'こおり', power: 80}, 
    {item: 'ヒメリのみ', type: 'かくとう', power: 80}, 
    {item: 'オレンのみ', type: 'どく', power: 80}, 
    {item: 'キーのみ', type: 'じめん', power: 80}, 
    {item: 'ラムのみ', type: 'ひこう', power: 80}, 
    {item: 'オボンのみ', type: 'エスパー', power: 80}, 
    {item: 'フィラのみ', type: 'ほのお', power: 80}, 
    {item: 'ウイのみ', type: 'いわ', power: 80}, 
    {item: 'マゴのみ', type: 'ゴースト', power: 80}, 
    {item: 'バンジのみ', type: 'ドラゴン', power: 80}, 
    {item: 'イアのみ', type: 'あく', power: 80}, 
    {item: 'ズリのみ', type: 'はがね', power: 80}, 
    {item: 'ブリーのみ', type: 'ほのお', power: 90}, 
    {item: 'ナナのみ', type: 'みず', power: 90}, 
    {item: 'セシナのみ', type: 'でんき', power: 90}, 
    {item: 'パイルのみ', type: 'くさ', power: 90}, 
    {item: 'ザロクのみ', type: 'こおり', power: 90}, 
    {item: 'ネコブのみ', type: 'かくとう', power: 90}, 
    {item: 'タポルのみ', type: 'どく', power: 90}, 
    {item: 'ロメのみ', type: 'じめん', power: 90}, 
    {item: 'ウブのみ', type: 'ひこう', power: 90}, 
    {item: 'マトマのみ', type: 'エスパー', power: 90}, 
    {item: 'モコシのみ', type: 'むし', power: 90}, 
    {item: 'ゴスのみ', type: 'いわ', power: 90}, 
    {item: 'ラブタのみ', type: 'ゴースト', power: 90}, 
    {item: 'ノメルのみ', type: 'ドラゴン', power: 90}, 
    {item: 'ノワキのみ', type: 'あく', power: 90}, 
    {item: 'シーヤのみ', type: 'はがね', power: 90}, 
    {item: 'カイスのみ', type: 'ほのお', power: 100}, 
    {item: 'ドリのみ', type: 'みず', power: 100}, 
    {item: 'ベリブのみ', type: 'でんき', power: 100}, 
    {item: 'オッカのみ', type: 'ほのお', power: 80}, 
    {item: 'イトケのみ', type: 'みず', power: 80}, 
    {item: 'ソクノのみ', type: 'でんき', power: 80}, 
    {item: 'リンドのみ', type: 'くさ', power: 80}, 
    {item: 'ヤチェのみ', type: 'こおり', power: 80}, 
    {item: 'ヨプのみ', type: 'かくとう', power: 80}, 
    {item: 'ビアーのみ', type: 'どく', power: 80}, 
    {item: 'シュカのみ', type: 'じめん', power: 80}, 
    {item: 'バコウのみ', type: 'ひこう', power: 80}, 
    {item: 'ウタンのみ', type: 'エスパー', power: 80}, 
    {item: 'タンガのみ', type: 'むし', power: 80}, 
    {item: 'ヨロギのみ', type: 'いわ', power: 80}, 
    {item: 'カシブのみ', type: 'ゴースト', power: 80}, 
    {item: 'ハバンのみ', type: 'ドラゴン', power: 80}, 
    {item: 'ナモのみ', type: 'あく', power: 80}, 
    {item: 'リリバのみ', type: 'はがね', power: 80}, 
    {item: 'ホズのみ', type: 'ノーマル', power: 80}, 
    {item: 'チイラのみ', type: 'くさ', power: 100}, 
    {item: 'リュガのみ', type: 'こおり', power: 100}, 
    {item: 'カムラのみ', type: 'かくとう', power: 100}, 
    {item: 'ヤタピのみ', type: 'どく', power: 100}, 
    {item: 'ズアのみ', type: 'じめん', power: 100}, 
    {item: 'サンのみ', type: 'ひこう', power: 100}, 
    {item: 'スターのみ', type: 'エスパー', power: 100}, 
    {item: 'ナゾのみ', type: 'むし', power: 100}, 
    {item: 'ミクルのみ', type: 'いわ', power: 100}, 
    {item: 'イバンのみ', type: 'ゴースト', power: 100}, 
    {item: 'ジャポのみ', type: 'ドラゴン', power: 100}, 
    {item: 'レンブのみ', type: 'あく', power: 100}, 
    {item: 'ロゼルのみ', type: 'フェアリー', power: 80}, 
    {item: 'アッキのみ', type: 'フェアリー', power: 100}, 
    {item: 'タラプのみ', type: 'あく', power: 100}
]

// 特定のタイプの技の威力が1.2倍になるアイテム
const itemList_incense = [
    {name: 'シルクのスカーフ', type: 'ノーマル'}, 
    {name: 'うしおのおこう', type: 'みず'}, 
    {name: 'さざなみのおこう', type: 'みず'}, 
    {name: 'しんぴのしずく', type: 'みず'}, 
    {name: 'おはなのおこう', type: 'くさ'}, 
    {name: 'きせきのタネ', type: 'くさ'}, 
    {name: 'もくたん', type: 'ほのお'}, 
    {name: 'じしゃく', type: 'でんき'}, 
    {name: 'とけないこおり', type: 'こおり'}, 
    {name: 'くろおび', type: 'かくとう'}, 
    {name: 'くろいメガネ', type: 'あく'}, 
    {name: 'どくバリ', type: 'どく'}, 
    {name: 'やわらかいすな', type: 'じめん'}, 
    {name: 'するどいくちばし', type: 'ひこう'}, 
    {name: 'あやしいおこう', type: 'エスパー'}, 
    {name: 'まがったスプーン', type: 'エスパー'}, 
    {name: 'がんせきおこう', type: 'いわ'}, 
    {name: 'かたいいし', type: 'いわ'}, 
    {name: 'ぎんのこな', type: 'むし'}, 
    {name: 'のろいのおふだ', type: 'ゴースト'},
    {name: 'りゅうのキバ', type: 'ドラゴン'}, 
    {name: 'メタルコート', type: 'はがね'}  
]

// シルヴァディに持たせるとタイプが変わる
const itemList_memory = [
    {name: 'アイスメモリ', type: 'こおり'}, 
    {name: 'エレクトロメモリ', type: 'でんき'}, 
    {name: 'グラウンドメモリ', type: 'じめん'}, 
    {name: 'グラスメモリ', type: 'くさ'}, 
    {name: 'ゴーストメモリ', type: 'ゴースト'}, 
    {name: 'サイキックメモリ', type: 'エスパー'}, 
    {name: 'スチールメモリ', type: 'はがね'}, 
    {name: 'ダークメモリ', type: 'あく'}, 
    {name: 'ドラゴンメモリ', type: 'ドラゴン'}, 
    {name: 'バグメモリ', type: 'むし'}, 
    {name: 'ファイトメモリ', type: 'かくとう'}, 
    {name: 'ファイヤーメモリ', type: 'ほのお'}, 
    {name: 'フェアリーメモリ', type: 'フェアリー'}, 
    {name: 'フライングメモリ', type: 'ひこう'}, 
    {name: 'ポイズンメモリ', type: 'どく'}, 
    {name: 'ロックメモリ', type: 'いわ'}
]

// アルセウスに持たせるとタイプが変わる
const itemList_plate = [
    {name: 'あおぞらプレート', type: 'ひこう'}, 
    {name: 'いかずちプレート', type: 'でんき'}, 
    {name: 'がんせきプレート', type: 'いわ'}, 
    {name: 'こうてつプレート', type: 'はがね'}, 
    {name: 'こぶしのプレート', type: 'かくとう'}, 
    {name: 'こわもてプレート', type: 'あく'}, 
    {name: 'しずくプレート', type: 'みず'}, 
    {name: 'せいれいプレート', type: 'フェアリー'}, 
    {name: 'たまむしプレート', type: 'むし'}, 
    {name: 'だいちのプレート', type: 'じめん'}, 
    {name: 'つららのプレート', type: 'こおり'}, 
    {name: 'ひのたまプレート', type: 'ほのお'}, 
    {name: 'ふしぎのプレート', type: 'エスパー'}, 
    {name: 'みどりのプレート', type: 'くさ'}, 
    {name: 'もうどくプレート', type: 'どく'}, 
    {name: 'もののけプレート', type: 'ゴースト'}, 
    {name: 'りゅうのプレート', type: 'ドラゴン'}
]

// メガストーン
const itemList_megaStone = [
    {name: 'アブソルナイト', poke: 'アブソル', mega: 'メガアブソル'}, 
    {name: 'エルレイドナイト', poke: 'エルレイド', mega: 'メガエルレイド'}, 
    {name: 'オニゴーリナイト', poke: 'オニゴーリ', mega: 'メガオニゴーリ'}, 
    {name: 'カイロスナイト', poke: 'カイロス', mega: 'メガカイロス'}, 
    {name: 'カメックスナイト', poke: 'カメックス', mega: 'メガカメックス'}, 
    {name: 'ガブリアスナイト', poke: 'ガブリアス', mega: 'メガガブリアス'}, 
    {name: 'ガルーラナイト', poke: 'ガルーラ', mega: 'メガガルーラ'}, 
    {name: 'ギャラドスナイト', poke: 'ギャラドス', mega: 'メガギャラドス'}, 
    {name: 'クチートナイト', poke: 'クチート', mega: 'メガクチート'}, 
    {name: 'ゲンガナイト', poke: 'ゲンガー', mega: 'メガゲンガー'}, 
    {name: 'サメハダナイト', poke: 'サメハダー', mega: 'メガサメハダー'}, 
    {name: 'サーナイトナイト', poke: 'サーナイト', mega: 'メガサーナイト'}, 
    {name: 'ジュカインナイト', poke: 'ジュカイン', mega: 'メガジュカイン'}, 
    {name: 'ジュペッタナイト', poke: 'ジュペッタ', mega: 'メガジュペッタ'}, 
    {name: 'スピアナイト', poke: 'スピアー', mega: 'メガスピアー'}, 
    {name: 'タブンネナイト', poke: 'タブンネ', mega: 'メガタブンネ'}, 
    {name: 'チャーレムナイト', poke: 'チャーレム', mega: 'メガチャーレム'}, 
    {name: 'チルタリスナイト', poke: 'チルタリス', mega: 'メガチルタリス'}, 
    {name: 'ディアンシナイト', poke: 'ディアンシー', mega: 'メガディアンシー'}, 
    {name: 'デンリュウナイト', poke: 'デンリュウ', mega: 'メガデンリュウ'}, 
    {name: 'ハガネールナイト', poke: 'ハガネール', mega: 'メガハガネール'}, 
    {name: 'ハッサムナイト', poke: 'ハッサム', mega: 'メガハッサム'}, 
    {name: 'バクーダナイト', poke: 'バクーダ', mega: 'メガバクーダ'}, 
    {name: 'バシャーモナイト', poke: 'バシャーモ', mega: 'メガバシャーモ'}, 
    {name: 'バンギラスナイト', poke: 'バンギラス', mega: 'メガバンギラス'}, 
    {name: 'ピジョットナイト', poke: 'ピジョット', mega: 'メガピジョット'}, 
    {name: 'フシギバナイト', poke: 'フシギバナ', mega: 'メガフシギバナ'}, 
    {name: 'フーディナイト', poke: 'フーディン', mega: 'メガフーディン'}, 
    {name: 'プテラナイト', poke: 'プテラ', mega: 'メガプテラ'}, 
    {name: 'ヘラクロスナイト', poke: 'ヘラクロス', mega: 'メガヘラクロス'}, 
    {name: 'ヘルガナイト', poke: 'ヘルガー', mega: 'メガヘルガー'}, 
    {name: 'ボスゴドラナイト', poke: 'ボスゴドラ', mega: 'メガボスゴドラ'}, 
    {name: 'ボーマンダナイト', poke: 'ボーマンダ', mega: 'メガボーマンダ'}, 
    {name: 'ミミロップナイト', poke: 'ミミロップ', mega: 'メガミミロップ'}, 
    {name: 'ミュウツナイトX', poke: 'ミュウツー', mega: 'メガミュウツーX'}, 
    {name: 'ミュウツナイトY', poke: 'ミュウツー', mega: 'メガミュウツーY'}, 
    {name: 'メタグロスナイト', poke: 'メタグロス', mega: 'メガメタグロス'}, 
    {name: 'ヤドランナイト', poke: 'ヤドラン', mega: 'メガヤドラン'}, 
    {name: 'ヤミラミナイト', poke: 'ヤミラミ', mega: 'メガヤミラミ'}, 
    {name: 'ユキノオナイト', poke: 'ユキノオー', mega: 'メガユキノオー'}, 
    {name: 'ライボルトナイト', poke: 'ライボルト', mega: 'メガライボルト'}, 
    {name: 'ラグラージナイト', poke: 'ラグラージ', mega: 'メガラグラージ'}, 
    {name: 'ラティアスナイト', poke: 'ラティアス', mega: 'メガラティアス'}, 
    {name: 'ラティオスナイト', poke: 'ラティオス', mega: 'メガラティオス'}, 
    {name: 'リザードナイトX', poke: 'リザードン', mega: 'メガリザードンX'}, 
    {name: 'リザードナイトY', poke: 'リザードン', mega: 'メガリザードンY'}, 
    {name: 'ルカリオナイト', poke: 'ルカリオ', mega: 'メガルカリオ'}
]