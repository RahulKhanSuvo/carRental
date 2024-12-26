import { Link } from "react-router-dom";
import video from "../assets/banner.mp4";
const Banner = () => {
  return (
    <div className="relative h-[90vh] w-full">
      <video
        className="w-full  top-0 left-0  h-full object-cover z-[-1]"
        autoPlay
        loop
        muted
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
        <div className="text-center max-w-4xl  text-white space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
            Looking to save more on your rental car?
          </h1>
          <Link to="/availableCar">
            <button className="bg-[#FF2C3B] mt-6 text-white py-5  px-14 text-lg md:text-xl font-semibold rounded-md shadow-lg hover:bg-[#FF2C3B]">
              View Available
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
