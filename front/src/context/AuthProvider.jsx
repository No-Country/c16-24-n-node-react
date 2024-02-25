/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect, useContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = createContext([]);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState();
  const [logIn, setLogIn] = useState(false);
  const [ favorites, setFavorites ] = useState([]);
  const [fav, setFav] = useState(false);
  // const [ bookMarks, setBookMarks ] = useState([]);


  let token = sessionStorage.getItem("token");
  let userApp = sessionStorage.getItem("user");

  useEffect(() => {
    token ? setLogIn(true) : setLogIn(false);
  }, [logIn, token]);

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

  const handlerFav = () => {
    setFav(!fav) 
  }
  
  const addOrRemoveFromFavs = (e) => {
    e.preventDefault();
    const btn = e.currentTarget;
    const parent = btn.parentElement.parentElement.parentElement;
    const imgUrl = parent.querySelector("img").src
    const userPost = parent.querySelector("#userPost").textContent;
    const date = parent.querySelector("#date").textContent;
    const title = parent.querySelector("#titulo").textContent;
    const overview = parent.querySelector("#comentario").textContent;

    
      
     const dishData = {
      userPost,
      date,
      title,
      imgUrl,
      overview,
      fav: fav,
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
        handlerFav,
        // bookMarks 
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;