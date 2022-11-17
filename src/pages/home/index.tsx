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
      {menu === 'home' && <Home changeMenu = {(menu) => {
        setMenu(menu)
        
        }}/>}
      {menu === 'my-account' && <MyAccount changeMenu = {(menu) => {
        setMenu(menu)
        
        }}/>}
    </div>
  )
}

export default Dashboard