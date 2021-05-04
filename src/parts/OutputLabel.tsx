import React from 'react';

interface Props {
    /** ラベル名 */
    label: string;
    /** 値 */
    value: string;
    /** エラー */
    error?: boolean;
}

const OutputLabel: React.FC<Props> = ({
    label,
    value,
    error,
}) => {
    return (
        <div className="row-line">
            <span
                className={[
                    "label",
                    error ? "error" : "",
                ].join(" ")}
            >{label}</span>
            <span
                className={[
                    "value",
                    error ? "error" : "",
                ].join(" ")}
            >{value}</span>
        </div>
    );
}

export default OutputLabel;
