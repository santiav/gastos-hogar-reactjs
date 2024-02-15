import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { editarGastoGET, editarGastoPUT } from '../../api/calls.js'
// pages
import Editar from "./Editar.jsx";

export default function EditarContainer() {

   const navigate = useNavigate()
   const location = useLocation()
   const actualPath = location.state // para poder volver a la página en la que se estaba

   const { id } = useParams();

   const [gasto, setGasto] = useState()

   useEffect(() => {
      // Check accounts at DB
      const fetchData = async () => {
         const data = await editarGastoGET(id);
         setGasto(data)
      }
      fetchData()
   }, [])

   const handleSubmit = (e) => {
      e.preventDefault()
      editarGastoPUT(gasto.id, gasto)
      navigate(actualPath, { state: { mensaje: "Gasto editado!" } })
   }

   const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setGasto({ ...gasto, [name]: checked });
   }

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setGasto({ ...gasto, [name]: value });
   }


   return (

      <Editar 
         handleSubmit={handleSubmit}
         handleCheckboxChange={handleCheckboxChange}
         handleInputChange={handleInputChange}
         gasto={gasto}
         actualPath={actualPath}
      />
   
   )
}
