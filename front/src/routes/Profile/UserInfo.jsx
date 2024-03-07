import { useEffect, useState } from "react";
import appApi from "../../api/appApi";
import { useAuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { SiGooglemaps } from "react-icons/si";
import { MdEdit } from "react-icons/md";
import { LuUser2 } from "react-icons/lu";
import LoadingSpinner from "../../components/Spinner";
import { LiaCookieBiteSolid, LiaCookieSolid } from "react-icons/lia";

const UserInfoComponent = ({ userName }) => {
  const { logIn, user } = useAuthContext();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    try {
      const { data: resData } = await appApi.get(`/users/${userName}`);
      setProfileData(resData?.data);
    } catch (error) {
      console.log(error)
      setError(
        "The link you selected may not work or the page may have been removed."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonUserInfoLoader />
      ) : !profileData ? (
        <p>{error}</p>
      ) : (
        <section className="flex relative justify-center items-center md:gap-6 flex-col md:flex-row">
          <div className="hidden md:flex">
            <ProfileImageComponent profileImage={profileData.image} />
          </div>

          <div className="rounded-2xl w-11/12  max-md:w-full relative sm:border-2">
            {/* imagen, info y edit*/}
            <div className="flex flex-row justify-between">
              {/* imagen */}
              <div className="md:hidden">
                <ProfileImageComponent profileImage={profileData.image} />
              </div>
              {/* info */}
              <div className="flex flex-col justify-center">
                <div className="flex mx-3 my-1 md:m-4 items-center md:gap-4 font-bold sm:text-xl max-md:flex-col">
                  <p className="text-blue-500">{`@${profileData.user_name}`}</p>
                  <p className="max-md:hidden">-</p>
                  <p className="text-clip overflow-hidden text-end">
                    {`${profileData?.first_name || ""} ${
                      profileData?.last_name || ""
                    }`.toUpperCase()}
                  </p>
                </div>
                {profileData?.country && (
                  <p className="m-1 md:m-4 flex gap-2 items-center justify-center md:justify-start">
                    <SiGooglemaps />
                    {profileData?.country}
                  </p>
                )}
              </div>
              {/* edit */}
              <div>
                {logIn && `@${userName}` === user && (
                  <Link
                    to="/userprofile"
                    title="Edit profile"
                    type="button"
                    className="max-sm:absolute right-0 -top-3 p-1 sm:p-3 rounded-full hover:bg-slate-300 focus:outline-none"
                  >
                    <MdEdit />
                  </Link>
                )}
              </div>
            </div>
            {/* descripcion */}
            <div>
              <FollowsUserComponent
                profileUName={profileData?.user_name}
                profileUserId={profileData?.id}
                recipesCount={profileData.recipesCount}
              />
              <p className="max-sm:text-sm bg-slate-200 m-2 rounded-2xl px-4 py-2 overflow-y-auto">
                {profileData?.description ? profileData?.description : ""}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const ProfileImageComponent = ({ profileImage }) => {
  return (
    <>
      {!!profileImage ? (
        <img
          className="rounded-full w-44 h-auto border-2 m-2 min-w-[77px]"
          src={profileImage}
          alt="Profile"
        />
      ) : (
        <LuUser2 className="text-slate-300 w-[30vw] max-w-44 rounded-full h-auto border-2 m-2 min-w-[77px]" />
      )}
    </>
  );
};

export const FollowsUserComponent = ({
  profileUName,
  profileUserId,
  recipesCount,
}) => {
  const { user, logIn } = useAuthContext();
  const isOtherUser = `@${profileUName}` != user && logIn;
  const [isFollowing, setIsFollowing] = useState(false);
  const [followInfo, setFollowInfo] = useState({
    seguidores: "-",
    seguidos: "-",
  });

  const getFollowInfo = async () => {
    try {
      const followInfoResponse = await appApi.get(
        `/users/follows/${profileUserId}`
      );
      setFollowInfo(followInfoResponse.data);
    } catch (error) {}
  };

  useEffect(() => {
    getFollowInfo();
  }, [isFollowing]);

  return (
    <div className={`grid grid-cols-2 ${isOtherUser ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-x-10 gap-y-2 w-full px-5 justify-center items-center max-sm:text-sm`}>
      { isOtherUser && (
        <FollowBtnComponent
          toFollowId={profileUserId}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
        />
      )}
      {recipesCount && <span className="cursor-default text-center">{`${recipesCount} recipes`}</span>}
      <span className="cursor-pointer text-center">{`${followInfo.seguidores} follower(s)`}</span>
      <span className="cursor-pointer text-center">{`${followInfo.seguidos} follow(s)`}</span>
    </div>
  );
};

const FollowBtnComponent = ({ toFollowId, isFollowing, setIsFollowing }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIsFollow = async () => {
    try {
      const resp = await appApi.get(`/users/following/${toFollowId}`);
      setIsFollowing(resp.data?.ok);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleIsFollow();
  }, []);

  const handleActions = async () => {
    try {
      setIsLoading(true);
      isFollowing
        ? await appApi.delete(`/users/unfollow/${toFollowId}`)
        : await appApi.post("/users/follow", { to_follow_id: toFollowId });
      setIsFollowing((val) => !val);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="px-2 py-2 rounded-md bg-slate-500 text-slate-100 font-bold flex justify-center"
      disabled={isLoading}
      onClick={handleActions}
    >
      {
        isLoading ? <LoadingSpinner className={"w-4 h-4"}/> :
        <span className="flex items-center">
          {isFollowing ? <><LiaCookieBiteSolid size={20}/> Unfollow</>: <><LiaCookieSolid size={20}/> Follow</>}
        </span>
      }
    </button>
  );
};

const SkeletonUserInfoLoader = () => {
  return (
    <div
      role="status"
      className="flex flex-row w-4/12 animate-pulse max-md:flex-col gap-6"
    >
      <div className="flex items-center">
        <svg
          className="w-20 h-20 me-3 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
      </div>
      <div className="w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 max-w-xs mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default UserInfoComponent;
