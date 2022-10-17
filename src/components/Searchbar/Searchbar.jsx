import { AiOutlineSearch } from 'react-icons/ai';

export const Searchbar = () => {
  return (
    <div className="flex w-full text-center text-xl">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Search a movie/serie/TV show..."
          className="dark:bg-slate-700 transition-colors duration-500 bg-slate-200 py-2 px-4 w-9/12 rounded-xl focus:outline-none text-white"
        />
        <button className="absolute text-slate-400 bottom-[20%] left-[80%] transition duration-300 ease-in-out hover:transition-all hover:text-white">
          <AiOutlineSearch className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
