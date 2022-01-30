import { createContext, useState, useEffect, useContext } from 'react';
import { StoriesListContext } from './StoriesListContext';
import axios from 'axios';

export const TasksListContext = createContext();

const TasksListContextProvider = (props) => {
  const { editStoryPoints, findEditStory, storyToEdit } =
    useContext(StoriesListContext);
  const url = `http://localhost:3001/api/v1/tasks/`;

  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [storyPoints, setStoryPoints] = useState(0);

  const getTasks = () => {
    const AssignData = (data) => {
      if (data.status === 200)  {
        setTasks(data.data.tasks);
        console.log(data.data.tasks)
        console.log(tasks)
      }
      

    };
    const getData = (url) => {
      try {
        axios.get(url)
        .then((data) => AssignData(data));
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
    const AssignData = (data) => {
      if (data.status === 200) setTaskToEdit(data.data.task);
    };
    axios.get(`${url}/${id}`).then((data) => AssignData(data));
  };

  const editTask = (
    id,
    storyId,
    title,
    description,
    points,
    employee,
    completed
  ) => {
    debugger
    axios.patch(`${url}/${id}`, {
        storyId: storyId,
        title: title,
        description: description,
        points: points,
        employee: employee,
        completed: completed,
      }).then(getTasks())
      .then(setTaskToEdit(null))
      .then(console.log(storyId, getStoryPoints(storyId), getStoryCompletedPoints(storyId)))
      .then(editStoryPoints(storyId, getStoryPoints(storyId), getStoryCompletedPoints(storyId)))
  };

  const getStoryCompletedPoints = (storyId) => {
    const getStoryCompletedPointsArray = () => {
      const x = tasks.filter((task) => task.storyId === storyId);
      const y = x.map((task) => {
        if (task.completed) {
          return task.points;
        } else {
          return 0;
        }
      });

      return y;
    };

    if (getStoryCompletedPointsArray) {
      var completedStoryPoints = getStoryCompletedPointsArray().reduce(
        function (acc, curr) {
          return acc + curr;
        },
        0
      );
    }

    if (completedStoryPoints) {
      return completedStoryPoints;
    } else {
      return 0;
    }
  };

  const getStoryPoints = (storyId) => {
    const x = tasks.filter((task) => task.storyId === storyId).map(task => task.points);

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
          setTaskToEdit,
          getTasks,
        }}
      >
        {props.children}
      </TasksListContext.Provider>
    </div>
  );
};

export default TasksListContextProvider;
