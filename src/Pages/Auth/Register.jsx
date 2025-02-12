import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Register = () => {
  const { userRegistration, updateUser } = useAuth();
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const photoUrl = formData.get("photoUrl");
    if (!name || !email || !password) {
      Swal.fire({
        title: "warning!",
        text: "All fields are required!",
        icon: "warning",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        icon: "error",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        title: "Password too short",
        text: "Password must be at least 6 characters long.",
        icon: "error",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Password Invalid",
        text: "Password must be at least 6 characters long and include both uppercase and lowercase letters.",
        icon: "error",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }
    userRegistration(email, password)
      .then(() => {
        updateUser({ displayName: name, photoURL: photoUrl })
          .then(() => {
            Swal.fire({
              title: "success",
              text: "Registration successfully",
              icon: "success",
              toast: true,
              timer: 3000,
              timerProgressBar: true,
            });
            navigate("/login");
          })
          .catch(() => {});
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
    <div className=" min-h-screen pt-16 bg-gray-100">
      <Helmet>
        <title>Carola | Register</title>
      </Helmet>
      <div className="w-full max-w-lg mx-auto  bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter your name"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label
              htmlFor="photoUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Photo URL
            </label>
            <input
              type="url"
              name="photoUrl"
              required
              id="photoUrl"
              placeholder="Enter your photo URL"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#FF2C3B] text-white font-medium rounded-md hover:bg-[#961119] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
        <SocialLogin></SocialLogin>
        {/* Login Redirect */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
