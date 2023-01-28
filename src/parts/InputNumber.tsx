import React from 'react';

interface Props {
    /** ラベル名 */
    label: string;
    /** 値 */
    value: number;
    /** 値を変更 */
    setValue: (val: number) => void;
    min?: number;
    max?: number;
}

const InputNumber: React.FC<Props> = (prop) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const num = Number(event.target.value);
        if (isNaN(num)) {
            prop.setValue(0);
        } else if (num < prop.min!) {
            prop.setValue(prop.min!);
        } else if (prop.max! < num) {
            prop.setValue(prop.max!);
        } else {
            prop.setValue(num);
        }
    }

    return (
        <div className="row-line">
            <span className="label">{prop.label}</span>
            <input
                className="value"
                type="number"
                value={prop.value}
                min={prop.min}
                max={prop.max}
                onChange={handleChange}
                onFocus={(e) => e.target.select()}
            />
        </div>
    );
}

InputNumber.defaultProps = {
    min: 0,
    max: 65535,
}

export default InputNumber;
