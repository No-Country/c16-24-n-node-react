import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import appApi from "../../api/appApi";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await appApi.get(`/recipes/${recipeId}`);

        setRecipe(response.data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <article className="max-w-4xl mx-auto flex flex-col border-2 rounded-xl">
        <img
          src={recipe.primaryimage}
          alt={recipe.name}
          className="w-3/4 h-1/4 rounded-lg mt-5 mx-auto"
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

          <p className="mt-2">Portion: {recipe.portion}</p>
          <p>Preparation Time: {recipe.preparation_time} minutes</p>
          <p>Difficulty: {recipe.difficulty}</p>
          <p className="mt-2">Process: {recipe.process}</p>
          <div className="mt-4 mb-4">
            <p className="text-xl">Hashtags</p>
            <ul className="list-disc list-inside flex">
              {recipe.Hashtags.map((hashtag, index) => (
                <li className="list-none p-1" key={index}>
                  #{hashtag.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
      <hr className="my-10" />
    </>
  );
};

export default RecipeDetails;
