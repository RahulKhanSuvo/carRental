const DiscountCard = ({ title, subtitle, description, image }) => {
  return (
    <div className="bg-white hover:animate-bounce-slight rounded-lg shadow-lg flex overflow-hidden justify-between items-center transform transition-all duration-500 ease-in-out  p-6">
      {/* Text Section */}
      <div className="text-left">
        <h4 className="text-red-500 font-semibold uppercase text-sm">
          {title}
        </h4>
        <h1 className="text-4xl font-bold my-2">{subtitle}</h1>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="bg-black text-white py-2 px-4 rounded hover:bg-[#FF2C3B] hover:scale-105 transform transition-all duration-300">
          Book Now
        </button>
      </div>

      {/* Image Section */}
      <div className="-m-28">
        <img src={image} alt={subtitle} className="w-64 h-28 object-fill" />
      </div>
    </div>
  );
};

export default DiscountCard;
