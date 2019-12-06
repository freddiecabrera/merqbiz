import React, {useState} from 'react';
import './App.css';
import { styled } from 'styletron-react';
import Modal from './components/Modal';

const Div = styled('div', props => ({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'gray'
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

const TaskList = styled('div', props => ({
    display: 'flex',
    maxWidth: '350px',
    background: 'white',
    flexDirection: 'column'
}));

function App() {
  const getTasksFromSessionStorage = () => {
    const tasksFromSessionstorage = sessionStorage.getItem('storedTasks');
    console.log('tasksFromSessionstorage', JSON.parse(tasksFromSessionstorage));
    return tasksFromSessionstorage ? JSON.parse(tasksFromSessionstorage) : null;
  }
  const [isModalOpen, openModal] = useState(false);
  const [tasks, addTasks] = useState(getTasksFromSessionStorage() || []);
  const [error, updateError] = useState(null);

  const handleError = (err) => {
    updateError(err);
    setTimeout(() => updateError(false), 3000)
  }

  return (
    <Div>
      <TaskList>
        {tasks.map(task => (
          <div key={task.id}>
            <span>{task.text}</span>
          </div>
        ))}
      </TaskList>
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
