import { stepsProps } from '../utils/types'

export const Steps = ({ steps }: { steps: stepsProps[] }) => {
  return (
    <div className=' lg:h-[435px]  relative no-scrollbar  max-w-xl overflow-auto scroll w-full  bg-gray-900  rounded-3xl p-5'>
      <h3 className='text-center  text-gray-400'>Pasos de la Iteración</h3>
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
  )
}
