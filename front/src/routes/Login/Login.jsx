// import styleLogin from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/AuthProvider";
import logo from "./logo.png";
import { GiMeal } from "react-icons/gi";

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const { setLogIn, setAuth } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const API_URL = "https://c16-24-n-node-react.vercel.app/api/auth/login";

    try {
      const res = await axios.post(
        API_URL,
        { email, password },
        {
          hearder: { "Content-Type": "application/json" },
          widthCredentials: true,
        }
      );
      const user = "@" + res?.data?.user?.user_name;
      const accessToken = res?.data?.user?.token;
      setAuth({ email, password, user, accessToken });
      navigate("/");
      console.log(res.data);
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("user", user);
      setLogIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article className="flex items-center justify-center pl-[-30px] p-32 max-md:flex-col max-md:mt-14 max-md:gap-26 lg:gap-x-32">
      <div>
        <img src={logo} alt="Logo" />
      </div>

      {/* <div className="-top-2 -left-2 -right-2 -bottom-2 rounded-lg  shadow-lg animate-pulse"></div> */}
      <div
        id="form-container"
        className="bg-white p-16 rounded-lg shadow-xl w-80 relative z-10 transform transition duration-500 ease-in-out"
      >
        <h2
          id="form-title"
          className="text-center text-3xl font-bold mb-10 text-gray-800"
        >
          Log in
        </h2>
        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            className="w-full h-12 border border-gray-800 px-3 rounded-lg"
            placeholder="Email"
            id="email"
            name="email"
            type="text"
            value={email}
            autoComplete="current-password"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full h-12 border border-gray-800 px-3 rounded-lg"
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="flex items-center justify-center gap-4 w-full h-12 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            <GiMeal />
            To access
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {/* <a className="text-blue-500 hover:text-blue-800 text-sm" href="#">
            Forgot your password?
          </a> */}
        </form>
        <section className="mt-4 ">
          <p className="text-sm mb-4">You do not have an account?</p>
          <Link
            className="w-full h-12 bg-gray-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
            "
            to={"/registro"}
          >
            Register
          </Link>
        </section>
      </div>
    </article>
  );
}
