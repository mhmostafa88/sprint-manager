import React, { useContext, useState } from 'react';
import { StyledButton } from '../App.style';
import { TasksListContext } from '../context/TasksListContext';
import { StoryContainer } from './Story.style';
import { TasksForm } from './TasksForm';
import { TaskContainer } from './TasksList.style';
import TaskPointsContainer from './TaskPointsContainer';
import { PointsContainerContext } from '../context/PointsContainerContext';
import { FaAngleDoubleDown, FaAngleDoubleUp, FaPen, FaTimes, FaPlus } from 'react-icons/fa';

const Task = ({ task, handleIsFormOpen }) => {
  const { removeTask, findEditTask } = useContext(TasksListContext);
  const { PointsContainers } = useContext(PointsContainerContext);

  // get the list of points containers for this task
  const PointsContainer = PointsContainers.find(
    (taskPointsContainer) => taskPointsContainer.taskId === task.id
  );


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
            onClick={() => removeTask(task.id)}
          >
            <FaTimes />
          </StyledButton>
          <StyledButton
            className="btn--small"
            onClick={() => handleLocalIsFormOpen(true, task.id)}
          >
            <FaPen />
          </StyledButton>
        </div>
        <div className="task__description">Description: {task.description}</div>
        <div className="task__points__Container">
        {PointsContainer && 
          <TaskPointsContainer
            id={PointsContainer.id}
            taskId={task.id}
            empName={PointsContainer.empName}
            points={PointsContainer.points}
            isComplete={PointsContainer.isComplete}
            key={PointsContainer.id}
          />

        }
          
        </div>
      </TaskContainer>
    </>
  );
};

export default Task;
