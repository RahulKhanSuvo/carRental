import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "./CarCard";
import bg from "../assets/bg-color-container-dodge2-testimonial.jpg";

const RecentListing = () => {
  const [cars, setCars] = useState([]);
  const isTog = true;

  useEffect(() => {
    axios.get("http://localhost:5000/recent-cars").then((res) => {
      setCars(res.data);
    });
  }, []);

  return (
    <div>
      {/* Background Section */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg})`,
            height: "60vh", // 30% height
          }}
        ></div>
        <div className="absolute inset-0 bg-blue-500 bg-opacity-50"></div>
      </div>

      {/* Cars Listing Section */}
      <div className="lg:container mx-auto  py-16 -mt-20 relative z-10">
        <div className="text-center mb-12">
          <p className="text-center text-[#ff3726] text-sm">
            CHECKOUT NEW CARS
          </p>
          <h3 className="text-5xl font-bold text-[#0c142e]">
            Cars We’re Offering for Rentals
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} isTog={isTog} car={car}></CarCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentListing;
