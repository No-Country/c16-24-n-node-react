import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import appApi from "../../api/appApi";

const GetRecipes = () => {
  const navigate = useNavigate();
  const { logIn } = useAuthContext();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await appApi.get("/user/recipes");

        setRecipes(response.data.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    if (logIn) {
      fetchRecipes();
    } else {
      navigate("/login");
    }
  }, [logIn, navigate]);

  return (
    <article className="text-center">
      <p className="text-xl">You Recipes...</p>

      <section className="grid grid-cols-3 max-md:grid-cols-1 gap-4 p-4">
        {recipes.map((recipe, index) => (
          <Link key={index} to={`/recipe/${recipe.id}`}>
            <div className="flex flex-col items-center border-2 rounded-lg p-2">
              <img
                className="border-2 mx-auto"
                src={recipe.image}
                alt={recipe.name}
              />
              <p className="mt-2">{recipe.name}</p>
            </div>
          </Link>
        ))}
      </section>
    </article>
  );
};

export default GetRecipes;
