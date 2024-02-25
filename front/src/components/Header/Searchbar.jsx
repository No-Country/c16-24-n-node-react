import { useState } from "react";
import { TbSearch  } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import axios from "axios"  
import endPoint from "../../routes/Search/TemplateData.json";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const searchData = (value) => {
    axios.get(endPoint)
    .then((res) => {
        const apiData = res.config.url; 
        console.log(apiData)
        const results = apiData.filter((title) => {
          return (
            value &&
            title &&
            title.title &&
            title.title.toLowerCase().includes(value.toLowerCase())
            );
          }
       
        );
        setResults(results);
      }).catch(err=>console.log(err))
    };
    
  const handleChange = (value) => {
    setInput(value);
    searchData(value);
  };

  return (
    <div className="w-full h-8 border-none rounded-[10px] py-0 px[15px] bg-white text-black flex items-center">
      <TbSearch size={20} className="ml-2  text-gray-800" />
      <input
        className="bg-transparent border-none h-full font-[1.25rem] w-full pl-5 outline-none"
        placeholder="Search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <IoIosClose size={20} className="mr-3" />
    </div>
  );
};

export default SearchBar