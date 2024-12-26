import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const navigate = useNavigate();
  const { googleSign } = useAuth();

  const handleGoogleLogin = () => {
    googleSign()
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Logged in successfully.",
          icon: "success",
          toast: true,
          timer: 3000,
          timerProgressBar: true,
        });
        navigate("/");
      })
      .catch((error) => {
        // console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          toast: true,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div className="flex justify-center mt-2">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
      >
        <FaGoogle size={20} className="text-blue-500" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
