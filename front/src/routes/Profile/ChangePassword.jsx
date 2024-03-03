import { useState } from "react";
import Swal from "sweetalert2";
import appApi from "../../api/appApi";
import { PiPassword } from "react-icons/pi";
import { MdPassword } from "react-icons/md";

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    password: "",
    new_password: "",
    new_password_confirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.new_password.length <= 9) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "The new password must be more than 9 characters",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      icon: "question",
      title: "Are you sure you want to change your password?",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (!confirmResult.isConfirmed) {
      return;
    }
    try {
      const response = await appApi.put("/user/change-password", passwordData);

      console.log("Contraseña cambiada:", response.data);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Password changed successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      setPasswordData({
        password: "",
        new_password: "",
        new_password_confirm: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not change password",
        timer: 2000,
        showConfirmButton: false,
      });
      console.error("Error al cambiar la contraseña:", error);
    }
  };

  return (
    <section className="mx-auto max-w-md">
      <h2 className="mb-6 text-start text-2xl">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex relative">
          <div className="flex items-center gap-x-2 w-full">
            <MdPassword className="mt-2 text-indigo-500" size={30} />
            <input
              type="password"
              id="password"
              name="password"
              value={passwordData.password}
              onChange={handleChange}
              className="p-2 mt-1 w-full rounded-md border text-gray-500 border-indigo-500 shadow-sm focus:border-indigo-300  focus:ring-indigo-200 focus:ring-opacity-50 h-10"
            />
            <label
              className="absolute top-[-10px] text-indigo-500 font-bold px-2 left-[calc(50%-72px)] bg-white"
              htmlFor="password"
            >
              Current password:
            </label>
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-2">
          <div className="flex relative w-[50%]">
            <div className="flex justify-center items-between gap-2">
              <PiPassword className="mt-2 text-indigo-500" size={30} />
              <input
                type="password"
                id="new_password"
                name="new_password"
                value={passwordData.new_password}
                onChange={handleChange}
                className="p-2 mt-1 w-full rounded-md border text-gray-500 border-indigo-500 shadow-sm focus:border-indigo-300  focus:ring-indigo-200 focus:ring-opacity-50 h-10 "
              />
              <label
                className="absolute top-[-10px] text-indigo-500 font-bold px-2 left-[55px] bg-white"
                htmlFor="new_password"
              >
                New Password:
              </label>
            </div>
          </div>
          <div className="flex relative w-[50%]">
            <div className="flex items-center gap-2">
              <PiPassword className="mt-2 text-indigo-500" size={30} />
              <input
                type="password"
                id="new_password_confirm"
                name="new_password_confirm"
                value={passwordData.new_password_confirm}
                onChange={handleChange}
                className="p-2 mt-1 w-full rounded-md border text-gray-500 border-indigo-500 shadow-sm focus:border-indigo-300  focus:ring-indigo-200 focus:ring-opacity-50 h-10"
              />
              <label
                className="absolute top-[-10px] text-indigo-500 font-bold px-2 left-[50px] bg-white"
                htmlFor="new_password_confirm"
              >
                Confirm password:
              </label>
            </div>
          </div>
        </div>
        <div className="text-end">
          <button
            className="w-3/6 bg-blue-500 text-white mt-4 py-2 px-4 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="submit"
          >
            Change Password
          </button>
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;
