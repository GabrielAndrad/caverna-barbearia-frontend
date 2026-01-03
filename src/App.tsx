// @ts-nocheck

import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoadingSpinner from './components/Spinner';
// import Snowflakes from './components/Snowflakes';


const Router = React.lazy(() => import('./Router'));


class App extends Component<any, any> {
  render() {
    console.log(Router)
    return (
      <BrowserRouter basename="/">
        {/* <Snowflakes /> */}
        <Suspense fallback={
        <div className='center'><div className="loader"></div>
        <div style={{position:'absolute',top:'50%',left:'30%'}}>Carregando <LoadingSpinner/></div>
        </div>
        }>
          <Router />
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;

