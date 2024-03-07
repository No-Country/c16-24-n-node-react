/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext([]);

export const useAuthContext = () => useContext(AuthContext);

const getFavsFromLocal = () => {
  const favsDish = localStorage.getItem("favorites");
  return !!favsDish ? JSON.parse(favsDish) : [];
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const [logIn, setLogIn] = useState(!!sessionStorage.getItem("token"));
  const [favorites, setFavorites] = useState(getFavsFromLocal());
  const [bookMark, setBookMark] = useState([]);
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
    const bookmarkDish = localStorage.getItem("bookMark");
    let tempDishInBookMark;

    bookmarkDish === null
      ? (tempDishInBookMark = [])
      : (tempDishInBookMark = JSON.parse(bookmarkDish));
    setBookMark(tempDishInBookMark);
  }, []);

  const bookmarkDish = localStorage.getItem("bookMark");
  const favsDish = localStorage.getItem("favorites");

  let tempDishInBookMark;
  let tempDishInFavs;

  bookmarkDish === null
    ? (tempDishInBookMark = [])
    : (tempDishInBookMark = JSON.parse(bookmarkDish));
  
    favsDish === null
    ? (tempDishInFavs = [])
    : (tempDishInFavs = JSON.parse(favsDish));

  const addOrRemoveFromBookmark = (e) => {
    e.preventDefault();
    const btn = e.currentTarget;
    const parent = btn.parentElement.parentElement.parentElement;
    const primaryimage = parent.querySelector("img").src;
    const user = parent.querySelector("#userPost").textContent;
    const createdAt = parent.querySelector("#date").textContent;
    const name = parent.querySelector("#name").textContent;
    const description = parent.querySelector("#comentary").textContent;

    const User = user.slice(1);

    const bookmarkData = {
      User,
      createdAt,
      name,
      primaryimage,
      description,
      id: btn.dataset.bookmarkId,
    };

    let bookMarkInArray = tempDishInBookMark.find(
      (bookmark) => bookmark.id === btn.dataset.bookmarkId
    );

    if (!bookMarkInArray) {
      tempDishInBookMark.push(bookmarkData);
      localStorage.setItem("bookMark", JSON.stringify(tempDishInBookMark));
      setBookMark(tempDishInBookMark);
      console.log("Agregado a bookMarks");
    } else {
      tempDishInBookMark = tempDishInBookMark.filter(
        (bookMark) => bookMark.id !== btn.dataset.bookmarkId
      );
      localStorage.setItem("bookMark", JSON.stringify(tempDishInBookMark));
      setBookMark(tempDishInBookMark);
      console.log("Eliminado de bookMarks");
    }
  };

  const addOrRemoveFromFavs = (e) => {
    e.preventDefault();
    const btn = e.currentTarget;
    const parent = btn.parentElement.parentElement.parentElement;
    const primaryimage = parent.querySelector("img").src;
    const user = parent.querySelector("#userPost").textContent;
    const createdAt = parent.querySelector("#date").textContent;
    const name = parent.querySelector("#name").textContent;
    const description = parent.querySelector("#comentary").textContent;

    const User = user.slice(1);

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
        addOrRemoveFromBookmark,
        favorites,
        setFavorites,
        setBookMark,
        bookMark
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
