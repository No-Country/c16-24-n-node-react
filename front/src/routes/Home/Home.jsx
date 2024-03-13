import { useState, useEffect, useRef } from "react";
import appApi from "../../api/appApi";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import RecipeCardComponent from "../../components/RecipeCard/RecipeCardComponent";

const Home = () => {
  const [dishList, setDishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const { page, setPage, hasMore, setHasMore } = useInfiniteScroll(
    scrollRef,
    (newPage) => setPage(newPage + 1)
  );

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await appApi.get(`/recipes?page=${page}`);
        const resApi = res?.data?.recipes;
        if (page === 1) {
          setDishList(resApi);
        } else {
          setDishList((prevRec) => [...prevRec, ...resApi]);
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
    if (hasMore) {
      fetchRecipe();
    }
  }, [page, hasMore]);

  return (
    <main className="flex justify-center px-4">
      <section className="max-w-[1200px] md:w-full">
        <div className="my-[5%] mx-0">
          <div className="flex flex-col lg:gap-x-4  md:gap-x-0 lg:gap-y-1 md:gap-y-1 sm:mb-5 justify-center items-center">
            {dishList.map((val) => (
              <RecipeCardComponent key={val.id} recipeInfo={val} />
            ))}
          </div>
          {hasMore && (
            <>
              {!loading && <div ref={scrollRef}></div>}
              <div className="mt-12 mb-16 w-full flex justify-center">
                <span className="loader justify-center"></span>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
