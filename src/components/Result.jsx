export const Result = ({ route, fitness }) => {
  return (
    <div className='flex flex-col items-center text-center'>
      <h3 className='text-lg font-bold my-5'>RESULTADOS</h3>
      <div className='border border-black p-4 rounded-lg bg-white bg-opacity-70'>
        <h4 className='font-bold'>RUTA MÁS OPTIMA</h4>
        <p className="text-lg lg:text-2xl">{route.join(' > ')}</p>
      </div>
      <div className='border border-black p-4 rounded-lg mt-4 bg-white bg-opacity-70'>
        <h4 className='font-bold'>FITNESS</h4>
        <p className="text-lg lg:text-2xl">{fitness}</p>
      </div>
    </div>
  );
}