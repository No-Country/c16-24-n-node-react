import { Route, Routes } from "react-router-dom";
import { Login } from "./routes/Login/Login";
import NavBar from "./components/Navbar";
import { Home } from "./routes/Home/Home";
import { NotFound } from "./routes/NotFound";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
