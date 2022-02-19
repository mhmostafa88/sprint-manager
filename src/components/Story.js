import React, { useContext, useState, useEffect, useCallback } from 'react';
import { StyledButton } from '../App.style';
import { GlobalContext } from '../context/GlobalContext';
import StoriesForm from './StoriesForm';
import { StoryContainer } from './Story.style';
import { TasksForm } from './TasksForm';
import TasksList from './TasksList';
import { FaAngleDoubleDown, FaAngleDoubleUp, FaPen, FaTimes, FaPlus } from 'react-icons/fa';

const Story = ({ story }) => {
  const { removeStory, findEditStory } = useContext(GlobalContext);
  const { getStoryCompletedPoints, getStoryPoints, editStoryPoints } = useContext(GlobalContext);
  const { clearTasksList, tasks, setTasks, setTaskToEdit } = useContext(GlobalContext);
  const [isTaskListOpen, setIsTaskListOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [completedPoints, setCompletedPoints] = useState(getStoryCompletedPoints(story._id));
  const [points, setPoints] = useState(getStoryPoints(story._id));

  const handleChangeStoryPoints = useCallback(
    () => {
      const storyTasks = tasks.filter((task) => task.storyId === story._id);
      if (storyTasks.length > 0) {
        setPoints(storyTasks.reduce(function (acc, curr) {
          return acc + curr.points;
        }, 0));
      } else {
        setPoints(storyTasks.points);
      }
    },[tasks],
  )

  useEffect(() => {
    handleChangeStoryPoints();
    setCompletedPoints(getStoryCompletedPoints(story._id));
    console.log('works')
  }, [tasks])

  useEffect(() => {
    editStoryPoints(
      story._id,
      points,
      completedPoints
    );
  }, [points]);

  useEffect(() => {
    editStoryPoints(
      story._id,
      points,
      completedPoints
    );
  },[completedPoints])

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
          {story.completedPoints ? `${completedPoints}/` : ''}
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
        <TasksForm storyId={story._id} handleIsFormOpen={handleToggleTaskForm} handleChangeStoryPoints={handleChangeStoryPoints}/>
      )}
      {isTaskListOpen && (
        <TasksList storyId={story._id} handleIsFormOpen={handleToggleTaskForm} />
      )}
    </StoryContainer>
  );
};

export default Story;
