import { NavLink } from "react-router-dom";
import { 
  LuHome, 
  LuLayoutDashboard, 
  // LuChefHat 
} from "react-icons/lu";
import { TbFileLike, TbSearch  } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

// eslint-disable-next-line react/prop-types
const SidebarItem = ({expanded}) => {
 
  let items = [
    { id: 1, icon: <LuHome size={20} />, text: "Home", to: "/" },
    { id: 2, icon: <LuLayoutDashboard size={20} />, text: "Posts",to: "/posts"},
    { id: 3, icon: <TbSearch  size={20} />, text: "Search",to: "/search"},
    // { id: 4, icon: <LuChefHat size={20} />, text: "Reviews", to: "/reviews"},
    { id: 5, icon: <TbFileLike  size={20} />, text: "Favorite recipes", to: "/recipes" },
    { id: 6, icon: <CgProfile  size={20} />, text: "Profile", to: "/profile" },
  ];

  return (
    <>
      {items.map((item) => (
        <li key={item.id} className="py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600">
          <NavLink to={item.to} className="relative flex items-center text-gray-800 hover:text-blue-400 duration-500" >
            <span className="">{item.icon} </span>
            <span className={`isMobile text-xl overflow-hidden transition-all ${ expanded ? "w-52 ml-3" : "w-0"}`}>
              {item.text}
            </span>
            {!expanded && (
              <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                 {item.text}
              </div>
            )}
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default SidebarItem;