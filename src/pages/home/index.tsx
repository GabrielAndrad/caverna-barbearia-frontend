import { plug } from 'luffie'
import React, { useState } from 'react'
import { map } from 'rxjs/operators'
import Header from '../../components/Header'
import { HomeStore } from '../../store/home-store'

import './index.scss'

import {combineLatest} from 'rxjs'
import Home from './home'
import MyAccount from './MyAccount'

const Dashboard = ({
  showSchedule
}) => {
  const [menu,setMenu] = useState<'home' | 'my-account'>('home')
  return (
    <div>
      <Header changeMenu = {(menu) => setMenu(menu)} menu={menu}/>
      {menu === 'home' && <Home showSchedule={showSchedule}/>}
      {menu === 'my-account' && <MyAccount/>}
    </div>
  )
}


const stream = (props: any) => {
  
  return combineLatest([
    HomeStore,
  ]).pipe(
    map(([databasePlansState]) => {
      return {
        ...databasePlansState,
      };
    })
  );
};

const HomeScreen = plug(stream)(Dashboard);



export default HomeScreen