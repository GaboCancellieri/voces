import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Typography } from './components';
import { colors } from './utils/theme';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography
          align="center"
          size={45}
          fontVariant="text"
          color={colors.mainPink}
        >
          Edit src/App.tsx and save to reload.
        </Typography>
        <Button
          onClick={() => {}}
          text={'BOTON'}
          variant={'secondary'}
        ></Button>
      </header>
    </div>
  );
}

export default App;
