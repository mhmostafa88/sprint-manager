import React, { useContext, useState, useEffect  } from "react";
import { TasksListContext } from "../context/TasksListContext";
import TasksList from "./TasksList";


export const TasksForm = ({ storyId }) => {
    const { addTask, clearTasksList, taskToEdit, editTask } = useContext(TasksListContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pointsEmp1, setPointsEmp1] = useState('');
    const [pointsEmp2, setPointsEmp2] = useState('');
    const [pointsEmp3, setPointsEmp3] = useState('');
    const [pointsEmp4, setPointsEmp4] = useState('');

    const handleTitleChange = e => {
        setTitle(e.target.value);
    }
    const handleDescriptionChange = e => {
        setDescription(e.target.value);
    }
    const handlePointsEmp1Change = e => {
        setPointsEmp1(e.target.value);
    }
    const handlePointsEmp2Change = e => {
        setPointsEmp2(e.target.value);
    }
    const handlePointsEmp3Change = e => {
        setPointsEmp3(e.target.value);
    }
    const handlePointsEmp4Change = e => {
        setPointsEmp4(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        // check if the submit is meant to edit an existing story
        if(!taskToEdit) {
            addTask(storyId, title, description, pointsEmp1, pointsEmp2, pointsEmp3, pointsEmp4)
        } else {
            editTask(taskToEdit.id, title, description, pointsEmp1, pointsEmp2, pointsEmp3, pointsEmp4)
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
    <div>
      <h1>Insert Tasks</h1>
      <form onSubmit={handleSubmit}>
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
        <input
          type="text"
          name="points"
          value={pointsEmp1}
          placeholder="points"
          onChange={handlePointsEmp1Change}
          required
        />
        <input
          type="text"
          name="points"
          value={pointsEmp2}
          placeholder="points"
          onChange={handlePointsEmp2Change}
          required
        />
        <input
          type="text"
          name="points"
          value={pointsEmp3}
          placeholder="points"
          onChange={handlePointsEmp3Change}
          required
        />
        <input
          type="text"
          name="points"
          value={pointsEmp4}
          placeholder="points"
          onChange={handlePointsEmp4Change}
          required
        />
        <button type='submit'> {taskToEdit ? 'Edit Task' : 'Add Task'}</button>
        <button onClick={clearTasksList}>Clear</button>
      </form>
      <TasksList storyId={storyId}/>
    </div>
  );
}
