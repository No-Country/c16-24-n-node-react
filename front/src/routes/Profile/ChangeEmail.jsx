import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ChangeEmail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");

  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please enter a valid email",
      });
      return;
    }

    try {
      const response = await axios.put(
        "https://c16-24-n-node-react.vercel.app/api/user/change-email",
        {
          password: password,
          email: email,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Email cambiado:", response.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Email changed successfully",
      });
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error al cambiar el correo electrónico:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not change email",
      });
    }
  };

  return (
    <section className="mx-auto max-w-md mt-14">
      <h1 className="mb-4 text-center text-xl">Change Email</h1>
      <form onSubmit={handleSubmitEmail} className="space-y-4">
        <div>
          <label htmlFor="email">New Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeEmail}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
          />
        </div>
        <button
          className="w-full bg-indigo-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="submit"
        >
          Change Email
        </button>
      </form>
    </section>
  );
};

export default ChangeEmail;
