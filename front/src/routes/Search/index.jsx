import { useState } from "react";
/* import './style.css'; */
import data from "./TemplateData.json";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { HiOutlineBookmark, HiOutlineStar  } from "react-icons/hi2";
// import { useAuthContext } from "../../context/AuthProvider";

const Seach = () => {
  // const {user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [fill, setFill] = useState("")

  const handlerFill = () => {
    fill === ""? setFill("fill-black") : setFill("") 
  }

  return (
    <main className="flex justify-center px-4 mt-5">
      <section className="max-w-[1200px]">
       <div className="my-[5%] mx-0">
        <div className="flex justify-center items-center pb-12 ">
          <input className="w-[80%] p-[10px] outline-none border rounded-xl" id="searchInput" type="text" placeholder="Search here..." onChange={(event) => {
            setSearchTerm(event.target.value);
          }} />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-24 justify-center items-center pb-20">
          {
            data 
              .filter((val) => {
                if(searchTerm == ""){
                  return val;
                }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val;
                }
              })
              .map((val) => {
                return(
                  <div className="md:max-w-[550px] w-[550px] h-[380px] gap-4" key={val.id}>
                    <div className="flex flex-col w-full bg-white border border-solid rounded-xl p-5" >
                        <h3 className="flex justify-between items-center pl-2 pb-1">
                          <span className="flex justify-between items-center gap-2 text-l">
                            <FaRegUserCircle size={20}  />
                            <p>{val.user}</p>
                          </span>
                          <p className="text-sm pr-5">{val.date}</p>
                        </h3>
                        <img className="pt-2 w-[500px] max-h-[230px] object-cover rounded-xl" src={val.image} alt="" />
                        <div className="flex justify-between items-center py-3">
                          <div className="flex justify-centeritem-center gap-x-2 pl-2">
                            <HiOutlineStar onClick={handlerFill} className={`cursor-pointer ${fill}`} size={20} />
                            <HiOutlineBookmark className="cursor-pointer" size={20} />
                          </div>
                          <div className="flex justify-centeritem-center pr-5">
                            <TfiCommentAlt className="cursor-pointer" size={20} />
                          </div>
                        </div>
                        <h3 className="pb-2">{val.title}</h3>
                        <p className="border border-solid rounded-xl p-2 h-20">{val.comentary.substring(0, 120)}...</p>
                    </div> 
                  </div>)
              })
          }
        </div>
      </div>
      </section>
    </main>
  );
};

export default Seach;
