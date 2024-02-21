/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const SearchResult = ({ result }) => {
  return (
    <div className="py-[10px] px-[20px] hover:[#efefef] hover:bg-gray-200 hover:cursor-pointer hover:rounded-xl hover:bold"
      onClick={(e) => alert(`You selected ${result}!`)}>
      {result}
    </div>
  );
};

export default SearchResult