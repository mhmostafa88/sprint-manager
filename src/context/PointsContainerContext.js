import { createContext, useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";

export const PointsContainerContext = createContext();

const PointsContainerContextProvider = (props) => {

  const initialState = JSON.parse(localStorage.getItem('PointsContainer')) || [];

  const [PointsContainers, setPointsContainers] = useState(initialState);



  const addPointsContainer = (taskId, empName, points, isComplete) => {
    setPointsContainers([...PointsContainers, { id: uuidv4(), taskId, empName, points, isComplete }]);
  };

  const editPointsContainer = (id, taskId, empName, points, isComplete) => {
    console.log(id);
    const newPointsContainer = PointsContainers.map((PointsContainer) =>
    PointsContainer.id === id ? { id, taskId, empName, points, isComplete } : PointsContainer
    );
    setPointsContainers(newPointsContainer);
  }

  const setCompletedPointsContainer = (id, isComplete) => {
    const newPointsContainer = PointsContainers.map((PointsContainer) =>
    PointsContainer.id === id ? { ...PointsContainer, isComplete:!isComplete } : PointsContainer
    );
    setPointsContainers(newPointsContainer);
  }

  const deletePointsContainer = (taskId) => {
    setPointsContainers(PointsContainers.filter((PointsContainer) => PointsContainer.taskId !== taskId));
  };

  const getPointsContainer = (taskId) => {
    return PointsContainers.find((PointsContainer) => PointsContainer.taskId === taskId)
  }

  const getTaskCompletedPoints  = (taskId) => {
    const x = PointsContainers.find((PointsContainer) => PointsContainer.taskId === taskId)
    if(x && x.isComplete){
      return x.points;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    localStorage.setItem('PointsContainer', JSON.stringify(PointsContainers));
  },[PointsContainers]);

  return (
    <div>
      <PointsContainerContext.Provider
        value={{
            PointsContainers,
            addPointsContainer,
            editPointsContainer,
            deletePointsContainer,
            setCompletedPointsContainer,
            getPointsContainer,
            getTaskCompletedPoints
        }}
      >
        {props.children}
      </PointsContainerContext.Provider>
    </div>
  );
};

export default PointsContainerContextProvider;

