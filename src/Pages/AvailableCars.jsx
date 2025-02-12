import { useEffect, useState } from "react";
import CarCard from "../Components/CarCard";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { axiosInstance } from "../Hooks/AxiosInstance";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [isTog, setTog] = useState(true);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemParPage, setItemParPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const { count } = useLoaderData();
  console.log(currentPage);
  const numberOfPage = Math.ceil(count / itemParPage);
  const pages = [
    ...Array(numberOfPage)
      .keys()
      .map((i) => i + 1),
  ];
  console.log(pages);
  const handelItemsPerPage = (e) => {
    setItemParPage(parseInt(e.target.value));
    setCurrentPage(1);
  };
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(
        `/available-cars?sort=${sort}&search=${search}&page=${
          currentPage - 1
        }&size=${itemParPage}`
      )
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sort, search, itemParPage, currentPage]);

  return (
    <div className="lg:container mx-auto  min-h-[calc(100vh-500px) p-6">
      {/* Sorting and Search Section */}
      <Helmet>
        <title>available Car</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <label className="font-medium text-xl">Sort By:</label>
          <select
            onChange={(e) => setSort(e.target.value)}
            className="border py-2 px-4 rounded-lg text-gray-700 shadow-sm focus:outline-none"
            name="sortOrder"
            id="sortOrder"
          >
            <option value="">Default Order</option>
            <option value="priceHighToLow">Lowest First</option>
            <option value="priceLowToHigh">Highest First</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="border py-2 px-4 rounded-lg w-full md:w-72 focus:outline-none shadow-sm"
            type="text"
            placeholder="Search cars"
          />
          <div className="flex space-x-4">
            <button
              onClick={() => setTog(false)}
              className={`${
                isTog
                  ? "text-[#FF2C3B]"
                  : "bg-[#FF2C3B] p-3 text-white rounded-md"
              }`}
            >
              <FaThList size={30} />
            </button>
            <button
              onClick={() => setTog(true)}
              className={`${
                isTog
                  ? "bg-[#FF2C3B] p-3 text-white rounded-md"
                  : "text-[#FF2C3B]"
              }`}
            >
              <IoGrid size={35} />
            </button>
          </div>
        </div>
      </div>

      {/* Cars Display Section */}
      <div>
        {loading ? (
          <div className="flex justify-center min-h-[70vh] items-center h-64">
            <div className="loader border-t-4 border-b-4 border-[#FF2C3B] w-12 h-12 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div
              className={`${
                isTog
                  ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                  : "flex flex-col gap-6"
              }`}
            >
              {cars.map((car) => (
                <CarCard isTog={isTog} car={car} key={car._id} />
              ))}
            </div>
            <div className="text-center space-x-3 mt-6">
              <button
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
              >
                Previous
              </button>
              {pages.map((page) => (
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`${
                    currentPage === page ? "bg-[#FF2C3B]" : "bg-[#E3E3E4]"
                  } px-3 `}
                  key={page}
                >
                  {page}
                </button>
              ))}
              <select
                onChange={handelItemsPerPage}
                value={itemParPage}
                name=""
                id=""
              >
                <option value="8">8</option>
                <option value="10">10</option>
              </select>
              <button
                onClick={() =>
                  currentPage < pages.length && setCurrentPage(currentPage + 1)
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AvailableCars;
