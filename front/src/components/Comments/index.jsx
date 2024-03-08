/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { BiSolidSend, BiEdit, BiTrash } from "react-icons/bi";
import { FaRegUserCircle, FaStar } from "react-icons/fa";
import appApi from "../../api/appApi";
import { useAuthContext } from "../../context/AuthProvider";

// eslint-disable-next-line react/prop-types
const Comments = ({ dishID }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [currentCommentText, setCurrentCommentText] = useState("");
  const [user] = useState(sessionStorage.getItem("user"));
  const [rating, setRating] = useState(0);
  const [editCommentId, setEditCommentId] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const updateBtnRef = useRef(null);

  const fetchComments = async () => {
    try {
      const response = await appApi.get(`/reviews?recipeId=${dishID}`);
      if (response.data && response.data.reviews) {
        setComments(response.data.reviews);

        const totalRating = response.data.reviews.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        const avgRating =
          response.data.reviews.length > 0
            ? totalRating / response.data.reviews.length
            : 0;
        setAverageRating(avgRating.toFixed(1));
      } else {
        console.error(
          "No se encontraron comentarios en la respuesta:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (commentId, commentText, commentRating) => {
    setEditCommentId(commentId);
    setCurrentCommentText(commentText);
    setRating(commentRating);
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setCurrentCommentText("");
    setRating("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await appApi.post(`/reviews?recipeId=${dishID}`, {
        description: commentText,
        rating: rating,
      });
      const newComment = {
        Id: response.data.Id,
        commentary: response.data.description,
        User: {
          user_name: user,
        },
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentText("");
      setRating(0);

      await fetchComments();
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  const handleUpdateAway = () => {
    if (updateBtnRef.current) {
      updateBtnRef.current.click();
    }
  };

  const handleUpdateComment = async (updatedComment) => {
    try {
      await appApi.patch(`/reviews/${updatedComment.Id}`, {
        description: updatedComment.commentary,
        rating: updatedComment.rating,
      });

      await fetchComments();

      handleCancelEdit();
    } catch (error) {
      console.error("Error al actualizar el comentario:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await appApi.delete(`/reviews/delete?reviewId=${commentId}`);
      setComments(comments.filter((comment) => comment.Id !== commentId));

      await fetchComments();
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  return (
    <article id="comments" className="w-full">
      <h2 className="text-xl font-semibold m-1">
        <p>{`Reviews: (${comments.length})`}</p>
        <RatingComponent ratingValue={averageRating} />
      </h2>
      {!comments.find((rev) => rev.User.user_name == user) && (
        <div className="flex flex-col gap-y-4 text-justify border border-solid rounded-xl p-2 md:h-[full] lg:h-[full]">
          <span className="flex w-content justify-start items-center gap-x-2 text-l">
            <FaRegUserCircle size={20} />
            <p className="text-sm font-semibold mr-1" id="userPost">
              {user}
            </p>
          </span>
          <span className="w-full">
            <form
              onSubmit={handleSubmit}
              className="flex justify-between items-center relative"
            >
              <input
                type="hidden"
                required
                min="1"
                max="5"
                placeholder="Rating (1-5)"
                className="focus:outline-none w-16 text-center hover:placeholder-gray-600"
                value={rating}
              />
              <input
                placeholder="What do you think?"
                required
                className="flex-1 focus:outline-none border-b hover:placeholder-gray-600 pl-2 p-1"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <RatingSelector
                defaultValue={0}
                onChange={(val) => setRating(val)}
              />
              <button className="pl-2" type="submit">
                <BiSolidSend size={20} />
              </button>
            </form>
          </span>
        </div>
      )}
      {Array.isArray(comments) && comments.length === 0 ? (
        <div className="text-center mt-4 text-gray-500">
          There are no comments yet.
        </div>
      ) : (
        comments.map((item, index) => (
          <div
            key={index}
            className="block mt-2 m-auto gap-y-4 text-justify border w-[98%] border-solid rounded-xl p-2 md:h-[full] lg:h-[full]"
          >
            <div className="flex justify-between items-center pl-2 pb-1 border-b">
              <div id="review-user-info" className="flex flex-row items-center">
                <span className="flex items-center text-l pr-2">
                  <FaRegUserCircle size={20} />
                  <span id="UserPost">@{item.User.user_name}</span>
                </span>
                {!editCommentId && (
                  <p id="date" className="text-sm pr-5 text-slate-600">
                    {new Date(item.createdAt).toLocaleDateString("es-AR")}
                  </p>
                )}
              </div>
              <ReviewActions
                userName={item.User.user_name}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleCancelEdit={handleCancelEdit}
                handleUpdate={handleUpdateAway}
                item={item}
                isEdit={!!editCommentId}
              />
            </div>

            {editCommentId === item.Id ? (
              <form
                className="flex justify-between items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateComment({
                    ...item,
                    commentary: currentCommentText,
                    rating: rating,
                  });
                }}
              >
                <input
                  placeholder="Editar comentario"
                  className="focus:outline-none flex-1 hover:placeholder-gray-600 border-b p-2"
                  value={currentCommentText}
                  onChange={(e) => setCurrentCommentText(e.target.value)}
                />
                <input
                  type="hidden"
                  min="1"
                  max="5"
                  placeholder="Rating (1-5)"
                  className="focus:outline-none w-16 text-center hover:placeholder-gray-600"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                />
                <RatingSelector
                  defaultValue={rating}
                  onChange={(val) => setRating(val)}
                />
                <button ref={updateBtnRef} type="submit"></button>
              </form>
            ) : (
              <section>
                <div className="flex justify-between items-center text-justify  p-2 md:h-[full] lg:h-[full]">
                  <p>{item.description}</p>
                </div>
                <div className="flex justify-end md:h-[full] lg:h-[full]">
                  <RatingComponent ratingValue={item.rating} />
                </div>
              </section>
            )}
          </div>
        ))
      )}
    </article>
  );
};

const RatingSelector = ({ defaultValue = 0, onChange }) => {
  const [rating, setRating] = useState(defaultValue);

  const handleStarClick = (value) => {
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-row">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span key={starValue} onClick={() => handleStarClick(starValue)}>
            {
              <FaStar
                className={` ${
                  starValue <= rating ? "fill-yellow-400" : "fill-slate-600"
                }`}
              />
            }
          </span>
        );
      })}
    </div>
  );
};

const RatingComponent = ({ ratingValue }) => {
  const ratingIntValue = Math.round(ratingValue);
  return (
    <div className="flex items-baseline">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={`ro-${starValue}`}
            className={` ${
              starValue <= ratingIntValue ? "fill-yellow-400" : "fill-slate-600"
            }`}
          />
        );
      })}

      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        {ratingValue}
      </p>
      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        out of
      </p>
      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        5
      </p>
    </div>
  );
};

const ReviewActions = ({
  userName,
  handleEdit,
  handleCancelEdit,
  handleDelete,
  handleUpdate,
  item,
  isEdit,
}) => {
  const { user } = useAuthContext();
  return (
    <div id="review-actions" className="flex flex-row gap-x-3">
      {userName === user.slice(1) && (
        <>
          {isEdit && (
            <>
              <button
                onClick={() => handleCancelEdit()}
                className="text-sm text-red-700 font-bold"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate()}
                className="text-sm text-blue-500 font-bold"
                type="button"
              >
                Save
              </button>
            </>
          )}
          {!isEdit && (
            <>
              <button
                onClick={() =>
                  handleEdit(item.Id, item.description, item.rating)
                }
                className="text-sm text-blue-500"
                type="button"
              >
                <BiEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(item.Id)}
                className="text-sm text-red-500"
                type="button"
              >
                <BiTrash size={20} />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Comments;
