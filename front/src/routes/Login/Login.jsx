// import styleLogin from "./login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://c16-24-n-node-react.vercel.app/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        throw new Error("Error al iniciar sesión");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-h-full grid place-content-center p-[250px]">
      <div className="h-96 flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="relative">
          <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
          <div
            id="form-container"
            className="bg-white p-16 rounded-lg shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out"
          >
            <h2
              id="form-title"
              className="text-center text-3xl font-bold mb-10 text-gray-800"
            >
              Iniciar sesión
            </h2>
            <form className="space-y-5" onSubmit={handleLogin}>
              <input
                className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                placeholder="Email"
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                placeholder="Contraseña"
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Acceder
              </button>
              {error && <p className="text-red-500">{error}</p>}
              <a className="text-blue-500 hover:text-blue-800 text-sm" href="#">
                Olvido su contraseña?
              </a>
              <Link to={"/registro"}>Registrar</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
