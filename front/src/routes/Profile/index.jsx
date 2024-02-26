import { useAuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import appApi from "../../api/appApi";
import { useState, useEffect } from "react";
import userAvatar from "./homero.jpg";
import { SiGooglemaps } from "react-icons/si";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const { logIn, user } = useAuthContext();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await appApi.get("/profile");

        setProfileData(response.data.data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [logIn, navigate]);

  if (!logIn) {
    navigate("/login");
  }

  return (
    <article className="mt-4">
      {profileData && (
        <section className="flex justify-center items-center gap-6 max-md:flex-col">
          <div className=" w-1/4 max-md:w-full">
            <img
              className=" rounded-full w-44 h-44 mx-auto"
              src={profileData?.image? profileData?.image :'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'}
              alt="Profile"
            />
          </div>
          <div className="border-2 border-black rounded-2xl w-3/4  max-md:w-full ">
            <div className="flex m-4 items-center gap-4 font-bold text-xl max-md:flex-col">
              <p>{user}</p>
              <p className="max-md:hidden">-</p>
              <h1>{`
              ${profileData?.first_name?.toUpperCase()? profileData?.first_name?.toUpperCase() : ''} 
              ${profileData.last_name?.toUpperCase()? profileData.last_name?.toUpperCase() : '' }`}</h1>
              <div className="ml-auto max-md:mx-auto text-lg">
                <Link
                  to="/userprofile"
                  className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
            <p className="m-4 max-md:m-6 flex gap-2 items-center">
              <SiGooglemaps />
              {profileData?.country? profileData?.country : 'Republica de Córdoba' }
            </p>

            <p className="border-2 bg-slate-200 m-4 border-black rounded-2xl p-2 overflow-y-auto">
              {profileData?.description? profileData?.description : ''}
            </p>
          </div>
        </section>
      )}

      <hr className="my-10" />
      <section className="grid grid-cols-3 max-md:grid-cols-1 gap-4 p-4">
        <img className="border-2 mx-auto" src={userAvatar} alt="Profile" />
        <img className="border-2 mx-auto" src={userAvatar} alt="Profile" />
        <img className="border-2 mx-auto" src={userAvatar} alt="Profile" />
        <img className="border-2 mx-auto" src={userAvatar} alt="Profile" />
        <img className="border-2 mx-auto" src={userAvatar} alt="Profile" />
        <img className="border-2 mx-auto" src={userAvatar} alt="Profile" />
      </section>
      <hr className="my-10" />
    </article>
  );
};

export default Profile;
