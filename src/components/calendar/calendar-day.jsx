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

  // Tailwind classes lookup
  const calendarClasses = {
    base: 'relative w-12 max-w-full aspect-square rounded-full grid place-items-center focus:outline-none focus:ring focus:ring-offset-1 focus:ring-indigo-400',
    selected: 'bg-indigo-600 text-white font-bold bg-stripes',
    disabled: 'text-gray-300 pointer-events-none',
    today: 'text-indigo-600 font-bold',
    hasAvailability: 'bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200',
    candidate: 'hover:bg-gray-100 text-gray-900',
  }

  /*
    ------------------------------
    Define a list of finite "states" or availability statuses
    a calendar day can be in (not including `selected`).
    Do this by adding a key for each status in the
    `availabilityStatuses` object below.
    
    The values can be empty strings for now!
    ------------------------------
  */
  const availabilityStatuses = {}

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        /*
          ------------------------------
          As new "edge" cases were discovered,  the
          complexity grew a little out of control 
          in the `className` attribute below.
          ------------------------------
        */
        className={cx(
          calendarClasses.base,
          isSelected && calendarClasses.selected,
          isDisabled && calendarClasses.disabled,
          isToday(date) && !isSelected && calendarClasses.today,
          hasAvailability && !isDisabled && !isSelected && calendarClasses.hasAvailability,
          !hasAvailability &&
            !isToday(date) &&
            !isDisabled &&
            !isSelected &&
            calendarClasses.candidate
        )}
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
