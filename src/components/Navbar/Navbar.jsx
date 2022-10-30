/* eslint-disable react/prop-types */
import { Searchbar } from '../Searchbar/Searchbar';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DarkThemeToggle from '../DarkThemeToggle/DarkThemeToggle';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGenres } from '../../redux/slices/movies';

const Navbar = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  const handleMenuDisplay = () => {
    setMenu(!menu);
  };

  return (
    <nav
      className={`dark:bg-zinc-900 bg-slate-100 w-full border-b border-slate-300 dark:border-zinc-800 transition-colors duration-500 flex z-50 fixed text-slate-400 ${
        menu ? 'h-screen sm:h-auto sm:border-b-1' : 'h-12'
      }`}
    >
      <div className="justify-start w-full mx-auto lg:max-w-7xl md:items-center md:flex md:mx-0 xl:max-w-full">
        <div className="flex pt-2 px-5 justify-between w-full md:hidden">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-bold text-xl">
            <Link to="/">MoviesApp</Link>
          </h1>
          <div className="flex gap-4">
            <DarkThemeToggle />
            <button
              className="outline-none dark:text-slate-400 text-slate-800 dark:focus:text-white focus:text-slate-900 "
              onClick={() => handleMenuDisplay()}
            >
              {menu ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
        <div>
          <div
            className={`${
              menu ? 'flex flex-col' : 'hidden'
            } items-center justify-center py-8 gap-6`}
          >
            <Searchbar />
            <ul className="flex flex-col gap-2 text-xl text-center w-full">
              <li className="px-6 transition duration-300 ease-in-out hover:transition-all hover:text-slate-600 dark:hover:text-white">
                <Link
                  to="/"
                  className="dark:focus:text-white focus:text-slate-600"
                >
                  Home
                </Link>
              </li>
              {/* <div className="w-full h-1 border-t opacity-10 bg-slate-400"></div> */}
              <li className="px-6 transition duration-300 ease-in-out hover:transition-all hover:text-slate-600 dark:hover:text-white">
                <Link to="/about" className="focus:text-white">
                  About
                </Link>
              </li>
              {/* <div className="w-full h-1 border-t opacity-10 bg-slate-400"></div>
              <li className="px-6 flex items-center gap-1  cursor-pointer transition duration-300 ease-in-out hover:transition-all hover:text-slate-600 dark:hover:text-white">
                Genders
                <IoIosArrowDown />
              </li>
              <div className="w-full h-1 border-t opacity-10 bg-slate-400"></div>
              <ul className="px-6 w-full flex flex-wrap text-left gap-y-1">
                {allGenres.length === 0 ? (
                  <p>Loading</p>
                ) : (
                  allGenres.map((genre, index) => (
                    <li key={index} className="w-2/4">
                      {genre.name}
                    </li>
                  ))
                )}
              </ul> */}
            </ul>
          </div>
        </div>
      </div>
      {/* <Searchbar /> */}
    </nav>
  );
};
// ** No encontre una busqueda por generos en la api por eso es que deje comentada esa sección
export default Navbar;
