import React from 'react';
import './custom.css';
import './App.css';
import './styleguide.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./comp/Dashboard.css";

import Sidebar from './comp/Sidebar';
import Dashboard from './comp/Dashboard';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Clients from './comp/Clients';
import Loans from './comp/Loans';
import Reports from './comp/Reports';

export default function App (){
  return (
    <>
     
      <div className="App">

        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/clients' element={<Clients/>}/>
          <Route path='/loans' element={ <Loans/> }/>
          <Route path='/reports' element={ <Reports/> }/>
        </Routes>
    
      </div>
    </>
  );
};
