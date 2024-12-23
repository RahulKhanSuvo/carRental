import axios from "axios";
import useAuth from "../Hooks/useAuth";

const AddCar = () => {
  const { user } = useAuth();
  console.log(user.email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const features = formData.getAll("features");
    formData.delete("features");

    const initialData = Object.fromEntries(formData.entries());
    initialData.features = features;
    const createdAt = new Date().toISOString();
    const finalData = {
      ...initialData,

      bookingCount: 0,
      bookingStatus: "Pending",
      createdAt,
      user: {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      },
    };

    console.log(finalData);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/add-car",
        finalData
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:container mx-4 lg:mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add a New Car</h2>
      <form onSubmit={handleSubmit}>
        {/* Car Model */}
        <div>
          <label className="font-medium text-gray-700 block" htmlFor="carModel">
            Car Model
          </label>
          <input
            type="text"
            name="model"
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
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Features */}
        <div>
          <label htmlFor="features" className="block font-medium text-gray-700">
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
            id="description"
            name="description"
            placeholder="Enter car description"
            rows="4"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
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
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
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
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Car Details
        </button>
      </form>
    </div>
  );
};

export default AddCar;
