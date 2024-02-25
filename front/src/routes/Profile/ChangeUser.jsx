import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateUserName = () => {
  const [userName, setUserName] = useState("");

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem("token");

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(
        "https://c16-24-n-node-react.vercel.app/api/user/change-user",
        {
          user_name: userName,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User name updated successfully!",
      });
    } catch (error) {
      console.error("Error updating user name:", error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update user name. Please try again later.",
      });
    }
  };

  return (
    <section className="mx-auto max-w-md mt-14">
      <h1 className="mb-4 text-center text-2xl">Change User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          New User Name:
          <input
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
            type="text"
            value={userName}
            onChange={handleChange}
          />
        </label>
        <div className="text-center mt-2">
          <button
            className="w-3/6 bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateUserName;
