/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import Swal from "sweetalert2";
import appApi from "../../api/appApi";
import { SlClose } from "react-icons/sl";

const PhotoUpdater = () => {
  const [selectedFile, setSelectedFile] = useState();
  const imageMaxSize = 1;
  const [previewUrl, setPreviewUrl] = useState();

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = imageMaxSize * 1024 * 1024;
    
    if (file.size > maxSizeInBytes ) {
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
  const removePreview = (e) => {
    setSelectedFile(null);
    setPreviewUrl(null);
    e.preventDefault();
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-start text-2xl">Change Photo</h1>
      <div className="text-center">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {!previewUrl ? (
              <div className="flex flex-col items-center justify-center p-2 ">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor"  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 1MB)
                </p>
              </div>
            ) : (
              <div className="w-full xs:h-[260px] relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full xs:h-[260px] mr-2 mx-auto object-cover border-2 rounded-lg border-green-600"
                />
                <button
                  className="absolute top-[-20px] right-[-15px] bg-red-500   text-white  rounded-[50%]"
                  onClick={removePreview}
                >
                  <SlClose size={30} />
                </button>
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden  my-7 p-2 mt-1 w-full rounded-md border text-gray-500 border-indigo-500 shadow-sm focus:border-indigo-300  focus:ring-indigo-200 focus:ring-opacity-50 h-10"
            />
          </label>
        </div>
        <div className="text-end">
          <button
            className="w-3/6 bg-blue-500 text-white mt-4 py-2 px-4 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onClick={onFileUpload}
          >
            Update Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpdater;
