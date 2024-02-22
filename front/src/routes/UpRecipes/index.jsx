import { useState } from "react";

const UpRecipes = () => {
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
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-4">
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
            className="border border-gray-300 px-3 py-1 w-full"
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
            className="border border-gray-300 px-3 py-1 w-full"
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
            className="border border-gray-300 px-3 py-1 w-full"
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
            className="border border-gray-300 px-3 py-1 w-full"
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
            className="border border-gray-300 px-3 py-1 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
    </main>
  );
};

export default UpRecipes;
