import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import appApi from "../../api/appApi";
import Swal from "sweetalert2";
import { MdDeleteSweep } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await appApi.get(`/recipes/${recipeId}`);
        console.log(response.data.recipe.Ingredients);
        setRecipe(response.data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleDelete = async () => {
    Swal.fire({
      title: "You're sure?",
      text: "You won't be able to reverse this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await appApi.delete(`/recipes/${recipeId}`);
          navigate("/profile");
        } catch (error) {
          console.error("Error deleting recipe:", error);
        }
      }
    });
  };

  if (!recipe) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <article className="max-w-4xl mx-auto flex flex-col border-2 rounded-xl">
        <img
          src={recipe.primaryimage}
          alt={recipe.name}
          className="w-3/4 h-1/4 rounded-xl mt-5 mx-auto border-2"
        />
        <section className="mt-5 ml-10">
          <p className="text-4xl font-semibold mt-4 mb-2">{recipe.name}</p>
          <p className="mt-4 border-2 w-4/5 rounded-lg bg-gray-100 p-2">
            {recipe.description}
          </p>

          <div className="mt-4">
            <p className="text-3xl font-semibold">Ingredients</p>
            <ul className="list-disc list-inside border-2 p-2 mt-3 bg-gray-100 rounded-lg  w-4/5">
              {recipe.Ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <p className="text-3xl font-semibold">Categories</p>
            <ul className="list-disc list-inside border-2 p-2 mt-3 bg-gray-100 rounded-lg  w-4/5">
              {recipe.Categories.map((category, index) => (
                <li key={index}>{category.name}</li>
              ))}
            </ul>
          </div>

          <p className="m-2 text-xl">Portion: {recipe.portion}</p>
          <p className="text-xl m-2">
            Preparation Time: {recipe.preparation_time} minutes
          </p>
          <p className="text-xl m-2">Difficulty: {recipe.difficulty}</p>
          <div>
            <p className=" text-xl m-2">Process:</p>
            <p className="text-base m-2 w-4/5">{recipe.process}</p>
          </div>
          <div className="mt-4 mb-4 ">
            <p className="text-xl m-2">Hashtags</p>
            <ul className="list-disc list-inside flex m-2">
              {recipe.Hashtags.map((hashtag, index) => (
                <li className="list-none p-1" key={index}>
                  #{hashtag.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
      <hr className="my-7" />
      <div className="flex justify-evenly">
        <Link
          to={`/recipes/${recipeId}`}
          className="text-white bg-green-400 px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
        >
          <MdModeEditOutline />
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="text-white bg-red-400  px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
        >
          <MdDeleteSweep />
          Delete
        </button>
      </div>
      <hr className="my-10" />
    </>
  );
};

export default RecipeDetails;
