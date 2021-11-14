import "./App.css";
import StoriesForm from "./components/StoriesForm";
import StoriesList from "./components/StoriesList";
import StoriesListContextProvider from "./context/StoriesListContext";
import TasksListContextProvider from "./context/TasksListContext";

const App = () => {
  return (
    <StoriesListContextProvider>
      <TasksListContextProvider>
        <StoriesForm />
        <StoriesList />
      </TasksListContextProvider>
    </StoriesListContextProvider>
  );
};

export default App;
