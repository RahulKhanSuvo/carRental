import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    <h3>Loading</h3>;
  }
  if (user) {
    children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRouter;
