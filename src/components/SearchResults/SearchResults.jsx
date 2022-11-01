import Navbar from '@components/Navbar';
import CardMovie from '@components/CardMovie';
import Pagination from '@components/Pagination';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchTitle } from '../../redux/slices/movies';
import { useParams } from 'react-router-dom';
import { TopButton } from '../TopButton/TopButton';

const SearchResults = () => {
  const dispatch = useDispatch();
  const titlesFiltered = useSelector((state) => state.movies.filteredMovies);
  const maxValue = useSelector((state) => state.movies.maxPages);
  const [currentPage, setCurrentPage] = useState(1);
  const { nameTitle } = useParams();

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // useEffect(() => {
  //   dispatch(searchTitle(titleName));
  // }, []);

  useEffect(() => {
    dispatch(searchTitle(nameTitle, currentPage));
  }, [currentPage]);

  // console.log('los titulos son ', titlesFiltered);
  // console.log('el titulo es', titleName, titlesFiltered);

  return (
    <div>
      <main className="flex flex-col min-h-screen bg-slate-100 dark:bg-zinc-900 text-zinc-800 dark:text-slate-300 transition-colors duration-500">
        <Navbar />
        {titlesFiltered.length === 0 ? (
          <div className="text-center flex flex-col justify-center min-h-screen">
            <p className="text-lg px-10">
              We couldn{"'"}t find any movies with that name, please try again.
              😓
            </p>
          </div>
        ) : (
          <div className="pt-12">
            <Pagination
              pageFunction={paginado}
              current={currentPage}
              maxValue={maxValue}
            />
            <div className="flex flex-col w-full p-6 gap-6">
              <h2 className="text-2xl font-bold sm:text-center">
                Movies with {"'"}
                {nameTitle}
                {"'"}
              </h2>
              <section className="flex flex-col gap-6 sm:justify-center sm:text-center sm:items-center md:flex-row md:flex-wrap">
                {titlesFiltered.map((movie, index) => (
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
    </div>
  );
};
export default SearchResults;
