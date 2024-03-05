import { Navigate, useParams } from "react-router-dom";
import UserInfoComponent from "../Profile/UserInfo";
import PersonalRecipes from "../Profile/PersonalRecipes";
import { useAuthContext } from "../../context/AuthProvider";

const UsersProfilePage = () => {
  const { userName } = useParams();
  const { logIn } = useAuthContext();

  return (
    <>{
      !logIn ? <Navigate to={"/login"}/> :
      <article className="mt-4 flex flex-col items-center">
        <UserInfoComponent userName={userName} />
        <hr className="my-3" />
        <PersonalRecipes userName={userName} />
        <hr className="my-10" />
      </article>
    }</>
  );
};

export default UsersProfilePage;
