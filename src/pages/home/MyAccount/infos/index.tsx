import moment from 'moment'
import React from 'react'
import AdminCharts from './admin-charts'
import './index.scss'

moment.locale('pt-br')

interface IProps {
  schedules: unknown
  filters: { inicio?: string; fim?: string }
  isLoading: boolean
}

const Infos: React.FunctionComponent<IProps> = ({ schedules, filters, isLoading }) => {
  const inicio = filters?.inicio ? moment(filters.inicio).format('DD/MM/YYYY') : ''
  const fim = filters?.fim ? moment(filters.fim).format('DD/MM/YYYY') : ''

  return (
    <div className="admin-data">
      <p className="admin-period">Período de {inicio} à {fim}</p>
      <AdminCharts schedules={schedules} filters={filters} isLoading={isLoading} />
    </div>
  )
}

export default Infos
