import { useState } from "react";
import Swal from "sweetalert2";
import { useAuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import logo2 from "./logo2.png";
import appApi from "../../api/appApi";
import { MdDelete } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { SlClose } from "react-icons/sl";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Post = () => {
  const imageMaxSize = 1;
  const { logIn } = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    imageFile: "",
    description: "",
    portion: 0,
    preparation_time: 0,
    difficulty: 0,
    process: "",
    ingredients: [{ name: "" }],
    categories: [{ name: "" }],
    hashtags: [{ name: "" }],
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (index, event) => {
    const { value } = event.target;
    const newIngredients = [...formData.ingredients];
    newIngredients[index].name = value;
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  const handleIngredientDelete = (index) => {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  const handleCategoryChange = (index, event) => {
    const { value } = event.target;
    const newCategories = [...formData.categories];
    newCategories[index].name = value;
    setFormData({
      ...formData,
      categories: newCategories,
    });
  };

  const handleCategoryDelete = (index) => {
    const newCategories = [...formData.categories];
    newCategories.splice(index, 1);
    setFormData({
      ...formData,
      categories: newCategories,
    });
  };

  const handleHashtagChange = (index, event) => {
    const { value } = event.target;
    const newHashtags = [...formData.hashtags];
    newHashtags[index].name = value;
    setFormData({
      ...formData,
      hashtags: newHashtags,
    });
  };

  const handleHashtagDelete = (index) => {
    const newHashtags = [...formData.hashtags];
    newHashtags.splice(index, 1);
    setFormData({
      ...formData,
      hashtags: newHashtags,
    });
  };

  const handleImageChange = (event) => {
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

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = (e) => {
    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = "";

    setSelectedFile(null);
    setImagePreview(null);
    setFormData({
      ...formData,
      imageFile: "",
    });
    e.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || formData.name.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Name Required",
        text: "Please enter a name for the recipe.",
      });
      return;
    }

    if (!formData.description || formData.description.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Description Required",
        text: "Please enter a description for the recipe.",
      });
      return;
    }

    if (!formData.portion || formData.portion.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Portion Required",
        text: "Please enter a portion for the recipe.",
      });
      return;
    }

    if (!formData.preparation_time || formData.preparation_time.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Preparation time Required",
        text: "Please enter a preparation time for the recipe.",
      });
      return;
    }

    if (!formData.difficulty || formData.difficulty.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Difficulty time Required",
        text: "Please enter a difficulty time for the recipe.",
      });
      return;
    }

    if (!formData.process || formData.process.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Process time Required",
        text: "Please enter a process time for the recipe.",
      });
      return;
    }

    if (formData.ingredients.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Ingredients Required",
        text: "Please provide at least one ingredient for the recipe.",
      });
      return;
    }

    for (const ingredient of formData.ingredients) {
      if (!ingredient.name || ingredient.name.trim() === "") {
        Swal.fire({
          icon: "warning",
          title: "Ingredient Required",
          text: "Complete ingredients field",
        });
        return;
      }
    }

    if (formData.categories.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Categories Required",
        text: "Please provide at least one category for the recipe.",
      });
      return;
    }

    for (const category of formData.categories) {
      if (!category.name || category.name.trim() === "") {
        Swal.fire({
          icon: "warning",
          title: "Category Required",
          text: "Complete category field",
        });
        return;
      }
    }

    if (formData.hashtags.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Hashtags Required",
        text: "Please provide at least one hashtag for the recipe.",
      });
      return;
    }

    for (const hashtag of formData.hashtags) {
      if (!hashtag.name || hashtag.name.trim() === "") {
        Swal.fire({
          icon: "warning",
          title: "Hashtag Name Required",
          text: "Complete hashtags field",
        });
        return;
      }
    }

    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "Image Required",
        text: "Please select an image for the recipe.",
      });
      return;
    }

    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (selectedFile.size > maxSizeInBytes) {
      Swal.fire({
        icon: "warning",
        title: "Image Size Exceeded",
        text: `The selected image exceeds the maximum size of ${maxSizeInMB} MB.`,
      });
      return;
    }

    const confirmResult = await Swal.fire({
      icon: "question",
      title: "Are you sure to submit this post?",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    try {
      if (!selectedFile) {
        throw new Error("Please select an image.");
      }

      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64 = reader.result.split(",")[1];

        await appApi.post("/recipes/", {
          ...formData,
          imageFile: `data:${selectedFile.type};base64,${base64}`,
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Recipe uploaded successfully",
          timer: 2000,
          showConfirmButton: false,
        });

        setFormData({
          name: "",
          imageFile: "",
          description: "",
          portion: 0,
          preparation_time: 0,
          difficulty: 0,
          process: "",
          ingredients: [{ name: "" }],
          categories: [{ name: "" }],
          hashtags: [{ name: "" }],
        });
        setSelectedFile(null);
        window.location.reload();
      };

      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to upload recipe",
      });
    }
  };

  return (
    <>
      {!logIn && <Navigate to="/login" />}
      <main className="max-w-4xl mx-auto">
        <img src={logo2} alt="logo2" className="w-1/2 mx-auto" />
        <hr className="my-5" />
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Recipes Upload
        </h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {!imagePreview ? (
                <div className="flex flex-col items-center justify-center p-2 ">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 1MB)
                  </p>
                </div>
              ) : (
                <div className="w-full xs:h-[260px] relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full xs:h-[260px] mr-2 mx-auto object-cover border-2 rounded-lg border-green-600"
                  />
                  <button
                    className="absolute top-[-20px] right-[-15px] bg-red-500   text-white  rounded-[50%]"
                    onClick={handleImageDelete}
                  >
                    <SlClose size={30} />
                  </button>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden  my-7 p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300  focus:ring-gray-200 focus:ring-opacity-50 h-10"
              />
            </label>
          </div>
          <hr className="my-5" />
          <div className="relative mb-4">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300  focus:ring-gray-200 focus:ring-opacity-50 h-10"
            />
            <label
              className="absolute top-[-10px] text-gray-500 font-bold px-2 left-[calc(50%-49px)] bg-white"
              htmlFor="RecipeName"
            >
              Recipe Name:
            </label>
          </div>
          <div className="relative mb-3">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 h-full resize-none "
            />
            <label
              className="absolute top-[-10px] text-gray-500 font-bold px-2 left-[calc(50%-52px)] bg-white"
              htmlFor="Description"
            >
              Description:
            </label>
          </div>
          <div className="flex justify-between items-center w-full gap-x-2">
            <div className="relative w-[33%] mb-4">
              <input
                type="number"
                id="portion"
                name="portion"
                value={formData.portion}
                onChange={handleInputChange}
                className="p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300  focus:ring-gray-200 focus:ring-opacity-50 h-10"
              />
              <label
                className="absolute top-[-10px] text-gray-500 font-bold px-2 sm:left-[25%] xs:left-[9%] bg-white"
                htmlFor="Portion"
              >
                Portion:
              </label>
            </div>
            <div className="relative w-[33%] mb-4">
              <input
                type="number"
                id="preparation_time"
                name="preparation_time"
                value={formData.preparation_time}
                onChange={handleInputChange}
                className="p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300  focus:ring-gray-200 focus:ring-opacity-50 h-10"
              />
              <label
                className="absolute top-[-10px] text-gray-500 font-bold px-2 sm:left-[30%] xs:left-[18%] bg-white"
                htmlFor="Time"
              >
                Minutes:
              </label>
            </div>

            <div className="relative mb-4">
              <input
                type="number"
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300  focus:ring-gray-200 focus:ring-opacity-50 h-10"
              />
              <label
                className="absolute top-[-10px] text-gray-500 font-bold px-2 sm:left-[25%] xs:left-[23%] bg-white"
                htmlFor=" Difficulty"
              >
                Difficulty:
              </label>
            </div>
          </div>
          <div className="relative mb-4">
            <CKEditor
              className="border border-gray-300 px-3 py-1 w-full rounded focus:h-32 h-48 transition-all duration-300"
              editor={ClassicEditor}
              data="<p>Here you can describe the recipe process...</p>"
              onChange={(event, editor) => {
                const data = editor.getData();
                let name = "process";
                setFormData({
                  ...formData,
                  [name]: data,
                });
              }}
              id="process"
              value={formData.process}
            />
            <label
              className="absolute top-[-12px] text-gray-500 font-bold px-2 left-[calc(50%-49px)] bg-white"
              htmlFor="Process"
            >
              Process:
            </label>
          </div>
          <hr className="my-5" />
          <div className="mb-4">
            {formData.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className=" relative flex justify-between items-center mb-3"
              >
                <input
                  key={index}
                  type="text"
                  placeholder="Another ingredients"
                  value={ingredient.name}
                  onChange={(event) => handleIngredientChange(index, event)}
                  className="p-2 mt-1 mr-2 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                />
                <label
                  className="absolute top-[-10px] text-gray-500 font-bold px-2 sm:left-[calc(50%-53px)] xs:left-[calc(50%-53px)] bg-white"
                  htmlFor="ingredients"
                >
                  Ingredients:
                </label>
                <button
                  type="button"
                  onClick={() => handleIngredientDelete(index)}
                  className="absolute right-5"
                >
                  <MdDelete
                    className="text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700 "
                    size={25}
                  />
                </button>
              </div>
            ))}
            <div className="flex justify-end items-center">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    ingredients: [...formData.ingredients, { name: "" }],
                  })
                }
                className=" p-3 m-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                <GrAdd />
              </button>
            </div>
          </div>
          <hr className="mb-5" />
          <div className="mb-4">
            {formData.categories.map((category, index) => (
              <div
                key={index}
                className=" relative flex justify-between items-center mb-3"
              >
                <input
                  key={index}
                  type="text"
                  placeholder="Another category"
                  value={category.name}
                  onChange={(event) => handleCategoryChange(index, event)}
                  className="p-2 mt-1 mr-2 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                />
                <label
                  className="absolute top-[-10px] text-gray-500 font-bold px-2 sm:left-[calc(50%-53px)] xs:left-[calc(50%-53px)] bg-white"
                  htmlFor="Categories"
                >
                  Categories:
                </label>
                <button
                  type="button"
                  onClick={() => handleCategoryDelete(index)}
                  className="absolute right-5"
                >
                  <MdDelete
                    className="text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700 "
                    size={25}
                  />
                </button>
              </div>
            ))}
            <div className="flex justify-end items-center">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    categories: [...formData.categories, { name: "" }],
                  })
                }
                className=" p-3 m-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                <GrAdd />
              </button>
            </div>
          </div>
          <hr className="my-5" />
          <div className="mb-4">
            {formData.hashtags.map((hashtag, index) => (
              <div
                key={index}
                className=" relative flex justify-between items-center mb-3"
              >
                <input
                  key={index}
                  type="text"
                  placeholder="Another hashtags"
                  value={hashtag.name}
                  onChange={(event) => handleHashtagChange(index, event)}
                  className="p-2 mt-1 mr-2 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                />
                <label
                  className="absolute top-[-10px] text-gray-500 font-bold px-2 sm:left-[calc(50%-53px)] xs:left-[calc(50%-53px)] bg-white"
                  htmlFor="Hashtags"
                >
                  Hashtags:
                </label>
                <button
                  type="button"
                  onClick={() => handleHashtagDelete(index)}
                  className="absolute right-5"
                >
                  <MdDelete
                    className="text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700 "
                    size={25}
                  />
                </button>
              </div>
            ))}
            <div className="flex justify-end items-center">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    hashtags: [...formData.hashtags, { name: "" }],
                  })
                }
                className=" p-3 m-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                <GrAdd />
              </button>
            </div>
          </div>
          <hr className="mb-5" />
          <button
            type="submit"
            className="w-3/6 bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50"
          >
            Upload
          </button>
        </form>
        <hr className="my-10" />
      </main>
    </>
  );
};

export default Post;
