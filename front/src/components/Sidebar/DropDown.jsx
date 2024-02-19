import { useState } from 'react'
import { CgMoreVerticalAlt } from "react-icons/cg";
import useClickOutside from "../../hooks/useClickOutside";
import DropdownItem from "./DropdownItem";

const Dropdown = () => {
    const [show, setShow] = useState(false);
    const dropRef = useClickOutside(() => setShow(show))
    
    return (
        // eslint-disable-next-line no-undef
        <div ref={dropRef} onClick={()=>(setShow(!show))} >
            <CgMoreVerticalAlt size={20} />            
            {show && 
            <ul className="min-w-max absolute z-10  left-[220px] mt-[-145px] bg-white divide-y divide-gray-100 rounded-lg shadow overflow-hidden">
                <DropdownItem />
            </ul>
            }
        </div>
    )
}

export default Dropdown;

