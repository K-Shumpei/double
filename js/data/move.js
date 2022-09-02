const moveList = [
    {name: '1000まんボルト', type: 'でんき', nature: '特殊', power: 195, accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『サトシのピカチュウ』の専用Zワザ。急所に当たりやすい(急所ランク:+2)。'}, 
    {name: 'アームハンマー', type: 'かくとう', nature: '物理', power: 100, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '自分のすばやさが1段階下がる。拳技。'}, //
    {name: 'アイアンテール', type: 'はがね', nature: '物理', power: 100, accuracy: 75, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率でぼうぎょを1段階下げる。'}, //
    {name: 'アイアンヘッド', type: 'はがね', nature: '物理', power: 80, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をひるませる。'}, //
    {name: 'アイアンローラー', type: 'はがね', nature: '物理', power: 130, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '場にフィールドが発生しているときのみ成功し、フィールドを解除する。'}, //
    {name: 'アイスハンマー', type: 'こおり', nature: '物理', power: 100, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '自分のすばやさが1段階下がる。拳技。'}, //
    {name: 'アイスボール', type: 'こおり', nature: '物理', power: 30, accuracy: 90, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '外れるまで、最高5ターン連続で攻撃。当てる度に威力が2倍になる。外れたり5ターン終了したりすると威力は元に戻る。弾技。'}, 
    {name: 'あおいほのお', type: 'ほのお', nature: '特殊', power: 130, accuracy: 85, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、20%の確率で相手をやけど状態にする。'}, //
    {name: 'アクアジェット', type: 'みず', nature: '物理', power: 40, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '優先度+1。'}, //
    {name: 'アクアテール', type: 'みず', nature: '物理', power: 90, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'アクアブレイク', type: 'みず', nature: '物理', power: 85, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、20%の確率で相手のぼうぎょを1段階下げる。'}, //
    {name: 'アクアリング', type: 'みず', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分をアクアリング状態にし、毎ターンHPを最大HPの1/16だけ回復する。'}, //
    {name: 'あくうせつだん', type: 'ドラゴン', nature: '特殊', power: 100, accuracy: 95, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '急所ランク+1。'}, //
    {name: 'アクセルロック', type: 'いわ', nature: '物理', power: 40, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '優先度+1。'}, //
    {name: 'あくのはどう', type: 'あく', nature: '特殊', power: 80, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、20%の確率で相手をひるませる。'}, //
    {name: 'あくび', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をねむけ状態にする。ねむけ状態のポケモンは、次のターン終了時にねむり状態になる。'}, 
    {name: 'あくまのキッス', type: 'ノーマル', nature: '変化', power: '-', accuracy: 75, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をねむり状態にする。'}, //
    {name: 'あくむ', type: 'ゴースト', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をあくむ状態にする。あくむ状態ではHPが毎ターン最大HPの1/4減る。ねむり状態のポケモンにのみ有効。'}, //
    {name: 'アクロバット', type: 'ひこう', nature: '物理', power: 55, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '自分がもちものを持っていない場合、威力が2倍になる。'}, //
    {name: 'あさのひざし', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '自分', discription: '自分のHPを回復する。回復量はてんきによって変化する。癒技。回復技。'}, //
    {name: 'アシストギア', type: 'はがね', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '味方全体', discription: 'プラスまたはマイナスのとくせいを持つ、自分を含めた味方全体のポケモンのこうげきととくこうを1段階上げる。'}, //
    {name: 'アシストパワー', type: 'エスパー', nature: '特殊', power: 20, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '自分のランクが1段階上がるごとにこの技の威力が20ずつ上がる。'}, //
    {name: 'アシッドボム', type: 'どく', nature: '特殊', power: 40, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、相手のとくぼうを2段階下げる。弾技。'}, //
    {name: 'アシッドポイズンデリート', type: 'どく', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『どく』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'アストラルビット', type: 'ゴースト', nature: '特殊', power: 120, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '相手全体', discription: '通常攻撃。'}, //
    {name: 'あてみなげ', type: 'かくとう', nature: '物理', power: 70, accuracy: '-', PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '優先度-1、必ず命中する。'}, //
    {name: 'あなをほる', type: 'じめん', nature: '物理', power: 80, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '1ターン目で地中に潜り、2ターン目に攻撃する。地中に潜ってる間(あなをほる状態)はほとんどの技を受けない。'}, //
    {name: 'あばれる', type: 'ノーマル', nature: '物理', power: 120, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: 'ランダム1体', discription: '2~3ターンの間あばれる状態になり、その間攻撃し続ける。攻撃終了後、自分がこんらん状態になる。'}, 
    {name: 'アフロブレイク', type: 'ノーマル', nature: '物理', power: 120, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの1/4を自分も受ける。'}, //
    {name: 'あまいかおり', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '相手全体', discription: '相手の回避率を2段階下げる。'}, //
    {name: 'あまえる', type: 'フェアリー', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のこうげきを2段階下げる。'}, //
    {name: 'あまごい', type: 'みず', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '全体の場', discription: '天候を5ターンの間、あめ状態にする。'}, //
    {name: 'あやしいかぜ', type: 'ゴースト', nature: '特殊', power: 60, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で自分のこうげき・ぼうぎょ・とくこう・とくぼう・すばやさが全て1段階ずつ上がる。'}, //
    {name: 'あやしいひかり', type: 'ゴースト', nature: '変化', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をこんらん状態にする。'}, //
    {name: 'あられ', type: 'こおり', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '全体の場', discription: '天候を5ターンの間、あられ状態にする。'}, //
    {name: 'アルティメットドラゴンバーン', type: 'ドラゴン', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『ドラゴン』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'アロマセラピー', type: 'くさ', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '味方全体', discription: '戦闘に出ていない手持ちポケモンも含めた、味方全員の状態異常を回復する。癒技。'}, 
    {name: 'アロマミスト', type: 'フェアリー', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '味方1体', discription: '味方のとくぼうを1段階上げる。'}, //
    {name: 'あわ', type: 'みず', nature: '特殊', power: 40, accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として、10%の確率ですばやさを1段階下げる。'}, //
    {name: 'アンカーショット', type: 'はがね', nature: '物理', power: 80, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、相手をにげられない状態にする。'}, //
    {name: 'アンコール', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '相手が最後にPPを消費した技を3ターン繰り返し使わせる(アンコール (状態変化))。'}, 
    {name: 'あんこくきょうだ', type: 'あく', nature: '物理', power: 80, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '急所ランク+3。拳技。'}, //
    {name: 'いあいぎり', type: 'ノーマル', nature: '物理', power: 50, accuracy: 95, PP: 30, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'いえき', type: 'どく', nature: '変化', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をとくせいなし状態にして、とくせいの効果を消す。'}, 
    {name: 'イカサマ', type: 'あく', nature: '物理', power: 95, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '自分のこうげき・こうげきランクではなく、相手のこうげき・こうげきランクを使ってダメージを与える。'}, //
    {name: 'いかり', type: 'ノーマル', nature: '物理', power: 20, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: 'いかり状態になり、ダメージを受けるたびにこうげきが1段階上がる。'}, 
    {name: 'いかりのこな', type: 'むし', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '優先度+2。ちゅうもくのまと状態になり相手の技を全て自分が受ける。対象を選択する技にしか効果はない。粉技。'}, 
    {name: 'いかりのまえば', type: 'ノーマル', nature: '物理', power: '-', accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '相手の残りHP×1/2(切り捨て)の固定ダメージを与える。相手の残りHPが1の場合は1ダメージを与える。'}, //
    {name: 'いきいきバブル', type: 'みず', nature: '特殊', power: 60, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの半分だけ自分のHPが回復する。'}, 
    {name: 'いじげんホール', type: 'エスパー', nature: '特殊', power: 80, accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '1体選択', discription: '必中技。まもる状態を取り除く。みがわり状態を貫通する。'}, //
    {name: 'いじげんラッシュ', type: 'あく', nature: '物理', power: 100, accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '1体選択', discription: '必中技。まもる状態を取り除く。みがわり状態を貫通する。使用後、自分の防御が1段階下がる。'}, //
    {name: 'いたみわけ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '自分と相手のHPを足し、半々に分ける(小数点は切り捨て)。'}, 
    {name: 'いちゃもん', type: 'あく', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をいちゃもん状態にし、同じわざを2回連続で選べなくする。'}, 
    {name: 'いてつくしせん', type: 'エスパー', nature: '特殊', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として10%の確率で相手をこおり状態にする。'}, //
    {name: 'いとをはく', type: 'むし', nature: '変化', power: '-', accuracy: 95, PP: 40, direct: '間接', protect: '可能', target: '相手全体', discription: '相手のすばやさを2段階下げる。'}, //
    {name: 'いにしえのうた', type: 'ノーマル', nature: '特殊', power: 75, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として、10%の確率で相手をねむり状態にする。成功するとメロエッタのフォルムが変わる。音技。'}, //
    {name: 'いのちがけ', type: 'かくとう', nature: '特殊', power: '-', accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '使ったポケモンはひんしになる代わりに、残っていたHP分の固定ダメージを与える。'}, //
    {name: 'いのちのしずく', type: 'みず', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '味方全体', discription: '自分と味方のHPが最大HPの1/4だけ回復する(小数点は四捨五入)。癒技。回復技。'}, 
    {name: 'いばる', type: 'ノーマル', nature: '変化', power: '-', accuracy: 85, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のこうげきを2段階あげ、こんらんにする。'}, //
    {name: 'いびき', type: 'ノーマル', nature: '特殊', power: 50, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: 'ねむり状態であるときのみ成功する。追加効果として、30%の確率で相手をひるませる。音技。'}, //
    {name: 'いやしのすず', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '味方全体', discription: '戦闘に出ていない手持ちポケモンも含めた、味方全員の状態異常を治す。音技。癒技。回復技。'}, 
    {name: 'いやしのねがい', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分をひんし状態にする。その後、控えから出てくるポケモンの状態異常を治し、HPを全回復させる。癒技。'}, //
    {name: 'いやしのはどう', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のHPを最大HPの1/2分回復する。癒技。回復技。'}, //
    {name: 'いやなおと', type: 'ノーマル', nature: '変化', power: '-', accuracy: 85, PP: 40, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のぼうぎょを2段階下げる。音技。'}, //
    {name: 'いわおとし', type: 'いわ', nature: '物理', power: 50, accuracy: 90, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'いわくだき', type: 'かくとう', nature: '物理', power: 40, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、50%の確率で相手のぼうぎょを1段階下げる。'}, //
    {name: 'いわなだれ', type: 'いわ', nature: '物理', power: 75, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として、30%の確率で相手をひるませる。'}, //
    {name: 'インファイト', type: 'かくとう', nature: '物理', power: 120, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '使用後、自分のぼうぎょととくぼうが1段階ずつ下がる。'}, //
    {name: 'ウェザーボール', type: 'ノーマル', nature: '特殊', power: 50, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '天気が変わっていると威力が2倍になり、タイプが以下のように変化する。晴れ→ほのお。雨→みず。あられ→こおり。砂嵐→いわ。弾技。'}, 
    {name: 'うずしお', type: 'みず', nature: '特殊', power: 35, accuracy: 85, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をバインド状態にし、2～5ターン連続でダメージを与え続ける。また、相手を逃げられなくする。'}, //
    {name: 'うそなき', type: 'あく', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のとくぼうを2段階下げる。'}, //
    {name: 'うたう', type: 'ノーマル', nature: '変化', power: '-', accuracy: 55, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をねむり状態にする。音技。'}, //
    {name: 'うたかたのアリア', type: 'みず', nature: '特殊', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '自分以外', discription: 'このわざを受けたポケモンはやけどが治る。音技。'}, //
    {name: 'うちおとす', type: 'いわ', nature: '物理', power: 50, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '地面にいないポケモンに当てた場合、うちおとす状態にする。そらをとぶ状態のポケモンにもダメージを与える。'}, //
    {name: 'ウッドハンマー', type: 'くさ', nature: '物理', power: 120, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '与えたダメージの33%を自分も受ける'}, //
    {name: 'ウッドホーン', type: 'くさ', nature: '物理', power: 75, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '与えたダメージの半分だけ、自分のHPを回復する。回復技。'}, //
    {name: 'うっぷんばらし', type: 'あく', nature: '物理', power: 75, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: 'このわざを使用するターンに自身のいずれかの能力が下がったとき、威力が2倍になる。'}, //
    {name: 'うらみ', type: 'ゴースト', nature: '変化', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手が最後に使ったわざのPPを4減らす。'}, 
    {name: 'ウルトラダッシュアタック', type: 'ノーマル', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『ノーマル』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'エアカッター', type: 'ひこう', nature: '特殊', power: 60, accuracy: 95, PP: 25, direct: '間接', protect: '可能', target: '相手全体', discription: '急所ランク+1。'}, //
    {name: 'エアスラッシュ', type: 'ひこう', nature: '特殊', power: 75, accuracy: 95, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をひるませる。'}, //
    {name: 'エアロブラスト', type: 'ひこう', nature: '特殊', power: 100, accuracy: 95, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '急所ランク+1。'}, //
    {name: 'エコーボイス', type: 'ノーマル', nature: '特殊', power: 40, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '毎ターン、場の誰かが使い続けた場合、40ずつ威力が高くなっていく。最高200。別の技を使うと元に戻る。音技。'}, //
    {name: 'えだづき', type: 'くさ', nature: '物理', power: 40, accuracy: 100, PP: 40, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'エナジーボール', type: 'くさ', nature: '特殊', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10％の確率で相手のとくぼうを1段階下げる。弾技。'}, //
    {name: 'エラがみ', type: 'みず', nature: '物理', power: 85, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: 'そのターンまだ行動していないポケモンに対して使うと威力が2倍になる。顎技。'}, //
    {name: 'エレキネット', type: 'でんき', nature: '特殊', power: 55, accuracy: 95, PP: 15, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として、100%の確率で相手のすばやさを1段階下げる。'}, //
    {name: 'エレキフィールド', type: 'でんき', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '全体の場', discription: '5ターンの間、フィールドをエレキフィールド (場の状態)にする。地面にいるポケモンはねむり・ねむけ状態にならなくなり、使用するでんきタイプの技の威力が1.3倍になる。'}, //
    {name: 'エレキボール', type: 'でんき', nature: '特殊', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手よりすばやさが速いほどダメージが大きい。1倍未満は40、2倍未満は60、3倍未満は80、4倍未満は120、それ以上は150。弾技。'}, //
    {name: 'えんまく', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手の命中率を1段階下げる。'}, //
    {name: 'オーバードライブ', type: 'でんき', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '音技。'}, //
    {name: 'オーバーヒート', type: 'ほのお', nature: '特殊', power: 130, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '使用後、自分のとくこうが2段階下がる。'}, //
    {name: 'オーラぐるま', type: 'でんき', nature: '物理', power: 110, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: 'モルペコがはらぺこもようである場合、タイプがあくに変わる。追加効果として100%の確率で自分のすばやさを1段階上げる。'}, //
    {name: 'オーロラビーム', type: 'こおり', nature: '特殊', power: 65, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手のこうげきを1段階下げる。'}, //
    {name: 'オーロラベール', type: 'こおり', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '味方の場', discription: '味方の場を5ターンの間オーロラベール状態にする。天候があられになっている場合のみ成功する。'}, //
    {name: 'おいうち', type: 'あく', nature: '物理', power: 40, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: 'そのターンに相手が交代しようとしていた場合は交代前のポケモンに攻撃する。交代前のポケモンに攻撃する場合、威力が2倍になる。'}, 
    {name: 'おいかぜ', type: 'ひこう', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '味方の場', discription: '味方の場を4ターン(第四世代では3ターン)の間おいかぜ状態にし、自分と味方のすばやさを2倍にする。'}, //
    {name: 'おいわい', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 40, direct: '間接', protect: '不能', target: '自分', discription: '効果なし。'}, //
    {name: 'おうふくビンタ', type: 'ノーマル', nature: '物理', power: 15, accuracy: 85, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '2～5連続で攻撃する(連続攻撃技)。'}, 
    {name: 'オウムがえし', type: 'ひこう', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '1体選択', discription: '対象が最後に使った技を出す'}, 
    {name: 'おきみやげ', type: 'あく', nature: '変化', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '自分をひんし状態にし、相手のこうげきととくこうを2段階下げる。'}, //
    {name: 'オクタンほう', type: 'みず', nature: '特殊', power: 65, accuracy: 85, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、50％の確率で相手の命中率を1段階下げる。弾技。'}, //
    {name: 'おさきにどうぞ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '1体選択', discription: '相手の行動を、自分の行動の直後にする。'}, 
    {name: 'おしおき', type: 'あく', nature: '物理', power: '-', accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '威力は60を基本として、相手のいずれかの能力ランクが1つ上がる度に20上がる。(最大200)'}, //
    {name: 'おしゃべり', type: 'ひこう', nature: '特殊', power: 65, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、100%の確率で相手をこんらん状態にする。音技。'}, //
    {name: 'おたけび', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のこうげきととくこうを1段階下げる。音技。'}, //
    {name: 'おだてる', type: 'あく', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のとくこうを1段階あげ、こんらん状態にする。'}, //
    {name: 'おちゃかい', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '全体', discription: '場にいるポケモン全員が持っているきのみを消費し、その効果を受ける。'}, 
    {name: 'おどろかす', type: 'ゴースト', nature: '物理', power: 30, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で対象をひるませる。'}, //
    {name: 'おにび', type: 'ほのお', nature: '変化', power: '-', accuracy: 85, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をやけど状態にする。'}, //
    {name: 'おまじない', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '味方の場', discription: '5ターンの間、味方の場をおまじない状態にする。味方への攻撃が急所に当たらなくなる。'}, //
    {name: 'オリジンズスーパーノヴァ', type: 'エスパー', nature: '特殊', power: 185, accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『ミュウ』の専用Z技。攻撃後、5ターンの間、場の状態を『サイコフィールド』にする。必中技。'}, 
    {name: 'おんがえし', type: 'ノーマル', nature: '物理', power: 102, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '使用ポケモンのなつき度が高いほど威力が高くなる(威力=なつき度×10÷25　切り捨て)。'}, //
    {name: 'おんねん', type: 'ゴースト', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '自分', discription: '自分をおんねん状態にする。おんねん状態のポケモンを攻撃してひんし状態にさせたときの技のPPは0になる。'}, 
    {name: 'かいでんぱ', type: 'でんき', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のとくこうを2段階下げる。'}, //
    {name: 'かいふくしれい', type: 'むし', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分のHPを最大HPの1/2分回復する。癒技。回復技。'}, //
    {name: 'かいふくふうじ', type: 'エスパー', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '相手全体', discription: '5ターンの間、相手がわざでHPを回復できない状態にする(かいふくふうじ (状態変化))。もちものやとくせいによるHP回復もできなくなる。'}, 
    {name: 'かいりき', type: 'ノーマル', nature: '物理', power: 80, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'カウンター', type: 'かくとう', nature: '物理', power: '-', accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '不定', discription: '優先度-5。相手から受けた物理攻撃のダメージを、2倍にして与える(ダメージ固定技)。'}, 
    {name: 'かえんぐるま', type: 'ほのお', nature: '物理', power: 60, accuracy: 100, PP: 25, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手をやけど状態にする。自分がこおり状態の場合、こおり状態を治してから攻撃する。'}, //
    {name: 'かえんだん', type: 'ほのお', nature: '特殊', power: 100, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '自分以外', discription: '追加効果として、30%の確率で相手をやけど状態にする。弾技。'}, //
    {name: 'かえんほうしゃ', type: 'ほのお', nature: '特殊', power: 90, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として10%の確率で相手をやけど状態にする。'}, //
    {name: 'かえんボール', type: 'ほのお', nature: '物理', power: 120, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として10%の確率で相手をやけど状態にする。自分がこおり状態である場合は治してから攻撃する。弾技。'}, //
    {name: 'かぎわける', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 40, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をみやぶられている状態にし、相手の回避率ランク上昇を無視して攻撃が当たるようにする。ゴーストタイプのポケモンはノーマル、かくとうわざが当たるようにもなる。'}, //
    {name: 'かくばる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '自分', discription: '自分のこうげきを1段階上げる。'}, //
    {name: 'かげうち', type: 'ゴースト', nature: '物理', power: 40, accuracy: 100, PP: 30, direct: '直接', protect: '可能', target: '1体選択', discription: '優先度+1。'}, //
    {name: 'かげぬい', type: 'ゴースト', nature: '物理', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、相手をにげられない状態にする。'}, //
    {name: 'かげぶんしん', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '自分', discription: '自分の回避率を1段階上げる。'}, //
    {name: 'かぜおこし', type: 'ひこう', nature: '特殊', power: 40, accuracy: 100, PP: 35, direct: '間接', protect: '可能', target: '1体選択', discription: 'そらをとぶ状態のポケモンにも命中し、その場合は威力が2倍になる。'}, //
    {name: 'かたきうち', type: 'ノーマル', nature: '物理', power: 70, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '味方がひんしになった次のターンに使うと、威力が2倍になる。'}, //
    {name: 'かたくなる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '自分', discription: '自分のぼうぎょを1段階上げる。'}, //
    {name: 'かなしばり', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '直前に相手が使ったわざを4ターン使えなくする。(かなしばり (状態変化))'}, 
    {name: 'かふんだんご', type: 'むし', nature: '特殊', power: 90, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '対象が味方の場合のみ最大HPの1/2回復する回復技になる。弾技。'}, 
    {name: 'かまいたち', type: 'ノーマル', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '1ターン目に溜め、2ターン目で攻撃する。急所ランク+1。'}, //
    {name: 'かみくだく', type: 'あく', nature: '物理', power: 80, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として20%の確率でぼうぎょを1段階下げる。顎技。'}, //
    {name: 'かみつく', type: 'あく', nature: '物理', power: 60, accuracy: 100, PP: 25, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で敵をひるませる。顎技。'}, //
    {name: 'かみなり', type: 'でんき', nature: '特殊', power: 110, accuracy: 70, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をまひ状態にする。てんきがあめのときは必ず命中し、にほんばれのときは命中率が50になる。そらをとぶ状態の相手にも命中する。'}, //
    {name: 'かみなりのキバ', type: 'でんき', nature: '物理', power: 65, accuracy: 95, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として10%の確率で相手をまひ状態にし、10%の確率でひるませる。顎技。'}, //
    {name: 'かみなりパンチ', type: 'でんき', nature: '物理', power: 75, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手をまひ状態にする。拳技。'}, //
    {name: 'からげんき', type: 'ノーマル', nature: '物理', power: 70, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '自分がどく・もうどく・まひ・やけどのときに使うと威力が2倍になる。やけどのダメージ減少効果を無視する。'}, //
    {name: 'からてチョップ', type: 'かくとう', nature: '物理', power: 50, accuracy: 100, PP: 25, direct: '直接', protect: '可能', target: '1体選択', discription: '急所ランク+1。'}, //
    {name: 'からではさむ', type: 'みず', nature: '物理', power: 35, accuracy: 85, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '相手をバインド状態にし、4~5ターン連続でHPを減らし続ける。相手は逃げたり交換したりすることが出来なくなる。縛技。'}, //
    {name: 'からにこもる', type: 'みず', nature: '変化', power: '-', accuracy: '-', PP: 40, direct: '間接', protect: '不能', target: '自分', discription: '自分のぼうぎょを1段階上げる。'}, //
    {name: 'からみつく', type: 'ノーマル', nature: '物理', power: 10, accuracy: 100, PP: 35, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、10％の確率で相手のすばやさを1段階下げる。'}, //
    {name: 'からをやぶる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '自分', discription: '自分のぼうぎょととくぼうがそれぞれ1段階ずつ下がり、こうげきととくこうとすばやさがそれぞれ2段階ずつ上がる。'}, //
    {name: 'かわらわり', type: 'かくとう', nature: '物理', power: 75, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '相手の場のリフレクター状態・ひかりのかべ状態・オーロラベール状態を解除してから攻撃する。'}, //
    {name: 'ガーディアン・デ・アローラ', type: 'フェアリー', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『カプ・コケコ』『カプ・テテフ』『カプ・ブルル』『カプ・レヒレ』の専用Z技。相手の残りHPの3/4のダメージを与える。必中技。'}, 
    {name: 'ガードシェア', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手と自分のぼうぎょ、とくぼうをそれぞれの平均値にする。'}, //
    {name: 'ガードスワップ', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '自分のぼうぎょ・とくぼうのランク補正を相手のぼうぎょ・とくぼうのランク補正と入れ替える。'}, //
    {name: 'がまん', type: 'ノーマル', nature: '物理', power: '-', accuracy: '-', PP: 10, direct: '直接', protect: '可能', target: '自分', discription: 'わざを使用してから2ターン後の自分の行動までがまん状態になり、その間に受けたダメージを2倍にして返す(ダメージ固定技)。優先度+1。'}, //
    {name: 'がむしゃら', type: 'ノーマル', nature: '物理', power: '-', accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '相手の残りHPから自分の残りHPを引いた数値ぶんの固定ダメージを与える。相手のHPが自分のHP以下の場合は効果が無い。'}, //
    {name: 'ガリョウテンセイ', type: 'ひこう', nature: '物理', power: 120, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '100%の確率で自分の『ぼうぎょ』『とくぼう』ランクが1段階ずつ下がる。'}, 
    {name: 'がんせきふうじ', type: 'いわ', nature: '物理', power: 60, accuracy: 95, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、100％の確率で相手のすばやさを1段階下げる。'}, //
    {name: 'がんせきほう', type: 'いわ', nature: '物理', power: 150, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '使用者は次のターン、反動で動けない。弾技。'}, //
    {name: 'きあいだま', type: 'かくとう', nature: '特殊', power: 120, accuracy: 70, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手のとくぼうを1段階下げる。弾技。'}, //
    {name: 'きあいだめ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '自分', discription: 'きゅうしょアップ状態(急所ランク+2)になる。'}, //
    {name: 'きあいパンチ', type: 'かくとう', nature: '物理', power: 150, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '優先度-3。そのターンで攻撃をする前に自分が攻撃技によるダメージを受けていると、失敗する。拳技。'}, 
    {name: 'きしかいせい', type: 'かくとう', nature: '物理', power: '-', accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '自分の残りHPが少ないほど、大きなダメージを与える(威力20~200)。'}, //
    {name: 'きつけ', type: 'ノーマル', nature: '物理', power: 70, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '相手がまひ状態なら威力が2倍になる。相手のまひ状態を治す。'}, //
    {name: 'キノコのほうし', type: 'くさ', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をねむり状態にする。粉技。'}, //
    {name: 'きゅうけつ', type: 'むし', nature: '物理', power: 80, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの1/2だけ自分のHPを回復する。回復技。'}, //
    {name: 'きょじゅうざん', type: 'はがね', nature: '物理', power: 100, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '相手がダイマックスしていると、ダメージが2倍になる。'}, 
    {name: 'きょじゅうだん', type: 'はがね', nature: '物理', power: 100, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '相手がダイマックスしていると、ダメージが2倍になる。'}, 
    {name: 'キョダイイチゲキ', type: 'あく', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『ウーラオス(いちげきのかた)』専用、『あく』タイプの攻撃技のキョダイマックス技。相手の『ダイウォール』『まもる』『みきり』『たたみがえし』『トーチカ』『ニードルガード』『ブロッキング』の効果を受けない。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイカキュウ', type: 'ほのお', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『エースバーン』専用、『ほのお』タイプの攻撃技のキョダイマックス技。もとの技によらず威力が160となり、また相手の特性の影響を受けずに攻撃できる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイカンデン', type: 'でんき', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『ストリンダー』専用、『でんき』タイプの攻撃技のキョダイマックス技。相手全体を『まひ』『どく』状態のいずれかにする。選ばれた状態異常が無効の場合は効果がない(『でんき』タイプは『まひ』状態に、『どく』『はがね』タイプは『どく』状態にならない)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイカンロ', type: 'くさ', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『タルップル』専用、『くさ』タイプの攻撃技のキョダイマックス技。自分と味方の状態異常を回復する。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイガンジン', type: 'みず', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『カジリガメ』専用、『みず』タイプの攻撃技のキョダイマックス技。相手の場を『ステルスロック』状態にする(相手はポケモンを交代する度に、出てきたポケモンは最大HPの1/8のダメージを受ける。『いわ』タイプのタイプ相性の影響を受け、例えば4倍弱点の場合は最大HPの1/2のダメージとなる)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイゲンエイ', type: 'ゴースト', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『ゲンガー』専用、『ゴースト』タイプの攻撃技のキョダイマックス技。相手全体は、逃げたり、交代できなくなる(『ゴースト』タイプを除く)。自分が場を離れると効果は消える。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイゲンスイ', type: 'ドラゴン', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『ジュラルドン』専用、『ドラゴン』タイプの攻撃技のキョダイマックス技。相手全体のそれぞれが最後に使用した技のPPを2ずつ減らす(レイドでは1)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイコウジン', type: 'はがね', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『ダイオウドウ』専用、『はがね』タイプの攻撃技のキョダイマックス技。相手の場を『キョダイコウジン』状態にする(『はがね』タイプの『ステルスロック』状態。相手はポケモンを交代する度に、出てきたポケモンは最大HPの1/8のダメージを受ける。『はがね』タイプのタイプ相性の影響を受け、例えば2倍弱点の場合は最大HPの1/4のダメージとなる)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイコバン', type: 'ノーマル', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『ニャース』専用、『ノーマル』タイプの攻撃技のキョダイマックス技。相手全体を1〜4ターンの間『こんらん』状態にする。また、戦闘終了後にお金が手に入り(通信対戦やレイドバトルを除く。トーナメントがオススメ)、自分のレベル×100円×使用回数(2回目は2倍、3回目は3倍)もらえるため、Lv.100で1度のバトルで3回使用すれば計6万円手に入る(『おまもりこばん』を持たせれば上限の99999円)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイコランダ', type: 'くさ', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『ゴリランダー』専用、『くさ』タイプの攻撃技のキョダイマックス技。もとの技によらず威力が160となり、また相手の特性の影響を受けずに攻撃できる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイコワク', type: 'むし', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『バタフリー』専用、『むし』タイプの攻撃技のキョダイマックス技。相手全体を『まひ』『どく』『ねむり』状態のいずれかにする。選ばれた状態異常が無効の場合は効果がない(『でんき』タイプは『まひ』状態に、『どく』『はがね』タイプは『どく』状態にならない)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイゴクエン', type: 'ほのお', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『リザードン』専用、『ほのお』タイプの攻撃技のキョダイマックス技。4ターンの間、相手の場を『キョダイゴクエン』状態にして、相手全体の『ほのお』タイプ以外のポケモンに対して、毎ターン終了後最大HPの1/6のダメージを与える。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイサイセイ', type: 'ノーマル', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『カビゴン』専用、『ノーマル』タイプの攻撃技のキョダイマックス技。自分と味方は、50%程度の確率でそれぞれがバトル中に使用した『きのみ』を手に入れる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイサジン', type: 'じめん', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『サダイジャ』専用、『じめん』タイプの攻撃技のキョダイマックス技。相手全体を『すなじごく』(バインド)状態にする(4〜5ターンの間、毎ターン終了後最大HPの1/8のダメージを与え、その間『ゴースト』タイプではない相手は逃げたり交代できない)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイサンゲキ', type: 'くさ', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『アップリュー』専用、『くさ』タイプの攻撃技のキョダイマックス技。相手全体の回避率を1段階ずつ下げる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイシュウキ', type: 'どく', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『ダストダス』専用、『どく』タイプの攻撃技のキョダイマックス技。相手全体の『どく』タイプや『はがね』タイプ以外のポケモンを『どく』状態にする。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイシンゲキ', type: 'かくとう', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『カイリキー』専用、『かくとう』タイプの攻撃技のキョダイマックス技。自分と味方全体の急所ランクが1段階ずつ上がり、今後技が急所に当たりやすくなる(+3で必ず急所に当たる)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイスイマ', type: 'あく', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『オーロンゲ』専用、『あく』タイプの攻撃技のキョダイマックス技。50%程度の確率で相手を『あくび』(ねむけ)状態にする(次のターン終了時に相手を2〜4ターン(実質1〜3ターン)の間『ねむり』状態にする。ただし、そのポケモンが交代されると効果は消える)(追加効果は複数の相手が対象ではない)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイセンリツ', type: 'こおり', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『ラプラス』専用、『こおり』タイプの攻撃技のキョダイマックス技。味方の場に『オーロラベール』を設置する(5ターンの間、自分と味方全体が受ける相手の物理攻撃と特殊攻撃のダメージを半分にする。味方が複数の場合は半分ではなく2/3になる。急所に当たった場合は軽減されない)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイソゲキ', type: 'みず', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『インテレオン』専用、『みず』タイプの攻撃技のキョダイマックス技。もとの技によらず威力が160となり、また相手の特性の影響を受けずに攻撃できる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイダンエン', type: 'フェアリー', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『マホイップ』専用、『フェアリー』タイプの攻撃技のキョダイマックス技。自分と味方全体のHPをそれぞれ最大HPの1/6ずつ回復する。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイテンドウ', type: 'エスパー', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『イオルブ』専用、『エスパー』タイプの攻撃技のキョダイマックス技。5ターンの間、全体の場を『じゅうりょく』状態にする'}, 
    {name: 'キョダイテンバツ', type: 'フェアリー', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『ブリムオン』専用、『フェアリー』タイプの攻撃技のキョダイマックス技。相手全体を1〜4ターンの間『こんらん』状態にする。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイバンライ', type: 'でんき', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『ピカチュウ』専用、『でんき』タイプの攻撃技のキョダイマックス技。相手全体の『でんき』タイプ以外のポケモンを『まひ』状態にする(この効果は対象の味方の『じめん』タイプにも有効)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイヒャッカ', type: 'ほのお', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『マルヤクデ』専用、『ほのお』タイプの攻撃技のキョダイマックス技。相手全体を『ほのおのうず』(バインド)状態にする(4〜5ターンの間、毎ターン終了後最大HPの1/8のダメージを与え、その間『ゴースト』タイプではない相手は逃げたり交代できない)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイフウゲキ', type: 'ひこう', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『アーマーガア』専用、『ひこう』タイプの攻撃技のキョダイマックス技。相手の場の『しろいきり』『ひかりのかべ』『リフレクター』『しんぴのまもり』『オーロラベール』、両方の場の『まきびし』『どくびし』『ステルスロック』『ねばねばネット』『エレキフィールド』『グラスフィールド』『サイコフィールド』『ミストフィールド』『キョダイコウジン』の効果を解除する。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイフンセキ', type: 'いわ', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『セキタンザン』専用、『いわ』タイプの攻撃技のキョダイマックス技。4ターンの間、相手の場を『キョダイフンセキ』状態にして、相手全体の『いわ』タイプ以外のポケモンに対して、毎ターン終了後最大HPの1/6のダメージを与える。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイベンタツ', type: 'くさ', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『フシギバナ』専用、『くさ』タイプの攻撃技のキョダイマックス技。4ターンの間、相手の場を『キョダイベンタツ』状態にして、相手全体の『くさ』タイプ以外のポケモンに対して、毎ターン終了後最大HPの1/6のダメージを与える。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイホーヨー', type: 'ノーマル', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『イーブイ』専用、『ノーマル』タイプの攻撃技のキョダイマックス技。相手全体に対して、それぞれが自分とは異なる性別の場合、『メロメロ』状態にする。『メロメロ』状態になると、50%の確率で相手は自分に攻撃できなくなる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイホウゲキ', type: 'みず', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『カメックス』専用、『みず』タイプの攻撃技のキョダイマックス技。4ターンの間、相手の場を『キョダイホウゲキ』状態にして、相手全体の『みず』タイプ以外のポケモンに対して、毎ターン終了後最大HPの1/6のダメージを与える。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイホウマツ', type: 'みず', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『キングラー』専用、『みず』タイプの攻撃技のキョダイマックス技。相手全体の『すばやさ』ランクを2段階ずつ下げる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'キョダイレンゲキ', type: 'みず', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: 'キョダイマックスした『ウーラオス(れんげきのかた)』専用、『みず』タイプの攻撃技のキョダイマックス技。相手の『ダイウォール』『まもる』『みきり』『たたみがえし』『トーチカ』『ニードルガード』『ブロッキング』の効果を受けない。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'きらきらストーム', type: 'フェアリー', nature: '特殊', power: 120, accuracy: 85, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '自分と味方全体のポケモンの状態異常を治す。'}, 
    {name: 'きりさく', type: 'ノーマル', nature: '物理', power: 70, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '急所ランク+1。'}, //
    {name: 'きりばらい', type: 'ひこう', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手の回避率を1段階下げる。対象側のひかりのかべ、リフレクター、オーロラベール、しんぴのまもり、しろいきりを取り除く。対象側と使用者側のまきびし、どくびし、ステルスロック、ねばねばネット、キョダイコウジンを取り除く。フィールドを解除する。'}, //
    {name: 'きりふだ', type: 'ノーマル', nature: '特殊', power: '-', accuracy: '-', PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: 'この技の残りPPが少ないほど、技の威力が上がる。必ず命中する。'}, //
    {name: 'キングシールド', type: 'はがね', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: 'そのターンに受ける攻撃技を無効化し、直接攻撃技を使用した相手のこうげきを1段階下げる。連続で出すと失敗しやすくなる。優先度+4。ブレードフォルムのギルガルドはシールドフォルムにフォルムチェンジする。'}, 
    {name: 'きんぞくおん', type: 'はがね', nature: '変化', power: '-', accuracy: 85, PP: 40, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のとくぼうを2段階下げる。音技。'}, //
    {name: 'ギアソーサー', type: 'はがね', nature: '物理', power: 50, accuracy: 85, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '2回連続攻撃をする(連続攻撃技)。'}, //
    {name: 'ギアチェンジ', type: 'はがね', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分のこうげきを1段階上げ、すばやさも2段階上げる。'}, //
    {name: 'ギガインパクト', type: 'ノーマル', nature: '物理', power: 150, accuracy: 90, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '次のターン、使用者は反動で動けなくなる。'}, //
    {name: 'ギガドレイン', type: 'くさ', nature: '特殊', power: 75, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの半分だけ、HPを回復する。回復技。'}, //
    {name: 'ギフトパス', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '1体選択', discription: '相手が持ち物を持っていないときに、自分が持っている持ち物を相手に渡す。'}, //
    {name: 'ぎんいろのかぜ', type: 'むし', nature: '特殊', power: 60, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で自分のこうげき、ぼうぎょ、とくこう、とくぼう、すばやさを1段階ずつ上げる。'}, //
    {name: 'クイックターン', type: 'みず', nature: '物理', power: 60, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '攻撃後、手持ちのポケモンと交代する。'}, 
    {name: 'くさのちかい', type: 'くさ', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: 'ほのおのちかい・みずのちかいと同時に繰り出すとフィールドに変化が起きる。'}, 
    {name: 'くさぶえ', type: 'くさ', nature: '変化', power: '-', accuracy: 55, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をねむり状態にする。音技。'}, //
    {name: 'くさむすび', type: 'くさ', nature: '特殊', power: '-', accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '相手のおもさによって威力が変わる。10kg未満は20、25kg未満は40、50kg未満は60、100kg未満は80、200kg未満は100、それ以上は120。'}, 
    {name: 'くすぐる', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のこうげきとぼうぎょを1段階ずつ下げる。'}, //
    {name: 'くちばしキャノン', type: 'ひこう', nature: '物理', power: 100, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '優先度-3。技が発動する前に直接攻撃を受けると、そのポケモンをやけど状態にする。弾技。'}, //
    {name: 'クモのす', type: 'むし', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をにげられない状態にし、逃げたり交換したりできなくする。'}, //
    {name: 'くらいつく', type: 'あく', nature: '物理', power: 80, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '相手と自分をにげられない状態にする。顎技。'}, //
    {name: 'クラブハンマー', type: 'みず', nature: '物理', power: 100, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '急所ランク+1。'}, //
    {name: 'クリアスモッグ', type: 'どく', nature: '特殊', power: 50, accuracy: '-', PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のランク補正を0にする。'}, //
    {name: 'くろいきり', type: 'こおり', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '全体の場', discription: '自分を含めた、場にいる全員のポケモンのランク補正を0にする。'}, //
    {name: 'くろいまなざし', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '1体選択', discription: '相手をにげられない状態にし、逃げたり交換したりできなくする'}, //
    {name: 'クロスサンダー', type: 'でんき', nature: '物理', power: 100, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: 'クロスフレイムが使われた直後に使うと威力が2倍になる。'}, //
    {name: 'クロスチョップ', type: 'かくとう', nature: '物理', power: 100, accuracy: 80, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '急所ランク+1。'}, //
    {name: 'クロスフレイム', type: 'ほのお', nature: '特殊', power: 100, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: 'クロスサンダーが使われた直後に使うと威力が2倍になる。'}, //
    {name: 'クロスポイズン', type: 'どく', nature: '物理', power: 70, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手をどく状態にする。急所ランク+1。'}, //
    {name: 'グラススライダー', type: 'くさ', nature: '物理', power: 70, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '使用者がグラスフィールド状態の効果を受けているとき、優先度+1となる。'}, 
    {name: 'グラスフィールド', type: 'くさ', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '全体の場', discription: '5ターンの間、フィールドをグラスフィールド (場の状態)状態にする。地面にいるポケモンは毎ターン終了時HPが最大HPの1/16ずつ回復し、使用するくさタイプの技の威力が1.3倍になる。受けるじしん・じならし・マグニチュードの威力を半減する。'}, //
    {name: 'グラスミキサー', type: 'くさ', nature: '特殊', power: 65, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、50%の確率で相手の命中率を1段階下げる。'}, //
    {name: 'グランドフォース', type: 'じめん', nature: '物理', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '通常攻撃。'}, //
    {name: 'グロウパンチ', type: 'かくとう', nature: '物理', power: 40, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、100%の確率で自分のこうげきを1段階上げる。拳技。'}, //
    {name: 'けたぐり', type: 'かくとう', nature: '物理', power: '-', accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '相手の重さによって威力が変わる。10kg未満は20、25kg未満は40、50kg未満は60、100kg未満は80、200kg未満は100、それ以上は120。'}, 
    {name: 'げきりん', type: 'ドラゴン', nature: '物理', power: 120, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: 'ランダム1体', discription: '2~3ターンの間あばれる状態になり、その間攻撃し続ける。攻撃終了後、自分がこんらん状態になる。'}, 
    {name: 'ゲップ', type: 'どく', nature: '特殊', power: 120, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '戦闘中きのみを食べていなければ選べない。'}, 
    {name: 'げんしのちから', type: 'いわ', nature: '特殊', power: 60, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で自分のこうげき、ぼうぎょ、とくこう、とくぼう、すばやさを1段階ずつあげる。'}, //
    {name: 'コーチング', type: 'かくとう', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '味方全体', discription: '味方全員の攻撃と防御を1段階上げる。'}, //
    {name: 'コートチェンジ', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '不能', target: '全体の場', discription: 'お互いの場の状態を入れ替える。'}, //
    {name: 'コールドフレア', type: 'こおり', nature: '特殊', power: 140, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '1ターン目に溜め、2ターン目で攻撃する。追加効果として、30%の確率で相手をやけど状態にする。'}, //
    {name: 'コアパニッシャー', type: 'ドラゴン', nature: '特殊', power: 100, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: 'そのターン行動していた相手に当てるととくせいなし状態にする。'}, 
    {name: 'こうげきしれい', type: 'むし', nature: '物理', power: 90, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '急所ランク+1。'}, //
    {name: 'こうごうせい', type: 'くさ', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '自分', discription: '自分のHPを回復する。回復量はてんきによって変化する。'}, //
    {name: 'こうそくいどう', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '自分', discription: '自分のすばやさを2段階上げる。'}, //
    {name: 'こうそくスピン', type: 'ノーマル', nature: '物理', power: 50, accuracy: 100, PP: 40, direct: '直接', protect: '可能', target: '1体選択', discription: '成功すると自分のバインド状態・やどりぎのタネ状態が消える。自分の場のトラップを消す。追加効果として100%の確率で自分のすばやさが1段階上がる。'}, //
    {name: 'こおりのいぶき', type: 'こおり', nature: '特殊', power: 60, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '急所ランク+3。'}, //
    {name: 'こおりのキバ', type: 'こおり', nature: '物理', power: 65, accuracy: 95, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手をこおり状態にし、10%の確率でひるませる。顎技。'}, //
    {name: 'こおりのつぶて', type: 'こおり', nature: '物理', power: 40, accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '1体選択', discription: '優先度+1。'}, //
    {name: 'こころのめ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: 'ロックオン状態になり、次のターンの技を相手に必中させる。'}, 
    {name: 'こごえるかぜ', type: 'こおり', nature: '特殊', power: 55, accuracy: 95, PP: 15, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として、100%の確率で相手のすばやさを1段階下げる。'}, //
    {name: 'こごえるせかい', type: 'こおり', nature: '特殊', power: 65, accuracy: 95, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として、100%の確率で相手のすばやさを1段階下げる。'}, //
    {name: 'コスモパワー', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分のぼうぎょととくぼうを1段階ずつ上げる。'}, //
    {name: 'こちこちフロスト', type: 'こおり', nature: '特殊', power: 100, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: 'すべてのポケモンの能力ランクの変化を元に戻す。'}, 
    {name: 'コットンガード', type: 'くさ', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分のぼうぎょを3段階上げる。'}, //
    {name: 'こなゆき', type: 'こおり', nature: '特殊', power: 40, accuracy: 100, PP: 25, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として10%の確率で敵をこおり状態にする。'}, //
    {name: 'このは', type: 'くさ', nature: '物理', power: 40, accuracy: 100, PP: 40, direct: '間接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'このゆびとまれ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '優先度+2。ちゅうもくのまと状態になり相手の技を全て自分が受けるが、対象を選択する技にしか効果はない。'}, 
    {name: 'コメットパンチ', type: 'はがね', nature: '物理', power: 90, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、20％の確率で自分のこうげきを1段階上げる。拳技。'}, //
    {name: 'こらえる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '優先度+4。ひんしになる攻撃を受けてもHPが1は残る。連続して使用すると失敗しやすくなる。'}, //
    {name: 'ころがる', type: 'いわ', nature: '物理', power: 30, accuracy: 90, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '外れるまで、最高5ターン連続で攻撃。当てる度に威力が2倍になる。外れたり5ターン終了したりすると威力は元に戻る。'}, 
    {name: 'こわいかお', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のすばやさを2段階下げる。'}, //
    {name: 'こんげんのはどう', type: 'みず', nature: '特殊', power: 110, accuracy: 85, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '通常攻撃。'}, //
    {name: 'ゴーストダイブ', type: 'ゴースト', nature: '物理', power: 90, accuracy: 100, PP: 10, direct: '直接', protect: '不能', target: '1体選択', discription: '1ターン目で姿を消し、2ターン目で攻撃する(シャドーダイブ (状態変化))。まもる系統の状態を除いてから攻撃する。'}, 
    {name: 'ゴッドバード', type: 'ひこう', nature: '物理', power: 140, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '1ターン目は攻撃せず、2ターン目に攻撃する。追加効果として、30％の確率で相手をひるませる。急所ランク+1。'}, //
    {name: 'サイケこうせん', type: 'エスパー', nature: '特殊', power: 65, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手をこんらん状態にする。'}, //
    {name: 'サイコウェーブ', type: 'エスパー', nature: '特殊', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手にランダムに決まった値を固定ダメージとして与える。'}, //
    {name: 'サイコカッター', type: 'エスパー', nature: '物理', power: 70, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '急所ランク+1。'}, //
    {name: 'サイコキネシス', type: 'エスパー', nature: '特殊', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として10%の確率で相手のとくぼうを1段階下げる。'}, //
    {name: 'サイコシフト', type: 'エスパー', nature: '変化', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '自分の状態異常(どく/もうどく/ねむり/まひ/やけど)を相手に移し、自分は治る。相手がすでに状態異常の場合は失敗する。'}, //
    {name: 'サイコショック', type: 'エスパー', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のとくぼうではなく、ぼうぎょでダメージ計算する。'}, //
    {name: 'サイコファング', type: 'エスパー', nature: '物理', power: 85, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '相手の場のリフレクター状態・ひかりのかべ状態・オーロラベール状態を解除してから攻撃する。顎技。'}, //
    {name: 'サイコフィールド', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '全体の場', discription: '5ターンの間、フィールドをサイコフィールド状態にする。地面にいるポケモンは使用するエスパータイプのわざの威力が1.3倍になり、相手から優先度+1以上のわざを受けなくなる。'}, //
    {name: 'サイコブースト', type: 'エスパー', nature: '特殊', power: 140, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '使用後、自分のとくこうが2段階下がる。'}, //
    {name: 'サイコブレイク', type: 'エスパー', nature: '特殊', power: 100, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のとくぼうではなく、ぼうぎょでダメージ計算をする。'}, //
    {name: 'サイドチェンジ', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '自分', discription: '優先度+2。自分と味方の位置を入れ替える。'}, 
    {name: 'さいはい', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '対象のポケモンが直前に使用したわざをもう一度使わせる。'}, 
    {name: 'さいみんじゅつ', type: 'エスパー', nature: '変化', power: '-', accuracy: 60, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をねむり状態にする。'}, //
    {name: 'サウザンアロー', type: 'じめん', nature: '物理', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '地面にいないポケモンにも当たり、うちおとす状態にして地面に落とす。そらをとぶ状態のポケモンにも当たる。'}, //
    {name: 'サウザンウェーブ', type: 'じめん', nature: '物理', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '相手をにげられない状態にする。'}, //
    {name: 'さきおくり', type: 'あく', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手の行動順をそのターンの1番最後にする。'}, 
    {name: 'さきどり', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '可能', target: '不定', discription: '対象が使おうとした攻撃技を威力を通常の1.5倍に増やして先に出す。対象より使用者が先に行動なければ失敗する。'}, 
    {name: 'さしおさえ', type: 'あく', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '5ターンの間、相手をさしおさえ状態にする。さしおさえ状態のポケモンはもちものが使えなくなる。'}, //
    {name: 'さばきのつぶて', type: 'ノーマル', nature: '特殊', power: 100, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '持たせたプレートに応じてわざのタイプが変わる。'}, //
    {name: 'さわぐ', type: 'ノーマル', nature: '特殊', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: 'ランダム1体', discription: '3ターンの間さわぐ状態になり、その間攻撃し続ける。さわぐ状態のポケモンがいる間、場にいる全てのポケモンはねむり状態にならない。音技。'}, 
    {name: 'サンシャインスマッシャー', type: 'はがね', nature: '物理', power: 200, accuracy: '-', PP: 1, direct: '直接', protect: '不能', target: '1体選択', discription: '『ソルガレオ』『日食ネクロズマ』の専用Z技。相手の特性の影響を受けずに攻撃する。必中技。'}, 
    {name: 'サンダープリズン', type: 'でんき', nature: '特殊', power: 80, accuracy: 90, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をバインド状態にし、4-5ターンの間最大HPの1/8分のダメージを与える。相手は逃げたり交代したりすることができなくなる。'}, //
    {name: 'ざぶざぶサーフ', type: 'みず', nature: '特殊', power: 90, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '相手全体', discription: '30%の確率で相手を『まひ』状態にする。'}, 
    {name: 'シードフレア', type: 'くさ', nature: '特殊', power: 120, accuracy: 85, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、40%の確率で相手のとくぼうを2段階下げる。'}, //
    {name: 'シェルアームズ', type: 'どく', nature: '特殊', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として20%の確率で相手をどく状態にする。物理技であるときの方がダメージが大きいときは物理技になる。'}, //
    {name: 'シェルブレード', type: 'みず', nature: '物理', power: 75, accuracy: 95, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、50%の確率で相手のぼうぎょを1段階下げる。'}, //
    {name: 'しおふき', type: 'みず', nature: '特殊', power: 150, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '相手全体', discription: '自分の残りHPによって威力が変化する(威力=150×残りHP÷最大HP)。ただし、最小値は1。'}, //
    {name: 'しおみず', type: 'みず', nature: '特殊', power: 65, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '現在HPが最大HPの半分以下の相手に使うと威力が2倍になる。'}, //
    {name: 'シグナルビーム', type: 'むし', nature: '特殊', power: 75, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手をこんらん状態にする。'}, //
    {name: 'シザークロス', type: 'むし', nature: '物理', power: 80, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'しぜんのいかり', type: 'フェアリー', nature: '特殊', power: '-', accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手の残りHP×1/2(切り捨て)の固定ダメージを与える。相手の残りHPが1の場合は1ダメージを与える。'}, //
    {name: 'しぜんのちから', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '1体選択', discription: '地形によって出す技が変わる。'}, //
    {name: 'しぜんのめぐみ', type: 'ノーマル', nature: '物理', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '持っているきのみによって、タイプと威力が変わる。使用するときのみは無くなる。きのみを持っていない場合、失敗する。'}, //
    {name: 'したでなめる', type: 'ゴースト', nature: '物理', power: 30, accuracy: 100, PP: 30, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として30%の確率で相手をまひ状態にする。'}, //
    {name: 'しちせいだっこんたい', type: 'ゴースト', nature: '物理', power: 195, accuracy: '-', PP: 1, direct: '直接', protect: '不能', target: '1体選択', discription: '『マーシャドー』の専用Zワザ。'}, 
    {name: 'しっとのほのお', type: 'ほのお', nature: '特殊', power: 70, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として、そのターンに能力が上がったポケモンを100%の確率でやけど状態にする。'}, //
    {name: 'しっぺがえし', type: 'あく', nature: '物理', power: 50, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '相手がすでに行動していると、威力が2倍になる。'}, //
    {name: 'しっぽをふる', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '相手全体', discription: '相手のぼうぎょを1段階下げる。'}, //
    {name: 'しねんのずつき', type: 'エスパー', nature: '物理', power: 80, accuracy: 90, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、20%の確率で相手をひるませる。'}, //
    {name: 'しびれごな', type: 'くさ', nature: '変化', power: '-', accuracy: 75, PP: 30, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をまひ状態にする。粉技。'}, //
    {name: 'しぼりとる', type: 'ノーマル', nature: '特殊', power: '-', accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '相手の残りHPが多いほど、威力が高い。威力=120×相手の残りHP÷相手の最大HP。'}, //
    {name: 'しめつける', type: 'ノーマル', nature: '物理', power: 15, accuracy: 85, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '相手をバインド状態にし、4~5ターン連続でHPを減らし続ける。相手は逃げたり交換したりすることが出来なくなる。'}, //
    {name: 'シャドーアローズストライク', type: 'ゴースト', nature: '物理', power: 180, accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『ジュナイパー』の専用Z技。必中技。'}, 
    {name: 'シャドークロー', type: 'ゴースト', nature: '物理', power: 70, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '急所ランク+1。'}, //
    {name: 'シャドースチール', type: 'ゴースト', nature: '物理', power: 90, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '相手のランク補正の内、ランク+1以上の補正を全て自身に移し替えてから攻撃する。みがわり状態を無視して攻撃する。'}, //
    {name: 'シャドーダイブ', type: 'ゴースト', nature: '物理', power: 120, accuracy: 100, PP: 5, direct: '直接', protect: '不能', target: '1体選択', discription: '1ターン目で姿を消し、2ターン目で攻撃する。姿を消している間はほとんどの技を受けない。まもる系統の状態を取り除いてから攻撃する。'}, 
    {name: 'シャドーパンチ', type: 'ゴースト', nature: '物理', power: 60, accuracy: '-', PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '必ず命中する。拳技。'}, //
    {name: 'シャドーボール', type: 'ゴースト', nature: '特殊', power: 80, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、20％の確率でとくぼうを1段階下げる。弾技。'}, //
    {name: 'シャドーボーン', type: 'ゴースト', nature: '物理', power: 85, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、20%の確率で相手のぼうぎょを1段階下げる。'}, //
    {name: 'シャドーレイ', type: 'ゴースト', nature: '特殊', power: 100, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のとくせいを無視して攻撃する。'}, //
    {name: 'しろいきり', type: 'こおり', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '味方の場', discription: '味方の場を5ターンの間、しろいきり状態にする。能力を下げられなくなる。'}, 
    {name: 'しんくうは', type: 'かくとう', nature: '特殊', power: 40, accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '1体選択', discription: '優先度+1。'}, //
    {name: 'シンクロノイズ', type: 'エスパー', nature: '特殊', power: 120, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '自分以外', discription: '自分と同じタイプを持つポケモンに対してのみダメージを与えられる。'}, //
    {name: 'しんそく', type: 'ノーマル', nature: '物理', power: 80, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '優先度+2。'}, //
    {name: 'しんぴのつるぎ', type: 'かくとう', nature: '特殊', power: 85, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のとくぼうではなく、ぼうぎょでダメージ計算をする。'}, //
    {name: 'しんぴのまもり', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 25, direct: '間接', protect: '不能', target: '味方の場', discription: '5ターンの間、味方の場がしんぴのまもり状態になり状態異常とこんらん状態にならなくなる。交代しても効果は残る。'}, //
    {name: 'シンプルビーム', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のとくせいをたんじゅんに変える。'}, //
    {name: 'Gのちから', type: 'くさ', nature: '物理', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として100%の確率で相手のぼうぎょを1段階下げる。'}, //
    {name: 'ジオコントロール', type: 'フェアリー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分のとくこう・とくぼう・すばやさをそれぞれ2段階ずつ上げる。溜め技。'}, //
    {name: 'じこあんじ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '1体選択', discription: '相手のランク補正を全てコピーして自分にかける。'}, //
    {name: 'じこさいせい', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分のHPを最大HPの1/2分回復する。癒技。回復技。'}, //
    {name: 'じごくぐるま', type: 'かくとう', nature: '物理', power: 80, accuracy: 80, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの1/4を自分も受ける。捨身技。'}, //
    {name: 'じごくづき', type: 'あく', nature: '物理', power: 80, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '相手をじごくづき状態にし、2ターンの間音の技を使えなくする。'}, //
    {name: 'じしん', type: 'じめん', nature: '物理', power: 100, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '自分以外', discription: 'あなをほる状態のポケモンにも命中し、2倍のダメージを与えられる。グラスフィールドの影響を受けている相手に対しては、威力が半減する。'}, //
    {name: 'じたばた', type: 'ノーマル', nature: '物理', power: '-', accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '自分の残りHPが少ないほど、威力が大きくなる。'}, //
    {name: 'じだんだ', type: 'じめん', nature: '物理', power: 75, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '自分が前のターンで動けなかった、技が失敗した、わざを外していたなどの場合に威力が2倍になる。'}, 
    {name: 'じならし', type: 'じめん', nature: '物理', power: 60, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '自分以外', discription: '追加効果として、100%の確率で相手のすばやさを1段階下げる。グラスフィールド状態の影響を受けている相手に対しては、威力が半減する。'}, //
    {name: 'じばく', type: 'ノーマル', nature: '物理', power: 200, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '自分以外', discription: '使ったポケモンはひんしになる。'}, //
    {name: 'じばそうさ', type: 'でんき', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '味方全体', discription: '特性がプラスかマイナスのポケモンのぼうぎょととくぼうを1段階上げる。'}, //
    {name: 'ジャイロボール', type: 'はがね', nature: '物理', power: '-', accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '自分のすばやさが相手と比べて低いほど威力が大きくなる。威力=(25×相手の素早さ÷自分の素早さ)+1。ただし、最大威力150。弾技。'}, //
    {name: 'じゃれつく', type: 'フェアリー', nature: '物理', power: 90, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手のこうげきを1段階下げる。'}, //
    {name: 'ジャングルヒール', type: 'くさ', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '味方全体', discription: '自分と味方のポケモンが最大HPの1/4だけ回復し、状態異常が回復する(小数点は切捨て)。'}, //
    {name: 'じゅうでん', type: 'でんき', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '次の行動が終わるまでじゅうでん状態になり、使うでんきタイプの技の威力が2倍になる。自分のとくぼうが1段階上がる。'}, 
    {name: '10まんばりき', type: 'じめん', nature: '物理', power: 95, accuracy: 95, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: '10まんボルト', type: 'でんき', nature: '特殊', power: 90, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として10%の確率でまひ状態にする。'}, //
    {name: 'じゅうりょく', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '全体の場', discription: '5ターンの間、場をじゅうりょく状態にする。すべてのポケモンは技の命中率が約1.67倍になり、地面にいるようになる。'}, //
    {name: 'じょうか', type: 'どく', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手の状態異常を治し、なおかつ自分のHPを最大HPの1/2回復する。相手が状態異常でないと失敗する。癒技。回復技。'}, //
    {name: 'じわれ', type: 'じめん', nature: '物理', power: '-', accuracy: 30, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '一撃必殺技。'}, //
    {name: 'じんつうりき', type: 'エスパー', nature: '特殊', power: 80, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10％の確率で相手をひるませる。'}, //
    {name: 'スーパーアクアトルネード', type: 'みず', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『みず』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'スイープビンタ', type: 'ノーマル', nature: '物理', power: 25, accuracy: 85, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '2～5回連続で攻撃する(連続攻撃技)。'}, 
    {name: 'すいとる', type: 'くさ', nature: '特殊', power: 20, accuracy: 100, PP: 25, direct: '間接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの1/2だけHPを回復する。回復技。'}, //
    {name: 'すいりゅうれんだ', type: 'みず', nature: '物理', power: 25, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '3回連続攻撃する(連続攻撃技)。急所ランク+3。拳技。'}, //
    {name: 'スカイアッパー', type: 'かくとう', nature: '物理', power: 85, accuracy: 90, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: 'そらをとぶ状態のポケモンにも当たる。拳技。'}, //
    {name: 'スキルスワップ', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '自分と相手のとくせいを入れ替える。'}, //
    {name: 'すくすくボンバー', type: 'くさ', nature: '物理', power: 100, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '100%の確率で相手に『やどりぎのタネ』を植え付け、毎ターン、相手のHPを最大HPの1/8ずつ減らし、その分自分のHPを回復させる。自分は交代しても効果が引き継ぐ。'}, 
    {name: 'スケイルショット', type: 'ドラゴン', nature: '物理', power: 25, accuracy: 90, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '2～5回連続で攻撃する(連続攻撃技)。攻撃後に、ぼうぎょが1段階下がりすばやさが1段階上がる。'}, //
    {name: 'スケイルノイズ', type: 'ドラゴン', nature: '特殊', power: 110, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '相手全体', discription: '攻撃が成功すると自分のぼうぎょが1段階下がる。音技。'}, //
    {name: 'スケッチ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '相手が最後に使ったわざをコピーし、自分で使えるようにする。コピーするとスケッチは消え、コピーした技が残る。'}, 
    {name: 'スターアサルト', type: 'かくとう', nature: '物理', power: 150, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '使うと次のターン、使用ポケモンは反動で動けなくなる。'}, //
    {name: 'スチームバースト', type: 'みず', nature: '特殊', power: 110, accuracy: 95, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をやけど状態にする。自分がこおり状態の場合、こおり状態を治してから攻撃する。'}, //
    {name: 'すてゼリフ', type: 'あく', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のこうげきととくこうを1段階下げ、控えのポケモンと交代する。音技。'}, 
    {name: 'すてみタックル', type: 'ノーマル', nature: '物理', power: 120, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '与えたダメージの33%を自分も受ける。捨身技。'}, //
    {name: 'ステルスロック', type: 'いわ', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '相手の場', discription: '相手の場をステルスロック状態にする。相手が交代するたびに、出てきたポケモンに「最大HPの1/8×いわに対する相性」分のダメージを与える。'}, //
    {name: 'ストーンエッジ', type: 'いわ', nature: '物理', power: 100, accuracy: 80, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '急所ランク+1。'}, //
    {name: 'すなあつめ', type: 'じめん', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分のHPを最大HPの1/2回復する。天気がすなあらしのときは最大HPの2/3回復する。癒技。回復技。'}, //
    {name: 'すなあらし', type: 'いわ', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '全体の場', discription: '天候を5ターンの間、すなあらし状態にする。'}, //
    {name: 'すなかけ', type: 'じめん', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手の命中率を1段階下げる。'}, //
    {name: 'すなじごく', type: 'じめん', nature: '物理', power: 35, accuracy: 85, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をバインド状態にし、4～5ターン連続でHPを減らし続ける。相手は逃げたり交換したりすることが出来なくなる。縛技。'}, //
    {name: 'スパーキングギガボルト', type: 'でんき', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『でんき』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'スパーク', type: 'でんき', nature: '物理', power: 65, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をまひ状態にする。'}, //
    {name: 'スピードスター', type: 'ノーマル', nature: '特殊', power: 60, accuracy: '-', PP: 20, direct: '間接', protect: '可能', target: '相手全体', discription: '必中技。'}, //
    {name: 'スピードスワップ', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '自分と相手のすばやさの実数値を入れ替える。'}, //
    {name: 'スプーンまげ', type: 'エスパー', nature: '変化', power: '-', accuracy: 80, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手の命中率を1段階下げる。'}, //
    {name: 'スポットライト', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '優先度+3。相手をちゅうもくのまと状態にする。'}, //
    {name: 'スマートホーン', type: 'はがね', nature: '物理', power: 70, accuracy: '-', PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '必中技。'}, //
    {name: 'スモッグ', type: 'どく', nature: '特殊', power: 30, accuracy: 70, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、40%の確率で相手をどく状態にする。'}, //
    {name: 'すりかえ', type: 'あく', nature: '変化', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手と自分の持ち物を交換する。'}, //
    {name: 'ずつき', type: 'ノーマル', nature: '物理', power: 70, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をひるませる。'}, //
    {name: 'せいちょう', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分のこうげきととくこうをそれぞれ1段階ずつ上げる。ただし、天気がにほんばれ状態の場合はこうげきととくこうが2段階ずつ上がる。'}, //
    {name: 'せいなるつるぎ', type: 'かくとう', nature: '物理', power: 90, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '相手の能力変化を無視してダメージを与える。'}, //
    {name: 'せいなるほのお', type: 'ほのお', nature: '物理', power: 100, accuracy: 95, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として50%の確率で相手をやけど状態にする。自分がこおり状態の場合、こおり状態を治してから攻撃する。'}, //
    {name: 'ぜったいほしょくかいてんざん', type: 'むし', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『むし』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'ぜったいれいど', type: 'こおり', nature: '特殊', power: '-', accuracy: 30, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '一撃必殺技。こおりタイプのポケモンには無効となり、こおりタイプ以外のポケモンが使うと命中率が下がる。'}, //
    {name: 'ぜんりょくむそうげきれつけん', type: 'かくとう', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『かくとう』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'ソーラービーム', type: 'くさ', nature: '特殊', power: 120, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '1ターン目に溜め、2ターン目で攻撃する。天気がにほんばれであれば溜めずに攻撃できる。天気があめ、すなあらし、あられだと威力が半分になる。'}, //
    {name: 'ソーラーブレード', type: 'くさ', nature: '物理', power: 125, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '1ターン目に溜め、2ターン目で攻撃する。天気がにほんばれであれば溜めずに攻撃できる。天気があめ、すなあらし、あられだと威力が半分になる。'}, //
    {name: 'そうでん', type: 'でんき', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: 'この技を受けた相手をそうでん状態にし、相手が使用するわざのタイプをでんきタイプにする。'}, 
    {name: 'ソウルクラッシュ', type: 'フェアリー', nature: '物理', power: 75, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として100%の確率で相手のとくこうを1段階下げる。'}, //
    {name: 'ソウルビート', type: 'ドラゴン', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '自分', discription: '自分のこうげき・ぼうぎょ・とくこう・とくぼう・すばやさが1段階ずつ上昇する。最大HPの1/3が削られる(小数点以下切り捨て)。音技。'}, //
    {name: 'ソニックブーム', type: 'ノーマル', nature: '特殊', power: '-', accuracy: 90, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '20の固定ダメージを与える。'}, //
    {name: 'そらをとぶ', type: 'ひこう', nature: '物理', power: 90, accuracy: 95, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '1ターン目で空に飛び、2ターン目に攻撃する。空を飛んでいる間はほとんどの技を受けないが、例外はある。溜め技。飛技。'}, //
    {name: 'タールショット', type: 'いわ', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のすばやさを1段階下げる。相手がタールショット状態になり、ほのおタイプで2倍のダメージを受けるようになる。'}, //
    {name: 'たいあたり', type: 'ノーマル', nature: '物理', power: 40, accuracy: 100, PP: 35, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'たがやす', type: 'じめん', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '全体', discription: 'くさタイプのポケモンのこうげきととくこうを1段階上げる。地面にいるポケモンにしか効果が無い。'}, //
    {name: 'たきのぼり', type: 'みず', nature: '物理', power: 80, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、20%の確率で相手をひるませる。'}, //
    {name: 'たくわえる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分のたくわえた回数を1増やす。最大3回までたくわえられ、たくわえた回数が多いほどのみこむ・はきだすの効果が上がる(たくわえる (状態変化))。自分のぼうぎょ・とくぼうが1段階ずつ上がる。'}, 
    {name: 'たこがため', type: 'かくとう', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をにげられない状態とたこがため状態にする。たこがため状態の相手は毎ターン終了時にぼうぎょととくぼうが1段階ずつ低下する。'}, //
    {name: 'たたきつける', type: 'ノーマル', nature: '物理', power: 80, accuracy: 75, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'たたみがえし', type: 'かくとう', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '味方の場', discription: '自分と味方がそのターンに受ける攻撃技を全て無効化する。(たたみがえし (場の状態))使用するポケモンがバトルに出た直後のターン(最初のターンか、交代した次のターン)でなければ失敗する。'}, 
    {name: 'たたりめ', type: 'ゴースト', nature: '特殊', power: 65, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手が状態異常のとき、威力が2倍になる。'}, //
    {name: 'たつまき', type: 'ドラゴン', nature: '特殊', power: 40, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として20%の確率で相手をひるませる。相手がそらをとぶ状態でも命中し、その場合は威力が2倍になる。'}, //
    {name: 'タネばくだん', type: 'くさ', nature: '物理', power: 80, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '通常攻撃。弾技。'}, //
    {name: 'タネマシンガン', type: 'くさ', nature: '物理', power: 25, accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '1体選択', discription: '2～5回連続で攻撃する(連続攻撃技)。弾技。'}, //
    {name: 'タマゴうみ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分の最大HPの1/2を回復する。癒技。回復技。'}, //
    {name: 'タマゴばくだん', type: 'ノーマル', nature: '物理', power: 100, accuracy: 75, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '通常攻撃。弾技。'}, //
    {name: 'たまなげ', type: 'ノーマル', nature: '物理', power: 15, accuracy: 85, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '2～5回連続して攻撃する(連続攻撃技)。弾技。'}, //
    {name: 'ダークホール', type: 'あく', nature: '変化', power: '-', accuracy: 50, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '相手をねむり状態にする。ダークライ以外が使うと失敗する。'}, //
    {name: 'ダイアーク', type: 'あく', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『あく』タイプの攻撃技のダイマックス技。相手の『とくぼう』ランクを1段階下げる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイアース', type: 'じめん', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『じめん』タイプの攻撃技のダイマックス技。自分と味方全体の『とくぼう』ランクを1段階ずつ上げる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイアイス', type: 'こおり', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『こおり』タイプの攻撃技のダイマックス技。5ターンの間、天気を『あられ』にする。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイアシッド', type: 'どく', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『どく』タイプの攻撃技のダイマックス技。自分と味方全体の『とくこう』ランクを1段階ずつ上げる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイアタック', type: 'ノーマル', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『ノーマル』タイプの攻撃技のダイマックス技。相手の『すばやさ』ランクを1段階下げる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイウォール', type: 'ノーマル', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '自分', discription: '必ず先制でき(優先度:+4)、そのターンの間、相手の技を受けない。連続で使うと失敗しやすくなる。『ゴーストダイブ』などの『まもる』を無視できる技やダイマックス技も防げる。ただし、『フェイント』は貫通する(解除はされない)。'}, 
    {name: 'ダイサイコ', type: 'エスパー', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『エスパー』タイプの攻撃技のダイマックス技。5ターンの間、場の状態を『サイコフィールド』にする(『ひこう』タイプや特性『ふゆう』などではない地面にいるすべてのポケモンは、相手(味方は含まない)の先制技を受けなくなり、また『エスパー』タイプの技の威力が1.3倍になる)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイサンダー', type: 'でんき', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『でんき』タイプの攻撃技のダイマックス技。5ターンの間、場の状態を『エレキフィールド』にする(『ひこう』タイプや特性『ふゆう』などではない地面にいるすべてのポケモンは、『ねむり』『あくび』(ねむけ)状態にならず、また『でんき』タイプの技の威力が1.3倍になる)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイジェット', type: 'ひこう', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『ひこう』タイプの攻撃技のダイマックス技。自分と味方全体の『すばやさ』ランクを1段階ずつ上げる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイスチル', type: 'はがね', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『はがね』タイプの攻撃技のダイマックス技。自分と味方全体の『ぼうぎょ』ランクを1段階ずつ上げる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイストリーム', type: 'みず', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『みず』タイプの攻撃技のダイマックス技。5ターンの間、天気を『あめ』にする。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイソウゲン', type: 'くさ', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『くさ』タイプの攻撃技のダイマックス技。5ターンの間、場の状態を『グラスフィールド』にする(『ひこう』タイプや特性『ふゆう』などではない地面にいるすべてのポケモンは、毎ターン最大HPの1/16ずつ回復し、また『くさ』タイプの技の威力が1.3倍になり、技『じしん』『じならし』『マグニチュード』の受けるダメージが半減する)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'だいちのちから', type: 'じめん', nature: '特殊', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手のとくぼうを1段階下げる。'}, //
    {name: 'だいちのはどう', type: 'ノーマル', nature: '特殊', power: 50, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '使用者がフィールドの効果を受けているとき、威力が2倍になり、タイプが以下のように変わる。エレキフィールド：でんき。グラスフィールド：くさ。ミストフィールド：フェアリー。サイコフィールド：エスパー。'}, //
    {name: 'ダイドラグーン', type: 'ドラゴン', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『ドラゴン』タイプの攻撃技のダイマックス技。相手の『こうげき』ランクを1段階下げる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイナックル', type: 'かくとう', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『かくとう』タイプの攻撃技のダイマックス技。自分と味方全体の『こうげき』ランクを1段階ずつ上げる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイナミックフルフレイム', type: 'ほのお', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『ほのお』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'ダイバーン', type: 'ほのお', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『ほのお』タイプの攻撃技のダイマックス技。5ターンの間、天気を『にほんばれ』にする。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'だいばくはつ', type: 'ノーマル', nature: '物理', power: 250, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '自分以外', discription: '使ったポケモンはひんしになる。'}, //
    {name: 'ダイビング', type: 'みず', nature: '物理', power: 80, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '1ターン目で水中に潜り、2ターン目に攻撃する。水中に潜ってる間はほとんどの技を受けないが、例外はある。'}, //
    {name: 'ダイフェアリー', type: 'フェアリー', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『フェアリー』タイプの攻撃技のダイマックス技。5ターンの間、場の状態を『ミストフィールド』にする(『ひこう』タイプや特性『ふゆう』などではない地面にいるすべてのポケモンは、状態異常にならず、また『ドラゴン』タイプの技の受けるダメージが半減する)。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイホロウ', type: 'ゴースト', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『ゴースト』タイプの攻撃技のダイマックス技。相手の『ぼうぎょ』ランクを1段階下げる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイマックスほう', type: 'ドラゴン', nature: '特殊', power: 100, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '相手がダイマックスしているとダメージが2倍になる。'}, 
    {name: 'だいもんじ', type: 'ほのお', nature: '特殊', power: 110, accuracy: 85, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として10%の確率で相手をやけど状態にする。'}, //
    {name: 'ダイヤストーム', type: 'いわ', nature: '物理', power: 100, accuracy: 95, PP: 5, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として、50%の確率で自分のぼうぎょを2段階上げる。'}, 
    {name: 'ダイロック', type: 'いわ', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『いわ』タイプの攻撃技のダイマックス技。5ターンの間、天気を『すなあらし』にする。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'ダイワーム', type: 'むし', nature: '-', power: '-', accuracy: '-', PP: '-', direct: '間接', protect: '不能', target: '1体選択', discription: '『むし』タイプの攻撃技のダイマックス技。相手の『とくこう』ランクを1段階下げる。必中技。レイドでは相手の不思議なバリアのゲージを2つ減らす。'}, 
    {name: 'だくりゅう', type: 'みず', nature: '特殊', power: 90, accuracy: 85, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として、30%の確率で相手の命中率を1段階下げる。'}, //
    {name: 'ダストシュート', type: 'どく', nature: '物理', power: 120, accuracy: 80, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をどく状態にする。'}, //
    {name: 'ダブルアタック', type: 'ノーマル', nature: '物理', power: 35, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '2回連続で攻撃をする(連続攻撃技)。'}, //
    {name: 'ダブルウイング', type: 'ひこう', nature: '物理', power: 40, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '2回連続攻撃をする(連続攻撃技)。'}, //
    {name: 'ダブルチョップ', type: 'ドラゴン', nature: '物理', power: 40, accuracy: 90, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '2回連続攻撃をする(連続攻撃技)。'}, //
    {name: 'ダブルニードル', type: 'むし', nature: '物理', power: 25, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '2回連続で攻撃する(連続攻撃技)。追加効果として、20%の確率で相手をどくにする。'}, 
    {name: 'ダブルパンツァー', type: 'はがね', nature: '物理', power: 60, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '2回連続攻撃をする(連続攻撃技)。追加効果として、30％の確率で相手をひるませる。'}, 
    {name: 'だましうち', type: 'あく', nature: '物理', power: 60, accuracy: '-', PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '必中技。'}, //
    {name: 'ダメおし', type: 'あく', nature: '物理', power: 60, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '相手がそのターンすでにダメージを受けていたとき、威力が2倍になる。'}, //
    {name: 'だんがいのつるぎ', type: 'じめん', nature: '物理', power: 120, accuracy: 85, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '通常攻撃。'}, //
    {name: 'ちいさくなる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分の回避率を2段階上げる。使用したポケモンはちいさくなる状態となり、一部の技で2倍のダメージを受ける。ダメージが2倍になるわざは必ず命中する。'}, 
    {name: 'ちからをすいとる', type: 'くさ', nature: '変化', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のこうげきを1段階下げ、下げる前のこうげきと同じ値だけ自分のHPを回復する。'}, 
    {name: 'ちきゅうなげ', type: 'かくとう', nature: '物理', power: '-', accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '自分のレベルぶんの固定ダメージを与える。'}, 
    {name: 'チャージビーム', type: 'でんき', nature: '特殊', power: 50, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、70%の確率で自分のとくこうを1段階上げる。'}, //
    {name: 'チャームボイス', type: 'フェアリー', nature: '特殊', power: 40, accuracy: '-', PP: 15, direct: '間接', protect: '可能', target: '相手全体', discription: '必中技。音技。'}, //
    {name: 'ちょうおんぱ', type: 'ノーマル', nature: '変化', power: '-', accuracy: 55, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をこんらん状態にする。音技。'}, //
    {name: 'ちょうぜつらせんれんげき', type: 'はがね', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『はがね』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'ちょうのまい', type: 'むし', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分のとくこう・とくぼう・すばやさを1段階ずつ上げる。踊技。'}, //
    {name: 'ちょうはつ', type: 'あく', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をちょうはつ状態にし、3ターンの間攻撃技しか出せないようにする。'}, //
    {name: 'ついばむ', type: 'ひこう', nature: '物理', power: 60, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '相手がきのみを持っていれば、その効果を自分が受ける。'}, 
    {name: 'つきのひかり', type: 'フェアリー', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '自分', discription: '自分のHPを回復する。回復量はてんきによって変化する。癒技。回復技。'}, //
    {name: 'つけあがる', type: 'あく', nature: '物理', power: 20, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '自分の能力ランクが1段階上がるごとにこの技の威力が20ずつ上がる。'}, //
    {name: 'つじぎり', type: 'あく', nature: '物理', power: 70, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '急所ランク+1。'}, //
    {name: 'つっぱり', type: 'かくとう', nature: '物理', power: 15, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '2~5回連続で攻撃する(連続攻撃技)。'}, //
    {name: 'つつく', type: 'ひこう', nature: '物理', power: 35, accuracy: 100, PP: 35, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'つのでつく', type: 'ノーマル', nature: '物理', power: 65, accuracy: 100, PP: 25, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'つのドリル', type: 'ノーマル', nature: '物理', power: '-', accuracy: 30, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '一撃必殺技。'}, //
    {name: 'つばさでうつ', type: 'ひこう', nature: '物理', power: 60, accuracy: 100, PP: 35, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'つばめがえし', type: 'ひこう', nature: '物理', power: 60, accuracy: '-', PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '必中技。'}, //
    {name: 'つぶらなひとみ', type: 'フェアリー', nature: '変化', power: '-', accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '1体選択', discription: '優先度+1。相手のこうげきを1段階下げる。'}, //
    {name: 'つぼをつく', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '自分か味方', discription: 'こうげき、ぼうぎょ、すばやさ、とくこう、とくぼう、命中率、回避率のどれか1つがランダムに選ばれ、2段階上がる。'}, 
    {name: 'つめとぎ', type: 'あく', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '自分', discription: '自分のこうげきと命中率を1段階ずつ上げる。'}, //
    {name: 'つららおとし', type: 'こおり', nature: '物理', power: 85, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をひるませる。'}, //
    {name: 'つららばり', type: 'こおり', nature: '物理', power: 25, accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '1体選択', discription: '2～5回連続で攻撃する(連続攻撃技)。'}, //
    {name: 'つるぎのまい', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分のこうげきを2段階上げる。踊技。'}, //
    {name: 'つるのムチ', type: 'くさ', nature: '物理', power: 45, accuracy: 100, PP: 25, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'てかげん', type: 'ノーマル', nature: '物理', power: 40, accuracy: 100, PP: 40, direct: '直接', protect: '可能', target: '1体選択', discription: '残りHPがなくなるようなダメージを与えても必ずHPが1残る。'}, //
    {name: 'テクスチャー', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '自分', discription: '自分のタイプを、自分の覚えているわざの内一番上のわざと同じタイプに変更する。'}, //
    {name: 'テクスチャー2', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '1体選択', discription: '自分のタイプを、相手が直前に使った技のタイプを半減か無効にするタイプに変える。'}, 
    {name: 'テクノバスター', type: 'ノーマル', nature: '特殊', power: 120, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: 'カセットを持たせていると、持たせたカセットにあわせてわざのタイプが変わる。'}, //
    {name: 'てだすけ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '味方1体', discription: '優先度+5。1ターンの間、味方をてだすけ状態にして、技の威力を1.5倍にする。'}, //
    {name: 'てっていこうせん', type: 'はがね', nature: '特殊', power: 140, accuracy: 95, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '最大HPの1/2を削って攻撃する(小数点切り上げ)。'}, 
    {name: 'てっぺき', type: 'はがね', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '自分', discription: '自分のぼうぎょを2段階上げる。'}, //
    {name: 'テレキネシス', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '3ターンの間、相手をテレキネシス状態にし、一撃必殺技以外のわざが必中になる。同時に、発動中は地面にいないようになる。'}, 
    {name: 'テレポート', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '優先度-6。控えのポケモンと交代する。'}, //
    {name: 'てをつなぐ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 40, direct: '間接', protect: '不能', target: '味方1体', discription: '効果なし。'}, //
    {name: 'てんこがすめつぼうのひかり', type: 'エスパー', nature: '特殊', power: 200, accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『ウルトラネクロズマ』の専用Z技。自分の『こうげき』と『とくこう』の能力値の高い方でダメージ計算する。また、相手の特性の影響を受けずに攻撃する。必中技。'}, 
    {name: 'てんしのキッス', type: 'フェアリー', nature: '変化', power: '-', accuracy: 75, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をこんらん状態にする。'}, //
    {name: 'であいがしら', type: 'むし', nature: '物理', power: 90, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '優先度+2。場に出た最初の行動であるときしか成功しない。'}, 
    {name: 'DDラリアット', type: 'あく', nature: '物理', power: 85, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '相手の能力変化を無視して攻撃できる。'}, //
    {name: 'デコレーション', type: 'フェアリー', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '1体選択', discription: '相手のこうげきととくこうランクを2段階上げる。'}, //
    {name: 'デスウイング', type: 'ひこう', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '与えたダメージの3/4だけ、HPを回復する。回復技。'}, //
    {name: 'でんきショック', type: 'でんき', nature: '特殊', power: 40, accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手をまひ状態にする。'}, //
    {name: 'でんげきくちばし', type: 'でんき', nature: '物理', power: 85, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: 'まだ行動していないポケモンに対して使うと威力が2倍になる。'}, //
    {name: 'でんげきは', type: 'でんき', nature: '特殊', power: 60, accuracy: '-', PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '必中技。'}, //
    {name: 'でんこうせっか', type: 'ノーマル', nature: '物理', power: 40, accuracy: 100, PP: 30, direct: '直接', protect: '可能', target: '1体選択', discription: '優先度+1。'}, //
    {name: 'でんじは', type: 'でんき', nature: '変化', power: '-', accuracy: 90, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をまひ状態にする。'}, //
    {name: 'でんじふゆう', type: 'でんき', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '5ターンの間、地面にいないようになる。(でんじふゆう (状態変化))飛技。'}, //
    {name: 'でんじほう', type: 'でんき', nature: '特殊', power: 120, accuracy: 50, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、100％の確率で相手をまひ状態にする。弾技。'}, //
    {name: 'トーチカ', type: 'どく', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '優先度+4。相手の攻撃から身を守る。この守りに直接攻撃した相手をどく状態にする。'}, //
    {name: 'とおせんぼう', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '1体選択', discription: '相手をにげられない状態にし、逃げたり交換したりできなくする。'}, //
    {name: 'とおぼえ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 40, direct: '間接', protect: '不能', target: '味方全体', discription: '味方全員のこうげきを1段階上げる。音技。'}, //
    {name: 'ときのほうこう', type: 'ドラゴン', nature: '特殊', power: 150, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '使ったポケモンは次のターン、反動で動けなくなる。'}, //
    {name: 'とぎすます', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '自分', discription: 'この技を使った次のターンまで、自分の攻撃が必ず急所に当たるようになる。'}, //
    {name: 'とぐろをまく', type: 'どく', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分のこうげき・ぼうぎょ・命中率を1段階ずつ上げる。'}, //
    {name: 'とける', type: 'どく', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分のぼうぎょを2段階上げる。'}, //
    {name: 'とげキャノン', type: 'ノーマル', nature: '物理', power: 20, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '2~5回連続で攻撃する(連続攻撃技)。'}, //
    {name: 'とっしん', type: 'ノーマル', nature: '物理', power: 90, accuracy: 85, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの1/4を自分も受ける(反動技)。'}, //
    {name: 'とっておき', type: 'ノーマル', nature: '物理', power: 140, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '他に覚えている技すべてをそれぞれ1回以上使っていないと、失敗する。'}, //
    {name: 'とどめばり', type: 'むし', nature: '物理', power: 50, accuracy: 100, PP: 25, direct: '直接', protect: '可能', target: '1体選択', discription: 'この技で相手を倒すとこうげきが3段階上がる。'}, //
    {name: 'とびかかる', type: 'むし', nature: '物理', power: 80, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、100％の確率で相手のこうげきを1段階下げる。'}, //
    {name: 'とびげり', type: 'かくとう', nature: '物理', power: 100, accuracy: 95, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '攻撃が外れると、自分の最大HPの1/2のダメージを受ける。'}, 
    {name: 'とびはねる', type: 'ひこう', nature: '物理', power: 85, accuracy: 85, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '1ターン目で跳び上がり、2ターン目に攻撃する。跳んでいる間は、ほとんどの技を受けない。追加効果として、30%の確率で相手をまひ状態にする。'}, //
    {name: 'とびひざげり', type: 'かくとう', nature: '物理', power: 130, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '攻撃が外れると、自分の最大HPの1/2のダメージを受ける。'}, 
    {name: 'ともえなげ', type: 'かくとう', nature: '物理', power: 60, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '優先度-6。成功後、相手ポケモンをランダムに交代させる。'}, 
    {name: 'トライアタック', type: 'ノーマル', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、20%の確率で、相手をまひ・やけど・こおり状態のどれかにする。'}, //
    {name: 'トラップシェル', type: 'ほのお', nature: '特殊', power: 150, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '相手全体', discription: '優先度-3。使用したターンに、行動するまでに物理技を受ければ攻撃できる。物理技を受けなければ発動しない。'}, //
    {name: 'トラバサミ', type: 'くさ', nature: '物理', power: 35, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '相手をバインド状態にし、4~5ターン連続でHPを減らし続ける。相手は逃げたり交換したりすることが出来なくなる。'}, //
    {name: 'トリック', type: 'エスパー', nature: '変化', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '自分と相手のもちものを交換する。'}, //
    {name: 'トリックガード', type: 'フェアリー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '味方の場', discription: '優先度+3。そのターンに受ける自分や味方を対象とした変化技を全て無効化する。'}, //
    {name: 'トリックルーム', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '全体の場', discription: '優先度-7。5ターンの間、すばやさの低い順に行動できるようになる(トリックルーム (場の状態))。効果が残ってるうちに再度使うと、元に戻る。'}, //
    {name: 'トリプルアクセル', type: 'こおり', nature: '物理', power: 20, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '1ターンに3回連続で攻撃(連続攻撃技)し、2回目は威力40、3回目は60になる。3回の攻撃は各回ごとに命中判定が行われ、外れた時点で攻撃は終了する。'}, //
    {name: 'トリプルキック', type: 'かくとう', nature: '物理', power: 10, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '1ターンに3回連続で攻撃(連続攻撃技)し、2回目は威力20、3回目は30になる。3回の攻撃は各回ごとに命中判定が行われ、外れた時点で攻撃は終了する。'}, //
    {name: 'トロピカルキック', type: 'くさ', nature: '物理', power: 70, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、100%の確率で相手のこうげきを1段階下げる。'}, //
    {name: 'とんぼがえり', type: 'むし', nature: '物理', power: 70, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '攻撃後、手持ちのポケモンと交代する。'}, 
    {name: 'どくガス', type: 'どく', nature: '変化', power: '-', accuracy: 90, PP: 40, direct: '間接', protect: '可能', target: '相手全体', discription: '相手をどく状態にする。'}, //
    {name: 'どくづき', type: 'どく', nature: '物理', power: 80, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をどく状態にする。'}, //
    {name: 'どくどく', type: 'どく', nature: '変化', power: '-', accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をもうどく状態にする。どくタイプのポケモンが使用すると必中する。'}, //
    {name: 'どくどくのキバ', type: 'どく', nature: '物理', power: 50, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として50%の確率で相手をもうどく状態にする。顎技。'}, 
    {name: 'どくのいと', type: 'どく', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のすばやさを1段階下げ、どく状態にする。'}, 
    {name: 'どくのこな', type: 'どく', nature: '変化', power: '-', accuracy: 75, PP: 35, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をどく状態にする。粉技。'}, //
    {name: 'どくばり', type: 'どく', nature: '物理', power: 15, accuracy: 100, PP: 35, direct: '間接', protect: '可能', target: '1体選択', discription: '30%の確率で相手を『どく』状態にする。'}, //
    {name: 'どくびし', type: 'どく', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '相手の場', discription: '相手の場をどくびし状態にし、相手が交代するたびに、出てきた地面にいるポケモンをどく状態にする。2回使った場合は、もうどく状態にする。'}, 
    {name: 'どげざつき', type: 'あく', nature: '物理', power: 80, accuracy: '-', PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '必中技。'}, //
    {name: 'どばどばオーラ', type: 'エスパー', nature: '特殊', power: 80, accuracy: 95, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '味方の場に『ひかりのかべ』を作り、5ターンの間、相手の特殊攻撃のダメージを半分にする。'}, 
    {name: 'ドラゴンアロー', type: 'ドラゴン', nature: '物理', power: 50, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '攻撃できる相手が1体だけだと2回の連続攻撃をする。2体いるとそれぞれに1回ずつ攻撃する。'}, 
    {name: 'ドラゴンエナジー', type: 'ドラゴン', nature: '特殊', power: 150, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '相手全体', discription: '自分の残りHPによって威力が変化する(威力=150×残りHP÷最大HP)。ただし、最小値は1。'}, //
    {name: 'ドラゴンクロー', type: 'ドラゴン', nature: '物理', power: 80, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'ドラゴンダイブ', type: 'ドラゴン', nature: '物理', power: 100, accuracy: 75, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、20%の確率で相手をひるませる。ちいさくなる状態の相手には必ず命中し、2倍のダメージ。'}, //
    {name: 'ドラゴンテール', type: 'ドラゴン', nature: '物理', power: 60, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '優先度-6。成功後、相手ポケモンをランダムに交代させる。'}, //
    {name: 'ドラゴンハンマー', type: 'ドラゴン', nature: '物理', power: 90, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'ドラムアタック', type: 'くさ', nature: '物理', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として100%の確率で相手のすばやさを1段階下げる。'}, //
    {name: 'ドリルくちばし', type: 'ひこう', nature: '物理', power: 80, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'ドリルライナー', type: 'じめん', nature: '物理', power: 80, accuracy: 95, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '急所ランク+1。'}, //
    {name: 'ドレインキッス', type: 'フェアリー', nature: '特殊', power: 50, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの3/4だけHPを回復する。癒技。回復技。'}, //
    {name: 'ドレインパンチ', type: 'かくとう', nature: '物理', power: 75, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの半分だけ、HPを回復する。拳技。'}, //
    {name: 'どろあそび', type: 'じめん', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '全体の場', discription: '5ターンの間、場をどろあそび (場の状態)状態にする。全てのポケモンの使うでんき技の威力が1/3になる。'}, //
    {name: 'どろかけ', type: 'じめん', nature: '特殊', power: 20, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、100％の確率で相手の命中率を1段階下げる。'}, //
    {name: 'どろばくだん', type: 'じめん', nature: '特殊', power: 65, accuracy: 85, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手の命中率を1段階下げる。弾技。'}, //
    {name: 'どろぼう', type: 'あく', nature: '物理', power: 60, accuracy: 100, PP: 25, direct: '直接', protect: '可能', target: '1体選択', discription: '相手が持ち物を持っていて自分が持っていない場合、奪って自分の持ち物にする。'}, 
    {name: 'ドわすれ', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分のとくぼうを2段階上げる。'}, //
    {name: 'ないしょばなし', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '1体選択', discription: '相手のとくこうを1段階下げる。音技。'},  //
    {name: 'ナイトバースト', type: 'あく', nature: '特殊', power: 85, accuracy: 95, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、40%の確率で相手の命中率を1段階下げる。'}, //
    {name: 'ナイトヘッド', type: 'ゴースト', nature: '特殊', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '自分のレベルぶんの固定ダメージを与える。'}, //
    {name: 'ナインエボルブースト', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '自分', discription: '『イーブイ』の専用Z技。自分の『こうげき』『ぼうぎょ』『とくこう』『とくぼう』『すばやさ』が2段階ずつ上がる。'}, 
    {name: 'なかまづくり', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のとくせいを自分と同じとくせいに変える。'}, 
    {name: 'なかよくする', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '1体選択', discription: '相手のこうげきを1段階下げる。'}, //
    {name: 'なきごえ', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 40, direct: '間接', protect: '可能', target: '相手全体', discription: '相手のこうげきを1段階下げる。音技。'}, //
    {name: 'なげつける', type: 'あく', nature: '物理', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '持たせたどうぐにより威力と追加効果が異なる。攻撃後、もちものはなくなる。'}, 
    {name: 'なしくずし', type: 'ノーマル', nature: '物理', power: 70, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '相相手の能力変化を無視してダメージを与える。'}, //
    {name: 'なまける', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分のHPを最大HPの1/2ぶん回復する。'}, //
    {name: 'なみだめ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '1体選択', discription: '相手のこうげき・とくこうランクを1段階ずつ下げる。相手の回避率・まもるに関係なく必ず当たる。'}, 
    {name: 'なみのり', type: 'みず', nature: '特殊', power: 90, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '自分以外', discription: '通常攻撃。'}, //
    {name: 'なやみのタネ', type: 'くさ', nature: '変化', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のとくせいをふみんにする。'}, //
    {name: 'なりきり', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '1体選択', discription: '自分のとくせいを対象と同じとくせいに変化させる。'}, //
    {name: 'ニードルアーム', type: 'くさ', nature: '物理', power: 60, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30％の確率で相手をひるませる。'}, 
    {name: 'ニードルガード', type: 'くさ', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '優先度+4。そのターンに受ける技を無効化し、直接攻撃を使用した相手のHPを最大HPの1/8分減らす(小数点以下切り捨て)。連続で出すと失敗しやすくなる。'}, 
    {name: 'にぎりつぶす', type: 'ノーマル', nature: '物理', power: '-', accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '相手の残りHPが多いほど、威力が高い。威力=120×相手の残りHP÷相手の最大HP'}, //
    {name: 'ニトロチャージ', type: 'ほのお', nature: '物理', power: 50, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、100%の確率で自分のすばやさを1段階上げる。'}, //
    {name: 'にどげり', type: 'かくとう', nature: '物理', power: 30, accuracy: 100, PP: 30, direct: '直接', protect: '可能', target: '1体選択', discription: '2回連続攻撃をする(連続攻撃技)。'}, //
    {name: 'にほんばれ', type: 'ほのお', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '全体の場', discription: 'てんきを5ターンの間、にほんばれ状態にする。'}, //
    {name: 'にらみつける', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '相手全体', discription: '相手のぼうぎょを1段階下げる。'}, //
    {name: 'ねがいごと', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '次のターンの終了時、HPを自分の最大HPの1/2だけ回復する。'}, //
    {name: 'ねこだまし', type: 'ノーマル', nature: '物理', power: 40, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '優先度+3。追加効果として、100％の確率で相手をひるませる。場に出て最初の行動であるときのみ成功する。'}, //
    {name: 'ネコにこばん', type: 'ノーマル', nature: '物理', power: 40, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '戦いが終わったら、この技の攻撃回数×レベル×5円のお金を拾える'}, //
    {name: 'ねこのて', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分の手持ちポケモンの技をランダムに1つ繰り出す。'}, 
    {name: 'ねごと', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: 'ねむり状態であるとき、自分の持っているわざの中からランダムにわざを出す。'}, 
    {name: 'ねっさのだいち', type: 'じめん', nature: '特殊', power: 70, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をやけど状態にする。自分がこおり状態である場合、こおり状態を治してから攻撃する。相手のこおり状態を治す。'}, //
    {name: 'ねっとう', type: 'みず', nature: '特殊', power: 80, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をやけど状態にする。自分がこおり状態である場合、こおり状態を治してから攻撃する。相手のこおり状態を治す。'}, //
    {name: 'ねっぷう', type: 'ほのお', nature: '特殊', power: 95, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として、10%の確率で相手をやけど状態にする。'}, 
    {name: 'ねばねばネット', type: 'むし', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '相手の場', discription: '相手の場をねばねばネット状態にする。相手がポケモンを交換するたびに、新しく出てきたポケモンのすばやさを1段階下げる。地面にいないポケモンには無効。'}, 
    {name: 'ねむりごな', type: 'くさ', nature: '変化', power: '-', accuracy: 75, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手をねむり状態にする。粉技。'}, //
    {name: 'ねむる', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分のHPを全回復し、状態異常も回復する。ただし、2ターンの間ねむり状態になる。HPが満タンだと失敗する。'}, //
    {name: 'ねらいうち', type: 'みず', nature: '特殊', power: 80, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '急所ランク+1。相手の特性に引き寄せられない。ちゅうもくのまとやサイドチェンジの影響を受けない。'}, 
    {name: 'ねをはる', type: 'くさ', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: 'ねをはる状態になり、毎ターンHPを最大HPの1/16ずつ回復する。使用したポケモンは交代やにげるができなくなる。地面にいないポケモンが使うと、地面にいる扱いになる。'}, 
    {name: 'ねんりき', type: 'エスパー', nature: '特殊', power: 50, accuracy: 100, PP: 25, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手をこんらん状態にする。'}, //
    {name: 'のしかかり', type: 'ノーマル', nature: '物理', power: 85, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をまひ状態にする。ちいさくなる状態の相手には必ず命中し、2倍のダメージ。'}, //
    {name: 'のみこむ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分のHPを回復する。自分のたくわえた回数が多いほど、回復量が多くなる。たくわえた回数が0のポケモンが使うと失敗する。使うとたくわえた回数が0に戻る。'}, 
    {name: 'のろい', type: 'ゴースト', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '不定', discription: '使用するポケモンのタイプによって技の効果が変化する。ゴーストタイプ:自分のHPを最大HPの半分(小数点切り捨て)だけ減らし、相手をのろい状態にする。ゴーストタイプ以外:自分のこうげきとぼうぎょが1段階ずつ上がり、すばやさが1段階下がる。'}, 
    {name: 'ハートスタンプ', type: 'エスパー', nature: '物理', power: 60, accuracy: 100, PP: 25, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をひるませる。'}, //
    {name: 'ハートスワップ', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '自分と相手の能力変化を入れ替える。'}, //
    {name: 'ハードプラント', type: 'くさ', nature: '特殊', power: 150, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '使ったポケモンは次のターン、反動で動けない。'}, //
    {name: 'ハードローラー', type: 'むし', nature: '物理', power: 65, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をひるませる。ちいさくなる状態の相手には必ず命中し、2倍のダメージ。'}, //
    {name: 'はいすいのじん', type: 'かくとう', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '自分', discription: '自分のこうげき・ぼうぎょ・とくこう・とくぼう・すばやさランクを1段階上げる。自分がにげられない状態になる。効果が発動するとこの技を使っても失敗するようになる。'}, 
    {name: 'ハイドロカノン', type: 'みず', nature: '特殊', power: 150, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '使ったポケモンは次のターン、反動で動けない。'}, //
    {name: 'ハイドロポンプ', type: 'みず', nature: '特殊', power: 110, accuracy: 80, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'ハイパーダーククラッシャー', type: 'あく', nature: '物理', power: 180, accuracy: '-', PP: 1, direct: '直接', protect: '不能', target: '1体選択', discription: '『ガオガエン』の専用Z技。必中技。相手が技『ちいさくなる』を使用していると、威力が2倍になる。'}, 
    {name: 'ハイパーボイス', type: 'ノーマル', nature: '特殊', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '通常攻撃。音技。'}, //
    {name: 'はいよるいちげき', type: 'むし', nature: '物理', power: 70, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、100%の確率で相手のとくこうを1段階下げる。'}, //
    {name: 'はかいこうせん', type: 'ノーマル', nature: '特殊', power: 150, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '使ったポケモンは次のターン、反動で動けない。'}, //
    {name: 'はがねのつばさ', type: 'はがね', nature: '物理', power: 70, accuracy: 90, PP: 25, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、10％の確率で自分のぼうぎょを1段階上げる。'}, //
    {name: 'はきだす', type: 'ノーマル', nature: '特殊', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '自分のたくわえた回数が多いほど、相手に与えるダメージが多くなる。たくわえた回数が0のポケモンが使うと失敗する。使うとたくわえた回数が0に戻る。'}, 
    {name: 'ハサミギロチン', type: 'ノーマル', nature: '物理', power: '-', accuracy: 30, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '一撃必殺技。'}, //
    {name: 'はさむ', type: 'ノーマル', nature: '物理', power: 55, accuracy: 100, PP: 30, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'はじけるほのお', type: 'ほのお', nature: '特殊', power: 70, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: 'ダメージを与えたポケモンの隣にいる別のポケモンにも、最大HPの1/16のダメージを与える(小数点以下切り捨て)。'}, 
    {name: 'はたきおとす', type: 'あく', nature: '物理', power: 65, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '相手が持ち物を持っていれば、そのバトルの間だけ持ち物の効果を得られなくする。相手が持ち物を持っている場合に威力が1.5倍になる。'}, 
    {name: 'はたく', type: 'ノーマル', nature: '物理', power: 40, accuracy: 100, PP: 35, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'はっけい', type: 'かくとう', nature: '物理', power: 60, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をまひ状態にする。'}, //
    {name: 'はっぱカッター', type: 'くさ', nature: '物理', power: 55, accuracy: 95, PP: 25, direct: '間接', protect: '可能', target: '相手全体', discription: '急所ランク+1。'}, //
    {name: 'ハッピータイム', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '味方の場', discription: 'トレーナー戦の後にもらえる賞金が2倍に増える。'}, //
    {name: 'はどうだん', type: 'かくとう', nature: '特殊', power: 80, accuracy: '-', PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '必中技。'}, //
    {name: 'はなびらのまい', type: 'くさ', nature: '特殊', power: 120, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: 'ランダム1体', discription: '2~3ターンの間あばれる状態になり、その間攻撃し続ける。攻撃終了後、自分がこんらん状態になる。'}, 
    {name: 'はなふぶき', type: 'くさ', nature: '物理', power: 90, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '自分以外', discription: '通常攻撃。'}, //
    {name: 'はねやすめ', type: 'ひこう', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '最大HPの1/2を回復する。ひこうタイプのポケモンは、そのターンひこうタイプに対する相性の判定がなくなる。HPが満タンの場合は失敗する。'}, //
    {name: 'はねる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 40, direct: '間接', protect: '不能', target: '自分', discription: '効果なし。'}, //
    {name: 'はめつのねがい', type: 'はがね', nature: '特殊', power: 140, accuracy: 100, PP: 5, direct: '間接', protect: '不能', target: '1体選択', discription: '技を出した2ターン後の相手にダメージを与える。'}, 
    {name: 'はめつのひかり', type: 'フェアリー', nature: '特殊', power: 140, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの1/2を自分も受ける。'}, //
    {name: 'はらだいこ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: 'HPを最大HPの1/2だけ減らした後、自分のこうげきのランクを最大まで上げる。HPが最大の半分に満たない場合は失敗する。'}, //
    {name: 'ハロウィン', type: 'ゴースト', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手のタイプにゴーストを追加する。'}, 
    {name: 'バークアウト', type: 'あく', nature: '特殊', power: 55, accuracy: 95, PP: 15, direct: '間接', protect: '可能', target: '相手全体', discription: '追加効果として、100%の確率で相手のとくこうを1段階下げる。音技。'}, //
    {name: 'ばかぢから', type: 'かくとう', nature: '物理', power: 120, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '使用後、自分のこうげきとぼうぎょが1段階ずつ下がる。'}, //
    {name: 'ばくおんぱ', type: 'ノーマル', nature: '特殊', power: 140, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '自分以外', discription: '通常攻撃。音技。'}, //
    {name: 'ばくれつパンチ', type: 'かくとう', nature: '物理', power: 100, accuracy: 50, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として100％の確率で相手をこんらん状態にする。拳技。'}, //
    {name: 'ばちばちアクセル', type: 'でんき', nature: '物理', power: 80, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '必ず先制でき(優先度:+2)、必ず急所に当たる。'}, 
    {name: 'バトンタッチ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 40, direct: '間接', protect: '不能', target: '自分', discription: '控えのポケモンと入れ替わる。能力変化や一部の状態変化は入れ替わった後のポケモンに引き継がれる。'}, 
    {name: 'バブルこうせん', type: 'みず', nature: '特殊', power: 65, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手のすばやさを1段階下げる。'}, //
    {name: 'バリアー', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分のぼうぎょを2段階上げる。'}, //
    {name: 'バレットパンチ', type: 'はがね', nature: '物理', power: 40, accuracy: 100, PP: 30, direct: '直接', protect: '可能', target: '1体選択', discription: '優先度+1。拳技。'}, //
    {name: 'パラボラチャージ', type: 'でんき', nature: '特殊', power: 65, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '自分以外', discription: '相手に与えたダメージの半分だけ、HPを回復する。'}, //
    {name: 'パワーウィップ', type: 'くさ', nature: '物理', power: 120, accuracy: 85, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'パワーシェア', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手と自分のこうげき、とくこうをそれぞれの平均値にする。'}, //
    {name: 'パワージェム', type: 'いわ', nature: '特殊', power: 80, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'パワースワップ', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '自分のこうげき、とくこうのランク補正を相手のこうげき・とくこうのランク補正と入れ替える。'}, //
    {name: 'パワートリック', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分のこうげきとぼうぎょのステータスを入れ替える(パワートリック (状態変化))。ランク補正は入れ替わらない。'}, //
    {name: 'ヒートスタンプ', type: 'ほのお', nature: '物理', power: '-', accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '自分のおもさと相手のおもさの比率によって威力が変わる。相手の重さが自分の1/5以下なら120、1/4以下なら100、1/3以下なら80、1/2以下なら60、それより重いなら40。ちいさくなる状態のポケモンには必ず命中しダメージが2倍になる。(第六世代以降)'}, //
    {name: 'ひかりのかべ', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '味方の場', discription: '5ターンの間、相手の特殊技のダメージが半分になる(場の状態)。'}, //
    {name: 'ひっかく', type: 'ノーマル', nature: '物理', power: 40, accuracy: 100, PP: 35, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, //
    {name: 'ひっくりかえす', type: 'あく', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手の能力変化を逆にする。'}, //
    {name: 'ひっさつのピカチュート', type: 'でんき', nature: '物理', power: 210, accuracy: '-', PP: 1, direct: '直接', protect: '不能', target: '1体選択', discription: '『ピカチュウ』の専用Z技。必中技。'}, 
    {name: 'ひっさつまえば', type: 'ノーマル', nature: '物理', power: 80, accuracy: 90, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手をひるませる。顎技。'}, //
    {name: 'ひのこ', type: 'ほのお', nature: '特殊', power: 40, accuracy: 100, PP: 25, direct: '間接', protect: '可能', target: '1体選択', discription: '追加効果として、10%の確率で相手をやけど状態にする。'}, //
    {name: 'ひみつのちから', type: 'ノーマル', nature: '物理', power: 70, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '30%の確率で、追加効果を与える。追加効果は地形によって異なる。'}, 
    {name: 'ビックリヘッド', type: 'ほのお', nature: '特殊', power: 150, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '自分以外', discription: '最大HPの1/2を削って攻撃する(小数点切り上げ)。'}, 
    {name: 'びりびりエレキ', type: 'でんき', nature: '特殊', power: 60, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '100%の確率で相手を『まひ』状態にする。'}, 
    {name: 'びりびりちくちく', type: 'でんき', nature: '物理', power: 80, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、30%の確率で相手をひるませる。'}, //
    {name: 'ビルドアップ', type: 'かくとう', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分のこうげきとぼうぎょを1段階ずつ上げる。'}, //
    {name: 'ピカピカサンダー', type: 'でんき', nature: '特殊', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: 'ポケモンがなついているほど威力が高くなる。最大148。また、必中技。'}, 
    {name: 'ピヨピヨパンチ', type: 'ノーマル', nature: '物理', power: 70, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '追加効果として、20％の確率で相手をこんらん状態にする。拳技。'}, //
    {name: 'ファイナルダイブクラッシュ', type: 'ひこう', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『ひこう』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'ファストガード', type: 'かくとう', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '味方の場', discription: '優先度+3。そのターンの間、味方全体を優先度が高いわざから守る。'}, 
    {name: 'ふいうち', type: 'あく', nature: '物理', power: 70, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '必ず先制できる(優先度:+1)。相手が使う技が攻撃技ではない場合や、優先度などの関係ですでに攻撃を終えていた場合は失敗する。相手が『ねむり』『こおり』状態でも攻撃技を選択していれば成功する。(第6世代は威力:80)'}, 
    {name: 'ふういん', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分が場を離れるまで、自分が覚えている技と同じ技を相手のポケモンは使えなくなる。'}, 
    {name: 'フェアリーロック', type: 'フェアリー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '全体の場', discription: '次のターン終了まで、すべての『ゴースト』タイプではないポケモンは逃げたり交代できなくなる。'}, 
    {name: 'フェイント', type: 'ノーマル', nature: '物理', power: 30, accuracy: 100, PP: 10, direct: '間接', protect: '不能', target: '1体選択', discription: '必ず先制できる(優先度:+2)。相手が技『まもる』『みきり』『たたみがえし』『トーチカ』『キングシールド』『ニードルガード』『ブロッキング』『ファストガード』『ワイドガード』をしている場合は、その効果を解除して攻撃できる(使用していない場合は通常攻撃)。『ダイウォール』は解除はできないが、貫通する。'}, 
    {name: 'フェザーダンス', type: 'ひこう', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手の『こうげき』ランクを2段階下げる。'}, 
    {name: 'フォトンゲイザー', type: 'エスパー', nature: '特殊', power: 100, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '自分の『こうげき』と『とくこう』の能力値の高い方でダメージ計算する。また、相手の特性の影響を受けずに攻撃する。'}, 
    {name: 'ふきとばし', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '1体選択', discription: '必ず後攻になる(優先度:-6)。相手のポケモンを強制的に交代させる。野生のポケモンの場合は戦闘を終了する。必中技。相手の『まもる』『みきり』『トーチカ』『ニードルガード』『ブロッキング』の効果を受けない。相手の『みがわり』状態を貫通する。ダイマックスしている相手には無効。野生のポケモンの場合、相手が自分のレベルより高い場合は失敗する。'}, 
    {name: 'ふくろだたき', type: 'あく', nature: '物理', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '自分を含む『ひんし』や状態異常でない『てもち』のポケモンの数だけ攻撃する。'}, 
    {name: 'ふしょくガス', type: 'どく', nature: '変化', power: '-', accuracy: 100, PP: 40, direct: '間接', protect: '可能', target: '自分以外', discription: '道具を持っているポケモンは、道具を持っていない状態になる。'}, 
    {name: 'ふぶき', type: 'こおり', nature: '特殊', power: 110, accuracy: 70, PP: 5, direct: '間接', protect: '可能', target: '相手全体', discription: '10%の確率で相手を『こおり』状態にする。天気が『あられ』の時は必ず命中する。'}, 
    {name: 'ふみつけ', type: 'ノーマル', nature: '物理', power: 65, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '30%の確率で相手をひるませる。相手が技『ちいさくなる』を使用していると必ず命中し、威力が2倍になる。'}, 
    {name: 'フライングプレス', type: 'かくとう', nature: '物理', power: 100, accuracy: 95, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: 'この技は『かくとう』タイプであると同時に『ひこう』タイプでもある。相手が技『ちいさくなる』を使用していると必ず命中し、威力が2倍になる。(第6世代は威力:80)'}, 
    {name: 'フラッシュ', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手の命中率を1段階下げる。'}, 
    {name: 'フラフラダンス', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '自分以外', discription: '相手を1〜4ターンの間『こんらん』状態にする。'}, 
    {name: 'フラワーガード', type: 'フェアリー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '全体', discription: 'すべての『くさ』タイプのポケモンの『ぼうぎょ』ランクが1段階上がる。'}, 
    {name: 'フラワーヒール', type: 'フェアリー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手は最大HPの1/2回復する。ただし、『グラスフィールド』の時は最大HPの2/3回復する。(ダブルバトルで味方に使うと良い)'}, 
    {name: 'フリーズドライ', type: 'こおり', nature: '特殊', power: 70, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '10%の確率で相手を『こおり』状態にする。この技は『みず』タイプにも効果抜群になる。'}, 
    {name: 'フリーズボルト', type: 'こおり', nature: '物理', power: 140, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '1ターン目は攻撃せずに、2ターン目で攻撃する。30%の確率で相手を『まひ』状態にする。'}, 
    {name: 'フリーフォール', type: 'ひこう', nature: '物理', power: 60, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '1ターン目に相手とともに空中へ飛び上がり、2ターン目で攻撃する。空中にいる間は『うちおとす』『かぜおこし』『かみなり』『サウザンアロー』『スカイアッパー』『たつまき』『ぼうふう』以外の技を受けず、相手は行動できない。『ひこう』タイプのポケモンはダメージを受けない。相手が体重200kg以上の場合は失敗する。'}, 
    {name: 'フルールカノン', type: 'フェアリー', nature: '特殊', power: 130, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '攻撃後、自分の『とくこう』ランクが2段階下がる。'}, 
    {name: 'ふるいたてる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 30, direct: '間接', protect: '不能', target: '自分', discription: '自分の『こうげき』『とくこう』ランクが1段階ずつ上がる。'}, 
    {name: 'フレアドライブ', type: 'ほのお', nature: '物理', power: 120, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの33%を自分も受ける。10%の確率で相手を『やけど』状態にする。自分が『こおり』状態の時でも使う事ができ、使うと『こおり』状態が治る。'}, 
    {name: 'ふわふわフォール', type: 'ひこう', nature: '物理', power: 90, accuracy: 95, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '30%の確率で相手をひるませる。'}, 
    {name: 'ふんえん', type: 'ほのお', nature: '特殊', power: 80, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '自分以外', discription: '30%の確率で相手を『やけど』状態にする。'}, 
    {name: 'ふんか', type: 'ほのお', nature: '特殊', power: 150, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '相手全体', discription: '自分のHPが少ないほど技の威力が下がる。(150×自分の残りHP÷自分の最大HP)が威力。'}, 
    {name: 'ふんじん', type: 'むし', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '必ず先制でき(優先度:+1)、そのターンに相手が『ほのお』タイプの技を使うと、相手は技が失敗し最大HPの1/4のダメージを受ける。『くさ』タイプや特性『ぼうじん』、道具『ぼうじんゴーグル』を持っているポケモンには無効。'}, 
    {name: 'Vジェネレート', type: 'ほのお', nature: '物理', power: 180, accuracy: 95, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '攻撃後、自分の『すばやさ』『ぼうぎょ』『とくぼう』ランクが1段階ずつ下がる。'}, 
    {name: 'ブイブイブレイク', type: 'ノーマル', nature: '物理', power: '-', accuracy: '-', PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: 'ポケモンがなついているほど威力が高くなる。最大148。また、必中技。'}, 
    {name: 'ぶきみなじゅもん', type: 'エスパー', nature: '特殊', power: 80, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '音系の技。相手の最後に使った技のPPを3減らす。'}, 
    {name: 'ブラストバーン', type: 'ほのお', nature: '特殊', power: 150, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '使用した次のターンは行動できない。'}, 
    {name: 'ブラックホールイクリプス', type: 'あく', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『あく』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'ブリザードランス', type: 'こおり', nature: '物理', power: 130, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '相手全体', discription: '通常攻撃。'}, 
    {name: 'ブルームシャインエクストラ', type: 'くさ', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『くさ』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'ブレイククロー', type: 'ノーマル', nature: '物理', power: 75, accuracy: 95, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '50%の確率で相手の『ぼうぎょ』ランクを1段階下げる。'}, 
    {name: 'ブレイジングソウルビート', type: 'ドラゴン', nature: '特殊', power: 185, accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '相手全体', discription: '『ジャラランガ』の専用Z技。自分の『こうげき』『ぼうぎょ』『とくこう』『とくぼう』『すばやさ』が1段階ずつ上がる。音系の技。相手の『みがわり』状態を貫通する。必中技。'}, 
    {name: 'ブレイズキック', type: 'ほのお', nature: '物理', power: 85, accuracy: 90, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '10%の確率で相手を『やけど』状態にする。急所に当たりやすい(急所ランク:+1)。'}, 
    {name: 'ブレイブバード', type: 'ひこう', nature: '物理', power: 120, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの33%を自分も受ける。'}, 
    {name: 'ブロッキング', type: 'あく', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '必ず先制でき(優先度:+4)、そのターンの間、相手の攻撃技を受けない。また、直接攻撃をしてきた相手の『ぼうぎょ』ランクを2段階下げる。連続で使うと失敗しやすくなる。ダイマックス技は貫通し、1/4のダメージを受ける。'}, 
    {name: 'ぶんまわす', type: 'あく', nature: '物理', power: 60, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '自分以外', discription: '通常攻撃。'}, 
    {name: 'プラズマシャワー', type: 'でんき', nature: '変化', power: '-', accuracy: '-', PP: 25, direct: '間接', protect: '不能', target: '全体の場', discription: '必ず先制でき(優先度:+1)、そのターンの間、すべての『ノーマル』タイプの技を『でんき』タイプにする。'}, 
    {name: 'プラズマフィスト', type: 'でんき', nature: '物理', power: 100, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: 'そのターンの間、すべての『ノーマル』タイプの技を『でんき』タイプにする。特性『てつのこぶし』の時、威力が1.2倍になる。'}, 
    {name: 'プリズムレーザー', type: 'エスパー', nature: '特殊', power: 160, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '使用した次のターンは行動できない。'}, 
    {name: 'プレゼント', type: 'ノーマル', nature: '物理', power: '-', accuracy: 90, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '40%の確率で威力40、30%で威力80、10%の確率で威力120になり、20%の確率で相手のHPを最大HPの1/4回復する。'}, 
    {name: 'ヘドロウェーブ', type: 'どく', nature: '特殊', power: 95, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '自分以外', discription: '10%の確率で相手を『どく』状態にする。'}, 
    {name: 'ヘドロこうげき', type: 'どく', nature: '特殊', power: 65, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '30%の確率で相手を『どく』状態にする。'}, 
    {name: 'ヘドロばくだん', type: 'どく', nature: '特殊', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '30%の確率で相手を『どく』状態にする。'}, 
    {name: 'ヘビーボンバー', type: 'はがね', nature: '物理', power: '-', accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '自分の『おもさ』が相手より重いほど威力が高くなる。相手の『おもさ』が自分の1/5以下なら120、1/4以下なら100、1/3以下なら80、1/2以下なら60、それより大きければ40。相手が技『ちいさくなる』を使用していると必ず命中し、威力が2倍になる(第7世代以降)。ダイマックスしている相手には無効。'}, 
    {name: 'へびにらみ', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '1体選択', discription: '相手を『まひ』状態にする。『でんき』タイプには無効。'}, 
    {name: 'へんしん', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '1体選択', discription: '一時的に、相手と同じナンバー・グラフィックス・能力値・個体値・ランク・特性・技になる。ただしHP・持ち物・状態異常などはコピーされずそのままとなり、技のPPはすべて5になる。交代すると元に戻る。ダイマックスしている相手をコピーすると、元のポケモンの姿になる。'}, 
    {name: 'ベノムショック', type: 'どく', nature: '特殊', power: 65, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '相手が『どく』状態の時、威力が2倍になる。'}, 
    {name: 'ベノムトラップ', type: 'どく', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '相手全体', discription: '『どく』『もうどく』状態のすべての相手の『こうげき』『とくこう』『すばやさ』ランクを1段階ずつ下げる。'}, 
    {name: 'ほうでん', type: 'でんき', nature: '特殊', power: 80, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '自分以外', discription: '30%の確率で相手を『まひ』状態にする。'}, 
    {name: 'ほえる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '1体選択', discription: '必ず後攻になる(優先度:-6)。相手のポケモンを強制的に交代させる。野生のポケモンの場合は戦闘を終了する。必中技。相手の『まもる』『みきり』『トーチカ』『ニードルガード』『ブロッキング』の効果を受けない。音系の技。相手の『みがわり』状態を貫通する。ダイマックスしている相手には無効。野生のポケモンの場合、相手が自分のレベルより高い場合は失敗する。'}, 
    {name: 'ほおばる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分が持っている『きのみ』を即座に使って効果を発動させ、さらに自分の『ぼうぎょ』ランクを2段階上げる。'}, 
    {name: 'ほごしょく', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分の『タイプ』を、地形が草むらやグラスフィールドの時は『くさ』タイプ、砂地の時は『じめん』タイプ、水上の時は『みず』タイプ、岩場と洞窟の時は『いわ』タイプ、雪原と氷上の時は『こおり』タイプ、火山の時は『ほのお』タイプ、エレキフィールドの時は『でんき』タイプ、ミストフィールドの時は『フェアリー』タイプ、サイコフィールドやウルトラスペースの時は『エスパー』タイプ、その他は『ノーマル』タイプに変える。ただし、同じ『タイプ』を持っている場合は失敗する。'}, 
    {name: 'ほしがる', type: 'ノーマル', nature: '物理', power: 60, accuracy: 100, PP: 25, direct: '直接', protect: '可能', target: '1体選択', discription: '相手が持っている道具を自分の物にする。自分が既に道具を持っている場合は失敗するが、技『はたきおとす』で自分の道具が無効化されている時は奪う事ができ、道具は上書きされる。トレーナー戦の場合はバトル終了後になくなる。'}, 
    {name: 'ほたるび', type: 'むし', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分の『とくこう』ランクが3段階上がる。'}, 
    {name: 'ほっぺすりすり', type: 'でんき', nature: '物理', power: 20, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '100%の確率で相手を『まひ』状態にする。'}, 
    {name: 'ホネこんぼう', type: 'じめん', nature: '物理', power: 65, accuracy: 85, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '10%の確率で相手をひるませる。'}, 
    {name: 'ホネブーメラン', type: 'じめん', nature: '物理', power: 50, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '1ターンに2回連続で攻撃する。'}, 
    {name: 'ほのおのうず', type: 'ほのお', nature: '特殊', power: 35, accuracy: 85, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '4〜5ターンの間、毎ターン終了後最大HPの1/8のダメージを与え、その間『ゴースト』タイプではない相手は逃げたり交代できない。'}, 
    {name: 'ほのおのキバ', type: 'ほのお', nature: '物理', power: 65, accuracy: 95, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '10%の確率で相手を『やけど』状態にするか、ひるませる。'}, 
    {name: 'ほのおのちかい', type: 'ほのお', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: 'ダブルバトルで、技『くさのちかい』と組み合わせて使用すると4ターンの間毎ターン『ほのお』タイプ以外の相手にダメージを与え、技『みずのちかい』と組み合わせて使用すると4ターンの間技の追加効果が出やすくなる。また、威力が150になる。'}, 
    {name: 'ほのおのパンチ', type: 'ほのお', nature: '物理', power: 75, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '10%の確率で相手を『やけど』状態にする。特性『てつのこぶし』の時、威力が1.2倍になる。'}, 
    {name: 'ほのおのまい', type: 'ほのお', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '50%の確率で自分の『とくこう』ランクが1段階上がる。'}, 
    {name: 'ほのおのムチ', type: 'ほのお', nature: '物理', power: 80, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '100%の確率で相手の『ぼうぎょ』ランクを1段階下げる。'}, 
    {name: 'ほろびのうた', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '全体', discription: '3ターン終了後に、この技を使った時に出ていた自分を含むすべてのポケモンは『ひんし』状態になる。それまでに交代したポケモンは効果が消える。音系の技。相手の『みがわり』状態を貫通する。'}, 
    {name: 'ほんきをだす こうげき', type: 'ノーマル', nature: '物理', power: 210, accuracy: '-', PP: 1, direct: '直接', protect: '不能', target: '1体選択', discription: '『カビゴン』の専用Z技。必中技。'}, 
    {name: 'ボーンラッシュ', type: 'じめん', nature: '物理', power: 25, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '1ターンに2〜5回連続で攻撃する。'}, 
    {name: 'ぼうぎょしれい', type: 'むし', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分の『ぼうぎょ』『とくぼう』ランクが1段階ずつ上がる。'}, 
    {name: 'ぼうふう', type: 'ひこう', nature: '特殊', power: 110, accuracy: 70, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '30%の確率で、相手を2〜5ターンの間『こんらん』状態にする。天気が『あめ』の時は必ず命中し、『にほんばれ』の時は命中率が50%になる。相手が技『そらをとぶ』『とびはねる』『フリーフォール』を使っている時でも命中する。'}, 
    {name: 'ボディパージ', type: 'はがね', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '自分', discription: '自分の『すばやさ』ランクが2段階上がる。また、自分の『おもさ』が100kg軽くなる。'}, 
    {name: 'ボディプレス', type: 'かくとう', nature: '物理', power: 80, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '『こうげき』ではなく、自分の『ぼうぎょ』と『ぼうぎょ』ランクを『こうげき』の数値にしてダメージ計算する。'}, 
    {name: 'ボルテッカー', type: 'でんき', nature: '物理', power: 120, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの33%を自分も受ける。10%の確率で相手を『まひ』状態にする。'}, 
    {name: 'ボルトチェンジ', type: 'でんき', nature: '特殊', power: 70, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '攻撃後、手持ちのポケモンと入れ替わる。'}, 
    {name: 'ポイズンテール', type: 'どく', nature: '物理', power: 50, accuracy: 100, PP: 25, direct: '直接', protect: '可能', target: '1体選択', discription: '10%の確率で相手を『どく』状態にする。急所に当たりやすい(急所ランク:+1)。'}, 
    {name: 'ぽかぼかフレンドタイム', type: 'フェアリー', nature: '物理', power: 190, accuracy: '-', PP: 1, direct: '直接', protect: '不能', target: '1体選択', discription: '『ミミッキュ』の専用Z技。必中技。'}, 
    {name: 'ポルターガイスト', type: 'ゴースト', nature: '物理', power: 110, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '相手が道具を持っていない時は失敗する。なお、相手の道具を無効にする効果はない。'}, 
    {name: 'マキシマムサイブレイカー', type: 'エスパー', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『エスパー』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'まきつく', type: 'ノーマル', nature: '物理', power: 15, accuracy: 90, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '4〜5ターンの間、毎ターン終了後最大HPの1/8のダメージを与え、その間『ゴースト』タイプではない相手は逃げたり交代できない。'}, 
    {name: 'まきびし', type: 'じめん', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '相手の場', discription: '使用後、相手はポケモンを交代する度にダメージを受ける。3回まで使うことができ、1回の時は相手の最大HPの1/8、2回の時は相手の最大HPの1/6、3回の時は相手の最大HPの1/4のダメージを与える。『ひこう』タイプ、特性『ふゆう』のポケモンはダメージを受けない。'}, 
    {name: 'マグニチュード', type: 'じめん', nature: '物理', power: '-', accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '自分以外', discription: '威力は5%の確率で10、10%の確率で30、20%の確率で50、30%の確率で70、20%の確率で90、10%の確率で110、5%の確率で150になる。相手が技『あなをほる』を使っている時でも命中し、ダメージが2倍になる。'}, 
    {name: 'マグネットボム', type: 'はがね', nature: '物理', power: 60, accuracy: '-', PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '必中技。'}, 
    {name: 'マグマストーム', type: 'ほのお', nature: '特殊', power: 100, accuracy: 75, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '4〜5ターンの間、毎ターン終了後最大HPの1/8のダメージを与え、その間『ゴースト』タイプではない相手は逃げたり交代できない。'}, 
    {name: 'マジカルシャイン', type: 'フェアリー', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '通常攻撃。'}, 
    {name: 'マジカルフレイム', type: 'ほのお', nature: '特殊', power: 75, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '100%の確率で相手の『とくこう』ランクを1段階下げる。(第6世代は威力:65)'}, 
    {name: 'マジカルリーフ', type: 'くさ', nature: '特殊', power: 60, accuracy: '-', PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '必中技。'}, 
    {name: 'マジックコート', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '自分', discription: '必ず先制でき、そのターンの間、自分が受ける変化技を使用した相手に跳ね返す。跳ね返す技の命中率は、『マジックコート』を使用したポケモンで計算される。(優先度:+4)'}, 
    {name: 'マジックルーム', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '全体の場', discription: '5ターンの間、すべてのポケモンの道具の効果がなくなる。'}, 
    {name: 'マッドショット', type: 'じめん', nature: '特殊', power: 55, accuracy: 95, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '100%の確率で相手の『すばやさ』ランクを1段階下げる。'}, 
    {name: 'マッハパンチ', type: 'かくとう', nature: '物理', power: 40, accuracy: 100, PP: 30, direct: '直接', protect: '可能', target: '1体選択', discription: '必ず先制できる(優先度:+1)。特性『てつのこぶし』の時、威力が1.2倍になる。'}, 
    {name: 'まとわりつく', type: 'むし', nature: '特殊', power: 20, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '4〜5ターンの間、毎ターン終了後最大HPの1/8のダメージを与え、その間『ゴースト』タイプではない相手は逃げたり交代できない。'}, 
    {name: 'まねっこ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '最後に使われた技で相手に攻撃する。自分の技も対象となる。最後の技がダイマックス技の場合、元となった技が使われる。'}, 
    {name: 'まほうのこな', type: 'エスパー', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手を『エスパー』タイプにする。『くさ』タイプや特性『ぼうじん』、道具『ぼうじんゴーグル』を持っているポケモンには無効。'}, 
    {name: 'まもる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '必ず先制でき(優先度:+4)、そのターンの間、相手の技を受けない。連続で使うと失敗しやすくなる。ダイマックス技や第7世代のZワザの攻撃技は貫通し、1/4のダメージを受ける。'}, 
    {name: 'まるくなる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 40, direct: '間接', protect: '不能', target: '自分', discription: '自分の『ぼうぎょ』ランクを1段階上げる。'}, 
    {name: 'マルチアタック', type: 'ノーマル', nature: '物理', power: 120, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '持たせた専用の道具『メモリ』の種類によって『タイプ』が変わる。(第7世代までは威力90)'}, 
    {name: 'まわしげり', type: 'かくとう', nature: '物理', power: 60, accuracy: 85, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '30%の確率で相手をひるませる。'}, 
    {name: 'みかづきのまい', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分が『ひんし』になる代わりに、次に出す自分のポケモンのすべての状態が全回復する。'}, 
    {name: 'みがわり', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分のHPを最大HPの1/4だけ減らして、減らしたHPと同じHPの自分の分身を作り、分身のHPが0になるまですべての攻撃を自分の代わりに分身が受ける。分身は状態異常にならない。ただし、音系の技などはそのまま受ける。相手のダイマックス技も防げるが、自分がダイマックスすると分身が消える。'}, 
    {name: 'みきり', type: 'かくとう', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '自分', discription: '必ず先制でき(優先度:+4)、そのターンの間、相手の技を受けない。連続で使うと失敗しやすくなる。ダイマックス技や第7世代のZワザの攻撃技は貫通し、1/4のダメージを受ける。'}, 
    {name: 'ミサイルばり', type: 'むし', nature: '物理', power: 25, accuracy: 95, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '1ターンに2〜5回連続で攻撃する。'}, 
    {name: 'ミストバースト', type: 'フェアリー', nature: '特殊', power: 100, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '自分以外', discription: '攻撃後、自分が『ひんし』状態になる。場の状態が『ミストフィールド』で、自分が『ひこう』タイプや特性『ふゆう』などではなく地面にいる時、威力が1.5倍になる。'}, 
    {name: 'ミストフィールド', type: 'フェアリー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '全体の場', discription: '5ターンの間、場の状態を『ミストフィールド』にする。『ひこう』タイプや特性『ふゆう』などではない地面にいるすべてのポケモンは、状態異常にならず、また『ドラゴン』タイプの技の受けるダメージが半減する。すでに状態異常の場合は回復しない。道具『ミストシード』を持ったポケモンは『とくぼう』ランクが1段階上がる。'}, 
    {name: 'ミストボール', type: 'エスパー', nature: '特殊', power: 70, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '50%の確率で相手の『とくこう』ランクを1段階下げる。'}, 
    {name: 'みずあそび', type: 'みず', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '不能', target: '全体の場', discription: '5ターンの間、『ほのお』タイプの技の威力が1/3になる。'}, 
    {name: 'みずしゅりけん', type: 'みず', nature: '特殊', power: 15, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '必ず先制できる(優先度:+1)。1ターンに2〜5回連続で攻撃する。(第6世代は物理技)'}, 
    {name: 'みずでっぽう', type: 'みず', nature: '特殊', power: 40, accuracy: 100, PP: 25, direct: '間接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, 
    {name: 'みずのちかい', type: 'みず', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: 'ダブルバトルで、技『ほのおのちかい』と組み合わせて使用すると4ターンの間技の追加効果が出やすくなり、技『くさのちかい』と組み合わせて使用すると4ターンの間相手の『すばやさ』が下がる。また、威力が150になる。この技は、特性『よびみず』の攻撃対象を変更する効果の影響を受けずに攻撃できる。'}, 
    {name: 'みずのはどう', type: 'みず', nature: '特殊', power: 60, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '20%の確率で相手を1〜4ターンの間『こんらん』状態にする。'}, 
    {name: 'みずびたし', type: 'みず', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手を『みず』タイプにする。'}, 
    {name: 'みだれづき', type: 'ノーマル', nature: '物理', power: 15, accuracy: 85, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '1ターンに2〜5回連続で攻撃する。'}, 
    {name: 'みだれひっかき', type: 'ノーマル', nature: '物理', power: 18, accuracy: 80, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '1ターンに2〜5回連続で攻撃する。'}, 
    {name: 'みちづれ', type: 'ゴースト', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '不能', target: '自分', discription: '次の自分のターンまでに相手の攻撃で『ひんし』状態になると、相手も『ひんし』状態になる。ダイマックスしている相手には効果がない。第7世代以降は、連続で使うと必ず失敗する。'}, 
    {name: 'みねうち', type: 'ノーマル', nature: '物理', power: 40, accuracy: 100, PP: 40, direct: '直接', protect: '可能', target: '1体選択', discription: 'この技のダメージで相手のHPが0になる時、相手のHPを1にする。野生のポケモンを捕まえる時に便利。'}, 
    {name: 'みやぶる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 40, direct: '間接', protect: '可能', target: '1体選択', discription: '使用後、相手の回避率に関係なく攻撃が当たる。相手が『ゴースト』タイプの時、『ノーマル』『かくとう』タイプの技が当たるようになる。'}, 
    {name: 'ミラーコート', type: 'エスパー', nature: '特殊', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '不定', discription: '相手の特殊攻撃のダメージの2倍をその相手に与える。『ダブルバトル』の時は最後に受けた技のみ有効になる。必ず後攻になる(優先度:-5)。『あく』タイプには無効だが、それ以外のタイプ相性の影響を受けない。'}, 
    {name: 'ミラーショット', type: 'はがね', nature: '特殊', power: 65, accuracy: 85, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '30%の確率で相手の命中率を1段階下げる。'}, 
    {name: 'ミラータイプ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '自分の『タイプ』を相手と同じ『タイプ』にする。'}, 
    {name: 'みらいよち', type: 'エスパー', nature: '特殊', power: 120, accuracy: 100, PP: 10, direct: '間接', protect: '不能', target: '1体選択', discription: '2ターン後に攻撃する。交代した場合は同じ位置にいるポケモンに攻撃する。タイプ相性の影響を受ける。'}, 
    {name: 'ミラクルアイ', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 40, direct: '間接', protect: '可能', target: '1体選択', discription: '使用後、相手の回避率に関係なく攻撃が当たる。相手が『あく』タイプの時、『エスパー』タイプの技が当たるようになる。'}, 
    {name: 'ミルクのみ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: 'HPが最大HPの半分回復する。'}, 
    {name: 'ムーンフォース', type: 'フェアリー', nature: '特殊', power: 95, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '30%の確率で相手の『とくこう』ランクを1段階下げる。'}, 
    {name: 'ムーンライトブラスター', type: 'ゴースト', nature: '特殊', power: 200, accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『ルナアーラ』『月食ネクロズマ』の専用Z技。相手の特性の影響を受けずに攻撃する。必中技。'}, 
    {name: 'むげんあんやへのいざない', type: 'ゴースト', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『ゴースト』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'ムゲンダイビーム', type: 'ドラゴン', nature: '特殊', power: 160, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '使用した次のターンは行動できない。'}, 
    {name: 'むしくい', type: 'むし', nature: '物理', power: 60, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '相手が持っているバトルに効果のある『きのみ』を奪って、自分に使う。'}, 
    {name: 'むしのさざめき', type: 'むし', nature: '特殊', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '10%の確率で相手の『とくぼう』ランクを1段階下げる。音系の技。相手の『みがわり』状態を貫通する。'}, 
    {name: 'むしのていこう', type: 'むし', nature: '特殊', power: 50, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '相手全体', discription: '100%の確率で相手の『とくこう』ランクを1段階下げる。'}, 
    {name: 'めいそう', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分の『とくこう』『とくぼう』ランクが1段階ずつ上がる。'}, 
    {name: 'メガトンキック', type: 'ノーマル', nature: '物理', power: 120, accuracy: 75, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, 
    {name: 'メガトンパンチ', type: 'ノーマル', nature: '物理', power: 80, accuracy: 85, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。特性『てつのこぶし』の時、威力が1.2倍になる。'}, 
    {name: 'メガドレイン', type: 'くさ', nature: '特殊', power: 40, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの半分だけ自分のHPが回復する。'}, 
    {name: 'メガホーン', type: 'むし', nature: '物理', power: 120, accuracy: 85, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, 
    {name: 'めざましビンタ', type: 'かくとう', nature: '物理', power: 70, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '相手が『ねむり』状態の時、ダメージが2倍になるが、『ねむり』状態は治る。'}, 
    {name: 'めざめるダンス', type: 'ノーマル', nature: '特殊', power: 90, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: 'この技の『タイプ』は、自分の『タイプ1』と同じになる。'}, 
    {name: 'めざめるパワー', type: 'ノーマル', nature: '特殊', power: 60, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '自分の個体値によって『タイプ』が変わる。(BW2までは威力も個体値によって変化)'}, 
    {name: 'メタルクロー', type: 'はがね', nature: '物理', power: 50, accuracy: 95, PP: 35, direct: '直接', protect: '可能', target: '1体選択', discription: '10%の確率で自分の『こうげき』ランクが1段階上がる。'}, 
    {name: 'メタルバースト', type: 'はがね', nature: '物理', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '不定', discription: 'そのターンに最後に受けた技のダメージの1.5倍をその相手に与える。'}, 
    {name: 'メテオドライブ', type: 'はがね', nature: '物理', power: 100, accuracy: 100, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '相手の特性の影響を受けずに攻撃する。'}, 
    {name: 'メテオビーム', type: 'いわ', nature: '特殊', power: 120, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '1ターン目に100%の確率で自分の『とくこう』ランクを1段階上げ、2ターン目で攻撃する。'}, 
    {name: 'めらめらバーン', type: 'ほのお', nature: '物理', power: 60, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '100%の確率で相手を『やけど』状態にする。'}, 
    {name: 'メロメロ', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手が自分とは異なる性別の場合、相手を『メロメロ』状態にする。『メロメロ』状態になると、50%の確率で相手は自分に攻撃できなくなる。自分と相手の性別が同じ時や、どちらかが性別不明の場合は失敗する。'}, 
    {name: 'もえあがるいかり', type: 'あく', nature: '特殊', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '相手全体', discription: '20%の確率で相手をひるませる。'}, 
    {name: 'もえつきる', type: 'ほのお', nature: '特殊', power: 130, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '攻撃後、自分は『ほのお』タイプではなくなる。自分が『ほのお』タイプではない時は失敗する。自分が『こおり』状態の時でも使う事ができ、使うと『こおり』状態が治る。'}, 
    {name: 'ものまね', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '一時的に、相手が最後に自分に使った技が使えるようになる。PPはコピーした技のポイントアップ未使用時の最大値となる。交代すると元に戻る。相手の技が第7世代のZワザの場合は失敗する。'}, 
    {name: 'もりののろい', type: 'くさ', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '相手の『タイプ』に『くさ』タイプを追加する。'}, 
    {name: 'もろはのずつき', type: 'いわ', nature: '物理', power: 150, accuracy: 80, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの1/2を自分も受ける。'}, 
    {name: 'やきつくす', type: 'ほのお', nature: '特殊', power: 60, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '相手全体', discription: '相手の持っている『きのみ』や『ノーマルジュエル』を使えなくする。'}, 
    {name: 'やつあたり', type: 'ノーマル', nature: '物理', power: 102, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: 'ポケモンがなついていないほど威力が高くなる。最大102。'}, 
    {name: 'やどりぎのタネ', type: 'くさ', nature: '変化', power: '-', accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '使用後、毎ターン、相手のHPを最大HPの1/8ずつ減らし、その分自分のHPを回復させる。自分は交代しても効果が引き継ぐ。『くさ』タイプのポケモンには無効。'}, 
    {name: 'やまあらし', type: 'かくとう', nature: '物理', power: 60, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '必ず急所に当たる。'}, 
    {name: 'ゆうわく', type: 'ノーマル', nature: '変化', power: '-', accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '相手全体', discription: '相手が自分とは異なる性別の場合、相手の『とくこう』を2段階下げる。自分と相手の性別が同じ時や、どちらかが性別不明の場合は失敗する。'}, 
    {name: 'ゆきなだれ', type: 'こおり', nature: '物理', power: 60, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: 'そのターンに相手の技のダメージを受けると威力が2倍になる。必ず後攻になる(優先度:-4)。'}, 
    {name: 'ゆびをふる', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: 'ほぼすべての技の中からランダムで1つ使う。'}, 
    {name: 'ゆめくい', type: 'エスパー', nature: '特殊', power: 100, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの半分だけ自分のHPが回復する。相手が『ねむり』状態の時だけ成功する。'}, 
    {name: 'ようかいえき', type: 'どく', nature: '特殊', power: 40, accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '相手全体', discription: '10%の確率で相手の『とくぼう』ランクを1段階下げる。'}, 
    {name: 'ようせいのかぜ', type: 'フェアリー', nature: '特殊', power: 40, accuracy: 100, PP: 30, direct: '間接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, 
    {name: 'ヨガのポーズ', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 40, direct: '間接', protect: '不能', target: '自分', discription: '自分の『こうげき』ランクを1段階上げる。'}, 
    {name: 'よこどり', type: 'あく', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '必ず先制でき(優先度:+4)、相手が使おうとした、能力ランクを変化させる技や回復系の技の効果を奪い、自分にかける。'}, 
    {name: 'らいげき', type: 'でんき', nature: '物理', power: 130, accuracy: 85, PP: 5, direct: '直接', protect: '可能', target: '1体選択', discription: '20%の確率で相手を『まひ』状態にする。'}, 
    {name: 'ライジングボルト', type: 'でんき', nature: '特殊', power: 70, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '場の状態が『エレキフィールド』で、なおかつ相手が『ひこう』タイプや特性『ふゆう』などではなく地面にいる時、威力が2倍になる(自分も地面にいれば、フィールドの1.3倍の効果もさらに加わる)。'}, 
    {name: 'ライジングランドオーバー', type: 'じめん', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『じめん』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'ライトニングサーフライド', type: 'でんき', nature: '特殊', power: 175, accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『ライチュウ(アローラの姿)』の専用Z技。100%の確率で相手を『まひ』状態にする。必中技。'}, 
    {name: 'らいめいげり', type: 'かくとう', nature: '物理', power: 90, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '100%の確率で、相手の『ぼうぎょ』ランクを1段階下げる。'}, 
    {name: 'ラジアルエッジストーム', type: 'いわ', nature: '物理', power: 190, accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『ルガルガン』の専用Z技。『グラスフィールド』『ミストフィールド』『エレキフィールド』『サイコフィールド』を解除する。必中技。'}, 
    {name: 'ラスターカノン', type: 'はがね', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '10%の確率で相手の『とくぼう』ランクを1段階下げる。'}, 
    {name: 'ラスターパージ', type: 'エスパー', nature: '特殊', power: 70, accuracy: 100, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '50%の確率で相手の『とくぼう』ランクを1段階下げる。'}, 
    {name: 'ラブリースターインパクト', type: 'フェアリー', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『フェアリー』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'リーフストーム', type: 'くさ', nature: '特殊', power: 130, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '攻撃後、100%の確率で自分の『とくこう』ランクが2段階下がる。'}, 
    {name: 'リーフブレード', type: 'くさ', nature: '物理', power: 90, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '急所に当たりやすい(急所ランク:+1)。'}, 
    {name: 'リサイクル', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '自分', discription: '自分が最後に使用した持ち物の道具を手に入れる。道具を持っている場合は失敗する。'}, 
    {name: 'リフレクター', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '味方の場', discription: '5ターンの間、相手の物理攻撃のダメージを半分にする。味方が複数の場合は半分ではなく2/3になる。急所に当たった場合は軽減されない。交代しても効果は続く。'}, 
    {name: 'リフレッシュ', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '『どく』『まひ』『やけど』状態が治る。'}, 
    {name: 'リベンジ', type: 'かくとう', nature: '物理', power: 60, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: 'そのターンに相手の技のダメージを受けると威力が2倍になる。必ず後攻になる(優先度:-4)。'}, 
    {name: 'りゅうせいぐん', type: 'ドラゴン', nature: '特殊', power: 130, accuracy: 90, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '攻撃後、100%の確率で自分の『とくこう』ランクが2段階下がる。'}, 
    {name: 'りゅうのいかり', type: 'ドラゴン', nature: '特殊', power: '-', accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '40の固定ダメージを与える。『フェアリー』タイプには無効だが、それ以外のタイプ相性の影響を受けない。'}, 
    {name: 'りゅうのいぶき', type: 'ドラゴン', nature: '特殊', power: 60, accuracy: 100, PP: 20, direct: '間接', protect: '可能', target: '1体選択', discription: '30%の確率で相手を『まひ』状態にする。'}, 
    {name: 'りゅうのはどう', type: 'ドラゴン', nature: '特殊', power: 85, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '通常攻撃。'}, 
    {name: 'りゅうのまい', type: 'ドラゴン', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分の『こうげき』『すばやさ』ランクを1段階ずつ上げる。'}, 
    {name: 'りんごさん', type: 'くさ', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '100%の確率で相手の『とくぼう』ランクを1段階下げる。'}, 
    {name: 'りんしょう', type: 'ノーマル', nature: '特殊', power: 60, accuracy: 100, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '同じターンに他のポケモンも『りんしょう』を使おうとすると、『すばやさ』に関係なく最初に使用したポケモンに続いて使用でき、最初以外の『りんしょう』は威力が2倍になる。音系の技。相手の『みがわり』状態を貫通する。(ダブルバトル用)'}, 
    {name: 'レイジングジオフリーズ', type: 'こおり', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『こおり』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'れいとうパンチ', type: 'こおり', nature: '物理', power: 75, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '10%の確率で相手を『こおり』状態にする。特性『てつのこぶし』の時、威力が1.2倍になる。'}, 
    {name: 'れいとうビーム', type: 'こおり', nature: '特殊', power: 90, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '10%の確率で相手を『こおり』状態にする。'}, 
    {name: 'れんごく', type: 'ほのお', nature: '特殊', power: 100, accuracy: 50, PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '100%の確率で相手を『やけど』状態にする。'}, 
    {name: 'れんぞくぎり', type: 'むし', nature: '物理', power: 40, accuracy: 95, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '連続で使用すると攻撃が当たる度に威力が倍増していく(最大160)。攻撃が外れたり連続で使用しないと元に戻る。'}, 
    {name: 'れんぞくパンチ', type: 'ノーマル', nature: '物理', power: 18, accuracy: 85, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '1ターンに2〜5回連続で攻撃する。特性『てつのこぶし』の時、威力が1.2倍になる。'}, 
    {name: 'ローキック', type: 'かくとう', nature: '物理', power: 65, accuracy: 100, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '100%の確率で相手の『すばやさ』ランクを1段階下げる。'}, 
    {name: 'ロケットずつき', type: 'ノーマル', nature: '物理', power: 130, accuracy: 100, PP: 10, direct: '直接', protect: '可能', target: '1体選択', discription: '1ターン目に100%の確率で自分の『ぼうぎょ』ランクを1段階上げ、2ターン目で攻撃する。'}, 
    {name: 'ロックオン', type: 'ノーマル', nature: '変化', power: '-', accuracy: '-', PP: 5, direct: '間接', protect: '可能', target: '1体選択', discription: '次のターン、使った相手に自分の技が必ず命中する。'}, 
    {name: 'ロックカット', type: 'いわ', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分の『すばやさ』ランクが2段階上がる。'}, 
    {name: 'ロッククライム', type: 'ノーマル', nature: '物理', power: 90, accuracy: 85, PP: 20, direct: '直接', protect: '可能', target: '1体選択', discription: '20%の確率で相手を1〜4ターンの間『こんらん』状態にする。'}, 
    {name: 'ロックブラスト', type: 'いわ', nature: '物理', power: 25, accuracy: 90, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '1ターンに2〜5回連続で攻撃する。'}, 
    {name: 'ワールズエンドフォール', type: 'いわ', nature: '特殊', power: '-', accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『いわ』タイプのZ技。威力や分類は元の技で変化する。必中技。'}, 
    {name: 'ワイドガード', type: 'いわ', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '味方の場', discription: '必ず先制でき(優先度:+3)、そのターンの間、自分と味方は相手や味方が使った複数のポケモンが対象の技を受けない。(第6世代までは、変化技は防げない)'}, 
    {name: 'ワイドフォース', type: 'エスパー', nature: '特殊', power: 80, accuracy: 100, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '場の状態が『サイコフィールド』で、自分が『ひこう』タイプや特性『ふゆう』などではなく地面にいる時、威力が1.5倍になり(フィールドの1.3倍の効果もさらに加わる)、また相手全体を攻撃する(その時ダブルバトルではダメージは0.75倍)。'}, 
    {name: 'ワイドブレイカー', type: 'ドラゴン', nature: '物理', power: 60, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '相手全体', discription: '100%の確率で相手の『こうげき』ランクを1段階下げる'}, 
    {name: 'ワイルドボルト', type: 'でんき', nature: '物理', power: 90, accuracy: 100, PP: 15, direct: '直接', protect: '可能', target: '1体選択', discription: '相手に与えたダメージの1/4を自分も受ける。'}, 
    {name: 'わたほうし', type: 'くさ', nature: '変化', power: '-', accuracy: 100, PP: 40, direct: '間接', protect: '可能', target: '相手全体', discription: '相手の『すばやさ』ランクを2段階下げる。『くさ』タイプや特性『ぼうじん』、道具『ぼうじんゴーグル』を持っているポケモンには無効。'}, 
    {name: 'わだつみのシンフォニア', type: 'みず', nature: '特殊', power: 195, accuracy: '-', PP: 1, direct: '間接', protect: '不能', target: '1体選択', discription: '『アシレーヌ』の専用Z技。必中技。'}, 
    {name: 'わるあがき', type: 'ノーマル', nature: '物理', power: 50, accuracy: '-', PP: 1, direct: '直接', protect: '可能', target: 'ランダム1体', discription: 'すべての技のPPが0になる等して使える技がなくなると使える。自分の最大HPの1/4を自分も受ける。『タイプ』に関係なくダメージを与える。'}, 
    {name: 'わるだくみ', type: 'あく', nature: '変化', power: '-', accuracy: '-', PP: 20, direct: '間接', protect: '不能', target: '自分', discription: '自分の『とくこう』ランクを2段階上げる。'}, 
    {name: 'わるわるゾーン', type: 'あく', nature: '特殊', power: 80, accuracy: 95, PP: 15, direct: '間接', protect: '可能', target: '1体選択', discription: '味方の場に『リフレクター』を作り、5ターンの間、相手の物理攻撃のダメージを半分にする。'}, 
    {name: 'ワンダースチーム', type: 'フェアリー', nature: '特殊', power: 90, accuracy: 95, PP: 10, direct: '間接', protect: '可能', target: '1体選択', discription: '20%の確率で相手を1〜4ターンの間『こんらん』状態にする。'}, 
    {name: 'ワンダールーム', type: 'エスパー', nature: '変化', power: '-', accuracy: '-', PP: 10, direct: '間接', protect: '不能', target: '全体の場', discription: '5ターンの間、すべてのポケモンの『ぼうぎょ』と『とくぼう』の能力値が入れ替わる。もう1度使用すると元に戻る。'}
]

// Zワザ
const moveList_Z = [
    {name: 'ウルトラダッシュアタック', type: 'ノーマル', item: 'ノーマルZ'}, 
    {name: 'ブルームシャインエクストラ', type: 'くさ', item: 'クサZ'}, 
    {name: 'ダイナミックフルフレイム', type: 'ほのお', item: 'ホノオZ'}, 
    {name: 'スーパーアクアトルネード', type: 'みず', item: 'ミズZ'}, 
    {name: 'スパーキングギガボルト', type: 'でんき', item: 'デンキZ'}, 
    {name: 'ファイナルダイブクラッシュ', type: 'ひこう', item: 'ヒコウZ'}, 
    {name: 'ぜんりょくむそうげきれつけん', type: 'かくとう', item: 'カクトウZ'}, 
    {name: 'ライジングランドオーバー', type: 'じめん', item: 'ジメンZ'}, 
    {name: 'ぜったいほしょくかいてんざん', type: 'むし', item: 'ムシZ'}, 
    {name: 'ワールズエンドフォール', type: 'いわ', item: 'イワZ'}, 
    {name: 'ブラックホールイクリプス', type: 'あく', item: 'アクZ'}, 
    {name: 'レイジングジオフリーズ', type: 'こおり', item: 'コオリZ'}, 
    {name: 'アシッドポイズンデリート', type: 'どく', item: 'ドクZ'}, 
    {name: 'ちょうぜつらせんれんげき', type: 'はがね', item: 'ハガネZ'}, 
    {name: 'むげんあんやへのいざない', type: 'ゴースト', item: 'ゴーストZ'}, 
    {name: 'マキシマムサイブレイカー', type: 'エスパー', item: 'エスパーZ'}, 
    {name: 'アルティメットドラゴンバーン', type: 'ドラゴン', item: 'ドラゴンZ'}, 
    {name: 'ラブリースターインパクト', type: 'フェアリー', item: 'フェアリーZ'}
]

// 専用Zワザ
const moveList_dedicated_Z = [
    {name: 'ひっさつのピカチュート', poke: 'ピカチュウ', item: 'ピカチュウZ', org: 'ボルテッカー'}, 
    {name: 'シャドーアローズストライク', poke: 'ジュナイパー', item: 'ジュナイパーZ', org: 'かげぬい'}, 
    {name: 'ハイパーダーククラッシャー', poke: 'ガオガエン', item: 'ガオガエンZ', org: 'DDラリアット'}, 
    {name: 'わだつみのシンフォニア', poke: 'アシレーヌ', item: 'アシレーヌZ', org: 'うたかたのアリア'}, 
    {name: 'ガーディアン・デ・アローラ', poke: 'カプ・コケコ', item: 'カプZ', org: 'しぜんのいかり'}, 
    {name: 'ガーディアン・デ・アローラ', poke: 'カプ・テテフ', item: 'カプZ', org: 'しぜんのいかり'}, 
    {name: 'ガーディアン・デ・アローラ', poke: 'カプ・ブルル', item: 'カプZ', org: 'しぜんのいかり'}, 
    {name: 'ガーディアン・デ・アローラ', poke: 'カプ・レヒレ', item: 'カプZ', org: 'しぜんのいかり'}, 
    {name: 'しちせいだっこんたい', poke: 'マーシャドー', item: 'マーシャドーZ', org: 'シャドースチール'}, 
    {name: 'ライトニングサーフライド', poke: 'ライチュウ(アローラのすがた)', item: 'アロライZ', org: '10まんボルト'}, 
    {name: 'ほんきをだす こうげき', poke: 'カビゴン', item: 'カビゴンZ', org: 'ギガインパクト'}, 
    {name: 'ナインエボルブースト', poke: 'イーブイ', item: 'イーブイZ', org: 'とっておき'}, 
    {name: 'オリジンズスーパーノヴァ', poke: 'ミュウ', item: 'ミュウZ', org: 'サイコキネシス'}, 
    {name: '1000まんボルト', poke: 'サトシのピカチュウ', item: 'サトピカZ', org: '10まんボルト'}, 
    {name: 'サンシャインスマッシャー', poke: 'ソルガレオ', item: 'ソルガレオZ', org: 'メテオドライブ'}, 
    {name: 'サンシャインスマッシャー', poke: 'ネクロズマ(たそがれのたてがみ(日食))', item: 'ソルガレオZ', org: 'メテオドライブ'}, 
    {name: 'ムーンライトブラスター', poke: 'ルナアーラ', item: 'ルナアーラZ', org: 'シャドーレイ'}, 
    {name: 'ムーンライトブラスター', poke: 'ネクロズマ(あかつきのつばさ(月食))', item: 'ルナアーラZ', org: 'シャドーレイ'}, 
    {name: 'てんこがすめつぼうのひかり', poke: 'ネクロズマ(ウルトラネクロズマ)', item: 'ウルトラネクロZ', org: 'フォトンゲイザー'}, 
    {name: 'ぽかぼかフレンドタイム', poke: 'ミミッキュ', item: 'ミミッキュZ', org: 'じゃれつく'}, 
    {name: 'ラジアルエッジストーム', poke: 'ルガルガン(まひるのすがた)', item: 'ルガルガンZ', org: 'ストーンエッジ'}, 
    {name: 'ラジアルエッジストーム', poke: 'ルガルガン(まよなかのすがた)', item: 'ルガルガンZ', org: 'ストーンエッジ'}, 
    {name: 'ラジアルエッジストーム', poke: 'ルガルガン(たそがれのすがた)', item: 'ルガルガンZ', org: 'ストーンエッジ'}, 
    {name: 'ブレイジングソウルビート', poke: 'ジャラランガ', item: 'ジャラランガZ', org: 'スケイルノイズ'}
]

// Z変化技の効果
const moveList_status_Z = {
    rank: [
        {name: 'いやなおと', parameter: 'atk', num: 1}, 
        {name: 'かぎわける', parameter: 'atk', num: 1}, 
        {name: 'かくばる', parameter: 'atk', num: 1}, 
        {name: 'しっぽをふる', parameter: 'atk', num: 1}, 
        {name: 'とおぼえ', parameter: 'atk', num: 1}, 
        {name: 'とぎすます', parameter: 'atk', num: 1}, 
        {name: 'にらみつける', parameter: 'atk', num: 1}, 
        {name: 'ふるいたてる', parameter: 'atk', num: 1}, 
        {name: 'ヨガのポーズ', parameter: 'atk', num: 1}, 
        {name: 'おにび', parameter: 'atk', num: 1}, 
        {name: 'ビルドアップ', parameter: 'atk', num: 1}, 
        {name: 'たがやす', parameter: 'atk', num: 1}, 
        {name: 'パワートリック', parameter: 'atk', num: 1}, 
        {name: 'ちょうはつ', parameter: 'atk', num: 1}, 
        {name: 'つめとぎ', parameter: 'atk', num: 1}, 
        {name: 'ひっくりかえす', parameter: 'atk', num: 1}, 
        {name: 'オウムがえし', parameter: 'atk', num: 2}, 
        {name: 'はねる', parameter: 'atk', num: 3}, 
        {name: 'いたみわけ', parameter: 'def', num: 1}, 
        {name: 'おたけび', parameter: 'def', num: 1}, 
        {name: 'かたくなる', parameter: 'def', num: 1}, 
        {name: 'くすぐる', parameter: 'def', num: 1}, 
        {name: 'とおせんぼう', parameter: 'def', num: 1}, 
        {name: 'なかよくする', parameter: 'def', num: 1}, 
        {name: 'なきごえ', parameter: 'def', num: 1}, 
        {name: 'なみだめ', parameter: 'def', num: 1}, 
        {name: 'ほえる', parameter: 'def', num: 1}, 
        {name: 'からにこもる', parameter: 'def', num: 1}, 
        {name: 'グラスフィールド', parameter: 'def', num: 1}, 
        {name: 'ちからをすいとる', parameter: 'def', num: 1}, 
        {name: 'ニードルガード', parameter: 'def', num: 1}, 
        {name: 'アクアリング', parameter: 'def', num: 1}, 
        {name: 'たたみがえし', parameter: 'def', num: 1}, 
        {name: 'ファストガード', parameter: 'def', num: 1}, 
        {name: 'トーチカ', parameter: 'def', num: 1}, 
        {name: 'どくガス', parameter: 'def', num: 1}, 
        {name: 'どくどく', parameter: 'def', num: 1}, 
        {name: 'どくのこな', parameter: 'def', num: 1}, 
        {name: 'どくびし', parameter: 'def', num: 1}, 
        {name: 'ベノムトラップ', parameter: 'def', num: 1}, 
        {name: 'まきびし', parameter: 'def', num: 1}, 
        {name: 'フェザーダンス', parameter: 'def', num: 1}, 
        {name: 'リフレクター', parameter: 'def', num: 1}, 
        {name: 'クモのす', parameter: 'def', num: 1}, 
        {name: 'ぼうぎょしれい', parameter: 'def', num: 1}, 
        {name: 'ステルスロック', parameter: 'def', num: 1}, 
        {name: 'ワイドガード', parameter: 'def', num: 1}, 
        {name: 'いちゃもん', parameter: 'def', num: 1}, 
        {name: 'あまえる', parameter: 'def', num: 1}, 
        {name: 'つぶらなひとみ', parameter: 'def', num: 1}, 
        {name: 'フェアリーロック', parameter: 'def', num: 1}, 
        {name: 'フラワーガード', parameter: 'def', num: 1}, 
        {name: 'こころのめ', parameter: 'sp_atk', num: 1}, 
        {name: 'シンプルビーム', parameter: 'sp_atk', num: 1}, 
        {name: 'せいちょう', parameter: 'sp_atk', num: 1}, 
        {name: 'フラフラダンス', parameter: 'sp_atk', num: 1}, 
        {name: 'ミラータイプ', parameter: 'sp_atk', num: 1}, 
        {name: 'みずびたし', parameter: 'sp_atk', num: 1}, 
        {name: 'そうでん', parameter: 'sp_atk', num: 1}, 
        {name: 'プラズマシャワー', parameter: 'sp_atk', num: 1}, 
        {name: 'サイコフィールド', parameter: 'sp_atk', num: 1}, 
        {name: 'さいはい', parameter: 'sp_atk', num: 1}, 
        {name: 'じゅうりょく', parameter: 'sp_atk', num: 1}, 
        {name: 'テレキネシス', parameter: 'sp_atk', num: 1}, 
        {name: 'ミラクルアイ', parameter: 'sp_atk', num: 1}, 
        {name: 'あくむ', parameter: 'sp_atk', num: 1}, 
        {name: 'あやしいひかり', parameter: 'sp_atk', num: 1}, 
        {name: 'うそなき', parameter: 'sp_atk', num: 1}, 
        {name: 'さしおさえ', parameter: 'sp_atk', num: 1}, 
        {name: 'アシストギア', parameter: 'sp_atk', num: 1}, 
        {name: 'きんぞくおん', parameter: 'sp_atk', num: 1}, 
        {name: 'てんしのキッス', parameter: 'sp_atk', num: 1}, 
        {name: 'かいふくふうじ', parameter: 'sp_atk', num: 2}, 
        {name: 'サイコシフト', parameter: 'sp_atk', num: 2}, 
        {name: 'くろいまなざし', parameter: 'sp_def', num: 1}, 
        {name: 'スポットライト', parameter: 'sp_def', num: 1}, 
        {name: 'ないしょばなし', parameter: 'sp_def', num: 1}, 
        {name: 'なかまづくり', parameter: 'sp_def', num: 1}, 
        {name: 'ねがいごと', parameter: 'sp_def', num: 1}, 
        {name: 'ふきとばし', parameter: 'sp_def', num: 1}, 
        {name: 'へびにらみ', parameter: 'sp_def', num: 1}, 
        {name: 'みずあそび', parameter: 'sp_def', num: 1}, 
        {name: 'じゅうでん', parameter: 'sp_def', num: 1}, 
        {name: 'かいでんぱ', parameter: 'sp_def', num: 1}, 
        {name: 'じばそうさ', parameter: 'sp_def', num: 1}, 
        {name: 'でんじは', parameter: 'sp_def', num: 1}, 
        {name: 'ねをはる', parameter: 'sp_def', num: 1}, 
        {name: 'しびれごな', parameter: 'sp_def', num: 1}, 
        {name: 'どろあそび', parameter: 'sp_def', num: 1}, 
        {name: 'コスモパワー', parameter: 'sp_def', num: 1}, 
        {name: 'ひかりのかべ', parameter: 'sp_def', num: 1}, 
        {name: 'マジックルーム', parameter: 'sp_def', num: 1}, 
        {name: 'ワンダールーム', parameter: 'sp_def', num: 1}, 
        {name: 'おだてる', parameter: 'sp_def', num: 1}, 
        {name: 'トリックガード', parameter: 'sp_def', num: 1}, 
        {name: 'ミストフィールド', parameter: 'sp_def', num: 1}, 
        {name: 'ゆうわく', parameter: 'sp_def', num: 2}, 
        {name: 'ふういん', parameter: 'sp_def', num: 2}, 
        {name: 'マジックコート', parameter: 'sp_def', num: 2}, 
        {name: 'ふんじん', parameter: 'sp_def', num: 2}, 
        {name: 'アロマミスト', parameter: 'sp_def', num: 2}, 
        {name: 'あくび', parameter: 'speed', num: 1}, 
        {name: 'あくまのキッス', parameter: 'speed', num: 1}, 
        {name: 'アンコール', parameter: 'speed', num: 1}, 
        {name: 'うたう', parameter: 'speed', num: 1}, 
        {name: 'おさきにどうぞ', parameter: 'speed', num: 1}, 
        {name: 'こわいかお', parameter: 'speed', num: 1}, 
        {name: 'しんぴのまもり', parameter: 'speed', num: 1}, 
        {name: 'ちょうおんぱ', parameter: 'speed', num: 1}, 
        {name: 'ロックオン', parameter: 'speed', num: 1}, 
        {name: 'にほんばれ', parameter: 'speed', num: 1}, 
        {name: 'あまごい', parameter: 'speed', num: 1}, 
        {name: 'エレキフィールド', parameter: 'speed', num: 1}, 
        {name: 'くさぶえ', parameter: 'speed', num: 1}, 
        {name: 'なやみのタネ', parameter: 'speed', num: 1}, 
        {name: 'ねむりごな', parameter: 'speed', num: 1}, 
        {name: 'あられ', parameter: 'speed', num: 1}, 
        {name: 'オーロラベール', parameter: 'speed', num: 1}, 
        {name: 'いえき', parameter: 'speed', num: 1}, 
        {name: 'どくのいと', parameter: 'speed', num: 1}, 
        {name: 'ガードシェア', parameter: 'speed', num: 1}, 
        {name: 'ガードスワップ', parameter: 'speed', num: 1}, 
        {name: 'さいみんじゅつ', parameter: 'speed', num: 1}, 
        {name: 'スキルスワップ', parameter: 'speed', num: 1}, 
        {name: 'スピードスワップ', parameter: 'speed', num: 1}, 
        {name: 'なりきり', parameter: 'speed', num: 1}, 
        {name: 'パワーシェア', parameter: 'speed', num: 1}, 
        {name: 'パワースワップ', parameter: 'speed', num: 1}, 
        {name: 'いとをはく', parameter: 'speed', num: 1}, 
        {name: 'ねばねばネット', parameter: 'speed', num: 1}, 
        {name: 'すなあらし', parameter: 'speed', num: 1}, 
        {name: 'さきおくり', parameter: 'speed', num: 1}, 
        {name: 'ギフトパス', parameter: 'speed', num: 2}, 
        {name: 'さきどり', parameter: 'speed', num: 2}, 
        {name: 'リサイクル', parameter: 'speed', num: 2}, 
        {name: 'サイドチェンジ', parameter: 'speed', num: 2}, 
        {name: 'トリック', parameter: 'speed', num: 2}, 
        {name: 'すりかえ', parameter: 'speed', num: 2}, 
        {name: 'よこどり', parameter: 'speed', num: 2}, 
        {name: 'あまいかおり', parameter: 'accuracy', num: 1}, 
        {name: 'きあいだめ', parameter: 'accuracy', num: 1}, 
        {name: 'まねっこ', parameter: 'accuracy', num: 1}, 
        {name: 'まるくなる', parameter: 'accuracy', num: 1}, 
        {name: 'ものまね', parameter: 'accuracy', num: 1}, 
        {name: 'きりばらい', parameter: 'accuracy', num: 1}, 
        {name: 'トリックルーム', parameter: 'accuracy', num: 1}, 
        {name: 'えんまく', parameter: 'evasion', num: 1}, 
        {name: 'おまじない', parameter: 'evasion', num: 1}, 
        {name: 'フラッシュ', parameter: 'evasion', num: 1}, 
        {name: 'ほごしょく', parameter: 'evasion', num: 1}, 
        {name: 'でんじふゆう', parameter: 'evasion', num: 1}, 
        {name: 'みきり', parameter: 'evasion', num: 1}, 
        {name: 'すなかけ', parameter: 'evasion', num: 1}, 
        {name: 'スプーンまげ', parameter: 'evasion', num: 1}, 
    ], 
    all: [
        'おいわい', 
        'テクスチャー', 
        'てをつなぐ', 
        'ハッピータイム', 
        'スケッチ', 
        'もりののろい', 
        'じょうか', 
        'ハロウィン', 
        'ジオコントロール'
    ], 
    critical: [
        'つぼをつく', 
        'ねごと', 
        'みやぶる', 
        'おいかぜ', 
        'ハートスワップ'
    ], 
    clear: [
        'あさのひざし', 
        'いばる', 
        'かげぶんしん', 
        'かなしばり', 
        'からをやぶる', 
        'このゆびとまれ', 
        'こらえる', 
        'じこさいせい', 
        'タマゴうみ', 
        'ちいさくなる', 
        'つるぎのまい', 
        'てだすけ', 
        'なまける', 
        'のみこむ', 
        'バトンタッチ', 
        'ほろびのうた', 
        'まもる', 
        'みがわり', 
        'ミルクのみ', 
        'メロメロ', 
        'キノコのほうし', 
        'こうごうせい', 
        'コットンガード', 
        'やどりぎのタネ', 
        'わたほうし', 
        'とぐろをまく', 
        'とける', 
        'すなあつめ', 
        'はねやすめ', 
        'いやしのはどう', 
        'こうそくいどう', 
        'ドわすれ', 
        'ねむる', 
        'バリアー', 
        'めいそう', 
        'いかりのこな', 
        'かいふくしれい', 
        'ちょうのまい', 
        'ほたるび', 
        'ロックカット', 
        'りゅうのまい', 
        'ダークホール', 
        'わるだくみ', 
        'ギアチェンジ', 
        'キングシールド', 
        'てっぺき', 
        'ボディパージ', 
        'つきのひかり', 
        'フラワーヒール', 
    ], 
    cure: [
        'いやしのすず', 
        'じこあんじ', 
        'たくわえる', 
        'テクスチャー2', 
        'はらだいこ', 
        'へんしん', 
        'リフレッシュ', 
        'アロマセラピー', 
        'くろいきり', 
        'しろいきり', 
        'テレポート', 
        'うらみ', 
    ], 
    spotlight: [
        'おんねん', 
        'みちづれ'
    ]
}

/*
{name: 'しぜんのちから', '', '', '繰り出す技をZワザにする'}, 
{name: 'ねこのて', '', '', '繰り出す技をZワザにする'}, 
{name: 'ゆびをふる', '', '', '繰り出す技をZワザにする'}, 
{name: 'オウムがえし', '', '', '繰り出す技をZワザにする'}, 
{name: 'さきどり', '', '', '繰り出す技をZワザにする'}, 
{name: 'まねっこ', '', '', '繰り出す技をZワザにする'}, 
{name: 'ねごと', '', '', '繰り出す技をZワザにする'}, 
{name: 'いやしのねがい', ''}, 
{name: 'みかづきのまい', ''}, 
{name: 'おきみやげ', 'next_cure'}, 
{name: 'すてゼリフ', 'next_cure'}, 
{name: 'のろい', ''}
*/

// ダイマックス技
const moveList_dynamax = [
    {name: 'ダイアーク', type: 'あく'}, 
    {name: 'ダイアース', type: 'じめん'}, 
    {name: 'ダイアイス', type: 'こおり'}, 
    {name: 'ダイアシッド', type: 'どく'}, 
    {name: 'ダイアタック', type: 'ノーマル'}, 
    {name: 'ダイウォール', type: 'ノーマル'}, 
    {name: 'ダイサイコ', type: 'エスパー'}, 
    {name: 'ダイサンダー', type: 'でんき'}, 
    {name: 'ダイジェット', type: 'ひこう'}, 
    {name: 'ダイスチル', type: 'はがね'}, 
    {name: 'ダイストリーム', type: 'みず'}, 
    {name: 'ダイソウゲン', type: 'くさ'}, 
    {name: 'ダイドラグーン', type: 'ドラゴン'}, 
    {name: 'ダイナックル', type: 'かくとう'}, 
    {name: 'ダイバーン', type: 'ほのお'}, 
    {name: 'ダイフェアリー', type: 'フェアリー'}, 
    {name: 'ダイホロウ', type: 'ゴースト'}, 
    {name: 'ダイロック', type: 'いわ'}, 
    {name: 'ダイワーム', type: 'むし'}
]

// キョダイダイマックス技
const moveList_gigantamax = [
    {name: 'キョダイイチゲキ', poke: 'ウーラオス(いちげきのかた)', type: 'あく'}, 
    {name: 'キョダイカキュウ', poke: 'エースバーン', type: 'ほのお'}, 
    {name: 'キョダイカンデン', poke: 'ストリンダー', type: 'でんき'}, 
    {name: 'キョダイカンロ', poke: 'タルップル', type: 'くさ'}, 
    {name: 'キョダイガンジン', poke: 'カジリガメ', type: 'みず'}, 
    {name: 'キョダイゲンエイ', poke: 'ゲンガー', type: 'ゴースト'}, 
    {name: 'キョダイゲンスイ', poke: 'ジュラルドン', type: 'ドラゴン'}, 
    {name: 'キョダイコウジン', poke: 'ダイオウドウ', type: 'はがね'}, 
    {name: 'キョダイコバン', poke: 'ニャース', type: 'ノーマル'}, 
    {name: 'キョダイコランダ', poke: 'ゴリランダー', type: 'くさ'}, 
    {name: 'キョダイコワク', poke: 'バタフリー', type: 'むし'}, 
    {name: 'キョダイゴクエン', poke: 'リザードン', type: 'ほのお'}, 
    {name: 'キョダイサイセイ', poke: 'カビゴン', type: 'ノーマル'}, 
    {name: 'キョダイサジン', poke: 'サダイジャ', type: 'じめん'}, 
    {name: 'キョダイサンゲキ', poke: 'アップリュー', type: 'くさ'}, 
    {name: 'キョダイシュウキ', poke: 'ダストダス', type: 'どく'}, 
    {name: 'キョダイシンゲキ', poke: 'カイリキー', type: 'かくとう'}, 
    {name: 'キョダイスイマ', poke: 'オーロンゲ', type: 'あく'}, 
    {name: 'キョダイセンリツ', poke: 'ラプラス', type: 'こおり'}, 
    {name: 'キョダイソゲキ', poke: 'インテレオン', type: 'みず'}, 
    {name: 'キョダイダンエン', poke: 'マホイップ', type: 'フェアリー'}, 
    {name: 'キョダイテンドウ', poke: 'イオルブ', type: 'エスパー'}, 
    {name: 'キョダイテンバツ', poke: 'ブリムオン', type: 'フェアリー'}, 
    {name: 'キョダイバンライ', poke: 'ピカチュウ', type: 'でんき'}, 
    {name: 'キョダイヒャッカ', poke: 'マルヤクデ', type: 'ほのお'}, 
    {name: 'キョダイフウゲキ', poke: 'アーマーガア', type: 'ひこう'}, 
    {name: 'キョダイフンセキ', poke: 'セキタンザン', type: 'いわ'}, 
    {name: 'キョダイベンタツ', poke: 'フシギバナ', type: 'くさ'}, 
    {name: 'キョダイホーヨー', poke: 'イーブイ', type: 'ノーマル'}, 
    {name: 'キョダイホウゲキ', poke: 'カメックス', type: 'みず'}, 
    {name: 'キョダイホウマツ', poke: 'キングラー', type: 'みず'}, 
    {name: 'キョダイレンゲキ', poke: 'ウーラオス(れんげきのかた)', type: 'みず'}
]

// タイプが変わる技
const moveList_changeType = [
    'ウェザーボール', 
    'オーラぐるま', 
    'さばきのつぶて', 
    'しぜんのめぐみ', 
    'だいちのはどう', 
    'テクノバスター', 
    'マルチアタック', 
    'めざめるダンス', 
    'めざめるパワー'
]

