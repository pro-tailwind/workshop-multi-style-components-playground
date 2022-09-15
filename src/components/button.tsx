import React from 'react'

/*
  ------------------------------
  1. Extract the Tailwind classes common to
  all components into the `baseClasses` variable
  below
  ------------------------------
*/
const baseClasses = ''

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
        2. Add the `baseClasses` variable into the 
        className attribute below.
        ------------------------------
      */
      className=""
    />
  )
}

export default Button
