import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StoriesListContext = createContext();

const StoriesListContextProvider = (props) => {
  const url = 'http://localhost:3001/api/v1/stories';

  const [stories, setStories] = useState([]);
  
  const getStoriesList = () => {
    const AssignData = (data) => {
      if (data.status === 200) setStories(data.data.stories);
      console.log("now the list should be updated to " + stories)
    };
    const getData = (url) => {
      try {
        axios.get(url).then((data) => AssignData(data));
      } catch (err) {
        console.error(err);
        process.exitCode = 1;
      }
    };

    return getData(url);
  };

  useEffect(() => {
    getStoriesList();
  }, []);

  // const initialState = getInitialStoriesList().then(output => console.log(output.data['stories']))

  const [storyToEdit, setstoryToEdit] = useState('');

  async function addStory(title, description, points, completedPoints) {
    axios
      .post(url, {
        title,
        description,
        points,
        completedPoints,
      })
      .then(getStoriesList());
  }

  const removeStory = (id) => {
    axios.delete(`${url}/${id}`).then(getStoriesList());
  };

  const clearStoriesList = () => {
    setStories([]);
  };

  const findEditStory = (id) => {
    const AssignData = (data) => {
      if (data.status === 200) setstoryToEdit(data.data.story);
    };
    axios.get(`${url}/${id}`).then((data) => AssignData(data));
  };

  const editStory = (id, title, description) => {

    axios.patch(`${url}/${id}`, {
      id,
      title,
      description,
    }).then(setstoryToEdit(null))
    .then(getStoriesList());
  };

  const editStoryPoints = (id, points, completedPoints) => {

    axios.patch(`${url}/${id}`, {
      points,
      completedPoints,
    }).then(setstoryToEdit(null))
    .then(getStoriesList());
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
          editStoryPoints,
          storyToEdit,
          getStoriesList
        }}
      >
        {props.children}
      </StoriesListContext.Provider>
    </div>
  );
};

export default StoriesListContextProvider;
