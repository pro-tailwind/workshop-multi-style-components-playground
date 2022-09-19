import React from 'react'
import { cx } from '../utils'

// ------------------------------
// Tailwind Classes lookup directory
// ------------------------------
const baseClasses =
  'font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50'

const impactClasses = {
  bold: 'bg-indigo-500 text-white shadow-md hover:bg-indigo-600',
  light: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
  none: 'bg-transparent text-indigo-700 hover:bg-indigo-50',
}

/*
  ------------------------------
  1. Populate the `sizeClasses` and `shapeClasses` lookup objects below, 
  following the same approach we used for the `impactClasses` object.
  ------------------------------
*/
const sizeClasses = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-5 py-2',
  large: 'px-7 py-2.5 text-lg',
}
const shapeClasses = {
  square: '',
  rounded: 'rounded',
  pill: 'rounded-full',
}

// ------------------------------
// Possible prop values for `size`, `impact` and `shape`
// ------------------------------
interface ButtonProps extends React.ComponentProps<'button'> {
  size?: 'small' | 'medium' | 'large'
  impact?: 'bold' | 'light' | 'none'
  shape?: 'square' | 'rounded' | 'pill'
}

// ------------------------------
// Component definition (with default variants)
// ------------------------------
const Button = ({
  size = 'medium',
  impact = 'bold',
  shape = 'rounded',
  ...restProps
}: ButtonProps) => {
  return (
    <button
      {...restProps}
      /* 
        ------------------------------
        2. Add the appropriate `sizeClasses` and `shapeClasses` values to the 
        className attribute below.
        ------------------------------
      */
      className={cx(baseClasses, impactClasses[impact], sizeClasses[size], shapeClasses[shape])}
    />
  )
}

export default Button
