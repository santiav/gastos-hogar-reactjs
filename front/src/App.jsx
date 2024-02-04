import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from 'react';
import { AuthContext } from "./context/AuthContext";
// Pages
import Login from './pages/Login'
import VerGastos from './pages/VerGastos'
import Error404 from './pages/Error404'
// Components
import Layout from "./components/Layout";


function App() {

   const [usuario, setUsuario] = useState(null);

   const logout = () => {
      // Perform logout actions (e.g., clear tokens, redirect)
      setUsuario(null);
   };

   useEffect(() => {
      // Check for existing login state (e.g., from local storage)
      const storedUser = localStorage.getItem('usuario');
      console.log("storedUser -->  ", storedUser)
      if (storedUser) {
         setUsuario(storedUser);
      }
   }, []);

   return (

      <AuthContext.Provider value={{ usuario, setUsuario, logout }}>
         <BrowserRouter>
            <Routes>
               <Route index element={<Login />} />
               <Route element={<Layout />}>
                  <Route path="/gastos/ver/:usuario" element={<VerGastos />} />
               </Route>
               <Route path="*" element={<Error404 />} />
            </Routes>
         </BrowserRouter>
      </AuthContext.Provider>
   )
}

export default App
