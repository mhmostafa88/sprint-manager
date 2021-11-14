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

  const addTask = (storyId, title, description, pointsEmp1, pointsEmp2, pointsEmp3, pointsEmp4) => {
    setTasks([...tasks, { id: uuidv4(), storyId, title, description, pointsEmp1, pointsEmp2, pointsEmp3, pointsEmp4 }]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearTasksList = () => {
    setTasks([]);
  };

  const findEditTask= (id) => {
    const task = tasks.find((task) => task.id === id);
    setTaskToEdit(task);
  };

  const editTask = (id, storyId, title, description, pointsEmp1, pointsEmp2, pointsEmp3, pointsEmp4) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { title, storyId, description, pointsEmp1, pointsEmp2, pointsEmp3, pointsEmp4 } : task
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
          clearTasksList,
          taskToEdit,
          editTask,
          removeTask,
          setTasks,
          findEditTask
        }}
      >
        {props.children}
      </TasksListContext.Provider>
    </div>
  );
};

export default TasksListContextProvider;
