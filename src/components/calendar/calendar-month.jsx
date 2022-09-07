import React from 'react'
import { useLocale, useCalendarGrid, useDateFormatter } from 'react-aria'
import { getWeeksInMonth, startOfWeek, today } from '@internationalized/date'

import { CalendarDay } from './calendar-day'

export function CalendarMonth({ state, bookingAvailabilities, ...props }) {
  let { locale } = useLocale()
  let { gridProps, headerProps } = useCalendarGrid(props, state)
  const formatter = useDateFormatter({ weekday: 'long' })

  // Get the full day strings for the calendar heading
  let daysOfWeek = React.useMemo(() => {
    let weekStart = startOfWeek(today(state.timeZone), locale)
    return [...new Array(7).keys()].map((index) => {
      let date = weekStart.add({ days: index })
      let dateDay = date.toDate(state.timeZone)
      return formatter.format(dateDay)
    })
  }, [locale, state.timeZone, formatter])

  // Get the number of weeks in the month so we can render the proper number of rows.
  let weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

  return (
    <div className="-mx-4">
      <table {...gridProps} className="mt-4 w-full table-fixed border-separate border-spacing-2">
        <thead {...headerProps}>
          <tr>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="pb-4">
                <abbr
                  className="cursor-help text-sm font-semibold uppercase tracking-wider text-slate-700 no-underline"
                  title={day}
                >
                  {day.slice(0, 3)}
                </abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
            <tr key={weekIndex} className="text-center">
              {state
                .getDatesInWeek(weekIndex)
                .map((date, i) =>
                  date ? (
                    <CalendarDay
                      key={i}
                      state={state}
                      date={date}
                      bookingAvailabilities={bookingAvailabilities}
                    />
                  ) : (
                    <td key={i} />
                  )
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
