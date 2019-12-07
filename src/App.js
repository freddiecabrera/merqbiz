import React, {useState, useEffect} from 'react';
import {motion, useAnimation} from 'framer-motion';
import './App.css';
import { styled } from 'styletron-react';
import Modal from './components/Modal';
import Task from './components/Task';

const Div = styled('div', props => ({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center'
}));

const ErrorContainer = styled(motion.div, props => ({
  opacity: 0,
  display: 'flex',
  height: '30px',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #e73b59',
  borderRadius: '5px',
  background: '#e73b59',
  padding: '10px',
  position: 'absolute',
  top: '20px', right: '0px',
  zIndex: 5,
  color: '#E5E1DD'
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
    color: '#E5E1DD',
}));

export const ActionsContainer = styled('div', props => ({
    display: 'flex',
    width: '100%',
}));

export const Action = styled('div', props => ({
  display: 'flex',
  flexGrow: 1,
  padding: '5px 0px 0px',
  justifyContent: props.justify || 'flex-start',
})) 

const ActionText = styled('a', props => ({
  cursor: 'pointer',
  color: '#E5E1DD',
  borderBottom: '1px solid #E5E1DD',
  textTransform: 'uppercase',
  fontSize: '12px'
}));

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 300
};

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
  const errorAnimationControls = useAnimation();

    useEffect(() => {
        isEditing && openModal(true);
        
        if (error) {
          errorAnimationControls.start({
            ease: 'easeOut',
            right: '20px',
            opacity: 1,
            transition: { duration: .6, ease: 'easeOut', },
          });
        }
    }, [isEditing, error, errorAnimationControls]);

  const storeTasksInSessionStorage = (tasksToBeStored) => {
      sessionStorage.setItem('storedTasks', JSON.stringify(tasksToBeStored))
  }

  const animateOutError = async () => {
    await errorAnimationControls.start({
      right: '0px',
      opacity: 0,
      transition: { duration: .4, ease: 'easeIn', },
    });
    return updateError(false);
  }

  const handleError = (err) => {
    updateError(err);
    setTimeout(() => animateOutError(), 3000)
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

  return (
    <Div>
      <TaskList>
        <TitleContainer>
          <h1>Tasks</h1>
        </TitleContainer>
        {sortByPriority(tasks).map(task => {
          return (
          <Task layoutTransition={spring} key={task.id} openModal={openModal} updateEditModeState={updateEditModeState} removeTasks={removeTasks} task={task} />
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
        errorAnimationControls={errorAnimationControls}
        updateEditModeState={updateEditModeState}
        tasks={tasks}
        handleError={handleError} 
        animateOutError={animateOutError} 
        addTasks={addTasks} 
        openModal={openModal} />}

        <ErrorContainer animate={errorAnimationControls}>
          <span>{error}</span>
        </ErrorContainer>}
    </Div>
  );
}

export default App;
