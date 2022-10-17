import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  cleanDetailMovie,
  getMovieById
} from '../../redux/slices/movies/index';
import Navbar from '@components/Navbar';

const Details = () => {
  const dispatch = useDispatch();
  const { idTitle } = useParams();
  const movieData = useSelector((state) => state.movies.detailMovie);
  useEffect(() => {
    dispatch(getMovieById(idTitle));
    return () => {
      dispatch(cleanDetailMovie());
    };
  }, []);
  console.log(movieData);

  return (
    <main className="flex flex-col items-center bg-slate-100 min-h-screen dark:bg-slate-800 text-slate-800 dark:text-slate-300 transition-colors duration-500">
      <Navbar />
      {movieData.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="w-full h-full mt-12 bg-slate-100 min-h-screen dark:bg-slate-800 text-slate-800 dark:text-slate-300 transition-colors duration-500">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
            alt={movieData.title}
          />
          <h3>lenguage:{movieData.original_language}</h3>
          {movieData.genres.map((genre, index) => (
            <p key={index}>{genre.name}</p>
          ))}
          <p>{movieData.title}</p>
          <p>{movieData.tagline}</p>
          <p>release: {movieData.release_date}</p>
          <p>votes: {movieData.vote_average}</p>
          <div>
            Production companies:{' '}
            {movieData.production_companies.map((company, index) => (
              <div key={index}>
                <p>{company.name}</p>
                {/* <img
                  src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}
                  alt={company.name}
                /> */}
              </div>
            ))}
          </div>
          <p>{movieData.overview}</p>
        </div>
      )}
    </main>
  );
};

export default Details;
