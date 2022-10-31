import { Link } from 'react-router-dom';

const CardMovie = ({ id, title, img, date }) => {
  return (
    <Link to={`/${id}`}>
      <div className="rounded-2xl max-w-md overflow-hidden cursor-pointer relative group md:max-w-sm">
        <div className="z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
          <h3 className="p-4 space-y-3 text-2xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
            {title}, {date}
          </h3>
        </div>
        <img src={img} />
      </div>
    </Link>
  );
};

export default CardMovie;
