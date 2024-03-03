import { useEffect, useState } from "react";
import appApi from "../../api/appApi";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { HiOutlineBookmark } from "react-icons/hi2";
import { useAuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { BiSolidSend } from "react-icons/bi";
import { GiFullPizza } from "react-icons/gi";


const Detail = () => {
  const { addOrRemoveFromFavs, handlerFav, user } = useAuthContext();
  const [dish, setDish] = useState([]);
  const [comment, setComment] = useState({
    commentary: "",
    idPost: "",
    userID: "",
    userName: "",
    time: "",
  });
  const [comments, setComments] = useState([]);
  const currentData = new Date();
  let query = new URLSearchParams(window.location.search);
  let dishID = query.get("dishID");
  const { commentary, idPost, userName, userID, time } = comment;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await appApi.get(`/recipes/${dishID}`);

        setDish(response.data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [dishID]);

  const onClickHandler = (e) => {
    e.preventDefault();
    setComments((comments) => [...comments, comment]);
    e.target.reset();
  };

  const handleComment = (e) => {
    const { name, value } = e.target;
    const userName = sessionStorage.getItem("user");
    const userID = sessionStorage.getItem("token");
    const idPost = dishID;
    const time = new Date();
    setComment({
      ...comment,
      idPost,
      userName,
      userID,
      time,
      [name]: value,
    });
  };

  sessionStorage.setItem("Comments", comments);

  return (
    <div className="h-full flex justify-center items-center">
      {!user && <span className="loader" />}
      {!user && <Navigate to="/" />}
      <main className="flex justify-center px-4 mt-5">
        <section className="max-w-[1200px]">
          <div className="my-[5%] mx-0">
            <div className="flex md:flex-wrap lg:flex-col gap-x-4 md:gap-y-24 lg:gap-y-10 justify-center items-center pb-20">
              <div
                className="md:max-w-[550px] md:w-[550px] md:h-[380px] lg:max-w-full lg:w-full lg:h-full gap-4"
                key={dish?.id}
              >
                <div className="flex flex-col lg:min-w-[1000px] bg-white border border-solid rounded-xl md:p-5">
                  <h3 className="flex justify-between items-center pl-2 pb-1">
                    <span className="flex justify-between items-center gap-2 text-l">
                      <FaRegUserCircle size={20} />
                      <p id="userPost">@{dish?.User?.user_name}</p>
                    </span>
                    <p id="date" className="text-sm pr-5">
                      {currentData?.toDateString("es-AR", dish?.createdAt)}
                    </p>
                  </h3>
                  <img
                    className="pt-2 md:w-[500px] md:max-h-[230px] lg:w-full lg:max-h-[400px] object-cover rounded-xl"
                    src={dish?.primaryimage}
                    alt=""
                  />
                  <div className="flex justify-between items-center py-3">
                    <div className="flex flex-row">
                      <button
                        onClick={addOrRemoveFromFavs}
                        data-dish-id={dish?.id}
                        className="flex seft-start item-center gap-x-2 pl-2"
                      >
                        {dish?.favorite ? (
                          <GiFullPizza
                            onClick={handlerFav}
                            className="cursor-pointer fill-rose-700 text-rose-700"
                            size={20}
                          />
                        ) : (
                          <GiFullPizza className="cursor-pointer" size={20} />
                        )}
                      </button>
                      <button
                        data-bookmark-id={dish?.id}
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
                        <TfiCommentAlt className="cursor-pointer" size={20} />
                      </button>
                    </div>
                  </div>
                  <h3 id="title" className="text-xl font-bold pb-2">
                    {dish?.name}
                  </h3>
                  <div
                    id="hashtags"
                    className="text-l  font-semibold pl-2 pb-2"
                  >
                    {dish?.hashtags?.map((item, index) => (
                      <span className="pr-2" key={index}>
                        #{item?.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <div
                      id="comentary"
                      className="border border-solid rounded-xl p-2 md:h-[full] lg:h-[full] "
                    >
                      {dish?.description?.charAt(0).toUpperCase() +
                        dish?.description?.slice(1).substring(0, 120)}
                      ...
                    </div>
                    <h2 className="text-xl font-semibold">Ingredientes</h2>
                    <div
                      id=""
                      className="flex justify-between items-center border border-solid rounded-xl p-2 md:h-[full] lg:h-[full] "
                    >
                      <ul>
                        {dish?.ingredients?.map((item, index) => (
                          <li key={index}>
                            {item?.name?.charAt(0).toUpperCase() +
                              item?.name?.slice(1)}
                          </li>
                        ))}
                      </ul>
                      <div className="block">
                        <span className="flex justify-between items-center">
                          <h3 className="font-normal pr-2">Portion</h3>
                          <span>{dish?.portion} </span>
                        </span>
                        <span className="flex justify-between items-center">
                          <h3 className="font-normal pr-2">Difficulty </h3>
                          <span>{dish?.difficulty} </span>
                        </span>
                        <span className="flex justify-between items-center">
                          <h3 className="font-normal pr-2">Time </h3>
                          <span>{dish?.preparation_time + "'"}</span>
                        </span>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold">Pasos</h2>
                    <div
                      dangerouslySetInnerHTML={{ __html: dish?.process }}
                      id="process"
                      className="text-justify border border-solid rounded-xl p-2 md:h-[full] lg:h-[full] "
                    ></div>
                    <h2 className="text-xl font-semibold">Comentarios</h2>
                    <div className="flex gap-y-4 text-justify border border-solid rounded-xl p-2 md:h-[full] lg:h-[full]">
                      <span className="flex w-content justify-between items-center gap-2 text-l">
                        <FaRegUserCircle size={20} />
                        <p id="userPost" className="pr-6">
                          {user}
                        </p>
                      </span>
                      <span>
                        <form
                          onSubmit={onClickHandler}
                          className="flex justify-between items-center max-w-[1000px] w-[100%]"
                        >
                          <input
                            className="border-b  focus:outline-none solid w-[1000px] hover:border-b-2  "
                            onChange={handleComment}
                            name="commentary"
                          />
                          <button type="submit">
                            <BiSolidSend className="ml-4" size={20} />{" "}
                          </button>
                        </form>
                      </span>
                    </div>

                    {comments?.map((item, index) => (
                      <div
                        key={index}
                        className="block m-auto gap-y-4 text-justify border w-[98%] border-solid rounded-xl p-2 md:h-[full] lg:h-[full]"
                      >
                        <div className="">
                          <div className="flex justify-between items-center pl-2 pb-1">
                            <span className="flex items-center gap-2 text-l">
                              <FaRegUserCircle size={20} />
                              <p id="userPost">{item?.userName}</p>
                            </span>
                            <p id="date" className="text-sm pr-5">
                              {currentData?.toDateString("es-AR", item?.time)}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-y-4 text-justify border border-solid rounded-xl p-2 m-2 md:h-[full] lg:h-[full]">
                          <p>{item.commentary}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Detail;
