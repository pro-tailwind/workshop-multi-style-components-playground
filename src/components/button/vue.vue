<script setup lang="ts">
// ------------------------------
// Tailwind classes lookup inventory
// ------------------------------
const baseClasses =
  'font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'

// `size` prop possible values (auto-defines Type values)
const sizeClasses = {
  large: 'px-6 py-2.5 text-lg',
  medium: 'px-4 py-2',
  small: 'px-3 py-1 text-sm',
}

// `impact` prop possible values (auto-defines Type values)
const impactClasses = {
  bold: 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-md',
  light: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
  none: 'bg-transparent text-indigo-700 hover:bg-indigo-50',
}

// `shape` prop possible values (auto-defines Type values)
const shapeClasses = {
  square: '',
  rounded: 'rounded',
  pill: 'rounded-full',
}

interface Props {
  impact?: 'bold' | 'light' | 'none'
  size?: 'small' | 'medium' | 'large'
  shape?: 'square' | 'rounded' | 'pill'
}

let impact: Props['impact'] = 'bold'
let size: Props['size'] = 'medium'
let shape: Props['shape'] = 'rounded'
</script>

<template>
  <button
    :impact="impact"
    :size="size"
    :shape="shape"
    :class="[baseClasses, impactClasses[impact], sizeClasses[size], shapeClasses[shape]]"
  >
    <slot />
  </button>
</template>
