import { useEffect, useState, useRef } from 'react'
import Loading from "../components/Loading.jsx"
import TablaGastosModal from './TablaGastosModal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'


export default function TablaGastos({ usuario }) {

   const [cargado, setCargado] = useState(false);
   const [datos, setDatos] = useState([])

   const [showModal, setShowModal] = useState(false);
   const [productoSeleccionado, setProductoSeleccionado] = useState(null);

   const handleShowModal = (product) => {
      setProductoSeleccionado(product);
      setShowModal(true);
   };

   const db = [
      {
         id: 1,
         rubro: "Comida",
         item: "Día",
         importe: 5000,
         tipoPago: "debito",
         comentarios: "probando...",
         fechaGasto: "2024/01/01",
         moneda: "pesos",
         gastoFijo: 1,
         aporte: 1,
         year: 2024
      },
      {
         id: 2,
         rubro: "Farmacia",
         item: "Desodorante",
         importe: 3400,
         tipoPago: "debito",
         comentarios: "probando...",
         fechaGasto: "2024/01/02",
         moneda: "pesos",
         gastoFijo: 1,
         aporte: 1,
         year: 2024
      }
   ]

   useEffect(() => {

      setTimeout(() => {

         setDatos(db)
         setCargado(true)

      }, 2000)
   }, [datos])



   return (



      <div className="table-row-group mt-5">
         {
            cargado
               ?
               datos
                  ?
                  <>
                     {datos.map(gasto => (
                        <div className="odd:bg-white even:bg-slate-200" key={gasto.id}>
                           <div className="gasto grid gap-x-1 md:gap-x-3 grid-cols-[60px_minmax(100px,_50%)_25%_25%] md:grid-cols-[60px_minmax(100px,_50%)_16.66%_16.66%_16.66%] py-[8px] grid-rows-[30px] ">
                              <div className="row-span-2 flex justify-center" data-id={`${gasto.id}`}
                                 onClick={() => handleShowModal(gasto)}

                              >

                                 <span className="text-center self-center">
                                    <img src={`/icons/rubros/${gasto.rubro}.png`}
                                       className="w-12 block mx-auto" title={gasto.rubro} />
                                 </span>


                              </div>
                              <span
                                 className="leading-6 self-end text-lg text-ellipsis overflow-hidden whitespace-nowrap">
                                 {gasto.item}
                              </span>
                              <span className="pt-1 text-center self-end text-lg ">{
                                 gasto.moneda == "dolares" ? `u$s ${gasto.importe}` : `${new
                                    Intl.NumberFormat('es-AR', {
                                       roundingMode: 'trunc',
                                       style: 'currency', currency: 'ARS',
                                       roundingPriority: "morePrecision"
                                    }).format(gasto.importe)}`
                              }</span>
                              <span className="pt-1 text-center self-end capitalize hidden sm:block">
                                 {gasto.tipoPago}
                              </span>
                              <div className="p-1 text-center flex row-span-2">
                                 <a href={`/api/gastos/${usuario}/editar/${gasto.id}`}
                                    className=" p-2  bg-sky-500 hover:bg-sky-800 text-white w-1/2 flex justify-center items-center text-sm"
                                    title="Editar"><FontAwesomeIcon icon={faPen} /></a>
                                 <a href={`/api/gastos/${usuario}/borrar/${gasto.id}`}
                                    className="p-2 bg-red-600 hover:bg-red-800 text-white w-1/2 flex justify-center items-center  text-sm"
                                    title="Borrar"><FontAwesomeIcon icon={faTrashCan} /></a>
                              </div>
                              <span
                                 className="pb-1 text-slate-400 leading-none text-sm  text-ellipsis overflow-hidden whitespace-nowrap">
                                 {gasto.comentarios}
                              </span>
                              <span className="pb-1 text-center text-xs text-slate-400 ">
                                 {/* fechaTrim(gasto.fechaGasto) */}
                                 {gasto.fechaGasto}
                              </span>

                           </div>

                        </div>
                     ))}

                     {showModal && <TablaGastosModal
                        openModal={showModal}
                        gasto={productoSeleccionado}
                        closeModal={() => setShowModal(false)}
                     />}

                  </>
                  :
                  <p>No hay registros</p>
               :
               <div className='flex justify-center'>
                  <Loading />
               </div>

         }
      </div>

   )
}
