import { useState, useEffect } from "react";
import appApi from "../../api/appApi";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

const PersonalRecipes = ({ userName }) => {
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logIn } = useAuthContext();

  useEffect(() => {
    fetchPersonalRecipes();

  }, []);

  const fetchPersonalRecipes = async () => {
    const apiUri = !!userName ? `/users/recipes/${userName}` : "/user/recipes";
    try {
      const { data } = await appApi.get(apiUri);
      setMyRecipes(data.data);
    } catch (error) {
      setError("An error ocurred loading, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <span className="loader" />
      ) : (
        <>
          {!logIn && <Navigate to="/login" />}
          {myRecipes.length === 0 ? (
            <h3 className="">
              {error ? error : "Nothing to see yet..."}
              {(!userName && !error) && (
                <Link to="/posts" className="text-blue-900 underline">
                  Upload a recipe
                </Link>
              )}
            </h3>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-fit">
              {myRecipes.map((recipe) => (
                <RecipeCardComponent recipe={recipe} key={recipe.id} />
              ))}
            </section>
          )}
        </>
      )}
    </>
  );
};

const RecipeCardComponent = ({ recipe }) => {
  return (
    <Link
      className="mx-auto relative min-h-auto min-w-36"
      to={`/recipe/${recipe.id}`}
    >
      <div className="absolute w-full h-full rounded-xl hover:bg-slate-900 hover:bg-opacity-35"></div>
      <img
        className="aspect-square w-full object-cover rounded-xl hover:"
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
