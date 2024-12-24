import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
const ModifyDate = ({ isOpen, onClose, onlyBooking }) => {
  if (!isOpen) return null;
  const [pickup, setPickup] = useState(() =>
    onlyBooking.pickupDate ? new Date(onlyBooking.pickupDate) : new Date()
  );
  const [dropoff, setDropoff] = useState(() =>
    onlyBooking.dropoffDate ? new Date(onlyBooking.dropoffDate) : new Date()
  );
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (pickup && dropoff) {
      const days = Math.ceil(
        (new Date(dropoff) - new Date(pickup)) / (1000 * 60 * 60 * 24)
      );
      setTotalPrice(days > 0 ? days * onlyBooking.dailyRentalPrice : 0);
    }
  }, [pickup, dropoff, onlyBooking]);
  const updateData = {
    totalPrice,
    pickup,
    dropoff,
  };

  const handleSave = async () => {
    if (pickup >= dropoff) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date Range",
        text: "Pickup date must be earlier than the drop-off date.",
      });
      return;
    }

    try {
      const res = await axios.patch(
        `http://localhost:5000/date-update/${onlyBooking._id}`,
        updateData
      );

      Swal.fire({
        title: "Modify Confirmed!",
        text: `Your booking for ${onlyBooking.model} has been confirmed.`,
        icon: "success",
        background: "#f9f9f9",
      });

      onClose();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue updating your booking. Please try again later.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] flex flex-col justify-center items-center">
        <h2 className="text-lg font-bold mb-4">Modify Booking Dates</h2>
        <div className="mb-4">
          <label
            htmlFor="pickupDate"
            className="block font-medium text-gray-700"
          >
            Pickup Date
          </label>
          <DatePicker
            selected={pickup}
            onChange={(date) => setPickup(date)}
            showTimeSelect
            dateFormat="dd-MM-yyyy HH:mm"
            minDate={new Date()}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dropoffDate"
            className="block font-medium text-gray-700"
          >
            Drop-off Date
          </label>
          <DatePicker
            selected={dropoff}
            onChange={(date) => setDropoff(date)}
            showTimeSelect
            dateFormat="dd-MM-yyyy HH:mm"
            minDate={pickup} // Ensure drop-off date is after the pickup date
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            conform
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyDate;
