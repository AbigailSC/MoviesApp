import { useEffect } from 'react';
import { getMoviesHome, getTrendingMovies } from '../../redux/slices/movies';
import { useDispatch, useSelector } from 'react-redux';
import HeroSlider from '@components/HeroSlider';
import Navbar from '@components/Navbar';

const Home = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((state) => state.movies.trendingMovies);
  useEffect(() => {
    dispatch(getMoviesHome());
    dispatch(getTrendingMovies());
  }, []);
  return (
    <main className="flex flex-col">
      <Navbar />
      <section>
        {trendingMovies.length === 0 ? <p>Cargando</p> : <HeroSlider />}
      </section>
    </main>
  );
};

export default Home;
