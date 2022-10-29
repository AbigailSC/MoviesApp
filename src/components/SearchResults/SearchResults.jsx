import Navbar from '@components/Navbar';
import CardMovie from '@components/CardMovie';
import Pagination from '@components/Pagination';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchTitle } from '../../redux/slices/movies';

const SearchResults = () => {
  const dispatch = useDispatch();
  const titlesFiltered = useSelector((state) => state.movies.filteredMovies);
  const titleName = useSelector((state) => state.movies.titlename);
  const maxValue = useSelector((state) => state.movies.maxPages);
  const [currentPage, setCurrentPage] = useState(1);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(searchTitle(titleName, currentPage));
  }, []);

  useEffect(() => {
    dispatch(searchTitle(titleName, currentPage));
  }, [currentPage]);

  // console.log('el titulo es', titleName, titlesFiltered);

  return (
    <div>
      <main className="flex flex-col min-h-screen bg-slate-100 dark:bg-zinc-900 text-zinc-800 dark:text-slate-300 transition-colors duration-500">
        <Navbar />
        {titlesFiltered.length === 0 ? (
          <p>Loading</p>
        ) : (
          <div className="pt-12">
            <Pagination
              pageFunction={paginado}
              current={currentPage}
              maxValue={maxValue}
            />
            <div className="w-full p-6 ">
              <section className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold">
                  Movies with {"'"}
                  {titleName}
                  {"'"}
                </h2>
                {titlesFiltered.map((movie, index) => (
                  <CardMovie
                    key={index}
                    id={movie.id}
                    title={movie.title || movie.name}
                    date={movie.release_date?.slice(0, 4)}
                    img={
                      movie.poster_path
                        ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path
                        : 'https://res.cloudinary.com/dbhb8sohh/image/upload/v1667060422/noImage_ywozbr.png'
                    }
                  />
                ))}
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default SearchResults;
