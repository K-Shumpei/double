// なかまづくりが失敗する特性（自分と相手）
const abilityList_disalbe_entrainment = {
    me: [
        'アイスフェイス', 
        'イリュージョン', 
        'うのミサイル', 
        'かがくのちから', 
        'かがくへんかガス', 
        'かわりもの', 
        'じんばいったい', 
        'ダルマモード', 
        'てんきや', 
        'トレース', 
        'ばけのかわ', 
        'はらぺこスイッチ', 
        'フラワーギフト', 
        'レシーバー'
    ], 
    tgt: [
        'ARシステム', 
        'アイスフェイス', 
        'うのミサイル', 
        'きずなへんげ', 
        'ぎょぐん', 
        'じんばいったい', 
        'スワームチェンジ', 
        'ぜったいねむり', 
        'ダルマモード', 
        'なまけ', 
        'バトルスイッチ', 
        'ばけのかわ', 
        'マルチタイプ', 
        'リミットシールド'
    ]
}

// なりきりが失敗する相手の特性
const abilityList_disalbe_rolePlay = {
    me: [
        'ARシステム', 
        'アイスフェイス', 
        'うのミサイル', 
        'きずなへんげ', 
        'ぎょぐん', 
        'じんばいったい', 
        'スワームチェンジ', 
        'ぜったいねむり', 
        'ダルマモード', 
        'ばけのかわ', 
        'バトルスイッチ', 
        'はらぺこスイッチ', 
        'マルチタイプ', 
        'リミットシールド'
    ], 
    tgt: [
        'てんきや', 
        'トレース', 
        'ふしぎなまもり', 
        'フラワーギフト', 
        'マルチタイプ', 
        'イリュージョン', 
        'かわりもの', 
        'ダルマモード', 
        'バトルスイッチ', 
        'ARシステム', 
        'かがくのちから', 
        'きずなへんげ', 
        'ぎょぐん', 
        'スワームチェンジ', 
        'ぜったいねむり', 
        'ばけのかわ', 
        'リミットシールド', 
        'レシーバー', 
        'アイスフェイス', 
        'じんばいったい', 
        'はらぺこスイッチ', 
        'うのミサイル', 
        'かがくへんかガス'
    ]
}

// シンプルビームが失敗する相手の特性
const abilityList_disable_simpleBeam = [
    'ARシステム', 
    'アイスフェイス', 
    'うのミサイル', 
    'きずなへんげ', 
    'ぎょぐん', 
    'じんばいったい', 
    'スワームチェンジ', 
    'ぜったいねむり', 
    'ダルマモード', 
    'なまけ', 
    'ばけのかわ', 
    'バトルスイッチ', 
    'マルチタイプ', 
    'リミットシールド'
]

// なやみのタネが失敗する相手の特性
const abilityList_disable_worrySeed = [
    'ARシステム', 
    'アイスフェイス', 
    'うのミサイル', 
    'きずなへんげ', 
    'ぎょぐん', 
    'じんばいったい', 
    'スワームチェンジ', 
    'ぜったいねむり', 
    'ダルマモード', 
    'なまけ', 
    'ばけのかわ', 
    'バトルスイッチ', 
    'マルチタイプ', 
    'リミットシールド'
]

// どちらかが当てはまればスキルスワップが失敗する特性
const abilityList_disable_skillSwap = [
    'ARシステム', 
    'アイスフェイス', 
    'イリュージョン', 
    'うのミサイル', 
    'かがくへんかガス', 
    'きずなへんげ', 
    'ぎょぐん', 
    'じんばいったい', 
    'スワームチェンジ', 
    'ぜったいねむり', 
    'ダルマモード', 
    'ばけのかわ', 
    'バトルスイッチ', 
    'はらぺこスイッチ', 
    'ふしぎなまもり', 
    'マルチタイプ', 
    'リミットシールド'
]

// ミイラが失敗する自分の特性
const abilityList_disable_mummy = [
    'ARシステム', 
    'アイスフェイス', 
    'うのミサイル', 
    'きずなへんげ', 
    'ぎょぐん', 
    'じんばいったい', 
    'スワームチェンジ', 
    'ぜったいねむり', 
    'ダルマモード', 
    'ばけのかわ', 
    'バトルスイッチ', 
    'マルチタイプ', 
    'リミットシールド'
]

// さまようたましいが失敗する自分の特性
const abilityList_disable_wanderingSpirit = [
    'ARシステム', 
    'アイスフェイス', 
    'イリュージョン', 
    'うのミサイル', 
    'かがくへんかガス', 
    'ぎょぐん', 
    'じんばいったい', 
    'スワームチェンジ', 
    'ダルマモード', 
    'ばけのかわ', 
    'バトルスイッチ', 
    'はらぺこスイッチ', 
    'ふしぎなまもり'
]

// かがくへんかガス状況下でも発動する特性
// これら以外は発動する
const abilityList_disable_neutralizingGas = [
    'ARシステム', 
    'アイスフェイス', 
    'うのミサイル', 
    'かがくへんかガス', 
    'ぎょぐん', 
    'じんばいったい', 
    'スワームチェンジ', 
    'ダルマモード', 
    'ばけのかわ', 
    'バトルスイッチ'
]

// いえきが失敗する（特性なし状態にできない）相手の特性
const abilityList_disable_gastro = [
    'ARシステム', 
    'アイスフェイス', 
    'うのミサイル', 
    'きずなへんげ', 
    'ぎょぐん', 
    'じんばいったい', 
    'スワームチェンジ', 
    'ぜったいねむり', 
    'ダルマモード', 
    'ばけのかわ', 
    'バトルスイッチ', 
    'マルチタイプ', 
    'リミットシールド'
]

// トレースが失敗する特性
const abilityList_disable_trace = [
    'てんきや', 
    'トレース', 
    'フラワーギフト', 
    'マルチタイプ', 
    'イリュージョン', 
    'かわりもの', 
    'ダルマモード', 
    'バトルスイッチ', 
    'ARシステム', 
    'かがくのちから', 
    'きずなへんげ', 
    'ぎょぐん', 
    'スワームチェンジ', 
    'ぜったいねむり', 
    'ばけのかわ', 
    'リミットシールド',
    'レシーバー', 
    'アイスフェイス', 
    'うのミサイル', 
    'かがくへんかガス', 
    'じんばいったい', 
    'はらぺこスイッチ'
]

// かたやぶりなどで無視される特性
const abilityList_disable_moldBreaker = [
    'アイスフェイス', 
    'あついしぼう', 
    'あまのじゃく', 
    'アロマベール', 
    'かいりきバサミ', 
    'カブトアーマー', 
    'がんじょう', 
    'かんそうはだ', 
    'きゅうばん', 
    'くさのけがわ', 
    'クリアボディ', 
    'こおりのりんぷん', 
    'シェルアーマー', 
    'しめりけ', 
    'じゅうなん', 
    'じょおうのいげん', 
    'しろいけむり', 
    'スイートベール', 
    'すいほう', 
    'すながくれ', 
    'するどいめ', 
    'せいしんりょく', 
    'そうしょく', 
    'たいねつ', 
    'たんじゅん', 
    'ちくでん', 
    'ちどりあし', 
    'ちょすい', 
    'テレパシー', 
    'でんきエンジン', 
    'てんねん', 
    'どんかん', 
    'ねんちゃく', 
    'ハードロック', 
    'ばけのかわ', 
    'パステルベール', 
    'はとむね', 
    'パンクロック', 
    'ビビッドボディ', 
    'ひらいしん', 
    'ファーコート', 
    'フィルター', 
    'ふしぎなうろこ', 
    'ふしぎなまもり', 
    'ふみん', 
    'ふゆう', 
    'フラワーギフト', 
    'フラワーベール', 
    'フレンドガード', 
    'ヘヴィメタル', 
    'ぼうおん', 
    'ぼうじん', 
    'ぼうだん', 
    'マイペース', 
    'マグマのよろい', 
    'マジックミラー', 
    'マルチスケイル', 
    'みずのベール', 
    'ミラーアーマー', 
    'ミラクルスキン', 
    'めんえき', 
    'もふもふ', 
    'もらいび', 
    'やるき', 
    'ゆきがくれ', 
    'よびみず', 
    'ライトメタル', 
    'リーフガード', 
    'りんぷん'
]

// 特性『よちむ』により参照される威力
const moveList_forewarn = {
    damage150: [
        'じわれ', 
        'ぜったいれいど', 
        'つのドリル', 
        'ハサミギロチン'
    ], 
    damage120: [
        'カウンター', 
        'ミラーコート', 
        'メタルバースト'
    ], 
    damage80: [
        'いかりのまえば', 
        'いのちがけ', 
        'おんがえし', 
        'エレキボール', 
        'おしおき', 
        'がまん', 
        'がむしゃら', 
        'きしかいせい', 
        'きりふだ', 
        'くさむすび', 
        'けたぐり', 
        'サイコウェーブ', 
        'しぜんのいかり', 
        'しぜんのめぐみ', 
        'じたばた', 
        'しぼりとる', 
        'ジャイロボール', 
        'ソニックブーム', 
        'ちきゅうなげ', 
        'ナイトヘッド', 
        'なげつける', 
        'にぎりつぶす', 
        'はきだす', 
        'ヒートスタンプ', 
        'ふくろだたき', 
        'プレゼント', 
        'ヘビーボンバー', 
        'やつあたり', 
        'りゅうのいかり'
    ]
}