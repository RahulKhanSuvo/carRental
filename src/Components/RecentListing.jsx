import { useEffect, useState } from "react";
import CarCard from "./CarCard";
import bg from "../assets/bg-color-container-dodge2-testimonial.jpg";
import { axiosInstance } from "../Hooks/AxiosInstance";
import { Fade } from "react-awesome-reveal";
import FullScreenSpinner from "./FullScreenSpinner";

const RecentListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 new loading state
  const isTog = true;

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/recent-cars")
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <FullScreenSpinner />;
  }

  return (
    <div>
      {/* Background Section */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg})`,
            height: "60vh",
          }}
        ></div>
        <div className="absolute inset-0 bg-blue-500 bg-opacity-60"></div>
      </div>

      {/* Cars Listing Section */}
      <div className="lg:container md:mx-6 mx-4 lg:mx-auto py-16 -mt-20 relative z-10">
        <div className="text-center mb-12">
          <p className="text-base w-fit mx-auto px-3 rounded-full bg-[#FFE9EB] text-[#ff2c3b]">
            RECENT CARS
          </p>
          <h3 className="text-4xl mt-6 font-bold text-[#0c142e]">
            Recently Added Cars for You
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 lg:grid-cols-4 lg:gap-6">
          {cars.map((car) => (
            <Fade
              triggerOnce
              delay={200}
              key={car._id}
              cascade={true}
              damping={0.3}
            >
              <CarCard isTog={isTog} car={car}></CarCard>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentListing;
