import { useState } from "react";
// import axios from "axios";
import Swal from "sweetalert2";
import appApi from "../../api/appApi";

const PhotoUpdater = () => {
  const [selectedFile, setSelectedFile] = useState();
  const imageMaxSize = 1;

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = imageMaxSize * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      Swal.fire({
        icon: "warning",
        title: "File too big",
        text: `The selected file is larger than ${imageMaxSize} MB.`,
      }).then(() => {
        event.target.value = null;
        setSelectedFile(null);
      });
      return;
    }

    setSelectedFile(file);
  };

  const onFileUpload = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "error",
        title: "File not selected",
        text: "Please select a file first.",
      });
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      try {
        await appApi.patch("/profile/photo", {
          image: `data:${selectedFile.type};base64,${base64}`,
        });
        Swal.fire({
          icon: "success",
          title: "Image uploaded successfully",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error uploading image",
          text: error.message,
        });
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="mx-auto max-w-md mt-14">
      <h1 className="mb-4 text-center text-2xl">Change Photo</h1>
      <div className="text-center">
        <p>Maximum image size 1mb</p>
        <input
          className="my-7"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <button
          className="w-3/6 bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onClick={onFileUpload}
        >
          Update Photo
        </button>
      </div>
    </div>
  );
};

export default PhotoUpdater;
