import axios from "axios";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { IoMdCloseCircleOutline } from "react-icons/io";
const CustomModal = ({ isOpen, onClose, onlyCar }) => {
  const { user } = useAuth();

  const {
    _id,
    model,
    dailyRentalPrice,
    location,
    imageUrl,
    description,
    vehicleRegNumber,
    availability,
    features,
  } = onlyCar;
  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const features = formData.getAll("features");
    formData.delete("features");
    const initialData = Object.fromEntries(formData.entries());
    initialData.features = features;

    // Validation logic
    if (!initialData.model.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Car model is required.",
      });
      return;
    }

    if (!initialData.dailyRentalPrice || initialData.dailyRentalPrice <= 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Daily rental price must be a positive number.",
      });
      return;
    }

    if (!initialData.vehicleRegNumber.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Vehicle registration number is required.",
      });
      return;
    }

    if (!initialData.location.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Location is required.",
      });
      return;
    }

    if (!initialData.imageUrl.trim() || !isValidUrl(initialData.imageUrl)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please provide a valid image URL.",
      });
      return;
    }

    if (!initialData.description.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Description is required.",
      });
      return;
    }

    initialData.dailyRentalPrice = Number(initialData.dailyRentalPrice);
    const finalData = {
      ...initialData,
      bookingCount: 0,
      bookingStatus: "Pending",
      user: {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      },
    };

    try {
      const { data } = await axios.patch(
        `http://localhost:5000/carUpdate/${_id}`,
        finalData
      );
      console.log(data);
      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Updated Successfully.",
          icon: "success",
          confirmButtonText: "OK",
          toast: true,
          timer: 3000,
          timerProgressBar: true,
          showCloseButton: true,
        });
        onClose();
      } else {
        Swal.fire({
          icon: "warning",
          title: "No Changes Detected",
          text: "Please add new info to update.",
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  const isValidUrl = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}|localhost)(:\\d+)?(\\/.*)?$"
    );
    return pattern.test(url);
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 md:w-auto">
        <div className="lg:container mx-4 lg:mx-auto">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">update your Car</h2>
            <button onClick={onClose}>
              <IoMdCloseCircleOutline size={30} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Car Model */}
            <div>
              <label
                className="font-medium text-gray-700 block"
                htmlFor="carModel"
              >
                Car Model
              </label>
              <input
                type="text"
                name="model"
                defaultValue={model}
                placeholder="Enter car model"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Daily Rental Price */}
            <div>
              <label
                htmlFor="dailyRentalPrice"
                className="block font-medium text-gray-700"
              >
                Daily Rental Price
              </label>
              <input
                type="number"
                id="dailyRentalPrice"
                name="dailyRentalPrice"
                defaultValue={dailyRentalPrice}
                placeholder="Enter daily rental price"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Availability */}
            <div>
              <label
                htmlFor="availability"
                className="block font-medium text-gray-700"
              >
                Availability
              </label>
              <select
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                name="availability"
                defaultValue={availability}
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            {/* Registration Number */}
            <div>
              <label
                htmlFor="vehicleRegNumber"
                className="block font-medium text-gray-700"
              >
                Vehicle Registration Number
              </label>
              <input
                type="text"
                id="vehicleRegNumber"
                name="vehicleRegNumber"
                defaultValue={vehicleRegNumber}
                placeholder="Enter registration number"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Features */}
            <div>
              <label
                htmlFor="features"
                className="block font-medium text-gray-700"
              >
                Features
              </label>
              <div className="space-x-2">
                {["GPS", "AC", "Bluetooth", "Sunroof", "Backup Camera"].map(
                  (feature) => (
                    <label key={feature} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="features"
                        value={feature}
                        defaultChecked={features.includes(feature)}
                        className="form-checkbox h-5 w-5 text-blue-500"
                      />
                      <span className="ml-2 text-gray-700">{feature}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                defaultValue={description}
                id="description"
                name="description"
                placeholder="Enter car description"
                rows="4"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                defaultValue={imageUrl}
                name="imageUrl"
                placeholder="Enter image URL"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={location}
                placeholder="Enter location"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
