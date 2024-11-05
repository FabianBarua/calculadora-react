interface ExamplesProps {
  setExamplesAndCalculate: (example: {
    equation: string
    x0: number
    x1: number
    tol: number
    maxIter: number
  }) => void
}

export const Examples: React.FC<ExamplesProps> = ({
  setExamplesAndCalculate
}) => {
  return (
    <div className=' w-full '>
      <div className=' flex gap-12 flex-col sm:flex-row w-full   mx-auto'>
        <div className=' p-3 flex-shrink-0  bg-gray-900 w-full flex  flex-col gap-2 rounded-3xl text-gray-400'>
          <p className=' '>Algunos Ejemplos para probar la app</p>

          <div className=' flex justify-center items-center lg:justify-start lg:items-start gap-2'>
            <button
              onClick={() =>
                setExamplesAndCalculate({
                  equation: 'x^3 - 2*x - 5',
                  x0: 2,
                  x1: 3,
                  tol: 0.0001,
                  maxIter: 100
                })
              }
              className='bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-yellow-600 transition-colors'
            >
              x^3 - 2*x - 5
            </button>

            <button
              onClick={() =>
                setExamplesAndCalculate({
                  equation: 'x^3 - 2',
                  x0: 1,
                  x1: 2,
                  tol: 0.0001,
                  maxIter: 100
                })
              }
              className='bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-yellow-600 transition-colors'
            >
              x^3 - 2
            </button>

            <button
              onClick={() =>
                setExamplesAndCalculate({
                  equation: 'x^2 - 4',
                  x0: 1,
                  x1: 2,
                  tol: 0.0001,
                  maxIter: 100
                })
              }
              className='bg-gray-800 text-white py-2 px-4 rounded-xl hover:bg-yellow-600 transition-colors'
            >
              x^2 - 4
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
