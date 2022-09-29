// ------------------------------
// Calendar day statuses
// ------------------------------
/* 
  We've identified that a calendar day will always be in 
  one of these states, or "availability statuses",
  represented by the `Status` type:
*/
export type Status = 'DISABLED' | 'SELECTED' | 'NO_VACANCY' | 'TODAY_NO_VACANCY' | 'VACANCY'

// ------------------------------
// Styles lookup dictionary
// ------------------------------

/* 
  Let's start by listing all the classes that are used
  across all calendar day statuses:
*/
export const baseClasses =
  'relative w-12 max-w-full aspect-square rounded-full grid place-items-center focus:outline-none focus:ring focus:ring-offset-1 focus:ring-indigo-400'

/* 
  TODO: Populate the `statusClasses` object below with the 
  correct keys (statuses) and values (class strings)
  to make both status tables look identical.

  See the `dynamicClasses` object further down for reference!
*/
export const statusClasses: Record<Status, string> = {}

// ------------------------------
// `dynamicClasses` reference
// ------------------------------
/*
  For your convenience, here's a copy of are the dynamic styles used 
  in the calendar code at the beginning of this refactoring.
  You can see those around line 30 of this file:
  `src/components/reference/calendar-day.tsx`
*/
const dynamicClasses = {
  disabled: 'text-slate-300 pointer-events-none',
  selected: 'bg-indigo-600 text-white font-bold bg-stripes',
  candidate: 'text-slate-900 hover:bg-slate-100',
  today: 'text-indigo-600 font-bold hover:bg-slate-100',
  hasAvailability: 'bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200',
}
