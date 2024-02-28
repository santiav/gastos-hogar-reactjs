

const MensajeError = ({ mensaje }) => {
   return (
      <small className="text-red-600  inline-block mt-2 p-1 f-6 d-block border-dashed   border-l-red-600 border-b-red-600 border-l-2 border-b-2">{mensaje}</small>
   )
}

export default MensajeError