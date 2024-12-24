import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarDetails = () => {
  const { user } = useAuth();
  console.log(user);
  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState(new Date());

  const [dropoffDate, setDropoffDate] = useState(new Date());
  const [days, setDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/car-details/${id}`)
      .then((res) => setCar(res.data))
      .catch((error) => console.error("Error fetching car details:", error));
  }, [id]);

  useEffect(() => {
    if (pickupDate && dropoffDate && car) {
      const days = Math.ceil(
        (new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)
      );
      console.log(days);
      setDays(days);
      setTotalPrice(days > 0 ? days * car.dailyRentalPrice : 0);
    }
  }, [pickupDate, dropoffDate, car]);

  if (!car) {
    return <p className="text-center mt-10">Loading car details...</p>;
  }

  const {
    imageUrl,
    model,
    location,
    features,
    availability,
    dailyRentalPrice,
    description,
    bookingStatus,
    user: rentUser,
  } = car;

  const handleBookNow = async () => {
    if (!pickupDate || !dropoffDate || totalPrice <= 0) {
      Swal.fire({
        title: "Invalid Dates!",
        text: "Please select valid pickup and drop-off dates.",
        icon: "warning",
        background: "#f9f9f9",
      });
      return;
    }

    Swal.fire({
      title: `<h3>Confirm Booking</h3>`,
      html: `
        <div style="text-align: left;">
          <p><strong>Model:</strong> ${model}</p>
          <p><strong>Price Per Day:</strong> $${dailyRentalPrice}</p>
          <p><strong>Total Price:</strong> $${totalPrice}</p>
          <p><strong>Pickup Date:</strong> ${pickupDate}</p>
          <p><strong>Drop-off Date:</strong> ${dropoffDate}</p>
          <p><strong>Booking for</strong> ${days} day</p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Booking",
      cancelButtonText: "Cancel",
      background: "#f9f9f9",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const bookingDate = new Date().toISOString();
          const bookingPayload = {
            carId: id,
            model,
            imageUrl,
            dailyRentalPrice,
            bookingDate,
            pickupDate,
            dropoffDate,
            rentUser: rentUser.email,
            bookingStatus,
            totalPrice,
            bookingUser: {
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL,
            },
          };
          console.log(bookingPayload);

          const { data } = await axios.post(
            "http://localhost:5000/bookings",
            bookingPayload
          );
          console.log(data);
          Swal.fire({
            title: "Booking Confirmed!",
            text: `Your booking for ${model} has been confirmed.`,
            icon: "success",
            background: "#f9f9f9",
          });
        } catch (error) {
          console.error("Error creating booking:", error);
          Swal.fire({
            title: "Booking Failed!",
            text: "There was an issue confirming your booking. Please try again.",
            icon: "error",
            background: "#f9f9f9",
          });
        }
      }
    });
  };

  return (
    <div className="lg:container lg:mx-auto md:mx-6 p-4">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
        {/* Left Section: Car Details */}
        <div className="col-span-3">
          <div className="mb-6">
            <img
              className="w-full h-80 object-cover rounded-lg shadow-md"
              src={imageUrl}
              alt={model}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{model}</h1>
            <p className="text-gray-600 mb-2">
              <strong>Price Per Day:</strong> ${dailyRentalPrice}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> {location}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Availability:</strong>{" "}
              <span
                className={`font-semibold ${
                  availability === "Available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {availability}
              </span>
            </p>
            {description && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{description}</p>
              </div>
            )}
            {features?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Key Features</h2>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Booking Form */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3>
              <span className="font-bold text-[#FF2C3B]">
                ${dailyRentalPrice}
              </span>
              /day
            </h3>
            <h2 className="text-2xl font-medium">Book this Car</h2>

            <div className="mb-4">
              <label
                htmlFor="pickupDate"
                className="block font-medium text-gray-700"
              >
                Pickup Date
              </label>
              <div>
                <DatePicker
                  selected={pickupDate}
                  onChange={(date) => setPickupDate(date)}
                  showTimeSelect
                  showIcon
                  dateFormat="dd-MM-yyyy HH:mm"
                  minDate={new Date()}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="dropoffDate"
                className="block font-medium text-gray-700"
              >
                Drop-off Date
              </label>

              <DatePicker
                selected={dropoffDate}
                onChange={(date) => setDropoffDate(date)}
                showTimeSelect
                showIcon
                dateFormat="dd-MM-yyyy HH:mm"
                minDate={new Date()}
                className="w-full p-4 border border-gray-300 rounded-md"
              />
            </div>
            <p className="text-gray-600 mb-4">
              <strong>Total Price:</strong> ${totalPrice}
            </p>
            <button
              onClick={handleBookNow}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={availability !== "Available"}
            >
              {availability === "Available" ? "Book Now" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
