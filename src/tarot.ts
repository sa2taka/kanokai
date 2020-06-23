import { client } from './line';
import { masterUserId } from './secrets/line';
import { sleep } from './sleep';
import { storageUrl } from './secrets/storage';

export function callToPlayTarot() {
  const deck = shuffle();
  return client
    .pushMessage(masterUserId, {
      type: 'text',
      text: '今週のマスターの運勢をタロットを使って占って差し上げます。',
    })
    .then(() => {
      return sleep(2);
    })
    .then(() => {
      const card = deck[0];
      const image = `${storageUrl}${card.reverse ? 'r' : ''}${
        card.arcana.number
      }.jpg`;
      return client.pushMessage(masterUserId, {
        type: 'image',
        originalContentUrl: image,
        previewImageUrl: image,
      });
    })
    .then(() => {
      const card = deck[0];
      return client.pushMessage(masterUserId, {
        type: 'text',
        text: `まず一枚目。これは過去を表すカード。\nマスターの過去は${
          card.reverse ? '逆位置' : '正位置'
        }の${card.arcana.japaneseName}ね。\nこれは${(card.reverse
          ? keywords[card.arcana.number].reversed
          : keywords[card.arcana.number].normal
        ).keywords.join('、')}を表すわ。`,
      });
    })
    .then(() => {
      return sleep(2);
    })
    .then(() => {
      const card = deck[1];
      const image = `${storageUrl}${card.reverse ? 'r' : ''}${
        card.arcana.number
      }.jpg`;
      return client.pushMessage(masterUserId, {
        type: 'image',
        originalContentUrl: image,
        previewImageUrl: image,
      });
    })
    .then(() => {
      const card = deck[1];
      return client.pushMessage(masterUserId, {
        type: 'text',
        text: `次にニ枚目。これは現在を表すカード。\nマスターの現在は${
          card.reverse ? '逆位置' : '正位置'
        }の${card.arcana.japaneseName}よ。\nこれは${(card.reverse
          ? keywords[card.arcana.number].reversed
          : keywords[card.arcana.number].normal
        ).keywords.join('、')}を表すわ。`,
      });
    })
    .then(() => {
      return sleep(2);
    })
    .then(() => {
      const card = deck[2];
      const image = `${storageUrl}${card.reverse ? 'r' : ''}${
        card.arcana.number
      }.jpg`;
      return client.pushMessage(masterUserId, {
        type: 'image',
        originalContentUrl: image,
        previewImageUrl: image,
      });
    })
    .then(() => {
      const card = deck[2];
      return client.pushMessage(masterUserId, {
        type: 'text',
        text: `三枚目は未来を表すカード。\nマスターの未来は${
          card.reverse ? '逆位置' : '正位置'
        }の${card.arcana.japaneseName}だわね。\nこれは${(card.reverse
          ? keywords[card.arcana.number].reversed
          : keywords[card.arcana.number].normal
        ).keywords.join('、')}を表すわ。`,
      });
    })
    .then(() => {
      return sleep(4);
    })
    .then(() => {
      const card = deck[3];
      const image = `${storageUrl}${card.reverse ? 'r' : ''}${
        card.arcana.number
      }.jpg`;
      return client.pushMessage(masterUserId, {
        type: 'image',
        originalContentUrl: image,
        previewImageUrl: image,
      });
    })
    .then(() => {
      const card = deck[3];
      return client.pushMessage(masterUserId, {
        type: 'text',
        text: `最後はキーカード。\nよりより未来を作るために必要なキーカードは${
          card.reverse ? '逆位置' : '正位置'
        }の${card.arcana.japaneseName}。\nこれは${(card.reverse
          ? keywords[card.arcana.number].reversed
          : keywords[card.arcana.number].normal
        ).keywords.join('、')}を表すの`,
      });
    })
    .then(() => {
      return sleep(4);
    })
    .then(() => {
      return client.pushMessage(masterUserId, {
        type: 'text',
        text: 'どう? 参考になりそう?',
      });
    });
}

function shuffle() {
  const deck = majorArcana.map((arcana) => {
    return {
      reverse: Math.random() > 0.5,
      arcana: arcana,
    };
  });

  for (let i = deck.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = deck[i];
    deck[i] = deck[r];
    deck[r] = tmp;
  }

  return deck;
}

const majorArcana = [
  { number: 0, englishName: 'The Fool', japaneseName: '愚者' },
  { number: 1, englishName: 'The Magician', japaneseName: '魔術師' },
  { number: 2, englishName: 'The High Priestess', japaneseName: '女教皇' },
  { number: 3, englishName: 'The Empress', japaneseName: '女帝' },
  { number: 4, englishName: 'The Emperor', japaneseName: '皇帝' },
  { number: 5, englishName: 'The Hierophant', japaneseName: '教皇' },
  { number: 6, englishName: 'The Lovers', japaneseName: '恋人' },
  { number: 7, englishName: 'The Chariot', japaneseName: '戦車' },
  { number: 8, englishName: 'Strength', japaneseName: '力' },
  { number: 9, englishName: 'The Hermit', japaneseName: '隠者' },
  { number: 10, englishName: 'Wheel of Fortune', japaneseName: '運命の輪' },
  { number: 11, englishName: 'Justice', japaneseName: '正義' },
  { number: 12, englishName: 'The Hanged Man', japaneseName: '吊された男' },
  { number: 13, englishName: 'Death', japaneseName: '死神' },
  { number: 14, englishName: 'Temperance', japaneseName: '節制' },
  { number: 15, englishName: 'The Devil', japaneseName: '悪魔' },
  { number: 16, englishName: 'The Tower', japaneseName: '塔' },
  { number: 17, englishName: 'The Star', japaneseName: '星' },
  { number: 18, englishName: 'The Moon', japaneseName: '月' },
  { number: 19, englishName: 'The Sun', japaneseName: '太陽' },
  { number: 20, englishName: 'Judgement', japaneseName: '審判' },
  { number: 21, englishName: 'The World', japaneseName: '世界' },
];
const keywords = [
  {
    normal: {
      keywords: [
        '自由',
        '未確定',
        '純粋無垢',
        '新たなスタート時期',
        '先入観を捨てる',
        '自分を信じる',
        '独創的アイデアを持って専念',
      ],
    },
    reversed: {
      keywords: [
        '愚か',
        '無計画',
        '無鉄砲',
        '不安定',
        '新たなスタートが切れない',
        '先入観を捨て切れない',
        '中途半端な行動',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '創造',
        'スタート',
        '自信',
        '頭脳明晰',
        '創造力',
        'コミュニケーション力',
        '人を惹き付ける魅力',
        '物事の始まり',
        '成功',
      ],
    },
    reversed: {
      keywords: [
        '自信がない',
        '中途半端',
        '消極的',
        '虚栄',
        'まやかし',
        '無気力',
        'スランプ',
        '空回り',
        '裏切り',
        '失敗',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '知力',
        '学識',
        '冷静',
        '客観的',
        '並外れた知性',
        '賢明さ',
        '洞察力',
        'バランス感覚',
        '幸運',
      ],
    },
    reversed: {
      keywords: [
        '無慈悲',
        'イライラ',
        '批判精神',
        'うぬぼれ',
        '思い込み',
        '神経質',
        'バランス感覚の欠如',
        '不運',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '家族愛',
        '真実',
        '豊か',
        '結実',
        '繁栄',
        '生命力',
        '子孫繁栄',
        '結婚',
        '母性',
        '包み込む愛情',
      ],
    },
    reversed: {
      keywords: [
        '不満',
        'わがまま',
        '嫉妬心',
        '愛情不足',
        '独断',
        '強引',
        '浪費',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '指導的立場',
        '安定',
        '責任感',
        '威厳',
        'リーダー',
        '統率力',
        '決断力',
        '男性',
        '父性',
        '積極性',
        '成功',
        '目的達成',
      ],
    },
    reversed: {
      keywords: [
        '威圧的',
        '過信',
        '無責任',
        '自分勝手',
        '頑固',
        '過労',
        '無謀',
        '消極的',
        '計画倒れ',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '慈愛心',
        '寛大な精神',
        '援助を得る',
        '慈悲',
        '包容力',
        '広い視野',
        '信頼',
        '尊敬',
        '秩序',
        '規律の遵守',
      ],
    },
    reversed: {
      keywords: [
        '自分のことだけ',
        '出し惜しみ',
        '孤立無援',
        '独りよがり',
        '虚栄',
        '狭い心',
        '狭い視野',
        '不信感',
        '反感',
        '怠惰',
        '束縛',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '楽しい',
        '無邪気',
        '甘いムード',
        '恋愛',
        '性的魅力',
        '相思相愛',
        '選択',
        '決断',
        '誘惑',
        '試練の克服',
        '趣味への没頭',
      ],
    },
    reversed: {
      keywords: [
        '遊び半分',
        'その場限り',
        '別れ',
        '失恋',
        '結婚生活の破綻',
        '優柔不断',
        '気まぐれ',
        '誤った選択',
        '誘惑',
        '不道徳',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '情熱',
        '前進',
        '開拓',
        '成功',
        '大志の達成',
        '積極的な行動力',
        '困難の打破',
        '問題解決',
      ],
    },
    reversed: {
      keywords: [
        '暴走',
        '停止',
        '混乱',
        '失敗',
        '障害',
        '自分勝手',
        '挫折',
        '悲観的',
        '感情的',
        '攻撃的',
        '軽率',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '強固',
        '達成',
        'エネルギッシュ',
        '力量',
        '気力',
        '信念',
        '勇気',
        '根気',
        '努力',
        '理性',
        '知恵',
      ],
    },
    reversed: {
      keywords: [
        '気の弱さ',
        '落胆',
        '困難',
        '失敗',
        'おごった心',
        '過信',
        '自信喪失',
        '消極的',
        '無気力',
        '優柔不断',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '模索',
        '熟虜',
        'ひとりで過ごす',
        '絶対的な知識',
        '洞察力',
        '思慮深さ',
        '真理の探求',
        '孤独',
        '隠遁生活',
        '哲学',
      ],
    },
    reversed: {
      keywords: [
        '閉鎖的',
        '孤立',
        '卑屈',
        '未熟',
        '思慮のなさ',
        '虚実',
        '混沌',
        '現実逃避',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '幸運',
        '偶然',
        '運命的',
        '転換点',
        '大きなチャンスの到来',
        '変化の時',
        '事態の進展',
        '幸運な出来事',
        '人生の出会い',
      ],
    },
    reversed: {
      keywords: [
        'チャンスを逃す',
        '悪化',
        '落ち込み',
        '不運',
        '後退',
        '失敗',
        '降格',
        '事態の悪化',
        'トラブル',
        'アクシデント',
        'すれ違い',
        '決別',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '平等',
        '正義',
        '公正',
        '公平',
        '冷静な判断力',
        '義務感',
        'バランスが取れた',
        '安定',
        '裁判',
        '正しい判断',
        '道徳',
        '合理性',
      ],
    },
    reversed: {
      keywords: [
        '変わりやすい',
        '中途半端',
        '迷い',
        '不正',
        '不公平',
        '偏見',
        'アンバランス',
        '不安定',
        '誤った判断',
        '不道徳',
        '不合理',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '試練',
        '報われる',
        '忍耐',
        '妨害',
        '修行',
        '努力',
        '奉仕',
        '自己犠牲',
      ],
    },
    reversed: {
      keywords: [
        '報われない',
        '終わりが見えない',
        '自己犠牲',
        '徒労',
        '無駄',
        '骨折り損',
        '失敗',
        '後退',
        '屈服',
        '自暴自棄',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '完全な終わり',
        '終わりと始まり',
        '破壊と創造',
        '死と再生',
        '別れ',
        '終末',
        '破滅',
        '離散',
        '終局',
        '清算',
        '決着',
        '死の予兆',
      ],
    },
    reversed: {
      keywords: [
        '転換期',
        '終わり',
        'スタート',
        '回復',
        '復活',
        '再出発',
        '新展開',
        '移転',
        '転換',
      ],
    },
  },
  {
    normal: {
      keywords: [
        'バランス',
        '穏やか',
        '自然体',
        '節制',
        '調整',
        '節約',
        '堅実',
        '自制',
        '献身',
        '穏健',
        '中庸',
        '緩やかさ',
        '安定',
      ],
    },
    reversed: {
      keywords: [
        '惰性',
        'マンネリ',
        '不摂生',
        '浪費',
        '消耗',
        '生活の乱れ',
        '自己中心',
        '自己主張',
        '不安定',
        '混乱',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '欲望',
        '依存状態',
        '恐怖',
        '誘惑',
        '裏切り',
        '悪意',
        '暗転',
        '拘束',
        '堕落',
      ],
    },
    reversed: {
      keywords: [
        '解放',
        '断ち切る',
        '楽になる',
        '好転',
        '回復',
        '覚醒',
        '強い意志',
        '新たな出会い',
      ],
    },
  },
  {
    normal: {
      keywords: [
        'ダメージ',
        '災難',
        '崩壊',
        '破滅',
        '破産',
        '苦境',
        '事故',
        '災害',
        '障害',
        '離婚',
        '争い',
        '思い上がり',
        '堕落',
        '損失',
      ],
    },
    reversed: {
      keywords: [
        '崩壊目前',
        'トラブル',
        '不安',
        '問題',
        '困難',
        '落ち着かない',
        '不安定',
        '解決のチャンス',
        '再生',
        '再出発',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '高揚',
        '憧れ',
        '感動',
        '希望',
        '期待',
        '直感',
        'ひらめき',
        '成功',
        '満足',
      ],
    },
    reversed: {
      keywords: [
        '幻滅',
        'ギャップ',
        '自己主張',
        '高望み',
        '失望',
        '過信',
        '才能',
        '謙虚',
        '水',
        '雨',
        '涙',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '疑心暗鬼',
        '先が見えない',
        '誤解',
        '神秘的世界',
        '不安定',
        '未知',
        '危険',
        '不安',
        '恐怖',
        '迷い',
        '潜在する危険',
        '隠れた敵',
      ],
    },
    reversed: {
      keywords: [
        '順調',
        'クリア',
        '解消',
        '敵の正体',
        '不安や恐怖を克服',
        '過去からの脱却',
        '将来の可能性',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '純粋',
        '笑い声',
        '理想通り',
        'エネルギー',
        'バイタリティ',
        '若さ',
        '達成',
        '成功',
        '結婚',
        '祝福',
        '誕生',
        '名誉',
        '信頼',
      ],
    },
    reversed: {
      keywords: [
        '暗黒',
        '不健康',
        'ネガティブ',
        '無計画',
        '依存心',
        '不調',
        '中止',
        '挫折',
        '失恋',
        '中途半端',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '復活',
        'よい知らせ',
        '許し',
        '勝利',
        '発展',
        '再開',
        '再婚',
        '復縁',
        '覚醒',
        '秘めた才能',
      ],
    },
    reversed: {
      keywords: [
        '自然消滅',
        '刑罰',
        '不幸',
        '挫折',
        '悲観的',
        '後退',
        '執着',
        '離別',
        '離婚',
        '後悔',
        '行き詰まり',
      ],
    },
  },
  {
    normal: {
      keywords: [
        '幸福感',
        '成長',
        '成功',
        '完成',
        '完遂',
        '願望成就',
        '目的達成',
        '婚約',
        '結婚',
        '運命の出会い',
        '新たな出発',
        '最高の幸運度',
      ],
    },
    reversed: {
      keywords: [
        '中途半端',
        'マンネリ感',
        '物足りない',
        '失敗',
        '未完成',
        '延期',
        '中止',
        '挫折',
        '悲観的',
        '破産',
        '婚約破棄',
        '離婚',
        '調和の崩壊',
      ],
    },
  },
];
