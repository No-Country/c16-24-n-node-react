/* eslint-disable no-undef */
import appApi from '../../api/appApi'

const Comments = () => {

    useEffect(() => {
        const fetchRecipe = async () => {
          try {
            const response = await appApi.get(`/recipes/${dishID}`);
    
            setDish(response.data.recipe);
          } catch (error) {
            console.error("Error fetching recipe:", error);
          }
        };
    
        fetchRecipe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dishID]);
  return (
    <div>Comments</div>
  )
}

export default Comments