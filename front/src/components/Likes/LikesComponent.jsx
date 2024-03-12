import { useEffect, useState } from "react";
import appApi from "../../api/appApi";
import { useAuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { CiPizza } from "react-icons/ci";
import { GiFullPizza } from "react-icons/gi";
import LoadingSpinner from "../Spinner";

const buildLikesUri = (isLogIn, recipeId) => {
  if (isLogIn) {
    return `/recipe/${recipeId}/likes_pr`;
  }
  return `/recipe/${recipeId}/likes`;
};

const LikesComponent = ({ recipeId, callbackToLikesComp }) => {
  const { logIn } = useAuthContext();
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(true);
  const getLikes = async () => {
    try {
      const res = await appApi(buildLikesUri(logIn, recipeId));
      setLikes(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <>
      <LikeButton
        recipeId={recipeId}
        isLiked={likes.liked}
        setLikes={setLikes}
        loading={loading}
        setLoading={setLoading}
        afterCallback={callbackToLikesComp}
      />
      <LikesCountComponent likesCount={likes.likes} />
    </>
  );
};

const LikeButton = ({
  recipeId,
  isLiked,
  setLikes,
  loading,
  setLoading,
  afterCallback,
}) => {
  const { logIn } = useAuthContext();
  const navigate = useNavigate();

  const newLikesVal = (isCreated, prevValue) => {
    return {
      likes: !!isCreated ? prevValue + 1 : prevValue - 1,
      liked: !!isCreated,
    };
  };
  const postLike = async () => {
    setLoading(true);
    try {
      if (logIn) {
        const res = await appApi.post(`/recipe/${recipeId}/like`);
        setLikes((prev) => newLikesVal(res.data.created, prev.likes));
        if (afterCallback) {
          afterCallback(recipeId);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (!logIn) {
      navigate("/login");
      return;
    }
    postLike();
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner className="w-[20px] h-[20px]" />
      ) : (
        <button disabled={loading} onClick={handleClick}>
          {!!isLiked && logIn ? (
            <CiPizza
              className="cursor-pointer fill-red-700 text-red-700"
              size={20}
            />
          ) : (
            <GiFullPizza className="cursor-pointer" size={20} />
          )}
        </button>
      )}
    </>
  );
};

const LikesCountComponent = ({ likesCount }) => {
  return <span className="pl-1">{likesCount}</span>;
};

export default LikesComponent;
