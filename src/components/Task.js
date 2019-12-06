import React from 'react';
import { styled } from 'styletron-react';

const Div = styled('div', props => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

function Task({ task, removeTasks, updateEditModeState, openModal }) {
    const { text, id } = task;

    const handleEdit = () => {
        updateEditModeState(task);
    }

    return (
        <Div key={id}>
            <span>{text}</span>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => removeTasks(id)}>Delete</button>
        </Div>
    );
}

export default Task;