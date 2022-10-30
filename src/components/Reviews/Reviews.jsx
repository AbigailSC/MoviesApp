/* eslint-disable react/prop-types */
import { FaStar } from 'react-icons/fa';

export const Reviews = ({ name, avatarImg, rating, review, date, url }) => {
  const dateMod = date.split('T')[0].split('-').reverse().join('/');

  return (
    <div className="bg-zinc-800 flex items-start w-full gap-4 p-2 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50">
      <img
        className="w-20 h-20 rounded-xl"
        src={
          avatarImg.includes('https')
            ? avatarImg
            : `https://image.tmdb.org/t/p/w500/${avatarImg}`
        }
        alt={name}
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <h3 className="font-medium">{name}</h3>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <h3 className="font-bold">{rating}/10</h3>
          </div>
        </div>
        <h3>{dateMod}</h3>
        <div className="w-full whitespace-pre-line text-ellipsis overflow-hidden">
          <p className="text-sm break-all text-slate-400">
            {review.slice(0, 232)}...
            <span className="ml-1 cursor-pointer text-blue-400 hover:text-blue-600 transition duration-300 ease-in-out">
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
