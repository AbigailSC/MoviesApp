import { Route, Routes } from 'react-router-dom';
import Home from '@components/Home';
import Details from '@components/Details';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/:idTitle" element={<Details />} />
    </Routes>
  );
}

export default App;
