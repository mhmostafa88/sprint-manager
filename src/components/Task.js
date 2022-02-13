import React, { useContext, useState } from 'react';
import { StyledButton } from '../App.style';
import { GlobalContext } from '../context/GlobalContext';
import { StoryContainer } from './Story.style';
import { TasksForm } from './TasksForm';
import { TaskContainer } from './TasksList.style';
import TaskPointsContainer from './TaskPointsContainer';
import { FaAngleDoubleDown, FaAngleDoubleUp, FaPen, FaTimes, FaPlus } from 'react-icons/fa';

const Task = ({ task, handleIsFormOpen }) => {
  const { removeTask, findEditTask } = useContext(GlobalContext);
  const handleLocalIsFormOpen = (isOpen, taskId) => {
    handleIsFormOpen(isOpen);
    findEditTask(taskId);
  };

  return (
    <>
      <TaskContainer>
        <div className="header">
          <div className="task__title">Title: {task.title}</div>
          <StyledButton
            className="btn--small"
            color={'red'}
            onClick={() => removeTask(task._id)}
          >
            <FaTimes />
          </StyledButton>
          <StyledButton
            className="btn--small"
            onClick={() => handleLocalIsFormOpen(true, task._id)}
          >
            <FaPen />
          </StyledButton>
        </div>
        <div className="task__description">Description: {task.description}</div>
        <div className="task__points__Container">
          <TaskPointsContainer
            task={task}
          />
        </div>
      </TaskContainer>
    </>
  );
};

export default Task;
