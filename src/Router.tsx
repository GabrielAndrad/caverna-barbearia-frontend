// @ts-nocheck

import React, { FC, Fragment } from 'react';
import { Route,Routes } from 'react-router-dom';

// Components
import Home from './pages/home'

const InnerRouter: FC = () => (
 <>
    <main>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Fragment>
            <Route path="/" element={wrappedRoutes} />            
        </Fragment>
        <Route component={Home} />
      </Routes>
    </main>
  </>
);

const wrappedRoutes = () => {
  return(      
  <>
      {(
        <Routes>
          <Route exact path="/" element={<Home/>}/>
      </Routes>
      )}     
   
  </>
);}

export default InnerRouter




