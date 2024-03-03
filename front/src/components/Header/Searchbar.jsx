/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { TbSearch } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import { useRef } from "react";
import axios from "axios";

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const inputText = useRef(null);
  const endPoint = "https://c16-24-n-node-react.vercel.app/api/recipes";
  
  useEffect
  const searchData = (value) => {
    axios
      .get(endPoint)
      .then((res) => {
        const apiData = res.data.recipes;
        const results = apiData.filter((name) => {
          return ( 
            name != "" ?
            value &&
            name &&
            name.name &&
            name.name.toLowerCase().includes(value.toLowerCase()) : "" 
          );
        });
        setResults(results);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (value) => {
    setInput(value);
    searchData(value);
  };

  const handleReset = () => {
    if (inputText.current) {
      inputText.current.value = "";
      inputText.current.type = "text";
      setResults("")      
    }
  };

  return (
    <div className="w-full h-8 border-none rounded-[10px] py-0 px[15px] bg-white text-black flex items-center">
      <TbSearch size={20} className="ml-2  text-gray-800" />
      <input
        className="bg-transparent border-none h-full font-[1.25rem] w-full pl-5 outline-none"
        placeholder="Search..."
        value={input}
        type="text" 
        ref={inputText} 
        onChange={(e) => handleChange(e.target.value)}
      />
      <button onClick={handleReset}>
        <IoIosClose size={20} className="mr-3" />
      </button>
    </div>
  );
};

export default SearchBar;
