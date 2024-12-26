import { FaGasPump, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { GiCarDoor, GiGearStick } from "react-icons/gi";
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
    fuel,
    gear,
    doors,
    passengers,
    bookingCount,
  } = car;

  const calculateDatePosted = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const differenceInMilliseconds = now - createdDate;

    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (differenceInMilliseconds / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor((differenceInMilliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((differenceInMilliseconds / 1000) % 60);

    if (days > 0) return `Added ${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `Added ${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0)
      return `Added ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (seconds > 0)
      return `Added ${seconds} second${seconds > 1 ? "s" : ""} ago`;

    return "Added just now";
  };

  return (
    <div
      className={`${
        isTog ? "" : "flex flex-col md:flex-row md:items-center  "
      } shadow-lg rounded-lg overflow-hidden group bg-white transition-transform transform duration-500 hover:scale-105 hover:shadow-2xl`}
    >
      {/* Car Image Section */}
      <div className="overflow-hidden relative">
        <img
          className="md:h-64 lg:h-96 h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={imageUrl}
          alt={model}
        />
        {/* Availability Badge */}
        <p
          className={`${
            availability === "Unavailable" ? "bg-red-700" : "bg-green-500"
          } text-white px-4 py-2 text-sm  text-center absolute top-4 left-4 rounded-md`}
        >
          {availability}
        </p>
        <p
          className={`${
            isTog ? "hidden" : ""
          } absolute bg-[#FFE9EB] px-2 border rounded-full  z-30 text-[#FF2C3B] right-1 bottom-1`}
        >
          Booking{" "}
          <span className="text-[#FF2C3B] font-bold">{bookingCount}</span>
        </p>
      </div>

      {/* Car Details Section */}
      <div className="px-5 relative pb-6">
        <p
          className={`${
            isTog ? "" : "hidden"
          } absolute bg-[#FFE9EB] px-2 border rounded-full -top-3 z-30 text-[#FF2C3B] right-1`}
        >
          Booking{" "}
          <span className="text-[#FF2C3B] font-bold">{bookingCount}</span>
        </p>
        {/* Car Model */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">{model}</h2>
        </div>
        {/* Location */}
        <div className="flex items-center text-gray-600 mt-2">
          <FaLocationDot className="mr-2" /> <p>{location}</p>
        </div>
        {/*  */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b pt-4 pb-4 text-xl ">
          <p className="flex gap-1  items-center">
            <MdOutlineAirlineSeatReclineNormal className="text-[#FF2C61]" />
            <span> {passengers}</span> Seats
          </p>
          <p className="flex gap-1  items-center">
            <GiGearStick className="text-[#FF2C61]" />
            <span> {gear}</span>
          </p>
          <p className="flex gap-1  items-center">
            <GiCarDoor className="text-[#FF2C61]" />
            <span> {doors}</span> Doors
          </p>
          <p className="flex gap-1  items-center">
            <FaGasPump className="text-[#FF2C61]" />
            <span> {fuel}</span>
          </p>
        </div>
        {/* Pricing */}
        <div className=" text-lg font-medium text-gray-700">
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
          <button className="w-full py-3 mt-6 bg-[#ECF0F4] text-xl font-medium text-[#333] rounded-lg group-hover:bg-[#FF2C3B] transition-all group-hover:text-white duration-300">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
