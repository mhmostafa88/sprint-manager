import React, { useContext, useState, useEffect  } from "react";
import { FaPen, FaPlus, FaTimes } from "react-icons/fa";
import { StyledButton } from "../App.style";
import { StoriesListContext } from "../context/StoriesListContext";
import { StoryForm } from "./StoryForm.style";
import { useNavigate } from 'react-router';

const StoriesForm = ({isVisibleFoEdit}) => {
const navigate = useNavigate();
    const { addStory, clearStoriesList, storyToEdit, editStory, getStoriesList } = useContext(StoriesListContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState(0);
    const [completedPoints, setCompletedPoints] = useState(0);
    const [isStoryFormVisible, setIsStoryFormVisible] = useState(false);
    
    const toggleVisibility = () => {
      setIsStoryFormVisible(!isStoryFormVisible);
    }

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
            addStory(title, description, 0, 0)
            navigate("/");
        } else {
            editStory(storyToEdit._id,title, description)
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
            setCompletedPoints(storyToEdit.completedPoints);
        } else {
            setTitle('');
            setDescription('');
            setPoints(0);
            setCompletedPoints(0);
        }
    },[storyToEdit])
    
  return (
    <>

    {isStoryFormVisible || isVisibleFoEdit ? 
    <>
    
    <StoryForm>
    <button onClick={toggleVisibility}>
      Cancel Story Add
    </button>
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
        <StyledButton className="btn--med" color={storyToEdit ? '' : 'green'} type='submit'>
        {storyToEdit ? <FaPen /> : <FaPlus />}
        </StyledButton>
        <StyledButton className="btn--med" color={'red'} onClick={clearStoriesList}><FaTimes /></StyledButton>
      </form>
      </StoryForm>
      </>
      :
      <StoryForm>
      <StyledButton className="btn-svg-text" onClick={toggleVisibility}>
        <FaPlus style={{color: "var(--Text-Color-Purple)"}} /> Add Story
      </StyledButton>
      </StoryForm>
      
      }
      </>
  );
}

export default StoriesForm;
