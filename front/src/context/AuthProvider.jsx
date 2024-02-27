/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect, useContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = createContext([]);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState(!!sessionStorage.getItem("user"));
  const [logIn, setLogIn] = useState(!!sessionStorage.getItem("token"));
  const [ favorites, setFavorites ] = useState([]);

  // let token = sessionStorage.getItem("token");
  let userApp = sessionStorage.getItem("user");

  // useEffect(() => {
  //   token ? setLogIn(true) : setLogIn(false);
  // }, [logIn, token]);

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
    const image = parent.querySelector("img").src
    const user = parent.querySelector("#userPost").textContent;
    const date = parent.querySelector("#date").textContent;
    const title = parent.querySelector("#titulo").textContent;
    const comentary = parent.querySelector("#comentario").textContent;

    const dishData = {
      user,
      date,
      title,
      image,
      comentary,
      id: btn.dataset.dishId
    };
    
    let dishInArray = tempDishInFavs.find( (dish) => dish.id === btn.dataset.dishId );   

    if (!dishInArray) {
      tempDishInFavs.push(dishData);
      localStorage.setItem("favorites", JSON.stringify(tempDishInFavs));
      setFavorites(tempDishInFavs);
      console.log("Agregado a favoritos");
    } else {
      tempDishInFavs = tempDishInFavs.filter( (dish) => dish.id !== btn.dataset.dishId );
      localStorage.setItem("favorites", JSON.stringify(tempDishInFavs));
      setFavorites(tempDishInFavs);
      console.log("Eliminado de favoritos");
    }
  }

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
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;