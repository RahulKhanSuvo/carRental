import AuthContext from "../Context/AuthContext";

const AuthProvider = ({ children }) => {
  const userInfo = {
    name: "y",
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
