import { createContext, useState, useEffect, useContext } from "react";
import {v4 as uuidv4} from "uuid";
import { PointsContainerContext } from "./PointsContainerContext";

export const TasksListContext = createContext();

const TasksListContextProvider = (props) => {

  const { addPointsContainer, deletePointsContainer, PointsContainers,editPointsContainer, getPointsContainer } = useContext(PointsContainerContext);

  const initialState = JSON.parse(localStorage.getItem('Tasks')) || [];

  const [tasks, setTasks] = useState(initialState);

  const [taskToEdit, setTaskToEdit] = useState("");

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  },[tasks]);


  useEffect(() => {
    localStorage.setItem('PointsContainer', JSON.stringify(PointsContainers))
  })

  const addTask = (storyId, title, description, employee, points) => {
    const newId = uuidv4()
    setTasks([...tasks, { id: newId, storyId, title, description, employee, points }]);
    addPointsContainer(newId, employee, points, false);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    deletePointsContainer(id);
  };

  const clearTasksList = (storyId) => {
    const tasksToDelete = tasks.filter((task) => task.storyId === storyId)
    tasksToDelete.map(task => removeTask(task.id))
  };

  const findEditTask= (id) => {
    const task = tasks.find((task) => task.id === id);
    setTaskToEdit(task);
  };

  const editTask = (id, storyId, title, description, employee, points) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { id, title, storyId, description, employee, points } : task
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
