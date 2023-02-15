import { useContext, useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
  usernya: null,
  tokennya: null,
  setUsernya : () => {},
  setTokennya: () => {},
})

export const ContextProvider = ({children}) => {

  const [usernya, setUsernya] = useState({})
  const [tokennya, _setTokennya] = useState(localStorage.getItem('ACCESS_TOKEN'))

  const setTokennya = (token) => {
    _setTokennya(token)
    if(token) {
      localStorage.setItem('ACCESS_TOKEN', token)
    } else {
      localStorage.removeItem('ACCESS_TOKEN')
    }
  }

  return (
    <StateContext.Provider value={{
      usernya,
      tokennya,
      setUsernya,
      setTokennya
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)