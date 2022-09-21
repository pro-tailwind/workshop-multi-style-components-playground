import * as React from 'react'
import { useCalendarCell } from 'react-aria'
import { isSameDay, parseDateTime, isToday, getLocalTimeZone } from '@internationalized/date'

import { cx } from '../../utils'

// ------------------------------
// Component definition
// ------------------------------
export default function CalendarDay({ state, date, bookingAvailabilities }) {
  const ref = React.useRef()
  const { cellProps, buttonProps, isSelected, isOutsideVisibleRange, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref)

  // Checking if the day is today
  const localTimezone = getLocalTimeZone()
  const isCurrentDay = isToday(date, localTimezone)

  /* 
    Our calendar has certain available, "bookable" dates.
    We create a list of days with availability, so that
    we can style those calendar days differently.
  */
  const hasAvailability = bookingAvailabilities.some((availability) =>
    isSameDay(parseDateTime(availability.startTime), date)
  )

  // ------------------------------
  // Styles lookup dictionary
  // ------------------------------
  const calendarClasses = {
    base: 'relative w-12 max-w-full aspect-square rounded-full grid place-items-center focus:outline-none focus:ring focus:ring-offset-1 focus:ring-indigo-400',
    selected: 'bg-indigo-600 text-white font-bold bg-stripes',
    disabled: 'text-slate-300 pointer-events-none',
    today: 'text-indigo-600 font-bold hover:bg-slate-100',
    hasAvailability: 'bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200',
    candidate: 'hover:bg-slate-100 text-slate-900',
  }

  return (
    // Spreading `useCalendar` props on the various elememnts...
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={cx(
          calendarClasses.base,
          isSelected && calendarClasses.selected,
          isDisabled && calendarClasses.disabled,
          isCurrentDay && !isSelected && calendarClasses.today,
          hasAvailability && !isDisabled && !isSelected && calendarClasses.hasAvailability,
          !hasAvailability &&
            !isCurrentDay &&
            !isDisabled &&
            !isSelected &&
            calendarClasses.candidate
        )}
      >
        <span>{formattedDate}</span>
        {/* Adding a "spot" below the current day */}
        {isCurrentDay && (
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
