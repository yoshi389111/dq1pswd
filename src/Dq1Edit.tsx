import React, { useState, useEffect } from 'react';
import InputString from './parts/InputString';
import InputNumber from './parts/InputNumber';
import SelectItem from './parts/SelectItem';
import OutputLabel from './parts/OutputLabel';
import ButtonWithDialog from './parts/ButtonWithDialog';
import TweetButton from './parts/TweetButton'
import * as dq1 from './dq1pswd/dq1pswd';
import * as utils from './dq1utils';

interface Props {
    password: string;
    setPassword: (password: string) => void;
    moveAnalize: () => void;
}

const herbAndKeyItems: ReadonlyArray<dq1.LabelInfo> = [
    { id: 0, name: "なし" },
    { id: 1, name: "1本" },
    { id: 2, name: "2本" },
    { id: 3, name: "3本" },
    { id: 4, name: "4本" },
    { id: 5, name: "5本" },
    { id: 6, name: "6本" },
    { id: 7, name: "（7本）", illegal: true },
    { id: 8, name: "（8本）", illegal: true },
    { id: 9, name: "（9本）", illegal: true },
    { id: 10, name: "（10本）", illegal: true },
    { id: 11, name: "（11本）", illegal: true },
    { id: 12, name: "（12本）", illegal: true },
    { id: 13, name: "（13本）", illegal: true },
    { id: 14, name: "（14本）", illegal: true },
    { id: 15, name: "（15本）", illegal: true },
];

const cryptItems: ReadonlyArray<dq1.LabelInfo> = [
    { id: 0, name: "#0" },
    { id: 1, name: "#1" },
    { id: 2, name: "#2" },
    { id: 3, name: "#3" },
    { id: 4, name: "#4" },
    { id: 5, name: "#5" },
    { id: 6, name: "#6" },
    { id: 7, name: "#7" },
];

const equipItems: ReadonlyArray<dq1.LabelInfo> = [
    { id: 0, name: "装備してない" },
    { id: 1, name: "装備した" },
];

const slayerItems: ReadonlyArray<dq1.LabelInfo> = [
    { id: 0, name: "倒してない" },
    { id: 1, name: "倒した" },
];

const Dq1Edit: React.FC<Props> = (props) => {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [gold, setGold] = useState<number>(0);
    const [wapon, setWapon] = useState<number>(0);
    const [armor, setArmor] = useState<number>(0);
    const [shild, setShild] = useState<number>(0);
    const [herb, setHerb] = useState<number>(0);
    const [key, setKey] = useState<number>(0);
    const [item1, setItem1] = useState<number>(0);
    const [item2, setItem2] = useState<number>(0);
    const [item3, setItem3] = useState<number>(0);
    const [item4, setItem4] = useState<number>(0);
    const [item5, setItem5] = useState<number>(0);
    const [item6, setItem6] = useState<number>(0);
    const [item7, setItem7] = useState<number>(0);
    const [item8, setItem8] = useState<number>(0);
    const [scale, setScale] = useState<number>(0);
    const [ring, setRing] = useState<number>(0);
    const [amulet, setAmulet] = useState<number>(0);
    const [dragon, setDragon] = useState<number>(0);
    const [golem, setGolem] = useState<number>(0);
    const [exp, setExp] = useState<number>(0);
    const [crypt, setCrypt] = useState<number>(0);
    const [crc, setCrc] = useState<number>(0);

    /** App 側のパスワードを取り込む(新規/更新時) */
    useEffect(() => {
        if (!props.password) {
            return;
        }
        const info = dq1.analyzePassword(props.password);
        if (info) {
            setName(info.name.replace(/　+$/, ''));
            setWapon(info.wapon);
            setArmor(info.armor);
            setShild(info.shild);
            setHerb(info.herb);
            setKey(info.key);
            setItem1(info.items[0]);
            setItem2(info.items[1]);
            setItem3(info.items[2]);
            setItem4(info.items[3]);
            setItem5(info.items[4]);
            setItem6(info.items[5]);
            setItem7(info.items[6]);
            setItem8(info.items[7]);
            setGold(info.gold);
            setExp(info.exp);
            setScale(info.dragonScale ? 1 : 0);
            setRing(info.fighterRing ? 1 : 0);
            setAmulet(info.deadAmulet ? 1 : 0);
            setDragon(info.dragonSlayered ? 1 : 0);
            setGolem(info.golemSlayered ? 1 : 0);
            setCrypt(info.cryptKey);
            setCrc(info.checkCode);
        }
    }, [props.password])

    /** 入力内容から復活の呪文を作成 */
    const createPassword = () => {
        const info: dq1.Dq1PasswordInfo = {
            name: name,
            wapon: wapon,
            armor: armor,
            shild: shild,
            herb: herb,
            key: key,
            items: [item1, item2, item3, item4, item5, item6, item7, item8],
            gold: gold,
            exp: exp,
            dragonScale: scale === 1,
            fighterRing: ring === 1,
            deadAmulet: amulet === 1,
            dragonSlayered: dragon === 1,
            golemSlayered: golem === 1,
            cryptKey: crypt,
            level: 0, // dummy
            checkCode: 0, // dummy
            valid: false, // dummy
        };
        return dq1.createPassword(info);
    }

    /** 復活の呪文を表示するためのモーダルダイアログ */
    const modalDialog = () => {
        const password = createPassword();
        const info = dq1.analyzePassword(password);
        if (!info) {
            return null;
        }

        return (
            <div id="overlay" onClick={() => setShowDialog(false)}>
                <div className="frame" onClick={(e) => e.stopPropagation()}>
                    <h2>勇者「{info.name}」ＬＶ {info.level}</h2>
                    {info.valid ? (
                        <div className="passwd-block">
                            {/* formatter が行頭の全角空白を削除することがある。注意 */}
                            ＊「そなたに　ふっかつのじゅもんを<br />
                            &emsp;&emsp;おしえよう！<br />
                            <br />
                            {
                                dq1.editPassword2(password).split('\n').map((it, i) => (
                                    <React.Fragment key={`pswd-${i}`}>
                                        &emsp;&emsp;{it}<br />
                                    </React.Fragment>
                                ))
                            }
                            <br />
                            ＊「これを　かきとめておくのだぞ。 <br />
                        </div>
                    ) : (
                        <div className="passwd-block">
                            <span className="error">じゅもんが　ちがいます</span><br />
                            <br />
                            {
                                dq1.editPassword2(password).split('\n').map((it, i) => (
                                    <React.Fragment key={`pswd-${i}`}>
                                        {it}<br />
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    )}
                    <br />
                    <div className="button-area">
                        <div
                            className="button"
                            onClick={() => setShowDialog(false)}
                        >【閉じる】</div>
                        <ButtonWithDialog
                            buttonLabel='【コピー】'
                            dialogLabel='Copied!'
                            timeout={700}
                            onClick={() => utils.clipboardCopy(dq1.editPassword(password))}
                        />
                        <TweetButton info={info} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="frame">
                <h2>ステータス</h2>
                <InputString
                    label="なまえ"
                    value={name}
                    setValue={setName}
                    placeholder="なまえをいれてください"
                />
                <InputNumber label="ＥＸ" value={exp} setValue={setExp} title="0～65,535 の範囲で入力してください" />
                <InputNumber label="Ｇ" value={gold} setValue={setGold} title="0～65,535 の範囲で入力してください" />
            </div>
            <div className="frame">
                <h2>そうび</h2>
                <SelectItem label="ぶき" value={wapon} setValue={setWapon} items={dq1.wapons} />
                <SelectItem label="よろい" value={armor} setValue={setArmor} items={dq1.armors} />
                <SelectItem label="たて" value={shild} setValue={setShild} items={dq1.shilds} />
                <SelectItem label="りゅうのうろこ" value={scale} setValue={setScale} items={equipItems} />
                <SelectItem label="せんしのゆびわ" value={ring} setValue={setRing} items={equipItems} />
                <SelectItem label="しのくびかざり" value={amulet} setValue={setAmulet} items={equipItems} />
            </div>
            <div className="frame">
                <h2>もちもの</h2>
                <SelectItem label="道具１" value={item1} setValue={setItem1} items={dq1.items} />
                <SelectItem label="道具２" value={item2} setValue={setItem2} items={dq1.items} />
                <SelectItem label="道具３" value={item3} setValue={setItem3} items={dq1.items} />
                <SelectItem label="道具４" value={item4} setValue={setItem4} items={dq1.items} />
                <SelectItem label="道具５" value={item5} setValue={setItem5} items={dq1.items} />
                <SelectItem label="道具６" value={item6} setValue={setItem6} items={dq1.items} />
                <SelectItem label="道具７" value={item7} setValue={setItem7} items={dq1.items} />
                <SelectItem label="道具８" value={item8} setValue={setItem8} items={dq1.items} />
                <SelectItem label="やくそう" value={herb} setValue={setHerb} items={herbAndKeyItems} />
                <SelectItem label="かぎ" value={key} setValue={setKey} items={herbAndKeyItems} />
            </div>
            <div className="frame">
                <h2>とうばつ</h2>
                <SelectItem label="ドラゴン" value={dragon} setValue={setDragon} items={slayerItems} />
                <SelectItem label="ゴーレム" value={golem} setValue={setGolem} items={slayerItems} />
            </div>
            <div className="frame">
                <h2>そのほか</h2>
                <SelectItem label="パターン" value={crypt} setValue={setCrypt} items={cryptItems} />
                <OutputLabel
                    label="チェックコード"
                    value={utils.toHex2(crc)}
                    error={crc !== 0}
                />
            </div>
            <div className="footer">
                <div className="button-area">
                    <span className="button" onClick={() => {
                        props.setPassword(createPassword());
                        props.moveAnalize();
                    }}>呪文を入力</span>
                    <span className="button" onClick={() => {
                        props.setPassword(createPassword());
                        setShowDialog(true);
                    }}>呪文を確認</span>
                </div>
            </div>
            {showDialog && modalDialog()}
        </div>
    );
}

export default Dq1Edit;
