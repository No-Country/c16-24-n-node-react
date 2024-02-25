import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const PhotoUpdater = () => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!photo) {
      Swal.fire("Error", "Please select a photo.", "error");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Token not found in localStorage.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("image", "Una imagen"); // Agregar el objeto JSON

    // Agregar la foto al formulario
    formData.append("photo", photo);

    try {
      const response = await axios.patch(
        "https://c16-24-n-node-react.vercel.app/api/profile/photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );
      Swal.fire("Success", "Photo updated successfully!", "success");
      console.log(response.data);
    } catch (error) {
      Swal.fire("Error", "Error updating photo.", "error");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-md mt-14">
      <h1 className="mb-4 text-center text-2xl">Change Photo</h1>
      <div className="text-center">
        <input
          className="my-7"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        <button
          className="w-3/6 bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onClick={handleSubmit}
        >
          Update Photo
        </button>
      </div>
    </div>
  );
};

export default PhotoUpdater;
