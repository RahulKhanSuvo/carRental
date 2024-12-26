import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex-grow pt-20 bg-gray-50">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
