import { Link } from "react-router-dom";
import { BsPeopleFill } from "react-icons/bs";
import { MdPrivacyTip, MdNoteAlt } from "react-icons/md";
import { FaUsersViewfinder } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types, no-unused-vars
const DropdownItem = () => {
  let items = [
    { id: 1, icon: <BsPeopleFill size={20} />, text: "About", to: "/about" },
    {
      id: 2,
      icon: <MdPrivacyTip size={20} />,
      text: "Privacy",
      to: "/privacy",
    },
    {
      id: 3,
      icon: <MdNoteAlt size={20} />,
      text: "Terms Of Use",
      to: "/terms",
    },
    {
      id: 4,
      icon: <FaUsersViewfinder size={20} />,
      text: "Powered By",
      to: "/powered",
    },
  ];
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.id}
          to={item.to}
          onClick={() => {
            console.log(item.to);
          }}
        >
          <li className="flex gap-3 items-center px-4 py-2 text-gray-800 hover:bg-gray-50 cursor-pointer">
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </li>
        </Link>
      ))}
    </>
  );
};
export default DropdownItem;
