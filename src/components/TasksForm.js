import React, { useContext, useState, useEffect  } from "react";
import { TasksListContext } from "../context/TasksListContext";

export const TasksForm = () => {
    const { clearTasksList, taskToEdit, editTask } = useContext(TasksListContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState('');

    const handleTitleChange = e => {
        setTitle(e.target.value);
    }
    const handleDescriptionChange = e => {
        setDescription(e.target.value);
    }
    const handlePointsChange = e => {
        setPoints(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        // check if the submit is meant to edit an existing story
        if(!taskToEdit) {
            addTask(title, description, points)
        } else {
            editTask(taskToEdit.id,title, description, points)
        }
        
        setTitle('');
        setDescription('');
        setPoints('');
    }

    useEffect(() => {
        if(taskToEdit) {
            // we are in the process of editing an item
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setPoints(taskToEdit.points);
        } else {
            setTitle('');
            setDescription('');
            setPoints('');
        }
    },[taskToEdit])
    
  return (
    <div>
      <h1>Insert Sprint Stories</h1>
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
          value={points}
          placeholder="points"
          onChange={handlePointsChange}
          required
        />
        <button type='submit'> {taskToEdit ? 'Edit Story' : 'Add Story'}</button>
        <button onClick={clearTasksList}>Clear</button>
      </form>
    </div>
  );
}
