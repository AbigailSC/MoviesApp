import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';
import { ImFirst } from 'react-icons/im';

const Pagination = ({ pageFunction, current, maxValue }) => {
  const handleNextPage = (e) => {
    e.preventDefault();
    // console.log(current);
    pageFunction(current + 1);
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    pageFunction(current - 1);
    // console.log(current);
  };

  const handleFirstPage = (e) => {
    e.preventDefault();
    pageFunction(1);
  };

  const handleLastPage = (e) => {
    e.preventDefault();
    pageFunction(maxValue);
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <button
        onClick={(e) => handleFirstPage(e)}
        disabled={current <= 1}
        className="flex font-bold p-2 bg-slate-300 rounded-l-xl dark:bg-zinc-700 text-slate-800 dark:text-slate-300 transition-colors duration-500 dark:hover:bg-zinc-800 hover:bg-slate-400"
      >
        First
      </button>
      <button
        onClick={(e) => handlePrevPage(e)}
        disabled={current <= 1}
        className="flex font-bold border-l p-2 dark:border-slate-500 border-slate-400 bg-slate-300 dark:bg-zinc-700 text-slate-800 dark:text-slate-300 transition-colors duration-500 dark:hover:bg-zinc-800 hover:bg-slate-400"
      >
        <BiSkipPrevious className="h-6 w-6 text-zinc-900 dark:text-slate-300 transition-colors duration-500" />
        Prev
      </button>
      <h3 className="bg-slate-300 font-bold dark:bg-zinc-700 text-slate-800 dark:text-slate-300 p-2 border-l border-r dark:border-slate-500 border-slate-400 transition-colors duration-500">
        {current}
      </h3>
      <button
        onClick={(e) => handleNextPage(e)}
        disabled={current >= maxValue}
        className="flex font-bold border-r p-2 dark:border-slate-500 border-slate-400 bg-slate-300 dark:bg-zinc-700 text-slate-800 dark:text-slate-300 transition-colors duration-500 dark:hover:bg-zinc-800 hover:bg-slate-400"
      >
        Next
        <BiSkipNext className="h-6 w-6 text-slate-800 dark:text-slate-300 transition-colors duration-500" />
      </button>
      <button
        onClick={(e) => handleLastPage(e)}
        disabled={current >= maxValue}
        className="flex font-bold p-2 bg-slate-300 rounded-r-xl dark:bg-zinc-700 text-slate-800 dark:text-slate-300 transition-colors duration-500 dark:hover:bg-zinc-800 hover:bg-slate-400"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
