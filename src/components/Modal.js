import React, {useState} from 'react';
import Dropdown from 'react-dropdown'
import uniqid from 'uniqid';
import '../App.css';

import { styled } from 'styletron-react';
import 'react-dropdown/style.css'
import { ActionsContainer, Action } from '../App';
import { Button } from './Task';

const priorities = [
    { value: 1, label: 'Low' },
    { value: 2, label: 'Medium' },
    { value: 3, label: 'High' },
]
const defaultOption = priorities[0]


const Container = styled('div', props => ({
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ModalBackground = styled('div', props => ({
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0, 0, 0, .5)',
    zIndex: 1
}));

const ModalForm = styled('div', props => ({
    display: 'flex',
    width: '500px',
    background: '#2A2C42',
    flexDirection: 'column',
    padding: '20px 20px',
    border: '1px solid #2A2C42',
    borderRadius: '10px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    zIndex: 2
}));

const TitleContainer = styled('div', props => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    color: '#E5E1DD',
}));

const InputsContainer = styled('div', props => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}));

const TextArea = styled('textarea', props => ({
    resize: 'none',
    display: 'flex',
    width: '98%',
    height: '60px',
    background: '#191A26',
    color: '#E5E1DD',
    fontSize: '15px',
    padding: '5px',
    border: '1px solid #2A2C42',
    borderRadius: '5px',
}));

function Modal({ openModal, addTasks, handleError, tasks, isEditing, updateEditModeState }) {
    const initPriority = 
        isEditing ? priorities.filter(priority => priority.value === isEditing.priority)[0] : defaultOption;
    const initTaskValue = 
        isEditing ? isEditing.text : '';

    const [priority, updatePriority] = useState(initPriority);
    const [task, setTaskValue] = useState(initTaskValue);

    const handleOnChange = event => {
        const { value } = event.target;
        setTaskValue(value);
    };

    const storeTasksInSessionStorage = (tasksToBeStored) => {
        sessionStorage.setItem('storedTasks', JSON.stringify(tasksToBeStored))
    }

    const handleSubmit = () => {
        if (task.length <= 0) return handleError('Task cannot be empty');

        const newTasks = [...tasks, {
            id: uniqid(),
            text: task,
            priority: priority.value
        }]

        storeTasksInSessionStorage(newTasks);
        addTasks(newTasks);

        openModal(false);
    }

    const handleEditSubmit = () => {
        if (task.length <= 0) return handleError('Task cannot be empty');
        const editedTasks = [...tasks];
        editedTasks.forEach(item => {
            if (item.id === isEditing.id) {
                item.text = task;
                item.priority = priority.value;
            }
        });

        storeTasksInSessionStorage(editedTasks);
        addTasks(editedTasks);
        updateEditModeState(false); 

        openModal(false);
    }

    const handleClose = (e) => {
        e.preventDefault();
        openModal(false);
        updateEditModeState(false);
    }

    const handleCancel = (e) => {
        e.stopPropagation();
        openModal(false);
        updateEditModeState(false);
    }

    return (
        <Container>
            <ModalBackground id='modal-background' onClick={handleClose} />
            <ModalForm>
                <TitleContainer>
                    <h2>Add Task!</h2>
                </TitleContainer>

                <InputsContainer>

                    <Dropdown 
                        className='drop-down-container' 
                        controlClassName='drop-down-control'
                        menuClassName='drop-down-menu'
                        options={priorities} 
                        onChange={(e) => updatePriority(e)} 
                        value={priority} 
                    />

                    <TextArea value={task} onChange={handleOnChange} />

                    <ActionsContainer>
                        <Action justify='flex-end'>
                            <Button style={{ marginRight: '10px'}} width='90px' height='40px' onClick={handleCancel}>Cancel</Button>
                            {isEditing 
                            ? <Button background='#D94A22' width='90px' height='40px' onClick={handleEditSubmit}>Done</Button>
                            : <Button background='#3E69F6' width='90px' height='40px' onClick={handleSubmit}>Add</Button>}
                        </Action>
                    </ActionsContainer>
                </InputsContainer>

            </ModalForm>
        </Container>
    );
}

export default Modal;
