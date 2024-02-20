/* eslint-disable react/prop-types */
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="fixed min-w-[200px] bg-gray-50 text-black flex flex-col rounded-xl mt-4 max-h-[300px] overflow-y-auto z-100">
      {results.map((result, id) => {
        return <SearchResult result={result.name} key={id} />;
      })}
    </div>
  );
};