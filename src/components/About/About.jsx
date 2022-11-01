import Navbar from '@components/Navbar';
import { SiGithub, SiLinkedin, SiMinutemailer } from 'react-icons/si';
import { GoCode } from 'react-icons/go';

const About = () => {
  return (
    <main className="flex flex-col items-center min-h-screen bg-slate-100 dark:bg-zinc-900 text-zinc-800 dark:text-slate-300 transition-colors duration-500">
      <Navbar />
      <div className="mt-10 p-5 flex flex-col gap-4 text-lg md:p-10 md:min-h-screen md:mt-0 md:justify-center md:items-start md:w-full xl:items-center xl:text-center xl:gap-10">
        <h2 className="font-medium text-xl xl:text-3xl">Abigail Sarzuri</h2>
        <h3 className="dark:text-slate-400 text-slate-500 transition-colors duration-500 xl:text-2xl">
          Fullstack Developer
        </h3>
        <h3 className="font-medium text-xl xl:text-3xl">About me</h3>
        <p className="dark:text-slate-400 text-slate-500 transition-colors duration-500 md:max-w-3xl xl:text-2xl">
          My name is Abigail, I{"'"}m from Argentina and I have 1 year of
          experience as a full stack developer with a front end orientation. I
          really enjoy coding, solving problems and building functional,
          visually pleasing and above all best practice websites in my code,
          using various design principles and patterns.
        </p>
        <h4 className="font-medium text-xl xl:text-3xl">Contact me</h4>
        <ul className="flex flex-col gap-2 xl:text-2xl xl:gap-10 xl:flex-row xl:items-center">
          <li className="w-min cursor-pointer ">
            <a
              href="https://www.linkedin.com/in/abigailsarzuri/"
              target="_blanck"
              className="flex items-center gap-2 hover:text-blue-400 duration-500"
            >
              <SiLinkedin />
              LinkedIn
            </a>
          </li>
          <span className="w-2 h-2 bg-gray-500 rounded-full hidden xl:block"></span>
          <li className="w-min cursor-pointer">
            <a
              href="https://github.com/AbigailSC"
              target="_blanck"
              className="flex items-center gap-2 hover:text-blue-400 duration-300"
            >
              <SiGithub />
              Github
            </a>
          </li>
          <span className="w-2 h-2 bg-gray-500 rounded-full hidden xl:block"></span>
          <li className="w-min cursor-pointer">
            <a
              href="https://portfolio-abigailsc.vercel.app/"
              target="_blanck"
              className="flex items-center gap-2 hover:text-blue-400 duration-300"
            >
              <GoCode />
              Portfolio
            </a>
          </li>
          <span className="w-2 h-2 bg-gray-500 rounded-full hidden xl:block"></span>
          <li className="flex items-center gap-2 w-min">
            <SiMinutemailer />
            Abigailsarzuri@gmail.com
          </li>
        </ul>
      </div>
    </main>
  );
};

export default About;
