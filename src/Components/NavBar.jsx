import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logo/logo_v4.png";
import useAuth from "../Hooks/useAuth";
import { ImMenu } from "react-icons/im";
import { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
const NavBar = () => {
  const { user, logOut } = useAuth();
  const [isActive, setActive] = useState(true);
  const links = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? "text-[#FF2C3B] text-lg font-semibold transition-colors"
            : "hover:text-[#FF2C3B] text-lg font-semibold transition-colors"
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/availableCar"}
        className={({ isActive }) =>
          isActive
            ? "text-[#FF2C3B] text-lg font-semibold transition-colors"
            : "hover:text-[#FF2C3B] text-lg font-semibold transition-colors"
        }
      >
        Available Cars
      </NavLink>
      <NavLink
        to={"/addCar"}
        className={({ isActive }) =>
          isActive
            ? "text-[#FF2C3B] text-lg font-semibold transition-colors"
            : "hover:text-[#FF2C3B] text-lg font-semibold transition-colors"
        }
      >
        Add Car
      </NavLink>
      <NavLink
        to={"/myCar"}
        className={({ isActive }) =>
          isActive
            ? "text-[#FF2C3B] text-lg font-semibold transition-colors"
            : "hover:text-[#FF2C3B] text-lg font-semibold transition-colors"
        }
      >
        My Cars
      </NavLink>
      <NavLink
        to={"/myBookings"}
        className={({ isActive }) =>
          isActive
            ? "text-[#FF2C3B] text-lg font-semibold transition-colors"
            : "hover:text-[#FF2C3B] text-lg font-semibold transition-colors"
        }
      >
        My Bookings
      </NavLink>
    </>
  );

  return (
    <nav className="sticky backdrop-blur-sm w-full top-0 z-50 bg-white shadow-md">
      <div className="flex lg:container py-4 md:px-6 px-4 lg:mx-auto justify-between items-center">
        {/* menu for tab and mb */}
        <button
          className="text-[#FF2C3B] lg:hidden"
          onClick={() => setActive(!isActive)}
        >
          {isActive ? (
            <ImMenu className="md:text-3xl" />
          ) : (
            <RiCloseLargeFill className="md:text-3xl font-black" />
          )}
        </button>
        {/* Logo */}
        <Link to={"/"}>
          {" "}
          <img className="md:w-48 w-24" src={logo} alt="Logo" />
        </Link>

        {/* Links for lg */}
        <div className="lg:flex gap-5 text-gray-700 hidden ">{links}</div>

        {/* Authentication */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* User Photo */}
              {user?.photoURL && (
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="md:size-16 size-10 rounded-full border-2 border-gray-300"
                />
              )}
              <button
                onClick={logOut}
                className=" text-[#FF2C3B] md:text-lg border-[2.4px] border-[#FF2C3B] hover:bg-[#FF2C3B] transition duration-300 hover:text-white font-bold  md:py-2 md:px-8 px-2 rounded "
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to={"/login"}>
                <button className=" text-[#FF2C3B] md:text-lg border-[2.4px] border-[#FF2C3B] hover:bg-[#FF2C3B] transition duration-300 hover:text-white font-bold  md:py-2 md:px-8 px-2 rounded  ">
                  Sign In
                </button>
              </Link>
              <Link to={"/register"}>
                <button className=" text-[#FF2C3B] md:text-lg border-[2.4px] border-[#FF2C3B] hover:bg-[#FF2C3B] transition duration-300 hover:text-white font-bold  md:py-2 md:px-8 px-2 rounded  ">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* nav for mb */}
      <div className={`${isActive ? "hidden" : "fixed w-full"}`}>
        <div className="bg-white border lg:hidden  flex flex-col p-6">
          {links}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
