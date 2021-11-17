import React, { useContext, useState, useEffect  } from "react";
import { TasksListContext } from "../context/TasksListContext";
import TasksList from "./TasksList";
import {TaskFormContainer} from './TasksForm.style'
import { StyledButton } from "../App.style";
import { StoriesListContext } from "../context/StoriesListContext";

export const TasksForm = ({ storyId, handleIsFormOpen }) => {
    const { addTask, clearTasksList, taskToEdit, editTask } = useContext(TasksListContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pointsEmp1, setPointsEmp1] = useState(0);
    const [pointsEmp2, setPointsEmp2] = useState(0);
    const [pointsEmp3, setPointsEmp3] = useState(0);
    const [pointsEmp4, setPointsEmp4] = useState(0);
    const [isTaskFormVisible, setIsTaskFormVisible] = useState(true);
    const { stories, editStory } = useContext(StoriesListContext);
    const parentStory = stories.find(story => story.id === storyId);

    const { tasks } = useContext(TasksListContext);

    const storyTasks = tasks.filter((task) => task.storyId === storyId);
  if (storyTasks) {
    var storyPoints = storyTasks.reduce(function (acc, curr) {
      return acc + curr.pointsEmp1 + curr.pointsEmp2 + curr.pointsEmp3 + curr.pointsEmp4;
    }, 0)
  }

  useEffect(() => {
    editStory(parentStory.id, parentStory.title, parentStory.description, storyPoints)
  },[storyPoints])

  const handleLocalIsFormOpen = (isOpen) => {
    handleIsFormOpen(isOpen);
    setIsTaskFormVisible(isOpen);
  }

    const handleTitleChange = e => {
        setTitle(e.target.value);
    }
    const handleDescriptionChange = e => {
        setDescription(e.target.value);
    }
    const handlePointsEmp1Change = e => {
        setPointsEmp1(parseInt(e.target.value));
    }
    const handlePointsEmp2Change = e => {
        setPointsEmp2(parseInt(e.target.value));
    }
    const handlePointsEmp3Change = e => {
        setPointsEmp3(parseInt(e.target.value));
    }
    const handlePointsEmp4Change = e => {
        setPointsEmp4(parseInt(e.target.value));
    }



    const handleSubmit = e => {
        e.preventDefault();
        // check if the submit is meant to edit an existing story
        if(!taskToEdit) {
            addTask(storyId, title, description, pointsEmp1, pointsEmp2, pointsEmp3, pointsEmp4, false, false, false, false);

        } else {
            editTask(taskToEdit.id, taskToEdit.storyId, title, description, pointsEmp1, pointsEmp2, pointsEmp3, pointsEmp4, taskToEdit.isComplete1, taskToEdit.isComplete2, taskToEdit.isComplete3, taskToEdit.isComplete4)
        }
        
        setTitle('');
        setDescription('');
        setPointsEmp1('');
        setPointsEmp2('');
        setPointsEmp3('');
        setPointsEmp4('');
    }

    useEffect(() => {
        if(taskToEdit) {
            // we are in the process of editing an item
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setPointsEmp1(taskToEdit.pointsEmp1);
            setPointsEmp2(taskToEdit.pointsEmp2);
            setPointsEmp3(taskToEdit.pointsEmp3);
            setPointsEmp4(taskToEdit.pointsEmp4);
        } else {
            setTitle('');
            setDescription('');
            setPointsEmp1('');
            setPointsEmp2('');
            setPointsEmp3('');
            setPointsEmp4('');
        }
    },[taskToEdit])
    
  return (
    <TaskFormContainer visibility={isTaskFormVisible}>
    {isTaskFormVisible &&
    <> 
    <div className="header">
      <h4>Add new a task</h4> <StyledButton color={'red'}  className="btn--small" onClick={() => handleIsFormOpen(false)}>Cancel</StyledButton>
      </div>
      <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="title"
          value={title}
          name="title"
          onChange={handleTitleChange}
          required
        />
        <input
          type="text"
          name="description"
          value={description}
          placeholder="description"
          onChange={handleDescriptionChange}
          required
        />
        </div>
        <div>
        <input
          type="number"
          name="points"
          value={pointsEmp1}
          placeholder="Ibrahim points"
          onChange={handlePointsEmp1Change}
          required
        />
        <input
          type="number"
          name="points"
          value={pointsEmp2}
          placeholder="Lorand points"
          onChange={handlePointsEmp2Change}
          required
        />
        <input
          type="number"
          name="points"
          value={pointsEmp3}
          placeholder="Mahmoud points"
          onChange={handlePointsEmp3Change}
          required
        />
        <input
          type="number"
          name="points"
          value={pointsEmp4}
          placeholder="Ahmed points"
          onChange={handlePointsEmp4Change}
          required
        />
        <StyledButton color={taskToEdit? '' : 'green'} type='submit'> {taskToEdit ? 'Edit Task' : 'Add Task'}</StyledButton>
        </div>
      </form>
      
    </>
    }
    </TaskFormContainer>
  );
}
