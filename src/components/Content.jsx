import React, { useState } from 'react'
import { Form } from '@components/Form.jsx'

export const Content = () => {
  const [isShow, setIsShow] = useState(false)
  const [val, setVal] = useState(0)
  const [tempVal, setTempVal] = useState(0)

  return (
      <>
        <div className='w-full px-5 text-center flex flex-col items-center text-black'>      
          <form className='flex flex-col items-center gap-y-3'>
            <label htmlFor="name">Indicar cuántas puntos se debe distribuir medicina</label>
            <input 
              className='border-2 border-black rounded-lg w-20 py-2 pl-2'
              type="number"
              min={3}
              max={5}
              value={tempVal}
              onChange={(e) => setTempVal(e.target.value)}
              id="name"
              name="name" />
            <button 
              className='text-white px-6 py-2 rounded-lg bg-blue-500 transition hover:scale-110 hover:bg-blue-700'
              onClick={(e) => {e.preventDefault(); if(tempVal >= 3 && tempVal <= 5) { setVal(tempVal); setIsShow(true); }}}
              >ENVIAR
            </button>
          </form>
        </div>
        {
          isShow && <Form val={val} />
        }
      </>
  )
}