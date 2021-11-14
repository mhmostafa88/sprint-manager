import { createContext, useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";

export const TasksListContext = createContext();

const TasksListContextProvider = (props) => {

  const initialState = JSON.parse(localStorage.getItem('Tasks')) || [];

  const [tasks, setTasks] = useState(initialState);

  const [taskToEdit, setTaskToEdit] = useState("");

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  },[tasks]);

  const addTask = (storyId, title, description, points) => {
    setTasks([...tasks, { id: uuidv4(), storyId, title, description, points }]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearTasksList = () => {
    setTasks([]);
  };

  const findEditStory = (id) => {
    const story = tasks.find((task) => task.id === id);
    setTaskToEdit(story);
  };

  const editStory = (id, title, description, points) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { title, description, points } : task
    );

    setTasks(newTasks);
    setTaskToEdit(null);
  };

  return (
    <div>
      <TasksListContext.Provider
        value={{
          tasks,
          addTask,
          removeTask,
          clearTasksList,
          findEditStory,
          editStory,
          taskToEdit,
        }}
      >
        {props.children}
      </TasksListContext.Provider>
    </div>
  );
};

export default TasksListContextProvider;
