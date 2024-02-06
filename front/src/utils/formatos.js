

let fecha = new Date();

const meses = [
   "Enero",
   "Febrero",
   "Marzo",
   "Abril",
   "Mayo",
   "Junio",
   "Julio",
   "Agosto",
   "Septiembre",
   "Octubre",
   "Noviembre",
   "Diciembre",
];


// formatDate

export function formatoFecha() {
   let fechaFormateada = `${fecha.getDate()} de ${meses[fecha.getMonth()]} ${fecha.getFullYear()}`
   return fechaFormateada
};

export function formatoMes(cuando) {
   let fechaFormateada = `${meses[fecha.getMonth() + cuando]} `
   return fechaFormateada
};

export function formatoFechaRaw() {

   let fechaFormateada = fecha.toISOString().substring(0, 10); // Devuelve 2011-10-05T14: 48: 00.000Z
   // let fechaFormateada = fecha.toLocaleDateString('es-ES')
   return fechaFormateada
}

export function fechaRegistro(dia) {

   let fechaFormateada = dia.substring(0, 10)
   // return fecha.toISOString().substring(0, 10); // Devuelve 2011 - 10 - 05T14: 48: 00.000Z

   return fechaFormateada
}

// solucionar que al agregar un item, se actualice el gasto total
export const formatearMoneda = (valor) => {
   return new Intl.NumberFormat('es-AR', { roundingMode: 'trunc', style: 'currency', currency: 'ARS', roundingPriority: "morePrecision" }).format(valor)
}
