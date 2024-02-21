import { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import VerGastos from './VerGastos.jsx';
import Swal from 'sweetalert2'

// API
import { verGastos, deleteGasto } from "../../api/calls.js"

export default function VerGastosContainer() {

   let { usuario } = useContext(AuthContext);

   // Hooks
   const [filtros, setFiltros] = useState({});
   const [datos, setDatos] = useState({})
   // Para el loading
   const [cargando, setCargando] = useState(false);
   // forzar el re-renderizado
   const [actualizarDatos, setActualizarDatos] = useState(false);

   let location = useLocation();
   const navigate = useNavigate();

   let mensaje;
   if (location.state == null) {
      mensaje = ''
   } else {
      mensaje = location.state.mensaje 
   }

   // FUNCIÓN:  Paginación
   const cambiarPagina = async (params) => {

      const searchParams = new URLSearchParams(location.search);
      searchParams.set('paginaActual', params);
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });

   }

   // FUNCIÓN:  Chequear datos
   const fetchData = async () => {
      setCargando(true); // Iniciar carga
      const filtros = location.search
      const data = await verGastos(filtros, usuario);
      setDatos(data);
      setCargando(false); // Finalizar cargar verGastos
      
   }

   // Acciones a refrescar
   useEffect(() => {
      fetchData()
   }, [filtros, location, location.search, actualizarDatos])

   if (!usuario) {
      return <Navigate to={`/`} />;
   }


   // FUNCIÓN: Borrar gasto
   const borrarGasto = async (id) => {

      try {
         Swal.fire({
            title: '¿Queres borrar el gasto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0ea5e9',
            cancelButtonColor: '#f97316',
            confirmButtonText: 'Borrar',

         }).then(async (result) => {
            if (result.isConfirmed) {
                
               Swal.fire(
                  '¡Borrado!',
                  'El gasto ha sido borrado',
                  'success',
               )   
               await deleteGasto(id) 
               setActualizarDatos(prev => !prev); // Cambiar el estado para forzar el re-renderizado
                         
            }
         })
      } catch (err) {
         return err
      }
   }

   return (

      <VerGastos
         usuario={usuario}
         setFiltros={setFiltros}
         datos={datos}
         cargando={cargando}
         cambiarPagina={cambiarPagina}
         mensaje={mensaje}
         borrarGasto={borrarGasto}
      />
   )
}
