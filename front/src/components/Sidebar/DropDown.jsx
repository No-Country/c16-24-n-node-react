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
            <ul className="min-w-max absolute z-10 max-md:right-2 max-md:-top-32  md:left-16 md:-mt-40 bg-white divide-y divide-gray-100 rounded-lg shadow overflow-hidden">
                <DropdownItem />
            </ul>
            }
        </div>
    )
}

export default Dropdown;

