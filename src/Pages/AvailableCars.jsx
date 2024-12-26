import { useEffect, useState } from "react";
import CarCard from "../Components/CarCard";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { axiosInstance } from "../Hooks/AxiosInstance";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [isTog, setTog] = useState(true);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    axiosInstance
      .get(`/available-cars?sort=${sort}&search=${search}`)
      .then((res) => setCars(res.data));
  }, [sort, search]);

  return (
    <div className="lg:container mx-auto p-6">
      {/* Sorting and Search Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <label className="font-medium text-xl">Sort By:</label>
          <select
            onChange={(e) => setSort(e.target.value)}
            className="border py-2 px-4 rounded-lg text-gray-700 shadow-sm focus:outline-none"
            name="sortOrder"
            id="sortOrder"
          >
            <option value="">Default Order</option>
            <option value="priceHighToLow">Lowest First </option>
            <option value="priceLowToHigh"> Highest First</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="border py-2 px-4 rounded-lg w-72 focus:outline-none shadow-sm"
            type="text"
            placeholder="Search cars"
          />
          <div className="flex space-x-4">
            <button onClick={() => setTog(false)} className="text-gray-600">
              <FaThList size={35} />
            </button>
            <button onClick={() => setTog(true)} className="text-gray-600">
              <IoGrid size={35} />
            </button>
          </div>
        </div>
      </div>

      {/* Cars Display Section */}
      <div
        className={`${
          isTog
            ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-6"
        }`}
      >
        {cars.map((car) => (
          <CarCard isTog={isTog} car={car} key={car._id} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
