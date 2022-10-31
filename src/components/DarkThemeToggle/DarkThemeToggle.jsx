import { useDispatch, useSelector } from 'react-redux';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { toggleDarkMode } from '../../redux/slices/UI';

const DarkThemeToggle = () => {
  const dispatch = useDispatch();
  const {
    UI: { isDarkMode }
  } = useSelector((state) => state);
  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      type="button"
      className="group relative rounded-lg p-2.5 text-sm text-gray-500 transition-colors focus:outline-none dark:text-gray-400 lg:border-2 lg:border-zinc-300 lg:dark:border-zinc-700"
    >
      {!isDarkMode ? <IoMdMoon /> : <IoMdSunny />}
    </button>
  );
};

export default DarkThemeToggle;
