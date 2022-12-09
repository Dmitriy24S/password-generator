import React from 'react'

interface Props {
  optionsCount: number
  passwordStrength: string
}

const StrengthStatus = (props: Props) => {
  const { optionsCount, passwordStrength } = props

  // Update password strength meter style:
  const strengthClasses = () => {
    switch (optionsCount) {
      case 0:
        return 'bg-neutral-800 border-white'
      case 1:
        return 'bg-red-500 border-transparent'
      case 2:
        return 'bg-orange-400 border-transparent'
      case 3:
        return 'bg-yellow-400 border-transparent'
      case 4:
        return 'bg-green-neon-100 border-transparent'
      default:
        break
    }
  }

  return (
    <div className='strength flex justify-between w-full items-center bg-gray-dark p-4 px-6 flex-col gap-2.5 sm:gap-4 sm:flex-row text-center'>
      <p className='uppercase text-gray'>Strength</p>
      <div className='strength-indicator flex gap-2'>
        <p className='uppercase mr-2 font-bold text-xl flex'>{passwordStrength}</p>
        {optionsCount > 0 && (
          <div className='flex gap-1 items-center'>
            {[...Array(4)].map((_el, index) => (
              <div
                key={index}
                className={[
                  'h-full w-2 border',
                  index < optionsCount ? strengthClasses() : ''
                ].join(' ')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StrengthStatus
