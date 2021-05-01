/*********************************************************************
** DQ2「復活の呪文」捏造プログラム
** @(#) $Header: dq2pswd.c 0.02 1998/03/17 yotti $
**
** FC 版の DQ2 の「復活の呪文」を作成する
** MSX 版 DQ2 でも問題ないと思われる
** MSX 版の隠しアイテム「危ない水着」にも対応している
*********************************************************************/

#include "dq2.h"

#define MyAryNum(X) (sizeof(X)/sizeof(*X))

/* 五十音用 型 */
struct moji {
	char ch[3] ;
	int num ;
} ;

struct code8bit {
	int code[40] ;
	int len ;
	int bit ;
} ;

/* 名前用五十音 */
static struct moji name_alphabet[] = {
	{"０",  0}, {"１",  1}, {"２",  2}, {"３",  3}, {"４",  4},
	{"５",  5}, {"６",  6}, {"７",  7}, {"８",  8}, {"９",  9},
	{"あ", 10}, {"い", 11}, {"う", 12}, {"え", 13}, {"お", 14},
	{"か", 15}, {"き", 16}, {"く", 17}, {"け", 18}, {"こ", 19},
	{"さ", 20}, {"し", 21}, {"す", 22}, {"せ", 23}, {"そ", 24},
	{"た", 25}, {"ち", 26}, {"つ", 27}, {"て", 28}, {"と", 29},
	{"な", 30}, {"に", 31}, {"ぬ", 32}, {"ね", 33}, {"の", 34},
	{"は", 35}, {"ひ", 36}, {"ふ", 37}, {"へ", 38}, {"ほ", 39},
	{"ま", 40}, {"み", 41}, {"む", 42}, {"め", 43}, {"も", 44},
	{"や", 45}, {"ゆ", 46}, {"よ", 47},
	{"ら", 48}, {"り", 49}, {"る", 50}, {"れ", 51}, {"ろ", 52},
	{"わ", 53}, {"を", 54}, {"ん", 55},
	{"っ", 56}, {"ゃ", 57}, {"ゅ", 58}, {"ょ", 59},
	{"゛", 60}, {"゜", 61}, /* {"－", 62}, */ {"　", 62},
} ;

/* 名前読み換えデータ・濁点編(60) */
static struct moji name_dakuten[] = {
	{"が", 15}, {"ぎ", 16}, {"ぐ", 17}, {"げ", 18}, {"ご", 19},
	{"ざ", 20}, {"じ", 21}, {"ず", 22}, {"ぜ", 23}, {"ぞ", 24},
	{"だ", 25}, {"ぢ", 26}, {"づ", 27}, {"で", 28}, {"ど", 29},
	{"ば", 35}, {"び", 36}, {"ぶ", 37}, {"べ", 38}, {"ぼ", 39},
} ;

/* 名前読み換えデータ・半濁点編(61) */
static struct moji name_handakuten[] = {
	{"ぱ", 35}, {"ぴ", 36}, {"ぷ", 37}, {"ぺ", 38}, {"ぽ", 39},
} ;

/* 復活の呪文用五十音 */
static struct moji jumon_alphabet[] = {
	{"あ",  0}, {"い",  1}, {"う",  2}, {"え",  3}, {"お",  4},
	{"か",  5}, {"き",  6}, {"く",  7}, {"け",  8}, {"こ",  9},
	{"さ", 10}, {"し", 11}, {"す", 12}, {"せ", 13}, {"そ", 14},
	{"た", 15}, {"ち", 16}, {"つ", 17}, {"て", 18}, {"と", 19},
	{"な", 20}, {"に", 21}, {"ぬ", 22}, {"ね", 23}, {"の", 24},
	{"は", 25}, {"ひ", 26}, {"ふ", 27}, {"へ", 28}, {"ほ", 29},
	{"ま", 30}, {"み", 31}, {"む", 32}, {"め", 33}, {"も", 34},
	{"や", 35}, {"ゆ", 36}, {"よ", 37},
	{"ら", 38}, {"り", 39}, {"る", 40}, {"れ", 41}, {"ろ", 42},
	{"わ", 43},
	{"が", 44}, {"ぎ", 45}, {"ぐ", 46}, {"げ", 47}, {"ご", 48},
	{"ざ", 49}, {"じ", 50}, {"ず", 51}, {"ぜ", 52}, {"ぞ", 53},
/*	{"だ", 54}, {"ぢ", 55}, {"づ", 56}, {"で", 57}, {"ど", 58}, */
	{"ば", 54}, {"び", 55}, {"ぶ", 56}, {"べ", 57}, {"ぼ", 58},
	{"ぱ", 59}, {"ぴ", 60}, {"ぷ", 61}, {"ぺ", 62}, {"ぽ", 63},

	/* 0 - 63 までは、順番に並べておく必要がある */
	/* 表示(復元)の際にも使うから */

	/* 現在は、表示(復元)にしか使用しないけど… <NOTE> */

	/* 読み換える文字 */
	{"ぁ",  0}, {"ぃ",  1}, {"ぅ",  2}, {"ぇ",  3}, {"ぉ",  4},
	{"ゃ", 35}, {"ゅ", 36}, {"ょ", 37}, {"っ", 17},

} ;


int dq2_equip[] = {
	0,7,7,7,7,3,3,3,3,3,1,1,1,1,1,1,
	1,7,7,7,7,3,3,3,3,1,1,1,3,3,1,1,
	1,7,1,1,0,0,0,0,0,0,0,0,0,0,7,7,
	7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,
} ;


/* アイテム一覧 */
char *dq2_item_list[] = {
	"（なし）　　　","ひのきのぼう　","せいなるナイフ","まどうしのつえ",
	"いかずちのつえ","こんぼう　　　","どうのつるぎ　","くさりがま　　",
	"てつのやり　　","はやぶさのけん","はがねのつるぎ","おおかなずち　",
	"はかいのつるぎ","ドラゴンキラー","ひかりのつるぎ","ロトのつるぎ　",
	"いなずまのけん","ぬののふく　　","みかわしのふく","みずのはごろも",
	"ミンクのコート","かわのよろい　","くさりかたびら","あくまのよろい",
	"まほうのよろい","はがねのよろい","ガイアのよろい","ロトのよろい　",
	"かわのたて　　","ちからのたて　","はがねのたて　","しにがみのたて",
	"ロトのたて　　","ふしぎなぼうし","てつかぶと　　","ロトのかぶと　",
	"ロトのしるし　","ふねのざいほう","つきのかけら　","ルビスのまもり",
	"じゃしんのぞう","せかいじゅのは","やまびこのふえ","ラーのかがみ　",
	"あまつゆのいと","せいなりおりき","かぜのマント　","あくまのしっぽ",
	"まよけのすず　","ふっかつのたま","ゴールドカード","ふくびきけん　",
	"せいすい　　　","キメラのつばさ","（みみせん）　","きんのかぎ　　",
	"ぎんのかぎ　　","ろうやのかぎ　","すいもんのかぎ","どくけしそう　",
	"やくそう　　　","いのりのゆびわ","（しのオルゴール）","（あぶないみずぎ）"
} ;

/* 復活する場所一覧 */
char *dq2_town_name[] = {
	"ローレシア　　","サマルトリア　","ラダトーム　　","デルコンダル　",
	"ベラヌール　　","ロンダルキア　","ムーンペタ　　","（不正な場所）"
} ;


/*********************************************************************
** ビット列を受け取って配列につめる
** 配列の1要素は8bitまで
** （内部関数）
*********************************************************************/
static void bit_condense(
	int bit_data,
	int bit_len,
	struct code8bit *code)
{
	int bit, bit_temp ;

	if ( bit_len > 0 && code->bit == 0 ) {
		code->code[code->len] = 0 ;
	}

	bit = bit_data & (( 1 << bit_len )-1 ) ;

	if ( code->bit + bit_len <  8 ) {
		code->code[code->len] |= bit << ( 8 - code->bit - bit_len ) ;
		code->bit += bit_len ;

	} else if ( code->bit + bit_len == 8 ) {
		code->code[code->len ++] |= bit ;
		code->bit = 0 ;

	} else {
		code->code[(code->len) ++] |= bit >> ( code->bit + bit_len - 8 ) ;

		bit_temp = code->bit + bit_len - 8 ;
		code->bit = 0 ;

		while ( bit_temp >= 8 ) {
			code->code[(code->len) ++] = (bit >> ( bit_temp - 8 )) & 0xff ;
			bit_temp -= 8 ;
		}
		if ( bit_temp > 0 ) {
			code->code[code->len] = (bit << ( 8 - bit_temp )) & 0xff ;
			code->bit = bit_temp ;
		}
	}
}


/**********************************************************
** かなを、数字に直す
** （内部関数）
***********************************************************/
static int kana2num(
	char *kana,
	struct moji *gojuon,
	int gojuon_max)
{
	int i ;

	for ( i = 0 ; i < gojuon_max; i ++ ) {
		if ( kana[0] == gojuon[i].ch[0] &&
		     kana[1] == gojuon[i].ch[1] ) {
			return gojuon[i].num ;
		}
	}

	/* 不正な値なら -1 を返す */
	return -1 ;
}


/**********************************************************
** DQ2 用復活の呪文を作成する
***********************************************************/
void dq2_make_pswd(
	struct dq2pswd *dq2,
	int *pswd)
{
	struct code8bit code ;
	int data_len, data[60] ;
	int ro_item_num, sa_item_num, mu_item_num ;
	int ro_item[8], sa_item[8], mu_item[8] ;
	int i ;

	/* ro_name[] = {62,62,62,62} ; */

	/* 主人公のアイテムの最適化 */
	/* 間に空欄があった場合、詰めておく */
	ro_item_num = 0 ;
	for ( i = 0 ; i < 8 ; i ++ ) {
		if ( dq2->ro_item[i] != 0 ) {
			ro_item[ro_item_num ++] = dq2->ro_item[i] & 0x7f ;
		}
	}

	/* 王子のアイテムの最適化 */
	/* 間に空欄があった場合、詰めておく */
	sa_item_num = 0 ;
	for ( i = 0 ; i < 8 ; i ++ ) {
		if ( dq2->sa_item[i] != 0 ) {
			sa_item[sa_item_num ++] = dq2->sa_item[i] & 0x7f ;
		}
	}

	/* 王女のアイテムの最適化 */
	/* 間に空欄があった場合、詰めておく */
	mu_item_num = 0 ;
	for ( i = 0 ; i < 8 ; i ++ ) {
		if ( dq2->mu_item[i] != 0 ) {
			mu_item[mu_item_num ++] = dq2->mu_item[i] & 0x7f ;
		}
	}

	/* コード ( 8bit データの配列 ) を初期化する */
	for ( i = 0 ; i < 40 ; i ++ ) {
		code.code[i] = 0 ;
	}
	code.len = 0 ;
	code.bit = 0 ;

	/* 復活する場所 */
	code.code[0] = dq2->town & 0x07 ;

	/* 主人公の名前と所持金 */
	code.code[1] =
		( ( dq2->ro_name[2] & 0x3f ) << 2 ) |
		( ( dq2->ro_name[1] & 0x30 ) >> 4 ) ;
	code.code[2] = ( dq2->gold >> 8 ) & 0xff ;
	code.code[3] =
		( ( dq2->ro_name[1] & 0x06 ) << 5 ) |
		(   dq2->ro_name[0] & 0x3f        ) ;
	code.code[4] = dq2->gold & 0xff ;
	code.code[5] =
		( ( dq2->ro_name[1] & 0x01 ) << 7 ) |
		( ( dq2->ro_name[3] & 0x3f ) << 1 ) |
		( ( dq2->ro_name[1] & 0x08 ) >> 3 ) ;

	/* 暗号化キーと各種フラグ */
	code.code[6] =
		( ( dq2->crypt_key   & 0x01 ) << 7 ) |
		( ( dq2->flg_moon    & 0x01 ) << 6 ) |
		( ( dq2->flg_gate    & 0x01 ) << 5 ) |
		( ( dq2->flg_plumage & 0x01 ) << 4 ) |
		( ( dq2->flg_ship    & 0x03 ) << 2 ) |
		(   dq2->flg_plince  & 0x03        ) ;

	/* 暗号化キーと紋章 */
	code.code[7] =
		( ( dq2->crypt_key    & 0x0e ) << 4 ) |
		( ( dq2->crest_life  ) ? 0x10 : 0 ) |
		( ( dq2->crest_water ) ? 0x08 : 0 ) |
		( ( dq2->crest_moon  ) ? 0x04 : 0 ) |
		( ( dq2->crest_star  ) ? 0x02 : 0 ) |
		( ( dq2->crest_sun   ) ? 0x01 : 0 ) ;

	code.code[8] = 0 ;
	code.len = 9 ;
	code.bit = 0 ;

	/* 主人公の経験値 */
	bit_condense(dq2->ro_exp, 16, &code) ;
	bit_condense(dq2->ro_exp >> 16, 4, &code) ;

	/* 主人公のアイテム */
	bit_condense(ro_item_num, 4, &code) ;

	for ( i = 0 ; i < ro_item_num ; i ++ ) {
		bit_condense(ro_item[i], 7, &code) ;
	}

	/* 王子が仲間になっているか？ */
	bit_condense(!!dq2->sa_flg, 1, &code) ;
	if ( dq2->sa_flg != 0 ) {

		/* 王子の経験値 */
		bit_condense(dq2->sa_exp, 16, &code) ;
		bit_condense(dq2->sa_exp >> 16, 4, &code) ;

		/* 王子の持ち物 */
		bit_condense(sa_item_num, 4, &code) ;
		for ( i = 0 ; i < sa_item_num ; i ++ ) {
			bit_condense(sa_item[i], 7, &code) ;
		}

		/* 王女が仲間になっているか？ */
		bit_condense(!!dq2->mu_flg, 1, &code) ;
		if ( dq2->mu_flg != 0 ) {
			/* 王女の経験値 */
			bit_condense(dq2->mu_exp, 16, &code) ;
			bit_condense(dq2->mu_exp >> 16, 4, &code) ;

			/* 王女の持ち物 */
			bit_condense(mu_item_num, 4, &code) ;
			for ( i = 0 ; i < mu_item_num ; i ++ ) {
				bit_condense(mu_item[i], 7, &code) ;
			}
		}
	}

	if ( code.bit != 0 ) {
		/* ビットが半端だった場合、とりあえず 0 を埋める */
		code.len ++ ;
		code.bit = 0 ;
	}

	if ( code.len == 40 ) {
		/* 40byte ある→最後 2bit までしかありえない、残りは 0 */
		/* 全員が８つづつアイテムを持っている時に、314bit のはず */
		/* 314bit = 39byte + 2bit */
		code.code[8] = code.code[39] ;
		code.len -- ;
	}

	{
		/* チェックコードの計算 */
		int ww, wc, a, j ;

		ww = code.len * 0x0101 ;
		for ( i = code.len - 1 ; i >= 0 ; i -- ) {
			wc = code.code[i] ;
			for ( j = 0 ; j < 8 ; j ++ ) {
				a  = ( ww >> 8 ) ^ wc ;
				ww = ( ww << 1 ) & 0xffff ;
				wc = ( wc << 1 ) & 0xff ;
				if ( ( a & 0x80 ) != 0x00 ) {
					ww ^= 0x1021 ;
				}
			}
		}
	
		code.code[0] |= ( ww << 3 ) & 0xf8 ;
		code.code[8] |= ( ww >> 5 ) & 0x3f ;
	}

	/* データ ( 6bit の配列 ) の初期化 */
	for ( i = 0 ; i < 53 ; i ++ ) {
		data[i] = 0 ;
	}
	data_len = 0 ;

	/* 8bit 単位のデータを 6bit 単位に変換 */
	for ( i = 0 ; i < code.len ; i ++ ) {
		if ( i % 3 == 0 ) {
			data[data_len ++]  = (code.code[i] >> 2) & 0x3f ;
			data[data_len   ]  = (code.code[i] << 4) & 0x30 ;

		} else if ( i % 3 == 1 ) {
			data[data_len ++] |= (code.code[i] >> 4) & 0x0f ;
			data[data_len   ]  = (code.code[i] << 2) & 0x3c ;

		} else if ( i % 3 == 2 ) {
			data[data_len ++] |= (code.code[i] >> 6) & 0x03 ;
			data[data_len ++]  =  code.code[i]       & 0x3f ;

		}
	}
	if ( i % 3 != 0 ) {
		data_len ++ ;
	}
	data[data_len] = 0 ;

	{
		/* 暗号化 */
		int a, wc ;

		wc = ( ( data[0] & 0x06 ) >> 1 ) + 1 ;
		for ( i = 0 ; i < data_len ; i ++ ) {
			a = ( data[i] + data[i+1] ) & 0xff ; /* <NOTE> */
			data[i+1] = ( a + wc ) & 0x3f ;
		}
		for ( i = data_len ; i < 0x35 ; i ++ ) {
			data[i] = -1 ;
		}
	}

	for ( i = 0 ; i < 0x35 ; i ++ ) {
		pswd[i] = data[i] ;
	}

}


/*********************************************************************
** 主人公の名前から王子と王女の名前を求める
*********************************************************************/
void dq2_make_names(
	int *ro_name,
	char **sa_name,
	char **mu_name)
{
	/* 王子の名前一覧 */
	static char *sa_names[] = {
		"パウロ　","ランド　","カイン　","アーサー",
		"コナン　","クッキー","トンヌラ","すけさん"} ;

	/* 王女の名前一覧 */
	static char *mu_names[] = {
		"まいこ　","リンダ　","サマンサ","アイリン",
		"マリア　","ナナ　　","あきな　","プリン　"} ;

	int sum = 0 ;
	int i, temp ;

	for ( i = 0 ; i < 4 ; i ++ ) {
		temp = ro_name[i] ;

		if ( 10 <= temp &&  temp <= 31 ) {
			temp += 33 ;
		} else if ( 32 <= temp && temp <= 59 ) {
			temp -= 31 ;
		} else if ( 60 <= temp && temp <= 61 ) {
			temp -= 47 ;
		} else {
			break ;
		}
		sum += temp ;
	}

	if ( i > 1 ) {
		sum -- ;
	}
	*sa_name = sa_names[((sum + 5) >> 3) & 0x07] ;
	*mu_name = mu_names[sum % 8] ;
}


/**********************************************************
** 名前(int[4]) を文字列(char[9])に変換
***********************************************************/
void dq2_cnv_int2name(
	int *name1,
	char *name2)
{
	int i ;

	for ( i = 0 ; i < 4 ; i ++ ) {
		*name2++ = name_alphabet[name1[i]].ch[0] ;
		*name2++ = name_alphabet[name1[i]].ch[1] ;
	}
	*name2 = '\0' ;
}


/**********************************************************
** 名前(char*) を数字(int[4])に変換
** 不正な文字があれば、その時点で変換を中止する
***********************************************************/
void dq2_cnv_name2int(
	char *name1,
	int *name2)
{
	int i ;

	for ( i = 0 ; i < 4 ; i ++ ) {
		name2[i] = 62 ;	/* スペース */
	}

	for ( i = 0 ; i < 4 ; ) {
		int rc ;

		if ( *name1 == '\0' ) {
			break ;
		}

		rc = kana2num(name1, name_alphabet, MyAryNum(name_alphabet)) ;

		if ( rc != -1 ) {
			name1 += 2 ;
			name2[i++] = rc ;
			continue ;
		}

		rc = kana2num(name1, name_dakuten, MyAryNum(name_dakuten)) ;
		if ( rc != -1 ) {
			name1 += 2 ;
			name2[i++] = rc ;
			if ( i == 4 ) break ;
			name2[i++] = 60 ; /* 濁点 */
			continue ;
		}

		rc = kana2num(name1, name_handakuten, MyAryNum(name_handakuten)) ;
		if ( rc != -1 ) {
			name1 += 2 ;
			name2[i++] = rc ;
			if ( i == 4 ) break ;
			name2[i++] = 61 ; /* 半濁点 */
			continue ;
		}

		/* 不正な文字 */
		break ;
	}
}

/**********************************************************
** 呪文(int*) を文字列(char[135])に変換
**
** 「ゆうて　いみや　おうきむ
** 　こうほ　りいゆ　うじとり
** 　やまあ　きらぺ　ぺぺぺぺ
** 　ぺぺぺ　ぺぺぺ　ぺぺぺぺ
** 　ぺぺぺ　ぺぺぺ　ぺぺぺぺ　ぺぺ」
***********************************************************/
void dq2_cnv_int2pswd(
	int *pswd1,
	char *pswd2)
{
	int i ;

	for ( i = 0 ; i < 0x35 ; i ++ ) {
		if ( pswd1[i] == -1 )
			break ;
		*pswd2++ = jumon_alphabet[pswd1[i]].ch[0] ;
		*pswd2++ = jumon_alphabet[pswd1[i]].ch[1] ;

		if ( i%10 == 2 || i%10 == 5 || i == 49 ) {
			*pswd2++ = ' ' ;
			*pswd2++ = ' ' ;
		} else if ( i%10 == 9 ) {
			*pswd2++ = '\r' ;
			*pswd2++ = '\n' ;
		}
	}
	*pswd2 = '\0' ;
}
