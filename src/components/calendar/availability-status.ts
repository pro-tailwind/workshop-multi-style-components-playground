/* 
  We've identified that a calendar day will always be in 
  one of these states, or "availability statuses",
  represented by the `Status` type:
*/

export type Status = 'DISABLED' | 'SELECTED' | 'NO_VACANCY' | 'TODAY_NO_VACANCY' | 'VACANCY'
