import { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import VerGastos from './VerGastos.jsx';

// API
import { verGastos } from "../../api/calls.js"

export default function VerGastosContainer() {

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
   console.log(mensaje)

   const cambiarPagina = async (params) => {

      const searchParams = new URLSearchParams(location.search);
      searchParams.set('paginaActual', params);
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });

      // const data = await verGastos(location.search, usuario);
      // setDatos(data);
   }

   // ---
   useEffect(() => {

      // Check accounts at DB
      const fetchData = async () => {
         setCargando(true); // Iniciar carga
         const filtros = location.search
         const data = await verGastos(filtros, usuario);
         setDatos(data);
         setCargando(false); // Finalizar cargar verGastos
      }
      fetchData()

   }, [filtros, location, location.search])

   if (!usuario) {
      return <Navigate to={`/`} />;
   }

   return (

      <VerGastos
         usuario={usuario}
         setFiltros={setFiltros}
         datos={datos}
         cargando={cargando}
         cambiarPagina={cambiarPagina}
         mensaje={mensaje}
      />
   )
}
