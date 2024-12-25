import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
const Login = () => {
  const { userLogin, googleSign } = useAuth();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    userLogin(email, password)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "login Successfully.",
          icon: "success",
          toast: true,
          timer: 3000,
          timerProgressBar: true,
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          text: "please provide a valid info",
          icon: "error",
          toast: true,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div className="container mx-auto max-w-md p-4 border border-gray-300 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Sign Into Your Account
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-4 text-gray-600">Or Login With</p>

      {/* Google Login Button */}
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
