/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { HiOutlineBookmark } from "react-icons/hi2";
import { GiFullPizza } from "react-icons/gi";
import { CiPizza } from "react-icons/ci";
import { useAuthContext } from "../../context/AuthProvider";
import { TbSearch } from "react-icons/tb";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import appApi from "../../api/appApi";
import SearchUsersComponent from "./UserSearch";

const Seach = () => {
  const {
    addOrRemoveFromFavs,
    addOrRemoveFromBookmark,
    favorites,
    logIn,
    bookMark,
  } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [dishList, setDishList] = useState([]);
  const [dishAux, setDishAux] = useState([]);
  const currentData = new Date();

  const checkIsFav = (idtoCheck) => {
    return favorites.find((fav) => fav.id == idtoCheck);
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await appApi.get(`/recipes/`);
        const resApi = res?.data?.recipes;
        const newDataApi = resApi.map((data) => {
          const isInFav = checkIsFav(data.id);
          if (isInFav) {
            return { ...data, favorites: true };
          } else {
            return { ...data, favorites: false };
          }
        });

        setDishAux(newDataApi);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, []);

  useEffect(()=>{
    const newDataApi = dishAux.map((data) => {
      const isInFav = checkIsFav(data.id);
      if (isInFav) {
        return { ...data, favorites: true };
      } else {
        return { ...data, favorites: false };
      }
    });

    setDishAux(newDataApi);
  },[favorites])

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const books = bookMark?.map((bookMark) => bookMark.id);

        const newDataApi = dishAux.map((data) => {
          const newArrayInBook = books.find((book) => book == data.id);

          if (newArrayInBook) {
            return { ...data, bookMark: true };
          } else {
            return { ...data, bookMark: false };
          }
        });
        newDataApi.sort((a, b) => new Date(b.date) - new Date(a.date));
        setDishList(newDataApi);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [bookMark, dishAux, setDishList]);

  return (
    <>
      {!logIn && <Navigate to="/login" />}
      <main className="flex justify-center px-4 mt-5">
        <section className="max-w-[1200px] lg:w-[1200px] flex-1">
          <div className="mb-[5%] mt-[3%] mx-0">
            <div className="flex justify-center items-center pb-12 ">
              <TbSearch size={35} className="ml-2  text-gray-800" />
              <input
                className="ml-2 w-[80%] p-[10px] outline-none border rounded-xl"
                id="searchInput"
                type="text"
                placeholder="Search here..."
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
            </div>
            <SearchUsersComponent userTerm={searchTerm} />
            <div className="flex flex-wrap md:gap-4 md:gap-y-24 justify-center items-center pb-20">
              {dishList
                .filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((val) => {
                  return (
                    <div
                      className="md:max-w-[550px] min-w-[full] md:h-[380px] sm:h-full"
                      key={val.id}
                    >
                      <div className="flex flex-col w-full bg-white border border-solid rounded-xl mb-5 p-5">
                        <h3 className="flex justify-between items-center pl-2 pb-1">
                          <span className="flex justify-between items-center gap-2 text-l">
                            <FaRegUserCircle size={20} />
                            <Link to={`/${val.User.user_name}`}>
                              <p
                                className="text-sm font-semibold"
                                id="userPost"
                              >
                                @{val.User.user_name}
                              </p>
                            </Link>
                          </span>
                          <p id="date" className="text-sm md:pr-5 sm:pr-0">
                            {currentData?.toDateString("es-AR", val?.createdAt)}
                          </p>
                        </h3>
                        <Link to={`/detail?dishID=${val.id}`}>
                          <img
                            className="pt-2 w-[500px] max-h-[230px] object-cover rounded-xl"
                            src={val.primaryimage}
                            alt=""
                          />
                        </Link>
                        <div className="flex justify-between items-center py-3">
                          <div className="flex flex-row">
                            <button
                              onClick={addOrRemoveFromFavs}
                              data-dish-id={val.id}
                              className="flex seft-start item-center gap-x-2 pl-2"
                            >
                              {val.favorites ? (
                                <CiPizza
                                  className="cursor-pointer fill-rose-700 text-rose-700"
                                  size={20}
                                />
                              ) : (
                                <GiFullPizza
                                  className="cursor-pointer"
                                  size={20}
                                />
                              )}
                            </button>
                            <button
                              onClick={addOrRemoveFromBookmark}
                              data-bookmark-id={val.id}
                              className="flex seft-start item-center gap-x-2 pl-2"
                            >
                              {val.bookMark ? (
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
                            <button className="flex justify-center item-center pr-2">
                              <TfiCommentAlt
                                className="cursor-pointer"
                                size={20}
                              />
                            </button>
                          </div>
                        </div>
                        <h3 id="name" className="pb-2">
                          {val.name}
                        </h3>
                        <p
                          id="comentary"
                          className="border text-justify border-solid rounded-xl p-2 md:h-20 sm:h-full"
                        >
                          {val.description.substring(0, 120)}...
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Seach;
