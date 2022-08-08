import React, { } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';
import Header from './components/pages/Header';
import { RecoilRoot, } from 'recoil';

function App() {


  return (
    <React.StrictMode>
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>
  );
}

export default App;

