import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { LuPencilLine } from "react-icons/lu";
import { FaRegSave } from "react-icons/fa";
import countriesData from "./country.json";
import userAvatar from "./homero.jpg";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    description: "",
    country: "",
    mobilenumber: "",
  });
  const token = sessionStorage.getItem("token");

  const profileApiUrl = "https://c16-24-n-node-react.vercel.app/api/profile";

  useEffect(() => {
    axios
      .get(profileApiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedProfileData = response.data;
        setProfileData(fetchedProfileData);
        setFormData(fetchedProfileData);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleSaveClick = () => {
    axios
      .post(profileApiUrl, formData)
      .then((response) => {
        const updatedProfileData = response.data;
        setProfileData(updatedProfileData);
        setEditingField(null);
      })
      .catch((error) => {
        console.error("Error updating profile data:", error);
      });
  };

  return (
    <main className="flex flex-col">
      <section className="flex flex-row-reverse justify-evenly items-center border-black border-2 h-40">
        <h1 className="text-4xl">Perfil de usuario</h1>
        <img
          src={userAvatar}
          alt="Foto de perfil"
          className="rounded-full w-24 h-24 border-yellow-200 border-2"
        />
      </section>
      <section className="flex flex-col items-center mt-32">
        <div className="flex flex-col mb-8 w-full">
          <label className="block mb-1 text-start" htmlFor="first_name">
            Name:
          </label>
          <div className="flex items-center">
            <input
              className={`border border-gray-300 px-2 py-1 mr-2 w-2/5${
                editingField === "first_name" ? "bg-gray-100 w-2/5" : ""
              }`}
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              disabled={editingField !== "first_name"}
            />
            {editingField === "first_name" ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                onClick={handleSaveClick}
              >
                <FaRegSave />
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                onClick={() => handleEditClick("first_name")}
              >
                <LuPencilLine />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-8 w-full">
          <label className="block mb-1 text-start" htmlFor="last_name">
            Last Name:
          </label>
          <div className="flex items-center">
            <input
              className={`border border-gray-300 px-2 py-1 mr-2 w-2/5${
                editingField === "last_name" ? "bg-gray-100 w-2/5" : ""
              }`}
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              disabled={editingField !== "last_name"}
            />
            {editingField === "last_name" ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                onClick={handleSaveClick}
              >
                <FaRegSave />
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                onClick={() => handleEditClick("last_name")}
              >
                <LuPencilLine />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-8 w-full">
          <label className="block mb-1 text-start" htmlFor="description">
            Description:
          </label>
          <div className="flex items-center">
            {editingField === "description" ? (
              <textarea
                className="border border-gray-300 px-2 py-1 mr-2 w-2/5"
                id="description"
                name="description"
                rows="6"
                value={formData.description}
                onChange={handleInputChange}
              />
            ) : (
              <span className="mr-2 w-2/5">{formData.description}</span>
            )}
            {editingField === "description" ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                onClick={handleSaveClick}
              >
                <FaRegSave />
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                onClick={() => handleEditClick("description")}
              >
                <LuPencilLine />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-8 w-full">
          <label className="block mb-1 text-start" htmlFor="country">
            Country:
          </label>
          <div className="flex items-center">
            {editingField === "country" ? (
              <Select
                className="w-2/5 "
                options={countriesData.countries.map((country) => ({
                  value: country.name,
                  label: country.es_name,
                }))}
                value={countriesData.countries.find(
                  (option) => option.value === formData.country
                )}
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    country: selectedOption.value,
                  })
                }
              />
            ) : (
              <input
                className={`border border-gray-300 px-2 py-1 mr-2 w-2/5 ${
                  editingField === "country" ? "bg-gray-100" : ""
                }`}
                type="text"
                id="country"
                value={profileData ? profileData.country : ""}
                disabled={editingField !== "country"}
              />
            )}
            {editingField === "country" ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded ml-2"
                onClick={handleSaveClick}
              >
                <FaRegSave />
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                onClick={() => handleEditClick("country")}
              >
                <LuPencilLine />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-8 w-full">
          <label className="block mb-1 text-start" htmlFor="mobilenumber">
            Phone:
          </label>
          <div className="flex items-center">
            <input
              className={`border border-gray-300 px-2 py-1 mr-2  w-2/5${
                editingField === "mobilenumber" ? "bg-gray-100 w-2/5" : ""
              }`}
              type="text"
              id="mobilenumber"
              name="mobilenumber"
              value={formData.mobilenumber}
              onChange={handleInputChange}
              disabled={editingField !== "mobilenumber"}
            />
            {editingField === "mobilenumber" ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                onClick={handleSaveClick}
              >
                <FaRegSave />
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                onClick={() => handleEditClick("mobilenumber")}
              >
                <LuPencilLine />
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
