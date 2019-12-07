import React from 'react';
import { styled } from 'styletron-react';

const Div = styled('div', props => ({
  display: 'flex',
  height: '40px',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1A1B27',
  color: '#E5E1DD',
  margin: '5px 0',
  border: '1px solid transparent',
  borderRadius: '5px',
  padding: '5px 5px 5px 10px',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  cursor: 'pointer'
}));

const TextContainer = styled('div', props => ({
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    flex: 1
}));

export const Button = styled('button', props => ({
    color: 'white',
    background: props.background || '#E73B58',
    border: `1px solid ${props.background || '#E73B58'}`,
    borderRadius: '5px',
    height: props.height || '100%',
    width: props.width || '60px',
}));



function Task({ task, removeTasks, updateEditModeState }) {
    const { text, id } = task;

    const handleEdit = (e) => {
        e.preventDefault();
        updateEditModeState(task)
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        removeTasks(id)
    }

    return (
        <Div onClick={handleEdit} key={id}>
            <TextContainer>
                <span>{text}</span>
            </TextContainer>
            <Button onClick={handleDelete}>Delete</Button>
        </Div>
    );
}

export default Task;