import { today, getDayOfWeek } from '@internationalized/date'

// Lite `classnames` merging functionality
export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Mocking calendar dates
export function makeCalendarAvailabilities(weeks, options) {
  const weekDay = getDayOfWeek(today(), 'en-US')
  const offset = 1 - weekDay
  const nextMonday =
    weekDay === 1 ? today().add({ days: offset }) : today().add({ days: offset }).add({ weeks: 1 })

  const output = []

  if (options.includeToday) {
    output.push({ startTime: today().toString(), endTime: today().toString() })
  }

  let i = 0
  while (i < weeks) {
    const weekOffset = i * 7
    output.push(
      ...[0, 2, 3].map((d) => ({
        startTime: nextMonday.add({ days: weekOffset + d }).toString(),
        endTime: nextMonday.add({ days: weekOffset + d }).toString(),
      }))
    )
    i++
  }
  return output
}
