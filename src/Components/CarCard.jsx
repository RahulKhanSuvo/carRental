import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CarCard = ({ car, isTog }) => {
  const {
    _id,
    imageUrl,
    model,
    location,
    features,
    availability,
    dailyRentalPrice,
    createdAt,
  } = car;

  const calculateDatePosted = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const differenceInMilliseconds = now - createdDate;

    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (differenceInMilliseconds / (1000 * 60 * 60)) % 24
    );

    if (days > 0) return `Added ${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `Added ${hours} hour${hours > 1 ? "s" : ""} ago`;
    return "Added just now";
  };

  return (
    <div
      className={`${
        isTog ? "" : "flex"
      } shadow-lg rounded-lg overflow-hidden group bg-white transition-transform transform duration-500 hover:scale-105 hover:shadow-2xl`}
    >
      {/* Car Image Section */}
      <div className="overflow-hidden relative">
        <img
          className="md:h-64 lg:h-96 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={imageUrl}
          alt={model}
        />
        {/* Availability Badge */}
        <p
          className={`${
            availability === "Unavailable" ? "bg-red-700" : "bg-green-500"
          } text-white px-4 py-2 text-sm font-bold text-center absolute top-4 left-4 rounded-md`}
        >
          {availability}
        </p>
      </div>

      {/* Car Details Section */}
      <div className="px-6 pb-6">
        {/* Car Model */}
        <h2 className="text-2xl font-semibold text-gray-800">{model}</h2>
        {/* Location */}
        <div className="flex items-center text-gray-600 mt-2">
          <FaLocationDot className="mr-2" /> <p>{location}</p>
        </div>
        {/* Features */}
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
        {/* Pricing */}
        <div className="mt-4 text-lg font-medium text-gray-700">
          <h3>
            Starting From{" "}
            <span className="text-2xl text-[#F0151F]">${dailyRentalPrice}</span>{" "}
            / Day
          </h3>
        </div>
        {/* Date Posted */}
        <p className="text-gray-500 text-sm mt-2">
          {calculateDatePosted(createdAt)}
        </p>
        {/* Booking Button */}
        <Link to={`/carDetails/${_id}`}>
          <button className="w-full py-3 mt-6 bg-[#ECF0F4] text-xl font-medium text-[#333] rounded-lg group-hover:bg-[#F0151F] transition-all hover:text-white duration-300">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
