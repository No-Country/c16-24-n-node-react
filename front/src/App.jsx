import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./routes/Login/Login";
import NavBar from "./components/Navbar";
import { Home } from "./routes/Home/Home";
import { Registro } from "./routes/Register/Registro";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
