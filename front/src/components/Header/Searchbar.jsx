import { useState } from "react";
import { TbSearch  } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import axios from "axios"  

// eslint-disable-next-line react/prop-types
const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const API_URL = "https://jsonplaceholder.typicode.com/users"
  
  const searchData = (value) => {
    axios(API_URL)
      .then((json) => {
        const results = json.data.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      }).catch(err=>console.log(err))
  };

  const handleChange = (value) => {
    setInput(value);
    searchData(value);
  };

  return (
    <div className="w-full h-8 border-none rounded-[10px] py-0 px[15px] bg-white flex items-center">
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