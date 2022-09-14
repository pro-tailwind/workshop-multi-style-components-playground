import React from 'react'
import { cx } from '../../utils'

// ------------------------------
// Tailwind Classes lookup directory
// ------------------------------
const baseClasses =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50'

/*
  ------------------------------
  1. Populate the `impactClasses` lookup object below.
  This object should have a key for each possible `impact` value,
  and the key should mirror the prop value.
  ------------------------------
*/
const impactClasses = {}

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
        2. Add the appropriate `impactClasses` values to the 
        className attribute below.
        The `cx()` function imported at the top will merge
        a series of comma separated inputs!
        ------------------------------
      */
      className={baseClasses}
    />
  )
}

export default Button
