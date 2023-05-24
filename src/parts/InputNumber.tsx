import React from 'react';

interface Props {
  /** ラベル名 */
  label: string;
  /** 値 */
  value: number;
  /** 値を変更 */
  setValue: (val: number) => void;
  /** 最小値 */
  min?: number;
  /** 最大値 */
  max?: number;
  /** ツールチップ */
  title?: string;
}

const InputNumber: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value);
    const minValue = props.min === undefined ? 0 : props.min;
    const maxValue = props.max === undefined ? 65535 : props.max;
    if (isNaN(num)) {
      props.setValue(0);
    } else if (num < minValue) {
      props.setValue(minValue);
    } else if (maxValue < num) {
      props.setValue(maxValue);
    } else {
      props.setValue(num);
    }
  };

  return (
    <div className='row-line' title={props.title}>
      <span className='label'>{props.label}</span>
      <input
        className='value'
        type='number'
        value={props.value}
        min={props.min}
        max={props.max}
        onChange={handleChange}
        onFocus={(e) => e.target.select()}
      />
    </div>
  );
};

export default InputNumber;
