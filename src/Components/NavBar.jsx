import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logo/logo_v4.png";
import useAuth from "../Hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();
  console.log(user?.photoURL);
  const links = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? "text-[#FF2C3B] text-lg font-semibold transition-colors"
            : "hover:text-blue-500 text-lg font-semibold transition-colors"
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/availableCar"}
        className={({ isActive }) =>
          isActive
            ? "text-[#FF2C3B] text-lg font-semibold transition-colors"
            : "hover:text-blue-500 text-lg font-semibold transition-colors"
        }
      >
        Available Cars
      </NavLink>
      {user && (
        <>
          <NavLink
            to={"/addCar"}
            className={({ isActive }) =>
              isActive
                ? "text-[#FF2C3B] text-lg font-semibold transition-colors"
                : "hover:text-blue-500 text-lg font-semibold transition-colors"
            }
          >
            Add Car
          </NavLink>
          <NavLink
            to={"/myCar"}
            className={({ isActive }) =>
              isActive
                ? "text-[#FF2C3B] text-lg font-semibold transition-colors"
                : "hover:text-blue-500 text-lg font-semibold transition-colors"
            }
          >
            My Cars
          </NavLink>
          <NavLink
            to={"/myBookings"}
            className={({ isActive }) =>
              isActive
                ? "text-[#FF2C3B] text-lg font-semibold transition-colors"
                : "hover:text-blue-500 text-lg font-semibold transition-colors"
            }
          >
            My Bookings
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="fixed w-full top-0 z-50 bg-white shadow-md">
      <div className="flex lg:container py-4 px-6 mx-auto justify-between items-center">
        {/* Logo */}
        <img className="w-36" src={logo} alt="Logo" />

        {/* Links */}
        <div className="flex gap-5 text-gray-700">{links}</div>

        {/* Authentication */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* User Photo */}
              {user?.photoURL && (
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
              )}
              <button
                onClick={logOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to={"/login"}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Sign In
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
