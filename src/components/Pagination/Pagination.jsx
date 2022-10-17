import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';

const Pagination = ({ pageFunction, current }) => {
  const handleNextPage = (e) => {
    e.preventDefault();
    pageFunction(current + 1);
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    pageFunction(current - 1);
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <button
        onClick={(e) => handlePrevPage(e)}
        className="flex font-bold p-3 bg-slate-300 rounded-l-xl dark:bg-slate-700 text-slate-800 dark:text-slate-300 transition-colors duration-500 dark:hover:bg-slate-900 hover:bg-slate-400"
      >
        <BiSkipPrevious className="h-6 w-6 text-slate-800 dark:text-slate-300 transition-colors duration-500" />
        Prev
      </button>
      <h3 className="bg-slate-300 font-bold dark:bg-slate-700 text-slate-800 dark:text-slate-300 p-3 border-l border-r dark:border-slate-500 border-slate-400 transition-colors duration-500">
        {current}/500
      </h3>
      <button
        onClick={(e) => handleNextPage(e)}
        className="flex font-bold p-3 bg-slate-300 rounded-r-xl dark:bg-slate-700 text-slate-800 dark:text-slate-300 transition-colors duration-500 dark:hover:bg-slate-900 hover:bg-slate-400"
      >
        Next
        <BiSkipNext className="h-6 w-6 text-slate-800 dark:text-slate-300 transition-colors duration-500" />
      </button>
    </div>
  );
};

export default Pagination;
