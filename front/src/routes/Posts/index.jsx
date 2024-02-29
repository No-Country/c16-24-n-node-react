import { useState } from "react";
import Swal from "sweetalert2";
import { useAuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import logo2 from "./logo2.png";
import appApi from "../../api/appApi";
import { MdDelete } from "react-icons/md";
import { GrAdd } from "react-icons/gr";

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

  const handleImageDelete = () => {
    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = "";

    setSelectedFile(null);
    setImagePreview(null);
    setFormData({
      ...formData,
      imageFile: "",
    });
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

  console.log(formData);
  return (
    <>
      {!logIn && <Navigate to="/login" />}
      <main className="max-w-4xl mx-auto">
        <img src={logo2} alt="logo2" className="w-1/2 mx-auto" />
        <hr className="my-5" />
        <h2 className="text-3xl font-semibold mb-4 text-center mt-8">
          Recipes Upload
        </h2>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-xl">
              Recipe Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-xl">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-1 w-full rounded focus:h-32 transition-all duration-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="portion" className="block mb-2 text-xl">
              Portion:
            </label>
            <input
              type="number"
              id="portion"
              name="portion"
              value={formData.portion}
              onChange={handleInputChange}
              className="p-2 mt-1 block w-1/4 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="preparation_time" className="block mb-2 text-xl">
              Preparation Time (minutes):
            </label>
            <input
              type="number"
              id="preparation_time"
              name="preparation_time"
              value={formData.preparation_time}
              onChange={handleInputChange}
              className="p-2 mt-1 block w-1/4 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="difficulty" className="block mb-2 text-xl">
              Difficulty:
            </label>
            <input
              type="number"
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="p-2 mt-1 block w-1/4 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="process" className="block mb-2 text-xl">
              Process:
            </label>
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
            {/* <textarea
              id="process"
              name="process"
              value={formData.process}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-1 w-full rounded focus:h-32 transition-all duration-300"
            /> */}
          </div>
          <hr className="my-5" />
          <div className="mb-4">
            <label htmlFor="ingredients" className="block mb-2 text-xl">
              Ingredients:
            </label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center">
                <input
                  key={index}
                  type="text"
                  placeholder="Another ingredients"
                  value={ingredient.name}
                  onChange={(event) => handleIngredientChange(index, event)}
                  className="mr-2 m-1 px-3 w-3/4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleIngredientDelete(index)}
                  className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  ingredients: [...formData.ingredients, { name: "" }],
                })
              }
              className="px-3 py-3 mt-1 m-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              <GrAdd />
            </button>
          </div>
          <hr className="my-5" />
          <div className="mb-4">
            <label htmlFor="categories" className="block mb-2 text-xl">
              Categories:
            </label>
            {formData.categories.map((category, index) => (
              <div key={index} className="flex items-center">
                <input
                  key={index}
                  type="text"
                  placeholder="Another category"
                  value={category.name}
                  onChange={(event) => handleCategoryChange(index, event)}
                  className="mr-2 m-1 px-3 w-3/4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleCategoryDelete(index)}
                  className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  categories: [...formData.categories, { name: "" }],
                })
              }
              className="px-3 py-3 mt-1 m-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              <GrAdd />
            </button>
          </div>
          <hr className="my-5" />
          <div className="mb-4">
            <label htmlFor="hashtags" className="block mb-2 text-xl">
              Hashtags:
            </label>
            {formData.hashtags.map((hashtag, index) => (
              <div key={index} className="flex items-center">
                <input
                  key={index}
                  type="text"
                  placeholder="Another hashtags"
                  value={hashtag.name}
                  onChange={(event) => handleHashtagChange(index, event)}
                  className="mr-2 m-1 px-3 w-3/4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleHashtagDelete(index)}
                  className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  hashtags: [...formData.hashtags, { name: "" }],
                })
              }
              className="px-3 py-3 mt-1 m-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              <GrAdd />
            </button>
          </div>
          <hr className="my-5" />
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2 text-xl">
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 mb-2 w-64 h-auto mx-auto border-2 rounded-lg border-green-600"
              />
            )}
            <div className="text-center">
              {selectedFile && (
                <button
                  type="button"
                  onClick={handleImageDelete}
                  className="bg-red-500 text-white px-3 py-2 rounded-md m-2"
                >
                  <MdDelete />
                </button>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-3/6 bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
