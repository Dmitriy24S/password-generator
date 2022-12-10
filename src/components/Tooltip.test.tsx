import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { describe, test } from 'vitest'
import Tooltip from './Tooltip'

describe('Tooltip', () => {
  test('renders children', () => {
    const children = <p>This is some text inside the Tooltip.</p>
    const { getByText } = render(
      <Tooltip password='' isCopied>
        {children}
      </Tooltip>
    )
    expect(getByText('This is some text inside the Tooltip.')).toBeInTheDocument()
  })

  test('"Generate password first" tooltip is visible when no password is provided, "Copy" is hidden', () => {
    const { getByText, queryByText } = render(
      <Tooltip isCopied={false} password=''>
        <button>SVG</button>
      </Tooltip>
    )
    expect(getByText('Generate password first')).toBeVisible()
    expect(queryByText('Copy')).not.toBeInTheDocument()
  })

  test('"Copy" tooltip is visible when password is provided, "Generate password first" is hidden', () => {
    const { getByText, queryByText } = render(
      <Tooltip isCopied={false} password='1234'>
        <button>SVG</button>
      </Tooltip>
    )
    expect(getByText('Copy')).toBeVisible()
    expect(queryByText('Generate password first')).not.toBeInTheDocument()
  })

  test('displays "Copied" message when isCopied prop is true', () => {
    const { getByText } = render(
      <Tooltip isCopied={true} password='1234'>
        <button>SVG</button>
      </Tooltip>
    )
    expect(getByText('Copied')).toBeInTheDocument()
  })
})
