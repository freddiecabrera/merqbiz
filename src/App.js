import React from 'react';
import './App.css';
import { styled } from 'styletron-react';


const Div = styled('div', props => ({
  display: 'flex',
  background: 'blue',
  height: '100vh',
  width: '100vw'
}));

function App() {
  return (
    <Div>

    </Div>
  );
}

export default App;
