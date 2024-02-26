/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import endPoint from "./TemplateData.json";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { HiOutlineBookmark, HiOutlineStar } from "react-icons/hi2";
import { useAuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Seach = () => {
  const { addOrRemoveFromFavs, favorites, logIn } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [dishList, setDishList] = useState([]);
  let navigate = useNavigate();

  const endPoint = "https://7d8adbaec89f45858404e53f8bde9adc.api.mockbin.io/";

  useEffect(() => {
    axios
      .get(endPoint)
      .then((res) => {
        const apiData = res.data;
        const favs = favorites.map((fav) => fav.id);

        const newDataApi = apiData.map((data) => {
          const newArray = favs.find((fav) => fav === data.id);
          if (newArray) {
            return { ...data, favorites: true };
          } else {
            return { ...data, favorites: false };
          }
        });
        setDishList(newDataApi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setDishList, favorites]);

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      if (!logIn) {
        navigate("/login");
      }
    });
  }, [logIn, navigate]);

  return (
    <main className="flex justify-center px-4 mt-5">
      <section className="max-w-[1200px]">
        <div className="my-[5%] mx-0">
          <div className="flex justify-center items-center pb-12 ">
            <input
              className="w-[80%] p-[10px] outline-none border rounded-xl"
              id="searchInput"
              type="text"
              placeholder="Search here..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-24 justify-center items-center pb-20">
            {dishList
              .filter((val) => {
                if (searchTerm == "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val) => {
                return (
                  <div
                    className="md:max-w-[550px] w-[550px] h-[380px] gap-4"
                    key={val.id}
                  >
                    <div className="flex flex-col w-full bg-white border border-solid rounded-xl p-5">
                      <h3 className="flex justify-between items-center pl-2 pb-1">
                        <span className="flex justify-between items-center gap-2 text-l">
                          <FaRegUserCircle size={20} />
                          <p id="userPost">{val.user}</p>
                        </span>
                        <p id="date" className="text-sm pr-5">
                          {val.date}
                        </p>
                      </h3>
                      <img
                        className="pt-2 w-[500px] max-h-[230px] object-cover rounded-xl"
                        src={val.image}
                        alt=""
                      />
                      <div className="flex justify-between items-center py-3">
                        <div className="flex flex-row">
                          <button
                            onClick={addOrRemoveFromFavs}
                            data-dish-id={val.id}
                            className="flex seft-start item-center gap-x-2 pl-2"
                          >
                            {val.favorites ? (
                              <HiOutlineStar
                                className="cursor-pointer fill-red-700 text-red-700"
                                size={20}
                              />
                            ) : (
                              <HiOutlineStar
                                className="cursor-pointer"
                                size={20}
                              />
                            )}
                          </button>
                          <button
                            data-bookmark-id={val.id}
                            className="flex seft-start item-center gap-x-2 pl-2"
                          >
                            <HiOutlineBookmark
                              className={`cursor-pointer `}
                              size={20}
                            />
                          </button>
                        </div>
                        <div>
                          <button className="flex justify-center item-center pr-5">
                            <TfiCommentAlt
                              className="cursor-pointer"
                              size={20}
                            />
                          </button>
                        </div>
                      </div>
                      <h3 id="titulo" className="pb-2">
                        {val.title}
                      </h3>
                      <p
                        id="comentario"
                        className="border border-solid rounded-xl p-2 h-20"
                      >
                        {val.comentary.substring(0, 120)}...
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Seach;
