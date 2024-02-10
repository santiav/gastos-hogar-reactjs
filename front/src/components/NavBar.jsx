import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext.js";
import { Link } from 'react-router-dom';

export default function NavBar() {


   let { usuario } = useContext(AuthContext);
  // const usuario = "test"

   return (
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-sky-500 mb-3">
         <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
               <Link className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white border-solid border-2 border-white p-3 "
                  to={`/gastos/ver/${usuario}?mes=actual`}>
                  Gastos Hogar
               </Link>
               <p className="text-white font-bold mr-auto block lg:hidden self-center">¡Hola {usuario}!</p>
               <button
                  className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none menu"
                  type="button">
                  <i className="fas fa-bars"></i>
               </button>
            </div>

            <div className="lg:flex flex-grow items-center hidden" id="example-navbar-danger">

               <ul className="flex flex-col lg:flex-row w-full items-end lg:w-auto list-none lg:ml-auto">
                  <li>
                     <Link to={`/gastos/agregar/${usuario}`}
                        className="p-2  block nav-link text-slate-200 text-sm font-bold uppercase hover:bg-white hover:text-black  transition-all rounded-[3px] duration-300">Agregar
                        Gasto</Link>
                  </li>
                  <li>
                     <Link to={`/gastos/agregar/varios/${usuario}`}
                        className="p-2  block nav-link text-slate-200 text-sm font-bold uppercase hover:bg-white hover:text-black  transition-all rounded-[3px] duration-300">Agregar
                        Gastos</Link>
                  </li>
                  <li>
                     <Link className="p-2  block nav-link text-slate-200 text-sm font-bold uppercase hover:bg-white hover:text-black transition-all duration-300 rounded-[3px]"
                        to={`/gastos/ver/${usuario}?mes=actual`}>Ver Gastos</Link>
                  </li>

                  <li>
                     <Link className="p-2  block nav-link text-slate-200 text-sm font-bold uppercase hover:bg-white hover:text-black transition-all duration-300 rounded-[3px]"
                        to={`/gastos/compartidos/?mes=actual`}>aportes en común</Link>
                  </li>

               </ul>
               <p className="text-white font-bold ml-auto hidden lg:block">¡Hola {usuario}!</p>
            </div>
         </div>
      </nav>
   )
}
