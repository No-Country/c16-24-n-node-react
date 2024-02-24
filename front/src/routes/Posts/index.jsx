import { useState } from "react";
import Swal from "sweetalert2";

const Post = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    author: "",
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);

    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "Receta publicada con exito",
      timer: 2000,
      showConfirmButton: false,
    });

    setFormData({
      title: "",
      ingredients: "",
      steps: "",
      author: "",
      image: null,
    });
  };

  return (
    <main className="text-center mt-10">
      <h1 className="text-2xl">Recipes Upload</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block mb-2">
            Ingredients:
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-1 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="steps" className="block mb-2">
            Steps:
          </label>
          <textarea
            id="steps"
            name="steps"
            value={formData.steps}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-1 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block mb-2">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 "
          />
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
  );
};

export default Post;
