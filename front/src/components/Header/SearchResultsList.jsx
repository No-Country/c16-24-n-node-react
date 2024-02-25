/* eslint-disable react/prop-types */
import SearchResult from "./SearchResult";

const SearchResultsList = ({ results }) => {
  return (
    <div className="fixed max-w-full bg-gray-50 text-blacj flex flex-col rounded-xl mt-4 max-h-[300px] overflow-y-auto px-3 ">
      {results.map((result, id) => {
        return <SearchResult result={result.title} key={id} />;
      })}
    </div>
  );
};
export default SearchResultsList