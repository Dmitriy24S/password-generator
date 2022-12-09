import React from 'react'
import './checkbox.css'

interface Props {
  name: string
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = (props: Props) => {
  const { name, label, checked, onChange } = props
  return (
    <div className='flex gap-5 relative items-center'>
      <input
        type='checkbox'
        name={name}
        id={`${name}-checkbox`}
        checked={checked}
        onChange={onChange}
      />
      <span className='checkmark pointer-events-none absolute'></span>
      <label htmlFor={`${name}-checkbox`} className='cursor-pointer'>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
