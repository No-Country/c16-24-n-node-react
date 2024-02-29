import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import appApi from "../../api/appApi";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import logo2 from "./logo2.png";

const PatchEdit = () => {
  const { recipeId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    imageFile: null,
    description: "",
    portion: 0,
    preparation_time: 0,
    difficulty: 0,
    process: "",
    Ingredients: [{ name: "" }],
    Categories: [{ name: "" }],
    Hashtags: [{ name: "" }],
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const imageMaxSize = 1;
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await appApi.get(`/recipes/${recipeId}`);
        setFormData(response.data.recipe);
        console.log(response.data.recipe.primaryimage);
        if (response.data.recipe.primaryimage) {
          setImageUrl(response.data.recipe.primaryimage);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const newIngredients = [...prevFormData.Ingredients];
      newIngredients[index] = { name: value };
      return { ...prevFormData, Ingredients: newIngredients };
    });
  };

  const handleRemoveIngredient = (index) => {
    setFormData((prevFormData) => {
      const newIngredients = [...prevFormData.Ingredients];
      newIngredients.splice(index, 1);
      return { ...prevFormData, Ingredients: newIngredients };
    });
  };

  const handleAddIngredient = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Ingredients: [...prevFormData.Ingredients, { name: "" }],
    }));
  };

  const handleCategoryChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const newCategories = [...prevFormData.Categories];
      newCategories[index] = { name: value };
      return { ...prevFormData, Categories: newCategories };
    });
  };

  const handleRemoveCategory = (index) => {
    setFormData((prevFormData) => {
      const newCategories = [...prevFormData.Categories];
      newCategories.splice(index, 1);
      return { ...prevFormData, Categories: newCategories };
    });
  };

  const handleAddCategory = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Categories: [...prevFormData.Categories, { name: "" }],
    }));
  };

  const handleHashtagChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const newHashtags = [...prevFormData.Hashtags];
      newHashtags[index] = { name: value };
      return { ...prevFormData, Hashtags: newHashtags };
    });
  };

  const handleRemoveHashtag = (index) => {
    setFormData((prevFormData) => {
      const newHashtags = [...prevFormData.Hashtags];
      newHashtags.splice(index, 1);
      return { ...prevFormData, Hashtags: newHashtags };
    });
  };

  const handleAddHashtag = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Hashtags: [...prevFormData.Hashtags, { name: "" }],
    }));
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
    setPreviewImage(URL.createObjectURL(file));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!selectedFile) {
        await submitForm(formData);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = async () => {
        const base64 = reader.result.split(",")[1];
        await submitForm({ ...formData, imageFile: base64 });
      };
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update recipe",
      });
    }
  };
  const submitForm = async (data) => {
    try {
      await appApi.patch(`/recipes/${recipeId}`, data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Recipe updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      console.log("Data", data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update recipe",
      });
    }
  };

  const removePreview = () => {
    setSelectedFile(null);
    setPreviewImage(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <img src={logo2} alt="logo2" className="w-1/2 mx-auto" />
      <hr className="my-5" />
      <h2 className="text-3xl font-semibold mb-4 text-center mt-8">
        Edit Recipe
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
            className="p-2 mt-1 block w-1/2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
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
            className="p-2 mt-1 block w-1/2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
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
            className="p-2 mt-1 block w-1/2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="process" className="block mb-2 text-xl">
            Process:
          </label>
          <textarea
            id="process"
            name="process"
            value={formData.process}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-1 w-full rounded focus:h-32 transition-all duration-300"
          />
        </div>
        <hr className="my-10" />
        <div className="mb-4">
          <label htmlFor="ingredients" className="block mb-2 text-xl">
            Ingredientes:
          </label>
          {formData.Ingredients.map((ingredient, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                type="text"
                value={ingredient.name}
                placeholder="New ingredients"
                onChange={(e) => handleIngredientChange(index, e)}
                className="mr-2 px-3 w-3/4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                <MdDelete />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="px-3 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            <GrAdd />
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="categories" className="block mb-2">
            Categories:
          </label>
          {formData.Categories &&
            formData.Categories.length > 0 &&
            formData.Categories.map((category, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={category.name}
                  placeholder="New category"
                  onChange={(e) => handleCategoryChange(index, e)}
                  className="mr-2 px-3 w-3/4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(index)}
                  className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-3 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            <GrAdd />
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="hashtags" className="block mb-2">
            Hashtags:
          </label>
          {formData.Hashtags &&
            formData.Hashtags.length > 0 &&
            formData.Hashtags.map((hashtag, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={hashtag.name}
                  placeholder="New hashtag"
                  onChange={(e) => handleHashtagChange(index, e)}
                  className="mr-2 px-3 w-3/4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveHashtag(index)}
                  className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          <button
            type="button"
            onClick={handleAddHashtag}
            className="px-3 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            <GrAdd />
          </button>
        </div>
        <hr className="my-10" />
        <div className="mb-4">
          <label htmlFor="image" className="block mb-4 text-xl ">
            Image:
          </label>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Recipe"
              className="mb-2 w-64 h-auto mx-auto border-2 rounded-lg"
            />
          )}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-5 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9"
          />
          {previewImage && (
            <div className="text-center">
              <img
                src={previewImage}
                alt="Preview"
                className="mt-4 mb-2 w-64 h-auto mx-auto border-2 rounded-lg border-green-600"
              />
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-md m-2"
                onClick={removePreview}
              >
                <MdDelete />
              </button>
            </div>
          )}
        </div>
        <hr className="my-10" />
        <button
          type="submit"
          className="w-2/5 bg-green-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          Upload
        </button>
      </form>
      <hr className="my-10" />
    </div>
  );
};

export default PatchEdit;
