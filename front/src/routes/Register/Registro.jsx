/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./registro.css";
import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../context/AuthProvider";
import appApi from "../../api/appApi";
import GoogleButton from "../../components/GoogleButton";
// import LoadingSpinner from "../../components/Spinner";
import logo from "../../assets/logo.png";

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const { setLogIn, setAuth } = useAuthContext();
  const { email, onInputChange, errors, validForm, setFormErrors, formState } =
    useForm(registerFormFields, formValidations);

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

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await appApi.post("/auth/signin", formState);
      handleSuccessfulAuth(res);
    } catch (error) {
      setLoading(false);
      const errorsObject = error?.response?.data?.errors;
      const errorsBack = {
        email: errorsObject.email?.msg,
        user_name: errorsObject.user_name?.msg,
        password: errorsObject.password?.msg,
      };
      setFormErrors(errorsBack);
    }
  }

  return (
    <article className="grid place-content-center h-[90vh]">
      <div className=" h-[100%] dark">
        {loadingAuth ? (
            <span className="loader" />
          // <LoadingSpinner className="w-32 h-32" />
        ) : (
          <div className="px-7 py-7 sm:px-10 max-w-md text-slate-800 rounded-2xl form-box">
            <div className="flex flex-col items-center">
              <img src={logo} className="h-[5rem]" alt="chetifabene" />
              <p className=" text-center text-sm font-semibold text-slate-500 pb-1">
                Sign up to see recipes, ingredients and dishes from around the
                world.
              </p>
            </div>
            {errors.general && (
              <span className="block text-center px-2 bg-red-300 rounded-sm my-2">
                {errors.general}
              </span>
            )}
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <InputComponent
                name={"user_name"}
                onInputChange={onInputChange}
                placeholder={"Username"}
                type={"text"}
                value={formState["user_name"]}
                error={errors.user_name}
              />
              <InputComponent
                name={"email"}
                onInputChange={onInputChange}
                placeholder={"Email"}
                type={"email"}
                value={formState["email"]}
                error={errors.email}
              />
              <InputComponent
                name={"password"}
                onInputChange={onInputChange}
                placeholder={"Password"}
                type={"password"}
                value={formState["password"]}
                error={errors.password}
              />
              <button
                className="btn_shadow bg-gradient-to-r disabled:shadow-none disabled:hover:shadow-none disabled:hover:cursor-not-allowed disabled:opacity-40 from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:to-blue-600 transition ease-in-out duration-300"
                type="submit"
                disabled={!validForm || loading}
              >
                {!loading ? "Create" : "Loading"}
              </button>
            </form>
            <GoogleButton
              title={"Access"}
              onSuccessfulAuth={handleSuccessfulAuth}
              setIsLoading={setLoadingAuth}
              setErrors={setFormErrors}
            />
            <p className="mt-4 text-sm text-center relative">
              Do you already have an account?
              <Link
                className="ml-2  md:w-full md:h-12 bg-gray-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
            "
                to="/login"
                disabled={loading}
              >
                To access
              </Link>
            </p>
          </div>
        )}
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
    <div className="mb-2" key={name}>
      <input
        placeholder={placeholder}
        className={`${
          error ? "border-[1px] border-red-500" : " border-0"
        } w-full bg-gray-100 rounded-md p-2 transition ease-in-out duration-300 placeholder-slate-500 focus:placeholder-slate-400 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        type={type}
        name={name}
        value={value}
        onChange={onInputChange}
        autoComplete={type == "password" ? "off" : "on"}
      />
      {error && (
        <span className="block text-xs text-start px-2 bg-red-300 rounded-sm">
          {error}
        </span>
      )}
    </div>
  );
};
