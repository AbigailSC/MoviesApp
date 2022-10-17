import { useEffect, useState } from 'react';
import { getMoviesHome, getTrendingMovies } from '../../redux/slices/movies';
import { useDispatch, useSelector } from 'react-redux';
import HeroSlider from '@components/HeroSlider';
import Navbar from '@components/Navbar';
import CardMovie from '@components/CardMovie';
import Pagination from '@components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((state) => state.movies.trendingMovies);
  const allMovies = useSelector((state) => state.movies.discoverMovies);
  const [currentPage, setCurrentPage] = useState(1);
  // console.log(allMovies);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getTrendingMovies());
  }, []);

  useEffect(() => {
    dispatch(getMoviesHome(currentPage));
  }, [currentPage]);

  return (
    <main className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 transition-colors duration-500">
      <Navbar />
      {trendingMovies.length === 0 && allMovies.length === 0 ? (
        <p>cargando</p>
      ) : (
        <>
          <section className="pt-12">
            <HeroSlider />
          </section>
          <Pagination pageFunction={paginado} current={currentPage} />
          <div className="w-full p-6 ">
            <section className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold">Trending movies</h2>
              {allMovies.length < 20 ? (
                <p>Loading</p>
              ) : (
                allMovies.map((movie, index) => (
                  <CardMovie
                    key={index}
                    id={movie.id}
                    title={movie.title || movie.name}
                    date={movie.release_date.slice(0, 4)}
                    img={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
                  />
                ))
              )}
            </section>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
