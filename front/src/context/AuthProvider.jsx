/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext([]);

export const useAuthContext = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState(!!sessionStorage.getItem("user"));
  const [logIn, setLogIn] = useState(!!sessionStorage.getItem("token"));
  const [favorites, setFavorites] = useState([]);

  let userApp = sessionStorage.getItem("user");

  useEffect(() => {
    userApp ? setUser(userApp) : setUser("");
  }, [user, userApp]);

  const handlerLogOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setLogIn(false);
  };

  useEffect(() => {
    const favsDish = localStorage.getItem("favorites");

    let tempDishInFavs;

    favsDish === null
      ? (tempDishInFavs = [])
      : (tempDishInFavs = JSON.parse(favsDish));
    setFavorites(tempDishInFavs);
  }, []);

  const favsDish = localStorage.getItem("favorites");

  let tempDishInFavs;

  favsDish === null
    ? (tempDishInFavs = [])
    : (tempDishInFavs = JSON.parse(favsDish));

  const addOrRemoveFromFavs = (e) => {
    e.preventDefault();
    const btn = e.currentTarget;
    const parent = btn.parentElement.parentElement.parentElement;
    const primaryimage = parent.querySelector("img").src;
    const User = parent.querySelector("#userPost").textContent;
    const createdAt = parent.querySelector("#date").textContent;
    const name = parent.querySelector("#name").textContent;
    const description = parent.querySelector("#comentary").textContent;

    const dishData = {
      User,
      createdAt,
      name,
      primaryimage,
      description,
      id: btn.dataset.dishId,
    };

    let dishInArray = tempDishInFavs.find(
      (dish) => dish.id === btn.dataset.dishId
    );

    if (!dishInArray) {
      tempDishInFavs.push(dishData);
      localStorage.setItem("favorites", JSON.stringify(tempDishInFavs));
      setFavorites(tempDishInFavs);
      console.log("Agregado a favoritos");
    } else {
      tempDishInFavs = tempDishInFavs.filter(
        (dish) => dish.id !== btn.dataset.dishId
      );
      localStorage.setItem("favorites", JSON.stringify(tempDishInFavs));
      setFavorites(tempDishInFavs);
      console.log("Eliminado de favoritos");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        logIn,
        setLogIn,
        handlerLogOut,
        user,
        addOrRemoveFromFavs,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
