import React, { useState } from 'react';
import './App.css';
import Dq1Edit from './Dq1Edit';
import Dq1Analize from './Dq1Analize';
import LogoSvg from './logo.svg';

type ModeType = 'edit' | 'analize';

const scrollTop = () => window.scrollTo(0, 0);

const App: React.FC = () => {
  const [page, setPage] = useState<ModeType>('edit');
  const [password, setPassword] = useState<string>('');

  const movePage = (page: ModeType) => {
    setPage(page);
    scrollTop();
  };

  return (
    <div className='App'>
      <div className='header'>
        <h1>
          <img src={LogoSvg} style={{ verticalAlign: 'middle' }} alt='' />
          &nbsp; ふっかつのじゅもん
        </h1>
      </div>

      {page === 'edit' && (
        <Dq1Edit password={password} setPassword={setPassword} moveAnalize={() => movePage('analize')} />
      )}
      {page === 'analize' && (
        <Dq1Analize password={password} setPassword={setPassword} moveEdit={() => movePage('edit')} />
      )}
    </div>
  );
};

export default App;
