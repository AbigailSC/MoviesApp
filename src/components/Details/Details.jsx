import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  cleanDetailMovie,
  getMovieById
} from '../../redux/slices/movies/index';
import Navbar from '@components/Navbar';
import { FaStar } from 'react-icons/fa';

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

  const imgPosterTitle = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`;

  console.log(movieData);

  return (
    <main className="flex flex-col items-center bg-slate-100 min-h-screen dark:bg-slate-800 text-slate-300 transition-colors duration-500">
      <Navbar />
      {movieData.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="relative w-full h-full bg-zinc-900 min-h-screen transition-colors duration-500">
          <div className="absolute inset-0 h-screen bg-zinc-900 z-0 filter brightness-[.3]">
            <img
              src={imgPosterTitle}
              alt={movieData.title}
              className="mt-12 h-screen w-full object-cover"
            />
          </div>
          <div className="absolute z-40 px-5 py-8 top-12 flex flex-col gap-5">
            <div className="flex gap-4 items-center">
              <img
                src={imgPosterTitle}
                alt={movieData.title}
                className="w-1/3 rounded-lg"
              />
              <div className="flex flex-col gap-4">
                <p className="text-3xl font-bold">{movieData.title}</p>
                <p className="text-xl">{movieData.tagline}</p>
                <div className="flex items-center">
                  <p className="text-xl">
                    {movieData.release_date.slice(0, 4)}
                  </p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                  {movieData.runtime > 120 ? (
                    <p className="text-xl text-slate-400">
                      2h {movieData.runtime - 120}m
                    </p>
                  ) : (
                    <p className="text-xl text-slate-400">
                      1h {movieData.runtime - 60}m
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <p className="font-bold">{movieData.vote_average}</p>
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  <p className="cursor-pointer font-medium underline hover:no-underline">
                    {movieData.vote_count} reviews
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-2 flex-wrap">
              {movieData.genres.map((genre, index) => (
                <button
                  key={index}
                  className="text-slate-400 hover:text-white transition bg-zinc-900 duration-300 ease-in-out cursor-pointer py-1 w-32 rounded-md"
                >
                  {genre.name}
                </button>
              ))}
            </div>
            <p className="text-xl">{movieData.overview}</p>
            {movieData.original_title !== movieData.title ? (
              <p className="text-lg">
                Original title:{' '}
                <span className="text-slate-400">
                  {movieData.original_title}
                </span>
              </p>
            ) : null}
            <div className="text-lg flex gap-1">
              <p>Lenguage:</p>
              <p className="text-slate-400">
                {movieData.spoken_languages
                  .map((leng) => leng.english_name)
                  .join(', ')}
              </p>
            </div>
            <div className="text-lg">
              <p className="text-slate-400">
                <span className="text-slate-300">Production companies: </span>
                {movieData.production_companies
                  .map((company) => company.name)
                  .join(', ')}
              </p>
            </div>
            <button className="text-lg text-slate-400 hover:text-white transition bg-zinc-900 duration-300 ease-in-out cursor-pointer py-1 rounded-md">
              <a
                target="_black"
                href={`www.imdb.com/title/${movieData.imdb_id}/?ref_=nv_sr_srsg_0`}
              >
                More information
              </a>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Details;
