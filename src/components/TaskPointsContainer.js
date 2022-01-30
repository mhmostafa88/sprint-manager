import React, { useContext, useState } from "react";
import { TaskPointsCard } from "./Task.style";
import { GlobalContext } from '../context/GlobalContext';
function TaskPointsContainer({ task }) {

const { editTask } = useContext(GlobalContext);
const [completed, setCompleted] = useState(task.completed);

const handleCLick = () => {
  setCompleted(completed => !completed);
  editTask(task._id, task.storyId, task.title, task.description, task.points, task.employee, !completed)
}

  return (
    <TaskPointsCard isComplete={completed} onClick={handleCLick}>
      <div> {task.employee} </div>
      <div> {task.points} points</div>
    </TaskPointsCard>
  );
}

export default TaskPointsContainer;
