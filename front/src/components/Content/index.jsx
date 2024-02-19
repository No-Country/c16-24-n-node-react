import { Route, Routes, Navigate } from "react-router-dom";
import  Login from "../../routes/Login/Login";
import  Home from "../../routes/Home/Home";
import Registro from "../../routes/Register/Registro"; 

const Content = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default Content;
