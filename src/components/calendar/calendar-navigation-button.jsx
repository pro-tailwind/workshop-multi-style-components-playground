import { useRef } from 'react'
import { useButton } from 'react-aria'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

export function CalendarNavigationButton(props) {
  let ref = useRef()
  let { buttonProps } = useButton(props, ref)

  const direction = buttonProps['aria-label']

  return (
    <button
      ref={ref}
      {...buttonProps}
      className="grid aspect-square w-12 max-w-full place-items-center rounded-full border border-slate-300 text-slate-400 hover:text-indigo-600 disabled:border-slate-200 disabled:text-slate-300 disabled:hover:text-slate-300"
    >
      {direction === 'Previous' ? (
        <ChevronLeftIcon className="-ml-0.5 h-6 w-6" />
      ) : (
        <ChevronRightIcon className="ml-0.5 h-6 w-6" />
      )}
    </button>
  )
}
