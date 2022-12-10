import { render } from '@testing-library/react'
import { describe, test } from 'vitest'
import RangeSlider from './RangeSlider'

describe('RangeSlider', () => {
  test('display the passwordLength value', () => {
    const { getByTestId } = render(
      <RangeSlider passwordLength={10} setPasswordLength={() => {}} />
    )
    const passwordLengthDisplay = getByTestId('password length')
    expect(passwordLengthDisplay.textContent).toBe('10')
  })
})
