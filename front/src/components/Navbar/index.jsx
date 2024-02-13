import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import Search from "./Search";

const Navbar = () => {
  let [open, setOpen] = useState(false);
  let [logIn, setLogIn] = useState(true);

  let Links = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Posts", link: "/posts" },
    { id: 3, name: "Reseñas", link: "/resenas" },
    { id: 4, name: "Recetas", link: "/recetas" },
  ];

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <span>Chetifabene</span>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-32" : "top-[-490px]"
          }`}
        >
          <Search />
          {Links.map((link) => (
            <li key={link.id} className="md:ml-8 md:my-0 my-7 font-semibold">
              <NavLink
                to={link.link}
                className="text-gray-800 hover:text-blue-400 duration-500"
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <span  onClick={() => setLogIn(!logIn)}>
            {logIn ? (
              <IoIosLogIn className="ml-5 text-gray-800" />
            ) : (
              <IoIosLogOut className="ml-5 text-gray-800" />
            )}
          </span>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;