/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useNavigate} from 'react-router-dom'

const SearchResult = ({ result, id }) => {
  let navigate = useNavigate()

  const handleSearch = () => {
    navigate(`/detail?dishID=${id}`)
    window.location.reload();
  }

  return (
    <div className="py-[10px] px-[20px] hover:[#efefef] hover:bg-gray-200 hover:cursor-pointer hover:rounded-xl hover:bold"
      onClick={ handleSearch }>
      {result}
    </div>
  );
};

export default SearchResult