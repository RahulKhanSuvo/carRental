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
    <div className="relative">
      {/* Background Image */}
      <div className="relative">
        <img className="w-full" src={bg} alt="Background" />
        <div className="absolute inset-0 bg-[#ECEFF4] bg-opacity-50"></div>
      </div>

      {/* Cars Listing */}
      <div className="lg:container absolute top-10 left-0 right-0 lg:mx-auto md:mx-6 mx-4">
        <div className="text-center mb-12">
          <p className="text-center text-[#ff3726] text-sm">
            CHECKOUT NEW CARS
          </p>
          <h3 className="text-5xl font-bold text-[#0c142e]">
            Cars We’re Offering for Rentals
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car._id} isTog={isTog} car={car}></CarCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentListing;
