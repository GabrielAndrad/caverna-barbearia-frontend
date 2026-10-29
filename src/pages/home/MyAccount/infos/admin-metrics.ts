export type DayPoint = {
  label: string
  full: string
  quantidade: number
  receita: number
}

export type HourPoint = {
  label: string
  quantidade: number
  receita: number
}

export type ServicePoint = {
  name: string
  fullName: string
  quantidade: number
  receita: number
  share: number
}

export type AdminMetrics = {
  total: number
  receita: number
  ticket: number
  realizadoReceita: number
  realizadoQuantidade: number
  aRealizarReceita: number
  aRealizarQuantidade: number
  byDay: DayPoint[]
  byHour: HourPoint[]
  byService: ServicePoint[]
  groupedByWeek: boolean
}

const EMPTY: AdminMetrics = {
  total: 0,
  receita: 0,
  ticket: 0,
  realizadoReceita: 0,
  realizadoQuantidade: 0,
  aRealizarReceita: 0,
  aRealizarQuantidade: 0,
  byDay: [],
  byHour: [],
  byService: [],
  groupedByWeek: false,
}

export const formatCurrency = (value: number): string =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const parsePrice = (value: unknown): number => {
  if (value == null) return 0
  let text = String(value).trim().replace(/R\$\s?/gi, '').replace(/\s/g, '')
  if (!text) return 0
  if (text.includes(',')) text = text.replace(/\./g, '').replace(',', '.')
  const parsed = parseFloat(text)
  return Number.isFinite(parsed) ? parsed : 0
}

const pad = (value: number): string => String(value).padStart(2, '0')

const formatDay = (date: Date): string =>
  `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`

const shortDay = (date: Date): string =>
  `${pad(date.getDate())}/${pad(date.getMonth() + 1)}`

const parseFilterDate = (value: string): Date | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value || '')
  if (!match) return null
  return new Date(+match[1], +match[2] - 1, +match[3])
}

const parseAppointmentDate = (value: string, hour: string): Date | null => {
  const parts = (value || '').split('/')
  if (parts.length < 3) return null
  const when = new Date(+parts[2], +parts[1] - 1, +parts[0])
  if (Number.isNaN(when.getTime())) return null
  const [h = '0', m = '0', s = '0'] = (hour || '00:00').split(':')
  when.setHours(+h || 0, +m || 0, +s || 0, 0)
  return when
}

const mondayOf = (date: Date): Date => {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = start.getDay()
  const shift = day === 0 ? -6 : 1 - day
  start.setDate(start.getDate() + shift)
  return start
}

const enumerateDays = (start: Date, end: Date): Date[] => {
  const days: Date[] = []
  const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const last = new Date(end.getFullYear(), end.getMonth(), end.getDate())
  while (cursor <= last && days.length < 120) {
    days.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}

const shortService = (title: string): string => {
  const cut = (title || 'Serviço').split('(')[0].trim() || 'Serviço'
  return cut.length > 18 ? `${cut.slice(0, 16)}…` : cut
}

const addAmount = (
  map: Map<string, { quantidade: number; receita: number }>,
  key: string,
  receita: number
) => {
  const current = map.get(key) || { quantidade: 0, receita: 0 }
  current.quantidade += 1
  current.receita += receita
  map.set(key, current)
}

export const buildAdminMetrics = (schedules: unknown, filters: { inicio?: string; fim?: string }): AdminMetrics => {
  if (!Array.isArray(schedules) || schedules.length === 0) return EMPTY

  const now = new Date()
  const byDayMap = new Map<string, { quantidade: number; receita: number }>()
  const byHourMap = new Map<string, { quantidade: number; receita: number }>()
  const byServiceMap = new Map<string, { name: string; quantidade: number; receita: number }>()

  let receita = 0
  let realizadoReceita = 0
  let realizadoQuantidade = 0

  schedules.forEach((item) => {
    const price = parsePrice(item?.typeCut?.price)
    const when = parseAppointmentDate(item?.date, item?.hour)
    receita += price

    if (when && when < now) {
      realizadoReceita += price
      realizadoQuantidade += 1
    }

    if (when) addAmount(byDayMap, formatDay(when), price)

    const hourMatch = /^(\d{1,2})/.exec(item?.hour || '')
    if (hourMatch) addAmount(byHourMap, pad(+hourMatch[1]), price)

    const fullName = item?.typeCut?.title || 'Serviço'
    const service = byServiceMap.get(fullName) || { name: shortService(fullName), quantidade: 0, receita: 0 }
    service.quantidade += 1
    service.receita += price
    byServiceMap.set(fullName, service)
  })

  const start = parseFilterDate(filters?.inicio || '')
  const end = parseFilterDate(filters?.fim || '')
  const span = start && end ? Math.round((end.getTime() - start.getTime()) / 86400000) : 0
  const groupedByWeek = span > 31
  const byDay = buildDaySeries(byDayMap, start, end, groupedByWeek)

  const byHour = Array.from(byHourMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([hour, point]) => ({
      label: `${hour}h`,
      quantidade: point.quantidade,
      receita: point.receita,
    }))

  const byService = Array.from(byServiceMap.entries())
    .map(([fullName, point]) => ({
      name: point.name,
      fullName,
      quantidade: point.quantidade,
      receita: point.receita,
      share: receita > 0 ? (point.receita / receita) * 100 : 0,
    }))
    .sort((a, b) => b.receita - a.receita)

  const total = schedules.length

  return {
    total,
    receita,
    ticket: total > 0 ? receita / total : 0,
    realizadoReceita,
    realizadoQuantidade,
    aRealizarReceita: receita - realizadoReceita,
    aRealizarQuantidade: total - realizadoQuantidade,
    byDay,
    byHour,
    byService,
    groupedByWeek,
  }
}

const buildDaySeries = (
  byDayMap: Map<string, { quantidade: number; receita: number }>,
  start: Date | null,
  end: Date | null,
  groupedByWeek: boolean
): DayPoint[] => {
  if (!start || !end || end < start) {
    return Array.from(byDayMap.entries()).map(([full, point]) => ({
      label: full.slice(0, 5),
      full,
      quantidade: point.quantidade,
      receita: point.receita,
    }))
  }

  if (!groupedByWeek) {
    return enumerateDays(start, end).map((day) => {
      const full = formatDay(day)
      const point = byDayMap.get(full) || { quantidade: 0, receita: 0 }
      return { label: shortDay(day), full, quantidade: point.quantidade, receita: point.receita }
    })
  }

  const weeks = new Map<string, DayPoint>()
  enumerateDays(start, end).forEach((day) => {
    const weekStart = mondayOf(day)
    const key = formatDay(weekStart)
    const current = weeks.get(key) || { label: shortDay(weekStart), full: `Semana de ${shortDay(weekStart)}`, quantidade: 0, receita: 0 }
    const point = byDayMap.get(formatDay(day))
    if (point) {
      current.quantidade += point.quantidade
      current.receita += point.receita
    }
    weeks.set(key, current)
  })

  return Array.from(weeks.values())
}
