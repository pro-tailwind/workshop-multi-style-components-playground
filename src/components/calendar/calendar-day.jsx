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

  // Defining an Enum of the possible availability statuses
  const availabilityStatuses = Object.freeze({
    DISABLED: 'DISABLED',
    NO_VACANCY: 'NO_VACANCY',
    TODAY_NO_VACANCY: 'TODAY_NO_VACANCY',
    VACANCY: 'VACANCY',
    SELECTED: 'SELECTED',
  })

  const baseClasses =
    'relative w-12 max-w-full aspect-square rounded-full grid place-items-center focus:outline-none focus:ring focus:ring-offset-1 focus:ring-indigo-400'

  // Enum-based style lookup object
  const availabilityStatusClasses = {
    [availabilityStatuses.DISABLED]: 'text-gray-300 pointer-events-none',
    [availabilityStatuses.NO_VACANCY]: 'text-gray-900 hover:bg-gray-100',
    [availabilityStatuses.TODAY_NO_VACANCY]: 'text-indigo-600 font-bold hover:bg-gray-100',
    [availabilityStatuses.VACANCY]: 'bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200',
    [availabilityStatuses.SELECTED]: 'bg-indigo-600 text-white font-bold bg-stripes',
  }

  // Helper to gather the actual status
  function getAvailibilityStatus() {
    if (isDisabled) return availabilityStatuses.DISABLED
    if (isSelected) return availabilityStatuses.SELECTED
    if (!hasAvailability) {
      return isToday(date) ? availabilityStatuses.TODAY_NO_VACANCY : availabilityStatuses.NO_VACANCY
    }
    return availabilityStatuses.VACANCY
  }

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={cx(
          baseClasses,
          availabilityStatusClasses[getAvailibilityStatus()]
          // calendarClasses.base,
          // isSelected && calendarClasses.selected,
          // isDisabled && calendarClasses.disabled,
          // isToday(date) && !isSelected && calendarClasses.today,
          // hasAvailability && !isDisabled && !isSelected && calendarClasses.hasAvailability,
          // !hasAvailability &&
          //   !isToday(date) &&
          //   !isDisabled &&
          //   !isSelected &&
          //   calendarClasses.candidate
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
