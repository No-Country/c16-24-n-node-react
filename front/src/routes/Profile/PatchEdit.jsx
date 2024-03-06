import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appApi from "../../api/appApi";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import logo2 from "./logo2.png";
import { SlClose } from "react-icons/sl";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PatchEdit = () => {
  const { recipeId } = useParams();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    imageFile: null,
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
  const imageMaxSize = 1;
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await appApi.get(`/recipes/${recipeId}`);
        setFormData(response?.data?.recipe);

        if (response.data?.recipe?.primaryimage) {
          setImageUrl(response?.data?.recipe?.primaryimage);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "difficulty") {
      if (value === "" || (value >= 1 && value <= 5)) {
        setFormData({
          ...formData,
          [name]: value === "" ? "" : parseInt(value),
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Invalid Difficulty",
          text: "Difficulty should be between 1 and 5, or leave it empty.",
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleIngredientChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const newIngredients = [...prevFormData.ingredients];
      newIngredients[index] = { name: value };
      return { ...prevFormData, ingredients: newIngredients };
    });
  };

  const handleRemoveIngredient = (index) => {
    setFormData((prevFormData) => {
      const newIngredients = [...prevFormData.ingredients];
      newIngredients.splice(index, 1);
      return { ...prevFormData, ingredients: newIngredients };
    });
  };

  const handleAddIngredient = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: [...prevFormData.ingredients, { name: "" }],
    }));
  };

  const handleCategoryChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const newCategories = [...prevFormData.categories];
      newCategories[index] = { name: value };
      return { ...prevFormData, categories: newCategories };
    });
  };

  const handleRemoveCategory = (index) => {
    setFormData((prevFormData) => {
      const newCategories = [...prevFormData.categories];
      newCategories.splice(index, 1);
      return { ...prevFormData, categories: newCategories };
    });
  };

  const handleAddCategory = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      categories: [...prevFormData.categories, { name: "" }],
    }));
  };

  const handleHashtagChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const newHashtags = [...prevFormData.hashtags];
      newHashtags[index] = { name: value };
      return { ...prevFormData, hashtags: newHashtags };
    });
  };

  const handleRemoveHashtag = (index) => {
    setFormData((prevFormData) => {
      const newHashtags = [...prevFormData.hashtags];
      newHashtags.splice(index, 1);
      return { ...prevFormData, hashtags: newHashtags };
    });
  };

  const handleAddHashtag = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      hashtags: [...prevFormData.hashtags, { name: "" }],
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
      if (selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onloadend = async () => {
          const base64 = reader.result.split(",")[1];
          await updateImage(base64);
        };
      }

      await updateRecipe(formData);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update recipe",
      });
    }
  };

  const updateImage = async (base64) => {
    try {
      const imageData = `data:${selectedFile.type};base64,${base64}`;
      await appApi.patch(`/recipes/image/${recipeId}`, {
        imageFile: imageData,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update recipe image",
      });
    }
  };

  const updateRecipe = async (data) => {
    try {
      await appApi.patch(`/recipes/${recipeId}`, data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Recipe updated successfully",
        timer: 2500,
        showConfirmButton: false,
      });
      setTimeout(() => {
        navigate(`/profile`);
      }, 2600);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update recipe",
      });
    }
  };

  const removePreview = (e) => {
    e.preventDefault();
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
        <div className="relative flex flex-col items-center justify-center w-full">
          <p className="text-center text-gray-500 font-bold px-2">
            current image
          </p>
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full xs:h-[260px] mr-2 mx-auto object-cover border-2 rounded-lg border-green-600 mb-8"
          />
          <label
            htmlFor="dropzone-file"
            className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {imageUrl && (
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 1MB)
                </p>
              </div>
            )}
            {previewImage && (
              <div className="absolute w-full xs:h-[260px]">
                <p className="absolute top-[-30px] text-gray-500 font-bold px-2 left-[calc(50%-52px)] bg-white">
                  Image preview
                </p>
                <img
                  src={previewImage}
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
              onChange={handleImageChange}
              className="hidden  my-7 p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300  focus:ring-gray-200 focus:ring-opacity-50 h-10"
            />
          </label>
        </div>
        <hr className="my-10" />
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
        <div className="relative mb-4">
          <textarea
            rows={3}
            id="description"
            name="description"
            value={formData?.description}
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
              max="5"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300  focus:ring-gray-200 focus:ring-opacity-50 h-10"
            />
            <label
              className="absolute top-[-10px] text-gray-500 font-bold px-2 sm:left-[25%] xs:left-[23%] bg-white"
              htmlFor=" Difficulty"
            >
              Difficulty: 1-5
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="process" className="block mb-2 text-xl">
            Process:
          </label>
          {console.log(formData)}
          <CKEditor
            editor={ClassicEditor}
            data={formData.process}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFormData((prevState) => ({
                ...prevState,
                process: data,
              }));
            }}
            id="process"
          />
        </div>
        <hr className="my-10" />
        <div className="mb-4">
          <label htmlFor="ingredients" className="block mb-2 text-xl">
            Ingredientes:
          </label>
          <div className="mb-4">
            {formData.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className=" relative flex justify-between items-center mb-3"
              >
                <input
                  type="text"
                  value={ingredient.name}
                  placeholder="New ingredients"
                  onChange={(e) => handleIngredientChange(index, e)}
                  className="p-2 mt-1 mr-2 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
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
                onClick={handleAddIngredient}
                className=" p-3 m-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                <GrAdd />
              </button>
            </div>
          </div>
        </div>
        <div className="mb-4">
          {formData.categories.map((category, index) => (
            <div
              key={index}
              className=" relative flex justify-between items-center mb-3"
            >
              <input
                type="text"
                value={category.name}
                placeholder="New category"
                onChange={(e) => handleCategoryChange(index, e)}
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
                onClick={() => handleRemoveCategory(index)}
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
              onClick={handleAddCategory}
              className=" p-3 m-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              <GrAdd />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="hashtags" className="block mb-2">
            Hashtags:
          </label>
          {formData.hashtags.map((hashtag, index) => (
            <div
              key={index}
              className=" relative flex justify-between items-center mb-3"
            >
              <input
                type="text"
                value={hashtag.name}
                placeholder="New hashtag"
                onChange={(e) => handleHashtagChange(index, e)}
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
                onClick={() => handleRemoveHashtag(index)}
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
              onClick={handleAddHashtag}
              className="px-3 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              <GrAdd />
            </button>
          </div>
        </div>
        <hr className="mt-4 mb-2" />
        <button
          type="submit"
          className="w-2/5 bg-green-500 text-white my-4 py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          Upload
        </button>
      </form>
      <hr className="my-10" />
    </div>
  );
};

export default PatchEdit;
