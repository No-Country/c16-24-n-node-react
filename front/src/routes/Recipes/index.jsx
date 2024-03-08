import { FaRegUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { HiOutlineBookmark } from "react-icons/hi2";
import { GiFullPizza } from "react-icons/gi";
import { CiPizza } from "react-icons/ci";
import { useAuthContext } from "../../context/AuthProvider";
import { Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import appApi from "../../api/appApi";

const Recipes = () => {
  const { addOrRemoveFromBookmark, logIn } = useAuthContext();
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
                <div className="flex flex-wrap md:gap-4 md:gap-y-24 justify-center items-center pb-20">
                  {dishList.map((val) => (
                    <RecipeDetailsComponent
                      key={val.Recipe.id}
                      likeInfo={val}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className=" text-2xl font-bold">
                  There are no favorite recipes
                </h2>
              </div>
            )}
          </section>
        </main>
      )}
    </>
  );
};

const RecipeDetailsComponent = ({ likeInfo }) => {
  const { bookMark, addOrRemoveFromBookmark } = useAuthContext();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const books = bookMark?.map((bookMark) => bookMark.id);
  useEffect(() => {
    const fetchRecipe = () => {
      if (books.includes(likeInfo.Recipe.id)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    };

    fetchRecipe();
  }, [bookMark]);

  return (
    <div className="md:max-w-[550px] min-w-[full] md:h-[380px] sm:h-full">
      <div className="flex flex-col w-full bg-white border border-solid rounded-xl mb-5 p-5">
        <h3 className="flex justify-between items-center pl-2 pb-1">
          <span className="flex justify-between items-center gap-2 text-l">
            <FaRegUserCircle size={20} />
            <Link to={`/${likeInfo.User.id}`}>
              <p className="text-sm font-semibold" id="userPost">
                @{likeInfo.User.user_name}
              </p>
            </Link>
          </span>
          <p id="date" className="text-sm md:pr-5 sm:p-0">
            {new Date(likeInfo.Recipe.createdAt).toLocaleDateString("es-AR")}
          </p>
        </h3>
        <Link to={`/detail?dishID=${likeInfo.Recipe.id}`}>
          <img
            className="pt-2 w-[500px] max-h-[230px] object-cover rounded-xl"
            src={likeInfo.Recipe.primaryimage}
            alt=""
          />
        </Link>
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-row">
            {/* <button
            onClick={addOrRemoveFromFavs}
            data-dish-id={val.id}
            className="flex seft-start item-center gap-x-2 pl-2"
          >
            {!val.fav ? (
              <CiPizza
                className="cursor-pointer fill-red-700 text-red-700"
                size={20}
              />
            ) : (
              <GiFullPizza
                className="cursor-pointer"
                size={20}
              />
            )}
          </button> */}
            <button
              onClick={addOrRemoveFromBookmark}
              data-bookmark-id={likeInfo.Recipe?.id}
              className="flex seft-start item-center gap-x-2 pl-2"
            >
              {isBookmarked ? (
                <HiOutlineBookmark
                  className={`cursor-pointer  fill-red-700 text-red-700 `}
                  size={20}
                />
              ) : (
                <HiOutlineBookmark className={`cursor-pointer `} size={20} />
              )}
            </button>
          </div>
          <div>
            <button className="flex justify-center item-center pr-2">
              <TfiCommentAlt className="cursor-pointer" size={20} />
            </button>
          </div>
        </div>
        <h3 id="name" className="pb-2">
          {likeInfo.Recipe.name}
        </h3>
        <p
          id="comentary"
          className="border text-justify border-solid rounded-xl p-2 md:h-20 sm:h-full"
        >
          {likeInfo.Recipe.description?.substring(0, 120)}...
        </p>
      </div>
    </div>
  );
};

export default Recipes;
