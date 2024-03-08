import { useNavigate } from "react-router-dom";

const TagComponent = ({ tagName }) => {
  const navigate = useNavigate();
  const hanleClick = () => {
    if(tagName){
        navigate(`/recipes/tag/${tagName}`)
    }
  };
  return <>{tagName && <button onClick={hanleClick}>{`#${tagName}`}</button>}</>;
};

export default TagComponent;
