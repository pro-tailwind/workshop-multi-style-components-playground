import React from 'react'
import { cx } from '../utils'

// ------------------------------
// Prop types
// ------------------------------
type ButtonProps = {
  size?: 'small' | 'medium' | 'large'
  impact?: 'bold' | 'light' | 'none'
  shape?: 'square' | 'rounded' | 'pill'
}

// ------------------------------
// Tailwind Classes lookup directory
// ------------------------------
const baseClasses =
  'font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50'

const impactClasses: Record<ButtonProps['impact'], string> = {
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
