import { useEffect, useRef } from "react";

const useClickOutside =(callbackFn) => {
    let domNodeRef = useRef()

    useEffect(() => {
        let handler = (event) => {
            if (!domNodeRef.current?.contains(event.target)) {
                callbackFn()
            }
        }
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return domNodeRef
}
export default useClickOutside;    

  