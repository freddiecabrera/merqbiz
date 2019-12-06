import React, {useState} from 'react';
import Dropdown from 'react-dropdown'
import uniqid from 'uniqid';

import { styled } from 'styletron-react';
import 'react-dropdown/style.css'

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
    background: 'rgba(0, 0, 0, .3)'
}));

const ModalForm = styled('div', props => ({
    maxWidth: '350px',
    background: 'white'
}));

const TitleContainer = styled('div', props => ({

}));

const InputsContainer = styled('div', props => ({

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

    const handleClose = () => {
        openModal(false);
        updateEditModeState(false);
    }
    
    console.log(priority, task);

    return (
        <Container>
            <ModalForm>
                <TitleContainer>
                    <h2>Add Task!</h2>
                </TitleContainer>

                <InputsContainer>
                    <div>
                        <Dropdown options={priorities} onChange={(e) => updatePriority(e)} value={priority} placeholder="Select an priority" />
                    </div>

                    <div>
                        <textarea value={task} onChange={handleOnChange} />
                    </div>

                    <div>
                        <button onClick={handleClose}>cancel</button>
                        {isEditing 
                        ? <button onClick={handleEditSubmit}>Done</button>
                        : <button onClick={handleSubmit}>submit</button>}
                    </div>

                </InputsContainer>

            </ModalForm>
        </Container>
    );
}

export default Modal;
