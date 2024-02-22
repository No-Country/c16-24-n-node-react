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
  email: [(value) => checks(value), "Formato de correo inválido"],
  password: [
    (value) => value.length >= 10,
    "El password debe de tener más de 9 caracteres.",
  ],
  user_name: [(value) => value.length > 2, "El nombre es obligatorio."],
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
              Regístrate para ver recetas, ingredientes y paltos de todo el
              mundo.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <InputComponent name={"user_name"} onInputChange={onInputChange} placeholder={"Nombre de usuario"} type={"text"} value={user_name} key={"user_name"} error={errors.user_name}/>
            <InputComponent name={"email"} onInputChange={onInputChange} placeholder={"Email"} type={"email"} value={email} key={"email"} error={errors.email}/>
            <InputComponent name={"password"} onInputChange={onInputChange} placeholder={"Contraseña"} type={"password"} value={password} key={"password"} error={errors.password}/>
            <p className="mt-4 text-sm text-center">
              ¿Ya tienes una cuenta?
              <Link
                className="text-blue-600 hover:underline mt-4 ml-4"
                to="/login"
                disabled={loading}
              >
                Acceder
              </Link>
            </p>
            <button
              className="bg-gradient-to-r disabled:shadow-none disabled:hover:shadow-none disabled:hover:cursor-not-allowed disabled:opacity-40 from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:to-blue-600 transition ease-in-out duration-300"
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

const InputComponent = ({placeholder, type, name, value, onInputChange, error}) => {
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
