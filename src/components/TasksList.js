import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Task from "./Task";
import { TaskListContainer } from "./TasksList.style";
import axios from "axios";

const TasksList = ({ storyId, handleIsFormOpen }) => {
  const { stories, editStory } = useContext(GlobalContext);
  const { tasks, getStoryPoints, getStoryCompletedPoints } =
    useContext(GlobalContext);

  const parentStory = stories.find((story) => story._id === storyId);

  const url = `http://localhost:3001/api/v1/tasks/story/${storyId}`;

  const [storyTasks, setStoryTasks] = useState([]);

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
  }, [tasks]);

  const taskList = storyTasks.map((task) => 
    <Task key={task._id} task={task} handleIsFormOpen={handleIsFormOpen} />
  );

  return (
    <TaskListContainer>
      <h3>Tasks</h3>
      {storyTasks.length ? (
        <div>
            <div>
            {taskList}
            </div>
        </div>
      ) : (
        <div>No Tasks</div>
      )}
    </TaskListContainer>
  );
};

export default TasksList;
