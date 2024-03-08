import { useEffect, useState } from "react";
import { HiOutlineBookmark } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import LikesComponent from "../../components/Likes/LikesComponent";
import appApi from "../../api/appApi";
import { useAuthContext } from "../../context/AuthProvider";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";

const RecipesByTag = () => {
  const { tagName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
      try {
        const apiData = await appApi(`recipes/category/${tagName}`);
        setRecipes(apiData.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
  }
  useEffect(() => {
    fetchData();
  },[]);

  return (
    <main>
      <h2 className="text-4xl py-4 px-3">{`#${tagName}`}</h2>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <section className="flex flex-wrap md:gap-4 md:gap-y-24 justify-center items-center">
          {recipes.map((recipe) => (
            <RecipeDetails likeInfo={recipe} />
          ))}
        </section>
      )}
    </main>
  );
};

const RecipeDetails = ({ likeInfo }) => {
  const { bookMark, addOrRemoveFromBookmark } = useAuthContext();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const books = bookMark?.map((bookMark) => bookMark.id);
  useEffect(() => {
    const fetchRecipe = () => {
      if (books.includes(likeInfo.id)) {
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
            {new Date(likeInfo.createdAt).toLocaleDateString("es-AR")}
          </p>
        </h3>
        <Link to={`/detail?dishID=${likeInfo.id}`}>
          <img
            className="pt-2 w-[500px] max-h-[230px] object-cover rounded-xl"
            src={likeInfo.primaryimage}
            alt=""
          />
        </Link>
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-row">
            <LikesComponent recipeId={likeInfo.id} />
            <button
              onClick={addOrRemoveFromBookmark}
              data-bookmark-id={likeInfo?.id}
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
          {likeInfo.name}
        </h3>
        <p
          id="comentary"
          className="border text-justify border-solid rounded-xl p-2 md:h-20 sm:h-full"
        >
          {likeInfo.description?.substring(0, 120)}...
        </p>
      </div>
    </div>
  );
};

export default RecipesByTag;
