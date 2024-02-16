import { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import GastosCompartidos from './GastosCompartidos.jsx';

// API
import { verGastosCompartidos } from "../../api/calls.js"

export default function GastosCompartidosContainer() {
   let { usuario } = useContext(AuthContext);

   const [filtros, setFiltros] = useState({});
   const [datos, setDatos] = useState({})
   const [cargando, setCargando] = useState(false);

   let location = useLocation();
   const navigate = useNavigate();

   let mensaje;
   if (location.state == null) {
      mensaje = ''
   } else {
      mensaje = location.state.mensaje
   }

   const cambiarPagina = async (params) => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('paginaActual', params);
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
   }

   // ---
   useEffect(() => {

      // Check accounts at DB
      const fetchData = async () => {
         setCargando(true); // Iniciar carga
         const filtros = location.search
         const data = await verGastosCompartidos(filtros);
         setDatos(data);
         setCargando(false); // Finalizar cargar verGastos
      }
      fetchData()

   }, [filtros, location, location.search])


   return (

      <GastosCompartidos 
         usuario={usuario}
         setFiltros={setFiltros}
         datos={datos}
         cargando={cargando}
         cambiarPagina={cambiarPagina}
         mensaje={mensaje}
      
      />
   )
}
