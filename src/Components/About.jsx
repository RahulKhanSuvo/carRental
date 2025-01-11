import bg from "../assets/about.jpg";
import CountUp from "react-countup";
import { GrLike } from "react-icons/gr";
import { FaMapMarkerAlt, FaCarAlt } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";
import { Fade, Flip, JackInTheBox } from "react-awesome-reveal";

const About = () => {
  const counters = [
    { number: 990, label: "CARS RENTOUTS", icon: <FaCarAlt /> },
    { number: 230, label: "CENTER SOLUTIONS", icon: <FaBuilding /> },
    { number: 75, label: "LOCATIONS", icon: <FaMapMarkerAlt /> },
    { number: 690, label: "HAPPY CUSTOMER", icon: <GrLike /> },
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
        <div className="w-full md:w-2/3">
          <p className="uppercase text-base w-fit  px-3 rounded-full   text-[#ff2c3b]">
            fun facts
          </p>
          <Fade triggerOnce direction="left">
            <h3 className="lg:text-6xl text-xl md:text-4xl text-center lg:text-left    font-bold text-white mb-6">
              Save Time & Money with Top Car Rent Services
            </h3>
          </Fade>
        </div>

        {/* Counter Section */}
        <div className="w-full flex  items-center flex-col md:flex-row gap-4 justify-center">
          {counters.map((counter, index) => (
            <JackInTheBox triggerOnce key={index}>
              <div className="relative">
                <div className="bg-[#FF2C3B]  size-28 lg:size-40 rounded-full flex justify-center text-center items-center shadow-lg">
                  <div className="text-center">
                    <h3 className="text-white lg:text-3xl font-bold">
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
                    <p className="text-[#FFA9A4]  text-xs md:text-sm font-medium leading-tight">
                      {counter.label}
                    </p>
                  </div>
                </div>
                <p className="absolute lg:text-3xl top-0 right-0 bg-white p-3 md:p-4 rounded-full">
                  {counter.icon}
                </p>
              </div>
            </JackInTheBox>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
