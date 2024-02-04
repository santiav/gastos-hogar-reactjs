import { createContext } from 'react';

export const AuthContext = createContext({
   usuario: null,
   setUsuario: () => { },
   logout: () => { },
});
