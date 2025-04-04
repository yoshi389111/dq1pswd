import React from 'react';
import * as dq1 from '../dq1pswd/dq1pswd';

interface Props {
  /** ラベル名 */
  label: string;
  /** 値 */
  value: number;
  /** 値を変更 */
  setValue: (val: number) => void;
  /** 選択肢 */
  items: ReadonlyArray<dq1.LabelInfo>;
}

const SelectItem: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    props.setValue(value);
  };

  const selected = props.items.find((item) => item.id === props.value);
  const error = selected && selected.illegal;

  return (
    <div className='row-line'>
      <span className={['label', error ? 'error' : ''].join(' ')}>{props.label}</span>
      <select className={['value', error ? 'error' : ''].join(' ')} value={props.value} onChange={handleChange}>
        {props.items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectItem;
