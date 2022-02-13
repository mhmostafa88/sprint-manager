import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {

  axios.defaults.headers = {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  const url = 'http://localhost:3001/api/v1/';

  const [stories, setStories] = useState([]);
  
  const getStoriesList = () => {
    const AssignData = (data) => {
      if (data.status === 200) setStories(data.data.stories);
    };
    const getData = (url) => {
      try {
        axios.get(url).then((data) => AssignData(data));
      } catch (err) {
        console.error(err);
        process.exitCode = 1;
      }
    };

    return getData(`${url}stories`);
  };

  useEffect(() => {
    getStoriesList();
  }, []);

  // const initialState = getInitialStoriesList().then(output => console.log(output.data['stories']))

  const [storyToEdit, setstoryToEdit] = useState('');

  async function addStory(title, description, points, completedPoints) {
    axios
      .post(url, {
        title,
        description,
        points,
        completedPoints,
      })
      .then(getStoriesList());
  }

  const removeStory = (id) => {
    axios.delete(`${url}stories/${id}`).then(getStoriesList());
  };

  const clearStoriesList = () => {
    setStories([]);
  };

  const findEditStory = (id) => {
    const AssignData = (data) => {
      if (data.status === 200) setstoryToEdit(data.data.story);
    };
    axios.get(`${url}stories/${id}`).then((data) => AssignData(data));
  };

  const editStory = (id, title, description) => {

    axios.patch(`${url}stories/${id}`, {
      id,
      title,
      description,
    }).then(setstoryToEdit(null))
    .then(getStoriesList());
  };

  const editStoryPoints = (id, points, completedPoints) => {

    axios.patch(`${url}stories/${id}`, {
      points,
      completedPoints,
    }).then(setstoryToEdit(null))
    .then(getStoriesList());
  };


  // tasks context

  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [storyPoints, setStoryPoints] = useState(0);

  const getTasks = () => {
    const AssignData = (data) => {
      if (data.status === 200)  {
        setTasks(data.data.tasks);
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

    return getData(`${url}tasks`);
  };

  useEffect(() => {
    console.log('tasks',tasks)
  }, [tasks]);

  useEffect(() => {
    getTasks();
  }, []);

  const removeTask = (id) => {
    axios.delete(`${url}tasks/${id}`).then(getTasks());
  };

  const removeStoryTasks = (storyId) => {
    axios.delete(`${url}tasks/story/${storyId}`).then(getTasks());
  };

  const findEditTask = (id) => {
    const AssignData = (data) => {
      if (data.status === 200) setTaskToEdit(data.data.task);
    };
    axios.get(`${url}tasks/${id}`).then((data) => AssignData(data));
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
    axios.patch(`${url}tasks/${id}`, {
        storyId: storyId,
        title: title,
        description: description,
        points: points,
        employee: employee,
        completed: completed,
      }).then(getTasks())
      .then(setTaskToEdit(null))
  };

  const getStoryCompletedPoints = useCallback(
    (storyId) => {
      console.log('starting getStoryCompletedPoints')
      console.log('tasks when getting story completed points: ',tasks)
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
    },[tasks]

  )

  const getStoryPoints = useCallback(

    (storyId) => {
      const x = tasks.filter((task) => task.storyId === storyId).map(task => task.points);
  
      if (x) {
        const storyPoints = x.reduce(function (acc, curr) {
          return acc + curr;
        }, 0);
        return storyPoints;
      } else {
        return 0;
      }
    },[tasks]
  )


  return (
    <div>
      <GlobalContext.Provider
        value={{
          stories,
          addStory,
          removeStory,
          clearStoriesList,
          findEditStory,
          editStory,
          editStoryPoints,
          storyToEdit,
          getStoriesList,
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
          getTasks
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    </div>
  );
};

export default GlobalContextProvider;
