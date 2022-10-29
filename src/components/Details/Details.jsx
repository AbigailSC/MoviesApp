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

  const titleVideo = movieData.results?.find((video) =>
    video.name.toLowerCase().includes('official')
  );

  console.log(titleVideo);

  return (
    <main className="flex flex-col items-center bg-slate-100 min-h-screen dark:bg-zinc-800 text-slate-300 transition-colors duration-500">
      <Navbar />
      {movieData.length === 0 ? (
        <div className="text-center flex flex-col justify-center min-h-screen">
          <svg
            aria-hidden="true"
            className="mr-2 w-10 h-10 text-gray-400 animate-spin dark:text-gray-600 fill-slate-700 dark:fill-slate-300"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div className="relative w-full min-h-screen bg-zinc-900 transition-colors duration-500">
          {/* <div
            className="absolute mt-12  inset-0 bg-no-repeat bg-zinc-900 min-h-screen z-0 filter brightness-[.3] blur-sm "
            style={{ backgroundImage: `url(${imgPosterTitle})` }}
          >
          </div> */}
          <div
            className="absolute bg-center min-h-screen bg-fixed bg-cover bg-no-repeat z-40 px-5 py-8 flex flex-col gap-5"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)),url(${imgPosterTitle})`
            }}
          >
            <div className="flex gap-4 mt-12 items-center">
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
                      2h {movieData.runtime - 120}min
                    </p>
                  ) : (
                    <p className="text-xl text-slate-400">
                      1h {movieData.runtime - 60}min
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
            <div className="text-lg">
              <p className="text-slate-400">
                <span className="text-slate-300">Keywords: </span>
                {movieData.keywords.map((words) => words).join(', ')}
              </p>
            </div>
            <iframe
              className="aspect-video"
              title="Youtube video player"
              allowFullScreen
              src={
                titleVideo
                  ? `https://www.youtube.com/embed/${titleVideo.key}`
                  : `https://www.youtube.com/embed/${movieData.results[0].key}`
              }
            ></iframe>
            <button className="text-lg text-slate-400 hover:text-white transition bg-zinc-900 duration-300 ease-in-out cursor-pointer py-1 rounded-md">
              <a
                target="_black"
                href={`https://www.imdb.com/title/${movieData.imdb_id}/?ref_=nv_sr_srsg_0`}
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
