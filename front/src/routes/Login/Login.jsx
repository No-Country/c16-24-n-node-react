import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/AuthProvider";
import logo from "../../assets/logo.png";
import login from "../../assets/login.jpg";
import { GiMeal } from "react-icons/gi";
import GoogleButton from "../../components/GoogleButton";
import LoadingSpinner from "../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

const API_URL = "https://c16-24-n-node-react.vercel.app/api/auth/login";

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const { setLogIn, setAuth } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSuccessfulAuth = (res) => {
    const user = `@${res?.data?.user?.user_name}`;
    const accessToken = res?.data?.user?.token;
    setAuth({ email, user, accessToken });
    navigate("/");
    sessionStorage.setItem("token", accessToken);
    sessionStorage.setItem("user", user);
    console.log("succesgul auth");
    setLogIn(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        API_URL,
        { email, password },
        {
          header: { "Content-Type": "application/json" },
          widthCredentials: true,
        }
      );
      handleSuccessfulAuth(res);
    } catch (error) {
      setIsLoading(false);
      const { response } = error;
      response.data.message
        ? setError(response.data.message)
        : setError("Not valid Email or Password.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <article className="grid grid-cols-1 grid-flow-col items-center justify-items-center h-[calc(100vh-15rem)] w-full md:grid-cols-2">
      <div className="hidden md:block">
        <img src={logo} alt="Logo" className="max-h-28 mx-auto object-cover" />
        <img src={login} alt="Login image" className="object-cover h-full" />
      </div>

      <div className="flex flex-col items-center md:items-end justify-center w-full h-full rounded-3xl login-shadow">
        <div className="w-full sm:w-[90%]">
          <div className="md:hidden">
            <img src={logo} alt="Logo" className="max-h-28 mx-auto" />
          </div>
          <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">
            Log in
          </h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <input
              className="w-full h-12 border border-gray-800 px-3 rounded-lg"
              placeholder="Email"
              id="email"
              name="email"
              type="email"
              value={email}
              autoComplete="current-password"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
            <div className="relative">
              <input
                className={`w-full h-12 border px-3 rounded-lg ${
                  password.length < 10 && password.length != 0
                    ? "border-red-500 focus:outline-red-500"
                    : "border-gray-800"
                }`}
                placeholder="Password"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-4 right-3"
              >
                {showPassword ? (
                  <MdOutlineVisibilityOff />
                ) : (
                  <MdOutlineVisibility />
                )}
              </button>
            </div>
            <button
              className="flex items-center justify-center gap-4 w-full h-12 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
              type="submit"
              disabled={
                isLoading || !email || !password || password.length < 10
              }
            >
              <GiMeal />
              {isLoading ? <LoadingSpinner /> : "To access"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
          <GoogleButton
            title={"Access"}
            onSuccessfulAuth={handleSuccessfulAuth}
            setErrors={setError}
            setIsLoading={setIsLoading}
          />
          <section className="grid grid-cols-1 sm:grid-cols-2 mt-4 justify-items-center items-center">
            <p className="text-sm">You do not have an account?</p>
            <Link
              className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              to={"/registro"}
            >
              Register
            </Link>
          </section>
        </div>
      </div>
    </article>
  );
}
