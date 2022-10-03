import React from 'react'
import { cx } from '../utils'

// ------------------------------
// Prop types
// ------------------------------
type ButtonProps = {
  size?: 'small' | 'medium' | 'large'
  impact?: 'bold' | 'light' | 'none'
  shape?: 'square' | 'rounded' | 'pill'
  /*
    Surprise! We've got an extra prop type now
  */
  tone?: 'default' | 'danger' | 'success'
}

// ------------------------------
// Tailwind Classes lookup directory
// ------------------------------
const baseClasses =
  'font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50'

/* 
  The new `tone` prop only impacts the button colors, which are
  already being handled within the `impactClasses` object.

  Notice that the type signature of the `impactClasses` object
  has now changed: it contains a **nested Record**,
  because the `tone` prop affects what color
  classes are being applied to the button.

  Update the `impactClasses` structure to satisfy its defined type.

  Here are the colors that each tone should take:

  1. 'default': same as current, keep the `indigo` color
  2. 'danger': replace `indigo` with `red` (keep the same number shades)
  3. 'success': replace `indigo` with `green` (keep the same number shades)
*/
const impactClasses: Record<ButtonProps['tone'], Record<ButtonProps['impact'], string>> = {
  bold: 'bg-indigo-500 text-white shadow-md hover:bg-indigo-600',
  light: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
  none: 'bg-transparent text-indigo-700 hover:bg-indigo-50',
}

const sizeClasses: Record<ButtonProps['size'], string> = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-5 py-2',
  large: 'px-7 py-2.5 text-lg',
}

const shapeClasses: Record<ButtonProps['shape'], string> = {
  square: '',
  rounded: 'rounded',
  pill: 'rounded-full',
}

// ------------------------------
// Component definition (with default variants)
// ------------------------------
const Button = ({
  size = 'medium',
  impact = 'bold',
  shape = 'rounded',
  tone = 'default',
  ...restProps
}: ButtonProps & React.ComponentProps<'button'>) => {
  return (
    <button
      {...restProps}
      className={cx(baseClasses, impactClasses[impact], sizeClasses[size], shapeClasses[shape])}
    />
  )
}

export default Button
