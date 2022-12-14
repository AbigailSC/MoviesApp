import { useEffect, useState } from 'react';
import { getMoviesHome, getTrendingMovies } from '../../redux/slices/movies';
import { useDispatch, useSelector } from 'react-redux';
import HeroSlider from '@components/HeroSlider';
import Navbar from '@components/Navbar';
import CardMovie from '@components/CardMovie';
import Pagination from '@components/Pagination';
import { Spinner } from '../Spinner/Spinner';
import { TopButton } from '../TopButton/TopButton';

const Home = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((state) => state.movies.trendingMovies);
  const allMovies = useSelector((state) => state.movies.discoverMovies);
  const maxValue = useSelector((state) => state.movies.maxPages);
  const [currentPage, setCurrentPage] = useState(1);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getTrendingMovies());
  }, []);

  useEffect(() => {
    dispatch(getMoviesHome(currentPage));
  }, [currentPage]);

  // console.log('home ', trendingMovies, 'y ', allMovies);

  return (
    <main className="flex flex-col items-center min-h-screen bg-slate-100 dark:bg-zinc-900 text-zinc-800 dark:text-slate-300 transition-colors duration-500">
      <Navbar />
      {trendingMovies.length === 0 && allMovies.length === 0 ? (
        <Spinner />
      ) : (
        <div className="pt-12">
          {/* <section className="lg:hidden">
            <HeroSlider />
          </section> */}
          <Pagination
            pageFunction={paginado}
            current={currentPage}
            maxValue={maxValue}
          />
          <div className="flex flex-col w-full p-6 gap-6 md:px-4">
            <h2 className="text-2xl font-bold sm:text-center">
              Trending movies
            </h2>
            <section className="flex flex-col gap-6 sm:justify-center sm:items-center md:flex-row md:flex-wrap">
              {allMovies.map((movie, index) => (
                <CardMovie
                  key={index}
                  id={movie.id}
                  title={movie.title || movie.name}
                  date={movie.release_date?.slice(0, 4)}
                  img={
                    movie.poster_path
                      ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path
                      : 'https://via.placeholder.com/448x672'
                  }
                />
              ))}
            </section>
          </div>
        </div>
      )}
      <TopButton />
    </main>
  );
};

export default Home;
