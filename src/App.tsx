import { FormEvent, useEffect, useState } from 'react'
import ButtonPrimary from './components/ButtonPrimary'
import Checkbox from './components/Checkbox/Checkbox'
import PasswordDisplay from './components/PasswordDisplay'
import RangeSlider from './components/RangeSlider/RangeSlider'
import StrengthStatus from './components/StrengthStatus/StrengthStatus'

function App() {
  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  // const [password, setPassword] = useState('P4$5W0rD!')
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('') // strength message
  const [optionsCount, setOptionsCount] = useState(2) // keep track to update strength message + style
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%&*_+'
  let allowedOptions: string[] = []
  const [isCopied, setIsCopied] = useState(false)

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
    // reset copied status
    setIsCopied(false)

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
    const checkPasswordStrength = () => {
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
          setPasswordStrength('SELECT AT LEAST 1')
          break
        case 1:
          setPasswordStrength('TOO WEAK!')
          break
        case 2:
          setPasswordStrength('WEAK')
          break
        case 3:
          setPasswordStrength('MEDIUM')
          break
        case 4:
          setPasswordStrength('STRONG')
          break
        default:
          break
      }
    }

    checkPasswordStrength()
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  return (
    <div className='App flex sm:place-items-center min-h-screen min-w-full bg-gradient-to-b from-[#14131b] to-[#08070b] text-white-off p-4'>
      <div className='generator w-full max-w-[400px] sm:max-w-[550px] mx-auto text-center'>
        {/* Title / Header */}
        <h1
          className='text-xl sm:text-2xl text-gray cursor-pointer'
          onClick={() => location.reload()}
        >
          Password Generator
        </h1>
        {/* Form */}
        <form
          className='flex flex-col gap-4 sm:gap-6 mt-3 sm:mt-6'
          onSubmit={handleSubmit}
        >
          {/* Password */}
          <PasswordDisplay
            password={password}
            isCopied={isCopied}
            setIsCopied={setIsCopied}
          />
          {/* Options */}
          <div className='options flex flex-col items-start p-4 sm:p-8 bg-gray-medium gap-8 '>
            <RangeSlider
              passwordLength={passwordLength}
              setPasswordLength={setPasswordLength}
            />
            {/* Checkboxes */}
            <div className='checkboxes flex flex-col gap-4 text-left'>
              <Checkbox
                name='uppercase'
                label='Include uppercase letters'
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase((prev) => !prev)}
              />
              <Checkbox
                name='lowercase'
                label='Include lowercase letters'
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase((prev) => !prev)}
              />
              <Checkbox
                name='numbers'
                label='Include numbers'
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers((prev) => !prev)}
              />
              <Checkbox
                name='symbols'
                label='Include symbols'
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols((prev) => !prev)}
              />
            </div>
            {/* Password Strength */}
            <StrengthStatus
              optionsCount={optionsCount}
              passwordStrength={passwordStrength}
            />
            {/* Generate button */}
            <ButtonPrimary>Generate</ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
