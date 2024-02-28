import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import MensajeError from '../components/MensajeError.jsx'
import { rubros } from "../utils/rubros";
import { AuthContext } from "../context/AuthContext.js";
import { fechaLocale } from "../utils/utils.js";
import { addGastoPOST } from "../../api/calls.js";


const AgregarGasto = () => {

   const { usuario } = useContext(AuthContext);

   const [checkAporte, setCheckAporte] = useState(false);
   const [checkGastoFijo, setCheckGastoFijo] = useState(false);

   // react hook form
   const {
      handleSubmit,
      reset,
      register,
      formState: { errors, isSubmitSuccessful },
   } = useForm();

   const onSubmit = data => {
      data.usuario = usuario
      addGastoPOST(data)
   };


   // tomar a año y ponerlo en input hidden
   let year = new Date().getFullYear()

   return (
      <div className="sm:container mx-auto">

       
         {!isSubmitSuccessful ? (
            <form onSubmit={handleSubmit(onSubmit)} >

               <h2 className="text-center text-2xl uppercase text-slate-500 font-bold">
                  Básico
               </h2>

               <>
                  <section className="bg-slate-50 rounded-[15px] p-5 pb-[20px] mb-[10px] m-2">
                     {/* fila 1 LO BASICO */}
                     <div className="flex flex-wrap mb-3">


                        {/*  ITEM */}
                        <div className="w-full md:w-3/12 md:px-3">
                           <label
                              htmlFor="item"
                              className="mb-3 inline-block text-orange-500 font-bold  uppercase text-sm"
                           >
                              Nombre item
                           </label>
                           <input
                              type="text"
                              name="item"
                              id="item"
                              placeholder="Ej: Supermercado Dia"
                              className="form-campo"
                              {...register("item", { required: true })}
                           />
                           {errors.item && <MensajeError mensaje="¿en qué gastaste?" />}
                        </div>

                        {/* IMPORTE */}
                        <div className="w-1/2 md:w-3/12 mt-3 md:mt-0 md:px-3">
                           <label htmlFor="importe" className="mb-3 inline-block text-orange-500 font-bold  uppercase text-sm">
                              Importe
                           </label>
                           <input
                              type="number"
                              name="importe"
                              id="importe"
                              className="form-campo"
                              placeholder="Ej: 1000"
                              pattern="[0-9]+.[0-9]{2}\g"
                              step=".01"
                              {...register("importe", { required: true })}

                           />
                           {errors.importe && <MensajeError mensaje="No debe tener ni signo de $ ni coma" />}
                        </div>

                        {/* CHECKBOX APORTE */}
                        <div className="w-1/2 md:w-3/12 mt-3 md:px-3">
                           <label
                              htmlFor="item"
                              className="mb-3 block text-orange-500 font-bold text-center  uppercase text-sm"
                           >
                              Aporte al hogar
                           </label>

                           <input
                              type="checkbox"
                              name="aporte"
                              id="aporte"
                              className="accent-orange-500 mt-5 mx-auto block w-[30px] h-8 md:mt-2"
                              onChange={e => {
                                 setValue("aporte", e.target.checked ? 1 : 0);
                                 setCheckAporte(!checkAporte);
                              }}

                              {...register("aporte")}
                           />
                           {errors.aporte && <MensajeError mensaje="Si es gasto en común para el hogar" />}
                              </div>
                        <div className="w-1/2 md:w-3/12 mt-3 md:px-3">
                        

                           <label
                              htmlFor="item"
                              className="mb-3 block text-orange-500 font-bold text-center  uppercase text-sm"
                           >
                              Gasto Fijo
                           </label>

                           <input
                              type="checkbox"
                              name="gastoFijo"
                              id="gastoFijo"
                              className="accent-orange-500 mt-5 mx-auto block w-[30px] h-8 md:mt-2"
                              onChange={e => {
                                 setValue("gastoFijo", e.target.checked ? 1 : 0);
                                 setCheckGastoFijo(!checkGastoFijo);
                              }}

                              {...register("gastoFijo")}
                           />
                           {errors.gastoFijo && <MensajeError mensaje="Si es gasto en común para el hogar" />}
                        </div>

                        

                     </div>
                  </section>

                  <h2 className="text-center text-2xl uppercase text-slate-500 font-bold mt-7">Detalles opcionales</h2>
                  <section className="bg-slate-50 rounded-[15px] p-5 pb-[20px] mb-[10px] m-2">
                     {/* fila 2 DETALLES */}
                     <div className="flex flex-wrap mb-3">

                        {/*  RUBRO */}
                        <div className="w-full md:w-3/12 md:px-3">
                           <label htmlFor="" className="mb-3 md:my-3 inline-block text-orange-500 font-bold  uppercase text-sm">
                              Rubro
                           </label>
                           <select
                              name="rubro"
                              id="rubro"
                              className="form-campo"
                              {...register("rubro")}
                              defaultValue="Variado"
                           >
                              {rubros.map((rubro, key) => (
                                 <option value={rubro} key={key}>
                                    {rubro}
                                 </option>
                              ))}
                           </select>
                           {errors.rubro && <MensajeError mensaje="¿Qué tipo de gasto?" />}
                        </div>

                        {/* MONEDA */}
                        <div className="w-full md:w-3/12 md:px-3">
                           <label htmlFor="" className="my-3 inline-block text-orange-500 font-bold  uppercase text-sm">
                              Moneda
                           </label>
                           <select name="moneda"
                              id="moneda"
                              className="form-campo"
                              {...register("moneda")}
                           >
                              <option value="pesos"> $ (ARS)</option>
                              <option value="dolares"> u$s (DLS)</option>
                           </select>
                           {errors.moneda && <MensajeError mensaje="¿pesos o dólares?" />}
                        </div>

                        {/* FECHA */}
                        <div className="w-full md:w-3/12 md:px-3">
                           <label
                              htmlFor="fechaGasto"
                              className="my-3 inline-block text-orange-500 font-bold  uppercase text-sm"
                           >
                              Fecha de gasto
                           </label>
                           <input
                              type="date"
                              id="fechaGasto"
                              name="fechaGasto"
                              className="form-campo"
                              {...register("fechaGasto")}
                              
                              defaultValue={fechaLocale('sv')}
                           />
                           {errors.fechaGasto && <MensajeError mensaje="¿Cuando gastaste?" />}
                        </div>

                        {/* TIPO DE PAGO */}
                        <div className="w-full md:w-3/12 md:px-3 ">
                           <label htmlFor="" className="my-3 inline-block text-orange-500 font-bold  uppercase text-sm">
                              Tipo de pago
                           </label>
                           <select
                              name="tipoPago"
                              id="tipoPago"
                              className="form-campo"
                              {...register("tipoPago")}
                              defaultValue="debito"
                           >
                              <option value="efectivo">Efectivo</option>
                              <option value="debito">Tarj. Débito</option>
                              <option value="tarjeta">Tarj. Crédito</option>
                              {
                                 // 
                                 // TODO: si hay tarj credito, preguntar por cuotas
                              }
                           </select>
                           {errors.tipoPago && <MensajeError mensaje="¿Cómo pagaste?" />}


                        </div>

                        {/* COMENTARIOS  */}
                        <div className="w-full md:px-3">
                          

                           <label htmlFor="" className="my-3 inline-block text-orange-500 font-bold  uppercase text-sm">
                              Comentarios
                           </label>
                           <textarea
                              name="comentarios"
                              className="form-campo"
                              type="text"
                              rows="5"
                              placeholder="comentarios extras"
                              {...register("comentarios")}
                           >


                           </textarea>

                        </div>
                     </div>
                  </section>




                  {/* btn enviar */}
                  <div className="flex">
                     <input
                        type="submit"
                        className="btn-primary-inverse flex-grow mx-3"
                        value="Agregar gasto"
                     />
                  </div>
                  <input
                     {...register("year")}
                     type="hidden"
                     defaultValue={year}
                  />
               </>


            </form>
         ) : (
            <div className="bg-slate-50 rounded-[15px] p-5 h-fit ">
               <div className="text-xl font-semibold text-center py-4 mb-5 px-2 uppercase rounded text-emerald-600 bg-emerald-200 last:mr-0 mr-1">
                  Gasto agregado
               </div>
               <button
                  type="reset"
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold my-2 py-2 px-4 rounded w-full"
                  onClick={() => {
                     reset()
                  }}
               > Agregar otro gasto</button>

            </div>
         )}
      </div>
   )
}

export default AgregarGasto