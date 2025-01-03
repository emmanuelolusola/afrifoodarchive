import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/afrifoodarchive 1.svg";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="z-10 py-5 md:py-8 px-[20px] md:px-[150px] fixed w-full top-0 flex justify-between items-center text-base md:text-[24px] text-[#1D1D1F] font-medium bg-[#ffffc5] ">
      <Link to='/'>
        <img
          src={logo}
          alt=""
          className="w-[32px] h-[28px] md:w-[64px] md:h-[54px]" />
      </Link>
      <ul className="flex gap-5 md:gap-10">
        <li>
          <Link
            to="/"
            className={`${location.pathname === "/" ? "text-red-500" : ""} md:block hidden`}
          >
            Foods
          </Link>
        </li>

        <li>
          <Link
            to="/favourites"
            className={location.pathname === "/favourites" ? "text-red-500" : ""}
          >
            Favourites
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "text-red-500" : ""}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;