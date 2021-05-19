import React, { useState, useEffect } from 'react';
import * as dq1pswd from './dq1pswd/dq1pswd';
import Dq1Info from './Dq1Info'

interface Props {
    password: string;
    setPassword: (password: string) => void;
    moveEdit: () => void;
}

const dq1 = new dq1pswd.Dq1Password();

/** 不正な道具 */
const INVALID_ITEM = 15;

const Dq1Edit: React.FC<Props> = ({
    password,
    setPassword,
    moveEdit,
}) => {
    // 入力中の呪文
    const [nowPassword, setNowPassword] = useState<string>('');
    // 詳細表示している呪文
    const [targetPassword, setTargetPassword] = useState<string>('');
    // 「？」に文字を割り当てた呪文リスト
    const [passwords, setPasswords] = useState<Array<string>>([]);

    const [validLength, setValidLength] = useState<boolean>(true);
    const [validItem1, setValidItem1] = useState<boolean>(true);
    const [validItem2, setValidItem2] = useState<boolean>(true);
    const [validItem3, setValidItem3] = useState<boolean>(true);
    const [validItem4, setValidItem4] = useState<boolean>(true);
    const [validItem5, setValidItem5] = useState<boolean>(true);
    const [validItem6, setValidItem6] = useState<boolean>(true);
    const [validItem7, setValidItem7] = useState<boolean>(true);
    const [validItem8, setValidItem8] = useState<boolean>(true);
    const [validKey, setValidKey] = useState<boolean>(true);
    const [validHerb, setValidHerb] = useState<boolean>(true);
    const [validHatena, setValidHatena] = useState<boolean>(true);
    const [emptyPasswords, setEmptyPasswords] = useState<boolean>(true);
    const [invalidChars, setInvalidChars] = useState<String>('');

    /** 呪文の形式が正しいかチェック */
    const canAnalyze = (password: string): boolean => {
        // フラグをクリア
        setValidLength(true);
        setValidItem1(true);
        setValidItem2(true);
        setValidItem3(true);
        setValidItem4(true);
        setValidItem5(true);
        setValidItem6(true);
        setValidItem7(true);
        setValidItem8(true);
        setValidKey(true);
        setValidHerb(true);
        setValidHatena(true);

        setInvalidChars(dq1.invalidCharsInPassword(password));

        // 呪文を正規化
        const normalize = dq1.toNormalizePassword(password);
        if (normalize.length !== 20) {
            // 復活の呪文の長さが違う
            setValidLength(false);
            return false;
        }

        // 結果
        let valid = true;
        const count = dq1.countHatena(normalize);
        if (3 < count) {
            // ハテナが３個超過
            setValidHatena(false);
            valid = false;
        }

        // 仮の値で検証
        const workPswd = normalize.replace(/？/g, "あ");
        const info = dq1.analyzePassword(workPswd);
        if (info) {
            if (
                info.items[3] === INVALID_ITEM &&
                !normalize.substring(3, 6).includes("？")
            ) {
                // 道具[4]不正：4～6文字目
                setValidItem4(false);
                valid = false;
            } else if (
                info.items[2] === INVALID_ITEM &&
                !normalize.substring(3, 5).includes("？")
            ) {
                // 道具[3]不正：4～5文字目
                setValidItem3(false);
                valid = false;
            }

            if (
                info.items[7] === INVALID_ITEM &&
                !normalize.substring(7, 10).includes("？")
            ) {
                // 道具[8]不正：8～10文字目
                setValidItem8(false);
                valid = false;
            } else if (
                info.items[6] === INVALID_ITEM &&
                !normalize.substring(7, 9).includes("？")
            ) {
                // 道具[7]不正：8～9文字目
                setValidItem7(false);
                valid = false;
            }

            if (
                info.herb > 6 &&
                !normalize.substring(12, 14).includes("？")
            ) {
                // 薬草不正：13～14文字目
                setValidHerb(false);
                valid = false;
            }

            if (
                info.items[4] === INVALID_ITEM &&
                !normalize.substring(13, 16).includes("？")
            ) {
                // 道具[5]不正：14～16文字目
                setValidItem5(false);
                valid = false;
            } else {
                if (
                    info.key > 6 &&
                    !normalize.substring(13, 15).includes("？")
                ) {
                    // 魔法の鍵不正：14～15文字目
                    setValidKey(false);
                    valid = false;
                }
                if (
                    info.items[5] === INVALID_ITEM &&
                    !normalize.substring(14, 16).includes("？")
                ) {
                    // 道具[6]不正：15～16文字目
                    setValidItem6(false);
                    valid = false;
                }
            }

            if (
                info.items[0] === INVALID_ITEM &&
                !normalize.substring(17, 20).includes("？")
            ) {
                // 道具[1]不正：18～20文字目
                setValidItem1(false);
                valid = false;
            } else if (
                info.items[1] === INVALID_ITEM &&
                !normalize.substring(18, 20).includes("？")
            ) {
                // 道具[2]不正：19～20文字目
                setValidItem2(false);
                valid = false;
            }
        }
        // 「？」なしなら、エラーが出ても解析OK
        return count === 0 ? true : valid;
    };

    const analyze = (password: string) => {
        if (!canAnalyze(password)) {
            setPasswords([]);
            setEmptyPasswords(false);
            setTargetPassword('');
            return;
        }

        const normalized = dq1.toNormalizePassword(password);
        const editPassword = (
            normalized.substring(0, 5) + "　" +
            normalized.substring(5, 12) + "\n" +
            normalized.substring(12, 17) + "　" +
            normalized.substring(17, 20)
        );
        setNowPassword(editPassword);

        if (normalized.includes('？')) {
            // "？" が含まれる場合には、一覧表示
            setPasswords([]);
            setEmptyPasswords(false);
            setTargetPassword('');
            process.nextTick(() => {
                const list = dq1.hatenaPassword(normalized);
                setPasswords(list);
                setEmptyPasswords(list.length === 0);
            });
        } else {
            // "？" が含まれない場合は、詳細表示
            setPasswords([]);
            setEmptyPasswords(false);
            setTargetPassword(normalized);
        }
    };

    // 初期表示
    useEffect(() => {
        if (password) {
            analyze(password);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password])

    let errorPassword = null;
    if (!(validItem1 && validItem2 && validItem3 && validItem4 &&
        validItem5 && validItem6 && validItem7 && validItem8 &&
        validKey && validHerb)) {
        const normalized = dq1.toNormalizePassword(nowPassword);
        if (20 <= normalized.length) {
            errorPassword = (
                <div>
                    <br />
                    <div>
                        <span>「{normalized.substr(0, 3)}</span>
                        <span
                            className={(validItem4 && validItem3) ? "" : "error"}
                        >{normalized.substr(3, 2)}　</span>
                        <span
                            className={validItem4 ? "" : "error"}
                        >{normalized.substr(5, 1)}</span>
                        <span>{normalized.substr(6, 1)}</span>
                        <span
                            className={(validItem8 && validItem7) ? "" : "error"}
                        >{normalized.substr(7, 2)}</span>
                        <span
                            className={validItem8 ? "" : "error"}
                        >{normalized.substr(9, 1)}</span>
                        <span>{normalized.substr(10, 2)}　</span>
                    </div>
                    <div>
                        <span
                            className={validHerb ? "" : "error"}
                        >　{normalized.substr(12, 1)}</span>
                        <span
                            className={(validHerb && validItem5 && validKey) ? "" : "error"}
                        >{normalized.substr(13, 1)}</span>
                        <span
                            className={(validItem6 && validItem5 && validKey) ? "" : "error"}
                        >{normalized.substr(14, 1)}</span>
                        <span
                            className={(validItem6 && validItem5) ? "" : "error"}
                        >{normalized.substr(15, 1)}</span>
                        <span>{normalized.substr(16, 1)}　</span>
                        <span
                            className={validItem1 ? "" : "error"}
                        >{normalized.substr(17, 1)}</span>
                        <span
                            className={(validItem1 && validItem2) ? "" : "error"}
                        >{normalized.substr(18, 2)}</span>
                        <span>　　　　」</span>
                    </div>
                </div>
            );
        }
    }

    const errorMessage = (
        <div>
            <br />
            {!validLength && <div>ひらがな20文字で指定してね</div> }
            {!validHatena && <div>「？」は３つまでにしてね</div> }
            {!validItem4 && <div>4～6文字目のどこかを変更してね</div> }
            {!validItem3 && <div>4～5文字目のどこかを変更してね</div> }
            {!validItem8 && <div>8～10文字目のどこかを変更してね</div> }
            {!validItem7 && <div>8～9文字目のどこかを変更してね</div> }
            {!validHerb && <div>13～14文字目のどこかを変更してね</div> }
            {!validItem5 && <div>14～16文字目のどこかを変更してね</div> }
            {!validKey && <div>14～15文字目のどこかを変更してね</div> }
            {!validItem6 && <div>15～16文字目のどこかを変更してね</div> }
            {!validItem1 && <div>18～20文字目のどこかを変更してね</div> }
            {!validItem2 && <div>19～20文字目のどこかを変更してね</div> }
            {emptyPasswords && <div>対象のふっかつのじゅもんがありません</div> }
            {invalidChars && <div>次の文字はつかえません「{ invalidChars }」</div> }
            {errorPassword}
        </div>
    );

    const passwordList = passwords.length ? (
        <div className="frame">
            <br />
            {passwords.map((pswd, index) => (
                <div
                    className={[
                        "password-selection",
                    ].join(' ')}
                    key={index}
                    onClick={() => {
                        setPassword(pswd.replace("　", ""));
                        window.scrollTo(0,0);
                    }}
                >{dq1.editPassword(pswd)}</div>
            ))}
        </div>
    ) : (
        <div></div>
    );

    return (
        <div>
            <div className="frame">
                <h2>ふっかつのじゅもんを　いれてください</h2>
                <textarea
                    className="password-area"
                    cols={40}
                    rows={3}
                    value={nowPassword}
                    onChange={(e) => setNowPassword(e.target.value)}
                />
            </div>
            <div>※「？」は３つまで使えます。３つあると時間がかかります。</div>

            {errorMessage}

            {passwordList}

            {targetPassword && <Dq1Info password={targetPassword} />}

            <div className="footer">
                <div className="button-area">
                    <span
                        className="button"
                        onClick={moveEdit}
                    >項目を入力</span>
                    <span
                        className="button"
                        onClick={() => analyze(nowPassword)}
                    >呪文を確認</span>
                </div>
            </div>

        </div>
    );
}

export default Dq1Edit;
