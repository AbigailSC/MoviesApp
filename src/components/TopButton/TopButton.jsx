import { useState, useEffect } from 'react';
import { BsArrowUpShort } from 'react-icons/bs';

export const TopButton = () => {
  const [backTopBtn, setBackTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 1200 ? setBackTopBtn(true) : setBackTopBtn(false);
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className="fixed bottom-10 right-10 h-10 w-10 m-4 z-50"
      onClick={() => scrollUp()}
    >
      {backTopBtn && (
        <button>
          <BsArrowUpShort className="animate-bounce w-20 h-20 bg-zinc-400 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-200 rounded-full transition-colors duration-500" />
        </button>
      )}
    </div>
  );
};
