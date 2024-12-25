import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import AuthContext from "../Context/AuthContext";
import auth from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // provider
  const googleProvider = new GoogleAuthProvider();
  // user registration
  const userRegistration = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // update user
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };
  // userLogin
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSign = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const useSignOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("current user", currentUser);
        setUser(currentUser);
        setLoading(false);
      } else {
        setLoading(false);
        setUser(null);
      }
    });
  }, []);
  const userInfo = {
    userRegistration,
    user,
    loading,
    userLogin,
    googleSign,
    useSignOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
