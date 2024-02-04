import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
   const [usuario, setUsuario] = useState('');

   return (
      <UserContext.Provider value={{ usuario, setUsuario }}>
         {children}
      </UserContext.Provider>
   );
};

export { UserContext, UserProvider };