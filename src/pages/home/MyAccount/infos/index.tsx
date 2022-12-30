import moment from 'moment'
import React from 'react'
import './index.scss'

interface IProps {
  infos:any,
  filters:any
}
const Infos :React.FunctionComponent<IProps>= ({
  infos,
  filters
}) => {

    const formatCurrency = (current: string): string => {
      const newValue = parseFloat(current);
      return newValue.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
      });
    };
    

  return (
    <div>
      <div className='type-card'>
        <div className="header-card">
          <h1>Total de agendamentos</h1>
        </div>
        <div className="body-card">
          <span className='total-card'>{infos.typeService.total}</span>
          <span>No Período de {moment(filters.inicio).format('DD/MM/YYYY')} à {moment(filters.fim).format('DD/MM/YYYY')}</span>
          <ul className="list-card">
            <li className="list-item-card">
              <span>Degradê</span> <span className='value-card'>{infos.typeService.types.Degradê}</span>
            </li>
            <li className="list-item-card">
            <span>Tradicional</span> <span className='value-card'>{infos.typeService.types.Tradicional}</span>
            </li>
            <li className="list-item-card">
            <span>Barba</span> <span className='value-card'>{infos.typeService.types.Barba}</span>
            </li>
            <li className="list-item-card">
            <span>Pézinho</span> <span className='value-card'>{infos.typeService.types.Pézinho}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='type-card'>
        <div className="header-card">
          <h1>Total à Receber</h1>
        </div>
        <div className="body-card">
          <span className='total-card'>{formatCurrency(infos.priceService.total)}</span>
          <span>No Período de {moment(filters.inicio).format('DD/MM/YYYY')} à {moment(filters.fim).format('DD/MM/YYYY')}</span>
          <ul className="list-card">
          <li className="list-item-card">
              <span>Degradê</span> <span className='value-card'>{formatCurrency(infos.priceService.types.Degradê)}</span>
            </li>
            <li className="list-item-card">
            <span>Tradicional</span> <span className='value-card'>{formatCurrency(infos.priceService.types.Tradicional)}</span>
            </li>
            <li className="list-item-card">
            <span>Barba</span> <span className='value-card'>{formatCurrency(infos.priceService.types.Barba)}</span>
            </li>
            <li className="list-item-card">
            <span>Pézinho</span> <span className='value-card'>{formatCurrency(infos.priceService.types.Pézinho)}</span>
            </li>
          </ul>
        </div>
  

      </div>
    </div>
  )
}

export default Infos