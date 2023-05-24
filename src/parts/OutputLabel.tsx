import React from 'react';

interface Props {
  /** ラベル名 */
  label: string;
  /** 値 */
  value: string;
  /** エラー */
  error?: boolean;
}

const OutputLabel: React.FC<Props> = (props) => {
  return (
    <div className='row-line'>
      <span className={['label', props.error ? 'error' : ''].join(' ')}>{props.label}</span>
      <span className={['value', props.error ? 'error' : ''].join(' ')}>{props.value}</span>
    </div>
  );
};

export default OutputLabel;
