import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const {isAuthenticated, user, loginWithRedirect, logout, isLoading} = useAuth0();
    const [currentUser, setCurretnUser] = useState(null);
    //did mount
    useEffect(()=>{
        setCurretnUser(user);
    },[user]);
    return <UserContext.Provider value={{isAuthenticated, currentUser, loginWithRedirect, logout, isLoading}}>{children}</UserContext.Provider>
};
// make sure use
export const useUserContext = () => useContext(UserContext);
