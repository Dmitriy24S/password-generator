import { FormEvent, useEffect, useState } from 'react'
import iconArrowRight from './assets/images/icon-arrow-right.svg'
import iconCopy from './assets/images/icon-copy.svg'

function App() {
  const [charLength, setCharLength] = useState<number>(10)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState('P4$5W0rD!')
  const [passwordStrenght, setpasswordStrenght] = useState('')
  const [optionsCount, setOptionsCount] = useState(2)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('sumit', e.target)
  }

  const generatePassword = () => {
    // TODO: logic
  }

  // Check selected password strength
  useEffect(() => {
    const checkPasswordStrenght = () => {
      let count = 0
      if (includeUppercase) count++
      if (includeLowercase) count++
      if (includeNumbers) count++
      if (includeSymbols) count++

      setOptionsCount(count)
      console.log({ count })

      switch (count) {
        case 0:
          setpasswordStrenght('SELECT AT LEAST 1')
          break
        case 1:
          setpasswordStrenght('TOO WEAK!')
          break
        case 2:
          setpasswordStrenght('WEAK')
          break
        case 3:
          setpasswordStrenght('MEDIUM')
          break
        case 4:
          setpasswordStrenght('STRONG')
          break
        default:
          break
      }
    }
    checkPasswordStrenght()
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  // Update password strength meter style:
  const strenghtClasses = () => {
    switch (optionsCount) {
      case 0:
        return 'bg-neutral-800 border-white'
        break
      case 1:
        return 'bg-red-500 border-transparent'
        break
      case 2:
        return 'bg-orange-400 border-transparent'
        break
      case 3:
        return 'bg-yellow-400 border-transparent'
        break
      case 4:
        return 'bg-green-400 border-transparent'
        break
      default:
        break
    }
  }

  return (
    <div className='App w-full max-w-[450px] mx-auto'>
      <h1 className='text-2xl'>Password Generator</h1>

      <form className='flex flex-col gap-8 mt-8' onSubmit={handleSubmit}>
        <div className='input relative'>
          <div
            className={[
              'w-full bg-slate-800 p-4 text-2xl text-left break-words h-auto pr-12',
              password === 'P4$5W0rD!' ? 'text-stone-400' : 'text-white'
            ].join(' ')}
          >
            {password}
          </div>
          <button type='button' className='absolute top-2 right-0'>
            <img src={iconCopy} alt='copy password' />
          </button>
        </div>
        <div className='options flex flex-col items-start p-4 bg-slate-800 gap-4'>
          <div className='flex justify-between items-center w-full'>
            <label htmlFor='length-slider'>Character Length</label>
            <span className='text-green-400 text-2xl'>{charLength}</span>
          </div>
          <input
            type='range'
            name='length slider'
            id='length-slider'
            className='w-full'
            value={charLength}
            min={10}
            max={20}
            step={1}
            onChange={(e) => setCharLength(Number(e.target.value))}
          />
          <div className='flex gap-5'>
            <input
              type='checkbox'
              name='uppercase'
              id='uppercase-checkbox'
              checked={includeUppercase}
              onChange={(e) => {
                console.log('clicked:', e.target.name)
                setIncludeUppercase((prev) => !prev)
              }}
            />
            <label htmlFor='uppercase-checkbox'>Include uppercase letters</label>
          </div>
          <div className='flex gap-5'>
            <input
              type='checkbox'
              name='lowercase'
              id='lowercase-checkbox'
              checked={includeLowercase}
              onChange={(e) => {
                console.log('clicked:', e.target.name)
                setIncludeLowercase((prev) => !prev)
              }}
            />
            <label htmlFor='lowercase-checkbox'>Include lowercase letters</label>
          </div>
          <div className='flex gap-5'>
            <input
              type='checkbox'
              name='numbers'
              id='numbers-checkbox'
              checked={includeNumbers}
              onChange={(e) => {
                console.log('clicked:', e.target.name)
                setIncludeNumbers((prev) => !prev)
              }}
            />
            <label htmlFor='numbers-checkbox'>Include numbers</label>
          </div>
          <div className='flex gap-5'>
            <input
              type='checkbox'
              name='symbols'
              id='symbols-checkbox'
              checked={includeSymbols}
              onChange={(e) => {
                console.log('clicked:', e.target.name)
                setIncludeSymbols((prev) => !prev)
              }}
            />
            <label htmlFor='symbols-checkbox'>Include symbols</label>
          </div>
          <div className='strength flex justify-between w-full items-center bg-neutral-800 p-4 flex-col gap-4 sm:flex-row'>
            <span className='uppercase text-stone-400'>Strength</span>
            <div className='strength-indicator flex gap-2 items-center'>
              <div className='uppercase mr-2'>{passwordStrenght}</div>
              {[...Array(4)].map((_el, index) => (
                <div
                  className={[
                    'h-8 w-2 block border',
                    index < optionsCount ? strenghtClasses() : ''
                  ].join(' ')}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='bg-green-400 text-neutral-900 uppercase relative flex gap-4 items-center justify-center py-3'
        >
          Generate
          <img src={iconArrowRight} alt='' />
        </button>
      </form>
    </div>
  )
}

export default App
