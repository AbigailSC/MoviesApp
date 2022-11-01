const NotFound = () => {
  return (
    <main className="flex flex-col text-center gap-5 text-xl items-center p-5 justify-center min-h-screen bg-slate-100 dark:bg-zinc-900 text-zinc-800 dark:text-slate-300">
      <img
        src="https://res.cloudinary.com/dbhb8sohh/image/upload/v1667338725/404_hxu2gj.png"
        alt="404"
        className="w-2/3 lg:w-1/4"
      />
      <h3>
        Since I know you won{"'"}t read this unless you{"'"}ve clicked on a page
        that doesn{"'"}t exist, I can afford to write anything.
      </h3>
      <h3>For example: Chicken Milanese are better than meat.</h3>
    </main>
  );
};

export default NotFound;
