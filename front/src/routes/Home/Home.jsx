import { useState, useEffect, useRef } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { HiOutlineBookmark } from "react-icons/hi2";
import { useAuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import appApi from "../../api/appApi";
import LikesComponent from "../../components/Likes/LikesComponent";

const Home = () => {
  const [dishList, setDishList] = useState([]);
  const [dishAux, setDishAux] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    addOrRemoveFromBookmark,
    bookMark,
    user,
  } = useAuthContext();
  const { loaderRef, page, setPage, hasMore, setHasMore } = useInfiniteScroll(
    (newPage) => setPage(newPage + 1)
  );

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const res = await appApi.get(`/recipes?page=${page}`);
        const resApi = res?.data?.recipes;
        if (page === 1) {
          setDishAux(resApi);
        } else {
          setDishAux((prevRec) => [...prevRec, ...resApi]);
        }
        if (resApi.length === 0 || resApi.length < 10) {
          setHasMore(false);
          return;
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching recipe:", error);
      }
    };
    if(hasMore){
      fetchRecipe();
    }
  }, [page, hasMore, setHasMore]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const books = bookMark?.map((bookMark) => bookMark.id);

        const newDataApi = dishAux.map((data) => {
          const newArrayInBook = books?.find((book) => book === data.id);

          if (newArrayInBook) {
            return { ...data, bookMark: true };
          } else {
            return { ...data, bookMark: false };
          }
        });
        newDataApi.sort((a, b) => new Date(b.date) - new Date(a.date));
        setDishList(user ? newDataApi : dishAux);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [bookMark, dishAux, user]);

  return (
    <main className="flex justify-center px-4 mt-5">
      <section className="max-w-[1200px] md:w-full">
        <div className="my-[5%] mx-0">
          <div className="flex flex-col lg:gap-x-4  md:gap-x-0 lg:gap-y-12 md:gap-y-24 sm:mb-5 justify-center items-center">
            {dishList.map((val) => (
              <div
                className="md:max-w-[550px] md:w-[550px] md:h-[380px] lg:max-w-full lg:w-full lg:h-full gap-4"
                key={val?.id}
              >
                <div className="flex flex-col w-full bg-white border border-solid rounded-xl mb-5 p-5">
                  <h3 className="flex justify-between items-center pl-2 pb-1">
                    <Link
                      className="flex justify-between items-center gap-2 text-l"
                      to={`/${val.User.user_name}`}
                    >
                      <FaRegUserCircle size={20} />
                      <p className="text-sm font-semibold" id="userPost">
                        @{val?.User?.user_name}
                      </p>
                    </Link>
                    <p id="date" className="text-sm md:pr-5 sm:p-0">
                      {new Date(val?.createdAt).toLocaleDateString("es-AR")}
                    </p>
                  </h3>
                  <Link to={`/detail?dishID=${val?.id}`}>
                    <img
                      className="pt-2 w-[500px] md:max-h-[230px] lg:w-full lg:max-h-[400px] object-cover rounded-xl"
                      src={val?.primaryimage}
                      alt=""
                    />
                  </Link>
                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center flex-row">
                      <LikesComponent recipeId={val.id} />
                      <button
                        onClick={addOrRemoveFromBookmark}
                        data-bookmark-id={val?.id}
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
                        <TfiCommentAlt className="cursor-pointer" size={20} />
                      </button>
                    </div>
                  </div>
                  <h3 id="name" className="pb-2">
                    {val?.name}
                  </h3>

                  <div
                    id="comentary"
                    className="border text-justify border-solid rounded-xl p-2 md:h-[full] lg:[full] "
                  >
                    {val?.description?.substring(0, 120)}...
                  </div>
                </div>
              </div>
            ))}
          </div>
          {hasMore && (
            <>
              <div className="mt-12 mb-16 w-full flex justify-center">
                <span className="loader justify-center"></span>
              </div>
              {!loading && <div ref={loaderRef}></div>}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

const useInfiniteScroll = (callback) => {
  const loaderRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && loaderRef.current) {
          if (hasMore) {
            callback(page);
          }
        }
      },
      {
        threshold: 0.9,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [callback]);

  return { loaderRef, page, hasMore, setHasMore, setPage };
};

export default Home;
