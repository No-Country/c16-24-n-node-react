import { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { HiOutlineBookmark } from "react-icons/hi2";
import { GiFullPizza } from "react-icons/gi";
import { useAuthContext } from "../../context/AuthProvider";
import appApi from "../../api/appApi";
import { Link } from "react-router-dom";

const Home = () => {
  const [dishList, setDishList] = useState([]);
  const { addOrRemoveFromFavs, handlerFav } = useAuthContext();

  const currentData = new Date();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await appApi.get(`/recipes/`);
        const resApi = res?.data?.recipes;
        resApi.sort((a, b) => new Date(b.date) - new Date(a.date));
        setDishList(resApi);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, []);

  return (
    <main className="flex justify-center px-4 mt-5">
      <section className="max-w-[1200px] md:w-full">
        <div className="my-[5%] mx-0">
          <div className="flex flex-col lg:gap-x-4  md:gap-x-0 lg:gap-y-12 md:gap-y-24 sm:mb-5 justify-center items-center pb-20">
            {dishList.map((val) => (
              <div
                className="md:max-w-[550px] md:w-[550px] md:h-[380px] lg:max-w-full lg:w-full lg:h-full gap-4"
                key={val.id}
              >
                <div className="flex flex-col w-full bg-white border border-solid rounded-xl mb-5 p-5">
                  <h3 className="flex justify-between items-center pl-2 pb-1">
                    <Link className="flex justify-between items-center gap-2 text-l" to={`${val.User.user_name}`}>
                      <FaRegUserCircle size={20} />
                      <p className="text-sm font-semibold" id="userPost">
                        @{val.User.user_name}
                      </p>
                    </Link>
                    <p id="date" className="text-sm md:pr-5 sm:p-0">
                      {currentData.toDateString("es-AR", val.createdAt)}
                    </p>
                  </h3>
                  <Link to={`/detail?dishID=${val.id}`}>
                    <img
                      className="pt-2 w-[500px] md:max-h-[230px] lg:w-full lg:max-h-[400px] object-cover rounded-xl"
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
                        {val.favorite ? (
                          <GiFullPizza
                            onClick={handlerFav}
                            className="cursor-pointer fill-red-700 text-red-700"
                            size={20}
                          />
                        ) : (
                          <GiFullPizza className="cursor-pointer" size={20} />
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
                      <button className="flex justify-center item-center pr-2">
                        <TfiCommentAlt className="cursor-pointer" size={20} />
                      </button>
                    </div>
                  </div>
                  <h3 id="name" className="pb-2">
                    {val.name}
                  </h3>

                  <div
                    id="comentary"
                    className="border text-justify border-solid rounded-xl p-2 md:h-[full] lg:[full] "
                  >
                    {val.description.substring(0, 120)}...
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
export default Home;
