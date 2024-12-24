import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { format } from "date-fns";
import { IoTrashOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import ModifyDate from "../Modal/ModifyDate";
const MyBooking = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isDone, setDone] = useState("");
  const [onlyBooking, setOnlyBooking] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/my-bookings/${user.email}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, [user.email, isDone, isModalOpen]);

  const handleModifyBooking = async (bookingId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/single-booking/${bookingId}`
      );
      setOnlyBooking(data);
      setIsModalOpen(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelBooking = (bookingId, status) => {
    Swal.fire({
      title: "Are you sure you want to cancel this booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .patch(`http://localhost:5000/booking-status/${bookingId}`, {
            status,
          })
          .then(() => {
            Swal.fire(
              "Canceled!",
              "Your booking has been canceled.",
              "success"
            );
            setDone("by cancel");
          })
          .catch((error) => {
            console.error("Error canceling booking:", error);
            Swal.fire("Error!", "Could not cancel booking.", "error");
          });
      }
    });
  };

  return (
    <div className="lg:container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.length > 0 ? (
        <div className="overflow-auto shadow-lg rounded-lg">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-800 uppercase text-xs tracking-wider">
                <th className="border border-gray-300 p-3 text-left">
                  Car Image
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Car Model
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Booking Date
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Total Price
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Booking Status
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition duration-150`}
                >
                  <td className="border border-gray-300 p-3">
                    <img
                      src={booking.imageUrl}
                      alt={booking.model}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    {booking.model}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <span>
                      {" "}
                      {format(new Date(booking.pickupDate), "dd-MM-yyyy HH:mm")}
                    </span>
                    <span> to </span>
                    <span>
                      {" "}
                      {format(
                        new Date(booking.dropoffDate),
                        "dd-MM-yyyy HH:mm"
                      )}
                    </span>
                  </td>

                  <td className="border border-gray-300 p-3">
                    ${booking.totalPrice.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-md font-semibold ${
                        booking.bookingStatus === "Confirmed"
                          ? "bg-green-100 text-green-600"
                          : booking.bookingStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-3 space-x-2 ">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleCancelBooking(booking._id, "Canceled")
                        }
                        className="px-3 flex justify-between items-center py-1 bg-[#FF2C3B] text-white rounded-md hover:bg-[#111111]  transition duration-150"
                      >
                        <IoTrashOutline /> Cancel
                      </button>
                      <button
                        onClick={() => handleModifyBooking(booking._id)}
                        className="px-3 py-1 bg-[#08B7E3] flex justify-between items-center text-white rounded-md hover:bg-[#023a47] transition duration-150"
                      >
                        <FaCalendarAlt />
                        Modify Date
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ModifyDate
            setDone={setDone}
            onlyBooking={onlyBooking}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          ></ModifyDate>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">No bookings found.</p>
      )}
    </div>
  );
};

export default MyBooking;
