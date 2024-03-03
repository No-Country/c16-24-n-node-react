import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import appApi from "../../api/appApi";
import Swal from "sweetalert2";
import { MdDeleteSweep } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { GiFullPizza } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { HiOutlineBookmark } from "react-icons/hi2";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  let navigate = useNavigate();
  const currentData = new Date();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await appApi.get(`/recipes/${recipeId}`);
        console.log(response.data.recipe.ingredients);
        setRecipe(response.data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleDelete = async () => {
    Swal.fire({
      title: "You're sure?",
      text: "You won't be able to reverse this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await appApi.delete(`/recipes/${recipeId}`);
          navigate("/profile");
        } catch (error) {
          console.error("Error deleting recipe:", error);
        }
      }
    });
  };

  if (!recipe) {
    return<span className="loader" />;
  }

  return (
    <>
      <main className="flex justify-center px-4 mt-5">
        <section className="max-w-[1200px]">
          <div className="mt-[5%] mx-0">
            <div className="flex md:flex-wrap lg:flex-col gap-x-4 md:gap-y-24 lg:gap-y-10 justify-center items-center pb-5">
              <div
                className="md:max-w-[550px] md:w-[550px] md:h-[380px] lg:max-w-full lg:w-full lg:h-full gap-4"
                key={recipe?.id}
              >
                <div className="flex flex-col lg:min-w-[1000px] bg-white border border-solid rounded-xl md:p-5">
                  <h3 className="flex justify-between items-center pl-2 pb-1">
                    <span className="flex justify-between items-center gap-2 text-l">
                      <FaRegUserCircle size={20} />
                      <p id="userPost">@{recipe?.User?.user_name}</p>
                    </span>
                    <p id="createdAt" className="text-sm pr-5">
                      {currentData?.toDateString("es-AR", recipe?.createdAt)}
                    </p>
                  </h3>
                  <img
                    className="pt-2 md:w-[500px] md:max-h-[230px] lg:w-full lg:max-h-[400px] object-cover rounded-xl"
                    src={recipe?.primaryimage}
                    alt=""
                  />
                  <div className="flex justify-between items-center py-3">
                    <div className="flex flex-row">
                      <button
                        // onClick={addOrRemoveFromFavs}
                        data-dish-id={recipe?.id}
                        className="flex seft-start item-center gap-x-2 pl-2"
                      >
                        {recipe?.favorite ? (
                          <GiFullPizza
                            className="cursor-pointer fill-red-700 text-red-700"
                            size={20}
                          />
                        ) : (
                          <GiFullPizza className="cursor-pointer" size={20} />
                        )}
                      </button>
                      <button
                        data-bookmark-id={recipe?.id}
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
                  <h3 id="name" className="text-xl font-bold pb-2">
                    {recipe?.name}
                  </h3>
                  <div
                    id="hashtags"
                    className="text-l  font-semibold pl-2 pb-2"
                  >
                    {recipe?.hashtags?.map((item, index) => (
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
                      {recipe?.description?.charAt(0).toUpperCase() +
                        recipe?.description?.slice(1).substring(0, 120)}
                      ...
                    </div>
                    <h2 className="text-xl font-semibold">Ingredientes</h2>
                    <div
                      id=""
                      className="flex justify-between items-center border border-solid rounded-xl p-2 md:h-[full] lg:h-[full] "
                    >
                      <ul>
                        {recipe?.ingredients?.map((item, index) => (
                          <li key={index}>
                            {item?.name?.charAt(0).toUpperCase() +
                              item?.name?.slice(1)}
                          </li>
                        ))}
                      </ul>
                      <div className="block">
                        <span className="flex justify-between items-center">
                          <h3 className="font-normal pr-2">Portion</h3>
                          <span>{recipe?.portion} </span>
                        </span>
                        <span className="flex justify-between items-center">
                          <h3 className="font-normal pr-2">Difficulty </h3>
                          <span>{recipe?.difficulty} </span>
                        </span>
                        <span className="flex justify-between items-center">
                          <h3 className="font-normal pr-2">Time </h3>
                          <span>{recipe?.preparation_time + "'"}</span>
                        </span>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold">Pasos</h2>
                    <div
                      dangerouslySetInnerHTML={{ __html: recipe?.process }}
                      id="process"
                      className="text-justify border border-solid rounded-xl p-2 md:h-[full] lg:h-[full] "
                    ></div>
                    {/* <h2 className="text-xl font-semibold">Comentarios</h2>
                  <div className="flex gap-y-4 text-justify border border-solid rounded-xl p-2 md:h-[full] lg:h-[full]">
                    <span className="flex w-content justify-between items-center gap-2 text-l">
                      <FaRegUserCircle size={20} />
                      <p id="userPost" className="pr-6">{user}</p>
                    </span>
                    <span>
                      <form onSubmit={onClickHandler} className="flex justify-between items-center max-w-[1000px] w-[100%]">
                        <input
                          className="border-b  focus:outline-none solid w-[1000px] hover:border-b-2  "
                          onChange={handleComment}
                          name="commentary"
                        />
                        <button type="submit" ><BiSolidSend className="ml-4" size={20} /> </button>
                      </form>
                    </span>
                  </div> */}

                    {/* {comments?.map((item, index) => (
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
                            {currentData?.toDateString(
                              "es-AR",
                              item?.time
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-y-4 text-justify border border-solid rounded-xl p-2 m-2 md:h-[full] lg:h-[full]">
                        <p>{item.commentary}</p>
                      </div>
                    </div>
                  ))} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <article className="max-w-4xl mx-auto flex flex-col border-2 rounded-xl">
        <img
          src={recipe.primaryimage}
          alt={recipe.name}
          className="w-3/4 h-1/4 rounded-xl mt-5 mx-auto border-2"
        />
        <section className="mt-5 ml-10">
          <p className="text-4xl font-semibold mt-4 mb-2">{recipe.name}</p>
          <p className="mt-4 border-2 w-4/5 rounded-lg bg-gray-100 p-2">
            {recipe.description}
          </p>

          <div className="mt-4">
            <p className="text-3xl font-semibold">Ingredients</p>
            <ul className="list-disc list-inside border-2 p-2 mt-3 bg-gray-100 rounded-lg  w-4/5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <p className="text-3xl font-semibold">Categories</p>
            <ul className="list-disc list-inside border-2 p-2 mt-3 bg-gray-100 rounded-lg  w-4/5">
              {recipe.categories.map((category, index) => (
                <li key={index}>{category.name}</li>
              ))}
            </ul>
          </div>

          <p className="m-2 text-xl">Portion: {recipe.portion}</p>
          <p className="text-xl m-2">
            Preparation Time: {recipe.preparation_time} minutes
          </p>
          <p className="text-xl m-2">Difficulty: {recipe.difficulty}</p>
          <div>
            <p className=" text-xl m-2">Process:</p>
            <p dangerouslySetInnerHTML={{ __html: recipe?.process }} className="text-base m-2 w-4/5"></p>
          </div>
          <div className="mt-4 mb-4 ">
            <p className="text-xl m-2">Hashtags</p>
            <ul className="list-disc list-inside flex m-2">
              {recipe.hashtags.map((hashtag, index) => (
                <li className="list-none p-1" key={index}>
                  #{hashtag.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article> */}
      <hr className="my-7" />
      <div className="flex justify-evenly">
        <Link
          to={`/recipes/${recipeId}`}
          className="text-white bg-green-400 px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
        >
          <MdModeEditOutline />
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="text-white bg-red-400  px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
        >
          <MdDeleteSweep />
          Delete
        </button>
      </div>
      <hr className="my-10" />
    </>
  );
};

export default RecipeDetails;
