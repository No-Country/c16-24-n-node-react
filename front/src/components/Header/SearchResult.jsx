/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export const SearchResult = ({ result }) => {
  return (
    <div
      className="py-[10px] px-[20px] hover:[#efefef]"

      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};