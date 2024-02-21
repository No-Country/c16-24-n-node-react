import Search from "../../components/Header/Searchbar";
import SearchList from "../../components/Header/SearchResultsList";
import { useState } from "react";

const Seach = () => {
  const [results, setResults] = useState([]);
  return (
    <main className="flex justify-center px-4 mt-5">
      <section className="flex flex-col justify-center items-center max-w-[1000px]">
        <h1 className="text-2xl">SEARCH</h1>
        <div className="mim-w-[1000px]">
          <Search className="mim-w-[1000px]" setResults={setResults} />
          {results && results.length > 0 && (
            <SearchList results={results} />
          )}
        </div>
      </section>
    </main>
  );
};

export default Seach;
