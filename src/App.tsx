// @ts-nocheck

import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';


const Router = React.lazy(() => import('./Router'));


class App extends Component<any, any> {
  render() {
    return (
      <BrowserRouter basename="/">
        <Suspense fallback={
        <div className='center'><div className="loader"></div><div className='break'>Carregando...</div></div>
        }>
          <Router />
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;

