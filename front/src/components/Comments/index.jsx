import { useState, useEffect } from "react";
import { BiSolidSend, BiEdit, BiTrash } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import appApi from "../../api/appApi";

// eslint-disable-next-line react/prop-types
const Comments = ({ dishID }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [currentCommentText, setCurrentCommentText] = useState("");
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(0);
  const [editCommentId, setEditCommentId] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

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
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (commentId, commentText, commentRating) => {
    setEditCommentId(commentId);
    setCurrentCommentText(commentText);
    setRating(commentRating);
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

      fetchComments();
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  const handleUpdateComment = async (updatedComment) => {
    try {
      await appApi.patch(`/reviews/${updatedComment.Id}`, {
        description: updatedComment.commentary,
        rating: updatedComment.rating,
      });

      fetchComments();

      setEditCommentId(null);
    } catch (error) {
      console.error("Error al actualizar el comentario:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await appApi.delete(`/reviews/delete?reviewId=${commentId}`);
      setComments(comments.filter((comment) => comment.Id !== commentId));

      fetchComments();
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  return (
    <article>
      <h2 className="text-xl font-semibold m-1">
        Opinions - Assessment: {averageRating}{" "}
      </h2>
      <div className="flex flex-row gap-y-4 text-justify border border-solid rounded-xl p-2 md:h-[full] lg:h-[full]">
        <span className="flex w-content justify-between items-center gap-x-2 text-l">
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
              type="number"
              min="1"
              max="5"
              placeholder="Rating (1-5)"
              className="focus:outline-none w-16 text-center hover:placeholder-gray-600"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            />
            <input
              placeholder="What do you think?"
              className="focus:outline-none min-w-full hover:placeholder-gray-600 pl-2 p-1"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="absolute right-[5px]" type="submit">
              <BiSolidSend className="ml-4" size={20} />
            </button>
          </form>
        </span>
      </div>
      {Array.isArray(comments) && comments.length === 0 ? (
        <div className="text-center mt-4 text-gray-500">
          There are no comments yet.
        </div>
      ) : (
        comments.map((item, index) => (
          <div
            key={index}
            className="block m-auto gap-y-4 text-justify border w-[98%] border-solid rounded-xl p-2 md:h-[full] lg:h-[full]"
          >
            <div className="">
              <div className="flex justify-between items-center pl-2 pb-1">
                <span className="flex items-center gap-2 text-l">
                  <FaRegUserCircle size={20} />
                  <p id="userPost">{item.User.user_name}</p>
                </span>

                <button
                  onClick={() =>
                    handleEdit(item.Id, item.description, item.rating)
                  }
                  className="text-sm text-blue-500"
                  type="button"
                >
                  <BiEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.Id)}
                  className="text-sm text-red-500"
                  type="button"
                >
                  <BiTrash />
                </button>
                <p id="date" className="text-sm pr-5">
                  {new Date(item.createdAt).toLocaleDateString("es-AR")}
                </p>
              </div>
            </div>

            {editCommentId === item.Id ? (
              <form
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
                  className="focus:outline-none min-w-full hover:placeholder-gray-600"
                  value={currentCommentText}
                  onChange={(e) => setCurrentCommentText(e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Rating (1-5)"
                  className="focus:outline-none w-16 text-center hover:placeholder-gray-600"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                />

                <button type="submit">Guardar</button>
              </form>
            ) : (
              <section>
                <div className="flex justify-between items-center gap-y-4 text-justify border border-solid rounded-xl p-2 m-2 md:h-[full] lg:h-[full]">
                  <p>{item.description}</p>
                </div>
                <div className="flex justify-between items-center gap-y-4 text-justify p-2 m-2 md:h-[full] lg:h-[full]">
                  <p>Rating: {item.rating}</p>
                </div>
              </section>
            )}
          </div>
        ))
      )}
    </article>
  );
};

export default Comments;
