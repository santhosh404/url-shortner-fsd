import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "../custom-hooks/useToast";
import { getUser } from "../services/UserServices";



const mainContext = createContext({});

export const MainContextProvider = ({ children }) => {

    const [userDetails, setUserDetails] = useState({});

    return (
        <>
            <mainContext.Provider value={{ userDetails, setUserDetails }}>
                {children}
            </mainContext.Provider>
        </>

    )
}

export const useMain = () => useContext(mainContext)