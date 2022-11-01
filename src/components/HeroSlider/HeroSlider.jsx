/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';

let count = 0;
let slideInterval;

const HeroSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const trendingMovies = useSelector((state) => state.movies.trendingMovies);
  const slideRef = useRef();

  const removeAnimation = () => {
    slideRef.current.classList.remove('fade-anim');
  };

  useEffect(() => {
    slideRef.current.addEventListener('animationend', removeAnimation);
    slideRef.current.addEventListener('mouseenter', pauseSlider);
    slideRef.current.addEventListener('mouseleave', startSlider);
    startSlider();
    return () => {
      pauseSlider();
    };
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 5000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % trendingMovies.length;
    setCurrentImage(count);
    slideRef.current.classList.add('fade-anim');
  };

  const handleOnPrevClick = () => {
    const imageLength = trendingMovies.length;
    count = (currentImage + imageLength - 1) % imageLength;
    setCurrentImage(count);
    slideRef.current.classList.add('fade-anim');
  };

  // console.log(trendingMovies);

  return (
    <>
      {trendingMovies.length === 0 ? (
        <Spinner />
      ) : (
        <div
          ref={slideRef}
          className="w-screen select-none relative bg-zinc-900 "
        >
          <div className="aspect-w-16 aspect-h-9duration-700 ease-linear">
            <img
              src={trendingMovies[currentImage].img}
              alt="Trending Movies"
              className="w-full h-full"
            />
          </div>
          <div className="absolute bg-[rgba(64,64,64,0.4)] left-0 top-3/4 w-full h-[25%] pt-3">
            <p className="font-bold text-white px-4 text-2xl cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis">
              <Link to={`/${trendingMovies[currentImage].id}`}>
                {trendingMovies[currentImage].name}
              </Link>
            </p>
          </div>
          <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
            <button
              className="bg-slate-300 p-1 rounded-full bg-opacity-40 cursor-pointer hover:bg-opacity-50 transition"
              onClick={() => handleOnPrevClick()}
            >
              <GrFormPrevious size={30} />
            </button>
            <button
              className="bg-slate-800 text-white p-1 rounded-full bg-opacity-40 cursor-pointer hover:bg-opacity-50 transition"
              onClick={() => handleOnNextClick()}
            >
              <GrFormNext size={30} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSlider;
