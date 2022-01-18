import React, { useContext, useState, useEffect } from 'react';
import { TasksListContext } from '../context/TasksListContext';
import TasksList from './TasksList';
import { TaskFormContainer } from './TasksForm.style';
import { StyledButton } from '../App.style';
import { StoriesListContext } from '../context/StoriesListContext';
import { PointsContainerContext } from '../context/PointsContainerContext';
import { FaPen, FaPlus, FaTimes } from 'react-icons/fa';

export const TasksForm = ({ storyId, handleIsFormOpen }) => {
  const { tasks, addTask, clearTasksList, taskToEdit, editTask } =
    useContext(TasksListContext);
    const {editPointsContainer, getPointsContainer} = useContext(PointsContainerContext)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(0);
  
  const [employee, setEmployee] = useState('');

  const [isTaskFormVisible, setIsTaskFormVisible] = useState(true);
  const { stories, editStory } = useContext(StoriesListContext);
  const parentStory = stories.find((story) => story.id === storyId);
  const [storyPoints, setStoryPoints] = useState(parentStory.points)

  const handleLocalIsFormOpen = (isOpen) => {
    handleIsFormOpen(isOpen);
    setIsTaskFormVisible(isOpen);
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
    // check if the submit is meant to edit an existing story
    if (!taskToEdit) {
      addTask(storyId, title, description, employee, points);
    } else {
      editTask(
        taskToEdit.id,
        taskToEdit.storyId,
        title,
        description,
        employee,
        points
      );
      const pointsContainer = getPointsContainer(taskToEdit.id)
      editPointsContainer(pointsContainer.id, taskToEdit.id,employee,points,pointsContainer.isComplete  )
    }

    handleChangeStoryPoints();

    setTitle('');
    setDescription('');
    setPoints(0);
    setEmployee('');
  };

  const handleChangeStoryPoints = () => {
    const storyTasks = tasks.filter((task) => task.storyId === storyId);
    if (storyTasks.length > 1) {
      setStoryPoints(storyTasks.reduce(function (acc, curr) {
        return acc + curr.points;
      }, 0));
    } else {
      setStoryPoints(storyTasks.points);
    }
  }

  useEffect(() => {
    handleChangeStoryPoints();
    editStory(
      parentStory.id,
      parentStory.title,
      parentStory.description,
      storyPoints
    );
  }, [storyPoints]);

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
              onClick={() => handleIsFormOpen(false)}
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
