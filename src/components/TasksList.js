import React, { useContext, useEffect } from "react";
import { PointsContainerContext } from "../context/PointsContainerContext";
import { StoriesListContext } from "../context/StoriesListContext";
import { TasksListContext } from "../context/TasksListContext";
import Task from "./Task";
import { TaskListContainer } from "./TasksList.style";

const TasksList = ({ storyId, handleIsFormOpen }) => {
  const { tasks } = useContext(TasksListContext);
  const { getPointsContainer, getTaskCompletedPoints } = useContext(PointsContainerContext)
  const { stories, editStory } = useContext(StoriesListContext);
  const parentStory = stories.find(story => story.id === storyId);
  
  const storyTasks = tasks.filter((task) => task.storyId === storyId);
  
  const storyCompletedPoints = storyTasks.map((task) => getTaskCompletedPoints(task.id))

  if (storyCompletedPoints) {
    var completedStoryPoints = storyCompletedPoints.reduce(function (acc, curr) {
      return acc + curr;
    }, 0)
  }

  if (storyTasks) {
    var storyPoints = storyTasks.reduce(function (acc, curr) {
      return acc + curr.points;
    }, 0)
  }
  
  useEffect(() => {
    editStory(parentStory.id, parentStory.title, parentStory.description, storyPoints, completedStoryPoints)
  },[storyPoints])

  useEffect(() => {
    editStory(parentStory.id, parentStory.title, parentStory.description, storyPoints, completedStoryPoints)
  },[completedStoryPoints])

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
