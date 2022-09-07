import React, { useState } from 'react'
import { useLocale } from 'react-aria'
import { useCalendarState } from 'react-stately'
import { today, toCalendarDateTime, createCalendar } from '@internationalized/date'

import { Calendar as CalendarRoot } from './calendar'
import { CalendarDay } from './calendar-day'
const day = today()

function mockAvailabilities(days) {
  return days.map((d) => ({
    startTime: toCalendarDateTime(day).add({ days: d }).add({ hours: 8 }).toString(),
    endTime: toCalendarDateTime(day).add({ days: d }).add({ hours: 9 }).toString(),
  }))
}

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState(day)

  const { locale } = useLocale()

  const state = useCalendarState({
    minValue: today(),
    value: today().add({ days: 3 }),
    locale,
    createCalendar,
  })

  return (
    <div className="max-w-sm mt-20 mx-auto px-4 sm:px-6 lg:px-8">
      <CalendarRoot
        aria-label="Availability calendar"
        value={selectedDate}
        onChange={setSelectedDate}
        bookingAvailabilities={mockAvailabilities([
          3, 5, 7, 9, 12, 15, 18, 21, 24, 26, 30, 33, 39, 44, 48, 55, 60, 66, 72, 80, 88, 95,
        ])}
        minValue={day}
        maxValue={day.add({ months: 6 })}
      />

      <h2 className="text-xl font-semibold mt-12">Day states</h2>
      {/* <CalendarDay date={today()} state={state} bookingAvailabilities={[]} /> */}
    </div>
  )
}
