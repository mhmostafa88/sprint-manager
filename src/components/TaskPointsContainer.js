import React, { useContext, useState } from "react";
import { TaskPointsCard } from "./Task.style";
import { TasksListContext } from '../context/TasksListContext';
function TaskPointsContainer({ task }) {

const { editTask } = useContext(TasksListContext);
const [completed, setCompleted] = useState(task.isComplete);

const handleCLick = () => {
  setCompleted(!completed)
  editTask(task._id, task.storyId, task.title, task.description, task.points, task.employee, completed)
}

  return (
    <TaskPointsCard isComplete={completed} onClick={handleCLick}>
      <div> {task.employee} </div>
      <div> {task.points} points</div>
    </TaskPointsCard>
  );
}

export default TaskPointsContainer;
