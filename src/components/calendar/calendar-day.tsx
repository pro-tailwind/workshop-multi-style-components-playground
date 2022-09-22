/* 
  The first few lines are wiring up React-Aria's `useCalendar` implementation. 
  You don't need to worry about any of that for this challenge. 
  
  If curious, you can learn more about the `useCalendar` hook here: 
  https://react-spectrum.adobe.com/react-aria/useCalendar.html
*/
import * as React from 'react'
import { useCalendarCell } from 'react-aria'
import { isSameDay, parseDateTime, isToday, getLocalTimeZone } from '@internationalized/date'

import { Status, baseClasses, statusClasses } from './availability-status'
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
