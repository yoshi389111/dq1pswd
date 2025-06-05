/** DQ1用復活の呪文の解析/捏造 */

/** 名前の長さ */
const NAME_LENGTH = 4;
/** 復活の呪文の長さ[文字数](1文字=6bit, 20文字=120bit) */
export const JUMON_LENGTH = 20;
/** 復活の呪文のコードの長さ[バイト](15byte = 120bit) */
const CODE_LENGTH = 15; // JUMON_LENGTH * 3 / 4
/** 名前用五十音 */
const NAME_ALPHABET: ReadonlyArray<string> = Array.from(
  '０１２３４５６７８９' +
    'あいうえお' +
    'かきくけこ' +
    'さしすせそ' +
    'たちつてと' +
    'なにぬねの' +
    'はひふへほ' +
    'まみむめも' +
    'やゆよ' +
    'らりるれろ' +
    'わをん' +
    'っゃゅょ' +
    '゛゜－　' // 全角スペース
);

/** 半角カナを全角かなに変換する読み替えデータ */
const HANKAKU_TO_ZENKAKU: Readonly<{ [key: string]: string }> = {
  '0': '０',
  '1': '１',
  '2': '２',
  '3': '３',
  '4': '４',
  '5': '５',
  '6': '６',
  '7': '７',
  '8': '８',
  '9': '９',
  ｦ: 'を',
  ｧ: 'ぁ',
  ｨ: 'ぃ',
  ｩ: 'ぅ',
  ｪ: 'ぇ',
  ｫ: 'ぉ',
  ｬ: 'ゃ',
  ｭ: 'ゅ',
  ｮ: 'ょ',
  ｯ: 'っ',
  ｰ: 'ー',
  ｱ: 'あ',
  ｲ: 'い',
  ｳ: 'う',
  ｴ: 'え',
  ｵ: 'お',
  ｶ: 'か',
  ｷ: 'き',
  ｸ: 'く',
  ｹ: 'け',
  ｺ: 'こ',
  ｻ: 'さ',
  ｼ: 'し',
  ｽ: 'す',
  ｾ: 'せ',
  ｿ: 'そ',
  ﾀ: 'た',
  ﾁ: 'ち',
  ﾂ: 'つ',
  ﾃ: 'て',
  ﾄ: 'と',
  ﾅ: 'な',
  ﾆ: 'に',
  ﾇ: 'ぬ',
  ﾈ: 'ね',
  ﾉ: 'の',
  ﾊ: 'は',
  ﾋ: 'ひ',
  ﾌ: 'ふ',
  ﾍ: 'へ',
  ﾎ: 'ほ',
  ﾏ: 'ま',
  ﾐ: 'み',
  ﾑ: 'む',
  ﾒ: 'め',
  ﾓ: 'も',
  ﾔ: 'や',
  ﾕ: 'ゆ',
  ﾖ: 'よ',
  ﾗ: 'ら',
  ﾘ: 'り',
  ﾙ: 'る',
  ﾚ: 'れ',
  ﾛ: 'ろ',
  ﾜ: 'わ',
  ﾝ: 'ん',
  ﾞ: '゛',
  ﾟ: '゜',
  ' ': '　',
};

/** 名前読み換えデータ */
const NAME_ALIAS: Readonly<{ [key: string]: string }> = {
  ぁ: 'あ',
  ぃ: 'い',
  ぅ: 'う',
  ぇ: 'え',
  ぉ: 'お',
  が: 'か゛',
  ぎ: 'き゛',
  ぐ: 'く゛',
  げ: 'け゛',
  ご: 'こ゛',
  ざ: 'さ゛',
  じ: 'し゛',
  ず: 'す゛',
  ぜ: 'せ゛',
  ぞ: 'そ゛',
  だ: 'た゛',
  ぢ: 'ち゛',
  づ: 'つ゛',
  で: 'て゛',
  ど: 'と゛',
  ば: 'は゛',
  び: 'ひ゛',
  ぶ: 'ふ゛',
  べ: 'へ゛',
  ぼ: 'ほ゛',
  ぱ: 'は゜',
  ぴ: 'ひ゜',
  ぷ: 'ふ゜',
  ぺ: 'へ゜',
  ぽ: 'ほ゜',
  ゐ: 'い',
  ゑ: 'え',
  '\u3094': 'う゛', // 「う」＋濁点
  '\u308e': 'わ', // 小さい「わ」
  '\u3095': 'か', // 小さい「か」
  '\u3096': 'け', // 小さい「け」
  ァ: 'あ',
  ィ: 'い',
  ゥ: 'う',
  ェ: 'え',
  ォ: 'お',
  ア: 'あ',
  イ: 'い',
  ウ: 'う',
  エ: 'え',
  オ: 'お',
  カ: 'か',
  キ: 'き',
  ク: 'く',
  ケ: 'け',
  コ: 'こ',
  サ: 'さ',
  シ: 'し',
  ス: 'す',
  セ: 'せ',
  ソ: 'そ',
  タ: 'た',
  チ: 'ち',
  ツ: 'つ',
  テ: 'て',
  ト: 'と',
  ナ: 'な',
  ニ: 'に',
  ヌ: 'ぬ',
  ネ: 'ね',
  ノ: 'の',
  ハ: 'は',
  ヒ: 'ひ',
  フ: 'ふ',
  ヘ: 'へ',
  ホ: 'ほ',
  マ: 'ま',
  ミ: 'み',
  ム: 'む',
  メ: 'め',
  モ: 'も',
  ヤ: 'や',
  ユ: 'ゆ',
  ヨ: 'よ',
  ラ: 'ら',
  リ: 'り',
  ル: 'る',
  レ: 'れ',
  ロ: 'ろ',
  ワ: 'わ',
  ヲ: 'を',
  ン: 'ん',
  ガ: 'か゛',
  ギ: 'き゛',
  グ: 'く゛',
  ゲ: 'け゛',
  ゴ: 'こ゛',
  ザ: 'さ゛',
  ジ: 'し゛',
  ズ: 'す゛',
  ゼ: 'せ゛',
  ゾ: 'そ゛',
  ダ: 'た゛',
  ヂ: 'ち゛',
  ヅ: 'つ゛',
  デ: 'て゛',
  ド: 'と゛',
  バ: 'は゛',
  ビ: 'ひ゛',
  ブ: 'ふ゛',
  ベ: 'へ゛',
  ボ: 'ほ゛',
  パ: 'は゜',
  ピ: 'ひ゜',
  プ: 'ふ゜',
  ペ: 'へ゜',
  ポ: 'ほ゜',
  ャ: 'ゃ',
  ュ: 'ゅ',
  ョ: 'ょ',
  ッ: 'っ',
  ヰ: 'い',
  ヱ: 'え',
  ヴ: 'う゛',
  '\u30ee': 'わ', // 小さい「ワ」
  '\u30f5': 'か', // 小さい「カ」
  '\u30f6': 'け', // 小さい「ケ」
  '\u30f7': 'わ゛', // 「ワ」＋濁点
  '\u30f8': 'い゛', // 「ヰ」＋濁点
  '\u30f9': 'え゛', // 「ヱ」＋濁点
  '\u30fa': 'を゛', // 「ヲ」＋濁点
  '\u3099': '\u309b', // 結合文字用濁点
  '\u309a': '\u309c', // 結合文字用半濁点
  // アイヌ語表音拡張（小さいカタカナ）
  '\u31f0': 'く',
  '\u31f1': 'し',
  '\u31f2': 'す',
  '\u31f3': 'と',
  '\u31f4': 'ぬ',
  '\u31f5': 'は',
  '\u31f6': 'ひ',
  '\u31f7': 'ふ',
  '\u31f8': 'へ',
  '\u31f9': 'ほ',
  '\u31fa': 'む',
  '\u31fb': 'ら',
  '\u31fc': 'り',
  '\u31fd': 'る',
  '\u31fe': 'れ',
  '\u31ff': 'ろ',
};

/** 復活の呪文用五十音 */
const JUMON_ALPHABET: ReadonlyArray<string> = Array.from(
  'あいうえお' +
    'かきくけこ' +
    'さしすせそ' +
    'たちつてと' +
    'なにぬねの' +
    'はひふへほ' +
    'まみむめも' +
    'やゆよ' +
    'らりるれろ' +
    'わ' +
    'がぎぐげご' +
    'ざじずぜぞ' +
    'だぢづでど' +
    'ばびぶべぼ'
);

/** 復活の呪文読み換えデータ */
const JUMON_ALIAS: Readonly<{ [key: string]: string }> = {
  ぁ: 'あ',
  ぃ: 'い',
  ぅ: 'う',
  ぇ: 'え',
  ぉ: 'お',
  ゃ: 'や',
  ゅ: 'ゆ',
  ょ: 'よ',
  っ: 'つ',
  を: 'お',
  '＊': '？',
  '?': '？',
  '*': '？',
};

/**
 * レベル（経験値）一覧
 *
 * Level 1 の必要経験値 = LEVELS[0]
 * Level n の必要経験値 = LEVELS[n-1]
 */
const LEVELS: ReadonlyArray<number> = [
  0, 7, 23, 47, 110, 220, 450, 800, 1300, 2000, 2900, 4000, 5500, 7500, 10000, 13000, 17000, 21000, 25000, 29000, 33000,
  37000, 41000, 45000, 49000, 53000, 57000, 61000, 65000, 65535,
];

/** 選択肢 */
export interface LabelInfo {
  /** id */
  id: number;
  /** 名称 */
  name: string;
  /** 異例データ */
  illegal?: boolean;
}

/** 武器の一覧 */
export const weapons: ReadonlyArray<LabelInfo> = [
  { id: 0, name: 'なし' },
  { id: 1, name: 'たけざお' },
  { id: 2, name: 'こんぼう' },
  { id: 3, name: 'どうのつるぎ' },
  { id: 4, name: 'てつのおの' },
  { id: 5, name: 'はがねのつるぎ' },
  { id: 6, name: 'ほのおのつるぎ' },
  { id: 7, name: 'ロトのつるぎ' },
];

/** 鎧の一覧 */
export const armors: ReadonlyArray<LabelInfo> = [
  { id: 0, name: 'なし' },
  { id: 1, name: 'ぬののふく' },
  { id: 2, name: 'かわのふく' },
  { id: 3, name: 'くさりかたびら' },
  { id: 4, name: 'てつのよろい' },
  { id: 5, name: 'はがねのよろい' },
  { id: 6, name: 'まほうのよろい' },
  { id: 7, name: 'ロトのよろい' },
];

/** 盾の一覧 */
export const shields: ReadonlyArray<LabelInfo> = [
  { id: 0, name: 'なし' },
  { id: 1, name: 'かわのたて' },
  { id: 2, name: 'てつのたて' },
  { id: 3, name: 'みかがみのたて' },
];

/** アイテムの一覧 */
export const items: ReadonlyArray<LabelInfo> = [
  { id: 0, name: 'なし' },
  { id: 1, name: 'たいまつ' },
  { id: 2, name: 'せいすい' },
  { id: 3, name: 'キメラのつばさ' },
  { id: 4, name: 'りゅうのうろこ' },
  { id: 5, name: 'ようせいのふえ' },
  { id: 6, name: 'せんしのゆびわ' },
  { id: 7, name: 'ロトのしるし' },
  { id: 8, name: 'おうじょのあい' },
  { id: 9, name: 'のろいのベルト' },
  { id: 10, name: 'ぎんのたてごと' },
  { id: 11, name: 'しのくびかざり' },
  { id: 12, name: 'たいようのいし' },
  { id: 13, name: 'あまぐものつえ' },
  { id: 14, name: 'にじのしずく' },
  { id: 15, name: '（不明）', illegal: true },
];

/** 復活の呪文の素 */
export interface Dq1PasswordInfo {
  /** 名前(4文字) */
  name: string;
  /** 武器(0-7) */
  wapon: number;
  /** 鎧(0-7) */
  armor: number;
  /** 盾(0-3) */
  shild: number;
  /** アイテム[8](0-14) */
  items: number[];
  /** 魔法の鍵(0-6) */
  key: number;
  /** 薬草(0-6) */
  herb: number;
  /** 経験値(0-65535) */
  exp: number;
  /** 所持金(0-65535) */
  gold: number;
  /** 竜のウロコ装備済 */
  dragonScale: boolean;
  /** 戦士の指輪装備済 */
  fighterRing: boolean;
  /** ドラゴン討伐済 */
  dragonSlayered: boolean;
  /** ゴーレム討伐済 */
  golemSlayered: boolean;
  /** 死の首飾り入手済 */
  deadAmulet: boolean;
  /** 暗号化のキー(0-7) */
  cryptKey: number;
  /** チェックコード */
  checkCode: number;
  /** レベル */
  level: number;
  /** 解析成功の場合に真 */
  valid: boolean;
}

/** 復活の呪文 */
/**
 * レベルを求める.
 * @param exp 経験値
 * @returns レベル
 */
export const toLevel = (exp: number): number => {
  for (let i = LEVELS.length - 1; 0 <= i; i--) {
    if (LEVELS[i] <= exp) {
      return i + 1;
    }
  }
  return 0; // エラー
};

/**
 * 名前を文字列に変換.
 * @param nameNums 数字配列の名前
 * @returns 名前
 */
export const toStringName = (nameNums: number[]): string => {
  return nameNums
    .filter((num) => 0 <= num && num < NAME_ALPHABET.length)
    .map((num) => NAME_ALPHABET[num])
    .join('');
};

/**
 * 名前を数値配列に変換.
 * @param name 名前
 * @returns 数値配列
 */
export const toNumberName = (name: string): number[] => {
  const nameNums = name
    .split('')
    .map((ch) => HANKAKU_TO_ZENKAKU[ch] || ch)
    .map((ch) => NAME_ALIAS[ch] || ch)
    .flatMap((ch) => ch.split(''))
    .map((ch) => NAME_ALPHABET.indexOf(ch))
    .filter((num) => num !== -1);

  while (nameNums.length < NAME_LENGTH) {
    nameNums.push(63); // スペース
  }

  return nameNums.length === NAME_LENGTH ? nameNums : nameNums.slice(0, NAME_LENGTH);
};

/**
 * 数値配列を復活の呪文に変換.
 * @param passwordNums 復活の呪文(数値配列)
 * @returns 復活の呪文
 */
export const toStringPassword = (passwordNums: number[]): string => {
  return passwordNums
    .filter((num) => 0 <= num && num < JUMON_ALPHABET.length)
    .map((num) => JUMON_ALPHABET[num])
    .join('');
};

/**
 * 復活の呪文を数値配列に変換.
 * @param password 復活の呪文
 * @returns 数値配列
 */
export const toNumberPassword = (password: string): number[] => {
  return password
    .split('')
    .map((ch) => JUMON_ALPHABET.indexOf(ch))
    .filter((num) => num !== -1);
};

/**
 * 呪文を正規化する.
 * @param password 復活の呪文
 * @returns 正規化した復活の呪文
 */
export const toNormalizePassword = (password: string): string => {
  return password
    .split('')
    .map((ch) => HANKAKU_TO_ZENKAKU[ch] || ch)
    .map((ch) => JUMON_ALIAS[ch] || ch)
    .filter((ch) => ch === '？' || JUMON_ALPHABET.includes(ch))
    .join('');
};

/**
 * 呪文に使えない文字を返す
 * @param password 復活の呪文
 * @returns 呪文に使えない文字
 */
export const invalidCharsInPassword = (password: string): string => {
  const invalidChars = password
    .replaceAll(/\s/g, '')
    .split('')
    .map((ch) => HANKAKU_TO_ZENKAKU[ch] || ch)
    .map((ch) => JUMON_ALIAS[ch] || ch)
    .filter((ch) => ch !== '？' && !JUMON_ALPHABET.includes(ch));
  return Array.from(new Set(invalidChars)).join('');
};

/** CRC を計算する */
const calculateCrc = (bytes: number[]): number => {
  // 最初の１バイトを除いた分の CRC を計算する
  let crc = 0;
  for (let i = 1; i < CODE_LENGTH; i++) {
    let octed = bytes[i];
    for (let j = 0; j < 8; j++) {
      const carryBit = (((crc >> 8) ^ octed) & 0x80) !== 0;
      crc = (crc << 1) & 0xffff;
      octed = (octed << 1) & 0xff;
      if (carryBit) {
        crc ^= 0x1021;
      }
    }
  }
  return crc & 0xff;
};

/**
 * 復活の呪文作成.
 * @param info 復活の呪文の素
 * @returns 復活の呪文
 */
export const createPassword = (info: Dq1PasswordInfo): string => {
  const nameNums = toNumberName(info.name);

  // バイト単位に詰める
  const bytes = [
    0,
    info.exp & 0xff,
    ((info.cryptKey << 7) & 0x80) | (info.deadAmulet ? 0x40 : 0) | nameNums[2],
    (info.items[3] << 4) | info.items[2],
    info.gold & 0xff,
    (nameNums[0] << 2) | (info.golemSlayered ? 0x02 : 0) | ((info.cryptKey >> 1) & 0x01),
    (info.items[7] << 4) | info.items[6],
    ((info.cryptKey << 5) & 0x80) | (info.dragonSlayered ? 0x40 : 0) | nameNums[3],
    (info.wapon << 5) | (info.armor << 2) | info.shild,
    (info.gold >> 8) & 0xff,
    (info.key << 4) | info.herb,
    (info.items[5] << 4) | info.items[4],
    (info.exp >> 8) & 0xff,
    (info.dragonScale ? 0x80 : 0) | (nameNums[1] << 1) | (info.fighterRing ? 1 : 0),
    (info.items[1] << 4) | info.items[0],
  ];

  // チェックコード(CRC)を計算する
  const crc = calculateCrc(bytes);
  bytes[0] = crc;

  // バイト単位データを、文字(6bit)単位に変換
  const codes = [];
  for (let i = 0; i < CODE_LENGTH; i += 3) {
    const bit24 = (bytes[i + 2] << 16) | (bytes[i + 1] << 8) | bytes[i];
    codes.push(bit24 & 0x3f);
    codes.push((bit24 >> 6) & 0x3f);
    codes.push((bit24 >> 12) & 0x3f);
    codes.push((bit24 >> 18) & 0x3f);
  }

  // 4 とひとつ前のコードを足していく
  let prevCode = 0;
  const passwordNums = [];
  for (const code of codes) {
    prevCode = (code + prevCode + 4) & 0x3f;
    passwordNums.push(prevCode);
  }

  return toStringPassword(passwordNums);
};

/**
 * DQ1 用復活の呪文を解析する
 *
 * @param password 復活の呪文
 * @returns 解析結果
 */
export const analyzePassword = (password: string): Dq1PasswordInfo | undefined => {
  const normalized = toNormalizePassword(password);
  const passwordNums = toNumberPassword(normalized);
  if (passwordNums.length !== JUMON_LENGTH) {
    return;
  }

  // 4 を引き、前後の文字の差分を取る
  const codes = [];
  for (let i = JUMON_LENGTH - 1; i >= 0; i--) {
    const prevCode = i === 0 ? 0 : passwordNums[i - 1];
    codes[i] = (passwordNums[i] - prevCode - 4) & 0x3f;
  }

  // 文字(6bit)単位を、バイト単位に変換
  const bytes = [];
  for (let i = 0; i < JUMON_LENGTH; i += 4) {
    const bit24 = (codes[i + 3] << 18) | (codes[i + 2] << 12) | (codes[i + 1] << 6) | codes[i];
    bytes.push(bit24 & 0xff);
    bytes.push((bit24 >> 8) & 0xff);
    bytes.push((bit24 >> 16) & 0xff);
  }

  // チェックコード(CRC)を計算する. 0 なら OK
  const crc = calculateCrc(bytes);
  bytes[0] ^= crc;

  const name = toStringName([(bytes[5] >> 2) & 0x3f, (bytes[13] >> 1) & 0x3f, bytes[2] & 0x3f, bytes[7] & 0x3f]);

  const items = [
    bytes[14] & 0x0f,
    (bytes[14] >> 4) & 0x0f,
    bytes[3] & 0x0f,
    (bytes[3] >> 4) & 0x0f,
    bytes[11] & 0x0f,
    (bytes[11] >> 4) & 0x0f,
    bytes[6] & 0x0f,
    (bytes[6] >> 4) & 0x0f,
  ];

  const exp = bytes[12] * 256 + bytes[1];
  const cryptKey = ((bytes[7] >> 5) & 0x04) | ((bytes[5] << 1) & 0x02) | ((bytes[2] >> 7) & 0x01);

  const info: Dq1PasswordInfo = {
    name: name,
    wapon: (bytes[8] >> 5) & 0x07,
    armor: (bytes[8] >> 2) & 0x07,
    shild: bytes[8] & 0x03,
    items: items,
    key: (bytes[10] >> 4) & 0x0f,
    herb: bytes[10] & 0x0f,
    exp: exp,
    gold: bytes[9] * 256 + bytes[4],
    dragonScale: ((bytes[13] >> 7) & 0x01) !== 0,
    fighterRing: (bytes[13] & 0x01) !== 0,
    dragonSlayered: ((bytes[7] >> 6) & 0x01) !== 0,
    golemSlayered: ((bytes[5] >> 1) & 0x01) !== 0,
    deadAmulet: ((bytes[2] >> 6) & 0x01) !== 0,
    checkCode: bytes[0],
    cryptKey: cryptKey,
    level: toLevel(exp),
    valid: false,
  };

  // 呪文が正しいかどうかをチェック
  const valid = checkInfo(info);
  info.valid = valid;
  return info;
};

/** 呪文が正しいかどうかをチェック */
export const checkInfo = (info: Dq1PasswordInfo): boolean => {
  if (info.checkCode !== 0) {
    // チェックコードが不正
    return false;
  }

  if (6 < info.key) {
    // 魔法の鍵の数が多すぎる
    return false;
  }

  if (6 < info.herb) {
    // 薬草の数が多すぎる
    return false;
  }

  if (info.items.some((item) => Boolean(items[item].illegal))) {
    // 不正なアイテムを持っている
    return false;
  }

  return true;
};

/**
 * ハテナ付き呪文を元に、有効な呪文を作成する.
 *
 * @param password ハテナ付きパスワード
 * @returns 有効なパスワードの配列
 */
export const hatenaPassword = (password: string): Array<string> => {
  // ハテナを探す
  const position = password.indexOf('？');
  if (position === -1) {
    // ハテナが無い
    const info = analyzePassword(password);
    return info && info.valid ? [createPassword(info)] : [];
  } else {
    // ハテナがあった
    const passwords: Array<string> = [];
    for (const ch of JUMON_ALPHABET) {
      // 先頭のハテナに呪文に使える文字を仮定して、再帰呼び出しする
      const firstHalf = password.substring(0, position);
      const secondHalf = password.substring(position + 1);
      const newPassword = `${firstHalf}${ch}${secondHalf}`;
      const resolved = hatenaPassword(newPassword);
      passwords.push(...resolved);
    }
    return passwords;
  }
};

/**
 * ハテナの数を数える.
 * @param password ハテナ付きパスワード（正規化済）
 * @returns ハテナの数
 */
export const countHatena = (password: string): number => {
  return password.split('').filter((ch) => ch === '？').length;
};

/**
 * パスワードを「５＋７＋５＋３」の形式で編集する.
 *
 * @param pswd パスワード(20文字)
 * @returns 編集後パスワード
 */
export const editPassword = (pswd: string): string => {
  const part1 = pswd.substring(0, 5);
  const part2 = pswd.substring(5, 12);
  const part3 = pswd.substring(12, 17);
  const part4 = pswd.substring(17, 20);
  return `${part1}　${part2}　${part3}　${part4}`;
};

/**
 * パスワードを「５＋７」と「５＋３」の２行で編集する.
 *
 * @param pswd パスワード(20文字)
 * @returns 編集後パスワード
 */
export const editPassword2 = (pswd: string): string => {
  const part1 = pswd.substring(0, 5);
  const part2 = pswd.substring(5, 12);
  const part3 = pswd.substring(12, 17);
  const part4 = pswd.substring(17, 20);
  return `${part1}　${part2}\n${part3}　${part4}`;
};
