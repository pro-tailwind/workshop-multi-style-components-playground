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
export const baseClasses =
  'relative w-12 max-w-full aspect-square rounded-full grid place-items-center focus:outline-none focus:ring focus:ring-offset-1 focus:ring-indigo-400'

// Status-specific classes
export const statusClasses: Record<Status, string> = {
  DISABLED: 'text-slate-300 pointer-events-none',
  SELECTED: 'bg-indigo-600 text-white font-bold bg-stripes',
  NO_VACANCY: 'text-slate-900 hover:bg-slate-100',
  TODAY_NO_VACANCY: 'text-indigo-600 font-bold hover:bg-slate-100',
  VACANCY: 'bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200',
}
