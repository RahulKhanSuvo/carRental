import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { userLogin } = useAuth();
  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    userLogin(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleLogin = () => {
    console.log("Google Login Clicked");
    // Add your Google login logic here
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
      <div className="flex justify-center mt-2">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          <span>Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
