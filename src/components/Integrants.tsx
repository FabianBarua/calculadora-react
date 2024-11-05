export const Integrants = () => {
  return (
    <div className=' p-3 sm:h-[96px] h-auto  bg-gray-900 w-full flex  flex-col gap-2 rounded-3xl text-gray-400'>
      <div className=' flex justify-between'>
        <h1>
          <strong>Método de la Secante</strong>, creado por:
        </h1>
      </div>
      <ul className=' flex gap-2 flex-wrap justify-center items-center lg:justify-start lg:items-start'>
        {['Fabian Barua', 'Andrea Aguayo', 'Adriel Duarte'].map((name, i) => (
          <li
            key={i}
            className='text-white bg-gray-800 px-3 rounded-xl py-1 text-nowrap'
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}
