import React, { useState } from 'react'
import Header from '../../components/Header'
import './index.scss'
import Home from './home'
import MyAccount from './MyAccount'

const Dashboard = ({
  showSchedule
}) => {
  const [menu,setMenu] = useState<'home' | 'my-account'>('home')
  return (
    <div>
      <Header changeMenu = {(menu) => {
        setMenu(menu)
        
        }} menu={menu}/>
      {menu === 'home' && <Home />}
      {menu === 'my-account' && <MyAccount/>}
    </div>
  )
}

export default Dashboard