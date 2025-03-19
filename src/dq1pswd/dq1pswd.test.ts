import { expect, it } from "vitest"
import * as dq1 from './dq1pswd';

it('dq1pswd.toLevel', () => {
  expect(dq1.toLevel(0)).toEqual(1);
  expect(dq1.toLevel(6)).toEqual(1);
  expect(dq1.toLevel(7)).toEqual(2);
  expect(dq1.toLevel(22)).toEqual(2);
  expect(dq1.toLevel(23)).toEqual(3);
  expect(dq1.toLevel(46)).toEqual(3);
  expect(dq1.toLevel(47)).toEqual(4);
  expect(dq1.toLevel(109)).toEqual(4);
  expect(dq1.toLevel(110)).toEqual(5);
  expect(dq1.toLevel(219)).toEqual(5);
  expect(dq1.toLevel(220)).toEqual(6);
  expect(dq1.toLevel(449)).toEqual(6);
  expect(dq1.toLevel(450)).toEqual(7);
  expect(dq1.toLevel(799)).toEqual(7);
  expect(dq1.toLevel(800)).toEqual(8);
  expect(dq1.toLevel(1299)).toEqual(8);
  expect(dq1.toLevel(1300)).toEqual(9);
  expect(dq1.toLevel(1999)).toEqual(9);
  expect(dq1.toLevel(2000)).toEqual(10);
  expect(dq1.toLevel(2899)).toEqual(10);
  expect(dq1.toLevel(2900)).toEqual(11);
  expect(dq1.toLevel(3999)).toEqual(11);
  expect(dq1.toLevel(4000)).toEqual(12);
  expect(dq1.toLevel(5499)).toEqual(12);
  expect(dq1.toLevel(5500)).toEqual(13);
  expect(dq1.toLevel(7499)).toEqual(13);
  expect(dq1.toLevel(7500)).toEqual(14);
  expect(dq1.toLevel(9999)).toEqual(14);
  expect(dq1.toLevel(10000)).toEqual(15);
  expect(dq1.toLevel(12999)).toEqual(15);
  expect(dq1.toLevel(13000)).toEqual(16);
  expect(dq1.toLevel(16999)).toEqual(16);
  expect(dq1.toLevel(17000)).toEqual(17);
  expect(dq1.toLevel(20999)).toEqual(17);
  expect(dq1.toLevel(21000)).toEqual(18);
  expect(dq1.toLevel(24999)).toEqual(18);
  expect(dq1.toLevel(25000)).toEqual(19);
  expect(dq1.toLevel(28999)).toEqual(19);
  expect(dq1.toLevel(29000)).toEqual(20);
  expect(dq1.toLevel(32999)).toEqual(20);
  expect(dq1.toLevel(33000)).toEqual(21);
  expect(dq1.toLevel(36999)).toEqual(21);
  expect(dq1.toLevel(37000)).toEqual(22);
  expect(dq1.toLevel(40999)).toEqual(22);
  expect(dq1.toLevel(41000)).toEqual(23);
  expect(dq1.toLevel(44999)).toEqual(23);
  expect(dq1.toLevel(45000)).toEqual(24);
  expect(dq1.toLevel(48999)).toEqual(24);
  expect(dq1.toLevel(49000)).toEqual(25);
  expect(dq1.toLevel(52999)).toEqual(25);
  expect(dq1.toLevel(53000)).toEqual(26);
  expect(dq1.toLevel(56999)).toEqual(26);
  expect(dq1.toLevel(57000)).toEqual(27);
  expect(dq1.toLevel(60999)).toEqual(27);
  expect(dq1.toLevel(61000)).toEqual(28);
  expect(dq1.toLevel(64999)).toEqual(28);
  expect(dq1.toLevel(65000)).toEqual(29);
  expect(dq1.toLevel(65534)).toEqual(29);
  expect(dq1.toLevel(65535)).toEqual(30);
});

it('dq1pswd.toStringName', () => {
  expect(dq1.toStringName([0, 1, 2, 3])).toEqual('０１２３');
  expect(dq1.toStringName([10, 11, 12, 13])).toEqual('あいうえ');
  expect(dq1.toStringName([63, 63, 63, 63])).toEqual('　　　　');

  expect(dq1.toStringName([0, 1, 2, 3])).toEqual('０１２３');
  expect(dq1.toStringName([4, 5, 6, 7])).toEqual('４５６７');
  expect(dq1.toStringName([8, 9, 10, 11])).toEqual('８９あい');
  expect(dq1.toStringName([12, 13, 14, 15])).toEqual('うえおか');
  expect(dq1.toStringName([16, 17, 18, 19])).toEqual('きくけこ');
  expect(dq1.toStringName([20, 21, 22, 23])).toEqual('さしすせ');
  expect(dq1.toStringName([24, 25, 26, 27])).toEqual('そたちつ');
  expect(dq1.toStringName([28, 29, 30, 31])).toEqual('てとなに');
  expect(dq1.toStringName([32, 33, 34, 35])).toEqual('ぬねのは');
  expect(dq1.toStringName([36, 37, 38, 39])).toEqual('ひふへほ');
  expect(dq1.toStringName([40, 41, 42, 43])).toEqual('まみむめ');
  expect(dq1.toStringName([44, 45, 46, 47])).toEqual('もやゆよ');
  expect(dq1.toStringName([48, 49, 50, 51])).toEqual('らりるれ');
  expect(dq1.toStringName([52, 53, 54, 55])).toEqual('ろわをん');
  expect(dq1.toStringName([56, 57, 58, 59])).toEqual('っゃゅょ');
  expect(dq1.toStringName([60, 61, 62, 63])).toEqual('゛゜－　');
});

it('dq1pswd.toNumberName', () => {
  expect(dq1.toNumberName('０１２３')).toEqual([0, 1, 2, 3]);
  expect(dq1.toNumberName('４５６７')).toEqual([4, 5, 6, 7]);
  expect(dq1.toNumberName('８９あい')).toEqual([8, 9, 10, 11]);
  expect(dq1.toNumberName('うえおか')).toEqual([12, 13, 14, 15]);
  expect(dq1.toNumberName('きくけこ')).toEqual([16, 17, 18, 19]);
  expect(dq1.toNumberName('さしすせ')).toEqual([20, 21, 22, 23]);
  expect(dq1.toNumberName('そたちつ')).toEqual([24, 25, 26, 27]);
  expect(dq1.toNumberName('てとなに')).toEqual([28, 29, 30, 31]);
  expect(dq1.toNumberName('ぬねのは')).toEqual([32, 33, 34, 35]);
  expect(dq1.toNumberName('ひふへほ')).toEqual([36, 37, 38, 39]);
  expect(dq1.toNumberName('まみむめ')).toEqual([40, 41, 42, 43]);
  expect(dq1.toNumberName('もやゆよ')).toEqual([44, 45, 46, 47]);
  expect(dq1.toNumberName('らりるれ')).toEqual([48, 49, 50, 51]);
  expect(dq1.toNumberName('ろわをん')).toEqual([52, 53, 54, 55]);
  expect(dq1.toNumberName('っゃゅょ')).toEqual([56, 57, 58, 59]);
  expect(dq1.toNumberName('゛゜－　')).toEqual([60, 61, 62, 63]);

  expect(dq1.toNumberName('がぎ')).toEqual([15, 60, 16, 60]);
  expect(dq1.toNumberName('ぐげ')).toEqual([17, 60, 18, 60]);
  expect(dq1.toNumberName('ござ')).toEqual([19, 60, 20, 60]);
  expect(dq1.toNumberName('じず')).toEqual([21, 60, 22, 60]);
  expect(dq1.toNumberName('ぜぞ')).toEqual([23, 60, 24, 60]);
  expect(dq1.toNumberName('だぢ')).toEqual([25, 60, 26, 60]);
  expect(dq1.toNumberName('づで')).toEqual([27, 60, 28, 60]);
  expect(dq1.toNumberName('どば')).toEqual([29, 60, 35, 60]);
  expect(dq1.toNumberName('びぶ')).toEqual([36, 60, 37, 60]);
  expect(dq1.toNumberName('べぼ')).toEqual([38, 60, 39, 60]);
  expect(dq1.toNumberName('ぱぴ')).toEqual([35, 61, 36, 61]);
  expect(dq1.toNumberName('ぷぺ')).toEqual([37, 61, 38, 61]);
  expect(dq1.toNumberName('ぽ　　')).toEqual([39, 61, 63, 63]);
  expect(dq1.toNumberName('ｱｲｳｴ')).toEqual([10, 11, 12, 13]);
  expect(dq1.toNumberName('0123')).toEqual([0, 1, 2, 3]);
  expect(dq1.toNumberName('ｧｬｦ ')).toEqual([10, 57, 54, 63]);
});

it('dq1pswd.toStringPassword', () => {
  expect(dq1.toStringPassword([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])).toEqual(
    'あいうえおかきくけこさしすせそたちつてと'
  );
  expect(
    dq1.toStringPassword([20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39])
  ).toEqual('なにぬねのはひふへほまみむめもやゆよらり');
  expect(
    dq1.toStringPassword([40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59])
  ).toEqual('るれろわがぎぐげござじずぜぞだぢづでどば');
  expect(
    dq1.toStringPassword([60, 61, 62, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63])
  ).toEqual('びぶべぼぼぼぼぼぼぼぼぼぼぼぼぼぼぼぼぼ');
});

it('dq1pswd.toNumberPassword', () => {
  expect(dq1.toNumberPassword('あいうえお　かきくけこさし　すせそたち　つてと')).toEqual([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ]);
  expect(dq1.toNumberPassword('なにぬねのはひふへほまみむめもやゆよらり')).toEqual([
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  ]);
  expect(dq1.toNumberPassword('るれろわが ぎぐげご ざじずぜ ぞだぢづでどば')).toEqual([
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  ]);
  expect(dq1.toNumberPassword('びぶべぼぼ　ぼぼぼぼぼぼぼ　ぼぼぼぼぼ　ぼぼぼ')).toEqual([
    60, 61, 62, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
  ]);
});

it('dq1pswd.toNormalizePassword', () => {
  expect(dq1.toNormalizePassword('あいうえお')).toEqual('あいうえお');
  expect(dq1.toNormalizePassword('ぁぃぅぇぉ')).toEqual('あいうえお');
  expect(dq1.toNormalizePassword('あ　い うaえbお')).toEqual('あいうえお');
  expect(dq1.toNormalizePassword('あい？えお')).toEqual('あい？えお');
});

it('dq1pswd.createPassword', () => {
  const info: dq1.Dq1PasswordInfo = {
    name: 'あいうえ',
    gold: 51,
    exp: 60,
    herb: 3,
    key: 4,
    wapon: 7,
    armor: 6,
    shild: 2,
    items: [1, 2, 3, 4, 5, 6, 7, 8],
    dragonScale: true,
    fighterRing: false,
    dragonSlayered: true,
    golemSlayered: false,
    deadAmulet: true,
    cryptKey: 7,
    checkCode: 0, // dummy
    level: 0, // dummy
    valid: false, // dummy
  };
  expect(dq1.createPassword(info)).toEqual('せおしうこひざぼさおぜだどさもぼえみびけ');
});

it('dq1pswd.analyzePassword', () => {
  const info = dq1.analyzePassword('ふるいけや かわずとびこむ みずのおと ばしや');
  expect(info).not.toBeNull();
  if (!info) {
    return;
  }
  expect(info.name).toEqual('４ひえた');
  expect(info.gold).toEqual(15143);
  expect(info.exp).toEqual(2898);
  expect(info.herb).toEqual(4);
  expect(info.key).toEqual(1);
  expect(info.wapon).toEqual(2);
  expect(info.armor).toEqual(3);
  expect(info.shild).toEqual(0);
  expect(info.items).toEqual([0, 5, 7, 9, 2, 10, 12, 5]);
  expect(info.dragonScale).toEqual(true);
  expect(info.fighterRing).toEqual(true);
  expect(info.dragonSlayered).toEqual(false);
  expect(info.golemSlayered).toEqual(true);
  expect(info.deadAmulet).toEqual(false);
  expect(info.cryptKey).toEqual(4);
  expect(info.checkCode).toEqual(0);
  expect(info.valid).toEqual(true);
});

it('dq1pswd.hatenaPassword', () => {
  expect(dq1.hatenaPassword('ふるいけや  かわずとびこむ  みずのおと  あ？？')).toEqual([
    'ふるいけやかわずとびこむみずのおとあえほ',
    'ふるいけやかわずとびこむみずのおとあおぞ',
    'ふるいけやかわずとびこむみずのおとあきぐ',
    'ふるいけやかわずとびこむみずのおとあさお',
    'ふるいけやかわずとびこむみずのおとあへれ',
    'ふるいけやかわずとびこむみずのおとあまも',
    'ふるいけやかわずとびこむみずのおとあむぼ',
    'ふるいけやかわずとびこむみずのおとあもづ',
    'ふるいけやかわずとびこむみずのおとあよて',
    'ふるいけやかわずとびこむみずのおとありし',
    'ふるいけやかわずとびこむみずのおとあれる',
    'ふるいけやかわずとびこむみずのおとあわめ',
    'ふるいけやかわずとびこむみずのおとあぶそ',
    'ふるいけやかわずとびこむみずのおとあぼく',
  ]);
  expect(dq1.hatenaPassword('ふるいけや　かわずとびこむ　みずのおと　？？？').length).toEqual(900);
});

it('dq1pswd.countHatena', () => {
  expect(dq1.countHatena('ふるいけやかわずとびこむみずのおとばしや')).toEqual(0);
  expect(dq1.countHatena('ふるいけやかわずとびこむみずのおとばし？')).toEqual(1);
  expect(dq1.countHatena('ふるいけやかわずとびこむみずのおとば？？')).toEqual(2);
  expect(dq1.countHatena('？るいけやかわずとびこむみずのおとば？？')).toEqual(3);
});

it('dq1pswd.editPassword', () => {
  expect(dq1.editPassword('ふるいけやかわずとびこむみずのおとばしや')).toEqual(
    'ふるいけや　かわずとびこむ　みずのおと　ばしや'
  );
});
