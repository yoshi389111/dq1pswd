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

const InputNumber: React.FC<Props> = ({
    label,
    value,
    setValue,
    min,
    max,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const num = Number(event.target.value);
        if (isNaN(num)) {
            setValue(0);
        } else if (num < min!) {
            setValue(min!);
        } else if (max! < num) {
            setValue(max!);
        } else {
            setValue(num);
        }
    }

    return (
        <div className="row-line">
            <span className="label">{label}</span>
            <input
                className="value"
                type="number"
                value={value}
                min={min}
                max={max}
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
