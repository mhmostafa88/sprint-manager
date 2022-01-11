import React, { useContext, useState } from "react";
import { PointsContainerContext } from "../context/PointsContainerContext";
import { TaskPointsCard } from "./Task.style";

function TaskPointsContainer({id, taskId, empName, points, isComplete}) {

    // const {id, taskId, empName, points} = PointsContainer;

const { setCompletedPointsContainer } = useContext(PointsContainerContext);



const [completed, setCompleted] = useState(isComplete);


const handleCLick = () => {
  setCompleted(!completed)
  setCompletedPointsContainer(id, completed)
}

  return (
    <TaskPointsCard isComplete={completed} onClick={handleCLick}>
      <div> {empName} </div>
      <div> {points} points</div>
    </TaskPointsCard>
  );
}

export default TaskPointsContainer;
