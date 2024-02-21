import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import { rubros } from '../utils/rubros';
// Iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

export default function Filtros(props) {

   // Hooks
   const [filtros, setFiltros] = useState({}); // objeto con filtros aplicados
   const [mostrar, setMostrar] = useState(false)

   const { onFiltrar } = props

   // recupero el usuario del Contexto
   let { usuario } = useContext(AuthContext);

   const { register, handleSubmit, setValue } = useForm(); // react-hook-form
   const navigate = useNavigate(); // para redireccionar
   const location = useLocation();


   const handleFilters = (data) => {
      // Filtra solo los valores truthy del objeto original
      const truthyValues = Object.fromEntries(Object.entries(data).filter(([_, value]) => value));

      // Actualizar el estado local para mostrar los filtros aplicados.
      setFiltros(truthyValues);

      // Poner los query en la barra de navegación
      navigate(`?${new URLSearchParams(truthyValues).toString()}`);

      // Notificar al componente padre sobre los filtros aplicados
      onFiltrar(truthyValues);

      setMostrar(false)
   };

   // Función para mostrar los filtros aplicados visualmente
   const renderAppliedFilters = () => {
      if (Object.keys(filtros).length > 0) {
         return (
            <>
               <strong className="mx-2 text-orange-500">Filtros aplicados </strong>
               <div className="flex m-2 p-2 bg-slate-100 rounded-md">
                  <ul className="px-2 grid grid-cols-2 gap-1">
                     {filtros.mes && <li>Mes: <span className="pill-1">{filtros.mes}</span></li>}
                     {filtros.ano && <li>Año: <span className="pill-1">{filtros.ano}</span></li>}
                     {filtros.item && <li>Buscar por: <span className="pill-1">{filtros.item}</span></li>}
                     {filtros.rubro && <li>Rubro: <span className="pill-1">{filtros.rubro}</span></li>}
                     {filtros.tipoPago && <li>Tipo de pago: <span className="pill-1">{filtros.tipoPago}</span></li>}
                     {filtros.aporte == 1 && <li>Aporte: <span className="pill-1">Si</span></li>}
                     {filtros.gastoFijo == 1 && <li>Gasto fijo: <span className="pill-1">Si</span></li>}
                     {filtros.costoMin && <li>Costo mínimo: <span className="pill-1">$ {filtros.costoMin}</span></li>}
                     {filtros.costoMax && <li>Costo máximo: <span className="pill-1">$ {filtros.costoMax}</span></li>}
                     {filtros.orden && <li>Orden: <span className="pill-1">{filtros.orden}</span></li>}
                     {filtros.paginaActual && <li>Página: <span className="pill-1">{filtros.paginaActual}</span></li>}
                  </ul>
               </div>
            </>
         );
      }
      return null;
   };

// 

   
   useEffect(() => {

      // Obtener los queries actuales usando useLocation.
      const search = location.search;
      const params = new URLSearchParams(search);

      // Obtener un objeto con todos los params
      const allParams = Object.fromEntries(params);

      setFiltros(allParams)

   }, [location])


   return (
      <div className="container mx-auto">
         <aside>
           
            <h2 className="mb-2  bg-orange-500 text-white p-2 px-4 cursor-pointer rounded-xl inline-block font-bold" onClick={() => setMostrar(!mostrar)}>
               {mostrar == true ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretRight} />}  Filtrar por...
            </h2>

            <section id="filtros" className={`container m-auto md:px-4 px-2 shadow-lg ${mostrar ? 'block' : 'hidden'}`} >
               <form onSubmit={handleSubmit(handleFilters)}>

                  {/* ITEM */}
                  <div className="flex items-center py-2">
                     <label htmlFor="item" className="form-label w-1/3">Item</label>
                     <input
                        type="text"
                        name="item"
                        id="item"
                        placeholder="ej: Carnicería"
                        className="form-campo w-2/3"
                        {...register("item")}
                     />
                  </div>

                  {/* RUBRO */}
                  <div className="flex items-center py-2">
                     <label htmlFor="rubro" className="form-label w-1/3">Rubro</label>
                     <select name="rubro" id="" className="form-campo w-2/3" {...register("rubro")} defaultValue='' >
                        <option value="" disabled>Seleccionar</option>
                        {rubros.map((rubro, key) => (
                           <option value={rubro} key={key}>
                              {rubro}
                           </option>
                        ))}
                     </select>
                  </div>

                  {/* TIPO DE PAGO */}
                  <div className="flex items-center py-2">
                     <label htmlFor="tipoPago" className="form-label w-1/3">Tipo de pago</label>
                     <select name="tipoPago" id="" className="form-campo w-2/3" {...register("tipoPago")} defaultValue=''>
                        <option value="" disabled>Seleccionar</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="debito">Débito</option>
                        <option value="credito">Tarj crédito</option>
                     </select>
                  </div>

                  {/* DE ... HASTA ... */}
                  <div className="flex items-center py-2">
                     <label htmlFor="" className="form-label w-1/3">Costo</label><br />
                     <div className="flex justify-stretch w-2/3">
                        <div className="w-1/2 flex">
                           <span className="w-2/6">De</span>
                           $ <input type="text" name="costoMin" id="" className="inline-block form-campo w-3/6" placeholder="1000"
                              step=".01" {...register("costoMin")} />
                        </div>
                        <div className="w-1/2 flex">
                           <span className="w-3/6 pl-1">Hasta</span>
                           $ <input type="text" name="costoMax" id="" className="inline-block  form-campo w-3/6" placeholder="5000"
                              step=".01" {...register("costoMax")} />
                        </div>
                     </div>
                  </div>

                  {/* APORTE */}
                  <div className="flex py-2 items-center">
                     <label htmlFor="" className="form-label w-3/6">Aporte al hogar</label>

                     <div className="flex w-3/5">
                        <input
                           type="checkbox"
                           name="aporte"
                           id="aporte"
                           className="accent-orange-500  mx-auto block w-[30px] h-8 md:mt-2"
                            

                           {...register("aporte", {
                              onBlur: e => setValue("aporte", e.target.checked ? 1 : 0),
                           })}
                        />
                     </div>
                  </div>

                  {/* GASTO FIJO */}
                  <div className="flex py-2 items-center">
                     <label htmlFor="" className="form-label w-3/6">Gasto fijo</label>
                     <div className="flex w-3/5">
                        <input
                           type="checkbox"
                           name="gastoFijo"
                           id="gastoFijo"
                           className="accent-orange-500 mx-auto block w-[30px] h-8 md:mt-2"

                           {...register("gastoFijo", {
                              onBlur: e => setValue("gastoFijo", e.target.checked ? 1 : 0),
                           })}
                        />
                     </div>
                  </div>

                  <fieldset>
                     <legend className="mb-2 text-sky-500">Por tiempo</legend>
                     <div className="flex justify-stretch">
                        {/* AÑO */}
                        <div className="w-[20%]">
                           <label htmlFor="ano" className="form-label">Año</label>
                           <input type="text" name="ano" maxLength="4" placeholder="Ej: 2023" size="6" className="form-campo" {...register("ano")} />

                        </div>

                        {/* MES */}
                        <div className="w-[40%] pl-5">
                           <label htmlFor="" className="form-label">Mes</label><br />
                           <input type="radio" name="mes" id="actual" value="actual" className="h-[20px] w-[20px]" {...register("mes")} />
                           Actual<br />
                           <input type="radio" name="mes" id="actual" value="anterior" className="h-[20px] w-[20px]" {...register("mes")} />
                           Anterior
                        </div>

                        {/* ORDENAR */}
                        <div className="w-[40%]">
                           <label htmlFor="" className="form-label">Ordenar</label><br />
                           <input type="radio" name="orden" id="" value="asc" className="h-[20px] w-[20px]" {...register("orden")} />
                           Ascendente<br />
                           <input type="radio" name="orden" id="" value="desc" className="h-[20px] w-[20px]" {...register("orden")} />
                           Descendente

                        </div>
                     </div>
                  </fieldset>



                  <div className="flex justify-end mt-3 pb-2">
                     <button type="submit" className="btn-primary-inverse flex-grow mx-1">Aplicar</button>
                     <a href={`${location.pathname}`} className="btn-primary-inverse flex-grow text-center mx-1">Ver todos</a>
                  </div>

               </form>

            </section>
         </aside>

         {renderAppliedFilters()}
      </div>
   )
}
