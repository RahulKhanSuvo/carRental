import React from "react";
import {
  FaCar,
  FaDollarSign,
  FaRegCalendarAlt,
  FaHeadset,
} from "react-icons/fa";
import carBg from "../assets/display_car_image-1024x449.png";
const WhyChooseUs = () => {
  const points = [
    {
      icon: <FaCar size={40} className="text-blue-500" />,
      title: "Wide Variety of Cars",
      description: "From budget-friendly options to luxury vehicles.",
    },
    {
      icon: <FaDollarSign size={40} className="text-green-500" />,
      title: "Affordable Prices",
      description: "Competitive daily rates you can count on.",
    },
    {
      icon: <FaRegCalendarAlt size={40} className="text-yellow-500" />,
      title: "Easy Booking Process",
      description: "Seamlessly book your ride in just a few clicks.",
    },
    {
      icon: <FaHeadset size={40} className="text-red-500" />,
      title: "Customer Support",
      description: "24/7 assistance for all your queries.",
    },
  ];

  return (
    <div className="py-16 bg-gray-100">
      <div className="lg:container mx-auto px-4 text-center">
        <img className="w-full" src={carBg} alt="" />
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          Why Choose Us?
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                {point.title}
              </h3>
              <p className="text-gray-500">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
