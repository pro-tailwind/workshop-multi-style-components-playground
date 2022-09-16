import React from 'react'
import { useCalendarCell } from 'react-aria'
import { isSameDay, parseDateTime, isToday } from '@internationalized/date'
import cx from 'classnames'

export default function CalendarDay({ state, date, bookingAvailabilities }) {
  // React-Aria stuff
  const ref = React.useRef()
  const { cellProps, buttonProps, isSelected, isOutsideVisibleRange, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref)

  // Check if any given day has some availability
  const hasAvailability = bookingAvailabilities.some((availability) =>
    isSameDay(parseDateTime(availability.startTime), date)
  )

  const isCurrentDay = isToday(date)

  /* 
  Possible UI "states" of a calendar day: 
  NOT_ELIGIBLE | NO_VACANCY | VACANCY | TODAY_NO_VACANCY
  */

  function getEligibilityStatus() {
    if (isDisabled) return 'NOT_ELIGIBLE'
    if (!hasAvailability) {
      return isCurrentDay ? 'TODAY_NO_VACANCY' : 'NO_VACANCY'
    }
    return 'VACANCY'
  }

  const baseClasses =
    'relative w-12 max-w-full aspect-square rounded-full grid place-items-center focus:outline-none focus:ring focus:ring-offset-1 focus:ring-indigo-400'
  const selectedClasses = 'text-white bg-indigo-600 font-bold bg-stripes'

  const statusClasses = {
    NOT_ELIGIBLE: 'text-slate-300 pointer-events-none',
    NO_VACANCY: 'text-slate-800 hover:bg-slate-100',
    TODAY_NO_VACANCY: 'text-indigo-700 font-bold hover:bg-slate-100 hover:text-slate-800',
    VACANCY: 'text-indigo-700 bg-indigo-100 font-bold hover:bg-indigo-200',
  }

  const eligibilityStatus = getEligibilityStatus()

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={cx(baseClasses, isSelected ? selectedClasses : statusClasses[eligibilityStatus])}
      >
        <span>{formattedDate}</span>
        {isToday(date) && (
          <span
            className={cx(
              'absolute bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full',
              isSelected ? 'bg-white' : 'bg-indigo-600'
            )}
          ></span>
        )}
      </div>
    </td>
  )
}
