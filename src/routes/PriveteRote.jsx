import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { currentUser,loading  } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen">
        <Loading></Loading>
      </div>
    );
  }
  console.log({ currentUser, loading });

  if (currentUser || localStorage.getItem("token")) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};


export default PrivateRoute;