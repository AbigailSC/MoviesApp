import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchTitle } from '../../redux/slices/movies/index';

export const Searchbar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchTitle(name));
    setName('');
  }
  return (
    <div className="flex w-full text-center text-xl">
      <div className="w-full relative">
        <input
          type="text"
          onChange={(e) => handleInputChange(e)}
          placeholder="Search a movie or serie..."
          className="dark:bg-zinc-800 transition-colors duration-500 bg-slate-200 py-2 px-4 w-9/12 rounded-xl focus:outline-none text-white"
        />
        <button
          onClick={(e) => handleSubmit(e)}
          className="absolute text-slate-400 bottom-[20%] left-[80%] transition duration-300 ease-in-out hover:transition-all dark:hover:text-white hover:text-slate-600"
        >
          <Link to="/search">
            <AiOutlineSearch className="h-6 w-6" />
          </Link>
        </button>
      </div>
    </div>
  );
};
