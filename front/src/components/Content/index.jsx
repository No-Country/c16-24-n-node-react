/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../../routes/Login/Login";
import Home from "../../routes/Home/Home";
import Posts from "../../routes/Posts";
import Search from "../../routes/Search";
import BookMark from "../../routes/BookMark";
import Recipes from "../../routes/Recipes";
import Profile from "../../routes/Profile";
import RecipeDetails from "../../routes/Profile/RecipeDetails";
import UserProfile from "../../routes/Profile/UserProfile";
import PatchEdit from "../../routes/Profile/PatchEdit";
import About from "../../routes/About";
import Privacy from "../../routes/Privacy";
import Terms from "../../routes/Terms";
import Registro from "../../routes/Register/Registro";
import Detail from "../../routes/Detail/Detail";
import UsersProfilePage from "../../routes/Users";
import Powered from "../../routes/Powered";
import RecipesByTag from "../../routes/RecipesByTag";

const Content = () => {
  return (
    <div className="p-3 pb-10 visible">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bookmark" element={<BookMark />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/tag/:tagName" element={<RecipesByTag />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/recipes/:recipeId" element={<PatchEdit />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/:userName" element={<UsersProfilePage />} />
        <Route path="/powered" element={<Powered />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </div>
  );
};

export default Content;
