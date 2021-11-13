import React, { useContext, useState, useEffect  } from "react";
import { StoriesListContext } from "../context/StoriesListContext";


const StoriesForm = () => {

    const { addStory, clearStoriesList, storyToEdit, editStory } = useContext(StoriesListContext);

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
        
        addStory(title, description, points)
        setTitle('');
        setDescription('');
        setPoints('');
    }

    useEffect(() => {
        if(storyToEdit !== null) {
            // we are in the process of editing an item
            setTitle(storyToEdit.title);
            setDescription(storyToEdit.description);
            setPoints(storyToEdit.points);
        } else {
            setTitle('');
            setDescription('');
            setPoints('');
        }
    },[storyToEdit])
    
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
        <button type='submit'>Add a story</button>
        <button onClick={clearStoriesList}>Clear</button>
      </form>
    </div>
  );
}

export default StoriesForm;
