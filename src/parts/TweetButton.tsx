import React from 'react';
import * as dq1 from '../dq1pswd/dq1pswd';

interface Props {
    info: dq1.Dq1PasswordInfo;
}

const TweetButton: React.FC<Props> = (props) => {

    /** 復活の呪文をツイートする */
    const doTweet = (): void => {
        const password = dq1.createPassword(props.info);
        if (props.info.valid) {
            const param = encodeURIComponent(
                "勇者「" + props.info.name + "」ＬＶ" + props.info.level + "\n" +
                dq1.editPassword2(password) + "\n" +
                "#復活の呪文 #dq1pswd\n"
            );
            const url = `https://twitter.com/share?text=${param}`;
            window.open(url, "_blank");
        }
    }

    return (
        <div
            className={[
                "button",
                "button-with-svg",
                props.info.valid ? "" : "disable",
            ].join(' ')}
            onClick={doTweet}
        >
            【ツイート&nbsp;&nbsp;
            {/*
                Twitter icon
                (C) Twitter
                Apache License, Version 2.0
                https://www.apache.org/licenses/LICENSE-2.0
            */}
            <svg viewBox="0 0 248 204" width="1.2em" height="1.2em">
                <path
                    fill="white"
                    d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
                />
            </svg>
            &nbsp;&nbsp;】
        </div>
    );
}

export default TweetButton;
