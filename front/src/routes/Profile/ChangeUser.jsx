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
    <section className="mx-auto max-w-md">
      <h1 className="mb-4 text-start text-2xl">Change User</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex relative">
          <div className="flex items-center gap-x-2 w-full">
            <div className="flex items-center w-full gap-2">
              <FaUserEdit className="mt-2 text-gray-500" size={30} />
              <input
                className="p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300  focus:ring-gray-200 focus:ring-opacity-50 h-10"
                type="text"
                value={userName}
                onChange={handleChange}
              />
              <label
                className="absolute top-[-10px] text-gray-500 font-bold px-2 left-[calc(50%-70px)] bg-white"
                htmlFor=" NewUserName:"
              >
                 New User Name:
              </label>
            </div>
          </div>
        </div>
        <div className="text-end mt-2">
          <button
            className="w-3/6 bg-gray-500 text-white mt-4 py-2 px-4 rounded-xl hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50"
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
