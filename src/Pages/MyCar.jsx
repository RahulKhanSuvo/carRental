import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import CustomModal from "../Modal/CustomModal";

const MyCar = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [onlyCar, setOnlyCar] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/myCar/${user.email}`)
      .then((res) => setCars(res.data));
  }, [user.email, isModalOpen]);

  // Handle delete action
  const handleDelete = async (id) => {};

  // Handle edit action

  const handelUpdate = async (id) => {
    console.log(id);

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
