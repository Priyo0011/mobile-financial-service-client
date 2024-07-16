import { createContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoader, setProfileLoader] = useState(false);
  const axiosSecure = useAxiosSecure();

  console.log(location);

  const logOut = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosSecure.get("/auth").then((data) => {
        setCurrentUser(data?.data);
        console.log(data?.data);
      });
      setLoading(false);
    }
    setLoading(false);
  }, [profileLoader]);

  const authInfo = {
    currentUser,
    loading,
    setLoading,
    logOut,
    profileLoader,
    setProfileLoader,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
