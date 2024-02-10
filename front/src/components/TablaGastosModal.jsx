import { useEffect, useRef } from "react";

export default function TablaGastosModal({ gasto, closeModal, openModal }) {

   const ref = useRef();


   useEffect(() => {
      if (openModal) {
         ref.current?.showModal();
      } else {
         ref.current?.close();
      }
   }, [openModal]);

   return (

      <dialog 
         id={`id${gasto.id}`} 
         className="p-5" 
         // open={showModal} 
         // onClose={cerrar}
         ref={ref}
         onCancel={closeModal}
      >
         <p className="text-3xl text-sky-500">
            {gasto.item}
         </p>
         <strong className="text-2xl inline-block leading-none">
            {new Intl.NumberFormat('es-AR', {
               roundingMode: 'trunc',
               style: 'currency', currency: 'ARS',
               roundingPriority: "morePrecision"
            }).format(gasto.importe)}
         </strong>
         <small className="text-uppercase block mb-3">Hace {/*difFecha(gasto.fechaGasto)*/} días</small>
         <div className="flex">
            <div className="pr-2">
               <ul>
                  <li>Rubro: {gasto.rubro}
                  </li>
                  <li>Moneda: {gasto.moneda}
                  </li>
                  <li>Aporte: <strong>{gasto.aporte == 1 ? "si" : "no"
                  }</strong>
                  </li>
                  <li>Gasto Fijo: {gasto.gastoFijo == 1 ? "si" : "no"}</li>
               </ul>
            </div>
            <div className="border-l border-black pl-2">
               <ul>
                  <li>Tipo de pago: <strong>
                     {gasto.tipoPago}
                  </strong></li>
                  <li>Fecha: {/* fechaTrim(gasto.fechaGasto) */}
                  </li>
                  <li>Año: {gasto.year}
                  </li>
                  <li>Usuario: {gasto.usuario}
                  </li>
               </ul>
            </div>
         </div>
         <hr />
         <ul>
            <li>Comentarios: {gasto.comentarios}
            </li>
         </ul>
         <button 
            // </dialog>onClick={cerrar} 
            className="btn-primary-inverse mt-3"
            onClick={closeModal}
         >Cerrar</button>

      </dialog>
   )
}
