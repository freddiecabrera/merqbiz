
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
  background: '#1A1B27'
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
    width: '500px',
    background: '#2A2C42',
    flexDirection: 'column',
    padding: '20px 20px',
    border: '1px solid #2A2C42',
    borderRadius: '10px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'
}));

const TitleContainer = styled('div', props => ({
    display: 'flex',
    width: '100%',
    height: '100px',
    justifyContent: 'center',
    color: '#1A1B27',
}));

const ActionsContainer = styled('div', props => ({
    display: 'flex',
    width: '100%',
}));

const Action = styled('div', props => ({
  display: 'flex',
  color: 'white',
  flexGrow: 1,
  padding: '5px 1px 0px',
  justifyContent: props.justify || 'flex-start',
})) 

const ActionText = styled('a', props => ({
  cursor: 'pointer',
  color: 'white',
  borderBottom: '1px solid white',
  textTransform: 'uppercase',
  fontSize: '12px'
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
  const [sortedByPriority, updateSortByPriority] = useState(false);

    useEffect(() => {
        isEditing && openModal(true);
    }, [isEditing]);

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

  const sortByPriority = (tasks) => {
    if (!sortedByPriority) return tasks;
    const tasksClone = [...tasks]
    return tasksClone.sort((a, b) => b.priority - a.priority);
  }

  console.log('tasks', tasks);

  return (
    <Div>
      <TaskList>
        <TitleContainer>
          <h1>Tasks</h1>
        </TitleContainer>
        {sortByPriority(tasks).map(task => {
          return (
          <Task key={task.id} openModal={openModal} updateEditModeState={updateEditModeState} removeTasks={removeTasks} task={task} />
        )})}
        
        <ActionsContainer>
          <Action onClick={() => updateSortByPriority(true)}>
            <ActionText>Sort by Priority</ActionText>
          </Action>
          <Action justify='flex-end' onClick={() => openModal(true)}>
            <ActionText>create todo</ActionText>
          </Action>
        </ActionsContainer>
      </TaskList>

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
