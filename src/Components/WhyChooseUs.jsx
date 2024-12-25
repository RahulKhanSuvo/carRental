import {
  FaCar,
  FaDollarSign,
  FaRegCalendarAlt,
  FaHeadset,
} from "react-icons/fa";
import { motion } from "framer-motion"; // Corrected the import from 'motion/react'
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
    <div className="py-16 mb-10 bg-gray-100">
      <div className="lg:container mx-auto px-4 text-center">
        <h2 className="text-xl font-bold mb-8 text-gray-800">Why Choose Us?</h2>
        <div className="flex flex-col justify-center items-center">
          <motion.h2
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Best valued deals you will ever find
          </motion.h2>
          <p className="max-w-2xl text-gray-600">
            Discover unbeatable prices on a wide range of vehicles. Whether
            you’re looking for budget-friendly options or premium cars, we
            ensure top value for every ride. Book today and experience the
            difference!
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} // Animates only once when the element is in the view
              transition={{
                duration: 0.5,
                delay: index * 0.1, // Staggered animation for each card
              }}
            >
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                {point.title}
              </h3>
              <p className="text-gray-500">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
