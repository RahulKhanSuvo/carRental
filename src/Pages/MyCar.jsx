import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import CustomModal from "../Modal/CustomModal";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/UseAxios";
import Loading from "../Components/Loading";
const MyCar = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [onlyCar, setOnlyCar] = useState([]);
  const [sort, setSort] = useState("");
  const [uLoading, setUloading] = useState(null);
  const [dLoading, setDLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(
          `/myCar/${user.email}?sort=${sort}`
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [user.email, sort, axiosSecure]);

  // Handle delete action
  const handleDelete = async (id) => {
    Swal.fire({
      title: "<h3 style='color: #d9534f;'>Are you sure?</h3>",
      html: "<p style='color: #5a5a5a;'>This action is <strong>irreversible</strong>. Once deleted, the data cannot be recovered.</p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "<i class='fas fa-check-circle'></i> Yes, delete it!",
      cancelButtonText: "<i class='fas fa-times-circle'></i> Cancel",
      background: "#f9f9f9",
      customClass: {
        popup: "border border-gray-300 shadow-lg rounded-lg",
        title: "text-lg font-bold",
        actions: "gap-3",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDLoading(true);
        try {
          const { data } = await axiosSecure.delete(`/car-delete/${id}`);
          if (data.deletedCount > 0) {
            const remining = cars.filter((car) => car._id !== id);
            setCars(remining);
            setDLoading(false);
            Swal.fire({
              title: "<h3 style='color: #28a745;'>Deleted!</h3>",
              html: "<p style='color: #5a5a5a;'>Your file has been successfully deleted.</p>",
              icon: "success",
              background: "#f9f9f9",
              customClass: {
                popup: "border border-gray-300 shadow-lg rounded-lg",
                title: "text-lg font-bold",
              },
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "<h3 style='color: #d9534f;'>Error</h3>",
            html: "<p style='color: #5a5a5a;'>An error occurred while trying to delete the file. Please try again later.</p>",
            icon: "error",
            background: "#f9f9f9",
          });
        }
      }
    });
  };

  const handelUpdate = async (id) => {
    setUloading(id);
    try {
      const { data } = await axiosSecure.get(`/viewCar/${id}`);
      setOnlyCar(data);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    } finally {
      setUloading(null);
    }
  };

  return (
    <div className="lg:container mx-4 md:mx-6 min-h-screen lg:mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">My Cars</h2>
      <div className="mb-2">
        <select
          className="border bg-[#FFF0F1] rounded-md p-2"
          onChange={(e) => setSort(e.target.value)}
          name=""
          id=""
        >
          <option value="">Sort By Date</option>
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
        </select>
        <select
          className="border bg-[#FFF0F1] rounded-md p-2 ml-2"
          onChange={(e) => setSort(e.target.value)}
          name=""
          id=""
        >
          <option value="">Sort By Price</option>
          <option value="price_asc">Price (Lowest First)</option>
          <option value="price_desc">Price (Highest First)</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className=" w-full table border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#FF2C3B] text-white text-xl text-center">
              <th className=" ">Car Image</th>
              <th className="">Car Model</th>
              <th className="">Daily Rental Price</th>
              <th className="">Booking Count</th>
              <th className="">Availability</th>
              <th className="">Date Added</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <tr key={car._id} className="hover text-center">
                  <td className="">
                    <img
                      src={car.imageUrl}
                      alt={car.model}
                      className="w-full h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="">{car.model}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-3 py-1 bg-[#FF2C3B] text-white font-semibold rounded-lg shadow-sm">
                      ${car.dailyRentalPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 font-semibold rounded-md">
                      {car.bookingCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 font-semibold rounded-md ${
                        car.availability === "Available"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {car.availability}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-300">
                      {format(new Date(car.createdAt), "dd-MM-yyyy HH:mm")}
                    </span>
                  </td>
                  <td className="">
                    <div className="flex items-center justify-center">
                      {" "}
                      <button
                        className="border border-[#FF2D3C] text-[#FF2D3C] font-bold px-4 py-2 hover:bg-[#FF2D3C] transition-all duration-300 hover:text-white rounded mr-2"
                        onClick={() => handleDelete(car._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-[#09ee59] text-white px-4 py-2 rounded"
                        disabled={uLoading}
                        onClick={() => handelUpdate(car._id)}
                      >
                        {uLoading === car._id ? (
                          <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-white"></div>
                        ) : (
                          "Update"
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  rowSpan="3"
                  className="text-center text-2xl p-4"
                >
                  {loading ? (
                    <div className=" flex items-center  justify-center 0 z-50">
                      <div className="size-12 border-4 border-[#FF2C3B] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="text-center text-2xl p-4">
                      No cars added yet.
                      <Link to={"/addCar"}>
                        <button className="btn text-xl text-white bg-[#FF2C3B]">
                          Add car
                        </button>
                      </Link>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <CustomModal
          onlyCar={onlyCar}
          isOpen={isModalOpen}
          setCars={setCars}
          cars={cars}
          onClose={() => setIsModalOpen(false)}
        ></CustomModal>
        {dLoading && <Loading></Loading>}
      </div>
    </div>
  );
};

export default MyCar;
