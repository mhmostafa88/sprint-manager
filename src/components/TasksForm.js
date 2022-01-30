import React, { useContext, useState, useEffect } from 'react';
import { TaskFormContainer } from './TasksForm.style';
import { StyledButton } from '../App.style';
import { GlobalContext } from '../context/GlobalContext';
import { FaPen, FaPlus, FaTimes } from 'react-icons/fa';
import axios from 'axios';

export const TasksForm = ({ storyId, handleIsFormOpen, handleChangeStoryPoints }) => {
  const { tasks,  getTasks, taskToEdit,  setTaskToEdit , editTask } =
    useContext(GlobalContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(0);
  
  const [employee, setEmployee] = useState('');

  const [isTaskFormVisible, setIsTaskFormVisible] = useState(true);
  const { stories, editStory, editStoryPoints } = useContext(GlobalContext);
  const parentStory = stories.find((story) => story._id === storyId);

  

  const url = `http://localhost:3001/api/v1/tasks`;

  async function addTask(
    storyId,
    title,
    description,
    employee,
    points,
  ) {
    axios
      .post(url, {
        storyId,
        title,
        description,
        employee,
        points,
      }).then(getTasks());
  }

  const handleLocalIsFormOpen = (isOpen) => {
    handleIsFormOpen(isOpen);
    setIsTaskFormVisible(isOpen);
    if(!isOpen) {
      setTaskToEdit(null);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePointsChange = (e) => {
    setPoints(parseInt(e.target.value));
  };

  const handleEmployeeChange = (e) => {
    setEmployee(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if the submit is meant to edit an existing task
    if (!taskToEdit) {
      addTask(storyId, title, description, employee, points);
    } else {
      editTask(
        taskToEdit._id,
        taskToEdit.storyId,
        title,
        description,
        points,
        employee,
        taskToEdit.completed
      );
    }

    handleChangeStoryPoints();

    setTitle('');
    setDescription('');
    setPoints(0);
    setEmployee('');
  };

  useEffect(() => {
    if (taskToEdit) {
      // we are in the process of editing an item
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setEmployee(taskToEdit.employee);
      setPoints(taskToEdit.points);
    } else {
      setTitle('');
      setDescription('');
      setEmployee('');
      setPoints(0);
    }
  }, [taskToEdit]);

  return (
    <TaskFormContainer visibility={isTaskFormVisible}>
      {isTaskFormVisible && (
        <>
          <div className="header">
            <h4>{taskToEdit ? 'Edit Task' : 'Add a new task'}</h4>{' '}
            <StyledButton
              color={'red'}
              className="btn--small"
              onClick={() => handleLocalIsFormOpen(false)}
            >
              <FaTimes />
            </StyledButton>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="title"
                value={title}
                name="title"
                onChange={handleTitleChange}
                required
              />
              <input
                type="text"
                name="description"
                value={description}
                placeholder="description"
                onChange={handleDescriptionChange}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="points"
                value={employee}
                placeholder={'employee'}
                onChange={handleEmployeeChange}
                required
              />
              <label>points</label>
              <input
                type="number"
                name="points"
                value={points}
                placeholder={'points'}
                onChange={handlePointsChange}
                required
              />
              <StyledButton className="btn--med " color={taskToEdit ? '' : 'green'} type="submit">
                {' '}
                {taskToEdit ? <FaPen /> : <FaPlus />}

              </StyledButton>
            </div>
          </form>
        </>
      )}
    </TaskFormContainer>
  );
};
