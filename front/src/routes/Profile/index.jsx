import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import countriesData from "./country.json";
import userAvatar from "./homero.jpg";
import Swal from "sweetalert2";
import { useAuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import UpdateUserName from "./ChangeUser";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import PhotoUpdater from "./ChangeImage";

const Profile = () => {
  const [editEnabled, setEditEnabled] = useState(false);
  const { auth, logIn } = useAuthContext();
  const token = sessionStorage.getItem("token");
  const API = "https://c16-24-n-node-react.vercel.app/api/profile";
  let navigate = useNavigate();

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    description: "",
    country: "",
    mobilenumber: "",
  });

  const userCountry = userData.country
    ? countriesData.countries.find(
        (country) => country.name === userData.country
      )
    : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(API, {
          headers: {
            Authorization: `${token}`,
          },
        });

        setUserData(userResponse.data.data);
      } catch (error) {
        console.error("Error al traer datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleCountryChange = (selectedOption) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      country: selectedOption.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (userData.first_name.length < 2 || userData.first_name.length > 12) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "The name must be between 2 and 12 characters",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    if (userData.last_name.length < 2 || userData.last_name.length > 12) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "The last name must be between 2 and 12 characters",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    if (userData.mobilenumber.length < 9 || userData.mobilenumber.length > 12) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "The phone number must be between 9 and 12 characters",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    try {
      const response = await axios.patch(API, userData, {
        headers: {
          Authorization: token,
        },
      });
      console.log("Data actualizada:", response.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data has been updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      setEditEnabled(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Data has not been updated correctly",
        timer: 2000,
        showConfirmButton: false,
      });
      console.error("Error al subir datos:", error);
    }
  };
  const handleEnableEdit = () => {
    setEditEnabled(true);
  };
  if (!logIn) {
    navigate("/login");
  }

  return (
    <article>
      <section className="flex flex-row-reverse justify-center gap-20 items-center h-40">
        <h1 className="text-4xl">User profile</h1>
        <img
          src={userAvatar}
          alt="Foto de perfil"
          className="rounded-full w-24 h-24 border-blue-500 border-2"
        />
      </section>
      <hr className="text-7xl" />
      <div className="mx-auto max-w-md mt-14">
        <h1 className="mb-6 text-center text-2xl">Edit Profile</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block">
              First Name:
              <input
                type="text"
                name="first_name"
                value={userData.first_name}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 ${
                  editEnabled ? "" : "pointer-events-none bg-gray-100"
                }`}
                disabled={!editEnabled}
              />
            </label>
          </div>
          <div>
            <label className="block">
              Last Name:
              <input
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 ${
                  editEnabled ? "" : "pointer-events-none bg-gray-100"
                }`}
                disabled={!editEnabled}
              />
            </label>
          </div>
          <div>
            <label className="block">
              Description:
              <textarea
                type="text"
                name="description"
                value={userData.description}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 focus:h-16 transition-all duration-300 ${
                  editEnabled ? "" : "pointer-events-none bg-gray-100"
                }`}
                disabled={!editEnabled}
              />
            </label>
          </div>
          <div>
            <label className="block">
              Country:
              <Select
                placeholder="Select country"
                value={
                  userCountry
                    ? {
                        value: userCountry.name,
                        label: userCountry.es_name,
                      }
                    : null
                }
                options={countriesData.countries.map((country) => ({
                  value: country.name,
                  label: country.es_name,
                }))}
                onChange={handleCountryChange}
                className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 ${
                  editEnabled ? "" : "pointer-events-none bg-gray-100"
                }`}
                disabled={!editEnabled}
              />
            </label>
          </div>
          <div>
            <label className="block">
              Mobile Number:
              <input
                type="text"
                name="mobilenumber"
                value={userData.mobilenumber}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 ${
                  editEnabled ? "" : "pointer-events-none bg-gray-100"
                }`}
                disabled={!editEnabled}
              />
            </label>
          </div>

          <div className="text-center">
            {!editEnabled && (
              <button
                type="button"
                onClick={handleEnableEdit}
                className="w-3/6 bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                Enable Edit
              </button>
            )}
            {editEnabled && (
              <div>
                <button
                  type="submit"
                  className="w-3/6 bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      <hr className="my-10" />

      <section>
        <PhotoUpdater />
      </section>

      <hr className="my-10" />

      <section>
        <ChangePassword />
      </section>

      <hr className="my-10" />

      <section>
        <ChangeEmail />
      </section>

      <hr className="my-10" />
      <section>
        <UpdateUserName />
      </section>
      <hr className="my-10" />
    </article>
  );
};

export default Profile;
