import { useEffect, useState, useRef } from 'react'
import Loading from "../components/Loading.jsx"
import TablaGastosModal from './TablaGastosModal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'


export default function TablaGastos({ usuario, datos, onCambiarPagina }) {



   const [showModal, setShowModal] = useState(false);
   const [productoSeleccionado, setProductoSeleccionado] = useState(null);

   const handleShowModal = (product) => {
      setProductoSeleccionado(product);
      setShowModal(true);
   };

   return (

      <div className="table-row-group mt-5">
         {

            datos.datos
               ?
               <>
                  {
                     datos.datos.length > 0
                        ?
                        <>
                        {datos.datos.map(gasto => (
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
                           <div className='flex justify-center mb-3'>
                             {/* Paginador */}
                              {datos.paginaActual > 1 && (
                                 <button onClick={() => onCambiarPagina(datos.paginaActual - 1)} className='px-3 hover:bg-orange-100 rounded-md underline hover:no-underline text-sky-500'>Anterior</button>
                              )}

                              {/* Numeraciones de páginas con intervalo */}
                              {Array.from({ length: datos.totalPages }, (_, index) => index + 1)
                                 .filter(numeroPagina => {
                                    const maxLeft = Math.max(datos.paginaActual - 2, 1);
                                    const maxRight = Math.min(datos.paginaActual + 2, datos.totalPages);
                                    return numeroPagina >= maxLeft && numeroPagina <= maxRight;
                                 })
                                 .map(numeroPagina => (
                                    <button
                                       key={numeroPagina}
                                       className={`px-2 ${datos.paginaActual === numeroPagina ? 'text-white transition-colors duration-150 bg-orange-500 border border-r-0 border-orange-500 rounded-md focus:shadow-outline mx-1' : 'text-orange-500 transition-colors duration-150 focus:shadow-outline hover:bg-orange-100 mx-1 rounded-md'}`}
                                       onClick={() => onCambiarPagina(numeroPagina)}
                                    >
                                       {numeroPagina}
                                    </button>
                                 ))}

                              {datos.paginaActual < datos.totalPages && (
                                 <button onClick={() => onCambiarPagina(datos.paginaActual + 1)} className='px-3 hover:bg-orange-100 rounded-md  underline hover:no-underline text-sky-500'>Siguiente</button>
                              )}
                           </div>
                        </>
                        :
                        <p className='text-center text-2xl my-3'>No hay registros</p>}

                  {showModal && <TablaGastosModal
                     openModal={showModal}
                     gasto={productoSeleccionado}
                     closeModal={() => setShowModal(false)}
                  />}

               </>
               :
               <div className='flex justify-center'>
                  <Loading />
               </div>
         }
      </div>

   )
}
