import React from 'react'

// ------------------------------
// Tailwind Classes lookup directory
// ------------------------------

/*
  ------------------------------
  Let's configure the Tailwind Intellisense extension
  to also work within the `baseClasses` variable,
  as well as a few other places we'll need.
  ------------------------------
*/
const baseClasses =
  'font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50'

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
  return <button {...restProps} className={baseClasses} />
}

export default Button
