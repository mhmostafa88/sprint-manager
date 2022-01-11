import "./App.css";
import { AppContainer } from "./App.style";
import StoriesForm from "./components/StoriesForm";
import StoriesList from "./components/StoriesList";
import PointsContainerContextProvider from "./context/PointsContainerContext";
import StoriesListContextProvider from "./context/StoriesListContext";
import TasksListContextProvider from "./context/TasksListContext";

const App = () => {
  return (
    <PointsContainerContextProvider>
    <StoriesListContextProvider>
      <TasksListContextProvider>
        <AppContainer>
          <StoriesForm />
          <StoriesList />
        </AppContainer>
      </TasksListContextProvider>
    </StoriesListContextProvider>
    </PointsContainerContextProvider>
  );
};

export default App;
