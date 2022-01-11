import React, { useContext, useState } from 'react';
import { StyledButton } from '../App.style';
import { StoriesListContext } from '../context/StoriesListContext';
import { TasksListContext } from '../context/TasksListContext';
import StoriesForm from './StoriesForm';
import { StoryContainer } from './Story.style';
import { TasksForm } from './TasksForm';
import TasksList from './TasksList';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';

const Story = ({ story }) => {
  const { removeStory, findEditStory } = useContext(StoriesListContext);
  const { clearTasksList, tasks, setTasks } = useContext(TasksListContext);
  const [isTaskListOpen, setIsTaskListOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const handleDelete = (storyId) => {
    removeStory(storyId);
    clearTasksList(storyId);
  };
  const handleTasksForm = (isOpen) => {
    setIsTaskFormOpen(isOpen);
  };

  const handleTaskList = (isOpen) => {
    setIsTaskListOpen(isOpen);
  };

  const handleIsFormOpen = (IsFormOpen) => {
    setIsTaskFormOpen(IsFormOpen);
  };

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
          {story.completedPoints > 0 ? `${story.completedPoints}/` : ''}
          {story.points} points)
          {story.completedPoints > 0
            ? Math.floor((story.completedPoints / story.points) * 100) +
              '% completed'
            : ''}
        </h3>

        <div className="action-btns-container">
          <StyledButton
            className="btn--small"
            color={'red'}
            onClick={() => handleDelete(story.id)}
          >
            Delete Story
          </StyledButton>
          <StyledButton
            className="btn--small"
            onClick={() => findEditStory(story.id)}
          >
            Edit Story
          </StyledButton>

          {!isTaskFormOpen && (
            <StyledButton
              className="btn--small"
              color={'green'}
              onClick={() => handleIsFormOpen(true)}
            >
              Add Tasks
            </StyledButton>
          )}
        </div>
      </div>
      <p>{story.description}</p>

      {isTaskFormOpen && (
        <TasksForm storyId={story.id} handleIsFormOpen={handleIsFormOpen} />
      )}
      {isTaskListOpen && (
        <TasksList storyId={story.id} handleIsFormOpen={handleIsFormOpen} />
      )}
    </StoryContainer>
  );
};

export default Story;
