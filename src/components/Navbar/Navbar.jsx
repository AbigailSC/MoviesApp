import { Searchbar } from '../Searchbar/Searchbar';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkThemeToggle from '../DarkThemeToggle/DarkThemeToggle';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const handleMenuDisplay = () => {
    setMenu(!menu);
  };
  return (
    <nav
      className={`dark:bg-slate-800 bg-slate-100 w-full border-b border-slate-300 dark:border-slate-700 transition-colors duration-500 flex z-10 fixed text-slate-400 ${
        menu ? 'h-screen sm:h-auto sm:border-b-1' : 'h-12'
      }`}
    >
      <div className="justify-start w-full mx-auto lg:max-w-7xl md:items-center md:flex md:mx-0 xl:max-w-full">
        <div className="flex pt-2 px-5 justify-between w-full md:hidden">
          <h1 className="dark:text-slate-300 text-slate-800 font-bold text-xl transition-colors duration-500">
            MoviesApp
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
            <ul className="flex flex-col gap-6 text-xl">
              <Link to="/" className="focus:text-white">
                <li className="transition duration-300 ease-in-out hover:transition-all hover:text-white">
                  Home
                </li>
              </Link>
              <Link to="/about" className="focus:text-white">
                <li className="transition duration-300 ease-in-out hover:transition-all hover:text-white">
                  About
                </li>
              </Link>
              <li>Filters</li>
            </ul>
          </div>
        </div>
      </div>
      {/* <Searchbar /> */}
    </nav>
  );
};

export default Navbar;
