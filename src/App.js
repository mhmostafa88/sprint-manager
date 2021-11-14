import "./App.css";
import StoriesForm from "./components/StoriesForm";
import StoriesList from "./components/StoriesList";
import StoriesListContextProvider from "./context/StoriesListContext";
import TasksListContextProvider from "./context/TasksListContext";

const App = () => {
  return (
    <StoriesListContextProvider>
      <StoriesForm />
      <TasksListContextProvider>
        <StoriesList />
      </TasksListContextProvider>
    </StoriesListContextProvider>
  );
};

export default App;
