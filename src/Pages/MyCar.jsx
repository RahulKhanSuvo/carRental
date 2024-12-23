import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import CustomModal from "../Modal/CustomModal";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const MyCar = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [onlyCar, setOnlyCar] = useState([]);
  const [sort, setSort] = useState("");
  console.log(sort);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/myCar/${user.email}?sort=${sort}`)
      .then((res) => setCars(res.data));
  }, [user.email, isModalOpen, sort]);

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
        try {
          const { data } = await axios.delete(
            `http://localhost:5000/car-delete/${id}`
          );
          if (data.deletedCount > 0) {
            const remining = cars.filter((car) => car._id !== id);
            setCars(remining);
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

  // Handle edit action

  const handelUpdate = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/viewCar/${id}`);
      setOnlyCar(data);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">My Cars</h2>
      <div>
        <select onChange={(e) => setSort(e.target.value)} name="" id="">
          <option value="">Sort By Date</option>
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
        </select>
        <select onChange={(e) => setSort(e.target.value)} name="" id="">
          <option value="">Sort By Price</option>
          <option value="price_asc">Price (Lowest First)</option>
          <option value="price_desc">Price (Highest First)</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Car Image</th>
              <th className="border border-gray-300 p-2">Car Model</th>
              <th className="border border-gray-300 p-2">Daily Rental Price</th>
              <th className="border border-gray-300 p-2">Availability</th>
              <th className="border border-gray-300 p-2">Date Added</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <tr key={car._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">
                    <img
                      src={car.imageUrl}
                      alt={car.model}
                      className="w-full object-center object-cover h-28 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">{car.model}</td>
                  <td className="border border-gray-300 p-2">
                    ${car.dailyRentalPrice}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {car.availability}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(car.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => handleDelete(car._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handelUpdate(car._id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No cars added yet.
                  <Link to={"/addCar"}>
                    <button>Add car</button>
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <CustomModal
          onlyCar={onlyCar}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        ></CustomModal>
      </div>
    </div>
  );
};

export default MyCar;
