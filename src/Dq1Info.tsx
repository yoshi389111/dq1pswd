import React from 'react';
import OutputLabel from './parts/OutputLabel';
import ButtonWithDialog from './parts/ButtonWithDialog';
import TweetButton from './parts/TweetButton'
import * as dq1pswd from './dq1pswd/dq1pswd';
import * as utils from './dq1utils';

interface Props {
    password: string;
}

const Dq1Info: React.FC<Props> = (props) => {
    const dq1 = new dq1pswd.Dq1Password();
    const info = dq1.analyzePassword(props.password);
    if (!info) {
        return null;
    }

    return (
        <div>
            <div className="frame">
                <h2>ステータス</h2>
                <OutputLabel label="なまえ" value={info.name} />
                <OutputLabel label="ＬＶ" value={info.level.toString()} />
                <OutputLabel label="ＥＸ" value={info.exp.toString()} />
                <OutputLabel label="Ｇ" value={info.gold.toString()} />
                <div className="button-area">
                    <ButtonWithDialog
                        buttonLabel='【コピー】'
                        dialogLabel='Copied!'
                        timeout={700}
                        onClick={() => utils.clipboardCopy(dq1.editPassword(props.password))}
                    />
                    <TweetButton info={info} />
                </div>
            </div>
            <div className="frame">
                <h2>そうび</h2>
                <OutputLabel label="ぶき" value={dq1pswd.wapons[info.wapon].name} />
                <OutputLabel label="よろい" value={dq1pswd.armors[info.armor].name} />
                <OutputLabel label="たて" value={dq1pswd.shilds[info.shild].name} />
                <OutputLabel label="りゅうのうろこ" value={info.dragonScale ? "装備した" : "装備してない"} />
                <OutputLabel label="せんしのゆびわ" value={info.fighterRing ? "装備した" : "装備してない"} />
                <OutputLabel label="しのくびかざり" value={info.deadAmulet ? "装備した" : "装備してない"} />
            </div>
            <div className="frame">
                <h2>もちもの</h2>
                <OutputLabel label="道具１" value={dq1pswd.items[info.items[0]].name} error={!!dq1pswd.items[info.items[0]].illegal} />
                <OutputLabel label="道具２" value={dq1pswd.items[info.items[1]].name} error={!!dq1pswd.items[info.items[1]].illegal} />
                <OutputLabel label="道具３" value={dq1pswd.items[info.items[2]].name} error={!!dq1pswd.items[info.items[2]].illegal} />
                <OutputLabel label="道具４" value={dq1pswd.items[info.items[3]].name} error={!!dq1pswd.items[info.items[3]].illegal} />
                <OutputLabel label="道具５" value={dq1pswd.items[info.items[4]].name} error={!!dq1pswd.items[info.items[4]].illegal} />
                <OutputLabel label="道具６" value={dq1pswd.items[info.items[5]].name} error={!!dq1pswd.items[info.items[5]].illegal} />
                <OutputLabel label="道具７" value={dq1pswd.items[info.items[6]].name} error={!!dq1pswd.items[info.items[6]].illegal} />
                <OutputLabel label="道具８" value={dq1pswd.items[info.items[7]].name} error={!!dq1pswd.items[info.items[7]].illegal} />
                <OutputLabel label="やくそう" value={info.herb === 0 ? "なし" : info.herb + "本"} error={6 < info.herb} />
                <OutputLabel label="かぎ" value={info.key === 0 ? "なし" : info.key + "本"} error={6 < info.key} />
            </div>
            <div className="frame">
                <h2>とうばつ</h2>
                <OutputLabel label="ドラゴン" value={info.dragonSlayered ? "倒した" : "倒してない"} />
                <OutputLabel label="ゴーレム" value={info.golemSlayered ? "倒した" : "倒してない"} />
            </div>
            <div className="frame">
                <h2>そのほか</h2>
                <OutputLabel
                    label="パターン"
                    value={"#" + info.cryptKey} />
                <OutputLabel
                    label="チェックコード"
                    value={utils.toHex2(info.checkCode)}
                    error={info.checkCode !== 0} />
            </div>
        </div>
    );
}

export default Dq1Info;
