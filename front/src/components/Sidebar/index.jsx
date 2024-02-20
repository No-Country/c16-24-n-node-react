import { CgPushChevronLeft, CgPushChevronRight } from "react-icons/cg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import minlogo from '../../assets/minlogo.png';
import SidebarItem from "./SidebarItem";
import Dropdown from "./DropDown";

const Sidebar = () => {  
  const [expanded, setExpanded] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const changeSize = () => {
    setWidth(window.innerWidth)
    width < 640 ?setExpanded(false) : setExpanded(true)
  }

  useEffect(()=>{
    window.addEventListener('resize', changeSize)

    return()=>{
      window.addEventListener('resize', changeSize)
    }
  })

  return (
    <div className="flex min-h-[100vh]">
      <aside className="h-screen">
        <nav className="h-full max-w-[235px] flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2">
            <Link to="/">
              <img src={logo} className={`overflow-hidden transition-all h-[95px] ${expanded ? "w-[200px]" : "w-0 "}`} />
            </Link>
          </div>
          <button onClick={() => setExpanded(() => !expanded)} className={`flex items-center p-1.5 rounded-lg ${expanded? "justify-end" : "justify-center"}`}>
              { expanded? <CgPushChevronLeft size={25} className="bg-gray-50 rounded-sm border-solid shadow-sm hover:bg-gray-100" />: <CgPushChevronRight size={25}  className="bg-gray-50 border-solid shadow-sm hover:bg-gray-100" />}
            </button>  
          <ul className="flex-1 px-3">
            <SidebarItem expanded={expanded} />
          </ul>
          <div className="border-t flex p-3">
            <Link to="/">
              <img src={minlogo} className="w-10 h-10 rounded-md" />
            </Link>
            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
              <div className="leading-4">
                  <h4 className="font-semibold">CHETIFABENE</h4>
                  <span className="text-xs text-gray-600">info@chetifabene.com</span>
              </div>
              <button>
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