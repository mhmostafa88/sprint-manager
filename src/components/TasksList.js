import React, { useContext, useEffect } from "react";
import { StoriesListContext } from "../context/StoriesListContext";
import { TasksListContext } from "../context/TasksListContext";
import Task from "./Task";
import { TaskListContainer } from "./TasksList.style";

const TasksList = ({ storyId, handleIsFormOpen }) => {
  const { tasks } = useContext(TasksListContext);
  const { stories, editStory } = useContext(StoriesListContext);
  const parentStory = stories.find(story => story.id === storyId);
  
  const storyTasks = tasks.filter((task) => task.storyId === storyId);

  if (storyTasks) {
    var storyPoints = storyTasks.reduce(function (acc, curr) {
      return acc + curr.pointsEmp1 + curr.pointsEmp2 + curr.pointsEmp3 + curr.pointsEmp4;
    }, 0)
  }
  
  useEffect(() => {
    editStory(parentStory.id, parentStory.title, parentStory.description, storyPoints)
  },[storyPoints])

  return (
    <TaskListContainer>
      <h3>Tasks</h3>
      {storyTasks.length ? (
        <div>
          {storyTasks.map((task) => {
            return <Task task={task} key={task.id} handleIsFormOpen={handleIsFormOpen} />;
          })}
          
        </div>
      ) : (
        <div>No Tasks</div>
      )}
    </TaskListContainer>
  );
};

export default TasksList;
