import { Link } from "react-router-dom";
import video from "../assets/banner.mp4";
import thumb from "../assets/thumb.png";
const Banner = () => {
  return (
    <div className="relative h-[90vh] w-full">
      <video
        className="w-full  top-0 left-0  h-full object-cover z-[-1]"
        autoPlay
        loop
        muted
        poster={thumb}
      >
        <source src={video} />
      </video>

      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 70.62%, rgba(0, 0, 0, 0.5) 70.99%)",
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center max-w-5xl  text-white space-y-6">
          <h1 className="text-4xl capitalize  md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
            Elevate Every Journey – Drive Your Dreams Today!
          </h1>
          <Link to="/availableCar">
            <button className="bg-[#FF2C3B] transition duration-300  hover:bg-[#060605]  mt-6 text-white py-2 md:py-5  md:px-14 px-5 text-lg md:text-xl font-semibold rounded-md shadow-lg ">
              View Available
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
