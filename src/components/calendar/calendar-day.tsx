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

  // Days with booking availability
  const hasAvailability = bookingAvailabilities.some((availability) =>
    isSameDay(parseDateTime(availability.startTime), date)
  )

  // ------------------------------
  // Styles lookup dictionary
  // ------------------------------
  const baseClasses =
    'relative w-12 max-w-full aspect-square rounded-full grid place-items-center focus:outline-none focus:ring focus:ring-offset-1 focus:ring-indigo-400'

  type Status = 'DISABLED' | 'SELECTED' | 'NO_VACANCY' | 'TODAY_NO_VACANCY' | 'VACANCY'

  const statusClasses: Record<Status, string> = {
    DISABLED: 'text-slate-300 pointer-events-none',
    SELECTED: 'bg-indigo-600 text-white font-bold bg-stripes',
    NO_VACANCY: 'text-slate-900 hover:bg-slate-100',
    TODAY_NO_VACANCY: 'text-indigo-600 font-bold hover:bg-slate-100',
    VACANCY: 'bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200',
  }

  type GetStatus = () => Status
  const getStatus: GetStatus = function () {
    if (isDisabled) return 'DISABLED'
    if (isSelected) return 'SELECTED'
    if (hasAvailability) return 'VACANCY'
    return isCurrentDay ? 'TODAY_NO_VACANCY' : 'NO_VACANCY'
  }

  // ------------------------------
  // Returned JSX
  // ------------------------------
  return (
    // Spreading `useCalendar` props on the various elememnts...
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={cx(
          baseClasses,
          statusClasses[getStatus()]
          // isSelected && dynamicClasses.selected,
          // isDisabled && dynamicClasses.disabled,
          // isCurrentDay && !isSelected && dynamicClasses.today,
          // hasAvailability && !isDisabled && !isSelected && dynamicClasses.hasAvailability,
          // !hasAvailability &&
          //   !isCurrentDay &&
          //   !isDisabled &&
          //   !isSelected &&
          //   dynamicClasses.candidate
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
