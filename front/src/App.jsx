import { Route, Routes } from "react-router-dom";
import { Login } from "./routes/Login";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
