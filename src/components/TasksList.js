import React, { useContext, useEffect } from "react";
import { StoriesListContext } from "../context/StoriesListContext";
import { TasksListContext } from "../context/TasksListContext";
import Task from "./Task";

const TasksList = ({ storyId }) => {
  const { tasks } = useContext(TasksListContext);
  const { stories, editStory } = useContext(StoriesListContext);
  const parentStory = stories.find(story => story.id === storyId);
  
  

  const storyTasks = tasks.filter((task) => task.storyId === storyId);
  console.log("the tasks for story id: ",storyId, "are " + storyTasks);
  var storyPoints = 0;
  if (storyTasks) {
    storyPoints = storyTasks.reduce(function (acc, curr) {
      return acc + curr.pointsEmp1 + curr.pointsEmp2 + curr.pointsEmp3 + curr.pointsEmp4;
    }, 0)
  }
  
  useEffect(() => {
    editStory(parentStory.id, parentStory.title, parentStory.description, storyPoints)
  },[storyPoints])

  return (
    <div>
      {tasks.length && (
        <div>
        Story Points:  
          {storyPoints}
        </div>
      )}
      {storyTasks.length ? (
        <ul>
          {storyTasks.map((task) => {
            return <Task task={task} key={task.id} />;
          })}
        </ul>
      ) : (
        <div>No Tasks</div>
      )}
    </div>
  );
};

export default TasksList;
