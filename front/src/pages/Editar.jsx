import { Link } from "react-router-dom";

import { difFecha, fechaReverse, fechaTrim } from '../utils/utils.js'
import { rubros } from '../utils/rubros.js'
import Loading from '../components/Loading.jsx'

export default function Editar(props) {

   const { 
      handleSubmit, 
      handleCheckboxChange, 
      handleInputChange, 
      gasto,
      actualPath
   } = props

  return (
     <>
        {
           gasto
              ?
              <main className="bg-white pb-14 container">
                 <div className="mx-5">
                    <Link to={`${actualPath}`} className="btn-primary-inverse"> Volver</Link>
                 </div>

                 <form className="container p-5" onSubmit={handleSubmit}>

                    <input type="text" className=" focus:outline-dashed focus:outline-sky-500 p-1 text-3xl text-sky-500 block w-full" value={gasto.item} name="item" onChange={handleInputChange} />

                    <span className="font-bold text-2xl">
                       {gasto.moneda == "pesos" ? "$" : "u$s"}
                    </span>
                    <input type="text" className="font-bold text-2xl focus:outline-dashed focus:outline-sky-500 p-1 inline-block " value={gasto.importe} name="importe" onChange={handleInputChange} />

                    <small className="text-uppercase block mb-3">Hace {difFecha(gasto.fechaGasto)} días</small>
                    <div className="flex justify-stretch">
                       <div className="pr-2 grow">
                          <ul>
                             <li className="my-2">Rubro:

                                <select name="rubro" id="rubro" className="focus:outline-dashed focus:outline-sky-500 p-1  inline-block bg-slate-100 rounded-md" onChange={handleInputChange} defaultValue={gasto.rubro}>
                                   {rubros.map((rubro, i) => (
                                      <option key={i} value={rubro}>
                                         {rubro}
                                      </option>
                                   ))}

                                </select>
                             </li>
                             <li className="my-2">Moneda:
                                <select name="moneda" id="moneda" className="focus:outline-dashed focus:outline-sky-500 p-1  inline-block bg-slate-100 rounded-md" onChange={handleInputChange} defaultValue={gasto.moneda}>
                                   <option value="pesos"> $ (ARS)</option>
                                   <option value="dolares"> u$s (DLS)</option>
                                </select>

                             </li>
                             <li className="my-2">Aporte:
                                <input type="checkbox" name="aporte" className="accent-orange-500  w-[30px]" checked={gasto.aporte} onChange={handleCheckboxChange} />
                             </li>
                             <li className="my-2">Gasto Fijo:

                                <input type="checkbox" name="gastoFijo" className="accent-orange-500  w-[30px]" checked={gasto.gastoFijo} onChange={handleCheckboxChange} />
                             </li>
                          </ul>
                       </div>
                       <div className="border-l border-black pl-2 grow">
                          <ul>
                             <li className="my-2">Tipo de pago:
                                <select name="tipoPago" id="tipoPago" className="focus:outline-dashed focus:outline-sky-500 p-1  inline-block bg-slate-100 rounded-md" onChange={handleInputChange} defaultValue={gasto.tipoPago}>
                                   <option value="debito">Tarj. Débito</option>
                                   <option value="efectivo">Efectivo</option>
                                   <option value="tarjeta">Tarj. Crédito</option>
                                </select>
                             </li>
                             <li className="my-2">Fecha:
                                <input type="date" id="fechaGasto" name="fechaGasto" className="focus:outline-dashed focus:outline-sky-500 p-1  inline-block bg-slate-100 rounded-md" value={fechaReverse(fechaTrim(gasto.fechaGasto))} onChange={handleInputChange} />
                             </li>
                             <li className="my-2 ">Año: <strong>{gasto.year}</strong>
                             </li>
                             <li className="my-2">Usuario: <strong>{gasto.usuario}</strong>
                             </li>
                          </ul>
                       </div>
                    </div>
                    <hr />
                    <ul>
                       <li>Comentarios: <textarea name="comentarios" className="focus:outline-dashed focus:outline-sky-500 block w-full rounded-md bg-slate-100 p-3" type="text" rows="5" onChange={handleInputChange} value={gasto.comentarios}></textarea>
                       </li>
                    </ul>
                    <input type="submit" className="btn-primary flex-grow w-full mt-2" value="Editar gasto" />

                 </form>

              </main>
              :
              <div className="flex items-center h-screen">
                 <Loading />
              </div>

        }
     </>
  )
}
