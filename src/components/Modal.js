import React, {useState} from 'react';
import Dropdown from 'react-dropdown'
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

function Modal({ open, openModal, addTasks, handleError, tasks }) {
    const [priority, updatePriority] = useState({ value: 1, label: 'Low' });

    const [task, setTaskValue] = useState('');

    const handleOnChange = event => {
        const { value } = event.target;
        setTaskValue(value);
    };

    const handleSubmit = () => {
        if (task.length <= 0) return handleError('Please add a task');

        addTasks([...tasks, {
            id: 'ID',
            task,
            priority: priority.value
        }]);

        openModal(false);
    }

    if (!open) return null;

    return (
        <Container>
            <ModalForm>
                <TitleContainer>
                    <h2>Add Task!</h2>
                </TitleContainer>

                <InputsContainer>
                    <div>
                        <Dropdown options={priorities} onChange={(e) => updatePriority(e)} value={defaultOption} placeholder="Select an priority" />
                    </div>

                    <div>
                        <textarea onChange={handleOnChange} />
                    </div>

                    <div>
                        <button onClick={() => openModal(false)}>cancel</button>
                        <button onClick={handleSubmit}>submit</button>
                    </div>

                </InputsContainer>

            </ModalForm>
        </Container>
    );
}

export default Modal;
