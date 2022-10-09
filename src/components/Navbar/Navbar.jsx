import { Searchbar } from '../Searchbar/Searchbar';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const handleMenuDisplay = () => {
    setMenu(!menu);
  };
  return (
    <nav
      className={`bg-slate-800 w-full flex z-10 fixed ${
        menu ? 'h-screen sm:h-auto sm:border-b-1' : 'h-10'
      }`}
    >
      <div className="justify-start w-full mx-auto lg:max-w-7xl md:items-center md:flex md:mx-0 xl:max-w-full">
        <div className="flex pt-2 px-5 justify-between w-full md:hidden">
          <h1 className="text-white font-bold">MovieApp</h1>
          <button
            className="outline-none text-slate-400 focus:text-white"
            onClick={() => handleMenuDisplay()}
          >
            {menu ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>
      {/* <Searchbar /> */}
    </nav>
  );
};

export default Navbar;
