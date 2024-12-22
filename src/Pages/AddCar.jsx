import { useDropzone } from "react-dropzone";

const AddCar = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData
    const formData = new FormData(e.target);

    // Append files to FormData
    acceptedFiles.forEach((file) => {
      formData.append("images", file);
    });

    // Convert FormData to an object (excluding files)
    const initialData = Object.fromEntries(formData.entries());
    console.log("Form Data (Object):", initialData);

    try {
      // Send form data to the backend
      const response = await fetch("http://localhost:5000/api/cars", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save car details");
      }

      const result = await response.json();
      console.log("Car added successfully:", result);
    } catch (error) {
      console.error("Error:", error);
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

        {/* Vehicle Registration Number */}
        <div>
          <label
            htmlFor="vehicleRegNumber"
            className="block font-medium text-gray-700"
          >
            Vehicle Registration Number
          </label>
          <input
            type="text"
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
            name="description"
            placeholder="Enter car description"
            rows="4"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Image Upload (React Dropzone) */}
        <div className="mt-4">
          <label htmlFor="images" className="block font-medium text-gray-700">
            Upload Images
          </label>
          <div
            {...getRootProps()}
            className="w-full mt-1 p-4 border border-dashed border-gray-300 text-center rounded-md"
          >
            <input {...getInputProps()} name="images" />
            <p className="text-gray-500">
              Drag & drop or click to upload images
            </p>
          </div>
          {acceptedFiles.length > 0 && (
            <div className="mt-2">
              <h4 className="font-medium text-gray-700">Uploaded Images:</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {acceptedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
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
