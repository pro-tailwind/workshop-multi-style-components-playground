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

export const baseClasses =
  'relative w-12 max-w-full aspect-square rounded-full grid place-items-center focus:outline-none focus:ring focus:ring-offset-1 focus:ring-indigo-400'

/* 
  TODO: Rename the `statusClasses` keys below to match the
  finite list of Status values we have just established.
*/
export const statusClasses: Record<Status, string> = {
  disabled: 'text-slate-300 pointer-events-none',
  selected: 'bg-indigo-600 text-white font-bold bg-stripes',
  candidate: 'text-slate-900 hover:bg-slate-100',
  today: 'text-indigo-600 font-bold hover:bg-slate-100',
  hasAvailability: 'bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200',
}
