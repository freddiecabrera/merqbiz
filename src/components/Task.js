import React, { useEffect } from 'react';
import { styled } from 'styletron-react';
import {motion, useAnimation} from 'framer-motion';

const Div = styled(motion.div, props => ({
  opacity: 0,
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



function Task({ task, removeTasks, updateEditModeState, layoutTransition }) {
    const controls = useAnimation();
    const { text, id } = task;

    const handleEdit = (e) => {
        e.preventDefault();
        updateEditModeState(task)
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        fadeAnimation(0).then(() => removeTasks(id));
    }
    
    
    const fadeAnimation = async (opacity) => {
        await controls.start({
            opacity,
            transition: { duration: .5, ease: opacity ? 'easeIn' : 'easeOut' }
        });
    }

    useEffect(() => {
        fadeAnimation(1)
    }, []);

    return (
        <Div
            layoutTransition={layoutTransition}
            animate={controls}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }} 
            onClick={handleEdit} 
            key={id}>
            <TextContainer>
                <span>{text}</span>
            </TextContainer>
            <Button onClick={handleDelete}>Delete</Button>
        </Div>
    );
}

export default Task;