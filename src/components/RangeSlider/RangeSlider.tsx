import React from 'react'
import './slider.css'

interface Props {
  passwordLength: number
  setPasswordLength: React.Dispatch<React.SetStateAction<number>>
}

const RangeSlider = (props: Props) => {
  const { passwordLength, setPasswordLength } = props

  // Update slider progress bar:
  // ! v1: updates with delay? visible overflwo with range input thumb:
  // const [sliderProgress, setSliderProgress] = useState(50)
  // useEffect(() => {
  //   const tempSliderProgress = ((passwordLength - 10) / (20 - 10)) * 100
  //   console.log({ tempSliderProgress }) // 0% 50% 100%
  //   setSliderProgress(tempSliderProgress)
  // }, [passwordLength])
  // ! v2: better?:
  const sliderProgress = ((passwordLength - 10) / (20 - 10)) * 100

  return (
    <>
      <div className='character length w-full flex flex-col gap-5'>
        <div className='flex justify-between items-center w-full'>
          <label htmlFor='length-slider' className='text-base sm:text-xl font-bold'>
            Character Length
          </label>
          <span
            className='text-green-neon-100 text-2xl sm:text-3xl'
            data-testid='password length'
          >
            {passwordLength}
          </span>
        </div>
        {/* Slider */}
        <div className='slider-container relative flex items-center group'>
          <input
            type='range'
            name='length slider'
            id='length-slider'
            data-testid='length slider'
            className='w-full appearance-none h-2 bg-gray-dark cursor-pointer'
            value={passwordLength}
            min={10}
            max={20}
            step={1}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
          />
          <div
            className='slider-progress-bar absolute top-0 bottom-0 left-0 h-2 my-auto w-full bg-green-neon-100 pointer-events-none group-hover:bg-green-neon-200'
            style={{ width: sliderProgress + '%' }}
          />
        </div>
      </div>
    </>
  )
}

export default RangeSlider
