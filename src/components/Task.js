import React, { useState } from 'react';
import { styled } from 'styletron-react';

const Div = styled('div', props => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

function Task({ task, removeTasks }) {
    const { text, id } = task;
    return (
        <Div key={id}>
            <span>{text}</span>
            <button onClick={() => removeTasks(id)}>Delete</button>
        </Div>
    );
}

export default Task;
