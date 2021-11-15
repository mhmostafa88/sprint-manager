import { createContext, useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";

export const StoriesListContext = createContext();

const StoriesListContextProvider = (props) => {

  const initialState = JSON.parse(localStorage.getItem('stories')) || [];

  const [stories, setStories] = useState(initialState);

  const [storyToEdit, setstoryToEdit] = useState("");


  useEffect(() => {
    localStorage.setItem('stories', JSON.stringify(stories));
  },[stories]);

  const addStory = (title, description, points) => {
    setStories([...stories, { id: uuidv4(), title, description, points }]);
    console.log('stories: ' + stories)
  };

  const removeStory = (id) => {
    setStories(stories.filter((story) => story.id !== id));
  };

  const clearStoriesList = () => {
    setStories([]);
  };

  const findEditStory = (id) => {
    const story = stories.find((story) => story.id === id);
    setstoryToEdit(story);
  };

  const editStory = (id, title, description, points) => {
    const newStories = stories.map((story) =>
      story.id === id ? { id, title, description, points } : story
    );

    setStories(newStories);
    setstoryToEdit(null);
  };

  return (
    <div>
      <StoriesListContext.Provider
        value={{
          stories,
          addStory,
          removeStory,
          clearStoriesList,
          findEditStory,
          editStory,
          storyToEdit,
        }}
      >
        {props.children}
      </StoriesListContext.Provider>
    </div>
  );
};

export default StoriesListContextProvider;
