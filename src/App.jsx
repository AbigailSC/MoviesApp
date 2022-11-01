import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '@components/Home';
import Details from '@components/Details';
import SearchResults from '@components/SearchResults';
import About from '@components/About';
import NotFound from '@components/NotFound';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/details/:idTitle" element={<Details />} />
      <Route exact path="/search=:nameTitle" element={<SearchResults />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
