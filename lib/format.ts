export const IST_TIMEZONE = 'Asia/Kolkata'

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: IST_TIMEZONE,
})

const timeFormatter = new Intl.DateTimeFormat('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZone: IST_TIMEZONE,
})

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('en-IN')

/** DD/MM/YYYY in IST */
export function formatDateIN(value: Date | string | number) {
  return dateFormatter.format(new Date(value))
}

/** DD/MM/YYYY, hh:mm am IST */
export function formatDateTimeIN(value: Date | string | number) {
  const d = new Date(value)
  return `${dateFormatter.format(d)}, ${timeFormatter.format(d)} IST`
}

export function formatINR(amount: number) {
  return inrFormatter.format(amount)
}

export function formatNumberIN(n: number) {
  return numberFormatter.format(n)
}

export function formatLakh(amount: number) {
  const lakh = amount / 100000
  const rounded = Number.isInteger(lakh) ? lakh.toString() : lakh.toFixed(1).replace(/\.0$/, '')
  return `₹${rounded} lakh`
}

/** Age in completed years, evaluated against the current IST calendar date. */
export function ageInYears(dobISO: string, now: Date = new Date()) {
  const [y, m, d] = dobISO.split('-').map(Number)
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: IST_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(now)
    .split('-')
    .map(Number)
  const [ny, nm, nd] = parts
  let age = ny - y
  if (nm < m || (nm === m && nd < d)) age -= 1
  return age
}
