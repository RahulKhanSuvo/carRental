import { createBrowserRouter } from "react-router-dom";
import MailLayout from "../Layout/MailLayout";
import Home from "../Pages/Home";
import AddCar from "../Pages/AddCar";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRouter from "./PrivateRouter";
import MyCar from "../Pages/MyCar";
import AvailableCars from "../Pages/AvailableCars";
import CarDetails from "../Pages/CarDetails";
import MyBooking from "../Pages/MyBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MailLayout></MailLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addCar",
        element: (
          <PrivateRouter>
            <AddCar></AddCar>,
          </PrivateRouter>
        ),
      },
      {
        path: "/myCar",
        element: (
          <PrivateRouter>
            <MyCar></MyCar>
          </PrivateRouter>
        ),
      },
      {
        path: "/availableCar",
        element: <AvailableCars></AvailableCars>,
      },
      {
        path: "/carDetails/:id",
        element: <CarDetails></CarDetails>,
      },
      {
        path: "/myBookings",
        element: (
          <PrivateRouter>
            <MyBooking></MyBooking>
          </PrivateRouter>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);
export default router;
