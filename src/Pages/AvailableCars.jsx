import axios from "axios";
import { useEffect, useState } from "react";
import CarCard from "../Components/CarCard";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
const AvailableCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/available-cars`)
      .then((res) => setCars(res.data));
  }, []);
  return (
    <div className="lg:container mx-auto">
      <div className="flex justify-between">
        <div>
          <label className="font-medium text-xl">Sort By:</label>
          <select className="border py-3 ml-2" name="sortOrder" id="sortOrder">
            <option value="default" selected>
              Default Order
            </option>
            <option value="priceHighToLow">Price High To Low</option>
            <option value="priceLowToHigh">Price Low To High</option>
            <option value="newest">Newest Properties</option>
            <option value="oldest">Oldest Properties</option>
          </select>
        </div>
        <div>
          <button>
            <FaThList size={35} />
          </button>
          <button>
            <IoGrid size={35} />
          </button>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard car={car} key={car._id}></CarCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
