import React from 'react';
import * as dq1pswd from '../dq1pswd/dq1pswd';

interface Props {
    /** ラベル名 */
    label: string;
    /** 値 */
    value: number;
    /** 値を変更 */
    setValue: (val: number) => void;
    /** 選択肢 */
    items: ReadonlyArray<dq1pswd.LabelInfo>
}

const SelectItem: React.FC<Props> = ({
    label,
    value,
    setValue,
    items,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(event.target.value);
        setValue(value);
    }

    const options = items.map(item => (
        <option value={item.id} key={item.id}>{item.name}</option>
    ));

    const selected = items.find(item => item.id === value);
    const error = (selected && selected.illegal);

    return (
        <div className="row-line">
            <span
                className={[
                    "label",
                    error ? "error" : "",
                ].join(" ")}
            >{label}</span>
            <select
                className={[
                    "value",
                    error ? "error" : "",
                ].join(" ")}
                value={value}
                onChange={handleChange}
            >
                {options}
            </select>
        </div>
    );
}

export default SelectItem;
