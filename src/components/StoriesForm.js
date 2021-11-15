import React, { useContext, useState, useEffect  } from "react";
import { StyledButton } from "../App.style";
import { StoriesListContext } from "../context/StoriesListContext";
import { StoryForm } from "./StoryForm.style";


const StoriesForm = () => {

    const { addStory, clearStoriesList, storyToEdit, editStory } = useContext(StoriesListContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState(0);

    const handleTitleChange = e => {
        setTitle(e.target.value);
    }
    const handleDescriptionChange = e => {
        setDescription(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        // check if the submit is meant to edit an existing story
        if(!storyToEdit) {
            addStory(title, description, points)
        } else {
            editStory(storyToEdit.id,title, description, points)
        }
        
        setTitle('');
        setDescription('');
        setPoints(0);
    }

    useEffect(() => {
        if(storyToEdit) {
            // we are in the process of editing an item
            setTitle(storyToEdit.title);
            setDescription(storyToEdit.description);
            setPoints(storyToEdit.points);
        } else {
            setTitle('');
            setDescription('');
            setPoints(0);
        }
    },[storyToEdit])
    
  return (
    <StoryForm>
      <h1>Insert a new Story</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          name="title"
          onChange={handleTitleChange}
          required
        />
        <textarea
          name="description"
          value={description}
          placeholder="description"
          onChange={handleDescriptionChange}
          required
        />
        <StyledButton  color={storyToEdit ? '' : 'green'} type='submit'>
        {storyToEdit ? 'Edit Story' : 'Add Story'}
        </StyledButton>
        <StyledButton color={'red'} onClick={clearStoriesList}>Clear</StyledButton>
      </form>
      </StoryForm>
  );
}

export default StoriesForm;
