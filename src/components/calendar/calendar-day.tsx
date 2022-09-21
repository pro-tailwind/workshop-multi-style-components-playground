/* 
  The first few lines are wiring up React-Aria's `useCalendar` implementation. 
  You don't need to worry about any of that for this challenge. 
  
  If curious, you can learn more about the `useCalendar` hook here: 
  https://react-spectrum.adobe.com/react-aria/useCalendar.html
*/
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

  /* 
    ---------------------
    ------------------------
    ---------------------------
    ------------------------------
    === WORKSHOP CHALLENGE ===
    All our work is happening 
    below this comment.
    ------------------------------
    ---------------------------
    ------------------------
    ---------------------
  */

  /* 
    We've identified that a calendar day will always be in 
    one of these states, or "availability statuses",
    represented by the `Status` type:
  */
  type Status = 'DISABLED' | 'SELECTED' | 'NO_VACANCY' | 'TODAY_NO_VACANCY' | 'VACANCY'

  // ------------------------------
  // Styles lookup dictionary
  // ------------------------------

  // Common classes to all statuses
  const baseClasses =
    'relative w-12 max-w-full aspect-square rounded-full grid place-items-center focus:outline-none focus:ring focus:ring-offset-1 focus:ring-indigo-400'

  // Status-specific classes
  const statusClasses: Record<Status, string> = {
    DISABLED: 'text-slate-300 pointer-events-none',
    SELECTED: 'bg-indigo-600 text-white font-bold bg-stripes',
    NO_VACANCY: 'text-slate-900 hover:bg-slate-100',
    TODAY_NO_VACANCY: 'text-indigo-600 font-bold hover:bg-slate-100',
    VACANCY: 'bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200',
  }

  /* 
    We need to determine _what_ status the day is actually in.
    In this case, there is a bit more complexity to it than 
    what our simple lookup object can support. We need 
    some conditional logic. Let's write a function 
    to handle all the possible scenarios.
  */
  type GetStatus = () => Status

  const getAvailibilityStatus: GetStatus = function () {
    if (isDisabled) return 'DISABLED'
    if (isSelected) return 'SELECTED'
    if (!hasAvailability) {
      return isCurrentDay ? 'TODAY_NO_VACANCY' : 'NO_VACANCY'
    }
    return 'VACANCY'
  }

  return (
    // Spreading `useCalendar` props on the various elememnts...
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        /* 
          The className attribute below is where 
          we compose our styles back together.
        */
        className={cx(
          baseClasses,
          statusClasses[getAvailibilityStatus()]

          /*
            Below is the "before" implementation, just for comparison.
            I think we can agree our new logic is easier to follow!
          */

          // calendarClasses.base,
          // isSelected && calendarClasses.selected,
          // isDisabled && calendarClasses.disabled,
          // isCurrentDay && !isSelected && calendarClasses.today,
          // hasAvailability && !isDisabled && !isSelected && calendarClasses.hasAvailability,
          // !hasAvailability &&
          //   !isCurrentDay &&
          //   !isDisabled &&
          //   !isSelected &&
          //   calendarClasses.candidate
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
