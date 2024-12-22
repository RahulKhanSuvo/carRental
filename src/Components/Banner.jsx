import bannerImage from "../assets/Logo/bannerImage.jpg";

const Banner = () => {
  return (
    <div
      className="h-[90vh] w-full bg-no-repeat bg-cover bg-center "
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div
        className="w-full h-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 70.62%, rgba(0, 0, 0, 0.5) 70.99%)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="max-w-4xl">
            <p className="font-bold text-[#FF3600]">Welcome To Car Rental</p>
            <h1 className="text-4xl text-white md:text-6xl font-bold mb-6 drop-shadow-lg">
              Looking to save more on your rental car?
            </h1>
            <p className="text-lg text-white md:text-xl mb-6">
              Whether you’re planning a weekend getaway, a business trip, or
              just need a reliable ride for the day, we offer a wide range of
              vehicles to suit your needs.
            </p>
            <button className="bg-[#FF3600] text-white py-3 px-6 text-lg md:text-xl font-semibold rounded-full ">
              View Available
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
