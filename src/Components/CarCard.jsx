import { FaLocationDot } from "react-icons/fa6";

const CarCard = ({ car }) => {
  const {
    imageUrl,
    model,
    location,
    features,
    availability,
    dailyRentalPrice,
  } = car;

  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white">
      <div className=" overflow-hidden relative">
        <img
          className="md:h-64 lg:h-96 w-full object-cover"
          src={imageUrl}
          alt={model}
        />
        <p
          className={`${
            availability === "Unavailable" ? "bg-[#292929]" : "bg-[#F0151F]"
          } text-white px-4 py-3 text-xl rounded-md font-bold text-center absolute top-4 left-1 transform `}
        >
          {availability}
        </p>
      </div>
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{model}</h2>
        <div className="flex items-center text-gray-600 mt-2">
          <FaLocationDot className="mr-2" /> <p>{location}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {features.map((feature) => (
            <span
              className="text-white px-3 py-1 rounded-full bg-[#FF3726] text-xs"
              key={feature}
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="mt-4 text-lg font-medium text-gray-700">
          <h3>
            Starting From ${" "}
            <span className="text-2xl text-[#F0151F]">{dailyRentalPrice}</span>{" "}
            / Day
          </h3>
        </div>
        <button className="w-full py-3 mt-6 bg-[#ECF0F4] text-xl font-medium text-[#333] rounded-lg hover:bg-[#F0151F] transition-all hover:text-white duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;
