import { useAuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import appApi from "../../api/appApi";
import { BiSolidLike } from "react-icons/bi";
import RecipeCardComponent from "../../components/RecipeCard/RecipeCardComponent";

const Recipes = () => {
  const { logIn } = useAuthContext();
  const [dishList, setDishList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await appApi("/user/likes");
        const resApi = res?.data?.data;
        setDishList(resApi);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, []);

  const removeFromLikesList = (recipeId) => {
    const updatedPostList = dishList.filter((recipe) => recipe.id !== recipeId);
    setDishList(updatedPostList);
  };

  return (
    <>
      {!logIn && <Navigate to="/login" />}
      {loading ? (
        <span className="loader"></span>
      ) : (
        <main className="flex justify-center items-center px-4 mt-5">
          <section className="lg:w-[1200px] h-full">
            {dishList.length ? (
              <div className="my-[5%] mx-0">
                <div className="flex flex-wrap md:gap-4 md:gap-y-1 justify-center items-center pb-20">
                  {dishList.map((val) => (
                    <RecipeCardComponent
                      key={val.id}
                      recipeInfo={val}
                      callbackToLikesComp={removeFromLikesList}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-5 mt-5">
                <BiSolidLike className="text-4xl text-blue-600" />
                <p className=" text-3xl font-bold ">
                  There are no favorite recipes!
                </p>
              </div>
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default Recipes;
