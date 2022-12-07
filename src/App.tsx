import { FormEvent, useEffect, useState } from 'react'
import iconArrowRight from './assets/images/icon-arrow-right.svg'
import iconCopy from './assets/images/icon-copy.svg'
import './checkbox.css'
import './slider.css'

function App() {
  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState('P4$5W0rD!')
  const [passwordStrenght, setpasswordStrenght] = useState('') // strength message
  const [optionsCount, setOptionsCount] = useState(2) // keep track to update strength message + style
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%&*_+'
  let allowedOptions: string[] = []

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('sumit', e.target)
    generatePassword()
  }

  const getRandomCharacter = (string: string) => {
    const randomNumber = Math.floor(Math.random() * string.length)
    console.log({ randomNumber })
    console.log('generated:', string[randomNumber]) // e.g.: generated: V
    return string[randomNumber]
  }

  // Generate string of all allowed characters from selected options (checkboxes)
  const generateAllowedCharactersString = () => {
    console.log('generating allowed characters string')
    if (includeUppercase) {
      allowedOptions.push(uppercaseLetters)
    } else {
      allowedOptions.filter((option: string) => option !== uppercaseLetters)
    }
    if (includeLowercase) {
      allowedOptions.push(lowercaseLetters)
    } else {
      allowedOptions.filter((option: string) => option !== lowercaseLetters)
    }
    if (includeNumbers) {
      allowedOptions.push(numbers)
    } else {
      allowedOptions.filter((option: string) => option !== numbers)
    }
    if (includeSymbols) {
      allowedOptions.push(symbols)
    } else {
      allowedOptions.filter((option: string) => option !== symbols)
    }
  }

  const generatePassword = () => {
    // exit if none of options are selected
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      console.log('please check atleast 1')
      return
    }

    console.log('generating password...')
    generateAllowedCharactersString() // generate string of all allowed characters from selected options (checkboxes)

    let tempPassword = ''

    for (let index = 0; index < passwordLength; index++) {
      // shuffle all allowed characters string
      const shuffledAllowedOptionsString = allowedOptions
        .join('')
        .split('')
        .sort(function () {
          return 0.5 - Math.random()
        })
        .join('')
      console.log({ shuffledAllowedOptionsString }) // e.g. 'MT5B8CYV_+*W@%PROF0K9XI!Z2DUJ7L34&HS#1$QENAG6'

      tempPassword += getRandomCharacter(shuffledAllowedOptionsString) // add random character
    }
    console.log({ tempPassword })

    // If temp password does not include symbol - (failed to randomly put symbol from shuffledAllowedOptionsString) // TODO: refactor?
    if (includeSymbols) {
      if (![...symbols].some((element) => tempPassword.includes(element))) {
        console.log('no symbols in password')
        const randomIndexForPasswordLetter = Math.floor(
          Math.random() * tempPassword.length
        )
        const randomIndexForSymbol = Math.floor(Math.random() * symbols.length)
        const randomSymbol = symbols[randomIndexForSymbol]
        // replace random letter with random symbol:
        tempPassword =
          tempPassword.substring(0, randomIndexForPasswordLetter) +
          randomSymbol +
          tempPassword.substring(randomIndexForPasswordLetter + 1)
      }
    }
    console.log({ tempPassword })
    console.log('length:', tempPassword.length) // length: 10
    setPassword(tempPassword)
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

      // Set password strength status message:
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
        return 'bg-[#a4ffaf] border-transparent'
        break
      default:
        break
    }
  }

  // Update slider progress bar:
  // ! updates with delay? visible overflwo with range input thumb:
  // const [sliderProgress, setSliderProgress] = useState(50)
  // useEffect(() => {
  //   const tempSliderProgress = ((passwordLength - 10) / (20 - 10)) * 100
  //   console.log({ tempSliderProgress }) // 0% 50% 100%
  //   setSliderProgress(tempSliderProgress)
  // }, [passwordLength])
  // ! better?:
  const sliderProgress = ((passwordLength - 10) / (20 - 10)) * 100

  return (
    <div className='App flex place-items-center min-h-screen min-w-full bg-gradient-to-b from-[#14131b] to-[#08070b] text-[#e6e5ea]'>
      <div className='generator w-full max-w-[400px] sm:max-w-[550px] mx-auto'>
        <h1 className='text-2xl'>Password Generator</h1>

        <form className='flex flex-col gap-4 sm:gap-6 mt-8' onSubmit={handleSubmit}>
          {/* Password */}
          <div className='input relative'>
            <div
              className={[
                'w-full bg-[#24232c] p-4 sm:p-8 sm:py-5 text-2xl text-left break-words h-auto pr-12',
                password === 'P4$5W0rD!' ? 'text-stone-400' : 'text-white'
              ].join(' ')}
            >
              {password}
            </div>
            <button
              type='button'
              className='absolute top-2/4 -translate-y-2/4 right-4 sm:right-8'
            >
              {/* // TODO: svg hover:bg-[#80ff8f] focus-visible:bg-[#80ff8f] */}
              <img src={iconCopy} alt='copy password' />
            </button>
          </div>
          {/* Options */}
          <div className='flex flex-col items-start p-4 sm:p-8 bg-[#24232c] gap-8 '>
            <div className='character length w-full flex flex-col gap-5'>
              <div className='flex justify-between items-center w-full'>
                <label htmlFor='length-slider' className='text-xl font-bold'>
                  Character Length
                </label>
                <span className='text-[#a4ffaf] text-2xl sm:text-3xl'>
                  {passwordLength}
                </span>
              </div>
              {/* Slider */}
              <div className='slider-container relative flex items-center group'>
                <input
                  type='range'
                  name='length slider'
                  id='length-slider'
                  className='w-full appearance-none h-2 bg-[#18171f] cursor-pointer'
                  value={passwordLength}
                  min={10}
                  max={20}
                  step={1}
                  onChange={(e) => setPasswordLength(Number(e.target.value))}
                />
                <div
                  className='slider-progress-bar absolute top-0 bottom-0 left-0 h-2 my-auto w-full bg-[#a4ffaf] pointer-events-none group-hover:bg-[#80ff8f]'
                  style={{ width: sliderProgress + '%' }}
                />
              </div>
            </div>
            {/* Checkboxes */}
            <div className='options flex flex-col gap-4 text-left'>
              <div className='flex gap-5 relative items-center'>
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
                <span className='checkmark pointer-events-none absolute'></span>
                <label htmlFor='uppercase-checkbox' className='cursor-pointer'>
                  Include uppercase letters
                </label>
              </div>
              <div className='flex gap-5 relative items-center'>
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
                <span className='checkmark pointer-events-none absolute'></span>
                <label htmlFor='lowercase-checkbox' className='cursor-pointer '>
                  Include lowercase letters
                </label>
              </div>
              <div className='flex gap-5 relative items-center'>
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
                <span className='checkmark pointer-events-none absolute'></span>
                <label htmlFor='numbers-checkbox' className='cursor-pointer'>
                  Include numbers
                </label>
              </div>
              <div className='flex gap-5 relative items-center cursor-pointer'>
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
                <span className='checkmark pointer-events-none absolute'></span>
                <label htmlFor='symbols-checkbox' className='cursor-pointer'>
                  Include symbols
                </label>
              </div>
            </div>
            {/* Strength */}
            <div className='strength flex justify-between w-full items-center bg-[#18171f] p-4 px-6 flex-col gap-4 sm:flex-row text-center'>
              <span className='uppercase text-[#817d92]'>Strength</span>
              <div className='strength-indicator flex gap-2 items-center'>
                <div className='uppercase mr-2 font-bold text-xl'>{passwordStrenght}</div>
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
            {/* Generate button */}
            <button
              type='submit'
              className='generate-btn bg-[#a4ffaf] text-[#24232c] uppercase relative flex gap-4 items-center justify-center p-4 w-full text-lg font-bold group hover:bg-[#80ff8f] focus-visible:bg-[#80ff8f] transition-colors'
            >
              Generate
              <img
                src={iconArrowRight}
                alt='arrow pointing right'
                className='group-hover:translate-x-1.5 group-focus:translate-x-1.5 transition-transform'
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
