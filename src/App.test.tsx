import { fireEvent, render } from '@testing-library/react'
import { fn } from 'jest-mock'
import { describe, test } from 'vitest'
import App from './App'
import RangeSlider from './components/RangeSlider/RangeSlider'

describe('RangeSlider', () => {
  test('RangeSlider updates passwordLength on change', () => {
    const passwordLength = 10
    const setPasswordLength = fn()
    const { getByTestId } = render(
      <RangeSlider
        passwordLength={passwordLength}
        setPasswordLength={setPasswordLength}
      />
    )
    const rangeInput = getByTestId('length slider')
    fireEvent.change(rangeInput, { target: { value: 12 } })
    expect(setPasswordLength).toHaveBeenCalledWith(12)
  })

  test("RangeSlider updates the input element's value when passwordLength prop changes", () => {
    const passwordLength = 10
    const setPasswordLength = fn()
    const { getByTestId, rerender } = render(
      <RangeSlider
        passwordLength={passwordLength}
        setPasswordLength={setPasswordLength}
      />
    )
    const rangeInput = getByTestId('length slider') as HTMLInputElement
    expect(rangeInput.value).toBe(String(passwordLength))
    rerender(<RangeSlider passwordLength={12} setPasswordLength={setPasswordLength} />)
    expect(rangeInput.value).toBe(String(12)) // TODO: Number or String  input value / state?
  })
})
