import React, { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  AdminMetrics,
  buildAdminMetrics,
  formatCurrency,
} from './admin-metrics'

const tooltipStyle: React.CSSProperties = {
  background: '#111111',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 8,
  color: '#ffffff',
  fontSize: 12,
  textTransform: 'none',
  padding: '8px 10px',
}

const axisTick = { fill: '#ffffff', fontSize: 10 }

const Tip: React.FunctionComponent<{ active?: boolean; children?: React.ReactNode }> = ({ active, children }) => {
  if (!active) return null
  return <div style={tooltipStyle}>{children}</div>
}

const PeriodChart: React.FunctionComponent<{ metrics: AdminMetrics }> = ({ metrics }) => (
  <article className="admin-chart">
    <h2>{metrics.groupedByWeek ? 'Receita por semana' : 'Receita por dia'}</h2>
    <p className="admin-chart__hint">Barras: agendamentos. Linha: receita.</p>
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart data={metrics.byDay} margin={{ top: 8, right: 0, left: -22, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} interval={metrics.byDay.length > 10 ? 1 : 0} />
        <YAxis yAxisId="qty" allowDecimals={false} tick={axisTick} axisLine={false} tickLine={false} width={28} />
        <YAxis yAxisId="money" orientation="right" tick={axisTick} axisLine={false} tickLine={false} width={32} />
        <Tooltip
          content={({ active, payload }) => {
            const row = payload?.[0]?.payload
            if (!row) return null
            return (
              <Tip active={active}>
                <strong>{row.full}</strong>
                <div>{row.quantidade} agendamento{row.quantidade === 1 ? '' : 's'}</div>
                <div>{formatCurrency(row.receita)}</div>
              </Tip>
            )
          }}
        />
        <Bar yAxisId="qty" dataKey="quantidade" fill="#f9530b" radius={[4, 4, 0, 0]} barSize={12} />
        <Line yAxisId="money" dataKey="receita" stroke="#ffffff" strokeWidth={2} dot={{ r: 2, fill: '#ffffff' }} />
      </ComposedChart>
    </ResponsiveContainer>
  </article>
)

const HourChart: React.FunctionComponent<{ metrics: AdminMetrics }> = ({ metrics }) => (
  <article className="admin-chart">
    <h2>Horários que mais enchem</h2>
    <p className="admin-chart__hint">Quantidade de agendamentos em cada hora.</p>
    <ResponsiveContainer width="100%" height={210}>
      <BarChart data={metrics.byHour} margin={{ top: 8, right: 4, left: -22, bottom: 0 }}>
        <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} interval={0} />
        <YAxis allowDecimals={false} tick={axisTick} axisLine={false} tickLine={false} width={28} />
        <Tooltip
          cursor={{ fill: 'rgba(255,255,255,0.06)' }}
          content={({ active, payload }) => {
            const row = payload?.[0]?.payload
            if (!row) return null
            return (
              <Tip active={active}>
                <strong>{row.label}</strong>
                <div>{row.quantidade} agendamento{row.quantidade === 1 ? '' : 's'}</div>
                <div>{formatCurrency(row.receita)}</div>
              </Tip>
            )
          }}
        />
        <Bar dataKey="quantidade" fill="#f9530b" radius={[4, 4, 0, 0]} barSize={14} />
      </BarChart>
    </ResponsiveContainer>
  </article>
)

const ServiceChart: React.FunctionComponent<{ metrics: AdminMetrics }> = ({ metrics }) => (
  <article className="admin-chart">
    <h2>O que mais fatura</h2>
    <p className="admin-chart__hint">Receita pelo preço salvo em cada agendamento.</p>
    <ResponsiveContainer width="100%" height={Math.max(180, metrics.byService.length * 36)}>
      <BarChart data={metrics.byService} layout="vertical" margin={{ top: 4, right: 8, left: 4, bottom: 4 }}>
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" width={108} tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ fill: 'rgba(255,255,255,0.06)' }}
          content={({ active, payload }) => {
            const row = payload?.[0]?.payload
            if (!row) return null
            return (
              <Tip active={active}>
                <strong>{row.fullName}</strong>
                <div>{formatCurrency(row.receita)} · {Math.round(row.share)}%</div>
                <div>{row.quantidade} agendamento{row.quantidade === 1 ? '' : 's'}</div>
              </Tip>
            )
          }}
        />
        <Bar dataKey="receita" fill="#f9530b" radius={[0, 6, 6, 0]} barSize={14} />
      </BarChart>
    </ResponsiveContainer>
  </article>
)

type ChartProps = {
  schedules: unknown
  filters: { inicio?: string; fim?: string }
  isLoading: boolean
}

const AdminCharts: React.FunctionComponent<ChartProps> = ({ schedules, filters, isLoading }) => {
  const metrics = useMemo(() => buildAdminMetrics(schedules, filters), [schedules, filters])

  if (isLoading && metrics.total === 0) {
    return <p className="admin-chart__empty">Carregando dados do período...</p>
  }

  if (metrics.total === 0) {
    return <p className="admin-chart__empty">Nenhum agendamento neste período.</p>
  }

  return (
    <div className="admin-dashboards">
      <div className="admin-kpis">
        <article className="admin-kpi">
          <small>Receita</small>
          <strong>{formatCurrency(metrics.receita)}</strong>
        </article>
        <article className="admin-kpi">
          <small>Agendamentos</small>
          <strong>{metrics.total}</strong>
        </article>
        <article className="admin-kpi">
          <small>Já realizado</small>
          <strong>{formatCurrency(metrics.realizadoReceita)}</strong>
          <span>{metrics.realizadoQuantidade} atendimento{metrics.realizadoQuantidade === 1 ? '' : 's'}</span>
        </article>
        <article className="admin-kpi">
          <small>Ainda por vir</small>
          <strong>{formatCurrency(metrics.aRealizarReceita)}</strong>
          <span>{metrics.aRealizarQuantidade} agendamento{metrics.aRealizarQuantidade === 1 ? '' : 's'}</span>
        </article>
      </div>
      <p className="admin-chart__hint admin-chart__hint--loose">
        Ticket médio {formatCurrency(metrics.ticket)}
      </p>
      <PeriodChart metrics={metrics} />
      <HourChart metrics={metrics} />
      <ServiceChart metrics={metrics} />
    </div>
  )
}

export default AdminCharts
