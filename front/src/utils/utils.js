
// 
export const fechaTrim = function (fecha) {

   if (fecha) {
      const fechatxt = JSON.stringify(fecha).substring(0, 11).split("-").reverse().join("-").replace('"', '')
      return fechatxt
   }
};
export const difFecha = function (fecha) {

   if (fecha) {
      const antes = JSON.stringify(fecha).substring(0, 11)
      const hoy = JSON.stringify(new Date()).substring(0, 11)

      const date1 = new Date(antes);
      const date2 = new Date(hoy);

      // One day in milliseconds
      const oneDay = 1000 * 60 * 60 * 24;

      // Calculating the time difference between two dates
      const diffInTime = date2.getTime() - date1.getTime();

      // Calculating the no. of days between two dates
      const diffInDays = Math.round(diffInTime / oneDay);

      return diffInDays;
   }
}

export const fechaReverse = function (str) {
   if (str) {
      return str.split('-').reverse().join('-');
   }
}


export const chequeado = function (valorBinario) {

   if (valorBinario == 1) {
      return "value=1 checked"
   } else {
      return "value=0"
   }

}

// 
export const fechaLocale = function (local) {
   const format = (date, locale, options) => new Intl.DateTimeFormat(locale, options).format(date)
   const now = new Date()
   const fechaFinal = format(now, local, { month: '2-digit', year: 'numeric', day: '2-digit'}).replaceAll("/", "-")
   return fechaFinal
} 