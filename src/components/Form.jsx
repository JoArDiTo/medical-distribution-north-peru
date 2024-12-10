import React, { useState } from 'react';
import { CITIES } from '@constants/data.ts';
import { DetailData } from '@components/DetailData';

export const Form = ({ val }) => {
  const [selectedCities, setSelectedCities] = useState(Array(val).fill(''));
  const [isSelectEspecific, setIsSelectEspecific] = useState(false);

  const handleSelectChange = (index, event) => {
    const newSelectedCities = [...selectedCities];
    newSelectedCities[index] = event.target.value;
    setSelectedCities(newSelectedCities);
  };

  return (
    <>
      <form className='w-full flex flex-col items-center pt-12'>
        <label className='pb-3'>Nombra los {val} puntos:</label>
        {
          Array.from({ length: val }).map((_, index) => (
            <select
              key={index}
              className="mb-2 p-2 border border-gray-300 rounded-lg w-64"
              value={selectedCities[index]}
              onChange={(event) => handleSelectChange(index, event)}
            >
              <option value="">Selecciona un punto</option>
              {
                CITIES.filter(city => !selectedCities.includes(city) || selectedCities[index] === city).map((city, cityIndex) => (
                  <option key={cityIndex} value={city}>
                    {city}
                  </option>
                ))
              }
            </select>
          ))
        }
        <button 
          className='text-white px-6 py-2 mt-5 rounded-lg bg-green-500 transition hover:scale-110 hover:bg-green-700'
          onClick={(e) => {e.preventDefault(); setIsSelectEspecific(true)}}
        >
          Especificar parámetros
        </button>
      </form>
      {
        isSelectEspecific && <DetailData cities={selectedCities} />
      }
    </>
  );
};