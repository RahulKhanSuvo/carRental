import bg from "../assets/about.jpg";
import CountUp from "react-countup";
import { GrLike } from "react-icons/gr";
import { FaMapMarkerAlt, FaCarAlt } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";

const About = () => {
  const counters = [
    { number: 990, label: "CARS RENTOUTS", icon: <FaCarAlt size={30} /> },
    { number: 230, label: "CENTER SOLUTIONS", icon: <FaBuilding size={30} /> },
    { number: 75, label: "LOCATIONS", icon: <FaMapMarkerAlt size={30} /> },
    { number: 690, label: "HAPPY CUSTOMER", icon: <GrLike size={30} /> },
  ];
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      style={{
        backgroundImage: `linear-gradient(rgba(12, 20, 46, 0.8), rgba(12, 20, 46, 0.8)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="py-44 mb-9"
    >
      <div className="flex flex-col lg:flex-row lg:container mx-auto justify-between items-center gap-6">
        {/* Text Section */}
        <div className="w-full md:w-1/2">
          <h3 className="text-6xl font-bold text-white mb-6">
            Save Time & Money with Top Car Rent Services
          </h3>
        </div>

        {/* Counter Section */}
        <div className="w-full flex gap-4 justify-center">
          {counters.map((counter, index) => (
            <div className="relative" key={index}>
              <div className="bg-[#FF2C3B] size-40 rounded-full flex justify-center text-center items-center shadow-lg">
                <div className="text-center">
                  <h3 className="text-white text-3xl font-bold">
                    {inView ? (
                      <CountUp
                        start={0}
                        end={counter.number}
                        duration={6}
                        delay={0}
                      />
                    ) : (
                      0
                    )}
                  </h3>
                  <p className="text-[#FFA9A4] text-sm font-medium leading-tight">
                    {counter.label}
                  </p>
                </div>
              </div>
              <p className="absolute top-0 right-0 bg-white p-4 rounded-full">
                {counter.icon}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
