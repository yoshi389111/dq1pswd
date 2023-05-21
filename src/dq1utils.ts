import * as dq1pswd from './dq1pswd/dq1pswd';

/** 任意の文字列をクリップボードにコピー */
export const clipboardCopy = (text: string) => {
    // create textarea
    const copyFrom = document.createElement("textarea");
    // append to body
    const bodyElm = document.getElementsByTagName("body")[0];
    bodyElm.appendChild(copyFrom);
    // copy 
    copyFrom.textContent = text;
    copyFrom.select();
    const result = document.execCommand('copy');
    // remove textarea
    bodyElm.removeChild(copyFrom);
    alert('コピーしました');
    return result;
}

/** 復活の呪文をツイートする */
export const doTweet = (info: dq1pswd.Dq1PasswordInfo, password: string) => {
    if (info.valid) {
        const message = "勇者「" + info.name + "」Ｌｖ" + info.level + "\n" +
            password.substring(0, 5) + "　" + password.substring(5, 12) + "\n" +
            password.substring(12, 17) + "　" + password.substring(17, 20) + "\n" +
            "#復活の呪文\n";
        const url = "https://twitter.com/share?text=" + encodeURIComponent(message);
        window.open(url, "_blank");
    }
}

/** 16進数2桁に編集(0xHH形式) */
export const toHex2 = (value: number) => {
    return '0x' + value.toString(16).toUpperCase().padStart(2, '0');
}

