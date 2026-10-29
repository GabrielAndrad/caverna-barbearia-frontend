export function isClosedBookingDate(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const isDec2025 = year === 2025 && month === 11
  const isJan2026 = year === 2026 && month === 0

  if (isDec2025) {
    if ([25, 31].includes(day)) return true
    if (day >= 16 && day <= 30) return false
  }

  if (isJan2026 && day >= 1 && day <= 12) return true

  return date.getDay() === 0 || date.getDay() === 1
}

export function getMaxBookingDate() {
  const today = new Date()
  const defaultMaxDate = new Date(today)
  defaultMaxDate.setDate(today.getDate() + 30)
  const specialMaxDate = new Date(2026, 0, 12)
  return defaultMaxDate > specialMaxDate ? defaultMaxDate : specialMaxDate
}

export function listBookingDates() {
  const dates: Date[] = []
  const cursor = new Date()
  cursor.setHours(12, 0, 0, 0)
  const max = getMaxBookingDate()
  max.setHours(23, 59, 59, 999)

  while (cursor <= max) {
    dates.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  return dates
}
