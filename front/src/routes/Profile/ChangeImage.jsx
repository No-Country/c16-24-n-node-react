import { useState } from "react";
import Swal from "sweetalert2";
import appApi from "../../api/appApi";
import { MdDelete } from "react-icons/md";

const PhotoUpdater = () => {
  const [selectedFile, setSelectedFile] = useState();
  const imageMaxSize = 1;
  const [previewUrl, setPreviewUrl] = useState();

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

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
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
      window.location.reload();
    };

    reader.readAsDataURL(selectedFile);
  };
  const removePreview = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
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
        {previewUrl && (
          <div>
            <img
              src={previewUrl}
              alt="Preview"
              className="my-4 mx-auto w-64 h-auto  border-2 rounded-lg border-green-600"
            />
            <button
              className="bg-red-500 text-white px-3 py-2 rounded-md"
              onClick={removePreview}
            >
              <MdDelete />
            </button>
          </div>
        )}
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
