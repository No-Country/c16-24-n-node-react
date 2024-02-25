import { useState } from "react";
import Swal from "sweetalert2";
import appApi from "../../api/appApi";

const ChangePassword = () => {
  const token = sessionStorage.getItem("token");
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
    <section className="mx-auto max-w-md mt-14">
      <h1 className="mb-6 text-center text-2xl">Change Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password">Current password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={passwordData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
          />
        </div>
        <div>
          <label htmlFor="new_password">New Password:</label>
          <input
            type="password"
            id="new_password"
            name="new_password"
            value={passwordData.new_password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
          />
        </div>
        <div>
          <label htmlFor="new_password_confirm">Confirm new password:</label>
          <input
            type="password"
            id="new_password_confirm"
            name="new_password_confirm"
            value={passwordData.new_password_confirm}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
          />
        </div>
        <div className="text-center">
          <button
            className="w-3/6 bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
