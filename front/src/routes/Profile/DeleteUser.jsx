import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import appApi from "../../api/appApi";
import { useAuthContext } from "../../context/AuthProvider";

const DeleteUser = () => {
  const [password, setPassword] = useState("");
  const { setLogIn } = useAuthContext();
  let navigate = useNavigate();

  const handleDeleteUser = async () => {
    if (!password) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Please enter your password to delete the user.",
      });
      return;
    }
    Swal.fire({
      title: "You're sure?",
      text: "You won't be able to reverse this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete user",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await appApi.delete("/user", {
            data: { password },
          });

          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "User successfully deleted!",
          }).then(() => {
            setLogIn(false);
            navigate("/registro");
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "Could not delete user",
          });
        }
      }
    });
  };

  return (
    <section className="mx-auto max-w-md mt-14">
      <h1 className="mb-4 text-center text-2xl">Eliminar Usuario</h1>
      <input
        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder=" Contraseña"
      />
      <div className="text-center mt-2">
        <button
          className="w-3/6 bg-red-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onClick={handleDeleteUser}
        >
          Eliminar Usuario
        </button>
      </div>
    </section>
  );
};

export default DeleteUser;
