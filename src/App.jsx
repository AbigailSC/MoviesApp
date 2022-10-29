import { Route, Routes } from 'react-router-dom';
import Home from '@components/Home';
import Details from '@components/Details';
import SearchResults from '@components/SearchResults';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/:idTitle" element={<Details />} />
      <Route exact path="/search" element={<SearchResults />} />
    </Routes>
  );
}

export default App;
