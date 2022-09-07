import React from 'react'
import { useCalendar, useLocale } from 'react-aria'
import { useCalendarState } from 'react-stately'
import { createCalendar } from '@internationalized/date'

import { CalendarNavigationButton } from './calendar-navigation-button'
import { CalendarMonth } from './calendar-month'

export function Calendar({ bookingAvailabilities, ...props }) {
  let { locale } = useLocale()

  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  })

  let ref = React.useRef()
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state, ref)

  return (
    <div {...calendarProps} ref={ref} className="calendar">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex gap-2">
          <CalendarNavigationButton {...prevButtonProps} />
          <CalendarNavigationButton {...nextButtonProps} />
        </div>
      </div>
      <CalendarMonth state={state} bookingAvailabilities={bookingAvailabilities} />
    </div>
  )
}
