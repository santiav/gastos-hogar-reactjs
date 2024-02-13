
export const usarFiltros = (filtros, usuario) => {


   // Chequear que si no hay usuario, es para hacer consulta compartida
   const consultas = {
      whereClause: '',

   }

   if (usuario != undefined) {
      consultas.query = 'SELECT * FROM gastos WHERE usuario = ?',
         consultas.count = 'SELECT COUNT(*) as total FROM gastos WHERE usuario = ?',
         consultas.values = [usuario]
   } else {
      consultas.query = 'SELECT * FROM gastos WHERE aporte = 1',
         consultas.count = 'SELECT COUNT(*) as total FROM gastos WHERE aporte = 1',
         consultas.values = []
   }


   if (filtros.item) {
      consultas.whereClause += ` item LIKE '%${filtros.item}%' AND`;
   }

   if (filtros.rubro) {
      consultas.whereClause += ` rubro LIKE '%${filtros.rubro}%' AND`;
   }

   if (filtros.tipoPago) {
      consultas.whereClause += ` tipoPago LIKE '%${filtros.tipoPago}%' AND`;
   }

   if (filtros.aporte == 1) {
      consultas.whereClause += ` aporte = 1 AND`;
   } else if (filtros.aporte == 0) {
      consultas.whereClause += ` aporte = 0 AND`;
   }

   if (filtros.gastoFijo == 1) {
      consultas.whereClause += ` gastoFijo = 1 AND`;
   } else if (filtros.gastoFijo == 0) {
      consultas.whereClause += ` gastoFijo = 0 AND`;
   }

   if (filtros.mes == 'actual') {
      consultas.whereClause += ' MONTH(fechaGasto) = MONTH(CURDATE()) AND YEAR(fechaGasto) = YEAR(CURDATE()) AND'
   }

   if (filtros.mes == 'anterior') {
      consultas.whereClause += ' MONTH(fechaGasto) = MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) AND YEAR(fechaGasto) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) AND'
   }

   /* if (filtros.año == "actual") {
       consultas.whereClause += " YEAR(fechaGasto) = YEAR(CURDATE()) AND";
   } */

   if (filtros.ano) {
      consultas.whereClause += ` YEAR(fechaGasto) = ${filtros.ano} AND`;
   }

   if (filtros.costoMin) {
      consultas.whereClause += ' importe >= ? AND';
      consultas.values.push(parseInt(filtros.costoMin));
   }

   if (filtros.costoMax) {
      consultas.whereClause += ' importe <= ? AND';
      consultas.values.push(parseInt(filtros.costoMax));
   }



   if (consultas.whereClause !== '') {
      consultas.whereClause = ' AND' + consultas.whereClause.slice(0, -4); // Eliminar el último ' AND'
      consultas.query += consultas.whereClause;
      consultas.count += consultas.whereClause;
   }

   if (filtros.orden) {
      const orden = filtros.orden === 'desc' ? 'DESC' : 'ASC';
      consultas.query += ` ORDER BY importe ${orden}`;
   }

   // if (filtros.tamanoPagina) {
   const offset = (filtros.pagina - 1) * filtros.tamanoPagina;
   consultas.query += ` LIMIT ? OFFSET ?`;
   consultas.values.push(filtros.tamanoPagina, offset);
   // }


   return consultas

}