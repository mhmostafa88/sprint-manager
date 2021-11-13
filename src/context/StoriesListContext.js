import { createContext, useState } from "react";
import uuid from "uuid";

export const StoriesListContext = createContext();

const StoriesListContextProvider = (props) => {
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "View Reports",
      description:
        "User can view each of the reports on its corresponding tab, filter by a particular",
      points: 34,
    },
    {
      id: 2,
      title: "Pull Projections",
      description:
        "User can pull projections from Excel file with a click of  a button",
      points: 20,
    },
    {
      id: 3,
      title: "Select Excel File",
      description:
        "User can select a particular Excel file in his sharepoint folder to pull projections from.",
      points: 3,
    },
  ]);

  const [storyToEdit, setstoryToEdit] = useState("");

  const addStory = (title, description, points) => {
    setStories([...stories, { id: uuid(), title, description, points }]);
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
      story.id === id ? { title, description, points } : story
    );

    setStories(newStories);
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
          storyToEdit
        }}
      >
        {props.children}
      </StoriesListContext.Provider>
    </div>
  );
};

export default StoriesListContextProvider;
