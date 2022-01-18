import { createContext, useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import axios from 'axios';

export const StoriesListContext = createContext();

const StoriesListContextProvider = (props) => {
  const url = "http://localhost:3001/api/v1/stories";

  const [stories, setStories] = useState([]);
  const getStoriesList = () => {
  
    const AssignData = (data) => {
      if(data.status === 200)
      setStories(data.data.stories);
    }
    const getData = (url) => {
      try{
        axios.get(url).then((data) => AssignData(data));
      }catch(err){
        console.error(err);
        process.exitCode = 1;
      }
    }
  
    return getData(url);
    
  }
  

useEffect(() => {

  getStoriesList()

},[])
  

  // const initialState = getInitialStoriesList().then(output => console.log(output.data['stories']))
  

  const [storyToEdit, setstoryToEdit] = useState("");

  async function addStory (title, description, points, completedPoints) {

  axios.post("http://localhost:3001/api/v1/stories", {
    title, description, points, completedPoints
  }).then(getStoriesList());

  };

  const removeStory = (id) => {
    axios.delete(`${url}/${id}`).then(getStoriesList());
  };

  const clearStoriesList = () => {
    setStories([]);
  };

  const findEditStory = (id) => {
    const AssignData = (data) => {
      if(data.status === 200)
      setstoryToEdit(data.data.story)
    }
    axios.get(`${url}/${id}`).then((data) => AssignData(data))
    // const story = stories.find((story) => story.id === id);
    ;
  };

  const editStory = (id, title, description, points, completedPoints) => {
    const newStories = stories.map((story) =>
      story._id === id ? { id, title, description, points, completedPoints } : story
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
