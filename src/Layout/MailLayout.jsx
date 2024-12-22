import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

const MailLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default MailLayout;
