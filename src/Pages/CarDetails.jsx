import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { GiCarDoor, GiGearStick } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";

const CarDetails = () => {
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState(new Date());
  const [dropoffDate, setDropoffDate] = useState(new Date());
  const [days, setDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  console.log(car);
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
      setDays(days);
      setTotalPrice(days > 0 ? days * car.dailyRentalPrice : 0);
    }
  }, [pickupDate, dropoffDate, car]);

  if (!car) {
    return <p className="text-center mt-10 text-xl">Loading car details...</p>;
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
    fuel,
    gear,
    doors,
    passengers,
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
          <p><strong>Booking for</strong> ${days} day${days > 1 ? "s" : ""}</p>
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

          const { data } = await axios.post(
            "http://localhost:5000/bookings",
            bookingPayload
          );
          Swal.fire({
            title: "Booking Confirmed!",
            text: `Your booking for ${model} has been confirmed.`,
            icon: "success",
            background: "#f9f9f9",
          });
        } catch (error) {
          Swal.fire({
            title: "Booking Failed!",
            text: `${error.response.data.message}`,
            icon: "error",
            background: "#f9f9f9",
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
        {/* Left Section: Car Details */}
        <div className="col-span-3">
          <div className="mb-6">
            <img
              className="w-full h-80 object-cover rounded-lg shadow-lg"
              src={imageUrl}
              alt={model}
            />
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <p className="text-xl font-bold text-[#FF2C61] flex items-center mb-4">
              <CiLocationOn className="mr-2" />
              {location}
            </p>
            <div className="flex justify-between">
              <h1 className="text-3xl font-semibold pb-4 border-b mb-4">
                {model}
              </h1>
              <p className="text-lg text-gray-700 mb-2">
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
            </div>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Price Per Day:</strong> ${dailyRentalPrice}
            </p>

            {features?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
                <ul className="list-none flex flex-wrap gap-4 text-gray-700">
                  {features.map((feature, index) => (
                    <li className="flex gap-2 items-center" key={index}>
                      <IoMdCheckmarkCircle className="text-[#4DDF65]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="border-t pt-4 text-xl text-[#FF2C61] flex flex-wrap justify-between border-b pb-4">
              <p className="flex gap-2 items-center">
                <MdOutlineAirlineSeatReclineNormal />
                <span>{passengers}</span> Seats
              </p>
              <p className="flex gap-2 items-center">
                <GiGearStick />
                <span>{gear}</span>
              </p>
              <p className="flex gap-2 items-center">
                <GiCarDoor />
                <span>{doors}</span> Doors
              </p>
              <p className="flex gap-2 items-center">
                <FaGasPump />
                <span>{fuel}</span>
              </p>
            </div>
            {description && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Booking Form */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl border-b font-semibold pb-6">
              <span className="text-4xl mr-2 font-bold text-[#FF2C61]">
                ${dailyRentalPrice}
              </span>
              /day
            </h3>
            <h2 className="text-2xl font-medium mb-4 mt-3">Book this Car</h2>

            <div className="mb-4">
              <label
                htmlFor="pickupDate"
                className="block text-lg font-medium text-gray-700"
              >
                Pickup Date
              </label>
              <DatePicker
                selected={pickupDate}
                onChange={(date) => setPickupDate(date)}
                showTimeSelect
                dateFormat="dd-MM-yyyy HH:mm"
                minDate={new Date()}
                className="w-full p-2 border border-gray-300 bg-[#F4F4F4] rounded-md mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="dropoffDate"
                className="block text-lg font-medium text-gray-700"
              >
                Drop-off Date
              </label>
              <DatePicker
                selected={dropoffDate}
                onChange={(date) => setDropoffDate(date)}
                showTimeSelect
                dateFormat="dd-MM-yyyy HH:mm"
                minDate={new Date()}
                className="w-full p-2 border border-gray-300 bg-[#F4F4F4] rounded-md mt-2"
              />
            </div>

            <p className="text-lg text-gray-700 mb-4">
              <strong>Total Price:</strong> ${totalPrice}
            </p>

            <button
              onClick={handleBookNow}
              className="w-full py-3 bg-[#FF2C61] text-white disabled:bg-gray-500 disabled:cursor-not-allowed font-semibold rounded-md hover:bg-[#d42e4b]"
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
