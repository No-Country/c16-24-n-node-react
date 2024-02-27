/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { HiOutlineBookmark, HiOutlineStar } from "react-icons/hi2";
import { useAuthContext } from "../../context/AuthProvider";
import axios from "axios";

const Home = () => {
  // const [ offset, setOffset ] = useState(0);
  const [ dishList, setDishList ] = useState([]);
  const { addOrRemoveFromFavs, handlerFav } = useAuthContext();

  const currentData = new Date();

  const endPoint = "https://c16-24-n-node-react.vercel.app/api/recipes/";

  useEffect(() => {
    getData();

     window.addEventListener('scroll', () =>{
       console.log(window.innerHeight)
       if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        console.log('hola')
         
       }
     })
  }, []);



  async function getData() {
    const res = await axios.get(endPoint).catch((err) => {
      console.log(err);
    });
    const resApi = res?.data?.recipes
    console.log(resApi)
    resApi.sort((a, b) => new Date(b.date) - new Date(a.date))
    setDishList(resApi);
  }
 

  return (
    <main className="flex justify-center px-4 mt-5">
      <section className="max-w-[1200px]">
        <div className="my-[5%] mx-0">
          <div className="flex md:flex-wrap lg:flex-col gap-x-4 md:gap-y-24 lg:gap-y-10 justify-center items-center pb-20">
            {dishList.map((val) => 
                (
                  <div
                    className="md:max-w-[550px] md:w-[550px] md:h-[380px] lg:max-w-full lg:w-full lg:h-full gap-4"
                    key={val.id}
                  >
                    <div className="flex flex-col w-full bg-white border border-solid rounded-xl md:p-5">
                      <h3 className="flex justify-between items-center pl-2 pb-1">
                        <span className="flex justify-between items-center gap-2 text-l">
                          <FaRegUserCircle size={20} />
                          <p id="userPost">{val.UserId}</p>
                        </span>
                        <p id="date" className="text-sm pr-5">
                          {currentData.toDateString('es-AR', val.createdAt)}
                        </p>
                      </h3>
                      <img
                        className="pt-2 md:w-[500px] md:max-h-[230px] lg:w-full lg:max-h-[400px] object-cover rounded-xl"
                        src={val.primaryimage}
                        alt=""
                      />
                      <div className="flex justify-between items-center py-3">
                        <div className="flex flex-row">
                          <button
                            onClick={addOrRemoveFromFavs}
                            data-dish-id={val.id}
                            className="flex seft-start item-center gap-x-2 pl-2"
                          >
                            {val.favorite ? (
                              <HiOutlineStar
                                onClick={handlerFav}
                                className="cursor-pointer fill-red-700 text-red-700"
                                size={20}
                              />
                            ) : (
                              <HiOutlineStar
                                className="cursor-pointer"
                                size={20}
                              />
                            )}
                          </button>
                          <button
                            data-bookmark-id={val.id}
                            className="flex seft-start item-center gap-x-2 pl-2"
                          >
                            <HiOutlineBookmark
                              className={`cursor-pointer `}
                              size={20}
                            />
                          </button>
                        </div>
                        <div>
                          <button className="flex justify-center item-center pr-5">
                            <TfiCommentAlt
                              className="cursor-pointer"
                              size={20}
                            />
                          </button>
                        </div>
                      </div>
                      <h3 id="titulo" className="pb-2">
                        {val.name}
                      </h3>
                      <p
                        id="comentario"
                        className="border border-solid rounded-xl p-2 md:h-20 lg:h-20 "
                      >
                        {val.process.substring(0, 120)}...
                      </p>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </section>
    </main>
  );
};
export default Home;