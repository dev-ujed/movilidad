import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CustumAppBar from './customAppBar';
import SideBar from './sideBar';

function Main() {

  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <div style={{  display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div>
        <CustumAppBar toggleSidebar={toggleSidebar} />
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <SideBar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />

        {/* Contenido principal */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Main;
