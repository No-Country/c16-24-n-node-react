/* eslint-disable react/prop-types */
import { useAuthContext } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  let navigate = useNavigate();
   
  const { logIn } = useAuthContext();
  
    
  return logIn? children : navigate("/login") ? navigate("/login") : navigate("/login")
}

export default PrivateRoute