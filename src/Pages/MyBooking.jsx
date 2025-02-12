import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { format } from "date-fns";
import { IoTrashOutline } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import ModifyDate from "../Modal/ModifyDate";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAxiosSecure from "../Hooks/UseAxios";
import { Helmet } from "react-helmet-async";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isDone, setDone] = useState("");
  const [onlyBooking, setOnlyBooking] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    setIsLoading(true); // Start loading
    axiosSecure
      .get(`/my-bookings/${user.email}`)
      .then((res) => setBookings(res.data))
      .finally(() => setIsLoading(false)); // Stop loading
  }, [user.email, isDone, isModalOpen, axiosSecure]);

  if (isLoading) {
    return (
      <div className="flex justify-center  min-h-[100vh] items-center ">
        <div className="loader border-t-4 border-b-4 border-[#FF2C3B] w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleModifyBooking = async (bookingId) => {
    try {
      const { data } = await axiosSecure.get(`/single-booking/${bookingId}`);
      setOnlyBooking(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
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
        await axiosSecure
          .patch(`/booking-status/${bookingId}`, { status })
          .then(() => {
            Swal.fire(
              "Canceled!",
              "Your booking has been canceled.",
              "success"
            );
            setDone("by cancel");
          })
          .catch(() => {
            Swal.fire("Error!", "Could not cancel booking.", "error");
          });
      }
    });
  };

  return (
    <div className="lg:container  mx-auto min-h-[calc(100vh)] p-4">
      <Helmet>
        <title>Carola | My Booking</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {isLoading ? (
        <div className="flex justify-center  items-center h-64">
          <div className="loader border-t-4 border-b-4 border-[#FF2C3B] w-12 h-12 rounded-full animate-spin"></div>
        </div>
      ) : bookings.length > 0 ? (
        <div className="overflow-auto shadow-lg rounded-lg">
          <table className="table text-center">
            <thead className="text-center">
              <tr className="text-xl text-white bg-[#FF2C3B]">
                <th>Car Image</th>
                <th>Car Model</th>
                <th>Booking Date</th>
                <th>Total Price</th>
                <th>Booking Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-200 transition duration-150`}
                >
                  <td className="border border-gray-300 p-3">
                    <img
                      src={booking.imageUrl}
                      alt={booking.model}
                      className="w-full h-28 rounded-md"
                    />
                  </td>
                  <td className="border border-gray-300 text-lg">
                    {booking.model}
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-500 font-semibold">
                          Start:
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                          {format(
                            new Date(booking.pickupDate),
                            "dd-MM-yyyy HH:mm"
                          )}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-green-500 font-semibold">
                          End:
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md">
                          {format(
                            new Date(booking.dropoffDate),
                            "dd-MM-yyyy HH:mm"
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    ${booking.totalPrice.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-md font-semibold ${
                        booking.bookingStatus === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : booking.bookingStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <button
                        onClick={() =>
                          handleCancelBooking(booking._id, "Canceled")
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-200 ease-in-out"
                      >
                        <IoTrashOutline className="text-lg" />
                        <span>Cancel</span>
                      </button>

                      <button
                        onClick={() => handleModifyBooking(booking._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-200 ease-in-out"
                      >
                        <FaCalendarAlt className="text-lg" />
                        <span>Modify Date</span>
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
          />
        </div>
      ) : (
        <p className="text-center text-4xl text-gray-600 mt-6">
          No bookings found.
        </p>
      )}
    </div>
  );
};

export default MyBooking;
