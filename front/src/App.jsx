import { Route, Routes } from "react-router-dom";
import { Login } from "./routes/Login/Login";
import NavBar from "./components/Navbar";
import { Home } from "./routes/Home/Home";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
