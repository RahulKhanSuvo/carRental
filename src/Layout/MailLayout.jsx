import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />

      <div className="bg-gray-50">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
