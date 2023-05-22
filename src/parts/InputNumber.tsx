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

const InputNumber: React.FC<Props> = (props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const num = Number(event.target.value);
        if (isNaN(num)) {
            props.setValue(0);
        } else if (num < props.min!) {
            props.setValue(props.min!);
        } else if (props.max! < num) {
            props.setValue(props.max!);
        } else {
            props.setValue(num);
        }
    }

    return (
        <div className="row-line">
            <span className="label">{props.label}</span>
            <input
                className="value"
                type="number"
                value={props.value}
                min={props.min}
                max={props.max}
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
