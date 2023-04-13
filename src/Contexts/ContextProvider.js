import { useContext } from "react";
import { createContext, useState } from "react";  

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    userRole: '',
    setCurrentUser: () => {},
    setUserToken: () => {},
    setUserRole: () => {},
})

export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('token') || '');
    const [userRole, _setUserRole] = useState(localStorage.getItem('ROLE') || '');

    const setUserToken = (token) => {
        if (token) {
          localStorage.setItem('token', token)
        } else {
          localStorage.removeItem('token')
        }
        _setUserToken(token);
      }

    const setUserRole = (role) => {
        if (role) {
          localStorage.setItem('ROLE', role)
        } else {
          localStorage.removeItem('ROLE')
        }
        _setUserRole(role);
      }

    return (
        <StateContext.Provider value = {{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            userRole,
            setUserRole,
        }} >
            {children}
        </StateContext.Provider>
    )
}

export const UserStateContext = () => useContext(StateContext)
