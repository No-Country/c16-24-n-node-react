import { useState, useEffect, useRef } from "react";
import appApi from "../../api/appApi";
import { Link } from "react-router-dom";

const buildApiUri = (userName, page, perPage = 9) => {
  if (userName) {
    return `/users/recipes/${userName}?page=${page}&perPage=${perPage}`;
  } else {
    return `/user/recipes?page=${page}&perPage=${perPage}`;
  }
};

const PersonalRecipes = ({ userName }) => {
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { loaderRef, page, setPage, hasMore, setHasMore,  } = useInfiniteScroll(
    (newPage) => setPage(newPage + 1)
  );

  useEffect(() => {
    if (hasMore) {
      fetchPersonalRecipes();
    }
  }, [page, hasMore]);

  const fetchPersonalRecipes = async () => {
    const apiUri = buildApiUri(userName, page);
    setLoading(true);
    try {
      const { data } = await appApi.get(apiUri);
      if(page === 1){
        setMyRecipes(data.data);
      } else {
        setMyRecipes((prevRec) => [...prevRec, ...data.data]);
      }
      if (data.data.length === 0 || data.data.length < 9) {
        setHasMore(false);
        return;
      }
    } catch (error) {
      setError("An error ocurred loading, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && page === 1 ? (
        <span className="loader" />
      ) : (
        <>
          {myRecipes.length === 0 ? (
            <h3 className="">
              {error ? error : "Nothing to see yet..."}
              {!userName && error && (
                <Link to="/posts" className="text-blue-900 underline">
                  Upload a recipe
                </Link>
              )}
            </h3>
          ) : (
            <div className="flex flex-col">
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-fit">
                {myRecipes.map((recipe) => (
                  <RecipeCardComponent recipe={recipe} key={recipe.id} />
                ))}
              </section>
              {hasMore && (
                <>
                  <div className="mt-12 mb-16 w-full flex justify-center">
                    <span className="loader justify-center"></span>
                  </div>
                  {!loading && <div ref={loaderRef}></div>}
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

const RecipeCardComponent = ({ recipe }) => {
  return (
    <Link
      className="mx-auto relative min-h-auto min-w-36"
      to={`/recipe/${recipe.id}`}
    >
      <div className="absolute w-full h-full rounded-xl hover:bg-slate-900 hover:bg-opacity-35"></div>
      <img
        className="aspect-square w-full object-cover rounded-xl hover:"
        src={recipe.image}
        alt={recipe.name}
      />
      <p className="text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] w-full py-3 px-2 bg-opacity-25 absolute top-0 rounded-t-xl bg-slate-900 text-ellipsis text-nowrap overflow-x-hidden">
        {recipe.name}
      </p>
    </Link>
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
            console.log(page);
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

export default PersonalRecipes;
