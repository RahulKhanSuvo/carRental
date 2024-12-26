import { Link } from "react-router-dom";
import error from "../assets/error-image.png";
const ErrorPage = () => {
  return (
    <div className="h-screen w-full flex justify-center flex-col items-center">
      <img className="" src={error} alt="" />
      <div className="mt-5 text-center">
        <h3 className="font-bold  text-5xl">
          <span className="text-[#FF2C3B]"> Oops! </span> That Page Can Not be
          Found.
        </h3>
        <Link to={"/"}>
          <button className="btn text-md mt-7 bg-[#FF2C3B] text-white">
            Go To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
