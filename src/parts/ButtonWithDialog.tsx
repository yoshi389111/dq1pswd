import React from 'react';

interface Props {
  /** ボタンラベル */
  buttonLabel: string;
  /** ダイアログラベル */
  dialogLabel: string;
  /** タイムアウト(ミリ秒) */
  timeout: number;
  /** クリック時のコールバック */
  onClick: () => void;
}

const ButtonWithDialog: React.FC<Props> = (props) => {
  const [showDialog, setShowDialog] = React.useState<boolean>(false);

  const handleOnClick = () => {
    props.onClick();
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
    }, props.timeout);
  };

  return (
    <div className='button dialog-target' onClick={handleOnClick}>
      {props.buttonLabel}
      {showDialog && <div className='dialog-on-button'>{props.dialogLabel}</div>}
    </div>
  );
};

export default ButtonWithDialog;
