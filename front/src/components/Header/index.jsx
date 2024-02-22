import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { LuChevronDown } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import useClickOutsideUser from "../../hooks/useClickOutsideUser";
import Search from "./Searchbar";
import SearchResultsList from "./SearchResultsList";
import { useAuthContext } from "../../context/AuthProvider";

const Header = () => {
  const userRef = useClickOutsideUser(() => setOpen(open))
  const { logIn, handlerLogOut, user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]); 
  
  let navigate = useNavigate()
  
  const logOut = () => {
    handlerLogOut()
    navigate('/login')
  }

  return (
    <div className="bg-white h-[65px] border-b sm:shadow-sm w-full top-0 left-0">
      <div className="flex items-center justify-between bg-white py-4 px-7">
        <div className="w-full">
        <Search setResults={setResults}/>
        {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>
        {logIn?
          <div ref={userRef} onClick={()=>(setOpen(!open))} className="border-l w-[200px] md:ml-0 md:my-0 my-0 font-semibold">
              <div className="flex justify-center items-center text-gray-800 hover:text-blue-400 duration-500" >
                <div className="flex justify-center items-center pl-1">
                {user}
                  <LuChevronDown size={20} />
                  {open&&
                    <div className="min-w-max absolute z-10 right-[105px] mt-[125px] bg-white divide-y divide-gray-100 rounded-lg shadow overflow-hidden">
                      <Link to="/profile" className="flex gap-3 items-center px-4 py-2 text-gray-800 hover:bg-gray-50 cursor-pointer">
                        <CgProfile  size={20} /> 
                        <span>Your profile</span>
                      </Link>                
                      <div onClick={logOut} >
                        <Link to="/" className="flex gap-3 items-center px-4 py-2 text-gray-800 hover:bg-gray-50 cursor-pointer">
                            <IoIosLogOut size={20} /> 
                            <span>Sign Out</span>
                        </Link> 
                      </div>
                    </div>
                  } 
                </div>
              </div>
          </div>
          :
          <button className="w-[200px] md:ml-8 md:my-0 l:my-7 font-semibold">
            <Link to="/login" className="border shadow-l border-gray-400 p-2 rounded-[10px] ">
              Sign In
            </Link>
          </button>
        }
      </div>
    </div>
  );
};

export default Header;