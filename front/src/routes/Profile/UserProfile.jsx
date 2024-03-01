import { useState, useEffect } from "react";
import Select from "react-select";
import countriesData from "./country.json";
import Swal from "sweetalert2";
import { useAuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import UpdateUserName from "./ChangeUser";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import PhotoUpdater from "./ChangeImage";
import appApi from "../../api/appApi";
import DeleteUser from "./DeleteUser";
import { TbFileDescription } from "react-icons/tb";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiRename } from "react-icons/bi";
import { FaMobileAlt } from "react-icons/fa";

const UserProfile = () => {
  const [editEnabled, setEditEnabled] = useState(false);
  const { logIn } = useAuthContext();
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
        const userResponse = await appApi.get("/profile");

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

    if (
      !userData.first_name ||
      userData.first_name.length < 2 ||
      userData.first_name.length > 12
    ) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "The name must be between 2 and 12 characters",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    if (
      !userData.last_name ||
      userData.last_name.length < 2 ||
      userData.last_name.length > 12
    ) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "The last name must be between 2 and 12 characters",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    if (
      !userData.mobilenumber ||
      userData.mobilenumber.length < 9 ||
      userData.mobilenumber.length > 12
    ) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "The phone number must be between 9 and 12 characters",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    if (
      !userData.description ||
      userData.description.length < 2 ||
      userData.description.length > 256
    ) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please enter between 2 and 256 characters in description!",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    if (!userData.country) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please select a country",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    const confirmResult = await Swal.fire({
      icon: "question",
      title: "Are you sure you want to update?",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (!confirmResult.isConfirmed) {
      return;
    }
    try {
      const response = await appApi.patch("/profile", userData);
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
        <h1 className="text-5xl">Edit profile</h1>
        <img
          src={
            userData?.image
              ? userData?.image
              : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          }
          alt="Foto de perfil"
          className="rounded-full w-32 h-32 border-blue-500 border-2"
        />
      </section>
      <hr className="my-5" />
      <div className="mx-auto max-w-md mt-10">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block">
              First Name:
              <div className="flex items-center gap-2">
                <BiRename className="text-3xl" />
                <input
                  type="text"
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleInputChange}
                  className={`p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 ${
                    editEnabled ? "" : "pointer-events-none bg-gray-100"
                  }`}
                  disabled={!editEnabled}
                />
              </div>
            </label>
          </div>
          <div>
            <label className="block">
              Last Name:
              <div className="flex items-center gap-2">
                <BiRename className="text-3xl" />
                <input
                  type="text"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleInputChange}
                  className={`p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 ${
                    editEnabled ? "" : "pointer-events-none bg-gray-100"
                  }`}
                  disabled={!editEnabled}
                />
              </div>
            </label>
          </div>
          <div>
            <label className="block">
              Description:
              <div className="flex items-center gap-2">
                <TbFileDescription className="text-3xl" />
                <textarea
                  type="text"
                  name="description"
                  value={userData.description}
                  onChange={handleInputChange}
                  className={`p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 focus:h-28 transition-all duration-300 ${
                    editEnabled ? "" : "pointer-events-none bg-gray-100"
                  }`}
                  disabled={!editEnabled}
                />
              </div>
            </label>
          </div>
          <div>
            <label className="block">
              Country:
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-2xl ml-1" />
                <Select
                  placeholder="Select country"
                  value={
                    userCountry
                      ? {
                          value: userCountry.name,
                          label: userCountry.name,
                        }
                      : null
                  }
                  options={countriesData.countries.map((country) => ({
                    value: country.name,
                    label: country.name,
                  }))}
                  onChange={handleCountryChange}
                  className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 ${
                    editEnabled ? "" : "pointer-events-none bg-gray-100"
                  }`}
                  disabled={!editEnabled}
                />
              </div>
            </label>
          </div>
          <div>
            <label className="block">
              Mobile Number:
              <div className="flex items-center gap-3">
                <FaMobileAlt className="text-2xl ml-1" />
                <input
                  type="text"
                  name="mobilenumber"
                  value={userData.mobilenumber}
                  onChange={handleInputChange}
                  className={`p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-9 ${
                    editEnabled ? "" : "pointer-events-none bg-gray-100"
                  }`}
                  disabled={!editEnabled}
                />
              </div>
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
      <DeleteUser />
      <hr className="my-10" />
    </article>
  );
};

export default UserProfile;
