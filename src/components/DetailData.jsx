import React, { useState } from 'react'
import { DISTANCES } from '@constants/data.ts'
import { query } from '@constants/connection.ts'
import { Result } from '@components/Result.jsx'

export const DetailData = ({ cities }) => {
  const [cityData, setCityData] = useState({})
  const [result, setResult] = useState({})

  const handleInputChange = (city, field, value) => {
    setCityData(prevState => ({
      ...prevState,
      [city]: {
        ...prevState[city],
        [field]: value
      }
    }));
  };


  async function generateJson(event) {
    event.preventDefault();

    const mapData = {};

    cities.forEach(city => {
      if (cityData[city]) {
        mapData[city] = {
          priority: parseFloat(cityData[city].priority) || 0,
          accessibility: parseFloat(cityData[city].accessibility) || 0,
          waiting_time: parseFloat(cityData[city].waiting_time) || 0,
          cost: parseFloat(cityData[city].cost) || 0
        };
      }
    });

    DISTANCES.forEach(({ origen, destino, distancia }) => {
      if (mapData[origen] && mapData[destino]) {
        mapData[origen][destino] = { distance: distancia };
        mapData[destino][origen] = { distance: distancia };
      }
    });

    const data = await query(mapData);
    console.log({mapData})
    setResult(data);
    console.log('Ruta más corta:', result.route);
    console.log('Fitness:', result.fitness);
  }

  return (
    <>
      <form className='px-3 mt-5 flex flex-col items-center' onSubmit={generateJson}>
        <h3 className='text-lg font-bold my-5'>DETALLES DEL VIAJE</h3>
        <ul className='flex flex-col gap-y-4'>
          {cities.map((city, index) => (
            city && (
              <li key={index} className='border border-black p-4 rounded-lg bg-white bg-opacity-70'>
                <h4 className='font-bold'>{city}</h4>
                <div className='grid gap-x-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                  <label className='flex flex-row lg:flex-col justify-between'>
                    <span>Prioridad:</span>
                    <input
                      type='number'
                      step='0.1'
                      className='ml-2 p-1 border rounded w-32 lg:w-auto border-black'
                      onChange={(e) => handleInputChange(city, 'priority', e.target.value)}
                    />
                  </label>
                  <label className='flex flex-row lg:flex-col justify-between'>
                    <span>Accesibilidad:</span>
                    <input
                      type='number'
                      step='0.1'
                      className='ml-2 p-1 border rounded w-32 lg:w-auto border-black'
                      onChange={(e) => handleInputChange(city, 'accessibility', e.target.value)}
                    />
                  </label>
                  <label className='flex flex-row lg:flex-col justify-between'>
                    <span>Tiempo de espera:</span>
                    <input
                      type='number'
                      step='0.1'
                      className='ml-2 p-1 border rounded w-32 lg:w-auto border-black'
                      onChange={(e) => handleInputChange(city, 'waiting_time', e.target.value)}
                    />
                  </label>
                  <label className='flex flex-row lg:flex-col justify-between'>
                    <span>Costo:</span>
                    <input
                      type='number'
                      step='0.1'
                      className='ml-2 p-1 border rounded w-32 lg:w-auto border-black'
                      onChange={(e) => handleInputChange(city, 'cost', e.target.value)}
                    />
                  </label>
                </div>
              </li>
            )
          ))}
        </ul>
        <button
          type='submit'
          className='text-white px-6 py-2 mt-5 rounded-lg bg-green-500 transition hover:scale-110 hover:bg-green-700'
          >GENERAR MEJOR RUTA</button>
      </form>
      {
        Object.keys(result).length > 0 ? <Result route={result.route} fitness={result.fitness} /> : <></>
      }
    </>
  );
};