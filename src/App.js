import "./App.css";
import { AppContainer } from "./App.style";
import StoriesForm from "./components/StoriesForm";
import StoriesList from "./components/StoriesList";
import StoriesListContextProvider from "./context/StoriesListContext";
import TasksListContextProvider from "./context/TasksListContext";

const App = () => {
  return (
    <StoriesListContextProvider>
      <TasksListContextProvider>
        <AppContainer>
          <StoriesForm />
          <StoriesList />
        </AppContainer>
      </TasksListContextProvider>
    </StoriesListContextProvider>
  );
};

export default App;
