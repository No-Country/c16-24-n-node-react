import { FaRegUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { HiOutlineBookmark, HiOutlineStar } from "react-icons/hi2";
import { useAuthContext } from "../../context/AuthProvider";
import { Navigate, Link } from "react-router-dom";

const Recipes = () => {
  const { addOrRemoveFromFavs, favorites, logIn } = useAuthContext();

  console.log(favorites);
  return (
    <>
      {!logIn && <Navigate to="/login" />}
      <main className="flex justify-center px-4 mt-5">
        <section className="lg:w-[1200px]">
          <div className="my-[5%] mx-0"></div>
          <div className="flex flex-wrap gap-x-4 gap-y-24 justify-center items-center pb-20">
            {favorites.map((val) => (
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
                  <Link to={`/detail?dishID=${val.id}`}>
                  <img
                    className="pt-2 w-[500px] max-h-[230px] object-cover rounded-xl"
                    src={val.image}
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
                        {val.fav ? (
                          <HiOutlineStar
                            className="cursor-pointer fill-red-700 text-red-700"
                            size={20}
                          />
                        ) : (
                          <HiOutlineStar className="cursor-pointer" size={20} />
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
                        <TfiCommentAlt className="cursor-pointer" size={20} />
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
                    {val.comentary}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Recipes;
