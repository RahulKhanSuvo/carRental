import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logo/logo_v4.png";
import useAuth from "../Hooks/useAuth";
const NavBar = () => {
  const { user, useSignOut } = useAuth();
  console.log(user);
  const links = (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/availableCar"}> Available Cars</NavLink>
      {user && (
        <>
          <NavLink to={"/addCar"}> Add Car</NavLink>
          <NavLink to={"/myCar"}> My Cars</NavLink>
          <NavLink to={"/myBookings"}> My Bookings</NavLink>
        </>
      )}
    </>
  );
  return (
    <nav>
      <div className="flex lg:container py-6 mx-auto justify-between items-center">
        <img className="w-36" src={logo} alt="" />
        <div className="flex gap-5">{links}</div>
        <div>
          {user ? (
            <>
              <button onClick={useSignOut}>Logout</button>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <button>Sign In </button>
              </Link>
              <Link to={"/register"}>
                <button>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
