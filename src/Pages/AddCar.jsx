import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/UseAxios";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const AddCar = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
const [loading ,setLoading]=useState(false)
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const features = formData.getAll("features");
    formData.delete("features");

    const initialData = Object.fromEntries(formData.entries());
    initialData.features = features;
    initialData.dailyRentalPrice = Number(initialData.dailyRentalPrice);
    const createdAt = new Date().toISOString();

    const finalData = {
      ...initialData,
      bookingStatus: "Pending",
      createdAt,
      user: {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      },
    };

    try {
      await axiosSecure.post("/add-car", finalData);

      Swal.fire({
        title: "Car Added Successfully!",
        text: "Your car has been added to the database.",
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
      });
      form.reset();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="lg:container  mx-4 mt-5 lg:mx-auto">
      <Helmet>
        <title>Carola | Add car</title>
      </Helmet>
      <h2 className="text-2xl  w-full font-bold mb-6 text-center">
        Add a New Car
      </h2>
      <form
        onSubmit={handleSubmit}
        className="lg:grid grid-cols-1 max-w-3xl border p-6 rounded-lg w-full mx-auto  gap-6"
      >
        {/* Car Model */}
        <div className="">
          <label className="font-medium text-gray-700 block" htmlFor="carModel">
            Car Model
          </label>
          <input
            type="text"
            name="model"
            placeholder="Enter car model"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
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
            placeholder="Enter daily rental price"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
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
            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="availability"
            required
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
            placeholder="Enter registration number"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="imageUrl" className="block font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            placeholder="Enter image URL"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Features */}
        <div className="lg:col-span-3 md:grid grid-cols-4 gap-6">
          <div className="col-span-3">
            <label
              htmlFor="features"
              className="block font-medium text-gray-700"
            >
              Features
            </label>
            <div className="space-x-2 border rounded-lg p-2 grid grid-cols-2 md:grid-cols-3 ">
              {[
                "GPS",
                "AC",
                "Bluetooth",
                "Sunroof",
                "Backup Camera",
                "Cruise Control",
                "Keyless Entry",
                "Parking Sensors",
                "Alloy Wheels",
              ].map((feature) => (
                <label key={feature} className=" ">
                  <input
                    type="checkbox"
                    name="features"
                    value={feature}
                    className=" h-5 w-5 text-red-500"
                  />
                  <span className="ml-2 text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="bookingCount"
              className="block font-medium text-gray-700"
            >
              Booking Count
            </label>
            <input
              type="number"
              name="bookingCount"
              placeholder="Enter count"
              defaultValue={0}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="col-span-3">
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter car description"
            rows="4"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Specifications Section */}
        <div className="col-span-3">
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            Car Specifications
          </h3>

          {/* Doors and Fuel */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="doors"
                className="block font-medium text-gray-700"
              >
                Doors
              </label>
              <select
                className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="doors"
                required
              >
                {[2, 3, 4, 5].map((door) => (
                  <option key={door} value={door}>
                    {door} Door{door > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="fuel" className="block font-medium text-gray-700">
                Fuel
              </label>
              <select
                className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="fuel"
                required
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Passengers and Gear */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="passengers"
                className="block font-medium text-gray-700"
              >
                Passengers
              </label>
              <select
                className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="passengers"
                required
              >
                {[2, 3, 4, 5, 6, 7].map((passenger) => (
                  <option key={passenger} value={passenger}>
                    {passenger} Passenger{passenger > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="gear" className="block font-medium text-gray-700">
                Gear Type
              </label>
              <select
                className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="gear"
                required
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-3 mt-6">
          <button
            type="submit"
            className="w-full py-3 bg-[#FF2C3B] text-white rounded-md shadow-md hover:bg-[#f7101f] focus:outline-none focus:ring-2 "
          >
            Save Car Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
