// @ts-nocheck

import React, { FC, Fragment } from 'react';
import { Route,Routes } from 'react-router-dom';

// Components

import { plug } from 'luffie';
import { map } from 'rxjs/operators';
import Home from './pages/home'
import { RouterStore } from './store/router-store';

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

const stream = (props: any) => {
  return RouterStore.pipe(
    map(currentUser => ({
    }))
  )
}

const Router = plug(stream)(InnerRouter);

export default Router;


