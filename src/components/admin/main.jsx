import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CustumAppBar from './customAppBar';
import SideBar from './sideBar';

function Main() {

  return (
    <div style={{  display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div>
        <CustumAppBar />
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <SideBar />

        {/* Contenido principal */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Main;
