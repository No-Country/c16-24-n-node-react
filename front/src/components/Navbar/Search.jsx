import { FaSearch } from "react-icons/fa";
const Search = () => {
  return (
    <div className="flex justify-center items-center">
      <input
        type="search"
        className="md:ml-8 md:my-0 my-0 font-semibold"
        placeholder="Buscar"
        aria-label="Search"
        aria-describedby="button-addon2"
      />
      <span >
        <FaSearch className="text-gray-800" />
      </span>
    </div>
  );
};

export default Search;
