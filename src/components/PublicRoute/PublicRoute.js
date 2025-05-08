import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("client_id"); 
  const location = useLocation();
  console.log(location,"location")

  const from = location.state?.from?.pathname || "/"; 

  return isAuthenticated ? <Navigate to={from} replace /> : children; 
};

export default PublicRoute;
