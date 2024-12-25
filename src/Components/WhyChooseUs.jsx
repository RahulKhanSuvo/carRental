import {
  FaCar,
  FaDollarSign,
  FaRegCalendarAlt,
  FaHeadset,
} from "react-icons/fa";
import { motion } from "framer-motion";
import shape1 from "../assets/shape-3.png";
import shape2 from "../assets/shape-4.png";

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
    <div className="relative py-16 mb-10 bg-[#FFF8F6]">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden flex">
        <img src={shape1} alt="" className="absolute top-0 left-0 " />
        <img src={shape2} alt="" className="absolute bottom-0 right-0  " />
      </div>

      {/* Content */}
      <div className="lg:container relative z-10 mx-auto pb-24 px-4 text-center">
        <h2 className="text-base mb-8 text-[#FF4D26]">WHY CHOOSE US?</h2>
        <div className="flex flex-col justify-center items-center">
          <motion.h2
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl mb-4 font-bold"
          >
            Best Valued Deals You Will Ever Find
          </motion.h2>
        </div>
        <div className="grid mt-3 gap-8 md:grid-cols-2 lg:grid-cols-4">
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
