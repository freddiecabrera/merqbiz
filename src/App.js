
import React, {useState, useEffect} from 'react';
import './App.css';
import { styled } from 'styletron-react';
import Modal from './components/Modal';
import Task from './components/Task';

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
    return tasksFromSessionstorage ? JSON.parse(tasksFromSessionstorage) : null;
  }
  const [isModalOpen, openModal] = useState(false);
  const [tasks, addTasks] = useState(getTasksFromSessionStorage() || []);
  const [error, updateError] = useState(null);
  const [isEditing, updateEditModeState] = useState(false);

    useEffect(() => {
        isEditing && openModal(true);
    }, [isEditing, isModalOpen]);

  const storeTasksInSessionStorage = (tasksToBeStored) => {
      sessionStorage.setItem('storedTasks', JSON.stringify(tasksToBeStored))
  }

  const handleError = (err) => {
    updateError(err);
    setTimeout(() => updateError(false), 3000)
  }

  const removeTasks = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    addTasks(filteredTasks);
    storeTasksInSessionStorage(filteredTasks);
  }

  return (
    <Div>
      <TaskList>
        {tasks.map(task => (
          <Task key={task.id} openModal={openModal} updateEditModeState={updateEditModeState} removeTasks={removeTasks} task={task} />
        ))}
      </TaskList>
      <button onClick={() => openModal(true)}>create todo</button>
      {isModalOpen && <Modal 
        isEditing={isEditing}
        updateEditModeState={updateEditModeState}
        tasks={tasks}
        handleError={handleError} 
        addTasks={addTasks} 
        openModal={openModal} />}

        <ErrorContainer display={error ? 'flex' : 'none'}>
          <span>{error}</span>
        </ErrorContainer>
    </Div>
  );
}

export default App;


