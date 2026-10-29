import React, { useState } from 'react'
import './index.scss'
import Home from './home'
import MyAccount from './MyAccount'

const Dashboard = () => {
  const [menu, setMenu] = useState<'home' | 'my-account'>('home')

  return (
    <div className="phone">
      {menu === 'home' && (
        <Home changeMenu={(nextMenu) => setMenu(nextMenu)} />
      )}
      {menu === 'my-account' && (
        <MyAccount changeMenu={(nextMenu) => setMenu(nextMenu)} />
      )}
    </div>
  )
}

export default Dashboard
