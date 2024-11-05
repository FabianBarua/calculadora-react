/* eslint-disable @typescript-eslint/no-explicit-any */
import { Delete } from 'lucide-react'
import { useRef, useState } from 'react'
import { specialButtons } from './utils/constants'

import {
  handleCalculateProps,
  setExamplesAndCalculateProps,
  stepsProps
} from './utils/types'

import { useMath } from './hooks/useMath'
import { Integrants } from './components/Integrants'
import { Examples } from './components/Examples'

function App () {
  const [equation, setEquation] = useState('')
  const [result, setResult] = useState('')
  const [steps, setSteps] = useState<stepsProps[]>([])

  // useRefs
  const x0Ref = useRef<HTMLInputElement>(null)
  const x1Ref = useRef<HTMLInputElement>(null)
  const tolRef = useRef<HTMLInputElement>(null)
  const maxIterRef = useRef<HTMLInputElement>(null)

  const { secantMethod, buscarIntervalos, parseEquation } = useMath()

  const handleCalculate = ({
    equation,
    x0,
    x1,
    tol,
    maxIter
  }: handleCalculateProps) => {
    try {
      const f = parseEquation(equation)
      if (x0 === 0 && x1 === 0) {
        const intervalos = buscarIntervalos(f, -10, 10, 0.5)
        if (intervalos.length > 0) {
          x0 = intervalos[0].x0
          x1 = intervalos[0].x1
        } else {
          throw new Error('No se encontraron intervalos con cambios de signo.')
        }
      }

      const { root, steps } = secantMethod({ f, x0, x1, tol, maxIter })
      setResult(`${root.toFixed(6)}`)
      setSteps(steps)
    } catch (error) {
      if (error instanceof Error) {
        setResult(error.message)
      } else {
        setResult('An unknown error occurred')
      }
    }
  }

  const handleClear = () => {
    x0Ref.current!.value = ''
    x1Ref.current!.value = ''
    tolRef.current!.value = ''
    maxIterRef.current!.value = ''

    setEquation('')
    setResult('')
  }

  const addToEquation = (value: string) => {
    setEquation((prevEquation: string) => {
      const input = document.getElementById('equation') as HTMLInputElement
      const cursorPosition: number | null = input.selectionStart

      if (cursorPosition === null) {
        return prevEquation + value
      }

      const leftSide: string = prevEquation.slice(0, cursorPosition)
      const rightSide: string = prevEquation.slice(cursorPosition)

      return leftSide + value + rightSide
    })

    const input = document.getElementById('equation') as HTMLInputElement
    input.focus()
  }

  const handleInputChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value
    setEquation(inputValue)
  }

  const handleBackspace = () => {
    setEquation((prevEquation: string) => prevEquation.slice(0, -1))
  }

  const setExamplesAndCalculate = ({
    equation,
    x0,
    x1,
    tol,
    maxIter
  }: setExamplesAndCalculateProps) => {
    const init = async () => {
      setEquation(equation)

      x0Ref.current!.value = x0.toString()
      x1Ref.current!.value = x1.toString()
      tolRef.current!.value = tol.toString()
      maxIterRef.current!.value = maxIter.toString()

      handleCalculate({
        equation,
        x0,
        x1,
        tol,
        maxIter
      })
    }

    init()
  }

  return (
    <>
      <div className=' relative bg-gray-950  min-h-dvh w-dvw flex  flex-col lg:flex-row gap-4 justify-center items-center p-2 lg:p-6 '>
        <div className=' flex flex-col gap-4'>
          <Integrants />

          <div className=' max-w-xl w-full   bg-gray-900 p-6 rounded-3xl lg:h-[435px] '>
            <div className=' w-full flex items-center p-3 h-12 rounded-xl  text-gray-200/50  font-mono bg-gray-800'>
              Resultado:{' '}
              <span className=' ml-2 text-white'>
                {result || 'Aun no se ha calculado'}{' '}
              </span>
            </div>

            <hr className=' my-4 border-gray-700' />

            {/* Campo de texto para ingresar la ecuación */}
            <div className=' flex gap-2   h-12 '>
              <input
                id='equation'
                type='text'
                value={equation}
                onChange={handleInputChange}
                className=' w-full bg-gray-800 p-3 rounded-xl text-gray-200  font-mono'
                placeholder='Ingresa tu ecuación aquí'
              />

              <button
                onClick={handleBackspace}
                className=' bg-gray-800  hover:bg-yellow-900 transition-colors active:bg-yellow-600 size-12 shrink-0 rounded-xl text-white flex justify-center items-center '
              >
                <Delete />
              </button>
            </div>

            {/* Botones especiales */}

            <div className=' flex gap-1 mt-4 w-full flex-wrap justify-center'>
              {specialButtons.map((button, i) => (
                <button
                  key={button.key + i}
                  onClick={() => addToEquation(button.key)}
                  className=' bg-gray-700 hover:bg-yellow-900 transition-colors active:bg-yellow-600 size-10 shrink-0 rounded-xl text-white flex justify-center items-center'
                >
                  {button.label}
                </button>
              ))}
            </div>

            <div className=' flex justify-between flex-col sm:flex-row  gap-2 mt-4'>
              <div className=' flex flex-col  gap-2 export interface w-full'>
                <div className=' flex justify-between gap-2'>
                  <label
                    htmlFor='x0'
                    className=' outline-none bg-gray-800/50  py-2 pl-3  pr-7 rounded-xl  font-medium  text-gray-500 inline-block '
                  >
                    X0:
                  </label>
                  <input
                    id='x0'
                    ref={x0Ref}
                    className=' w-full p-2 text-center bg-gray-800 rounded-xl text-gray-200'
                  />
                </div>

                <div className=' flex justify-between gap-2'>
                  <label
                    htmlFor='x1'
                    className=' outline-none bg-gray-800/50  py-2 pl-3  pr-7 rounded-xl  font-medium  text-gray-500 inline-block '
                  >
                    X1:
                  </label>
                  <input
                    id='x1'
                    ref={x1Ref}
                    className=' w-full p-2 text-center bg-gray-800 rounded-xl text-gray-200'
                  />
                </div>
              </div>

              <div className=' gap-2 flex flex-col  w-full  '>
                <div className=' w-full flex  gap-2'>
                  <label
                    htmlFor='tol'
                    className=' w-min outline-none bg-gray-800/50  py-2 pl-3  pr-7 rounded-xl  font-medium  text-gray-500 inline-block '
                  >
                    Tolerancia:
                  </label>
                  <input
                    id='tol'
                    ref={tolRef}
                    className='  p-2 text-center w-full bg-gray-800 rounded-xl text-gray-200'
                  />
                </div>

                <div className=' flex gap-2  justify-between w-full'>
                  <label
                    htmlFor='maxIter'
                    className=' outline-none bg-gray-800/50  py-2 pl-3  pr-10 rounded-xl   font-medium  text-gray-500 inline-block  text-nowrap'
                  >
                    Máx Int.:
                  </label>
                  <input
                    id='maxIter'
                    ref={maxIterRef}
                    className='  w-full p-2 text-center  bg-gray-800 rounded-xl text-gray-200'
                  />
                </div>
              </div>
            </div>

            <div className=' flex gap-4 mt-4'>
              <button
                onClick={() =>
                  handleCalculate({
                    equation,
                    x0: parseFloat(x0Ref.current!.value),
                    x1: parseFloat(x1Ref.current!.value),
                    tol: parseFloat(tolRef.current!.value),
                    maxIter: parseInt(maxIterRef.current!.value)
                  })
                }
                className=' w-full bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-yellow-600 transition-colors'
              >
                Calcular Raíz
              </button>

              <button
                onClick={handleClear}
                className=' w-full bg-red-950/50 text-white py-2 px-4 rounded-xl hover:export interface transition-colors'
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        <div className=' flex flex-col gap-4 w-full   max-w-xl'>
          <Examples setExamplesAndCalculate={setExamplesAndCalculate} />

          <div className=' lg:h-[435px]  relative no-scrollbar  max-w-xl overflow-auto scroll w-full  bg-gray-900  rounded-3xl p-5'>
            <h3 className='text-center  text-gray-400'>
              Pasos de la Iteración
            </h3>
            <table className='w-full text-gray-400  mt-3'>
              <thead className=' bg-gray-800 sticky top-9 rounded-xl overflow-hidden'>
                <tr className=' text-center'>
                  <th className=' w-5'>Iteración</th>
                  <th className='  text-right'>x0</th>
                  <th className='  text-right'>x1</th>
                  <th className='  text-right'>x2</th>
                  <th className='  text-right'>f(x0)</th>
                  <th className='  text-right'>f(x1)</th>
                </tr>
              </thead>
              <tbody className=' h-full  overflow-auto'>
                {steps.map((step, index) => (
                  <tr key={index}>
                    <td className='  text-center'>{step.iteration}</td>
                    <td className='  text-right'>{step.x0}</td>
                    <td className='  text-right'>{step.x1}</td>
                    <td className='  text-right'>{step.x2}</td>
                    <td className='  text-right'>{step.f0}</td>
                    <td className='  text-right'>{step.f1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
