import Header from '../../components/Header';
import { SearchProvider } from '../../context/SearchContext';
import HomePage from '../HomePage';

function App() {
  return (
    <SearchProvider>
      <Header />
      <HomePage />
    </SearchProvider>
  );
}

export default App;
