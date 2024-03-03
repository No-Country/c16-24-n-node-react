import { useAuthContext } from "../../context/AuthProvider";
import {
  Navigate,
  useParams,
} from "react-router-dom";
import UserInfoComponent from "../Profile/UserInfo";
import PersonalRecipes from "../Profile/PersonalRecipes";

const UsersProfilePage = () => {
  const { userName } = useParams();
  const { user } = useAuthContext();

  return (
    <>
      {`@${userName}` == user ? (
        <Navigate to={"/profile"} />
      ) : (
        <article className="mt-4 flex flex-col items-center">
          <UserInfoComponent userName={userName} />
          <hr className="my-3" />
          <PersonalRecipes userName={userName} />
          <hr className="my-10" />
        </article>
      )}
    </>
  );
};

export default UsersProfilePage;
