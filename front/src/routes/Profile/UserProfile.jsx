import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import { TbFileDescription } from "react-icons/tb";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiRename } from "react-icons/bi";
import { FaMobileAlt } from "react-icons/fa";
import countriesData from "./country.json";
import UpdateUserName from "./ChangeUser";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import PhotoUpdater from "./ChangeImage";
import DeleteUser from "./DeleteUser";
import appApi from "../../api/appApi";
import Select from "react-select";
import Swal from "sweetalert2";

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
   <>
    {!logIn && <Navigate to="/login" />}
    <article>
      <section className="flex flex-row-reverse justify-center sm:gap-x-20 xs:gap-x-5 items-center">
        <h2 className="md:text-5xl sm:text-4xl xs:text-3xl">Edit profile</h2>
        <img
          src={
            userData?.image
              ? userData?.image
              : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          }
          alt="Foto de perfil"
          className="rounded-full w-32 h-32 border-gray-500 border-2"
        />
      </section>
      <hr className="my-5" />
      <div className="mx-auto max-w-md mt-10">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="sm:flex xs:block justify-between items-center gap-x-2">
            <div className="sm:flex xs:block relative sm:w-[50%] xs:w-[100%] xs:mb-4">
              <div className="flex justify-center items-between gap-2">
                <BiRename className="mt-2 text-gray-500" size={30} />
                <input
                  type="text"
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleInputChange}
                  className={`p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300  focus:ring-gray-200 focus:ring-opacity-50 h-10 ${
                    editEnabled ? "" : "pointer-events-none bg-gray-50"
                  }`}
                  disabled={!editEnabled}
                />
                <label
                  className="absolute top-[-10px] text-gray-500 font-bold px-2 sm:left-[55px] xs:left-[calc(50%-49px)] bg-white rounded-xxl"
                  htmlFor="FistName"
                >
                  First Name:
                </label>
              </div>
            </div>
            <div className="sm:flex xs:block relative sm:w-[50%] xs:w-[100%] xs:mb-4">
              <div className="flex justify-center items-between gap-2">
                <BiRename className="mt-2 text-gray-500" size={30} />
                <input
                  type="text"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleInputChange}
                  className={`p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300  focus:ring-gray-200 focus:ring-opacity-50 h-10 ${
                    editEnabled ? "" : "pointer-events-none bg-gray-50"
                  }`}
                  disabled={!editEnabled}
                />
                <label
                  className="absolute top-[-10px] text-gray-500 font-bold px-2 sm:left-[55px] xs:left-[calc(50%-48px)] bg-white rounded-xxl"
                  htmlFor="LastName"
                >
                  Last Name:
                </label>
              </div>
            </div>
          </div>
          <div className="sm:flex xs:block justify-between items-center gap-x-2">
            <div className="flex relative sm:w-[50%] xs:mb-4">
              <FaMapMarkerAlt className="mt-2 text-gray-500" size={30} />
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
                className={`ml-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300  focus:ring-gray-200 focus:ring-opacity-50 h-10  ${
                  editEnabled ? "" : "pointer-events-none bg-gray-50"
                }`}
                disabled={!editEnabled}
              />
              <label
                className="absolute top-[-10px] text-gray-500 font-bold px-2 sm:left-[55px] xs:left-[calc(50%-40px)] bg-white rounded-xxl"
                htmlFor="Country"
              >
                Country:
              </label>
            </div>
            <div className="sm:flex xs:block relative sm:w-[51%] gap-x-2">
              <div className="flex justify-center items-between gap-2">
                <FaMobileAlt className="mt-2 text-gray-500" size={30} />
                <input
                  type="text"
                  name="mobilenumber"
                  value={userData.mobilenumber}
                  onChange={handleInputChange}
                  className={`p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300  focus:ring-gray-200 focus:ring-opacity-50 h-10 ${
                    editEnabled ? "" : "pointer-events-none bg-gray-50"
                  }`}
                  disabled={!editEnabled}
                />
                <label
                  className="absolute top-[-10px] text-gray-500 font-bold px-2 sm:left-[55px] xs:left-[50%-65px] bg-white rounded-xxl"
                  htmlFor="MobileMumber"
                >
                  Mobile Number:
                </label>
              </div>
            </div>
          </div>
          <div className="flex relative">
            <div className="flex items-center gap-x-2 w-full">
              <TbFileDescription className="mt-2 text-gray-500" size={30} />
              <textarea
                type="text"
                name="description"
                value={userData.description}
                onChange={handleInputChange}
                className={`p-2 mt-1 w-full rounded-md border text-gray-500 border-gray-500 shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 h-full resize-none ${
                  editEnabled ? "" : "pointer-events-none bg-gray-50"
                }`}
                disabled={!editEnabled}
              />
              <label
                className="absolute top-[-10px] text-gray-500 font-bold px-2 left-[calc(50%-52px)] bg-white rounded-xxl "
                htmlFor="Description"
              >
                Description:
              </label>
            </div>
          </div>
          <div className="text-end">
            {!editEnabled && (
              <button
                type="button"
                onClick={handleEnableEdit}
                className="w-3/6 bg-gray-500 text-white mt-4 py-2 px-4 rounded-xl hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50"
              >
                Enable Edit
              </button>
            )}
            {editEnabled && (
              <div>
                <button
                  type="submit"
                  className="w-3/6 bg-blue-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50 "
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      <hr className="my-5" />

      <section>
        <ChangePassword />
      </section>

      <hr className="my-5" />

      <section>
        <ChangeEmail />
      </section>

      <hr className="my-5" />
      <section>
        <UpdateUserName />
      </section>
      <hr className="my-5" />

      <section>
        <PhotoUpdater />
      </section>
      <hr className="my-5" />
      <DeleteUser />
      <hr className="my-5" />
    </article>
   </>
  );
};

export default UserProfile;
