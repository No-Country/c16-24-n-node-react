import { useState, useEffect } from "react";
import appApi from "../../api/appApi";
import LoadingSpinner from "../../components/Spinner";
import { Link } from "react-router-dom";

const PersonalRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonalRecipes();
  }, []);

  const fetchPersonalRecipes = async () => {
    try {
      const { data } = await appApi.get("/user/recipes");
      setMyRecipes(data.data);
      console.log(!!myRecipes)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="grid grid-cols-3 max-md:grid-cols-1 gap-4 max-w-fit">
      {
        loading ? (
        <LoadingSpinner />
      ) : myRecipes.length>0 ? (
        myRecipes.map((recipe) => {
          return <RecipeCardComponent recipe={recipe} key={recipe.id} />;
        })
      ) : (
        <h3>Nothing to see yet... <Link to="/posts" className="text-blue-900 underline">Upload a recipe</Link></h3>
      )}
    </section>
  );
};

const RecipeCardComponent = ({ recipe }) => {
  return (
    <Link className="mx-auto relative" to={`/recipe/${recipe.id}`}>
      <img
        className="aspect-square w-full object-cover rounded-xl"
        src={recipe.image}
        alt={recipe.name}
      />
      <p className="text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] w-full py-3 px-2 bg-opacity-25 absolute top-0 rounded-t-xl bg-slate-900 text-ellipsis text-nowrap overflow-x-hidden">
        {recipe.name}
      </p>
    </Link>
  );
};

export default PersonalRecipes;
