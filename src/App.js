import "./App.css";
import { AppContainer } from "./App.style";
import StoriesForm from "./components/StoriesForm";
import StoriesList from "./components/StoriesList";

import GlobalContextProvider from "./context/GlobalContext";

const App = () => {
  return (
    <GlobalContextProvider>
        <AppContainer>
          <StoriesList />
        </AppContainer>
    </GlobalContextProvider>
  );
};

export default App;
