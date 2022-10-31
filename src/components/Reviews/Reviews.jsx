/* eslint-disable react/prop-types */
import { FaStar } from 'react-icons/fa';

export const Reviews = ({ name, avatarImg, rating, review, date, url }) => {
  const dateMod = date.split('T')[0].split('-').reverse().join('/');
  // console.log(rating);
  return (
    <div className="bg-zinc-800 md:bg-zinc-300 md:dark:bg-zinc-800 flex items-start w-full gap-4 p-2 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 xl:max-w-full transition-colors duration-500 md:text-zinc-800 dark:text-slate-300">
      <img
        className="w-20 h-20 rounded-xl lg:w-32 lg:h-32 p-[2px] bg-gradient-to-r from-blue-400 to-emerald-400"
        src={
          avatarImg.includes('https')
            ? avatarImg
            : `https://image.tmdb.org/t/p/w500/${avatarImg}`
        }
        alt={name}
      />
      {/* <div
        className="w-20 h-20 bg-cover bg-center bg-red-300 rounded-xl"
        style={
          avatarImg.includes('https')
            ? { backgroundImage: `url(${avatarImg})` }
            : {
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${avatarImg})`
              }
        }
      ></div> */}
      <div className="flex flex-col gap-2 w-full lg:text-lg">
        <div className="flex justify-between">
          <h3 className="font-medium">{name}</h3>
          {rating === null ? (
            <h3 className="font-bold">No info</h3>
          ) : (
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <h3 className="font-bold">{rating}/10</h3>
            </div>
          )}
        </div>
        <h3>{dateMod}</h3>
        <div className="w-full whitespace-pre-line text-ellipsis overflow-hidden">
          <p className="text-sm break-all lg:text-lg dark:text-slate-400 text-slate-500 transition-colors duration-500">
            {review.slice(0, 240)}...
            <span className="ml-1 cursor-pointer text-blue-400 hover:text-blue-600 md:text-blue-500 md:hover:text-blue-700 transition duration-300 ease-in-out">
              <a href={url} target="_black">
                ver más
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
