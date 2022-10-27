
import { plug } from 'luffie'
import React from 'react'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { MyAccountStore } from '../../../store/my-account-store'
import './index.scss'

interface IProps {
  schedules: any[]
}
const MyAccount:React.FunctionComponent<IProps> = ({
  schedules
}) => {
  return (
    <div className='card-schedule'>
      <h1>Meus Agendamentos</h1>
      <div className='table-schedule'>
        {schedules && schedules.length &&<table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Telefone</th>
              <th>Tipo do serviço</th>
              <th>Preço</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Data Cadastro</th>
            </tr>
          </thead>
          <tbody>
              {schedules.map(item => {
                return(
                  <tr key = {item.id}>
                    <td>{item.user.name}</td>
                    <td>{item.user.phone}</td>
                    <td>{item.typeCut.title}</td>
                    <td>{item.typeCut.price}</td>
                    <td>{item.date}</td>
                    <td>{item.hour}</td>
                    <td>{item.dateRegister}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>}
      </div>
    </div>
  )
}

const stream = (props: any) => {
  
  return combineLatest([
    MyAccountStore,
  ]).pipe(
    map(([databasePlansState]) => {
      return {
        ...databasePlansState,
      };
    })
  );
};

const MyAccountScreen = plug(stream)(MyAccount);



export default MyAccountScreen