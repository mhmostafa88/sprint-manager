
import './App.css';
import StoriesForm from './components/StoriesForm';
import StoriesList from './components/StoriesList';
import StoriesListContextProvider from './context/StoriesListContext';


const App = () => {
  return (
    <StoriesListContextProvider>
    <StoriesForm />
      <StoriesList />
    </StoriesListContextProvider>
  );
}

export default App;
