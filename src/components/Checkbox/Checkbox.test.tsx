import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fn } from 'jest-mock'
import React, { useState } from 'react'
import { describe, test } from 'vitest'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  test('renders an checkbox with the correct attributes', () => {
    const name = 'numbers'
    const label = 'Include numbers'
    const checked = false
    const onChange = fn()
    const { getByLabelText } = render(
      <Checkbox name={name} label={label} checked={checked} onChange={onChange} />
    )
    const input = getByLabelText('Include numbers') as HTMLInputElement
    expect(input.type).toBe('checkbox')
    expect(input.name).toBe(name)
    expect(input.id).toBe(`${name}-checkbox`)
    expect(input.checked).toBe(checked)
  })

  test('invokes the onChange callback when the input/checkbox is changed', () => {
    const name = 'symbols'
    const label = 'Include symbols'
    const checked = false
    const onChange = fn()
    const { getByLabelText } = render(
      <Checkbox name={name} label={label} checked={checked} onChange={onChange} />
    )
    const input = getByLabelText(label)
    fireEvent.click(input, { target: { checked: !checked } })
    expect(onChange).toHaveBeenCalled()
  })
})
