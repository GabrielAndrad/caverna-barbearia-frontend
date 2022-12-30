import React from 'react'
import canceled from '../../../../assets/icons/cancel-icon.svg'

interface IProps {
  schedules:any,
  openModalConfirm: (open) => void
}
const Schedules:React.FunctionComponent<IProps> = ({
  schedules,
  openModalConfirm
}) => {
  return (
    <div>
      {schedules && schedules.length && window.screen.width > 900 && 
      <div className='table-schedule'>
        
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuário</th>
              <th>Telefone</th>
              <th>Tipo do serviço</th>
              <th>Preço</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Data Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
              {schedules.sort((a,b) => {
                if(+a.hour.split(':')[0] === +b.hour.split(':')[0]){
                  return +a.hour.split(':')[1] - +b.hour.split(':')[1]
                } else {
                  return +a.hour.split(':')[0] - +b.hour.split(':')[0]
                }
              }).map(item => {
                return(
                  <tr key = {item.id}>
                    <td>{item._id}</td>
                    <td>{item.user.name}</td>
                    <td>{item.user.phone}</td>
                    <td>{item.typeCut.title}</td>
                    <td>{item.typeCut.price}</td>
                    <td>{item.date}</td>
                    <td>{item.hour}</td>
                    <td>{item.dateRegister}</td>
                    <td>
                      <img data-tip="Cancelar agendamento" style={{cursor:'pointer'}}
                      src={canceled} alt="" width="30px" height="30px"
                      onClick={() => {
                        openModalConfirm(item._id)
                      }}/>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>}
      {schedules && schedules.length && window.screen.width < 900  && 
        <div className='mobile-table-content'>
          {schedules.sort((a,b) => {
                if(+a.hour.split(':')[0] === +b.hour.split(':')[0]){
                  return +a.hour.split(':')[1] - +b.hour.split(':')[1]
                } else {
                  return +a.hour.split(':')[0] - +b.hour.split(':')[0]
                }
            }).map((item,index) => {
              let realized = false
              const strData =item.date
              const partesData = strData.split("/");
              const data = new Date(+partesData[2], +partesData[1] - 1, +partesData[0]);
              const hour = item.hour.split(':')
              data.setHours(hour[0],hour[1],hour[2])
              if(data < new Date()){
                realized = true
              }
              console.log(realized,data,new Date())
            return(
              <div className='mobile-table-row'  key={index}>
                <span><b>ID:</b> {item._id}</span>
                <span><b>Usuário:</b> {item.user.name}</span>
                <span><b>Telefone:</b>{item.user.phone}</span>
                <span><b>Tipo do Serviço:</b>{item.typeCut.title}</span>
                <span><b>Preço:</b>{item.typeCut.price}</span>
                <span><b>Data:</b>{item.date}</span>
                <span><b>Hora:</b>{item.hour}</span>
                <span><b>Data Cadastro:</b>{item.dateRegister}</span>
                <span>
                <p  
                onClick={() => {
                 !realized && openModalConfirm(item._id)
                 }}
                className="cancel-schedule" style={{background:realized?'green':'#f71d1d'}}>
                  {realized?'Realizado':'Cancelar'}
                </p>
                </span>

              </div>
            )
          })
          }
        </div>
        }
    </div>
  )
}

export default Schedules