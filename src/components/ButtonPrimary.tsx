import React from 'react'
import iconArrowRight from '../assets/images/icon-arrow-right.svg'

interface Props {
  children: React.ReactNode
}

const ButtonPrimary = ({ children }: Props) => {
  return (
    <button
      type='submit'
      className='generate-btn bg-green-neon-100 text-gray-medium uppercase relative flex gap-4 items-center justify-center p-4 w-full text-lg font-bold group hover:bg-green-neon-200 focus-visible:bg-green-neon-200 transition-colors'
    >
      {children}
      <img
        src={iconArrowRight}
        alt='arrow pointing right'
        className='group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 transition-transform'
      />
    </button>
  )
}

export default ButtonPrimary
