/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./registro.css";
import { useForm } from "../../hooks/useForm";

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const checks = (val) => {
  return EMAIL_REGEX.test(val);
};

const formValidations = {
  email: [(value) => checks(value), "Invalid email format"],
  password: [
    (value) => value.length >= 10,
    "The password must be more than 9 characters.",
  ],
  user_name: [(value) => value.length > 2, "The name is required."],
};

const registerFormFields = {
  user_name: "",
  email: "",
  password: "",
};

export default function Registro() {
  const {
    user_name,
    email,
    password,
    onInputChange,
    errors,
    validForm,
    setFormErrors,
  } = useForm(registerFormFields, formValidations);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "https://c16-24-n-node-react.vercel.app/api/auth/signin",
        {
          user_name: user_name,
          email: email,
          password: password,
        }
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      const errorsObject = error.response.data.errors;
      const errorsBack = {};
      Array.from(Object.keys(errorsObject)).forEach((val) => {
        errorsBack[val] = errorsObject[val].msg;
      });
      setFormErrors({ ...errorsBack });
    }
  }

  return (
    <article>
      <div className="flex flex-col items-center justify-center h-[100%] p-[200px] dark">
        <div className="px-7 py-7 sm:px-10 max-w-md text-slate-800 rounded-2xl form-box">
          <div className="flex flex-col items-center">
            <img src={logo} className="h-[5rem]" alt="chetifabene" />
            <p className=" text-center text-sm font-semibold text-slate-500 pb-1">
              Sign up to see recipes, ingredients and dishes from around the
              world. world.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <InputComponent
              name={"user_name"}
              onInputChange={onInputChange}
              placeholder={"Username"}
              type={"text"}
              value={user_name}
              key={"user_name"}
              error={errors.user_name}
            />
            <InputComponent
              name={"email"}
              onInputChange={onInputChange}
              placeholder={"Email"}
              type={"email"}
              value={email}
              key={"email"}
              error={errors.email}
            />
            <InputComponent
              name={"password"}
              onInputChange={onInputChange}
              placeholder={"Password"}
              type={"password"}
              value={password}
              key={"password"}
              error={errors.password}
              autocomplete="current-password"
            />
            <p className="mt-4 text-sm text-center">
              Do you already have an account?
              <Link
                className="ml-2 w-full h-12 bg-gray-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
            "
                to="/login"
                disabled={loading}
              >
                To access
              </Link>
            </p>
            <button
              className="bg-gradient-to-r disabled:shadow-none disabled:hover:shadow-none disabled:hover:cursor-not-allowed disabled:opacity-40 from-gray-700 to-gray-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:to-gray-800 transition ease-in-out duration-300"
              type="submit"
              disabled={!validForm || loading}
            >
              {!loading ? "Crear" : "Cargando"}
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}

const InputComponent = ({
  placeholder,
  type,
  name,
  value,
  onInputChange,
  error,
}) => {
  return (
    <div className="mb-2">
      <input
        placeholder={placeholder}
        className={`${
          error ? "border-[1px] border-red-500" : " border-0"
        } w-full bg-gray-100 rounded-md p-2 transition ease-in-out duration-300 placeholder-slate-500 focus:placeholder-slate-400 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        type={type}
        name={name}
        value={value}
        onChange={onInputChange}
      />
      {error && (
        <span className="block text-xs text-start px-2 bg-red-300 rounded-sm">
          {error}
        </span>
      )}
    </div>
  );
};
