import React, {useState} from 'react';
import './App.css';
import { styled } from 'styletron-react';
import Modal from './components/Modal';

const Div = styled('div', props => ({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center'
}));

const ErrorContainer = styled('div', props => ({
  display: props.display,
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  background: 'red',
  color: 'white',
  position: 'absolute',
  top: '20px', right: '20px'
}));

function App() {
  const [isModalOpen, openModal] = useState(false);
  const [tasks, addTasks] = useState([]);
  const [error, updateError] = useState(null);

  const handleError = (err) => {
    setTimeout(() => updateError(err), 3000)
  }

console.log('TASKS HERE', tasks);
  return (
    <Div>
      <button onClick={() => openModal(true)}>create todo</button>
      <Modal 
        tasks={tasks}
        handleError={handleError} 
        addTasks={addTasks} 
        open={isModalOpen} 
        openModal={openModal} />

        <ErrorContainer display={error ? 'flex' : 'none'}>
          <span>{error}</span>
        </ErrorContainer>
    </Div>
  );
}

export default App;
