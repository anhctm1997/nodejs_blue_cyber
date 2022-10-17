import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { history } from "../hook/history";

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <>
      {accessToken ? (
        children
      ) : (
        <Navigate to="/error" state={{ from: history.location }} />
      )}
    </>
  );
};
export default PrivateRoute;
