import { useEffect, useState } from "react";
import appApi from "../../api/appApi";
import { Link } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { FollowsUserComponent } from "../Profile/UserInfo";

const SearchUsersComponent = ({ userTerm }) => {
  const [searchUsers, setSearchUsers] = useState([]);
  const fetchData = async () => {
    try {
      if (userTerm.length > 2) {
        const resp = await appApi.get(`/users/search?term=${userTerm}`);
        console.log(resp.data);
        setSearchUsers(resp.data.data);
      } else {
        setSearchUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userTerm]);
  return (
    <section className="w-full flex flex-wrap justify-center">
      {searchUsers.map((user) => {
        return <UserResultCard userSearchInfo={user} />;
      })}
    </section>
  );
};

const UserResultCard = ({ userSearchInfo }) => {
  return (
    <div className="border rounded-md py-3 my-3 mx-3 w-full md:w-2/5 flex flex-col">
      <div className="px-5 py-3 flex flex-row">
        <div className="border rounded-full w-fit">
          {userSearchInfo.profile.image ? (
            <img src={userSearchInfo.profile.image} alt="" />
          ) : (
            <LuUser2 className="m-1 text-slate-300" size={35} />
          )}
        </div>
        <section className="pl-1 flex flex-col">
          <Link to={`/${userSearchInfo.user_name}`}>
            <h3 className="font-bold">{`@${userSearchInfo.user_name}`}</h3>
          </Link>
          <h4>
            {`${userSearchInfo.profile.first_name || ""} ${
              userSearchInfo.profile.last_name || ""
            }`}
          </h4>
        </section>
      </div>
      <FollowsUserComponent
        profileUName={userSearchInfo.user_name}
        profileUserId={userSearchInfo.id}
      />
    </div>
  );
};

export default SearchUsersComponent;
