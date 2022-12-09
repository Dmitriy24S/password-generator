import React from 'react'

interface Props {
  children: React.ReactNode
  isCopied: boolean
  password: string
}

const Tooltip = ({ children, isCopied, password }: Props) => (
  <div className='group tooltip-container relative flex items-center'>
    {children}
    {/* Copy tooltip msg */}
    <div className='tooltip absolute -top-7 right-0 bg-cyan-500 min-w-max  px-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-[visibility,opacity] peer-focus-visible:visible peer-focus-visible:opacity-100'>
      {password ? 'Copy' : 'Generate password first'}
    </div>
    {/* Succesful copy tooltip msg */}
    <div
      className={[
        'tooltip absolute -top-7 right-0 bg-pink-400 w-fit px-2',
        isCopied
          ? ' visible opacity-100 '
          : 'invisible opacity-0 transition-[visibility,opacity]'
      ].join(' ')}
    >
      Copied
    </div>
  </div>
)

export default Tooltip
