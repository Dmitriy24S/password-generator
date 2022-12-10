import { describe, test } from 'vitest'
import { strengthClasses } from './StrengthStatus'

describe('StrengthStatus', () => {
  test('strengthClasses func. returns correct classes for each optionCount value', () => {
    expect(strengthClasses(0)).toBe('bg-neutral-800 border-white')
    expect(strengthClasses(1)).toBe('bg-red-500 border-transparent')
    expect(strengthClasses(2)).toBe('bg-orange-400 border-transparent')
    expect(strengthClasses(3)).toBe('bg-yellow-400 border-transparent')
    expect(strengthClasses(4)).toBe('bg-green-neon-100 border-transparent')
  })
})
