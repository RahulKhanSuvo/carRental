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
      icon: <FaCar size={25} className="" />,
      title: "Wide Variety of Cars",
      description:
        "Choose from compact cars, SUVs, and luxury sedans to suit your travel needs, style, and preferences.",
    },
    {
      icon: <FaDollarSign size={25} className="" />,
      title: "Affordable Prices",
      description:
        "Enjoy transparent pricing with no hidden charges, offering great value for both short-term and long-term car rentals.",
    },
    {
      icon: <FaRegCalendarAlt size={25} className="" />,
      title: "Easy Booking Process",
      description:
        "Our user-friendly platform ensures hassle-free reservations, saving you time with a few quick steps online.",
    },
    {
      icon: <FaHeadset size={25} className="" />,
      title: "Customer Support",
      description:
        "Dedicated support team available 24/7 to address your concerns, ensuring a stress-free and satisfying rental experience.",
    },
  ];

  return (
    <div className="relative py-16 mb-10 bg-[#FDFDFD]">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden flex">
        <img src={shape1} alt="" className="absolute top-0 left-0 " />
        <img src={shape2} alt="" className="absolute bottom-0 right-0  " />
      </div>

      {/* Content */}
      <div className="lg:container relative z-10 mx-auto pb-24 px-4 text-center">
        <h2 className="text-base w-fit mx-auto px-3 rounded-full  bg-[#FFE9EB] mb-6 text-[#ff2c3b]">
          CHOOSE US !
        </h2>
        <div className="flex flex-col justify-center items-center">
          <motion.h2
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl mb-6 font-bold"
          >
            Why Choose Us for Your Next Ride?"
          </motion.h2>
        </div>
        <div className="grid mt-3 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
            >
              <div className="mb-4 rounded-xl p-5 bg-[#ff2c3b] text-white">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#0D0D0D]">
                {point.title}
              </h3>
              <p className="text-[#787878]">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
