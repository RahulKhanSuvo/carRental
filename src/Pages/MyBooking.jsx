import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { format } from "date-fns";
import { IoTrashOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import ModifyDate from "../Modal/ModifyDate";
import { Bar } from "react-chartjs-2"; //
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

  useEffect(() => {
    axiosSecure
      .get(`/my-bookings/${user.email}`)
      .then((res) => setBookings(res.data));
  }, [user.email, isDone, isModalOpen, axiosSecure]);

  const handleModifyBooking = async (bookingId) => {
    try {
      const { data } = await axiosSecure.get(`/single-booking/${bookingId}`);
      setOnlyBooking(data);
      setIsModalOpen(true);
    } catch (error) {
      // console.log(error);
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
          .patch(`/booking-status/${bookingId}`, {
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
          .catch(() => {
            Swal.fire("Error!", "Could not cancel booking.", "error");
          });
      }
    });
  };

  const chartData = {
    labels: bookings.map((booking) => booking.model),
    datasets: [
      {
        label: "Daily Rental Price",
        data: bookings.map((booking) => booking.totalPrice),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="lg:container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {/* Chart */}
      {bookings.length > 0 && (
        <div className="mb-8">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Car Daily Rental Price",
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: "Price ($)",
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}

      {bookings.length > 0 ? (
        <div className="overflow-auto shadow-lg rounded-lg">
          <table className="table text-center ">
            <thead className="text-center">
              <tr className="text-xl text-white bg-[#FF2C3B]">
                <th className="">Car Image</th>
                <th className="">Car Model</th>
                <th className="">Booking Date</th>
                <th className="">Total Price</th>
                <th className="">Booking Status</th>
                <th className="">Actions</th>
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
                      {/* Pickup Date */}
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

                      {/* Drop-off Date */}
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
                      {/* Cancel Button */}
                      <button
                        onClick={() =>
                          handleCancelBooking(booking._id, "Canceled")
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-200 ease-in-out"
                      >
                        <IoTrashOutline className="text-lg" />
                        <span>Cancel</span>
                      </button>

                      {/* Modify Date Button */}
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
          ></ModifyDate>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">No bookings found.</p>
      )}
    </div>
  );
};

export default MyBooking;
