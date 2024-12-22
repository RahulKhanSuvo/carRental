import { createBrowserRouter } from "react-router-dom";
import MailLayout from "../Layout/MailLayout";
import Home from "../Pages/Home";
import AddCar from "../Pages/AddCar";

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
        element: <AddCar></AddCar>,
      },
    ],
  },
]);
export default router;
