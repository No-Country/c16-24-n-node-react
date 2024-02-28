import { useState } from "react";
import Swal from "sweetalert2";
import appApi from "../../api/appApi";
import { FaUserEdit } from "react-icons/fa";

const UpdateUserName = () => {
  const [userName, setUserName] = useState("");

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userName.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill in the user name field.",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      icon: "question",
      title: "Are you sure you want to update your user name?",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await appApi.put("/user/change-user", {
        user_name: userName,
      });

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
          <div className="flex items-center gap-2">
            <FaUserEdit className="text-3xl" />
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
              type="text"
              value={userName}
              onChange={handleChange}
            />
          </div>
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
