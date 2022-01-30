import React, { useContext, useState } from 'react';
import { StyledButton } from '../App.style';
import { StoriesListContext } from '../context/StoriesListContext';
import { TasksListContext } from '../context/TasksListContext';
import StoriesForm from './StoriesForm';
import { StoryContainer } from './Story.style';
import { TasksForm } from './TasksForm';
import TasksList from './TasksList';
import { FaAngleDoubleDown, FaAngleDoubleUp, FaPen, FaTimes, FaPlus } from 'react-icons/fa';

const Story = ({ story }) => {
  const { removeStory, findEditStory } = useContext(StoriesListContext);
  const { getStoryCompletedPoints, getStoryPoints } = useContext(TasksListContext);
  const { clearTasksList, tasks, setTasks, setTaskToEdit } = useContext(TasksListContext);
  const [isTaskListOpen, setIsTaskListOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [completedPoints, setCompletedPoints] = useState(getStoryCompletedPoints(story._Id));
  const [points, setPoints] = useState(getStoryPoints(story._Id));

  const handleDelete = (storyId) => {

    removeStory(storyId);
    clearTasksList(storyId);
  };

  const handleTaskList = (isOpen) => {
    setIsTaskListOpen(isOpen);
  };

  const handleOpenAddForm = (IsFormOpen) => {
    setTaskToEdit(null);
    setIsTaskFormOpen(IsFormOpen);
  };

  const handleToggleTaskForm = (isTaskFormOpen) => {
    setIsTaskFormOpen(isTaskFormOpen)
  }

  return (
    <StoryContainer>
      <div className="header">
        <h3>
          {!isTaskListOpen && (
            <FaAngleDoubleDown onClick={() => handleTaskList(true)} />
          )}
          {isTaskListOpen && (
            <FaAngleDoubleUp onClick={() => handleTaskList(false)} />
          )}
          {story.title} (
          {story.completedPoints > 0 ? `${completedPoints}/` : ''}
          {story.points} points)
          {story.completedPoints > 0
            ? Math.floor((completedPoints / points) * 100) +
              '% completed'
            : ''}
        </h3>

        <div className="action-btns-container">
        {!isTaskFormOpen && (
            <StyledButton
              className="btn--small"
              color={'green'}
              onClick={() => handleOpenAddForm(true)}
            >
              <FaPlus />
            </StyledButton>
          )}
          <StyledButton
            className="btn--small"
            onClick={() => findEditStory(story._id)}
          >
            <FaPen />
          </StyledButton>

          
          <StyledButton
            className="btn--small"
            color={'red'}
            onClick={() => handleDelete(story._id)}
          >
            <FaTimes />
          </StyledButton>
        </div>
      </div>
      <p>{story.description}</p>

      {isTaskFormOpen && (
        <TasksForm storyId={story._id} handleIsFormOpen={handleToggleTaskForm} />
      )}
      {isTaskListOpen && (
        <TasksList storyId={story._id} handleIsFormOpen={handleToggleTaskForm} />
      )}
    </StoryContainer>
  );
};

export default Story;
