import React, { useContext, useEffect, useState } from 'react';
import { PointsContainerContext } from '../context/PointsContainerContext';
import { StoriesListContext } from '../context/StoriesListContext';
import { TasksListContext } from '../context/TasksListContext';
import Task from './Task';
import { TaskListContainer } from './TasksList.style';
import axios from 'axios';

const TasksList = ({ storyId, handleIsFormOpen }) => {

  const { stories, editStory } = useContext(StoriesListContext);
  const { getStoryPoints, getStoryCompletedPoints } = useContext(TasksListContext);

  const parentStory = stories.find((story) => story._id === storyId);

  const url = `http://localhost:3001/api/v1/tasks/story/${storyId}`;

  const [storyTasks, setStoryTasks] = useState([]);
  const [storyPoints, setStoryPoints] = useState(parentStory.points);
  const [completedStoryPoints, setCompletedStoryPoints] = useState(getStoryCompletedPoints(storyId));

  const getStoryTasks = () => {
    const AssignData = (data) => {
      if (data.status === 200) setStoryTasks(data.data.tasks);
    };
    const getData = (url) => {
      try {
        axios.get(url).then((data) => AssignData(data));
      } catch (err) {
        console.error(err);
        process.exitCode = 1;
      }
    };

    return getData(url);
  };

  useEffect(() => {
    getStoryTasks();
  }, []);

  async function addTask(
    storyId,
    title,
    description,
    employee,
    points,
    completed
  ) {
    axios
      .post(url, {
        storyId,
        title,
        description,
        employee,
        points,
        completed,
      })
      .then(getStoryTasks())
      .then(setStoryPoints(getStoryPoints(storyId)))
      .then(setCompletedStoryPoints(getStoryCompletedPoints(storyId)));
  }

  useEffect(() => {
    editStory(
      parentStory._id,
      parentStory.title,
      parentStory.description,
      storyPoints,
      completedStoryPoints
    );
  }, [storyPoints]);

  useEffect(() => {
    editStory(
      parentStory._id,
      parentStory.title,
      parentStory.description,
      storyPoints,
      completedStoryPoints
    );
  }, [completedStoryPoints]);

  return (
    <TaskListContainer>
      <h3>Tasks</h3>
      {storyTasks.length ? (
        <div>
          {storyTasks.map((task) => {
            return (
              <Task
                task={task}
                key={task.id}
                handleIsFormOpen={handleIsFormOpen}
              />
            );
          })}
        </div>
      ) : (
        <div>No Tasks</div>
      )}
    </TaskListContainer>
  );
};

export default TasksList;
