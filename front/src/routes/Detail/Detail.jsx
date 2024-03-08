/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { HiOutlineBookmark } from "react-icons/hi2";
import { useAuthContext } from "../../context/AuthProvider";
import { Link, Navigate } from "react-router-dom";
import Comments from "../../components/Comments";
import appApi from "../../api/appApi";
import LikesComponent from "../../components/Likes/LikesComponent";
import TagComponent from "../../components/Tag";

const Detail = () => {
  const {
    addOrRemoveFromBookmark,
    user,
    bookMark,
  } = useAuthContext();
  const [dish, setDish] = useState([]);
  const [dishAux, setDishAux] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(window.location.search);
  const dishID = query.get("dishID");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await appApi.get(`/recipes/${dishID}`);
        const resApi = res?.data?.recipe;
        setDishAux(resApi);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, []);


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const books = bookMark?.map((bookMark) => bookMark.id);

        const newDataApi = () => {
          const newArrayInBook = books?.find((book) => book === dishID);

          if (newArrayInBook) {
            return { ...dishAux, bookMark: true };
          } else {
            return { ...dishAux, bookMark: false };
          }
        };
        setDish(newDataApi);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [bookMark, dishID]);

  return (
    <div className="flex justify-center">
      {!user && <Navigate to="/login" />}
      {loading ? (
        <span className="loader"></span>
      ) : (
        <main className="flex justify-center item-center px-4 mt-5">
          <section className="max-w-[1200px] md:w-full">
            <div className="my-[5%] mx-0">
              <div className="flex flex-col lg:gap-x-4  md:gap-x-0 sm:mb-5 justify-center items-center pb-20">
                <div
                  className="md:max-w-[550px] md:w-[550px lg:max-w-full lg:w-full lg:h-full gap-4"
                  key={dishAux?.id}
                >
                  <div className="flex flex-col w-full bg-white border border-solid rounded-xl mb-5 p-5">
                    <h3 className="flex justify-between items-center pl-2 pb-1">
                      <Link
                        className="flex justify-between items-center gap-2 text-l"
                        to={`/${dishAux?.User?.user_name}`}
                      >
                        <FaRegUserCircle size={20} />
                        <p className="text-sm font-semibold" id="userPost">
                          @{dishAux?.User?.user_name}
                        </p>
                      </Link>
                      <p id="date" className="text-sm md:pr-5 sm:p-0">
                        {new Date(dishAux?.createdAt).toLocaleDateString("es-AR")}
                      </p>
                    </h3>
                    <img
                      id="img"
                      className="pt-2 md:w-[500px] md:max-h-[230px] lg:w-full lg:max-h-[400px] object-cover rounded-xl"
                      src={dishAux?.primaryimage}
                      alt=""
                    />
                    <div className="flex justify-between items-center py-3">
                      <div className="flex items-center flex-row">
                        <LikesComponent recipeId={dishAux["id"]} />
                        <button
                          onClick={addOrRemoveFromBookmark}
                          data-bookmark-id={dishAux.id}
                          className="flex seft-start item-center gap-x-2 pl-2"
                        >
                          {dish?.bookMark ? (
                            <HiOutlineBookmark
                              className={`cursor-pointer  fill-red-700 text-red-700 `}
                              size={20}
                            />
                          ) : (
                            <HiOutlineBookmark
                              className={`cursor-pointer `}
                              size={20}
                            />
                          )}
                        </button>
                      </div>
                      <div>
                        <a href="#comments">
                          <button className="flex justify-center item-center pr-2">
                            <TfiCommentAlt
                              className="cursor-pointer"
                              size={20}
                            />
                          </button>
                        </a>
                      </div>
                    </div>
                    <h3 id="name" className="text-2xl font-bold pb-2">
                      {dishAux?.name}
                    </h3>
                    <div id="categories" className="text-l font-bold pb-2">
                      <p className="text-bold text-xl">Categories: </p>
                      {dishAux?.categories?.map((item, index) => (
                        <span className="pl-2 font-semibold" key={index}>
                          {item?.name.charAt(0).toUpperCase() +
                            item?.name?.slice(1).substring(0, 120) +
                            ""}
                        </span>
                      ))}
                    </div>
                    <div
                      id="hashtags"
                      className="text-l font-semibold pl-2 pb-2"
                    >
                      {dishAux?.hashtags?.map((item, index) => (
                        <span className="pr-2" key={index}>
                          <TagComponent tagName={item.name} />
                        </span>
                      ))}
                    </div>
                    <div className="flidex flex-col gap-y-4">
                      <div
                        id="comentary"
                        className="border text-justify border-solid rounded-xl p-2 md:h-[full] lg:h-[full] "
                      >
                        {dishAux?.description?.charAt(0).toUpperCase() +
                          dishAux?.description?.slice(1)}
                        ...
                      </div>
                      <h2 className="text-xl font-bold">Ingredients</h2>
                      <div
                        id=""
                        className="md:flex md:justify-between sm:block items-center border border-solid rounded-xl p-2 md:h-[full] lg:h-[full] "
                      >
                        <ul>
                          {dishAux?.ingredients?.map((item, index) => (
                            <li key={index}>
                              {item?.name?.charAt(0).toUpperCase() +
                                item?.name?.slice(1)}
                            </li>
                          ))}
                        </ul>
                        <div className="block mt-4">
                          <span className="flex justify-between items-center">
                            <h3 className="font-bold pr-2">
                              {dishAux?.portion > 1 ? "Portions:" : "Portion:"}
                            </h3>
                            <span>{dishAux?.portion} </span>
                          </span>
                          <span className="flex justify-between items-center">
                            <h3 className="font-bold pr-2">Difficulty: </h3>
                            <span>{dishAux?.difficulty} </span>
                          </span>
                          <span className="flex justify-between items-center">
                            <h3 className="font-bold pr-2">Minutes: </h3>
                            <span>{dishAux?.preparation_time}</span>
                          </span>
                        </div>
                      </div>
                      <h2 className="text-xl font-bold">Steps</h2>
                      <div
                        dangerouslySetInnerHTML={{ __html: dishAux?.process }}
                        id="process"
                        className="text-justify border border-solid rounded-xl p-2 md:h-[full] lg:h-[full] "
                      ></div>
                    </div>
                  </div>
                </div>
                {!!dishAux && (
                  <Comments
                    dishID={dishID}
                    userDetail={dishAux?.User?.user_name}
                  />
                )}
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default Detail;
