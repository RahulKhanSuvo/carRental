import { NavLink } from "react-router-dom";
import logo from "../assets/Logo/logo_v4.png";
const NavBar = () => {
  const links = (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink> Available Cars</NavLink>
      <NavLink> Add Car</NavLink>
      <NavLink> My Cars</NavLink>
      <NavLink> My Bookings</NavLink>
    </>
  );
  return (
    <nav>
      <div className="flex lg:container py-6 mx-auto justify-between items-center">
        <img className="w-36" src={logo} alt="" />
        <div className="flex gap-5">{links}</div>
        <div>
          <button>Sign In </button>
          <button>Register</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
