import React from "react";
import { IoMdSearch, IoMdLogIn } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a href="/login" className="font-bold text-2xl sm:text-3xl flex gap-2">
              𝓞𝓬𝓮𝓪𝓷 𝓔𝔁𝓹𝓵𝓸𝓻𝓪𝓽𝓲𝓸𝓷
            </a>
          </div>

          <div className="flex items-center gap-4">

          {/* Signup button */}
          <Link to="/signup">
            <button
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Sign up
              </span>
              <IoMdLogIn className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            </Link>
            <Link to="/login">
            {/* login button */}
            <button
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Sign in
              </span>
              <IoMdLogIn className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            </Link>
            </div>

            
          </div>
        </div>
      </div>
      
  );
};


export default Navbar;