import React from 'react';
import { styled } from 'styletron-react';

const Div = styled('div', props => ({
  display: 'flex',
  height: '40px',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1A1B27',
  color: 'white',
  margin: '5px 0',
  border: '1px solid transparent',
  borderRadius: '5px',
  padding: '5px 5px 5px 10px',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)'
}));

const TextContainer = styled('div', props => ({
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    flex: 1
}));

const EditButton = styled('button', props => ({
    color: 'white',
    background: '#2502FF',
    border: '1px solid #2502FF',
    borderRadius: '5px',
    height: '100%',
    width: '60px',
    marginRight: '5px'
}));

const DeleteButton = styled('button', props => ({
    color: 'white',
    background: '#E73B58',
    border: '1px solid #E73B58',
    borderRadius: '5px',
    height: '100%',
    width: '60px'
}));



function Task({ task, removeTasks, updateEditModeState }) {
    const { text, id } = task;

    return (
        <Div key={id}>
            <TextContainer>
                <span>{text}</span>
            </TextContainer>
            <EditButton onClick={() => updateEditModeState(task)}>Edit</EditButton>
            <DeleteButton onClick={() => removeTasks(id)}>Delete</DeleteButton>
        </Div>
    );
}

export default Task;