import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  cleanDetailMovie,
  getMovieById,
  getReviewsByTitle,
  cleanReviewTitle
} from '../../redux/slices/movies/index';
import Navbar from '@components/Navbar';
import { FaStar } from 'react-icons/fa';
import { Spinner } from '../Spinner/Spinner';
import { Reviews } from '../Reviews/Reviews.jsx';

const Details = () => {
  const dispatch = useDispatch();
  const { idTitle } = useParams();
  const movieData = useSelector((state) => state.movies.detailMovie);
  const reviews = useSelector((state) => state.movies.reviews);

  useEffect(() => {
    dispatch(getMovieById(idTitle));
    dispatch(getReviewsByTitle(idTitle));
    return () => {
      dispatch(cleanDetailMovie());
      dispatch(cleanReviewTitle());
    };
  }, []);

  const imgPosterTitle = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`;
  const titleVideo = movieData.results?.find(
    (video) =>
      video.name.toLowerCase().includes('official') ||
      video.name.toLowerCase().includes('original')
  );

  // console.log('rev', titleVideo);
  // console.log('movies => ', movieData);

  return (
    <main className="flex flex-col items-center bg-slate-100 min-h-screen h-full dark:bg-zinc-900 text-slate-300 transition-colors duration-500">
      <Navbar />
      {movieData.length === 0 ? (
        <Spinner />
      ) : (
        <div className=" w-full min-h-screen">
          {/* <div
            className="absolute mt-12  inset-0 bg-no-repeat bg-zinc-900 min-h-screen z-0 filter brightness-[.3] blur-sm "
            style={{ backgroundImage: `url(${imgPosterTitle})` }}
          >
          </div> */}
          <div
            className=" bg-center min-h-screen bg-zinc-900 bg-fixed bg-cover bg-no-repeat z-40 px-5 py-8 flex flex-col gap-5 md:bg-top md:p-0 md:gap-0"
            style={
              movieData.poster_path === null
                ? { width: '100%' }
                : {
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)),url(${imgPosterTitle})`
                  }
            }
          >
            <div className="flex gap-4 md:gap-10 mt-12 items-center w-full md:bg-slate-100 md:dark:bg-zinc-900 transition-colors duration-500 md:text-zinc-800 dark:text-slate-300 md:px-10 md:py-8">
              <img
                src={
                  movieData.poster_path === null
                    ? 'https://via.placeholder.com/448x672'
                    : `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                }
                alt={movieData.title}
                className="w-1/3 rounded-lg md:w-1/4 xl:max-w-xs"
              />
              <div className="flex flex-col gap-4">
                <p className="text-3xl font-bold ">{movieData.title}</p>
                <p className="text-xl">{movieData.tagline}</p>
                <div className="flex items-center">
                  <p className="text-xl">
                    {movieData.release_date.slice(0, 4)}
                  </p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
                  {movieData.runtime > 120 ? (
                    <p className="text-xl text-slate-400 md:dark:text-slate-400 md:text-slate-500 transition-colors duration-500">
                      2h {movieData.runtime - 120}min
                    </p>
                  ) : movieData.runtime > 60 ? (
                    <p className="text-xl text-slate-400 md:dark:text-slate-400 md:text-slate-500 transition-colors duration-500">
                      1h {movieData.runtime - 60}min
                    </p>
                  ) : (
                    'No info about duration'
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <p className="font-bold text-xl">{movieData.vote_average}</p>
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  <p className="cursor-pointer font-medium underline hover:no-underline text-xl">
                    {movieData.vote_count} reviews
                  </p>
                </div>
                <p className="text-xl hidden lg:block break-words">
                  {movieData.overview}
                </p>
              </div>
            </div>
            <div className="flex w-full gap-2 flex-wrap md:bg-slate-100 md:dark:bg-zinc-900 transition-colors duration-500 md:text-zinc-800 dark:text-slate-300 md:px-10 md:py-4">
              {movieData.genres.map((genre, index) => (
                <button
                  key={index}
                  className="text-slate-400 hover:text-white transition bg-zinc-800 duration-300 ease-in-out cursor-pointer py-1 w-32 rounded-md"
                >
                  {genre.name}
                </button>
              ))}
            </div>
            <div className="w-full flex flex-col gap-5 md:bg-slate-100 md:dark:bg-zinc-900 transition-colors duration-500 md:text-zinc-800 dark:text-slate-300 md:px-10 md:py-8">
              <p className="text-xl lg:hidden">{movieData.overview}</p>
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
                {movieData.spoken_languages.length === 0 ? (
                  <p className="text-slate-400 md:dark:text-slate-400 md:text-slate-500 transition-colors duration-500">
                    No info
                  </p>
                ) : (
                  <p className="text-slate-400 md:dark:text-slate-400 md:text-slate-500 transition-colors duration-500">
                    {movieData.spoken_languages
                      .map((leng) => leng.english_name)
                      .join(', ')}
                  </p>
                )}
              </div>
              <div className="text-lg">
                <p className="text-slate-400 md:dark:text-slate-400 md:text-slate-500 transition-colors duration-500">
                  <span className="transition-colors duration-500 md:text-zinc-800 dark:text-slate-300">
                    Production companies:{' '}
                  </span>
                  {movieData.production_companies.length === 0
                    ? 'No info'
                    : movieData.production_companies
                        .map((company) => company.name)
                        .join(', ')}
                </p>
              </div>
              <div className="text-lg">
                {movieData.keywords.length === 0 ? null : (
                  <p className="text-slate-400 md:dark:text-slate-400 md:text-slate-500 transition-colors duration-500">
                    <span className="transition-colors duration-500 md:text-zinc-800 dark:text-slate-300">
                      Keywords:{' '}
                    </span>
                    {movieData.keywords.map((words) => words).join(', ')}
                  </p>
                )}
              </div>
              {titleVideo === undefined ? null : (
                <iframe
                  className="aspect-video w-full xl:w-3/4 2xl:w-2/4"
                  title="Youtube video player"
                  allowFullScreen
                  src={
                    titleVideo
                      ? `https://www.youtube.com/embed/${titleVideo.key}`
                      : `https://www.youtube.com/embed/${movieData.results[0].key}`
                  }
                ></iframe>
              )}
              <button className="w-full text-lg text-slate-400 hover:text-white transition bg-zinc-800 duration-300 ease-in-out cursor-pointer py-1 rounded-md xl:w-3/4 2xl:w-2/4">
                <a
                  target="_black"
                  href={`https://www.imdb.com/title/${movieData.imdb_id}/?ref_=nv_sr_srsg_0`}
                >
                  More information
                </a>
              </button>
              <div className="w-full h-1 border-t border-slate-400 opacity-50 rounded-xl"></div>
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold">Recent reviews</h3>
                {reviews.length === 0 ? (
                  <p className="text-slate-400">
                    There are no reviews for this movie yet :(
                  </p>
                ) : (
                  reviews.map((review, index) => (
                    <Reviews
                      key={index}
                      name={review.author}
                      avatarImg={
                        review.author_details.avatar_path !== null
                          ? review.author_details.avatar_path.slice(1)
                          : 'https://via.placeholder.com/400'
                      }
                      rating={review.author_details.rating}
                      review={review.content}
                      date={review.updated_at}
                      url={review.url}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Details;
