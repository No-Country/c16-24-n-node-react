import { Navigate } from "react-router-dom";
import PersonalRecipes from "./PersonalRecipes";
import UserInfoComponent from "./UserInfo";
import { useAuthContext } from "../../context/AuthProvider";

const Profile = () => {
  const { logIn, user } = useAuthContext();

  return (
    <>
      {!logIn ? (
        <Navigate to={"/login"} />
      ) : (
        <article className="mt-4 flex flex-col items-center">
          <UserInfoComponent userName={user.substring(1)} />
          <hr className="my-3" />
          <PersonalRecipes />
          <hr className="my-10" />
        </article>
      )}
    </>
  );
};

export default Profile;
