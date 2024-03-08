import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import appApi from "../../api/appApi";
import Swal from "sweetalert2";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthProvider";
import Comments from "../../components/Comments";
import { BiEdit, BiTrash } from "react-icons/bi";
// import { MdDeleteSweep } from "react-icons/md";
// import { MdModeEditOutline } from "react-icons/md";
// import { GiFullPizza } from "react-icons/gi";
// import { CiPizza } from "react-icons/ci";
// import { TfiCommentAlt } from "react-icons/tfi";
// import { HiOutlineBookmark } from "react-icons/hi2";

const RecipeDetails = () => {
  const { favorites, user } = useAuthContext();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  let navigate = useNavigate();
  const currentData = new Date();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await appApi.get(`/recipes/${recipeId}`);
        const resApi = res?.data?.recipe;
        const favs = favorites.map((fav) => fav.id);
        const newDataApi = () => {
          const data = resApi.id;
          const newArray = favs.find((fav) => fav == data);

          if (newArray) {
            return { ...resApi, favorite: true };
          } else {
            return { ...resApi, favorite: false };
          }
        };
        setRecipe(newDataApi);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId, favorites]);

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
    return <span className="loader" />;
  }

  return (
    <>
      <main className="flex justify-center px-4 mt-5 pb-24">
        <section className="max-w-[1200px] md:w-full">
          <div className="mt-[5%] mx-0">
            <div className="flex flex-col lg:gap-x-4  md:gap-x-0 lg:gap-y-12 md:gap-y-24 sm:mb-5 justify-center items-center pb-1">
              <div
                className="md:max-w-[550px] md:w-[550px] md:h-[380px] lg:max-w-full lg:w-full lg:h-full gap-4"
                key={recipe?.id}
              >
                <div className="flex flex-col w-full bg-white border border-solid rounded-xl mb-5 p-5">
                  <h3 className="flex justify-between items-center pl-2 pb-1">
                    <span className="flex justify-between items-center gap-2 text-l">
                      <FaRegUserCircle size={20} />
                      <p className="text-sm font-semibold" id="UserPost">
                        @{recipe?.User?.user_name}
                      </p>
                    </span>
                    <p id="date" className="text-sm md:pr-5 sm:p-0">
                      {currentData?.toDateString("es-AR", recipe?.createdAt)}
                    </p>
                  </h3>
                  <img
                    className="pt-2 md:w-[500px] md:max-h-[230px] lg:w-full lg:max-h-[400px] object-cover rounded-xl"
                    src={recipe?.primaryimage}
                    alt=""
                  />
                  <div className="flex justify-between items-center">
                    <h3 id="name" className="text-xl font-bold pt-4 pb-2">
                      {recipe?.name}
                    </h3>
                    {user === "@" + recipe?.User?.user_name ? (
                      <div className="flex justify-end gap-x-2">
                        <Link
                          to={`/recipes/${recipeId}`}
                          className="text-sm text-blue-500"
                        >
                          <BiEdit size={22}/>
                          
                        </Link>
                        <button
                          onClick={handleDelete}
                          className="text-sm text-red-500"
                        >
                          <BiTrash size={22}/>
                          
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div id="hashtags" className="text-l font-semibold pl-2 pb-2">
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
                  
                    <h2 className="text-xl font-semibold">Ingredients</h2>
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
                          <h3 className="font-bold pr-2">
                            {recipe?.portion > 1 ? "Portions:" : "Portion:"}
                          </h3>
                          <span>{recipe?.portion} </span>
                        </span>
                        <span className="flex justify-between items-center">
                          <h3 className="font-bold pr-2">Difficulty: </h3>
                          <span>{recipe?.difficulty} </span>
                        </span>
                        <span className="flex justify-between items-center">
                          <h3 className="font-bold pr-2">Minutes: </h3>
                          <span>{recipe?.preparation_time}</span>
                        </span>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold">Steps</h2>
                    <div
                      dangerouslySetInnerHTML={{ __html: recipe?.process }}
                      id="process"
                      className="text-justify border border-solid rounded-xl p-2 md:h-[full] lg:h-[full]"
                    ></div>
                    <Comments dishID={recipeId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RecipeDetails;
