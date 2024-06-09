import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "../custom-hooks/useToast";
import { getUser } from "../services/UserServices";



const mainContext = createContext({});

export const MainContextProvider = ({ children }) => {

    const [userDetails, setUserDetails] = useState({});
    const { showToast, Toast } = useToast()

    //Getting user Details
    const getUserDetails = async () => {
        try {
            const response = await getUser();
            if (response) {
                setUserDetails(response.data.data.user);
            }
        }
        catch (err) {
            showToast('error', err.message);
        }
    }

    return (
        <>
            <mainContext.Provider value={{ userDetails, setUserDetails, getUserDetails }}>
                {children}
            </mainContext.Provider>
            {Toast}
        </>

    )
}

export const useMain = () => useContext(mainContext)