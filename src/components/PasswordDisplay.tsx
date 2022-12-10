import React, { useEffect, useState } from 'react'
import CheckSVG from '../assets/images/CheckSVG'
import CopySVG from '../assets/images/CopySVG'
import Tooltip from './Tooltip'

interface Props {
  password: string
  isCopied: boolean
  setIsCopied: React.Dispatch<React.SetStateAction<boolean>>
}

const PasswordDisplay = (props: Props) => {
  const { password, isCopied, setIsCopied } = props

  // Copy generated password:

  // const copyToClipboard = async () =>
  //   await navigator.clipboard.writeText(password).then(
  //     function () {
  //       console.log('Copy to clipboard successfully.')
  //     },
  //     function () {
  //       console.log('Copy to clipboard unsuccessfully.')
  //     }
  //   )

  const copyPasswordToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      // copyToClipboard()
      setIsCopied(true)
    }
  }

  // Reset Copy/Checkmark SVG after 1.5s timeout:
  useEffect(() => {
    let timeoutId: number
    // let timeoutId: NodeJS.Timeout | null = null;
    if (isCopied) {
      // timeoutId = +global.setTimeout(() => {
      timeoutId = window.setTimeout(() => {
        setIsCopied(false)
      }, 1500)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isCopied])

  return (
    <div className='input relative'>
      <input
        type='text'
        placeholder='P4$5W0rD!'
        className={[
          'w-full bg-gray-medium p-4 sm:p-8 sm:py-5 text-base sm:text-2xl text-left break-words h-auto pr-10 text-white placeholder:text-white-off/25 focus:outline-none focus-visible:outline-none'
        ].join(' ')}
        value={password}
        readOnly
        tabIndex={-1} // ignore readonly input on tab focus?
      />
      {/* <div
      className={[
        'w-full bg-gray-medium p-4 sm:p-8 sm:py-5 text-2xl text-left break-words h-auto pr-12',
        password === 'P4$5W0rD!' ? 'text-stone-400' : 'text-white'
      ].join(' ')}>
      {password}
      </div> */}

      {/* Button with tooltip */}
      <div className='absolute z-50 top-2/4 -translate-y-2/4 right-4 sm:right-8'>
        <Tooltip isCopied={isCopied} password={password}>
          <button
            type='button'
            aria-label='copy password'
            className='text-green-neon-100 hover:text-green-neon-200 focus-visible:text-green-neon-200 peer'
            onClick={copyPasswordToClipboard}
          >
            {/* <img src={iconCopy} alt='copy password' /> */}
            {/* <CopySVG /> */}
            {isCopied ? <CheckSVG /> : <CopySVG />}
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

export default PasswordDisplay
