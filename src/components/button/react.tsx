import React from 'react'

import { cx } from '../../utils'

/* 
  ------------------------------
  Possible prop values for `size`, `impact` and `shape`
  ------------------------------
*/

interface ButtonProps extends React.ComponentProps<'button'> {
  size?: 'small' | 'medium' | 'large'
  impact?: 'bold' | 'light' | 'none'
  shape?: 'square' | 'rounded' | 'pill'
}

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
        TODO: manage multi-variant Tailwind CSS styles in the `className` attribute below
        ------------------------------
      */
      classname=""
    />
  )
}

export default Button
