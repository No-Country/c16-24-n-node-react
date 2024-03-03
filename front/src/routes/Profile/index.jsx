import { Navigate } from "react-router-dom";
import PersonalRecipes from "./PersonalRecipes";
import UserInfoComponent from "./UserInfo";
import { useAuthContext } from "../../context/AuthProvider";

const Profile = () => {
  const { logIn } = useAuthContext();

  return (
    <>
      {!logIn ? (
        <Navigate to={"/login"} />
      ) : (
        <article className="mt-4 flex flex-col items-center">
          <UserInfoComponent />
          <hr className="my-3" />
          <PersonalRecipes />
          <hr className="my-10" />
        </article>
      )}
    </>
  );
};

export default Profile;
