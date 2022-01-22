import { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PointsContainerContext } from './PointsContainerContext';
import axios from 'axios';

export const TasksListContext = createContext();

const TasksListContextProvider = (props) => {
  const {
    addPointsContainer,
    deletePointsContainer,
    PointsContainers,
    editPointsContainer,
    getPointsContainer,
  } = useContext(PointsContainerContext);

  const url = `http://localhost:3001/api/v1/tasks/`;

  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState({});

  const getTasks = () => {
    const AssignData = (data) => {
      if (data.status === 200) setTasks(data.data.tasks);
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
    getTasks();
  }, []);

  const removeTask = (id) => {
    axios.delete(`${url}/${id}`).then(getTasks());
  };

  const removeStoryTasks = (storyId) => {
    axios.delete(`${url}/story/${storyId}`).then(getTasks());
  };

  const findEditTask = (id) => {
    const task = tasks.find((task) => task._id === id);
    setTaskToEdit(task);
  };

  const editTask = (
    id,
    storyId,
    title,
    description,
    employee,
    points,
    completed
  ) => {
    axios
      .patch(`${url}/${id}`, {
        id,
        storyId,
        title,
        description,
        points,
        employee,
        completed,
      })
      .then(getTasks())
      .then(setTaskToEdit(null));
  };

  const getStoryCompletedPoints = (storyId) => {
    const getStoryCompletedPointsArray = () => {
      const x = tasks.filter((task) => task.storyId === storyId);
      if (x && x.isComplete) {
        return x.points;
      } else {
        return 0;
      }
    };

    if (getStoryCompletedPointsArray) {
      var completedStoryPoints = getStoryCompletedPointsArray.reduce(function (
        acc,
        curr
      ) {
        return acc + curr;
      },
      0);
    }

    if (completedStoryPoints) {
      return completedStoryPoints;
    } else {
      return 0;
    }
  };

  const getStoryPoints = (storyId) => {
    const x = tasks.filter((task) => task.storyId === storyId);
    if (x) {
      const storyPoints = x.reduce(function (acc, curr) {
        return acc + curr;
      }, 0);
      return storyPoints;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <TasksListContext.Provider
        value={{
          tasks,
          removeStoryTasks,
          taskToEdit,
          editTask,
          removeTask,
          setTasks,
          findEditTask,
          getStoryPoints,
          getStoryCompletedPoints,
        }}
      >
        {props.children}
      </TasksListContext.Provider>
    </div>
  );
};

export default TasksListContextProvider;
