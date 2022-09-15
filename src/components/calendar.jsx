import * as React from 'react'
import {
  useCalendar,
  useCalendarGrid,
  useCalendarCell,
  useButton,
  useLocale,
  useDateFormatter,
} from 'react-aria'
import { useCalendarState } from 'react-stately'
import {
  createCalendar,
  getWeeksInMonth,
  isSameDay,
  parseDateTime,
  isToday,
  startOfWeek,
  today,
} from '@internationalized/date'

import cx from 'classnames'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import { makeCalendarAvailabilities } from '../utils'

// ----------------------------
// CalendarDay
// ----------------------------

function CalendarDay({ state, date, bookingAvailabilities }) {
  const ref = React.useRef()
  const { cellProps, buttonProps, isSelected, isOutsideVisibleRange, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref)

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

/*
  ------------------------------
  Below this comment are implementation components that
  you don't need to worry about. We'll do all our work
  within the `<CalendarDay />` component above.
  ------------------------------
*/

// ----------------------------
// Calendar
// ----------------------------
export default function Calendar() {
  const [selectedDate, setSelectedDate] = React.useState(today())
  const bookingAvailabilities = makeCalendarAvailabilities(16, { includeToday: false })
  const { locale } = useLocale()

  const props = {
    minValue: today(),
    maxValue: today().add({ months: 6 }),
    value: selectedDate,
    onChange: setSelectedDate,
    bookingAvailabilities,
  }

  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  })

  const ref = React.useRef()
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state, ref)

  return (
    <div {...calendarProps} ref={ref} className="calendar">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          <CalendarButton {...prevButtonProps} />
          <CalendarButton {...nextButtonProps} />
        </div>
      </div>
      <CalendarGrid state={state} bookingAvailabilities={bookingAvailabilities} />
    </div>
  )
}

// ----------------------------
// Calendar Grid
// ----------------------------

function CalendarGrid({ state, bookingAvailabilities, ...props }) {
  const { locale } = useLocale()
  const { gridProps, headerProps } = useCalendarGrid(props, state)
  const formatter = useDateFormatter({ weekday: 'long' })

  // Get the full day strings for the calendar heading
  const daysOfWeek = React.useMemo(() => {
    const weekStart = startOfWeek(today(state.timeZone), locale)
    return [...new Array(7).keys()].map((index) => {
      const date = weekStart.add({ days: index })
      const dateDay = date.toDate(state.timeZone)
      return formatter.format(dateDay)
    })
  }, [locale, state.timeZone, formatter])

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

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

// ----------------------------
// Month Navigation Button
// ----------------------------

function CalendarButton(props) {
  const ref = React.useRef()
  const { buttonProps } = useButton(props, ref)

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
