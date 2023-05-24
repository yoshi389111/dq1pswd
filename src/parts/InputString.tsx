import React from 'react';

interface Props {
  /** ラベル名 */
  label: string;
  /** 値 */
  value: string;
  /** プレースホルダ */
  placeholder?: string;
  /** 値を変更 */
  setValue: (val: string) => void;
}

const InputString: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  };

  return (
    <div className='row-line'>
      <span className='label'>{props.label}</span>
      <input
        className='value'
        type='text'
        value={props.value}
        placeholder={props.placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

InputString.defaultProps = {
  placeholder: '',
};

export default InputString;
