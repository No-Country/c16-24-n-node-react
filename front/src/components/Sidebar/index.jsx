import { CgPushChevronLeft, CgPushChevronRight } from "react-icons/cg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import c_logo from '../../assets/c_logo.png';
import minlogo from '../../assets/minlogo.png';
import SidebarItem from "./SidebarItem";
import Dropdown from "./DropDown";

const Sidebar = () => {  
  const [expanded, setExpanded] = useState(window.innerWidth >= 768);

  const changeSize = () => {    
    if (window.innerWidth < 768) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }
  
  useEffect(()=>{
    window.addEventListener('resize', changeSize)
    return()=>{
      window.addEventListener('resize', changeSize)
    }
  },[])

  return (
    <div className="flex h-14 max-md:w-full max-md:absolute max-md:bottom-0 md:min-h-[100vh] z-50 border-t">
      <aside className="md:h-screen">
        <nav className="h-full  md:max-w-[235px] max-md:w-screen flex flex-row md:flex-col bg-white border-r shadow-sm">
          <div className="max-md:hidden p-4 pb-2 h-13">
            <Link to="/">
              <img src={logo} className={`isMovile transition-all h-11 ${expanded ? "w-auto" : "w-0 "}`} />
            </Link>
          </div>

          <button onClick={() => setExpanded(() => !expanded)} className={`max-md:hidden flex items-center p-1.5 rounded-lg ${expanded? "justify-end" : "justify-center"}`}>
              { expanded? <CgPushChevronLeft size={25} className="bg-gray-50 rounded-sm border-solid shadow-sm hover:bg-gray-100" />: <CgPushChevronRight size={25}  className="bg-gray-50 border-solid shadow-sm hover:bg-gray-100" />}
            </button>  
          <ul className="max-md:flex justify-between items-center flex-1 px-3 max-md:py-3">
            <SidebarItem expanded={expanded} />
          </ul>
          <div className={`md:border-t flex p-1 md:p-3 ${expanded ? "md:justify-between" : "md:justify-center"}`}>
            <Link className={`max-md:hidden ${!expanded ? "hidden":""}`} to="/">
              <img src={c_logo} className="object-cover rounded-md max-h-12" />
            </Link>
            <div className="flex justify-between items-center overflow-hidden transition-all">
              <button className="h-12">
                <Dropdown />        
              </button>              
            </div>
          </div> 
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;