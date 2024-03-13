/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { TfiCommentAlt } from "react-icons/tfi";
import { useAuthContext } from "../../context/AuthProvider";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import LikesComponent from "../Likes/LikesComponent";
import { HiOutlineBookmark } from "react-icons/hi2";

const RecipeCardComponent = ({ recipeInfo, callbackToLikesComp }) => {
  const { bookMark, addOrRemoveFromBookmark } = useAuthContext();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const books = bookMark?.map((bookMark) => bookMark.id);
  useEffect(() => {
    const fetchRecipe = () => {
      if (books.includes(recipeInfo.id)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    };

    fetchRecipe();
  }, [bookMark]);

  return (
    <div className="md:max-w-[550px] w-full sm:h-full">
      <div className="flex flex-col w-full bg-white border border-solid rounded-xl mb-5 p-5">
        <h3 className="flex justify-between items-center pl-2 pb-1">
          <span className="flex justify-between items-center gap-2 text-l">
            <FaRegUserCircle size={20} />
            <Link to={`/${recipeInfo.User.user_name}`}>
              <p className="text-sm font-semibold" id="userPost">
                @{recipeInfo.User.user_name}
              </p>
            </Link>
          </span>
          <p id="date" className="text-sm md:pr-5 sm:p-0">
            {new Date(recipeInfo.createdAt).toLocaleDateString("es-AR")}
          </p>
        </h3>
        <Link to={`/detail?dishID=${recipeInfo.id}`}>
          <img
            className="pt-2 w-full max-h-[230px] object-cover rounded-xl"
            src={recipeInfo.primaryimage}
            alt=""
          />
        </Link>
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-row">
            <LikesComponent
              recipeId={recipeInfo.id}
              callbackToLikesComp={callbackToLikesComp}
            />
            <button
              onClick={addOrRemoveFromBookmark}
              data-bookmark-id={recipeInfo?.id}
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
          {recipeInfo.name}
        </h3>
        <p
          id="comentary"
          className="border text-justify border-solid rounded-xl p-2 md:h-20 sm:h-full"
        >
          {recipeInfo.description?.substring(0, 120)}...
        </p>
      </div>
    </div>
  );
};

export default RecipeCardComponent;
