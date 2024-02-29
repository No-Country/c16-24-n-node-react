import { useState } from "react";
import Swal from "sweetalert2";
import { useAuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import logo from "./logo.png";
import appApi from "../../api/appApi";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

  const handleCategoryChange = (index, event) => {
    const { value } = event.target;
    const newCategories = [...formData.categories];
    newCategories[index].name = value;
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

  console.log(formData)
   return (
    <>
      {!logIn && <Navigate to="/login" />}
      <main className="text-center mt-10 mb-12">
        <div>
          <img className="mx-auto" src={logo} alt="Logo" />
        </div>
        <h1 className="text-3xl">Recipes Upload</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 ">
              Recipe Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">
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
            <label htmlFor="portion" className="block mb-2">
              Portion:
            </label>
            <input
              type="number"
              id="portion"
              name="portion"
              value={formData.portion}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="preparation_time" className="block mb-2">
              Preparation Time (minutes):
            </label>
            <input
              type="number"
              id="preparation_time"
              name="preparation_time"
              value={formData.preparation_time}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="difficulty" className="block mb-2">
              Difficulty:
            </label>
            <input
              type="number"
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="process" className="block mb-2">
              Process:
            </label>
            <CKEditor
              className="border border-gray-300 px-3 py-1 w-full rounded focus:h-32 h-48 transition-all duration-300"
              editor={ ClassicEditor }
              data="<p>Aqui puedes decribir el proceso de las recetas</p>"
              onChange={ ( event, editor ) => {
                const data = editor.getData();
                let name="process"
                setFormData({
                  ...formData,
                  [name]: data,
                });
            } }
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
          <div className="mb-4">
            <label htmlFor="ingredients" className="block mb-2">
              Ingredients:
            </label>
            {formData.ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                value={ingredient.name}
                onChange={(event) => handleIngredientChange(index, event)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  ingredients: [...formData.ingredients, { name: "" }],
                })
              }
              className="mt-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Add Ingredient
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="categories" className="block mb-2">
              Categories:
            </label>
            {formData.categories.map((category, index) => (
              <input
                key={index}
                type="text"
                value={category.name}
                onChange={(event) => handleCategoryChange(index, event)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  categories: [...formData.categories, { name: "" }],
                })
              }
              className="mt-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Add Category
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="hashtags" className="block mb-2">
              Hashtags:
            </label>
            {formData.hashtags.map((hashtag, index) => (
              <input
                key={index}
                type="text"
                value={hashtag.name}
                onChange={(event) => handleHashtagChange(index, event)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  hashtags: [...formData.hashtags, { name: "" }],
                })
              }
              className="mt-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Add Hashtag
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2">
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
          </div>
          <button
            type="submit"
            className="w-3/6 bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            Upload
          </button>
        </form>
      </main>
    </>
  );
};

export default Post;
