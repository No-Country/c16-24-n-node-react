import { useEffect, useState } from "react";
import appApi from "../../api/appApi";
import { useAuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { SiGooglemaps } from "react-icons/si";
import { MdEdit } from "react-icons/md";
import { LuUser2 } from "react-icons/lu";

const UserInfoComponent = ({ userName }) => {
  const { logIn, user } = useAuthContext();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    const apiUri = !!userName ? `/users/${userName}` : "/profile";
    try {
      const { data: resData } = await appApi.get(apiUri);
      const profileData = resData?.data || resData?.user;
      setProfileData(profileData);
    } catch (error) {
      setError("The link you selected may not work or the page may have been removed.");
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
                  <p className="text-blue-500">
                    {userName ? `@${profileData.user_name}` : user}
                  </p>
                  <p className="max-md:hidden">-</p>
                  <p className="text-nowrap text-clip overflow-hidden">
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
                {logIn && !userName && (
                  <Link
                    to="/userprofile"
                    title="Edit profile"
                    type="button"
                    className="max-sm:absolute right-0 top-0 p-1 sm:p-3 rounded-full hover:bg-slate-300 focus:outline-none"
                  >
                    <MdEdit />
                  </Link>
                )}
              </div>
            </div>
            {/* descripcion */}
            <div>
              <p className=" bg-slate-200 m-4 rounded-2xl px-4 py-2 overflow-y-auto">
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
